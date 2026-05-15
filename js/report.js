function _esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function generateReport(data, discRaw, motRaw) {
    const lang     = data.language || window.__appLang || 'en';
    const i18n     = (window.REPORT_I18N && window.REPORT_I18N[lang]) || window.REPORT_I18N['en'];
    const ui       = i18n.ui;
    const discI18n = i18n.disc;
    const motI18n  = i18n.mot;
    const dyn      = i18n.dyn;

    const name = data.userName;
    const date = new Date().toLocaleDateString(
        lang === 'zh-CN' ? 'zh-CN' : lang === 'ms' ? 'ms-MY' : 'en-GB',
        { day:'numeric', month:'long', year:'numeric' }
    );

    const discSorted = sortedKeys(discRaw);
    const motSorted  = sortedKeys(motRaw);
    const primary    = discSorted[0];
    const secondary  = discSorted[1];
    const topMot     = motSorted[0];
    const topMot2    = motSorted[1];

    const discInfo = discI18n[primary];
    const motInfo  = motI18n[topMot];
    const mot2Info = motI18n[topMot2];

    // DNA summary
    const comboKey  = `${primary}-${topMot}`;
    const comboFn   = i18n.combos[comboKey];
    const dnaSummary = comboFn ? comboFn(name) :
        (lang === 'zh-CN'
            ? `${name}是${discInfo.tagline}行为与${motInfo.label}动机的独特结合——这是一种强大的组合，推动卓越成果。`
            : lang === 'ms'
            ? `${name} adalah gabungan unik tingkah laku ${discInfo.tagline} dan motivasi ${motInfo.label} — kombinasi yang kuat untuk hasil berimpak.`
            : `${name} is a unique blend of ${discInfo.tagline} behavior and ${motInfo.label} motivation — a powerful combination.`);

    // DISC bars
    const discColors = { D:'disc-D', I:'disc-I', S:'disc-S', C:'disc-C' };
    const discBars = discSorted.map(type => {
        const pct = normDisc(discRaw[type]);
        return `<div class="disc-bar-row ${discColors[type]}">
            <div class="disc-label">${discI18n[type].label}</div>
            <div class="disc-bar-track"><div class="disc-bar-fill" style="width:${pct}%">${pct}%</div></div>
            <div class="disc-score-label">${discRaw[type]>0?'+':''}${discRaw[type]}</div>
        </div>`;
    }).join('');

    // Motivator bars
    const motBars = motSorted.map(type => {
        const pct = normMot(motRaw[type]);
        return `<div class="mot-bar-row mot-${type}">
            <div class="mot-label">${motI18n[type].label}</div>
            <div class="mot-bar-track"><div class="mot-bar-fill" style="width:${pct}%"></div></div>
            <div class="mot-score-label">${motRaw[type]} / 60</div>
        </div>`;
    }).join('');

    // Tags
    const strengthTags = (discInfo.strengths||[]).map(s=>`<span class="tag strength">${s}</span>`).join('');
    const watchTags    = (discInfo.watchouts||[]).map(s=>`<span class="tag watchout">${s}</span>`).join('');
    const motDriveTags = (motInfo.drives||[]).map(s=>`<span class="tag motivator">${s}</span>`).join('');

    // Dynamic insight sentences
    const driveP  = dyn.drive[primary]  || '';
    const thriveP = dyn.thrive[primary] || '';
    const topMotP = dyn.topMot[topMot]  || '';
    const superpowerTxt = dyn.superpower(discInfo.strengths[0], motInfo.drives[0], driveP);
    const growthTxt     = dyn.growth(discInfo.watchouts[0], mot2Info && mot2Info.label);
    const thriveTxt     = dyn.thriveTpl(thriveP, topMotP);
    const riskTxt       = dyn.risk(discInfo.watchouts[1]||discInfo.watchouts[0], mot2Info && mot2Info.label);

    // Language switcher for report header
    const langBtns = [['en','🇬🇧 English'],['zh-CN','🇨🇳 中文'],['ms','🇲🇾 Bahasa']].map(([l,label]) =>
        `<button class="lang-btn${l===lang?' active':''}" onclick="switchReportLang('${l}')">${label}</button>`
    ).join('');

    // Saved data blob embedded in page for language switching
    const savedBlob = _esc(JSON.stringify({ data, discRaw, motRaw }));

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Talent DNA Report — ${_esc(name)}</title>
<link rel="stylesheet" href="css/styles.css">
<style>body{background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);min-height:100vh;padding-bottom:40px;}</style>
</head>
<body>
<div class="report-container">

  <div class="report-header">
    <div class="report-title">${ui.reportTitle}</div>
    <div class="report-name">${_esc(name)}</div>
    <div class="report-date">${date}</div>
    <div class="language-selector" style="margin-top:14px;">${langBtns}</div>
  </div>

  <div class="report-section">
    <h2>${ui.discSection}</h2>
    <div class="disc-chart">${discBars}</div>
    <div class="type-card">
      <h3>${discInfo.emoji} ${ui.primaryStyle}: ${discInfo.label} — &ldquo;${discInfo.tagline}&rdquo;</h3>
      <p>${discInfo.summary}</p>
      <div class="tag-row">${strengthTags}</div>
      <div class="tag-row">${watchTags}</div>
    </div>
    ${secondary ? `<div class="type-card" style="margin-top:12px;border-left-color:#4b5563;">
      <h3>${discI18n[secondary].emoji} ${ui.secondaryStyle}: ${discI18n[secondary].label}</h3>
      <p style="font-size:0.9rem;color:#9ca3af;">${discI18n[secondary].summary}</p>
    </div>` : ''}
  </div>

  <div class="report-section">
    <h2>${ui.commSection}</h2>
    <div class="insight-grid">
      <div class="insight-card"><h4>${ui.commWith(_esc(name))}</h4><p>${discInfo.communicationTip}</p></div>
      <div class="insight-card"><h4>${ui.whatMotivates(_esc(name))}</h4><p>${discInfo.motivatedBy}</p></div>
    </div>
  </div>

  <div class="report-section">
    <h2>${ui.motSection}</h2>
    <div class="motivator-chart">${motBars}</div>
    <div class="type-card">
      <h3>${motInfo.emoji} ${ui.topMot}: ${motInfo.label}</h3>
      <p>${motInfo.summary}</p>
      <div class="tag-row">${motDriveTags}</div>
    </div>
    ${mot2Info ? `<div class="type-card" style="margin-top:12px;border-left-color:#4b5563;">
      <h3>${mot2Info.emoji} ${ui.secondMot}: ${mot2Info.label}</h3>
      <p style="font-size:0.9rem;color:#9ca3af;">${mot2Info.summary}</p>
    </div>` : ''}
  </div>

  <div class="report-section">
    <h2>${ui.dnaSection}</h2>
    <div class="dna-badge">${discInfo.emoji} ${primary} &nbsp;+&nbsp; ${motInfo.emoji} ${motI18n[topMot].label}</div>
    <p style="color:#d1d5db;line-height:1.8;font-size:1rem;">${dnaSummary}</p>
    <div class="insight-grid" style="margin-top:20px;">
      <div class="insight-card"><h4>${ui.superpower}</h4><p>${superpowerTxt}</p></div>
      <div class="insight-card"><h4>${ui.growthEdge}</h4><p>${growthTxt}</p></div>
      <div class="insight-card"><h4>${ui.idealEnv}</h4><p>${thriveTxt}</p></div>
      <div class="insight-card"><h4>${ui.biggestRisk}</h4><p>${riskTxt}</p></div>
    </div>
  </div>

  ${window.generateDeepSummary ? window.generateDeepSummary(discRaw, motRaw, name, lang) : ''}

  <div class="report-actions">
    <button class="btn-print" onclick="window.print()">${ui.printBtn}</button>
    <button class="btn-retake" onclick="window.location.href='index.html'">${ui.retakeBtn}</button>
  </div>

</div>

<script src="js/scoring.js"><\/script>
<script src="js/report-translations.js"><\/script>
<script src="js/deep-summary.js"><\/script>
<script src="js/report.js"><\/script>
<script>
  var __savedResult = JSON.parse(decodeURIComponent('${encodeURIComponent(JSON.stringify({ data, discRaw, motRaw }))}'));
  function switchReportLang(lang) {
    __savedResult.data.language = lang;
    var html = generateReport(__savedResult.data, __savedResult.discRaw, __savedResult.motRaw);
    document.open(); document.write(html); document.close();
  }
<\/script>
</body>
</html>`;
}

window.generateReport = generateReport;
