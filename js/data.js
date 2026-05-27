// ======================== DATEN FÜR SYSTEM ANALYZER ========================
const analyzerCpuData = {
  // ======================== INTEL CORE ULTRA (2024-2025) ========================
  "Intel Core Ultra 9 295K": 25800,
  "Intel Core Ultra 9 285K": 24500,
  "Intel Core Ultra 7 275K": 23500,
  "Intel Core Ultra 7 265K": 22500,
  "Intel Core Ultra 7 265KF": 22400,
  "Intel Core Ultra 5 245K": 19800,
  "Intel Core Ultra 5 245KF": 19700,
  "Intel Core Ultra 5 235": 18500,
  "Intel Core Ultra 5 225F": 17800,
  "Intel Core Ultra 5 225": 17500,

  // ======================== 14. GENERATION (Raptor Lake Refresh) ========================
  "Intel Core i9-14900KS": 25800,
  "Intel Core i9-14900K": 24800,
  "Intel Core i9-14900KF": 24700,
  "Intel Core i9-14900": 23800,
  "Intel Core i9-14900F": 23500,
  "Intel Core i9-14900T": 20000,
  "Intel Core i7-14700K": 22800,
  "Intel Core i7-14700KF": 22700,
  "Intel Core i7-14700": 22000,
  "Intel Core i7-14700F": 21800,
  "Intel Core i7-14700T": 19000,
  "Intel Core i5-14600K": 20800,
  "Intel Core i5-14600KF": 20700,
  "Intel Core i5-14600": 20000,
  "Intel Core i5-14500": 19500,
  "Intel Core i5-14400": 18500,
  "Intel Core i5-14400F": 18200,
  "Intel Core i5-14400T": 16000,
  "Intel Core i3-14100": 12200,
  "Intel Core i3-14100F": 12000,

  // ======================== 13. GENERATION (Raptor Lake) ========================
  "Intel Core i9-13900KS": 24500,
  "Intel Core i9-13900K": 23500,
  "Intel Core i9-13900KF": 23400,
  "Intel Core i9-13900": 22500,
  "Intel Core i9-13900F": 22200,
  "Intel Core i9-13900T": 19500,
  "Intel Core i7-13700K": 21200,
  "Intel Core i7-13700KF": 21100,
  "Intel Core i7-13700": 20500,
  "Intel Core i7-13700F": 20300,
  "Intel Core i7-13700T": 18000,
  "Intel Core i5-13600K": 19800,
  "Intel Core i5-13600KF": 19700,
  "Intel Core i5-13600": 19000,
  "Intel Core i5-13500": 18500,
  "Intel Core i5-13400": 17500,
  "Intel Core i5-13400F": 17200,
  "Intel Core i5-13400T": 15200,
  "Intel Core i3-13100": 11800,
  "Intel Core i3-13100F": 11500,

  // ======================== 12. GENERATION (Alder Lake) ========================
  "Intel Core i9-12900KS": 21500,
  "Intel Core i9-12900K": 20500,
  "Intel Core i9-12900KF": 20400,
  "Intel Core i9-12900": 19500,
  "Intel Core i9-12900F": 19200,
  "Intel Core i9-12900T": 17000,
  "Intel Core i7-12700K": 18500,
  "Intel Core i7-12700KF": 18400,
  "Intel Core i7-12700": 17800,
  "Intel Core i7-12700F": 17600,
  "Intel Core i7-12700T": 15500,
  "Intel Core i5-12600K": 16800,
  "Intel Core i5-12600KF": 16700,
  "Intel Core i5-12600": 16000,
  "Intel Core i5-12500": 15500,
  "Intel Core i5-12490F": 15000, // China special
  "Intel Core i5-12400": 14500,
  "Intel Core i5-12400F": 14300,
  "Intel Core i5-12400T": 12800,
  "Intel Core i3-12100": 11000,
  "Intel Core i3-12100F": 10800,

  // ======================== 11. GENERATION (Rocket Lake) ========================
  "Intel Core i9-11900K": 17200,
  "Intel Core i9-11900KF": 17100,
  "Intel Core i9-11900": 16500,
  "Intel Core i9-11900F": 16300,
  "Intel Core i9-11900T": 14500,
  "Intel Core i7-11700K": 16200,
  "Intel Core i7-11700KF": 16100,
  "Intel Core i7-11700": 15500,
  "Intel Core i7-11700F": 15300,
  "Intel Core i7-11700T": 13500,
  "Intel Core i5-11600K": 14000,
  "Intel Core i5-11600KF": 13900,
  "Intel Core i5-11600": 13500,
  "Intel Core i5-11500": 13200,
  "Intel Core i5-11400": 12800,
  "Intel Core i5-11400F": 12500,
  "Intel Core i3-10325": 9500,
  "Intel Core i3-10320": 9300,
  "Intel Core i3-10300": 9100,

  // ======================== 10. GENERATION (Comet Lake) ========================
  "Intel Core i9-10900K": 16200,
  "Intel Core i9-10900KF": 16100,
  "Intel Core i9-10900": 15500,
  "Intel Core i9-10900F": 15300,
  "Intel Core i9-10900T": 13500,
  "Intel Core i7-10700K": 15000,
  "Intel Core i7-10700KF": 14900,
  "Intel Core i7-10700": 14500,
  "Intel Core i7-10700F": 14300,
  "Intel Core i7-10700T": 12500,
  "Intel Core i5-10600K": 12500,
  "Intel Core i5-10600KF": 12400,
  "Intel Core i5-10600": 12000,
  "Intel Core i5-10500": 11800,
  "Intel Core i5-10400": 11500,
  "Intel Core i5-10400F": 11300,
  "Intel Core i5-10400T": 10000,
  "Intel Core i3-10105": 9000,
  "Intel Core i3-10105F": 8800,
  "Intel Core i3-10100": 8700,
  "Intel Core i3-10100F": 8500,

  // ======================== 9. GENERATION (Coffee Lake Refresh) ========================
  "Intel Core i9-9900K": 14000,
  "Intel Core i9-9900KF": 13900,
  "Intel Core i9-9900": 13500,
  "Intel Core i9-9900T": 12000,
  "Intel Core i7-9700K": 13000,
  "Intel Core i7-9700KF": 12900,
  "Intel Core i7-9700": 12500,
  "Intel Core i7-9700F": 12300,
  "Intel Core i7-9700T": 11000,
  "Intel Core i5-9600K": 11000,
  "Intel Core i5-9600KF": 10900,
  "Intel Core i5-9600": 10500,
  "Intel Core i5-9500": 10200,
  "Intel Core i5-9500F": 10000,
  "Intel Core i5-9400": 9800,
  "Intel Core i5-9400F": 9600,
  "Intel Core i5-9400T": 8500,
  "Intel Core i3-9350K": 8500,
  "Intel Core i3-9320": 8300,
  "Intel Core i3-9300": 8200,
  "Intel Core i3-9100": 8000,
  "Intel Core i3-9100F": 7800,

  // ======================== 8. GENERATION (Coffee Lake) ========================
  "Intel Core i7-8700K": 11500,
  "Intel Core i7-8700": 11000,
  "Intel Core i7-8700T": 9500,
  "Intel Core i7-8086K": 11800, // 40th Anniversary
  "Intel Core i5-8600K": 10500,
  "Intel Core i5-8600": 10000,
  "Intel Core i5-8500": 9800,
  "Intel Core i5-8400": 9500,
  "Intel Core i5-8400T": 8300,
  "Intel Core i3-8350K": 8000,
  "Intel Core i3-8300": 7800,
  "Intel Core i3-8100": 7500,

  // ======================== 7. GENERATION (Kaby Lake) ========================
  "Intel Core i7-7700K": 10500,
  "Intel Core i7-7700": 10000,
  "Intel Core i7-7700T": 8800,
  "Intel Core i5-7600K": 9000,
  "Intel Core i5-7600": 8700,
  "Intel Core i5-7500": 8500,
  "Intel Core i5-7400": 8200,
  "Intel Core i3-7350K": 7200,
  "Intel Core i3-7320": 7000,
  "Intel Core i3-7300": 6800,
  "Intel Core i3-7100": 6600,

  // ======================== 6. GENERATION (Skylake) ========================
  "Intel Core i7-6700K": 9500,
  "Intel Core i7-6700": 9000,
  "Intel Core i7-6700T": 8000,
  "Intel Core i5-6600K": 8500,
  "Intel Core i5-6600": 8200,
  "Intel Core i5-6500": 8000,
  "Intel Core i5-6400": 7700,
  "Intel Core i5-6402P": 7600,
  "Intel Core i3-6320": 6200,
  "Intel Core i3-6300": 6000,
  "Intel Core i3-6100": 5800,

  // ======================== 5. GENERATION (Broadwell) ========================
  "Intel Core i7-5775C": 8800,
  "Intel Core i5-5675C": 7800,

  // ======================== 4. GENERATION (Haswell) ========================
  "Intel Core i7-4790K": 8500,
  "Intel Core i7-4790": 8000,
  "Intel Core i7-4790S": 7800,
  "Intel Core i7-4790T": 7500,
  "Intel Core i7-4770K": 8200,
  "Intel Core i7-4770": 7700,
  "Intel Core i7-4770S": 7500,
  "Intel Core i7-4771": 7800,
  "Intel Core i5-4690K": 7500,
  "Intel Core i5-4690": 7200,
  "Intel Core i5-4690S": 7000,
  "Intel Core i5-4670K": 7300,
  "Intel Core i5-4670": 7000,
  "Intel Core i5-4590": 6900,
  "Intel Core i5-4590S": 6700,
  "Intel Core i5-4460": 6600,
  "Intel Core i5-4460S": 6400,
  "Intel Core i5-4440": 6500,
  "Intel Core i5-4430": 6300,
  "Intel Core i3-4370": 5500,
  "Intel Core i3-4360": 5400,
  "Intel Core i3-4350": 5300,
  "Intel Core i3-4340": 5200,
  "Intel Core i3-4330": 5100,
  "Intel Core i3-4170": 5000,
  "Intel Core i3-4160": 4900,
  "Intel Core i3-4150": 4800,
  "Intel Core i3-4130": 4700,

  // ======================== 3. GENERATION (Ivy Bridge) ========================
  "Intel Core i7-3770K": 7000,
  "Intel Core i7-3770": 6700,
  "Intel Core i7-3770S": 6500,
  "Intel Core i7-3770T": 6200,
  "Intel Core i5-3570K": 6500,
  "Intel Core i5-3570": 6200,
  "Intel Core i5-3550": 6100,
  "Intel Core i5-3470": 6000,
  "Intel Core i5-3450": 5900,
  "Intel Core i5-3350P": 5800,
  "Intel Core i5-3330": 5700,
  "Intel Core i3-3240": 4600,
  "Intel Core i3-3225": 4500,
  "Intel Core i3-3220": 4400,

  // ======================== 2. GENERATION (Sandy Bridge) ========================
  "Intel Core i7-2700K": 6500,
  "Intel Core i7-2600K": 6300,
  "Intel Core i7-2600": 6000,
  "Intel Core i7-2600S": 5800,
  "Intel Core i5-2550K": 6000,
  "Intel Core i5-2500K": 5800,
  "Intel Core i5-2500": 5600,
  "Intel Core i5-2400": 5400,
  "Intel Core i5-2390T": 4800,
  "Intel Core i5-2320": 5300,
  "Intel Core i5-2300": 5200,
  "Intel Core i3-2130": 4200,
  "Intel Core i3-2125": 4100,
  "Intel Core i3-2120": 4000,
  "Intel Core i3-2105": 3900,
  "Intel Core i3-2100": 3800,

  // ======================== 1. GENERATION (Nehalem / Westmere / Clarkdale) ========================
  "Intel Core i7-990X": 5500, // Gulftown (6-core Extreme)
  "Intel Core i7-980X": 5300, // Gulftown
  "Intel Core i7-975": 4800, // Bloomfield Extreme
  "Intel Core i7-970": 4700, // Gulftown
  "Intel Core i7-965": 4600, // Bloomfield Extreme
  "Intel Core i7-960": 4400, // Bloomfield
  "Intel Core i7-950": 4300, // Bloomfield
  "Intel Core i7-940": 4200, // Bloomfield
  "Intel Core i7-930": 4150, // Bloomfield
  "Intel Core i7-920": 4100, // Bloomfield
  "Intel Core i7-880": 4300, // Lynnfield
  "Intel Core i7-870": 4200, // Lynnfield
  "Intel Core i7-860": 4100, // Lynnfield
  "Intel Core i7-870S": 4000, // Lynnfield
  "Intel Core i7-860S": 3900, // Lynnfield
  "Intel Core i5-680": 4500, // Clarkdale
  "Intel Core i5-670": 4400,
  "Intel Core i5-661": 4300,
  "Intel Core i5-660": 4200,
  "Intel Core i5-655K": 4100,
  "Intel Core i5-650": 4000,
  "Intel Core i5-760": 3900, // Lynnfield
  "Intel Core i5-750": 3800,
  "Intel Core i5-750S": 3700,
  "Intel Core i3-560": 3700, // Clarkdale
  "Intel Core i3-550": 3600,
  "Intel Core i3-540": 3500,
  "Intel Core i3-530": 3400,

  /// ======================== AMD RYZEN 9000 SERIES (2024-2025 / Zen 5) ========================
  "AMD Ryzen 9 9950X3D": 25800, // mit 3D V-Cache
  "AMD Ryzen 9 9950X": 24800,
  "AMD Ryzen 9 9900X3D": 24200,
  "AMD Ryzen 9 9900X": 23500,
  "AMD Ryzen 7 9850X3D": 24000,
  "AMD Ryzen 7 9800X3D": 23500,
  "AMD Ryzen 7 9700X3D": 22500,
  "AMD Ryzen 7 9700X": 21500,
  "AMD Ryzen 5 9600X3D": 20000,
  "AMD Ryzen 5 9600X": 19500,

  // ======================== AMD RYZEN 8000 SERIES (2024 / Zen 4 mit iGPU) ========================
  "AMD Ryzen 7 8700G": 19500,
  "AMD Ryzen 7 8700F": 19200,
  "AMD Ryzen 5 8600G": 18200,
  "AMD Ryzen 5 8500G": 17200,
  "AMD Ryzen 3 8300G": 12000,

  // ======================== AMD RYZEN 7000 SERIES (2022-2023 / Zen 4) ========================
  "AMD Ryzen 9 7950X3D": 23800,
  "AMD Ryzen 9 7950X": 22800,
  "AMD Ryzen 9 7900X3D": 22500,
  "AMD Ryzen 9 7900X": 21800,
  "AMD Ryzen 9 7900": 20800,
  "AMD Ryzen 7 7800X3D": 21500,
  "AMD Ryzen 7 7700X": 19800,
  "AMD Ryzen 7 7700": 19000,
  "AMD Ryzen 5 7600X3D": 18500,
  "AMD Ryzen 5 7600X": 17800,
  "AMD Ryzen 5 7600": 17200,
  "AMD Ryzen 5 7500F": 16800,

  // ======================== AMD RYZEN 5000 SERIES (2020-2022 / Zen 3) ========================
  "AMD Ryzen 9 5950X": 18500,
  "AMD Ryzen 9 5900XT": 18000,
  "AMD Ryzen 9 5900X": 17500,
  "AMD Ryzen 9 5900": 16800,
  "AMD Ryzen 7 5800X3D": 18200,
  "AMD Ryzen 7 5800XT": 17500,
  "AMD Ryzen 7 5800X": 16800,
  "AMD Ryzen 7 5800": 16200,
  "AMD Ryzen 7 5700X3D": 16500,
  "AMD Ryzen 7 5700X": 15800,
  "AMD Ryzen 7 5700G": 15200,
  "AMD Ryzen 7 5700": 14800,
  "AMD Ryzen 5 5600X3D": 15800,
  "AMD Ryzen 5 5600XT": 15500,
  "AMD Ryzen 5 5600X": 15000,
  "AMD Ryzen 5 5600G": 14500,
  "AMD Ryzen 5 5600": 14200,
  "AMD Ryzen 5 5500GT": 13500,
  "AMD Ryzen 5 5500": 13000,
  "AMD Ryzen 3 5300G": 10500,

  // ======================== AMD RYZEN 4000 SERIES (2020 / Zen 2 mit iGPU) ========================
  "AMD Ryzen 7 4700G": 13500,
  "AMD Ryzen 5 4600G": 11500,
  "AMD Ryzen 5 4500": 10800,
  "AMD Ryzen 3 4300G": 9000,
  "AMD Ryzen 3 4100": 8500,

  // ======================== AMD RYZEN 3000 SERIES (2019-2020 / Zen 2) ========================
  "AMD Ryzen 9 3950X": 16000,
  "AMD Ryzen 9 3900XT": 15500,
  "AMD Ryzen 9 3900X": 15000,
  "AMD Ryzen 7 3800XT": 12800,
  "AMD Ryzen 7 3800X": 12500,
  "AMD Ryzen 7 3700X": 12000,
  "AMD Ryzen 5 3600XT": 11800,
  "AMD Ryzen 5 3600X": 11500,
  "AMD Ryzen 5 3600": 11000,
  "AMD Ryzen 5 3500X": 10000,
  "AMD Ryzen 5 3500": 9800,
  "AMD Ryzen 3 3300X": 9200,
  "AMD Ryzen 3 3100": 8500,
  "AMD Ryzen 3 3200G": 7200, // Zen+ Architektur
  "AMD Ryzen 3 3200GE": 7000,

  // ======================== AMD RYZEN 2000 SERIES (2018 / Zen+) ========================
  "AMD Ryzen 7 2700X": 10000,
  "AMD Ryzen 7 2700": 9500,
  "AMD Ryzen 5 2600X": 9000,
  "AMD Ryzen 5 2600": 8500,
  "AMD Ryzen 5 2500X": 8200,
  "AMD Ryzen 5 2400G": 7800,
  "AMD Ryzen 3 2300X": 7000,
  "AMD Ryzen 3 2200G": 6200,

  // ======================== AMD RYZEN 1000 SERIES (2017 / Zen) ========================
  "AMD Ryzen 7 1800X": 8500,
  "AMD Ryzen 7 1700X": 8000,
  "AMD Ryzen 7 1700": 7500,
  "AMD Ryzen 5 1600X": 7500,
  "AMD Ryzen 5 1600": 7000,
  "AMD Ryzen 5 1500X": 6500,
  "AMD Ryzen 5 1400": 6000,
  "AMD Ryzen 5 1300X": 5800,
  "AMD Ryzen 5 1200": 5200,
  "AMD Ryzen 3 1200": 5200,
  "AMD Ryzen 3 1300X": 5800,

  // ======================== AMD THREADRIPPER (Workstation/Extreme) ========================
  "AMD TR 7995WX": 32000, // Zen 4 Threadripper
  "AMD TR 7985WX": 31000,
  "AMD TR 7975WX": 30000,
  "AMD TR 7965WX": 29000,
  "AMD TR 7980X": 28500, // Zen 4 Threadripper
  "AMD TR 7970X": 27500,
  "AMD TR 7960X": 26500,
  "AMD TR 5995WX": 26000, // Zen 3 Threadripper
  "AMD TR 5975WX": 25000,
  "AMD TR 5965WX": 24000,
  "AMD TR 3990X": 23000, // Zen 2 Threadripper
  "AMD TR 3970X": 22000,
  "AMD TR 3960X": 21000,
  "AMD TR 2990WX": 19000, // Zen+ Threadripper
  "AMD TR 2970WX": 18000,
  "AMD TR 2950X": 17000,
  "AMD TR 2920X": 16000,
  "AMD TR 1950X": 15000, // Zen Threadripper
  "AMD TR 1920X": 14000,
  "AMD TR 1900X": 13000,

  // ======================== AMD FX SERIES (Bulldozer/Piledriver 2011-2016) ========================
  "AMD FX-9590": 6500,
  "AMD FX-9370": 6200,
  "AMD FX-8370": 5800,
  "AMD FX-8350": 5600,
  "AMD FX-8320": 5400,
  "AMD FX-8300": 5200,
  "AMD FX-6350": 5000,
  "AMD FX-6300": 4800,
  "AMD FX-4350": 4600,
  "AMD FX-4300": 4400,
  "AMD FX-4130": 4200,
};

const analyzerGpuData = {
  // ======================== NVIDIA RTX 50 SERIES ========================
  "NVIDIA RTX 5090 (32GB)": 27200,
  "NVIDIA RTX 5080 (16GB)": 25800,
  "NVIDIA RTX 5070 Ti (16GB)": 24500,
  "NVIDIA RTX 5070 (12GB)": 22800,
  "NVIDIA RTX 5060 Ti (16GB)": 18800,
    "NVIDIA RTX 5060 Ti (8GB)": 18400,
  "NVIDIA RTX 5060 (8GB)": 16800,
  
  // ======================== NVIDIA RTX 40 SERIES ========================
  "NVIDIA RTX 4090 (24GB)": 26800,
  "NVIDIA RTX 4080 SUPER (16GB)": 25500,
  "NVIDIA RTX 4080 (16GB)": 24800,
  "NVIDIA RTX 4070 Ti SUPER (16GB)": 23800,
  "NVIDIA RTX 4070 Ti (12GB)": 22500,
  "NVIDIA RTX 4070 SUPER (12GB)": 21500,
  "NVIDIA RTX 4070 (12GB)": 20000,
  "NVIDIA RTX 4060 Ti (16GB)": 17000,
  "NVIDIA RTX 4060 Ti (8GB)": 16700,
  "NVIDIA RTX 4060 (8GB)": 15000,
  
  // ======================== NVIDIA RTX 30 SERIES ========================
  "NVIDIA RTX 3090 Ti (24GB)": 23200,
  "NVIDIA RTX 3090 (24GB)": 21800,
  "NVIDIA RTX 3080 Ti (12GB)": 21200,
  "NVIDIA RTX 3080 (12GB)": 20500,
  "NVIDIA RTX 3080 (10GB)": 19800,
  "NVIDIA RTX 3070 Ti (8GB)": 18200,
  "NVIDIA RTX 3070 (8GB)": 17000,
  "NVIDIA RTX 3060 Ti (8GB)": 15800,
  "NVIDIA RTX 3060 (12GB)": 14000,
  "NVIDIA RTX 3060 (8GB)": 13000,
  "NVIDIA RTX 3050 (8GB)": 10500,
  
  // ======================== NVIDIA RTX 20 SERIES ========================
  "NVIDIA RTX 2080 Ti (11GB)": 16500,
  "NVIDIA RTX 2080 SUPER (8GB)": 15000,
  "NVIDIA RTX 2080 (8GB)": 14200,
  "NVIDIA RTX 2070 SUPER (8GB)": 13500,
  "NVIDIA RTX 2070 (8GB)": 12500,
  "NVIDIA RTX 2060 SUPER (8GB)": 11500,
  "NVIDIA RTX 2060 (6GB)": 10500,
  
  // ======================== NVIDIA GTX 16 SERIES ========================
  "NVIDIA GTX 1660 SUPER (6GB)": 9000,
  "NVIDIA GTX 1660 Ti (6GB)": 8800,
  "NVIDIA GTX 1660 (6GB)": 8200,
  "NVIDIA GTX 1650 SUPER (4GB)": 7200,
  "NVIDIA GTX 1650 (4GB)": 6200,
  
  // ======================== NVIDIA GTX 10 SERIES ========================
  "NVIDIA GTX 1080 Ti (11GB)": 12500,
  "NVIDIA GTX 1080 (8GB)": 11000,
  "NVIDIA GTX 1070 Ti (8GB)": 10000,
  "NVIDIA GTX 1070 (8GB)": 9200,
  "NVIDIA GTX 1060 (6GB)": 8000,
  "NVIDIA GTX 1050 Ti (4GB)": 6500,
  "NVIDIA GTX 1050 (2GB/3GB)": 5500,
  
  // ======================== NVIDIA GTX 9 SERIES ========================
  "NVIDIA GTX 980 Ti (6GB)": 9000,
  "NVIDIA GTX 980 (4GB)": 7500,
  "NVIDIA GTX 970 (4GB)": 6500,
  "NVIDIA GTX 960 (4GB/2GB)": 5200,
  "NVIDIA GTX 950 (2GB)": 4500,
  
  // ======================== AMD RADEON RX 9000 SERIES ========================
  "AMD RX 9090 XT (32GB)": 26500,
  "AMD RX 9080 XT (24GB)": 25200,
  "AMD RX 9070 XT (16GB)": 23800,
  "AMD RX 9070 (16GB)": 22200,
  "AMD RX 9060 XT (16GB)": 18500,
  "AMD RX 9060 XT (8GB)": 18000,
  
  // ======================== AMD RADEON RX 7000 SERIES ========================
  "AMD RX 7900 XTX (24GB)": 24800,
  "AMD RX 7900 XT (20GB)": 23500,
  "AMD RX 7900 GRE (16GB)": 21800,
  "AMD RX 7800 XT (16GB)": 20500,
  "AMD RX 7700 XT (12GB)": 18500,
  "AMD RX 7600 XT (16GB)": 16500,
  "AMD RX 7600 (8GB)": 14800,
  
  // ======================== AMD RADEON RX 6000 SERIES ========================
  "AMD RX 6950 XT (16GB)": 21800,
  "AMD RX 6900 XT (16GB)": 21000,
  "AMD RX 6800 XT (16GB)": 20000,
  "AMD RX 6800 (16GB)": 18200,
  "AMD RX 6750 XT (12GB)": 17200,
  "AMD RX 6700 XT (12GB)": 16200,
  "AMD RX 6700 (10GB)": 15000,
  "AMD RX 6650 XT (8GB)": 14500,
  "AMD RX 6600 XT (8GB)": 13800,
  "AMD RX 6600 (8GB)": 12800,
  "AMD RX 6500 XT (4GB)": 8800,
  "AMD RX 6400 (4GB)": 7800,
  
  // ======================== AMD RADEON RX 5000 SERIES ========================
  "AMD RX 5700 XT (8GB)": 11800,
  "AMD RX 5700 (8GB)": 10800,
  "AMD RX 5600 XT (6GB)": 9500,
  "AMD RX 5500 XT (8GB)": 8200,
  "AMD RX 5500 XT (4GB)": 8000,
  
  // ======================== AMD RADEON VEGA / RX 500 ========================
  "AMD RX Vega 64 (8GB HBM2)": 10500,
  "AMD RX Vega 56 (8GB HBM2)": 9500,
  "AMD RX 590 (8GB)": 8000,
  "AMD RX 580 (8GB)": 7500,
  "AMD RX 570 (8GB)": 6800,
  "AMD RX 480 (8GB)": 7000,
  
  // ======================== INTEL ARC SERIES ========================
  "Intel Arc B580 (12GB)": 16500,
  "Intel Arc B570 (10GB)": 14800,
  "Intel Arc A770 (16GB)": 15500,
  "Intel Arc A750 (8GB)": 14000,
  "Intel Arc A580 (8GB)": 12500,
  "Intel Arc A380 (6GB)": 8500,
  "Intel Arc A310 (4GB)": 7000,
  
  // ======================== INTEL INTEGRATED GRAPHICS ========================
  "Intel UHD Graphics 770": 3500,
  "Intel UHD Graphics 750": 3200,
  "Intel UHD Graphics 730": 2800,
  "Intel UHD Graphics 630": 2500,
  "Intel Iris Xe Graphics": 3000,
  "Intel HD Graphics 630": 2200,
  "Intel HD Graphics 530": 1800,
};

// ======================== GPU GRUPPIERUNG ========================
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
  "Intel Integrated Graphics": [],
};

// ======================== CONFIG COMMANDS ========================
const allCommandsLibrary = {
  "Performance Kern": [
    {
      cmd: "fps_max",
      values: ["0", "60", "120", "144", "240", "300", "400", "500", "1000"],
      desc: "Begrenzt die maximale Bildrate.",
    },
    {
      cmd: "fps_max_menu",
      values: ["30", "60", "120", "144"],
      desc: "Begrenzt die Bildrate im Menü.",
    },
    {
      cmd: "engine_low_latency_sleep",
      values: ["0", "1"],
      desc: "Reduziert die Input-Latenz.",
    },
    {
      cmd: "r_queued_ropes",
      values: ["0", "1"],
      desc: "Optimiert die Darstellung von Seilen.",
    },
    {
      cmd: "cl_forcepreload",
      values: ["0", "1"],
      desc: "Lädt alle Ressourcen vor.",
    },
  ],
  "Shader & Effekte": [
    {
      cmd: "r_csm",
      values: ["0", "1", "2"],
      desc: "Kaskadierte Schattenkarten.",
    },
    {
      cmd: "r_csm_cascade_res",
      values: ["256", "512", "1024", "2048"],
      desc: "Auflösung der Schattenkarten.",
    },
    { cmd: "r_dynamic", values: ["0", "1"], desc: "Dynamische Schatten." },
    {
      cmd: "r_rim_light",
      values: ["0", "1"],
      desc: "Randlichter an Modellen.",
    },
    {
      cmd: "mat_disable_bloom",
      values: ["0", "1"],
      desc: "Bloom-Effekt deaktivieren.",
    },
    { cmd: "r_3dsky", values: ["0", "1"], desc: "3D-Himmel auf Maps." },
    {
      cmd: "cl_detaildist",
      values: ["400", "800", "1200", "2000"],
      desc: "Reichweite für Detail-Texturen.",
    },
  ],
  "Speicher Optimierung": [
    {
      cmd: "cl_forcepreload",
      values: ["0", "1"],
      desc: "Ressourcen vorladen.",
    },
    {
      cmd: "cl_physics_impact_enable",
      values: ["0", "1"],
      desc: "Physik-Effekte.",
    },
    {
      cmd: "cl_ragdoll_physics_enable",
      values: ["0", "1"],
      desc: "Leichen-Physik.",
    },
    {
      cmd: "r_waterforceexpensive",
      values: ["0", "1"],
      desc: "Wassereffekte.",
    },
  ],
  "GPU & Rendering": [
    {
      cmd: "mat_queue_mode",
      values: ["-1", "0", "1", "2"],
      desc: "Multithreading für Rendering.",
    },
    {
      cmd: "mat_vsync",
      values: ["0", "1"],
      desc: "Vertikale Synchronisation.",
    },
    {
      cmd: "gpu_level",
      values: ["0", "1", "2", "3"],
      desc: "GPU-Render-Qualität.",
    },
    { cmd: "mat_picmip", values: ["0", "1", "2"], desc: "Texturqualität." },
    {
      cmd: "r_lod",
      values: ["-1", "0", "1", "2"],
      desc: "Modell-Detailstufe.",
    },
    {
      cmd: "mat_aaquality",
      values: ["0", "1", "2"],
      desc: "Anti-Aliasing-Qualität.",
    },
  ],
  "CPU & Threading": [
    {
      cmd: "host_thread_mode",
      values: ["0", "1", "2"],
      desc: "Multi-Core-Rendering.",
    },
    {
      cmd: "threadpool_worker_count",
      values: ["2", "4", "6", "8", "12", "16"],
      desc: "Anzahl der CPU-Threads.",
    },
    {
      cmd: "sv_parallel_packentities",
      values: ["0", "1"],
      desc: "Parallele Entity-Verarbeitung.",
    },
  ],
  Lautstärke: [
    {
      cmd: "volume",
      values: [
        "0",
        "0.1",
        "0.2",
        "0.3",
        "0.4",
        "0.5",
        "0.6",
        "0.7",
        "0.8",
        "0.9",
        "1.0",
      ],
      desc: "Master-Lautstärke.",
    },
    {
      cmd: "voice_scale",
      values: ["0", "0.2", "0.4", "0.6", "0.8", "1.0"],
      desc: "Voice-Chat Lautstärke.",
    },
    {
      cmd: "snd_mixahead",
      values: ["0.02", "0.05", "0.1", "0.2"],
      desc: "Audio-Puffer.",
    },
    {
      cmd: "snd_headphone_pan_exponent",
      values: ["1", "1.5", "2"],
      desc: "Kopfhörer Panorama.",
    },
  ],
  "Mikrofon & Voice": [
    { cmd: "voice_enable", values: ["0", "1"], desc: "Voice-Chat aktivieren." },
    {
      cmd: "voice_threshold",
      values: ["0", "0.1", "0.2", "0.5", "1.0"],
      desc: "Mikrofon-Empfindlichkeit.",
    },
    { cmd: "voice_loopback", values: ["0", "1"], desc: "Eigene Stimme hören." },
    {
      cmd: "voice_mixer_volume",
      values: ["0", "0.25", "0.5", "0.75", "1.0"],
      desc: "Mikrofon-Lautstärke.",
    },
  ],
  "Sound Qualität": [
    {
      cmd: "snd_musicvolume",
      values: ["0", "0.2", "0.4", "0.6", "0.8", "1.0"],
      desc: "Musik-Lautstärke.",
    },
    {
      cmd: "snd_menumusic_volume",
      values: ["0", "0.2", "0.5", "1.0"],
      desc: "Menü-Musik.",
    },
    {
      cmd: "snd_roundend_volume",
      values: ["0", "0.2", "0.5", "1.0"],
      desc: "Lautstärke am Rundenende.",
    },
  ],
  Interpolation: [
    {
      cmd: "cl_interp_ratio",
      values: ["1", "2"],
      desc: "Interpolationsverhältnis.",
    },
    {
      cmd: "cl_interp",
      values: ["0", "0.015625", "0.03125"],
      desc: "Interpolationszeit.",
    },
  ],
  "Bandbreite & Rate": [
    {
      cmd: "rate",
      values: ["196608", "393216", "524288", "786432", "1048576"],
      desc: "Maximale Bandbreite.",
    },
    {
      cmd: "cl_updaterate",
      values: ["64", "128"],
      desc: "Updates pro Sekunde.",
    },
    { cmd: "cl_cmdrate", values: ["64", "128"], desc: "Befehle pro Sekunde." },
  ],
  "Latency & Timeout": [
    {
      cmd: "cl_timeout",
      values: ["30", "60", "120", "300"],
      desc: "Timeout in Sekunden.",
    },
    {
      cmd: "net_maxcleartime",
      values: ["0", "1", "2"],
      desc: "Netzwerk-Clear-Time.",
    },
  ],
  "Connection Optimierung": [
    { cmd: "cl_predict", values: ["0", "1"], desc: "Bewegungsvorhersage." },
    {
      cmd: "cl_predictweapons",
      values: ["0", "1"],
      desc: "Waffen-Vorhersage.",
    },
  ],
  "Auflösung & Display": [
    {
      cmd: "mat_setvideomode",
      values: [
        "1280 720 1",
        "1366 768 1",
        "1600 900 1",
        "1920 1080 1",
        "2560 1440 1",
      ],
      desc: "16:9 Auflösung.",
    },
    {
      cmd: "mat_setvideomode_ex",
      values: ["1280 1024 1", "1024 768 1", "800 600 1"],
      desc: "4:3 Auflösung.",
    },
    {
      cmd: "mat_monitorgamma",
      values: ["1.6", "1.8", "2.0", "2.2", "2.4"],
      desc: "Gamma-Wert.",
    },
  ],
  "Texturen & Details": [
    { cmd: "mat_picmip", values: ["0", "1", "2"], desc: "Texturqualität." },
    { cmd: "r_lod", values: ["-1", "0", "1", "2"], desc: "Modell-Detail." },
    {
      cmd: "cl_detaildist",
      values: ["400", "800", "1200", "2000"],
      desc: "Detail-Reichweite.",
    },
  ],
  "Beleuchtung & Schatten": [
    { cmd: "r_csm", values: ["0", "1", "2"], desc: "Schattenqualität." },
    {
      cmd: "r_shadow_quality",
      values: ["0", "1", "2"],
      desc: "Zusätzliche Schattenqualität.",
    },
    {
      cmd: "mat_ambient_light_r",
      values: ["0.1", "0.2", "0.3", "0.4"],
      desc: "Ambiente Beleuchtung Rot.",
    },
    {
      cmd: "mat_ambient_light_g",
      values: ["0.1", "0.2", "0.3", "0.4"],
      desc: "Ambiente Beleuchtung Grün.",
    },
    {
      cmd: "mat_ambient_light_b",
      values: ["0.1", "0.2", "0.3", "0.4"],
      desc: "Ambiente Beleuchtung Blau.",
    },
  ],
  "Anti-Aliasing": [
    {
      cmd: "mat_msaa",
      values: ["0", "2", "4", "8"],
      desc: "Multisample Anti-Aliasing.",
    },
    {
      cmd: "mat_aaquality",
      values: ["0", "1", "2"],
      desc: "Anti-Aliasing-Qualität.",
    },
    {
      cmd: "mat_software_aa_strength",
      values: ["0", "0.5", "1.0"],
      desc: "Post-Processing AA.",
    },
  ],
  "Post-Processing": [
    {
      cmd: "mat_disable_fancy_blending",
      values: ["0", "1"],
      desc: "Deaktiviert aufwendige Effekte.",
    },
    {
      cmd: "r_ambientboost",
      values: ["0", "1"],
      desc: "Verstärkt Ambiente Beleuchtung.",
    },
    {
      cmd: "mat_disable_bloom",
      values: ["0", "1"],
      desc: "Bloom deaktivieren.",
    },
  ],
};

// ======================== PRESETS ========================
const presetsList = [
  {
    key: "cinematic",
    name: "🎬 Cinematic Ultra",
    desc: "Maximale visuelle Qualität",
    badge: "RTX 4080+",
    commands: [
      "mat_setvideomode 2560 1440 1",
      "mat_vsync 1",
      "r_dynamic 1",
      "r_csm 2",
      "mat_msaa 8",
      "mat_picmip 0",
      "r_lod -1",
      "cl_detaildist 2000",
      "mat_aaquality 2",
      "r_shadow_quality 2",
      "r_3dsky 1",
      "r_rim_light 1",
      "mat_disable_fancy_blending 0",
    ],
  },
  {
    key: "highfps",
    name: "⚡ HIGH FPS",
    desc: "Competitive Performance",
    badge: "240Hz+",
    commands: [
      "mat_setvideomode 1280 960 1",
      "mat_vsync 0",
      "r_dynamic 0",
      "r_csm 0",
      "mat_msaa 2",
      "mat_picmip 2",
      "r_lod 2",
      "cl_detaildist 400",
      "mat_aaquality 0",
      "r_shadow_quality 0",
      "r_3dsky 0",
      "r_rim_light 0",
      "mat_disable_fancy_blending 1",
      "cl_forcepreload 1",
    ],
  },
  {
    key: "lowend",
    name: "🔧 LOW-END",
    desc: "Maximale FPS",
    badge: "Toaster",
    commands: [
      "mat_setvideomode 1024 768 1",
      "mat_vsync 0",
      "r_dynamic 0",
      "r_csm 0",
      "mat_msaa 0",
      "mat_picmip 2",
      "r_lod 2",
      "cl_detaildist 400",
      "mat_aaquality 0",
      "r_shadow_quality 0",
      "r_3dsky 0",
      "r_rim_light 0",
      "mat_disable_fancy_blending 1",
      "cl_forcepreload 1",
      "mat_disable_bloom 1",
      "cl_physics_impact_enable 0",
      "cl_ragdoll_physics_enable 0",
    ],
  },
  {
    key: "balanced",
    name: "⚖️ Balanced",
    desc: "Gute Grafik & FPS",
    badge: "Allrounder",
    commands: [
      "mat_setvideomode 1920 1080 1",
      "mat_vsync 0",
      "r_dynamic 1",
      "r_csm 1",
      "mat_msaa 4",
      "mat_picmip 1",
      "r_lod 0",
      "cl_detaildist 1200",
      "mat_aaquality 1",
      "r_shadow_quality 1",
      "r_3dsky 1",
      "r_rim_light 0",
      "mat_disable_fancy_blending 0",
    ],
  },
];

// ======================== SKRIPT-TEMPLATES ========================
const scriptTemplatesList = [
  {
    name: "🦘 Jumpthrow",
    key: "jumpthrow",
    desc: "Springt und wirft gleichzeitig eine Granate.",
    content:
      'alias +jumpthrow "+jump"\nalias -jumpthrow "-jump; -attack"\nbind "KEY" "+jumpthrow"',
  },
  {
    name: "📊 NetGraph Toggle",
    key: "netgraph",
    desc: "Zeigt FPS und Ping an.",
    content:
      'alias +netg "cl_showfps 2;+showscores"\nalias -netg "cl_showfps 0;-showscores"\nbind "KEY" "+netg"',
  },
  {
    name: "💣 Quick Nade",
    key: "quicknade",
    desc: "Sofort zur nächsten Granate wechseln.",
    content:
      'alias nextnade "use weapon_hegrenade; use weapon_flashbang; use weapon_smokegrenade; use weapon_molotov"\nbind "KEY" "nextnade"',
  },
  {
    name: "🌈 Rainbow-HUD",
    key: "rainbowhud",
    desc: "Farbiges HUD bei Bewegung.",
    content:
      'alias hudToggle "hud_on"\nalias "hud_off" "\n    bind w +forward;\n    bind s +back;\n    bind a +left;\n    bind d +right;\n    bind space +jump;\n    bind ctrl +duck;\n    bind shift +speed;\n    cl_hud_color 0;\n    echo \"🌈 HUD-Farben AUS\";\n    alias hudToggle hud_on\n"\nalias "hud_on" "\n    bind w +_forward;\n    bind s +_back;\n    bind a +_left;\n    bind d +_right;\n    bind space +_jump;\n    bind ctrl +_duck;\n    bind shift +_walk;\n    echo \"🌈 HUD-Farben AN\";\n    alias hudToggle hud_off\n"\nalias "+_forward" "+forward; cl_hud_color 7"\nalias "-_forward" "-forward; cl_hud_color 0"\nalias "+_back" "+back; cl_hud_color 3"\nalias "-_back" "-back; cl_hud_color 0"\nalias "+_left" "+left; cl_hud_color 8"\nalias "-_left" "-left; cl_hud_color 0"\nalias "+_right" "+right; cl_hud_color 10"\nalias "-_right" "-right; cl_hud_color 0"\nalias "+_jump" "+jump; cl_hud_color 6"\nalias "-_jump" "-jump; cl_hud_color 0"\nalias "+_duck" "+duck; cl_hud_color 5"\nalias "-_duck" "-duck; cl_hud_color 0"\nalias "+_walk" "+speed; cl_hud_color 9"\nalias "-_walk" "-speed; cl_hud_color 0"\nbind "KEY" "hudToggle"\nhud_on',
  },
  {
    name: "💣 Quick Bomb Drop",
    key: "bombdrop",
    desc: "Bombe sofort fallen lassen.",
    content:
      'alias "+bombdrop" "use weapon_c4; drop"\nalias "-bombdrop" "slot10"\nbind "KEY" "+bombdrop"',
  },
];

// ======================== WAFFENKATEGORIEN ========================
const categories = {
  Pistole: [
    "Glock-18",
    "USP-S",
    "P250",
    "Five-SeveN",
    "Tec-9",
    "Desert Eagle",
    "Dual Berettas",
    "CZ75-Auto",
  ].map((n) => ({
    name: n,
    cmd: `buy ${n.toLowerCase().replace(/ /g, "").replace(/-/g, "")}`,
    maxCount: 1,
  })),
  "MP / SMG": [
    "MP9",
    "MAC-10",
    "MP7",
    "MP5-SD",
    "UMP-45",
    "P90",
    "PP-Bizon",
  ].map((n) => ({
    name: n,
    cmd: `buy ${n.toLowerCase().replace(/ /g, "").replace(/-/g, "")}`,
    maxCount: 1,
  })),
  Rifle: ["AK-47", "M4A4", "M4A1-S", "FAMAS", "Galil AR", "SG 553", "AUG"].map(
    (n) => ({
      name: n,
      cmd: `buy ${n.toLowerCase().replace(/ /g, "").replace(/-/g, "")}`,
      maxCount: 1,
    }),
  ),
  Sniper: ["AWP", "SSG 08", "SCAR-20", "G3SG1"].map((n) => ({
    name: n,
    cmd: `buy ${n.toLowerCase().replace(/ /g, "").replace("-", "")}`,
    maxCount: 1,
  })),
  Pumpgun: ["Nova", "XM1014", "MAG-7", "Sawed-Off"].map((n) => ({
    name: n,
    cmd: `buy ${n.toLowerCase().replace(/ /g, "").replace(/-/g, "")}`,
    maxCount: 1,
  })),
  "Schwere Waffen": ["M249", "Negev"].map((n) => ({
    name: n,
    cmd: `buy ${n.toLowerCase()}`,
    maxCount: 1,
  })),
  Rüstung: [
    { name: "Kevlar+Helm", cmd: "buy vesthelm", maxCount: 1 },
    { name: "Kevlar", cmd: "buy vest", maxCount: 1 },
    { name: "Defuser", cmd: "buy defuser", maxCount: 1 },
    { name: "🔫 Taser", cmd: "buy taser", maxCount: 1 },
  ],
  Granaten: [
    { name: "HE Grenade", cmd: "buy hegrenade", maxCount: 1 },
    { name: "Flashbang", cmd: "buy flashbang", maxCount: 2 },
    { name: "Smoke", cmd: "buy smokegrenade", maxCount: 1 },
    { name: "Molotov", cmd: "buy molotov", maxCount: 1 },
    { name: "Incendiary", cmd: "buy incgrenade", maxCount: 1 },
    { name: "Decoy", cmd: "buy decoy", maxCount: 1 },
  ],
};

// ======================== START OPTIONEN ========================
let startOptionsList = [
  { cmd: "-console", desc: "Konsole", hasValue: false, selected: true },
  { cmd: "-high", desc: "Hohe Priorität", hasValue: false, selected: false },
  { cmd: "-nojoy", desc: "Joystick aus", hasValue: false, selected: false },
  { cmd: "-fullscreen", desc: "Vollbild", hasValue: false, selected: false },
  { cmd: "-vulkan", desc: "Vulkan API", hasValue: false, selected: false },
  {
    cmd: "-softparticlesdefaultoff",
    desc: "Partikel aus",
    hasValue: false,
    selected: false,
  },
  {
    cmd: "-refresh",
    desc: "Hz",
    hasValue: true,
    value: "144",
    selected: false,
    values: ["60", "120", "144", "165", "240", "360"],
  },
  {
    cmd: "-threads",
    desc: "Threads",
    hasValue: true,
    value: "8",
    selected: false,
    values: ["4", "6", "8", "12", "16"],
  },
];

// ======================== TASTATUR LAYOUT ========================
const deKeysRows = [
  [
    "ESC",
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
  ],
  [
    "^",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "ß",
    "´",
    "BACKSPACE",
  ],
  ["TAB", "Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü", "+", "#"],
  ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä", "ENTER"],
  ["LSHIFT", "<", "Y", "X", "C", "V", "B", "N", "M", ",", ".", "-", "RSHIFT"],
  ["LCTRL", "LALT", "SPACE", "RALT", "RCTRL", "LEFT", "DOWN", "UP", "RIGHT"],
];

const usKeysRows = [
  [
    "ESC",
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
  ],
  [
    "~",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "BACKSPACE",
  ],
  ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "ENTER"],
  ["LSHIFT", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "RSHIFT"],
  ["LCTRL", "LALT", "SPACE", "RALT", "RCTRL", "LEFT", "DOWN", "UP", "RIGHT"],
];

const numpadKeys = [
  "KP_7",
  "KP_8",
  "KP_9",
  "KP_4",
  "KP_5",
  "KP_6",
  "KP_1",
  "KP_2",
  "KP_3",
  "KP_0",
  "KP_DEL",
  "KP_PLUS",
];

// ======================== CONFIG KATEGORIEN ========================
const configCategories = {
  "🎯 Performance & FPS": {
    subcats: [
      "Performance Kern",
      "Shader & Effekte",
      "Speicher Optimierung",
      "GPU & Rendering",
      "CPU & Threading",
    ],
    commands: {},
  },
  "🔊 Audio & Voice": {
    subcats: ["Lautstärke", "Mikrofon & Voice", "Sound Qualität"],
    commands: {},
  },
  "🌐 Netzwerk & Multiplayer": {
    subcats: [
      "Interpolation",
      "Bandbreite & Rate",
      "Latency & Timeout",
      "Connection Optimierung",
    ],
    commands: {},
  },
  "🎨 Video & Grafik": {
    subcats: [
      "Auflösung & Display",
      "Texturen & Details",
      "Beleuchtung & Schatten",
      "Anti-Aliasing",
      "Post-Processing",
    ],
    commands: {},
  },
};
