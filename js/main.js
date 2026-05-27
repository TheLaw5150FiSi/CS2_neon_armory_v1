// ======================== INITIALISIERUNG ========================
function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".tab-content").forEach((tc) => tc.classList.remove("active"));
      document.getElementById(btn.getAttribute("data-tab")).classList.add("active");
      refreshFullExport();
    });
  });
}

function initConfigSubTabs() {
  document.querySelectorAll(".config-subtab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const subtab = btn.dataset.subtab;
      document.querySelectorAll(".config-subtab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".config-sub-content").forEach((c) => c.classList.remove("active"));
      document.getElementById(`config-${subtab}`).classList.add("active");
    });
  });
}

function init() {
  fillCategories();
  initTheme();
  loadBuy();
  renderBuyKeyboard();
  renderBuyCategories();
  loadSayBindings();
  renderSayKeyboard();
  
  document.getElementById("saveBindingBtn")?.addEventListener("click", saveCurrentBinding);
  document.getElementById("unbindCurrentBtn")?.addEventListener("click", unbindCurrentKey);
  document.getElementById("resetBuyBtn")?.addEventListener("click", resetBuy);
  document.getElementById("saveSayBindingBtn")?.addEventListener("click", saveSayBinding);
  document.getElementById("unbindSayKeyBtn")?.addEventListener("click", unbindSayKey);
  document.getElementById("resetSayBindsBtn")?.addEventListener("click", resetSayBinds);
  
  renderMainCategories();
  document.getElementById("clearAllConfigsBtn")?.addEventListener("click", clearAllConfigs);
  loadGlobalConfigs();
  loadScriptBindings();
  renderScriptKeyboard();
  renderTemplates();
  
  document.getElementById("saveScriptWithKeyBtn")?.addEventListener("click", saveScriptForCurrentKey);
  document.getElementById("unbindScriptKeyBtn")?.addEventListener("click", unbindScriptKey);
  document.getElementById("deleteSelectedScriptBtn")?.addEventListener("click", deleteSelectedScript);
  
  loadStartOptions();
  document.getElementById("copyStartOptionsBtn")?.addEventListener("click", copyStartOptionsToClipboard);
  document.getElementById("resetStartOptionsBtn")?.addEventListener("click", resetStartOptionsToDefault);
  document.getElementById("copyFullExportBtn")?.addEventListener("click", copyFullExport);
  document.getElementById("downloadFullCfgBtn")?.addEventListener("click", downloadFullCfg);
  document.getElementById("refreshExportBtn")?.addEventListener("click", refreshFullExport);
  
  document.getElementById("toggleKeyboardLayout")?.addEventListener("click", toggleKeyboardLayout);
  document.getElementById("toggleKeyboardLayoutScript")?.addEventListener("click", toggleKeyboardLayout);
  if (document.getElementById("toggleKeyboardLayoutSay")) {
    document.getElementById("toggleKeyboardLayoutSay").addEventListener("click", toggleKeyboardLayout);
  }
  
  initConfigSubTabs();
  initTabs();
  initAnalyzer();
  initPingTest();
  
  const allKeysList = getAllKeys();
  if (allKeysList.length) {
    if (!selectedBuyKey || !allKeysList.includes(selectedBuyKey)) selectedBuyKey = allKeysList[0];
    renderBuyKeyboard();
  }
  if (!selectedScriptKey || !allKeysList.includes(selectedScriptKey)) selectedScriptKey = allKeysList[0];
  if (!selectedSayKey || !allKeysList.includes(selectedSayKey)) selectedSayKey = allKeysList[0];
  
  renderScriptKeyboard();
  renderSayKeyboard();
  updateSelectedKeyDisplay();
  updateSaySelectedKeyDisplay();
  refreshFullExport();
}

// Starte alles, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', init);