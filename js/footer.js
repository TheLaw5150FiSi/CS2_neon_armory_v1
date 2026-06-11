// ======================== FOOTER MODULE ========================
// CS2 Neon Studio - Footer Komponente
// Version: 1.0.1.1 | Datum: Juni 2026

(function () {
  "use strict";

  // ======================== HILFSFUNKTIONEN ========================

  /**
   * Scrollt zu einem bestimmten Tab
   * @param {string} tabId - ID des Tabs
   */
  window.scrollToTab = function (tabId) {
    const tabBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const tabContent = document.getElementById(tabId);

    if (tabBtn && tabContent) {
      // Aktiviere den Tab
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      tabBtn.classList.add("active");

      document.querySelectorAll(".tab-content").forEach((tc) => {
        tc.classList.remove("active");
      });
      tabContent.classList.add("active");

      // Smooth scroll zum Tab
      tabContent.scrollIntoView({ behavior: "smooth", block: "start" });

      // Export aktualisieren
      if (typeof window.refreshFullExport === "function") {
        window.refreshFullExport();
      }
    }
  };

  /**
   * Zeigt ein Modal-Dialog an
   * @param {string} title - Titel des Modals
   * @param {string} contentHtml - HTML-Inhalt
   */
  function showModalDialog(title, contentHtml) {
    // Prüfe ob bereits ein Modal existiert
    let modal = document.getElementById("footerModal");
    if (modal) {
      modal.remove();
    }

    modal = document.createElement("div");
    modal.id = "footerModal";
    modal.className = "footer-modal";
    modal.innerHTML = `
            <div class="footer-modal-content">
                <div class="footer-modal-header">
                    <span class="footer-modal-title">${escapeHtml(title)}</span>
                    <span class="footer-modal-close">&times;</span>
                </div>
                <div class="footer-modal-body">
                    ${contentHtml}
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Modal anzeigen
    setTimeout(() => modal.classList.add("show"), 10);

    // Close-Button
    const closeBtn = modal.querySelector(".footer-modal-close");
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove("show");
        setTimeout(() => modal.remove(), 300);
      };
    }

    // Klick außerhalb
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => modal.remove(), 300);
      }
    };

    // ESC-Taste zum Schließen
    const escHandler = (e) => {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        modal.classList.remove("show");
        setTimeout(() => modal.remove(), 300);
        document.removeEventListener("keydown", escHandler);
      }
    };
    document.addEventListener("keydown", escHandler);
  }

  /**
   * HTML escaped für Sicherheit
   * @param {string} str - Zu escapender String
   * @returns {string}
   */
  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // ======================== RECHTLICHES ========================

  function showImpressum() {
    const modalContent = `
            <div style="max-width: 500px;">
                <h3 style="color: var(--accent); margin-bottom: 1rem;">📄 Impressum</h3>
                <p><strong>Angaben gemäß § 5 TMG</strong></p>
                <p>
                    Michael M. (TheLaw5150)<br>
                    Deutschland
                </p>
                <p><strong>Kontakt:</strong><br>
                    Discord: thelaw5150<br>
                    GitHub: TheLaw5150FiSi
                </p>
                <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br>
                    Michael M.
                </p>
                <p><strong>Haftungsausschluss:</strong><br>
                    Dieses Tool ist ein Fan-Projekt und nicht offiziell mit Valve Corporation 
                    oder Counter-Strike verbunden. Alle Markenrechte gehören ihren jeweiligen Inhabern.
                </p>
                <p><small>Stand: Juni 2026</small></p>
            </div>
        `;
    showModalDialog("Impressum", modalContent);
  }

  function showDatenschutz() {
    const modalContent = `
            <div style="max-width: 600px;">
                <h3 style="color: var(--accent); margin-bottom: 1rem;">🔒 Datenschutzerklärung</h3>
                
                <h4>1. Verantwortlicher</h4>
                <p>Michael M. (TheLaw5150) - Kontakt siehe Impressum</p>
                
                <h4>2. Keine Datenerhebung durch das Tool</h4>
                <p>CS2 Neon Studio speichert folgende Daten <strong>AUSSCHLIESSLICH LOKAL</strong> in deinem Browser (localStorage):</p>
                <ul>
                    <li>Buy-Bindings</li>
                    <li>Say-Bindings</li>
                    <li>Script-Bindings</li>
                    <li>Config-Einstellungen</li>
                    <li>Theme-Präferenz</li>
                    <li>Crosshair-Einstellungen</li>
                    <li>Ping-Verlauf</li>
                    <li>Startoptionen</li>
                </ul>
                <p><strong>Es werden KEINE Daten an externe Server gesendet.</strong></p>
                
                <h4>3. Keine Cookies</h4>
                <p>Dieses Tool verwendet keine Cookies von Drittanbietern.</p>
                
                <h4>4. Externe Links</h4>
                <p>Bei Nutzung von externen Links (PayPal, Steam, Discord, GitHub) gelten deren Datenschutzbestimmungen.</p>
                
                <h4>5. Deine Rechte</h4>
                <p>Du kannst jederzeit die Browser-Daten (localStorage) löschen. Alle deine Einstellungen sind dann entfernt.</p>
                
                <h4>6. Speicherdauer</h4>
                <p>Die lokalen Daten bleiben so lange gespeichert, bis du sie manuell löschst oder deinen Browser-Cache entfernst.</p>
                
                <p><small>Stand: Juni 2026</small></p>
            </div>
        `;
    showModalDialog("Datenschutzerklärung", modalContent);
  }

  function showNutzungsbedingungen() {
    const modalContent = `
            <div style="max-width: 600px;">
                <h3 style="color: var(--accent); margin-bottom: 1rem;">⚖️ Nutzungsbedingungen</h3>
                
                <h4>1. Kostenlose Nutzung</h4>
                <p>CS2 Neon Studio ist ein kostenloses Tool. Die Nutzung erfolgt auf eigene Gefahr.</p>
                
                <h4>2. Haftungsausschluss</h4>
                <p>Der Entwickler übernimmt keine Haftung für Schäden, die durch die Nutzung des Tools entstehen.</p>
                
                <h4>3. Kein Cheating</h4>
                <p>Dieses Tool erstellt nur legitime CS2-Configs und Bindings. Es enthält keine Cheats oder Hacks.</p>
                
                <h4>4. Urheberrecht</h4>
                <p>Das Tool darf nicht kopiert, verkauft oder als eigenes Werk ausgegeben werden.</p>
                
                <h4>5. Änderungen</h4>
                <p>Der Entwickler behält sich vor, die Nutzungsbedingungen jederzeit zu ändern.</p>
                
                <h4>6. Verbotene Nutzung</h4>
                <p>Die Nutzung des Tools für illegale Zwecke ist untersagt.</p>
                
                <h4>7. Support</h4>
                <p>Support wird nach bestem Gewissen, aber ohne Gewährleistung angeboten.</p>
                
                <p><small>Stand: Juni 2026</small></p>
            </div>
        `;
    showModalDialog("Nutzungsbedingungen", modalContent);
  }

  // ======================== CHANGELOG ========================

  function showChangelog() {
    const modalContent = `
            <div style="max-width: 550px;">
                <h3 style="color: var(--accent); margin-bottom: 1rem;">📝 Changelog v1.0.1.1</h3>
                
                <h4>🆕 Neue Features (Juni 2026):</h4>
                <ul>
                    <li>Buy-Binds mit Preisanzeige und Gegenüberstellung T/CT</li>
                    <li>Verbesserte Grid-Tastatur mit allen Tasten (DE/US Layout)</li>
                    <li>Crosshair Generator mit Live-Vorschau</li>
                    <li>System Analyzer mit CPU/GPU-Datenbank</li>
                    <li>Ping Radar mit Verlauf und Tabellenansicht</li>
                    <li>Startoptionen-Generator mit Hardware-Erkennung</li>
                    <li>Theme-Dropdown mit 5 Farbvarianten</li>
                    <li>Footer mit Kontaktformular und Rechtlichem</li>
                </ul>
                
                <h4>🐛 Behobene Fehler:</h4>
                <ul>
                    <li>Layout-Wechsel zwischen DE/US funktioniert korrekt</li>
                    <li>NumPad-Tasten werden richtig angezeigt</li>
                    <li>Script-Bindings mit Aliasen funktionieren</li>
                    <li>Flashbang-Zyklus (0 → 1 → 2 → 0) implementiert</li>
                    <li>Storage-Info wird korrekt angezeigt</li>
                </ul>
                
                <h4>📅 Geplante Features (Roadmap):</h4>
                <ul>
                    <li>Quick Buy Presets (1-Tasten-Kits)</li>
                    <li>Config-Backup Funktion mit Mehrfach-Speicherung</li>
                    <li>Workshop-Map Links und Sammlung</li>
                    <li>Practice Mode Shortcuts</li>
                    <li>JSON Import/Export für alle Daten</li>
                </ul>
                
                <hr style="border-color: var(--border-color); margin: 1rem 0;">
                <p><small>Letztes Update: Juni 2026 | Nächste Version: v1.1.0 geplant für Juli 2026</small></p>
            </div>
        `;
    showModalDialog("Changelog", modalContent);
  }

  // ======================== UPDATE CHECK ========================

  function checkForUpdates() {
    const btn = document.getElementById("checkForUpdatesBtn");
    if (!btn) return;

    const originalText = btn.innerHTML;
    const originalDisabled = btn.disabled;

    btn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Suche nach Updates...';
    btn.disabled = true;

    // Simulierter Update-Check (kann durch echten API-Call ersetzt werden)
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;

      showModalDialog(
        "Update Check",
        `
                <div style="text-align: center;">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: #22c55e; margin-bottom: 1rem;"></i>
                    <p><strong>Du hast die aktuelle Version!</strong></p>
                    <p>Version v1.0.2.1 (Juni 2026)</p>
                    <p style="font-size: 0.8rem; opacity: 0.7;">Keine neuen Updates verfügbar.</p>
                    <hr style="border-color: var(--border-color); margin: 1rem 0;">
                    <p style="font-size: 0.75rem;">Besuche GitHub für die neueste Version:<br>
                    <a href="https://github.com/TheLaw5150FiSi/cs2-neon-studio" target="_blank" style="color: var(--accent);">github.com/TheLaw5150FiSi/cs2-neon-studio</a></p>
                </div>
            `,
      );
    }, 1500);
  }

  // ======================== KONTAKTFORMULAR ========================

  function initContactForm() {
    const form = document.getElementById("footerContactForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const subject = document.getElementById("contactSubject").value;
      const message = document.getElementById("contactMessage").value.trim();
      const copyToSelf = document.getElementById("contactCopyToSelf").checked;
      const statusDiv = document.getElementById("contactFormStatus");

      // Validierung
      if (!name || !email || !subject || !message) {
        showFormStatus(statusDiv, "❌ Bitte fülle alle Felder aus!", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showFormStatus(
          statusDiv,
          "❌ Bitte gib eine gültige E-Mail-Adresse ein!",
          "error",
        );
        return;
      }

      if (message.length < 10) {
        showFormStatus(
          statusDiv,
          "❌ Bitte schreibe eine ausführlichere Nachricht (min. 10 Zeichen).",
          "error",
        );
        return;
      }

      // Betreff-Text
      const subjectMap = {
        bug: "🐛 Bug Report",
        feature: "💡 Feature Request",
        question: "❓ Frage",
        support: "🆘 Support Anfrage",
        other: "📝 Sonstige Anfrage",
      };

      const fullSubject = `${subjectMap[subject]} von ${name}`;

      // E-Mail Content
      const emailContent = `
Name: ${name}
E-Mail: ${email}
Betreff: ${subjectMap[subject]}

Nachricht:
${message}

---
Gesendet über CS2 Neon Armory Kontaktformular
Version: v1.0.1.1
Datum: ${new Date().toLocaleString()}
            `.trim();

      // Kopie an den Benutzer
      if (copyToSelf) {
        const userMailBody = `
Hallo ${name},

vielen Dank für deine Nachricht an CS2 Neon Studio!

Deine Nachricht:
"${message}"

Ich werde mich so schnell wie möglich bei dir melden.

Viele Grüße,
Michael (TheLaw5150)
                `.trim();

        const userMailto = `mailto:${email}?subject=Kopie: ${fullSubject}&body=${encodeURIComponent(userMailBody)}`;
        window.open(userMailto, "_blank");
      }

      // Haupt-E-Mail an Entwickler
      // Bitte ändere die E-Mail-Adresse zu deiner eigenen!
      const developerEmail = "thelaw5150@proton.me";
      const mailtoLink = `mailto:${developerEmail}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(emailContent)}`;

      // Öffne Standard-E-Mail-Programm
      window.location.href = mailtoLink;

      // Erfolgsmeldung
      showFormStatus(
        statusDiv,
        "✅ Nachricht wurde vorbereitet! Bitte sende die E-Mail ab.",
        "success",
      );

      // Formular zurücksetzen (optional)
      // form.reset();

      setTimeout(() => {
        if (statusDiv) {
          statusDiv.innerHTML = "";
          statusDiv.className = "contact-form-status";
        }
      }, 8000);
    });
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    return re.test(email);
  }

  function showFormStatus(statusDiv, message, type) {
    if (!statusDiv) return;
    statusDiv.innerHTML = message;
    statusDiv.className = `contact-form-status ${type}`;
    setTimeout(() => {
      if (statusDiv.innerHTML === message) {
        statusDiv.innerHTML = "";
        statusDiv.className = "contact-form-status";
      }
    }, 5000);
  }

  // ======================== STORAGE INFO ========================

  function updateStorageInfo() {
    let total = 0;
    try {
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length * 2; // UTF-16 = 2 bytes per char
        }
      }
    } catch (e) {
      console.warn("Storage Info konnte nicht berechnet werden:", e);
    }

    const kb = Math.round(total / 1024);
    const storageSpan = document.getElementById("footerStorageUsed");
    if (storageSpan) {
      storageSpan.innerText = kb;

      // Warnung bei > 4MB
      if (kb > 4000) {
        storageSpan.style.color = "#f59e0b";
        storageSpan.title = "Storage fast voll! Bitte Backup machen.";
      } else {
        storageSpan.style.color = "";
        storageSpan.title = "";
      }
    }

    // Status-Dot aktualisieren
    const statusDot = document.querySelector(".status-dot");
    if (statusDot && kb > 4000) {
      statusDot.className = "status-dot warning";
      statusDot.title = "Storage fast voll! Bitte Backup machen.";
    } else if (statusDot) {
      statusDot.className = "status-dot online";
      statusDot.title = "Tool Online";
    }
  }

  function updateLastExportTime() {
    const lastExport = localStorage.getItem("cs2_neon_last_export");
    const timeSpan = document.getElementById("lastExportTime");
    if (timeSpan) {
      if (lastExport) {
        try {
          const date = new Date(lastExport);
          timeSpan.innerText = date.toLocaleTimeString();
          timeSpan.title = `Letzter Export: ${date.toLocaleString()}`;
        } catch (e) {
          timeSpan.innerText = "Fehler";
        }
      } else {
        timeSpan.innerText = "Kein Export";
        timeSpan.title = "Noch kein Export erstellt";
      }
    }
  }

  // Export-Funktion überschreiben, um Zeit zu speichern
  function enhanceExportFunction() {
    const originalRefreshFullExport = window.refreshFullExport;
    if (
      originalRefreshFullExport &&
      typeof originalRefreshFullExport === "function"
    ) {
      window.refreshFullExport = function () {
        originalRefreshFullExport();
        localStorage.setItem("cs2_neon_last_export", new Date().toISOString());
        updateLastExportTime();
      };
    }
  }

  // ======================== DONATION (Footer Version) ========================

  function initFooterDonation() {
    const donateBtn = document.getElementById("footerDonationBtn");
    if (donateBtn) {
      donateBtn.addEventListener("click", () => {
        const modal = document.getElementById("donationModal");
        if (modal) {
          modal.classList.add("show");
        } else {
          // Fallback: Zeige Info
          showModalDialog(
            "💝 Unterstützung",
            `
                        <div style="text-align: center;">
                            <i class="fas fa-heart" style="font-size: 3rem; color: #ff3366; margin-bottom: 1rem;"></i>
                            <p><strong>Vielen Dank für deine Unterstützung!</strong></p>
                            <p>Du kannst mich über PayPal oder via CS2 Skins unterstützen.</p>
                            <p>Klicke dazu auf den "Donation" Button im Header.</p>
                            <hr style="border-color: var(--border-color); margin: 1rem 0;">
                            <p style="font-size: 0.8rem;">Jede Spende hilft, das Tool weiterzuentwickeln!</p>
                        </div>
                    `,
          );
        }
      });
    }
  }

  // ======================== EXTERNE LINKS ========================

  function initExternalLinks() {
    const discordLink = document.getElementById("footerDiscordLink");
    if (discordLink) {
      discordLink.addEventListener("click", (e) => {
        e.preventDefault();
        window.open("https://discord.gg/Q72WJwdCCf", "_blank");
      });
    }

    const githubLink = document.getElementById("footerGitHubLink");
    if (githubLink) {
      githubLink.addEventListener("click", (e) => {
        e.preventDefault();
        window.open(
          "https://github.com/TheLaw5150FiSi/cs2-neon-studio",
          "_blank",
        );
      });
    }
  }

  // ======================== INITIALISIERUNG ========================

  function initFooter() {
    console.log("📌 Footer wird initialisiert...");

    // Event Listener für rechtliche Links
    const impressumLink = document.getElementById("openImpressum");
    if (impressumLink) {
      impressumLink.addEventListener("click", (e) => {
        e.preventDefault();
        showImpressum();
      });
    }

    const datenschutzLink = document.getElementById("openDatenschutz");
    if (datenschutzLink) {
      datenschutzLink.addEventListener("click", (e) => {
        e.preventDefault();
        showDatenschutz();
      });
    }

    const nutzungsbedingungenLink = document.getElementById(
      "openNutzungsbedingungen",
    );
    if (nutzungsbedingungenLink) {
      nutzungsbedingungenLink.addEventListener("click", (e) => {
        e.preventDefault();
        showNutzungsbedingungen();
      });
    }

    // Changelog
    const changelogLink = document.getElementById("showChangelogLink");
    if (changelogLink) {
      changelogLink.addEventListener("click", (e) => {
        e.preventDefault();
        showChangelog();
      });
    }

    // Update Check
    const updateBtn = document.getElementById("checkForUpdatesBtn");
    if (updateBtn) {
      updateBtn.addEventListener("click", checkForUpdates);
    }

    // Externe Links
    initExternalLinks();

    // Kontaktformular
    initContactForm();

    // Donation
    initFooterDonation();

    // Storage Info
    updateStorageInfo();
    updateLastExportTime();

    // Export-Funktion erweitern
    enhanceExportFunction();

    // Storage-Info regelmäßig aktualisieren
    setInterval(updateStorageInfo, 10000);

    console.log("✅ Footer erfolgreich initialisiert!");
  }

  // Starte Initialisierung wenn DOM bereit
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFooter);
  } else {
    initFooter();
  }

  // Globale Funktionen exportieren
  window.showChangelog = showChangelog;
  window.checkForUpdates = checkForUpdates;
})();
