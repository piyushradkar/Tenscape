import urllib.request
import json

url = "https://data.ontario.ca/api/3/action/package_search?q=mining&rows=50"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as res:
        data = json.loads(res.read().decode('utf-8'))
        results = data.get('result', {}).get('results', [])
        print(f"Data Ontario Packages Found: {len(results)}")
        for pkg in results:
            print(f"- {pkg.get('name')}: {pkg.get('title')}")
            for r in pkg.get('resources', []):
                if any(ext in r.get('url', '').lower() for ext in ['.zip', '.geojson', '.shp', '.kml', '.gdb']):
                    print(f"   Resource: {r.get('name')} [{r.get('format')}] -> {r.get('url')}")
except Exception as e:
    print("Error:", e)
