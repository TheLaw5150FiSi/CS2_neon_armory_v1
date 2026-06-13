<<<<<<< HEAD
// ======================== BUYSCRIPT MIT GRÜNEM HIGHLIGHT & TOGGLE ========================
=======
// ======================== KORRIGIERTE buyscript.js mit Flashbang-Zyklus ========================

>>>>>>> 38331c4ea550edcc13a34938b3a1f1ebfe97acf8
let buyBindings = {};
// let selectedBuyKey = null;
let selectedBuyKey = null;
let currentCategory = "Pistole";

<<<<<<< HEAD
// Primärwaffen-Kategorien
const PRIMARY_CATEGORIES = [
  "MP / SMG",
  "Rifle",
  "Sniper",
  "Pumpgun",
  "Schwere Waffen",
];
const GRENADE_CATEGORY = "Granaten";

// Funktion zum Parsen eines Buy-Befehls in einzelne Items
function parseBuyCommand(cmd) {
  if (!cmd || cmd.trim() === "") return [];
  return cmd
    .split(";")
    .map((c) => c.trim())
    .filter((c) => c.length > 0);
}

// Debug-Funktion
function logState(where) {
  console.log(`[${where}] currentCategory = ${currentCategory}, selectedBuyKey = ${selectedBuyKey}, selectedBindKey = ${typeof selectedBindKey !== 'undefined' ? selectedBindKey : 'undefined'}`);
}

// Findet ein Item anhand seines Befehls
function findItemByCmd(cmd) {
  for (const cat in categories) {
    const items = categories[cat];
    for (const item of items) {
      if (item.cmd === cmd) {
        return { ...item, category: cat };
      }
    }
  }
  return null;
}

// VALIDIERT EINE KOMPLETTE COMMAND-LISTE UND GIBT NUR DIE GÜLTIGEN ZURÜCK
function validateAndCleanCommands(commands) {
  const validCommands = [];
  const errors = [];

  let hasCtPistol = false;
  let hasTPistol = false;
  let hasBothPistol = false;
  let hasCtPrimary = false;
  let hasTPrimary = false;
  let hasBothPrimary = false;
  let selectedBothPistolName = "";
  let selectedBothPrimaryName = "";
  let selectedCtPistolName = "";
  let selectedTPistolName = "";
  let selectedCtPrimaryName = "";
  let selectedTPrimaryName = "";

  let ctGrenadeCount = 0;
  let tGrenadeCount = 0;

  for (const cmd of commands) {
    const item = findItemByCmd(cmd);
    if (!item) continue;

    let canAdd = true;
    let reason = "";

    // GRANATEN-VALIDIERUNG
    if (item.category === GRENADE_CATEGORY) {
      const isCtOnly = item.side === "ct";
      const isTOnly = item.side === "t";
      const isBoth = item.side === "both";

      let tempCtCount = ctGrenadeCount;
      let tempTCount = tGrenadeCount;

      if (isCtOnly || isBoth) tempCtCount++;
      if (isTOnly || isBoth) tempTCount++;

      if (tempCtCount > 4) {
        canAdd = false;
        reason = `❌ Maximal 4 Granaten pro Seite erlaubt! (CT: ${ctGrenadeCount} + diese = ${tempCtCount}/4)`;
      } else if (tempTCount > 4) {
        canAdd = false;
        reason = `❌ Maximal 4 Granaten pro Seite erlaubt! (T: ${tGrenadeCount} + diese = ${tempTCount}/4)`;
      }

      if (canAdd) {
        if (isCtOnly || isBoth) ctGrenadeCount++;
        if (isTOnly || isBoth) tGrenadeCount++;
      }
    }

    // PISTOLEN-VALIDIERUNG
    else if (item.category === "Pistole") {
      if (item.side === "ct") {
        if (hasCtPistol) {
          canAdd = false;
          reason = `❌ Nur eine CT-Pistole erlaubt! (${selectedCtPistolName} bereits vorhanden)`;
        } else if (hasBothPistol) {
          canAdd = false;
          reason = `❌ Du kannst keine CT-Pistole (${item.name}) zusammen mit einer "both"-Pistole (${selectedBothPistolName}) verwenden!`;
        } else {
          hasCtPistol = true;
          selectedCtPistolName = item.name;
        }
      } else if (item.side === "t") {
        if (hasTPistol) {
          canAdd = false;
          reason = `❌ Nur eine T-Pistole erlaubt! (${selectedTPistolName} bereits vorhanden)`;
        } else if (hasBothPistol) {
          canAdd = false;
          reason = `❌ Du kannst keine T-Pistole (${item.name}) zusammen mit einer "both"-Pistole (${selectedBothPistolName}) verwenden!`;
        } else {
          hasTPistol = true;
          selectedTPistolName = item.name;
        }
      } else if (item.side === "both") {
        if (hasBothPistol) {
          canAdd = false;
          reason = `❌ Nur eine "both"-Pistole erlaubt! (${selectedBothPistolName} bereits vorhanden)`;
        } else if (hasCtPistol || hasTPistol) {
          canAdd = false;
          reason = `❌ Du kannst keine "both"-Pistole (${item.name}) zusammen mit einer seiten-spezifischen Pistole verwenden!`;
        } else {
          hasBothPistol = true;
          selectedBothPistolName = item.name;
        }
      }
    }

    // PRIMÄRWAFFEN-VALIDIERUNG
    else if (PRIMARY_CATEGORIES.includes(item.category)) {
      if (item.side === "ct") {
        if (hasCtPrimary) {
          canAdd = false;
          reason = `❌ Nur eine CT-Primärwaffe erlaubt! (${selectedCtPrimaryName} bereits vorhanden)`;
        } else if (hasBothPrimary) {
          canAdd = false;
          reason = `❌ Du kannst keine CT-Waffe (${item.name}) zusammen mit einer "both"-Waffe (${selectedBothPrimaryName}) verwenden!`;
        } else {
          hasCtPrimary = true;
          selectedCtPrimaryName = item.name;
        }
      } else if (item.side === "t") {
        if (hasTPrimary) {
          canAdd = false;
          reason = `❌ Nur eine T-Primärwaffe erlaubt! (${selectedTPrimaryName} bereits vorhanden)`;
        } else if (hasBothPrimary) {
          canAdd = false;
          reason = `❌ Du kannst keine T-Waffe (${item.name}) zusammen mit einer "both"-Waffe (${selectedBothPrimaryName}) verwenden!`;
        } else {
          hasTPrimary = true;
          selectedTPrimaryName = item.name;
        }
      } else if (item.side === "both") {
        if (hasBothPrimary) {
          canAdd = false;
          reason = `❌ Nur eine "both"-Primärwaffe erlaubt! (${selectedBothPrimaryName} bereits vorhanden)`;
        } else if (hasCtPrimary || hasTPrimary) {
          canAdd = false;
          reason = `❌ Du kannst keine "both"-Waffe (${item.name}) zusammen mit einer seiten-spezifischen Waffe verwenden!`;
        } else {
          hasBothPrimary = true;
          selectedBothPrimaryName = item.name;
        }
      }
    }

    // Rüstung etc. ist immer erlaubt
    else {
      // Immer erlaubt
    }

    if (canAdd) {
      validCommands.push(cmd);
    } else {
      errors.push(reason);
    }
  }

  return { validCommands, errors, ctGrenadeCount, tGrenadeCount };
}

// Bereinigt den aktuellen Command-String (entfernt ungültige Waffen)
function cleanCommandString(cmdString) {
  const commands = parseBuyCommand(cmdString);
  const cleaned = validateAndCleanCommands(commands);

  return {
    cleanCmd: cleaned.validCommands.join("; "),
    errors: cleaned.errors,
    ctGrenadeCount: cleaned.ctGrenadeCount,
    tGrenadeCount: cleaned.tGrenadeCount,
  };
}

// Analysiert einen Buy-Befehl (nach der Bereinigung)
function analyzeBinding(cmdString) {
  const commands = parseBuyCommand(cmdString);
  const items = [];
  let ctPistol = null,
    tPistol = null,
    bothPistol = null;
  let ctPrimary = null,
    tPrimary = null,
    bothPrimary = null;
  let ctTotal = 0,
    tTotal = 0;
  let ctGrenadeCount = 0,
    tGrenadeCount = 0;

  for (const cmd of commands) {
    const item = findItemByCmd(cmd);
    if (item) {
      items.push(item);
      if (item.side === "both" || item.side === "ct") ctTotal += item.price;
      if (item.side === "both" || item.side === "t") tTotal += item.price;

      if (item.category === "Pistole") {
        if (item.side === "ct") ctPistol = item;
        else if (item.side === "t") tPistol = item;
        else if (item.side === "both") bothPistol = item;
      }
      if (PRIMARY_CATEGORIES.includes(item.category)) {
        if (item.side === "ct") ctPrimary = item;
        else if (item.side === "t") tPrimary = item;
        else if (item.side === "both") bothPrimary = item;
      }
      if (item.category === GRENADE_CATEGORY) {
        if (item.side === "ct" || item.side === "both") ctGrenadeCount++;
        if (item.side === "t" || item.side === "both") tGrenadeCount++;
      }
    }
  }

  return {
    items,
    ctPistol,
    tPistol,
    bothPistol,
    ctPrimary,
    tPrimary,
    bothPrimary,
    ctTotal,
    tTotal,
    ctGrenadeCount,
    tGrenadeCount,
    isValid: true,
  };
}

// Prüft OB eine einzelne Waffe zu einer bestehenden Liste hinzugefügt werden KANN
function canAddSingleItem(currentCommands, newItem) {
  const newCommands = [...currentCommands, newItem.cmd];
  const validation = validateAndCleanCommands(newCommands);

  if (validation.errors.length > 0) {
    return { canAdd: false, reason: validation.errors[0] };
  }

  return { canAdd: true };
}

// Hauptfunktion zum Hinzufügen/Entfernen einer Waffe (TOGGLE)
function toggleItemInBinding(currentCmd, item) {
  let commands = parseBuyCommand(currentCmd);
  const existingIndex = commands.findIndex((cmd) => cmd === item.cmd);

  // Wenn die Waffe bereits existiert -> entfernen (TOGGLE)
  if (existingIndex !== -1) {
    commands.splice(existingIndex, 1);
    const validation = validateAndCleanCommands(commands);
    return {
      newCmd: validation.validCommands.join("; "),
      action: "removed",
      itemName: item.name,
    };
  }

  // Prüfe ob hinzugefügt werden kann
  const canAdd = canAddSingleItem(commands, item);
  if (!canAdd.canAdd) {
    return { error: canAdd.reason };
  }

  // Füge hinzu
  commands.push(item.cmd);
  return {
    newCmd: commands.join("; "),
    action: "added",
    itemName: item.name,
    itemPrice: item.price,
  };
}

// Live-Berechnung und Anzeige aktualisieren (mit automatischer Bereinigung)
// Live-Berechnung und Anzeige aktualisieren (mit automatischer Bereinigung)
function updateLiveAnalysis() {
  const input = document.getElementById("bindsBuyCommandInput");
  if (!input) return;

  let cmdString = input.value;

  const cleaned = cleanCommandString(cmdString);
  if (cleaned.errors.length > 0 && cmdString !== cleaned.cleanCmd) {
    cmdString = cleaned.cleanCmd;
    input.value = cmdString;
  }

  const analysis = analyzeBinding(cmdString);

  const priceDisplay = document.getElementById("totalPriceDisplay");
  if (priceDisplay) {
    // Primärwaffen-Anzeige
    let primaryDisplay = "";
    if (analysis.bothPrimary) {
      primaryDisplay = `<div style="font-size: 0.65rem; margin-top: 0.2rem; color: #aaa;">🔫 Primär: ${analysis.bothPrimary.name} (CT/T)</div>`;
    } else {
      primaryDisplay = `<div style="display: flex; justify-content: center; gap: 1rem; margin-top: 0.3rem; font-size: 0.65rem;">
        <span style="color: #3399ff;">🔵 CT: ${analysis.ctPrimary ? analysis.ctPrimary.name : "Keine"}</span>
        <span style="color: #ffaa33;">🟠 T: ${analysis.tPrimary ? analysis.tPrimary.name : "Keine"}</span>
      </div>`;
    }

    // Pistolen-Anzeige - KORRIGIERT!
    let pistolDisplay = "";
    if (analysis.bothPistol) {
      pistolDisplay = `<div style="font-size: 0.65rem; margin-top: 0.2rem; color: #aaa;">🔫 Pistole: ${analysis.bothPistol.name} (CT/T)</div>`;
    } else {
      pistolDisplay = `<div style="display: flex; justify-content: center; gap: 1rem; margin-top: 0.3rem; font-size: 0.65rem;">
        <span style="color: #3399ff;">🔵 CT-Pistole: ${analysis.ctPistol ? analysis.ctPistol.name : "Keine"}</span>
        <span style="color: #ffaa33;">🟠 T-Pistole: ${analysis.tPistol ? analysis.tPistol.name : "Keine"}</span>
      </div>`;
    }

    // Granaten-Anzeige
    let grenadeDisplay = "";
    if (analysis.ctGrenadeCount > 0 || analysis.tGrenadeCount > 0) {
      grenadeDisplay = `<div style="display: flex; justify-content: center; gap: 1rem; margin-top: 0.3rem; font-size: 0.65rem;">
        <span style="color: #3399ff;">💣 CT-Granaten: ${analysis.ctGrenadeCount}/4</span>
        <span style="color: #ffaa33;">💣 T-Granaten: ${analysis.tGrenadeCount}/4</span>
      </div>`;
    }

    priceDisplay.innerHTML = `
      <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
        <div style="text-align: center; padding: 0.5rem 1rem; background: rgba(0,0,0,0.3); border-radius: 1rem; border-left: 3px solid #3399ff;">
          <div style="font-size: 0.7rem; color: var(--accent-light);">🔵 CT-Side</div>
          <div style="font-size: 1.5rem; font-weight: bold; color: #3399ff;">$${analysis.ctTotal.toLocaleString()}</div>
        </div>
        <div style="text-align: center; padding: 0.5rem 1rem; background: rgba(0,0,0,0.3); border-radius: 1rem; border-left: 3px solid #ffaa33;">
          <div style="font-size: 0.7rem; color: var(--accent-light);">🟠 T-Side</div>
          <div style="font-size: 1.5rem; font-weight: bold; color: #ffaa33;">$${analysis.tTotal.toLocaleString()}</div>
        </div>
      </div>
      ${primaryDisplay}
      ${pistolDisplay}
      ${grenadeDisplay}
    `;
  }

  // Fehler anzeigen
  const errorContainer = document.getElementById("liveErrorContainer");
  if (errorContainer) {
    if (cleaned.errors.length > 0) {
      const uniqueErrors = [...new Set(cleaned.errors)];
      errorContainer.innerHTML = `
        <div style="background: rgba(255,0,0,0.2); border-left: 3px solid #ff4444; border-radius: 0.5rem; padding: 0.5rem; margin-top: 0.5rem;">
          ${uniqueErrors.map((e) => `<div style="color: #ff8888; font-size: 0.7rem;">${e}</div>`).join("")}
        </div>
      `;
      errorContainer.style.display = "block";
    } else {
      errorContainer.style.display = "none";
    }
  }

  const saveBtn = document.getElementById("bindsSaveBuyBtn");
  if (saveBtn) {
    saveBtn.disabled = cleaned.errors.length > 0;
    saveBtn.style.opacity = cleaned.errors.length > 0 ? "0.5" : "1";
  }

  // Rufe renderBuyItems auf, um die Highlights zu aktualisieren
  if (typeof renderBuyItems === "function") {
    renderBuyItems();
  }

  return analysis;
}
=======
// Neue Variablen für temporäre Buy-Bind-Zusammenstellung
let tempBuyItems = {
  t: { pistol: null, primary: null, grenades: [], equipment: [] },
  ct: { pistol: null, primary: null, grenades: [], equipment: [] }
};
>>>>>>> 38331c4ea550edcc13a34938b3a1f1ebfe97acf8

function loadBuy() {
  let s = localStorage.getItem("cs2_neon_buy_unique");
  buyBindings = s ? JSON.parse(s) : {};
  renderSavedBinds();
  if (window.refreshFullExport) window.refreshFullExport();
  updateLiveAnalysis();
}

function saveBuy() {
  localStorage.setItem("cs2_neon_buy_unique", JSON.stringify(buyBindings));
  renderSavedBinds();
  if (window.refreshFullExport) window.refreshFullExport();
  updateLiveAnalysis();
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

  let rows = typeof mainKeysRows !== "undefined" ? mainKeysRows : [];
  if (rows.length === 0 && typeof deKeysRows !== "undefined") {
    rows = deKeysRows;
  }

  rows.forEach((row) => {
    let rd = document.createElement("div");
    rd.className = "key-row";
    row.forEach((k) => {
      let d = document.createElement("div");
      let keyClass = window.getKeyClass ? window.getKeyClass(k) : "";
      d.className = `key ${keyClass}`;
      if (selectedBuyKey === k) d.classList.add("active-key");
      d.textContent = k;
      d.onclick = () => {
        selectedBuyKey = k;
        renderBuyKeyboard();
<<<<<<< HEAD
        const input = document.getElementById("bindsBuyCommandInput");
        if (input) {
          input.value = buyBindings[k] || "";
          updateLiveAnalysis();
=======
        const input = document.getElementById("buyCommandInput");
        const currentCmd = buyBindings[k] || "";
        if (input) {
          input.value = currentCmd;
          parseCommandToTempItems(currentCmd);
>>>>>>> 38331c4ea550edcc13a34938b3a1f1ebfe97acf8
        }
      };
      rd.appendChild(d);
    });
    mainCont.appendChild(rd);
  });

  const numCont = document.getElementById("numpadContainer");
  if (!numCont) return;
  numCont.innerHTML = "";

  let numpad = typeof numpadKeys !== "undefined" ? numpadKeys : [];
  numpad.forEach((k) => {
    let d = document.createElement("div");
    let keyClass = window.getKeyClass ? window.getKeyClass(k) : "";
    d.className = `numpad-key ${keyClass}`;
    if (selectedBuyKey === k) d.style.background = "var(--accent)";
    d.textContent = k.replace("KP_", "");
    d.onclick = () => {
      selectedBuyKey = k;
      renderBuyKeyboard();
<<<<<<< HEAD
      const input = document.getElementById("bindsBuyCommandInput");
      if (input) {
        input.value = buyBindings[k] || "";
        updateLiveAnalysis();
=======
      const input = document.getElementById("buyCommandInput");
      const currentCmd = buyBindings[k] || "";
      if (input) {
        input.value = currentCmd;
        parseCommandToTempItems(currentCmd);
>>>>>>> 38331c4ea550edcc13a34938b3a1f1ebfe97acf8
      }
    };
    numCont.appendChild(d);
  });
}

function renderBuyCategories() {
  let catDiv = document.getElementById("bindsCategoryList");
  if (!catDiv) return;
  catDiv.innerHTML = "";

  // Speichere die aktuell ausgewählte Kategorie
  const currentSelectedCategory = currentCategory;
  console.log("renderBuyCategories - aktuelle Kategorie:", currentSelectedCategory);

  Object.keys(categories).forEach((c) => {
    let p = document.createElement("div");
    p.className = "cat-pill";
    if (currentSelectedCategory === c) p.classList.add("active-cat");
    p.textContent = c;
    p.onclick = (function(catName) {
      return function() {
        console.log("Kategorie gewechselt zu:", catName);
        currentCategory = catName;
        renderBuyCategories();
        renderBuyItems();
      };
    })(c);
    catDiv.appendChild(p);
  });
  
  // Items für die aktuelle Kategorie rendern
  renderBuyItems();
}

// renderBuyItems mit GRÜNEM HIGHLIGHT für ausgewählte Waffen
// renderBuyItems mit GRÜNEM HIGHLIGHT für ausgewählte Waffen
function renderBuyItems() {
  let grid = document.getElementById("bindsItemsGrid");
  if (!grid) return;

  console.log("renderBuyItems aufgerufen für Kategorie:", currentCategory);

  // Aktuelle Befehle aus dem Textarea holen
  const input = document.getElementById("bindsBuyCommandInput");
  const currentCmd = input ? input.value : "";
  const currentCommands = parseBuyCommand(currentCmd);

  // Hole die aktuell ausgewählte Taste
  let activeKey = selectedBuyKey;
  if (!activeKey && typeof selectedBindKey !== 'undefined' && selectedBindKey !== null) {
    activeKey = selectedBindKey;
    selectedBuyKey = activeKey;
  }
  
<<<<<<< HEAD
  const hasSelectedKey = activeKey !== null;

  // Prüfe ob die aktuelle Kategorie existiert
  if (!categories[currentCategory]) {
    console.warn("Kategorie nicht gefunden:", currentCategory, "setze auf Pistole");
    currentCategory = "Pistole";
  }

  const currentItems = categories[currentCategory];
  if (!currentItems) {
    console.error("Keine Items für Kategorie:", currentCategory);
    grid.innerHTML = '<div class="empty-message">Keine Items in dieser Kategorie</div>';
    return;
  }

  grid.innerHTML = "";

  currentItems.forEach((it) => {
    let div = document.createElement("div");
    div.className = "weapon-item";

    // Prüfe ob diese Waffe bereits im aktuellen Binding ist
    const isSelected = currentCommands.includes(it.cmd);

    // GRÜNES HIGHLIGHT wenn ausgewählt
    if (isSelected) {
      div.style.background = "linear-gradient(135deg, #00aa44, #008833)";
      div.style.border = "1px solid #00ff66";
      div.style.boxShadow = "0 0 8px #00ff66";
      div.style.color = "#ffffff";
    } else {
      div.style.background = "";
      div.style.border = "";
      div.style.boxShadow = "";
      div.style.color = "";
    }

    // Wenn KEINE Taste ausgewählt ist, zeige dies optisch an
    if (!hasSelectedKey) {
      div.style.opacity = "0.5";
      div.style.cursor = "not-allowed";
    } else {
      div.style.opacity = "1";
      div.style.cursor = "pointer";
    }

    // Preis und Seiten-Badge anzeigen
    let sideBadge = "";
    if (it.side === "ct") {
      sideBadge = '<span style="font-size: 0.6rem; background: #3399ff; padding: 0.1rem 0.4rem; border-radius: 0.5rem; margin-left: 0.3rem;">CT</span>';
    } else if (it.side === "t") {
      sideBadge = '<span style="font-size: 0.6rem; background: #ffaa33; padding: 0.1rem 0.4rem; border-radius: 0.5rem; margin-left: 0.3rem;">T</span>';
    } else {
      sideBadge = '<span style="font-size: 0.6rem; background: #888; padding: 0.1rem 0.4rem; border-radius: 0.5rem; margin-left: 0.3rem;">CT/T</span>';
    }

    // Zusätzliche Info für Granaten: max 4 pro Seite
    let extraInfo = "";
    if (it.category === "Granaten") {
      extraInfo = '<span style="font-size: 0.55rem; margin-left: 0.3rem; color: #ffaa66;">(max 4/Seite)</span>';
    }

    // Icon für Auswahlstatus
    const selectIcon = isSelected ? '✅' : '➕';

    div.innerHTML = `
      <span>
        ${it.name} 
        <span style="color: #ffaa33; font-weight: bold;">$${it.price}</span>
        ${sideBadge}
        ${it.maxCount > 1 ? `<span style="font-size: 0.6rem; margin-left: 0.3rem;">(x${it.maxCount})</span>` : ''}
        ${extraInfo}
      </span>
      <span class="add-icon">${selectIcon}</span>
    `;

    div.onclick = (function(item) {
      return function() {
        // Prüfe ob eine Taste ausgewählt ist
        let currentActiveKey = selectedBuyKey;
        if (!currentActiveKey && typeof selectedBindKey !== 'undefined' && selectedBindKey !== null) {
          currentActiveKey = selectedBindKey;
        }
        
        if (!currentActiveKey) {
          alert("⚠️ Bitte wähle zuerst eine Taste auf der Tastatur aus!");
          return;
        }

        const input = document.getElementById("bindsBuyCommandInput");
        const currentCmd = input.value;

        const result = toggleItemInBinding(currentCmd, item);

        if (result.error) {
          alert(result.error);
          return;
        }

        input.value = result.newCmd;
        updateLiveAnalysis();

        // Zeige Bestätigung
        const tempMsg = document.createElement("div");
        if (result.action === "added") {
          tempMsg.textContent = `➕ ${result.itemName} ($${result.itemPrice}) zu Taste "${currentActiveKey}" hinzugefügt!`;
          tempMsg.style.cssText = "position: fixed; bottom: 20px; right: 20px; background: #44cc44; color: #0a0a0f; padding: 0.5rem 1rem; border-radius: 1rem; font-size: 0.8rem; z-index: 9999; animation: fadeOut 1.5s ease-out;";
        } else {
          tempMsg.textContent = `➖ ${result.itemName} von Taste "${currentActiveKey}" entfernt!`;
          tempMsg.style.cssText = "position: fixed; bottom: 20px; right: 20px; background: #ff6666; color: #fff; padding: 0.5rem 1rem; border-radius: 1rem; font-size: 0.8rem; z-index: 9999; animation: fadeOut 1.5s ease-out;";
        }
        document.body.appendChild(tempMsg);
        setTimeout(() => tempMsg.remove(), 1500);
        
        // Wichtig: Nur die Items neu rendern, nicht die Kategorie ändern
        renderBuyItems();
      };
    })(it);
=======
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
    
    // AMMO-INFO (nur für Waffen mit magazine/total)
    let ammoInfo = "";
    if (it.magazine && it.total) {
      ammoInfo = `<div class="weapon-ammo">🔫 ${it.magazine}/${it.total} Schuss</div>`;
    } else if (it.magazine && !it.total) {
      // Für Shotguns ohne Gesamtangabe
      ammoInfo = `<div class="weapon-ammo">📦 ${it.magazine} Schuss (Magazin)</div>`;
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
        ${ammoInfo}
        <div class="weapon-description">${weaponInfo}</div>
      </div>
      <button class="weapon-action-btn">${isItemSelected(it) ? '✓ Ausgewählt' : '+ Hinzufügen'}</button>
    `;
    
>>>>>>> 38331c4ea550edcc13a34938b3a1f1ebfe97acf8
    grid.appendChild(div);
  });
  
  // Event-Handler für alle Items (bleibt gleich)
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
    "R8 Revolver": "revolver.webp",
    
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
    "Taser": "zeus_x27.png",
    
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
    "Glock-18": "Standard-Terroristen-Pistole. Ausgezeichnete Genauigkeit beim ersten Schuss, moderate Feuerrate.",
    "USP-S": "Standard-CT-Pistole mit Schalldämpfer. Extrem präzise, hohe Penetration.",
    "P2000": "Alternative CT-Startpistole. Gute Balance zwischen Genauigkeit und Feuerrate.",
    "P250": "Günstige Upgrade-Pistole für beide Seiten. Hohe Penetration, gut gegen Rüstung.",
    "Five-SeveN": "CT-Pistole. Hohe Feuerrate, gute Genauigkeit. Ideal für Eco-Rounds.",
    "Tec-9": "T-Pistole. Hohe Mobilität, gut für Run-and-Gun. Perfekt für Eco-Rushes.",
    "Desert Eagle": "High-Risk-High-Reward Pistole. Ein Schuss Kopf = Tod, auch mit Helm.",
    "Dual Berettas": "Zwei Pistolen mit 30 Schuss Magazin. Hohe Feuerrate, aber geringe Genauigkeit.",
    "CZ75-Auto": "Automatische Pistole. Hohe Feuerrate, kleines Magazin. Gut für Nahkämpfe.",
    
    // SMGs
    "MP9": "CT-SMG. Hohe Feuerrate, gute Mobilität. Ideal für Anti-Eco.",
    "MAC-10": "T-SMG. Sehr hohe Feuerrate, gute Bewegungswerte. Perfekt für Rushes.",
    "MP7": "Ausgewogene SMG. Gute Genauigkeit, moderate Feuerrate. Für beide Seiten.",
    "MP5-SD": "SMG mit integriertem Schalldämpfer. Sehr leise, gute Kontrolle.",
    "UMP-45": "Budget-SMG mit hohem Schaden. Gut gegen ungerüstete Gegner.",
    "P90": "High-Capacity SMG., hohe Feuerrate. Ideal für Spray-and-Pray.",
    "PP-Bizon": "Niedriger Schaden, aber riesiges Magazin. Gut für Suppression.",
    
    // Rifles
    "AK-47": "T-Standardgewehr. Hoher Schaden. Ein Kopfschuss = Tod. Beste Rifle für T-Seite.",
    "M4A4": "CT-Standardgewehr. gute Feuerrate. Ausgewogene Performance.",
    "M4A1-S": "CT-Gewehr mit Schalldämpfer.Hohe Genauigkeit. Geringeres Spraymuster.",
    "FAMAS": "Budget-CT-Gewehr. 3-Round-Burst-Modus. Gut für Eco/Force-Buys.",
    "Galil AR": "Budget-T-Gewehr. Solide Alternative zur AK bei wenig Geld.",
    "SG 553": "T-Gewehr mit Scope. Hohe Genauigkeit. Gute Alternative zur AK.",
    "AUG": "CT-Gewehr mit Scope. Hohe Genauigkeit. Ausgezeichnet für lange Distanzen.",
    
    // Snipers
    "AWP": "Einschussgewehr. Ein Treffer in Brust/Bein = Tod. Beste Sniper in CS2.",
    "SSG 08": "Budget-Sniper (Scout). Hohe Mobilität. Zwei Körpertreffer zum Kill.",
    "SCAR-20": "CT-Autosniper. Halbautomatisch. Hoher Schaden, aber teuer.",
    "G3SG1": "T-Autosniper. Halbautomatisch. Ähnlich wie SCAR-20 für T-Seite.",
    
    // Shotguns
    "Nova": "Budget-Shotgun. 8 Schuss, hoher Nahkampfschaden. Gut für Nahbereichs-Eco-Rounds.",
    "XM1014": "Halbautomatische Shotgun. Hohe Feuerrate. Gut für Nahkämpfe.",
    "MAG-7": "CT-Shotgun. Extrem hoher Schaden auf kurze Distanz. 1 Schuss Kill.",
    "Sawed-Off": "T-Shotgun. Hoher Schaden. Perfekt für enge Räume/Ecken.",
    
    // Heavy
    "M249": "Schweres MG. Hoher Schaden. Sehr teuer, ungenau.",
    "Negev": "Suppression-MG. Wird mit der Zeit genauer. Perfekt für Spam.",
    
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

<<<<<<< HEAD
function bindsSaveBuy() {
  // Verwende den aktuell ausgewählten Key
  let activeKey = selectedBuyKey;
  if (
    !activeKey &&
    typeof selectedBindKey !== "undefined" &&
    selectedBindKey !== null
  ) {
    activeKey = selectedBindKey;
    selectedBuyKey = activeKey;
  }

  if (!activeKey) {
    alert("⚠️ Bitte wähle zuerst eine Taste auf der Tastatur aus!");
=======
function saveCurrentBinding() {
  // Verwende den globalen Wert aus binds.js
  let currentKey = window.selectedBindKey;
  
  console.log("saveCurrentBinding - window.selectedBindKey:", currentKey);
  
  if (!currentKey) {
    alert("❌ Bitte wähle zuerst eine Taste auf der Tastatur aus!");
>>>>>>> 38331c4ea550edcc13a34938b3a1f1ebfe97acf8
    return;
  }

  const input = document.getElementById("bindsBuyCommandInput");
  let val = input.value.trim();
  if (!val) {
<<<<<<< HEAD
    alert("⚠️ Bitte gib einen Buy-Befehl ein!");
    return;
  }

  const analysis = analyzeBinding(val);

  const existingType = window.getExistingBindingType
    ? window.getExistingBindingType(activeKey)
    : "none";

  if (existingType !== "none" && existingType !== "buy") {
    let typeName = existingType === "script" ? "ein Skript" : "einen Say-Bind";
    if (
      !confirm(
        `Taste "${activeKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`,
      )
    ) {
      return;
    }
    if (window.removeSpecificBinding)
      window.removeSpecificBinding(activeKey, existingType);
  }

  buyBindings[activeKey] = val;
  saveBuy();

  let summary = `✅ Buy-Bindung für Taste "${activeKey}" gespeichert!\n\n`;
  summary += `🔵 CT: $${analysis.ctTotal.toLocaleString()} | 🟠 T: $${analysis.tTotal.toLocaleString()}\n`;
  summary += `💣 CT-Granaten: ${analysis.ctGrenadeCount}/4 | T-Granaten: ${analysis.tGrenadeCount}/4\n`;
  if (analysis.bothPistol) {
    summary += `🔫 Pistole: ${analysis.bothPistol.name}\n`;
  } else {
    if (analysis.ctPistol)
      summary += `🔵 CT-Pistole: ${analysis.ctPistol.name}\n`;
    if (analysis.tPistol) summary += `🟠 T-Pistole: ${analysis.tPistol.name}\n`;
  }
  if (analysis.bothPrimary) {
    summary += `🔫 Primär: ${analysis.bothPrimary.name} (CT/T)`;
  } else {
    if (analysis.ctPrimary)
      summary += `🔵 CT-Primär: ${analysis.ctPrimary.name}\n`;
    if (analysis.tPrimary) summary += `🟠 T-Primär: ${analysis.tPrimary.name}`;
  }

  alert(summary);
  updateLiveAnalysis();

  if (window.renderBindsKeyboardGrid) window.renderBindsKeyboardGrid();
  if (window.renderBindsMouseGrid) window.renderBindsMouseGrid();
  if (window.renderBindsSavedList) window.renderBindsSavedList();
  if (window.refreshFullExport) window.refreshFullExport();
}

function bindsUnbindCurrent() {
  // Verwende den aktuell ausgewählten Key
  let activeKey = selectedBuyKey;
  if (
    !activeKey &&
    typeof selectedBindKey !== "undefined" &&
    selectedBindKey !== null
  ) {
    activeKey = selectedBindKey;
    selectedBuyKey = activeKey;
  }

  if (!activeKey) {
    alert("⚠️ Bitte wähle zuerst eine Taste aus!");
    return;
  }

  if (window.buyBindings && window.buyBindings[activeKey]) {
    delete window.buyBindings[activeKey];
    if (window.saveBuy) window.saveBuy();

    const input = document.getElementById("bindsBuyCommandInput");
    if (input) input.value = "";
    updateLiveAnalysis();

    alert(`✅ Binding für ${activeKey} entfernt`);

    if (window.renderBindsKeyboardGrid) window.renderBindsKeyboardGrid();
    if (window.renderBindsMouseGrid) window.renderBindsMouseGrid();
    if (window.renderBindsSavedList) window.renderBindsSavedList();
    if (window.refreshFullExport) window.refreshFullExport();
=======
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
>>>>>>> 38331c4ea550edcc13a34938b3a1f1ebfe97acf8
  } else {
    alert(`ℹ️ Keine Buy-Bindung für Taste "${activeKey}"`);
  }
}

function renderSavedBinds() {
  let cont = document.getElementById("bindsSavedList");
  if (!cont) return;
  cont.innerHTML = "";

  if (Object.keys(buyBindings).length === 0) {
    cont.innerHTML =
      '<div class="empty-message">✨ Keine Buy-Bindings. Klicke auf eine Taste, um ein Binding zu erstellen!</div>';
    return;
  }

  for (let [k, cmd] of Object.entries(buyBindings)) {
    let e = document.createElement("div");
    e.className = "bind-entry";
<<<<<<< HEAD

    const analysis = analyzeBinding(cmd);
    const itemNames = analysis.items.map((i) => i.name).join(", ");

    e.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <span class="bind-key" style="font-weight: bold;">🔗 bind "${k}"</span>
        <span class="bind-command" style="font-size: 0.75rem;">${cmd.substring(0, 60)}${cmd.length > 60 ? "..." : ""}</span>
        <div style="display: flex; gap: 0.8rem; font-size: 0.7rem;">
          <span style="color: #3399ff;">CT: $${analysis.ctTotal.toLocaleString()}</span>
          <span style="color: #ffaa33;">T: $${analysis.tTotal.toLocaleString()}</span>
        </div>
      </div>
      <div style="display: flex; gap: 1rem; font-size: 0.65rem; margin-top: 0.3rem;">
        <span style="color: #3399ff;">💣 CT-Granaten: ${analysis.ctGrenadeCount}/4</span>
        <span style="color: #ffaa33;">💣 T-Granaten: ${analysis.tGrenadeCount}/4</span>
      </div>
      <div style="font-size: 0.65rem; color: var(--accent-light); margin-top: 0.2rem;">
        📦 ${itemNames.substring(0, 80)}${itemNames.length > 80 ? "..." : ""}
      </div>
    `;

    e.onclick = () => {
      selectedBuyKey = k;
      if (window.renderBuyKeyboard) window.renderBuyKeyboard();
      const input = document.getElementById("bindsBuyCommandInput");
      if (input) {
        input.value = cmd;
        updateLiveAnalysis();
      }
=======
    e.innerHTML = `<span class="bind-key">bind "${k}"</span> → <span class="bind-command">"${cmd.substring(0, 60)}${cmd.length > 60 ? '...' : ''}"</span>`;
    e.onclick = () => {
      selectedBuyKey = k;
      if (window.renderBuyKeyboard) window.renderBuyKeyboard();
      document.getElementById("buyCommandInput").value = cmd;
      parseCommandToTempItems(cmd);
>>>>>>> 38331c4ea550edcc13a34938b3a1f1ebfe97acf8
    };
    cont.appendChild(e);
  }
}

function bindsResetAll() {
  if (
    confirm(
      "⚠️ ALLE Buy-Bindings löschen? Diese Aktion kann nicht rückgängig gemacht werden!",
    )
  ) {
    buyBindings = {};
    saveBuy();
<<<<<<< HEAD
    const input = document.getElementById("bindsBuyCommandInput");
    if (input) input.value = "";
    updateLiveAnalysis();
=======
    if (selectedBuyKey) {
      document.getElementById("buyCommandInput").value = "";
      parseCommandToTempItems("");
    }
>>>>>>> 38331c4ea550edcc13a34938b3a1f1ebfe97acf8
    alert("✅ Alle Buy-Bindings gelöscht.");
    if (window.renderBindsKeyboardGrid) window.renderBindsKeyboardGrid();
    if (window.renderBindsMouseGrid) window.renderBindsMouseGrid();
    if (window.renderBindsSavedList) window.renderBindsSavedList();
    if (window.refreshFullExport) window.refreshFullExport();
  }
}

<<<<<<< HEAD
function initBuyLiveListener() {
  const input = document.getElementById("bindsBuyCommandInput");
  if (input) {
    console.log("✅ Live-Listener für Buy-Input registriert");
    input.removeEventListener("input", updateLiveAnalysis);
    input.addEventListener("input", updateLiveAnalysis);
    setTimeout(() => updateLiveAnalysis(), 100);
  } else {
    console.warn("⚠️ bindsBuyCommandInput nicht gefunden!");
  }
}

// Globale Exporte
=======
function initBuyTab() {
  renderBuyCategories();
  renderBuyKeyboard();
  
  const saveBtn = document.getElementById("saveBuyBtn");
  if (saveBtn) saveBtn.addEventListener("click", saveCurrentBinding);
  
  const unbindBtn = document.getElementById("unbindBuyBtn");
  if (unbindBtn) unbindBtn.addEventListener("click", unbindCurrentKey);
}

>>>>>>> 38331c4ea550edcc13a34938b3a1f1ebfe97acf8
window.buyBindings = buyBindings;
window.renderBuyKeyboard = renderBuyKeyboard;
window.saveBuy = saveBuy;
window.loadBuy = loadBuy;
<<<<<<< HEAD
window.updateLiveAnalysis = updateLiveAnalysis;
window.initBuyLiveListener = initBuyLiveListener;
window.bindsSaveBuy = bindsSaveBuy;
window.bindsUnbindCurrent = bindsUnbindCurrent;
window.bindsResetAll = bindsResetAll;
window.analyzeBinding = analyzeBinding;
window.toggleItemInBinding = toggleItemInBinding;
window.selectedBuyKey = selectedBuyKey;
=======
window.parseCommandToTempItems = parseCommandToTempItems;
window.updatePriceDisplay = updatePriceDisplay;
window.initBuyTab = initBuyTab;
>>>>>>> 38331c4ea550edcc13a34938b3a1f1ebfe97acf8
