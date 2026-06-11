// ======================== CROSSHAIR GENERATOR ========================

let crosshairState = {
    style: 2,
    dot: true,
    tStyle: false,
    outlineActive: true,
    length: 3.5,
    thickness: 0.5,
    gap: 2.0,
    outlineThickness: 1.0,
    r: 0,
    g: 255,
    b: 0,
    alpha: 192,
    alphaActive: true
};

// NEU: Gespeicherte Crosshair-Konfiguration für den Export
let savedCrosshairCommands = null;
let crosshairAppliedToExport = false;

let crosshairCanvas = null;
let crosshairCtx = null;

// Ultra helle Farben (verdoppeln)
function ultraBrighten(value) {
    return Math.min(255, value * 2);
}

// Hintergrund zeichnen
function drawCrosshairBackground(ctx, w, h) {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#1e2e3a");
    grad.addColorStop(1, "#111822");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    
    ctx.strokeStyle = "#2a3a4822";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < w; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
    }
    for (let i = 0; i < h; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(w, i);
        ctx.stroke();
    }
}

// Crosshair zeichnen
function drawCrosshair(ctx, cx, cy) {
    const { length, gap, thickness, outlineThickness, r, g, b, alpha, dot, tStyle, outlineActive, alphaActive } = crosshairState;
    
    let brightR = ultraBrighten(r);
    let brightG = ultraBrighten(g);
    let brightB = ultraBrighten(b);
    
    const finalAlpha = alphaActive ? alpha : 255;
    const mainColor = `rgba(${brightR}, ${brightG}, ${brightB}, ${finalAlpha / 255})`;
    const outlineColor = "rgba(0, 0, 0, 255)";
    
    const pixelLength = Math.max(4, length * 3.75);
    const pixelThickness = Math.max(1, Math.round(thickness * 2.0));
    const pixelGapOffset = gap * 4;
    const pixelOutline = (outlineActive && outlineThickness > 0) ? Math.max(0.5, outlineThickness * 0.9) : 0;
    const halfThick = pixelThickness / 2;
    
    let arms = [
        { dirX: 0, dirY: -1, name: "top" },
        { dirX: 0, dirY: 1, name: "bottom" },
        { dirX: -1, dirY: 0, name: "left" },
        { dirX: 1, dirY: 0, name: "right" }
    ];
    
    if (tStyle) {
        arms = arms.filter(arm => arm.name !== "top");
    }
    
    for (const arm of arms) {
        let rectX, rectY, rectW, rectH;
        
        if (arm.dirX !== 0) {
            const isRight = (arm.dirX === 1);
            const startX = cx + (isRight ? pixelGapOffset : -pixelGapOffset - pixelLength);
            rectX = startX;
            rectY = cy - halfThick;
            rectW = pixelLength;
            rectH = pixelThickness;
        } else {
            const isDown = (arm.dirY === 1);
            const startY = cy + (isDown ? pixelGapOffset : -pixelGapOffset - pixelLength);
            rectX = cx - halfThick;
            rectY = startY;
            rectW = pixelThickness;
            rectH = pixelLength;
        }
        
        if (pixelOutline > 0) {
            ctx.fillStyle = outlineColor;
            ctx.fillRect(rectX - pixelOutline, rectY - pixelOutline, rectW + (pixelOutline * 2), rectH + (pixelOutline * 2));
        }
        
        ctx.fillStyle = mainColor;
        ctx.fillRect(rectX, rectY, rectW, rectH);
    }
    
    if (dot) {
        const dotSize = Math.max(4, pixelThickness * 1.5);
        const dotRadius = dotSize / 2;
        
        if (pixelOutline > 0) {
            ctx.beginPath();
            ctx.arc(cx, cy, dotRadius + pixelOutline, 0, Math.PI * 2);
            ctx.fillStyle = outlineColor;
            ctx.fill();
        }
        
        ctx.beginPath();
        ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = mainColor;
        ctx.fill();
    }
}

function renderCrosshair() {
    if (!crosshairCanvas || !crosshairCtx) return;
    const w = crosshairCanvas.width;
    const h = crosshairCanvas.height;
    drawCrosshairBackground(crosshairCtx, w, h);
    drawCrosshair(crosshairCtx, w / 2, h / 2);
}

function generateCrosshairConfig() {
    const s = crosshairState;
    const lines = [];
    lines.push(`cl_crosshairstyle ${s.style}`);
    lines.push(`cl_crosshairsize ${s.length.toFixed(1)}`);
    lines.push(`cl_crosshairthickness ${s.thickness.toFixed(2)}`);
    lines.push(`cl_crosshairgap ${s.gap.toFixed(2)}`);
    lines.push(`cl_crosshair_drawoutline ${s.outlineActive ? "1" : "0"}`);
    if (s.outlineActive && s.outlineThickness > 0) {
        lines.push(`cl_crosshair_outlinethickness ${s.outlineThickness.toFixed(2)}`);
    }
    lines.push(`cl_crosshaircolor_r ${s.r}`);
    lines.push(`cl_crosshaircolor_g ${s.g}`);
    lines.push(`cl_crosshaircolor_b ${s.b}`);
    lines.push(`cl_crosshairalpha ${s.alpha}`);
    lines.push(`cl_crosshairusealpha ${s.alphaActive ? "1" : "0"}`);
    lines.push(`cl_crosshairdot ${s.dot ? "1" : "0"}`);
    lines.push(`cl_crosshair_t ${s.tStyle ? "1" : "0"}`);
    return lines;
}

function getCrosshairCommands() {
    return generateCrosshairConfig();
}

function updateCrosshairConfigText() {
    const textarea = document.getElementById("crosshairConfigText");
    if (textarea) textarea.value = generateCrosshairConfig().join("\n");
}

// NEU: Crosshair in Export übernehmen
function applyCrosshairToExport() {
    const commands = generateCrosshairConfig();
    savedCrosshairCommands = commands;
    crosshairAppliedToExport = true;
    
    // In localStorage speichern
    localStorage.setItem("cs2_neon_crosshair_applied", JSON.stringify({
        applied: true,
        commands: commands,
        timestamp: new Date().toISOString()
    }));
    
    // Status-Anzeige aktualisieren
    const statusDiv = document.getElementById("crosshairExportStatus");
    if (statusDiv) {
        statusDiv.innerHTML = '✅ Crosshair wurde in die Config übernommen! <i class="fas fa-check-circle"></i>';
        statusDiv.style.background = "rgba(34, 197, 94, 0.2)";
        statusDiv.style.color = "#4ade80";
        statusDiv.style.border = "1px solid #22c55e";
        
        setTimeout(() => {
            if (statusDiv.innerHTML.includes("übernommen")) {
                statusDiv.innerHTML = '📦 Crosshair ist im Export enthalten <i class="fas fa-check"></i>';
            }
        }, 3000);
    }
    
    // Export aktualisieren
    if (typeof window.refreshFullExport === "function") {
        window.refreshFullExport();
    }
    
    console.log("✅ Crosshair in Export übernommen:", commands);
}

// NEU: Gespeichertes Crosshair laden
function loadSavedCrosshair() {
    const saved = localStorage.getItem("cs2_neon_crosshair_applied");
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.applied && data.commands) {
                crosshairAppliedToExport = true;
                savedCrosshairCommands = data.commands;
                
                const statusDiv = document.getElementById("crosshairExportStatus");
                if (statusDiv) {
                    statusDiv.innerHTML = '📦 Crosshair ist im Export enthalten <i class="fas fa-check"></i>';
                    statusDiv.style.background = "rgba(34, 197, 94, 0.15)";
                    statusDiv.style.color = "#4ade80";
                    statusDiv.style.border = "1px solid #22c55e";
                }
            }
        } catch (e) {}
    }
}

// NEU: Crosshair aus Export entfernen
function removeCrosshairFromExport() {
    if (confirm("Möchtest du das Crosshair wirklich aus der Config entfernen?")) {
        savedCrosshairCommands = null;
        crosshairAppliedToExport = false;
        
        localStorage.removeItem("cs2_neon_crosshair_applied");
        
        const statusDiv = document.getElementById("crosshairExportStatus");
        if (statusDiv) {
            statusDiv.innerHTML = '⚠️ Crosshair wurde aus der Config entfernt <i class="fas fa-trash-alt"></i>';
            statusDiv.style.background = "rgba(244, 67, 54, 0.15)";
            statusDiv.style.color = "#f87171";
            statusDiv.style.border = "1px solid #ef4444";
            
            setTimeout(() => {
                statusDiv.innerHTML = '⚡ Crosshair noch nicht in Config übernommen';
                statusDiv.style.background = "rgba(0, 0, 0, 0.3)";
                statusDiv.style.color = "#9ca3af";
                statusDiv.style.border = "1px solid var(--border-color)";
            }, 3000);
        }
        
        if (typeof window.refreshFullExport === "function") {
            window.refreshFullExport();
        }
    }
}

// NEU: Prüft ob Crosshair im Export ist (für export.js)
function isCrosshairAppliedToExport() {
    return crosshairAppliedToExport;
}

function updateCrosshairUI() {
    const elements = {
        crosshairStyle: document.getElementById("crosshairStyle"),
        dotCheckbox: document.getElementById("dotCheckbox"),
        tStyleCheckbox: document.getElementById("tStyleCheckbox"),
        outlineCheckbox: document.getElementById("outlineCheckbox"),
        lengthSlider: document.getElementById("lengthSlider"),
        thickSlider: document.getElementById("thickSlider"),
        gapSlider: document.getElementById("gapSlider"),
        outlineSlider: document.getElementById("outlineSlider"),
        redSlider: document.getElementById("redSlider"),
        greenSlider: document.getElementById("greenSlider"),
        blueSlider: document.getElementById("blueSlider"),
        alphaSlider: document.getElementById("alphaSlider"),
        alphaActiveCheckbox: document.getElementById("alphaActiveCheckbox")
    };
    
    if (elements.crosshairStyle) crosshairState.style = parseInt(elements.crosshairStyle.value);
    if (elements.dotCheckbox) crosshairState.dot = elements.dotCheckbox.checked;
    if (elements.tStyleCheckbox) crosshairState.tStyle = elements.tStyleCheckbox.checked;
    if (elements.outlineCheckbox) crosshairState.outlineActive = elements.outlineCheckbox.checked;
    if (elements.lengthSlider) crosshairState.length = parseFloat(elements.lengthSlider.value);
    if (elements.thickSlider) crosshairState.thickness = parseFloat(elements.thickSlider.value);
    if (elements.gapSlider) crosshairState.gap = parseFloat(elements.gapSlider.value);
    if (elements.outlineSlider) crosshairState.outlineThickness = parseFloat(elements.outlineSlider.value);
    if (elements.redSlider) crosshairState.r = parseInt(elements.redSlider.value);
    if (elements.greenSlider) crosshairState.g = parseInt(elements.greenSlider.value);
    if (elements.blueSlider) crosshairState.b = parseInt(elements.blueSlider.value);
    if (elements.alphaSlider) crosshairState.alpha = parseInt(elements.alphaSlider.value);
    if (elements.alphaActiveCheckbox) crosshairState.alphaActive = elements.alphaActiveCheckbox.checked;
    
    // Update value displays
    const lengthVal = document.getElementById("crosshairLengthVal");
    const thickVal = document.getElementById("crosshairThickVal");
    const gapVal = document.getElementById("crosshairGapVal");
    const outlineVal = document.getElementById("crosshairOutlineVal");
    const alphaVal = document.getElementById("crosshairAlphaVal");
    const colorPreview = document.getElementById("crosshairColorPreview");
    
    if (lengthVal) lengthVal.innerText = crosshairState.length.toFixed(1);
    if (thickVal) thickVal.innerText = crosshairState.thickness.toFixed(1);
    if (gapVal) gapVal.innerText = crosshairState.gap.toFixed(1);
    if (outlineVal) outlineVal.innerText = crosshairState.outlineThickness.toFixed(1);
    if (alphaVal) alphaVal.innerText = crosshairState.alpha;
    if (colorPreview) {
        colorPreview.innerText = `rgb(${crosshairState.r}, ${crosshairState.g}, ${crosshairState.b})`;
        colorPreview.style.color = `rgb(${crosshairState.r}, ${crosshairState.g}, ${crosshairState.b})`;
    }
    
    if (elements.alphaSlider) elements.alphaSlider.disabled = !crosshairState.alphaActive;
    
    renderCrosshair();
    updateCrosshairConfigText();
}

function buildCrosshairUI() {
    const container = document.getElementById("crosshairControls");
    if (!container) return;
    
    container.innerHTML = `
        <div class="crosshair-controls-grid">
            <div class="crosshair-panel">
                <div class="crosshair-panel-header">🎯 Stil & Sonderfunktionen</div>
                <div class="crosshair-panel-body">
                    <div class="crosshair-slider-group">
                        <label>🧩 Crosshairstyle</label>
                        <select id="crosshairStyle">
                            <option value="0">Classic</option>
                            <option value="1">Legacy</option>
                            <option value="2" selected>Classic Static</option>
                        </select>
                    </div>
                    <div class="crosshair-checkbox-row">
                        <label class="crosshair-checkbox-item"><input type="checkbox" id="dotCheckbox" checked> 🔘 Mittelpunkt</label>
                        <label class="crosshair-checkbox-item"><input type="checkbox" id="outlineCheckbox" checked> 🧱 Umrandung aktiv</label>
                        <label class="crosshair-checkbox-item"><input type="checkbox" id="tStyleCheckbox"> ✂️ T-Stil</label>
                    </div>
                    <div class="crosshair-info-note">T-Stil = kein oberer Strich (nur links/rechts/unten)</div>
                </div>
            </div>
            
            <div class="crosshair-panel">
                <div class="crosshair-panel-header">📐 Abmessungen & Kontur</div>
                <div class="crosshair-panel-body">
                    <div class="crosshair-slider-group">
                        <label>📏 Länge <span class="crosshair-value-badge" id="crosshairLengthVal">3.5</span></label>
                        <input type="range" id="lengthSlider" min="0" max="10" step="0.1" value="3.5">
                    </div>
                    <div class="crosshair-slider-group">
                        <label>✏️ Dicke <span class="crosshair-value-badge" id="crosshairThickVal">0.5</span></label>
                        <input type="range" id="thickSlider" min="0" max="3" step="0.1" value="0.5">
                    </div>
                    <div class="crosshair-slider-group">
                        <label>🔲 Lücke <span class="crosshair-value-badge" id="crosshairGapVal">2.0</span></label>
                        <input type="range" id="gapSlider" min="-5" max="5" step="0.1" value="2.0">
                    </div>
                    <div class="crosshair-slider-group">
                        <label>⚫ Umrandungsdicke <span class="crosshair-value-badge" id="crosshairOutlineVal">1.0</span></label>
                        <input type="range" id="outlineSlider" min="0" max="3" step="0.1" value="1.0">
                    </div>
                </div>
            </div>
            
            <div class="crosshair-panel">
                <div class="crosshair-panel-header">🎨 Farbe & Transparenz</div>
                <div class="crosshair-panel-body">
                    <div class="crosshair-color-row">
                        <div class="crosshair-color-channel"><span>🔴 ROT</span><input type="range" id="redSlider" min="0" max="255" value="0" step="1"></div>
                        <div class="crosshair-color-channel"><span>🟢 GRÜN</span><input type="range" id="greenSlider" min="0" max="255" value="255" step="1"></div>
                        <div class="crosshair-color-channel"><span>🔵 BLAU</span><input type="range" id="blueSlider" min="0" max="255" value="0" step="1"></div>
                    </div>
                    <div class="crosshair-slider-group" style="margin-top: 1rem;">
                        <label>🌀 Alpha <span class="crosshair-value-badge" id="crosshairAlphaVal">192</span></label>
                        <input type="range" id="alphaSlider" min="0" max="255" value="192" step="1">
                    </div>
                    <label class="crosshair-checkbox-item"><input type="checkbox" id="alphaActiveCheckbox" checked> Alpha aktiv</label>
                    <div class="crosshair-info-note" style="margin-top: 0.8rem;">
                        Aktuelle Farbe: <span id="crosshairColorPreview" style="font-weight:bold;">rgb(0,255,0)</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- NEUE BUTTON-LEISTE -->
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap; justify-content: center;">
            <button id="applyCrosshairBtn" class="glow" style="background: linear-gradient(135deg, #22c55e, #16a34a); border: none;">
                📦 Aktuelles Crosshair in Config übernehmen
            </button>
            <button id="removeCrosshairBtn" class="glow" style="background: linear-gradient(135deg, #ef4444, #dc2626); border: none;">
                🗑️ Crosshair aus Config entfernen
            </button>
        </div>
        
        <!-- STATUS-ANZEIGE -->
        <div id="crosshairExportStatus" style="margin-top: 1rem; padding: 0.6rem 1rem; border-radius: 1rem; text-align: center; background: rgba(0, 0, 0, 0.3); border: 1px solid var(--border-color); font-size: 0.8rem; color: #9ca3af;">
            ⚡ Crosshair noch nicht in Config übernommen
        </div>
    `;
    
    // Event listeners für die neuen Buttons
    const applyBtn = document.getElementById("applyCrosshairBtn");
    const removeBtn = document.getElementById("removeCrosshairBtn");
    
    if (applyBtn) {
        applyBtn.addEventListener("click", applyCrosshairToExport);
    }
    if (removeBtn) {
        removeBtn.addEventListener("click", removeCrosshairFromExport);
    }
    
    // Event listeners für die Slider
    const inputs = [
        "crosshairStyle", "dotCheckbox", "tStyleCheckbox", "outlineCheckbox",
        "lengthSlider", "thickSlider", "gapSlider", "outlineSlider",
        "redSlider", "greenSlider", "blueSlider", "alphaSlider", "alphaActiveCheckbox"
    ];
    
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", updateCrosshairUI);
            el.addEventListener("change", updateCrosshairUI);
        }
    });
    
    updateCrosshairUI();
}

function initCrosshairGenerator() {
    crosshairCanvas = document.getElementById("crosshairCanvas");
    if (crosshairCanvas) {
        crosshairCanvas.width = 800;
        crosshairCanvas.height = 200;
        crosshairCtx = crosshairCanvas.getContext("2d");
    }
    
    buildCrosshairUI();
    
    // Gespeichertes Crosshair laden
    loadSavedCrosshair();
    
    const copyBtn = document.getElementById("copyCrosshairBtn");
    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            const textarea = document.getElementById("crosshairConfigText");
            if (textarea) {
                textarea.select();
                document.execCommand("copy");
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = "✅ Kopiert!";
                setTimeout(() => { copyBtn.innerHTML = originalText; }, 1800);
            }
        });
    }
    
    if (crosshairCanvas) {
        window.addEventListener("resize", () => renderCrosshair());
    }
    
    console.log("✅ Crosshair Generator initialisiert");
}

// Export für globale Zugänglichkeit
window.initCrosshairGenerator = initCrosshairGenerator;
window.crosshairState = crosshairState;
window.generateCrosshairConfig = generateCrosshairConfig;
window.getCrosshairCommands = getCrosshairCommands;
window.isCrosshairAppliedToExport = isCrosshairAppliedToExport;
window.savedCrosshairCommands = () => savedCrosshairCommands;