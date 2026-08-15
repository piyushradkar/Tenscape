import urllib.request
import json

url = "https://data.ontario.ca/api/3/action/package_show?id=mining-claims-information-database"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as res:
        data = json.loads(res.read().decode('utf-8'))
        pkg = data.get('result', {})
        print(f"Package Title: {pkg.get('title')}")
        for res_item in pkg.get('resources', []):
            print(f"  [{res_item.get('format')}] {res_item.get('name')} -> {res_item.get('url')}")
except Exception as e:
    print("Error 1:", e)

url2 = "https://data.ontario.ca/api/3/action/package_show?id=ministry-of-northern-development-and-mines-mining-claims"
try:
    req = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as res:
        data = json.loads(res.read().decode('utf-8'))
        pkg = data.get('result', {})
        print(f"\nPackage Title: {pkg.get('title')}")
        for res_item in pkg.get('resources', []):
            print(f"  [{res_item.get('format')}] {res_item.get('name')} -> {res_item.get('url')}")
except Exception as e:
    print("Error 2:", e)
