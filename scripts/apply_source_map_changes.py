#!/usr/bin/env python3
"""
Applies a source-map diff (as produced by check_source_map.py --diff-json) to
data/hospitals.ts, skipping any field pinned in scripts/pinned-overrides.json.

This is meant to run on a branch whose result becomes a pull request -- it
never touches main directly. A human reviews and merges (or edits) the PR.

Usage:
  python3 scripts/apply_source_map_changes.py DIFF_JSON_PATH [--report PATH]

Writes an updated data/hospitals.ts and scripts/source-map-snapshot.json in
place, and prints (or writes, with --report) a human-readable summary of what
was applied, added, removed, and skipped -- for use as a PR body.

Exits 0 if any change was applied, 1 if nothing ended up being applied (e.g.
everything was pinned), 2 on error.
"""

from __future__ import annotations

import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
HOSPITALS_TS = REPO_ROOT / "data" / "hospitals.ts"
SNAPSHOT_PATH = REPO_ROOT / "scripts" / "source-map-snapshot.json"
PINNED_PATH = REPO_ROOT / "scripts" / "pinned-overrides.json"

ARRAY_START = "export const hospitals: Hospital[] = [\n"
ARRAY_END = "\n];\n"
ENTRY_FIELDS = [
    ("slug", "template"),
    ("name", "template"),
    ("city", "template"),
    ("region", "template"),
    ("country", "template"),
    ("lat", "number"),
    ("lon", "number"),
    ("serviceLevel", "quoted"),
    ("cover", "template"),
    ("telephone", "template"),
    ("email", "template"),
]


def to_key(name: str, lat: float, lon: float) -> str:
    return f"{name}|{round(lat, 4)}|{round(lon, 4)}"


def to_template_literal(value: str) -> str:
    return value.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def slugify(*parts: str) -> str:
    text = "-".join(parts).lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def parse_entry(block: str) -> dict:
    parsed = {}
    for field, kind in ENTRY_FIELDS:
        if kind == "template":
            m = re.search(rf"{field}: `(.*?)`,\n", block, re.S)
            parsed[field] = m.group(1) if m else ""
        elif kind == "number":
            m = re.search(rf"{field}: (-?[0-9.]+),\n", block)
            parsed[field] = float(m.group(1)) if m else None
        elif kind == "quoted":
            m = re.search(rf'{field}: "(.*?)",\n', block)
            parsed[field] = m.group(1) if m else ""
    return parsed


def render_entry(fields: dict) -> str:
    lines = ["  {"]
    for field, kind in ENTRY_FIELDS:
        value = fields[field]
        if kind == "template":
            lines.append(f"    {field}: `{to_template_literal(value)}`,")
        elif kind == "number":
            lines.append(f"    {field}: {value},")
        elif kind == "quoted":
            lines.append(f'    {field}: "{value}",')
    lines.append("  },")
    return "\n".join(lines)


def load_hospitals_ts() -> tuple[str, list[dict], str]:
    text = HOSPITALS_TS.read_text()
    start = text.index(ARRAY_START) + len(ARRAY_START)
    end = text.index(ARRAY_END, start) + 1  # keep the newline before "];" as part of body
    header, body, footer = text[:start], text[start:end], text[end:]

    entries = []
    for m in re.finditer(r"  \{\n(.*?)\n  \},\n", body, re.S):
        fields = parse_entry(m.group(1) + "\n")
        entries.append(fields)
    return header, entries, footer


def geocode(lat: float, lon: float) -> dict:
    """Best-effort UK reverse geocode via postcodes.io. May fail for
    locations outside the UK postcode grid; caller should treat the result
    as a starting point for manual review, not gospel."""
    url = "https://api.postcodes.io/postcodes?" + urllib.parse.urlencode(
        {"lon": lon, "lat": lat, "limit": 1}
    )
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        body = json.loads(resp.read())
    result = (body.get("result") or [None])[0]
    if not result:
        return {"city": "", "region": "", "country": "England"}
    return {
        "city": result.get("admin_district") or "",
        "region": result.get("region") or "",
        "country": result.get("country") or "England",
    }


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: apply_source_map_changes.py DIFF_JSON_PATH [--report PATH]", file=sys.stderr)
        return 2

    diff_json_path = sys.argv[1]
    report_path = None
    if "--report" in sys.argv:
        report_path = sys.argv[sys.argv.index("--report") + 1]

    diff_data = json.loads(Path(diff_json_path).read_text())
    result, new_entries = diff_data["result"], diff_data["new_entries"]
    pinned = json.loads(PINNED_PATH.read_text()) if PINNED_PATH.exists() else {}

    header, entries, footer = load_hospitals_ts()
    by_key = {to_key(e["name"], e["lat"], e["lon"]): e for e in entries}

    applied, skipped_pinned, not_found, geocode_failed = [], [], [], []

    # Changed
    for item in result["changed"]:
        key, name, fields = item["key"], item["name"], item["fields"]
        entry = by_key.get(key)
        if entry is None:
            not_found.append(f"{name} (changed) -- key not found in data/hospitals.ts, needs manual review")
            continue
        pinned_fields = set(pinned.get(key, {}).get("fields", []))
        for field, vals in fields.items():
            if field in pinned_fields:
                skipped_pinned.append(f"{name}: {field} (source now {vals['new']!r}) -- pinned override, left as-is")
                continue
            entry[field] = vals["new"]
            applied.append(f"{name}: {field} updated")

    # Removed
    removed_keys = set(result["removed"])
    if removed_keys:
        removed_names = [e["name"] for e in entries if to_key(e["name"], e["lat"], e["lon"]) in removed_keys]
        entries = [e for e in entries if to_key(e["name"], e["lat"], e["lon"]) not in removed_keys]
        for name in removed_names:
            applied.append(f"{name}: removed (no longer on source map)")

    # Added
    for key in result["added"]:
        src = new_entries[key]
        try:
            geo = geocode(src["lat"], src["lon"])
        except Exception as exc:
            geocode_failed.append(f"{src['name']} -- geocoding failed ({exc}), added with blank city/region for manual fill-in")
            geo = {"city": "", "region": "", "country": "England"}

        new_fields = {
            "slug": slugify(src["name"], geo["city"] or "uk"),
            "name": src["name"],
            "city": geo["city"],
            "region": geo["region"],
            "country": geo["country"],
            "lat": src["lat"],
            "lon": src["lon"],
            "serviceLevel": src["serviceLevel"],
            "cover": src["cover"],
            "telephone": src["telephone"],
            "email": src["email"],
        }
        entries.append(new_fields)
        applied.append(f"{src['name']}: added (city/region geocoded automatically -- please double-check)")

    body = "\n".join(render_entry(e) for e in entries) + "\n"
    HOSPITALS_TS.write_text(header + body + footer)
    SNAPSHOT_PATH.write_text(json.dumps(new_entries, indent=2, sort_keys=True) + "\n")

    lines = ["## Source map sync\n"]
    if applied:
        lines.append(f"### Applied ({len(applied)})")
        lines += [f"- {line}" for line in applied]
        lines.append("")
    if skipped_pinned:
        lines.append(f"### Skipped -- pinned overrides ({len(skipped_pinned)})")
        lines += [f"- {line}" for line in skipped_pinned]
        lines.append("")
    if not_found:
        lines.append(f"### Needs manual review -- not found in data/hospitals.ts ({len(not_found)})")
        lines += [f"- {line}" for line in not_found]
        lines.append("")
    if geocode_failed:
        lines.append(f"### Geocoding issues ({len(geocode_failed)})")
        lines += [f"- {line}" for line in geocode_failed]
        lines.append("")
    lines.append("scripts/source-map-snapshot.json has been advanced to this pull's source state.")
    report = "\n".join(lines)

    if report_path:
        Path(report_path).write_text(report + "\n")
    print(report)

    return 0 if applied else 1


if __name__ == "__main__":
    sys.exit(main())
