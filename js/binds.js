// ======================== BENDS TAB (MIT GRID-TASTATUR) ========================
let selectedBindKey = null;
let currentBindType = "buy";
let showMouseArea = false;

// Gesperrte Tasten (können nicht gebindet werden)
const lockedKeys = ["esc", "win", "alt gr", "menu"];

// Maus-Tasten für Bindings
const mouseKeys = [
  { id: "mouse1", display: "Left Click", cmd: "mouse1" },
  { id: "mouse2", display: "Right Click", cmd: "mouse2" },
  { id: "mouse3", display: "Middle Click", cmd: "mouse3" },
  { id: "mouse4", display: "Side Back", cmd: "mouse4" },
  { id: "mouse5", display: "Side Forward", cmd: "mouse5" },
  { id: "mwheelup", display: "Scroll Up", cmd: "mwheelup" },
  { id: "mwheeldown", display: "Scroll Down", cmd: "mwheeldown" }
];

function initBindsTab() {
    renderBindsKeyboardGrid();
    renderBindsMouseGrid();
    renderBindsBuyCategories();
    renderBindsSavedList();
    renderBindsTemplates();
    attachBindsEventListeners();
    attachMouseToggleListener();
    initLayoutToggleButton();
}

// Neue Funktion für den Layout-Toggle-Button
function initLayoutToggleButton() {
    const toggleBtn = document.getElementById("toggleKeyboardLayoutBinds");
    if (!toggleBtn) return;
    
    // Entferne vorhandene Event-Listener
    const newBtn = toggleBtn.cloneNode(true);
    toggleBtn.parentNode.replaceChild(newBtn, toggleBtn);
    
    // Setze die Klasse und den initialen Text
    newBtn.classList.add("glow", "layout-toggle-btn");
    newBtn.style.background = "transparent";
    updateLayoutButtons(); // Setzt den richtigen Text
    
    // Event-Listener hinzufügen
    newBtn.addEventListener("click", () => {
        toggleKeyboardLayout();
    });
}

function renderBindsKeyboardGrid() {
    const container = document.getElementById("bindsKeyboardGrid");
    if (!container) return;
    container.innerHTML = "";
    
    // Definiere die Grid-Positionen für Tasten (unabhängig vom Layout)
    // Diese Positionen sind fix, nur die Tasten-Namen ändern sich je nach Layout
    const keyPositions = [
        // Zeile 1: Esc, F1–F12, Print Screen, Scroll Lock, Pause Break
        { col: "1 / 3", row: "1 / 3", small: false, displayKey: "esc", posKey: "ESC" },
        { col: "4 / 6", row: "1 / 3", small: false, displayKey: "f1", posKey: "F1" },
        { col: "6 / 8", row: "1 / 3", small: false, displayKey: "f2", posKey: "F2" },
        { col: "8 / 10", row: "1 / 3", small: false, displayKey: "f3", posKey: "F3" },
        { col: "10 / 12", row: "1 / 3", small: false, displayKey: "f4", posKey: "F4" },
        { col: "13 / 15", row: "1 / 3", small: false, displayKey: "f5", posKey: "F5" },
        { col: "15 / 17", row: "1 / 3", small: false, displayKey: "f6", posKey: "F6" },
        { col: "17 / 19", row: "1 / 3", small: false, displayKey: "f7", posKey: "F7" },
        { col: "19 / 21", row: "1 / 3", small: false, displayKey: "f8", posKey: "F8" },
        { col: "22 / 24", row: "1 / 3", small: false, displayKey: "f9", posKey: "F9" },
        { col: "24 / 26", row: "1 / 3", small: false, displayKey: "f10", posKey: "F10" },
        { col: "26 / 28", row: "1 / 3", small: false, displayKey: "f11", posKey: "F11" },
        { col: "28 / 30", row: "1 / 3", small: false, displayKey: "f12", posKey: "F12" },
        { col: "31 / 33", row: "1 / 3", small: true, displayKey: "prtsc", posKey: "Print Screen" },
        { col: "33 / 35", row: "1 / 3", small: true, displayKey: "srclk", posKey: "Scroll Lock" },
        { col: "35 / 37", row: "1 / 3", small: true, displayKey: "pause", posKey: "Pause Break" },
        
        // Zeile 2: Ziffernreihe und spezielle Tasten
        { col: "1 / 3", row: "4 / 6", small: false, displayKey: "grave", posKey: "`" },
        { col: "3 / 5", row: "4 / 6", small: false, displayKey: "1", posKey: "1" },
        { col: "5 / 7", row: "4 / 6", small: false, displayKey: "2", posKey: "2" },
        { col: "7 / 9", row: "4 / 6", small: false, displayKey: "3", posKey: "3" },
        { col: "9 / 11", row: "4 / 6", small: false, displayKey: "4", posKey: "4" },
        { col: "11 / 13", row: "4 / 6", small: false, displayKey: "5", posKey: "5" },
        { col: "13 / 15", row: "4 / 6", small: false, displayKey: "6", posKey: "6" },
        { col: "15 / 17", row: "4 / 6", small: false, displayKey: "7", posKey: "7" },
        { col: "17 / 19", row: "4 / 6", small: false, displayKey: "8", posKey: "8" },
        { col: "19 / 21", row: "4 / 6", small: false, displayKey: "9", posKey: "9" },
        { col: "21 / 23", row: "4 / 6", small: false, displayKey: "0", posKey: "0" },
        { col: "23 / 25", row: "4 / 6", small: false, displayKey: "minus", posKey: "-" },
        { col: "25 / 27", row: "4 / 6", small: false, displayKey: "equals", posKey: "=" },
        { col: "27 / 30", row: "4 / 6", small: true, displayKey: "backspace", posKey: "BACKSPACE" },
        { col: "31 / 33", row: "4 / 6", small: true, displayKey: "insert", posKey: "Insert" },
        { col: "33 / 35", row: "4 / 6", small: true, displayKey: "home", posKey: "Home" },
        { col: "35 / 37", row: "4 / 6", small: true, displayKey: "pgup", posKey: "Page Up" },
        { col: "38 / 40", row: "4 / 6", small: true, displayKey: "numlock", posKey: "Num Lock" },
        { col: "40 / 42", row: "4 / 6", small: false, displayKey: "kp_slash", posKey: "KP_/" },
        { col: "42 / 44", row: "4 / 6", small: false, displayKey: "kp_star", posKey: "KP_*" },
        { col: "44 / 46", row: "4 / 6", small: false, displayKey: "kp_minus", posKey: "KP_-" },
        
        // Zeile 3: Tab, Q W E R T Y U I O P [ ] \
        { col: "1 / 4", row: "6 / 8", small: false, displayKey: "tab", posKey: "TAB" },
        { col: "4 / 6", row: "6 / 8", small: false, displayKey: "q", posKey: "q" },
        { col: "6 / 8", row: "6 / 8", small: false, displayKey: "w", posKey: "w" },
        { col: "8 / 10", row: "6 / 8", small: false, displayKey: "e", posKey: "e" },
        { col: "10 / 12", row: "6 / 8", small: false, displayKey: "r", posKey: "r" },
        { col: "12 / 14", row: "6 / 8", small: false, displayKey: "t", posKey: "t" },
        { col: "14 / 16", row: "6 / 8", small: false, displayKey: "y", posKey: "y" },
        { col: "16 / 18", row: "6 / 8", small: false, displayKey: "u", posKey: "u" },
        { col: "18 / 20", row: "6 / 8", small: false, displayKey: "i", posKey: "i" },
        { col: "20 / 22", row: "6 / 8", small: false, displayKey: "o", posKey: "o" },
        { col: "22 / 24", row: "6 / 8", small: false, displayKey: "p", posKey: "p" },
        { col: "24 / 26", row: "6 / 8", small: false, displayKey: "lbracket", posKey: "[" },
        { col: "26 / 28", row: "6 / 8", small: false, displayKey: "rbracket", posKey: "]" },
        { col: "28 / 30", row: "6 / 8", small: false, displayKey: "backslash", posKey: "\\" },
        { col: "31 / 33", row: "6 / 8", small: true, displayKey: "del", posKey: "delete" },
        { col: "33 / 35", row: "6 / 8", small: true, displayKey: "end", posKey: "end" },
        { col: "35 / 37", row: "6 / 8", small: true, displayKey: "pgdn", posKey: "page down" },
        { col: "38 / 40", row: "6 / 8", small: false, displayKey: "kp_7", posKey: "KP_7" },
        { col: "40 / 42", row: "6 / 8", small: false, displayKey: "kp_8", posKey: "KP_8" },
        { col: "42 / 44", row: "6 / 8", small: false, displayKey: "kp_9", posKey: "KP_9" },
        { col: "44 / 46", row: "6 / 10", small: false, displayKey: "kp_plus", posKey: "KP_+" },
        
        // Zeile 4: Caps Lock, A S D F G H J K L ; ' Enter
        { col: "1 / 5", row: "8 / 10", small: false, displayKey: "caps", posKey: "Caps Lock" },
        { col: "5 / 7", row: "8 / 10", small: false, displayKey: "a", posKey: "a" },
        { col: "7 / 9", row: "8 / 10", small: false, displayKey: "s", posKey: "s" },
        { col: "9 / 11", row: "8 / 10", small: false, displayKey: "d", posKey: "d" },
        { col: "11 / 13", row: "8 / 10", small: false, displayKey: "f", posKey: "f" },
        { col: "13 / 15", row: "8 / 10", small: false, displayKey: "g", posKey: "g" },
        { col: "15 / 17", row: "8 / 10", small: false, displayKey: "h", posKey: "h" },
        { col: "17 / 19", row: "8 / 10", small: false, displayKey: "j", posKey: "j" },
        { col: "19 / 21", row: "8 / 10", small: false, displayKey: "k", posKey: "k" },
        { col: "21 / 23", row: "8 / 10", small: false, displayKey: "l", posKey: "l" },
        { col: "23 / 25", row: "8 / 10", small: false, displayKey: "semicolon", posKey: ";" },
        { col: "25 / 27", row: "8 / 10", small: false, displayKey: "quote", posKey: "'" },
        { col: "27 / 30", row: "8 / 10", small: false, displayKey: "enter", posKey: "ENTER" },
        { col: "38 / 40", row: "8 / 10", small: false, displayKey: "kp_4", posKey: "KP_4" },
        { col: "40 / 42", row: "8 / 10", small: false, displayKey: "kp_5", posKey: "KP_5" },
        { col: "42 / 44", row: "8 / 10", small: false, displayKey: "kp_6", posKey: "KP_6" },
        
        // Zeile 5: Shift links, Z X C V B N M , . / Shift rechts, Pfeil hoch
        { col: "1 / 6", row: "10 / 12", small: false, displayKey: "lshift", posKey: "LSHIFT" },
        { col: "6 / 8", row: "10 / 12", small: false, displayKey: "z", posKey: "z" },
        { col: "8 / 10", row: "10 / 12", small: false, displayKey: "x", posKey: "x" },
        { col: "10 / 12", row: "10 / 12", small: false, displayKey: "c", posKey: "c" },
        { col: "12 / 14", row: "10 / 12", small: false, displayKey: "v", posKey: "v" },
        { col: "14 / 16", row: "10 / 12", small: false, displayKey: "b", posKey: "b" },
        { col: "16 / 18", row: "10 / 12", small: false, displayKey: "n", posKey: "n" },
        { col: "18 / 20", row: "10 / 12", small: false, displayKey: "m", posKey: "m" },
        { col: "20 / 22", row: "10 / 12", small: false, displayKey: "comma", posKey: "," },
        { col: "22 / 24", row: "10 / 12", small: false, displayKey: "period", posKey: "." },
        { col: "24 / 26", row: "10 / 12", small: false, displayKey: "slash", posKey: "/" },
        { col: "26 / 30", row: "10 / 12", small: false, displayKey: "rshift", posKey: "RSHIFT" },
        { col: "33 / 35", row: "10 / 12", small: false, displayKey: "up", posKey: "↑" },
        { col: "38 / 40", row: "10 / 12", small: false, displayKey: "kp_1", posKey: "KP_1" },
        { col: "40 / 42", row: "10 / 12", small: false, displayKey: "kp_2", posKey: "KP_2" },
        { col: "42 / 44", row: "10 / 12", small: false, displayKey: "kp_3", posKey: "KP_3" },
        { col: "44 / 46", row: "10 / 14", small: true, displayKey: "kp_enter", posKey: "KP_Enter" },
        
        // Zeile 6: Strg, Win, Alt, Leertaste, Alt Gr, Win, Menü, Strg rechts, Pfeiltasten
        { col: "1 / 4", row: "12 / 14", small: false, displayKey: "lctrl", posKey: "LCTRL" },
        { col: "4 / 6", row: "12 / 14", small: false, displayKey: "lwin", posKey: "win" },
        { col: "6 / 9", row: "12 / 14", small: false, displayKey: "lalt", posKey: "LALT" },
        { col: "9 / 19", row: "12 / 14", small: false, displayKey: "space", posKey: "SPACE" },
        { col: "19 / 22", row: "12 / 14", small: false, displayKey: "ralt", posKey: "alt gr" },
        { col: "22 / 24", row: "12 / 14", small: false, displayKey: "rwin", posKey: "win" },
        { col: "24 / 27", row: "12 / 14", small: false, displayKey: "menu", posKey: "menu" },
        { col: "27 / 30", row: "12 / 14", small: false, displayKey: "rctrl", posKey: "RCTRL" },
        { col: "31 / 33", row: "12 / 14", small: false, displayKey: "left", posKey: "←" },
        { col: "33 / 35", row: "12 / 14", small: false, displayKey: "down", posKey: "↓" },
        { col: "35 / 37", row: "12 / 14", small: false, displayKey: "right", posKey: "→" },
        { col: "38 / 42", row: "12 / 14", small: false, displayKey: "kp_0", posKey: "KP_0" },
        { col: "42 / 44", row: "12 / 14", small: false, displayKey: "kp_del", posKey: "KP_DEL" }
    ];
    
    // Hole das aktuelle Layout (DE oder US)
    const currentRows = mainKeysRows;
    
    // Erstelle eine Map für schnellen Zugriff: Tastenname (wie in rows) -> Display-Name
    const keyMap = new Map();
    for (let row of currentRows) {
        for (let keyName of row) {
            let displayName = keyName;
            // Spezielle Anzeigenamen für bestimmte Tasten
            if (keyName === "SPACE") displayName = "␣";
            else if (keyName === "LSHIFT" || keyName === "RSHIFT") displayName = "Shift";
            else if (keyName === "LCTRL" || keyName === "RCTRL") displayName = "Ctrl";
            else if (keyName === "LALT" || keyName === "RALT") displayName = "Alt";
            else if (keyName === "ENTER") displayName = "Enter";
            else if (keyName === "BACKSPACE") displayName = "⌫";
            else if (keyName === "TAB") displayName = "Tab";
            else if (keyName === "CAPS") displayName = "Caps";
            else if (keyName === "ESC") displayName = "Esc";
            else if (keyName === "UP") displayName = "▲";
            else if (keyName === "DOWN") displayName = "▼";
            else if (keyName === "LEFT") displayName = "◀";
            else if (keyName === "RIGHT") displayName = "▶";
            else if (keyName === "alt gr") displayName = "AltGr";
            else if (keyName === "win") displayName = "Win";
            else if (keyName === "menu") displayName = "Menu";
            else if (keyName === "Print Screen") displayName = "PrtSc";
            else if (keyName === "Scroll Lock") displayName = "Scrlk";
            else if (keyName === "Pause Break") displayName = "Pause";
            else if (keyName === "Insert") displayName = "Ins";
            else if (keyName === "Page Up") displayName = "PgUp";
            else if (keyName === "page down") displayName = "PgDn";
            else if (keyName === "delete") displayName = "Del";
            else if (keyName === "end") displayName = "End";
            else if (keyName === "home") displayName = "Home";
            else if (keyName === "Num Lock") displayName = "Num";
            
            keyMap.set(keyName, displayName);
        }
    }
    
    keyPositions.forEach(pos => {
        const btn = document.createElement("button");
        btn.className = "app__key";
        
        // Finde den tatsächlichen Tastennamen aus dem aktuellen Layout
        let actualKeyName = pos.posKey;
        let displayText = pos.displayKey;
        
        // Versuche den Wert aus der aktuellen Layout-Map zu finden
        for (let [keyName, display] of keyMap.entries()) {
            if (keyName === pos.posKey || keyName === pos.posKey.toLowerCase() || 
                (pos.posKey === "win" && keyName === "win") ||
                (pos.posKey === "LALT" && keyName === "LALT") ||
                (pos.posKey === "LCTRL" && keyName === "LCTRL") ||
                (pos.posKey === "RCTRL" && keyName === "RCTRL") ||
                (pos.posKey === "RSHIFT" && keyName === "RSHIFT") ||
                (pos.posKey === "LSHIFT" && keyName === "LSHIFT") ||
                (pos.posKey === "alt gr" && keyName === "alt gr")) {
                actualKeyName = keyName;
                displayText = display;
                break;
            }
        }
        
        // Spezialfälle für Tasten, die in beiden Layouts gleich sind
        if (pos.posKey === "1" || pos.posKey === "2" || pos.posKey === "3" || 
            pos.posKey === "4" || pos.posKey === "5" || pos.posKey === "6" ||
            pos.posKey === "7" || pos.posKey === "8" || pos.posKey === "9" || 
            pos.posKey === "0" || pos.posKey === "-" || pos.posKey === "=" ||
            pos.posKey === "q" || pos.posKey === "w" || pos.posKey === "e" ||
            pos.posKey === "r" || pos.posKey === "t" || pos.posKey === "z" ||
            pos.posKey === "u" || pos.posKey === "i" || pos.posKey === "o" ||
            pos.posKey === "p" || pos.posKey === "a" || pos.posKey === "s" ||
            pos.posKey === "d" || pos.posKey === "f" || pos.posKey === "g" ||
            pos.posKey === "h" || pos.posKey === "j" || pos.posKey === "k" ||
            pos.posKey === "l" || pos.posKey === "y" || pos.posKey === "x" ||
            pos.posKey === "c" || pos.posKey === "v" || pos.posKey === "b" ||
            pos.posKey === "n" || pos.posKey === "m") {
            actualKeyName = pos.posKey;
            displayText = pos.posKey;
        }
        
        // Prüfe ob die Taste gesperrt ist
        const isLocked = lockedKeys.includes(actualKeyName.toLowerCase());
        
        let bindClass = "";
        if (!isLocked) {
            const bindingInfo = getBindingInfo(actualKeyName);
            if (bindingInfo.type === "buy") bindClass = "app__key--bound-buy";
            if (bindingInfo.type === "script") bindClass = "app__key--bound-script";
            if (bindingInfo.type === "say") bindClass = "app__key--bound-say";
        }
        
        btn.className = `app__key ${bindClass} ${isLocked ? 'app__key--locked' : ''} ${pos.small ? 'app__key--small' : ''}`.trim();
        
        if (selectedBindKey === actualKeyName && !isLocked) {
            btn.classList.add("app__key--active");
        }
        
        btn.textContent = displayText;
        btn.style.gridColumn = pos.col;
        btn.style.gridRow = pos.row;
        
        if (!isLocked) {
            btn.onclick = () => {
                selectedBindKey = actualKeyName;
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
    
    // Maus-Grid: 6 Spalten für 6 Maus-Tasten
    const gridCols = [1, 6, 11, 17, 22, 27, 32];
    
    mouseKeys.forEach((key, idx) => {
        const btn = document.createElement("button");
        btn.className = "mouse-key";
        
        const bindingInfo = getBindingInfo(key.cmd);
        if (bindingInfo.type === "buy") btn.classList.add("mouse-key--bound-buy");
        if (bindingInfo.type === "script") btn.classList.add("mouse-key--bound-script");
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
    
    if (typeof categories === 'undefined') return;
    
    Object.keys(categories).forEach((c) => {
        let p = document.createElement("div");
        p.className = "cat-pill";
        if (typeof currentBuyCategory !== 'undefined' && currentBuyCategory === c) p.classList.add("active-cat");
        p.textContent = c;
        p.onclick = () => {
            if (typeof window.setBuyCategory === 'function') {
                window.setBuyCategory(c);
            } else {
                window.currentBuyCategory = c;
            }
            renderBindsBuyItems();
            document.querySelectorAll("#bindsCategoryList .cat-pill").forEach(pill => pill.classList.remove("active-cat"));
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
    
    if (typeof categories === 'undefined') return;
    let currentCat = (typeof window.currentBuyCategory !== 'undefined') ? window.currentBuyCategory : "Pistole";
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
            let cnt = (cur.match(new RegExp(it.cmd.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || []).length;
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
    
    const existingType = window.getExistingBindingType ? window.getExistingBindingType(selectedBindKey) : "none";
    
    if (existingType !== "none" && existingType !== "buy") {
        let typeName = existingType === "script" ? "ein Skript" : "einen Say-Bind";
        if (!confirm(`Taste "${selectedBindKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`)) {
            return;
        }
        if (window.removeSpecificBinding) window.removeSpecificBinding(selectedBindKey, existingType);
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
    
    const existingType = window.getExistingBindingType ? window.getExistingBindingType(selectedBindKey) : "none";
    
    if (existingType !== "none" && existingType !== "say") {
        let typeName = existingType === "script" ? "ein Skript" : "einen Buy-Bind";
        if (!confirm(`Taste "${selectedBindKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`)) {
            return;
        }
        if (window.removeSpecificBinding) window.removeSpecificBinding(selectedBindKey, existingType);
    }
    
    const sayType = document.querySelector('input[name="bindsSayType"]:checked').value;
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
    let userAliases = document.getElementById("bindsScriptCommandsArea").value.trim();
    if (!userAliases) {
        alert("Bitte gib Skript-Inhalt ein!");
        return;
    }
    
    const existingType = window.getExistingBindingType ? window.getExistingBindingType(selectedBindKey) : "none";
    
    if (existingType !== "none" && existingType !== "script") {
        let typeName = existingType === "buy" ? "einen Buy-Bind" : "einen Say-Bind";
        if (!confirm(`Taste "${selectedBindKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`)) {
            return;
        }
        if (window.removeSpecificBinding) window.removeSpecificBinding(selectedBindKey, existingType);
    }
    
    let scriptName = document.getElementById("bindsScriptNameInput").value.trim() || "Skript";
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
            if (fallbackMatch) finalContent += `\nbind "${selectedBindKey}" "${fallbackMatch[1]}"`;
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
    if (currentBindType === "buy" && window.buyBindings && window.buyBindings[selectedBindKey]) {
        delete window.buyBindings[selectedBindKey];
        if (window.saveBuy) window.saveBuy();
        removed = true;
    } else if (currentBindType === "say" && window.sayBindings && window.sayBindings[selectedBindKey]) {
        delete window.sayBindings[selectedBindKey];
        if (window.saveSayBindings) window.saveSayBindings();
        removed = true;
    } else if (currentBindType === "script" && window.scriptBindings && window.scriptBindings[selectedBindKey]) {
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
    if (confirm("⚠️ ALLE Bindings (Buy, Say, Skripte) löschen? Diese Aktion kann nicht rückgängig gemacht werden!")) {
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
            allBinds.push({ key: k, type: "buy", display: `bind "${k}" → "${cmd}"`, cmd: cmd });
        }
    }
    
    // Sammle alle Say-Bindings
    if (window.sayBindings) {
        for (let [k, cmd] of Object.entries(window.sayBindings)) {
            allBinds.push({ key: k, type: "say", display: `bind "${k}" → "${cmd}"`, cmd: cmd });
        }
    }
    
    // Sammle alle Script-Bindings
    if (window.scriptBindings) {
        for (let [k, val] of Object.entries(window.scriptBindings)) {
            let firstLine = val.split("\n")[0].replace("//", "").trim();
            allBinds.push({ key: k, type: "script", display: `bind "${k}" → 🎮 ${firstLine.substring(0, 50)}`, cmd: val });
        }
    }
    
    // Wenn keine Bindings vorhanden
    if (allBinds.length === 0) {
        cont.innerHTML = '<div class="empty-message">✨ Keine Bindings vorhanden. Klicke auf eine Taste, um ein Binding zu erstellen!</div>';
        return;
    }
    
    // Sortiere nach Taste (alphabetisch)
    allBinds.sort((a, b) => a.key.localeCompare(b.key));
    
    // Zeige alle Bindings an
    allBinds.forEach((bind) => {
        let e = document.createElement("div");
        e.className = "bind-entry";
        
        let typeIcon = bind.type === "buy" ? "🛒" : (bind.type === "say" ? "💬" : "🎮");
        let typeColor = bind.type === "buy" ? "#ff3333" : (bind.type === "say" ? "#44cc44" : "#2288dd");
        
        e.innerHTML = `
            <span class="bind-key" style="color: ${typeColor};">${typeIcon} bind "${bind.key}"</span> 
            → <span class="bind-command">"${bind.cmd.substring(0, 80)}${bind.cmd.length > 80 ? '...' : ''}"</span>
            <span style="float: right; cursor: pointer; color: #ff6666; margin-left: 0.5rem;" onclick="window.removeBindingFromList('${bind.key}', '${bind.type}')">[x]</span>
        `;
        
        e.onclick = (event) => {
            if (event.target.tagName === 'SPAN' && event.target.textContent === '[x]') return;
            
            selectedBindKey = bind.key;
            currentBindType = bind.type;
            
            document.querySelectorAll("#bindTypeSelector .main-cat-btn").forEach(btn => {
                btn.classList.remove("active-main");
                if (btn.dataset.bindType === bind.type) btn.classList.add("active-main");
            });
            
            document.querySelectorAll(".bind-type-area").forEach(area => area.classList.remove("active"));
            document.getElementById(`binds${bind.type === "buy" ? "Buy" : (bind.type === "say" ? "Say" : "Script")}Area`).classList.add("active");
            
            renderBindsKeyboardGrid();
            renderBindsMouseGrid();
            updateBindsInputFields();
        };
        
        cont.appendChild(e);
    });
}

// Globale Funktoin zum Entfernen eines Bindings aus der Liste
window.removeBindingFromList = function(key, type) {
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
    
    if (typeof scriptTemplatesList === 'undefined') return;
    
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
                ${t.longDesc ? t.longDesc.substring(0, 150) + (t.longDesc.length > 150 ? '...' : '') : t.desc}
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
    
    const existingType = window.getExistingBindingType ? window.getExistingBindingType(selectedBindKey) : "none";
    if (existingType !== "none" && existingType !== "script") {
        let typeName = existingType === "buy" ? "einen Buy-Bind" : "einen Say-Bind";
        if (!confirm(`Taste "${selectedBindKey}" wird bereits für ${typeName} verwendet. Überschreiben?`)) return;
        if (window.removeSpecificBinding) window.removeSpecificBinding(selectedBindKey, existingType);
    }
    
    let cleanContent = scriptContent.replace(/bind\s+"[^"]*"\s+[^\n]*\n?/g, "");
    cleanContent = cleanContent.trim();
    
    const lines = cleanContent.split('\n');
    const filteredLines = lines.filter(line => {
        return line.trim().startsWith('alias') || 
               line.trim().startsWith('+') || 
               line.trim().startsWith('-') ||
               line.trim().startsWith('hudToggle') ||
               (line.trim().length > 0 && !line.trim().startsWith('bind'));
    });
    cleanContent = filteredLines.join('\n');
    
    let aliasName = "";
    const aliasMatch = cleanContent.match(/alias\s+(\+\w+|\w+)/);
    if (aliasMatch) aliasName = aliasMatch[1];
    
    let finalContent = `// ${scriptName}\n${cleanContent}`;
    if (aliasName) {
        finalContent += `\nbind "${selectedBindKey}" "${aliasName}"`;
    } else {
        const firstLine = cleanContent.split('\n')[0];
        if (firstLine && firstLine.includes('alias')) {
            const cmdMatch = firstLine.match(/alias\s+(\+\w+|\w+)/);
            if (cmdMatch) finalContent += `\nbind "${selectedBindKey}" "${cmdMatch[1]}"`;
        }
    }
    
    if (window.scriptBindings) {
        window.scriptBindings[selectedBindKey] = finalContent;
        if (window.saveScriptBindings) window.saveScriptBindings();
    }
    
    alert(`✅ Skript "${scriptName}" wurde auf Taste "${selectedBindKey}" gespeichert!`);
    
    // Korrigierte Aufrufe
    renderBindsKeyboardGrid();
    renderBindsMouseGrid();
    renderBindsSavedList();
    
    document.getElementById("bindsScriptCommandsArea").value = cleanContent;
    document.getElementById("bindsScriptNameInput").value = scriptName;
}

function setBindType(type) {
    currentBindType = type;
    document.querySelectorAll("#bindTypeSelector .main-cat-btn").forEach(btn => {
        btn.classList.remove("active-main");
        if (btn.dataset.bindType === type) btn.classList.add("active-main");
    });
    document.querySelectorAll(".bind-type-area").forEach(area => area.classList.remove("active"));
    document.getElementById(`binds${type === "buy" ? "Buy" : (type === "say" ? "Say" : "Script")}Area`).classList.add("active");
    updateBindsInputFields();
}

function attachBindsEventListeners() {
    document.querySelectorAll("#bindTypeSelector .main-cat-btn").forEach(btn => {
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
    if (unbindScriptBtn) unbindScriptBtn.addEventListener("click", bindsUnbindCurrent);
    
    const resetAllBtn = document.getElementById("bindsResetAllBtn");
    if (resetAllBtn) resetAllBtn.addEventListener("click", bindsResetAll);
    
    const toggleLayoutBtn = document.getElementById("toggleKeyboardLayoutBinds");
    if (toggleLayoutBtn && typeof toggleKeyboardLayout === 'function') {
        toggleLayoutBtn.addEventListener("click", () => {
            toggleKeyboardLayout();
            renderBindsKeyboard();
        });
    }
    
    window.setBuyCategory = function(cat) {
        window.currentBuyCategory = cat;
    };
    window.currentBuyCategory = "Pistole";
}

window.initBindsTab = initBindsTab;
window.renderBindsKeyboard = renderBindsKeyboard;
window.renderBindsSavedList = renderBindsSavedList;