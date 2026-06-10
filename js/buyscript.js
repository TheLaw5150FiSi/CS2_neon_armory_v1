// ======================== KORRIGIERTE buyscript.js mit Flashbang-Zyklus ========================

let buyBindings = {};
// let selectedBuyKey = null;
let selectedBuyKey = null;
let currentCategory = "Pistole";

// Neue Variablen für temporäre Buy-Bind-Zusammenstellung
let tempBuyItems = {
  t: { pistol: null, primary: null, grenades: [], equipment: [] },
  ct: { pistol: null, primary: null, grenades: [], equipment: [] }
};

function loadBuy() {
  let s = localStorage.getItem("cs2_neon_buy_unique");
  buyBindings = s ? JSON.parse(s) : {};
  renderSavedBinds();
  if (window.refreshFullExport) window.refreshFullExport();
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderScriptKeyboard) window.renderScriptKeyboard();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
}

function saveBuy() {
  localStorage.setItem("cs2_neon_buy_unique", JSON.stringify(buyBindings));
  renderSavedBinds();
  if (window.refreshFullExport) window.refreshFullExport();
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderScriptKeyboard) window.renderScriptKeyboard();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
}

function parseCommandToTempItems(cmd) {
  tempBuyItems = {
    t: { pistol: null, primary: null, grenades: [], equipment: [] },
    ct: { pistol: null, primary: null, grenades: [], equipment: [] }
  };
  
  if (!cmd) {
    updatePriceDisplay();
    updateItemSelectionHighlight();
    return;
  }
  
  const commands = cmd.split(';').map(c => c.trim());
  
  for (const fullCmd of commands) {
    let foundItem = null;
    let foundCategory = null;
    
    for (const [catName, items] of Object.entries(categories)) {
      const item = items.find(i => i.cmd === fullCmd);
      if (item) {
        foundItem = item;
        foundCategory = catName;
        break;
      }
    }
    
    if (foundItem) {
      addToTempItems(foundItem, foundCategory);
    }
  }
  
  updatePriceDisplay();
  updateItemSelectionHighlight();
}

function addToTempItems(item, category) {
  const sides = item.side === "both" ? ["t", "ct"] : [item.side];
  
  for (const side of sides) {
    if (category === "Pistole") {
      tempBuyItems[side].pistol = item;
    } else if (category === "Rifle" || category === "MP / SMG" || category === "Sniper" || 
               category === "Pumpgun" || category === "Schwere Waffen") {
      tempBuyItems[side].primary = item;
    } else if (category === "Granaten") {
      if (item.cmd === "buy flashbang") {
        const currentFlashCount = tempBuyItems[side].grenades.filter(g => g.cmd === "buy flashbang").length;
        if (currentFlashCount < 2) {
          tempBuyItems[side].grenades.push({ ...item });
        }
      } else {
        if (!tempBuyItems[side].grenades.some(g => g.cmd === item.cmd)) {
          if (tempBuyItems[side].grenades.length < 4) {
            tempBuyItems[side].grenades.push({ ...item });
          }
        }
      }
    } else if (category === "Rüstung") {
      if (!tempBuyItems[side].equipment.some(e => e.cmd === item.cmd)) {
        tempBuyItems[side].equipment.push({ ...item });
      }
    }
  }
}

function removeFromTempItems(item, category) {
  const sides = item.side === "both" ? ["t", "ct"] : [item.side];
  
  for (const side of sides) {
    if (category === "Pistole") {
      if (tempBuyItems[side].pistol?.cmd === item.cmd) {
        tempBuyItems[side].pistol = null;
      }
    } else if (category === "Rifle" || category === "MP / SMG" || category === "Sniper" || 
               category === "Pumpgun" || category === "Schwere Waffen") {
      if (tempBuyItems[side].primary?.cmd === item.cmd) {
        tempBuyItems[side].primary = null;
      }
    } else if (category === "Granaten") {
      if (item.cmd === "buy flashbang") {
        // Nur eine Flashbang entfernen (die letzte)
        const flashIndex = tempBuyItems[side].grenades.findIndex(g => g.cmd === "buy flashbang");
        if (flashIndex !== -1) {
          tempBuyItems[side].grenades.splice(flashIndex, 1);
        }
      } else {
        tempBuyItems[side].grenades = tempBuyItems[side].grenades.filter(g => g.cmd !== item.cmd);
      }
    } else if (category === "Rüstung") {
      tempBuyItems[side].equipment = tempBuyItems[side].equipment.filter(e => e.cmd !== item.cmd);
    }
  }
  
  updatePriceDisplay();
  updateItemSelectionHighlight();
}

// Gibt die Anzahl der ausgewählten Flashbangs zurück (0, 1 oder 2)
function getFlashbangCount(side) {
  return tempBuyItems[side].grenades.filter(g => g.cmd === "buy flashbang").length;
}

function toggleFlashbang(item, category) {
  const sides = item.side === "both" ? ["t", "ct"] : [item.side];
  
  for (const side of sides) {
    const currentCount = getFlashbangCount(side);
    
    if (currentCount === 0) {
      // Keine Flashbang → eine hinzufügen (orange)
      tempBuyItems[side].grenades.push({ ...item });
    } else if (currentCount === 1) {
      // Eine Flashbang → zweite hinzufügen (grün)
      tempBuyItems[side].grenades.push({ ...item });
    } else if (currentCount === 2) {
      // Zwei Flashbangs → ALLE entfernen (wieder auf 0)
      tempBuyItems[side].grenades = tempBuyItems[side].grenades.filter(g => g.cmd !== "buy flashbang");
    }
  }
  
  updatePriceDisplay();
  updateItemSelectionHighlight();
}

// Prüft ob ein Item ausgewählt ist (für andere Items außer Flashbang)
function isItemSelected(item, checkSide = null) {
  const sides = checkSide ? [checkSide] : (item.side === "both" ? ["t", "ct"] : [item.side]);
  
  for (const side of sides) {
    if (categories.Granaten.some(g => g.cmd === item.cmd)) {
      if (item.cmd === "buy flashbang") {
        if (getFlashbangCount(side) > 0) return true;
      } else {
        if (tempBuyItems[side].grenades.some(g => g.cmd === item.cmd)) return true;
      }
    } else if (categories.Rüstung.some(r => r.cmd === item.cmd)) {
      if (tempBuyItems[side].equipment.some(e => e.cmd === item.cmd)) return true;
    } else {
      const isPistol = categories.Pistole.some(p => p.cmd === item.cmd);
      if (isPistol) {
        if (tempBuyItems[side].pistol?.cmd === item.cmd) return true;
      } else {
        if (tempBuyItems[side].primary?.cmd === item.cmd) return true;
      }
    }
  }
  return false;
}

function calculateTotalPrice(side) {
  let total = 0;
  const data = tempBuyItems[side];
  
  if (data.pistol) total += data.pistol.price;
  if (data.primary) total += data.primary.price;
  for (const g of data.grenades) total += g.price;
  for (const e of data.equipment) total += e.price;
  
  return total;
}

function getItemListHtml(side) {
  const data = tempBuyItems[side];
  let items = [];
  
  // Side-Text für die Anzeige
  const sideText = side === "t" ? "T" : "CT";
  
  if (data.pistol) {
    items.push(`[${sideText}] ${data.pistol.name} ($${data.pistol.price})`);
  }
  
  if (data.primary) {
    items.push(`[${sideText}] ${data.primary.name} ($${data.primary.price})`);
  }
  
  let flashCount = 0;
  for (const g of data.grenades) {
    if (g.cmd === "buy flashbang") {
      flashCount++;
    } else if (g.cmd === "buy hegrenade") {
      items.push(`[${sideText}] HE Grenade ($${g.price})`);
    } else if (g.cmd === "buy smokegrenade") {
      items.push(`[${sideText}] Smoke ($${g.price})`);
    } else if (g.cmd === "buy molotov") {
      items.push(`[${sideText}] Molotov ($${g.price})`);
    } else if (g.cmd === "buy incgrenade") {
      items.push(`[${sideText}] Incendiary ($${g.price})`);
    } else if (g.cmd === "buy decoy") {
      items.push(`[${sideText}] Decoy ($${g.price})`);
    } else {
      items.push(`[${sideText}] ${g.name} ($${g.price})`);
    }
  }
  
  if (flashCount > 0) {
    items.push(`[${sideText}] Flashbang x${flashCount} ($${200 * flashCount})`);
  }
  
  for (const e of data.equipment) {
    if (e.cmd === "buy vesthelm") {
      items.push(`[${sideText}] Kevlar+Helm ($${e.price})`);
    } else if (e.cmd === "buy vest") {
      items.push(`[${sideText}] Kevlar ($${e.price})`);
    } else if (e.cmd === "buy defuser") {
      items.push(`[${sideText}] Defuser ($${e.price})`);
    } else if (e.cmd === "buy taser") {
      items.push(`[${sideText}] Taser ($${e.price})`);
    } else {
      items.push(`[${sideText}] ${e.name} ($${e.price})`);
    }
  }
  
  if (items.length === 0) return '<span style="opacity: 0.5;">(keine Ausrüstung)</span>';
  return items.join('<br>');
}

function updatePriceDisplay() {
  const tPrice = calculateTotalPrice("t");
  const ctPrice = calculateTotalPrice("ct");
  
  const priceDiv = document.getElementById("buyPriceDisplay");
  if (priceDiv) {
    priceDiv.innerHTML = `
      <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
        <div style="text-align: center; flex: 1; min-width: 200px; background: rgba(0,0,0,0.2); border-radius: 1rem; padding: 0.8rem;">
          <span style="color: #ffaa44; font-size: 1.1rem;">TERRORIST</span><br>
          <span style="font-size: 1.8rem; font-weight: bold; color: #ffaa44;">$${tPrice}</span>
          <div style="margin-top: 0.5rem; font-size: 0.7rem; text-align: left; border-top: 1px solid rgba(255,170,68,0.3); padding-top: 0.5rem;">
            ${getItemListHtml("t")}
          </div>
        </div>
        <div style="text-align: center; flex: 1; min-width: 200px; background: rgba(0,0,0,0.2); border-radius: 1rem; padding: 0.8rem;">
          <span style="color: #44aaff; font-size: 1.1rem;">COUNTER-TERRORIST</span><br>
          <span style="font-size: 1.8rem; font-weight: bold; color: #44aaff;">$${ctPrice}</span>
          <div style="margin-top: 0.5rem; font-size: 0.7rem; text-align: left; border-top: 1px solid rgba(68,170,255,0.3); padding-top: 0.5rem;">
            ${getItemListHtml("ct")}
          </div>
        </div>
      </div>
    `;
  }
  
  updateCommandFromTempItems();
}

function updateCommandFromTempItems() {
  const allCommands = [];
  
  for (const side of ["t", "ct"]) {
    const data = tempBuyItems[side];
    if (data.pistol) allCommands.push(data.pistol.cmd);
    if (data.primary) allCommands.push(data.primary.cmd);
    
    let hasFlashbang = false;
    for (const g of data.grenades) {
      if (g.cmd === "buy flashbang") {
        if (!hasFlashbang) {
          allCommands.push("buy flashbang");
          hasFlashbang = true;
        }
      } else {
        allCommands.push(g.cmd);
      }
    }
    
    for (const e of data.equipment) allCommands.push(e.cmd);
  }
  
  const uniqueCommands = [];
  for (const cmd of allCommands) {
    if (!uniqueCommands.includes(cmd)) {
      uniqueCommands.push(cmd);
    }
  }
  
  const cmdString = uniqueCommands.join('; ');
  const inputField = document.getElementById("buyCommandInput");
  if (inputField) inputField.value = cmdString;
}

function updateItemSelectionHighlight() {
  const allItems = document.querySelectorAll("#itemsGrid .weapon-item");
  
  allItems.forEach(item => {
    const cmd = item.dataset.cmd;
    const category = item.dataset.category;
    const actionBtn = item.querySelector(".weapon-action-btn");
    
    let foundItem = null;
    if (categories[category]) {
      foundItem = categories[category].find(i => i.cmd === cmd);
    }
    
    if (foundItem && foundItem.cmd === "buy flashbang") {
      const tCount = getFlashbangCount("t");
      const ctCount = getFlashbangCount("ct");
      const displayCount = Math.max(tCount, ctCount);
      
      if (displayCount === 1) {
        item.classList.add("selected");
        if (actionBtn) actionBtn.textContent = "① 1 Flashbang";
      } else if (displayCount === 2) {
        item.classList.add("selected");
        if (actionBtn) actionBtn.textContent = "② 2 Flashbangs";
      } else {
        item.classList.remove("selected");
        if (actionBtn) actionBtn.textContent = "+ Hinzufügen";
      }
    } else if (foundItem && isItemSelected(foundItem)) {
      item.classList.add("selected");
      if (actionBtn) actionBtn.textContent = "✓ Ausgewählt";
    } else {
      item.classList.remove("selected");
      if (actionBtn) actionBtn.textContent = "+ Hinzufügen";
    }
  });
}

function canAddItem(item, category) {
  const sides = item.side === "both" ? ["t", "ct"] : [item.side];
  let conflicts = [];
  
  for (const side of sides) {
    const data = tempBuyItems[side];
    
    if (category === "Pistole") {
      if (data.pistol && data.pistol.cmd !== item.cmd) {
        conflicts.push(`${side.toUpperCase()}: ${data.pistol.name} (${side === "t" ? "T" : "CT"}-Pistole)`);
      }
    } else if (category === "Rifle" || category === "MP / SMG" || category === "Sniper" || 
               category === "Pumpgun" || category === "Schwere Waffen") {
      if (data.primary && data.primary.cmd !== item.cmd) {
        conflicts.push(`${side.toUpperCase()}: ${data.primary.name} (Primärwaffe)`);
      }
    } else if (category === "Granaten") {
      if (item.cmd === "buy flashbang") {
        const currentFlashCount = data.grenades.filter(g => g.cmd === "buy flashbang").length;
        if (currentFlashCount >= 2) {
          conflicts.push(`${side.toUpperCase()}: Maximal 2 Flashbangs`);
        } else if (data.grenades.length >= 4) {
          conflicts.push(`${side.toUpperCase()}: Maximal 4 Granaten insgesamt`);
        }
      } else {
        const isDuplicate = data.grenades.some(g => g.cmd === item.cmd);
        if (isDuplicate) {
          conflicts.push(`${side.toUpperCase()}: ${item.name} bereits vorhanden`);
        } else if (data.grenades.length >= 4) {
          conflicts.push(`${side.toUpperCase()}: Maximal 4 Granaten erreicht`);
        }
      }
    }
  }
  
  if (conflicts.length > 0) {
    return { allowed: false, conflicts };
  }
  return { allowed: true, conflicts: [] };
}

function renderBuyKeyboard() {
  const mainCont = document.getElementById("mainKeyboard");
  if (!mainCont) return;
  mainCont.innerHTML = "";
  
  let rows = (typeof mainKeysRows !== 'undefined') ? mainKeysRows : [];
  if (rows.length === 0 && typeof deKeysRows !== 'undefined') {
    rows = deKeysRows;
  }
  
  rows.forEach((row) => {
    let rd = document.createElement("div");
    rd.className = "key-row";
    row.forEach((k) => {
      let d = document.createElement("div");
      let keyClass = (window.getKeyClass) ? window.getKeyClass(k) : "";
      d.className = `key ${keyClass}`;
      if (selectedBuyKey === k) d.classList.add("active-key");
      d.textContent = k;
      d.onclick = () => {
        selectedBuyKey = k;
        renderBuyKeyboard();
        const input = document.getElementById("buyCommandInput");
        const currentCmd = buyBindings[k] || "";
        if (input) {
          input.value = currentCmd;
          parseCommandToTempItems(currentCmd);
        }
      };
      rd.appendChild(d);
    });
    mainCont.appendChild(rd);
  });
  
  const numCont = document.getElementById("numpadContainer");
  if (!numCont) return;
  numCont.innerHTML = "";
  
  let numpad = (typeof numpadKeys !== 'undefined') ? numpadKeys : [];
  numpad.forEach((k) => {
    let d = document.createElement("div");
    let keyClass = (window.getKeyClass) ? window.getKeyClass(k) : "";
    d.className = `numpad-key ${keyClass}`;
    if (selectedBuyKey === k) d.style.background = "var(--accent)";
    d.textContent = k.replace("KP_", "");
    d.onclick = () => {
      selectedBuyKey = k;
      renderBuyKeyboard();
      const input = document.getElementById("buyCommandInput");
      const currentCmd = buyBindings[k] || "";
      if (input) {
        input.value = currentCmd;
        parseCommandToTempItems(currentCmd);
      }
    };
    numCont.appendChild(d);
  });
}

function renderBuyCategories() {
  let catDiv = document.getElementById("categoryList");
  if (!catDiv) return;
  catDiv.innerHTML = "";
  
  Object.keys(categories).forEach((c) => {
    let p = document.createElement("div");
    p.className = "cat-pill";
    if (currentCategory === c) p.classList.add("active-cat");
    p.textContent = c;
    p.onclick = () => {
      currentCategory = c;
      renderBuyCategories();
      renderBuyItems();
    };
    catDiv.appendChild(p);
  });
  renderBuyItems();
}

function renderBuyItems() {
  let grid = document.getElementById("itemsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  
  if (!categories[currentCategory]) return;
  
  categories[currentCategory].forEach((it) => {
    let div = document.createElement("div");
    div.className = "weapon-item";
    div.dataset.cmd = it.cmd;
    div.dataset.category = currentCategory;
    
    // Waffenbild-Name aus dem Waffennamen generieren
    const imageName = getWeaponImageName(it.name);
    
    // Side-Badge mit Farben
    let sideBadge = "";
    if (it.side === "t") {
      sideBadge = '<span class="side-badge side-t">T-ONLY</span>';
    } else if (it.side === "ct") {
      sideBadge = '<span class="side-badge side-ct">CT-ONLY</span>';
    } else {
      sideBadge = '<span class="side-badge side-both">BOTH</span>';
    }
    
    let flashHint = "";
    if (it.cmd === "buy flashbang") {
      flashHint = '<span class="flash-hint">(max 2)</span>';
    }
    
    // Waffen-Info
    const weaponInfo = getWeaponInfo(it.name, it.price, it.side);
    
    div.innerHTML = `
      <div class="weapon-image">
        <img src="img/weapons/${imageName}" alt="${it.name}" onerror="this.src='img/weapons/placeholder.png'; this.onerror=null;">
      </div>
      <div class="weapon-info">
        <div class="weapon-header">
          ${sideBadge}
          <span class="weapon-name">${it.name}${flashHint}</span>
        </div>
        <div class="weapon-price">💰 ${it.price}$</div>
        <div class="weapon-description">${weaponInfo}</div>
      </div>
      <button class="weapon-action-btn">${isItemSelected(it) ? '✓ Ausgewählt' : '+ Hinzufügen'}</button>
    `;
    
    grid.appendChild(div);
  });
  
  // Event-Handler für alle Items
  const allItems = document.querySelectorAll("#itemsGrid .weapon-item");
  allItems.forEach(div => {
    const cmd = div.dataset.cmd;
    const category = div.dataset.category;
    
    let foundItem = null;
    if (categories[category]) {
      foundItem = categories[category].find(i => i.cmd === cmd);
    }
    
    if (foundItem) {
      const actionBtn = div.querySelector(".weapon-action-btn");
      
      const handleClick = () => {
        if (foundItem.cmd === "buy flashbang") {
          toggleFlashbang(foundItem, category);
        } else {
          if (isItemSelected(foundItem)) {
            removeFromTempItems(foundItem, category);
          } else {
            const validation = canAddItem(foundItem, category);
            if (!validation.allowed) {
              alert(`❌ Konflikt:\n${validation.conflicts.join('\n')}`);
              return;
            }
            addToTempItems(foundItem, category);
          }
        }
        
        renderBuyItems();
        updatePriceDisplay();
      };
      
      div.onclick = handleClick;
      if (actionBtn) actionBtn.onclick = (e) => {
        e.stopPropagation();
        handleClick();
      };
    }
  });
  
  updateItemSelectionHighlight();
}

// Funktion zur Konvertierung von Waffennamen in Bild-Dateinamen
// Funktion zur Konvertierung von Waffennamen in Bild-Dateinamen
function getWeaponImageName(weaponName) {
  const imageMapping = {
    // ======================== PISTOLEN ========================
    "Glock-18": "glock.webp",
    "USP-S": "usp.webp",
    "P2000": "p2000.webp",
    "P250": "p250.webp",
    "Five-SeveN": "five_seven.webp",
    "Tec-9": "tec9.webp",
    "Desert Eagle": "deagle.webp",
    "Dual Berettas": "dual_beretta.webp",
    "CZ75-Auto": "cz.webp",
    
    // ======================== SMGs ========================
    "MP9": "mp9.webp",
    "MAC-10": "mac10.webp",
    "MP7": "mp7.webp",
    "MP5-SD": "mp5.webp",
    "UMP-45": "ump.webp",
    "P90": "p90.webp",
    "PP-Bizon": "bizon.webp",
    
    // ======================== RIFLES ========================
    "AK-47": "ak47.webp",
    "M4A4": "m4a4.webp",
    "M4A1-S": "m4a1s.webp",
    "FAMAS": "famas.webp",
    "Galil AR": "galil.webp",
    "SG 553": "sg553.webp",
    "AUG": "aug.webp",
    
    // ======================== SNIPERS ========================
    "AWP": "awp.webp",
    "SSG 08": "ssg08.webp",
    "SCAR-20": "scar.webp",
    "G3SG1": "g3sg1.webp",
    
    // ======================== SHOTGUNS ========================
    "Nova": "nova.webp",
    "XM1014": "xm.webp",
    "MAG-7": "mag7.webp",
    "Sawed-Off": "sawed_off.webp",
    
    // ======================== HEAVY ========================
    "M249": "m249.webp",
    "Negev": "negev.webp",
    
    // ======================== EQUIPMENT ========================
    "Kevlar+Helm": "kevlar_helmet.png",
    "Kevlar": "kevlar_vest.png",
    "Defuser": "defuser.png",
    "Taser": "zeus_x22.png",
    
    // ======================== GRENADES ========================
    "HE Grenade": "high_explosive.png",
    "Flashbang": "flashbang.png",
    "Smoke": "smoke_grenade.png",
    "Molotov": "molotov.png",
    "Incendiary": "incendiary.png",
    "Decoy": "decoy.png"
  };
  
  return imageMapping[weaponName] || "placeholder.png";
}

// Waffen-Infos (wie bei den Config-Befehlen)
function getWeaponInfo(weaponName, price, side) {
  const weaponInfos = {
    // Pistolen
    "Glock-18": "Standard-Terroristen-Pistole. Ausgezeichnete Genauigkeit beim ersten Schuss, moderate Feuerrate. 20 Schuss Magazin.",
    "USP-S": "Standard-CT-Pistole mit Schalldämpfer. Extrem präzise, hohe Penetration. 12/24 Schuss.",
    "P2000": "Alternative CT-Startpistole. Gute Balance zwischen Genauigkeit und Feuerrate. 13/52 Schuss.",
    "P250": "Günstige Upgrade-Pistole für beide Seiten. Hohe Penetration, gut gegen Rüstung. 13/26 Schuss.",
    "Five-SeveN": "CT-Pistole mit 20 Schuss Magazin. Hohe Feuerrate, gute Genauigkeit. Ideal für Eco-Rounds.",
    "Tec-9": "T-Pistole mit 24 Schuss Magazin. Hohe Mobilität, gut für Run-and-Gun. Perfekt für Eco-Rushes.",
    "Desert Eagle": "High-Risk-High-Reward Pistole. Ein Schuss Kopf = Tod, auch mit Helm. 7/35 Schuss.",
    "Dual Berettas": "Zwei Pistolen mit 30 Schuss Magazin. Hohe Feuerrate, aber geringe Genauigkeit. 30/120 Schuss.",
    "CZ75-Auto": "Automatische Pistole. Hohe Feuerrate, kleines Magazin (12/12). Gut für Nahkämpfe.",
    
    // SMGs
    "MP9": "CT-SMG. Hohe Feuerrate, gute Mobilität. 30 Schuss Magazin. Ideal für Anti-Eco.",
    "MAC-10": "T-SMG. Sehr hohe Feuerrate, gute Bewegungswerte. 30 Schuss. Perfekt für Rushes.",
    "MP7": "Ausgewogene SMG. Gute Genauigkeit, moderate Feuerrate. 30 Schuss. Für beide Seiten.",
    "MP5-SD": "SMG mit integriertem Schalldämpfer. Sehr leise, gute Kontrolle. 30 Schuss.",
    "UMP-45": "Budget-SMG mit hohem Schaden. 25 Schuss. Gut gegen ungerüstete Gegner.",
    "P90": "High-Capacity SMG. 50 Schuss Magazin, hohe Feuerrate. Ideal für Spray-and-Pray.",
    "PP-Bizon": "64 Schuss Magazin. Niedriger Schaden, aber riesiges Magazin. Gut für Suppression.",
    
    // Rifles
    "AK-47": "T-Standardgewehr. Hoher Schaden, 30 Schuss. Ein Kopfschuss = Tod. Beste Rifle für T-Seite.",
    "M4A4": "CT-Standardgewehr. 30 Schuss, gute Feuerrate. Ausgewogene Performance.",
    "M4A1-S": "CT-Gewehr mit Schalldämpfer. 25 Schuss, hohe Genauigkeit. Geringeres Spraymuster.",
    "FAMAS": "Budget-CT-Gewehr. 25 Schuss, 3-Round-Burst-Modus. Gut für Eco/Force-Buys.",
    "Galil AR": "Budget-T-Gewehr. 35 Schuss Magazin. Solide Alternative zur AK bei wenig Geld.",
    "SG 553": "T-Gewehr mit Scope. Hohe Genauigkeit, 30 Schuss. Gute Alternative zur AK.",
    "AUG": "CT-Gewehr mit Scope. Hohe Genauigkeit, 30 Schuss. Ausgezeichnet für lange Distanzen.",
    
    // Snipers
    "AWP": "Einschussgewehr. Ein Treffer in Brust/Bein = Tod. 5/30 Schuss. Beste Sniper in CS2.",
    "SSG 08": "Budget-Sniper (Scout). Hohe Mobilität, 10 Schuss. Zwei Körpertreffer zum Kill.",
    "SCAR-20": "CT-Autosniper. Halbautomatisch, 20 Schuss. Hoher Schaden, aber teuer.",
    "G3SG1": "T-Autosniper. Halbautomatisch, 20 Schuss. Ähnlich wie SCAR-20 für T-Seite.",
    
    // Shotguns
    "Nova": "Budget-Shotgun. 8 Schuss, hoher Nahkampfschaden. Gut für Nahbereichs-Eco-Rounds.",
    "XM1014": "Halbautomatische Shotgun. 7 Schuss, hohe Feuerrate. Gut für Nahkämpfe.",
    "MAG-7": "CT-Shotgun. 5 Schuss, extrem hoher Schaden auf kurze Distanz. 1 Schuss Kill.",
    "Sawed-Off": "T-Shotgun. 8 Schuss, hoher Schaden. Perfekt für enge Räume/Ecken.",
    
    // Heavy
    "M249": "Schweres MG. 100 Schuss Magazin, hoher Schaden. Sehr teuer, ungenau.",
    "Negev": "Suppression-MG. 150 Schuss, wird mit der Zeit genauer. Perfekt für Spam.",
    
    // Equipment
    "Kevlar+Helm": "Komplette Rüstung. Reduziert Schaden an Körper und Kopf. Unverzichtbar.",
    "Kevlar": "Körperrüstung. Reduziert Körperschaden. Kein Kopfschutz.",
    "Defuser": "Bombenentschärfer. Halbiert die Entschärfungszeit auf 5 Sekunden.",
    "Taser": "Zeus x27. Ein-Schuss-Taser auf kurze Distanz. 1 Shot Kill, billige Alternative.",
    
    // Grenades
    "HE Grenade": "Sprenggranate. Verursacht Flächenschaden. Ideal für Schadenspoking.",
    "Flashbang": "Blendgranate. Blendet Gegner kurz. Maximal 2 pro Runde. Essentiell für Pushes.",
    "Smoke": "Rauchgranate. Blockiert Sichtlinien für ~18 Sekunden. Unverzichtbar für Strategien.",
    "Molotov": "T-Molotov. Feuerfläche, verhindert Pushes. Hält ~7 Sekunden.",
    "Incendiary": "CT-Incendiary. Feuerfläche, verhindert Pushes. Hält ~7 Sekunden.",
    "Decoy": "Täuschungsgranate. Imitiert Schussgeräusche. Gut für Taktiken/Fakes."
  };
  
  // Standard-Info für Waffen ohne spezifischen Eintrag
  const defaultInfo = `${weaponName} - Preis: ${price}$. ${
    side === "t" ? "Nur für Terroristen verfügbar." :
    side === "ct" ? "Nur für Counter-Terroristen verfügbar." :
    "Verfügbar für beide Seiten."
  }`;
  
  return weaponInfos[weaponName] || defaultInfo;
}

function saveCurrentBinding() {
  // Verwende den globalen Wert aus binds.js
  let currentKey = window.selectedBindKey;
  
  console.log("saveCurrentBinding - window.selectedBindKey:", currentKey);
  
  if (!currentKey) {
    alert("❌ Bitte wähle zuerst eine Taste auf der Tastatur aus!");
    return;
  }
  
  let val = document.getElementById("buyCommandInput").value.trim();
  if (!val) {
    alert("❌ Bitte gib einen Buy-Befehl ein!");
    return;
  }
  
  const existingType = window.getExistingBindingType(currentKey);
  
  if (existingType !== "none" && existingType !== "buy") {
    let typeName = existingType === "script" ? "ein Skript" : "einen Say-Bind";
    if (!confirm(`Taste "${currentKey}" wird bereits für ${typeName} verwendet. Überschreiben?`)) {
      return;
    }
    window.removeSpecificBinding(currentKey, existingType);
  }
  
  buyBindings[currentKey] = val;
  saveBuy();
  alert(`✅ Buy-Bindung für Taste "${currentKey}" gespeichert!`);
  
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderScriptKeyboard) window.renderScriptKeyboard();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
}

function unbindCurrentKey() {
  if (selectedBuyKey && buyBindings[selectedBuyKey]) {
    delete buyBindings[selectedBuyKey];
    saveBuy();
    document.getElementById("buyCommandInput").value = "";
    parseCommandToTempItems("");
    alert(`Binding für ${selectedBuyKey} entfernt`);
    if (window.renderBuyKeyboard) window.renderBuyKeyboard();
    if (window.renderScriptKeyboard) window.renderScriptKeyboard();
    if (window.renderSayKeyboard) window.renderSayKeyboard();
  } else if (!selectedBuyKey) {
    alert("Bitte wähle zuerst eine Taste aus!");
  } else {
    alert("Keine Buy-Bindung für diese Taste");
  }
}

function renderSavedBinds() {
  let cont = document.getElementById("savedBindsList");
  if (!cont) return;
  cont.innerHTML = "";
  
  if (Object.keys(buyBindings).length === 0) {
    cont.innerHTML = '<div class="empty-message">✨ Keine Buy-Bindings</div>';
    return;
  }
  
  for (let [k, cmd] of Object.entries(buyBindings)) {
    let e = document.createElement("div");
    e.className = "bind-entry";
    e.innerHTML = `<span class="bind-key">bind "${k}"</span> → <span class="bind-command">"${cmd.substring(0, 60)}${cmd.length > 60 ? '...' : ''}"</span>`;
    e.onclick = () => {
      selectedBuyKey = k;
      if (window.renderBuyKeyboard) window.renderBuyKeyboard();
      document.getElementById("buyCommandInput").value = cmd;
      parseCommandToTempItems(cmd);
    };
    cont.appendChild(e);
  }
}

function resetBuy() {
  if (confirm("⚠️ Alle Buy-Bindings löschen? Diese Aktion kann nicht rückgängig gemacht werden!")) {
    buyBindings = {};
    saveBuy();
    if (selectedBuyKey) {
      document.getElementById("buyCommandInput").value = "";
      parseCommandToTempItems("");
    }
    alert("✅ Alle Buy-Bindings gelöscht.");
    if (window.renderBuyKeyboard) window.renderBuyKeyboard();
    if (window.renderScriptKeyboard) window.renderScriptKeyboard();
    if (window.renderSayKeyboard) window.renderSayKeyboard();
  }
}

function initBuyTab() {
  renderBuyCategories();
  renderBuyKeyboard();
  
  const saveBtn = document.getElementById("saveBuyBtn");
  if (saveBtn) saveBtn.addEventListener("click", saveCurrentBinding);
  
  const unbindBtn = document.getElementById("unbindBuyBtn");
  if (unbindBtn) unbindBtn.addEventListener("click", unbindCurrentKey);
}

window.buyBindings = buyBindings;
window.renderBuyKeyboard = renderBuyKeyboard;
window.saveBuy = saveBuy;
window.loadBuy = loadBuy;
window.parseCommandToTempItems = parseCommandToTempItems;
window.updatePriceDisplay = updatePriceDisplay;
window.initBuyTab = initBuyTab;