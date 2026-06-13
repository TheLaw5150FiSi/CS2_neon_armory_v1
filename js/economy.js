// ======================== ECONOMY GUIDE ========================

function initEconomyGuide() {
  // Navigation zwischen Sektionen
  const navBtns = document.querySelectorAll('.economy-nav-btn');
  const sections = document.querySelectorAll('.economy-section');
  
  function showSection(sectionId) {
    sections.forEach(section => section.classList.remove('active-section'));
    const targetSection = document.getElementById(`economy-${sectionId}`);
    if (targetSection) targetSection.classList.add('active-section');
    
    navBtns.forEach(btn => btn.classList.remove('active-nav'));
    const activeBtn = document.querySelector(`.economy-nav-btn[data-section="${sectionId}"]`);
    if (activeBtn) activeBtn.classList.add('active-nav');
  }
  
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.getAttribute('data-section');
      showSection(section);
    });
  });
  
  // Standardmäßig "basics" anzeigen
  showSection('basics');
  
  // Economy Rechner
  const calcBtn = document.getElementById('calcRecommendBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const money = parseInt(document.getElementById('calcMoney').value) || 0;
      const losses = parseInt(document.getElementById('calcLosses').value) || 0;
      const side = document.getElementById('calcSide').value;
      
      const lossBonus = [0, 1400, 1900, 2400, 2900, 3400];
      const nextRoundMoney = money + lossBonus[Math.min(losses, 5)];
      
      let recommendation = '';
      let color = '#ffaa44';
      
      if (nextRoundMoney >= 5000) {
        recommendation = '✅ FULL BUY möglich! Du hast reichlich Geld für volle Ausrüstung. Kaufe Rifle (AK/M4), Kevlar+Helm und alle Granaten.';
        color = '#22c55e';
      } else if (nextRoundMoney >= 3500) {
        if (side === 'ct') {
          recommendation = '⚠️ Eingeschränkter Full Buy möglich. Du kannst M4 + Kevlar kaufen, aber Granaten werden knapp. Priorisiere Smoke und Flash.';
        } else {
          recommendation = '⚠️ Eingeschränkter Full Buy möglich. AK-47 + Kevlar sind drin, Granaten sind optional.';
        }
        color = '#eab308';
      } else if (nextRoundMoney >= 2000) {
        recommendation = '🟡 FORCE BUY empfohlen! Kaufe SMG (MP9/MAC-10), Kevlar+Helm und eine Smoke. Versuche, Gegner zu überraschen.';
        color = '#eab308';
      } else if (nextRoundMoney >= 1000) {
        recommendation = '🟢 ECO ROUND! Kaufe nur Kevlar + Helm oder P250/Deagle. Spare Geld für die nächste Runde. Ziel: Einen Gegner töten und seine Waffe nehmen.';
        color = '#22c55e';
      } else {
        recommendation = '⚫ SAVE ROUND! Kaufe GAR NICHTS. Spiele mit USP/Glock und versuche, eine Waffe aufzunehmen. Nächste Runde kannst du kaufen.';
        color = '#6b7280';
      }
      
      let html = `
        <div class="recommendation">
          <p><strong>Aktuelles Geld:</strong> $${money}</p>
          <p><strong>Loss Bonus nächste Runde:</strong> $${lossBonus[Math.min(losses, 5)]}</p>
          <p><strong>Geld nächste Runde:</strong> <span style="color: ${color}; font-weight: bold;">~$${nextRoundMoney}</span></p>
          <hr style="border-color: var(--border-color); margin: 0.8rem 0;">
          <p><strong>📌 Empfehlung:</strong><br>${recommendation}</p>
        </div>
      `;
      
      document.getElementById('calcResultContent').innerHTML = html;
    });
  }
}

// Starte Initialisierung wenn DOM geladen ist
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEconomyGuide);
} else {
  initEconomyGuide();
}