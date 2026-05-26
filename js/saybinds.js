// ======================== SAY BINDS ========================
let sayBindings = {};
let selectedSayKey = null;

function loadSayBindings() {
  let s = localStorage.getItem("cs2_neon_say_unique");
  sayBindings = s ? JSON.parse(s) : {};
  renderSayBindsList();
  if (window.refreshFullExport) window.refreshFullExport();
}

function saveSayBindings() {
  localStorage.setItem("cs2_neon_say_unique", JSON.stringify(sayBindings));
  renderSayBindsList();
  if (window.refreshFullExport) window.refreshFullExport();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderScriptKeyboard) window.renderScriptKeyboard();
}

function renderSayKeyboard() {
  let mainCont = document.getElementById("sayKeyboardMain");
  if (!mainCont) return;
  mainCont.innerHTML = "";
  mainKeysRows.forEach((row) => {
    let rd = document.createElement("div");
    rd.className = "key-row";
    row.forEach((k) => {
      let d = document.createElement("div");
      d.className = `key ${getKeyClass(k)}`;
      if (selectedSayKey === k) d.classList.add("active-key");
      d.textContent = k;
      d.onclick = () => {
        selectedSayKey = k;
        renderSayKeyboard();
        updateSaySelectedKeyDisplay();
        document.getElementById("sayCommandInput").value = sayBindings[k] || "";
      };
      rd.appendChild(d);
    });
    mainCont.appendChild(rd);
  });
  let numCont = document.getElementById("sayNumpadContainer");
  if (!numCont) return;
  numCont.innerHTML = "";
  numpadKeys.forEach((k) => {
    let d = document.createElement("div");
    d.className = `numpad-key ${getKeyClass(k)}`;
    if (selectedSayKey === k) d.style.background = "var(--accent)";
    d.textContent = k.replace("KP_", "");
    d.onclick = () => {
      selectedSayKey = k;
      renderSayKeyboard();
      updateSaySelectedKeyDisplay();
      document.getElementById("sayCommandInput").value = sayBindings[k] || "";
    };
    numCont.appendChild(d);
  });
}

function updateSaySelectedKeyDisplay() {
  const display = document.getElementById("selectedSayKeyDisplay");
  if (display) {
    if (selectedSayKey) {
      display.textContent = selectedSayKey;
      display.style.background = "var(--accent)";
    } else {
      display.textContent = "Keine Taste ausgewählt";
      display.style.background = "#ff4444";
    }
  }
}

function saveSayBinding() {
  if (!selectedSayKey) {
    alert("❌ Keine Taste ausgewählt!");
    return;
  }
  let msgText = document.getElementById("sayCommandInput").value.trim();
  if (!msgText) {
    alert("❌ Nachricht leer!");
    return;
  }
  const sayType = document.querySelector('input[name="sayType"]:checked').value;
  const fullCommand = `${sayType} ${msgText}`;
  if (sayBindings[selectedSayKey] && !confirm(`Taste ${selectedSayKey} bereits gebunden. Überschreiben?`)) return;
  sayBindings[selectedSayKey] = fullCommand;
  saveSayBindings();
  alert(`✅ Say-Bindung für Taste "${selectedSayKey}" gespeichert!`);
  renderSayKeyboard();
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderScriptKeyboard) window.renderScriptKeyboard();
}

function unbindSayKey() {
  if (selectedSayKey && sayBindings[selectedSayKey]) {
    delete sayBindings[selectedSayKey];
    saveSayBindings();
    document.getElementById("sayCommandInput").value = "";
    alert(`Binding für ${selectedSayKey} entfernt`);
    renderSayKeyboard();
    if (window.renderBuyKeyboard) window.renderBuyKeyboard();
    if (window.renderScriptKeyboard) window.renderScriptKeyboard();
  } else if (!selectedSayKey) {
    alert("❌ Keine Taste ausgewählt!");
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
    cont.appendChild(e);
  }
}

function resetSayBinds() {
  if (confirm("Alle Say-Bindings löschen?")) {
    sayBindings = {};
    saveSayBindings();
    if (selectedSayKey) document.getElementById("sayCommandInput").value = "";
    alert("Alle Say-Bindings gelöscht.");
  }
}

window.sayBindings = sayBindings;
window.renderSayKeyboard = renderSayKeyboard;