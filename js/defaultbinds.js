// ======================== CS2 ORIGINAL STANDARD BINDINGS ========================
// Offizielle Standard-Tastenbelegung von Valve für CS2
// Alle Tasten klein, außer F-Tasten (F3, F4, F5, F6, F7, F10)

const cs2DefaultBinds = {
  // ========== ESCAPE & KONSOLE ==========
  escape: "cancelselect",
  "`": "toggleconsole",

  // ========== TABELLE / SCOREBOARD ==========
  tab: "+showscores",

  // ========== LEERTASTE ==========
  space: "+jump",

  // ========== AMMO KAUFEN (KOMMA/PUNKT) ==========
  ",": "buyammo1",
  ".": "buyammo2",

  // ========== WAFFENSLOTS (0-9) ==========
  0: "slot10",
  1: "slot1",
  2: "slot2",
  3: "slot3",
  4: "slot4",
  5: "slot5",
  6: "slot6",
  7: "slot7",
  8: "slot8",
  9: "slot9",

  // ========== BUCHSTABEN-TASTEN ==========
  a: "+left",
  b: "buymenu",
  c: "+radialradio",
  d: "+right",
  e: "+use",
  f: "+lookatweapon",
  g: "drop",
  h: "switchhands",
  i: "show_loadout_toggle",
  m: "teammenu",
  q: "lastinv",
  r: "+reload",
  s: "+back",
  t: "+spray_menu",
  u: "messagemode2",
  v: "+radialradio2",
  w: "+forward",
  x: "slot12",
  y: "messagemode",
  z: "radio",

  // ========== MODIFIER-TASTEN ==========
  ctrl: "+duck", // Linke Strg-Taste
  lctrl: "+duck", // Alternative Bezeichnung
  rctrl: "+duck", // Rechte Strg-Taste
  shift: "+sprint", // Linke Shift-Taste
  lshift: "+sprint", // Alternative Bezeichnung
  rshift: "+sprint", // Rechte Shift-Taste
  alt: "", // Alt-Taste (kein Standard-Bind in CS2)
  lalt: "", // Linke Alt-Taste
  ralt: "", // Rechte Alt-Taste (Alt Gr)

  // ========== NAVIGATION & EDIT (Sonderzeichen klein) ==========
  insert: "", // Insert-Taste (kein Standard-Bind)
  ins: "", // Alternative Bezeichnung
  home: "", // Home-Taste (kein Standard-Bind)
  pgup: "", // Page Up (kein Standard-Bind)
  pgdn: "", // Page Down (kein Standard-Bind)
  delete: "", // Delete-Taste (kein Standard-Bind)
  del: "sellbackall", // Entf-Taste (original: sellbackall)
  end: "", // End-Taste (kein Standard-Bind)

  // ========== FUNKTIONSTASTEN (groß) ==========
  F1: "", // F1 (kein Standard-Bind in CS2)
  F2: "", // F2 (kein Standard-Bind in CS2)
  F3: "autobuy",
  F4: "rebuy",
  F5: "jpeg",
  F6: "save quick",
  F7: "load quick",
  F8: "", // F8 (kein Standard-Bind)
  F9: "", // F9 (kein Standard-Bind)
  F10: "cs_quit_prompt",
  F11: "", // F11 (kein Standard-Bind)
  F12: "", // F12 (kein Standard-Bind)

  // ========== MAUS-RAD ==========
  mwheeldown: "invnext",
  mwheelup: "invprev",

  // ========== MAUS-TASTEN ==========
  mouse1: "+attack",
  mouse2: "+attack2",
  mouse3: "player_ping",
  mouse4: "+voicerecord",
  mouse5: "", // Maus-Taste 5 (kein Standard-Bind)
};

// Funktion: Prüft ob eine Taste eine CS2-Standardbelegung hat
function isCs2DefaultBind(key) {
  // Normalisiere den Key (alles klein für Vergleich)
  let normalizedKey = key.toLowerCase();

  // Funktionstasten (groß) bleiben wie sie sind für die Erkennung
  const functionKeys = [
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
  ];
  if (functionKeys.includes(key)) {
    // Prüfe ob die Funktionstaste einen Wert hat (nicht leer)
    return cs2DefaultBinds[key] && cs2DefaultBinds[key] !== "";
  }

  // Prüfe mit normalisiertem Key im Dictionary
  const hasBind = cs2DefaultBinds.hasOwnProperty(normalizedKey);
  if (hasBind) {
    // Gib true zurück nur wenn der Bind nicht leer ist
    return (
      cs2DefaultBinds[normalizedKey] && cs2DefaultBinds[normalizedKey] !== ""
    );
  }

  return false;
}

// Hilfsfunktion: Beschreibung für Standard-Bindings anzeigen (für Tooltips)
function getCs2DefaultDescription(key) {
  const normalizedKey = key.toLowerCase();

  const descriptions = {
    // ESC & KONSOLE
    escape: "ESC - Spielmenü öffnen / Auswahl abbrechen",
    "`": "Konsole öffnen/schließen (Toggle Console)",

    // TAB & SPACE
    tab: "TAB - Scoreboard anzeigen",
    space: "LEERTASTE - Springen",

    // AMMO
    ",": "KOMMA - Primäre Munition kaufen",
    ".": "PUNKT - Sekundäre Munition kaufen",

    // WAFFENSLOTS
    0: "0 - Waffenslot 10 (Bombe/Zubehör)",
    1: "1 - Waffenslot 1 (Primärwaffe)",
    2: "2 - Waffenslot 2 (Sekundärwaffe/Pistole)",
    3: "3 - Waffenslot 3 (Messer)",
    4: "4 - Waffenslot 4 (Granaten)",
    5: "5 - Waffenslot 5 (C4 Bombe / Zubehör)",
    6: "6 - Waffenslot 6",
    7: "7 - Waffenslot 7",
    8: "8 - Waffenslot 8",
    9: "9 - Waffenslot 9",

    // BUCHSTABEN
    a: "A - Nach links bewegen (strafe)",
    b: "B - Kaufmenü öffnen",
    c: "C - Radialmenü (Kommunikation)",
    d: "D - Nach rechts bewegen (strafe)",
    e: "E - Benutzen (Bombe entschärfen/aufnehmen, Türen)",
    f: "F - Waffe inspizieren",
    g: "G - Aktuelle Waffe fallen lassen",
    h: "H - Waffe in andere Hand wechseln",
    i: "I - Loadout-Menü umschalten",
    m: "M - Teamauswahl-Menü",
    q: "Q - Zuletzt benutzte Waffe",
    r: "R - Nachladen",
    s: "S - Rückwärts bewegen",
    t: "T - Spray-Menü öffnen",
    u: "U - Team-Chat (say_team)",
    v: "V - Radialmenü 2 (Kommunikation)",
    w: "W - Vorwärts bewegen",
    x: "X - Slot 12 (z.B. Waffen-Skins)",
    y: "Y - All-Chat (say)",
    z: "Z - Radio-Befehle",

    // MODIFIER
    ctrl: "STRG (links) - Ducken / Schleichen",
    lctrl: "STRG (links) - Ducken / Schleichen",
    rctrl: "STRG (rechts) - Ducken / Schleichen",
    shift: "SHIFT (links) - Schleichen / Leise bewegen",
    lshift: "SHIFT (links) - Schleichen / Leise bewegen",
    rshift: "SHIFT (rechts) - Schleichen / Leise bewegen",
    alt: "ALT - Keine Standardbelegung in CS2",
    lalt: "ALT (links) - Keine Standardbelegung",
    ralt: "ALT GR (rechts) - Keine Standardbelegung",

    // NAVIGATION
    insert: "INSERT - Keine Standardbelegung",
    ins: "INSERT - Keine Standardbelegung",
    home: "HOME - Keine Standardbelegung",
    pgup: "PAGE UP - Keine Standardbelegung",
    pgdn: "PAGE DOWN - Keine Standardbelegung",
    delete: "ENTF - Alle Items zurückgeben (Kaufmenü)",
    del: "ENTF - Alle Items zurückgeben (Kaufmenü)",
    end: "END - Keine Standardbelegung",

    // FUNKTIONSTASTEN
    F3: "F3 - Auto-Buy (vordefinierte Ausrüstung)",
    F4: "F4 - Re-Buy (letzte Ausrüstung erneut kaufen)",
    F5: "F5 - Screenshot (JPG)",
    F6: "F6 - Spielstand speichern (nur offline)",
    F7: "F7 - Spielstand laden (nur offline)",
    F10: "F10 - Spiel beenden (mit Bestätigung)",

    // MAUS
    mwheelup: "Mausrad hoch - Vorherige Waffe",
    mwheeldown: "Mausrad runter - Nächste Waffe",
    mouse1: "Linke Maustaste - Angriff / Schießen",
    mouse2:
      "Rechte Maustaste - Sekundärangriff (Zielen / Alternative Granaten)",
    mouse3: "Mittelklick - Spieler anpingen (Ping-Radar)",
    mouse4: "Seitentaste 1 (Zurück) - Sprachchat (Voice)",
    mouse5: "Seitentaste 2 (Vor) - Keine Standardbelegung",
  };

  return (
    descriptions[normalizedKey] ||
    descriptions[key] ||
    `CS2 Standard-Bindung für "${key}"`
  );
}

// Globale Exporte
window.cs2DefaultBinds = cs2DefaultBinds;
window.isCs2DefaultBind = isCs2DefaultBind;
window.getCs2DefaultDescription = getCs2DefaultDescription;
