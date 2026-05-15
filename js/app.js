// ── App State ─────────────────────────────────────────────────────────────────
const assessmentData = {
    set1: [],       // DISC responses [{id, order:[...]}]
    set2: [],       // Motivator responses [{id, order:[...]}]
    userName: '',
    userCountryCode: '',
    userPhone: '',
    language: 'en'
};

// ── Bootstrap ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('assessmentForm')) return; // skip on report page
    setupLanguageButtons();
    renderDiscQuestions();
    renderMotivatorQuestions();
    setupInfoListeners();
    updateProgress();
});

// ── Language Switcher ─────────────────────────────────────────────────────────
function setupLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            window.__appLang = lang;
            assessmentData.language = lang;
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyTranslations();
        });
    });
}

function applyTranslations() {
    // Static labels
    const map = {
        '#quiz-title':            t('title'),
        '#quiz-subtitle':         t('subtitle'),
        '#part1-heading':         t('part1'),
        '#part2-heading':         t('part2'),
        '#info-heading':          t('yourInfo'),
        '#lang-heading':          t('reportLang'),
        '#label-name':            t('fullName'),
        '#label-phone':           t('countryCode'),
        '#instructions-disc':     t('instructionsDisc'),
        '#instructions-mot':      t('instructionsMot'),
        '#required-label':        t('required'),
        '#required-info':         t('requiredInfo'),
        '#submitBtn':             null, // handled by updateProgress
    };
    Object.entries(map).forEach(([sel, val]) => {
        const el = document.querySelector(sel);
        if (el && val !== null) el.textContent = val;
    });

    const nameInput  = document.getElementById('userName');
    const phoneInput = document.getElementById('userPhone');
    if (nameInput)  nameInput.placeholder  = t('namePlaceholder');
    if (phoneInput) phoneInput.placeholder = t('phonePlaceholder');

    // Re-label question headings
    document.querySelectorAll('#discQuestions .question h3').forEach((el, i) => {
        el.textContent = t('discQ', i + 1);
    });
    document.querySelectorAll('#motivatorQuestions .question h3').forEach((el, i) => {
        el.textContent = t('motQ', i + 1);
    });

    // Update DISC option texts and descriptions (keep rank-indicator span intact)
    document.querySelectorAll('#discQuestions .option').forEach(el => {
        const engText  = el.dataset.option;
        // Update main text
        const textDiv  = el.querySelector('.option-text');
        if (textDiv) {
            const rankSpan = textDiv.querySelector('.rank-indicator');
            textDiv.textContent = getQTranslation(engText, 'disc');
            if (rankSpan) textDiv.prepend(rankSpan);
        }
        // Update description (use data-orig-desc to always have English source)
        const descDiv = el.querySelector('.option-description');
        if (descDiv) {
            const origDesc = descDiv.dataset.origDesc || descDiv.textContent;
            descDiv.textContent = getDescTranslation(engText, origDesc);
        }
    });

    // Update Motivator option texts (keep rank-number span intact)
    document.querySelectorAll('#motivatorQuestions .option').forEach(el => {
        const engText  = el.dataset.option;
        const rankSpan = el.querySelector('.rank-number');
        // Remove old text nodes, keep the span
        Array.from(el.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .forEach(n => el.removeChild(n));
        el.append(' ' + getQTranslation(engText, 'motivator'));
    });

    updateProgress();
}

// ── Render DISC Questions ─────────────────────────────────────────────────────
function renderDiscQuestions() {
    const container = document.getElementById('discQuestions');
    container.innerHTML = '';
    DISC_QUESTIONS.forEach((q, idx) => {
        const div = document.createElement('div');
        div.className = 'question';
        div.innerHTML = `
            <h3>${t('discQ', idx + 1)}</h3>
            <div class="options" data-question-id="${q.id}" data-type="disc">
                ${q.options.map(opt => `
                    <div class="option" data-option="${escHtml(opt.text)}" data-question="${q.id}">
                        <div class="option-text">${escHtml(getQTranslation(opt.text, 'disc'))}</div>
                        <div class="option-description" data-orig-desc="${escHtml(opt.description)}">${escHtml(getDescTranslation(opt.text, opt.description))}</div>
                    </div>
                `).join('')}
            </div>`;
        container.appendChild(div);
        setupDiscListeners(div, q.id);
    });
}

function setupDiscListeners(qDiv, qId) {
    const opts = qDiv.querySelectorAll('.option');
    let order  = [];
    opts.forEach(opt => {
        opt.addEventListener('click', () => {
            const text = opt.dataset.option;
            const cur  = order.indexOf(text);
            if (cur !== -1) order.splice(cur, 1); else order.push(text);
            refreshDiscOptions(opts, order);
            saveDiscResponse(qId, order);
            updateProgress();
        });
    });
}

function refreshDiscOptions(opts, order) {
    opts.forEach(opt => {
        const text  = opt.dataset.option;
        const rank  = order.indexOf(text);
        opt.className = 'option';
        const indicator = opt.querySelector('.rank-indicator');
        if (indicator) indicator.remove();
        if (rank !== -1) {
            opt.classList.add(`rank-${rank + 1}`);
            const span = document.createElement('span');
            span.className = 'rank-indicator';
            span.style.cssText = 'font-weight:700;margin-right:6px;font-size:0.85em;';
            span.textContent = `${rank + 1}. `;
            opt.querySelector('.option-text').prepend(span);
        }
    });
}

function saveDiscResponse(qId, order) {
    const idx = assessmentData.set1.findIndex(r => r.id === qId);
    const rec = { id: qId, order: [...order] };
    if (idx !== -1) assessmentData.set1[idx] = rec; else assessmentData.set1.push(rec);
}

// ── Render Motivator Questions ────────────────────────────────────────────────
function renderMotivatorQuestions() {
    const container = document.getElementById('motivatorQuestions');
    container.innerHTML = '';
    MOTIVATOR_QUESTIONS.forEach((q, idx) => {
        const div = document.createElement('div');
        div.className = 'question';
        div.innerHTML = `
            <h3>${t('motQ', idx + 1)}</h3>
            <div class="options" data-question-id="${q.id}" data-type="motivator">
                ${q.options.map(opt => `
                    <div class="option" data-option="${escHtml(opt.text)}" data-question="${q.id}">
                        <span class="rank-number"></span>${escHtml(getQTranslation(opt.text, 'motivator'))}
                    </div>
                `).join('')}
            </div>`;
        container.appendChild(div);
        setupMotListeners(div, q.id);
    });
}

function setupMotListeners(qDiv, qId) {
    const opts = qDiv.querySelectorAll('.option');
    let order  = [];
    opts.forEach(opt => {
        opt.addEventListener('click', () => {
            const text = opt.dataset.option;
            const cur  = order.indexOf(text);
            if (cur !== -1) order.splice(cur, 1); else if (order.length < 6) order.push(text);
            refreshMotOptions(opts, order);
            saveMotResponse(qId, order);
            updateProgress();
        });
    });
}

function refreshMotOptions(opts, order) {
    opts.forEach(opt => {
        const text = opt.dataset.option;
        const rank = order.indexOf(text);
        opt.className = 'option';
        const span = opt.querySelector('.rank-number');
        if (rank !== -1) {
            opt.classList.add(`rank-${rank + 1}`);
            span.textContent = `${rank + 1}. `;
        } else {
            span.textContent = '';
        }
    });
}

function saveMotResponse(qId, order) {
    const idx = assessmentData.set2.findIndex(r => r.id === qId);
    const rec = { id: qId, order: [...order] };
    if (idx !== -1) assessmentData.set2[idx] = rec; else assessmentData.set2.push(rec);
}

// ── Info Listeners ────────────────────────────────────────────────────────────
function setupInfoListeners() {
    const nameEl    = document.getElementById('userName');
    const countryEl = document.getElementById('userCountryCode');
    const phoneEl   = document.getElementById('userPhone');
    const langEl    = document.getElementById('reportLanguage');
    const form      = document.getElementById('assessmentForm');

    if (nameEl)    nameEl.addEventListener('input',  e => { assessmentData.userName = e.target.value.trim(); updateProgress(); });
    if (countryEl) countryEl.addEventListener('change', e => { assessmentData.userCountryCode = e.target.value; updateProgress(); });
    if (phoneEl)   phoneEl.addEventListener('input',  e => { assessmentData.userPhone = e.target.value.trim(); updateProgress(); });
    if (langEl)    langEl.addEventListener('change',  e => { assessmentData.language = e.target.value; });
    if (form)      form.addEventListener('submit', handleSubmit);
}

// ── Progress & Submit Button ──────────────────────────────────────────────────
function updateProgress() {
    // Per-question visual completion indicators
    document.querySelectorAll('#discQuestions .question').forEach((qDiv, i) => {
        const resp = assessmentData.set1.find(r => r.id === DISC_QUESTIONS[i]?.id);
        qDiv.classList.toggle('question-complete', !!(resp && resp.order.length === 4));
    });
    document.querySelectorAll('#motivatorQuestions .question').forEach((qDiv, i) => {
        const resp = assessmentData.set2.find(r => r.id === MOTIVATOR_QUESTIONS[i]?.id);
        qDiv.classList.toggle('question-complete', !!(resp && resp.order.length === 6));
    });

    const discDone   = assessmentData.set1.filter(r => r.order.length === 4).length;
    const motDone    = assessmentData.set2.filter(r => r.order.length === 6).length;
    const hasName    = assessmentData.userName.length > 0;
    const hasCountry = assessmentData.userCountryCode.length > 0;
    const hasPhone   = assessmentData.userPhone.length > 0;

    const discPct  = (discDone / DISC_QUESTIONS.length) * 100;
    const motPct   = (motDone  / MOTIVATOR_QUESTIONS.length) * 100;

    const dpEl = document.getElementById('discProgress');
    const mpEl = document.getElementById('motivatorProgress');
    if (dpEl) dpEl.style.width = `${discPct}%`;
    if (mpEl) mpEl.style.width = `${motPct}%`;

    const btn      = document.getElementById('submitBtn');
    const complete = discDone === DISC_QUESTIONS.length &&
                     motDone  === MOTIVATOR_QUESTIONS.length &&
                     hasName && hasCountry && hasPhone;
    if (btn) {
        btn.disabled = !complete;
        if (complete) {
            btn.textContent = t('submit');
        } else {
            const missing = [];
            if (discDone < DISC_QUESTIONS.length)        missing.push(`DISC: ${discDone}/${DISC_QUESTIONS.length}`);
            if (motDone  < MOTIVATOR_QUESTIONS.length)   missing.push(`Motivators: ${motDone}/${MOTIVATOR_QUESTIONS.length}`);
            if (!hasName)    missing.push('Name required');
            if (!hasCountry) missing.push('Country code required');
            if (!hasPhone)   missing.push('Phone required');
            btn.textContent = `${t('submit')} (${missing.join(', ')})`;
        }
    }

    // "Find first incomplete question" helper button
    const submitSection = document.querySelector('.submit-section');
    let findBtn = document.getElementById('findIncompleteBtn');
    if (!complete && submitSection) {
        if (!findBtn) {
            findBtn = document.createElement('button');
            findBtn.id   = 'findIncompleteBtn';
            findBtn.type = 'button';
            findBtn.className = 'btn-find-incomplete';
            submitSection.appendChild(findBtn);
            findBtn.addEventListener('click', scrollToFirstIncomplete);
        }
        const lang = getLang();
        findBtn.textContent = lang === 'zh-CN' ? '👆 找到第一个未完成的题目' :
                              lang === 'ms'    ? '👆 Cari soalan pertama yang belum selesai' :
                                                 '👆 Find first incomplete question';
    } else if (findBtn) {
        findBtn.remove();
    }
}

function scrollToFirstIncomplete() {
    for (let i = 0; i < DISC_QUESTIONS.length; i++) {
        const resp = assessmentData.set1.find(r => r.id === DISC_QUESTIONS[i].id);
        if (!resp || resp.order.length < 4) {
            document.querySelectorAll('#discQuestions .question')[i]
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
    }
    for (let i = 0; i < MOTIVATOR_QUESTIONS.length; i++) {
        const resp = assessmentData.set2.find(r => r.id === MOTIVATOR_QUESTIONS[i].id);
        if (!resp || resp.order.length < 6) {
            document.querySelectorAll('#motivatorQuestions .question')[i]
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
    }
    if (!assessmentData.userName)
        document.getElementById('userName')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    else if (!assessmentData.userPhone)
        document.getElementById('userPhone')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── Form Submit → Generate Report ────────────────────────────────────────────
function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="loading"></span>Generating Report…';

    setTimeout(() => {
        try {
            // Use reportLanguage dropdown if set, else fall back to UI language
            const reportLang = document.getElementById('reportLanguage')?.value || assessmentData.language || 'en';
            assessmentData.language = reportLang;

            const discRaw = calculateDISC(assessmentData.set1);
            const motRaw  = calculateMotivators(assessmentData.set2);
            const html    = generateReport(assessmentData, discRaw, motRaw);
            document.open();
            document.write(html);
            document.close();
        } catch (err) {
            console.error(err);
            alert('Error generating report. Please try again.');
            btn.disabled = false;
            btn.textContent = t('submit');
        }
    }, 400);
}


// ── Helpers ───────────────────────────────────────────────────────────────────
function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

window.handleSubmit = handleSubmit;
