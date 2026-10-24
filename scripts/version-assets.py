#!/usr/bin/env python3
"""Refresh local CSS and JavaScript URLs when their contents change."""

import hashlib
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parent.parent
ASSET_URL = re.compile(r'((?:href|src)=")(?P<path>assets/[^"?]+\.(?:css|js))(?:\?[^"\s]*)?("\s*>)')


def version(match):
    asset = ROOT / match['path']
    digest = hashlib.sha256(asset.read_bytes()).hexdigest()[:12]
    return f'{match[1]}{match["path"]}?v={digest}{match[3]}'


for page in sorted(ROOT.glob('*.html')):
    original = page.read_text()
    updated = ASSET_URL.sub(version, original)
    if updated != original:
        page.write_text(updated)
        print(f'Updated asset versions in {page.name}')
