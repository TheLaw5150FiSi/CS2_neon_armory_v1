// ======================== SYSTEM ANALYZER ========================
function populateCpuSelect() {
  const select = document.getElementById("analyzerCpuSelect");
  if (!select) return;
  const sortedCpus = Object.keys(analyzerCpuData).sort((a, b) => analyzerCpuData[b] - analyzerCpuData[a]);
  const groups = { "AMD Ryzen 9": [], "AMD Ryzen 7": [], "AMD Ryzen 5": [], "AMD Ryzen 3": [], "AMD Threadripper": [], "Intel Core Ultra": [], "Intel Core i9": [], "Intel Core i7": [], "Intel Core i5": [], "Intel Core i3": [], "Intel Pentium/Celeron": [] };
  
  for (const cpu of sortedCpus) {
    if (cpu.startsWith("Ryzen 9")) groups["AMD Ryzen 9"].push(cpu);
    else if (cpu.startsWith("Ryzen 7")) groups["AMD Ryzen 7"].push(cpu);
    else if (cpu.startsWith("Ryzen 5")) groups["AMD Ryzen 5"].push(cpu);
    else if (cpu.startsWith("Ryzen 3")) groups["AMD Ryzen 3"].push(cpu);
    else if (cpu.startsWith("TR")) groups["AMD Threadripper"].push(cpu);
    else if (cpu.startsWith("Ultra")) groups["Intel Core Ultra"].push(cpu);
    else if (cpu.startsWith("i9")) groups["Intel Core i9"].push(cpu);
    else if (cpu.startsWith("i7")) groups["Intel Core i7"].push(cpu);
    else if (cpu.startsWith("i5")) groups["Intel Core i5"].push(cpu);
    else if (cpu.startsWith("i3")) groups["Intel Core i3"].push(cpu);
    else groups["Intel Pentium/Celeron"].push(cpu);
  }
  
  select.innerHTML = '<option value="" disabled selected>-- CPU auswählen --</option>';
  for (const [groupName, cpus] of Object.entries(groups)) {
    if (cpus.length === 0) continue;
    const optgroup = document.createElement("optgroup");
    optgroup.label = groupName;
    cpus.sort((a, b) => analyzerCpuData[b] - analyzerCpuData[a]);
    for (const cpu of cpus) {
      const option = document.createElement("option");
      option.value = cpu;
      option.textContent = cpu;
      optgroup.appendChild(option);
    }
    select.appendChild(optgroup);
  }
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
  totalScore = Math.floor(Math.min(50000, Math.max(0, totalScore)));
  
  document.getElementById("analyzerMeterFill").style.width = (totalScore / 50000) * 100 + "%";
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
  document.getElementById("analyzerCpuSelect")?.addEventListener("change", updateAnalyzerEvaluation);
  document.getElementById("analyzerGpuSelect")?.addEventListener("change", updateAnalyzerEvaluation);
  document.getElementById("analyzerRamSelect")?.addEventListener("change", updateAnalyzerEvaluation);
  document.getElementById("analyzerRamTypeSelect")?.addEventListener("change", updateAnalyzerEvaluation);
  document.getElementById("analyzerMonitorsSelect")?.addEventListener("change", updateAnalyzerEvaluation);
  document.getElementById("analyzerStreamingCheckbox")?.addEventListener("change", updateAnalyzerEvaluation);
  updateAnalyzerEvaluation();
}