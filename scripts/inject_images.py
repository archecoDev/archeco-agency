#!/usr/bin/env python3
"""
inject_images.py
Injecte les images manquantes dans site_data.json pour 15 projets.
Exécuter depuis le dossier V3.2.0 :  python3 scripts/inject_images.py
"""

import json, re, sys, os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATH = os.path.join(BASE, "site_data.json")

with open(PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

def img_full(folder, fname, alt="detail"):
    return (
        f'<div class="pd-flow-item pd-image-full rv">'
        f'<div class="pd-flow-content">'
        f'<img src="/media/projects/{folder}/{fname}" alt="{alt}" loading="lazy" />'
        f'</div></div>'
    )

def img_2col(folder, f1, f2, alt1="detail", alt2="detail"):
    return (
        f'<div class="pd-flow-item">'
        f'<div class="pd-flow-grid">'
        f'<div class="pd-flow-grid-item rv"><img src="/media/projects/{folder}/{f1}" alt="{alt1}" loading="lazy" /></div>'
        f'<div class="pd-flow-grid-item rv"><img src="/media/projects/{folder}/{f2}" alt="{alt2}" loading="lazy" /></div>'
        f'</div></div>'
    )

END = '</div></section>'

TARGETS = {
    # slug : (folder, html_to_inject)
    "freelance":           ("freelance",                   img_full("freelance", "1.webp", "Freelance Association Platform")),
    "travel_agency":       ("travel_agency",               img_full("travel_agency", "1.webp", "Travel Agency Booking Platform")),
    "wowow_advertising":   ("wowow_advertising",           img_full("wowow_advertising", "1.webp", "WOWOW Advertising Platform")),
    "mixi_floating":       ("mixi_floating",               img_full("mixi_floating", "1.webp", "Mixi Floating UI")),
    "Weblio":              ("weblio-language-learning-app", img_full("weblio-language-learning-app", "1.webp", "Weblio Language Learning")),
    "license_app":         ("license_app",                 img_full("license_app", "1.webp", "License Manager App")),
    "car_design_cloth":    ("cloth-interior-concept-design", img_full("cloth-interior-concept-design", "1.webp", "Cloth HMI Concept")),
    "service_ec_platform": ("ec-platform-service-commerce", img_full("ec-platform-service-commerce", "1.webp", "EC Platform")),
    "fujitsu_shopping_app":("fujitsu-smart-shopping-app",  img_full("fujitsu-smart-shopping-app", "1.webp", "Fujitsu Smart Shopping")),
    "ur_app_redesigna":    ("ur_app_redesigna",            img_full("ur_app_redesigna", "1.webp", "UR Housing App")),
    "naked":               ("naked",                       img_full("naked", "1.webp", "Naked Inc Platform")),
    "influencer_ec":       ("influencer_ec",               img_full("influencer_ec", "1.webp", "Influencer EC Platform")),
    "scsk_hiroshima_bank": ("hiroshima-bank-digital-branch", img_full("hiroshima-bank-digital-branch", "1.webp", "Hiroshima Bank Digital")),
    "hairstylist_App":     ("hairstylist_App",             img_full("hairstylist_App", "1.webp", "Hairstylist App")),
    "carite":              ("carite",
        img_2col("carite", "2.webp", "3.webp", "Carite Detail", "Carite UI") +
        img_full("carite", "5.webp", "Carite Final")
    ),
}

modified = 0
errors = []

for slug, (folder, html_block) in TARGETS.items():
    proj = data["projects"].get(slug)
    if proj is None:
        errors.append(f"SLUG NOT FOUND: {slug}")
        continue

    content = proj.get("content", "")
    if not content.endswith(END):
        # Try to find and fix
        pos = content.rfind(END)
        if pos == -1:
            errors.append(f"NO </div></section> IN: {slug}")
            continue
        # Insert before last END
        new_content = content[:pos] + html_block + content[pos:]
    else:
        # Insert before the final END
        new_content = content[:-len(END)] + html_block + END

    proj["content"] = new_content
    modified += 1
    print(f"  ✅ {slug}")

print(f"\nModifiés: {modified}/{len(TARGETS)}")
if errors:
    for e in errors:
        print(f"  ❌ {e}")

with open(PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"\n✅ site_data.json sauvegardé ({os.path.getsize(PATH)//1024} KB)")
