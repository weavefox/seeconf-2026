#!/usr/bin/env python3
"""
Batch remove checkerboard pattern backgrounds from portrait images.
Detects the light-colored checkerboard pattern via flood fill from corners,
then makes those pixels transparent while preserving the watercolor shape and person.
"""

import sys
import os
from collections import deque
from PIL import Image
import numpy as np


def flood_fill_background_v2(arr, threshold=230):
    """
    Flood fill from all four corners of an RGB numpy array.
    Marks connected pixels whose all channels are >= threshold as background.
    Uses 8-connectivity for better pattern traversal.

    Returns a boolean mask: True = background (should be transparent).
    """
    h, w = arr.shape[:2]
    bg_mask = np.zeros((h, w), dtype=bool)

    # Pixels where ALL channels are >= threshold are "background-like"
    bg_like = np.all(arr[:, :, :3] >= threshold, axis=2)

    # BFS flood fill from all border pixels that are bg_like
    queue = deque()

    for x in range(w):
        for y_edge in [0, h - 1]:
            if bg_like[y_edge, x] and not bg_mask[y_edge, x]:
                bg_mask[y_edge, x] = True
                queue.append((y_edge, x))
    for y in range(h):
        for x_edge in [0, w - 1]:
            if bg_like[y, x_edge] and not bg_mask[y, x_edge]:
                bg_mask[y, x_edge] = True
                queue.append((y, x_edge))

    # 8-connectivity BFS
    directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
    while queue:
        cy, cx = queue.popleft()
        for dy, dx in directions:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w:
                if not bg_mask[ny, nx] and bg_like[ny, nx]:
                    bg_mask[ny, nx] = True
                    queue.append((ny, nx))

    return bg_mask


def remove_checkerboard_background(img, threshold=230):
    """
    Remove checkerboard pattern background from an RGB image.
    Two-pass approach:
      1. Flood fill from corners to remove the main connected background.
      2. Global detection of residual checkerboard-like pixels (light, low-saturation)
         that were isolated from the border by the watercolor/person.
    Returns an RGBA image with transparent background.
    """
    arr = np.array(img.convert("RGB"))
    bg_mask = flood_fill_background_v2(arr, threshold)

    # Pass 2: Global detection of residual checkerboard-like pixels
    # Checkerboard pixels: all channels >= 225 AND very low saturation (near gray)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    chan_min = np.minimum(np.minimum(r, g), b)
    chan_max = np.maximum(np.maximum(r, g), b)
    saturation = chan_max.astype(int) - chan_min.astype(int)
    all_light = (r >= 225) & (g >= 225) & (b >= 225)
    low_sat = saturation < 20
    checker_like = all_light & low_sat

    # Remove ALL checker_like pixels globally (not just near borders)
    # Safe because watercolor and person have higher saturation or darker values
    bg_mask = bg_mask | checker_like

    # Create RGBA
    rgba = np.dstack([arr, np.ones(arr.shape[:2], dtype=np.uint8) * 255])
    # Set alpha to 0 for background pixels
    rgba[bg_mask, 3] = 0

    # Feather the edge: for background pixels adjacent to content, reduce alpha
    content_mask = ~bg_mask
    # Multi-level dilation for smoother edges
    dilated = content_mask.copy()
    for _ in range(2):
        d = dilated.copy()
        d[1:, :] |= dilated[:-1, :]
        d[:-1, :] |= dilated[1:, :]
        d[:, 1:] |= dilated[:, :-1]
        d[:, :-1] |= dilated[:, 1:]
        dilated = d

    edge = dilated & bg_mask
    rgba[edge, 3] = 128

    # Second feather level
    dilated2 = dilated.copy()
    d2 = dilated2.copy()
    d2[1:, :] |= dilated2[:-1, :]
    d2[:-1, :] |= dilated2[1:, :]
    d2[:, 1:] |= dilated2[:, :-1]
    d2[:, :-1] |= dilated2[:, 1:]
    dilated2 = d2

    edge2 = dilated2 & bg_mask & ~edge
    rgba[edge2, 3] = 64

    return Image.fromarray(rgba, "RGBA")


def process_image(input_path, output_path, threshold=230):
    """Process a single image: remove checkerboard background and save as RGBA PNG."""
    img = Image.open(input_path)
    mode = img.mode

    if mode == "RGBA":
        alpha = img.split()[3]
        if alpha.getextrema()[0] < 255:
            # Already has transparency, just save as-is
            img.save(output_path)
            return "already-transparent"
        img = img.convert("RGB")

    result = remove_checkerboard_background(img, threshold)
    result.save(output_path)

    # Verify transparency
    arr = np.array(result)
    alpha = arr[:, :, 3]
    trans_ratio = (alpha == 0).sum() / alpha.size * 100
    return f"trans={trans_ratio:.1f}%"


def main():
    base = "/Users/caomengyuan/Library/Application Support/CodeFuse/state/agent-images/990a9649753fc3ae3b6a5a54dfddb64b937a7c27c16c28f4ba631289c7330081"
    out_dir = "/Users/caomengyuan/Documents/workspace/seeconf2026"

    files = [
        ("e155d7cc9094e089cddd562500bdf50fb977be7588f03e3c2e498d944bfd7ff6.png", "1793077166699-珊瑚红-水彩半身像-1024.png"),
        ("0e04591ec559f27055c9791cd22f68a6c4678ffefde672c1145d1119ce31b110.png", "1793077166699-水彩半身像-1024.png"),
        ("1828f06848a81104f2d55ed014e2684b9854fda9cf3b68ebec1f992988053f19.png", "1793077176328-水彩半身像-1024.png"),
        ("3b22e8f6e9d01ff41110b76ced96769ae53c132108df412bbc259bd7d59f824d.png", "1793077185801-珊瑚红-水彩半身像-1024.png"),
        ("174be2206889df71729cfd024b07fc4f997cdb97cc39705a08844ccdb9e82c83.png", "1793077185801-水彩半身像-1024.png"),
        ("b80a26885930aa020966c2fb817582747b50a4c6124ccd7e6925ab6f7afe3e9d.png", "1793077228717-珊瑚红-水彩半身像-1024.png"),
        ("93e01b8e1499d33cd976689476a17c44fd10708258fa0d6b480d8cc5c6891c20.png", "1793077228717-水彩半身像-1024.png"),
        ("f5383f95a1fa764d2f4182ccf8a9ee6222d239fb737b5bc262221073c6ef34a8.png", "1793080515294-水彩半身像-1024.png"),
        ("30005be979c8fe41f7df53170c275fb843dc395a138a0c58b16e7839dfa5f3ee.png", "1793080579003-珊瑚红-水彩半身像-1024.png"),
        ("d4c912de7248a19e35faa7a89bd66c4e1fbdd98625b12d528cdd3befc66ef8a1.png", "1793080579003-水彩半身像-1024.png"),
        ("7dc91dad4064b6f17a5fb6170e2737f99f2b8120dfb3c360c2e58793b626491c.png", "1793084801293-水彩半身像-1024.png"),
        ("87d4bc24dd396aa8eff50422e34ccce739423f81bfce160c53d3ba13c4d5f973.png", "1793092796362-水彩半身像-1024.png"),
        ("a9786904d4577bdff0d19caf8d54a4eb18308819d9897fa6f4af691c1a5f5a3b.png", "图片-水彩半身像-1024.png"),
    ]

    for src_name, out_name in files:
        src_path = os.path.join(base, src_name)
        out_path = os.path.join(out_dir, out_name)
        status = process_image(src_path, out_path, threshold=230)
        print(f"{out_name:50s} -> {status}")


if __name__ == "__main__":
    main()
