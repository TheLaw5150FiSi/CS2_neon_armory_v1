// ======================== CS2 ORIGINAL STANDARD BINDINGS ========================
// Nur die Tasten, die CS2 ab Werk standardmäßig belegt hat

const cs2DefaultBinds = {
    // ========== BEWEGUNG ==========
    "W": "+forward",
    "A": "+moveleft", 
    "S": "+back",
    "D": "+moveright",
    "SPACE": "+jump",
    "LCTRL": "+duck",
    "LSHIFT": "+speed",
    
    // ========== WAFFEN & ANGRIFF ==========
    "mouse1": "+attack",
    "mouse2": "+attack2",
    "1": "slot1",
    "2": "slot2",
    "3": "slot3",
    "4": "slot4",
    "5": "slot5",
    "Q": "lastinv",
    "R": "+reload",
    
    // ========== KOMMUNIKATION ==========
    "Y": "say",
    "U": "say_team",
    "K": "+voicerecord",
    
    // ========== SPIEL & INTERFACE ==========
    "TAB": "+showscores",
    "ESC": "cancelselect",
    "F1": "autobuy",
    "F2": "rebuy",
    "F5": "jpeg",
    "F10": "quit prompt",
    "F12": "screenshot",
    
    // ========== SONSTIGE ==========
    "MWHEELUP": "invprev",
    "MWHEELDOWN": "invnext",
    "G": "drop",
    "B": "buymenu",
    "E": "+use",
    "Z": "radio1",
    "X": "radio2",
    "C": "radio3",
    "N": "nightvision",
    "M": "teammenu",
    "F": "+lookatweapon",
    "V": "+voicerecord",
};

// Funktion: Prüft ob eine Taste eine CS2-Standardbelegung hat
function isCs2DefaultBind(key) {
    // Maus-Tasten
    const mouseKeys = ["mouse1", "mouse2", "mouse3", "mouse4", "mouse5", "mwheelup", "mwheeldown"];
    if (mouseKeys.includes(key)) return true;
    
    // Sonderfälle
    const specialKeys = ["SPACE", "LCTRL", "RCTRL", "LSHIFT", "RSHIFT", "LALT", "RALT"];
    if (specialKeys.includes(key)) return true;
    
    // Normale Tasten
    return cs2DefaultBinds.hasOwnProperty(key);
}

// Globale Exporte
window.cs2DefaultBinds = cs2DefaultBinds;
window.isCs2DefaultBind = isCs2DefaultBind;