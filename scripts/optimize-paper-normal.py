#!/usr/bin/env python3
"""Rebuild the paper normal map from the original Git asset (requires Pillow)."""

from io import BytesIO
from pathlib import Path
import subprocess

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent
SOURCE_REVISION = "0eca5b5a10c4886484ae003abe1d5e823c2edf51"
source = subprocess.check_output(
    ["git", "show", f"{SOURCE_REVISION}:public/paper-normal.png"], cwd=ROOT)
image = Image.open(BytesIO(source))
# A 256 CSS-pixel tile at the 1.75 DPR cap samples the original's lower mip levels.
for size in (1024, 512):
    image = image.resize((size, size), Image.Resampling.BOX)
output = ROOT / "assets.local/paper-normal.png"
output.parent.mkdir(exist_ok=True)
image.save(output, optimize=True)
print(f"paper-normal: {len(source):,} -> {output.stat().st_size:,} bytes (512x512)")
