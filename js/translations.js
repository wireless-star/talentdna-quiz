const TRANSLATIONS = {
    en: {
        title:              "DNA Motivator DISC Personality Test Assessment",
        subtitle:           "Discover your personality traits and motivational drivers",
        part1:              "Part 1: DISC Assessment",
        part2:              "Part 2: Motivators Assessment",
        yourInfo:           "Your Information",
        reportLang:         "Report Language",
        fullName:           "Full Name *",
        countryCode:        "Country Code & Phone Number *",
        namePlaceholder:    "Enter your full name",
        phonePlaceholder:   "Enter your phone number",
        submit:             "Complete Assessment",
        instructionsDisc:   'For each group of words, rank them by clicking in order from "Most like you" (1 - Green) to "Least like you" (4 - Red).',
        instructionsMot:    "For each group of statements, rank them from 1 (most important to you) to 6 (least important to you).",
        required:           "Required:",
        requiredInfo:       "Please enter your full name and phone number before submitting.",
        discQ:              (n) => `Question ${n}: Click to rank from 1st (most like you) to 4th (least like you)`,
        motQ:               (n) => `Question ${n}: Rank from 1 (most important) to 6 (least important)`,
        proceed:            "Proceed to Assessment",
        instructions_title: "Before You Start",
        instructions_label: "I have read and understood all the instructions. I am ready to begin.",
        scroll_hint:        "👆 Please scroll through all instructions above"
    },
    "zh-CN": {
        title:              "DNA Motivator DISC 人格测试",
        subtitle:           "发现您的性格特征和动机驱动因素",
        part1:              "第一部分：DISC 评估",
        part2:              "第二部分：动机评估",
        yourInfo:           "您的信息",
        reportLang:         "报告语言",
        fullName:           "姓名 *",
        countryCode:        "国家代码 & 电话号码 *",
        namePlaceholder:    "请输入您的全名",
        phonePlaceholder:   "请输入您的电话号码",
        submit:             "完成评估",
        instructionsDisc:   '对于每组词语，请按照从"最像您"（1 - 绿色）到"最不像您"（4 - 红色）的顺序点击排序。',
        instructionsMot:    "对于每组陈述，请按照从1（最重要）到6（最不重要）的顺序排序。",
        required:           "必填：",
        requiredInfo:       "请在提交前输入您的全名和电话号码。",
        discQ:              (n) => `第 ${n} 题：点击排序，从第1（最像您）到第4（最不像您）`,
        motQ:               (n) => `第 ${n} 题：从1（最重要）到6（最不重要）排序`,
        proceed:            "开始评估",
        instructions_title: "开始之前",
        instructions_label: "我已阅读并理解所有说明，准备好开始评估。",
        scroll_hint:        "👆 请向下滚动阅读所有说明"
    },
    ms: {
        title:              "Ujian Personaliti DNA Motivator DISC",
        subtitle:           "Temui ciri personaliti dan pendorong motivasi anda",
        part1:              "Bahagian 1: Penilaian DISC",
        part2:              "Bahagian 2: Penilaian Motivator",
        yourInfo:           "Maklumat Anda",
        reportLang:         "Bahasa Laporan",
        fullName:           "Nama Penuh *",
        countryCode:        "Kod Negara & Nombor Telefon *",
        namePlaceholder:    "Masukkan nama penuh anda",
        phonePlaceholder:   "Masukkan nombor telefon anda",
        submit:             "Lengkapkan Penilaian",
        instructionsDisc:   'Untuk setiap kumpulan perkataan, pangkatkan dari "Paling seperti anda" (1-Hijau) ke "Paling tidak seperti anda" (4-Merah).',
        instructionsMot:    "Untuk setiap kumpulan kenyataan, pangkatkan dari 1 (paling penting) hingga 6 (paling tidak penting).",
        required:           "Wajib:",
        requiredInfo:       "Sila masukkan nama penuh dan nombor telefon sebelum menghantar.",
        discQ:              (n) => `Soalan ${n}: Klik untuk pangkat dari ke-1 (paling seperti anda) ke ke-4 (paling tidak seperti anda)`,
        motQ:               (n) => `Soalan ${n}: Pangkat dari 1 (paling penting) ke 6 (paling tidak penting)`,
        proceed:            "Teruskan ke Penilaian",
        instructions_title: "Sebelum Anda Mula",
        instructions_label: "Saya telah membaca dan memahami semua arahan. Saya bersedia untuk memulakan.",
        scroll_hint:        "👆 Sila tatal melalui semua arahan di atas"
    }
};

function getLang() {
    return window.__appLang || 'en';
}

function t(key, ...args) {
    const lang = getLang();
    const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    const val  = dict[key] !== undefined ? dict[key] : (TRANSLATIONS['en'][key] || key);
    return typeof val === 'function' ? val(...args) : val;
}

window.TRANSLATIONS = TRANSLATIONS;
window.t = t;
window.getLang = getLang;
