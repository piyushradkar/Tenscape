import shapefile
import json
import os

shp_path = r"C:\Users\samru\Python\Tenement Marketplace\WA_Tenements\CurrentTenements.shp"
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

def convert_wa_tenements():
    if not os.path.exists(shp_path):
        print("WA shapefile not found")
        return

    sf = shapefile.Reader(shp_path)
    fields = [f[0] for f in sf.fields[1:]]

    categories = {
        "wa_expl_granted": [],
        "wa_expl_appl": [],
        "wa_prod_granted": [],
        "wa_prod_appl": []
    }

    # Deduplicate shapes by FMT_TENID
    grouped_records = {}

    print("Reading 30,458 WA shapefile records...")
    for sr in sf.shapeRecords():
        geom = shape_to_geojson_geometry(sr.shape)
        if not geom:
            continue

        raw_rec = list(sr.record)
        rec = dict(zip(fields, raw_rec))

        tenid = rec.get("FMT_TENID") or rec.get("TENID") or "WA-UNKNOWN"
        
        if tenid not in grouped_records:
            grouped_records[tenid] = {
                "geom": geom,
                "rec": rec
            }

    print(f"Processed {len(grouped_records)} unique WA tenement titles.")

    for idx, (tenid, data) in enumerate(grouped_records.items()):
        rec = data["rec"]
        ttype = (rec.get("TYPE") or "").upper()
        status = (rec.get("TENSTATUS") or "LIVE").upper()
        
        is_expl = any(k in ttype for k in ["EXPLORATION", "PROSPECTING", "RETENTION"])
        is_prod = any(k in ttype for k in ["MINING LEASE", "MINERAL LEASE", "COAL MINING", "GENERAL PURPOSE"])
        is_live = status == "LIVE"

        if is_expl and is_live:
            cat_key = "wa_expl_granted"
            cat_name = "Granted Exploration"
        elif is_expl and not is_live:
            cat_key = "wa_expl_appl"
            cat_name = "Exploration Application"
        elif is_prod and is_live:
            cat_key = "wa_prod_granted"
            cat_name = "Granted Mining Lease"
        elif is_prod and not is_live:
            cat_key = "wa_prod_appl"
            cat_name = "Mining Lease Application"
        else:
            cat_key = "wa_expl_granted" if is_live else "wa_expl_appl"
            cat_name = "WA Tenement"

        owner = rec.get("ALL_HOLDER") or rec.get("HOLDER1") or "Not Listed"
        grant_date = rec.get("GRANTDATE")
        grant_str = grant_date.isoformat() if hasattr(grant_date, 'isoformat') else (str(grant_date) if grant_date else "Pending")
        
        exp_date = rec.get("ENDDATE")
        exp_str = exp_date.isoformat() if hasattr(exp_date, 'isoformat') else (str(exp_date) if exp_date else "N/A")

        area = rec.get("LEGAL_AREA") or 0.0
        unit = rec.get("UNIT_OF_ME") or "HA."
        if unit == "HA.":
            area_str = f"{area:.0f} Ha"
        elif unit == "KM2":
            area_str = f"{area:.1f} km²"
        else:
            area_str = f"{area:.0f} {unit}"

        feature = {
            "type": "Feature",
            "id": f"WA_{idx}",
            "properties": {
                "titleId": tenid,
                "tenureType": ttype,
                "status": status,
                "category": cat_name,
                "owner": owner,
                "dateGrant": grant_str,
                "dateExpiry": exp_str,
                "areaDisplay": area_str,
                "jurisdiction": "WA"
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
    convert_wa_tenements()
