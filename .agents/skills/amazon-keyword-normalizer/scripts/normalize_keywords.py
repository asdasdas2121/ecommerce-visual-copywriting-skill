#!/usr/bin/env python3
"""Deterministically normalize keyword candidate CSV rows without semantic deletion."""

from __future__ import annotations

import argparse
import csv
import re
from collections import OrderedDict
from pathlib import Path


def normalize(value: str) -> str:
    value = value.strip().lower().replace("–", "-").replace("—", "-")
    value = re.sub(r"[_/]+", " ", value)
    value = re.sub(r"[^a-z0-9+&' -]+", " ", value)
    value = re.sub(r"\s*-\s*", "-", value)
    return re.sub(r"\s+", " ", value).strip(" -")


def split_set(value: str) -> set[str]:
    return {x.strip() for x in re.split(r"[|;,]", value or "") if x.strip()}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    with args.input.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))

    merged: OrderedDict[str, dict] = OrderedDict()
    for row in rows:
        raw = row.get("raw_phrase") or row.get("keyword") or row.get("canonical_phrase") or ""
        canonical = normalize(raw)
        if not canonical:
            continue
        item = merged.setdefault(canonical, {
            "canonical_phrase": canonical,
            "original_variants": set(),
            "competitor_ids": set(),
            "source_fields": set(),
            "occurrence_count": 0,
        })
        item["original_variants"].add(raw.strip())
        item["competitor_ids"].update(split_set(row.get("competitor_ids", "")))
        item["source_fields"].update(split_set(row.get("source_fields", "")))
        try:
            item["occurrence_count"] += int(row.get("occurrence_count", "1") or 1)
        except ValueError:
            item["occurrence_count"] += 1

    fields = ["canonical_phrase", "original_variants", "concept_group", "competitor_ids",
              "competitor_count", "occurrence_count", "source_fields", "brand_flag",
              "normalization_notes"]
    with args.output.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for item in merged.values():
            writer.writerow({
                "canonical_phrase": item["canonical_phrase"],
                "original_variants": " | ".join(sorted(item["original_variants"])),
                "concept_group": item["canonical_phrase"],
                "competitor_ids": " | ".join(sorted(item["competitor_ids"])),
                "competitor_count": len(item["competitor_ids"]),
                "occurrence_count": item["occurrence_count"],
                "source_fields": " | ".join(sorted(item["source_fields"])),
                "brand_flag": "review",
                "normalization_notes": "Exact-form normalization only; review semantics and brands manually.",
            })


if __name__ == "__main__":
    main()
