// ======================== THEME SYSTEM ========================
function initTheme() {
  const savedTheme = localStorage.getItem("cs2_neon_theme") || "pink";
  document.body.classList.remove("theme-pink", "theme-red", "theme-yellow", "theme-green", "theme-blue");
  document.body.classList.add(`theme-${savedTheme}`);
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.theme === savedTheme) btn.classList.add("active");
  });
}

function setTheme(theme) {
  document.body.classList.remove("theme-pink", "theme-red", "theme-yellow", "theme-green", "theme-blue");
  document.body.classList.add(`theme-${theme}`);
  localStorage.setItem("cs2_neon_theme", theme);
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.theme === theme) btn.classList.add("active");
  });
}

// Theme-Buttons initialisieren
document.querySelectorAll(".theme-btn").forEach((btn) =>
  btn.addEventListener("click", () => setTheme(btn.dataset.theme))
);