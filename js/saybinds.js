// ======================== SAY BINDS ========================
let sayBindings = {};
let selectedSayKey = null;

function loadSayBindings() {
  let s = localStorage.getItem("cs2_neon_say_unique");
  sayBindings = s ? JSON.parse(s) : {};
  renderSayBindsList();
  if (window.refreshFullExport) window.refreshFullExport();
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderScriptKeyboard) window.renderScriptKeyboard();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
}

function saveSayBindings() {
  localStorage.setItem("cs2_neon_say_unique", JSON.stringify(sayBindings));
  renderSayBindsList();
  if (window.refreshFullExport) window.refreshFullExport();
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderScriptKeyboard) window.renderScriptKeyboard();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
}

function renderSayKeyboard() {
  let mainCont = document.getElementById("sayKeyboardMain");
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
      if (selectedSayKey === k) d.classList.add("active-key");
      d.textContent = k;
      d.onclick = () => {
        selectedSayKey = k;
        renderSayKeyboard();
        document.getElementById("sayCommandInput").value = sayBindings[k] || "";
      };
      rd.appendChild(d);
    });
    mainCont.appendChild(rd);
  });
  
  let numCont = document.getElementById("sayNumpadContainer");
  if (!numCont) return;
  numCont.innerHTML = "";
  
  let numpad = (typeof numpadKeys !== 'undefined') ? numpadKeys : [];
  numpad.forEach((k) => {
    let d = document.createElement("div");
    let keyClass = (window.getKeyClass) ? window.getKeyClass(k) : "";
    d.className = `numpad-key ${keyClass}`;
    if (selectedSayKey === k) d.style.background = "var(--accent)";
    d.textContent = k.replace("KP_", "");
    d.onclick = () => {
      selectedSayKey = k;
      renderSayKeyboard();
      document.getElementById("sayCommandInput").value = sayBindings[k] || "";
    };
    numCont.appendChild(d);
  });
}

function saveSayBinding() {
  if (!selectedSayKey) {
    alert("❌ Bitte wähle zuerst eine Taste aus!");
    return;
  }
  
  let msgText = document.getElementById("sayCommandInput").value.trim();
  if (!msgText) {
    alert("❌ Bitte gib eine Nachricht ein!");
    return;
  }
  
  const existingType = window.getExistingBindingType(selectedSayKey);
  
  if (existingType !== "none" && existingType !== "say") {
    let typeName = "";
    if (existingType === "script") typeName = "ein Skript";
    if (existingType === "buy") typeName = "einen Buy-Bind";
    
    if (!confirm(`Taste "${selectedSayKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`)) {
      return;
    }
    window.removeSpecificBinding(selectedSayKey, existingType);
  }
  
  const sayType = document.querySelector('input[name="sayType"]:checked').value;
  const fullCommand = `${sayType} ${msgText}`;
  
  sayBindings[selectedSayKey] = fullCommand;
  saveSayBindings();
  alert(`✅ Say-Bindung für Taste "${selectedSayKey}" gespeichert!`);
  
  if (window.renderSayKeyboard) window.renderSayKeyboard();
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderScriptKeyboard) window.renderScriptKeyboard();
}

function unbindSayKey() {
  if (selectedSayKey && sayBindings[selectedSayKey]) {
    delete sayBindings[selectedSayKey];
    saveSayBindings();
    document.getElementById("sayCommandInput").value = "";
    alert(`Binding für ${selectedSayKey} entfernt`);
    if (window.renderSayKeyboard) window.renderSayKeyboard();
    if (window.renderBuyKeyboard) window.renderBuyKeyboard();
    if (window.renderScriptKeyboard) window.renderScriptKeyboard();
  } else if (!selectedSayKey) {
    alert("❌ Bitte wähle zuerst eine Taste aus!");
  } else {
    alert("Keine Say-Bindung für diese Taste");
  }
}

function renderSayBindsList() {
  let cont = document.getElementById("savedSayBindsList");
  if (!cont) return;
  cont.innerHTML = "";
  
  if (Object.keys(sayBindings).length === 0) {
    cont.innerHTML = '<div class="empty-message">📭 Keine Say-Bindings</div>';
    return;
  }
  
  for (let [k, cmd] of Object.entries(sayBindings)) {
    let e = document.createElement("div");
    e.className = "bind-entry";
    e.innerHTML = `<span class="bind-key">bind "${k}"</span> → <span class="bind-command">"${cmd}"</span>`;
    e.onclick = () => {
      selectedSayKey = k;
      if (window.renderSayKeyboard) window.renderSayKeyboard();
      document.getElementById("sayCommandInput").value = cmd;
      if (cmd.startsWith("say_team")) {
        const teamRadio = document.querySelector('input[name="sayType"][value="say_team"]');
        if (teamRadio) teamRadio.checked = true;
      } else {
        const allRadio = document.querySelector('input[name="sayType"][value="say"]');
        if (allRadio) allRadio.checked = true;
      }
    };
    cont.appendChild(e);
  }
}

function resetSayBinds() {
  if (confirm("⚠️ Alle Say-Bindings löschen? Diese Aktion kann nicht rückgängig gemacht werden!")) {
    sayBindings = {};
    saveSayBindings();
    if (selectedSayKey) document.getElementById("sayCommandInput").value = "";
    alert("✅ Alle Say-Bindings gelöscht.");
  }
}

window.sayBindings = sayBindings;
window.renderSayKeyboard = renderSayKeyboard;
window.saveSayBindings = saveSayBindings;
window.loadSayBindings = loadSayBindings;