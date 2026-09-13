#!/usr/bin/env python3
"""
Sends a fortnightly digest email combining:
  1) the result of the source-map change check (scripts/check_source_map.py)
  2) website visit/pageview counts for the period, from Cloudflare Web
     Analytics (queried via Cloudflare's GraphQL Analytics API)

Unlike check_source_map.py on its own, this always sends an email -- whether
or not the source map changed -- since the point is a standing "here's what
happened in the last two weeks" digest rather than an alert-only check.

Required environment variables:
  GMAIL_ADDRESS           the sending/receiving Gmail address
  GMAIL_APP_PASSWORD      a Gmail app password (not the account password)
  CLOUDFLARE_API_TOKEN    an API token with Account Analytics:Read
  CLOUDFLARE_ACCOUNT_ID   the Cloudflare account tag
  CLOUDFLARE_SITE_TAG     the Web Analytics site tag (NOT the beacon token
                          embedded in the page -- see README note below)

Exits with the same code as check_source_map.py (0 = no changes,
1 = changes found, 2 = check failed), so a workflow can still branch on it
to open a tracking issue in addition to this email.
"""

from __future__ import annotations

import json
import os
import smtplib
import subprocess
import sys
import urllib.request
from datetime import datetime, timedelta, timezone
from email.mime.text import MIMEText
from pathlib import Path

SITE_HOSTS = ["emergency-eyecare.co.uk", "www.emergency-eyecare.co.uk"]
CHECK_SCRIPT = Path(__file__).parent / "check_source_map.py"


def run_source_map_check() -> tuple[str, int]:
    proc = subprocess.run(
        [sys.executable, str(CHECK_SCRIPT)],
        capture_output=True,
        text=True,
    )
    output = (proc.stdout or "") + (proc.stderr or "")
    return output.strip(), proc.returncode


def fetch_visit_stats(days: int = 14) -> dict:
    account_id = os.environ["CLOUDFLARE_ACCOUNT_ID"]
    site_tag = os.environ["CLOUDFLARE_SITE_TAG"]
    token = os.environ["CLOUDFLARE_API_TOKEN"]

    end = datetime.now(timezone.utc)
    start = end - timedelta(days=days)

    query = """
    query ($accountTag: string!, $siteTag: string!, $start: Time!, $end: Time!, $hosts: [string!]) {
      viewer {
        accounts(filter: {accountTag: $accountTag}) {
          rumPageloadEventsAdaptiveGroups(
            limit: 1
            filter: {siteTag: $siteTag, datetime_geq: $start, datetime_lt: $end, requestHost_in: $hosts}
          ) {
            count
            sum { visits }
          }
        }
      }
    }
    """
    payload = {
        "query": query,
        "variables": {
            "accountTag": account_id,
            "siteTag": site_tag,
            "start": start.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "end": end.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "hosts": SITE_HOSTS,
        },
    }
    req = urllib.request.Request(
        "https://api.cloudflare.com/client/v4/graphql",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        body = json.loads(resp.read())

    if body.get("errors"):
        raise RuntimeError(f"Cloudflare API error: {body['errors']}")

    groups = body["data"]["viewer"]["accounts"][0]["rumPageloadEventsAdaptiveGroups"]
    if not groups:
        return {"pageviews": 0, "visits": 0, "start": start, "end": end}

    row = groups[0]
    return {
        "pageviews": row["count"],
        "visits": row["sum"]["visits"],
        "start": start,
        "end": end,
    }


def build_email(map_report: str, map_exit_code: int, stats: dict | None, stats_error: str | None) -> tuple[str, str]:
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    if map_exit_code == 0:
        map_status = "No changes"
    elif map_exit_code == 1:
        change_count = map_report.count("\n  - ")
        map_status = f"{change_count} change(s) detected"
    else:
        map_status = "Check failed"

    subject = f"Fortnightly digest - {map_status} - Eye casualty directory - {today}"

    lines = [
        "EYE CASUALTY DIRECTORY -- FORTNIGHTLY DIGEST",
        "",
        "1) SOURCE MAP CHECK",
        "-------------------",
        map_report,
        "",
    ]
    if map_exit_code == 1:
        lines += [
            "Review the above and decide what to apply to data/hospitals.ts.",
            "After applying, re-baseline with:",
            "    python3 scripts/check_source_map.py --save-baseline",
            "",
        ]

    lines += ["2) WEBSITE VISITS", "-----------------"]
    if stats is not None:
        period = f"{stats['start'].strftime('%Y-%m-%d')} to {stats['end'].strftime('%Y-%m-%d')}"
        lines += [
            f"Period: {period} (last 14 days)",
            f"Pageviews: {stats['pageviews']}",
            f"Visits: {stats['visits']}",
            "",
            f"Domains counted: {', '.join(SITE_HOSTS)}",
        ]
    else:
        lines += [f"Could not retrieve visit stats: {stats_error}"]

    return subject, "\n".join(lines)


def send_email(subject: str, body: str) -> None:
    address = os.environ["GMAIL_ADDRESS"]
    app_password = os.environ["GMAIL_APP_PASSWORD"]

    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = subject
    msg["From"] = address
    msg["To"] = address

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=30) as smtp:
        smtp.login(address, app_password)
        smtp.send_message(msg)


def main() -> int:
    map_report, map_exit_code = run_source_map_check()

    # Written separately so a workflow can still open a GitHub issue from
    # just the map-check portion, matching the pre-existing issue templates.
    Path("report.txt").write_text(map_report + "\n")

    stats, stats_error = None, None
    try:
        stats = fetch_visit_stats()
    except Exception as exc:
        stats_error = str(exc)

    subject, body = build_email(map_report, map_exit_code, stats, stats_error)
    send_email(subject, body)
    print(f"Sent digest email: {subject}")

    return map_exit_code


if __name__ == "__main__":
    sys.exit(main())
