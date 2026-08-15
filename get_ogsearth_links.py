import urllib.request
import re

url = "https://www.ontario.ca/page/ogsearth"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as res:
        html = res.read().decode('utf-8', errors='ignore')
        links = re.findall(r'https?://[^\s\"\'<>]+', html)
        filtered = [l for l in links if any(k in l.lower() for k in ['claim', 'zip', 'mndm', 'mlas', 'kml', 'geology'])]
        print(f"Found {len(filtered)} links:")
        for l in set(filtered)[:20]:
            print("  ", l)
except Exception as e:
    print("Error:", e)
