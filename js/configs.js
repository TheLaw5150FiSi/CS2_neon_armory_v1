// ======================== CONFIGS ========================
let globalConfigCommands = [];
let configMetadata = [];
let currentPreset = null;
let currentMainCat = null, currentSubCat = null;

function fillCategories() {
  for (let mainCat in configCategories) {
    for (let subCat of configCategories[mainCat].subcats) {
      configCategories[mainCat].commands[subCat] = allCommandsLibrary[subCat] || [];
    }
  }
}

function loadGlobalConfigs() {
  let stored = localStorage.getItem("cs2_neon_global_configs");
  if (stored) {
    let data = JSON.parse(stored);
    globalConfigCommands = data.commands || [];
    configMetadata = data.metadata || [];
    currentPreset = data.currentPreset || null;
  }
  renderSavedConfigsList();
  if (window.refreshFullExport) window.refreshFullExport();
  renderPresetsTab();
}

function saveGlobalConfigs() {
  localStorage.setItem("cs2_neon_global_configs", JSON.stringify({
    commands: globalConfigCommands,
    metadata: configMetadata,
    currentPreset: currentPreset
  }));
  renderSavedConfigsList();
  if (window.refreshFullExport) window.refreshFullExport();
  renderPresetsTab();
}

function renderPresetsTab() {
  const container = document.getElementById("presetsGrid");
  if (!container) return;
  container.innerHTML = "";
  presetsList.forEach((preset) => {
    const card = document.createElement("div");
    card.className = "preset-card";
    if (currentPreset === preset.key) card.classList.add("active-preset-card");
    card.innerHTML = `<h3>${preset.name}</h3><p>${preset.desc}</p><span class="preset-badge">${preset.badge}</span>`;
    card.onclick = () => togglePreset(preset.key);
    container.appendChild(card);
  });
}

function togglePreset(presetKey) {
  const preset = presetsList.find((p) => p.key === presetKey);
  if (!preset) return;
  if (currentPreset === presetKey) {
    if (confirm(`Preset "${preset.name}" entfernen?`)) {
      globalConfigCommands = [];
      configMetadata = [];
      currentPreset = null;
      saveGlobalConfigs();
      alert(`✅ Preset entfernt!`);
      if (currentMainCat && currentSubCat) renderCommands(currentMainCat, currentSubCat);
      renderPresetsTab();
    }
  } else {
    if (confirm(`Preset "${preset.name}" laden?`)) {
      globalConfigCommands = [...preset.commands];
      configMetadata = [];
      for (let cmd of preset.commands) {
        let cmdName = cmd.split(" ")[0];
        let foundCat = "🎨 Video & Grafik", foundSub = "Auflösung & Display";
        for (let mc in configCategories) {
          for (let sc of configCategories[mc].subcats) {
            let cmdList = allCommandsLibrary[sc] || [];
            if (cmdList.some((c) => c.cmd === cmdName)) {
              foundCat = mc;
              foundSub = sc;
              break;
            }
          }
        }
        configMetadata.push({ command: cmd, mainCat: foundCat, subCat: foundSub });
      }
      currentPreset = presetKey;
      saveGlobalConfigs();
      alert(`✅ Preset geladen!`);
      if (currentMainCat && currentSubCat) renderCommands(currentMainCat, currentSubCat);
      renderPresetsTab();
    }
  }
}

function addConfigDirectly(cmdString, mainCat, subCat) {
  if (cmdString && !globalConfigCommands.includes(cmdString)) {
    globalConfigCommands.push(cmdString);
    configMetadata.push({ command: cmdString, mainCat: mainCat, subCat: subCat });
    if (currentPreset) {
      currentPreset = null;
      saveGlobalConfigs();
      renderPresetsTab();
    } else saveGlobalConfigs();
    return true;
  }
  return false;
}

function removeConfigByCommand(cmdString) {
  const index = globalConfigCommands.indexOf(cmdString);
  if (index !== -1) {
    globalConfigCommands.splice(index, 1);
    configMetadata.splice(index, 1);
    if (currentPreset) {
      currentPreset = null;
      saveGlobalConfigs();
      renderPresetsTab();
    } else saveGlobalConfigs();
    return true;
  }
  return false;
}

function clearAllConfigs() {
  if (confirm("Alle Config-Befehle löschen?")) {
    globalConfigCommands = [];
    configMetadata = [];
    currentPreset = null;
    saveGlobalConfigs();
    renderPresetsTab();
    if (currentMainCat && currentSubCat) renderCommands(currentMainCat, currentSubCat);
  }
}

function renderSavedConfigsList() {
  let container = document.getElementById("savedConfigsList");
  if (!container) return;
  container.innerHTML = "";
  if (globalConfigCommands.length === 0) {
    container.innerHTML = '<div class="empty-message">📭 Keine Config-Befehle gespeichert</div>';
    return;
  }
  globalConfigCommands.forEach((cmd, idx) => {
    let entry = document.createElement("div");
    entry.className = "bind-entry";
    entry.innerHTML = `<span class="bind-command">${cmd}</span> <span style="color:var(--accent-light); float:right; cursor:pointer;" onclick="window.removeConfigCommand(${idx})">[x]</span>`;
    container.appendChild(entry);
  });
}

window.removeConfigCommand = (idx) => {
  globalConfigCommands.splice(idx, 1);
  configMetadata.splice(idx, 1);
  if (currentPreset) {
    currentPreset = null;
    saveGlobalConfigs();
    renderPresetsTab();
  } else saveGlobalConfigs();
  if (window.refreshFullExport) window.refreshFullExport();
  if (currentMainCat && currentSubCat) renderCommands(currentMainCat, currentSubCat);
};

function renderMainCategories() {
  const container = document.getElementById("mainCategoriesContainer");
  if (!container) return;
  container.innerHTML = "";
  for (let mainCatName of Object.keys(configCategories)) {
    let btn = document.createElement("div");
    btn.className = "main-cat-btn";
    btn.textContent = mainCatName;
    btn.onclick = () => {
      document.querySelectorAll(".main-cat-btn").forEach((b) => b.classList.remove("active-main"));
      btn.classList.add("active-main");
      currentMainCat = mainCatName;
      currentSubCat = null;
      renderSubcategories(mainCatName);
    };
    container.appendChild(btn);
  }
}

function renderSubcategories(mainCatName) {
  const subContainer = document.getElementById("subcategoriesContainer");
  const commandsContainer = document.getElementById("commandsContainer");
  if (!subContainer || !commandsContainer) return;
  const catData = configCategories[mainCatName];
  if (!catData) return;
  subContainer.innerHTML = "";
  let subButtonsDiv = document.createElement("div");
  subButtonsDiv.className = "subcat-buttons visible";
  catData.subcats.forEach((sub) => {
    let btn = document.createElement("div");
    btn.className = "subcat-btn";
    btn.textContent = sub;
    btn.onclick = () => {
      document.querySelectorAll(".subcat-btn").forEach((b) => b.classList.remove("active-subcat"));
      btn.classList.add("active-subcat");
      currentSubCat = sub;
      renderCommands(mainCatName, sub);
    };
    subButtonsDiv.appendChild(btn);
  });
  subContainer.appendChild(subButtonsDiv);
  commandsContainer.innerHTML = "";
}

function isCommandInConfig(cmdString) {
  return globalConfigCommands.includes(cmdString);
}

function renderCommands(mainCatName, subCatName) {
  const commandsContainer = document.getElementById("commandsContainer");
  if (!commandsContainer) return;
  const catData = configCategories[mainCatName];
  if (!catData || !catData.commands[subCatName]) return;
  let commandsList = catData.commands[subCatName];
  let gridDiv = document.createElement("div");
  gridDiv.className = "config-grid visible";
  commandsList.forEach((cf) => {
    let item = document.createElement("div");
    item.className = "config-item";
    let selectHtml = "";
    let defaultVal = cf.values[0];
    if (cf.values && cf.values.length > 0) {
      selectHtml = `<select class="config-select" data-cmd="${cf.cmd}">`;
      cf.values.forEach((val) => { selectHtml += `<option value="${val}">${val}</option>`; });
      selectHtml += `</select>`;
    }
    item.innerHTML = `<div class="config-item-header"><div class="config-info"><div class="config-cmd">${cf.cmd}</div><div class="config-desc">${cf.desc}</div></div><button class="takeover-btn">📋 Übernehmen</button></div>${selectHtml}<div class="config-preview">${cf.cmd} ${defaultVal}</div>`;
    const select = item.querySelector(".config-select");
    const preview = item.querySelector(".config-preview");
    const takeoverBtn = item.querySelector(".takeover-btn");
    
    function updateButtonState() {
      let finalCmd = cf.cmd;
      let selectedVal = defaultVal;
      if (select) { selectedVal = select.value; finalCmd = `${cf.cmd} ${selectedVal}`; }
      if (isCommandInConfig(finalCmd)) {
        takeoverBtn.classList.add("success");
        takeoverBtn.innerHTML = "✓ Abgeschlossen";
      } else {
        takeoverBtn.classList.remove("success");
        takeoverBtn.innerHTML = "📋 Übernehmen";
      }
    }
    
    if (select) {
      select.addEventListener("change", (e) => {
        preview.textContent = `${cf.cmd} ${e.target.value}`;
        updateButtonState();
      });
    }
    
    takeoverBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let finalCmd = cf.cmd;
      let selectedVal = defaultVal;
      if (select) { selectedVal = select.value; finalCmd = `${cf.cmd} ${selectedVal}`; }
      if (isCommandInConfig(finalCmd)) {
        if (confirm(`"${finalCmd}" entfernen?`)) {
          removeConfigByCommand(finalCmd);
          updateButtonState();
          takeoverBtn.innerHTML = "🗑 Gelöscht!";
          setTimeout(() => updateButtonState(), 800);
        }
      } else {
        addConfigDirectly(finalCmd, mainCatName, subCatName);
        updateButtonState();
        takeoverBtn.innerHTML = "✓ Gespeichert!";
        setTimeout(() => updateButtonState(), 800);
      }
    });
    
    item.addEventListener("click", (e) => {
      if (e.target !== takeoverBtn && e.target.tagName !== "SELECT") {
        let finalCmd = cf.cmd;
        let selectedVal = defaultVal;
        if (select) { selectedVal = select.value; finalCmd = `${cf.cmd} ${selectedVal}`; }
        if (isCommandInConfig(finalCmd)) {
          if (confirm(`"${finalCmd}" entfernen?`)) {
            removeConfigByCommand(finalCmd);
            updateButtonState();
          }
        } else {
          addConfigDirectly(finalCmd, mainCatName, subCatName);
          updateButtonState();
          takeoverBtn.innerHTML = "✓ Gespeichert!";
          setTimeout(() => updateButtonState(), 800);
        }
      }
    });
    updateButtonState();
    gridDiv.appendChild(item);
  });
  commandsContainer.innerHTML = "";
  commandsContainer.appendChild(gridDiv);
}