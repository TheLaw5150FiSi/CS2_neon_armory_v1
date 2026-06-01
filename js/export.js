// ======================== EXPORT MIT KATEGORIEN ========================

function generateFullExport() {
  let out = "";

  // ========== HEADER ==========
  out += "// ==========================================\n";
  out += "//           CS2 NEON ARMORY CONFIG\n";
  out += "// ==========================================\n";
  out += `// Generiert: ${new Date().toLocaleString()}\n`;
  out += "// ==========================================\n\n";

  // ========== 1. BUY BINDS (sortiert) ==========
  if (window.buyBindings && Object.keys(window.buyBindings).length > 0) {
    out += "// ========== 🛒 BUY BINDS ==========\n";
    out += "// Einkaufsbefehle für Waffen und Ausrüstung\n";
    const sortedKeys = Object.keys(window.buyBindings).sort();
    for (let k of sortedKeys) {
      out += `bind "${k}" "${window.buyBindings[k]}"\n`;
    }
    out += "\n";
  }

  // ========== 2. SAY BINDS (sortiert) ==========
  if (window.sayBindings && Object.keys(window.sayBindings).length > 0) {
    out += "// ========== 💬 SAY BINDS ==========\n";
    out += "// Chat-Nachrichten (Team / Alle)\n";
    const sortedKeys = Object.keys(window.sayBindings).sort();
    for (let k of sortedKeys) {
      out += `bind "${k}" "${window.sayBindings[k]}"\n`;
    }
    out += "\n";
  }


  // ========== 3. SKRIP BINDS ==========
  if (window.scriptBindings && Object.keys(window.scriptBindings).length > 0) {
    out += "// ========== 🎮 SKRIPT BINDS ==========\n";
    out += "// Aliase und Makros für spezielle Aktionen\n\n";

    const sortedKeys = Object.keys(window.scriptBindings).sort();
    for (let key of sortedKeys) {
      let val = window.scriptBindings[key];
      const nameMatch = val.match(/\/\/ (.*?)\n/);
      const scriptName = nameMatch ? nameMatch[1] : "Unbenanntes Skript";

      out += `// ===== ${scriptName} (Taste: ${key}) =====\n`;

      let contentWithoutBind = val.replace(/bind\s+"[^"]*"\s+[^\n]*\n?/g, "");
      contentWithoutBind = contentWithoutBind.replace(/^\/\/ .*?\n/, "");
      contentWithoutBind = contentWithoutBind.trim();

      if (contentWithoutBind) {
        out += contentWithoutBind;
        if (!contentWithoutBind.endsWith("\n")) out += "\n";
      }

      const bindMatch = val.match(/bind\s+"[^"]*"\s+"([^"]+)"/);
      if (bindMatch && bindMatch[1]) {
        out += `bind "${key}" "${bindMatch[1]}"\n`;
      }

      out += "\n";
    }
  }

  // ========== 4. CONFIG BEFEHLE ==========
  if (
    typeof globalConfigCommands !== "undefined" &&
    globalConfigCommands.length > 0
  ) {
    out += "// ========== ⚙️ CONFIG BEFEHLE ==========\n";
    out += "// System- und Performance-Einstellungen\n";

    const groupedCommands = {};

    for (let i = 0; i < globalConfigCommands.length; i++) {
      const cmd = globalConfigCommands[i];
      const meta =
        typeof configMetadata !== "undefined" && configMetadata[i]
          ? configMetadata[i]
          : null;

      if (meta && meta.mainCat) {
        if (!groupedCommands[meta.mainCat]) groupedCommands[meta.mainCat] = {};
        const subKey = meta.subCat || "Allgemein";
        if (!groupedCommands[meta.mainCat][subKey])
          groupedCommands[meta.mainCat][subKey] = [];
        groupedCommands[meta.mainCat][subKey].push(cmd);
      } else {
        if (!groupedCommands["📦 Weitere Befehle"])
          groupedCommands["📦 Weitere Befehle"] = {};
        if (!groupedCommands["📦 Weitere Befehle"]["Allgemein"])
          groupedCommands["📦 Weitere Befehle"]["Allgemein"] = [];
        groupedCommands["📦 Weitere Befehle"]["Allgemein"].push(cmd);
      }
    }

    for (const [mainCat, subCats] of Object.entries(groupedCommands)) {
      out += `\n  // ----- ${mainCat} -----\n`;
      for (const [subCat, commands] of Object.entries(subCats)) {
        if (commands.length > 0) {
          out += `  // [${subCat}]\n`;
          for (const cmd of commands) {
            out += `  ${cmd}\n`;
          }
        }
      }
    }
    out += "\n";
  }

  // ========== 5. START OPTIONEN ==========
  if (typeof getSelectedStartOptionsString === "function") {
    const startOpts = getSelectedStartOptionsString();
    if (startOpts && startOpts !== "(Keine)") {
      out += "// ========== 🚀 START OPTIONEN ==========\n";
      out += "// Für Steam → CS2 → Eigenschaften → Startoptionen\n";
      out += `// ${startOpts}\n\n`;
    }
  }

  // ========== FOOTER ==========
  out += "// ==========================================\n";
  out += "//           Ende der Konfiguration\n";
  out += "// ==========================================\n";

  return out;
}

function refreshFullExport() {
  let ta = document.getElementById("fullExportTextarea");
  if (ta) ta.value = generateFullExport();
}

function copyFullExport() {
  navigator.clipboard.writeText(generateFullExport());
  alert("✅ Export in die Zwischenablage kopiert!");
}

function downloadFullCfg() {
  let blob = new Blob([generateFullExport()], { type: "text/plain" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "cs2_neon_autoexec.cfg";
  a.click();
  URL.revokeObjectURL(a.href);
  alert("✅ Download: cs2_neon_autoexec.cfg");
}

// Globale Funktionen für andere Module
window.refreshFullExport = refreshFullExport;
window.generateFullExport = generateFullExport;
