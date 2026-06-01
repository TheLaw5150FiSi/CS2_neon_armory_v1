// ======================== BUYSCRIPT ========================
let buyBindings = {};
let selectedBuyKey = null;
let currentCategory = "Pistole";

function loadBuy() {
  let s = localStorage.getItem("cs2_neon_buy_unique");
  buyBindings = s ? JSON.parse(s) : {};
  renderSavedBinds();
  if (window.refreshFullExport) window.refreshFullExport();
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderScriptKeyboard) window.renderScriptKeyboard();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
}

function saveBuy() {
  localStorage.setItem("cs2_neon_buy_unique", JSON.stringify(buyBindings));
  renderSavedBinds();
  if (window.refreshFullExport) window.refreshFullExport();
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderScriptKeyboard) window.renderScriptKeyboard();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
}

function renderBuyKeyboard() {
  const mainCont = document.getElementById("mainKeyboard");
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
      if (selectedBuyKey === k) d.classList.add("active-key");
      d.textContent = k;
      d.onclick = () => {
        selectedBuyKey = k;
        renderBuyKeyboard();
        const input = document.getElementById("buyCommandInput");
        if (input) input.value = buyBindings[k] || "";
      };
      rd.appendChild(d);
    });
    mainCont.appendChild(rd);
  });
  
  const numCont = document.getElementById("numpadContainer");
  if (!numCont) return;
  numCont.innerHTML = "";
  
  let numpad = (typeof numpadKeys !== 'undefined') ? numpadKeys : [];
  numpad.forEach((k) => {
    let d = document.createElement("div");
    let keyClass = (window.getKeyClass) ? window.getKeyClass(k) : "";
    d.className = `numpad-key ${keyClass}`;
    if (selectedBuyKey === k) d.style.background = "var(--accent)";
    d.textContent = k.replace("KP_", "");
    d.onclick = () => {
      selectedBuyKey = k;
      renderBuyKeyboard();
      const input = document.getElementById("buyCommandInput");
      if (input) input.value = buyBindings[k] || "";
    };
    numCont.appendChild(d);
  });
}

function renderBuyCategories() {
  let catDiv = document.getElementById("categoryList");
  if (!catDiv) return;
  catDiv.innerHTML = "";
  
  Object.keys(categories).forEach((c) => {
    let p = document.createElement("div");
    p.className = "cat-pill";
    if (currentCategory === c) p.classList.add("active-cat");
    p.textContent = c;
    p.onclick = () => {
      currentCategory = c;
      renderBuyCategories();
      renderBuyItems();
    };
    catDiv.appendChild(p);
  });
  renderBuyItems();
}

function renderBuyItems() {
  let grid = document.getElementById("itemsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  
  categories[currentCategory].forEach((it) => {
    let div = document.createElement("div");
    div.className = "weapon-item";
    div.innerHTML = `<span>${it.name}</span><span class="add-icon">+</span>`;
    div.onclick = () => {
      if (!selectedBuyKey) {
        alert("Bitte wähle zuerst eine Taste aus!");
        return;
      }
      let cur = document.getElementById("buyCommandInput").value;
      let cnt = (cur.match(new RegExp(it.cmd.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || []).length;
      if (cnt >= it.maxCount) {
        alert(`Maximal ${it.maxCount} mal erlaubt`);
        return;
      }
      let n = cur ? cur + "; " + it.cmd : it.cmd;
      document.getElementById("buyCommandInput").value = n;
    };
    grid.appendChild(div);
  });
}

function saveCurrentBinding() {
  if (!selectedBuyKey) {
    alert("Bitte wähle zuerst eine Taste aus!");
    return;
  }
  
  let val = document.getElementById("buyCommandInput").value.trim();
  if (!val) {
    alert("Bitte gib einen Buy-Befehl ein!");
    return;
  }
  
  // Prüfe ob Taste bereits für einen ANDEREN Binding-Typ belegt ist
  const existingType = window.getExistingBindingType(selectedBuyKey);
  
  if (existingType !== "none" && existingType !== "buy") {
    let typeName = "";
    if (existingType === "script") typeName = "ein Skript";
    if (existingType === "say") typeName = "einen Say-Bind";
    
    if (!confirm(`Taste "${selectedBuyKey}" wird bereits für ${typeName} verwendet.\n\nÜberschreiben? Der vorherige Bind wird gelöscht.`)) {
      return;
    }
    window.removeSpecificBinding(selectedBuyKey, existingType);
  }
  
  buyBindings[selectedBuyKey] = val;
  saveBuy();
  alert(`✅ Buy-Bindung für Taste "${selectedBuyKey}" gespeichert!`);
  
  if (window.renderBuyKeyboard) window.renderBuyKeyboard();
  if (window.renderScriptKeyboard) window.renderScriptKeyboard();
  if (window.renderSayKeyboard) window.renderSayKeyboard();
}

function unbindCurrentKey() {
  if (selectedBuyKey && buyBindings[selectedBuyKey]) {
    delete buyBindings[selectedBuyKey];
    saveBuy();
    document.getElementById("buyCommandInput").value = "";
    alert(`Binding für ${selectedBuyKey} entfernt`);
    if (window.renderBuyKeyboard) window.renderBuyKeyboard();
    if (window.renderScriptKeyboard) window.renderScriptKeyboard();
    if (window.renderSayKeyboard) window.renderSayKeyboard();
  } else if (!selectedBuyKey) {
    alert("Bitte wähle zuerst eine Taste aus!");
  } else {
    alert("Keine Buy-Bindung für diese Taste");
  }
}

function renderSavedBinds() {
  let cont = document.getElementById("savedBindsList");
  if (!cont) return;
  cont.innerHTML = "";
  
  if (Object.keys(buyBindings).length === 0) {
    cont.innerHTML = '<div class="empty-message">✨ Keine Buy-Bindings</div>';
    return;
  }
  
  for (let [k, cmd] of Object.entries(buyBindings)) {
    let e = document.createElement("div");
    e.className = "bind-entry";
    e.innerHTML = `<span class="bind-key">bind "${k}"</span> → <span class="bind-command">"${cmd}"</span>`;
    e.onclick = () => {
      selectedBuyKey = k;
      if (window.renderBuyKeyboard) window.renderBuyKeyboard();
      document.getElementById("buyCommandInput").value = cmd;
    };
    cont.appendChild(e);
  }
}

function resetBuy() {
  if (confirm("⚠️ Alle Buy-Bindings löschen? Diese Aktion kann nicht rückgängig gemacht werden!")) {
    buyBindings = {};
    saveBuy();
    if (selectedBuyKey) document.getElementById("buyCommandInput").value = "";
    alert("✅ Alle Buy-Bindings gelöscht.");
    if (window.renderBuyKeyboard) window.renderBuyKeyboard();
    if (window.renderScriptKeyboard) window.renderScriptKeyboard();
    if (window.renderSayKeyboard) window.renderSayKeyboard();
  }
}

window.buyBindings = buyBindings;
window.renderBuyKeyboard = renderBuyKeyboard;
window.saveBuy = saveBuy;
window.loadBuy = loadBuy;