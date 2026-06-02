// ======================== TASTATUR LAYOUT & GEMEINSAME FUNKTIONEN ========================
let currentLayout = "DE";
let mainKeysRows = [];

function initKeyboardLayouts() {
    if (typeof deKeysRows !== 'undefined') {
        mainKeysRows = [...deKeysRows];
        currentLayout = "DE";
    }
}

function getAllKeys() {
    const numpad = (typeof numpadKeys !== 'undefined') ? numpadKeys : [];
    return [...mainKeysRows.flat(), ...numpad];
}

// ZENTRALE FUNKTION: Prüft, welche Bindung eine Taste hat
function getBindingInfo(key) {
    const hasBuy = (window.buyBindings && window.buyBindings[key]);
    const hasScript = (window.scriptBindings && window.scriptBindings[key]);
    const hasSay = (window.sayBindings && window.sayBindings[key]);
    
    if (hasBuy) return { type: "buy", class: "bound-buy" };
    if (hasScript) return { type: "script", class: "bound-script" };
    if (hasSay) return { type: "say", class: "bound-say" };
    return { type: "none", class: "" };
}

function getKeyClass(key) {
    return getBindingInfo(key).class;
}

function getExistingBindingType(key) {
    return getBindingInfo(key).type;
}

function isKeyBound(key) {
    return getBindingInfo(key).type !== "none";
}

function removeSpecificBinding(key, bindType) {
    let changed = false;
    
    if (bindType === "buy" && window.buyBindings && window.buyBindings[key]) {
        delete window.buyBindings[key];
        if (window.saveBuy) window.saveBuy();
        changed = true;
    }
    if (bindType === "script" && window.scriptBindings && window.scriptBindings[key]) {
        delete window.scriptBindings[key];
        if (window.saveScriptBindings) window.saveScriptBindings();
        changed = true;
    }
    if (bindType === "say" && window.sayBindings && window.sayBindings[key]) {
        delete window.sayBindings[key];
        if (window.saveSayBindings) window.saveSayBindings();
        changed = true;
    }
    
    if (changed) {
        if (window.renderBindsKeyboardGrid) window.renderBindsKeyboardGrid();
        if (window.renderBindsMouseGrid) window.renderBindsMouseGrid();
        if (window.renderBindsSavedList) window.renderBindsSavedList(); 
        if (window.refreshFullExport) window.refreshFullExport();
    }
    return changed;
}

function prepareKeyForNewBind(key, newBindType, confirmMessage) {
    const existingType = getExistingBindingType(key);
    
    if (existingType === "none") return true;
    if (existingType === newBindType) return true;
    
    if (confirmMessage && !confirm(confirmMessage)) return false;
    
    removeSpecificBinding(key, existingType);
    return true;
}

// Layout Toggle Funktion - komplett überarbeitet
function toggleKeyboardLayout() {
    if (typeof deKeysRows === 'undefined' || typeof usKeysRows === 'undefined') return;
    
    if (currentLayout === "DE") {
        mainKeysRows = JSON.parse(JSON.stringify(usKeysRows)); // Tiefe Kopie
        currentLayout = "US";
    } else {
        mainKeysRows = JSON.parse(JSON.stringify(deKeysRows)); // Tiefe Kopie
        currentLayout = "DE";
    }
    
    // Alle Tastaturen neu rendern
    if (window.renderBindsKeyboardGrid) window.renderBindsKeyboardGrid();
    if (window.renderBindsMouseGrid) window.renderBindsMouseGrid();
    
    // Buttons aktualisieren
    updateLayoutButtons();
}

// Hilfsfunktion zum Aktualisieren der Layout-Buttons
function updateLayoutButtons() {
    const toggleButtons = document.querySelectorAll('.layout-toggle-btn');
    toggleButtons.forEach(btn => {
        if (currentLayout === "DE") {
            btn.innerHTML = '⌨️ DE Layout';
            btn.title = 'Zu US Layout wechseln';
        } else {
            btn.innerHTML = '🇺🇸 US Layout';
            btn.title = 'Zu DE Layout wechseln';
        }
    });
}

// Globale Exporte
window.getBindingInfo = getBindingInfo;
window.getKeyClass = getKeyClass;
window.getExistingBindingType = getExistingBindingType;
window.isKeyBound = isKeyBound;
window.removeSpecificBinding = removeSpecificBinding;
window.prepareKeyForNewBind = prepareKeyForNewBind;
window.toggleKeyboardLayout = toggleKeyboardLayout;
window.updateLayoutButtons = updateLayoutButtons;

initKeyboardLayouts();