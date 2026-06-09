// ======================== BUYSCRIPT MIT GRÜNEM HIGHLIGHT & TOGGLE ========================
let buyBindings = {};
let selectedBuyKey = null;
let currentCategory = "Pistole";

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
        const input = document.getElementById("bindsBuyCommandInput");
        if (input) {
          input.value = buyBindings[k] || "";
          updateLiveAnalysis();
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
      const input = document.getElementById("bindsBuyCommandInput");
      if (input) {
        input.value = buyBindings[k] || "";
        updateLiveAnalysis();
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
    grid.appendChild(div);
  });
}

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
    return;
  }

  const input = document.getElementById("bindsBuyCommandInput");
  let val = input.value.trim();
  if (!val) {
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
    const input = document.getElementById("bindsBuyCommandInput");
    if (input) input.value = "";
    updateLiveAnalysis();
    alert("✅ Alle Buy-Bindings gelöscht.");
    if (window.renderBindsKeyboardGrid) window.renderBindsKeyboardGrid();
    if (window.renderBindsMouseGrid) window.renderBindsMouseGrid();
    if (window.renderBindsSavedList) window.renderBindsSavedList();
    if (window.refreshFullExport) window.refreshFullExport();
  }
}

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
window.buyBindings = buyBindings;
window.renderBuyKeyboard = renderBuyKeyboard;
window.saveBuy = saveBuy;
window.loadBuy = loadBuy;
window.updateLiveAnalysis = updateLiveAnalysis;
window.initBuyLiveListener = initBuyLiveListener;
window.bindsSaveBuy = bindsSaveBuy;
window.bindsUnbindCurrent = bindsUnbindCurrent;
window.bindsResetAll = bindsResetAll;
window.analyzeBinding = analyzeBinding;
window.toggleItemInBinding = toggleItemInBinding;
window.selectedBuyKey = selectedBuyKey;
