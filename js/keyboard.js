// ======================== TASTATUR LAYOUT & GEMEINSAME FUNKTIONEN ========================
let currentLayout = "DE";
let mainKeysRows = [];

// Layout-Konfiguration mit Anzeigenamen
const layoutConfig = {
  DE: {
    rows: deKeysRows,
    displayName: "DE Layout",
  },
  US: {
    rows: usKeysRows,
    displayName: "US Layout",
  },
};

// Layout-Reihenfolge für Toggle
const layoutOrder = ["DE", "US"];

function initKeyboardLayouts() {
  if (typeof deKeysRows !== "undefined") {
    mainKeysRows = [...deKeysRows];
    currentLayout = "DE";
  }
}

function getAllKeys() {
  const numpad = typeof numpadKeys !== "undefined" ? numpadKeys : [];
  return [...mainKeysRows.flat(), ...numpad];
}

// ZENTRALE FUNKTION: Prüft, welche Bindung eine Taste hat (inkl. Default)
function getBindingInfo(key) {
  // Normalisiere den Key für den Vergleich
  let normalizedKey = key.toLowerCase();
  
  const hasBuy = window.buyBindings && (window.buyBindings[key] || window.buyBindings[normalizedKey]);
  const hasScript = window.scriptBindings && (window.scriptBindings[key] || window.scriptBindings[normalizedKey]);
  const hasSay = window.sayBindings && (window.sayBindings[key] || window.sayBindings[normalizedKey]);
  const hasDefault = window.isCs2DefaultBind ? window.isCs2DefaultBind(key) : false;

  // Priorität: Benutzerdefinierte Bindings überschreiben Default
  if (hasBuy) return { type: "buy", class: "bound-buy" };
  if (hasScript) return { type: "script", class: "bound-script" };
  if (hasSay) return { type: "say", class: "bound-say" };
  if (hasDefault) return { type: "default", class: "bound-default" };
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
  let normalizedKey = key.toLowerCase();

  if (bindType === "buy" && window.buyBindings && (window.buyBindings[key] || window.buyBindings[normalizedKey])) {
    delete window.buyBindings[key];
    delete window.buyBindings[normalizedKey];
    if (window.saveBuy) window.saveBuy();
    changed = true;
  }
  if (bindType === "script" && window.scriptBindings && (window.scriptBindings[key] || window.scriptBindings[normalizedKey])) {
    delete window.scriptBindings[key];
    delete window.scriptBindings[normalizedKey];
    if (window.saveScriptBindings) window.saveScriptBindings();
    changed = true;
  }
  if (bindType === "say" && window.sayBindings && (window.sayBindings[key] || window.sayBindings[normalizedKey])) {
    delete window.sayBindings[key];
    delete window.sayBindings[normalizedKey];
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

// Get next layout in cycle (nur DE und US)
function getNextLayout() {
  const currentIndex = layoutOrder.indexOf(currentLayout);
  const nextIndex = (currentIndex + 1) % layoutOrder.length;
  return layoutOrder[nextIndex];
}

// Layout Toggle Funktion - durchläuft DE → US → DE
function toggleKeyboardLayout() {
  if (
    typeof deKeysRows === "undefined" ||
    typeof usKeysRows === "undefined"
  ) {
    console.warn("Layout-Daten nicht verfügbar");
    return;
  }

  const nextLayout = getNextLayout();
  console.log("Wechsle von", currentLayout, "zu", nextLayout);

  if (nextLayout === "DE") {
    mainKeysRows = JSON.parse(JSON.stringify(deKeysRows));
    currentLayout = "DE";
  } else if (nextLayout === "US") {
    mainKeysRows = JSON.parse(JSON.stringify(usKeysRows));
    currentLayout = "US";
  }

  console.log("Layout gewechselt zu:", currentLayout);

  updateLayoutButtons();
}

// Set specific layout directly
function setKeyboardLayout(layout) {
  if (layout !== "DE" && layout !== "US") return;
  if (typeof deKeysRows === "undefined" || typeof usKeysRows === "undefined") return;

  if (layout === "DE") {
    mainKeysRows = JSON.parse(JSON.stringify(deKeysRows));
    currentLayout = "DE";
  } else if (layout === "US") {
    mainKeysRows = JSON.parse(JSON.stringify(usKeysRows));
    currentLayout = "US";
  }

  if (window.renderBindsKeyboardGrid) window.renderBindsKeyboardGrid();
  if (window.renderBindsMouseGrid) window.renderBindsMouseGrid();
  updateLayoutButtons();
}

// Hilfsfunktion zum Aktualisieren der Layout-Buttons
function updateLayoutButtons() {
  const toggleButtons = document.querySelectorAll(".layout-toggle-btn");
  
  toggleButtons.forEach((btn) => {
    if (currentLayout === "DE") {
      btn.innerHTML = "⌨️ DE Layout → 🇺🇸";
      btn.title = "Zu US Layout wechseln";
    } else if (currentLayout === "US") {
      btn.innerHTML = "🇺🇸 US Layout → ⌨️";
      btn.title = "Zu DE Layout wechseln";
    }
  });
}

// Hole den Anzeigenamen für eine NumPad-Taste
function getNumpadDisplayName(key) {
  if (typeof numpadDisplayNames !== "undefined" && numpadDisplayNames[key]) {
    return numpadDisplayNames[key];
  }
  const match = key.match(/KP_(\d+)/);
  if (match) return match[1];
  if (key === "KP_PLUS") return "+";
  if (key === "KP_MINUS") return "-";
  if (key === "KP_SLASH") return "/";
  if (key === "KP_STAR") return "*";
  if (key === "KP_ENTER") return "Enter";
  if (key === "KP_DEL") return ".";
  return key.replace("KP_", "");
}

// Globale Exporte
window.getBindingInfo = getBindingInfo;
window.getKeyClass = getKeyClass;
window.getExistingBindingType = getExistingBindingType;
window.isKeyBound = isKeyBound;
window.removeSpecificBinding = removeSpecificBinding;
window.prepareKeyForNewBind = prepareKeyForNewBind;
window.toggleKeyboardLayout = toggleKeyboardLayout;
window.setKeyboardLayout = setKeyboardLayout;
window.updateLayoutButtons = updateLayoutButtons;
window.getNumpadDisplayName = getNumpadDisplayName;
window.layoutConfig = layoutConfig;
window.layoutOrder = layoutOrder;

initKeyboardLayouts();