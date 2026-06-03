// ======================== CONFIGS ========================
let globalConfigCommands = [];
let configMetadata = [];
let currentPreset = null;
let currentMainCat = null;

function fillCategories() {
  // Die Subkategorien entfallen - alle Befehle einer Hauptkategorie werden direkt zugeordnet
  for (let mainCat in configCategories) {
    // Sammle alle Befehle aus allen Subkategorien dieser Hauptkategorie
    let allCommands = [];
    for (let subCat of configCategories[mainCat].subcats) {
      if (allCommandsLibrary[subCat]) {
        allCommands.push(...allCommandsLibrary[subCat]);
      }
    }
    configCategories[mainCat].commands = allCommands;
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
  localStorage.setItem(
    "cs2_neon_global_configs",
    JSON.stringify({
      commands: globalConfigCommands,
      metadata: configMetadata,
      currentPreset: currentPreset,
    }),
  );
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
      if (currentMainCat) {
        renderCommands(currentMainCat);
      }
      renderPresetsTab();
      if (window.refreshFullExport) window.refreshFullExport();
    }
  } else {
    if (confirm(`Preset "${preset.name}" laden?`)) {
      globalConfigCommands = [...preset.commands];
      configMetadata = [];
      for (let cmd of preset.commands) {
        let cmdName = cmd.split(" ")[0];
        let foundCat = "🎨 Video & Grafik";
        for (let mc in configCategories) {
          let cmdList = configCategories[mc].commands || [];
          if (cmdList.some((c) => c.cmd === cmdName)) {
            foundCat = mc;
            break;
          }
        }
        configMetadata.push({ command: cmd, mainCat: foundCat });
      }
      currentPreset = presetKey;
      saveGlobalConfigs();
      alert(`✅ Preset geladen!`);
      
      // Aktualisiere die aktuelle Kategorie-Ansicht
      if (currentMainCat) {
        renderCommands(currentMainCat);
      } else if (Object.keys(configCategories).length > 0) {
        const firstCat = Object.keys(configCategories)[0];
        currentMainCat = firstCat;
        renderCommands(firstCat);
        document.querySelectorAll(".main-cat-btn").forEach((btn) => {
          btn.classList.remove("active-main");
          if (btn.textContent === firstCat) btn.classList.add("active-main");
        });
      }
      
      renderPresetsTab();
      if (window.refreshFullExport) window.refreshFullExport();
    }
  }
}

function addConfigDirectly(cmdString, mainCat) {
  if (cmdString && !globalConfigCommands.includes(cmdString)) {
    globalConfigCommands.push(cmdString);
    configMetadata.push({ command: cmdString, mainCat: mainCat });
    if (currentPreset) {
      currentPreset = null;
      saveGlobalConfigs();
      renderPresetsTab();
    } else {
      saveGlobalConfigs();
    }
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
    } else {
      saveGlobalConfigs();
    }
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
    if (currentMainCat) renderCommands(currentMainCat);
  }
}

function renderSavedConfigsList() {
  let container = document.getElementById("savedConfigsList");
  if (!container) return;
  container.innerHTML = "";
  if (globalConfigCommands.length === 0) {
    container.innerHTML =
      '<div class="empty-message">📭 Keine Config-Befehle gespeichert</div>';
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
  } else {
    saveGlobalConfigs();
  }
  if (window.refreshFullExport) window.refreshFullExport();
  if (currentMainCat) renderCommands(currentMainCat);
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
      document
        .querySelectorAll(".main-cat-btn")
        .forEach((b) => b.classList.remove("active-main"));
      btn.classList.add("active-main");
      currentMainCat = mainCatName;
      renderCommands(mainCatName);
    };
    container.appendChild(btn);
  }

  // Verstecke den Subcategories Container komplett
  const subContainer = document.getElementById("subcategoriesContainer");
  if (subContainer) {
    subContainer.innerHTML = "";
    subContainer.style.display = "none";
  }
}

function isCommandInConfig(cmdString) {
  return globalConfigCommands.includes(cmdString);
}

function renderCommands(mainCatName) {
  const commandsContainer = document.getElementById("commandsContainer");
  if (!commandsContainer) return;

  const catData = configCategories[mainCatName];
  if (!catData || !catData.commands || catData.commands.length === 0) {
    commandsContainer.innerHTML =
      '<div class="empty-message">📭 Keine Befehle in dieser Kategorie</div>';
    return;
  }

  let commandsList = catData.commands;
  let gridDiv = document.createElement("div");
  gridDiv.className = "config-grid visible";

  commandsList.forEach((cf) => {
    let item = document.createElement("div");
    item.className = "config-item";
    let selectHtml = "";
    let defaultVal = cf.values && cf.values.length > 0 ? cf.values[0] : "";

    if (cf.values && cf.values.length > 0) {
      selectHtml = `<select class="config-select" data-cmd="${cf.cmd}">`;
      cf.values.forEach((val) => {
        selectHtml += `<option value="${val}">${val}</option>`;
      });
      selectHtml += `</select>`;
    }

    item.innerHTML = `<div class="config-item-header"><div class="config-info"><div class="config-cmd">${cf.cmd}</div><div class="config-desc">${cf.desc}</div></div><button class="takeover-btn">📋 Übernehmen</button></div>${selectHtml}<div class="config-preview">${cf.cmd} ${defaultVal}</div>`;

    const select = item.querySelector(".config-select");
    const preview = item.querySelector(".config-preview");
    const takeoverBtn = item.querySelector(".takeover-btn");

    // Funktion zum Aktualisieren des Button-Zustands
    const updateButtonState = () => {
      let selectedVal = defaultVal;
      if (select) {
        selectedVal = select.value;
      }
      const finalCmd = `${cf.cmd} ${selectedVal}`;
      
      // Prüfe ob EXAKT dieser Befehl in der Config ist
      if (globalConfigCommands.includes(finalCmd)) {
        takeoverBtn.classList.add("success");
        takeoverBtn.innerHTML = "✓ Abgeschlossen";
      } else {
        takeoverBtn.classList.remove("success");
        takeoverBtn.innerHTML = "📋 Übernehmen";
      }
    };

    // Setze den Select auf den Wert, der bereits in der Config ist (falls vorhanden)
    if (select && globalConfigCommands.length > 0) {
      // Suche nach einem Befehl, der mit diesem cmd beginnt
      const existingCmd = globalConfigCommands.find(cmd => cmd.startsWith(cf.cmd + " "));
      if (existingCmd) {
        const existingValue = existingCmd.replace(cf.cmd + " ", "");
        if (cf.values.includes(existingValue)) {
          select.value = existingValue;
          preview.textContent = `${cf.cmd} ${existingValue}`;
        }
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
      let selectedVal = defaultVal;
      if (select) {
        selectedVal = select.value;
      }
      const finalCmd = `${cf.cmd} ${selectedVal}`;
      
      if (globalConfigCommands.includes(finalCmd)) {
        if (confirm(`"${finalCmd}" entfernen?`)) {
          removeConfigByCommand(finalCmd);
          updateButtonState();
          takeoverBtn.innerHTML = "🗑 Gelöscht!";
          setTimeout(() => {
            updateButtonState();
            if (window.refreshFullExport) window.refreshFullExport();
          }, 800);
        }
      } else {
        addConfigDirectly(finalCmd, mainCatName);
        updateButtonState();
        takeoverBtn.innerHTML = "✓ Gespeichert!";
        setTimeout(() => {
          updateButtonState();
          if (window.refreshFullExport) window.refreshFullExport();
        }, 800);
      }
    });

    item.addEventListener("click", (e) => {
      if (e.target !== takeoverBtn && e.target.tagName !== "SELECT") {
        let selectedVal = defaultVal;
        if (select) {
          selectedVal = select.value;
        }
        const finalCmd = `${cf.cmd} ${selectedVal}`;
        
        if (globalConfigCommands.includes(finalCmd)) {
          if (confirm(`"${finalCmd}" entfernen?`)) {
            removeConfigByCommand(finalCmd);
            updateButtonState();
            if (window.refreshFullExport) window.refreshFullExport();
          }
        } else {
          addConfigDirectly(finalCmd, mainCatName);
          updateButtonState();
          takeoverBtn.innerHTML = "✓ Gespeichert!";
          setTimeout(() => {
            updateButtonState();
            if (window.refreshFullExport) window.refreshFullExport();
          }, 800);
        }
      }
    });
    
    updateButtonState();
    gridDiv.appendChild(item);
  });

  commandsContainer.innerHTML = "";
  commandsContainer.appendChild(gridDiv);
}