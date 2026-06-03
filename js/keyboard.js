// ======================== TASTATUR LAYOUT & GEMEINSAME FUNKTIONEN ========================
let currentLayout = "DE";
let mainKeysRows = [];

// Layout-Konfiguration mit Anzeigenamen
const layoutConfig = {
  DE: {
    rows: deKeysRows,
    displayName: "DE Layout",
    buttonText: "⌨️ DE Layout",
    buttonTitle: "Zu US Layout wechseln",
  },
  US: {
    rows: usKeysRows,
    displayName: "US Layout",
    buttonText: "🇺🇸 US Layout",
    buttonTitle: "Zu RU Layout wechseln",
  },
  RU: {
    rows: ruKeysRows,
    displayName: "RU Layout (ЙЦУКЕН)",
    buttonText: "🇷🇺 RU Layout",
    buttonTitle: "Zu DE Layout wechseln",
  },
};

// Layout-Reihenfolge für Toggle
const layoutOrder = ["DE", "US", "RU"];

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

// ZENTRALE FUNKTION: Prüft, welche Bindung eine Taste hat
function getBindingInfo(key) {
  const hasBuy = window.buyBindings && window.buyBindings[key];
  const hasScript = window.scriptBindings && window.scriptBindings[key];
  const hasSay = window.sayBindings && window.sayBindings[key];

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
  if (
    bindType === "script" &&
    window.scriptBindings &&
    window.scriptBindings[key]
  ) {
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

// Get next layout in cycle
function getNextLayout() {
  const currentIndex = layoutOrder.indexOf(currentLayout);
  const nextIndex = (currentIndex + 1) % layoutOrder.length;
  return layoutOrder[nextIndex];
}

// Layout Toggle Funktion - durchläuft DE → US → RU → DE
function toggleKeyboardLayout() {
  // Prüfe ob die Layout-Daten verfügbar sind
  if (
    typeof deKeysRows === "undefined" ||
    typeof usKeysRows === "undefined" ||
    typeof ruKeysRows === "undefined"
  ) {
    console.warn("Layout-Daten nicht verfügbar");
    return;
  }

  const nextLayout = getNextLayout();
  console.log("Wechsle von", currentLayout, "zu", nextLayout);

  // Lade das entsprechende Layout
  if (nextLayout === "DE") {
    mainKeysRows = JSON.parse(JSON.stringify(deKeysRows));
    currentLayout = "DE";
  } else if (nextLayout === "US") {
    mainKeysRows = JSON.parse(JSON.stringify(usKeysRows));
    currentLayout = "US";
  } else if (nextLayout === "RU") {
    mainKeysRows = JSON.parse(JSON.stringify(ruKeysRows));
    currentLayout = "RU";
  }

  console.log("Layout gewechselt zu:", currentLayout);
  console.log("Erste Zeile neue Tasten:", mainKeysRows[0]);

  // Buttons aktualisieren
  updateLayoutButtons();
}

// Set specific layout directly
function setKeyboardLayout(layout) {
  if (layout !== "DE" && layout !== "US" && layout !== "RU") return;
  if (
    typeof deKeysRows === "undefined" ||
    typeof usKeysRows === "undefined" ||
    typeof ruKeysRows === "undefined"
  )
    return;

  if (layout === "DE") {
    mainKeysRows = JSON.parse(JSON.stringify(deKeysRows));
    currentLayout = "DE";
  } else if (layout === "US") {
    mainKeysRows = JSON.parse(JSON.stringify(usKeysRows));
    currentLayout = "US";
  } else if (layout === "RU") {
    mainKeysRows = JSON.parse(JSON.stringify(ruKeysRows));
    currentLayout = "RU";
  }

  if (window.renderBindsKeyboardGrid) window.renderBindsKeyboardGrid();
  if (window.renderBindsMouseGrid) window.renderBindsMouseGrid();
  updateLayoutButtons();
}

// Hilfsfunktion zum Aktualisieren der Layout-Buttons
function updateLayoutButtons() {
  const toggleButtons = document.querySelectorAll(".layout-toggle-btn");
  const config = layoutConfig[currentLayout];
  const nextLayout = getNextLayout();
  const nextConfig = layoutConfig[nextLayout];

  toggleButtons.forEach((btn) => {
    if (currentLayout === "DE") {
      btn.innerHTML = "⌨️ DE Layout → 🇺🇸";
      btn.title = "Zu US Layout wechseln";
    } else if (currentLayout === "US") {
      btn.innerHTML = "🇺🇸 US Layout → 🇷🇺";
      btn.title = "Zu RU Layout wechseln";
    } else if (currentLayout === "RU") {
      btn.innerHTML = "🇷🇺 RU Layout → ⌨️";
      btn.title = "Zu DE Layout wechseln";
    }
  });
}

// Hole den Anzeigenamen für eine NumPad-Taste
function getNumpadDisplayName(key) {
  if (typeof numpadDisplayNames !== "undefined" && numpadDisplayNames[key]) {
    return numpadDisplayNames[key];
  }
  // Fallback: extrahiere die Zahl aus KP_X
  const match = key.match(/KP_(\d+)/);
  if (match) return match[1];
  // Sonderfälle
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
