// ======================== BUYSCRIPT ========================
let buyBindings = {};
let selectedBuyKey = null;
let currentCategory = "Pistole";

function loadBuy() {
  let s = localStorage.getItem("cs2_neon_buy_unique");
  buyBindings = s ? JSON.parse(s) : {};
  renderSavedBinds();
  if (window.refreshFullExport) window.refreshFullExport();
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
  mainKeysRows.forEach((row) => {
    let rd = document.createElement("div");
    rd.className = "key-row";
    row.forEach((k) => {
      let d = document.createElement("div");
      d.className = `key ${getKeyClass(k)}`;
      if (selectedBuyKey === k) d.classList.add("active-key");
      d.textContent = k;
      d.onclick = () => {
        selectedBuyKey = k;
        renderBuyKeyboard();
        document.getElementById("buyCommandInput").value = buyBindings[k] || "";
      };
      rd.appendChild(d);
    });
    mainCont.appendChild(rd);
  });
  const numCont = document.getElementById("numpadContainer");
  if (!numCont) return;
  numCont.innerHTML = "";
  numpadKeys.forEach((k) => {
    let d = document.createElement("div");
    d.className = `numpad-key ${getKeyClass(k)}`;
    if (selectedBuyKey === k) d.style.background = "var(--accent)";
    d.textContent = k.replace("KP_", "");
    d.onclick = () => {
      selectedBuyKey = k;
      renderBuyKeyboard();
      document.getElementById("buyCommandInput").value = buyBindings[k] || "";
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
        alert("Taste wählen!");
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
    alert("Keine Taste");
    return;
  }
  let val = document.getElementById("buyCommandInput").value.trim();
  if (!val) return;
  if (buyBindings[selectedBuyKey] !== val && buyBindings[selectedBuyKey] && !confirm(`Taste "${selectedBuyKey}" bereits gebunden. Überschreiben?`)) return;
  buyBindings[selectedBuyKey] = val;
  saveBuy();
  alert(`Bindung für ${selectedBuyKey} gespeichert`);
}

function unbindCurrentKey() {
  if (selectedBuyKey && buyBindings[selectedBuyKey]) {
    delete buyBindings[selectedBuyKey];
    saveBuy();
    document.getElementById("buyCommandInput").value = "";
    alert(`Binding für ${selectedBuyKey} entfernt`);
  } else alert("Keine Bindung");
}

function renderSavedBinds() {
  let cont = document.getElementById("savedBindsList");
  if (!cont) return;
  cont.innerHTML = "";
  if (Object.keys(buyBindings).length === 0) {
    cont.innerHTML = '<div class="empty-message">✨ Keine Bindings</div>';
    return;
  }
  for (let [k, cmd] of Object.entries(buyBindings)) {
    let e = document.createElement("div");
    e.className = "bind-entry";
    e.innerHTML = `<span class="bind-key">bind "${k}"</span> → <span class="bind-command">"${cmd}"</span>`;
    cont.appendChild(e);
  }
}

function resetBuy() {
  if (confirm("Alle Buy-Bindings löschen?")) {
    buyBindings = {};
    saveBuy();
    if (selectedBuyKey) document.getElementById("buyCommandInput").value = "";
    alert("Alle Buy-Bindings gelöscht.");
  }
}

// Globale Zugänglichkeit für andere Module
window.buyBindings = buyBindings;
window.renderBuyKeyboard = renderBuyKeyboard;