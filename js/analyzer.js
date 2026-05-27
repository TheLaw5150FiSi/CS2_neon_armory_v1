// ======================== CPU DROPDOWN GENERIEREN ========================
// ======================== SYSTEM ANALYZER ========================
function populateCpuSelect() {
  const select = document.getElementById("analyzerCpuSelect");
  if (!select) {
    console.error("select Element nicht gefunden!");
    return;
  }

  console.log("CPU Liste wird geladen...");
  console.log("Anzahl CPUs:", Object.keys(analyzerCpuData).length);

  // ======================== INTEL GENERATIONEN ========================
  const intelGenerations = {
    "Intel Core Ultra (2024-2025)": [],
    "Intel 14. Gen (Raptor Lake Refresh)": [],
    "Intel 13. Gen (Raptor Lake)": [],
    "Intel 12. Gen (Alder Lake)": [],
    "Intel 11. Gen (Rocket Lake)": [],
    "Intel 10. Gen (Comet Lake)": [],
    "Intel 9. Gen (Coffee Lake Refresh)": [],
    "Intel 8. Gen (Coffee Lake)": [],
    "Intel 7. Gen (Kaby Lake)": [],
    "Intel 6. Gen (Skylake)": [],
    "Intel 5. Gen (Broadwell)": [],
    "Intel 4. Gen (Haswell)": [],
    "Intel 3. Gen (Ivy Bridge)": [],
    "Intel 2. Gen (Sandy Bridge)": [],
    "Intel 1. Gen (Nehalem/Westmere)": [],
    "Intel Pentium / Celeron": []
  };

  // ======================== AMD GENERATIONEN ========================
  const amdGenerations = {
    "AMD Ryzen 9000 Series (Zen 5)": [],
    "AMD Ryzen 8000 Series (Zen 4 APU)": [],
    "AMD Ryzen 7000 Series (Zen 4)": [],
    "AMD Ryzen 5000 Series (Zen 3)": [],
    "AMD Ryzen 4000 Series (Zen 2 APU)": [],
    "AMD Ryzen 3000 Series (Zen 2)": [],
    "AMD Ryzen 2000 Series (Zen+)": [],
    "AMD Ryzen 1000 Series (Zen)": [],
    "AMD Threadripper": [],
    "AMD FX Series": [],
    "AMD A-Series APU": [],
    "AMD Phenom Series": [],
    "AMD Athlon Series": [],
    "AMD Sempron Series": []
  };

  // ======================== CPU ZUORDNUNG ========================
  for (const [cpuName, score] of Object.entries(analyzerCpuData)) {
    let zugeordnet = false;

    // ===== INTEL ERKENNUNG =====
    // Intel hat typischerweise i3, i5, i7, i9, Pentium, Celeron, Ultra
    if (cpuName.includes("i3-") || cpuName.includes("i5-") || cpuName.includes("i7-") || 
        cpuName.includes("i9-") || cpuName.includes("Pentium") || cpuName.includes("Celeron") ||
        cpuName.includes("Ultra") || cpuName.startsWith("Intel")) {
      
      // Core Ultra
      if (cpuName.includes("Ultra")) {
        intelGenerations["Intel Core Ultra (2024-2025)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 14. Gen
      else if (cpuName.includes("14900") || cpuName.includes("14700") || cpuName.includes("14600") || 
               cpuName.includes("14500") || cpuName.includes("14400") || cpuName.includes("14100")) {
        intelGenerations["Intel 14. Gen (Raptor Lake Refresh)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 13. Gen
      else if (cpuName.includes("13900") || cpuName.includes("13700") || cpuName.includes("13600") || 
               cpuName.includes("13500") || cpuName.includes("13400") || cpuName.includes("13100")) {
        intelGenerations["Intel 13. Gen (Raptor Lake)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 12. Gen
      else if (cpuName.includes("12900") || cpuName.includes("12700") || cpuName.includes("12600") || 
               cpuName.includes("12500") || cpuName.includes("12400") || cpuName.includes("12490") ||
               cpuName.includes("12100")) {
        intelGenerations["Intel 12. Gen (Alder Lake)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 11. Gen
      else if (cpuName.includes("11900") || cpuName.includes("11700") || cpuName.includes("11600") || 
               cpuName.includes("11500") || cpuName.includes("11400")) {
        intelGenerations["Intel 11. Gen (Rocket Lake)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 10. Gen
      else if (cpuName.includes("10900") || cpuName.includes("10700") || cpuName.includes("10600") || 
               cpuName.includes("10500") || cpuName.includes("10400") || cpuName.includes("10300") ||
               cpuName.includes("10325") || cpuName.includes("10100") || cpuName.includes("10105")) {
        intelGenerations["Intel 10. Gen (Comet Lake)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 9. Gen
      else if (cpuName.includes("9900") || cpuName.includes("9700") || cpuName.includes("9600") || 
               cpuName.includes("9500") || cpuName.includes("9400") || cpuName.includes("9300") ||
               cpuName.includes("9350") || cpuName.includes("9100")) {
        intelGenerations["Intel 9. Gen (Coffee Lake Refresh)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 8. Gen
      else if (cpuName.includes("8700") || cpuName.includes("8600") || cpuName.includes("8500") || 
               cpuName.includes("8400") || cpuName.includes("8300") || cpuName.includes("8350") ||
               cpuName.includes("8100") || cpuName.includes("8086")) {
        intelGenerations["Intel 8. Gen (Coffee Lake)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 7. Gen
      else if (cpuName.includes("7700") || cpuName.includes("7600") || cpuName.includes("7500") || 
               cpuName.includes("7400") || cpuName.includes("7350") || cpuName.includes("7320") ||
               cpuName.includes("7300") || cpuName.includes("7100")) {
        intelGenerations["Intel 7. Gen (Kaby Lake)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 6. Gen
      else if (cpuName.includes("6700") || cpuName.includes("6600") || cpuName.includes("6500") || 
               cpuName.includes("6400") || cpuName.includes("6402") || cpuName.includes("6320") ||
               cpuName.includes("6300") || cpuName.includes("6100")) {
        intelGenerations["Intel 6. Gen (Skylake)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 5. Gen
      else if (cpuName.includes("5775") || cpuName.includes("5675")) {
        intelGenerations["Intel 5. Gen (Broadwell)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 4. Gen
      else if (cpuName.includes("4790") || cpuName.includes("4770") || cpuName.includes("4771") ||
               cpuName.includes("4690") || cpuName.includes("4670") || cpuName.includes("4590") ||
               cpuName.includes("4460") || cpuName.includes("4440") || cpuName.includes("4430") ||
               cpuName.includes("4370") || cpuName.includes("4360") || cpuName.includes("4350") ||
               cpuName.includes("4340") || cpuName.includes("4330") || cpuName.includes("4170") ||
               cpuName.includes("4160") || cpuName.includes("4150") || cpuName.includes("4130")) {
        intelGenerations["Intel 4. Gen (Haswell)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 3. Gen
      else if (cpuName.includes("3770") || cpuName.includes("3570") || cpuName.includes("3550") ||
               cpuName.includes("3470") || cpuName.includes("3450") || cpuName.includes("3350") ||
               cpuName.includes("3330") || cpuName.includes("3240") || cpuName.includes("3225") ||
               cpuName.includes("3220")) {
        intelGenerations["Intel 3. Gen (Ivy Bridge)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 2. Gen
      else if (cpuName.includes("2700") || cpuName.includes("2600") || cpuName.includes("2550") ||
               cpuName.includes("2500") || cpuName.includes("2400") || cpuName.includes("2390") ||
               cpuName.includes("2320") || cpuName.includes("2300") || cpuName.includes("2130") ||
               cpuName.includes("2125") || cpuName.includes("2120") || cpuName.includes("2105") ||
               cpuName.includes("2100")) {
        intelGenerations["Intel 2. Gen (Sandy Bridge)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // 1. Gen
      else if (cpuName.includes("990X") || cpuName.includes("980X") || cpuName.includes("975") ||
               cpuName.includes("970") || cpuName.includes("965") || cpuName.includes("960") ||
               cpuName.includes("950") || cpuName.includes("940") || cpuName.includes("930") ||
               cpuName.includes("920") || cpuName.includes("880") || cpuName.includes("870") ||
               cpuName.includes("860") || cpuName.includes("760") || cpuName.includes("750") ||
               cpuName.includes("680") || cpuName.includes("670") || cpuName.includes("661") ||
               cpuName.includes("660") || cpuName.includes("655") || cpuName.includes("650") ||
               cpuName.includes("560") || cpuName.includes("550") || cpuName.includes("540") ||
               cpuName.includes("530")) {
        intelGenerations["Intel 1. Gen (Nehalem/Westmere)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // Pentium / Celeron
      else if (cpuName.includes("Pentium") || cpuName.includes("Celeron")) {
        intelGenerations["Intel Pentium / Celeron"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
    }

    // ===== AMD ERKENNUNG =====
    // AMD hat typischerweise Ryzen, TR, FX, A, Athlon, Phenom, Sempron
    if (!zugeordnet && (cpuName.includes("Ryzen") || cpuName.includes("TR ") || 
        cpuName.includes("FX-") || cpuName.includes("A10-") || cpuName.includes("A8-") ||
        cpuName.includes("A6-") || cpuName.includes("A4-") || cpuName.includes("Athlon") ||
        cpuName.includes("Phenom") || cpuName.includes("Sempron") || cpuName.startsWith("AMD"))) {
      
      // Threadripper
      if (cpuName.includes("TR ") || cpuName.includes("Threadripper")) {
        amdGenerations["AMD Threadripper"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // Ryzen 9000
      else if (cpuName.includes("9950") || cpuName.includes("9900") || cpuName.includes("9850") ||
               cpuName.includes("9800") || cpuName.includes("9700") || cpuName.includes("9600")) {
        amdGenerations["AMD Ryzen 9000 Series (Zen 5)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // Ryzen 8000 APU
      else if (cpuName.includes("8700G") || cpuName.includes("8600G") || cpuName.includes("8500G") ||
               cpuName.includes("8300G")) {
        amdGenerations["AMD Ryzen 8000 Series (Zen 4 APU)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // Ryzen 7000
      else if (cpuName.includes("7950") || cpuName.includes("7900") || cpuName.includes("7800") ||
               cpuName.includes("7700") || cpuName.includes("7600") || cpuName.includes("7500F")) {
        amdGenerations["AMD Ryzen 7000 Series (Zen 4)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // Ryzen 5000
      else if (cpuName.includes("5950") || cpuName.includes("5900") || cpuName.includes("5800") ||
               cpuName.includes("5700") || cpuName.includes("5600") || cpuName.includes("5500") ||
               cpuName.includes("5300")) {
        amdGenerations["AMD Ryzen 5000 Series (Zen 3)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // Ryzen 4000 APU
      else if (cpuName.includes("4700G") || cpuName.includes("4600G") || cpuName.includes("4500") ||
               cpuName.includes("4300G") || cpuName.includes("4100")) {
        amdGenerations["AMD Ryzen 4000 Series (Zen 2 APU)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // Ryzen 3000
      else if (cpuName.includes("3950") || cpuName.includes("3900") || cpuName.includes("3800") ||
               cpuName.includes("3700") || cpuName.includes("3600") || cpuName.includes("3500") ||
               cpuName.includes("3400") || cpuName.includes("3300") || cpuName.includes("3200") ||
               cpuName.includes("3100")) {
        amdGenerations["AMD Ryzen 3000 Series (Zen 2)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // Ryzen 2000
      else if (cpuName.includes("2700") || cpuName.includes("2600") || cpuName.includes("2500") ||
               cpuName.includes("2400") || cpuName.includes("2300") || cpuName.includes("2200")) {
        amdGenerations["AMD Ryzen 2000 Series (Zen+)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // Ryzen 1000
      else if (cpuName.includes("1800") || cpuName.includes("1700") || cpuName.includes("1600") ||
               cpuName.includes("1500") || cpuName.includes("1400") || cpuName.includes("1300") ||
               cpuName.includes("1200")) {
        amdGenerations["AMD Ryzen 1000 Series (Zen)"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // FX Series
      else if (cpuName.includes("FX-")) {
        amdGenerations["AMD FX Series"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // A-Series
      else if (cpuName.match(/A\d{1,2}-/)) {
        amdGenerations["AMD A-Series APU"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // Phenom
      else if (cpuName.includes("Phenom")) {
        amdGenerations["AMD Phenom Series"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // Athlon
      else if (cpuName.includes("Athlon")) {
        amdGenerations["AMD Athlon Series"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
      // Sempron
      else if (cpuName.includes("Sempron")) {
        amdGenerations["AMD Sempron Series"].push({ name: cpuName, score: score });
        zugeordnet = true;
      }
    }

    // Fallback für nicht zugeordnete CPUs
    if (!zugeordnet) {
      console.warn("Nicht zugeordnete CPU:", cpuName);
    }
  }

  // ======================== DROPDOWN BAUEN ========================
  select.innerHTML = '<option value="" disabled selected>-- CPU auswählen --</option>';

  // 1. ALLE INTEL GENERATIONEN (in der definierten Reihenfolge)
  for (const [genName, cpus] of Object.entries(intelGenerations)) {
    if (cpus.length > 0) {
      // Nach Punktzahl sortieren (höchste zuerst)
      cpus.sort((a, b) => b.score - a.score);
      
      const optgroup = document.createElement("optgroup");
      optgroup.label = `${genName} (${cpus.length})`;
      
      for (const cpu of cpus) {
        const option = document.createElement("option");
        option.value = cpu.name;
        option.textContent = cpu.name;
        optgroup.appendChild(option);
      }
      select.appendChild(optgroup);
    }
  }

  // 2. ALLE AMD GENERATIONEN (in der definierten Reihenfolge)
  for (const [genName, cpus] of Object.entries(amdGenerations)) {
    if (cpus.length > 0) {
      // Nach Punktzahl sortieren (höchste zuerst)
      cpus.sort((a, b) => b.score - a.score);
      
      const optgroup = document.createElement("optgroup");
      optgroup.label = `${genName} (${cpus.length})`;
      
      for (const cpu of cpus) {
        const option = document.createElement("option");
        option.value = cpu.name;
        option.textContent = cpu.name;
        optgroup.appendChild(option);
      }
      select.appendChild(optgroup);
    }
  }

  console.log("FERTIG! Intel Gruppen:", Object.values(intelGenerations).filter(g => g.length > 0).length);
  console.log("FERTIG! AMD Gruppen:", Object.values(amdGenerations).filter(g => g.length > 0).length);
}

// ======================== GPU DROPDOWN GENERIEREN ========================
function populateGpuSelect() {
  const select = document.getElementById("analyzerGpuSelect");
  if (!select) {
    console.error("GPU select Element nicht gefunden!");
    return;
  }

  console.log("GPU Liste wird geladen...");
  console.log("Anzahl GPUs:", Object.keys(analyzerGpuData).length);

  // GPU-Gruppen definieren (wie bei CPU)
  const gpuGroups = {
    "NVIDIA RTX 50 Series (2025)": [],
    "NVIDIA RTX 40 Series (2022-2024)": [],
    "NVIDIA RTX 30 Series (2020-2022)": [],
    "NVIDIA RTX 20 Series (2018-2020)": [],
    "NVIDIA GTX 16 Series (2019)": [],
    "NVIDIA GTX 10 Series (2016-2018)": [],
    "NVIDIA GTX 9 Series (2014-2016)": [],
    "AMD Radeon RX 9000 Series (2025)": [],
    "AMD Radeon RX 7000 Series (2022-2024)": [],
    "AMD Radeon RX 6000 Series (2020-2022)": [],
    "AMD Radeon RX 5000 Series (2019)": [],
    "AMD Radeon Vega / RX 500 Series (2016-2018)": [],
    "Intel Arc Series (2022-2025)": [],
    "Intel Integrated Graphics": []
  };

  // GPU-Daten in Gruppen sortieren
  for (const [gpuName, score] of Object.entries(analyzerGpuData)) {
    let zugeordnet = false;
    
    // NVIDIA RTX 50 SERIES
    if (gpuName.includes("RTX 5090") || gpuName.includes("RTX 5080") || 
        gpuName.includes("RTX 5070") || gpuName.includes("RTX 5060")) {
      gpuGroups["NVIDIA RTX 50 Series (2025)"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    // NVIDIA RTX 40 SERIES
    else if (gpuName.includes("RTX 4090") || gpuName.includes("RTX 4080") || 
             gpuName.includes("RTX 4070") || gpuName.includes("RTX 4060")) {
      gpuGroups["NVIDIA RTX 40 Series (2022-2024)"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    // NVIDIA RTX 30 SERIES
    else if (gpuName.includes("RTX 3090") || gpuName.includes("RTX 3080") || 
             gpuName.includes("RTX 3070") || gpuName.includes("RTX 3060") || 
             gpuName.includes("RTX 3050")) {
      gpuGroups["NVIDIA RTX 30 Series (2020-2022)"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    // NVIDIA RTX 20 SERIES
    else if (gpuName.includes("RTX 2080") || gpuName.includes("RTX 2070") || 
             gpuName.includes("RTX 2060")) {
      gpuGroups["NVIDIA RTX 20 Series (2018-2020)"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    // NVIDIA GTX 16 SERIES
    else if (gpuName.includes("GTX 1660") || gpuName.includes("GTX 1650")) {
      gpuGroups["NVIDIA GTX 16 Series (2019)"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    // NVIDIA GTX 10 SERIES
    else if (gpuName.includes("GTX 1080") || gpuName.includes("GTX 1070") || 
             gpuName.includes("GTX 1060") || gpuName.includes("GTX 1050")) {
      gpuGroups["NVIDIA GTX 10 Series (2016-2018)"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    // NVIDIA GTX 9 SERIES
    else if (gpuName.includes("GTX 980") || gpuName.includes("GTX 970") || 
             gpuName.includes("GTX 960") || gpuName.includes("GTX 950")) {
      gpuGroups["NVIDIA GTX 9 Series (2014-2016)"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    // AMD RX 9000 SERIES
    else if (gpuName.includes("RX 9090") || gpuName.includes("RX 9080") || 
             gpuName.includes("RX 9070") || gpuName.includes("RX 9060")) {
      gpuGroups["AMD Radeon RX 9000 Series (2025)"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    // AMD RX 7000 SERIES
    else if (gpuName.includes("RX 7900") || gpuName.includes("RX 7800") || 
             gpuName.includes("RX 7700") || gpuName.includes("RX 7600")) {
      gpuGroups["AMD Radeon RX 7000 Series (2022-2024)"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    // AMD RX 6000 SERIES
    else if (gpuName.includes("RX 6950") || gpuName.includes("RX 6900") || 
             gpuName.includes("RX 6800") || gpuName.includes("RX 6750") ||
             gpuName.includes("RX 6700") || gpuName.includes("RX 6650") ||
             gpuName.includes("RX 6600") || gpuName.includes("RX 6500") ||
             gpuName.includes("RX 6400")) {
      gpuGroups["AMD Radeon RX 6000 Series (2020-2022)"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    // AMD RX 5000 SERIES
    else if (gpuName.includes("RX 5700") || gpuName.includes("RX 5600") || 
             gpuName.includes("RX 5500")) {
      gpuGroups["AMD Radeon RX 5000 Series (2019)"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    // AMD VEGA / RX 500
    else if (gpuName.includes("Vega") || gpuName.includes("RX 590") || 
             gpuName.includes("RX 580") || gpuName.includes("RX 570") ||
             gpuName.includes("RX 480")) {
      gpuGroups["AMD Radeon Vega / RX 500 Series (2016-2018)"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    // INTEL ARC
    else if (gpuName.includes("Arc")) {
      gpuGroups["Intel Arc Series (2022-2025)"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    // INTEL INTEGRATED
    else if (gpuName.includes("UHD") || gpuName.includes("Iris") || gpuName.includes("HD Graphics")) {
      gpuGroups["Intel Integrated Graphics"].push({ name: gpuName, score: score });
      zugeordnet = true;
    }
    
    if (!zugeordnet) {
      console.warn("Nicht zugeordnete GPU:", gpuName);
    }
  }

  // ======================== DROPDOWN BAUEN ========================
  select.innerHTML = '<option value="" disabled selected>-- GPU auswählen --</option>';

  // Alle GPU-Gruppen in der definierten Reihenfolge
  for (const [groupName, gpus] of Object.entries(gpuGroups)) {
    if (gpus.length > 0) {
      // Nach Punktzahl sortieren (höchste zuerst)
      gpus.sort((a, b) => b.score - a.score);
      
      const optgroup = document.createElement("optgroup");
      optgroup.label = `${groupName} (${gpus.length})`;
      
      for (const gpu of gpus) {
        const option = document.createElement("option");
        option.value = gpu.name;
        option.textContent = gpu.name;
        optgroup.appendChild(option);
      }
      select.appendChild(optgroup);
    }
  }

  console.log("FERTIG! GPU Gruppen:", Object.values(gpuGroups).filter(g => g.length > 0).length);
}

function calculateAnalyzerRamScore(ramGB) {
  if (ramGB >= 128) return 2200;
  if (ramGB >= 64) return 1900;
  if (ramGB >= 32) return 1600;
  if (ramGB >= 16) return 1300;
  if (ramGB >= 8) return 800;
  if (ramGB >= 4) return 400;
  return 0;
}

function calculateRamTypeMultiplier(ramType) {
  if (ramType === "DDR5") return 1.0;
  if (ramType === "DDR4") return 0.95;
  if (ramType === "DDR3") return 0.88;
  return 1.0;
}

function calculateMonitorMalus(monitors) {
  if (monitors <= 1) return 1.0;
  return 1.0 - (monitors - 1) * 0.02;
}

function getAnalyzerPerformanceCategory(score) {
  if (score >= 45000) return { label: "Exzellent", icon: "✅", color: "#FFD700", desc: "Flüssiges 4K Gaming mit maximalen Details" };
  if (score >= 30000) return { label: "Gut", icon: "✅", color: "#10B981", desc: "1440p Ultra / 4K mit hohen Einstellungen" };
  if (score >= 18000) return { label: "Akzeptabel", icon: "⚠️", color: "#F59E0B", desc: "1080p Ultra / 1440p mittlere Details" };
  if (score >= 8000) return { label: "Befriedigend", icon: "❌", color: "#EF4444", desc: "1080p mit niedrigen bis mittleren Details" };
  return { label: "Schwach", icon: "❌", color: "#6B7280", desc: "Hardware-Upgrade dringend empfohlen" };
}

function getAnalyzerOptimizationTips(score, cpuScore, gpuScore, ramVal) {
  const tips = [];
  if (score >= 45000) {
    tips.push("🏆 Top-Performer – Nutze das Cinematic Preset", "⚡ Setze fps_max 0", "🎬 MSAA 8x aktivieren", "🖥️ 240Hz+ Monitor empfohlen");
  } else if (score >= 30000) {
    tips.push("✅ Sehr gute Leistung – Balanced Preset", "🎮 Setze fps_max 400", "🖥️ MSAA 4x", "⚡ Aktiviere engine_low_latency_sleep 1");
  } else if (score >= 18000) {
    tips.push("👍 Solides System – HIGH FPS Preset", "🎮 Begrenze fps_max 300", "🎨 Reduziere MSAA auf 2x", "⚡ Deaktiviere r_csm 0");
  } else if (score >= 8000) {
    tips.push("⚠️ Optimierungsbedarf – LOW-END Preset", "🎮 Setze fps_max 144", "📐 Verwende 1024x768", "🌐 Füge -high -nojoy hinzu");
  } else {
    tips.push("❌ Hardware-Upgrade dringend empfohlen", "🎮 Setze fps_max 60", "🎨 Alle Effekte auf Niedrig", "⚡ Füge -threads 4 hinzu");
  }
  if (cpuScore < 10000) tips.unshift("⚠️ CPU ist ein Flaschenhals");
  if (gpuScore < 12000) tips.unshift("⚠️ GPU ist ein Flaschenhals");
  if (ramVal < 16) tips.unshift("⚠️ Nur " + ramVal + "GB RAM – 16GB+ empfohlen");
  return [...new Set(tips)].slice(0, 10);
}

function updateAnalyzerEvaluation() {
  const cpuVal = document.getElementById("analyzerCpuSelect").value;
  const gpuVal = document.getElementById("analyzerGpuSelect").value;
  const ramVal = parseInt(document.getElementById("analyzerRamSelect").value);
  const ramType = document.getElementById("analyzerRamTypeSelect").value;
  const monitors = parseInt(document.getElementById("analyzerMonitorsSelect").value);
  const isStreaming = document.getElementById("analyzerStreamingCheckbox").checked;
  const allSelected = cpuVal && gpuVal && ramVal;
  const emptyState = document.getElementById("analyzerEmptyState");
  const scoreContent = document.getElementById("analyzerScoreContent");
  
  if (!allSelected) {
    emptyState.style.display = "block";
    scoreContent.style.display = "none";
    return;
  }
  
  emptyState.style.display = "none";
  scoreContent.style.display = "block";
  
  let cpuScore = analyzerCpuData[cpuVal] || 8000;
  let gpuScore = analyzerGpuData[gpuVal] || 8000;
  let ramScore = calculateAnalyzerRamScore(ramVal);
  let totalScore = cpuScore + gpuScore + ramScore;
  totalScore = totalScore * calculateRamTypeMultiplier(ramType);
  totalScore = totalScore * calculateMonitorMalus(monitors);
  if (isStreaming) totalScore = totalScore * 0.92;
  totalScore = Math.floor(Math.min(70000, Math.max(0, totalScore)));
  
  document.getElementById("analyzerMeterFill").style.width = (totalScore / 70000) * 100 + "%";
  document.getElementById("analyzerScoreValue").innerHTML = totalScore.toLocaleString();
  
  const category = getAnalyzerPerformanceCategory(totalScore);
  const gpuDisplay = document.getElementById("analyzerGpuSelect").options[document.getElementById("analyzerGpuSelect").selectedIndex]?.text || gpuVal;
  let ramTypeText = ramType === "DDR5" ? "DDR5" : ramType === "DDR4" ? "DDR4" : "DDR3";
  let streamingText = isStreaming ? "🎥 Streaming: Ja" : "🎥 Streaming: Nein";
  
  document.getElementById("analyzerHardwareSummary").innerHTML = `<i class="fas fa-desktop"></i> ${cpuVal} + ${gpuDisplay} + ${ramVal}GB ${ramTypeText} | ${monitors} Monitor(e) | ${streamingText} | Score: ${totalScore.toLocaleString()}/50.000`;
  document.getElementById("analyzerSettingsList").innerHTML = `<li><i class="fas fa-trophy"></i> <strong>Kategorie:</strong> ${category.label} ${category.icon}</li><li><i class="fas fa-chart-line"></i> <strong>Empfehlung:</strong> ${category.desc}</li>`;
  
  const optimizationTips = getAnalyzerOptimizationTips(totalScore, cpuScore, gpuScore, ramVal);
  document.getElementById("analyzerOptimizationItems").innerHTML = optimizationTips.map(tip => `<div class="analyzer-opt-tip">💡 ${tip}</div>`).join("");
}

// Analyzer Event-Listener initialisieren
function initAnalyzer() {
  populateCpuSelect();
  populateGpuSelect();
    document.getElementById("analyzerCpuSelect")?.addEventListener("change", updateAnalyzerEvaluation);
  document.getElementById("analyzerGpuSelect")?.addEventListener("change", updateAnalyzerEvaluation);
  document.getElementById("analyzerRamSelect")?.addEventListener("change", updateAnalyzerEvaluation);
  document.getElementById("analyzerRamTypeSelect")?.addEventListener("change", updateAnalyzerEvaluation);
  document.getElementById("analyzerMonitorsSelect")?.addEventListener("change", updateAnalyzerEvaluation);
  document.getElementById("analyzerStreamingCheckbox")?.addEventListener("change", updateAnalyzerEvaluation);
  updateAnalyzerEvaluation();
}