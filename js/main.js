// ======================== DROPDOWN TAB MENÜ ========================

function initDropdownTabs() {
  // Config Dropdown
  const configBtn = document.getElementById("configDropdownBtn");
  const configDropdown = document.getElementById("configDropdownContent");

  // Analyze Dropdown
  const analyzeBtn = document.getElementById("analyzeDropdownBtn");
  const analyzeDropdown = document.getElementById("analyzeDropdownContent");

  // Info Dropdown
  const infoBtn = document.getElementById("infoDropdownBtn");
  const infoDropdown = document.getElementById("infoDropdownContent");

  // Wiki / DATENBANK Dropdown
  const wikiBtn = document.getElementById("wikiDropdownBtn");
  const wikiDropdown = document.getElementById("wikiDropdownContent");

  // Alle Dropdowns
  const dropdowns = [
    { btn: configBtn, content: configDropdown },
    { btn: analyzeBtn, content: analyzeDropdown },
    { btn: wikiBtn, content: wikiDropdown },
    { btn: infoBtn, content: infoDropdown },
  ];

  // Toggle Dropdown
  function toggleDropdown(btn, content) {
    if (!btn || !content) return;
    
    const isOpen = content.classList.contains("show");

    // Alle anderen schließen
    dropdowns.forEach((d) => {
      if (d.content && d.content !== content) {
        d.content.classList.remove("show");
        if (d.btn) d.btn.classList.remove("active-dropdown");
      }
    });

    // Aktuelles togglen
    if (!isOpen) {
      content.classList.add("show");
      btn.classList.add("active-dropdown");
    } else {
      content.classList.remove("show");
      btn.classList.remove("active-dropdown");
    }
  }

  // Event Listener für Config Dropdown
  if (configBtn && configDropdown) {
    configBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(configBtn, configDropdown);
    });
  }

  // Event Listener für Analyze Dropdown
  if (analyzeBtn && analyzeDropdown) {
    analyzeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(analyzeBtn, analyzeDropdown);
    });
  }

  // Event Listener für Wiki/DATENBANK Dropdown
  if (wikiBtn && wikiDropdown) {
    wikiBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(wikiBtn, wikiDropdown);
    });
  }

  // Event Listener für Info Dropdown
  if (infoBtn && infoDropdown) {
    infoBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(infoBtn, infoDropdown);
    });
  }

  // Tab-Wechsel innerhalb der Dropdowns
  const dropdownTabBtns = document.querySelectorAll(".dropdown-tab-btn");
  dropdownTabBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const tabId = btn.getAttribute("data-tab");
      if (tabId) {
        // Aktiviere den Tab
        document.querySelectorAll(".tab-content").forEach((tc) => tc.classList.remove("active"));
        const targetTab = document.getElementById(tabId);
        if (targetTab) targetTab.classList.add("active");

        // Aktualisiere aktive Klasse in Dropdowns
        dropdownTabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Alle Dropdowns schließen
        dropdowns.forEach((d) => {
          if (d.content) d.content.classList.remove("show");
          if (d.btn) d.btn.classList.remove("active-dropdown");
        });

        // Export aktualisieren
        if (window.refreshFullExport) window.refreshFullExport();
      }
    });
  });

  // Schließen wenn außerhalb geklickt wird
  document.addEventListener("click", (e) => {
    let isInsideDropdown = false;
    dropdowns.forEach((d) => {
      if (d.btn && (d.btn.contains(e.target) || (d.content && d.content.contains(e.target)))) {
        isInsideDropdown = true;
      }
    });

    if (!isInsideDropdown) {
      dropdowns.forEach((d) => {
        if (d.content) d.content.classList.remove("show");
        if (d.btn) d.btn.classList.remove("active-dropdown");
      });
    }
  });
}

// Initialen aktiven Tab setzen
function initActiveTab() {
  // Prüfe ob bereits ein Tab aktiv ist (durch localStorage oder Standard)
  const activeTabId = "bindsTab";
  const activeTab = document.getElementById(activeTabId);
  if (activeTab) {
    activeTab.classList.add("active");
  }

  // Setze aktive Klasse im Dropdown
  const activeBtn = document.querySelector(
    `.dropdown-tab-btn[data-tab="${activeTabId}"]`,
  );
  if (activeBtn) activeBtn.classList.add("active");
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

// Haupt-Initialisierung
function init() {
  console.log("🚀 Initialisiere CS2 Neon Armory...");

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
  if (typeof initCrosshairGenerator === "function") initCrosshairGenerator();

  // NEU: Waffenübersicht initialisieren
if (typeof initWeaponsDB === "function") initWeaponsDB();

  // Binds Tab initialisieren
  if (typeof initBindsTab === "function") initBindsTab();

  // Buy Tab initialisieren
  if (typeof initBuyTab === "function") initBuyTab();

  

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

  // NEU: Dropdown Tabs initialisieren
  initDropdownTabs();
  initActiveTab();

  // Export initial aktualisieren
  if (typeof refreshFullExport === "function") refreshFullExport();

  // Custom Config laden
  if (typeof loadCustomConfig === "function") loadCustomConfig();

  // Event-Listener für Custom Config speichern
  const saveCustomConfigBtn = document.getElementById("saveCustomConfigBtn");
  if (saveCustomConfigBtn) {
    saveCustomConfigBtn.addEventListener("click", () => {
      if (typeof saveCustomConfig === "function") saveCustomConfig();
    });
  }

  // Config SubTabs initialisieren
  initConfigSubTabs();

  console.log("✅ Initialisierung abgeschlossen!");
}

// Starte alles, wenn das DOM geladen ist
document.addEventListener("DOMContentLoaded", init);