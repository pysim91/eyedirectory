#!/usr/bin/env python3
"""
Checks the original UK Eye Casualty Services Google My Maps for changes.

Compares a fresh pull of the source map against scripts/source-map-snapshot.json,
which represents the source map's state as of the last time changes were
reviewed and applied to data/hospitals.ts. This deliberately does NOT diff
against data/hospitals.ts itself, since several entries there have been
hand-edited beyond what the source map says (e.g. Moorfields' phone note,
St Thomas' service level) -- diffing against the live site would flag those
intentional edits as false positives every week.

Usage:
  python3 scripts/check_source_map.py              # fetch + diff vs snapshot, print report
  python3 scripts/check_source_map.py --save-baseline
      # fetch fresh and overwrite the snapshot with it, no diff printed.
      # Run this after applying a week's changes to data/hospitals.ts so the
      # next check starts from the new baseline.

Exit code: 0 if no differences found, 1 if differences found (so a scheduled
job can branch on whether to notify).
"""

import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

SOURCE_URL = "https://www.google.com/maps/d/kml?mid=12cUQLiSr_fIubmlECukoCGuxDIDg5cUv&forcekml=1"
SNAPSHOT_PATH = Path(__file__).parent / "source-map-snapshot.json"
NS = {"kml": "http://www.opengis.net/kml/2.2"}


def fetch_kml() -> bytes:
    req = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read()


def service_level_from_style(style_url: str) -> str:
    if "0F9D58" in style_url:
        return "walk-in"
    if "F57C00" in style_url:
        return "booked"
    return "none"


def extended_data_value(placemark, field_name: str) -> str:
    for data in placemark.findall("kml:ExtendedData/kml:Data", NS):
        if data.get("name") == field_name:
            value_el = data.find("kml:value", NS)
            if value_el is not None and value_el.text:
                return value_el.text.strip()
    return ""


def parse_placemarks(kml_bytes: bytes) -> dict:
    root = ET.fromstring(kml_bytes)
    entries = {}
    for placemark in root.findall(".//kml:Placemark", NS):
        name_el = placemark.find("kml:name", NS)
        name = name_el.text.strip() if name_el is not None and name_el.text else None
        if not name:
            continue

        style_el = placemark.find("kml:styleUrl", NS)
        style_url = style_el.text.strip() if style_el is not None and style_el.text else ""

        coords_el = placemark.find("kml:Point/kml:coordinates", NS)
        lat = lon = None
        if coords_el is not None and coords_el.text:
            parts = coords_el.text.strip().split(",")
            if len(parts) >= 2:
                lon, lat = float(parts[0]), float(parts[1])

        # Some hospital names (e.g. "Queen Elizabeth Hospital") appear at
        # multiple distinct locations, so name alone isn't a unique key --
        # round coordinates to ~11m precision and fold them into the key.
        lat_key = round(lat, 4) if lat is not None else None
        lon_key = round(lon, 4) if lon is not None else None
        key = f"{name}|{lat_key}|{lon_key}"

        entries[key] = {
            "name": name,
            "lat": lat,
            "lon": lon,
            "serviceLevel": service_level_from_style(style_url),
            "cover": extended_data_value(placemark, "Opening Hours and Cover"),
            "telephone": extended_data_value(placemark, "Telephone"),
            "email": extended_data_value(placemark, "Email"),
        }
    return entries


def load_snapshot() -> dict:
    if not SNAPSHOT_PATH.exists():
        return {}
    return json.loads(SNAPSHOT_PATH.read_text())


def save_snapshot(entries: dict) -> None:
    SNAPSHOT_PATH.write_text(json.dumps(entries, indent=2, sort_keys=True) + "\n")


def diff(old: dict, new: dict) -> dict:
    old_keys, new_keys = set(old.keys()), set(new.keys())
    added = sorted(new_keys - old_keys)
    removed = sorted(old_keys - new_keys)
    changed = []
    for key in sorted(old_keys & new_keys):
        old_entry, new_entry = old[key], new[key]
        changed_fields = {
            k: {"old": old_entry.get(k), "new": new_entry.get(k)}
            for k in ("lat", "lon", "serviceLevel", "cover", "telephone", "email")
            if old_entry.get(k) != new_entry.get(k)
        }
        if changed_fields:
            changed.append({"key": key, "name": new_entry["name"], "fields": changed_fields})
    return {"added": added, "removed": removed, "changed": changed}


def print_report(result: dict, old: dict, new: dict) -> None:
    if not result["added"] and not result["removed"] and not result["changed"]:
        print("No changes detected on the source map.")
        return

    print("Changes detected on the UK Eye Casualty Services source map:\n")

    if result["added"]:
        print(f"ADDED ({len(result['added'])}):")
        for key in result["added"]:
            e = new[key]
            print(f"  - {e['name']} [{e['serviceLevel']}] at {e['lat']}, {e['lon']}")
        print()

    if result["removed"]:
        print(f"REMOVED ({len(result['removed'])}):")
        for key in result["removed"]:
            e = old[key]
            print(f"  - {e['name']} (was at {e['lat']}, {e['lon']})")
        print()

    if result["changed"]:
        print(f"CHANGED ({len(result['changed'])}):")
        for item in result["changed"]:
            print(f"  - {item['name']}")
            for field, vals in item["fields"].items():
                old_val = re.sub(r"\s+", " ", str(vals["old"]))[:120]
                new_val = re.sub(r"\s+", " ", str(vals["new"]))[:120]
                print(f"      {field}:")
                print(f"        was: {old_val}")
                print(f"        now: {new_val}")
        print()


def main() -> int:
    save_baseline = "--save-baseline" in sys.argv

    try:
        kml_bytes = fetch_kml()
    except Exception as exc:
        print(f"Failed to fetch source map: {exc}", file=sys.stderr)
        return 2

    new_entries = parse_placemarks(kml_bytes)

    if save_baseline:
        save_snapshot(new_entries)
        print(f"Saved baseline snapshot with {len(new_entries)} entries.")
        return 0

    old_entries = load_snapshot()
    if not old_entries:
        print("No existing snapshot found -- run with --save-baseline first.", file=sys.stderr)
        return 2

    result = diff(old_entries, new_entries)
    print_report(result, old_entries, new_entries)

    has_changes = bool(result["added"] or result["removed"] or result["changed"])
    return 1 if has_changes else 0


if __name__ == "__main__":
    sys.exit(main())
