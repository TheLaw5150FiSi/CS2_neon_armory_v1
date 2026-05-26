// ======================== SKRIPTE ========================
let scriptBindings = {};
let selectedScriptKey = null;

function updateSelectedKeyDisplay() {
  const display = document.getElementById("selectedScriptKeyDisplay");
  if (display) {
    if (selectedScriptKey) {
      display.textContent = selectedScriptKey;
      display.style.background = "var(--accent)";
    } else {
      display.textContent = "Keine Taste ausgewählt";
      display.style.background = "#ff4444";
    }
  }
}

function loadScriptBindings() {
  let s = localStorage.getItem("cs2_neon_script_unique");
  scriptBindings = s ? JSON.parse(s) : {};
  renderScriptsList();
  if (window.refreshFullExport) window.refreshFullExport();
  updateSelectedKeyDisplay();
}

function saveScriptBindings() {
  localStorage.setItem("cs2_neon_script_unique", JSON.stringify(scriptBindings));
  renderScriptsList();
  if (window.refreshFullExport) window.refreshFullExport();
  if (window.renderScriptKeyboard) window.renderScriptKeyboard();
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
}

function renderScriptKeyboard() {
  let mainCont = document.getElementById("scriptKeyboardMain");
  if (!mainCont) return;
  mainCont.innerHTML = "";
  mainKeysRows.forEach((row) => {
    let rd = document.createElement("div");
    rd.className = "key-row";
    row.forEach((k) => {
      let d = document.createElement("div");
      d.className = `key ${getKeyClass(k)}`;
      if (selectedScriptKey === k) d.classList.add("active-key");
      d.textContent = k;
      d.onclick = () => {
        selectedScriptKey = k;
        renderScriptKeyboard();
        updateSelectedKeyDisplay();
        let val = scriptBindings[k] || "";
        document.getElementById("scriptCommandsArea").value = val.replace(/^bind ".*"\n/, "");
        let nameMatch = val.match(/\/\/ (.*?)\n/);
        if (nameMatch) document.getElementById("scriptNameInput").value = nameMatch[1];
      };
      rd.appendChild(d);
    });
    mainCont.appendChild(rd);
  });
  let numCont = document.getElementById("scriptNumpadContainer");
  if (!numCont) return;
  numCont.innerHTML = "";
  numpadKeys.forEach((k) => {
    let d = document.createElement("div");
    d.className = `numpad-key ${getKeyClass(k)}`;
    if (selectedScriptKey === k) d.style.background = "var(--accent)";
    d.textContent = k.replace("KP_", "");
    d.onclick = () => {
      selectedScriptKey = k;
      renderScriptKeyboard();
      updateSelectedKeyDisplay();
      let val = scriptBindings[k] || "";
      document.getElementById("scriptCommandsArea").value = val.replace(/^bind ".*"\n/, "");
      let nameMatch = val.match(/\/\/ (.*?)\n/);
      if (nameMatch) document.getElementById("scriptNameInput").value = nameMatch[1];
    };
    numCont.appendChild(d);
  });
}

function saveScriptForCurrentKey() {
  if (!selectedScriptKey) {
    alert("❌ Keine Taste ausgewählt!");
    return;
  }
  let userAliases = document.getElementById("scriptCommandsArea").value.trim();
  if (!userAliases) {
    alert("❌ Skript-Inhalt leer!");
    return;
  }
  let scriptName = document.getElementById("scriptNameInput").value.trim() || "Skript";
  let finalContent = `// ${scriptName}\n${userAliases
    .replace(/bind "KEY"/g, `bind "${selectedScriptKey}"`)
    .replace(/bind "F12"/g, `bind "${selectedScriptKey}"`)
    .replace(/bind "TAB"/g, `bind "${selectedScriptKey}"`)}`;
  if (scriptBindings[selectedScriptKey] && !confirm(`Taste ${selectedScriptKey} bereits gebunden. Überschreiben?`)) return;
  scriptBindings[selectedScriptKey] = finalContent;
  saveScriptBindings();
  alert(`✅ Skript für Taste "${selectedScriptKey}" gespeichert!`);
  renderScriptKeyboard();
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
}

function unbindScriptKey() {
  if (selectedScriptKey && scriptBindings[selectedScriptKey]) {
    delete scriptBindings[selectedScriptKey];
    saveScriptBindings();
    document.getElementById("scriptCommandsArea").value = "";
    document.getElementById("scriptNameInput").value = "";
    alert(`Binding für ${selectedScriptKey} entfernt`);
    renderScriptKeyboard();
    if (window.renderBuyKeyboard) window.renderBuyKeyboard();
    if (window.renderSayKeyboard) window.renderSayKeyboard();
  } else if (!selectedScriptKey) alert("❌ Keine Taste ausgewählt!");
  else alert("Keine Bindung für diese Taste");
}

function renderScriptsList() {
  let cont = document.getElementById("savedScriptsList");
  if (!cont) return;
  cont.innerHTML = "";
  if (Object.keys(scriptBindings).length === 0) {
    cont.innerHTML = '<div class="empty-message">📭 Keine Skripte</div>';
    return;
  }
  for (let [key, val] of Object.entries(scriptBindings)) {
    let d = document.createElement("div");
    d.className = "bind-entry";
    let firstLine = val.split("\n")[0].replace("//", "");
    d.innerHTML = `<span class="bind-key">bind "${key}"</span> → <span class="bind-command">"${firstLine.substring(0, 60)}"</span>`;
    d.onclick = () => {
      selectedScriptKey = key;
      renderScriptKeyboard();
      updateSelectedKeyDisplay();
      let cleanVal = scriptBindings[key].replace(/^\/\/.*\n/, "");
      document.getElementById("scriptCommandsArea").value = cleanVal;
      document.getElementById("scriptNameInput").value = firstLine.trim();
    };
    cont.appendChild(d);
  }
}

function deleteSelectedScript() {
  if (selectedScriptKey && scriptBindings[selectedScriptKey]) {
    delete scriptBindings[selectedScriptKey];
    saveScriptBindings();
    document.getElementById("scriptCommandsArea").value = "";
    document.getElementById("scriptNameInput").value = "";
    alert(`Skript auf Taste ${selectedScriptKey} gelöscht`);
    renderScriptKeyboard();
    if (window.renderBuyKeyboard) window.renderBuyKeyboard();
    if (window.renderSayKeyboard) window.renderSayKeyboard();
  } else if (!selectedScriptKey) alert("❌ Keine Taste ausgewählt!");
  else alert("Kein Skript auf dieser Taste");
}

function renderTemplates() {
  let cont = document.getElementById("templateScripts");
  if (!cont) return;
  cont.innerHTML = "";
  scriptTemplatesList.forEach((t) => {
    let btn = document.createElement("div");
    btn.className = "script-template-item-vertical";
    btn.innerHTML = `<div class="script-template-name">${t.name}</div><div class="script-template-desc-vertical">📝 ${t.desc}</div>`;
    btn.onclick = () => {
      if (!selectedScriptKey) alert("⚠️ Bitte zuerst eine Taste auswählen!");
      else toggleScriptTemplate(t.key, t.content, t.name);
    };
    cont.appendChild(btn);
  });
}

function toggleScriptTemplate(scriptKey, scriptContent, scriptName) {
  let finalContent = `// ${scriptName}\n${scriptContent
    .replace(/bind "KEY"/g, `bind "${selectedScriptKey}"`)
    .replace(/bind "F12"/g, `bind "${selectedScriptKey}"`)
    .replace(/bind "TAB"/g, `bind "${selectedScriptKey}"`)}`;
  if (scriptBindings[selectedScriptKey] && !confirm(`Taste ${selectedScriptKey} bereits belegt. Überschreiben?`)) return;
  scriptBindings[selectedScriptKey] = finalContent;
  saveScriptBindings();
  alert(`✅ Skript "${scriptName}" wurde auf Taste "${selectedScriptKey}" gespeichert!`);
  renderScriptKeyboard();
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
  document.getElementById("scriptCommandsArea").value = finalContent.replace(/^\/\/.*\n/, "");
  document.getElementById("scriptNameInput").value = scriptName;
}

window.scriptBindings = scriptBindings;
window.renderScriptKeyboard = renderScriptKeyboard;