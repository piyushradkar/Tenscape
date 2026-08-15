import shapefile
import json
import os

shp_cell = r"C:\Users\samru\Python\Tenement Marketplace\ONT_Operational_shp\MLAS_Operational_GIS_Data\Operational_Cell_Claims.shp"
shp_tenure = r"C:\Users\samru\Python\Tenement Marketplace\ONT_Operational_shp\MLAS_Operational_GIS_Data\Mining_Land_Tenure.shp"
out_dir = r"C:\Users\samru\Python\Tenement Marketplace\data"

os.makedirs(out_dir, exist_ok=True)

def shape_to_geojson_geometry(shape):
    pts = shape.points
    parts = list(shape.parts) + [len(pts)]
    rings = []
    for i in range(len(parts) - 1):
        ring = pts[parts[i]:parts[i+1]]
        formatted_ring = [[round(p[0], 5), round(p[1], 5)] for p in ring]
        if len(formatted_ring) >= 3:
            rings.append(formatted_ring)
    
    if len(rings) == 1:
        return {"type": "Polygon", "coordinates": rings}
    elif len(rings) > 1:
        return {"type": "MultiPolygon", "coordinates": [[r] for r in rings]}
    return None

def convert_ontario_claims():
    categories = {
        "ontario_expl_granted": [],
        "ontario_expl_appl": []
    }

    # Deduplicate shapes by TENURE_NUM
    grouped_records = {}

    print("Reading Ontario 393,347 Cell Claims...")
    sf_cell = shapefile.Reader(shp_cell)
    fields_cell = [f[0] for f in sf_cell.fields[1:]]

    for sr in sf_cell.shapeRecords():
        geom = shape_to_geojson_geometry(sr.shape)
        if not geom:
            continue

        raw_rec = list(sr.record)
        rec = dict(zip(fields_cell, raw_rec))

        tenure_num = str(rec.get("TENURE_NUM") or "ONT-CLAIM")
        
        if tenure_num not in grouped_records:
            grouped_records[tenure_num] = {
                "geom": geom,
                "rec": rec,
                "is_lease": False
            }

    print(f"Processed {len(grouped_records)} unique Ontario Cell Claims.")

    # Also sample Mining Land Tenure leases
    print("Reading Ontario 22,938 Mining Land Tenures...")
    sf_tenure = shapefile.Reader(shp_tenure)
    fields_tenure = [f[0] for f in sf_tenure.fields[1:]]

    for sr in sf_tenure.shapeRecords():
        geom = shape_to_geojson_geometry(sr.shape)
        if not geom:
            continue

        raw_rec = list(sr.record)
        rec = dict(zip(fields_tenure, raw_rec))

        tenure_num = str(rec.get("TENURE_NUM") or "ONT-LEASE")
        
        if tenure_num not in grouped_records:
            grouped_records[tenure_num] = {
                "geom": geom,
                "rec": rec,
                "is_lease": True
            }

    print(f"Total Unique Ontario Tenements Indexed: {len(grouped_records)}")

    # Format features into GeoJSON
    for idx, (tenure_num, data) in enumerate(grouped_records.items()):
        rec = data["rec"]
        is_lease = data["is_lease"]
        
        if is_lease:
            title_type = rec.get("TITLE_TY_1") or rec.get("TITLE_TYPE") or "Ontario Mining Lease"
            status = rec.get("STATUS") or "Active"
            issue_date = rec.get("TAX_RENT_E") or rec.get("EXPIRY_DAT")
            anniv_date = rec.get("EXPIRY_DAT")
            holder = rec.get("HOLDER") or "Registered Holder"
            area_ha = rec.get("AREA_IN_HE") or 0.0
            area_str = f"{area_ha:.1f} Ha"
        else:
            title_type = rec.get("TITLE_TY_1") or rec.get("TITLE_TYPE") or "Single Cell Mining Claim"
            status = rec.get("TENURE_S_1") or rec.get("TENURE_STA") or "Active"
            issue_date = rec.get("ISSUE_DATE")
            anniv_date = rec.get("ANNIVERSAR") or rec.get("CLAIM_DUE_")
            holder = rec.get("HOLDER") or "Registered Holder"
            area_str = "16–25 Ha (Cell)"

        is_active = status == "Active" or status == "A"
        cat_key = "ontario_expl_granted" if is_active else "ontario_expl_appl"
        cat_name = f"Ontario {title_type}"

        issue_str = issue_date.isoformat() if hasattr(issue_date, 'isoformat') else (str(issue_date) if issue_date else "Recorded")
        anniv_str = anniv_date.isoformat() if hasattr(anniv_date, 'isoformat') else (str(anniv_date) if anniv_date else "Active")

        feature = {
            "type": "Feature",
            "id": f"ONT_{idx}",
            "properties": {
                "titleId": f"CLAIM {tenure_num}" if not tenure_num.startswith("CLAIM") else tenure_num,
                "tenureType": title_type,
                "status": status,
                "category": cat_name,
                "owner": holder,
                "dateGrant": issue_str,
                "dateExpiry": anniv_str,
                "areaDisplay": area_str,
                "jurisdiction": "ONT"
            },
            "geometry": data["geom"]
        }
        categories[cat_key].append(feature)

    for cat_key, features in categories.items():
        geojson = {
            "type": "FeatureCollection",
            "name": cat_key,
            "features": features
        }
        out_path = os.path.join(out_dir, f"{cat_key}.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(geojson, f, separators=(',', ':'))

        size_mb = os.path.getsize(out_path) / (1024 * 1024)
        print(f"Created {cat_key}.json: {len(features)} features ({size_mb:.2f} MB)")

if __name__ == "__main__":
    convert_ontario_claims()
