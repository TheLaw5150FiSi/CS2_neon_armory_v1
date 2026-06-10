// ======================== BENDS TAB (MIT GRID-TASTATUR) ========================
let selectedBindKey = null;
let currentBindType = "buy";
let showMouseArea = false;
window.selectedBindKey = null;

// Mapping für russisches Layout: Angezeigter kyrillischer Buchstabe -> CS2-Befehl (englischer Buchstabe)
const ruToEnKeyMap = {
    'Й': 'q', 'Ц': 'w', 'У': 'e', 'К': 'r', 'Е': 't', 'Н': 'y', 'Г': 'u', 'Ш': 'i', 'Щ': 'o', 'З': 'p',
    'Х': '[', 'Ъ': ']', '\\': '\\',
    'Ф': 'a', 'Ы': 's', 'В': 'd', 'А': 'f', 'П': 'g', 'Р': 'h', 'О': 'j', 'Л': 'k', 'Д': 'l', 'Ж': ';', 'Э': "'",
    'Я': 'z', 'Ч': 'x', 'С': 'c', 'М': 'v', 'И': 'b', 'Т': 'n', 'Ь': 'm', 'Б': ',', 'Ю': '.', '/': '/',
    'Ё': '`', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '0': '0',
    '-': '-', '=': '=', '~': '~', '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7',
    '*': '8', '(': '9', ')': '0', '_': '-', '+': '=', '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'",
    '<': ',', '>': '.', '?': '/', ' ':' '
};

// Gesperrte Tasten (können nicht gebindet werden)
const lockedKeys = [
  "esc", "escape",
  "win", "lwin", "rwin",
  "alt gr", "ralt",
  "menu",
  "print screen", "prtsc",
  "scroll lock", "srclk",
  "pause break", "pause",
  "num lock", "numlock",
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
  // Initialisiere globale Variable für die ausgewählte Taste
  window.selectedBindKey = null;
  selectedBindKey = null;
  
  // Stelle sicher, dass mainKeysRows initialisiert ist
  if (typeof mainKeysRows === "undefined" || mainKeysRows.length === 0) {
    if (typeof deKeysRows !== "undefined") {
      mainKeysRows = JSON.parse(JSON.stringify(deKeysRows));
      currentLayout = "DE";
    }
  }

  // Lade die CS2 Standard-Bindings (damit die Datenbank verfügbar ist)
  if (typeof cs2DefaultBinds !== "undefined" && !window.cs2DefaultBindsLoaded) {
    // Datenbank ist bereits durch defaultbinds.js geladen
    window.cs2DefaultBindsLoaded = true;
    console.log(
      "✅ CS2 Standard-Bindings geladen:",
      Object.keys(cs2DefaultBinds).length,
      "Tasten",
    );
  }

  // Rendere alle Komponenten
  renderBindsKeyboardGrid();
  renderBindsMouseGrid();
  renderBindsBuyCategories();
  renderBindsSavedList();
  renderBindsTemplates();
  
  // Event-Listener und andere Initialisierungen
  attachBindsEventListeners();
  attachMouseToggleListener();
  initLayoutDropdown();
  
  // Setze initiale Status-Anzeige
  const statusDiv = document.getElementById("selectedKeyStatus");
  if (statusDiv) {
    statusDiv.innerHTML = "⚡ Keine Taste ausgewählt - Klicke auf eine Taste auf der Tastatur";
    statusDiv.style.background = "#ff4444";
    statusDiv.style.color = "white";
  }
  
  console.log("✅ Binds Tab initialisiert, window.selectedBindKey =", window.selectedBindKey);
}

// Hilfsfunktion: Konvertiert einen angezeigten Tastennamen (z.B. kyrillisch) in den CS2-Befehl
function getKeyCommandName(displayKey, layout) {
  if (layout === "RU") {
    // Bei russischem Layout: Kyrillischen Buchstaben in englischen Befehl umwandeln
    if (ruToEnKeyMap[displayKey]) {
      return ruToEnKeyMap[displayKey];
    }
    // Großbuchstaben-Version prüfen
    const upperKey = displayKey.toUpperCase();
    if (ruToEnKeyMap[upperKey]) {
      return ruToEnKeyMap[upperKey];
    }
  }
  // Bei DE/US oder wenn keine Umwandlung nötig: Kleinschreibung zurückgeben
  return displayKey.toLowerCase();
}

// Hilfsfunktion: Holt den tatsächlichen Befehl für eine Taste (für Bindings)
function getKeyCommandForBinding(displayKey, layout, actualKeyFromRow = null) {
  if (layout === "RU" && actualKeyFromRow) {
    // Bei russischem Layout verwende den tatsächlichen Wert aus dem Layout-Array
    // (das sind bereits die englischen Entsprechungen, weil ruKeysRows englische Zeichen hat)
    return actualKeyFromRow.toLowerCase();
  }
  return getKeyCommandName(displayKey, layout);
}

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

  // Mapping: Englischer Buchstabe -> Kyrillische Anzeige für russisches Layout
  const enToRuDisplayMap = {
    'q': 'Й', 'w': 'Ц', 'e': 'У', 'r': 'К', 't': 'Е', 'y': 'Н', 'u': 'Г', 'i': 'Ш', 'o': 'Щ', 'p': 'З',
    '[': 'Х', ']': 'Ъ', '\\': '\\',
    'a': 'Ф', 's': 'Ы', 'd': 'В', 'f': 'А', 'g': 'П', 'h': 'Р', 'j': 'О', 'k': 'Л', 'l': 'Д', ';': 'Ж', "'": 'Э',
    'z': 'Я', 'x': 'Ч', 'c': 'С', 'v': 'М', 'b': 'И', 'n': 'Т', 'm': 'Ь', ',': 'Б', '.': 'Ю', '/': '/',
    '`': 'Ё', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '0': '0',
    '-': '-', '=': '=', '~': '~'
  };

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
    SPACE: "␣",
    LSHIFT: "Shift",
    RSHIFT: "Shift",
    LCTRL: "Ctrl",
    RCTRL: "Ctrl",
    LALT: "Alt",
    RALT: "AltGr",
    ENTER: "Enter",
    BACKSPACE: "⌫",
    TAB: "Tab",
    CAPS: "Caps",
    ESC: "Esc",
    UP: "▲",
    DOWN: "▼",
    LEFT: "◀",
    RIGHT: "▶",
    win: "Win",
    menu: "Menu",
    "Print Screen": "PrtSc",
    "Scroll Lock": "Scrlk",
    "Pause Break": "Pause",
    Insert: "Ins",
    Home: "Home",
    "Page Up": "PgUp",
    "page down": "PgDn",
    delete: "Del",
    end: "End",
    "Num Lock": "Num",
    KP_SLASH: "/",
    KP_STAR: "*",
    KP_MINUS: "-",
    KP_PLUS: "+",
    KP_ENTER: "Enter",
    KP_DEL: ".",
    KP_0: "0",
    KP_1: "1",
    KP_2: "2",
    KP_3: "3",
    KP_4: "4",
    KP_5: "5",
    KP_6: "6",
    KP_7: "7",
    KP_8: "8",
    KP_9: "9",
  };

  // Für jede Position hole die Taste aus dem aktuellen Layout
  keyPositions.forEach((pos) => {
    const btn = document.createElement("button");

    let rawKeyValue = "";      // Der Wert aus dem Layout (für CS2-Bindings, z.B. "o")
    let displayText = "";      // Was auf der Taste steht (z.B. "Щ" bei russischem Layout)
    let isSpecialKey = false;  // Ob es eine Sondertaste ist (Shift, Ctrl, etc.)

    // Wenn direkter keyName angegeben ist (für F-Tasten, NumPad, etc.)
    if (pos.keyName) {
      rawKeyValue = pos.keyName;
      isSpecialKey = true;
      
      if (rawKeyValue.match(/^F\d+$/)) {
        displayText = rawKeyValue.toUpperCase();
      } else if (
        rawKeyValue === "Print Screen" ||
        rawKeyValue === "Scroll Lock" ||
        rawKeyValue === "Pause Break" ||
        rawKeyValue === "Num Lock"
      ) {
        displayText = specialDisplayNames[rawKeyValue] || rawKeyValue;
      } else {
        displayText = specialDisplayNames[rawKeyValue] || rawKeyValue;
      }
    }
    // Ansonsten aus dem Layout-Array holen (für Buchstaben)
    else if (
      pos.rowIdx !== undefined &&
      pos.colIdx !== undefined &&
      mainKeysRows &&
      mainKeysRows[pos.rowIdx]
    ) {
      if (mainKeysRows[pos.rowIdx][pos.colIdx]) {
        rawKeyValue = mainKeysRows[pos.rowIdx][pos.colIdx];
        
        // Bestimme die Anzeige basierend auf dem Layout
        if (currentLayout === "RU") {
          // Bei russischem Layout: rawKeyValue ist der englische Buchstabe (z.B. "o")
          // Wir müssen den kyrillischen Buchstaben für die Anzeige finden
          const lowerKey = rawKeyValue.toLowerCase();
          if (enToRuDisplayMap[lowerKey]) {
            displayText = enToRuDisplayMap[lowerKey];
          } else {
            displayText = rawKeyValue;
          }
        } else {
          // Bei DE/US: Zeige den Wert aus dem Layout an
          if (rawKeyValue.length === 1 && rawKeyValue.match(/[A-Za-z]/)) {
            displayText = rawKeyValue.toUpperCase();
          } else {
            displayText = specialDisplayNames[rawKeyValue] || rawKeyValue;
          }
        }
      } else {
        rawKeyValue = "?";
        displayText = "?";
      }
    } else {
      rawKeyValue = "?";
      displayText = "?";
    }

    // Für Bindings: Bei russischem Layout den englischen Buchstaben verwenden, sonst den rawKeyValue
    let bindingKey = rawKeyValue;
    if (currentLayout === "RU" && !isSpecialKey && rawKeyValue !== "?" && rawKeyValue.length === 1) {
      // Bei russischem Layout: rawKeyValue ist bereits der englische Buchstabe (z.B. "o")
      // Also direkt verwenden
      bindingKey = rawKeyValue.toLowerCase();
    } else if (!isSpecialKey && rawKeyValue !== "?") {
      bindingKey = rawKeyValue.toLowerCase();
    }
    
    // Prüfe ob die Taste gesperrt ist
    const isLocked = lockedKeys.includes(bindingKey.toLowerCase()) ||
      lockedKeys.includes(displayText.toLowerCase()) ||
      bindingKey === "Print Screen" ||
      bindingKey === "Scroll Lock" ||
      bindingKey === "Pause Break" ||
      bindingKey === "Num Lock";

    // Bestimme die Bind-Klasse
    let bindClass = "";
    if (!isLocked && bindingKey !== "?") {
      const bindingInfo = getBindingInfo(bindingKey);
      if (bindingInfo.type === "buy") bindClass = "app__key--bound-buy";
      if (bindingInfo.type === "script") bindClass = "app__key--bound-script";
      if (bindingInfo.type === "say") bindClass = "app__key--bound-say";
      if (bindingInfo.type === "default") bindClass = "app__key--bound-default";
    }

    btn.className = `app__key ${bindClass} ${isLocked ? "app__key--locked" : ""} ${pos.small ? "app__key--small" : ""}`.trim();

    if (selectedBindKey === bindingKey && !isLocked && bindingKey !== "?") {
      btn.classList.add("app__key--active");
    }

    btn.textContent = displayText;
    btn.style.gridColumn = pos.col;
    btn.style.gridRow = pos.row;

    if (!isLocked && bindingKey !== "?") {
      btn.onclick = () => {
        console.log("Taste geklickt:", bindingKey);
        selectedBindKey = bindingKey;
        window.selectedBindKey = bindingKey; // Global setzen
        
        // Tastatur neu rendern um aktive Taste zu markieren
        renderBindsKeyboardGrid();
        renderBindsMouseGrid();
        updateBindsInputFields();
        
        // Aktualisiere auch die Status-Anzeigen in den Tabs
        const statusDivBuy = document.getElementById("selectedKeyStatus");
        if (statusDivBuy) {
          statusDivBuy.innerHTML = `✅ Ausgewählte Taste: "${bindingKey}" - Wähle jetzt deine Items aus oder gib einen Befehl ein`;
          statusDivBuy.style.background = "var(--accent)";
          statusDivBuy.style.color = "#0a0a0f";
        }
        
        const statusDivSay = document.getElementById("selectedKeyStatusSay");
        if (statusDivSay) {
          statusDivSay.innerHTML = `✅ Ausgewählte Taste: "${bindingKey}" - Gib eine Nachricht ein`;
          statusDivSay.style.background = "var(--accent)";
          statusDivSay.style.color = "#0a0a0f";
        }
        
        const statusDivScript = document.getElementById("selectedKeyStatusScript");
        if (statusDivScript) {
          statusDivScript.innerHTML = `✅ Ausgewählte Taste: "${bindingKey}" - Erstelle oder wähle ein Skript`;
          statusDivScript.style.background = "var(--accent)";
          statusDivScript.style.color = "#0a0a0f";
        }
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

  const gridCols = [1, 6, 11, 17, 22, 27, 32];

  mouseKeys.forEach((key, idx) => {
    const btn = document.createElement("button");
    btn.className = "mouse-key";

    const bindingInfo = getBindingInfo(key.cmd);
    if (bindingInfo.type === "buy") btn.classList.add("mouse-key--bound-buy");
    if (bindingInfo.type === "script") btn.classList.add("mouse-key--bound-script");
    if (bindingInfo.type === "say") btn.classList.add("mouse-key--bound-say");
    if (bindingInfo.type === "default") btn.classList.add("mouse-key--bound-default");

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
  const statusDiv = document.getElementById("selectedKeyStatus");
  
  if (!selectedBindKey) {
    if (statusDiv) {
      statusDiv.innerHTML = "⚡ Keine Taste ausgewählt - Klicke auf eine Taste auf der Tastatur";
      statusDiv.style.background = "#ff4444";
      statusDiv.style.color = "white";
    }
    return;
  }
  
  if (statusDiv) {
    statusDiv.innerHTML = `✅ Ausgewählte Taste: "${selectedBindKey}" - Wähle jetzt deine Items aus oder gib einen Befehl ein`;
    statusDiv.style.background = "var(--accent)";
    statusDiv.style.color = "#0a0a0f";
  }

  // Buy Input
  const buyInput = document.getElementById("bindsBuyCommandInput");
  if (buyInput) {
    // Zuerst benutzerdefinierten Bind prüfen, dann Default
    if (window.buyBindings && window.buyBindings[selectedBindKey]) {
      buyInput.value = window.buyBindings[selectedBindKey];
    } else if (window.cs2DefaultBinds && window.cs2DefaultBinds[selectedBindKey]) {
      buyInput.value = window.cs2DefaultBinds[selectedBindKey];
    } else {
      buyInput.value = "";
    }
  }

  // Say Input
  const sayInput = document.getElementById("bindsSayCommandInput");
  if (sayInput && window.sayBindings) {
    let val = window.sayBindings[selectedBindKey] || "";
    if (!val && window.cs2DefaultBinds && window.cs2DefaultBinds[selectedBindKey] && 
        (window.cs2DefaultBinds[selectedBindKey].startsWith("say") || window.cs2DefaultBinds[selectedBindKey].startsWith("say_team"))) {
      val = window.cs2DefaultBinds[selectedBindKey];
    }
    sayInput.value = val.replace(/^(say_team|say) /, "");
    if (val.startsWith("say_team")) {
      const teamRadio = document.querySelector('input[name="bindsSayType"][value="say_team"]');
      if (teamRadio) teamRadio.checked = true;
    } else if (val.startsWith("say")) {
      const allRadio = document.querySelector('input[name="bindsSayType"][value="say"]');
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
    div.dataset.cmd = it.cmd;
    div.dataset.category = currentCat;
    
    // Side-Badge mit Farben (wie bei buyscript.js)
    let sideBadge = "";
    if (it.side === "t") {
      sideBadge = '<span class="side-badge side-t">T-ONLY</span>';
    } else if (it.side === "ct") {
      sideBadge = '<span class="side-badge side-ct">CT-ONLY</span>';
    } else {
      sideBadge = '<span class="side-badge side-both">BOTH</span>';
    }
    
    div.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          ${sideBadge}
          <span>${it.name}</span>
        </div>
        <span style="color: #ffaa44; font-size: 0.7rem;">💰 $${it.price}</span>
      </div>
      <span class="add-icon">+</span>
    `;
    
    div.onclick = () => {
      // Verwende selectedBindKey direkt, wie bei Say und Script
      if (!selectedBindKey) {
        alert("Bitte wähle zuerst eine Taste aus!");
        return;
      }
      let cur = document.getElementById("bindsBuyCommandInput").value;
      let cnt = (cur.match(new RegExp(it.cmd.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || []).length;
      
      let effectiveMax = it.maxCount;
      if (it.cmd === "buy flashbang") {
        effectiveMax = 2;
      } else if (it.cmd.includes("grenade") || it.cmd === "decoy") {
        effectiveMax = 1;
      }
      
      if (cnt >= effectiveMax) {
        alert(`Maximal ${effectiveMax} ${effectiveMax === 2 ? 'Flashbangs' : 'mal'} erlaubt`);
        return;
      }
      let n = cur ? cur + "; " + it.cmd : it.cmd;
      document.getElementById("bindsBuyCommandInput").value = n;
    };
    grid.appendChild(div);
  });
}

function bindsSaveBuy() {
  let currentKey = window.selectedBindKey;
  
  console.log("bindsSaveBuy - window.selectedBindKey:", currentKey);
  
  if (!currentKey) {
    alert("❌ Bitte wähle zuerst eine Taste auf der Tastatur aus!");
    return;
  }
  
  let val = document.getElementById("bindsBuyCommandInput").value.trim();
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
    if (window.removeSpecificBinding) window.removeSpecificBinding(currentKey, existingType);
  }

  if (window.buyBindings) {
    window.buyBindings[currentKey] = val;
    if (window.saveBuy) window.saveBuy();
  }
  alert(`✅ Buy-Bindung für Taste "${currentKey}" gespeichert!`);
  renderBindsKeyboardGrid();
  renderBindsMouseGrid();
  renderBindsSavedList();
  if (window.refreshFullExport) window.refreshFullExport();
}

function bindsSaveSay() {
  let currentKey = selectedBindKey || window.selectedBindKey;
  
  console.log("bindsSaveSay aufgerufen, currentKey:", currentKey);
  
  if (!currentKey) {
    alert("❌ Bitte wähle zuerst eine Taste aus, indem du auf eine Taste in der Tastatur klickst!");
    return;
  }
  
  let msgText = document.getElementById("bindsSayCommandInput").value.trim();
  if (!msgText) {
    alert("❌ Bitte gib eine Nachricht ein!");
    return;
  }

  const existingType = window.getExistingBindingType
    ? window.getExistingBindingType(currentKey)
    : "none";

  if (existingType !== "none" && existingType !== "say") {
    let typeName = existingType === "script" ? "ein Skript" : "einen Buy-Bind";
    if (
      !confirm(
        `Taste "${currentKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`,
      )
    ) {
      return;
    }
    if (window.removeSpecificBinding)
      window.removeSpecificBinding(currentKey, existingType);
  }

  const sayType = document.querySelector(
    'input[name="bindsSayType"]:checked',
  ).value;
  const fullCommand = `${sayType} ${msgText}`;

  if (window.sayBindings) {
    window.sayBindings[currentKey] = fullCommand;
    if (window.saveSayBindings) window.saveSayBindings();
  }
  alert(`✅ Say-Bindung für Taste "${currentKey}" gespeichert!`);
  renderBindsKeyboardGrid();
  renderBindsMouseGrid();
  renderBindsSavedList();
  if (window.refreshFullExport) window.refreshFullExport();
}

function bindsSaveScript() {
  let currentKey = selectedBindKey || window.selectedBindKey;
  
  console.log("bindsSaveScript aufgerufen, currentKey:", currentKey);
  
  if (!currentKey) {
    alert("❌ Bitte wähle zuerst eine Taste aus, indem du auf eine Taste in der Tastatur klickst!");
    return;
  }
  
  let userAliases = document
    .getElementById("bindsScriptCommandsArea")
    .value.trim();
  if (!userAliases) {
    alert("❌ Bitte gib Skript-Inhalt ein!");
    return;
  }

  const existingType = window.getExistingBindingType
    ? window.getExistingBindingType(currentKey)
    : "none";

  if (existingType !== "none" && existingType !== "script") {
    let typeName = existingType === "buy" ? "einen Buy-Bind" : "einen Say-Bind";
    if (
      !confirm(
        `Taste "${currentKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`,
      )
    ) {
      return;
    }
    if (window.removeSpecificBinding)
      window.removeSpecificBinding(currentKey, existingType);
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
    finalContent += `\nbind "${currentKey}" "${aliasName}"`;
  } else {
    const firstLine = cleanAliases.split("\n")[0];
    if (firstLine && firstLine.includes("alias")) {
      const fallbackMatch = firstLine.match(/alias\s+(\+\w+|\w+)/);
      if (fallbackMatch)
        finalContent += `\nbind "${currentKey}" "${fallbackMatch[1]}"`;
    }
  }

  if (window.scriptBindings) {
    window.scriptBindings[currentKey] = finalContent;
    if (window.saveScriptBindings) window.saveScriptBindings();
  }
  alert(`✅ Skript für Taste "${currentKey}" gespeichert!`);
  renderBindsKeyboardGrid();
  renderBindsMouseGrid();
  renderBindsSavedList();
  if (window.refreshFullExport) window.refreshFullExport();
}

function bindsUnbindCurrent() {
  let currentKey = selectedBindKey || window.selectedBindKey;
  
  console.log("bindsUnbindCurrent aufgerufen, currentKey:", currentKey);
  
  if (!currentKey) {
    alert("❌ Bitte wähle zuerst eine Taste aus, indem du auf eine Taste in der Tastatur klickst!");
    return;
  }

  let removed = false;
  if (
    currentBindType === "buy" &&
    window.buyBindings &&
    window.buyBindings[currentKey]
  ) {
    delete window.buyBindings[currentKey];
    if (window.saveBuy) window.saveBuy();
    removed = true;
  } else if (
    currentBindType === "say" &&
    window.sayBindings &&
    window.sayBindings[currentKey]
  ) {
    delete window.sayBindings[currentKey];
    if (window.saveSayBindings) window.saveSayBindings();
    removed = true;
  } else if (
    currentBindType === "script" &&
    window.scriptBindings &&
    window.scriptBindings[currentKey]
  ) {
    delete window.scriptBindings[currentKey];
    if (window.saveScriptBindings) window.saveScriptBindings();
    removed = true;
  }

  if (removed) {
    alert(`Binding für ${currentKey} (${currentBindType}) entfernt`);
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

  // Hilfsfunktion: Konvertiert einen Tastennamen für die Anzeige basierend auf dem Layout
  function getDisplayKeyName(key, layout) {
    if (layout !== "RU") return key;
    
    // Mapping: Englischer Buchstabe -> Kyrillische Anzeige
    const enToRuDisplayMap = {
      'q': 'Й', 'w': 'Ц', 'e': 'У', 'r': 'К', 't': 'Е', 'y': 'Н', 'u': 'Г', 'i': 'Ш', 'o': 'Щ', 'p': 'З',
      '[': 'Х', ']': 'Ъ', '\\': '\\',
      'a': 'Ф', 's': 'Ы', 'd': 'В', 'f': 'А', 'g': 'П', 'h': 'Р', 'j': 'О', 'k': 'Л', 'l': 'Д', ';': 'Ж', "'": 'Э',
      'z': 'Я', 'x': 'Ч', 'c': 'С', 'v': 'М', 'b': 'И', 'n': 'Т', 'm': 'Ь', ',': 'Б', '.': 'Ю', '/': '/',
      '`': 'Ё', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '0': '0',
      '-': '-', '=': '=', '~': '~'
    };
    
    // Sonderzeichen (Großbuchstaben, die keine Buchstaben sind)
    const upperKey = key.toUpperCase();
    if (enToRuDisplayMap[upperKey]) return enToRuDisplayMap[upperKey];
    if (enToRuDisplayMap[key]) return enToRuDisplayMap[key];
    
    return key;
  }

  // Sammle alle benutzerdefinierten Buy-Bindings
  if (window.buyBindings) {
    for (let [k, cmd] of Object.entries(window.buyBindings)) {
      allBinds.push({
        key: k,
        displayKey: getDisplayKeyName(k, currentLayout),
        type: "buy",
        cmd: cmd,
        isCustom: true
      });
    }
  }

  // Sammle alle benutzerdefinierten Say-Bindings
  if (window.sayBindings) {
    for (let [k, cmd] of Object.entries(window.sayBindings)) {
      allBinds.push({
        key: k,
        displayKey: getDisplayKeyName(k, currentLayout),
        type: "say",
        cmd: cmd,
        isCustom: true
      });
    }
  }

  // Sammle alle benutzerdefinierten Script-Bindings
  if (window.scriptBindings) {
    for (let [k, val] of Object.entries(window.scriptBindings)) {
      let firstLine = val.split("\n")[0].replace("//", "").trim();
      allBinds.push({
        key: k,
        displayKey: getDisplayKeyName(k, currentLayout),
        type: "script",
        cmd: firstLine.substring(0, 50),
        fullCmd: val,
        isCustom: true
      });
    }
  }

  // Sammle alle CS2 Standard-Bindings (DEFAULT)
  if (window.cs2DefaultBinds) {
    for (let [k, cmd] of Object.entries(window.cs2DefaultBinds)) {
      const alreadyBound = allBinds.some(b => b.key === k && b.isCustom === true);
      if (!alreadyBound) {
        allBinds.push({
          key: k,
          displayKey: getDisplayKeyName(k, currentLayout),
          type: "default",
          cmd: cmd,
          isCustom: false
        });
      }
    }
  }

  // Sortiere nach Taste (alphabetisch)
  allBinds.sort((a, b) => a.key.localeCompare(b.key));

  // Wenn keine Bindings vorhanden
  if (allBinds.length === 0) {
    cont.innerHTML = '<div class="empty-message">✨ Keine Bindings vorhanden. Klicke auf eine Taste, um ein Binding zu erstellen!</div>';
    return;
  }

  // Zeige alle Bindings an
  allBinds.forEach((bind) => {
    let e = document.createElement("div");
    e.className = "bind-entry";
    
    let typeIcon = bind.type === "buy" ? "🛒" : bind.type === "say" ? "💬" : bind.type === "script" ? "🎮" : "⭐";
    let typeColor = bind.type === "buy" ? "#ff3333" : bind.type === "say" ? "#44cc44" : bind.type === "script" ? "#2288dd" : "#cc9900";
    
    // Nur bei benutzerdefinierten Bindings Lösch-Button anzeigen
    const deleteButton = bind.isCustom ? 
      `<span style="float: right; cursor: pointer; color: #ff6666; margin-left: 0.5rem;" onclick="window.removeBindingFromList('${bind.key}', '${bind.type}')">[x]</span>` : 
      `<span style="float: right; margin-left: 0.5rem; opacity: 0.5;" title="Standard-Bindung (kann durch eigenen Bind überschrieben werden)">[Standard]</span>`;
    
    // Zeige den displayKey an (kyrillisch bei RU-Layout), aber speichere den echten key für die Funktion
    e.innerHTML = `
      <span class="bind-key" style="color: ${typeColor};">${typeIcon} bind "${bind.displayKey}"</span> 
      → <span class="bind-command">"${bind.cmd.substring(0, 80)}${bind.cmd.length > 80 ? "..." : ""}"</span>
      ${deleteButton}
    `;
    
    // Tooltip zeigt den echten Tastennamen an
    if (bind.displayKey !== bind.key) {
      e.title = `Echte Taste: "${bind.key}" (wird in CS2 verwendet)`;
    } else if (!bind.isCustom && window.getCs2DefaultDescription) {
      e.title = window.getCs2DefaultDescription(bind.key);
    }

    e.onclick = (event) => {
      if (event.target.tagName === "SPAN" && (event.target.textContent === "[x]" || event.target.textContent === "[Standard]")) return;
      
      selectedBindKey = bind.key;
      
      // Bestimme den Typ für die Anzeige
      if (bind.type === "default") {
        currentBindType = "buy";
      } else {
        currentBindType = bind.type;
      }
      
      // Aktiviere den entsprechenden Tab
      document.querySelectorAll("#bindTypeSelector .main-cat-btn").forEach((btn) => {
        btn.classList.remove("active-main");
        let targetType = bind.type === "default" ? "buy" : bind.type;
        if (btn.dataset.bindType === targetType) btn.classList.add("active-main");
      });
      
      // Aktiviere das richtige Area
      document.querySelectorAll(".bind-type-area").forEach((area) => area.classList.remove("active"));
      let areaId = `binds${bind.type === "buy" ? "Buy" : bind.type === "say" ? "Say" : bind.type === "script" ? "Script" : "Buy"}Area`;
      document.getElementById(areaId).classList.add("active");
      
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
  
  // Status-Anzeigen zurücksetzen wenn keine Taste ausgewählt
  const currentKey = selectedBindKey || window.selectedBindKey;
  if (!currentKey) {
    const statusDiv = document.getElementById("selectedKeyStatus");
    if (statusDiv) {
      statusDiv.innerHTML = "⚡ Keine Taste ausgewählt - Klicke auf eine Taste auf der Tastatur";
      statusDiv.style.background = "#ff4444";
      statusDiv.style.color = "white";
    }
  }
}

function attachBindsEventListeners() {
  // Bind Type Selector
  document
    .querySelectorAll("#bindTypeSelector .main-cat-btn")
    .forEach((btn) => {
      btn.removeEventListener("click", setBindTypeHandler);
      btn.addEventListener("click", setBindTypeHandler);
    });

  function setBindTypeHandler(e) {
    setBindType(e.currentTarget.dataset.bindType);
  }

  // Save Buy Button
  const saveBuyBtn = document.getElementById("bindsSaveBuyBtn");
  if (saveBuyBtn) {
    saveBuyBtn.removeEventListener("click", bindsSaveBuy);
    saveBuyBtn.addEventListener("click", bindsSaveBuy);
  }

  // Unbind Buy Button
  const unbindBuyBtn = document.getElementById("bindsUnbindBuyBtn");
  if (unbindBuyBtn) {
    unbindBuyBtn.removeEventListener("click", bindsUnbindCurrent);
    unbindBuyBtn.addEventListener("click", bindsUnbindCurrent);
  }

  // Save Say Button
  const saveSayBtn = document.getElementById("bindsSaveSayBtn");
  if (saveSayBtn) {
    saveSayBtn.removeEventListener("click", bindsSaveSay);
    saveSayBtn.addEventListener("click", bindsSaveSay);
  }

  // Unbind Say Button
  const unbindSayBtn = document.getElementById("bindsUnbindSayBtn");
  if (unbindSayBtn) {
    unbindSayBtn.removeEventListener("click", bindsUnbindCurrent);
    unbindSayBtn.addEventListener("click", bindsUnbindCurrent);
  }

  // Save Script Button
  const saveScriptBtn = document.getElementById("bindsSaveScriptBtn");
  if (saveScriptBtn) {
    saveScriptBtn.removeEventListener("click", bindsSaveScript);
    saveScriptBtn.addEventListener("click", bindsSaveScript);
  }

  // Unbind Script Button
  const unbindScriptBtn = document.getElementById("bindsUnbindScriptBtn");
  if (unbindScriptBtn) {
    unbindScriptBtn.removeEventListener("click", bindsUnbindCurrent);
    unbindScriptBtn.addEventListener("click", bindsUnbindCurrent);
  }

  // Reset All Button
  const resetAllBtn = document.getElementById("bindsResetAllBtn");
  if (resetAllBtn) {
    resetAllBtn.removeEventListener("click", bindsResetAll);
    resetAllBtn.addEventListener("click", bindsResetAll);
  }

  window.setBuyCategory = function (cat) {
    window.currentBuyCategory = cat;
  };
  window.currentBuyCategory = "Pistole";
}

window.initBindsTab = initBindsTab;
window.renderBindsKeyboard = renderBindsKeyboard;
window.renderBindsSavedList = renderBindsSavedList;