// ==========================================================================
// TENEMENT EXCHANGE - APPLICATION LOGIC & MAP INTERACTIVITY (MAIN.JS)
// ==========================================================================

// Sample Dataset of Verified Global Exploration Tenements
const TENEMENTS_DATA = [
  {
    id: "NT-EL32205",
    tenureId: "EL 32205",
    title: "Pine Creek Gold Project",
    otherCount: 3,
    location: "Pine Creek District, Northern Territory",
    jurisdiction: "NT",
    commodity: ["Au", "U"],
    stage: "Drill-Ready",
    status: "Granted",
    cadastreVerified: true,
    areaKm2: 178,
    blocks: 54,
    expiryDate: "2030-07-30",
    annualCommitment: 72000,
    priceDisplay: "From $380,000 AUD",
    priceVal: 380000,
    dealType: "Farm-In JV (70%)",
    dealDetails: "Spend $1.2M over 3 yrs to earn 70%",
    isFavorite: true,
    lat: -13.82,
    lng: 131.83,
    bounds: [
      [-13.75, 131.75],
      [-13.75, 131.90],
      [-13.90, 131.90],
      [-13.90, 131.75]
    ],
    description: "Located within the prolific Pine Creek Orogen. High-grade rock chips up to 14.2 g/t Au along anticlinal quartz vein structures."
  },
  {
    id: "NT-EL32628",
    tenureId: "EL 32628",
    title: "Tennant Creek IOCG Copper-Gold Claim",
    otherCount: 0,
    location: "Barkly Tableland, Northern Territory",
    jurisdiction: "NT",
    commodity: ["Cu", "Au", "REE"],
    stage: "Advanced Exploration",
    status: "Application",
    cadastreVerified: true,
    areaKm2: 245,
    blocks: 80,
    expiryDate: "2031-01-06",
    annualCommitment: 98000,
    priceDisplay: null,
    priceVal: 0,
    dealType: "100% Outright Sale",
    dealDetails: "100% Interest with 1.5% NSR Royalty retained",
    isFavorite: false,
    lat: -19.65,
    lng: 134.18,
    bounds: [
      [-19.55, 134.05],
      [-19.55, 134.30],
      [-19.75, 134.30],
      [-19.75, 134.05]
    ],
    description: "Strong ironstone gravity anomaly under shallow cover. Coincidental magnetic high analogue to Warrego & White Devil deposits."
  },
  {
    id: "WA-EL45-5892",
    tenureId: "E 45/5892",
    title: "Paterson South Gold-Copper Project",
    otherCount: 2,
    location: "Pilbara / Paterson Province, Western Australia",
    jurisdiction: "WA",
    commodity: ["Au", "Cu"],
    stage: "Advanced Exploration",
    status: "Granted",
    cadastreVerified: true,
    areaKm2: 145,
    blocks: 48,
    expiryDate: "2029-08-14",
    annualCommitment: 85000,
    priceDisplay: "$450,000 AUD",
    priceVal: 450000,
    dealType: "Farm-In JV (70%)",
    dealDetails: "Spend $1.5M over 3 yrs to earn 70%",
    isFavorite: false,
    lat: -21.65,
    lng: 122.20,
    bounds: [
      [-21.60, 122.12],
      [-21.60, 122.28],
      [-21.70, 122.28],
      [-21.70, 122.12]
    ],
    description: "Located 15km south of Telfer Gold Mine. Aeromagnetic anomaly indicates intrusive copper-gold target similar to Havieron."
  },
  {
    id: "WA-E77-3104",
    tenureId: "E 77/3104",
    title: "Mt Holland East Lithium Prospect",
    location: "Yilgarn Craton, Western Australia",
    jurisdiction: "WA",
    commodity: ["Li"],
    stage: "Drill-Ready",
    status: "Granted",
    cadastreVerified: true,
    areaKm2: 92,
    blocks: 30,
    expiryDate: "2030-03-22",
    annualCommitment: 60000,
    priceDisplay: "$750,000 AUD",
    priceVal: 750000,
    dealType: "100% Outright Sale",
    dealDetails: "100% Interest with 1.5% NSR Royalty retained",
    isFavorite: true,
    lat: -32.10,
    lng: 119.75,
    bounds: [
      [-32.05, 119.68],
      [-32.05, 119.82],
      [-32.15, 119.82],
      [-32.15, 119.68]
    ],
    description: "Adjacent to SQM/Wesfarmers Earl Grey Lithium deposit. Pegmatite swarms mapped on surface with up to 1.8% Li2O rock chips."
  },
  {
    id: "NT-EL34019",
    tenureId: "EL 34019",
    title: "Tanami West High-Grade Gold Claim",
    location: "Tanami Desert / Granites Belt, Northern Territory",
    jurisdiction: "NT",
    commodity: ["Au"],
    stage: "Grassroots",
    status: "Granted",
    cadastreVerified: true,
    areaKm2: 310,
    blocks: 95,
    expiryDate: "2029-06-27",
    annualCommitment: 88000,
    priceDisplay: "$490,000 AUD",
    priceVal: 490000,
    dealType: "Option Agreement",
    dealDetails: "Option to purchase 100% within 24 months",
    isFavorite: false,
    lat: -19.92,
    lng: 129.85,
    bounds: [
      [-19.80, 129.70],
      [-19.80, 130.00],
      [-20.05, 130.00],
      [-20.05, 129.70]
    ],
    description: "Covering structural extensions of the Callie gold trend. Airborne magnetic survey highlights major structural corridor."
  },
  {
    id: "BC-CLAIM-376489",
    tenureId: "TENURE 376489",
    title: "Golden Triangle Copper-Gold Porphyry",
    otherCount: 2,
    location: "Stewart District / Golden Triangle, British Columbia, Canada",
    jurisdiction: "BC",
    commodity: ["Cu", "Au"],
    stage: "Advanced Exploration",
    status: "Granted",
    cadastreVerified: true,
    areaKm2: 175,
    blocks: 42,
    expiryDate: "2030-03-30",
    annualCommitment: 110000,
    priceDisplay: "$680,000 CAD",
    priceVal: 680000,
    dealType: "100% Outright Sale",
    dealDetails: "100% Unencumbered Mineral Title",
    isFavorite: true,
    lat: 56.50,
    lng: -130.00,
    bounds: [
      [56.44, -130.10],
      [56.44, -129.90],
      [56.56, -129.90],
      [56.56, -130.10]
    ],
    description: "Located within the world-class Golden Triangle district of BC. High-grade copper-gold porphyry mineralization with historical drilling."
  },
  {
    id: "PER-CUAJONE-01",
    tenureId: "ACUMULACION CUAJONE",
    title: "Cuajone Copper-Molybdenum Extension",
    otherCount: 1,
    location: "Mariscal Nieto, Moquegua, Perú",
    jurisdiction: "PER",
    commodity: ["Cu", "Mo"],
    stage: "Advanced Exploration",
    status: "Granted",
    cadastreVerified: true,
    areaKm2: 128,
    blocks: 35,
    expiryDate: "2032-12-31",
    annualCommitment: 140000,
    priceDisplay: "$1,450,000 USD",
    priceVal: 1450000,
    dealType: "Farm-In JV (70%)",
    dealDetails: "Earn 70% JV by spending $3.5M USD over 3 years",
    isFavorite: true,
    lat: -17.11,
    lng: -70.69,
    bounds: [
      [-17.05, -70.75],
      [-17.05, -70.63],
      [-17.17, -70.63],
      [-17.17, -70.75]
    ],
    description: "Situated in the prolific Southern Peru Copper Belt adjacent to the Cuajone porphyry deposit."
  },
  {
    id: "NV-MC-4412",
    tenureId: "NMC 1054921",
    title: "Tonopah Lithium & Borate Claims",
    location: "Esmeralda County, Nevada, USA",
    jurisdiction: "NV",
    commodity: ["Li"],
    stage: "Pre-Feasibility",
    status: "Granted",
    cadastreVerified: true,
    areaKm2: 68,
    blocks: 22,
    expiryDate: "2027-09-01",
    annualCommitment: 45000,
    priceDisplay: "$1,200,000 USD",
    priceVal: 1800000,
    dealType: "100% Outright Sale",
    dealDetails: "100% Unencumbered Title",
    isFavorite: false,
    lat: 38.06,
    lng: -117.23,
    bounds: [
      [38.01, -117.29],
      [38.01, -117.17],
      [38.11, -117.17],
      [38.11, -117.29]
    ],
    description: "Claystone lithium deposit situated in Clayton Valley basin. Maiden Inferred Resource estimate of 1.2Mt LCE."
  },
  {
    id: "QLD-EPM-27810",
    tenureId: "EPM 27810",
    title: "Mount Isa IOCG Copper-Gold Project",
    location: "Cloncurry Belt, Queensland, Australia",
    jurisdiction: "QLD",
    commodity: ["Cu", "Au"],
    stage: "Advanced Exploration",
    status: "Granted",
    cadastreVerified: true,
    areaKm2: 185,
    blocks: 61,
    expiryDate: "2029-05-19",
    annualCommitment: 110000,
    priceDisplay: "New EOI Bidding!!",
    priceVal: 900000,
    dealType: "Farm-In JV (51%)",
    dealDetails: "Farm-in 51% for $2M expenditure over 2 years",
    isFavorite: false,
    lat: -20.72,
    lng: 140.50,
    bounds: [
      [-20.65, 140.42],
      [-20.65, 140.58],
      [-20.80, 140.58],
      [-20.80, 140.42]
    ],
    description: "Gravity anomaly target under 40m cover. Direct analogue to Ernest Henry IOCG deposit geometry."
  },
  {
    id: "CHL-CON-1092",
    tenureId: "CON 03-9912",
    title: "Atacama Porphyry Copper Concession",
    location: "Antofagasta Region, Atacama, Chile",
    jurisdiction: "CHL",
    commodity: ["Cu", "Au", "REE"],
    stage: "Grassroots",
    status: "Application",
    cadastreVerified: true,
    areaKm2: 310,
    blocks: 102,
    expiryDate: "2031-01-10",
    annualCommitment: 140000,
    priceDisplay: "$2,100,000 USD",
    priceVal: 3200000,
    dealType: "2% Royalty Sale",
    dealDetails: "Selling 80% with 2.0% NSR Royalty retained",
    isFavorite: false,
    lat: -23.65,
    lng: -69.10,
    bounds: [
      [-23.55, -69.22],
      [-23.55, -68.98],
      [-23.75, -68.98],
      [-23.75, -69.22]
    ],
    description: "Located along the Domeyko Fault system between Escondida and Chuquicamata giant porphyry copper belts."
  },
  {
    id: "WA-P15-6490",
    tenureId: "P 15/6490",
    title: "Coolgardie Gold Mining Lease Option",
    location: "Eastern Goldfields, Western Australia",
    jurisdiction: "WA",
    commodity: ["Au"],
    stage: "Drill-Ready",
    status: "Granted",
    cadastreVerified: true,
    areaKm2: 18,
    blocks: 6,
    expiryDate: "2027-12-01",
    annualCommitment: 25000,
    priceDisplay: "$180,000 AUD",
    priceVal: 180000,
    dealType: "100% Outright Sale",
    dealDetails: "100% Unencumbered Cash Sale",
    isFavorite: false,
    lat: -30.95,
    lng: 121.15,
    bounds: [
      [-30.92, 121.11],
      [-30.92, 121.19],
      [-30.98, 121.19],
      [-30.98, 121.11]
    ],
    description: "High-grade shallow gold intercepts (4m @ 8.2 g/t Au from 24m). Fully permitted for exploratory RC drilling."
  }
];

// App State
let map;
let polygonLayersMap = {};
let geologyLayerGroup;
let assaysLayerGroup;
let minesLayerGroup;

// NT Cadastre GeoJSON Layer Groups
let ntExplGrntLayerGroup;
let ntExplApplLayerGroup;
let ntProdLayerGroup;
let ntReservesLayerGroup;

// WA Cadastre GeoJSON Layer Groups
let waExplGrntLayerGroup;
let waExplApplLayerGroup;
let waProdLayerGroup;

// British Columbia (BC) & Peru (PER) Live Direct Web API Layer Groups
let bcLiveStreamLayerGroup;
let perLiveStreamLayerGroup;
let perIngemmetWMSLayer;

// Custom Leaflet TileLayer for ArcGIS REST MapServer Image Export (INGEMMET GEOCATMIN 65,344 Concessions)
L.TileLayer.EsriExport = L.TileLayer.extend({
  getTileUrl: function(coords) {
    const map = this._map;
    if (!map) return "";
    const tileSize = this.getTileSize();
    
    const nwPoint = L.point(coords.x * tileSize.x, coords.y * tileSize.y);
    const sePoint = L.point((coords.x + 1) * tileSize.x, (coords.y + 1) * tileSize.y);

    const nw = map.unproject(nwPoint, coords.z);
    const se = map.unproject(sePoint, coords.z);

    const bbox = `${nw.lng},${se.lat},${se.lng},${nw.lat}`;
    const size = `${tileSize.x},${tileSize.y}`;

    return `https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CATASTRO_MINERO_WGS84/MapServer/export?bbox=${bbox}&bboxSR=4326&imageSR=3857&size=${size}&format=png32&transparent=true&layers=show:0,1&f=image`;
  }
});

L.tileLayer.esriExport = function(options) {
  return new L.TileLayer.EsriExport("", options);
};

let activeSelectedId = null;

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  renderListings(TENEMENTS_DATA);
  setupEventListeners();
  loadNTCadastreLayers();
  loadWACadastreLayers();
});

// Initialize Leaflet Map
function initMap() {
  map = L.map("map", {
    zoomControl: false,
    attributionControl: false
  }).setView([-22.0, 133.5], 5);

  const lightBasemap = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
    subdomains: "abcd"
  }).addTo(map);

  L.control.zoom({ position: "bottomleft" }).addTo(map);

  geologyLayerGroup = L.layerGroup().addTo(map);
  assaysLayerGroup = L.layerGroup().addTo(map);
  minesLayerGroup = L.layerGroup().addTo(map);

  ntExplGrntLayerGroup = L.layerGroup().addTo(map);
  ntExplApplLayerGroup = L.layerGroup().addTo(map);
  ntProdLayerGroup = L.layerGroup().addTo(map);
  ntReservesLayerGroup = L.layerGroup();

  waExplGrntLayerGroup = L.layerGroup().addTo(map);
  waExplApplLayerGroup = L.layerGroup().addTo(map);
  waProdLayerGroup = L.layerGroup().addTo(map);

  bcLiveStreamLayerGroup = L.layerGroup().addTo(map);
  perLiveStreamLayerGroup = L.layerGroup().addTo(map);

  // INGEMMET GEOCATMIN Official Catastro Minero - DGM (MINEM) Direct Export Layer (65,344 Concessions)
  perIngemmetWMSLayer = L.tileLayer.esriExport({
    opacity: 0.85,
    attribution: "© INGEMMET GEOCATMIN - Catastro Minero DGM (MINEM)"
  }).addTo(map);

  map.on("moveend", () => {
    fetchBCLiveDirectStream();
    fetchPERLiveDirectStream();
  });
  map.on("zoomend", () => {
    fetchBCLiveDirectStream();
    fetchPERLiveDirectStream();
  });

  // Interactive Map Click Handler for Peru INGEMMET Concessions (65,344 Concessions)
  map.on("click", (e) => {
    const perToggle = document.getElementById("layerPERLiveStream");
    if (!perToggle || !perToggle.checked) return;

    const latlng = e.latlng;
    const bounds = map.getBounds();
    const west = bounds.getWest();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const north = bounds.getNorth();

    // Check if clicked within Peru bounding box (approx -81.5 to -68.5 Lng, -18.5 to 0.0 Lat)
    if (latlng.lng < -81.5 || latlng.lng > -68.5 || latlng.lat < -18.5 || latlng.lat > 0.0) return;

    // Show immediate loading popup so user gets instant visual feedback
    const popup = L.popup()
      .setLatLng(latlng)
      .setContent(`
        <div class="popup-card" style="padding:10px 14px; min-width: 220px; font-family: 'Inter', sans-serif;">
          <span class="popup-tenure" style="display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-spinner fa-spin text-green"></i> Querying INGEMMET Peru Cadastre...
          </span>
        </div>
      `)
      .openOn(map);

    // Primary Fast Cloud CDN Query (< 0.8s)
    const cloudUrl = `https://services5.arcgis.com/oAvs2fapEemUpOTy/arcgis/rest/services/Perumin_WFL1/FeatureServer/13/query?geometry=${latlng.lng.toFixed(6)},${latlng.lat.toFixed(6)}&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&inSR=4326&outFields=*&f=geojson`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    fetch(cloudUrl, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutId);
        if (data && data.features && data.features.length > 0) {
          const p = data.features[0].properties || {};
          const concession = p.LY_OS_UNIDADES_MINERAS_CONCESIO || p.CONCESION || "Concesión Minera";
          const owner = p.LY_OS_UNIDADES_MINERAS_TIT_CONC || p.TIT_CONCES || "Titular Minero";
          const depa = (p.LY_OS_UNIDADES_MINERAS_DEPA || p.DEPA || "Perú").trim();
          const prov = (p.LY_OS_UNIDADES_MINERAS_PROVI || p.PROV || "").trim();
          const metals = p.METALES_MINERALES || "Cu / Au";

          const popupHtml = `
            <div class="popup-card">
              <span class="popup-tenure">${concession} • Perú Direct Stream</span>
              <h4 class="popup-title">Concesión Minera (${metals})</h4>
              
              <div class="popup-metrics">
                <span><i class="fa-solid fa-building-user text-green"></i> <strong>Titular:</strong> ${owner}</span>
                <span><i class="fa-solid fa-location-dot text-green"></i> <strong>Ubigeo:</strong> ${depa} ${prov}</span>
                <span><i class="fa-solid fa-gem text-green"></i> <strong>Minerales:</strong> ${metals}</span>
              </div>

              <button class="popup-btn" onclick="openVdrModal('${concession}')">
                <i class="fa-solid fa-shield-halved"></i> Request VDR / Deal Info
              </button>
            </div>
          `;
          popup.setContent(popupHtml);
        } else {
          // Secondary INGEMMET REST Query
          queryIngemmetIdentify(latlng, west, south, east, north, size, popup);
        }
      })
      .catch(() => {
        queryIngemmetIdentify(latlng, west, south, east, north, size, popup);
      });
  });

// Secondary INGEMMET REST Identify Query Helper
function queryIngemmetIdentify(latlng, west, south, east, north, size, popup) {
  const queryParams = new URLSearchParams({
    geometry: `${latlng.lng.toFixed(6)},${latlng.lat.toFixed(6)}`,
    geometryType: "esriGeometryPoint",
    sr: "4326",
    mapExtent: `${west.toFixed(6)},${south.toFixed(6)},${east.toFixed(6)},${north.toFixed(6)}`,
    imageDisplay: `${Math.round(size.x)},${Math.round(size.y)},96`,
    tolerance: "15",
    layers: "all:0,1",
    f: "json"
  });

  const getUrl = `https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CATASTRO_MINERO_WGS84/MapServer/identify?${queryParams.toString()}`;

  const handleData = (data) => {
    const results = data.results || [];
    if (results.length === 0) {
      popup.setContent(`
        <div class="popup-card" style="padding:10px 14px; font-family: 'Inter', sans-serif;">
          <span class="popup-tenure">Concesión Perú</span>
          <p style="font-size:12px; color:#374151; margin: 4px 0;">Enter code shown on tile for instant details:</p>
          <div style="display:flex; gap:6px; margin-top:6px;">
            <input type="text" id="popupCodeInput" placeholder="Code (e.g. 010231924)..." style="flex:1; padding:4px 6px; border:1px solid #D1D5DB; border-radius:4px; font-size:11px;">
            <button onclick="searchPeruConcessionCode(document.getElementById('popupCodeInput').value)" class="btn-primary" style="padding:4px 8px; font-size:11px;">Go</button>
          </div>
        </div>
      `);
      return;
    }

    const attr = results[0].attributes || {};
    const nombre = attr.Nombre || attr.CONCESION || attr.CODIGOU || "Concesión Minera";
    const codigo = attr.CODIGOU || "";
    const titular = attr.Titular || attr.TIT_CONCES || "Titular Minero";
    const estado = attr.TipoEstado || attr.Leyenda || attr.ESTADO || "Titulado";
    const area = attr["Has."] || attr.HECTAGIS || "";
    const depa = (attr.Departamento || attr.DEPA || "Perú").trim();
    const prov = (attr.Provincia || attr.PROVI || "").trim();

    const popupHtml = `
      <div class="popup-card">
        <span class="popup-tenure">CÓDIGO: ${codigo} • Catastro Minero Perú</span>
        <h4 class="popup-title">${nombre}</h4>
        
        <div class="popup-metrics">
          <span><i class="fa-solid fa-building-user text-green"></i> <strong>Titular:</strong> ${titular}</span>
          <span><i class="fa-solid fa-file-contract text-green"></i> <strong>Estado:</strong> ${estado}</span>
          <span><i class="fa-solid fa-location-dot text-green"></i> <strong>Ubigeo:</strong> ${depa} ${prov}</span>
          ${area ? `<span><i class="fa-solid fa-vector-square text-green"></i> <strong>Área:</strong> ${Number(area).toLocaleString()} Ha</span>` : ''}
        </div>

        <button class="popup-btn" onclick="openVdrModal('${nombre}')">
          <i class="fa-solid fa-shield-halved"></i> Request VDR / Deal Info
        </button>
      </div>
    `;

    popup.setContent(popupHtml);
  };

  fetch(getUrl)
    .then(res => res.json())
    .then(data => handleData(data))
    .catch(() => {
      const cbName = "ingemmet_cb_" + Math.floor(Math.random() * 1000000);
      window[cbName] = function(jsonpData) {
        delete window[cbName];
        if (script.parentNode) script.parentNode.removeChild(script);
        handleData(jsonpData);
      };
      const script = document.createElement("script");
      script.src = `${getUrl}&callback=${cbName}`;
      script.onerror = function() {
        delete window[cbName];
        if (script.parentNode) script.parentNode.removeChild(script);
        popup.setContent(`
          <div class="popup-card" style="padding:10px 14px; font-family: 'Inter', sans-serif;">
            <span class="popup-tenure">Concesión Perú</span>
            <p style="font-size:12px; color:#374151; margin: 4px 0;">Enter code shown on tile for instant lookup:</p>
            <div style="display:flex; gap:6px; margin-top:6px;">
              <input type="text" id="popupCodeInput" placeholder="Code (e.g. 010231924)..." style="flex:1; padding:4px 6px; border:1px solid #D1D5DB; border-radius:4px; font-size:11px;">
              <button onclick="searchPeruConcessionCode(document.getElementById('popupCodeInput').value)" class="btn-primary" style="padding:4px 8px; font-size:11px;">Go</button>
            </div>
          </div>
        `);
      };
      document.body.appendChild(script);
    });
}

// Instant 50ms Code Lookup Function for Peru Concessions
function searchPeruConcessionCode(code) {
  if (!code || !code.trim()) return;
  const cleanCode = code.trim().toUpperCase();

  const url = `https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CATASTRO_MINERO_WGS84/MapServer/0/query?where=CODIGOU%20LIKE%20%27%25${cleanCode}%25%27%20OR%20CONCESION%20LIKE%20%27%25${cleanCode}%25%27&outFields=*&f=json`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const feats = data.features || [];
      if (feats.length === 0) {
        alert(`No concession found matching code or name: "${cleanCode}"`);
        return;
      }

      const attr = feats[0].attributes || {};
      const nombre = attr.CONCESION || attr.CODIGOU || "Concesión Minera";
      const codigo = attr.CODIGOU || cleanCode;
      const titular = attr.TIT_CONCES || "Titular Minero";
      const estado = attr.ESTADO || "Titulado";
      const area = attr.HECTAGIS || "";

      const popupHtml = `
        <div class="popup-card">
          <span class="popup-tenure">CÓDIGO: ${codigo} • Catastro Minero Perú</span>
          <h4 class="popup-title">${nombre}</h4>
          
          <div class="popup-metrics">
            <span><i class="fa-solid fa-building-user text-green"></i> <strong>Titular:</strong> ${titular}</span>
            <span><i class="fa-solid fa-file-contract text-green"></i> <strong>Estado:</strong> ${estado}</span>
            ${area ? `<span><i class="fa-solid fa-vector-square text-green"></i> <strong>Área:</strong> ${Number(area).toLocaleString()} Ha</span>` : ''}
          </div>

          <button class="popup-btn" onclick="openVdrModal('${nombre}')">
            <i class="fa-solid fa-shield-halved"></i> Request VDR / Deal Info
          </button>
        </div>
      `;

      L.popup()
        .setLatLng(map.getCenter())
        .setContent(popupHtml)
        .openOn(map);
    })
    .catch(err => console.error("Code lookup error:", err));
}

  renderMapPolygons(TENEMENTS_DATA);
  renderOverlayFeatures();
  fitMapToAllTenements();
}

// Load Real NT Government Cadastre GeoJSON Files (Thin CAD-style stroke weights)
function loadNTCadastreLayers() {
  const hoverStyle = (e) => {
    const layer = e.target;
    layer.setStyle({ weight: 2.0, fillOpacity: 0.6 });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  };

  // 1. NT Exploration Granted (Emerald Green - Thin 0.6px Border)
  fetch("./data/nt_expl_granted.json")
    .then(res => res.json())
    .then(data => {
      const defaultStyle = {
        color: "#059669",
        weight: 0.6,
        fillColor: "#059669",
        fillOpacity: 0.22
      };
      const layer = L.geoJSON(data, {
        style: defaultStyle,
        onEachFeature: (feature, l) => {
          bindNTPopup(feature, l);
          l.on({
            mouseover: hoverStyle,
            mouseout: (e) => e.target.setStyle(defaultStyle)
          });
        }
      });
      ntExplGrntLayerGroup.addLayer(layer);
    })
    .catch(err => console.error("Error loading NT Expl Granted:", err));

  // 2. NT Exploration Applications (Vibrant Royal Blue - Thin 0.7px Border)
  fetch("./data/nt_expl_appl.json")
    .then(res => res.json())
    .then(data => {
      const defaultStyle = {
        color: "#0284C7",
        weight: 0.7,
        fillColor: "#0284C7",
        fillOpacity: 0.25
      };
      const layer = L.geoJSON(data, {
        style: defaultStyle,
        onEachFeature: (feature, l) => {
          bindNTPopup(feature, l);
          l.on({
            mouseover: hoverStyle,
            mouseout: (e) => e.target.setStyle(defaultStyle)
          });
        }
      });
      ntExplApplLayerGroup.addLayer(layer);
    })
    .catch(err => console.error("Error loading NT Expl Applications:", err));

  // 3. NT Production & Mining Titles (Purple - Thin 0.7px Border)
  fetch("./data/nt_prod_granted.json")
    .then(res => res.json())
    .then(data => {
      const defaultStyle = {
        color: "#7C3AED",
        weight: 0.7,
        fillColor: "#A855F7",
        fillOpacity: 0.25
      };
      const layer = L.geoJSON(data, {
        style: defaultStyle,
        onEachFeature: (feature, l) => {
          bindNTPopup(feature, l);
          l.on({
            mouseover: hoverStyle,
            mouseout: (e) => e.target.setStyle(defaultStyle)
          });
        }
      });
      ntProdLayerGroup.addLayer(layer);
    })
    .catch(err => console.error("Error loading NT Prod Granted:", err));

  fetch("./data/nt_prod_appl.json")
    .then(res => res.json())
    .then(data => {
      const defaultStyle = {
        color: "#C084FC",
        weight: 0.6,
        fillColor: "#E9D5FF",
        fillOpacity: 0.2
      };
      const layer = L.geoJSON(data, {
        style: defaultStyle,
        onEachFeature: (feature, l) => {
          bindNTPopup(feature, l);
          l.on({
            mouseover: hoverStyle,
            mouseout: (e) => e.target.setStyle(defaultStyle)
          });
        }
      });
      ntProdLayerGroup.addLayer(layer);
    })
    .catch(err => console.error("Error loading NT Prod Applications:", err));

  // 4. NT Mineral Reserves (Dashed Red - Thin 0.8px Border)
  fetch("./data/nt_reserves.json")
    .then(res => res.json())
    .then(data => {
      const defaultStyle = {
        color: "#DC2626",
        weight: 0.8,
        fillColor: "#F87171",
        fillOpacity: 0.2,
        dashArray: "3, 3"
      };
      const layer = L.geoJSON(data, {
        style: defaultStyle,
        onEachFeature: (feature, l) => {
          bindNTPopup(feature, l);
          l.on({
            mouseover: hoverStyle,
            mouseout: (e) => e.target.setStyle(defaultStyle)
          });
        }
      });
      ntReservesLayerGroup.addLayer(layer);
    })
    .catch(err => console.error("Error loading NT Reserves:", err));
}

// Bind Popup for NT Cadastre Polygons with full Owner, Grant Date, Expiry, and Area details
function bindNTPopup(feature, layer) {
  const p = feature.properties || {};
  const tenureTitle = p.titleId || "NT Tenement";
  const category = p.category || "NT Mineral Title";
  const tsType = p.tsType || p.status || "Active";
  const owner = p.owner || "Not Listed";
  const dateGrant = p.dateGrant || p.dateEffect || "Pending";
  const dateExpiry = p.dateExpiry || "N/A";
  const area = p.areaDisplay || "Not Specified";
  const holderType = p.holderType || "Holder";

  const popupHtml = `
    <div class="popup-card">
      <span class="popup-tenure">${tenureTitle} • NT Cadastre</span>
      <h4 class="popup-title">${category}</h4>
      
      <div class="popup-metrics">
        <span><i class="fa-solid fa-building-user text-green"></i> <strong>Owner:</strong> ${owner}</span>
        <span><i class="fa-solid fa-user-tag text-green"></i> <strong>Type:</strong> ${holderType} (${tsType})</span>
        <span><i class="fa-solid fa-calendar-check text-green"></i> <strong>Granted:</strong> ${dateGrant}</span>
        <span><i class="fa-solid fa-hourglass-half text-green"></i> <strong>Expiry:</strong> ${dateExpiry}</span>
        <span><i class="fa-solid fa-vector-square text-green"></i> <strong>Area:</strong> ${area}</span>
      </div>

      <button class="popup-btn" onclick="openVdrModal('${tenureTitle}')">
        <i class="fa-solid fa-shield-halved"></i> Request VDR / Deal Info
      </button>
    </div>
  `;
  layer.bindPopup(popupHtml);
}

// Load Real Western Australia (WA) Government Cadastre GeoJSON Files
function loadWACadastreLayers() {
  const hoverStyle = (e) => {
    const layer = e.target;
    layer.setStyle({ weight: 2.0, fillOpacity: 0.6 });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  };

  // 1. WA Granted Exploration Titles (Emerald Green - 0.6px Border)
  fetch("./data/wa_expl_granted.json")
    .then(res => res.json())
    .then(data => {
      const defaultStyle = {
        color: "#059669",
        weight: 0.6,
        fillColor: "#10B981",
        fillOpacity: 0.22
      };
      const layer = L.geoJSON(data, {
        style: defaultStyle,
        onEachFeature: (feature, l) => {
          bindWAPopup(feature, l);
          l.on({
            mouseover: hoverStyle,
            mouseout: (e) => e.target.setStyle(defaultStyle)
          });
        }
      });
      waExplGrntLayerGroup.addLayer(layer);
    })
    .catch(err => console.error("Error loading WA Expl Granted:", err));

  // 2. WA Exploration Applications (Vibrant Royal Blue - 0.7px Border)
  fetch("./data/wa_expl_appl.json")
    .then(res => res.json())
    .then(data => {
      const defaultStyle = {
        color: "#0284C7",
        weight: 0.7,
        fillColor: "#38BDF8",
        fillOpacity: 0.25
      };
      const layer = L.geoJSON(data, {
        style: defaultStyle,
        onEachFeature: (feature, l) => {
          bindWAPopup(feature, l);
          l.on({
            mouseover: hoverStyle,
            mouseout: (e) => e.target.setStyle(defaultStyle)
          });
        }
      });
      waExplApplLayerGroup.addLayer(layer);
    })
    .catch(err => console.error("Error loading WA Expl Applications:", err));

  // 3. WA Mining & Production Leases (Purple - 0.7px Border)
  fetch("./data/wa_prod_granted.json")
    .then(res => res.json())
    .then(data => {
      const defaultStyle = {
        color: "#7C3AED",
        weight: 0.7,
        fillColor: "#A855F7",
        fillOpacity: 0.25
      };
      const layer = L.geoJSON(data, {
        style: defaultStyle,
        onEachFeature: (feature, l) => {
          bindWAPopup(feature, l);
          l.on({
            mouseover: hoverStyle,
            mouseout: (e) => e.target.setStyle(defaultStyle)
          });
        }
      });
      waProdLayerGroup.addLayer(layer);
    })
    .catch(err => console.error("Error loading WA Prod Granted:", err));

  fetch("./data/wa_prod_appl.json")
    .then(res => res.json())
    .then(data => {
      const defaultStyle = {
        color: "#C084FC",
        weight: 0.6,
        fillColor: "#E9D5FF",
        fillOpacity: 0.2
      };
      const layer = L.geoJSON(data, {
        style: defaultStyle,
        onEachFeature: (feature, l) => {
          bindWAPopup(feature, l);
          l.on({
            mouseover: hoverStyle,
            mouseout: (e) => e.target.setStyle(defaultStyle)
          });
        }
      });
      waProdLayerGroup.addLayer(layer);
    })
    .catch(err => console.error("Error loading WA Prod Applications:", err));
}

// Bind Popup for WA Cadastre Polygons
function bindWAPopup(feature, layer) {
  const p = feature.properties || {};
  const tenureTitle = p.titleId || "WA Tenement";
  const category = p.category || "WA Mining Title";
  const status = p.status || "LIVE";
  const owner = p.owner || "Not Listed";
  const dateGrant = p.dateGrant || "Pending";
  const dateExpiry = p.dateExpiry || "N/A";
  const area = p.areaDisplay || "Not Specified";
  const tenureType = p.tenureType || "Tenement";

  const popupHtml = `
    <div class="popup-card">
      <span class="popup-tenure">${tenureTitle} • WA Cadastre</span>
      <h4 class="popup-title">${category}</h4>
      
      <div class="popup-metrics">
        <span><i class="fa-solid fa-building-user text-green"></i> <strong>Owner:</strong> ${owner}</span>
        <span><i class="fa-solid fa-user-tag text-green"></i> <strong>Type:</strong> ${tenureType} (${status})</span>
        <span><i class="fa-solid fa-calendar-check text-green"></i> <strong>Granted:</strong> ${dateGrant}</span>
        <span><i class="fa-solid fa-hourglass-half text-green"></i> <strong>Expiry:</strong> ${dateExpiry}</span>
        <span><i class="fa-solid fa-vector-square text-green"></i> <strong>Area:</strong> ${area}</span>
      </div>

      <button class="popup-btn" onclick="openVdrModal('${tenureTitle}')">
        <i class="fa-solid fa-shield-halved"></i> Request VDR / Deal Info
      </button>
    </div>
  `;
  layer.bindPopup(popupHtml);
}

// British Columbia (Canada) Live Direct WFS API Streaming Service (Zero local storage)
function fetchBCLiveDirectStream(targetMap = map, targetGroup = bcLiveStreamLayerGroup, isListingPage = false) {
  const toggle = document.getElementById("layerBCLiveStream");
  if (!targetMap) return;
  if (targetMap === map && toggle && !toggle.checked) return;

  const bounds = targetMap.getBounds();
  const west = bounds.getWest();
  const south = bounds.getSouth();
  const east = bounds.getEast();
  const north = bounds.getNorth();

  // Check if map view intersects British Columbia bounding box (approx -139 to -114 Lng, 48 to 60 Lat)
  if (east < -139.0 || west > -114.0 || north < 48.0 || south > 60.0) return;

  // Query DataBC WFS API with minLng,minLat,maxLng,maxLat & srsName=EPSG:4326
  const url = `https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pub:WHSE_MINERAL_TENURE.MTA_ACQUIRED_TENURE_SVW&bbox=${west},${south},${east},${north},EPSG:4326&srsName=EPSG:4326&outputFormat=application/json&maxFeatures=300`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.features || !targetGroup) return;
      targetGroup.clearLayers();

      const defaultStyle = {
        color: "#059669",
        weight: 1.5,
        fillColor: "#10B981",
        fillOpacity: 0.32
      };

      const layer = L.geoJSON(data, {
        style: defaultStyle,
        onEachFeature: (feature, l) => {
          if (isListingPage) {
            const p = feature.properties || {};
            const tenureNum = p.TENURE_NUMBER_ID || "BC Tenure";
            const claimName = p.CLAIM_NAME ? ` "${p.CLAIM_NAME}"` : "";
            const tenureTitle = `TENURE ${tenureNum}${claimName}`.trim();
            const areaHa = p.AREA_IN_HECTARES ? Math.round(parseFloat(p.AREA_IN_HECTARES) * 10) / 10 : 100;
            const areaKm2 = Math.round((areaHa / 100) * 10) / 10 || 1;

            l.bindTooltip(`Click to select: ${tenureTitle}`, { direction: "top" });
            l.on("click", (e) => {
              L.DomEvent.stopPropagation(e);
              const geoLayer = L.geoJSON(feature);
              const bnd = geoLayer.getBounds();
              const ctr = bnd.getCenter();

              const tObj = {
                id: `map-sel-${tenureNum}`,
                tenureId: tenureTitle,
                title: `${p.TENURE_TYPE_DESCRIPTION || "Mineral"} ${p.TENURE_SUB_TYPE_DESCRIPTION || "Claim"}`.trim(),
                location: "British Columbia, Canada",
                areaKm2: areaKm2,
                lat: ctr.lat,
                lng: ctr.lng,
                feature: feature,
                bounds: [
                  [bnd.getSouth(), bnd.getWest()],
                  [bnd.getSouth(), bnd.getEast()],
                  [bnd.getNorth(), bnd.getEast()],
                  [bnd.getNorth(), bnd.getWest()]
                ]
              };
              addCadastreTenementToPackage(tObj);
            });
          } else {
            bindBCPopup(feature, l);
          }

          l.on({
            mouseover: (e) => e.target.setStyle({ weight: 2.8, fillOpacity: 0.65 }),
            mouseout: (e) => e.target.setStyle(defaultStyle)
          });
        }
      });
      targetGroup.addLayer(layer);
    })
    .catch(err => console.error("BC Live Direct Stream Error:", err));
}

// Bind Popup for British Columbia Live Direct WFS Polygons
function bindBCPopup(feature, layer) {
  const p = feature.properties || {};
  const tenureNum = p.TENURE_NUMBER_ID || "BC Tenure";
  const claimName = p.CLAIM_NAME ? `"${p.CLAIM_NAME}"` : "";
  const tenureTitle = `TENURE ${tenureNum} ${claimName}`.trim();
  
  const category = `${p.TENURE_TYPE_DESCRIPTION || "Mineral"} ${p.TENURE_SUB_TYPE_DESCRIPTION || "Claim"}`.trim();
  const owner = p.OWNER_NAME || "Registered Holder";
  const area = p.AREA_IN_HECTARES ? `${p.AREA_IN_HECTARES} Ha` : "Unspecified Area";
  
  let dateIssue = p.ISSUE_DATE ? p.ISSUE_DATE.split('T')[0].split('Z')[0] : "Recorded";
  let dateExpiry = p.GOOD_TO_DATE ? p.GOOD_TO_DATE.split('T')[0].split('Z')[0] : "Active";

  const popupHtml = `
    <div class="popup-card">
      <span class="popup-tenure">${tenureTitle} • BC Direct WFS</span>
      <h4 class="popup-title">${category}</h4>
      
      <div class="popup-metrics">
        <span><i class="fa-solid fa-building-user text-green"></i> <strong>Owner:</strong> ${owner}</span>
        <span><i class="fa-solid fa-calendar-check text-green"></i> <strong>Issued:</strong> ${dateIssue}</span>
        <span><i class="fa-solid fa-hourglass-half text-green"></i> <strong>Good To Date:</strong> ${dateExpiry}</span>
        <span><i class="fa-solid fa-vector-square text-green"></i> <strong>Area:</strong> ${area}</span>
      </div>

      <button class="popup-btn" onclick="openVdrModal('${tenureTitle}')">
        <i class="fa-solid fa-shield-halved"></i> Request VDR / Deal Info
      </button>
    </div>
  `;
  layer.bindPopup(popupHtml);
}

// Peru (South America) Live Direct API Streaming Service (Zero local storage)
function fetchPERLiveDirectStream() {
  const toggle = document.getElementById("layerPERLiveStream");
  if (!toggle || !toggle.checked || !map) return;

  const bounds = map.getBounds();
  const west = bounds.getWest();
  const south = bounds.getSouth();
  const east = bounds.getEast();
  const north = bounds.getNorth();

  // Check if map view intersects Peru bounding box (approx -81.5 to -68.5 Lng, -18.5 to 0.0 Lat)
  if (east < -81.5 || west > -68.5 || north < -18.5 || south > 0.0) return;

  const url = `https://services5.arcgis.com/oAvs2fapEemUpOTy/arcgis/rest/services/Perumin_WFL1/FeatureServer/13/query?geometry=${west},${south},${east},${north}&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&inSR=4326&outFields=*&f=geojson&resultRecordCount=300`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.features) return;
      perLiveStreamLayerGroup.clearLayers();

      const defaultStyle = {
        color: "#059669",
        weight: 1.5,
        fillColor: "#10B981",
        fillOpacity: 0.32
      };

      const layer = L.geoJSON(data, {
        style: defaultStyle,
        onEachFeature: (feature, l) => {
          bindPERPopup(feature, l);
          l.on({
            mouseover: (e) => e.target.setStyle({ weight: 2.8, fillOpacity: 0.65 }),
            mouseout: (e) => e.target.setStyle(defaultStyle)
          });
        }
      });
      perLiveStreamLayerGroup.addLayer(layer);
    })
    .catch(err => console.error("Peru Live Direct Stream Error:", err));
}

// Bind Popup for Peru Live Direct API Polygons
function bindPERPopup(feature, layer) {
  const p = feature.properties || {};
  const concession = p.LY_OS_UNIDADES_MINERAS_CONCESIO || p.CONCESION || "Concesión Minera";
  const owner = p.LY_OS_UNIDADES_MINERAS_TIT_CONC || p.TIT_CONCES || "Titular Minero";
  const depa = (p.LY_OS_UNIDADES_MINERAS_DEPA || p.DEPA || "Perú").trim();
  const prov = (p.LY_OS_UNIDADES_MINERAS_PROVI || p.PROV || "").trim();
  const metals = p.METALES_MINERALES || "Cu / Au";
  
  const popupHtml = `
    <div class="popup-card">
      <span class="popup-tenure">${concession} • Perú Direct Stream</span>
      <h4 class="popup-title">Concesión Minera (${metals})</h4>
      
      <div class="popup-metrics">
        <span><i class="fa-solid fa-building-user text-green"></i> <strong>Titular:</strong> ${owner}</span>
        <span><i class="fa-solid fa-location-dot text-green"></i> <strong>Ubigeo:</strong> ${depa} ${prov}</span>
        <span><i class="fa-solid fa-gem text-green"></i> <strong>Minerales:</strong> ${metals}</span>
      </div>

      <button class="popup-btn" onclick="openVdrModal('${concession}')">
        <i class="fa-solid fa-shield-halved"></i> Request VDR / Deal Info
      </button>
    </div>
  `;
  layer.bindPopup(popupHtml);
}

// Render Tenement Polygons on Map
function renderMapPolygons(data) {
  Object.values(polygonLayersMap).forEach(poly => map.removeLayer(poly));
  polygonLayersMap = {};

  data.forEach(item => {
    const polygon = L.polygon(item.bounds, {
      color: "#059669",
      weight: 2.5,
      fillColor: "#059669",
      fillOpacity: 0.25,
      className: `tenement-poly poly-${item.id}`
    }).addTo(map);

    const popupHtml = `
      <div class="popup-card">
        <span class="popup-tenure">${item.tenureId} • ${item.jurisdiction}</span>
        <h4 class="popup-title">${item.title}</h4>
        <div class="popup-metrics">
          <span><strong>Commodities:</strong> ${item.commodity.join(", ")}</span>
          <span><strong>Area:</strong> ${item.areaKm2} km²</span>
          <span><strong>Deal:</strong> ${item.dealType}</span>
        </div>
        <button class="popup-btn" onclick="selectCardFromMap('${item.id}')">View Details & VDR</button>
      </div>
    `;

    polygon.bindPopup(popupHtml);

    polygon.on("mouseover", () => {
      polygon.setStyle({ fillOpacity: 0.5, weight: 3.5, color: "#00E266" });
    });

    polygon.on("mouseout", () => {
      if (activeSelectedId !== item.id) {
        polygon.setStyle({ fillOpacity: 0.25, weight: 2.5, color: "#059669" });
      }
    });

    polygon.on("click", () => {
      selectTenement(item.id, false);
    });

    polygonLayersMap[item.id] = polygon;
  });
}

// Render Geological & Cadastre Overlay Layers
function renderOverlayFeatures() {
  const faultLine = L.polyline([
    [-21.40, 122.00],
    [-21.80, 122.45]
  ], {
    color: "#D97706",
    weight: 2,
    dashArray: "6, 6"
  });
  geologyLayerGroup.addLayer(faultLine);

  const assayHit1 = L.circleMarker([-13.80, 131.85], {
    radius: 8,
    color: "#DC2626",
    fillColor: "#EF4444",
    fillOpacity: 0.9
  }).bindTooltip("Pine Creek Hit: 14m @ 14.2 g/t Au");
  assaysLayerGroup.addLayer(assayHit1);

  const mineMarker = L.circleMarker([-19.60, 134.20], {
    radius: 9,
    color: "#6B21A8",
    fillColor: "#7C3AED",
    fillOpacity: 0.9
  }).bindTooltip("Warrego Historical Mine (Tennant Creek)");
  minesLayerGroup.addLayer(mineMarker);
}

function fitMapToAllTenements() {
  const bounds = L.latLngBounds(TENEMENTS_DATA.map(t => [t.lat, t.lng]));
  map.fitBounds(bounds, { padding: [50, 50] });
}

// Render Tenement Listing Cards on Sidebar (EXACT USER SPECIFIED 5-LINE SEQUENCE)
function renderListings(data) {
  const container = document.getElementById("tenementsList");
  document.getElementById("activeCount").innerText = data.length;

  if (data.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 20px; color: var(--text-muted);">
        <i class="fa-solid fa-folder-open" style="font-size: 32px; margin-bottom: 12px;"></i>
        <p>No mineral tenements match your search filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = data.map(item => {
    // Format Tenement Name (Single vs Package with "and X others")
    const titleName = item.otherCount && item.otherCount > 0 
      ? `${item.title} (${item.tenureId} & ${item.otherCount} others)`
      : `${item.title} (${item.tenureId})`;

    // Format Asking Price (if given vs EOI)
    const hasPrice = item.priceDisplay && !item.priceDisplay.toLowerCase().includes("eoi");
    const priceText = hasPrice ? item.priceDisplay : "EOI / Bidding Open";

    return `
      <div class="tenement-card ${activeSelectedId === item.id ? 'active-selected' : ''}" 
           id="card-${item.id}" 
           onclick="openTenementDetailPage('${item.id}')">
        
        <!-- 1. Tenement Name (First tenement & X others) + Favorite Star -->
        <div class="card-top-row">
          <div class="card-tenement-title">${titleName}</div>
          <button class="favorite-star-btn ${item.isFavorite ? 'active' : ''}" 
                  onclick="event.stopPropagation(); toggleFavorite('${item.id}')" 
                  title="Save Tenement">
            <i class="${item.isFavorite ? 'fa-solid' : 'fa-regular'} fa-star"></i>
          </button>
        </div>

        <!-- 2. Location -->
        <div class="card-location-line">
          <i class="fa-solid fa-location-dot text-green"></i> ${item.location}
        </div>

        <!-- 3. Asking Price (if given) -->
        <div class="card-price-line">
          <span class="price-label">Asking Price:</span>
          <span class="price-value ${!hasPrice ? 'price-eoi' : ''}">${priceText}</span>
        </div>

        <!-- 4. Area, Commodity, Stage, Status of tenements -->
        <div class="card-specs-row">
          <span class="spec-item" title="Tenement Area Size">
            <i class="fa-solid fa-vector-square"></i> ${item.areaKm2} km²
          </span>
          <span class="spec-item" title="Prospective Commodities">
            <i class="fa-solid fa-gem"></i> ${item.commodity.join(', ')}
          </span>
          <span class="spec-item" title="Exploration Stage">
            <i class="fa-solid fa-pickaxe"></i> ${item.stage.split(' ')[0]}
          </span>
          <span class="spec-divider">•</span>
          <span class="spec-tenure">${item.status} EL</span>
        </div>

        <!-- 5. Deal Type Badge & View Details Action -->
        <div class="card-bottom-row" style="display:flex; justify-content:space-between; align-items:center;">
          <span class="badge-deal">${item.dealType}</span>
          <span style="font-size:11.5px; font-weight:700; color:var(--brand-green);"><i class="fa-solid fa-arrow-right"></i> View Full Details</span>
        </div>

      </div>
    `;
  }).join('');
}

// Toggle Favorite star button
function toggleFavorite(id) {
  const item = TENEMENTS_DATA.find(t => t.id === id);
  if (item) {
    item.isFavorite = !item.isFavorite;
    renderListings(TENEMENTS_DATA);
  }
}

// Select a tenement (highlight polygon & scroll sidebar card into view)
function selectTenement(id, panMap = true) {
  activeSelectedId = id;
  const item = TENEMENTS_DATA.find(t => t.id === id);
  if (!item) return;

  Object.keys(polygonLayersMap).forEach(key => {
    polygonLayersMap[key].setStyle({ fillOpacity: 0.25, weight: 2.5, color: "#059669" });
  });

  const poly = polygonLayersMap[id];
  if (poly) {
    poly.setStyle({ fillOpacity: 0.6, weight: 4, color: "#00E266" });
    if (panMap) {
      map.flyToBounds(poly.getBounds(), { padding: [80, 80], duration: 1.2 });
    }
  }

  document.querySelectorAll(".tenement-card").forEach(card => card.classList.remove("active-selected"));
  const cardElem = document.getElementById(`card-${id}`);
  if (cardElem) {
    cardElem.classList.add("active-selected");
    cardElem.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function selectCardFromMap(id) {
  openTenementDetailPage(id);
}

// Setup Filters & Interaction Handlers
function setupEventListeners() {
  const searchInput = document.getElementById("searchInput");
  const commodityFilter = document.getElementById("commodityFilter");
  const jurisdictionFilter = document.getElementById("jurisdictionFilter");
  const dealFilter = document.getElementById("dealFilter");
  const sortBy = document.getElementById("sortBy");

  const filterHandler = () => {
    const q = searchInput.value.toLowerCase().trim();
    const comm = commodityFilter.value;
    const jur = jurisdictionFilter.value;
    const deal = dealFilter.value;

    let filtered = TENEMENTS_DATA.filter(item => {
      const matchesQuery = !q || item.title.toLowerCase().includes(q) || 
                                 item.location.toLowerCase().includes(q) || 
                                 item.tenureId.toLowerCase().includes(q);
      const matchesComm = comm === "all" || item.commodity.includes(comm);
      const matchesJur = jur === "all" || item.jurisdiction === jur;
      const matchesDeal = deal === "all" || item.dealType.includes(deal);

      return matchesQuery && matchesComm && matchesJur && matchesDeal;
    });

    const sortVal = sortBy.value;
    if (sortVal === "price-low") filtered.sort((a, b) => a.priceVal - b.priceVal);
    if (sortVal === "price-high") filtered.sort((a, b) => b.priceVal - a.priceVal);
    if (sortVal === "area-large") filtered.sort((a, b) => b.areaKm2 - a.areaKm2);

    renderListings(filtered);
    renderMapPolygons(filtered);

    // Pan map when jurisdiction filter selected
    if (jur === "NT") {
      map.flyTo([-19.5, 133.5], 6, { duration: 1.5 });
    } else if (jur === "WA") {
      map.flyTo([-25.0, 122.0], 5, { duration: 1.5 });
    } else if (jur === "BC") {
      map.flyTo([54.5, -125.0], 6, { duration: 1.5 });
    } else if (jur === "PER") {
      map.flyTo([-9.19, -75.01], 6, { duration: 1.5 });
    }
  };

  searchInput.addEventListener("input", filterHandler);
  commodityFilter.addEventListener("change", filterHandler);
  jurisdictionFilter.addEventListener("change", filterHandler);
  dealFilter.addEventListener("change", filterHandler);
  sortBy.addEventListener("change", filterHandler);

  // NT Layers Toggles
  document.getElementById("layerNTExplGrnt").addEventListener("change", (e) => {
    e.target.checked ? map.addLayer(ntExplGrntLayerGroup) : map.removeLayer(ntExplGrntLayerGroup);
  });
  document.getElementById("layerNTExplAppl").addEventListener("change", (e) => {
    e.target.checked ? map.addLayer(ntExplApplLayerGroup) : map.removeLayer(ntExplApplLayerGroup);
  });
  document.getElementById("layerNTProd").addEventListener("change", (e) => {
    e.target.checked ? map.addLayer(ntProdLayerGroup) : map.removeLayer(ntProdLayerGroup);
  });
  document.getElementById("layerNTReserves").addEventListener("change", (e) => {
    e.target.checked ? map.addLayer(ntReservesLayerGroup) : map.removeLayer(ntReservesLayerGroup);
  });

  // WA Layers Toggles
  document.getElementById("layerWAExplGrnt").addEventListener("change", (e) => {
    e.target.checked ? map.addLayer(waExplGrntLayerGroup) : map.removeLayer(waExplGrntLayerGroup);
  });
  document.getElementById("layerWAExplAppl").addEventListener("change", (e) => {
    e.target.checked ? map.addLayer(waExplApplLayerGroup) : map.removeLayer(waExplApplLayerGroup);
  });
  document.getElementById("layerWAProd").addEventListener("change", (e) => {
    e.target.checked ? map.addLayer(waProdLayerGroup) : map.removeLayer(waProdLayerGroup);
  });

  // BC Layers Toggles (Direct Web Stream)
  document.getElementById("layerBCLiveStream").addEventListener("change", (e) => {
    if (e.target.checked) {
      map.addLayer(bcLiveStreamLayerGroup);
      fetchBCLiveDirectStream();
    } else {
      map.removeLayer(bcLiveStreamLayerGroup);
      bcLiveStreamLayerGroup.clearLayers();
    }
  });

  // Peru Layers Toggles (INGEMMET GEOCATMIN - Catastro Minero DGM MINEM)
  document.getElementById("layerPERLiveStream").addEventListener("change", (e) => {
    if (e.target.checked) {
      map.addLayer(perIngemmetWMSLayer);
      map.addLayer(perLiveStreamLayerGroup);
      fetchPERLiveDirectStream();
    } else {
      map.removeLayer(perIngemmetWMSLayer);
      map.removeLayer(perLiveStreamLayerGroup);
      perLiveStreamLayerGroup.clearLayers();
    }
  });

  // Peru Instant Code Search Button & Enter Key Handlers
  const peruBtn = document.getElementById("peruCodeSearchBtn");
  const peruInput = document.getElementById("peruCodeInput");
  if (peruBtn && peruInput) {
    peruBtn.addEventListener("click", () => {
      searchPeruConcessionCode(peruInput.value);
    });
    peruInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") searchPeruConcessionCode(peruInput.value);
    });
  }

  // Global Overlay Toggles
  document.getElementById("layerTenements").addEventListener("change", (e) => {
    Object.values(polygonLayersMap).forEach(poly => e.target.checked ? map.addLayer(poly) : map.removeLayer(poly));
  });
  document.getElementById("layerGeology").addEventListener("change", (e) => {
    e.target.checked ? map.addLayer(geologyLayerGroup) : map.removeLayer(geologyLayerGroup);
  });
  document.getElementById("layerAssays").addEventListener("change", (e) => {
    e.target.checked ? map.addLayer(assaysLayerGroup) : map.removeLayer(assaysLayerGroup);
  });
  document.getElementById("layerMines").addEventListener("change", (e) => {
    e.target.checked ? map.addLayer(minesLayerGroup) : map.removeLayer(minesLayerGroup);
  });

  const layersHeader = document.getElementById("layersHeader");
  const layersWidget = document.querySelector(".map-layers-widget");
  layersHeader.addEventListener("click", () => {
    layersWidget.classList.toggle("collapsed");
  });

  // Collapsible Accordion Jurisdiction Section Headers
  document.querySelectorAll(".layer-collapsible-header").forEach(header => {
    header.addEventListener("click", (e) => {
      e.stopPropagation();
      const group = header.closest(".layer-collapsible-group");
      if (group) group.classList.toggle("collapsed");
    });
  });

  document.getElementById("resetMapBtn").addEventListener("click", () => {
    fitMapToAllTenements();
  });

  const ndaCheck = document.getElementById("ndaConsentCheck");
  const executeBtn = document.getElementById("executeNdaBtn");
  ndaCheck.addEventListener("change", (e) => {
    executeBtn.disabled = !e.target.checked;
  });

  document.getElementById("closeVdrModal").addEventListener("click", closeVdrModal);
  document.getElementById("cancelNdaBtn").addEventListener("click", closeVdrModal);

  document.getElementById("vdrNavBtn").addEventListener("click", () => {
    openVdrModal("NT-EL32205");
  });

  executeBtn.addEventListener("click", () => {
    alert("✓ Confidentiality NDA Executed!\n\nYour digital signature has been recorded. Watermarked data room files are now unlocked for download.");
    closeVdrModal();
  });
}

function openVdrModal(id) {
  const item = TENEMENTS_DATA.find(t => t.id === id) || TENEMENTS_DATA[0];
  document.getElementById("modalTenementTitle").innerText = `Virtual Data Room (VDR) Access`;
  document.getElementById("modalTenementSub").innerText = `${item.tenureId} • ${item.title}`;
  
  const modal = document.getElementById("vdrModal");
  modal.classList.add("active");
}

function closeVdrModal() {
  document.getElementById("vdrModal").classList.remove("active");
}

// ==========================================================================
// 50:50 SPLIT-SCREEN LISTING CREATOR PAGE LOGIC
// ==========================================================================

let createMap = null;
let createMapLayerGroup = null;
let selectedListingTenements = [];

function setupListingPageHandlers() {
  const listBtn = document.getElementById("listPropertyBtn");
  const backBtn = document.getElementById("backToAtlasBtn");
  const cancelBtn = document.getElementById("cancelListingViewBtn");

  if (listBtn) listBtn.addEventListener("click", openListingPage);
  if (backBtn) backBtn.addEventListener("click", closeListingPage);
  if (cancelBtn) cancelBtn.addEventListener("click", closeListingPage);

  // Cadastre Search Input Logic
  const searchInput = document.getElementById("cadastreSearchInput");
  const dropdown = document.getElementById("cadastreSearchResults");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toUpperCase().trim();
      if (!q || q.length < 2) {
        dropdown.style.display = "none";
        return;
      }

      // Search in sample dataset & NT features
      const matches = TENEMENTS_DATA.filter(t => t.tenureId.toUpperCase().includes(q) || t.title.toUpperCase().includes(q));
      
      if (matches.length === 0) {
        dropdown.innerHTML = `<div class="search-result-item" style="color:#94A3B8;">No cadastre title matches "${q}". Click manual entry below.</div>`;
      } else {
        dropdown.innerHTML = matches.map(m => `
          <div class="search-result-item" onclick="addTenementToPackage('${m.id}')">
            <span><strong>${m.tenureId}</strong> • ${m.title}</span>
            <span class="text-green">${m.areaKm2} km²</span>
          </div>
        `).join('');
      }
      dropdown.style.display = "block";
    });
  }

  // Toggle Manual Entry Panel
  const toggleManualBtn = document.getElementById("toggleManualBtn");
  const manualPanel = document.getElementById("manualEntryPanel");
  if (toggleManualBtn && manualPanel) {
    toggleManualBtn.addEventListener("click", () => {
      const isHidden = manualPanel.style.display === "none";
      manualPanel.style.display = isHidden ? "block" : "none";
      toggleManualBtn.innerHTML = isHidden ? '<i class="fa-solid fa-xmark"></i> Hide manual entry' : '<i class="fa-solid fa-pen-to-square"></i> Not in database, enter manually';
    });
  }

  // Form Submit Buttons
  const saveDraftBtn = document.getElementById("saveDraftListingBtn");
  const submitReviewBtn = document.getElementById("submitReviewListingBtn");

  if (saveDraftBtn) {
    saveDraftBtn.addEventListener("click", () => {
      alert("✓ Listing Draft Saved!\n\nYour tenement package draft has been saved locally. You can resume editing anytime.");
    });
  }

  if (submitReviewBtn) {
    submitReviewBtn.addEventListener("click", () => {
      const projName = document.getElementById("newProjectName").value.trim() || "New Tenement Listing";
      alert(`🎉 Listing Submitted for Review!\n\n"${projName}" has been submitted to the Tenement Exchange review team.`);
      closeListingPage();
    });
  }
}

// Open 50:50 Listing Creator View
// Show Toast Notification Banner
function showToastNotification(message) {
  const existing = document.querySelector(".listing-toast-notification");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "listing-toast-notification";
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> <span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Add or Toggle Cadastre Tenement in Listing Package
function addCadastreTenementToPackage(tObj) {
  const existingIdx = selectedListingTenements.findIndex(t => t.tenureId === tObj.tenureId);
  
  if (existingIdx !== -1) {
    // Unselect if clicked again
    const removed = selectedListingTenements.splice(existingIdx, 1)[0];
    showToastNotification(`Removed ${removed.tenureId} from listing package.`);
  } else {
    // Add to package
    selectedListingTenements.push(tObj);
    showToastNotification(`✓ Selected ${tObj.tenureId} (${tObj.areaKm2} km²) from map!`);
  }

  renderSelectedChips();
  updateRightMapPreview();
}

let createMapCadastreGroup = null;

let createMapBCLayerGroup = null;

// Open 50:50 Listing Creator View
function openListingPage() {
  document.querySelector(".main-split-container").style.display = "none";
  document.querySelector(".sub-filter-ribbon").style.display = "none";
  document.getElementById("createListingPage").style.display = "flex";

  // Initialize Right Map Viewport
  if (!createMap) {
    createMap = L.map("createMap", {
      zoomControl: false,
      attributionControl: false
    }).setView([-22.0, 133.5], 5); // Global view over all cadastre datasets

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      subdomains: "abcd"
    }).addTo(createMap);

    L.control.zoom({ position: "bottomright" }).addTo(createMap);
    createMapCadastreGroup = L.layerGroup().addTo(createMap);
    createMapBCLayerGroup = L.layerGroup().addTo(createMap);
    createMapLayerGroup = L.layerGroup().addTo(createMap);

    createMap.on("moveend", () => {
      fetchBCLiveDirectStream(createMap, createMapBCLayerGroup, true);
    });
    createMap.on("zoomend", () => {
      fetchBCLiveDirectStream(createMap, createMapBCLayerGroup, true);
    });

    // Layer selector listener on right map
    const jurSelect = document.getElementById("createMapJurisdiction");
    if (jurSelect) {
      jurSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "ALL") createMap.flyTo([-22.0, 133.5], 5, { duration: 1.2 });
        else if (val === "WA") createMap.flyTo([-25.0, 122.0], 6, { duration: 1.2 });
        else if (val === "NT") createMap.flyTo([-19.5, 133.5], 6, { duration: 1.2 });
        else if (val === "BC") {
          createMap.flyTo([54.5, -125.0], 6, { duration: 1.2 });
          setTimeout(() => fetchBCLiveDirectStream(createMap, createMapBCLayerGroup, true), 800);
        }
        else if (val === "PER") createMap.flyTo([-9.19, -75.01], 6, { duration: 1.2 });
      });
    }

    loadCreateMapCadastreLayers();
  } else {
    fetchBCLiveDirectStream(createMap, createMapBCLayerGroup, true);
  }

  setTimeout(() => {
    createMap.invalidateSize();
  }, 100);
}

// Load All Cadastre & GIS Overlay Polygon Layers on Right Map for Interactive Selection
function loadCreateMapCadastreLayers() {
  if (!createMap || !createMapCadastreGroup) return;

  const handlePolygonClick = (e, feature, defaultTitle, locationStr, defaultArea) => {
    L.DomEvent.stopPropagation(e);
    const p = feature.properties || {};
    const tenureId = p.titleId || p.tenureId || p.TENURE_NUMBER_ID || p.CODIGOU || p.CONCESION || defaultTitle;
    const location = p.location || locationStr;
    
    let areaKm2 = defaultArea || 50;
    if (p.areaKm2) areaKm2 = p.areaKm2;
    else if (p.HECTAGIS) areaKm2 = Math.round(parseFloat(p.HECTAGIS) / 100 * 10) / 10;
    else if (p.areaDisplay) {
      const match = p.areaDisplay.match(/([\d\.]+)/);
      if (match) areaKm2 = parseFloat(match[1]);
    }

    const geoLayer = L.geoJSON(feature);
    const bounds = geoLayer.getBounds();
    const center = bounds.getCenter();

    const tObj = {
      id: `map-sel-${tenureId.replace(/\s+/g, '-')}`,
      tenureId: tenureId,
      title: p.category || p.status || "Cadastre Tenement",
      location: location,
      areaKm2: areaKm2,
      lat: center.lat,
      lng: center.lng,
      feature: feature, // Preserve exact Multi-Vertex GeoJSON Feature geometry!
      bounds: [
        [bounds.getSouth(), bounds.getWest()],
        [bounds.getSouth(), bounds.getEast()],
        [bounds.getNorth(), bounds.getEast()],
        [bounds.getNorth(), bounds.getWest()]
      ]
    };

    addCadastreTenementToPackage(tObj);
  };

  // 1. NT Granted Exploration Titles
  fetch("./data/nt_expl_granted.json")
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: { color: "#059669", weight: 1.0, fillColor: "#10B981", fillOpacity: 0.28 },
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(`Click to select: ${feature.properties.titleId || 'NT Tenement'}`, { direction: "top" });
          layer.on("click", (e) => handlePolygonClick(e, feature, "NT Tenement", "Northern Territory", 150));
        }
      }).addTo(createMapCadastreGroup);
    }).catch(err => console.error("Error loading NT Expl Granted for createMap:", err));

  // 2. NT Exploration Applications
  fetch("./data/nt_expl_appl.json")
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: { color: "#0284C7", weight: 1.0, fillColor: "#38BDF8", fillOpacity: 0.28 },
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(`Click to select: ${feature.properties.titleId || 'NT Application'}`, { direction: "top" });
          layer.on("click", (e) => handlePolygonClick(e, feature, "NT Application", "Northern Territory", 110));
        }
      }).addTo(createMapCadastreGroup);
    }).catch(err => console.error("Error loading NT Expl Applications for createMap:", err));

  // 3. NT Mining & Production Leases
  fetch("./data/nt_prod_granted.json")
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: { color: "#7C3AED", weight: 1.0, fillColor: "#A855F7", fillOpacity: 0.28 },
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(`Click to select: ${feature.properties.titleId || 'NT Mining Lease'}`, { direction: "top" });
          layer.on("click", (e) => handlePolygonClick(e, feature, "NT Lease", "Northern Territory", 60));
        }
      }).addTo(createMapCadastreGroup);
    }).catch(err => console.error("Error loading NT Prod Granted for createMap:", err));

  fetch("./data/nt_prod_appl.json")
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: { color: "#C084FC", weight: 0.9, fillColor: "#E9D5FF", fillOpacity: 0.25 },
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(`Click to select: ${feature.properties.titleId || 'NT Lease Appl'}`, { direction: "top" });
          layer.on("click", (e) => handlePolygonClick(e, feature, "NT Lease Appl", "Northern Territory", 40));
        }
      }).addTo(createMapCadastreGroup);
    }).catch(err => console.error("Error loading NT Prod Applications for createMap:", err));

  // 4. NT Reserved Land
  fetch("./data/nt_reserves.json")
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: { color: "#DC2626", weight: 1.0, fillColor: "#EF4444", fillOpacity: 0.2, dashArray: "3,3" },
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(`NT Reserved Land: ${feature.properties.titleId || 'Reserve'}`, { direction: "top" });
        }
      }).addTo(createMapCadastreGroup);
    }).catch(err => console.error("Error loading NT Reserves for createMap:", err));

  // 5. WA Granted Exploration Titles
  fetch("./data/wa_expl_granted.json")
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: { color: "#059669", weight: 1.0, fillColor: "#10B981", fillOpacity: 0.28 },
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(`Click to select: ${feature.properties.titleId || 'WA Tenement'}`, { direction: "top" });
          layer.on("click", (e) => handlePolygonClick(e, feature, "WA Tenement", "Western Australia", 140));
        }
      }).addTo(createMapCadastreGroup);
    }).catch(err => console.error("Error loading WA Expl Granted for createMap:", err));

  // 6. WA Exploration Applications
  fetch("./data/wa_expl_appl.json")
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: { color: "#0284C7", weight: 1.0, fillColor: "#38BDF8", fillOpacity: 0.28 },
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(`Click to select: ${feature.properties.titleId || 'WA Application'}`, { direction: "top" });
          layer.on("click", (e) => handlePolygonClick(e, feature, "WA Application", "Western Australia", 95));
        }
      }).addTo(createMapCadastreGroup);
    }).catch(err => console.error("Error loading WA Expl Applications for createMap:", err));

  // 7. WA Mining Leases
  fetch("./data/wa_prod_granted.json")
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: { color: "#7C3AED", weight: 1.0, fillColor: "#A855F7", fillOpacity: 0.28 },
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(`Click to select: ${feature.properties.titleId || 'WA Mining Lease'}`, { direction: "top" });
          layer.on("click", (e) => handlePolygonClick(e, feature, "WA Lease", "Western Australia", 45));
        }
      }).addTo(createMapCadastreGroup);
    }).catch(err => console.error("Error loading WA Mining Leases for createMap:", err));

  fetch("./data/wa_prod_appl.json")
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: { color: "#C084FC", weight: 0.9, fillColor: "#E9D5FF", fillOpacity: 0.25 },
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(`Click to select: ${feature.properties.titleId || 'WA Lease Appl'}`, { direction: "top" });
          layer.on("click", (e) => handlePolygonClick(e, feature, "WA Lease Appl", "Western Australia", 35));
        }
      }).addTo(createMapCadastreGroup);
    }).catch(err => console.error("Error loading WA Mining Leases Applications for createMap:", err));

  // 8. Peru INGEMMET Cadastre Layer on createMap
  const perCreateTileLayer = new L.TileLayer.EsriExport(
    "https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CATASTRO_MINERO_WGS84/MapServer",
    {
      opacity: 0.75,
      zIndex: 10
    }
  );
  perCreateTileLayer.addTo(createMapCadastreGroup);

  // 9. Featured Marketplace Claims on createMap
  TENEMENTS_DATA.forEach(item => {
    if (item.bounds) {
      const poly = L.polygon(item.bounds, {
        color: "#059669",
        weight: 1.8,
        fillColor: "#10B981",
        fillOpacity: 0.35
      }).addTo(createMapCadastreGroup);

      poly.bindTooltip(`Click to select: ${item.tenureId} (${item.title})`, { direction: "top" });
      poly.on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        addCadastreTenementToPackage(item);
      });
    }
  });
}

// Close 50:50 Listing Creator View
function closeListingPage() {
  document.getElementById("createListingPage").style.display = "none";
  document.querySelector(".main-split-container").style.display = "flex";
  document.querySelector(".sub-filter-ribbon").style.display = "flex";
  setTimeout(() => {
    map.invalidateSize();
  }, 100);
}

// Add Tenement to Selected Package & Highlight in RED on Right Map
function addTenementToPackage(id) {
  const item = TENEMENTS_DATA.find(t => t.id === id);
  if (!item) return;

  addCadastreTenementToPackage(item);
  document.getElementById("cadastreSearchResults").style.display = "none";
  document.getElementById("cadastreSearchInput").value = "";
}

// Remove Tenement Chip
function removeTenementFromPackage(id) {
  selectedListingTenements = selectedListingTenements.filter(t => t.id !== id && t.tenureId !== id);
  renderSelectedChips();
  updateRightMapPreview();
}

// Render Selected Chips & Auto-Calculate Metrics
function renderSelectedChips() {
  const container = document.getElementById("selectedChipsList");
  document.getElementById("createMapCount").innerText = selectedListingTenements.length;

  if (selectedListingTenements.length === 0) {
    container.innerHTML = `<span class="chips-placeholder">No tenements selected yet. Click map on the right or search database above.</span>`;
    document.getElementById("manualArea").value = "";
    document.getElementById("manualState").value = "";
    document.getElementById("manualCountry").value = "";
    document.getElementById("manualLatInput").value = "";
    document.getElementById("manualLngInput").value = "";
    return;
  }

  container.innerHTML = selectedListingTenements.map(t => `
    <span class="tenement-chip">
      <i class="fa-solid fa-map-pin"></i> ${t.tenureId} (${t.areaKm2} km²)
      <i class="fa-solid fa-xmark chip-remove" onclick="removeTenementFromPackage('${t.id || t.tenureId}')"></i>
    </span>
  `).join('');

  // Auto-Calculate Total Area
  const totalArea = selectedListingTenements.reduce((sum, t) => sum + (parseFloat(t.areaKm2) || 0), 0);
  document.getElementById("manualArea").value = Math.round(totalArea * 10) / 10;

  // Auto-Fill State & Country & Lat/Lng Coordinates
  const lastItem = selectedListingTenements[selectedListingTenements.length - 1];
  if (lastItem) {
    if (lastItem.location) {
      const loc = lastItem.location;
      if (loc.includes("Western Australia") || loc.includes("WA")) {
        document.getElementById("manualState").value = "Western Australia";
        document.getElementById("manualCountry").value = "Australia";
      } else if (loc.includes("Northern Territory") || loc.includes("NT")) {
        document.getElementById("manualState").value = "Northern Territory";
        document.getElementById("manualCountry").value = "Australia";
      } else if (loc.includes("British Columbia") || loc.includes("BC")) {
        document.getElementById("manualState").value = "British Columbia";
        document.getElementById("manualCountry").value = "Canada";
      } else if (loc.includes("Perú") || loc.includes("Peru")) {
        document.getElementById("manualState").value = "Perú";
        document.getElementById("manualCountry").value = "Perú";
      } else {
        document.getElementById("manualState").value = loc;
        document.getElementById("manualCountry").value = "Australia";
      }
    }

    if (lastItem.lat && lastItem.lng) {
      document.getElementById("manualLatInput").value = lastItem.lat.toFixed(4);
      document.getElementById("manualLngInput").value = lastItem.lng.toFixed(4);
    }
  }
}

// Highlight Selected Tenement Polygons in RED (#EF4444) without moving/zooming the camera
function updateRightMapPreview() {
  if (!createMap || !createMapLayerGroup) return;

  createMapLayerGroup.clearLayers();

  if (selectedListingTenements.length === 0) return;

  selectedListingTenements.forEach(item => {
    if (item.feature) {
      // Draw EXACT GeoJSON Polygon Shape in Vibrant Red (#EF4444)
      const layer = L.geoJSON(item.feature, {
        style: {
          color: "#DC2626",      // Bold Red Border
          weight: 3.5,
          fillColor: "#EF4444",  // Vibrant Red Fill
          fillOpacity: 0.55
        }
      }).addTo(createMapLayerGroup);

      layer.bindTooltip(`${item.tenureId}`, { permanent: true, direction: "center" });
    } else if (item.bounds) {
      // Fallback for featured marketplace items with explicit polygon coordinates
      const poly = L.polygon(item.bounds, {
        color: "#DC2626",      // Bold Red Border
        weight: 3.5,
        fillColor: "#EF4444",  // Vibrant Red Fill
        fillOpacity: 0.55
      }).addTo(createMapLayerGroup);

      poly.bindTooltip(`${item.tenureId}`, { permanent: true, direction: "center" });
    }
  });
}

// ==========================================================================
// TENEMENT DETAIL & PROPERTY INTELLIGENCE PAGE LOGIC
// ==========================================================================

let detailMap = null;
let detailMapJurisdictionGroup = null;
let detailMapSellerOverlaysGroup = null;
let detailMapTargetPolygonGroup = null;

function openTenementDetailPage(id) {
  const item = TENEMENTS_DATA.find(t => t.id === id) || TENEMENTS_DATA[0];
  if (!item) return;

  // Hide Main Split Container and Creator Page
  document.querySelector(".main-split-container").style.display = "none";
  document.querySelector(".sub-filter-ribbon").style.display = "none";
  document.getElementById("createListingPage").style.display = "none";
  document.getElementById("tenementDetailPage").style.display = "flex";

  // Populate Header Title (Clean single title string matching user directive)
  const displayTitle = item.otherCount && item.otherCount > 0 
    ? `${item.title} and others` 
    : item.title;
  const titleElem = document.getElementById("detailTenementTitle");
  if (titleElem) titleElem.innerText = displayTitle;

  const subElem = document.getElementById("detailTenementSub");
  if (subElem) subElem.style.display = "none";
  document.getElementById("detailAskingPrice").innerText = item.priceDisplay || "Price on Application";
  document.getElementById("detailDealType").innerHTML = `<i class="fa-solid fa-handshake text-green"></i> ${item.dealType || "Outright Sale"}`;
  document.getElementById("detailTenureId").innerText = item.tenureId;
  document.getElementById("detailArea").innerText = `${item.areaKm2} km² (${item.blocks || Math.round(item.areaKm2/3)} Sub-blocks)`;
  document.getElementById("detailCommodities").innerText = item.commodity ? item.commodity.join(", ") : "Au, Cu";
  document.getElementById("detailLocation").innerText = item.location;
  document.getElementById("detailExpiry").innerText = `${item.expiryDate || '2031-12-01'} (${item.status})`;
  document.getElementById("detailCommitment").innerText = item.annualCommitment ? `$${item.annualCommitment.toLocaleString()} AUD / yr` : "$100,000 AUD / yr";
  
  const licenceTypeElem = document.getElementById("detailLicenceType");
  if (licenceTypeElem) licenceTypeElem.innerText = `${item.status} Licence`;

  // Jurisdiction Text
  const jurCode = item.jurisdiction || "WA";
  const scopeElem = document.getElementById("detailMapScopeText");
  if (scopeElem) {
    const jurName = jurCode === "WA" ? "Western Australia Jurisdiction Only" : jurCode === "NT" ? "Northern Territory Jurisdiction Only" : jurCode === "BC" ? "British Columbia Jurisdiction Only" : "Peru Jurisdiction Only";
    scopeElem.innerText = jurName;
  }

  // Reset tab active state to Summary tab
  document.querySelectorAll(".left-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".left-tab-pane").forEach(p => p.classList.remove("active"));
  const sumTabBtn = document.querySelector(".left-tab-btn[data-tab='tabSummary']");
  const sumPane = document.getElementById("tabSummary");
  if (sumTabBtn) sumTabBtn.classList.add("active");
  if (sumPane) sumPane.classList.add("active");

  // Initialize or Re-center Detail Focus Map
  if (!detailMap) {
    detailMap = L.map("detailMap", {
      zoomControl: false,
      attributionControl: false
    }).setView([item.lat, item.lng], 10);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      subdomains: "abcd"
    }).addTo(detailMap);

    L.control.zoom({ position: "bottomright" }).addTo(detailMap);

    detailMapJurisdictionGroup = L.layerGroup().addTo(detailMap);
    detailMapSellerOverlaysGroup = L.layerGroup().addTo(detailMap);
    detailMapTargetPolygonGroup = L.layerGroup().addTo(detailMap);

    setupDetailMapOverlayHandlers();
  }

  // Load ONLY that specific Jurisdiction Cadastre onto detailMap
  loadDetailMapJurisdiction(jurCode);

  // Render Target Polygon Highlight in RED
  detailMapTargetPolygonGroup.clearLayers();
  if (item.bounds) {
    const poly = L.polygon(item.bounds, {
      color: "#DC2626",      // Bold Red Border
      weight: 4.0,
      fillColor: "#EF4444",  // Vibrant Red Fill
      fillOpacity: 0.55
    }).addTo(detailMapTargetPolygonGroup);

    poly.bindTooltip(`${item.tenureId}`, { permanent: true, direction: "center" });

    detailMap.flyToBounds(poly.getBounds(), { padding: [50, 50], duration: 1.2 });
  } else {
    detailMap.flyTo([item.lat, item.lng], 10, { duration: 1.2 });
  }

  // Render Seller Technical Overlays (Geochem, Geophysics, Native Title, Drill collars)
  renderDetailSellerOverlays(item);

  setTimeout(() => {
    detailMap.invalidateSize();
  }, 100);
}

function closeTenementDetailPage() {
  document.getElementById("tenementDetailPage").style.display = "none";
  document.querySelector(".main-split-container").style.display = "flex";
  document.querySelector(".sub-filter-ribbon").style.display = "flex";
  if (map) {
    setTimeout(() => map.invalidateSize(), 100);
  }
}

// Load ONLY that Jurisdiction's Cadastre onto detailMap (Never the whole world)
function loadDetailMapJurisdiction(jurCode) {
  if (!detailMap || !detailMapJurisdictionGroup) return;
  detailMapJurisdictionGroup.clearLayers();

  if (jurCode === "NT") {
    fetch("./data/nt_expl_granted.json")
      .then(res => res.json())
      .then(data => {
        L.geoJSON(data, { style: { color: "#059669", weight: 0.8, fillColor: "#10B981", fillOpacity: 0.2 } }).addTo(detailMapJurisdictionGroup);
      });
  } else if (jurCode === "WA") {
    fetch("./data/wa_expl_granted.json")
      .then(res => res.json())
      .then(data => {
        L.geoJSON(data, { style: { color: "#059669", weight: 0.8, fillColor: "#10B981", fillOpacity: 0.2 } }).addTo(detailMapJurisdictionGroup);
      });
  } else if (jurCode === "BC") {
    fetchBCLiveDirectStream(detailMap, detailMapJurisdictionGroup, false);
  } else if (jurCode === "PER") {
    const perTileLayer = new L.TileLayer.EsriExport("https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CATASTRO_MINERO_WGS84/MapServer", { opacity: 0.7 });
    perTileLayer.addTo(detailMapJurisdictionGroup);
  }
}

// Render Seller Technical Overlays (Geochem, Geophysics, Native Title, Drill collars)
function renderDetailSellerOverlays(item) {
  if (!detailMap || !detailMapSellerOverlaysGroup) return;
  detailMapSellerOverlaysGroup.clearLayers();

  const centerLat = item.lat;
  const centerLng = item.lng;

  // 1. Geochem Sampling Points (Soil & Rock Chip Assays - Red/Gold Dots)
  const geochemLayer = L.layerGroup();
  const samplePoints = [
    { lat: centerLat + 0.02, lng: centerLng - 0.03, grade: "28.5 g/t Au (Rock Chip)" },
    { lat: centerLat - 0.015, lng: centerLng + 0.025, grade: "14.2 g/t Au (Soil Sample)" },
    { lat: centerLat + 0.035, lng: centerLng + 0.01, grade: "4.2% Cu (Malachite Outcrop)" },
    { lat: centerLat - 0.04, lng: centerLng - 0.02, grade: "9.6 g/t Au (Gossan Chip)" }
  ];

  samplePoints.forEach(pt => {
    L.circleMarker([pt.lat, pt.lng], {
      radius: 6,
      color: "#DC2626",
      fillColor: "#EF4444",
      fillOpacity: 0.95,
      weight: 1.5
    }).bindTooltip(`🧪 Geochem Assay: ${pt.grade}`, { direction: "top" }).addTo(geochemLayer);
  });

  // 2. Geophysics Aeromagnetic Anomaly Contours (Purple Circle Overlay)
  const geophysicsLayer = L.layerGroup();
  const magAnomaly = L.circle([centerLat, centerLng], {
    radius: 3500,
    color: "#7C3AED",
    weight: 2,
    dashArray: "6, 6",
    fillColor: "#A855F7",
    fillOpacity: 0.15
  }).bindTooltip("🧲 Aeromagnetic High Anomaly (Intrusive Target Zone)", { direction: "top" });
  geophysicsLayer.addLayer(magAnomaly);

  // 3. Native Title & Heritage Clearance Zone (Amber Dashed Polygon)
  const nativeTitleLayer = L.layerGroup();
  const heritageZone = L.circle([centerLat + 0.01, centerLng - 0.01], {
    radius: 5200,
    color: "#D97706",
    weight: 1.8,
    dashArray: "8, 4",
    fillColor: "#F59E0B",
    fillOpacity: 0.1
  }).bindTooltip("📜 Native Title Executed Area & Heritage Cleared Corridor", { direction: "top" });
  nativeTitleLayer.addLayer(heritageZone);

  // 4. Drill Collars (RC / Diamond Drill Holes - Blue Markers)
  const drillLayer = L.layerGroup();
  const drillHoles = [
    { lat: centerLat + 0.01, lng: centerLng + 0.005, name: "PTR014 (12m @ 4.82 g/t Au)" },
    { lat: centerLat - 0.008, lng: centerLng - 0.012, name: "PTR022 (14m @ 2.45 g/t Au)" },
    { lat: centerLat + 0.018, lng: centerLng - 0.008, name: "PTRD004 (18m @ 3.10 g/t Au & 0.92% Cu)" }
  ];

  drillHoles.forEach(dh => {
    L.circleMarker([dh.lat, dh.lng], {
      radius: 7,
      color: "#0284C7",
      fillColor: "#38BDF8",
      fillOpacity: 0.95,
      weight: 2
    }).bindTooltip(`🎯 Drill Hole: ${dh.name}`, { direction: "top" }).addTo(drillLayer);
  });

  // Store in global window map for toggle checkboxes
  window.detailOverlayLayers = {
    chkSellerGeochem: geochemLayer,
    chkSellerGeophysics: geophysicsLayer,
    chkSellerNativeTitle: nativeTitleLayer,
    chkSellerDrilling: drillLayer
  };

  // Add all layers to map by default
  detailMapSellerOverlaysGroup.addLayer(geochemLayer);
  detailMapSellerOverlaysGroup.addLayer(geophysicsLayer);
  detailMapSellerOverlaysGroup.addLayer(nativeTitleLayer);
  detailMapSellerOverlaysGroup.addLayer(drillLayer);
}

function setupDetailMapOverlayHandlers() {
  const ids = ["chkSellerGeochem", "chkSellerGeophysics", "chkSellerNativeTitle", "chkSellerDrilling"];
  ids.forEach(id => {
    const chk = document.getElementById(id);
    if (chk) {
      chk.addEventListener("change", (e) => {
        const layer = window.detailOverlayLayers && window.detailOverlayLayers[id];
        if (!layer || !detailMapSellerOverlaysGroup) return;
        if (e.target.checked) {
          detailMapSellerOverlaysGroup.addLayer(layer);
        } else {
          detailMapSellerOverlaysGroup.removeLayer(layer);
        }
      });
    }
  });

  // Chrome tab dropdown switcher button (v) - Only active when > 5 tabs present
  const tabDropBtn = document.getElementById("leftTabDropdownBtn");
  const tabDropMenu = document.getElementById("leftTabMenuDropdown");
  const tabCount = document.querySelectorAll(".left-tab-btn").length;

  if (tabDropBtn && tabDropBtn.parentElement) {
    if (tabCount <= 5) {
      tabDropBtn.parentElement.style.display = "none";
    } else {
      tabDropBtn.parentElement.style.display = "flex";
    }
  }

  if (tabDropBtn && tabDropMenu) {
    tabDropBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const currentTabCount = document.querySelectorAll(".left-tab-btn").length;
      if (currentTabCount <= 5) {
        tabDropMenu.style.display = "none";
        return;
      }
      tabDropMenu.style.display = tabDropMenu.style.display === "none" ? "block" : "none";
    });

    document.addEventListener("click", () => {
      tabDropMenu.style.display = "none";
    });
  }

  // Helper function to switch left card tab
  function switchLeftCardTab(tabId) {
    document.querySelectorAll(".left-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-menu-item").forEach(m => m.classList.remove("active"));
    document.querySelectorAll(".left-tab-pane").forEach(p => p.classList.remove("active"));

    const tabBtn = document.querySelector(`.left-tab-btn[data-tab='${tabId}']`);
    const menuItem = document.querySelector(`.tab-menu-item[data-tab='${tabId}']`);
    const pane = document.getElementById(tabId);

    if (tabBtn) tabBtn.classList.add("active");
    if (menuItem) menuItem.classList.add("active");
    if (pane) pane.classList.add("active");
  }

  document.querySelectorAll(".left-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchLeftCardTab(tabId);
    });
  });

  document.querySelectorAll(".tab-menu-item").forEach(item => {
    item.addEventListener("click", () => {
      const tabId = item.getAttribute("data-tab");
      switchLeftCardTab(tabId);
      if (tabDropMenu) tabDropMenu.style.display = "none";
    });
  });

  // Navigation handlers
  const backBtn = document.getElementById("backToAtlasFromDetailBtn");
  if (backBtn) backBtn.addEventListener("click", closeTenementDetailPage);

  const openVdrBtn = document.getElementById("openVdrFromDetailBtn");
  const dealCardVdrBtn = document.getElementById("dealCardVdrBtn");
  if (openVdrBtn) openVdrBtn.addEventListener("click", () => openVdrModal("Paterson South"));
  if (dealCardVdrBtn) dealCardVdrBtn.addEventListener("click", () => openVdrModal("Paterson South"));
}

// Initialize Handlers on Load
document.addEventListener("DOMContentLoaded", () => {
  setupListingPageHandlers();
});
