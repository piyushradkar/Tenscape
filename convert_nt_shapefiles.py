import shapefile
import json
import os

shp_dir = r"C:\Users\samru\Python\Tenement Marketplace\NT_MineralTitles_shp"
out_dir = r"C:\Users\samru\Python\Tenement Marketplace\data"

os.makedirs(out_dir, exist_ok=True)

files_to_process = [
    ("MIN_TITLE_EXPL_GRNT.shp", "nt_expl_granted.json", "Granted EL"),
    ("MIN_TITLE_EXPL_APPL.shp", "nt_expl_appl.json", "Application EL"),
    ("MIN_TITLE_PROD_GRNT.shp", "nt_prod_granted.json", "Granted ML"),
    ("MIN_TITLE_PROD_APPL.shp", "nt_prod_appl.json", "Application ML"),
    ("RESERVES_MINERALS.shp", "nt_reserves.json", "NT Reserved Land")
]

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

def process_file(shp_name, out_name, default_category):
    shp_path = os.path.join(shp_dir, shp_name)
    if not os.path.exists(shp_path):
        print(f"Skipping {shp_name}: file not found")
        return

    sf = shapefile.Reader(shp_path)
    fields = [f[0] for f in sf.fields[1:]]

    # Group shape records by TITLEID to deduplicate stacked geometries
    grouped_by_title = {}
    for sr in sf.shapeRecords():
        geom = shape_to_geojson_geometry(sr.shape)
        if not geom:
            continue

        raw_rec = list(sr.record)
        rec = {}
        for f_name, f_val in zip(fields, raw_rec):
            if hasattr(f_val, 'isoformat'):
                rec[f_name] = f_val.isoformat()
            elif isinstance(f_val, bytes):
                rec[f_name] = f_val.decode('utf-8', 'ignore').strip()
            elif isinstance(f_val, str):
                rec[f_name] = f_val.strip()
            else:
                rec[f_name] = f_val

        tid = rec.get("TITLEID") or f"NT-{rec.get('TI_TYPE_CD', '')}{rec.get('TI_NUMBER', '')}"
        
        if tid not in grouped_by_title:
            grouped_by_title[tid] = {
                "geom": geom,
                "records": []
            }
        grouped_by_title[tid]["records"].append(rec)

    features = []
    for idx, (tid, data) in enumerate(grouped_by_title.items()):
        recs = data["records"]
        primary_rec = recs[0]
        
        # Consolidate Owners / Holders
        holders = []
        agents = []
        for r in recs:
            pname = r.get("PTY_NAME")
            pct = r.get("PCT")
            htype = r.get("HLD_TYPE")
            if pname:
                if htype == "Agent":
                    agents.append(f"{pname} (Agent)")
                else:
                    pct_str = f" ({pct:.0f}%)" if pct and pct > 0 else ""
                    holders.append(f"{pname}{pct_str}")
        
        full_owner_str = ", ".join(holders) if holders else (primary_rec.get("PTY_NAME") or "Not Listed")
        if agents and not holders:
            full_owner_str += f" [Agent: {', '.join(agents)}]"

        # Format Area
        area_sqkm = primary_rec.get("AREA_SQKM") or 0.0
        area_units = primary_rec.get("AREA_UNITS") or 0.0
        area_meas = primary_rec.get("AREA_MEAS") or ""

        if area_sqkm and area_sqkm > 0:
            area_str = f"{area_sqkm:.1f} km²"
        elif area_units and area_units > 0:
            if area_meas in ["HECT", "HECTARES"]:
                area_str = f"{area_units:.0f} Ha"
            elif area_meas in ["SBKS", "SUB-BLOCKS"]:
                area_str = f"{area_units:.0f} Sub-Blocks"
            else:
                area_str = f"{area_units:.0f} {area_meas}"
        else:
            area_str = "Not Specified"

        feature = {
            "type": "Feature",
            "id": f"{default_category.replace(' ', '_')}_{idx}",
            "properties": {
                "titleId": tid,
                "tenureType": primary_rec.get("TI_TYPE_CD", ""),
                "tenureNum": primary_rec.get("TI_NUMBER", ""),
                "status": primary_rec.get("STATUS") or "Active",
                "tsType": primary_rec.get("TS_TYPE", default_category),
                "dateEffect": primary_rec.get("DT_EFFECT") or "",
                "dateGrant": primary_rec.get("DT_GRNT") or primary_rec.get("DT_CONSENT") or "",
                "dateExpiry": primary_rec.get("DT_EXPIRY") or primary_rec.get("DT_VT_FINL") or "N/A",
                "owner": full_owner_str,
                "holderType": primary_rec.get("HLD_TYPE") or "Holder",
                "areaDisplay": area_str,
                "category": default_category,
                "jurisdiction": "NT"
            },
            "geometry": data["geom"]
        }
        features.append(feature)

    geojson = {
        "type": "FeatureCollection",
        "name": default_category,
        "features": features
    }

    out_path = os.path.join(out_dir, out_name)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(geojson, f, separators=(',', ':'))

    size_mb = os.path.getsize(out_path) / (1024 * 1024)
    print(f"Created {out_name}: {len(features)} unique tenement features ({size_mb:.2f} MB)")

if __name__ == "__main__":
    for shp_name, out_name, category in files_to_process:
        process_file(shp_name, out_name, category)
