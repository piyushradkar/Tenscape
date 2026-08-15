import json
import os

out_dir = r"C:\Users\samru\Python\Tenement Marketplace\data"
os.makedirs(out_dir, exist_ok=True)

# Generate Ontario Mining Claims GeoJSON Datasets (Sudbury, Timmins Abitibi, Red Lake, Ring of Fire)
def generate_ontario_cadastre():
    claims_granted = [
        # 1. Sudbury Basin - Nickel-Copper-PGE District
        {
            "id": "ONT_CLAIM_101",
            "titleId": "CLAIM 4028101",
            "township": "Snider & Creighton Twp",
            "district": "Sudbury Mining Division",
            "owner": "VALE CANADA LIMITED (100%)",
            "status": "Active (Granted Claim)",
            "category": "Ontario Unpatented Mining Claim",
            "dateGrant": "2018-04-10",
            "dateExpiry": "2028-04-10",
            "areaDisplay": "184.5 Ha",
            "jurisdiction": "ONT",
            "bounds": [
                [46.480, -81.120], [46.480, -81.070],
                [46.440, -81.070], [46.440, -81.120]
            ]
        },
        {
            "id": "ONT_CLAIM_102",
            "titleId": "CLAIM 4028102",
            "township": "Levack Twp",
            "district": "Sudbury Mining Division",
            "owner": "GLENCORE CANADA CORPORATION (100%)",
            "status": "Active (Granted Claim)",
            "category": "Ontario Mining Lease",
            "dateGrant": "2016-09-15",
            "dateExpiry": "2036-09-15",
            "areaDisplay": "210.0 Ha",
            "jurisdiction": "ONT",
            "bounds": [
                [46.650, -81.380], [46.650, -81.320],
                [46.610, -81.320], [46.610, -81.380]
            ]
        },
        # 2. Timmins Abitibi Gold Belt
        {
            "id": "ONT_CLAIM_103",
            "titleId": "CLAIM 5102941",
            "township": "Tisdale & Whitney Twp",
            "district": "Porcupine Mining Division",
            "owner": "NEWMONT CANADA FN HOLDINGS / AGNICO EAGLE",
            "status": "Active (Granted Claim)",
            "category": "Ontario Unpatented Mining Claim",
            "dateGrant": "2019-11-02",
            "dateExpiry": "2029-11-02",
            "areaDisplay": "165.2 Ha",
            "jurisdiction": "ONT",
            "bounds": [
                [48.490, -81.310], [48.490, -81.250],
                [48.450, -81.250], [48.450, -81.310]
            ]
        },
        {
            "id": "ONT_CLAIM_104",
            "titleId": "CLAIM 5102942",
            "township": "Matheson Twp",
            "district": "Porcupine Mining Division",
            "owner": "PAN AMERICAN SILVER CORP",
            "status": "Active (Granted Claim)",
            "category": "Ontario Mining Lease",
            "dateGrant": "2017-06-20",
            "dateExpiry": "2037-06-20",
            "areaDisplay": "290.0 Ha",
            "jurisdiction": "ONT",
            "bounds": [
                [48.550, -81.180], [48.550, -81.120],
                [48.510, -81.120], [48.510, -81.180]
            ]
        },
        # 3. Red Lake High-Grade Gold District
        {
            "id": "ONT_CLAIM_105",
            "titleId": "CLAIM 6291041",
            "township": "Dome & Balmer Twp",
            "district": "Red Lake Mining Division",
            "owner": "EVOLUTION MINING GOLD CORP (100%)",
            "status": "Active (Granted Claim)",
            "category": "Ontario Unpatented Mining Claim",
            "dateGrant": "2020-01-14",
            "dateExpiry": "2030-01-14",
            "areaDisplay": "195.8 Ha",
            "jurisdiction": "ONT",
            "bounds": [
                [51.040, -93.850], [51.040, -93.780],
                [51.000, -93.780], [51.000, -93.850]
            ]
        },
        # 4. Ring of Fire Chromite-Nickel District
        {
            "id": "ONT_CLAIM_106",
            "titleId": "CLAIM 7840191",
            "township": "McFaulds Lake Area",
            "district": "Thunder Bay Mining Division",
            "owner": "WYLOO METALS / RING OF FIRE METALS",
            "status": "Active (Granted Claim)",
            "category": "Ontario Unpatented Mining Claim",
            "dateGrant": "2021-05-18",
            "dateExpiry": "2031-05-18",
            "areaDisplay": "320.0 Ha",
            "jurisdiction": "ONT",
            "bounds": [
                [53.230, -86.350], [53.230, -86.250],
                [53.180, -86.250], [53.180, -86.350]
            ]
        }
    ]

    claims_appl = [
        {
            "id": "ONT_APPL_201",
            "titleId": "APPL 8901241",
            "township": "Greenwater Lake Area",
            "district": "Thunder Bay Mining Division",
            "owner": "FRONTIER LITHIUM INC (Applicant)",
            "status": "Pending Application",
            "category": "Ontario Mining Claim Application",
            "dateGrant": "Pending Review",
            "dateExpiry": "N/A",
            "areaDisplay": "240.0 Ha",
            "jurisdiction": "ONT",
            "bounds": [
                [50.550, -90.250], [50.550, -90.180],
                [50.510, -90.180], [50.510, -90.250]
            ]
        },
        {
            "id": "ONT_APPL_202",
            "titleId": "APPL 8901242",
            "township": "Borden Twp",
            "district": "Sault Ste. Marie Division",
            "owner": "PROSPECT RIDGE RESOURCES",
            "status": "Pending Application",
            "category": "Ontario Mining Claim Application",
            "dateGrant": "Pending Review",
            "dateExpiry": "N/A",
            "areaDisplay": "175.0 Ha",
            "jurisdiction": "ONT",
            "bounds": [
                [47.880, -83.450], [47.880, -83.380],
                [47.840, -83.380], [47.840, -83.450]
            ]
        }
    ]

    # Convert to GeoJSON format
    def to_geojson_features(items):
        features = []
        for item in items:
            pts = [[b[1], b[0]] for b in item["bounds"]]
            pts.append(pts[0]) # Close ring
            feature = {
                "type": "Feature",
                "id": item["id"],
                "properties": {
                    "titleId": item["titleId"],
                    "category": item["category"],
                    "status": item["status"],
                    "owner": item["owner"],
                    "dateGrant": item["dateGrant"],
                    "dateExpiry": item["dateExpiry"],
                    "areaDisplay": item["areaDisplay"],
                    "jurisdiction": "ONT",
                    "district": item["district"]
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [pts]
                }
            }
            features.append(feature)
        return features

    granted_geojson = {
        "type": "FeatureCollection",
        "name": "ontario_expl_granted",
        "features": to_geojson_features(claims_granted)
    }

    appl_geojson = {
        "type": "FeatureCollection",
        "name": "ontario_expl_appl",
        "features": to_geojson_features(claims_appl)
    }

    with open(os.path.join(out_dir, "ontario_expl_granted.json"), "w", encoding="utf-8") as f:
        json.dump(granted_geojson, f, indent=2)

    with open(os.path.join(out_dir, "ontario_expl_appl.json"), "w", encoding="utf-8") as f:
        json.dump(appl_geojson, f, indent=2)

    print("Created ontario_expl_granted.json and ontario_expl_appl.json successfully!")

if __name__ == "__main__":
    generate_ontario_cadastre()
