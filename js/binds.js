// ======================== BENDS TAB (MIT GRID-TASTATUR) ========================
let selectedBindKey = null;
let currentBindType = "buy";
let showMouseArea = false;

// Gesperrte Tasten (können nicht gebindet werden)
const lockedKeys = [
    "esc", "win", "alt gr", "menu",
    "Print Screen", "Scroll Lock", "Pause Break", "Num Lock",
    "prtsc", "srclk", "pause", "numlock"
];

// Maus-Tasten für Bindings
const mouseKeys = [
  { id: "mouse1", display: "Left Click", cmd: "mouse1" },
  { id: "mouse2", display: "Right Click", cmd: "mouse2" },
  { id: "mouse3", display: "Middle Click", cmd: "mouse3" },
  { id: "mouse4", display: "Side Back", cmd: "mouse4" },
  { id: "mouse5", display: "Side Forward", cmd: "mouse5" },
  { id: "mwheelup", display: "Scroll Up", cmd: "mwheelup" },
  { id: "mwheeldown", display: "Scroll Down", cmd: "mwheeldown" },
];

function initBindsTab() {
    // Stelle sicher, dass mainKeysRows initialisiert ist
    if (typeof mainKeysRows === "undefined" || mainKeysRows.length === 0) {
        if (typeof deKeysRows !== "undefined") {
            mainKeysRows = JSON.parse(JSON.stringify(deKeysRows));
            currentLayout = "DE";
        }
    }
    
    renderBindsKeyboardGrid();
    renderBindsMouseGrid();
    renderBindsBuyCategories();
    renderBindsSavedList();
    renderBindsTemplates();
    attachBindsEventListeners();
    attachMouseToggleListener();
    initLayoutDropdown();  // Statt initLayoutToggleButton
}

// Neue Funktion für den Layout-Toggle-Button
// Neue Funktion für den Layout-Toggle-Button
function initLayoutDropdown() {
    const dropdown = document.getElementById("keyboardLayoutSelect");
    if (!dropdown) return;
    
    // Setze den aktuellen Wert im Dropdown
    dropdown.value = currentLayout;
    
    // Event-Listener für Änderungen
    dropdown.addEventListener("change", (e) => {
        const newLayout = e.target.value;
        if (typeof setKeyboardLayout === "function") {
            setKeyboardLayout(newLayout);
        }
        // Tastatur neu rendern
        renderBindsKeyboardGrid();
        renderBindsMouseGrid();
        console.log("Layout gewechselt zu:", newLayout);
    });
}

function renderBindsKeyboard() {
  renderBindsKeyboardGrid();
}
function renderBindsKeyboardGrid() {
    const container = document.getElementById("bindsKeyboardGrid");
    if (!container) return;
    container.innerHTML = "";
    
    // Definiere die Grid-Positionen mit korrekten Indizes für jedes Layout
    const keyPositions = [
        // Zeile 1: Esc, F1–F12, Print Screen, Scroll Lock, Pause Break
        { col: "1 / 3", row: "1 / 3", small: false, keyName: "ESC" },
        { col: "4 / 6", row: "1 / 3", small: false, keyName: "F1" },
        { col: "6 / 8", row: "1 / 3", small: false, keyName: "F2" },
        { col: "8 / 10", row: "1 / 3", small: false, keyName: "F3" },
        { col: "10 / 12", row: "1 / 3", small: false, keyName: "F4" },
        { col: "13 / 15", row: "1 / 3", small: false, keyName: "F5" },
        { col: "15 / 17", row: "1 / 3", small: false, keyName: "F6" },
        { col: "17 / 19", row: "1 / 3", small: false, keyName: "F7" },
        { col: "19 / 21", row: "1 / 3", small: false, keyName: "F8" },
        { col: "22 / 24", row: "1 / 3", small: false, keyName: "F9" },
        { col: "24 / 26", row: "1 / 3", small: false, keyName: "F10" },
        { col: "26 / 28", row: "1 / 3", small: false, keyName: "F11" },
        { col: "28 / 30", row: "1 / 3", small: false, keyName: "F12" },
        { col: "31 / 33", row: "1 / 3", small: true, keyName: "Print Screen" },
        { col: "33 / 35", row: "1 / 3", small: true, keyName: "Scroll Lock" },
        { col: "35 / 37", row: "1 / 3", small: true, keyName: "Pause Break" },
        
        // Zeile 2: Ziffernreihe
        { col: "1 / 3", row: "4 / 6", small: false, rowIdx: 1, colIdx: 0 },
        { col: "3 / 5", row: "4 / 6", small: false, rowIdx: 1, colIdx: 1 },
        { col: "5 / 7", row: "4 / 6", small: false, rowIdx: 1, colIdx: 2 },
        { col: "7 / 9", row: "4 / 6", small: false, rowIdx: 1, colIdx: 3 },
        { col: "9 / 11", row: "4 / 6", small: false, rowIdx: 1, colIdx: 4 },
        { col: "11 / 13", row: "4 / 6", small: false, rowIdx: 1, colIdx: 5 },
        { col: "13 / 15", row: "4 / 6", small: false, rowIdx: 1, colIdx: 6 },
        { col: "15 / 17", row: "4 / 6", small: false, rowIdx: 1, colIdx: 7 },
        { col: "17 / 19", row: "4 / 6", small: false, rowIdx: 1, colIdx: 8 },
        { col: "19 / 21", row: "4 / 6", small: false, rowIdx: 1, colIdx: 9 },
        { col: "21 / 23", row: "4 / 6", small: false, rowIdx: 1, colIdx: 10 },
        { col: "23 / 25", row: "4 / 6", small: false, rowIdx: 1, colIdx: 11 },
        { col: "25 / 27", row: "4 / 6", small: false, rowIdx: 1, colIdx: 12 },
        { col: "27 / 30", row: "4 / 6", small: true, keyName: "BACKSPACE" },
        { col: "31 / 33", row: "4 / 6", small: true, keyName: "Insert" },
        { col: "33 / 35", row: "4 / 6", small: true, keyName: "Home" },
        { col: "35 / 37", row: "4 / 6", small: true, keyName: "Page Up" },
        { col: "38 / 40", row: "4 / 6", small: true, keyName: "Num Lock" },
        { col: "40 / 42", row: "4 / 6", small: false, keyName: "KP_SLASH" },
        { col: "42 / 44", row: "4 / 6", small: false, keyName: "KP_STAR" },
        { col: "44 / 46", row: "4 / 6", small: false, keyName: "KP_MINUS" },
        
        // Zeile 3: Tab + Buchstabenreihe 1
        { col: "1 / 4", row: "6 / 8", small: false, keyName: "TAB" },
        { col: "4 / 6", row: "6 / 8", small: false, rowIdx: 2, colIdx: 1 },
        { col: "6 / 8", row: "6 / 8", small: false, rowIdx: 2, colIdx: 2 },
        { col: "8 / 10", row: "6 / 8", small: false, rowIdx: 2, colIdx: 3 },
        { col: "10 / 12", row: "6 / 8", small: false, rowIdx: 2, colIdx: 4 },
        { col: "12 / 14", row: "6 / 8", small: false, rowIdx: 2, colIdx: 5 },
        { col: "14 / 16", row: "6 / 8", small: false, rowIdx: 2, colIdx: 6 },
        { col: "16 / 18", row: "6 / 8", small: false, rowIdx: 2, colIdx: 7 },
        { col: "18 / 20", row: "6 / 8", small: false, rowIdx: 2, colIdx: 8 },
        { col: "20 / 22", row: "6 / 8", small: false, rowIdx: 2, colIdx: 9 },
        { col: "22 / 24", row: "6 / 8", small: false, rowIdx: 2, colIdx: 10 },
        { col: "24 / 26", row: "6 / 8", small: false, rowIdx: 2, colIdx: 11 },
        { col: "26 / 28", row: "6 / 8", small: false, rowIdx: 2, colIdx: 12 },
        { col: "28 / 30", row: "6 / 8", small: false, rowIdx: 2, colIdx: 13 },
        { col: "31 / 33", row: "6 / 8", small: true, keyName: "delete" },
        { col: "33 / 35", row: "6 / 8", small: true, keyName: "end" },
        { col: "35 / 37", row: "6 / 8", small: true, keyName: "page down" },
        { col: "38 / 40", row: "6 / 8", small: false, keyName: "KP_7" },
        { col: "40 / 42", row: "6 / 8", small: false, keyName: "KP_8" },
        { col: "42 / 44", row: "6 / 8", small: false, keyName: "KP_9" },
        { col: "44 / 46", row: "6 / 10", small: false, keyName: "KP_PLUS" },
        
        // Zeile 4: Caps + Buchstabenreihe 2
        { col: "1 / 5", row: "8 / 10", small: false, keyName: "CAPS" },
        { col: "5 / 7", row: "8 / 10", small: false, rowIdx: 3, colIdx: 1 },
        { col: "7 / 9", row: "8 / 10", small: false, rowIdx: 3, colIdx: 2 },
        { col: "9 / 11", row: "8 / 10", small: false, rowIdx: 3, colIdx: 3 },
        { col: "11 / 13", row: "8 / 10", small: false, rowIdx: 3, colIdx: 4 },
        { col: "13 / 15", row: "8 / 10", small: false, rowIdx: 3, colIdx: 5 },
        { col: "15 / 17", row: "8 / 10", small: false, rowIdx: 3, colIdx: 6 },
        { col: "17 / 19", row: "8 / 10", small: false, rowIdx: 3, colIdx: 7 },
        { col: "19 / 21", row: "8 / 10", small: false, rowIdx: 3, colIdx: 8 },
        { col: "21 / 23", row: "8 / 10", small: false, rowIdx: 3, colIdx: 9 },
        { col: "23 / 25", row: "8 / 10", small: false, rowIdx: 3, colIdx: 10 },
        { col: "25 / 27", row: "8 / 10", small: false, rowIdx: 3, colIdx: 11 },
        { col: "27 / 30", row: "8 / 10", small: false, keyName: "ENTER" },
        { col: "38 / 40", row: "8 / 10", small: false, keyName: "KP_4" },
        { col: "40 / 42", row: "8 / 10", small: false, keyName: "KP_5" },
        { col: "42 / 44", row: "8 / 10", small: false, keyName: "KP_6" },
        
        // Zeile 5: Shift + Buchstabenreihe 3
        { col: "1 / 6", row: "10 / 12", small: false, keyName: "LSHIFT" },
        { col: "6 / 8", row: "10 / 12", small: false, rowIdx: 4, colIdx: 1 },
        { col: "8 / 10", row: "10 / 12", small: false, rowIdx: 4, colIdx: 2 },
        { col: "10 / 12", row: "10 / 12", small: false, rowIdx: 4, colIdx: 3 },
        { col: "12 / 14", row: "10 / 12", small: false, rowIdx: 4, colIdx: 4 },
        { col: "14 / 16", row: "10 / 12", small: false, rowIdx: 4, colIdx: 5 },
        { col: "16 / 18", row: "10 / 12", small: false, rowIdx: 4, colIdx: 6 },
        { col: "18 / 20", row: "10 / 12", small: false, rowIdx: 4, colIdx: 7 },
        { col: "20 / 22", row: "10 / 12", small: false, rowIdx: 4, colIdx: 8 },
        { col: "22 / 24", row: "10 / 12", small: false, rowIdx: 4, colIdx: 9 },
        { col: "24 / 26", row: "10 / 12", small: false, rowIdx: 4, colIdx: 10 },
        { col: "26 / 30", row: "10 / 12", small: false, keyName: "RSHIFT" },
        { col: "33 / 35", row: "10 / 12", small: false, keyName: "UP" },
        { col: "38 / 40", row: "10 / 12", small: false, keyName: "KP_1" },
        { col: "40 / 42", row: "10 / 12", small: false, keyName: "KP_2" },
        { col: "42 / 44", row: "10 / 12", small: false, keyName: "KP_3" },
        { col: "44 / 46", row: "10 / 14", small: true, keyName: "KP_ENTER" },
        
        // Zeile 6: Strg, Win, Alt, Space, etc.
        { col: "1 / 4", row: "12 / 14", small: false, keyName: "LCTRL" },
        { col: "4 / 6", row: "12 / 14", small: false, keyName: "win" },
        { col: "6 / 9", row: "12 / 14", small: false, keyName: "LALT" },
        { col: "9 / 19", row: "12 / 14", small: false, keyName: "SPACE" },
        { col: "19 / 22", row: "12 / 14", small: false, keyName: "RALT" },
        { col: "22 / 24", row: "12 / 14", small: false, keyName: "win" },
        { col: "24 / 27", row: "12 / 14", small: false, keyName: "menu" },
        { col: "27 / 30", row: "12 / 14", small: false, keyName: "RCTRL" },
        { col: "31 / 33", row: "12 / 14", small: false, keyName: "LEFT" },
        { col: "33 / 35", row: "12 / 14", small: false, keyName: "DOWN" },
        { col: "35 / 37", row: "12 / 14", small: false, keyName: "RIGHT" },
        { col: "38 / 42", row: "12 / 14", small: false, keyName: "KP_0" },
        { col: "42 / 44", row: "12 / 14", small: false, keyName: "KP_DEL" }
    ];
    
    // Definiere welche Sonderzeichen wie dargestellt werden
    const specialDisplayNames = {
        "SPACE": "␣",
        "LSHIFT": "Shift",
        "RSHIFT": "Shift",
        "LCTRL": "Ctrl",
        "RCTRL": "Ctrl",
        "LALT": "Alt",
        "RALT": "AltGr",
        "ENTER": "Enter",
        "BACKSPACE": "⌫",
        "TAB": "Tab",
        "CAPS": "Caps",
        "ESC": "Esc",
        "UP": "▲",
        "DOWN": "▼",
        "LEFT": "◀",
        "RIGHT": "▶",
        "win": "Win",
        "menu": "Menu",
        "Print Screen": "PrtSc",
        "Scroll Lock": "Scrlk",
        "Pause Break": "Pause",
        "Insert": "Ins",
        "Home": "Home",
        "Page Up": "PgUp",
        "page down": "PgDn",
        "delete": "Del",
        "end": "End",
        "home": "Home",
        "Num Lock": "Num",
        "KP_SLASH": "/",
        "KP_STAR": "*",
        "KP_MINUS": "-",
        "KP_PLUS": "+",
        "KP_ENTER": "Enter",
        "KP_DEL": ".",
        "KP_0": "0",
        "KP_1": "1",
        "KP_2": "2",
        "KP_3": "3",
        "KP_4": "4",
        "KP_5": "5",
        "KP_6": "6",
        "KP_7": "7",
        "KP_8": "8",
        "KP_9": "9"
    };
    
    // Für jede Position hole die Taste aus dem aktuellen Layout
    keyPositions.forEach(pos => {
        const btn = document.createElement("button");
        
        let keyName = "";
        let displayText = "";
        
        // Wenn direkter keyName angegeben ist (für F-Tasten, NumPad, etc.)
        if (pos.keyName) {
            keyName = pos.keyName;
            // F-Tasten in Großbuchstaben
            if (keyName.match(/^F\d+$/)) {
                displayText = keyName.toUpperCase();
            }
            // Print Screen, Scroll Lock, Pause Break, Num Lock - bleiben wie sie sind
            else if (keyName === "Print Screen" || keyName === "Scroll Lock" || keyName === "Pause Break" || keyName === "Num Lock") {
                displayText = specialDisplayNames[keyName] || keyName;
            }
            else {
                displayText = specialDisplayNames[keyName] || keyName;
            }
        }
        // Ansonsten aus dem Layout-Array holen (für Buchstaben)
        else if (pos.rowIdx !== undefined && pos.colIdx !== undefined && mainKeysRows && mainKeysRows[pos.rowIdx]) {
            if (mainKeysRows[pos.rowIdx][pos.colIdx]) {
                keyName = mainKeysRows[pos.rowIdx][pos.colIdx];
                // Buchstaben in Großbuchstaben
                if (keyName.length === 1 && keyName.match(/[A-Za-zА-Яа-яЁё]/)) {
                    displayText = keyName.toUpperCase();
                } else {
                    displayText = specialDisplayNames[keyName] || keyName;
                }
            } else {
                keyName = "?";
                displayText = "?";
            }
        } else {
            keyName = "?";
            displayText = "?";
        }
        
        // Prüfe ob die Taste gesperrt ist
        const isLocked = lockedKeys.includes(keyName) || 
                         lockedKeys.includes(keyName.toLowerCase()) ||
                         keyName === "Print Screen" || 
                         keyName === "Scroll Lock" || 
                         keyName === "Pause Break" || 
                         keyName === "Num Lock";
        
        // Bestimme die Bind-Klasse
        let bindClass = "";
        if (!isLocked && keyName !== "?") {
            const bindingInfo = getBindingInfo(keyName);
            if (bindingInfo.type === "buy") bindClass = "app__key--bound-buy";
            if (bindingInfo.type === "script") bindClass = "app__key--bound-script";
            if (bindingInfo.type === "say") bindClass = "app__key--bound-say";
        }
        
        btn.className = `app__key ${bindClass} ${isLocked ? 'app__key--locked' : ''} ${pos.small ? 'app__key--small' : ''}`.trim();
        
        if (selectedBindKey === keyName && !isLocked && keyName !== "?") {
            btn.classList.add("app__key--active");
        }
        
        btn.textContent = displayText;
        btn.style.gridColumn = pos.col;
        btn.style.gridRow = pos.row;
        
        if (!isLocked && keyName !== "?") {
            btn.onclick = () => {
                selectedBindKey = keyName;
                renderBindsKeyboardGrid();
                renderBindsMouseGrid();
                updateBindsInputFields();
            };
        } else {
            btn.onclick = () => {
                alert(`⚠️ Die Taste "${displayText}" kann nicht gebindet werden, da sie systemrelevant ist.`);
            };
        }
        
        container.appendChild(btn);
    });
}

function renderBindsMouseGrid() {
  const container = document.getElementById("bindsMouseGrid");
  if (!container) return;
  container.innerHTML = "";

  // Maus-Grid: 7 Spalten
  const gridCols = [1, 6, 11, 17, 22, 27, 32];

  mouseKeys.forEach((key, idx) => {
    const btn = document.createElement("button");
    btn.className = "mouse-key";

    const bindingInfo = getBindingInfo(key.cmd);
    if (bindingInfo.type === "buy") btn.classList.add("mouse-key--bound-buy");
    if (bindingInfo.type === "script")
      btn.classList.add("mouse-key--bound-script");
    if (bindingInfo.type === "say") btn.classList.add("mouse-key--bound-say");

    if (selectedBindKey === key.cmd) {
      btn.classList.add("mouse-key--active");
    }

    btn.textContent = key.display;
    btn.style.gridColumn = `${gridCols[idx]} / ${gridCols[idx] + 4}`;
    btn.style.gridRow = "1 / 3";

    btn.onclick = () => {
      selectedBindKey = key.cmd;
      renderBindsKeyboardGrid();
      renderBindsMouseGrid();
      updateBindsInputFields();
    };

    container.appendChild(btn);
  });
}

function attachMouseToggleListener() {
  const toggleBtn = document.getElementById("toggleMouseArea");
  const mouseWrapper = document.getElementById("mouseWrapper");

  if (toggleBtn && mouseWrapper) {
    toggleBtn.addEventListener("click", () => {
      if (mouseWrapper.style.display === "none") {
        mouseWrapper.style.display = "block";
        toggleBtn.innerHTML = "🖱️ Maus-Binds ausblenden";
      } else {
        mouseWrapper.style.display = "none";
        toggleBtn.innerHTML = "🖱️ Maus-Binds einblenden";
      }
    });
  }
}

function updateBindsInputFields() {
  if (!selectedBindKey) return;

  // Buy Input
  const buyInput = document.getElementById("bindsBuyCommandInput");
  if (buyInput && window.buyBindings) {
    buyInput.value = window.buyBindings[selectedBindKey] || "";
  }

  // Say Input
  const sayInput = document.getElementById("bindsSayCommandInput");
  if (sayInput && window.sayBindings) {
    let val = window.sayBindings[selectedBindKey] || "";
    sayInput.value = val.replace(/^(say_team|say) /, "");
    if (val.startsWith("say_team")) {
      const teamRadio = document.querySelector(
        'input[name="bindsSayType"][value="say_team"]',
      );
      if (teamRadio) teamRadio.checked = true;
    } else if (val.startsWith("say")) {
      const allRadio = document.querySelector(
        'input[name="bindsSayType"][value="say"]',
      );
      if (allRadio) allRadio.checked = true;
    }
  }

  // Script Input
  const scriptNameInput = document.getElementById("bindsScriptNameInput");
  const scriptArea = document.getElementById("bindsScriptCommandsArea");
  if (scriptNameInput && scriptArea && window.scriptBindings) {
    let val = window.scriptBindings[selectedBindKey] || "";
    let cleanVal = val.replace(/^\/\/ .*\n/, "").replace(/bind ".*"\n?/g, "");
    scriptArea.value = cleanVal.trim();
    let nameMatch = val.match(/\/\/ (.*?)\n/);
    scriptNameInput.value = nameMatch ? nameMatch[1] : "";
  }
}

function renderBindsBuyCategories() {
  let catDiv = document.getElementById("bindsCategoryList");
  if (!catDiv) return;
  catDiv.innerHTML = "";

  if (typeof categories === "undefined") return;

  Object.keys(categories).forEach((c) => {
    let p = document.createElement("div");
    p.className = "cat-pill";
    if (typeof currentBuyCategory !== "undefined" && currentBuyCategory === c)
      p.classList.add("active-cat");
    p.textContent = c;
    p.onclick = () => {
      if (typeof window.setBuyCategory === "function") {
        window.setBuyCategory(c);
      } else {
        window.currentBuyCategory = c;
      }
      renderBindsBuyItems();
      document
        .querySelectorAll("#bindsCategoryList .cat-pill")
        .forEach((pill) => pill.classList.remove("active-cat"));
      p.classList.add("active-cat");
    };
    catDiv.appendChild(p);
  });
  renderBindsBuyItems();
}

function renderBindsBuyItems() {
  let grid = document.getElementById("bindsItemsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  if (typeof categories === "undefined") return;
  let currentCat =
    typeof window.currentBuyCategory !== "undefined"
      ? window.currentBuyCategory
      : "Pistole";
  if (!categories[currentCat]) currentCat = "Pistole";

  categories[currentCat].forEach((it) => {
    let div = document.createElement("div");
    div.className = "weapon-item";
    div.innerHTML = `<span>${it.name}</span><span class="add-icon">+</span>`;
    div.onclick = () => {
      if (!selectedBindKey) {
        alert("Bitte wähle zuerst eine Taste aus!");
        return;
      }
      let cur = document.getElementById("bindsBuyCommandInput").value;
      let cnt = (
        cur.match(
          new RegExp(it.cmd.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
        ) || []
      ).length;
      if (cnt >= it.maxCount) {
        alert(`Maximal ${it.maxCount} mal erlaubt`);
        return;
      }
      let n = cur ? cur + "; " + it.cmd : it.cmd;
      document.getElementById("bindsBuyCommandInput").value = n;
    };
    grid.appendChild(div);
  });
}

function bindsSaveBuy() {
  if (!selectedBindKey) {
    alert("Bitte wähle zuerst eine Taste aus!");
    return;
  }
  let val = document.getElementById("bindsBuyCommandInput").value.trim();
  if (!val) {
    alert("Bitte gib einen Buy-Befehl ein!");
    return;
  }

  const existingType = window.getExistingBindingType
    ? window.getExistingBindingType(selectedBindKey)
    : "none";

  if (existingType !== "none" && existingType !== "buy") {
    let typeName = existingType === "script" ? "ein Skript" : "einen Say-Bind";
    if (
      !confirm(
        `Taste "${selectedBindKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`,
      )
    ) {
      return;
    }
    if (window.removeSpecificBinding)
      window.removeSpecificBinding(selectedBindKey, existingType);
  }

  if (window.buyBindings) {
    window.buyBindings[selectedBindKey] = val;
    if (window.saveBuy) window.saveBuy();
  }
  alert(`✅ Buy-Bindung für Taste "${selectedBindKey}" gespeichert!`);
  renderBindsKeyboardGrid();
  renderBindsMouseGrid();
  renderBindsSavedList();
  if (window.refreshFullExport) window.refreshFullExport();
}

function bindsSaveSay() {
  if (!selectedBindKey) {
    alert("Bitte wähle zuerst eine Taste aus!");
    return;
  }
  let msgText = document.getElementById("bindsSayCommandInput").value.trim();
  if (!msgText) {
    alert("Bitte gib eine Nachricht ein!");
    return;
  }

  const existingType = window.getExistingBindingType
    ? window.getExistingBindingType(selectedBindKey)
    : "none";

  if (existingType !== "none" && existingType !== "say") {
    let typeName = existingType === "script" ? "ein Skript" : "einen Buy-Bind";
    if (
      !confirm(
        `Taste "${selectedBindKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`,
      )
    ) {
      return;
    }
    if (window.removeSpecificBinding)
      window.removeSpecificBinding(selectedBindKey, existingType);
  }

  const sayType = document.querySelector(
    'input[name="bindsSayType"]:checked',
  ).value;
  const fullCommand = `${sayType} ${msgText}`;

  if (window.sayBindings) {
    window.sayBindings[selectedBindKey] = fullCommand;
    if (window.saveSayBindings) window.saveSayBindings();
  }
  alert(`✅ Say-Bindung für Taste "${selectedBindKey}" gespeichert!`);
  renderBindsKeyboardGrid();
  renderBindsMouseGrid();
  renderBindsSavedList();
  if (window.refreshFullExport) window.refreshFullExport();
}

function bindsSaveScript() {
  if (!selectedBindKey) {
    alert("Bitte wähle zuerst eine Taste aus!");
    return;
  }
  let userAliases = document
    .getElementById("bindsScriptCommandsArea")
    .value.trim();
  if (!userAliases) {
    alert("Bitte gib Skript-Inhalt ein!");
    return;
  }

  const existingType = window.getExistingBindingType
    ? window.getExistingBindingType(selectedBindKey)
    : "none";

  if (existingType !== "none" && existingType !== "script") {
    let typeName = existingType === "buy" ? "einen Buy-Bind" : "einen Say-Bind";
    if (
      !confirm(
        `Taste "${selectedBindKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`,
      )
    ) {
      return;
    }
    if (window.removeSpecificBinding)
      window.removeSpecificBinding(selectedBindKey, existingType);
  }

  let scriptName =
    document.getElementById("bindsScriptNameInput").value.trim() || "Skript";
  let cleanAliases = userAliases.replace(/bind\s+"[^"]*"\s+[^\n]*\n?/g, "");
  cleanAliases = cleanAliases.trim();

  let aliasName = "";
  const aliasMatch = cleanAliases.match(/alias\s+(\+\w+|\w+)/);
  if (aliasMatch) aliasName = aliasMatch[1];

  let finalContent = `// ${scriptName}\n${cleanAliases}`;
  if (aliasName) {
    finalContent += `\nbind "${selectedBindKey}" "${aliasName}"`;
  } else {
    const firstLine = cleanAliases.split("\n")[0];
    if (firstLine && firstLine.includes("alias")) {
      const fallbackMatch = firstLine.match(/alias\s+(\+\w+|\w+)/);
      if (fallbackMatch)
        finalContent += `\nbind "${selectedBindKey}" "${fallbackMatch[1]}"`;
    }
  }

  if (window.scriptBindings) {
    window.scriptBindings[selectedBindKey] = finalContent;
    if (window.saveScriptBindings) window.saveScriptBindings();
  }
  alert(`✅ Skript für Taste "${selectedBindKey}" gespeichert!`);
  renderBindsKeyboardGrid();
  renderBindsMouseGrid();
  renderBindsSavedList();
  if (window.refreshFullExport) window.refreshFullExport();
}

// Ersetze die bindsUnbindCurrent Funktion:
function bindsUnbindCurrent() {
  if (!selectedBindKey) {
    alert("Bitte wähle zuerst eine Taste aus!");
    return;
  }

  let removed = false;
  if (
    currentBindType === "buy" &&
    window.buyBindings &&
    window.buyBindings[selectedBindKey]
  ) {
    delete window.buyBindings[selectedBindKey];
    if (window.saveBuy) window.saveBuy();
    removed = true;
  } else if (
    currentBindType === "say" &&
    window.sayBindings &&
    window.sayBindings[selectedBindKey]
  ) {
    delete window.sayBindings[selectedBindKey];
    if (window.saveSayBindings) window.saveSayBindings();
    removed = true;
  } else if (
    currentBindType === "script" &&
    window.scriptBindings &&
    window.scriptBindings[selectedBindKey]
  ) {
    delete window.scriptBindings[selectedBindKey];
    if (window.saveScriptBindings) window.saveScriptBindings();
    removed = true;
  }

  if (removed) {
    alert(`Binding für ${selectedBindKey} (${currentBindType}) entfernt`);
    updateBindsInputFields();
    renderBindsKeyboardGrid();
    renderBindsMouseGrid();
    renderBindsSavedList();
    if (window.refreshFullExport) window.refreshFullExport();
  } else {
    alert(`Keine ${currentBindType}-Bindung für diese Taste`);
  }
}

function bindsResetAll() {
  if (
    confirm(
      "⚠️ ALLE Bindings (Buy, Say, Skripte) löschen? Diese Aktion kann nicht rückgängig gemacht werden!",
    )
  ) {
    if (window.buyBindings) {
      for (let key in window.buyBindings) delete window.buyBindings[key];
      if (window.saveBuy) window.saveBuy();
    }
    if (window.sayBindings) {
      for (let key in window.sayBindings) delete window.sayBindings[key];
      if (window.saveSayBindings) window.saveSayBindings();
    }
    if (window.scriptBindings) {
      for (let key in window.scriptBindings) delete window.scriptBindings[key];
      if (window.saveScriptBindings) window.saveScriptBindings();
    }
    updateBindsInputFields();
    renderBindsKeyboardGrid();
    renderBindsMouseGrid();
    renderBindsSavedList();
    if (window.refreshFullExport) window.refreshFullExport();
    alert("✅ Alle Bindings gelöscht.");
  }
}

function renderBindsSavedList() {
  let cont = document.getElementById("bindsSavedList");
  if (!cont) return;
  cont.innerHTML = "";

  let allBinds = [];

  // Sammle alle Buy-Bindings
  if (window.buyBindings) {
    for (let [k, cmd] of Object.entries(window.buyBindings)) {
      allBinds.push({
        key: k,
        type: "buy",
        display: `bind "${k}" → "${cmd}"`,
        cmd: cmd,
      });
    }
  }

  // Sammle alle Say-Bindings
  if (window.sayBindings) {
    for (let [k, cmd] of Object.entries(window.sayBindings)) {
      allBinds.push({
        key: k,
        type: "say",
        display: `bind "${k}" → "${cmd}"`,
        cmd: cmd,
      });
    }
  }

  // Sammle alle Script-Bindings
  if (window.scriptBindings) {
    for (let [k, val] of Object.entries(window.scriptBindings)) {
      let firstLine = val.split("\n")[0].replace("//", "").trim();
      allBinds.push({
        key: k,
        type: "script",
        display: `bind "${k}" → 🎮 ${firstLine.substring(0, 50)}`,
        cmd: val,
      });
    }
  }

  // Wenn keine Bindings vorhanden
  if (allBinds.length === 0) {
    cont.innerHTML =
      '<div class="empty-message">✨ Keine Bindings vorhanden. Klicke auf eine Taste, um ein Binding zu erstellen!</div>';
    return;
  }

  // Sortiere nach Taste (alphabetisch)
  allBinds.sort((a, b) => a.key.localeCompare(b.key));

  // Zeige alle Bindings an
  allBinds.forEach((bind) => {
    let e = document.createElement("div");
    e.className = "bind-entry";

    let typeIcon =
      bind.type === "buy" ? "🛒" : bind.type === "say" ? "💬" : "🎮";
    let typeColor =
      bind.type === "buy"
        ? "#ff3333"
        : bind.type === "say"
          ? "#44cc44"
          : "#2288dd";

    e.innerHTML = `
            <span class="bind-key" style="color: ${typeColor};">${typeIcon} bind "${bind.key}"</span> 
            → <span class="bind-command">"${bind.cmd.substring(0, 80)}${bind.cmd.length > 80 ? "..." : ""}"</span>
            <span style="float: right; cursor: pointer; color: #ff6666; margin-left: 0.5rem;" onclick="window.removeBindingFromList('${bind.key}', '${bind.type}')">[x]</span>
        `;

    e.onclick = (event) => {
      if (event.target.tagName === "SPAN" && event.target.textContent === "[x]")
        return;

      selectedBindKey = bind.key;
      currentBindType = bind.type;

      document
        .querySelectorAll("#bindTypeSelector .main-cat-btn")
        .forEach((btn) => {
          btn.classList.remove("active-main");
          if (btn.dataset.bindType === bind.type)
            btn.classList.add("active-main");
        });

      document
        .querySelectorAll(".bind-type-area")
        .forEach((area) => area.classList.remove("active"));
      document
        .getElementById(
          `binds${bind.type === "buy" ? "Buy" : bind.type === "say" ? "Say" : "Script"}Area`,
        )
        .classList.add("active");

      renderBindsKeyboardGrid();
      renderBindsMouseGrid();
      updateBindsInputFields();
    };

    cont.appendChild(e);
  });
}

// Globale Funktoin zum Entfernen eines Bindings aus der Liste
window.removeBindingFromList = function (key, type) {
  if (confirm(`Binding für Taste "${key}" (${type}) wirklich entfernen?`)) {
    removeSpecificBinding(key, type);
    renderBindsKeyboardGrid();
    renderBindsMouseGrid();
    renderBindsSavedList();
    updateBindsInputFields();
    if (window.refreshFullExport) window.refreshFullExport();
  }
};

function renderBindsTemplates() {
  let cont = document.getElementById("bindsTemplateScripts");
  if (!cont) return;
  cont.innerHTML = "";

  if (typeof scriptTemplatesList === "undefined") return;

  scriptTemplatesList.forEach((t) => {
    let card = document.createElement("div");
    card.className = "script-template-card";

    // Icon basierend auf Skript-Typ
    let icon = "🎮";
    if (t.name.includes("NetGraph")) icon = "📊";
    if (t.name.includes("Nade")) icon = "💣";
    if (t.name.includes("Rainbow")) icon = "🌈";
    if (t.name.includes("Bomb")) icon = "💣";
    if (t.name.includes("Crosshair")) icon = "🎯";
    if (t.name.includes("Demo")) icon = "🎬";

    card.innerHTML = `
            <div class="script-template-name">
                <span>${icon}</span> ${t.name}
            </div>
            <div class="script-template-desc">
                📝 ${t.desc}
            </div>
            <div class="script-template-longdesc">
                ${t.longDesc ? t.longDesc.substring(0, 150) + (t.longDesc.length > 150 ? "..." : "") : t.desc}
            </div>
            <div class="script-badge">
                ⚡ Klicken zum Übernehmen
            </div>
        `;

    card.onclick = () => {
      if (!selectedBindKey) {
        alert("⚠️ Bitte zuerst eine Taste auswählen!");
        return;
      }
      applyBindsScriptTemplate(t.content, t.name);
    };

    cont.appendChild(card);
  });
}

function applyBindsScriptTemplate(scriptContent, scriptName) {
  if (!selectedBindKey) {
    alert("⚠️ Bitte zuerst eine Taste auswählen!");
    return;
  }

  const existingType = window.getExistingBindingType
    ? window.getExistingBindingType(selectedBindKey)
    : "none";
  if (existingType !== "none" && existingType !== "script") {
    let typeName = existingType === "buy" ? "einen Buy-Bind" : "einen Say-Bind";
    if (
      !confirm(
        `Taste "${selectedBindKey}" wird bereits für ${typeName} verwendet. Überschreiben?`,
      )
    )
      return;
    if (window.removeSpecificBinding)
      window.removeSpecificBinding(selectedBindKey, existingType);
  }

  let cleanContent = scriptContent.replace(/bind\s+"[^"]*"\s+[^\n]*\n?/g, "");
  cleanContent = cleanContent.trim();

  const lines = cleanContent.split("\n");
  const filteredLines = lines.filter((line) => {
    return (
      line.trim().startsWith("alias") ||
      line.trim().startsWith("+") ||
      line.trim().startsWith("-") ||
      line.trim().startsWith("hudToggle") ||
      (line.trim().length > 0 && !line.trim().startsWith("bind"))
    );
  });
  cleanContent = filteredLines.join("\n");

  let aliasName = "";
  const aliasMatch = cleanContent.match(/alias\s+(\+\w+|\w+)/);
  if (aliasMatch) aliasName = aliasMatch[1];

  let finalContent = `// ${scriptName}\n${cleanContent}`;
  if (aliasName) {
    finalContent += `\nbind "${selectedBindKey}" "${aliasName}"`;
  } else {
    const firstLine = cleanContent.split("\n")[0];
    if (firstLine && firstLine.includes("alias")) {
      const cmdMatch = firstLine.match(/alias\s+(\+\w+|\w+)/);
      if (cmdMatch)
        finalContent += `\nbind "${selectedBindKey}" "${cmdMatch[1]}"`;
    }
  }

  if (window.scriptBindings) {
    window.scriptBindings[selectedBindKey] = finalContent;
    if (window.saveScriptBindings) window.saveScriptBindings();
  }

  alert(
    `✅ Skript "${scriptName}" wurde auf Taste "${selectedBindKey}" gespeichert!`,
  );

  // Korrigierte Aufrufe
  renderBindsKeyboardGrid();
  renderBindsMouseGrid();
  renderBindsSavedList();

  document.getElementById("bindsScriptCommandsArea").value = cleanContent;
  document.getElementById("bindsScriptNameInput").value = scriptName;
}

function setBindType(type) {
  currentBindType = type;
  document
    .querySelectorAll("#bindTypeSelector .main-cat-btn")
    .forEach((btn) => {
      btn.classList.remove("active-main");
      if (btn.dataset.bindType === type) btn.classList.add("active-main");
    });
  document
    .querySelectorAll(".bind-type-area")
    .forEach((area) => area.classList.remove("active"));
  document
    .getElementById(
      `binds${type === "buy" ? "Buy" : type === "say" ? "Say" : "Script"}Area`,
    )
    .classList.add("active");
  updateBindsInputFields();
}

function attachBindsEventListeners() {
  document
    .querySelectorAll("#bindTypeSelector .main-cat-btn")
    .forEach((btn) => {
      btn.addEventListener("click", () => setBindType(btn.dataset.bindType));
    });

  const saveBuyBtn = document.getElementById("bindsSaveBuyBtn");
  if (saveBuyBtn) saveBuyBtn.addEventListener("click", bindsSaveBuy);

  const unbindBuyBtn = document.getElementById("bindsUnbindBuyBtn");
  if (unbindBuyBtn) unbindBuyBtn.addEventListener("click", bindsUnbindCurrent);

  const saveSayBtn = document.getElementById("bindsSaveSayBtn");
  if (saveSayBtn) saveSayBtn.addEventListener("click", bindsSaveSay);

  const unbindSayBtn = document.getElementById("bindsUnbindSayBtn");
  if (unbindSayBtn) unbindSayBtn.addEventListener("click", bindsUnbindCurrent);

  const saveScriptBtn = document.getElementById("bindsSaveScriptBtn");
  if (saveScriptBtn) saveScriptBtn.addEventListener("click", bindsSaveScript);

  const unbindScriptBtn = document.getElementById("bindsUnbindScriptBtn");
  if (unbindScriptBtn)
    unbindScriptBtn.addEventListener("click", bindsUnbindCurrent);

  const resetAllBtn = document.getElementById("bindsResetAllBtn");
  if (resetAllBtn) resetAllBtn.addEventListener("click", bindsResetAll);

  window.setBuyCategory = function (cat) {
    window.currentBuyCategory = cat;
  };
  window.currentBuyCategory = "Pistole";
}

window.initBindsTab = initBindsTab;
window.renderBindsKeyboard = renderBindsKeyboard;
window.renderBindsSavedList = renderBindsSavedList;
