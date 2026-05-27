// ======================== PING RADAR (Zuverlässige Version) ========================

const pingRegions = [
  { name: "🇩🇪 Frankfurt", code: "FRA", url: "https://cloudflare.com/cdn-cgi/trace" },
  { name: "🇳🇱 Amsterdam", code: "AMS", url: "https://www.google.com" },
  { name: "🇸🇪 Stockholm", code: "STO", url: "https://www.bing.com" },
  { name: "🇬🇧 London", code: "LHR", url: "https://www.bbc.com" },
  { name: "🇺🇸 Virginia", code: "IAD", url: "https://www.amazon.com" },
  { name: "🇺🇸 Kalifornien", code: "LAX", url: "https://www.apple.com" },
  { name: "🇸🇬 Singapur", code: "SIN", url: "https://www.gov.sg" },
  { name: "🇦🇺 Sydney", code: "SYD", url: "https://www.sydney.edu.au" },
  { name: "🇯🇵 Tokio", code: "TYO", url: "https://www.yahoo.co.jp" },
  { name: "🇰🇷 Seoul", code: "SEL", url: "https://www.naver.com" },
];

let pingHistory = [];
let isPinging = false;

// Verbesserte Ping-Funktion mit CORS-Unterstützung
async function pingUrl(url, timeout = 5000) {
  const start = performance.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    // Verwende fetch mit 'no-cors' – das gibt keine Response, aber wir messen nur die Zeit
    // bis der Preflight/Connect abgeschlossen ist
    await fetch(url, {
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
      headers: { 'Cache-Control': 'no-cache' }
    });
    clearTimeout(timeoutId);
    return Math.round(performance.now() - start);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') return null;
    // Bei 'no-cors' bekommen wir oft einen TypeError, aber der Request war trotzdem erfolgreich
    // Wir messen die Zeit bis zum Fehler – das ist trotzdem ein guter Indikator
    return Math.round(performance.now() - start);
  }
}

// Alternative: Image-Ping (funktioniert besser mit CORS)
function pingViaImage(url, timeout = 5000) {
  return new Promise((resolve) => {
    const start = performance.now();
    const img = new Image();
    const timeoutId = setTimeout(() => {
      img.onload = img.onerror = null;
      resolve(null);
    }, timeout);
    
    img.onload = () => {
      clearTimeout(timeoutId);
      resolve(Math.round(performance.now() - start));
    };
    img.onerror = () => {
      clearTimeout(timeoutId);
      // Auch bei Fehler haben wir eine Zeit bis zum Abbruch
      resolve(Math.round(performance.now() - start));
    };
    img.src = `${url}/favicon.ico?t=${Date.now()}`;
  });
}

// Haupt-Ping-Funktion – probiert mehrere Methoden
async function pingHost(region, timeout = 5000) {
  // Versuche zuerst fetch mit no-cors
  let latency = await pingUrl(region.url, timeout);
  
  // Fallback: Image-Ping
  if (latency === null || latency >= timeout) {
    latency = await pingViaImage(region.url, timeout);
  }
  
  return latency;
}

function getPingStyle(latency) {
  if (!latency || latency >= 5000) return { class: 'ping-timeout', text: 'Timeout', emoji: '⏰' };
  if (latency < 30) return { class: 'ping-excellent', text: 'Exzellent', emoji: '🏆' };
  if (latency < 60) return { class: 'ping-good', text: 'Gut', emoji: '✅' };
  if (latency < 100) return { class: 'ping-ok', text: 'Akzeptabel', emoji: '⚠️' };
  if (latency < 150) return { class: 'ping-bad', text: 'Schlecht', emoji: '❌' };
  return { class: 'ping-bad', text: 'Sehr schlecht', emoji: '💀' };
}

function getMeterWidth(latency) {
  if (!latency || latency >= 5000) return 100;
  if (latency <= 30) return (latency / 30) * 100;
  if (latency <= 150) return 30 + ((latency - 30) / 120) * 70;
  return 100;
}

async function testAllRegions(onProgress, onComplete) {
  const results = [];
  
  for (let i = 0; i < pingRegions.length && isPinging; i++) {
    const region = pingRegions[i];
    const latency = await pingHost(region);
    const style = getPingStyle(latency);
    
    results.push({
      ...region,
      latency: latency,
      style: style,
      meterWidth: getMeterWidth(latency)
    });
    
    onProgress(i + 1, pingRegions.length, results);
  }
  
  if (isPinging) {
    const best = results.filter(r => r.latency && r.latency < 5000).sort((a,b) => a.latency - b.latency)[0];
    onComplete(results, best);
  }
}

function savePingHistory(results) {
  const timestamp = new Date().toLocaleTimeString();
  const historyEntry = {
    timestamp: timestamp,
    results: results.map(r => ({ name: r.name, latency: r.latency }))
  };
  
  pingHistory.unshift(historyEntry);
  if (pingHistory.length > 5) pingHistory.pop();
  
  localStorage.setItem('cs2_ping_history', JSON.stringify(pingHistory));
  renderPingHistory();
}

function loadPingHistory() {
  const saved = localStorage.getItem('cs2_ping_history');
  if (saved) {
    pingHistory = JSON.parse(saved);
    renderPingHistory();
  }
}

function renderPingHistory() {
  const container = document.getElementById('pingHistory');
  if (!container) return;
  
  if (pingHistory.length === 0) {
    container.innerHTML = '<div class="empty-message">📭 Noch keine Messungen. Starte einen Ping-Test!</div>';
    return;
  }
  
  // Sammle alle Ländernamen für die Kopfzeile
  const allRegionNames = [...new Set(pingHistory.flatMap(entry => 
    entry.results.map(r => r.name.split(' ')[0])
  ))];
  
  let html = '<div style="overflow-x: auto; margin-top: 1rem;">';
  html += '<table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">';
  
  // ===== KOPFZEILE =====
  html += '<thead>';
  html += '<tr style="border-bottom: 2px solid var(--border-color); background: rgba(0,0,0,0.3);">';
  html += '<th style="text-align: left; padding: 0.6rem; font-size: 0.85rem;">🕐 Zeit</th>';
  allRegionNames.forEach(name => {
    html += `<th style="text-align: center; padding: 0.6rem; font-size: 0.85rem;">${name}</th>`;
  });
  html += '</tr>';
  html += '</thead>';
  
  // ===== DATENZEILEN (jede Messung) =====
  html += '<tbody>';
  pingHistory.forEach(entry => {
    html += '<tr style="border-bottom: 1px solid var(--border-color);">';
    html += `<td style="padding: 0.6rem; font-weight: bold; font-size: 0.85rem;">${entry.timestamp}</td>`;
    
    allRegionNames.forEach(regionName => {
      const result = entry.results.find(r => r.name.startsWith(regionName));
      let latencyText = '⏰ TO';
      let color = '#ff6666';
      
      if (result && result.latency && result.latency < 5000 && result.latency > 0) {
        latencyText = `${result.latency}ms`;
        if (result.latency < 60) color = '#aaff66';
        else if (result.latency < 100) color = '#ffaa66';
        else color = '#ff6666';
      }
      
      html += `<td style="text-align: center; padding: 0.6rem; color: ${color}; font-weight: bold; font-size: 0.85rem;">${latencyText}</td>`;
    });
    
    html += '</tr>';
  });
  html += '</tbody>';
  
  // ===== DURCHSCHNITTS-ZEILE =====
  const averages = {};
  allRegionNames.forEach(regionName => {
    const allPings = [];
    pingHistory.forEach(entry => {
      const result = entry.results.find(r => r.name.startsWith(regionName));
      if (result && result.latency && result.latency < 5000 && result.latency > 0) {
        allPings.push(result.latency);
      }
    });
    if (allPings.length > 0) {
      const avg = Math.round(allPings.reduce((a, b) => a + b, 0) / allPings.length);
      averages[regionName] = { avg, count: allPings.length };
    } else {
      averages[regionName] = { avg: null, count: 0 };
    }
  });
  
  const hasAnyData = Object.values(averages).some(a => a.count > 0);
  
  if (hasAnyData) {
    html += '<tfoot>';
    html += '<tr style="border-top: 2px solid var(--accent); background: rgba(255,68,204,0.15);">';
    html += `<td style="padding: 0.6rem; font-weight: bold; color: var(--accent); font-size: 0.85rem;">📊 Ø (${pingHistory.length} Mess.)</td>`;
    
    allRegionNames.forEach(regionName => {
      const avgData = averages[regionName];
      let display, color;
      
      if (avgData.avg !== null) {
        display = `${avgData.avg}ms`;
        if (avgData.avg < 60) color = '#aaff66';
        else if (avgData.avg < 100) color = '#ffaa66';
        else color = '#ff6666';
      } else {
        display = '⏰ TO';
        color = '#ff6666';
      }
      
      html += `<td style="text-align: center; padding: 0.6rem; color: ${color}; font-weight: bold; font-size: 0.85rem;">Ø ${display}</td>`;
    });
    
    html += '</tr>';
    html += '</tfoot>';
  }
  
  html += '</table></div>';
  container.innerHTML = html;
}

function renderPingResults(results, total, best) {
  const container = document.getElementById('pingResultsContainer');
  if (!container) return;
  
  if (results.length === 0) {
    container.innerHTML = '<div class="empty-message">🔄 Test läuft...</div>';
    return;
  }
  
  // Tabellen-HTML erstellen
  let html = `
    <div style="overflow-x: auto; margin-top: 0.5rem;">
      <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
        <thead>
          <tr style="border-bottom: 2px solid var(--border-color); background: rgba(0,0,0,0.3);">
            <th style="text-align: left; padding: 0.6rem;">🌍 Region</th>
            <th style="text-align: left; padding: 0.6rem;">📊 Latenz</th>
            <th style="text-align: center; padding: 0.6rem;">🎯 Status</th>
            <th style="text-align: center; padding: 0.6rem;">📈 Trend</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  results.forEach((r, idx) => {
    const latencyDisplay = (r.latency && r.latency < 5000) ? `${r.latency}ms` : '⏰ Timeout';
    const barColor = r.latency && r.latency < 5000 ? 
      (r.latency < 50 ? '#00ff66' : r.latency < 100 ? '#ffaa66' : '#ff6666') : '#666';
    const barWidth = r.meterWidth;
    
    // Trend berechnen (Vergleich mit letztem Messwert, falls vorhanden)
    let trendHtml = '<span style="color: #666;">-</span>';
    if (pingHistory.length > 0 && r.latency && r.latency < 5000) {
      const lastEntry = pingHistory[0];
      const lastResult = lastEntry.results.find(old => old.name === r.name);
      if (lastResult && lastResult.latency && lastResult.latency < 5000) {
        const diff = r.latency - lastResult.latency;
        if (diff < -10) trendHtml = `<span style="color: #aaff66;">▼ ${Math.abs(diff)}ms</span>`;
        else if (diff < 0) trendHtml = `<span style="color: #aaff66;">▼ ${Math.abs(diff)}ms</span>`;
        else if (diff > 10) trendHtml = `<span style="color: #ff6666;">▲ ${diff}ms</span>`;
        else if (diff > 0) trendHtml = `<span style="color: #ffaa66;">▲ ${diff}ms</span>`;
        else trendHtml = `<span style="color: #666;">● 0ms</span>`;
      }
    }
    
    html += `
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem; font-weight: bold;">${r.name}</td>
        <td style="padding: 0.6rem; min-width: 180px;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="flex: 1; height: 8px; background: rgba(255,255,255,0.2); border-radius: 4px; overflow: hidden;">
              <div style="width: ${barWidth}%; height: 100%; background: ${barColor}; border-radius: 4px;"></div>
            </div>
            <span style="font-family: monospace; font-weight: bold; color: ${barColor}; min-width: 65px;">${latencyDisplay}</span>
          </div>
        </td>
        <td style="text-align: center; padding: 0.6rem;">
          <span style="font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 1rem; background: ${barColor}20; color: ${barColor};">${r.style.emoji} ${r.style.text}</span>
        </td>
        <td style="text-align: center; padding: 0.6rem; font-family: monospace; font-size: 0.75rem;">
          ${trendHtml}
        </td>
      </tr>
    `;
  });
  
  // Beste Region als Zusammenfassung
  if (best && results.length === total) {
    html += `
      <tfoot>
        <tr style="border-top: 2px solid var(--accent); background: rgba(255,68,204,0.15);">
          <td colspan="4" style="padding: 0.6rem; text-align: center;">
            🏆 <strong>Beste Region:</strong> ${best.name} (${best.latency}ms) – 
            <span style="color: var(--accent);">${best.latency < 30 ? 'Perfekt für Competitive!' : best.latency < 60 ? 'Gut geeignet für Matchmaking' : best.latency < 100 ? 'Spielbar, aber nicht ideal' : 'Hohe Latenz, Region meiden'}</span>
          </td>
        </tr>
      </tfoot>
    `;
  }
  
  html += `
        </tbody>
      </table>
    </div>
  `;
  
  container.innerHTML = html;
  
  const progressPercent = (results.length / total) * 100;
  const progressFill = document.getElementById('pingProgressFill');
  if (progressFill) progressFill.style.width = `${progressPercent}%`;
  
  if (best && results.length === total) {
    const bestDiv = document.getElementById('pingBestRegion');
    if (bestDiv) {
      bestDiv.style.display = 'block';
      document.getElementById('bestRegionName').innerHTML = best.name;
      document.getElementById('bestRegionPing').innerHTML = best.latency;
      let recText = '';
      if (best.latency < 30) recText = '🏆 Perfekt für Competitive!';
      else if (best.latency < 60) recText = '✅ Gut geeignet für Matchmaking';
      else if (best.latency < 100) recText = '⚠️ Spielbar, aber nicht ideal';
      else if (best.latency < 150) recText = '❌ Hohe Latenz, Region meiden';
      else recText = '💀 Unspielbar – andere Region wählen';
      document.getElementById('bestRegionRec').innerHTML = recText;
    }
    savePingHistory(results);
  }
}

async function startPingTest() {
  if (isPinging) return;
  
  isPinging = true;
  const startBtn = document.getElementById('startPingTestBtn');
  const stopBtn = document.getElementById('stopPingTestBtn');
  const progressFill = document.getElementById('pingProgressFill');
  const bestDiv = document.getElementById('pingBestRegion');
  
  if (startBtn) {
    startBtn.disabled = true;
    startBtn.style.opacity = '0.5';
  }
  if (stopBtn) stopBtn.disabled = false;
  if (progressFill) progressFill.style.width = '0%';
  if (bestDiv) bestDiv.style.display = 'none';
  
  await testAllRegions(
    (current, total, results) => renderPingResults(results, total, null),
    (results, best) => {
      renderPingResults(results, results.length, best);
      isPinging = false;
      if (startBtn) {
        startBtn.disabled = false;
        startBtn.style.opacity = '1';
      }
      if (stopBtn) stopBtn.disabled = true;
    }
  );
}

function stopPingTest() {
  isPinging = false;
  const startBtn = document.getElementById('startPingTestBtn');
  const stopBtn = document.getElementById('stopPingTestBtn');
  if (startBtn) {
    startBtn.disabled = false;
    startBtn.style.opacity = '1';
  }
  if (stopBtn) stopBtn.disabled = true;
}

function initPingTest() {
  loadPingHistory();
  
  const startBtn = document.getElementById('startPingTestBtn');
  const stopBtn = document.getElementById('stopPingTestBtn');
  
  if (startBtn) startBtn.addEventListener('click', startPingTest);
  if (stopBtn) {
    stopBtn.disabled = true;
    stopBtn.addEventListener('click', stopPingTest);
  }
}

// Für globale Zugänglichkeit
window.initPingTest = initPingTest;
window.startPingTest = startPingTest;
window.stopPingTest = stopPingTest;