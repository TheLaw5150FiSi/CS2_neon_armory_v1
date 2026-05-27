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
        // Entferne die bind-Zeile und den Kommentar für die Anzeige
        let cleanVal = val.replace(/^\/\/ .*\n/, "").replace(/bind ".*"\n?/g, "");
        document.getElementById("scriptCommandsArea").value = cleanVal.trim();
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
      let cleanVal = val.replace(/^\/\/ .*\n/, "").replace(/bind ".*"\n?/g, "");
      document.getElementById("scriptCommandsArea").value = cleanVal.trim();
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
  
  // Entferne alle existierenden bind-Zeilen aus dem userAliases
  let cleanAliases = userAliases.replace(/bind\s+"[^"]*"\s+[^\n]*\n?/g, "");
  cleanAliases = cleanAliases.trim();
  
  // Extrahiere den alias-Namen für den bind-Befehl
  let aliasName = "";
  const aliasMatch = cleanAliases.match(/alias\s+(\+\w+|\w+)/);
  if (aliasMatch) {
    aliasName = aliasMatch[1];
  }
  
  // Baue das finale Skript OHNE doppelte bind-Zeile
  let finalContent = `// ${scriptName}\n${cleanAliases}`;
  
  // Füge die bind-Zeile NUR am Ende hinzu (einmal)
  if (aliasName) {
    finalContent += `\nbind "${selectedScriptKey}" "${aliasName}"`;
  } else {
    // Fallback: Wenn kein Alias gefunden wurde, versuche den ersten Befehl zu nehmen
    const firstLine = cleanAliases.split("\n")[0];
    if (firstLine && firstLine.includes("alias")) {
      const fallbackMatch = firstLine.match(/alias\s+(\+\w+|\w+)/);
      if (fallbackMatch) {
        finalContent += `\nbind "${selectedScriptKey}" "${fallbackMatch[1]}"`;
      }
    }
  }
  
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
      let cleanVal = val.replace(/^\/\/.*\n/, "").replace(/bind ".*"\n?/g, "");
      document.getElementById("scriptCommandsArea").value = cleanVal.trim();
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
  if (!selectedScriptKey) {
    alert("⚠️ Bitte zuerst eine Taste auswählen!");
    return;
  }
  
  // Entferne ALLE bind-Zeilen aus dem Template (auch die mit "KEY")
  let cleanContent = scriptContent.replace(/bind\s+"[^"]*"\s+[^\n]*\n?/g, "");
  cleanContent = cleanContent.trim();
  
  // Entferne auch die letzte Zeile wenn sie "hud_on" oder ähnliches ist (falls vorhanden)
  const lines = cleanContent.split('\n');
  const filteredLines = lines.filter(line => {
    // Behalte nur alias-Zeilen und verzweigte Befehle
    return line.trim().startsWith('alias') || 
           line.trim().startsWith('+') || 
           line.trim().startsWith('-') ||
           line.trim().startsWith('hudToggle') ||
           (line.trim().length > 0 && !line.trim().startsWith('bind'));
  });
  cleanContent = filteredLines.join('\n');
  
  // Finde den Alias-Namen für den bind-Befehl
  let aliasName = "";
  // Suche nach "hudToggle" als alias
  const hudMatch = cleanContent.match(/alias\s+(hudToggle)\s/);
  if (hudMatch) {
    aliasName = hudMatch[1];
  } else {
    // Oder nach einem anderen Alias
    const aliasMatch = cleanContent.match(/alias\s+(\+\w+|\w+)/);
    if (aliasMatch) {
      aliasName = aliasMatch[1];
    }
  }
  
  // Baue das finale Skript
  let finalContent = `// ${scriptName}\n${cleanContent}`;
  
  // Füge die bind-Zeile NUR EINMAL hinzu
  if (aliasName) {
    finalContent += `\nbind "${selectedScriptKey}" "${aliasName}"`;
  } else {
    // Fallback: Suche nach einem Befehl in der ersten Zeile
    const firstLine = cleanContent.split('\n')[0];
    if (firstLine && firstLine.includes('alias')) {
      const cmdMatch = firstLine.match(/alias\s+(\+\w+|\w+)/);
      if (cmdMatch) {
        finalContent += `\nbind "${selectedScriptKey}" "${cmdMatch[1]}"`;
      }
    }
  }
  
  if (scriptBindings[selectedScriptKey] && !confirm(`Taste ${selectedScriptKey} bereits belegt. Überschreiben?`)) return;
  
  scriptBindings[selectedScriptKey] = finalContent;
  saveScriptBindings();
  alert(`✅ Skript "${scriptName}" wurde auf Taste "${selectedScriptKey}" gespeichert!`);
  renderScriptKeyboard();
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
  
  // Zeige das gespeicherte Skript im Editor an
  document.getElementById("scriptCommandsArea").value = cleanContent;
  document.getElementById("scriptNameInput").value = scriptName;
}

// Globale Exporte
window.scriptBindings = scriptBindings;
window.renderScriptKeyboard = renderScriptKeyboard;
window.saveScriptBindings = saveScriptBindings;
window.loadScriptBindings = loadScriptBindings;