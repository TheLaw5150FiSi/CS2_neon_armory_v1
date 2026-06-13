// ======================== KARTEN HUB ========================
// CS2 Neon Armory - Map Knowledge Hub

const competitiveMaps = [
  { id: "ancient", name: "Ancient", image: "ancient.webp", color: "#8B7355" },
  { id: "anubis", name: "Anubis", image: "anubis.webp", color: "#D4A574" },
  { id: "cache", name: "Cache", image: "cache.webp", color: "#6B8E23" },
  { id: "dust2", name: "Dust II", image: "dust2.webp", color: "#D2B48C" },
  { id: "inferno", name: "Inferno", image: "inferno.webp", color: "#8B4513" },
  { id: "mirage", name: "Mirage", image: "mirage.webp", color: "#DAA520" },
  { id: "nuke", name: "Nuke", image: "nuke.webp", color: "#708090" },
  { id: "overpass", name: "Overpass", image: "overpass.webp", color: "#2E8B57" },
  { id: "train", name: "Train", image: "train.webp", color: "#696969" },
  { id: "vertigo", name: "Vertigo", image: "vertigo.webp", color: "#4682B4" }
];

// Kategorien für jede Map (reduziert)
const mapCategories = {
  callouts: {
    name: "📍 Callouts & Positionen",
    icon: "fa-location-dot",
    desc: "Alle wichtigen Positionsnamen auf der Karte",
    color: "#44aaff"
  },
  utility: {
    name: "💣 Utility",
    icon: "fa-grenade",
    desc: "Smokes, Molotovs, Flashbangs & Popflashes",
    color: "#ffaa44"
  },
  offangles: {
    name: "🎯 Off-Angles",
    icon: "fa-eye",
    desc: "Ungewöhnliche Positionen für Überraschungsmomente",
    color: "#ff66cc"
  },
  strats: {
    name: "⚔️ Standard Strategien",
    icon: "fa-chess-board",
    desc: "Default Strats, Executes & Rotations",
    color: "#66ff66"
  },
  boosts: {
    name: "🪜 Boosts & Selbstboosts",
    icon: "fa-arrow-up",
    desc: "Team-Boosts und Solo-Boost Spots",
    color: "#aa66ff"
  }
};

let selectedMap = null;
let selectedCategory = null;

function initMapHub() {
  console.log("🗺️ KARTEN HUB initialisiert");
  renderMapGrid();
}

function renderMapGrid() {
  const container = document.getElementById("mapHubGrid");
  if (!container) {
    console.error("mapHubGrid Container nicht gefunden!");
    return;
  }
  
  container.innerHTML = `
    <div class="maphub-header">
      <h3>🗺️ Wähle deine Map</h3>
      <p>Klicke auf eine Karte, um alle Informationen zu Callouts, Utility, Strategien und mehr zu sehen</p>
    </div>
    <div class="maphub-grid">
      ${competitiveMaps.map(map => `
        <div class="maphub-map-card" data-map-id="${map.id}">
          <div class="maphub-map-image">
            <img src="img/maps/${map.image}" alt="${map.name}" loading="lazy" onerror="this.src='img/maps/placeholder.png'">
            <div class="maphub-map-overlay">
              <span class="maphub-map-name">${map.name}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  // Event-Listener für Map-Karten
  document.querySelectorAll('.maphub-map-card').forEach(card => {
    card.addEventListener('click', () => {
      const mapId = card.dataset.mapId;
      selectMap(mapId);
    });
  });
}

function selectMap(mapId) {
  selectedMap = competitiveMaps.find(m => m.id === mapId);
  if (!selectedMap) return;
  
  console.log("Map ausgewählt:", selectedMap.name);
  
  // Kategorien-Container anzeigen
  const categoriesContainer = document.getElementById("mapHubCategories");
  const contentContainer = document.getElementById("mapHubContent");
  
  if (categoriesContainer) categoriesContainer.style.display = "block";
  if (contentContainer) contentContainer.style.display = "block";
  
  renderCategories();
  selectCategory("callouts");
  
  // Sanft scrollen
  if (categoriesContainer) {
    setTimeout(() => {
      categoriesContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
}

function renderCategories() {
  const container = document.getElementById("mapHubCategories");
  if (!container || !selectedMap) return;
  
  container.innerHTML = `
    <div class="maphub-categories-header">
      <div class="maphub-selected-map">
        <img src="img/maps/${selectedMap.image}" alt="${selectedMap.name}" class="maphub-selected-thumb" onerror="this.src='img/maps/placeholder.png'">
        <div class="maphub-selected-info">
          <h3>${selectedMap.name}</h3>
          <p>Wähle eine Kategorie, um Details zu sehen</p>
        </div>
      </div>
      <div class="maphub-categories-grid">
        ${Object.entries(mapCategories).map(([key, cat]) => `
          <div class="maphub-category-card" data-category="${key}">
            <div class="maphub-category-icon" style="background: ${cat.color}20; border-color: ${cat.color};">
              <i class="fas ${cat.icon}" style="color: ${cat.color};"></i>
            </div>
            <div class="maphub-category-info">
              <h4>${cat.name}</h4>
              <p>${cat.desc}</p>
            </div>
            <div class="maphub-category-arrow">
              <i class="fas fa-chevron-right" style="color: ${cat.color};"></i>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  // Event-Listener für Kategorien
  document.querySelectorAll('.maphub-category-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      selectCategory(category);
    });
  });
}

function selectCategory(categoryKey) {
  selectedCategory = categoryKey;
  console.log("Kategorie ausgewählt:", categoryKey);
  
  // Aktive Klasse setzen
  document.querySelectorAll('.maphub-category-card').forEach(card => {
    card.classList.remove('active');
    if (card.dataset.category === categoryKey) {
      card.classList.add('active');
    }
  });
  
  renderCategoryContent(categoryKey);
}

function renderCategoryContent(categoryKey) {
  const container = document.getElementById("mapHubContent");
  if (!container || !selectedMap) return;
  
  const category = mapCategories[categoryKey];
  if (!category) return;
  
  container.innerHTML = `
    <div class="maphub-content-header">
      <div class="maphub-content-title">
        <i class="fas ${category.icon}" style="color: ${category.color};"></i>
        <h3>${category.name}</h3>
        <span class="maphub-map-badge">${selectedMap.name}</span>
      </div>
      <div class="maphub-content-desc">${category.desc}</div>
    </div>
    <div class="maphub-content-body">
      ${renderCategorySpecificContent(categoryKey)}
    </div>
  `;
}

function renderCategorySpecificContent(categoryKey) {
  const mapName = selectedMap.name.toLowerCase();
  
  switch(categoryKey) {
    case "callouts":
      return `
        <div class="maphub-callouts-container">
          <div class="maphub-callouts-map">
            <div class="maphub-image-placeholder">
              <i class="fas fa-map"></i>
              <span>📌 Interaktive Karte mit Callouts wird geladen...</span>
              <p style="margin-top: 0.5rem; font-size: 0.7rem;">🎯 Demo: Alle Positionsnamen für ${selectedMap.name}</p>
            </div>
          </div>
          <div class="maphub-callouts-list">
            <h4>📋 Wichtige Callouts</h4>
            <div class="maphub-callouts-grid">
              ${getDemoCallouts(mapName)}
            </div>
            <div class="info-text" style="margin-top: 1rem;">
              💡 In der finalen Version wird eine interaktive Karte mit allen Positionen angezeigt.
            </div>
          </div>
        </div>
      `;
      
    case "utility":
      return `
        <div class="maphub-utility-container">
          <div class="maphub-utility-tabs">
            <button class="utility-tab active" data-type="smokes">💨 Smokes</button>
            <button class="utility-tab" data-type="molly">🔥 Molotovs / Incendiaries</button>
            <button class="utility-tab" data-type="flash">✨ Flashbangs</button>
            <button class="utility-tab" data-type="popflash">⚡ Popflashes</button>
          </div>
          <div class="maphub-utility-content" id="utilityContent">
            ${getDemoUtilitySpots(mapName, "smokes")}
          </div>
          <div class="info-text" style="margin-top: 1rem; text-align: center;">
            💡 In der finalen Version mit Video-Tutorials und Positionskarten
          </div>
        </div>
      `;
      
    case "offangles":
      return `
        <div class="maphub-offangles-container">
          <div class="maphub-offangles-grid">
            ${getDemoOffAngles(mapName)}
          </div>
          <div class="info-text" style="margin-top: 1rem; text-align: center;">
            🎯 Ungewöhnliche Positionen für Überraschungsmomente
          </div>
        </div>
      `;
      
    case "strats":
      return `
        <div class="maphub-strats-container">
          <div class="maphub-strats-tabs">
            <button class="strat-tab active" data-side="t">🔴 Terrorist (T)</button>
            <button class="strat-tab" data-side="ct">🔵 Counter-Terrorist (CT)</button>
          </div>
          <div class="maphub-strats-content" id="stratsContent">
            ${getDemoStrats(mapName, "t")}
          </div>
          <div class="info-text" style="margin-top: 1rem; text-align: center;">
            ⚔️ Standard-Strategien für ${selectedMap.name}
          </div>
        </div>
      `;
      
    case "boosts":
      return `
        <div class="maphub-boosts-container">
          <div class="maphub-boosts-grid">
            ${getDemoBoosts(mapName)}
          </div>
          <div class="info-text" style="margin-top: 1rem; text-align: center;">
            🪜 Team-Boosts und Solo-Boost Spots
          </div>
        </div>
      `;
      
    default:
      return '<div class="empty-message">📭 Kategorie wird vorbereitet</div>';
  }
}

// ======================== DEMO-DATEN (Platzhalter) ========================

function getDemoCallouts(mapName) {
  const callouts = {
    mirage: ["Palace", "A Ramp", "A Site", "Jungle", "Connector", "Market", "Underpass", "B Site", "B Apps", "Kitchen", "Mid", "Window", "Top Mid", "Cat", "Ticket"],
    inferno: ["A Site", "Pit", "Long", "Balcony", "Library", "Mid", "Alt Mid", "B Site", "Banana", "CT Spawn", "Coffins", "Orange", "New Box", "Sandwich"],
    dust2: ["A Site", "A Long", "Pit", "Catwalk", "Mid", "CT Spawn", "B Site", "B Tunnels", "Upper Tunnels", "Lower Tunnels", "Car", "Platform"],
    nuke: ["A Site", "Heaven", "Hell", "Rafters", "Mini", "Vent", "B Site", "Upper", "Lower", "Secret", "Outside", "Garage"],
    overpass: ["A Site", "Monster", "Connector", "Balloons", "B Site", "Water", "Long B", "Party", "CT Spawn", "Bank", "Construction"],
    ancient: ["A Site", "A Main", "Cave", "B Site", "B Main", "Temple", "Mid", "Donut", "CT Spawn"],
    anubis: ["A Site", "A Main", "Con", "B Site", "B Main", "Mid", "Bridge", "Water", "CT Spawn"],
    cache: ["A Site", "A Main", "Highway", "B Site", "B Main", "Checkers", "Mid", "Sunroom", "CT Spawn"],
    train: ["A Site", "A Main", "Popdog", "B Site", "B Halls", "Mid", "T Conn", "Olof", "CT Spawn"],
    vertigo: ["A Site", "A Ramp", "Sandbags", "B Site", "B Ramp", "Stairs", "Mid", "CT Spawn", "Elevator"]
  };
  
  const mapCallouts = callouts[mapName] || callouts.mirage;
  
  return mapCallouts.map(callout => `
    <div class="maphub-callout-item">
      <span class="maphub-callout-dot"></span>
      <span class="maphub-callout-name">${callout}</span>
    </div>
  `).join('');
}

function getDemoUtilitySpots(mapName, type) {
  return `
    <div class="maphub-utility-items">
      <div class="maphub-utility-item">
        <div class="maphub-utility-image">
          <i class="fas fa-map-pin"></i>
        </div>
        <div class="maphub-utility-info">
          <h4>🌫️ Standard Smoke #1</h4>
          <p>Position: Von hier aus werfen → Ziel: Site Eingang</p>
          <div class="utility-tags">
            <span class="tag">🔥 Easy</span>
            <span class="tag">📐 Jump Throw</span>
          </div>
        </div>
        <button class="maphub-utility-btn">🎯 Position anzeigen</button>
      </div>
      <div class="maphub-utility-item">
        <div class="maphub-utility-image">
          <i class="fas fa-map-pin"></i>
        </div>
        <div class="maphub-utility-info">
          <h4>🔥 Standard Molly #1</h4>
          <p>Position: Standard-Spot → Ziel: Versteck ausräuchern</p>
          <div class="utility-tags">
            <span class="tag">🔥 Easy</span>
            <span class="tag">🎯 Run Throw</span>
          </div>
        </div>
        <button class="maphub-utility-btn">🎯 Position anzeigen</button>
      </div>
      <div class="maphub-utility-item">
        <div class="maphub-utility-image">
          <i class="fas fa-map-pin"></i>
        </div>
        <div class="maphub-utility-info">
          <h4>✨ Standard Flash #1</h4>
          <p>Position: Popflash für Site Entry</p>
          <div class="utility-tags">
            <span class="tag">⚡ Popflash</span>
            <span class="tag">🎯 Easy</span>
          </div>
        </div>
        <button class="maphub-utility-btn">🎯 Position anzeigen</button>
      </div>
    </div>
  `;
}

function getDemoOffAngles(mapName) {
  const offangles = [
    { name: "Default Off-Angle #1", desc: "Ungewöhnliche Position am Site-Eingang", difficulty: "Mittel" },
    { name: "Default Off-Angle #2", desc: "Versteckte Position mit Headshot-Angle", difficulty: "Schwer" },
    { name: "Default Off-Angle #3", desc: "Überraschungsposition für Early-Picks", difficulty: "Einfach" }
  ];
  
  return offangles.map(angle => `
    <div class="maphub-offangle-card">
      <div class="maphub-offangle-icon">🎯</div>
      <div class="maphub-offangle-info">
        <h4>${angle.name}</h4>
        <p>${angle.desc}</p>
        <span class="difficulty ${angle.difficulty === 'Einfach' ? 'easy' : angle.difficulty === 'Mittel' ? 'medium' : 'hard'}">📊 ${angle.difficulty}</span>
      </div>
      <button class="maphub-offangle-btn">📍 Position zeigen</button>
    </div>
  `).join('');
}

function getDemoStrats(mapName, side) {
  if (side === 't') {
    return `
      <div class="maphub-strat-card">
        <div class="maphub-strat-icon">⚔️</div>
        <div class="maphub-strat-info">
          <h4>A-Site Execute</h4>
          <p>Smokes + Molly + Flash Kombination für A-Site Push</p>
          <div class="strat-phases">
            <span>1️⃣ Smoke A Main</span>
            <span>2️⃣ Molly Default</span>
            <span>3️⃣ Popflash Site</span>
            <span>4️⃣ Execute</span>
          </div>
        </div>
      </div>
      <div class="maphub-strat-card">
        <div class="maphub-strat-icon">⚔️</div>
        <div class="maphub-strat-info">
          <h4>B-Site Default</h4>
          <p>Standard B-Site Ausführung mit Kontroll-Utility</p>
          <div class="strat-phases">
            <span>1️⃣ Smoke B Main</span>
            <span>2️⃣ Molly Back Site</span>
            <span>3️⃣ Flash Entry</span>
          </div>
        </div>
      </div>
    `;
  } else {
    return `
      <div class="maphub-strat-card">
        <div class="maphub-strat-icon">🛡️</div>
        <div class="maphub-strat-info">
          <h4>A-Site Retake</h4>
          <p>Standard Retake-Utility für A-Site</p>
          <div class="strat-phases">
            <span>1️⃣ Smoke CT/Mid</span>
            <span>2️⃣ Molly Common Spots</span>
            <span>3️⃣ Flash Execute</span>
          </div>
        </div>
      </div>
      <div class="maphub-strat-card">
        <div class="maphub-strat-icon">🛡️</div>
        <div class="maphub-strat-info">
          <h4>Default CT Setup</h4>
          <p>Standard CT-Positionen und Rotations</p>
          <div class="strat-phases">
            <span>1️⃣ 2-1-2 Setup</span>
            <span>2️⃣ Mid Control</span>
            <span>3️⃣ Rotations</span>
          </div>
        </div>
      </div>
    `;
  }
}

function getDemoBoosts(mapName) {
  const boosts = [
    { name: "A-Site Self-Boost", type: "Solo", difficulty: "Mittel", desc: "Komm auf erhöhte Position für besseren Winkel" },
    { name: "B-Site Team-Boost", type: "Team (2 Spieler)", difficulty: "Einfach", desc: "Zwei Spieler boosten einen auf erhöhte Position" },
    { name: "Mid Self-Boost", type: "Solo", difficulty: "Schwer", desc: "Schwieriger Solo-Boost für Überraschungswinkel" }
  ];
  
  return boosts.map(boost => `
    <div class="maphub-boost-card">
      <div class="maphub-boost-icon">🪜</div>
      <div class="maphub-boost-info">
        <h4>${boost.name}</h4>
        <p>${boost.desc}</p>
        <div class="boost-tags">
          <span class="boost-type">👤 ${boost.type}</span>
          <span class="difficulty ${boost.difficulty === 'Einfach' ? 'easy' : boost.difficulty === 'Mittel' ? 'medium' : 'hard'}">📊 ${boost.difficulty}</span>
        </div>
      </div>
      <button class="maphub-boost-btn">📍 Position zeigen</button>
    </div>
  `).join('');
}

// Event-Listener für Tabs (mit Event-Delegation)
document.addEventListener('click', (e) => {
  // Utility-Tabs
  if (e.target.classList && e.target.classList.contains('utility-tab')) {
    const type = e.target.dataset.type;
    document.querySelectorAll('.utility-tab').forEach(tab => tab.classList.remove('active'));
    e.target.classList.add('active');
    const mapName = selectedMap?.name.toLowerCase() || "mirage";
    const content = getDemoUtilitySpots(mapName, type);
    const container = document.getElementById('utilityContent');
    if (container) container.innerHTML = content;
  }
  
  // Strat-Tabs
  if (e.target.classList && e.target.classList.contains('strat-tab')) {
    const side = e.target.dataset.side;
    document.querySelectorAll('.strat-tab').forEach(tab => tab.classList.remove('active'));
    e.target.classList.add('active');
    const mapName = selectedMap?.name.toLowerCase() || "mirage";
    const content = getDemoStrats(mapName, side);
    const container = document.getElementById('stratsContent');
    if (container) container.innerHTML = content;
  }
});

window.initMapHub = initMapHub;