#!/usr/bin/env python3
"""Rebuild the lossless RGBA8 LUT atlases from the original Git assets.

Run `python3 scripts/convert-luts.py` from any directory. Requires only Python's
standard library and the source revision in the local Git object database.
"""

import math
from pathlib import Path
import struct
import subprocess
import zlib


ROOT = Path(__file__).resolve().parent.parent
SOURCE_REVISION = "0eca5b5a10c4886484ae003abe1d5e823c2edf51"
PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"


def atlas_from_3dl(source):
    rows = [
        [int(value) for value in line.split()]
        for line in source.decode().splitlines()
        if line.strip() and not line.lstrip().startswith("#")
    ]
    size = len(rows.pop(0))
    if len(rows) != size ** 3 or any(len(row) != 3 for row in rows):
        raise ValueError("Invalid 3DL lattice")
    divisor = 2 ** math.ceil(math.log2(max(map(max, rows)) + 1)) - 1
    pixels = bytearray(size ** 3 * 4)
    for i, row in enumerate(rows):
        r, g, b = i // (size * size), i // size % size, i % size
        offset = (r + b * size + g * size * size) * 4
        for channel, value in enumerate(row):
            # Match JavaScript Math.round instead of Python's ties-to-even round.
            pixels[offset + channel] = math.floor(value / divisor * 255 + 0.5)
        pixels[offset + 3] = 255
    return size * size, size, pixels


def chunk(kind, payload):
    return (struct.pack(">I", len(payload)) + kind + payload
            + struct.pack(">I", zlib.crc32(kind + payload)))


def encode_png(width, height, pixels):
    stride = width * 4
    scanlines = bytearray()
    for y in range(height):
        row = pixels[y * stride:(y + 1) * stride]
        # Sub filtering compresses adjacent LUT values without changing bytes.
        scanlines.append(1)
        scanlines.extend((value - (row[x - 4] if x >= 4 else 0)) % 256
                         for x, value in enumerate(row))
    header = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    return (PNG_SIGNATURE + chunk(b"IHDR", header)
            + chunk(b"IDAT", zlib.compress(scanlines, 9))
            + chunk(b"IEND", b""))


def verify_png(png, expected):
    offset, compressed = 8, bytearray()
    while offset < len(png):
        length = struct.unpack_from(">I", png, offset)[0]
        kind, data = png[offset + 4:offset + 8], png[offset + 8:offset + 8 + length]
        if kind == b"IHDR":
            width, height = struct.unpack_from(">II", data)
        elif kind == b"IDAT":
            compressed.extend(data)
        offset += length + 12
    scanlines, decoded = zlib.decompress(compressed), bytearray()
    stride = width * 4
    for y in range(height):
        offset = y * (stride + 1)
        if scanlines[offset] != 1:
            raise ValueError("Expected PNG Sub filter")
        row = bytearray(scanlines[offset + 1:offset + 1 + stride])
        for x in range(4, stride):
            row[x] = (row[x] + row[x - 4]) % 256
        decoded.extend(row)
    if decoded != expected:
        raise ValueError("PNG pixels differ from the original RGBA8 atlas")


def main():
    output = ROOT / "assets.local"
    output.mkdir(exist_ok=True)
    for name in ("dry", "ink"):
        source = subprocess.check_output(
            ["git", "show", f"{SOURCE_REVISION}:public/{name}.3dl"], cwd=ROOT)
        width, height, pixels = atlas_from_3dl(source)
        png = encode_png(width, height, pixels)
        verify_png(png, pixels)
        (output / f"{name}-lut.png").write_bytes(png)
        print(f"{name}: {len(source):,} -> {len(png):,} bytes; "
              f"verified all {len(pixels):,} RGBA bytes ({width}x{height})")


if __name__ == "__main__":
    main()
