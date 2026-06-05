// ======================== EXPORT MIT KATEGORIEN ========================

function generateFullExport() {
  let out = "";

  out += "// ==========================================\n";
  out += "//           CS2 NEON ARMORY CONFIG\n";
  out += "// ==========================================\n";
  out += `// Generiert: ${new Date().toLocaleString()}\n`;
  out += "// ==========================================\n\n";

  // ========== 1. DEFAULT BINDS (CS2 Standard) ==========
  if (window.cs2DefaultBinds && Object.keys(window.cs2DefaultBinds).length > 0) {
    out += "// ========== ⭐ DEFAULT BINDS (CS2 Standard) ==========\n";
    out += "// Diese Tasten sind standardmäßig in CS2 belegt\n";
    out += "// Werden von benutzerdefinierten Bindings überschrieben\n";
    const sortedKeys = Object.keys(window.cs2DefaultBinds).sort();
    for (let k of sortedKeys) {
      out += `bind "${k}" "${window.cs2DefaultBinds[k]}"\n`;
    }
    out += "\n";
  }

  // ========== 2. BENUTZERDEFINIERTE BUY BINDS ==========
  if (window.buyBindings && Object.keys(window.buyBindings).length > 0) {
    out += "// ========== 🛒 BUY BINDS (benutzerdefiniert) ==========\n";
    out += "// Überschreibt die Standardbelegung\n";
    const sortedKeys = Object.keys(window.buyBindings).sort();
    for (let k of sortedKeys) {
      out += `bind "${k}" "${window.buyBindings[k]}"\n`;
    }
    out += "\n";
  }

  // ========== 3. BENUTZERDEFINIERTE SAY BINDS ==========
  if (window.sayBindings && Object.keys(window.sayBindings).length > 0) {
    out += "// ========== 💬 SAY BINDS (benutzerdefiniert) ==========\n";
    out += "// Überschreibt die Standardbelegung\n";
    const sortedKeys = Object.keys(window.sayBindings).sort();
    for (let k of sortedKeys) {
      out += `bind "${k}" "${window.sayBindings[k]}"\n`;
    }
    out += "\n";
  }

  // ========== 4. BENUTZERDEFINIERTE SKRIPT BINDS ==========
  if (window.scriptBindings && Object.keys(window.scriptBindings).length > 0) {
    out += "// ========== 🎮 SKRIPT BINDS (benutzerdefiniert) ==========\n";
    out += "// Aliase und Makros - überschreibt Standardbelegung\n\n";

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

  // ========== 5. CONFIG BEFEHLE ==========
  if (typeof globalConfigCommands !== "undefined" && globalConfigCommands.length > 0) {
    out += "// ========== ⚙️ CONFIG BEFEHLE ==========\n";
    for (let cmd of globalConfigCommands) {
      out += `${cmd}\n`;
    }
    out += "\n";
  }

  // ========== 6. START OPTIONEN ==========
  if (typeof getSelectedStartOptionsString === "function") {
    const startOpts = getSelectedStartOptionsString();
    if (startOpts && startOpts !== "(Keine)") {
      out += "// ========== 🚀 START OPTIONEN ==========\n";
      out += `// ${startOpts}\n\n`;
    }
  }

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
