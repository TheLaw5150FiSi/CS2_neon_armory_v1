// ======================== WAFFENÜBERSICHT DATENBANK ========================

const weaponsDatabase = [
  // ======================== PISTOLEN ========================
  { id: "glock", name: "Glock-18", type: "Pistole", side: "t", price: 200, magazine: 20, total: 80, fireRate: 300, reloadTime: 2.2, 
    damageHead: 126, damageBody: 30, damageArm: 28, damageLeg: 28, armorPen: 47,
    damageHeadArmor: 59, damageBodyArmor: 14, damageArmArmor: 13, damageLegArmor: 28,
    moveSpeed: 240, runShoot: 135, firstShotAcc: 85, recoilControl: 70, penetration: 50, muzzleVel: 1300, image: "glock.webp" },
  { id: "usp", name: "USP-S", type: "Pistole", side: "ct", price: 200, magazine: 12, total: 36, fireRate: 352, reloadTime: 2.2,
    damageHead: 140, damageBody: 35, damageArm: 33, damageLeg: 33, armorPen: 50,
    damageHeadArmor: 70, damageBodyArmor: 17, damageArmArmor: 16, damageLegArmor: 33,
    moveSpeed: 240, runShoot: 140, firstShotAcc: 92, recoilControl: 75, penetration: 65, muzzleVel: 1350, image: "usp.webp" },
  { id: "p2000", name: "P2000", type: "Pistole", side: "ct", price: 200, magazine: 13, total: 65, fireRate: 352, reloadTime: 2.2,
    damageHead: 131, damageBody: 32, damageArm: 30, damageLeg: 30, armorPen: 48,
    damageHeadArmor: 63, damageBodyArmor: 15, damageArmArmor: 14, damageLegArmor: 30,
    moveSpeed: 240, runShoot: 138, firstShotAcc: 88, recoilControl: 72, penetration: 60, muzzleVel: 1320, image: "p2000.webp" },
  { id: "p250", name: "P250", type: "Pistole", side: "both", price: 300, magazine: 13, total: 52, fireRate: 352, reloadTime: 2.2,
    damageHead: 143, damageBody: 35, damageArm: 33, damageLeg: 33, armorPen: 65,
    damageHeadArmor: 93, damageBodyArmor: 22, damageArmArmor: 21, damageLegArmor: 33,
    moveSpeed: 240, runShoot: 135, firstShotAcc: 85, recoilControl: 68, penetration: 75, muzzleVel: 1280, image: "p250.webp" },
  { id: "fiveseven", name: "Five-SeveN", type: "Pistole", side: "ct", price: 500, magazine: 20, total: 60, fireRate: 352, reloadTime: 2.2,
    damageHead: 131, damageBody: 32, damageArm: 30, damageLeg: 30, armorPen: 78,
    damageHeadArmor: 102, damageBodyArmor: 25, damageArmArmor: 23, damageLegArmor: 30,
    moveSpeed: 240, runShoot: 130, firstShotAcc: 82, recoilControl: 65, penetration: 85, muzzleVel: 1250, image: "five_seven.webp" },
  { id: "tec9", name: "Tec-9", type: "Pistole", side: "t", price: 500, magazine: 18, total: 72, fireRate: 500, reloadTime: 2.5,
    damageHead: 131, damageBody: 32, damageArm: 30, damageLeg: 30, armorPen: 75,
    damageHeadArmor: 98, damageBodyArmor: 24, damageArmArmor: 22, damageLegArmor: 30,
    moveSpeed: 240, runShoot: 145, firstShotAcc: 78, recoilControl: 60, penetration: 80, muzzleVel: 1220, image: "tec9.webp" },
  { id: "deagle", name: "Desert Eagle", type: "Pistole", side: "both", price: 700, magazine: 7, total: 28, fireRate: 300, reloadTime: 2.2,
    damageHead: 250, damageBody: 63, damageArm: 53, damageLeg: 53, armorPen: 95,
    damageHeadArmor: 237, damageBodyArmor: 60, damageArmArmor: 50, damageLegArmor: 53,
    moveSpeed: 230, runShoot: 100, firstShotAcc: 95, recoilControl: 55, penetration: 100, muzzleVel: 1450, image: "deagle.webp" },
  { id: "dualies", name: "Dual Berettas", type: "Pistole", side: "both", price: 400, magazine: 30, total: 90, fireRate: 500, reloadTime: 3.2,
    damageHead: 126, damageBody: 30, damageArm: 28, damageLeg: 28, armorPen: 60,
    damageHeadArmor: 75, damageBodyArmor: 18, damageArmArmor: 17, damageLegArmor: 28,
    moveSpeed: 240, runShoot: 140, firstShotAcc: 75, recoilControl: 58, penetration: 65, muzzleVel: 1180, image: "dual_beretta.webp" },
  { id: "cz75", name: "CZ75-Auto", type: "Pistole", side: "both", price: 500, magazine: 12, total: 36, fireRate: 600, reloadTime: 2.2,
    damageHead: 140, damageBody: 35, damageArm: 33, damageLeg: 33, armorPen: 70,
    damageHeadArmor: 98, damageBodyArmor: 24, damageArmArmor: 23, damageLegArmor: 33,
    moveSpeed: 240, runShoot: 130, firstShotAcc: 80, recoilControl: 62, penetration: 75, muzzleVel: 1200, image: "cz.webp" },
  { id: "r8", name: "R8 Revolver", type: "Pistole", side: "both", price: 600, magazine: 8, total: 24, fireRate: 150, reloadTime: 3.5,
    damageHead: 250, damageBody: 63, damageArm: 53, damageLeg: 53, armorPen: 95,
    damageHeadArmor: 237, damageBodyArmor: 60, damageArmArmor: 50, damageLegArmor: 53,
    moveSpeed: 220, runShoot: 90, firstShotAcc: 98, recoilControl: 50, penetration: 95, muzzleVel: 1400, image: "revolver.webp" },

  // ======================== SMGs ========================
  { id: "mp9", name: "MP9", type: "SMG", side: "ct", price: 1250, magazine: 30, total: 90, fireRate: 857, reloadTime: 2.2,
    damageHead: 105, damageBody: 26, damageArm: 24, damageLeg: 24, armorPen: 60,
    damageHeadArmor: 63, damageBodyArmor: 15, damageArmArmor: 14, damageLegArmor: 24,
    moveSpeed: 240, runShoot: 170, firstShotAcc: 65, recoilControl: 72, penetration: 55, muzzleVel: 1250, image: "mp9.webp" },
  { id: "mac10", name: "MAC-10", type: "SMG", side: "t", price: 1050, magazine: 30, total: 120, fireRate: 800, reloadTime: 2.5,
    damageHead: 105, damageBody: 26, damageArm: 24, damageLeg: 24, armorPen: 60,
    damageHeadArmor: 63, damageBodyArmor: 15, damageArmArmor: 14, damageLegArmor: 24,
    moveSpeed: 240, runShoot: 180, firstShotAcc: 62, recoilControl: 68, penetration: 50, muzzleVel: 1220, image: "mac10.webp" },
  { id: "mp7", name: "MP7", type: "SMG", side: "both", price: 1500, magazine: 30, total: 120, fireRate: 750, reloadTime: 2.8,
    damageHead: 119, damageBody: 29, damageArm: 27, damageLeg: 27, armorPen: 62,
    damageHeadArmor: 74, damageBodyArmor: 18, damageArmArmor: 17, damageLegArmor: 27,
    moveSpeed: 230, runShoot: 160, firstShotAcc: 70, recoilControl: 75, penetration: 60, muzzleVel: 1280, image: "mp7.webp" },
  { id: "mp5sd", name: "MP5-SD", type: "SMG", side: "both", price: 1500, magazine: 30, total: 120, fireRate: 750, reloadTime: 2.8,
    damageHead: 119, damageBody: 29, damageArm: 27, damageLeg: 27, armorPen: 62,
    damageHeadArmor: 74, damageBodyArmor: 18, damageArmArmor: 17, damageLegArmor: 27,
    moveSpeed: 235, runShoot: 165, firstShotAcc: 72, recoilControl: 78, penetration: 58, muzzleVel: 1260, image: "mp5.webp" },
  { id: "ump45", name: "UMP-45", type: "SMG", side: "both", price: 1200, magazine: 25, total: 100, fireRate: 666, reloadTime: 3.5,
    damageHead: 119, damageBody: 29, damageArm: 27, damageLeg: 27, armorPen: 70,
    damageHeadArmor: 83, damageBodyArmor: 20, damageArmArmor: 19, damageLegArmor: 27,
    moveSpeed: 230, runShoot: 155, firstShotAcc: 68, recoilControl: 70, penetration: 65, muzzleVel: 1240, image: "ump.webp" },
  { id: "p90", name: "P90", type: "SMG", side: "both", price: 2350, magazine: 50, total: 200, fireRate: 857, reloadTime: 3.2,
    damageHead: 98, damageBody: 24, damageArm: 22, damageLeg: 22, armorPen: 60,
    damageHeadArmor: 59, damageBodyArmor: 14, damageArmArmor: 13, damageLegArmor: 22,
    moveSpeed: 230, runShoot: 170, firstShotAcc: 60, recoilControl: 65, penetration: 52, muzzleVel: 1200, image: "p90.webp" },
  { id: "bizon", name: "PP-Bizon", type: "SMG", side: "both", price: 1400, magazine: 64, total: 192, fireRate: 750, reloadTime: 2.8,
    damageHead: 105, damageBody: 26, damageArm: 24, damageLeg: 24, armorPen: 60,
    damageHeadArmor: 63, damageBodyArmor: 15, damageArmArmor: 14, damageLegArmor: 24,
    moveSpeed: 240, runShoot: 175, firstShotAcc: 64, recoilControl: 66, penetration: 50, muzzleVel: 1180, image: "bizon.webp" },

  // ======================== RIFLES ========================
  { id: "ak47", name: "AK-47", type: "Rifle", side: "t", price: 2700, magazine: 30, total: 120, fireRate: 600, reloadTime: 2.5,
    damageHead: 250, damageBody: 36, damageArm: 30, damageLeg: 30, armorPen: 77,
    damageHeadArmor: 192, damageBodyArmor: 27, damageArmArmor: 23, damageLegArmor: 30,
    moveSpeed: 215, runShoot: 95, firstShotAcc: 82, recoilControl: 58, penetration: 80, muzzleVel: 1400, image: "ak47.webp" },
  { id: "m4a4", name: "M4A4", type: "Rifle", side: "ct", price: 3100, magazine: 30, total: 150, fireRate: 666, reloadTime: 3.1,
    damageHead: 140, damageBody: 33, damageArm: 28, damageLeg: 28, armorPen: 70,
    damageHeadArmor: 98, damageBodyArmor: 23, damageArmArmor: 19, damageLegArmor: 28,
    moveSpeed: 225, runShoot: 98, firstShotAcc: 85, recoilControl: 65, penetration: 75, muzzleVel: 1380, image: "m4a4.webp" },
  { id: "m4a1s", name: "M4A1-S", type: "Rifle", side: "ct", price: 3100, magazine: 25, total: 85, fireRate: 600, reloadTime: 3.1,
    damageHead: 140, damageBody: 33, damageArm: 28, damageLeg: 28, armorPen: 70,
    damageHeadArmor: 98, damageBodyArmor: 23, damageArmArmor: 19, damageLegArmor: 28,
    moveSpeed: 225, runShoot: 100, firstShotAcc: 88, recoilControl: 70, penetration: 72, muzzleVel: 1350, image: "m4a1s.webp" },
  { id: "famas", name: "FAMAS", type: "Rifle", side: "ct", price: 2050, magazine: 25, total: 125, fireRate: 666, reloadTime: 3.1,
    damageHead: 126, damageBody: 30, damageArm: 26, damageLeg: 26, armorPen: 70,
    damageHeadArmor: 88, damageBodyArmor: 21, damageArmArmor: 18, damageLegArmor: 26,
    moveSpeed: 220, runShoot: 110, firstShotAcc: 75, recoilControl: 62, penetration: 65, muzzleVel: 1280, image: "famas.webp" },
  { id: "galil", name: "Galil AR", type: "Rifle", side: "t", price: 1800, magazine: 35, total: 175, fireRate: 666, reloadTime: 3.1,
    damageHead: 126, damageBody: 30, damageArm: 26, damageLeg: 26, armorPen: 70,
    damageHeadArmor: 88, damageBodyArmor: 21, damageArmArmor: 18, damageLegArmor: 26,
    moveSpeed: 220, runShoot: 112, firstShotAcc: 73, recoilControl: 60, penetration: 65, muzzleVel: 1260, image: "galil.webp" },
  { id: "sg553", name: "SG 553", type: "Rifle", side: "t", price: 3000, magazine: 30, total: 120, fireRate: 600, reloadTime: 2.7,
    damageHead: 250, damageBody: 30, damageArm: 28, damageLeg: 28, armorPen: 100,
    damageHeadArmor: 250, damageBodyArmor: 30, damageArmArmor: 28, damageLegArmor: 28,
    moveSpeed: 210, runShoot: 85, firstShotAcc: 92, recoilControl: 55, penetration: 95, muzzleVel: 1420, image: "sg553.webp" },
  { id: "aug", name: "AUG", type: "Rifle", side: "ct", price: 3300, magazine: 30, total: 120, fireRate: 600, reloadTime: 3.1,
    damageHead: 140, damageBody: 33, damageArm: 28, damageLeg: 28, armorPen: 90,
    damageHeadArmor: 126, damageBodyArmor: 29, damageArmArmor: 25, damageLegArmor: 28,
    moveSpeed: 215, runShoot: 88, firstShotAcc: 90, recoilControl: 60, penetration: 85, muzzleVel: 1400, image: "aug.webp" },

  // ======================== SNIPERS ========================
  { id: "awp", name: "AWP", type: "Sniper", side: "both", price: 4750, magazine: 5, total: 15, fireRate: 41, reloadTime: 3.7,
    damageHead: 500, damageBody: 150, damageArm: 120, damageLeg: 120, armorPen: 97,
    damageHeadArmor: 485, damageBodyArmor: 145, damageArmArmor: 116, damageLegArmor: 120,
    moveSpeed: 200, runShoot: 0, firstShotAcc: 99, recoilControl: 45, penetration: 100, muzzleVel: 1550, image: "awp.webp" },
  { id: "ssg08", name: "SSG 08", type: "Sniper", side: "both", price: 1700, magazine: 10, total: 30, fireRate: 48, reloadTime: 3.5,
    damageHead: 250, damageBody: 76, damageArm: 65, damageLeg: 65, armorPen: 90,
    damageHeadArmor: 225, damageBodyArmor: 68, damageArmArmor: 58, damageLegArmor: 65,
    moveSpeed: 230, runShoot: 50, firstShotAcc: 95, recoilControl: 55, penetration: 85, muzzleVel: 1480, image: "ssg08.webp" },
  { id: "scar20", name: "SCAR-20", type: "Sniper", side: "ct", price: 5000, magazine: 20, total: 60, fireRate: 500, reloadTime: 3.5,
    damageHead: 250, damageBody: 75, damageArm: 65, damageLeg: 65, armorPen: 90,
    damageHeadArmor: 225, damageBodyArmor: 67, damageArmArmor: 58, damageLegArmor: 65,
    moveSpeed: 210, runShoot: 0, firstShotAcc: 92, recoilControl: 50, penetration: 90, muzzleVel: 1450, image: "scar.webp" },
  { id: "g3sg1", name: "G3SG1", type: "Sniper", side: "t", price: 5000, magazine: 20, total: 60, fireRate: 500, reloadTime: 3.5,
    damageHead: 250, damageBody: 75, damageArm: 65, damageLeg: 65, armorPen: 90,
    damageHeadArmor: 225, damageBodyArmor: 67, damageArmArmor: 58, damageLegArmor: 65,
    moveSpeed: 210, runShoot: 0, firstShotAcc: 92, recoilControl: 50, penetration: 90, muzzleVel: 1450, image: "g3sg1.webp" },

  // ======================== SHOTGUNS ========================
  { id: "nova", name: "Nova", type: "Shotgun", side: "both", price: 1050, magazine: 8, total: 40, fireRate: 68, reloadTime: 3.5,
    damageHead: 240, damageBody: 48, damageArm: 40, damageLeg: 40, armorPen: 50,
    damageHeadArmor: 120, damageBodyArmor: 24, damageArmArmor: 20, damageLegArmor: 40,
    moveSpeed: 220, runShoot: 100, firstShotAcc: 55, recoilControl: 65, penetration: 45, muzzleVel: 1100, image: "nova.webp" },
  { id: "xm1014", name: "XM1014", type: "Shotgun", side: "both", price: 2000, magazine: 7, total: 32, fireRate: 120, reloadTime: 3.5,
    damageHead: 200, damageBody: 40, damageArm: 35, damageLeg: 35, armorPen: 50,
    damageHeadArmor: 100, damageBodyArmor: 20, damageArmArmor: 17, damageLegArmor: 35,
    moveSpeed: 215, runShoot: 110, firstShotAcc: 50, recoilControl: 60, penetration: 40, muzzleVel: 1080, image: "xm.webp" },
  { id: "mag7", name: "MAG-7", type: "Shotgun", side: "ct", price: 1300, magazine: 5, total: 20, fireRate: 85, reloadTime: 3.5,
    damageHead: 240, damageBody: 48, damageArm: 40, damageLeg: 40, armorPen: 50,
    damageHeadArmor: 120, damageBodyArmor: 24, damageArmArmor: 20, damageLegArmor: 40,
    moveSpeed: 220, runShoot: 95, firstShotAcc: 58, recoilControl: 68, penetration: 48, muzzleVel: 1120, image: "mag7.webp" },
  { id: "sawedoff", name: "Sawed-Off", type: "Shotgun", side: "t", price: 1100, magazine: 7, total: 32, fireRate: 68, reloadTime: 3.5,
    damageHead: 240, damageBody: 48, damageArm: 40, damageLeg: 40, armorPen: 50,
    damageHeadArmor: 120, damageBodyArmor: 24, damageArmArmor: 20, damageLegArmor: 40,
    moveSpeed: 210, runShoot: 105, firstShotAcc: 52, recoilControl: 62, penetration: 42, muzzleVel: 1050, image: "sawed_off.webp" },

  // ======================== HEAVY ========================
  { id: "m249", name: "M249", type: "Heavy", side: "both", price: 5200, magazine: 100, total: 300, fireRate: 750, reloadTime: 5.7,
    damageHead: 160, damageBody: 40, damageArm: 35, damageLeg: 35, armorPen: 80,
    damageHeadArmor: 128, damageBodyArmor: 32, damageArmArmor: 28, damageLegArmor: 35,
    moveSpeed: 195, runShoot: 85, firstShotAcc: 55, recoilControl: 48, penetration: 70, muzzleVel: 1300, image: "m249.webp" },
  { id: "negev", name: "Negev", type: "Heavy", side: "both", price: 1700, magazine: 100, total: 400, fireRate: 800, reloadTime: 5.7,
    damageHead: 140, damageBody: 35, damageArm: 30, damageLeg: 30, armorPen: 75,
    damageHeadArmor: 105, damageBodyArmor: 26, damageArmArmor: 22, damageLegArmor: 30,
    moveSpeed: 195, runShoot: 80, firstShotAcc: 50, recoilControl: 85, penetration: 65, muzzleVel: 1280, image: "negev.webp" },
];

const weaponIcons = { Pistole: "🔫", SMG: "🔫", Rifle: "🔫", Sniper: "🎯", Shotgun: "🔫", Heavy: "💪" };
const sideIcons = { t: "🔴 T", ct: "🔵 CT", both: "⚪ BOTH" };
const sideColors = { t: "#ffaa44", ct: "#44aaff", both: "#888888" };

let currentWeaponFilter = "all";
let currentWeaponSearch = "";
let compareList = [];

function getWeaponImagePath(imageName) {
  return `img/weapons/${imageName}`;
}

function renderWeaponsDB() {
  const container = document.getElementById("weaponsGrid");
  if (!container) return;

  // Vergleichsleiste aktualisieren
  if (compareList.length > 0) {
    updateCompareBar();
  } else {
    const bar = document.getElementById("compareBar");
    if (bar) bar.style.display = "none";
  }

  let filteredWeapons = weaponsDatabase;
  if (currentWeaponFilter !== "all") {
    filteredWeapons = filteredWeapons.filter(w => w.type === currentWeaponFilter);
  }
  if (currentWeaponSearch) {
    const searchLower = currentWeaponSearch.toLowerCase();
    filteredWeapons = filteredWeapons.filter(w => w.name.toLowerCase().includes(searchLower));
  }

  if (filteredWeapons.length === 0) {
    container.innerHTML = '<div class="empty-message" style="grid-column:1/-1; text-align:center; padding:3rem;">🔍 Keine Waffen gefunden</div>';
    return;
  }

  container.innerHTML = filteredWeapons.map(weapon => `
    <div class="weapon-db-card" data-weapon-id="${weapon.id}">
      <div class="weapon-db-header">
        <div class="weapon-db-image">
          <img src="${getWeaponImagePath(weapon.image)}" alt="${weapon.name}" onerror="this.src='img/weapons/placeholder.png'">
        </div>
        <div class="weapon-db-info">
          <div class="weapon-db-name">${weapon.name}</div>
          <div class="weapon-db-type">${weaponIcons[weapon.type]} ${weapon.type} | <span style="color: ${sideColors[weapon.side]}">${sideIcons[weapon.side]}</span></div>
          <div class="weapon-db-price">💰 $${weapon.price}</div>
        </div>
      </div>
      <div class="weapon-db-stats">
        <div class="weapon-db-stat"><span>📦 Magazin</span><span>${weapon.magazine} / ${weapon.total}</span></div>
        <div class="weapon-db-stat"><span>⚡ Feuerrate</span><span>${weapon.fireRate} RPM</span></div>
        <div class="weapon-db-stat"><span>🔄 Nachladen</span><span>${weapon.reloadTime}s</span></div>
        <div class="weapon-db-stat"><span>🏃 Bewegung</span><span>${weapon.moveSpeed} u/s</span></div>
        <div class="weapon-db-stat"><span>🛡️ Rüstungspen.</span><span>${weapon.armorPen}%</span></div>
        <div class="weapon-db-stat"><span>🎯 1. Schuss Gen.</span><span>${weapon.firstShotAcc}%</span></div>
        <div class="weapon-db-stat"><span>🎮 Recoil Ctrl.</span><span>${weapon.recoilControl}%</span></div>
      </div>
      <div class="weapon-db-damage">
        <div class="weapon-db-damage-title">💥 Schaden:</div>
        <div class="weapon-db-damage-values">
          <span style="color:#ff6666">🎯 Kopf: ${weapon.damageHead} (${weapon.damageHeadArmor} mit Rüstung)</span>
          <span style="color:#ffaa66">💪 Brust: ${weapon.damageBody} (${weapon.damageBodyArmor} mit Rüstung)</span>
          <span style="color:#aaffaa">🦵 Bein: ${weapon.damageLeg} (${weapon.damageLegArmor} mit Rüstung)</span>
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end; margin-top: 0.8rem;">
        <button class="weapon-compare-btn" data-weapon-id="${weapon.id}" data-weapon-name="${weapon.name}">➕ Vergleichen</button>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".weapon-compare-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const weaponId = btn.getAttribute("data-weapon-id");
      const weaponName = btn.getAttribute("data-weapon-name");
      addToCompare(weaponId, weaponName);
    });
  });
}

function addToCompare(weaponId, weaponName) {
  if (compareList.includes(weaponId)) {
    alert(`⚠️ "${weaponName}" ist bereits im Vergleich!`);
    return;
  }
  if (compareList.length >= 3) {
    alert("⚠️ Es können maximal 3 Waffen verglichen werden.");
    return;
  }
  compareList.push(weaponId);
  updateCompareBar();
}

function removeFromCompare(weaponId) {
  compareList = compareList.filter(id => id !== weaponId);
  if (compareList.length === 0) {
    const view = document.getElementById("compareView");
    if (view) view.style.display = "none";
    const bar = document.getElementById("compareBar");
    if (bar) bar.style.display = "none";
  } else {
    updateCompareBar();
    const view = document.getElementById("compareView");
    if (view && view.style.display !== "none") {
      renderCompareView();
    }
  }
}

function updateCompareBar() {
  const bar = document.getElementById("compareBar");
  if (!bar) return;
  
  if (compareList.length === 0) {
    bar.style.display = "none";
    return;
  }
  
  bar.style.display = "block";
  const weapons = compareList.map(id => weaponsDatabase.find(w => w.id === id)).filter(w => w);
  
  bar.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <strong>📊 Vergleich (${compareList.length}/3):</strong>
        ${weapons.map(w => `
          <div style="background: var(--btn-bg); padding: 0.3rem 1rem; border-radius: 2rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🔫 ${w.name}</span>
            <button class="remove-compare-btn" data-weapon-id="${w.id}" style="background: none; border: none; color: #ff6666; cursor: pointer; font-size: 1.1rem;">&times;</button>
          </div>
        `).join('')}
      </div>
      <div style="display: flex; gap: 0.5rem;">
        ${compareList.length >= 2 ? `<button id="showCompareBtn" class="glow" style="padding: 0.3rem 1rem;">🔍 Vergleich anzeigen</button>` : '<span style="opacity:0.5;">➕ Wähle mindestens 2 Waffen</span>'}
        <button id="clearAllCompareBtn" class="glow" style="padding: 0.3rem 1rem; background: #ff4444;">✖ Alle entfernen</button>
      </div>
    </div>
  `;
  
  document.querySelectorAll(".remove-compare-btn").forEach(btn => {
    btn.addEventListener("click", () => removeFromCompare(btn.getAttribute("data-weapon-id")));
  });
  
  const showBtn = document.getElementById("showCompareBtn");
  if (showBtn) {
    showBtn.addEventListener("click", () => {
      renderCompareView();
      // Scrolle zum Vergleichsbereich
      const compareView = document.getElementById("compareView");
      if (compareView) {
        compareView.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
  
  const clearAllBtn = document.getElementById("clearAllCompareBtn");
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
      compareList = [];
      updateCompareBar();
      const view = document.getElementById("compareView");
      if (view) view.style.display = "none";
    });
  }
}

function renderCompareView() {
  const compareView = document.getElementById("compareView");
  if (!compareView) return;
  
  if (compareList.length < 2) {
    compareView.style.display = "none";
    return;
  }
  
  compareView.style.display = "block";
  
  const weapons = compareList.map(id => weaponsDatabase.find(w => w.id === id)).filter(w => w);
  if (weapons.length === 0) return;
  
  const colCount = weapons.length;
  
  // Alle Statistiken für die Tabelle
  const statRows = [
    { label: "💰 Preis", getValue: (w) => `${w.price}$`, higher: false },
    { label: "📦 Magazin", getValue: (w) => `${w.magazine} / ${w.total}`, higher: true },
    { label: "⚡ Feuerrate", getValue: (w) => `${w.fireRate} RPM`, higher: true },
    { label: "🔄 Nachladen", getValue: (w) => `${w.reloadTime}s`, higher: false },
    { label: "🏃 Bewegung", getValue: (w) => `${w.moveSpeed} u/s`, higher: true },
    { label: "🛡️ Rüstungspen.", getValue: (w) => `${w.armorPen}%`, higher: true },
    { label: "🎯 1. Schuss Gen.", getValue: (w) => `${w.firstShotAcc}%`, higher: true },
    { label: "🎮 Recoil Ctrl.", getValue: (w) => `${w.recoilControl}%`, higher: true },
    { label: "💥 Penetration", getValue: (w) => `${w.penetration}%`, higher: true },
    { label: "💨 Mündungsgeschw.", getValue: (w) => `${w.muzzleVel} m/s`, higher: true },
    // Schaden ohne Rüstung
    { label: "🎯 Kopf (keine Rüstung)", getValue: (w) => `${w.damageHead}`, higher: true },
    { label: "💪 Brust (keine Rüstung)", getValue: (w) => `${w.damageBody}`, higher: true },
    { label: "🦵 Bein (keine Rüstung)", getValue: (w) => `${w.damageLeg}`, higher: true },
    // Schaden mit Rüstung
    { label: "🎯 Kopf (mit Rüstung)", getValue: (w) => `${w.damageHeadArmor}`, higher: true },
    { label: "💪 Brust (mit Rüstung)", getValue: (w) => `${w.damageBodyArmor}`, higher: true },
    { label: "🦵 Bein (mit Rüstung)", getValue: (w) => `${w.damageLegArmor}`, higher: true },
  ];
  
  let html = `
    <div style="background: var(--card-bg); border-radius: 1.5rem; border: 1px solid var(--accent); padding: 1rem; margin-top: 1rem; overflow-x: auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
        <h3 style="margin: 0;">🔄 Waffenvergleich (${weapons.length} Waffen)</h3>
        <button id="closeCompareViewBtn" class="glow" style="padding: 0.3rem 0.8rem;">✖ Schließen</button>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
        <thead>
          <tr style="border-bottom: 2px solid var(--accent); background: rgba(0,0,0,0.3);">
            <th style="text-align: left; padding: 0.6rem;">Eigenschaft</th>
            ${weapons.map(w => `<th style="text-align: center; padding: 0.6rem;">${w.name}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${statRows.map(stat => {
            // Besten Wert ermitteln
            let bestValues = [];
            if (stat.higher) {
              const values = weapons.map(w => {
                const val = parseFloat(stat.getValue(w).replace(/[^0-9.-]/g, ''));
                return isNaN(val) ? 0 : val;
              });
              const maxVal = Math.max(...values);
              bestValues = weapons.filter((w, idx) => values[idx] === maxVal).map(w => w.id);
            } else {
              const values = weapons.map(w => {
                const val = parseFloat(stat.getValue(w).replace(/[^0-9.-]/g, ''));
                return isNaN(val) ? 0 : val;
              });
              const minVal = Math.min(...values);
              bestValues = weapons.filter((w, idx) => values[idx] === minVal).map(w => w.id);
            }
            
            return `
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 0.6rem; font-weight: bold; background: rgba(0,0,0,0.15);">${stat.label}</td>
                ${weapons.map(w => {
                  const value = stat.getValue(w);
                  const isBest = bestValues.includes(w.id);
                  return `
                    <td style="text-align: center; padding: 0.6rem; ${isBest ? 'color: #aaff66; font-weight: bold; background: rgba(170,255,102,0.1);' : ''}">
                      ${value}
                      ${isBest ? ' 🏆' : ''}
                    </td>
                  `;
                }).join('')}
              </tr>
            `;
          }).join('')}
        </tbody>
       </table>
      
      <div class="info-text" style="margin-top: 0.8rem; text-align: center; font-size: 0.7rem;">
        💡 🏆 markiert den besten Wert in jeder Kategorie
      </div>
    </div>
  `;
  
  compareView.innerHTML = html;
  
  const closeBtn = document.getElementById("closeCompareViewBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      compareView.style.display = "none";
    });
  }
}

function initWeaponsDB() {
  const weaponsDbTab = document.getElementById("weaponsDb");
  if (weaponsDbTab) {
    if (!document.getElementById("compareBar")) {
      const compareBar = document.createElement("div");
      compareBar.id = "compareBar";
      compareBar.style.cssText = "position: sticky; top: 0; z-index: 100; background: var(--card-bg); border-radius: 1rem; padding: 0.6rem 1rem; margin-bottom: 1rem; border: 1px solid var(--accent); display: none;";
      weaponsDbTab.insertBefore(compareBar, weaponsDbTab.firstChild);
    }
    
    if (!document.getElementById("compareView")) {
      const compareView = document.createElement("div");
      compareView.id = "compareView";
      compareView.style.display = "none";
      weaponsDbTab.appendChild(compareView);
    }
  }
  
  const filterBtns = document.querySelectorAll(".weapon-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active-filter"));
      btn.classList.add("active-filter");
      currentWeaponFilter = btn.getAttribute("data-filter");
      renderWeaponsDB();
    });
  });
  
  const searchInput = document.getElementById("weaponSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentWeaponSearch = e.target.value;
      renderWeaponsDB();
    });
  }
  
  renderWeaponsDB();
}

window.initWeaponsDB = initWeaponsDB;