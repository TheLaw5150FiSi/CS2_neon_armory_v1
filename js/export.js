// ======================== EXPORT MIT KATEGORIEN ========================

function generateFullExport() {
  let out = "";
  
  // ========== HEADER ==========
  out += "// ==========================================\n";
  out += "//           CS2 NEON ARMORY CONFIG\n";
  out += "// ==========================================\n";
  out += `// Generiert: ${new Date().toLocaleString()}\n`;
  out += "// ==========================================\n\n";
  
  // ========== 1. BUY BINDS ==========
  if (Object.keys(buyBindings).length > 0) {
    out += "// ========== 🛒 BUY BINDS ==========\n";
    out += "// Einkaufsbefehle für Waffen und Ausrüstung\n";
    for (let [k, cmd] of Object.entries(buyBindings)) {
      out += `bind "${k}" "${cmd}"\n`;
    }
    out += "\n";
  }
  
  // ========== 2. SAY BINDS ==========
  if (Object.keys(sayBindings).length > 0) {
    out += "// ========== 💬 SAY BINDS ==========\n";
    out += "// Chat-Nachrichten (Team / Alle)\n";
    for (let [k, cmd] of Object.entries(sayBindings)) {
      out += `bind "${k}" "${cmd}"\n`;
    }
    out += "\n";
  }
  
  // ========== 3. CONFIG BEFEHLE (mit Unterkategorien) ==========
  if (globalConfigCommands.length > 0) {
    out += "// ========== ⚙️ CONFIG BEFEHLE ==========\n";
    out += "// System- und Performance-Einstellungen\n";
    
    // Nach Hauptkategorien gruppieren
    const groupedCommands = {};
    
    for (let i = 0; i < globalConfigCommands.length; i++) {
      const cmd = globalConfigCommands[i];
      const meta = configMetadata[i];
      
      if (meta && meta.mainCat) {
        if (!groupedCommands[meta.mainCat]) {
          groupedCommands[meta.mainCat] = {};
        }
        if (meta.subCat) {
          if (!groupedCommands[meta.mainCat][meta.subCat]) {
            groupedCommands[meta.mainCat][meta.subCat] = [];
          }
          groupedCommands[meta.mainCat][meta.subCat].push(cmd);
        } else {
          if (!groupedCommands[meta.mainCat]["Allgemein"]) {
            groupedCommands[meta.mainCat]["Allgemein"] = [];
          }
          groupedCommands[meta.mainCat]["Allgemein"].push(cmd);
        }
      } else {
        // Fallback für Befehle ohne Metadaten
        if (!groupedCommands["📦 Weitere Befehle"]) {
          groupedCommands["📦 Weitere Befehle"] = {};
        }
        if (!groupedCommands["📦 Weitere Befehle"]["Allgemein"]) {
          groupedCommands["📦 Weitere Befehle"]["Allgemein"] = [];
        }
        groupedCommands["📦 Weitere Befehle"]["Allgemein"].push(cmd);
      }
    }
    
    // Gruppierte Ausgabe
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
  
  // ========== 4. SKRIPT BINDS (mit Namen) ==========
// ========== 4. SKRIPT BINDS (mit Namen) ==========
if (scriptBindings && Object.keys(scriptBindings).length > 0) {
    out += "// ========== 🎮 SKRIPT BINDS ==========\n";
    out += "// Aliase und Makros für spezielle Aktionen\n\n";
    
    for (let [key, val] of Object.entries(scriptBindings)) {
      // Skriptnamen aus dem Kommentar extrahieren
      const nameMatch = val.match(/\/\/ (.*?)\n/);
      const scriptName = nameMatch ? nameMatch[1] : "Unbenanntes Skript";
      
      out += `// ===== ${scriptName} (Taste: ${key}) =====\n`;
      
      // Entferne die bind-Zeile aus dem Content (falls vorhanden)
      let contentWithoutBind = val.replace(/bind\s+"[^"]*"\s+[^\n]*\n?/g, "");
      // Entferne den ersten Kommentar (Skriptname)
      contentWithoutBind = contentWithoutBind.replace(/^\/\/ .*?\n/, "");
      // Entferne leere Zeilen am Anfang und Ende
      contentWithoutBind = contentWithoutBind.trim();
      
      if (contentWithoutBind) {
        out += contentWithoutBind;
        if (!contentWithoutBind.endsWith("\n")) out += "\n";
      }
      
      // Jetzt den bind-Befehl extrahieren (nur wenn er nicht schon in contentWithoutBind war)
      // Aber Achtung: Der bind-Befehl sollte NUR HIER einmal ausgegeben werden, nicht doppelt!
      // Der bind-Befehl wird aus dem Original extrahiert
      const bindMatch = val.match(/bind\s+"[^"]*"\s+"([^"]+)"/);
      if (bindMatch && bindMatch[1]) {
        out += `bind "${key}" "${bindMatch[1]}"\n`;
      }
      
      out += "\n";
    }
}
  
  // ========== 5. START OPTIONEN (nur wenn vorhanden) ==========
  const startOpts = getSelectedStartOptionsString();
  if (startOpts && startOpts !== "(Keine)") {
    out += "// ========== 🚀 START OPTIONEN ==========\n";
    out += "// Für Steam → CS2 → Eigenschaften → Startoptionen\n";
    out += `// ${startOpts}\n\n`;
  }
  
  // ========== FOOTER ==========
  out += "// ==========================================\n";
  out += "//           Ende der Konfiguration\n";
  out += "// ==========================================\n";
  
  return out;
}

// Hilfsfunktion: Extrahiert den eigentlichen Befehl aus dem Skript
function getScriptBindingCommand(scriptContent) {
  // Suche nach der bind-Zeile im Skript
  const bindMatch = scriptContent.match(/bind ".*?" "(.+?)"/);
  if (bindMatch && bindMatch[1]) {
    return bindMatch[1];
  }
  
  // Fallback: Suche nach dem Alias-Namen
  const aliasMatch = scriptContent.match(/alias \+\w+/);
  if (aliasMatch) {
    return aliasMatch[0].replace("alias ", "");
  }
  
  return "script_execute";
}

// ========== OPTIONALE: EXPORT ALS JSON (für Fortgeschrittene) ==========
function generateJSONExport() {
  const exportData = {
    metadata: {
      version: "1.0",
      generated: new Date().toISOString(),
      tool: "CS2 Neon Armory"
    },
    buyBindings: buyBindings,
    sayBindings: sayBindings,
    configs: {
      commands: globalConfigCommands,
      metadata: configMetadata,
      preset: currentPreset
    },
    scripts: scriptBindings,
    startOptions: getSelectedStartOptionsString()
  };
  
  return JSON.stringify(exportData, null, 2);
}

// ========== AKTUALISIERUNGS-FUNKTIONEN ==========
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

// Optional: JSON-Export (falls du einen Button dafür hast)
function downloadJSONExport() {
  let blob = new Blob([generateJSONExport()], { type: "application/json" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "cs2_neon_backup.json";
  a.click();
  URL.revokeObjectURL(a.href);
  alert("✅ Backup als JSON gespeichert!");
}

// Globale Funktionen für andere Module
window.refreshFullExport = refreshFullExport;
window.generateFullExport = generateFullExport;