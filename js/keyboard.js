// ======================== TASTATUR LAYOUT & GEMEINSAME FUNKTIONEN ========================
let currentLayout = "DE";
let mainKeysRows = [];

function initKeyboardLayouts() {
    if (typeof deKeysRows !== 'undefined') {
        mainKeysRows = [...deKeysRows];
    }
}

function getAllKeys() {
    const numpad = (typeof numpadKeys !== 'undefined') ? numpadKeys : [];
    return [...mainKeysRows.flat(), ...numpad];
}

// ZENTRALE FUNKTION: Prüft, welche Bindung eine Taste hat (DIREKTER ZUGRIFF auf die globalen Objekte)
function getBindingInfo(key) {
    // Direkter Zugriff auf die globalen Variablen
    const hasBuy = (window.buyBindings && window.buyBindings[key]);
    const hasScript = (window.scriptBindings && window.scriptBindings[key]);
    const hasSay = (window.sayBindings && window.sayBindings[key]);
    
    // Priorität: Buy > Script > Say (nur einer wird zurückgegeben)
    if (hasBuy) return { type: "buy", class: "bound-buy" };
    if (hasScript) return { type: "script", class: "bound-script" };
    if (hasSay) return { type: "say", class: "bound-say" };
    return { type: "none", class: "" };
}

function getKeyClass(key) {
    return getBindingInfo(key).class;
}

// ZENTRALE FUNKTION: Holt den Typ der bestehenden Bindung
function getExistingBindingType(key) {
    return getBindingInfo(key).type;
}

// ZENTRALE FUNKTION: Prüft ob Taste bereits belegt ist
function isKeyBound(key) {
    return getBindingInfo(key).type !== "none";
}

// ZENTRALE FUNKTION: Entfernt eine spezifische Bindung von einer Taste
function removeSpecificBinding(key, bindType) {
    let changed = false;
    
    if (bindType === "buy" && window.buyBindings && window.buyBindings[key]) {
        delete window.buyBindings[key];
        if (window.saveBuy) window.saveBuy();
        changed = true;
        console.log(`[DEBUG] Buy-Bindung für ${key} entfernt`);
    }
    if (bindType === "script" && window.scriptBindings && window.scriptBindings[key]) {
        delete window.scriptBindings[key];
        if (window.saveScriptBindings) window.saveScriptBindings();
        changed = true;
        console.log(`[DEBUG] Script-Bindung für ${key} entfernt`);
    }
    if (bindType === "say" && window.sayBindings && window.sayBindings[key]) {
        delete window.sayBindings[key];
        if (window.saveSayBindings) window.saveSayBindings();
        changed = true;
        console.log(`[DEBUG] Say-Bindung für ${key} entfernt`);
    }
    
    if (changed) {
        // Alle Tastaturen neu rendern
        if (window.renderBuyKeyboard) window.renderBuyKeyboard();
        if (window.renderScriptKeyboard) window.renderScriptKeyboard();
        if (window.renderSayKeyboard) window.renderSayKeyboard();
        if (window.renderBindsSavedList) window.renderBindsSavedList(); 
        if (window.refreshFullExport) window.refreshFullExport();
    }
    return changed;
}

// ZENTRALE FUNKTION: Prüft und fragt vor dem Speichern eines neuen Binds
function prepareKeyForNewBind(key, newBindType, confirmMessage) {
    const existingType = getExistingBindingType(key);
    
    if (existingType === "none") {
        return true;
    }
    
    if (existingType === newBindType) {
        return true;
    }
    
    if (confirmMessage && !confirm(confirmMessage)) {
        return false;
    }
    
    removeSpecificBinding(key, existingType);
    return true;
}

function toggleKeyboardLayout() {
    if (typeof deKeysRows === 'undefined' || typeof usKeysRows === 'undefined') return;
    
    if (currentLayout === "DE") {
        mainKeysRows = [...usKeysRows];
        currentLayout = "US";
        const toggleBuy = document.getElementById("toggleKeyboardLayout");
        const toggleScript = document.getElementById("toggleKeyboardLayoutScript");
        const toggleSay = document.getElementById("toggleKeyboardLayoutSay");
        if (toggleBuy) toggleBuy.innerHTML = "🇺🇸 US Layout";
        if (toggleScript) toggleScript.innerHTML = "🇺🇸 US Layout";
        if (toggleSay) toggleSay.innerHTML = "🇺🇸 US Layout";
    } else {
        mainKeysRows = [...deKeysRows];
        currentLayout = "DE";
        const toggleBuy = document.getElementById("toggleKeyboardLayout");
        const toggleScript = document.getElementById("toggleKeyboardLayoutScript");
        const toggleSay = document.getElementById("toggleKeyboardLayoutSay");
        if (toggleBuy) toggleBuy.innerHTML = "⌨️ DE Layout";
        if (toggleScript) toggleScript.innerHTML = "⌨️ DE Layout";
        if (toggleSay) toggleSay.innerHTML = "⌨️ DE Layout";
    }
    if (window.renderBuyKeyboard) window.renderBuyKeyboard();
    if (window.renderScriptKeyboard) window.renderScriptKeyboard();
    if (window.renderSayKeyboard) window.renderSayKeyboard();
}

// Globale Exporte
window.getBindingInfo = getBindingInfo;
window.getKeyClass = getKeyClass;
window.getExistingBindingType = getExistingBindingType;
window.isKeyBound = isKeyBound;
window.removeSpecificBinding = removeSpecificBinding;
window.prepareKeyForNewBind = prepareKeyForNewBind;
window.toggleKeyboardLayout = toggleKeyboardLayout;

initKeyboardLayouts();