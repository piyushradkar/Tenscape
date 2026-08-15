import urllib.request
import os

url = "https://www.geologyontario.mndm.gov.on.ca/mines/documents/claimaps/mlas_operational_gis_data.zip"
out_path = r"C:\Users\samru\Python\Tenement Marketplace\mlas_operational_gis_data.zip"

print(f"Downloading {url}...")
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req, timeout=120) as response, open(out_path, 'wb') as out_file:
        chunk_size = 1024 * 1024
        downloaded = 0
        while True:
            chunk = response.read(chunk_size)
            if not chunk:
                break
            out_file.write(chunk)
            downloaded += len(chunk)
            print(f"Downloaded {downloaded / (1024*1024):.1f} MB...", end="\r")
    print(f"\nDownload finished! Total size: {os.path.getsize(out_path)/(1024*1024):.2f} MB")
except Exception as e:
    print("\nDownload error:", e)
