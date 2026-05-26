// ======================== START OPTIONEN ========================
function loadStartOptions() {
  let saved = localStorage.getItem("cs2_neon_startoptions");
  if (saved) {
    let data = JSON.parse(saved);
    for (let i = 0; i < startOptionsList.length; i++) {
      if (data[i]) {
        startOptionsList[i].selected = data[i].selected;
        if (startOptionsList[i].hasValue && data[i].value) startOptionsList[i].value = data[i].value;
      }
    }
  }
  renderStartOptionsUI();
}

function saveStartOptions() {
  localStorage.setItem("cs2_neon_startoptions", JSON.stringify(startOptionsList.map((opt) => ({ selected: opt.selected, value: opt.value }))));
}

function renderStartOptionsUI() {
  const container = document.getElementById("startOptionsContainer");
  if (!container) return;
  container.innerHTML = "";
  startOptionsList.forEach((opt) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "start-opt-item";
    const headerDiv = document.createElement("div");
    headerDiv.className = "start-opt-header";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = opt.selected;
    checkbox.onchange = () => {
      opt.selected = checkbox.checked;
      saveStartOptions();
      updateStartOptionsPreview();
    };
    const label = document.createElement("label");
    label.textContent = opt.cmd;
    headerDiv.appendChild(checkbox);
    headerDiv.appendChild(label);
    itemDiv.appendChild(headerDiv);
    const descSpan = document.createElement("div");
    descSpan.className = "start-opt-desc";
    descSpan.textContent = opt.desc;
    itemDiv.appendChild(descSpan);
    if (opt.hasValue) {
      const select = document.createElement("select");
      select.className = "start-opt-select";
      opt.values.forEach((val) => {
        const option = document.createElement("option");
        option.value = val;
        option.textContent = val;
        if (opt.value === val) option.selected = true;
        select.appendChild(option);
      });
      select.onchange = () => {
        opt.value = select.value;
        saveStartOptions();
        updateStartOptionsPreview();
      };
      itemDiv.appendChild(select);
    }
    container.appendChild(itemDiv);
  });
  updateStartOptionsPreview();
}

function getSelectedStartOptionsString() {
  const selected = [];
  for (let opt of startOptionsList)
    if (opt.selected) selected.push(opt.hasValue ? `${opt.cmd} ${opt.value}` : opt.cmd);
  return selected.join(" ");
}

function updateStartOptionsPreview() {
  const previewElem = document.getElementById("generatedStartOptions");
  if (previewElem) previewElem.textContent = getSelectedStartOptionsString() || "(Keine)";
}

function copyStartOptionsToClipboard() {
  const text = getSelectedStartOptionsString();
  if (text) navigator.clipboard.writeText(text).then(() => alert("✅ Kopiert!"));
  else alert("❌ Keine Optionen");
}

function resetStartOptionsToDefault() {
  startOptionsList.forEach((opt) => {
    if (opt.cmd === "-console") opt.selected = true;
    else opt.selected = false;
    if (opt.cmd === "-refresh") opt.value = "144";
    if (opt.cmd === "-threads") opt.value = "8";
  });
  saveStartOptions();
  renderStartOptionsUI();
  alert("✅ Zurückgesetzt!");
}