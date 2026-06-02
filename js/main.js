// ======================== INITIALISIERUNG ========================
function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document
        .querySelectorAll(".tab-content")
        .forEach((tc) => tc.classList.remove("active"));
      document
        .getElementById(btn.getAttribute("data-tab"))
        .classList.add("active");
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
        document
          .querySelectorAll(".config-subtab")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        document
          .querySelectorAll(".config-sub-content")
          .forEach((c) => c.classList.remove("active"));
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

  // Configs laden
  if (typeof renderMainCategories === "function") renderMainCategories();
  if (typeof loadGlobalConfigs === "function") loadGlobalConfigs();

  // Startoptionen laden
  if (typeof loadStartOptions === "function") loadStartOptions();

  // Analyzer und Ping Test
  if (typeof initAnalyzer === "function") initAnalyzer();
  if (typeof initPingTest === "function") initPingTest();

  // Binds Tab initialisieren (enthält bereits Buy, Say, Script)
  if (typeof initBindsTab === "function") initBindsTab();

  // Event-Listener für Config Tab
  const clearAllConfigsBtn = document.getElementById("clearAllConfigsBtn");
  if (clearAllConfigsBtn)
    clearAllConfigsBtn.addEventListener("click", () => {
      if (typeof clearAllConfigs === "function") clearAllConfigs();
    });

  // Event-Listener für Startoptionen
  const copyStartOptionsBtn = document.getElementById("copyStartOptionsBtn");
  if (copyStartOptionsBtn)
    copyStartOptionsBtn.addEventListener("click", () => {
      if (typeof copyStartOptionsToClipboard === "function")
        copyStartOptionsToClipboard();
    });

  const resetStartOptionsBtn = document.getElementById("resetStartOptionsBtn");
  if (resetStartOptionsBtn)
    resetStartOptionsBtn.addEventListener("click", () => {
      if (typeof resetStartOptionsToDefault === "function")
        resetStartOptionsToDefault();
    });

  // Event-Listener für Export
  const copyFullExportBtn = document.getElementById("copyFullExportBtn");
  if (copyFullExportBtn)
    copyFullExportBtn.addEventListener("click", () => {
      if (typeof copyFullExport === "function") copyFullExport();
    });

  const downloadFullCfgBtn = document.getElementById("downloadFullCfgBtn");
  if (downloadFullCfgBtn)
    downloadFullCfgBtn.addEventListener("click", () => {
      if (typeof downloadFullCfg === "function") downloadFullCfg();
    });

  const refreshExportBtn = document.getElementById("refreshExportBtn");
  if (refreshExportBtn)
    refreshExportBtn.addEventListener("click", () => {
      if (typeof refreshFullExport === "function") refreshFullExport();
    });

  // SubTabs und Tabs initialisieren
  if (typeof initConfigSubTabs === "function") initConfigSubTabs();
  if (typeof initTabs === "function") initTabs();

  // Export initial aktualisieren
  if (typeof refreshFullExport === "function") refreshFullExport();

  console.log("✅ Initialisierung abgeschlossen!");
}

// Starte alles, wenn das DOM geladen ist
document.addEventListener("DOMContentLoaded", init);
