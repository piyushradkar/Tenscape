// ==========================================================================
// TENEMENT EXCHANGE - APPLICATION LOGIC & MAP INTERACTIVITY
// ==========================================================================

// Sample Dataset of Verified Global Exploration Tenements
const TENEMENTS_DATA = [
  {
    id: "WA-EL45-5892",
    tenureId: "E 45/5892",
    title: "Paterson South Gold-Copper Project",
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
    priceDisplay: "From $450,000 AUD",
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
    bgGradient: "linear-gradient(135deg, #1e293b, #0f172a)",
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
    bgGradient: "linear-gradient(135deg, #0f766e, #115e59)",
    description: "Adjacent to SQM/Wesfarmers Earl Grey Lithium deposit. Pegmatite swarms mapped on surface with up to 1.8% Li2O rock chips."
  },
  {
    id: "ONT-ML-8841",
    tenureId: "CL 884102",
    title: "Abitibi Greenstone Gold Belt",
    location: "Timmins Mining District, Ontario, Canada",
    jurisdiction: "ONT",
    commodity: ["Au", "REE"],
    stage: "Grassroots",
    status: "Granted",
    cadastreVerified: true,
    areaKm2: 210,
    blocks: 70,
    expiryDate: "2028-11-05",
    annualCommitment: 95000,
    priceDisplay: "$320,000 CAD",
    priceVal: 350000,
    dealType: "Option Agreement",
    dealDetails: "Option to buy 100% for $320k cash + 500k shares",
    isFavorite: false,
    lat: 48.48,
    lng: -81.33,
    bounds: [
      [48.42, -81.40],
      [48.42, -81.25],
      [48.54, -81.25],
      [48.54, -81.40]
    ],
    bgGradient: "linear-gradient(135deg, #b45309, #78350f)",
    description: "High-grade quartz vein structure along the Destor-Porcupine Fault zone. Historical shallow pitting sampled 12.4 g/t Au."
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
    bgGradient: "linear-gradient(135deg, #0369a1, #075985)",
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
    bgGradient: "linear-gradient(135deg, #c2410c, #9a3412)",
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
    bgGradient: "linear-gradient(135deg, #475569, #1e293b)",
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
    bgGradient: "linear-gradient(135deg, #b45309, #d97706)",
    description: "High-grade shallow gold intercepts (4m @ 8.2 g/t Au from 24m). Fully permitted for exploratory RC drilling."
  },
  {
    id: "ONT-CL-5501",
    tenureId: "CL 55019",
    title: "Athabasca Margin Uranium Claim",
    location: "Saskatchewan / Ontario Border, Canada",
    jurisdiction: "ONT",
    commodity: ["U", "REE"],
    stage: "Advanced Exploration",
    status: "Granted",
    cadastreVerified: true,
    areaKm2: 125,
    blocks: 42,
    expiryDate: "2030-06-30",
    annualCommitment: 75000,
    priceDisplay: "From $580,000 CAD",
    priceVal: 620000,
    dealType: "Farm-In JV (60%)",
    dealDetails: "Earn 60% by funding $1.0M airborne geophysics & drilling",
    isFavorite: false,
    lat: 57.50,
    lng: -104.20,
    bounds: [
      [57.44, -104.30],
      [57.44, -104.10],
      [57.56, -104.10],
      [57.56, -104.30]
    ],
    bgGradient: "linear-gradient(135deg, #991b1b, #7f1d1d)",
    description: "Unconformity-hosted uranium target with prominent electromagnetic (EM) conductor anomaly corridor."
  }
];

// App State
let map;
let polygonLayersMap = {};
let cadastreLayerGroup;
let geologyLayerGroup;
let assaysLayerGroup;
let minesLayerGroup;
let activeSelectedId = null;

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  renderListings(TENEMENTS_DATA);
  setupEventListeners();
});

// Initialize Leaflet Map
function initMap() {
  map = L.map("map", {
    zoomControl: false,
    attributionControl: false
  }).setView([-25.0, 134.0], 5);

  const lightBasemap = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
    subdomains: "abcd"
  }).addTo(map);

  L.control.zoom({ position: "bottomleft" }).addTo(map);

  cadastreLayerGroup = L.layerGroup().addTo(map);
  geologyLayerGroup = L.layerGroup().addTo(map);
  assaysLayerGroup = L.layerGroup().addTo(map);
  minesLayerGroup = L.layerGroup().addTo(map);

  renderMapPolygons(TENEMENTS_DATA);
  renderOverlayFeatures();
  fitMapToAllTenements();
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
  TENEMENTS_DATA.forEach(t => {
    const lat = t.lat;
    const lng = t.lng;
    const cadastreRect = L.rectangle([
      [lat - 0.15, lng - 0.20],
      [lat + 0.15, lng + 0.20]
    ], {
      color: "#2563EB",
      weight: 1,
      dashArray: "4, 4",
      fill: false
    });
    cadastreLayerGroup.addLayer(cadastreRect);
  });

  const faultLine = L.polyline([
    [-21.40, 122.00],
    [-21.80, 122.45]
  ], {
    color: "#D97706",
    weight: 2,
    dashArray: "6, 6"
  });
  geologyLayerGroup.addLayer(faultLine);

  const assayHit1 = L.circleMarker([-21.64, 122.18], {
    radius: 7,
    color: "#DC2626",
    fillColor: "#EF4444",
    fillOpacity: 0.9
  }).bindTooltip("Drill Hit: 14m @ 6.8 g/t Au (Hole PT-09)");
  assaysLayerGroup.addLayer(assayHit1);

  const mineMarker = L.circleMarker([-21.55, 122.35], {
    radius: 9,
    color: "#6B21A8",
    fillColor: "#7C3AED",
    fillOpacity: 0.9
  }).bindTooltip("Telfer Gold-Copper Operating Mine (15km NE)");
  minesLayerGroup.addLayer(mineMarker);
}

function fitMapToAllTenements() {
  const bounds = L.latLngBounds(TENEMENTS_DATA.map(t => [t.lat, t.lng]));
  map.fitBounds(bounds, { padding: [50, 50] });
}

// Render Tenement Listing Cards on Sidebar (DOMAIN.COM.AU EXACT MATCH PATTERN)
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

  container.innerHTML = data.map(item => `
    <div class="tenement-card ${activeSelectedId === item.id ? 'active-selected' : ''}" 
         id="card-${item.id}" 
         onclick="selectTenement('${item.id}', true)">
      
      <!-- Card Image / Map Snapshot Header -->
      <div class="card-map-header" style="background-image: ${item.bgGradient};">
        <div class="card-top-badges">
          <span class="tenure-id-badge">${item.tenureId}</span>
          ${item.cadastreVerified ? `
            <span class="cadastre-verified-badge">
              <span class="pulse-dot"></span> Cadastre Verified
            </span>
          ` : ''}
        </div>

        <div class="card-bottom-badges">
          <span class="deal-type-pill">${item.dealType}</span>
        </div>
      </div>

      <!-- DOMAIN-STYLE LIGHT TONE CONTENT BOX -->
      <div class="card-info-box">
        
        <!-- Top Row: Price Headline + Favorite Star -->
        <div class="info-top-row">
          <div class="card-price-headline">${item.priceDisplay}</div>
          <button class="favorite-star-btn ${item.isFavorite ? 'active' : ''}" 
                  onclick="event.stopPropagation(); toggleFavorite('${item.id}')" 
                  title="Save Tenement">
            <i class="${item.isFavorite ? 'fa-solid' : 'fa-regular'} fa-star"></i>
          </button>
        </div>

        <!-- Sub-headline: Address / Title & Location -->
        <div class="card-project-location">
          ${item.tenureId} • ${item.title}, ${item.jurisdiction}
        </div>

        <!-- Domain-Style Inline Features Row (Icons + Specs) -->
        <div class="card-inline-features">
          <span class="feature-spec" title="Tenement Area Size">
            <i class="fa-solid fa-vector-square feature-icon"></i> ${item.areaKm2} km²
          </span>
          <span class="feature-spec" title="Prospective Commodities">
            <i class="fa-solid fa-gem feature-icon"></i> ${item.commodity.join(', ')}
          </span>
          <span class="feature-spec" title="Exploration Stage">
            <i class="fa-solid fa-pickaxe feature-icon"></i> ${item.stage.split(' ')[0]}
          </span>
          <span class="feature-dot">•</span>
          <span class="feature-tenure-type">${item.status} EL</span>
        </div>

        <!-- Card Footer Row: Commitment & VDR Button -->
        <div class="info-box-footer">
          <div class="expenditure-tag">
            <i class="fa-solid fa-sack-dollar"></i> Commitment: <strong>$${(item.annualCommitment/1000).toFixed(0)}k/yr</strong>
          </div>
          <button class="btn-card-vdr" onclick="event.stopPropagation(); openVdrModal('${item.id}')">
            <i class="fa-solid fa-lock"></i> Data Room
          </button>
        </div>

      </div>

    </div>
  `).join('');
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
  selectTenement(id, true);
  openVdrModal(id);
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
  };

  searchInput.addEventListener("input", filterHandler);
  commodityFilter.addEventListener("change", filterHandler);
  jurisdictionFilter.addEventListener("change", filterHandler);
  dealFilter.addEventListener("change", filterHandler);
  sortBy.addEventListener("change", filterHandler);

  document.getElementById("layerTenements").addEventListener("change", (e) => {
    Object.values(polygonLayersMap).forEach(poly => e.target.checked ? map.addLayer(poly) : map.removeLayer(poly));
  });
  document.getElementById("layerCadastre").addEventListener("change", (e) => {
    e.target.checked ? map.addLayer(cadastreLayerGroup) : map.removeLayer(cadastreLayerGroup);
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
    openVdrModal("WA-EL45-5892");
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
