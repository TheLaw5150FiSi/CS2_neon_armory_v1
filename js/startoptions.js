// ======================== START OPTIONEN ========================

// --- Globale Variable für die erkannte Hardware ---
var detectedRefreshRate = null;
var detectedThreadRecommendation = null;
var rawRefreshRate = null;
var rawThreadCores = null;

// --- HARDWARE-ERKENNUNG ---

// Thread-Erkennung für Source-2-Engine (CS2)
// Formel: Physische Kerne + 1 Hilfsthread für optimale Auslastung
function detectThreadRecommendation() {
  var logicalCores = navigator.hardwareConcurrency || 8;
  rawThreadCores = logicalCores;

  // Source-2 Formel: Physische Kerne + 1 Hilfsthread
  // Da wir keine Unterscheidung zwischen physisch/logisch haben,
  // nehmen wir logische Kerne und addieren 1 (max. 33)
  var recommended = Math.min(logicalCores + 1, 33);

  return {
    cores: logicalCores,
    recommended: recommended,
    formula: logicalCores + " Kerne + 1 = " + recommended + " Threads",
  };
}

// Robuste Monitor-Erkennung
async function detectMonitorRefreshRate() {
  return new Promise(function (resolve) {
    var rafCount = 0;
    var startTime = performance.now();
    var targetFrames = 120;
    var timeout = setTimeout(function () {
      if (rafCount < 10) {
        console.log(
          "Refresh-Erkennung: Zu wenige Frames (" +
            rafCount +
            "), verwende 144Hz",
        );
        resolve(144);
      } else {
        var elapsedSeconds = (performance.now() - startTime) / 1000;
        var avgFps = Math.round(rafCount / elapsedSeconds);
        var validFps = Math.min(Math.max(avgFps, 50), 360);
        console.log("Monitor erkannt: " + validFps + " Hz");
        resolve(validFps);
      }
    }, 3000);

    function measure() {
      rafCount++;
      if (rafCount < targetFrames) {
        requestAnimationFrame(measure);
      } else {
        clearTimeout(timeout);
        var elapsedSeconds = (performance.now() - startTime) / 1000;
        var avgFps = Math.round(rafCount / elapsedSeconds);
        var validFps = Math.min(Math.max(avgFps, 50), 360);
        console.log("Monitor erkannt: " + validFps + " Hz");
        resolve(validFps);
      }
    }

    try {
      requestAnimationFrame(measure);
    } catch (e) {
      clearTimeout(timeout);
      console.log("Refresh-Erkennung fehlgeschlagen, verwende 144Hz");
      resolve(144);
    }
  });
}

// Intelligente Rundung auf den nächsten verfügbaren Hz-Wert
function roundToNearestRefreshRate(measuredHz) {
  var standardRates = [
    60, 75, 90, 100, 120, 144, 165, 180, 200, 240, 280, 300, 360,
  ];

  if (!measuredHz || measuredHz < 50) return 144;

  var closest = standardRates.reduce(function (prev, curr) {
    return Math.abs(curr - measuredHz) < Math.abs(prev - measuredHz)
      ? curr
      : prev;
  });

  return closest;
}

// --- START OPTIONEN LISTE MIT AUSFÜHRLICHEN BESCHREIBUNGEN ---
var startOptionsList = [
  {
    cmd: "-console",
    desc: "Öffnet die Entwicklerkonsole automatisch beim Spielstart. Die Konsole ist wichtig für die Eingabe von Befehlen, das Anzeigen von Netzwerkinfos (NetGraph) und das Debuggen. Praktisch für Competitive-Spieler und Modder.",
    longDesc:
      "Mit dieser Option wird die Entwicklerkonsole (zugänglich über die Taste ^ oder ~) automatisch geöffnet, sobald CS2 startet. Du musst sie nicht mehr manuell über die Einstellungen aktivieren. Die Konsole ermöglicht dir:\n\n• Die Eingabe von Cheat-Befehlen (in privaten Lobbys)\n• Das Anzeigen von Netzwerk-Statistiken mit cq_netgraph\n• Das Ändern von Video-Einstellungen während des Spiels\n• Das Aufnehmen von Demos (record/stop)\n• Das Verbinden zu Servern mit connect [IP]\n\nEmpfehlung: IMMER aktivieren – die Konsole ist ein mächtiges Werkzeug!",
    hasValue: false,
    selected: true,
  },
  {
    cmd: "-high",
    desc: "Weist dem CS2-Prozess eine hohe CPU-Priorität zu. Dadurch kann das Spiel mehr Rechenzeit bekommen, was die Performance verbessern KANN. Achtung: Kann bei manchen Systemen zu Mikro-Rucklern führen, weil CS2 mit Audiotreibern konkurriert.",
    longDesc:
      "Diese Option setzt die Priorität des CS2-Prozesses im Windows Task-Manager auf 'Hoch'. Das bedeutet, dass CS2 bevorzugt CPU-Zeit zugewiesen bekommt. Vorteile:\n\n• Potenziell höhere und stabilere FPS\n• Niedrigere Latenz in CPU-limitierten Szenarien\n\nNachteile:\n• Kann zu Mikro-Rucklern führen, wenn andere Prozesse (z.B. Audio-Treiber) ebenfalls hohe Priorität benötigen\n• Bei stark ausgelasteten Systemen kann es zu Instabilität kommen\n\nEmpfehlung: Teste es selbst! Bei den meisten modernen Systemen (6+ Kerne) bringt es kaum Vorteile.",
    hasValue: false,
    selected: false,
  },
  {
    cmd: "-nojoy",
    desc: "Deaktiviert die Joystick/Controller-API von Steam. Da die meisten CS2-Spieler Maus und Tastatur verwenden, spart diese Option minimale Ressourcen – etwa 10-20 MB RAM.",
    longDesc:
      "Counter-Strike 2 unterstützt standardmäßig Gamepads und Joysticks. Die dafür notwendigen Treiber und APIs laufen im Hintergrund und belegen minimale Systemressourcen. Mit -nojoy deaktivierst du:\n\n• Joystick-Unterstützung\n• Gamepad-Erkennung\n• Controller-Rumble-Funktionen\n\nDa nahezu alle CS2-Spieler mit Maus und Tastatur spielen, ist diese Option ein No-Brainer. Der Performance-Vorteil ist zwar minimal (etwa 10-20 MB RAM, minimale CPU-Entlastung), aber jede gesparte Ressource hilft – besonders auf älteren Systemen.",
    hasValue: false,
    selected: false,
  },
  {
    cmd: "-fullscreen",
    desc: "Startet CS2 im exklusiven Vollbildmodus. Bietet die beste Performance und niedrigste Latenz – Pflicht für Competitive-Spieler!",
    longDesc:
      "Erzwingt den exklusiven Vollbildmodus (Fullscreen Exclusive), im Gegensatz zu 'Borderless Windowed' (randloses Fenster). Vorteile:\n\n• Beste Performance: Die GPU kann sich voll auf das Spiel konzentrieren\n• Niedrigste Latenz: Keine zusätzlichen Bildschirm-Zusammensetzungen (Compositing) durch Windows\n• Höhere Bildwiederholraten: Besonders wichtig für 144Hz+ Monitore\n\nNachteile:\n• Langsameres Alt-Tab (Bildschirm flackert kurz)\n\nEmpfehlung: IMMER aktivieren für Competitive! Borderless Windowed ist nur für Streamer mit bestimmten Capture-Softwares sinnvoll.",
    hasValue: false,
    selected: false,
  },
  {
    cmd: "-vulkan",
    desc: "Verwendet die Vulkan-API anstelle von DirectX 11. Kann auf manchen Systemen (besonders AMD-GPUs) die Performance verbessern, ist aber experimentell.",
    longDesc:
      "CS2 verwendet standardmäßig DirectX 11 (DX11) auf Windows. Mit -vulkan zwingst du das Spiel, die moderne Vulkan-Grafik-API zu nutzen. Vulkan ist effizienter, besonders wenn viele Zeichenbefehle anfallen. Vor- und Nachteile:\n\n✅ Vorteile:\n• Bessere Performance auf AMD-GPUs (oft 5-15% mehr FPS)\n• Gleichmäßigere Frametimes (weniger Ruckler)\n• Bessere CPU-Auslastung bei vielen Kernen\n\n⚠️ Nachteile:\n• Erster Start dauert länger (Shader-Kompilierung)\n• Gelegentliche Mikro-Ruckler während der Shader-Kompilierung im Spiel\n• Auf NVIDIA GPUs oft kaum Unterschied oder minimal schlechter\n\nEmpfehlung: Teste es selbst! Für AMD-Benutzer oft ein Gewinn, für NVIDIA meist nicht nötig.",
    hasValue: false,
    selected: false,
  },
  {
    cmd: "-softparticlesdefaultoff",
    desc: "Deaktiviert weiche Partikel-Effekte (z.B. Rauch, Feuer, Mündungsfeuer). Bringt mehr FPS, besonders auf älteren Grafikkarten.",
    longDesc:
      "Soft Particles sind Effekte wie Rauchwolken, Mündungsfeuer und Explosionen, die weiche Übergänge haben. Diese sind zwar hübsch, kosten aber Performance. Mit dieser Option:\n\n• Werden Soft Particles komplett deaktiviert\n• Nutzt CS2 einfachere, quadratische Partikel\n• Deutlicher FPS-Gewinn auf älteren GPUs (GTX 1060 und darunter)\n• Minimaler FPS-Gewinn auf modernen GPUs\n\nDie Sichtbarkeit von Gegnern wird dadurch nicht beeinträchtigt – im Gegenteil, weniger visuelles Rauschen kann sogar helfen. Empfehlung: Aktivieren für Low-End-PCs, für High-End optional.",
    hasValue: false,
    selected: false,
  },
  {
    cmd: "-refresh",
    desc: "Setzt die Bildwiederholfrequenz deines Monitors. Wichtig für Monitore mit mehr als 60Hz! Unbedingt auf die tatsächliche Hz-Zahl deines Monitors einstellen.",
    longDesc:
      "Erzwingt eine bestimmte Bildwiederholfrequenz (Refresh Rate) für CS2. Normalerweise übernimmt CS2 die Windows-Einstellungen, aber manchmal greift das Spiel auf 60Hz zurück. Mit -refresh stellst du sicher, dass dein Monitor mit seiner maximalen Rate läuft:\n\n• 60 Hz – Standard-Büromonitore\n• 120/144 Hz – Gaming-Monitore (Mid-Range)\n• 165/180/240 Hz – High-End Gaming\n• 280/300/360 Hz – Esports-Monitore\n\n🔴 WICHTIG: Stell den Wert exakt auf die maximale Hz-Zahl deines Monitors ein! Ein 144Hz-Monitor mit -refresh 60 läuft nur mit 60Hz – das wäre Verschwendung.\n\nDie Option wird automatisch mit deiner erkannten Monitor-Hz vorausgefüllt.",
    hasValue: true,
    value: "144",
    selected: false,
    values: [
      "60",
      "75",
      "90",
      "100",
      "120",
      "144",
      "165",
      "180",
      "200",
      "240",
      "280",
      "300",
      "360",
    ],
  },
  {
    cmd: "-threads",
    desc: "Legt die Anzahl der CPU-Threads für CS2 fest. Die Source-2-Engine profitiert von mehr Kernen. Empfohlene Formel: Physische Kerne + 1.",
    longDesc:
      "Diese Option bestimmt, wie viele CPU-Threads CS2 für die Verarbeitung nutzen darf. Die Source-2-Engine ist gut multithreaded, profitiert also von mehr Kernen. Die optimale Formel lautet:\n\n• Physische Kerne + 1 Hilfsthread\n• Beispiel: 8 Kerne → -threads 9\n• Maximum: 33 Threads (Source-2-Limit)\n\nWirkung:\n• Zu wenige Threads → CPU wird nicht ausgelastet, weniger FPS\n• Zu viele Threads → Overhead durch Thread-Management, mögliche Ruckler\n• Richtige Anzahl → Optimale Auslastung, stabile FPS, minimale Latenz\n\n🔴 WICHTIG: Die Option wird automatisch auf Basis deiner CPU-Kerne berechnet und ausgewählt. Meist ist das der optimale Wert. Bei Problemen kannst du experimentieren.",
    hasValue: true,
    value: "8",
    selected: false,
    values: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
    ],
  },
];

// --- SPEICHERN / LADEN ---
function loadStartOptions() {
  var saved = localStorage.getItem("cs2_neon_startoptions");
  if (saved) {
    try {
      var data = JSON.parse(saved);
      for (var i = 0; i < startOptionsList.length && i < data.length; i++) {
        if (data[i]) {
          startOptionsList[i].selected = data[i].selected;
          if (startOptionsList[i].hasValue && data[i].value) {
            startOptionsList[i].value = data[i].value;
          }
        }
      }
    } catch (e) {}
  }

  startHardwareDetection();
}

async function startHardwareDetection() {
  // Threads erkennen (Source-2 Formel: Kerne + 1)
  var threadInfo = detectThreadRecommendation();
  detectedThreadRecommendation = threadInfo.recommended;
  var threadsOpt = startOptionsList.find(function (opt) {
    return opt.cmd === "-threads";
  });
  if (threadsOpt) {
    threadsOpt.value = detectedThreadRecommendation.toString();
    threadsOpt.selected = true;
  }

  // Refresh erkennen
  var rawValue = await detectMonitorRefreshRate();
  rawRefreshRate = rawValue;
  detectedRefreshRate = roundToNearestRefreshRate(rawValue);

  console.log("📊 Hardware-Erkennung abgeschlossen:");
  console.log(
    "   🖥️  Monitor: " +
      rawRefreshRate +
      " Hz → " +
      detectedRefreshRate +
      " Hz empfohlen",
  );
  console.log(
    "   💻 CPU: " +
      rawThreadCores +
      " Kerne → " +
      detectedThreadRecommendation +
      " Threads empfohlen (Source-2 Formel: Kerne + 1)",
  );

  var refreshOpt = startOptionsList.find(function (opt) {
    return opt.cmd === "-refresh";
  });
  if (refreshOpt && detectedRefreshRate) {
    refreshOpt.value = detectedRefreshRate.toString();
    refreshOpt.selected = true;
  }

  renderStartOptionsUI();
}

function saveStartOptions() {
  var toSave = [];
  for (var i = 0; i < startOptionsList.length; i++) {
    toSave.push({
      selected: startOptionsList[i].selected,
      value: startOptionsList[i].value,
    });
  }
  localStorage.setItem("cs2_neon_startoptions", JSON.stringify(toSave));
}

function renderStartOptionsUI() {
  var container = document.getElementById("startOptionsContainer");
  if (!container) return;

  container.innerHTML = "";

  for (var idx = 0; idx < startOptionsList.length; idx++) {
    var opt = startOptionsList[idx];

    var itemDiv = document.createElement("div");
    itemDiv.className = "start-opt-item";

    var headerDiv = document.createElement("div");
    headerDiv.className = "start-opt-header";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = opt.selected;

    checkbox.onchange = (function (i) {
      return function () {
        startOptionsList[i].selected = this.checked;
        saveStartOptions();
        updateStartOptionsPreview();
      };
    })(idx);

    var label = document.createElement("label");
    label.textContent = opt.cmd;
    headerDiv.appendChild(checkbox);
    headerDiv.appendChild(label);
    itemDiv.appendChild(headerDiv);

    // Kurze Beschreibung
    var descSpan = document.createElement("div");
    descSpan.className = "start-opt-desc";
    descSpan.textContent = opt.desc;
    itemDiv.appendChild(descSpan);

    // Hardware-Info bei -threads und -refresh
    if (opt.cmd === "-threads" && rawThreadCores) {
      var hardwareInfo = document.createElement("div");
      hardwareInfo.className = "start-opt-desc";
      hardwareInfo.style.color = "var(--accent-light)";
      hardwareInfo.style.fontSize = "0.65rem";
      hardwareInfo.style.marginTop = "0.2rem";
      hardwareInfo.innerHTML =
        "💻 Erkannter CPU: " +
        rawThreadCores +
        " Kerne | Empfohlen: " +
        detectedThreadRecommendation +
        " Threads (Kerne + 1)";
      itemDiv.appendChild(hardwareInfo);
    } else if (opt.cmd === "-refresh" && rawRefreshRate && rawRefreshRate > 0) {
      var hardwareInfo = document.createElement("div");
      hardwareInfo.className = "start-opt-desc";
      hardwareInfo.style.color = "var(--accent-light)";
      hardwareInfo.style.fontSize = "0.65rem";
      hardwareInfo.style.marginTop = "0.2rem";
      hardwareInfo.innerHTML =
        "🖥️ Erkannter Monitor: " +
        rawRefreshRate +
        " Hz | Empfohlen: " +
        detectedRefreshRate +
        " Hz";
      itemDiv.appendChild(hardwareInfo);
    }

    // Lange Beschreibung (als Details-Element für ausklappbaren Text)
    var details = document.createElement("details");
    details.style.marginTop = "0.5rem";
    details.style.marginLeft = "1.8rem";

    var summary = document.createElement("summary");
    summary.style.cursor = "pointer";
    summary.style.color = "var(--accent-light)";
    summary.style.fontSize = "0.7rem";
    summary.innerHTML = "📖 Ausführliche Erklärung";

    var longDescSpan = document.createElement("div");
    longDescSpan.className = "start-opt-desc";
    longDescSpan.style.marginTop = "0.5rem";
    longDescSpan.style.padding = "0.4rem";
    longDescSpan.style.backgroundColor = "rgba(0,0,0,0.2)";
    longDescSpan.style.borderRadius = "0.5rem";
    longDescSpan.style.whiteSpace = "pre-line";
    longDescSpan.innerHTML = opt.longDesc || opt.desc;

    details.appendChild(summary);
    details.appendChild(longDescSpan);
    itemDiv.appendChild(details);

    if (opt.hasValue && opt.values) {
      var select = document.createElement("select");
      select.className = "start-opt-select";

      for (var v = 0; v < opt.values.length; v++) {
        var val = opt.values[v];
        var option = document.createElement("option");
        option.value = val;

        // Markiere den empfohlenen Wert
        if (
          opt.cmd === "-threads" &&
          detectedThreadRecommendation &&
          parseInt(val) === detectedThreadRecommendation
        ) {
          option.textContent =
            val + " ⚡ Empfohlen (" + rawThreadCores + " Kerne + 1)";
        } else if (
          opt.cmd === "-refresh" &&
          detectedRefreshRate &&
          parseInt(val) === detectedRefreshRate
        ) {
          option.textContent =
            val + " Hz ⚡ Empfohlen (erkannt: " + rawRefreshRate + " Hz)";
        } else if (opt.cmd === "-refresh") {
          option.textContent = val + " Hz";
        } else {
          option.textContent = val;
        }

        if (opt.value === val) option.selected = true;
        select.appendChild(option);
      }

      select.onchange = (function (i) {
        return function () {
          startOptionsList[i].value = this.value;
          saveStartOptions();
          updateStartOptionsPreview();
        };
      })(idx);

      itemDiv.appendChild(select);
    }

    container.appendChild(itemDiv);
  }

  updateStartOptionsPreview();
}

function getSelectedStartOptionsString() {
  var selected = [];
  for (var i = 0; i < startOptionsList.length; i++) {
    var opt = startOptionsList[i];
    if (opt.selected) {
      if (opt.hasValue && opt.value) {
        selected.push(opt.cmd + " " + opt.value);
      } else if (!opt.hasValue) {
        selected.push(opt.cmd);
      }
    }
  }
  return selected.join(" ");
}

function updateStartOptionsPreview() {
  var previewElem = document.getElementById("generatedStartOptions");
  if (previewElem) {
    var opts = getSelectedStartOptionsString();
    previewElem.textContent = opts || "(Keine Startoptionen ausgewählt)";
  }
}

function copyStartOptionsToClipboard() {
  var text = getSelectedStartOptionsString();
  if (text) {
    navigator.clipboard.writeText(text).then(function () {
      alert("✅ Startoptionen kopiert!");
    });
  } else {
    alert("❌ Keine Optionen ausgewählt");
  }
}

function resetStartOptionsToDefault() {
  for (var i = 0; i < startOptionsList.length; i++) {
    var opt = startOptionsList[i];
    if (opt.cmd === "-console") {
      opt.selected = true;
    } else {
      opt.selected = false;
    }
    if (opt.cmd === "-refresh") {
      opt.value = detectedRefreshRate ? detectedRefreshRate.toString() : "144";
      opt.selected = true;
    }
    if (opt.cmd === "-threads") {
      opt.value = detectedThreadRecommendation
        ? detectedThreadRecommendation.toString()
        : "8";
      opt.selected = true;
    }
  }
  saveStartOptions();
  renderStartOptionsUI();
  alert("✅ Startoptionen auf erkannte Werte zurückgesetzt!");
}

// Globale Exporte
window.getSelectedStartOptionsString = getSelectedStartOptionsString;
window.copyStartOptionsToClipboard = copyStartOptionsToClipboard;
window.resetStartOptionsToDefault = resetStartOptionsToDefault;
window.renderStartOptionsUI = renderStartOptionsUI;
window.loadStartOptions = loadStartOptions;