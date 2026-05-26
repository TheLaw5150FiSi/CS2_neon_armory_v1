// ======================== EXPORT ========================
function generateFullExport() {
  let out = "// CS2 NEON CONFIG\n\n";
  for (let [k, cmd] of Object.entries(buyBindings)) out += `bind "${k}" "${cmd}"\n`;
  out += "\n";
  for (let [k, cmd] of Object.entries(sayBindings)) out += `bind "${k}" "${cmd}"\n`;
  out += "\n";
  for (let cmd of globalConfigCommands) out += `${cmd}\n`;
  out += "\n";
  for (let [key, val] of Object.entries(scriptBindings)) out += `${val}\n\n`;
  return out;
}

function refreshFullExport() {
  let ta = document.getElementById("fullExportTextarea");
  if (ta) ta.value = generateFullExport();
}

function copyFullExport() {
  navigator.clipboard.writeText(generateFullExport());
  alert("Export kopiert!");
}

function downloadFullCfg() {
  let blob = new Blob([generateFullExport()], { type: "text/plain" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "cs2_neon_autoexec.cfg";
  a.click();
  URL.revokeObjectURL(a.href);
  alert("Download: cs2_neon_autoexec.cfg");
}

window.refreshFullExport = refreshFullExport;