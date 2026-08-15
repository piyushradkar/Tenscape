import urllib.request
import json
import re

url = "https://data.ontario.ca/api/3/action/package_search?q=mining+claims&rows=10"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as res:
        data = json.loads(res.read().decode('utf-8'))
        results = data.get('result', {}).get('results', [])
        print(f"Data Ontario Package Count: {len(results)}")
        for pkg in results:
            print(f"\nPackage: {pkg.get('title')}")
            for res_item in pkg.get('resources', []):
                print(f"  Format: {res_item.get('format')} -> {res_item.get('url')}")
except Exception as e:
    print("Error querying Ontario Data API:", e)
