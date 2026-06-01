// ======================== BENDS TAB (ZUSAMMENGEFÜHRT) ========================
let selectedBindKey = null;
let currentBindType = "buy"; // "buy", "say", "script"

function initBindsTab() {
    renderBindsKeyboard();
    renderBindsBuyCategories();
    renderBindsSavedList();
    renderBindsTemplates();
    attachBindsEventListeners();
}

function renderBindsKeyboard() {
    const mainCont = document.getElementById("bindsKeyboardMain");
    if (!mainCont) return;
    mainCont.innerHTML = "";
    
    let rows = (typeof mainKeysRows !== 'undefined') ? mainKeysRows : [];
    if (rows.length === 0 && typeof deKeysRows !== 'undefined') {
        rows = deKeysRows;
    }
    
    rows.forEach((row) => {
        let rd = document.createElement("div");
        rd.className = "key-row";
        row.forEach((k) => {
            let d = document.createElement("div");
            let keyClass = (window.getKeyClass) ? window.getKeyClass(k) : "";
            d.className = `key ${keyClass}`;
            if (selectedBindKey === k) d.classList.add("active-key");
            d.textContent = k;
            d.onclick = () => {
                selectedBindKey = k;
                renderBindsKeyboard();
                updateBindsInputFields();
            };
            rd.appendChild(d);
        });
        mainCont.appendChild(rd);
    });
    
    const numCont = document.getElementById("bindsNumpadContainer");
    if (!numCont) return;
    numCont.innerHTML = "";
    
    let numpad = (typeof numpadKeys !== 'undefined') ? numpadKeys : [];
    numpad.forEach((k) => {
        let d = document.createElement("div");
        let keyClass = (window.getKeyClass) ? window.getKeyClass(k) : "";
        d.className = `numpad-key ${keyClass}`;
        if (selectedBindKey === k) d.style.background = "var(--accent)";
        d.textContent = k.replace("KP_", "");
        d.onclick = () => {
            selectedBindKey = k;
            renderBindsKeyboard();
            updateBindsInputFields();
        };
        numCont.appendChild(d);
    });
}

function updateBindsInputFields() {
    if (!selectedBindKey) return;
    
    // Buy Input
    const buyInput = document.getElementById("bindsBuyCommandInput");
    if (buyInput && window.buyBindings) {
        buyInput.value = window.buyBindings[selectedBindKey] || "";
    }
    
    // Say Input
    const sayInput = document.getElementById("bindsSayCommandInput");
    if (sayInput && window.sayBindings) {
        let val = window.sayBindings[selectedBindKey] || "";
        sayInput.value = val.replace(/^(say_team|say) /, "");
        if (val.startsWith("say_team")) {
            const teamRadio = document.querySelector('input[name="bindsSayType"][value="say_team"]');
            if (teamRadio) teamRadio.checked = true;
        } else if (val.startsWith("say")) {
            const allRadio = document.querySelector('input[name="bindsSayType"][value="say"]');
            if (allRadio) allRadio.checked = true;
        }
    }
    
    // Script Input
    const scriptNameInput = document.getElementById("bindsScriptNameInput");
    const scriptArea = document.getElementById("bindsScriptCommandsArea");
    if (scriptNameInput && scriptArea && window.scriptBindings) {
        let val = window.scriptBindings[selectedBindKey] || "";
        let cleanVal = val.replace(/^\/\/ .*\n/, "").replace(/bind ".*"\n?/g, "");
        scriptArea.value = cleanVal.trim();
        let nameMatch = val.match(/\/\/ (.*?)\n/);
        scriptNameInput.value = nameMatch ? nameMatch[1] : "";
    }
}

function renderBindsBuyCategories() {
    let catDiv = document.getElementById("bindsCategoryList");
    if (!catDiv) return;
    catDiv.innerHTML = "";
    
    if (typeof categories === 'undefined') return;
    
    Object.keys(categories).forEach((c) => {
        let p = document.createElement("div");
        p.className = "cat-pill";
        if (typeof currentBuyCategory !== 'undefined' && currentBuyCategory === c) p.classList.add("active-cat");
        p.textContent = c;
        p.onclick = () => {
            if (typeof window.setBuyCategory === 'function') {
                window.setBuyCategory(c);
            } else {
                window.currentBuyCategory = c;
            }
            renderBindsBuyItems();
            document.querySelectorAll("#bindsCategoryList .cat-pill").forEach(pill => pill.classList.remove("active-cat"));
            p.classList.add("active-cat");
        };
        catDiv.appendChild(p);
    });
    renderBindsBuyItems();
}

function renderBindsBuyItems() {
    let grid = document.getElementById("bindsItemsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    
    if (typeof categories === 'undefined') return;
    let currentCat = (typeof window.currentBuyCategory !== 'undefined') ? window.currentBuyCategory : "Pistole";
    if (!categories[currentCat]) currentCat = "Pistole";
    
    categories[currentCat].forEach((it) => {
        let div = document.createElement("div");
        div.className = "weapon-item";
        div.innerHTML = `<span>${it.name}</span><span class="add-icon">+</span>`;
        div.onclick = () => {
            if (!selectedBindKey) {
                alert("Bitte wähle zuerst eine Taste aus!");
                return;
            }
            let cur = document.getElementById("bindsBuyCommandInput").value;
            let cnt = (cur.match(new RegExp(it.cmd.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || []).length;
            if (cnt >= it.maxCount) {
                alert(`Maximal ${it.maxCount} mal erlaubt`);
                return;
            }
            let n = cur ? cur + "; " + it.cmd : it.cmd;
            document.getElementById("bindsBuyCommandInput").value = n;
        };
        grid.appendChild(div);
    });
}

function bindsSaveBuy() {
    if (!selectedBindKey) {
        alert("Bitte wähle zuerst eine Taste aus!");
        return;
    }
    let val = document.getElementById("bindsBuyCommandInput").value.trim();
    if (!val) {
        alert("Bitte gib einen Buy-Befehl ein!");
        return;
    }
    
    const existingType = window.getExistingBindingType ? window.getExistingBindingType(selectedBindKey) : "none";
    
    // Wenn bereits eine andere Bindung existiert, frage nach Überschreiben
    if (existingType !== "none" && existingType !== "buy") {
        let typeName = existingType === "script" ? "ein Skript" : "einen Say-Bind";
        if (!confirm(`Taste "${selectedBindKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`)) {
            return;
        }
        if (window.removeSpecificBinding) window.removeSpecificBinding(selectedBindKey, existingType);
    }
    
    if (window.buyBindings) {
        window.buyBindings[selectedBindKey] = val;
        if (window.saveBuy) window.saveBuy();
    }
    alert(`✅ Buy-Bindung für Taste "${selectedBindKey}" gespeichert!`);
    renderBindsKeyboard();
    renderBindsSavedList();
    if (window.refreshFullExport) window.refreshFullExport();
}

function bindsSaveSay() {
    if (!selectedBindKey) {
        alert("Bitte wähle zuerst eine Taste aus!");
        return;
    }
    let msgText = document.getElementById("bindsSayCommandInput").value.trim();
    if (!msgText) {
        alert("Bitte gib eine Nachricht ein!");
        return;
    }
    
    const existingType = window.getExistingBindingType ? window.getExistingBindingType(selectedBindKey) : "none";
    
    if (existingType !== "none" && existingType !== "say") {
        let typeName = existingType === "script" ? "ein Skript" : "einen Buy-Bind";
        if (!confirm(`Taste "${selectedBindKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`)) {
            return;
        }
        if (window.removeSpecificBinding) window.removeSpecificBinding(selectedBindKey, existingType);
    }
    
    const sayType = document.querySelector('input[name="bindsSayType"]:checked').value;
    const fullCommand = `${sayType} ${msgText}`;
    
    if (window.sayBindings) {
        window.sayBindings[selectedBindKey] = fullCommand;
        if (window.saveSayBindings) window.saveSayBindings();
    }
    alert(`✅ Say-Bindung für Taste "${selectedBindKey}" gespeichert!`);
    renderBindsKeyboard();
    renderBindsSavedList();
    if (window.refreshFullExport) window.refreshFullExport();
}

function bindsSaveScript() {
    if (!selectedBindKey) {
        alert("Bitte wähle zuerst eine Taste aus!");
        return;
    }
    let userAliases = document.getElementById("bindsScriptCommandsArea").value.trim();
    if (!userAliases) {
        alert("Bitte gib Skript-Inhalt ein!");
        return;
    }
    
    const existingType = window.getExistingBindingType ? window.getExistingBindingType(selectedBindKey) : "none";
    
    if (existingType !== "none" && existingType !== "script") {
        let typeName = existingType === "buy" ? "einen Buy-Bind" : "einen Say-Bind";
        if (!confirm(`Taste "${selectedBindKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`)) {
            return;
        }
        if (window.removeSpecificBinding) window.removeSpecificBinding(selectedBindKey, existingType);
    }
    
    let scriptName = document.getElementById("bindsScriptNameInput").value.trim() || "Skript";
    let cleanAliases = userAliases.replace(/bind\s+"[^"]*"\s+[^\n]*\n?/g, "");
    cleanAliases = cleanAliases.trim();
    
    let aliasName = "";
    const aliasMatch = cleanAliases.match(/alias\s+(\+\w+|\w+)/);
    if (aliasMatch) aliasName = aliasMatch[1];
    
    let finalContent = `// ${scriptName}\n${cleanAliases}`;
    if (aliasName) {
        finalContent += `\nbind "${selectedBindKey}" "${aliasName}"`;
    } else {
        const firstLine = cleanAliases.split("\n")[0];
        if (firstLine && firstLine.includes("alias")) {
            const fallbackMatch = firstLine.match(/alias\s+(\+\w+|\w+)/);
            if (fallbackMatch) finalContent += `\nbind "${selectedBindKey}" "${fallbackMatch[1]}"`;
        }
    }
    
    if (window.scriptBindings) {
        window.scriptBindings[selectedBindKey] = finalContent;
        if (window.saveScriptBindings) window.saveScriptBindings();
    }
    alert(`✅ Skript für Taste "${selectedBindKey}" gespeichert!`);
    renderBindsKeyboard();
    renderBindsSavedList();
    if (window.refreshFullExport) window.refreshFullExport();
}

function bindsUnbindCurrent() {
    if (!selectedBindKey) {
        alert("Bitte wähle zuerst eine Taste aus!");
        return;
    }
    
    let removed = false;
    if (currentBindType === "buy" && window.buyBindings && window.buyBindings[selectedBindKey]) {
        delete window.buyBindings[selectedBindKey];
        if (window.saveBuy) window.saveBuy();
        removed = true;
    } else if (currentBindType === "say" && window.sayBindings && window.sayBindings[selectedBindKey]) {
        delete window.sayBindings[selectedBindKey];
        if (window.saveSayBindings) window.saveSayBindings();
        removed = true;
    } else if (currentBindType === "script" && window.scriptBindings && window.scriptBindings[selectedBindKey]) {
        delete window.scriptBindings[selectedBindKey];
        if (window.saveScriptBindings) window.saveScriptBindings();
        removed = true;
    }
    
    if (removed) {
        alert(`Binding für ${selectedBindKey} (${currentBindType}) entfernt`);
        updateBindsInputFields();
        renderBindsKeyboard();
        renderBindsSavedList();
        if (window.refreshFullExport) window.refreshFullExport();
    } else {
        alert(`Keine ${currentBindType}-Bindung für diese Taste`);
    }
}

function bindsResetAll() {
    if (confirm("⚠️ ALLE Bindings (Buy, Say, Skripte) löschen? Diese Aktion kann nicht rückgängig gemacht werden!")) {
        if (window.buyBindings) {
            for (let key in window.buyBindings) delete window.buyBindings[key];
            if (window.saveBuy) window.saveBuy();
        }
        if (window.sayBindings) {
            for (let key in window.sayBindings) delete window.sayBindings[key];
            if (window.saveSayBindings) window.saveSayBindings();
        }
        if (window.scriptBindings) {
            for (let key in window.scriptBindings) delete window.scriptBindings[key];
            if (window.saveScriptBindings) window.saveScriptBindings();
        }
        updateBindsInputFields();
        renderBindsKeyboard();
        renderBindsSavedList();
        if (window.refreshFullExport) window.refreshFullExport();
        alert("✅ Alle Bindings gelöscht.");
    }
}

function renderBindsSavedList() {
    let cont = document.getElementById("bindsSavedList");
    if (!cont) return;
    cont.innerHTML = "";
    
    let allBinds = [];
    
    // Sammle alle Buy-Bindings
    if (window.buyBindings) {
        for (let [k, cmd] of Object.entries(window.buyBindings)) {
            allBinds.push({ key: k, type: "buy", display: `bind "${k}" → "${cmd}"`, cmd: cmd });
        }
    }
    
    // Sammle alle Say-Bindings
    if (window.sayBindings) {
        for (let [k, cmd] of Object.entries(window.sayBindings)) {
            allBinds.push({ key: k, type: "say", display: `bind "${k}" → "${cmd}"`, cmd: cmd });
        }
    }
    
    // Sammle alle Script-Bindings
    if (window.scriptBindings) {
        for (let [k, val] of Object.entries(window.scriptBindings)) {
            let firstLine = val.split("\n")[0].replace("//", "").trim();
            allBinds.push({ key: k, type: "script", display: `bind "${k}" → 🎮 ${firstLine.substring(0, 50)}`, cmd: val });
        }
    }
    
    // Wenn keine Bindings vorhanden
    if (allBinds.length === 0) {
        cont.innerHTML = '<div class="empty-message">✨ Keine Bindings vorhanden. Klicke auf eine Taste, um ein Binding zu erstellen!</div>';
        return;
    }
    
    // Sortiere nach Taste (alphabetisch)
    allBinds.sort((a, b) => a.key.localeCompare(b.key));
    
    // Zeige alle Bindings an
    allBinds.forEach((bind) => {
        let e = document.createElement("div");
        e.className = "bind-entry";
        
        // Icon je nach Typ
        let typeIcon = bind.type === "buy" ? "🛒" : (bind.type === "say" ? "💬" : "🎮");
        let typeColor = bind.type === "buy" ? "#ff3333" : (bind.type === "say" ? "#44cc44" : "#2288dd");
        
        e.innerHTML = `
            <span class="bind-key" style="color: ${typeColor};">${typeIcon} bind "${bind.key}"</span> 
            → <span class="bind-command">"${bind.cmd.substring(0, 80)}${bind.cmd.length > 80 ? '...' : ''}"</span>
            <span style="float: right; cursor: pointer; color: #ff6666; margin-left: 0.5rem;" onclick="window.removeBindingFromList('${bind.key}', '${bind.type}')">[x]</span>
        `;
        
        // Beim Klick auf den Eintrag wird die Taste ausgewählt und der entsprechende Modus aktiviert
        e.onclick = (event) => {
            // Verhindere dass der Lösch-Button den Klick auslöst
            if (event.target.tagName === 'SPAN' && event.target.textContent === '[x]') return;
            
            selectedBindKey = bind.key;
            currentBindType = bind.type;
            
            // Aktiviere den richtigen Tab (BUYSCRIPT/SAY/SCRIPT)
            document.querySelectorAll("#bindTypeSelector .main-cat-btn").forEach(btn => {
                btn.classList.remove("active-main");
                if (btn.dataset.bindType === bind.type) btn.classList.add("active-main");
            });
            
            // Zeige den richtigen Bereich an
            document.querySelectorAll(".bind-type-area").forEach(area => area.classList.remove("active"));
            document.getElementById(`binds${bind.type === "buy" ? "Buy" : (bind.type === "say" ? "Say" : "Script")}Area`).classList.add("active");
            
            renderBindsKeyboard();
            updateBindsInputFields();
        };
        
        cont.appendChild(e);
    });
}

// Globale Funktoin zum Entfernen eines Bindings aus der Liste
window.removeBindingFromList = function(key, type) {
    if (confirm(`Binding für Taste "${key}" (${type}) wirklich entfernen?`)) {
        removeSpecificBinding(key, type);
        renderBindsKeyboard();
        renderBindsSavedList();
        updateBindsInputFields();
        if (window.refreshFullExport) window.refreshFullExport();
    }
};

function renderBindsTemplates() {
    let cont = document.getElementById("bindsTemplateScripts");
    if (!cont) return;
    cont.innerHTML = "";
    
    if (typeof scriptTemplatesList === 'undefined') return;
    
    scriptTemplatesList.forEach((t) => {
        let btn = document.createElement("div");
        btn.className = "script-template-item-vertical";
        btn.style.padding = "0.4rem 0.8rem";
        btn.style.background = "var(--btn-bg)";
        btn.style.borderRadius = "2rem";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "0.75rem";
        btn.style.border = "1px solid var(--border-color)";
        btn.innerHTML = `${t.name} <span style="opacity:0.7; font-size:0.65rem;">📝 ${t.desc.substring(0, 30)}...</span>`;
        btn.onclick = () => {
            if (!selectedBindKey) {
                alert("⚠️ Bitte zuerst eine Taste auswählen!");
                return;
            }
            applyBindsScriptTemplate(t.content, t.name);
        };
        cont.appendChild(btn);
    });
}

function applyBindsScriptTemplate(scriptContent, scriptName) {
    if (!selectedBindKey) {
        alert("⚠️ Bitte zuerst eine Taste auswählen!");
        return;
    }
    
    const existingType = window.getExistingBindingType ? window.getExistingBindingType(selectedBindKey) : "none";
    if (existingType !== "none" && existingType !== "script") {
        let typeName = existingType === "buy" ? "einen Buy-Bind" : "einen Say-Bind";
        if (!confirm(`Taste "${selectedBindKey}" wird bereits für ${typeName} verwendet. Überschreiben?`)) return;
        if (window.removeSpecificBinding) window.removeSpecificBinding(selectedBindKey, existingType);
    }
    
    let cleanContent = scriptContent.replace(/bind\s+"[^"]*"\s+[^\n]*\n?/g, "");
    cleanContent = cleanContent.trim();
    
    const lines = cleanContent.split('\n');
    const filteredLines = lines.filter(line => {
        return line.trim().startsWith('alias') || 
               line.trim().startsWith('+') || 
               line.trim().startsWith('-') ||
               line.trim().startsWith('hudToggle') ||
               (line.trim().length > 0 && !line.trim().startsWith('bind'));
    });
    cleanContent = filteredLines.join('\n');
    
    let aliasName = "";
    const aliasMatch = cleanContent.match(/alias\s+(\+\w+|\w+)/);
    if (aliasMatch) aliasName = aliasMatch[1];
    
    let finalContent = `// ${scriptName}\n${cleanContent}`;
    if (aliasName) {
        finalContent += `\nbind "${selectedBindKey}" "${aliasName}"`;
    } else {
        const firstLine = cleanContent.split('\n')[0];
        if (firstLine && firstLine.includes('alias')) {
            const cmdMatch = firstLine.match(/alias\s+(\+\w+|\w+)/);
            if (cmdMatch) finalContent += `\nbind "${selectedBindKey}" "${cmdMatch[1]}"`;
        }
    }
    
    if (window.scriptBindings) {
        window.scriptBindings[selectedBindKey] = finalContent;
        if (window.saveScriptBindings) window.saveScriptBindings();
    }
    
    alert(`✅ Skript "${scriptName}" wurde auf Taste "${selectedBindKey}" gespeichert!`);
    
    // Update UI
    if (window.renderScriptKeyboard) window.renderScriptKeyboard();
    if (window.renderBuyKeyboard) window.renderBuyKeyboard();
    if (window.renderSayKeyboard) window.renderSayKeyboard();
    renderBindsKeyboard();
    renderBindsSavedList();
    
    document.getElementById("bindsScriptCommandsArea").value = cleanContent;
    document.getElementById("bindsScriptNameInput").value = scriptName;
}

function setBindType(type) {
    currentBindType = type;
    document.querySelectorAll("#bindTypeSelector .main-cat-btn").forEach(btn => {
        btn.classList.remove("active-main");
        if (btn.dataset.bindType === type) btn.classList.add("active-main");
    });
    document.querySelectorAll(".bind-type-area").forEach(area => area.classList.remove("active"));
    document.getElementById(`binds${type === "buy" ? "Buy" : (type === "say" ? "Say" : "Script")}Area`).classList.add("active");
    updateBindsInputFields();
}

function attachBindsEventListeners() {
    document.querySelectorAll("#bindTypeSelector .main-cat-btn").forEach(btn => {
        btn.addEventListener("click", () => setBindType(btn.dataset.bindType));
    });
    
    const saveBuyBtn = document.getElementById("bindsSaveBuyBtn");
    if (saveBuyBtn) saveBuyBtn.addEventListener("click", bindsSaveBuy);
    
    const unbindBuyBtn = document.getElementById("bindsUnbindBuyBtn");
    if (unbindBuyBtn) unbindBuyBtn.addEventListener("click", bindsUnbindCurrent);
    
    const saveSayBtn = document.getElementById("bindsSaveSayBtn");
    if (saveSayBtn) saveSayBtn.addEventListener("click", bindsSaveSay);
    
    const unbindSayBtn = document.getElementById("bindsUnbindSayBtn");
    if (unbindSayBtn) unbindSayBtn.addEventListener("click", bindsUnbindCurrent);
    
    const saveScriptBtn = document.getElementById("bindsSaveScriptBtn");
    if (saveScriptBtn) saveScriptBtn.addEventListener("click", bindsSaveScript);
    
    const unbindScriptBtn = document.getElementById("bindsUnbindScriptBtn");
    if (unbindScriptBtn) unbindScriptBtn.addEventListener("click", bindsUnbindCurrent);
    
    const resetAllBtn = document.getElementById("bindsResetAllBtn");
    if (resetAllBtn) resetAllBtn.addEventListener("click", bindsResetAll);
    
    const toggleLayoutBtn = document.getElementById("toggleKeyboardLayoutBinds");
    if (toggleLayoutBtn && typeof toggleKeyboardLayout === 'function') {
        toggleLayoutBtn.addEventListener("click", () => {
            toggleKeyboardLayout();
            renderBindsKeyboard();
        });
    }
    
    window.setBuyCategory = function(cat) {
        window.currentBuyCategory = cat;
    };
    window.currentBuyCategory = "Pistole";
}

window.initBindsTab = initBindsTab;
window.renderBindsKeyboard = renderBindsKeyboard;
window.renderBindsSavedList = renderBindsSavedList;