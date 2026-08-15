import urllib.request
import re

url = "https://www.geologyontario.mndm.gov.on.ca/ogsearth.html"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as res:
        html = res.read().decode('utf-8', errors='ignore')
        matches = re.findall(r'href=[\"\']([^\'\"]+\.(?:zip|kml|kmz))[\"\']', html, re.I)
        print(f"Found {len(matches)} data file links on OGSEarth:")
        for m in set(matches):
            if any(k in m.lower() for k in ['claim', 'tenure', 'mlas', 'land']):
                print("  ->", m)
except Exception as e:
    print("Error:", e)
