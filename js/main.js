// ======================== INITIALISIERUNG ========================
function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".tab-content").forEach((tc) => tc.classList.remove("active"));
      document.getElementById(btn.getAttribute("data-tab")).classList.add("active");
      if (window.refreshFullExport) window.refreshFullExport();
    });
  });
}

function initConfigSubTabs() {
  const subtabs = document.querySelectorAll(".config-subtab");
  if (subtabs.length) {
    subtabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const subtab = btn.dataset.subtab;
        document.querySelectorAll(".config-subtab").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        document.querySelectorAll(".config-sub-content").forEach((c) => c.classList.remove("active"));
        document.getElementById(`config-${subtab}`).classList.add("active");
      });
    });
  }
}

function init() {
  console.log("🚀 Initialisiere CS2 Neon Studio...");
  
  // Keyboard Layouts initialisieren
  if (typeof window.initKeyboardLayouts === "function") {
    window.initKeyboardLayouts();
  }
  
  // Daten füllen
  if (typeof fillCategories === "function") fillCategories();
  if (typeof initTheme === "function") initTheme();
  
  // Buy Bindings laden
  if (typeof loadBuy === "function") loadBuy();
  if (typeof renderBuyKeyboard === "function") renderBuyKeyboard();
  if (typeof renderBuyCategories === "function") renderBuyCategories();
  
  // Say Bindings laden
  if (typeof loadSayBindings === "function") loadSayBindings();
  if (typeof renderSayKeyboard === "function") renderSayKeyboard();
  
  // Configs laden
  if (typeof renderMainCategories === "function") renderMainCategories();
  if (typeof loadGlobalConfigs === "function") loadGlobalConfigs();
  
  // Skripte laden
  if (typeof loadScriptBindings === "function") loadScriptBindings();
  if (typeof renderScriptKeyboard === "function") renderScriptKeyboard();
  if (typeof renderTemplates === "function") renderTemplates();
  
  // Startoptionen laden
  if (typeof loadStartOptions === "function") loadStartOptions();
  
  // Analyzer und Ping Test
  if (typeof initAnalyzer === "function") initAnalyzer();
  if (typeof initPingTest === "function") initPingTest();

  // Binds Tab initialisieren
  if (typeof initBindsTab === "function") initBindsTab();
  
  // Event-Listener für Buy Tab
  const saveBindingBtn = document.getElementById("saveBindingBtn");
  if (saveBindingBtn) saveBindingBtn.addEventListener("click", () => {
    if (typeof saveCurrentBinding === "function") saveCurrentBinding();
  });
  
  const unbindCurrentBtn = document.getElementById("unbindCurrentBtn");
  if (unbindCurrentBtn) unbindCurrentBtn.addEventListener("click", () => {
    if (typeof unbindCurrentKey === "function") unbindCurrentKey();
  });
  
  const resetBuyBtn = document.getElementById("resetBuyBtn");
  if (resetBuyBtn) resetBuyBtn.addEventListener("click", () => {
    if (typeof resetBuy === "function") resetBuy();
  });
  
  // Event-Listener für Say Tab
  const saveSayBindingBtn = document.getElementById("saveSayBindingBtn");
  if (saveSayBindingBtn) saveSayBindingBtn.addEventListener("click", () => {
    if (typeof saveSayBinding === "function") saveSayBinding();
  });
  
  const unbindSayKeyBtn = document.getElementById("unbindSayKeyBtn");
  if (unbindSayKeyBtn) unbindSayKeyBtn.addEventListener("click", () => {
    if (typeof unbindSayKey === "function") unbindSayKey();
  });
  
  const resetSayBindsBtn = document.getElementById("resetSayBindsBtn");
  if (resetSayBindsBtn) resetSayBindsBtn.addEventListener("click", () => {
    if (typeof resetSayBinds === "function") resetSayBinds();
  });
  
  // Event-Listener für Config Tab
  const clearAllConfigsBtn = document.getElementById("clearAllConfigsBtn");
  if (clearAllConfigsBtn) clearAllConfigsBtn.addEventListener("click", () => {
    if (typeof clearAllConfigs === "function") clearAllConfigs();
  });
  
  // Event-Listener für Skripte Tab
  const saveScriptWithKeyBtn = document.getElementById("saveScriptWithKeyBtn");
  if (saveScriptWithKeyBtn) saveScriptWithKeyBtn.addEventListener("click", () => {
    if (typeof saveScriptForCurrentKey === "function") saveScriptForCurrentKey();
  });
  
  const unbindScriptKeyBtn = document.getElementById("unbindScriptKeyBtn");
  if (unbindScriptKeyBtn) unbindScriptKeyBtn.addEventListener("click", () => {
    if (typeof unbindScriptKey === "function") unbindScriptKey();
  });
  
  const deleteSelectedScriptBtn = document.getElementById("deleteSelectedScriptBtn");
  if (deleteSelectedScriptBtn) deleteSelectedScriptBtn.addEventListener("click", () => {
    if (typeof deleteSelectedScript === "function") deleteSelectedScript();
  });
  
  // Event-Listener für Startoptionen
  const copyStartOptionsBtn = document.getElementById("copyStartOptionsBtn");
  if (copyStartOptionsBtn) copyStartOptionsBtn.addEventListener("click", () => {
    if (typeof copyStartOptionsToClipboard === "function") copyStartOptionsToClipboard();
  });
  
  const resetStartOptionsBtn = document.getElementById("resetStartOptionsBtn");
  if (resetStartOptionsBtn) resetStartOptionsBtn.addEventListener("click", () => {
    if (typeof resetStartOptionsToDefault === "function") resetStartOptionsToDefault();
  });
  
  // Event-Listener für Export
  const copyFullExportBtn = document.getElementById("copyFullExportBtn");
  if (copyFullExportBtn) copyFullExportBtn.addEventListener("click", () => {
    if (typeof copyFullExport === "function") copyFullExport();
  });
  
  const downloadFullCfgBtn = document.getElementById("downloadFullCfgBtn");
  if (downloadFullCfgBtn) downloadFullCfgBtn.addEventListener("click", () => {
    if (typeof downloadFullCfg === "function") downloadFullCfg();
  });
  
  const refreshExportBtn = document.getElementById("refreshExportBtn");
  if (refreshExportBtn) refreshExportBtn.addEventListener("click", () => {
    if (typeof refreshFullExport === "function") refreshFullExport();
  });
  
  // Keyboard Layout Toggle Buttons
  const toggleKeyboardLayoutBtn = document.getElementById("toggleKeyboardLayout");
  if (toggleKeyboardLayoutBtn) toggleKeyboardLayoutBtn.addEventListener("click", () => {
    if (typeof toggleKeyboardLayout === "function") toggleKeyboardLayout();
  });
  
  const toggleKeyboardLayoutScriptBtn = document.getElementById("toggleKeyboardLayoutScript");
  if (toggleKeyboardLayoutScriptBtn) toggleKeyboardLayoutScriptBtn.addEventListener("click", () => {
    if (typeof toggleKeyboardLayout === "function") toggleKeyboardLayout();
  });
  
  const toggleKeyboardLayoutSayBtn = document.getElementById("toggleKeyboardLayoutSay");
  if (toggleKeyboardLayoutSayBtn) toggleKeyboardLayoutSayBtn.addEventListener("click", () => {
    if (typeof toggleKeyboardLayout === "function") toggleKeyboardLayout();
  });
  
  // SubTabs und Tabs initialisieren
  if (typeof initConfigSubTabs === "function") initConfigSubTabs();
  if (typeof initTabs === "function") initTabs();
  
  // Standard-Tasten auswählen
  const allKeysList = (typeof getAllKeys === "function") ? getAllKeys() : [];
  if (allKeysList.length) {
    if (typeof selectedBuyKey === "undefined" || !selectedBuyKey || !allKeysList.includes(selectedBuyKey)) {
      window.selectedBuyKey = allKeysList[0];
    }
    if (typeof selectedScriptKey === "undefined" || !selectedScriptKey || !allKeysList.includes(selectedScriptKey)) {
      window.selectedScriptKey = allKeysList[0];
    }
    if (typeof selectedSayKey === "undefined" || !selectedSayKey || !allKeysList.includes(selectedSayKey)) {
      window.selectedSayKey = allKeysList[0];
    }
  }
  
  // Tastaturen final rendern
  if (typeof renderScriptKeyboard === "function") renderScriptKeyboard();
  if (typeof renderSayKeyboard === "function") renderSayKeyboard();
  if (typeof updateSelectedKeyDisplay === "function") updateSelectedKeyDisplay();
  if (typeof refreshFullExport === "function") refreshFullExport();
  
  console.log("✅ Initialisierung abgeschlossen!");
}

// Starte alles, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', init);