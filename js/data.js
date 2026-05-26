// ======================== DATEN FÜR SYSTEM ANALYZER ========================
const analyzerCpuData = {
  "Ryzen 9 9950X3D2": 24800, "Ryzen 9 9950X3D": 24500, "Ryzen 9 9950X": 24000,
  "Ryzen 9 9900X3D": 23500, "Ryzen 9 9900X": 23000, "Ryzen 9 7950X3D": 22800,
  "Ryzen 9 7950X": 22500, "Ryzen 9 7900X3D": 22000, "Ryzen 9 7900X": 21500,
  "Ryzen 9 7900": 20500, "Ryzen 9 5950X": 18500, "Ryzen 9 5900XT": 18000,
  "Ryzen 9 5900X": 17500, "Ryzen 9 5900": 16800, "Ryzen 9 3950X": 16000,
  "Ryzen 9 3900XT": 15500, "Ryzen 9 3900X": 15000, "Ryzen 7 9850X3D": 24000,
  "Ryzen 7 9800X3D": 23500, "Ryzen 7 9700X3D": 22500, "Ryzen 7 9700X": 21500,
  "Ryzen 7 8700G": 19500, "Ryzen 7 8700F": 19200, "Ryzen 7 7800X3D": 21000,
  "Ryzen 7 7700X": 19800, "Ryzen 7 7700": 19000, "Ryzen 7 5800X3D": 18200,
  "Ryzen 7 5800XT": 17500, "Ryzen 7 5800X": 16800, "Ryzen 7 5800": 16200,
  "Ryzen 7 5700X3D": 16500, "Ryzen 7 5700X": 15800, "Ryzen 7 5700G": 15200,
  "Ryzen 7 5700": 14800, "Ryzen 7 4700G": 13500, "Ryzen 7 3800XT": 12800,
  "Ryzen 7 3800X": 12500, "Ryzen 7 3700X": 12000, "Ryzen 7 2700X": 10000,
  "Ryzen 7 2700": 9500, "Ryzen 7 1800X": 8500, "Ryzen 7 1700X": 8000,
  "Ryzen 7 1700": 7500, "Ryzen 5 9600X3D": 20000, "Ryzen 5 9600X": 19500,
  "Ryzen 5 8600G": 18200, "Ryzen 5 8500G": 17200, "Ryzen 5 7600X3D": 18500,
  "Ryzen 5 7600X": 17800, "Ryzen 5 7600": 17200, "Ryzen 5 7500F": 16800,
  "Ryzen 5 5600X3D": 15800, "Ryzen 5 5600XT": 15500, "Ryzen 5 5600X": 15000,
  "Ryzen 5 5600G": 14500, "Ryzen 5 5600": 14200, "Ryzen 5 5500GT": 13500,
  "Ryzen 5 5500": 13000, "Ryzen 5 4600G": 11500, "Ryzen 5 4500": 10800,
  "Ryzen 5 3600XT": 11800, "Ryzen 5 3600X": 11500, "Ryzen 5 3600": 11000,
  "Ryzen 5 3500X": 10000, "Ryzen 5 2600X": 9000, "Ryzen 5 2600": 8500,
  "Ryzen 5 1600X": 7500, "Ryzen 5 1600": 7000, "Ryzen 5 1500X": 6500,
  "Ryzen 5 1400": 6000, "Ryzen 3 8300G": 12000, "Ryzen 3 5300G": 10500,
  "Ryzen 3 4300G": 9000, "Ryzen 3 4100": 8500, "Ryzen 3 3300X": 9200,
  "Ryzen 3 3100": 8500, "Ryzen 3 3200G": 7200, "Ryzen 3 2200G": 6200,
  "Ryzen 3 1300X": 5800, "Ryzen 3 1200": 5200, "TR 7995WX": 29000,
  "TR 7985WX": 28000, "TR 7980X": 27500, "TR 5995WX": 26000, "TR 3990X": 23000,
  "TR 2990WX": 19000, "TR 2950X": 17000, "TR 1950X": 15000, "Ultra 9 285K": 24500,
  "Ultra 7 265K": 22500, "Ultra 7 265KF": 22400, "Ultra 5 245K": 19800,
  "Ultra 5 245KF": 19700, "Ultra 5 225F": 17800, "Ultra 5 135H": 16800,
  "Ultra 5 125H": 15800, "i9-14900K": 24800, "i9-14900KF": 24700, "i9-14900": 23800,
  "i9-13900K": 23500, "i9-13900KF": 23400, "i9-12900K": 20500, "i9-11900K": 17200,
  "i9-10900K": 16200, "i9-10900": 15500, "i9-9900K": 14000, "i9-9900": 13500,
  "i7-14700K": 22800, "i7-14700": 22000, "i7-13700K": 21200, "i7-13700": 20500,
  "i7-12700K": 18500, "i7-12700": 17800, "i7-11700K": 16200, "i7-10700K": 15000,
  "i7-10700": 14500, "i7-9700K": 13000, "i7-8700K": 11500, "i7-7700K": 10500,
  "i7-6700K": 9500, "i7-4790K": 8500, "i7-4770K": 8200, "i7-3770K": 7000,
  "i7-2700K": 6500, "i7-2600K": 6300, "i7-990X": 5500, "i7-980X": 5300,
  "i7-975": 4800, "i7-965": 4600, "i7-920": 4200, "i5-14600K": 20800,
  "i5-14600": 20000, "i5-14500": 19500, "i5-14400F": 18200, "i5-13600K": 19800,
  "i5-13600": 19000, "i5-13500": 18500, "i5-13400F": 17200, "i5-12600K": 16800,
  "i5-12600": 16000, "i5-12500": 15500, "i5-12400F": 14800, "i5-12400": 14500,
  "i5-11600K": 14000, "i5-11400F": 13000, "i5-10600K": 12500, "i5-10400F": 11500,
  "i5-9600K": 11000, "i5-9400F": 10000, "i5-8400": 9500, "i5-7600K": 8500,
  "i5-6600K": 7800, "i5-4690K": 6800, "i5-3570K": 5800, "i5-2500K": 5200,
  "i5-760": 4000, "i5-750": 3800, "i3-14100F": 12000, "i3-13100F": 11500,
  "i3-12100F": 10800, "i3-10105F": 9000, "i3-10100": 8800, "i3-9100F": 8000,
  "i3-8100": 7500, "i3-7350K": 6800, "i3-6320": 6200, "i3-4170": 5500,
  "i3-3240": 4800, "i3-2120": 4200, "i3-540": 3500, "i3-530": 3300,
  "Pentium G4560": 5200, "Pentium G4400": 4500, "Pentium G3258": 4200,
  "Pentium G3220": 4000, "Celeron G3930": 3800, "Celeron G1820": 3200
};

const analyzerGpuData = {
  "RTX 5090": 27200, "RTX 5080": 25800, "RTX 5070 Ti": 24500, "RTX 5070": 22800,
  "RTX 5060 Ti": 18800, "RTX 5060": 16800, "RTX 4090": 26800, "RTX 4080 SUPER": 25500,
  "RTX 4080": 24800, "RTX 4070 Ti SUPER": 23800, "RTX 4070 Ti": 22500,
  "RTX 4070 SUPER": 21500, "RTX 4070": 20000, "RTX 4060 Ti": 17000, "RTX 4060": 15000,
  "RTX 3090 Ti": 23200, "RTX 3090": 21800, "RTX 3080 Ti": 21200, "RTX 3080 12GB": 20500,
  "RTX 3080": 19800, "RTX 3070 Ti": 18200, "RTX 3070": 17000, "RTX 3060 Ti": 15800,
  "RTX 3060 12GB": 14000, "RTX 3060 8GB": 13000, "RTX 3050": 10500, "RTX 2080 Ti": 16500,
  "RTX 2080 SUPER": 15000, "RTX 2080": 14200, "RTX 2070 SUPER": 13500, "RTX 2070": 12500,
  "RTX 2060 SUPER": 11500, "RTX 2060": 10500, "GTX 1660 SUPER": 9000, "GTX 1660 Ti": 8800,
  "GTX 1660": 8200, "GTX 1650 SUPER": 7200, "GTX 1650": 6200, "GTX 1080 Ti": 12500,
  "GTX 1080": 11000, "GTX 1070 Ti": 10000, "GTX 1070": 9200, "GTX 1060 6GB": 8000,
  "GTX 1050 Ti": 6500, "GTX 1050": 5500, "GTX 980 Ti": 9000, "GTX 980": 7500,
  "GTX 970": 6500, "GTX 960": 5200, "GTX 950": 4500, "RX 9090 XT": 26500,
  "RX 9080 XT": 25200, "RX 9070 XT": 23800, "RX 9070": 22200, "RX 9060 XT": 18500,
  "RX 7900 XTX": 24800, "RX 7900 XT": 23500, "RX 7900 GRE": 21800, "RX 7800 XT": 20500,
  "RX 7700 XT": 18500, "RX 7600 XT": 16500, "RX 7600": 14800, "RX 6950 XT": 21800,
  "RX 6900 XT": 21000, "RX 6800 XT": 20000, "RX 6800": 18200, "RX 6750 XT": 17200,
  "RX 6700 XT": 16200, "RX 6700": 15000, "RX 6650 XT": 14500, "RX 6600 XT": 13800,
  "RX 6600": 12800, "RX 6500 XT": 8800, "RX 6400": 7800, "RX 5700 XT": 11800,
  "RX 5700": 10800, "RX 5600 XT": 9500, "RX 5500 XT": 8200, "RX Vega 64": 10500,
  "RX Vega 56": 9500, "RX 590": 8000, "RX 580": 7500, "RX 570": 6800, "RX 480": 7000,
  "Intel Arc B580": 16500, "Intel Arc B570": 14800, "Intel Arc A770": 15500,
  "Intel Arc A750": 14000, "Intel Arc A580": 12500, "Intel Arc A380": 8500,
  "Intel Arc A310": 7000, "Intel UHD Graphics 770": 3500, "Intel UHD Graphics 750": 3200,
  "Intel UHD Graphics 730": 2800, "Intel UHD Graphics 630": 2500, "Intel Iris Xe Graphics": 3000,
  "Intel HD Graphics 630": 2200, "Intel HD Graphics 530": 1800
};

// ======================== CONFIG COMMANDS ========================
const allCommandsLibrary = {
  "Performance Kern": [
    { cmd: "fps_max", values: ["0", "60", "120", "144", "240", "300", "400", "500", "1000"], desc: "Begrenzt die maximale Bildrate." },
    { cmd: "fps_max_menu", values: ["30", "60", "120", "144"], desc: "Begrenzt die Bildrate im Menü." },
    { cmd: "engine_low_latency_sleep", values: ["0", "1"], desc: "Reduziert die Input-Latenz." },
    { cmd: "r_queued_ropes", values: ["0", "1"], desc: "Optimiert die Darstellung von Seilen." },
    { cmd: "cl_forcepreload", values: ["0", "1"], desc: "Lädt alle Ressourcen vor." }
  ],
  "Shader & Effekte": [
    { cmd: "r_csm", values: ["0", "1", "2"], desc: "Kaskadierte Schattenkarten." },
    { cmd: "r_csm_cascade_res", values: ["256", "512", "1024", "2048"], desc: "Auflösung der Schattenkarten." },
    { cmd: "r_dynamic", values: ["0", "1"], desc: "Dynamische Schatten." },
    { cmd: "r_rim_light", values: ["0", "1"], desc: "Randlichter an Modellen." },
    { cmd: "mat_disable_bloom", values: ["0", "1"], desc: "Bloom-Effekt deaktivieren." },
    { cmd: "r_3dsky", values: ["0", "1"], desc: "3D-Himmel auf Maps." },
    { cmd: "cl_detaildist", values: ["400", "800", "1200", "2000"], desc: "Reichweite für Detail-Texturen." }
  ],
  "Speicher Optimierung": [
    { cmd: "cl_forcepreload", values: ["0", "1"], desc: "Ressourcen vorladen." },
    { cmd: "cl_physics_impact_enable", values: ["0", "1"], desc: "Physik-Effekte." },
    { cmd: "cl_ragdoll_physics_enable", values: ["0", "1"], desc: "Leichen-Physik." },
    { cmd: "r_waterforceexpensive", values: ["0", "1"], desc: "Wassereffekte." }
  ],
  "GPU & Rendering": [
    { cmd: "mat_queue_mode", values: ["-1", "0", "1", "2"], desc: "Multithreading für Rendering." },
    { cmd: "mat_vsync", values: ["0", "1"], desc: "Vertikale Synchronisation." },
    { cmd: "gpu_level", values: ["0", "1", "2", "3"], desc: "GPU-Render-Qualität." },
    { cmd: "mat_picmip", values: ["0", "1", "2"], desc: "Texturqualität." },
    { cmd: "r_lod", values: ["-1", "0", "1", "2"], desc: "Modell-Detailstufe." },
    { cmd: "mat_aaquality", values: ["0", "1", "2"], desc: "Anti-Aliasing-Qualität." }
  ],
  "CPU & Threading": [
    { cmd: "host_thread_mode", values: ["0", "1", "2"], desc: "Multi-Core-Rendering." },
    { cmd: "threadpool_worker_count", values: ["2", "4", "6", "8", "12", "16"], desc: "Anzahl der CPU-Threads." },
    { cmd: "sv_parallel_packentities", values: ["0", "1"], desc: "Parallele Entity-Verarbeitung." }
  ],
  Lautstärke: [
    { cmd: "volume", values: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"], desc: "Master-Lautstärke." },
    { cmd: "voice_scale", values: ["0", "0.2", "0.4", "0.6", "0.8", "1.0"], desc: "Voice-Chat Lautstärke." },
    { cmd: "snd_mixahead", values: ["0.02", "0.05", "0.1", "0.2"], desc: "Audio-Puffer." },
    { cmd: "snd_headphone_pan_exponent", values: ["1", "1.5", "2"], desc: "Kopfhörer Panorama." }
  ],
  "Mikrofon & Voice": [
    { cmd: "voice_enable", values: ["0", "1"], desc: "Voice-Chat aktivieren." },
    { cmd: "voice_threshold", values: ["0", "0.1", "0.2", "0.5", "1.0"], desc: "Mikrofon-Empfindlichkeit." },
    { cmd: "voice_loopback", values: ["0", "1"], desc: "Eigene Stimme hören." },
    { cmd: "voice_mixer_volume", values: ["0", "0.25", "0.5", "0.75", "1.0"], desc: "Mikrofon-Lautstärke." }
  ],
  "Sound Qualität": [
    { cmd: "snd_musicvolume", values: ["0", "0.2", "0.4", "0.6", "0.8", "1.0"], desc: "Musik-Lautstärke." },
    { cmd: "snd_menumusic_volume", values: ["0", "0.2", "0.5", "1.0"], desc: "Menü-Musik." },
    { cmd: "snd_roundend_volume", values: ["0", "0.2", "0.5", "1.0"], desc: "Lautstärke am Rundenende." }
  ],
  Interpolation: [
    { cmd: "cl_interp_ratio", values: ["1", "2"], desc: "Interpolationsverhältnis." },
    { cmd: "cl_interp", values: ["0", "0.015625", "0.03125"], desc: "Interpolationszeit." }
  ],
  "Bandbreite & Rate": [
    { cmd: "rate", values: ["196608", "393216", "524288", "786432", "1048576"], desc: "Maximale Bandbreite." },
    { cmd: "cl_updaterate", values: ["64", "128"], desc: "Updates pro Sekunde." },
    { cmd: "cl_cmdrate", values: ["64", "128"], desc: "Befehle pro Sekunde." }
  ],
  "Latency & Timeout": [
    { cmd: "cl_timeout", values: ["30", "60", "120", "300"], desc: "Timeout in Sekunden." },
    { cmd: "net_maxcleartime", values: ["0", "1", "2"], desc: "Netzwerk-Clear-Time." }
  ],
  "Connection Optimierung": [
    { cmd: "cl_predict", values: ["0", "1"], desc: "Bewegungsvorhersage." },
    { cmd: "cl_predictweapons", values: ["0", "1"], desc: "Waffen-Vorhersage." }
  ],
  "Auflösung & Display": [
    { cmd: "mat_setvideomode", values: ["1280 720 1", "1366 768 1", "1600 900 1", "1920 1080 1", "2560 1440 1"], desc: "16:9 Auflösung." },
    { cmd: "mat_setvideomode_ex", values: ["1280 1024 1", "1024 768 1", "800 600 1"], desc: "4:3 Auflösung." },
    { cmd: "mat_monitorgamma", values: ["1.6", "1.8", "2.0", "2.2", "2.4"], desc: "Gamma-Wert." }
  ],
  "Texturen & Details": [
    { cmd: "mat_picmip", values: ["0", "1", "2"], desc: "Texturqualität." },
    { cmd: "r_lod", values: ["-1", "0", "1", "2"], desc: "Modell-Detail." },
    { cmd: "cl_detaildist", values: ["400", "800", "1200", "2000"], desc: "Detail-Reichweite." }
  ],
  "Beleuchtung & Schatten": [
    { cmd: "r_csm", values: ["0", "1", "2"], desc: "Schattenqualität." },
    { cmd: "r_shadow_quality", values: ["0", "1", "2"], desc: "Zusätzliche Schattenqualität." },
    { cmd: "mat_ambient_light_r", values: ["0.1", "0.2", "0.3", "0.4"], desc: "Ambiente Beleuchtung Rot." },
    { cmd: "mat_ambient_light_g", values: ["0.1", "0.2", "0.3", "0.4"], desc: "Ambiente Beleuchtung Grün." },
    { cmd: "mat_ambient_light_b", values: ["0.1", "0.2", "0.3", "0.4"], desc: "Ambiente Beleuchtung Blau." }
  ],
  "Anti-Aliasing": [
    { cmd: "mat_msaa", values: ["0", "2", "4", "8"], desc: "Multisample Anti-Aliasing." },
    { cmd: "mat_aaquality", values: ["0", "1", "2"], desc: "Anti-Aliasing-Qualität." },
    { cmd: "mat_software_aa_strength", values: ["0", "0.5", "1.0"], desc: "Post-Processing AA." }
  ],
  "Post-Processing": [
    { cmd: "mat_disable_fancy_blending", values: ["0", "1"], desc: "Deaktiviert aufwendige Effekte." },
    { cmd: "r_ambientboost", values: ["0", "1"], desc: "Verstärkt Ambiente Beleuchtung." },
    { cmd: "mat_disable_bloom", values: ["0", "1"], desc: "Bloom deaktivieren." }
  ]
};

// ======================== PRESETS ========================
const presetsList = [
  { key: "cinematic", name: "🎬 Cinematic Ultra", desc: "Maximale visuelle Qualität", badge: "RTX 4080+",
    commands: ["mat_setvideomode 2560 1440 1", "mat_vsync 1", "r_dynamic 1", "r_csm 2", "mat_msaa 8", "mat_picmip 0", "r_lod -1", "cl_detaildist 2000", "mat_aaquality 2", "r_shadow_quality 2", "r_3dsky 1", "r_rim_light 1", "mat_disable_fancy_blending 0"] },
  { key: "highfps", name: "⚡ HIGH FPS", desc: "Competitive Performance", badge: "240Hz+",
    commands: ["mat_setvideomode 1280 960 1", "mat_vsync 0", "r_dynamic 0", "r_csm 0", "mat_msaa 2", "mat_picmip 2", "r_lod 2", "cl_detaildist 400", "mat_aaquality 0", "r_shadow_quality 0", "r_3dsky 0", "r_rim_light 0", "mat_disable_fancy_blending 1", "cl_forcepreload 1"] },
  { key: "lowend", name: "🔧 LOW-END", desc: "Maximale FPS", badge: "Toaster",
    commands: ["mat_setvideomode 1024 768 1", "mat_vsync 0", "r_dynamic 0", "r_csm 0", "mat_msaa 0", "mat_picmip 2", "r_lod 2", "cl_detaildist 400", "mat_aaquality 0", "r_shadow_quality 0", "r_3dsky 0", "r_rim_light 0", "mat_disable_fancy_blending 1", "cl_forcepreload 1", "mat_disable_bloom 1", "cl_physics_impact_enable 0", "cl_ragdoll_physics_enable 0"] },
  { key: "balanced", name: "⚖️ Balanced", desc: "Gute Grafik & FPS", badge: "Allrounder",
    commands: ["mat_setvideomode 1920 1080 1", "mat_vsync 0", "r_dynamic 1", "r_csm 1", "mat_msaa 4", "mat_picmip 1", "r_lod 0", "cl_detaildist 1200", "mat_aaquality 1", "r_shadow_quality 1", "r_3dsky 1", "r_rim_light 0", "mat_disable_fancy_blending 0"] }
];

// ======================== SKRIPT-TEMPLATES ========================
const scriptTemplatesList = [
  { name: "🦘 Jumpthrow", key: "jumpthrow", desc: "Springt und wirft gleichzeitig eine Granate.",
    content: 'alias +jumpthrow "+jump"\nalias -jumpthrow "-jump; -attack"\nbind "KEY" "+jumpthrow"' },
  { name: "📊 NetGraph Toggle", key: "netgraph", desc: "Zeigt FPS und Ping an.",
    content: 'alias +netg "cl_showfps 2;+showscores"\nalias -netg "cl_showfps 0;-showscores"\nbind "KEY" "+netg"' },
  { name: "💣 Quick Nade", key: "quicknade", desc: "Sofort zur nächsten Granate wechseln.",
    content: 'alias nextnade "use weapon_hegrenade; use weapon_flashbang; use weapon_smokegrenade; use weapon_molotov"\nbind "KEY" "nextnade"' },
  { name: "🌈 Rainbow-HUD", key: "rainbowhud", desc: "Farbiges HUD bei Bewegung.",
    content: 'alias hudToggle "hud_on"\nalias "hud_off" "\n    bind w +forward;\n    bind s +back;\n    bind a +left;\n    bind d +right;\n    bind space +jump;\n    bind ctrl +duck;\n    bind shift +speed;\n    cl_hud_color 0;\n    echo \"🌈 HUD-Farben AUS\";\n    alias hudToggle hud_on\n"\nalias "hud_on" "\n    bind w +_forward;\n    bind s +_back;\n    bind a +_left;\n    bind d +_right;\n    bind space +_jump;\n    bind ctrl +_duck;\n    bind shift +_walk;\n    echo \"🌈 HUD-Farben AN\";\n    alias hudToggle hud_off\n"\nalias "+_forward" "+forward; cl_hud_color 7"\nalias "-_forward" "-forward; cl_hud_color 0"\nalias "+_back" "+back; cl_hud_color 3"\nalias "-_back" "-back; cl_hud_color 0"\nalias "+_left" "+left; cl_hud_color 8"\nalias "-_left" "-left; cl_hud_color 0"\nalias "+_right" "+right; cl_hud_color 10"\nalias "-_right" "-right; cl_hud_color 0"\nalias "+_jump" "+jump; cl_hud_color 6"\nalias "-_jump" "-jump; cl_hud_color 0"\nalias "+_duck" "+duck; cl_hud_color 5"\nalias "-_duck" "-duck; cl_hud_color 0"\nalias "+_walk" "+speed; cl_hud_color 9"\nalias "-_walk" "-speed; cl_hud_color 0"\nbind "KEY" "hudToggle"\nhud_on' },
  { name: "💣 Quick Bomb Drop", key: "bombdrop", desc: "Bombe sofort fallen lassen.",
    content: 'alias "+bombdrop" "use weapon_c4; drop"\nalias "-bombdrop" "slot10"\nbind "KEY" "+bombdrop"' }
];

// ======================== WAFFENKATEGORIEN ========================
const categories = {
  Pistole: ["Glock-18", "USP-S", "P250", "Five-SeveN", "Tec-9", "Desert Eagle", "Dual Berettas", "CZ75-Auto"].map(n => ({ name: n, cmd: `buy ${n.toLowerCase().replace(/ /g, "").replace(/-/g, "")}`, maxCount: 1 })),
  "MP / SMG": ["MP9", "MAC-10", "MP7", "MP5-SD", "UMP-45", "P90", "PP-Bizon"].map(n => ({ name: n, cmd: `buy ${n.toLowerCase().replace(/ /g, "").replace(/-/g, "")}`, maxCount: 1 })),
  Rifle: ["AK-47", "M4A4", "M4A1-S", "FAMAS", "Galil AR", "SG 553", "AUG"].map(n => ({ name: n, cmd: `buy ${n.toLowerCase().replace(/ /g, "").replace(/-/g, "")}`, maxCount: 1 })),
  Sniper: ["AWP", "SSG 08", "SCAR-20", "G3SG1"].map(n => ({ name: n, cmd: `buy ${n.toLowerCase().replace(/ /g, "").replace("-", "")}`, maxCount: 1 })),
  Pumpgun: ["Nova", "XM1014", "MAG-7", "Sawed-Off"].map(n => ({ name: n, cmd: `buy ${n.toLowerCase().replace(/ /g, "").replace(/-/g, "")}`, maxCount: 1 })),
  "Schwere Waffen": ["M249", "Negev"].map(n => ({ name: n, cmd: `buy ${n.toLowerCase()}`, maxCount: 1 })),
  Rüstung: [
    { name: "Kevlar+Helm", cmd: "buy vesthelm", maxCount: 1 },
    { name: "Kevlar", cmd: "buy vest", maxCount: 1 },
    { name: "Defuser", cmd: "buy defuser", maxCount: 1 },
    { name: "🔫 Taser", cmd: "buy taser", maxCount: 1 }
  ],
  Granaten: [
    { name: "HE Grenade", cmd: "buy hegrenade", maxCount: 1 },
    { name: "Flashbang", cmd: "buy flashbang", maxCount: 2 },
    { name: "Smoke", cmd: "buy smokegrenade", maxCount: 1 },
    { name: "Molotov", cmd: "buy molotov", maxCount: 1 },
    { name: "Incendiary", cmd: "buy incgrenade", maxCount: 1 },
    { name: "Decoy", cmd: "buy decoy", maxCount: 1 }
  ]
};

// ======================== START OPTIONEN ========================
let startOptionsList = [
  { cmd: "-console", desc: "Konsole", hasValue: false, selected: true },
  { cmd: "-high", desc: "Hohe Priorität", hasValue: false, selected: false },
  { cmd: "-nojoy", desc: "Joystick aus", hasValue: false, selected: false },
  { cmd: "-fullscreen", desc: "Vollbild", hasValue: false, selected: false },
  { cmd: "-vulkan", desc: "Vulkan API", hasValue: false, selected: false },
  { cmd: "-softparticlesdefaultoff", desc: "Partikel aus", hasValue: false, selected: false },
  { cmd: "-refresh", desc: "Hz", hasValue: true, value: "144", selected: false, values: ["60", "120", "144", "165", "240", "360"] },
  { cmd: "-threads", desc: "Threads", hasValue: true, value: "8", selected: false, values: ["4", "6", "8", "12", "16"] }
];

// ======================== TASTATUR LAYOUT ========================
const deKeysRows = [
  ["ESC", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
  ["^", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "ß", "´", "BACKSPACE"],
  ["TAB", "Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü", "+", "#"],
  ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä", "ENTER"],
  ["LSHIFT", "<", "Y", "X", "C", "V", "B", "N", "M", ",", ".", "-", "RSHIFT"],
  ["LCTRL", "LALT", "SPACE", "RALT", "RCTRL", "LEFT", "DOWN", "UP", "RIGHT"]
];

const usKeysRows = [
  ["ESC", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
  ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "BACKSPACE"],
  ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "ENTER"],
  ["LSHIFT", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "RSHIFT"],
  ["LCTRL", "LALT", "SPACE", "RALT", "RCTRL", "LEFT", "DOWN", "UP", "RIGHT"]
];

const numpadKeys = ["KP_7", "KP_8", "KP_9", "KP_4", "KP_5", "KP_6", "KP_1", "KP_2", "KP_3", "KP_0", "KP_DEL", "KP_PLUS"];

// ======================== CONFIG KATEGORIEN ========================
const configCategories = {
  "🎯 Performance & FPS": { subcats: ["Performance Kern", "Shader & Effekte", "Speicher Optimierung", "GPU & Rendering", "CPU & Threading"], commands: {} },
  "🔊 Audio & Voice": { subcats: ["Lautstärke", "Mikrofon & Voice", "Sound Qualität"], commands: {} },
  "🌐 Netzwerk & Multiplayer": { subcats: ["Interpolation", "Bandbreite & Rate", "Latency & Timeout", "Connection Optimierung"], commands: {} },
  "🎨 Video & Grafik": { subcats: ["Auflösung & Display", "Texturen & Details", "Beleuchtung & Schatten", "Anti-Aliasing", "Post-Processing"], commands: {} }
};