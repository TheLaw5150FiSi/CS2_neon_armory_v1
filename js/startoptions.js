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
        formula: logicalCores + " Kerne + 1 = " + recommended + " Threads"
    };
}

// Robuste Monitor-Erkennung
async function detectMonitorRefreshRate() {
    return new Promise(function(resolve) {
        var rafCount = 0;
        var startTime = performance.now();
        var targetFrames = 120;
        var timeout = setTimeout(function() {
            if (rafCount < 10) {
                console.log("Refresh-Erkennung: Zu wenige Frames (" + rafCount + "), verwende 144Hz");
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
        } catch(e) {
            clearTimeout(timeout);
            console.log("Refresh-Erkennung fehlgeschlagen, verwende 144Hz");
            resolve(144);
        }
    });
}

// Intelligente Rundung auf den nächsten verfügbaren Hz-Wert
function roundToNearestRefreshRate(measuredHz) {
    var standardRates = [60, 75, 90, 100, 120, 144, 165, 180, 200, 240, 280, 300, 360];
    
    if (!measuredHz || measuredHz < 50) return 144;
    
    var closest = standardRates.reduce(function(prev, curr) {
        return Math.abs(curr - measuredHz) < Math.abs(prev - measuredHz) ? curr : prev;
    });
    
    return closest;
}

// --- START OPTIONEN LISTE ---
var startOptionsList = [
    { cmd: "-console", desc: "Konsole", hasValue: false, selected: true },
    { cmd: "-high", desc: "Hohe Priorität", hasValue: false, selected: false },
    { cmd: "-nojoy", desc: "Joystick aus", hasValue: false, selected: false },
    { cmd: "-fullscreen", desc: "Vollbild", hasValue: false, selected: false },
    { cmd: "-vulkan", desc: "Vulkan API", hasValue: false, selected: false },
    { cmd: "-softparticlesdefaultoff", desc: "Partikel aus", hasValue: false, selected: false },
    { cmd: "-refresh", desc: "Bildwiederholfrequenz", hasValue: true, value: "144", selected: false, values: ["60", "75", "90", "100", "120", "144", "165", "180", "200", "240", "280", "300", "360"] },
    { cmd: "-threads", desc: "CPU-Threads (Source-2 Formel: Kerne + 1)", hasValue: true, value: "8", selected: false, values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33"] }
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
        } catch(e) {}
    }
    
    startHardwareDetection();
}

async function startHardwareDetection() {
    // Threads erkennen (Source-2 Formel: Kerne + 1)
    var threadInfo = detectThreadRecommendation();
    detectedThreadRecommendation = threadInfo.recommended;
    var threadsOpt = startOptionsList.find(function(opt) { return opt.cmd === "-threads"; });
    if (threadsOpt) {
        threadsOpt.value = detectedThreadRecommendation.toString();
        threadsOpt.selected = true;
    }
    
    // Refresh erkennen
    var rawValue = await detectMonitorRefreshRate();
    rawRefreshRate = rawValue;
    detectedRefreshRate = roundToNearestRefreshRate(rawValue);
    
    console.log("📊 Hardware-Erkennung abgeschlossen:");
    console.log("   🖥️  Monitor: " + rawRefreshRate + " Hz → " + detectedRefreshRate + " Hz empfohlen");
    console.log("   💻 CPU: " + rawThreadCores + " Kerne → " + detectedThreadRecommendation + " Threads empfohlen (Source-2 Formel: Kerne + 1)");
    
    var refreshOpt = startOptionsList.find(function(opt) { return opt.cmd === "-refresh"; });
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
            value: startOptionsList[i].value
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
        
        checkbox.onchange = (function(i) {
            return function() {
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
        
        var descSpan = document.createElement("div");
        descSpan.className = "start-opt-desc";
        
        // Beschreibung mit Source-2 Formel
        if (opt.cmd === "-threads" && rawThreadCores) {
            descSpan.innerHTML = "Gemessen: " + rawThreadCores + " Kerne<br>" +
                                 "<span style='color: var(--accent-light); font-size: 0.65rem;'>Source-2 Formel: Physische Kerne + 1 Hilfsthread für optimale Leistung</span>";
        } 
        else if (opt.cmd === "-refresh" && rawRefreshRate && rawRefreshRate > 0) {
            descSpan.textContent = "Gemessen: " + rawRefreshRate + " Hz";
        }
        else {
            descSpan.textContent = opt.desc;
        }
        itemDiv.appendChild(descSpan);
        
        if (opt.hasValue && opt.values) {
            var select = document.createElement("select");
            select.className = "start-opt-select";
            
            for (var v = 0; v < opt.values.length; v++) {
                var val = opt.values[v];
                var option = document.createElement("option");
                option.value = val;
                
                // Markiere den empfohlenen Wert
                if (opt.cmd === "-threads" && detectedThreadRecommendation && parseInt(val) === detectedThreadRecommendation) {
                    option.textContent = val + " ⚡ Empfohlen";
                } 
                else if (opt.cmd === "-refresh" && detectedRefreshRate && parseInt(val) === detectedRefreshRate) {
                    option.textContent = val + " Hz ⚡ Empfohlen";
                }
                else if (opt.cmd === "-refresh") {
                    option.textContent = val + " Hz";
                }
                else {
                    option.textContent = val;
                }
                
                if (opt.value === val) option.selected = true;
                select.appendChild(option);
            }
            
            select.onchange = (function(i) {
                return function() {
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
        navigator.clipboard.writeText(text).then(function() {
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
            opt.value = detectedThreadRecommendation ? detectedThreadRecommendation.toString() : "8";
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