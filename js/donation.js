// ======================== THEME DROPDOWN & DONATION MODAL ========================

// Theme Dropdown Funktionen
function initThemeDropdown() {
  const dropdownBtn = document.getElementById('themeDropdownBtn');
  const dropdownContent = document.getElementById('themeDropdownContent');
  
  if (!dropdownBtn || !dropdownContent) return;
  
  // Dropdown öffnen/schließen
  dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownContent.classList.toggle('show');
  });
  
  // Schließen wenn außerhalb geklickt wird
  document.addEventListener('click', (e) => {
    if (!dropdownBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
      dropdownContent.classList.remove('show');
    }
  });
  
  // Theme Optionen
  const themeOptions = document.querySelectorAll('.theme-option');
  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.dataset.theme;
      if (typeof setTheme === 'function') {
        setTheme(theme);
      } else if (window.setTheme) {
        window.setTheme(theme);
      }
      dropdownContent.classList.remove('show');
    });
  });
}

// Donation Modal Funktionen
function initDonationModal() {
  const modal = document.getElementById('donationModal');
  const donationBtn = document.getElementById('donationBtn');
  const closeBtn = document.querySelector('.donation-modal-close');
  const paypalBtn = document.getElementById('paypalDonateBtn');
  const copyTradeLinkBtn = document.getElementById('copyTradeLinkBtn');
  const openSteamBtn = document.getElementById('openSteamProfileBtn');
  const tradeLinkMessage = document.getElementById('tradeLinkMessage');
  
  if (!modal || !donationBtn) return;
  
  // PayPal Link (Hier deine PayPal.Me Link einfügen!)
  const PAYPAL_URL = 'https://paypal.me/YOUR_PAYPAL_USERNAME'; // <-- HIER DEINEN PAYPAL LINK EINTRAGEN!
  
  // Steam Trade Link (Hier deinen Tradelink einfügen!)
  const STEAM_TRADE_LINK = 'https://steamcommunity.com/tradeoffer/new/?partner=YOUR_PARTNER_ID&token=YOUR_TOKEN'; // <-- HIER DEINEN TRADELINK EINTRAGEN!
  
  // Steam Profil Link
  const STEAM_PROFILE_URL = 'https://steamcommunity.com/id/thelaw5150/'; // <-- DEIN STEAM PROFIL
  
  // Modal öffnen
  donationBtn.addEventListener('click', () => {
    modal.classList.add('show');
  });
  
  // Modal schließen
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }
  
  // Außerhalb des Modals klicken = schließen
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
  
  // PayPal Button
  if (paypalBtn) {
    paypalBtn.addEventListener('click', () => {
      if (PAYPAL_URL !== 'https://paypal.me/YOUR_PAYPAL_USERNAME') {
        window.open(PAYPAL_URL, '_blank');
      } else {
        alert('⚠️ PayPal Link wurde noch nicht konfiguriert. Bitte kontaktiere den Entwickler!');
      }
    });
  }
  
  // Tradelink kopieren
  if (copyTradeLinkBtn && STEAM_TRADE_LINK && tradeLinkMessage) {
    copyTradeLinkBtn.addEventListener('click', async () => {
      if (STEAM_TRADE_LINK !== 'https://steamcommunity.com/tradeoffer/new/?partner=44056610&token=nA43cSk-') {
        try {
          await navigator.clipboard.writeText(STEAM_TRADE_LINK);
          tradeLinkMessage.style.display = 'block';
          setTimeout(() => {
            tradeLinkMessage.style.display = 'none';
          }, 2000);
        } catch (err) {
          alert('❌ Tradelink konnte nicht kopiert werden.');
        }
      } else {
        alert('⚠️ Tradelink wurde noch nicht konfiguriert. Bitte kontaktiere den Entwickler!');
      }
    });
  }
  
  // Steam Profil öffnen
  if (openSteamBtn) {
    openSteamBtn.addEventListener('click', () => {
      window.open(STEAM_PROFILE_URL, '_blank');
    });
  }
}

// Theme Dropdown und Donation Modal initialisieren, wenn DOM geladen ist
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initThemeDropdown();
    initDonationModal();
  });
} else {
  initThemeDropdown();
  initDonationModal();
}