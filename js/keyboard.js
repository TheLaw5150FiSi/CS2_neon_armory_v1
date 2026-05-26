// ======================== TASTATUR LAYOUT & GEMEINSAME FUNKTIONEN ========================
let currentLayout = "DE";
let mainKeysRows = [...deKeysRows];

function getAllKeys() {
  return [...mainKeysRows.flat(), ...numpadKeys];
}

function getKeyClass(key) {
  const hasBuy = window.buyBindings && window.buyBindings[key];
  const hasScript = window.scriptBindings && window.scriptBindings[key];
  const hasSay = window.sayBindings && window.sayBindings[key];
  if (hasBuy) return "bound-buy";
  if (hasScript) return "bound-script";
  if (hasSay) return "bound-say";
  return "";
}

function toggleKeyboardLayout() {
  if (currentLayout === "DE") {
    mainKeysRows = [...usKeysRows];
    currentLayout = "US";
    document.getElementById("toggleKeyboardLayout").innerHTML = "🇺🇸 US Layout";
    document.getElementById("toggleKeyboardLayoutScript").innerHTML = "🇺🇸 US Layout";
    if (document.getElementById("toggleKeyboardLayoutSay"))
      document.getElementById("toggleKeyboardLayoutSay").innerHTML = "🇺🇸 US Layout";
  } else {
    mainKeysRows = [...deKeysRows];
    currentLayout = "DE";
    document.getElementById("toggleKeyboardLayout").innerHTML = "⌨️ DE Layout";
    document.getElementById("toggleKeyboardLayoutScript").innerHTML = "⌨️ DE Layout";
    if (document.getElementById("toggleKeyboardLayoutSay"))
      document.getElementById("toggleKeyboardLayoutSay").innerHTML = "⌨️ DE Layout";
  }
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderScriptKeyboard) window.renderScriptKeyboard();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
}