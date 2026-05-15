// ── Deep Summary Generator ────────────────────────────────────────────────────
// Produces the detailed personality analysis section appended to the report.

(function () {

// ── Level helpers ──────────────────────────────────────────────────────────
function dLevel(p) { return p>=70?5: p>=55?4: p>=40?3: p>=25?2: 1; }
function mLevel(p) { return p>=65?3: p>=45?2: 1; }

// ── DISC content ───────────────────────────────────────────────────────────
const DISC_LEVELS = {
  "zh-CN": {
    D: {
      label: ["顺应型","温和型","平衡型","直接型","强势型"],
      desc:  [
        "天生倾向于支持他人，不喜欢主导或对抗。在熟悉的环境中表现最佳，适合执行而非领导。",
        "偏向合作，避免不必要的冲突。在压力下能坚持立场，但更倾向于寻求共识与和谐。",
        "在主导与配合之间灵活切换，能够推动事情，也懂得协作与妥协。",
        "果断直接，勇于挑战。喜欢掌控局面，直面问题，并迅速推动决策。可能对犹豫不决的人缺乏耐心。",
        "极度果断主导，勇于挑战一切。喜欢完全掌控全局，直接面对问题，并高速推动决策。对犹豫不决的人几乎毫无耐心。"
      ]
    },
    I: {
      label: ["保守型","内敛型","适中型","社交型","外向型"],
      desc:  [
        "倾向于安静、独立的工作方式，较少主动社交，在小而熟悉的圈子中最为自在。",
        "偏向独立思考，不太主动寻求社交。与人相处时较为谨慎，需要时间建立信任。",
        "在社交和独处之间保持平衡，能够主动交流，也能独立工作，适应力较强。",
        "友善开朗，乐于与人互动，具有较强的说服力，善于建立人际关系和团队氛围。",
        "热情、善谈、极具感染力。天生热衷与人交往，擅长通过个人魅力说服他人，渴望获得认可与赞赏。"
      ]
    },
    S: {
      label: ["求变型","变革型","平衡型","支持型","稳定型"],
      desc:  [
        "极度渴望变化和新挑战，对常规工作感到窒息。思维跳跃，精力旺盛，难以长期专注于同一方向。",
        "适应性强，但缺乏耐心。喜欢变化、多样性和新机遇，抵触重复性工作。通常行动迅速，但可能不够专注或持久。",
        "在稳定与变化之间保持平衡，能适应适度的变化，也能维持一定的规律。",
        "善于支持他人，耐心倾听。重视团队和谐，适应变化能力中等，是可靠的协作者。",
        "极度耐心、忠诚、可靠。是团队的情感支柱，渴望稳定与可预期性。对突发的剧烈变化有强烈的抵触情绪。"
      ]
    },
    C: {
      label: ["自由型","独立型","平衡型","精准型","系统型"],
      desc:  [
        "极度不喜欢规则和流程，完全凭直觉和个人判断行事。常被视为'打破规则'的人，对标准化流程感到窒息。",
        "独立、不拘泥于规则，凭直觉行事。不喜欢被僵化的流程束缚，更相信自己的判断而非既定标准。",
        "在规则和灵活性之间取得平衡，能够遵守必要的流程，也能应对变化和例外情况。",
        "重视质量和准确性，做事有条不紊。在需要分析和规划的场合表现出色，注重细节与标准。",
        "高度注重细节、流程和准确性，做事循规蹈矩，追求完美。对不按规则行事的人感到不满和困惑。"
      ]
    }
  },
  en: {
    D: {
      label: ["Passive","Gentle","Balanced","Direct","Dominant"],
      desc:  [
        "Naturally tends to support others rather than lead. Performs best in familiar, structured environments.",
        "Prefers collaboration and avoids unnecessary conflict. Can hold a position under pressure but seeks consensus.",
        "Flexibly switches between leading and cooperating. Can drive things forward while knowing when to step back.",
        "Decisive and direct, unafraid of challenges. Likes to be in control and drives decisions quickly. May lack patience for hesitant people.",
        "Extremely decisive and commanding. Thrives on full control and fast-paced decision-making. Has very little patience for indecision."
      ]
    },
    I: {
      label: ["Reserved","Introverted","Moderate","Social","Outgoing"],
      desc:  [
        "Prefers quiet, independent work. Least comfortable in large social settings; thrives in small trusted circles.",
        "Tends toward independent thinking. Cautious with new people; builds trust slowly but deeply.",
        "Balances social interaction with independent work. Adaptable and comfortable in both settings.",
        "Friendly and enthusiastic, skilled at building relationships and influencing others through genuine warmth.",
        "Energetic, talkative, and highly persuasive. Thrives on social connection, craves recognition, and naturally inspires others."
      ]
    },
    S: {
      label: ["Change-seeker","Change-oriented","Balanced","Supportive","Stable"],
      desc:  [
        "Craves constant change and new challenges. Routine work feels suffocating. High energy but struggles with long-term focus.",
        "Adaptable but impatient. Loves variety and new opportunities. Resists repetition; acts fast but may lack follow-through.",
        "Balances stability with change. Can handle moderate shifts while maintaining some structure and routine.",
        "Patient and supportive. Values team harmony. A reliable collaborator who adapts reasonably well to change.",
        "Deeply patient, loyal, and dependable. The emotional anchor of any team. Strongly resists sudden, dramatic change."
      ]
    },
    C: {
      label: ["Free-spirited","Independent","Balanced","Precise","Systematic"],
      desc:  [
        "Dislikes rules and process intensely. Acts entirely on instinct and personal judgment. Often seen as a rule-breaker.",
        "Independent and non-conformist. Trusts personal judgment over established standards. Dislikes rigid procedures.",
        "Balances structure with flexibility. Follows necessary processes but handles exceptions and changes well.",
        "Values quality and accuracy. Methodical and detail-oriented. Excels in analytical and planning tasks.",
        "Highly detail-oriented and process-driven. Pursues perfection and holds high standards for self and others."
      ]
    }
  },
  ms: {
    D: {
      label: ["Patuh","Lembut","Seimbang","Langsung","Dominan"],
      desc:  [
        "Secara semula jadi cenderung menyokong orang lain berbanding memimpin. Terbaik dalam persekitaran yang biasa dan terstruktur.",
        "Lebih suka bekerjasama dan mengelak konflik yang tidak perlu. Mencari persetujuan dan keharmonian.",
        "Fleksibel antara memimpin dan bekerjasama. Boleh menggerakkan sesuatu sambil tahu bila perlu berundur.",
        "Tegas dan langsung, tidak takut cabaran. Suka mengawal dan membuat keputusan cepat. Mungkin kurang sabar dengan orang yang ragu-ragu.",
        "Sangat dominan dan tegas. Berkembang dengan kawalan penuh dan membuat keputusan pantas. Hampir tiada kesabaran untuk keraguan."
      ]
    },
    I: {
      label: ["Pendiam","Introvert","Sederhana","Sosial","Ekstrovert"],
      desc:  [
        "Lebih suka kerja yang tenang dan bebas. Paling selesa dalam lingkungan kecil yang dipercayai.",
        "Cenderung berfikir secara bebas. Berhati-hati dengan orang baru; membina kepercayaan secara perlahan.",
        "Mengimbangi interaksi sosial dengan kerja bebas. Mudah menyesuaikan diri dalam kedua-dua situasi.",
        "Mesra dan bersemangat, mahir membina hubungan dan mempengaruhi orang lain melalui kehangatan tulen.",
        "Bersemangat, petah bercakap dan sangat persuasif. Berkembang dengan hubungan sosial, mendambakan pengiktirafan dan memberi inspirasi secara semula jadi."
      ]
    },
    S: {
      label: ["Pencari perubahan","Berorientasi perubahan","Seimbang","Penyokong","Stabil"],
      desc:  [
        "Mendambakan perubahan berterusan. Kerja rutin terasa membelengu. Tenaga tinggi tetapi sukar fokus jangka panjang.",
        "Mudah menyesuaikan diri tetapi tidak sabar. Suka kepelbagaian dan peluang baru. Bertindak pantas tetapi mungkin kurang susulan.",
        "Mengimbangi kestabilan dengan perubahan. Boleh menangani perubahan sederhana sambil mengekalkan struktur.",
        "Sabar dan menyokong. Menghargai keharmonian pasukan. Rakan kongsi yang boleh dipercayai.",
        "Sangat sabar, setia dan boleh dipercayai. Sauh emosi mana-mana pasukan. Menentang perubahan mendadak yang drastik."
      ]
    },
    C: {
      label: ["Bebas","Bebas Independen","Seimbang","Tepat","Sistematik"],
      desc:  [
        "Sangat tidak suka peraturan dan proses. Bertindak sepenuhnya berdasarkan naluri dan pertimbangan peribadi.",
        "Bebas dan tidak konformis. Mempercayai pertimbangan peribadi berbanding standard yang ditetapkan.",
        "Mengimbangi struktur dengan fleksibiliti. Mengikuti proses yang perlu tetapi menangani pengecualian dengan baik.",
        "Menghargai kualiti dan ketepatan. Metodikal dan berorientasikan butiran. Cemerlang dalam tugas analitik.",
        "Sangat berorientasikan butiran dan proses. Mengejar kesempurnaan dan menetapkan standard tinggi."
      ]
    }
  }
};

// ── Motivator content ──────────────────────────────────────────────────────
const MOT_LEVELS = {
  "zh-CN": {
    T:    { labels:["实用导向","适度求知","求知导向"],     descs:["更注重实际操作和结果，而非纯粹的知识积累。","有一定的求知欲，喜欢学习新事物，但并非首要驱动力。","对知识和新信息有强烈的好奇心。喜欢学习、研究，并成为特定领域的「专家」或「内行」。"] },
    U:    { labels:["非功利导向","实际导向","结果与效率导向"], descs:["不以金钱或效率为首要考量，更注重其他价值观。","重视效率和实际成果，但也会综合考虑其他因素。","核心驱动力来自投资回报和资源最大化。做任何事都问「有什么好处？」或「效率有多高？」时间就是金钱。"] },
    A:    { labels:["务实导向","适度审美","美感导向"],     descs:["不太追求形式上的美感，更看重事物的实用性和功能性。","有一定的审美意识，关注工作的质量和呈现方式。","对美感、和谐和创意有强烈追求。重视工作和生活的品质与形式，环境和体验对他们来说至关重要。"] },
    Soc:  { labels:["适度利他","适度利他","强烈利他"],     descs:["有同情心，但并非首要动机。愿意帮助人，前提是这件事本身也有价值或能带来回报。","有同情心，愿意帮助他人，但并非唯一动机，也会考虑个人利益。","有强烈的利他主义倾向，以帮助他人、服务社会为首要动机和人生意义所在。"] },
    Ind:  { labels:["团队导向","成就导向","权力与认同导向"], descs:["不特别追求个人权力或认可，更注重团队贡献和集体成就。","有一定的领导欲和个人成就感，但不至于主导一切。","渴望获得独特地位、被认可和拥有影响力。希望成为舞台的中心，对赞扬和权威地位有强烈需求。"] },
    Trad: { labels:["创新导向","平衡导向","传统导向"],     descs:["极度不信任旧有的规则和体系。渴望探索新方法、新路径，对「我们一直这样做」的说法感到反感。","尊重传统，但也能接受合理的变化和创新，在传统与现代之间灵活切换。","高度重视传统、规则和既有体系。在熟悉的结构和价值框架中最能发挥潜能。"] }
  },
  en: {
    T:    { labels:["Practical-focused","Moderately curious","Knowledge-driven"],      descs:["Focused on practical results over pure knowledge accumulation.","Has a degree of intellectual curiosity; enjoys learning but it's not the primary driver.","Strongly driven by curiosity and the pursuit of knowledge. Loves research and becoming a subject-matter expert."] },
    U:    { labels:["Non-utilitarian","Results-aware","Results & efficiency driven"],   descs:["Does not prioritise money or efficiency as primary motivators. Values other dimensions more.","Values efficiency and practical outcomes, while also weighing other considerations.","Primarily driven by ROI and resource optimisation. Always asking 'what's in it for me?' or 'how efficient is this?' Time is money."] },
    A:    { labels:["Pragmatic","Moderately aesthetic","Beauty-driven"],               descs:["Prioritises practicality and function over form and aesthetics.","Has aesthetic awareness; cares about quality and presentation of work.","Strongly driven by beauty, harmony, and creative expression. Environment and experience matter deeply."] },
    Soc:  { labels:["Selectively altruistic","Moderately altruistic","Strongly altruistic"], descs:["Compassionate, but helping others is not the primary motivator. Will help when there's also personal value.","Caring and willing to help others, though it's not the sole driver — personal gain is also considered.","Strongly altruistic. Finds deep purpose and meaning in serving others and contributing to the community."] },
    Ind:  { labels:["Team-oriented","Achievement-oriented","Power & recognition driven"], descs:["Doesn't strongly seek personal power or recognition. Prefers contributing to a team.","Has some drive for leadership and personal achievement, without needing to dominate.","Craves status, recognition, and influence. Wants to be centre stage; has strong need for authority and admiration."] },
    Trad: { labels:["Innovation-oriented","Balanced","Tradition-oriented"],            descs:["Distrusts old rules and systems. Seeks new approaches; resents 'we've always done it this way.'","Respects tradition while accepting reasonable innovation; flexibly navigates between old and new.","Highly values tradition, rules, and established systems. Performs best within familiar structures and frameworks."] }
  },
  ms: {
    T:    { labels:["Fokus praktikal","Sederhana ingin tahu","Didorong pengetahuan"],  descs:["Fokus pada hasil praktikal berbanding pengumpulan ilmu semata-mata.","Mempunyai rasa ingin tahu; suka belajar tetapi bukan pendorong utama.","Didorong kuat oleh rasa ingin tahu. Suka menyelidik dan menjadi pakar dalam bidang tertentu."] },
    U:    { labels:["Bukan utilitarian","Sedar hasil","Didorong hasil & kecekapan"],   descs:["Tidak mengutamakan wang atau kecekapan sebagai motivasi utama.","Menghargai kecekapan dan hasil praktikal sambil mempertimbangkan faktor lain.","Didorong terutamanya oleh ROI dan pengoptimuman sumber. Sentiasa bertanya 'apa faedahnya?' Masa adalah wang."] },
    A:    { labels:["Pragmatik","Sederhana estetik","Didorong keindahan"],             descs:["Mengutamakan kepraktisan dan fungsi berbanding bentuk dan estetika.","Mempunyai kesedaran estetik; mengambil berat tentang kualiti dan persembahan kerja.","Didorong kuat oleh keindahan, keharmonian dan ekspresi kreatif. Persekitaran dan pengalaman sangat penting."] },
    Soc:  { labels:["Altruisme terpilih","Altruisme sederhana","Altruisme kuat"],      descs:["Berbelas kasihan, tetapi membantu orang lain bukan motivasi utama.","Prihatin dan rela membantu orang lain, walaupun kepentingan peribadi juga dipertimbangkan.","Sangat altruistik. Mendapati tujuan mendalam dalam melayan orang lain dan menyumbang kepada komuniti."] },
    Ind:  { labels:["Berorientasi pasukan","Berorientasi pencapaian","Didorong kuasa & pengiktirafan"], descs:["Tidak kuat mencari kuasa atau pengiktirafan peribadi. Lebih suka menyumbang kepada pasukan.","Mempunyai sedikit dorongan untuk kepimpinan dan pencapaian peribadi.","Mendambakan status, pengiktirafan dan pengaruh. Ingin berada di pusat perhatian; memerlukan autoriti dan pujian."] },
    Trad: { labels:["Berorientasi inovasi","Seimbang","Berorientasi tradisi"],         descs:["Tidak mempercayai peraturan dan sistem lama. Mencari pendekatan baru; tidak suka 'kita selalu buat begini.'","Menghormati tradisi sambil menerima inovasi yang munasabah.","Sangat menghargai tradisi, peraturan dan sistem yang ditetapkan. Terbaik dalam struktur dan kerangka yang biasa."] }
  }
};

// ── Strengths by primary DISC ──────────────────────────────────────────────
const STRENGTHS = {
  "zh-CN": {
    D: ["极强的行动力和决断力：不畏惧挑战，敢于直接处理最棘手的难题。","高效的决策力和结果导向：总是寻求最快、最有效的途径达成目标。","强大的领导力和驱动力：天生能够带领团队朝着目标高速前进。","坚韧不拔，百折不挠：面对挫折时能迅速调整策略并继续前进。","自信且富有远见：敢于设定大胆目标，并带领他人实现。"],
    I: ["极强的说服力和感染力：能够激励他人，快速建立广泛而真实的人脉。","出色的沟通能力：善于表达想法，能在各种场合自如、有力地交流。","天然的人际吸引力：能够迅速与陌生人建立融洽、信任的关系。","创造积极能量：能够活跃团队氛围，大幅提升整体士气和凝聚力。","快速学习和适应新环境的能力：能轻松融入新团队和新情境中。"],
    S: ["极强的耐心和稳定性：在任何压力下都能保持冷静，是团队的定海神针。","深厚的忠诚度和可靠性：一旦承诺，必定全力以赴，绝不轻易放弃。","出色的倾听能力：善于真正理解他人的感受和需求，而非表面应付。","强大的协调能力：能够化解冲突，在矛盾中促进和谐与合作。","持续稳定的执行力：能够长期坚持，保证工作的一致性和高质量。"],
    C: ["卓越的分析能力和逻辑思维：能深入剖析问题，找出最优、最严谨的解决方案。","高度的准确性和细节把控：确保工作的质量、准确性和完整性。","系统化的规划能力：能够为团队建立高效、可持续的流程和标准。","严谨的工作态度：对自己和他人都保持高标准，拒绝敷衍和马虎。","出色的风险意识：能预见潜在问题并提前制定应对方案，防患于未然。"]
  },
  en: {
    D: ["Strong action orientation and decisiveness: unafraid of challenges, directly tackles the toughest problems.","Efficient decision-making and results focus: always seeking the fastest, most effective path to goals.","Powerful leadership and drive: naturally propels teams toward objectives at high speed.","Resilient and tenacious: quickly adjusts strategy after setbacks and keeps moving forward.","Confident with vision: bold enough to set ambitious goals and inspire others to achieve them."],
    I: ["Outstanding persuasion and infectious energy: motivates others and rapidly builds a wide, genuine network.","Excellent communication: articulates ideas naturally and powerfully across all settings.","Natural interpersonal magnetism: quickly establishes rapport and trust with new people.","Creates positive energy: lifts team morale and strengthens cohesion wherever they go.","Fast learner and highly adaptable: easily integrates into new teams and environments."],
    S: ["Remarkable patience and stability: stays calm under any pressure — the emotional anchor of the team.","Deep loyalty and dependability: once committed, gives everything and doesn't quit.","Exceptional listening: genuinely understands the feelings and needs of others.","Strong coordination ability: dissolves conflict and fosters harmony within teams.","Sustained, consistent execution: delivers reliable, high-quality results over the long term."],
    C: ["Superior analytical ability and logical thinking: deeply dissects problems to find the most rigorous solutions.","High accuracy and attention to detail: ensures quality, correctness, and completeness in all work.","Systematic planning: builds efficient, sustainable processes and standards for teams.","Rigorous work ethic: holds self and others to high standards, never settling for 'good enough'.","Excellent risk awareness: anticipates potential issues and prepares contingency plans proactively."]
  },
  ms: {
    D: ["Orientasi tindakan dan ketegasan yang kuat: tidak takut cabaran, menangani masalah paling sukar secara langsung.","Membuat keputusan yang cekap dan fokus pada hasil: sentiasa mencari laluan terpantas dan paling berkesan.","Kepimpinan dan dorongan yang kuat: secara semula jadi mendorong pasukan ke arah matlamat dengan pantas.","Berdaya tahan dan gigih: menyesuaikan strategi dengan cepat selepas kemunduran dan terus bergerak.","Yakin dengan wawasan: cukup berani untuk menetapkan matlamat besar dan memberi inspirasi kepada orang lain."],
    I: ["Persuasi yang luar biasa dan tenaga yang menular: memotivasikan orang lain dan membina rangkaian yang luas dengan cepat.","Komunikasi yang cemerlang: menyatakan idea secara semula jadi dan berkesan dalam semua situasi.","Daya tarikan interpersonal yang semula jadi: membina hubungan dan kepercayaan dengan orang baru dengan cepat.","Mencipta tenaga positif: meningkatkan semangat pasukan dan memperkukuh perpaduan.","Pembelajaran pantas dan sangat mudah menyesuaikan diri: mudah menyepadukan dalam pasukan dan persekitaran baru."],
    S: ["Kesabaran dan kestabilan yang luar biasa: kekal tenang di bawah sebarang tekanan — sauh emosi pasukan.","Kesetiaan dan kebolehpercayaan yang mendalam: sekali berkomitmen, memberi segalanya dan tidak berputus asa.","Kemahiran mendengar yang luar biasa: benar-benar memahami perasaan dan keperluan orang lain.","Keupayaan penyelarasan yang kuat: menyelesaikan konflik dan memupuk keharmonian dalam pasukan.","Pelaksanaan yang berterusan dan konsisten: memberikan hasil yang boleh dipercayai dan berkualiti tinggi dalam jangka panjang."],
    C: ["Keupayaan analitikal dan pemikiran logik yang unggul: menganalisis masalah secara mendalam untuk mencari penyelesaian yang paling teliti.","Ketepatan tinggi dan perhatian terhadap butiran: memastikan kualiti, ketepatan dan kelengkapan dalam semua kerja.","Perancangan sistematik: membina proses dan standard yang cekap dan mampan untuk pasukan.","Etos kerja yang teliti: menetapkan standard tinggi untuk diri sendiri dan orang lain.","Kesedaran risiko yang cemerlang: menjangkakan isu berpotensi dan menyediakan pelan kontingensi secara proaktif."]
  }
};

// ── Growth areas by primary DISC ───────────────────────────────────────────
const GROWTH = {
  "zh-CN": {
    D: [["在工作中","需要管理好对细节的耐心，学会尊重必要的流程和标准。不要因为任务看起来繁琐就轻易放弃或绕过。"],["在人际关系中","控制主导欲，避免在沟通中显得过于强硬或咄咄逼人。记住，融洽的关系需要双向的倾听与尊重。"],["在决策中","放慢步伐，多倾听他人的意见和担忧，避免因过于自信而忽视潜在风险和不同的声音。"]],
    I: [["在工作中","培养对细节的关注和跟进能力，避免「虎头蛇尾」。承诺的事情要全程负责，不能靠热情开始却靠遗忘结束。"],["在沟通中","学会更多倾听，而不仅仅是表达。给他人充分发言的空间，真正听进对方说的内容，而非只等机会发言。"],["在时间管理上","建立更系统的工作流程，减少因冲动决策带来的时间和精力浪费，确保重要事项得到充分执行。"]],
    S: [["在变化适应上","主动拥抱变化，而非被动等待。尝试定期走出舒适区，把变化视为成长机会而非威胁。"],["在表达自我上","学会更直接地表达自己的需求、边界和想法，而非一味迁就和忍耐，避免长期积压后的爆发。"],["在决策速度上","培养更果断的决策能力，避免因过度分析和顾虑过多而错失重要机会。"]],
    C: [["在灵活性上","学会接受「够好即可」，而非永远追求完美。避免分析瘫痪，在适当时候果断行动，而非无限延迟。"],["在人际关系上","放宽对他人的标准，避免过度批评或对他人的「不完美」表示明显的不满，这会伤害关系和团队士气。"],["在行动力上","减少过度分析，培养更快的行动力。有时候「边做边学」比「完美准备后再做」带来更好的结果。"]]
  },
  en: {
    D: [["At work","Build patience for detail and learn to respect necessary processes and standards. Resist the urge to bypass steps because they feel tedious."],["In relationships","Manage the dominant impulse. Avoid coming across as overly forceful. Remember: strong relationships require two-way listening and mutual respect."],["In decision-making","Slow down, actively solicit others' concerns, and avoid letting over-confidence mask potential risks or alternative perspectives."]],
    I: [["At work","Develop follow-through and attention to detail. Don't let enthusiasm at the start fade into neglect by the finish line. Own what you commit to."],["In communication","Practice listening more than speaking. Give others genuine space to contribute — hear what they are actually saying, not just waiting for your turn."],["In time management","Build more systematic workflows to reduce waste from impulsive decisions and ensure important tasks receive proper execution."]],
    S: [["Embracing change","Actively welcome change rather than waiting for it. Regularly step outside your comfort zone and reframe change as a growth opportunity."],["Self-expression","Communicate your needs, boundaries, and opinions more directly rather than constantly accommodating others — suppression can lead to bigger ruptures later."],["Decision speed","Develop faster decision-making. Avoid missing key opportunities due to over-analysis and excessive caution."]],
    C: [["Flexibility","Learn to accept 'good enough' rather than always pursuing perfection. Avoid analysis paralysis — act decisively at the right moment."],["In relationships","Ease standards placed on others. Avoid excessive criticism or visible frustration at others' imperfections — this erodes relationships and morale."],["Action orientation","Reduce over-analysis. Sometimes 'learn by doing' outperforms 'perfect preparation.' Move faster."]],
  },
  ms: {
    D: [["Di tempat kerja","Bina kesabaran untuk butiran dan belajar menghormati proses yang perlu. Tahan keinginan untuk memintas langkah."],["Dalam hubungan","Urus dorongan dominan. Elak kelihatan terlalu memaksa. Ingat: hubungan yang kukuh memerlukan pendengaran dua hala."],["Dalam membuat keputusan","Perlahan, minta pendapat orang lain secara aktif, dan elak biarkan keyakinan berlebihan menutupi risiko berpotensi."]],
    I: [["Di tempat kerja","Bangunkan susulan dan perhatian terhadap butiran. Jangan biarkan semangat pada permulaan pudar pada garisan penamat."],["Dalam komunikasi","Amalkan lebih banyak mendengar berbanding bercakap. Berikan ruang tulen kepada orang lain untuk menyumbang."],["Dalam pengurusan masa","Bina aliran kerja yang lebih sistematik untuk mengurangkan pembaziran akibat keputusan impulsif."]],
    S: [["Memeluk perubahan","Sambut perubahan secara aktif berbanding menunggu. Keluar dari zon selesa secara berkala."],["Ekspresi diri","Sampaikan keperluan, batasan dan pendapat anda dengan lebih langsung berbanding sentiasa menampung orang lain."],["Kelajuan keputusan","Bangunkan pembuatan keputusan yang lebih pantas. Elak terlepas peluang penting akibat analisis berlebihan."]],
    C: [["Fleksibiliti","Belajar menerima 'cukup baik' berbanding sentiasa mengejar kesempurnaan. Elak lumpuh analisis."],["Dalam hubungan","Longgarkan standard yang diletakkan pada orang lain. Elak kritikan berlebihan yang menghakis hubungan."],["Orientasi tindakan","Kurangkan analisis berlebihan. Kadang-kadang 'belajar sambil buat' mengatasi 'persediaan sempurna.'"]]
  }
};

// ── One-line summary ───────────────────────────────────────────────────────
const ONE_LINE = {
  "zh-CN": {
    D: "一位充满冲劲与决断力的行动派领袖，成功的关键在于平衡速度与对他人感受和流程的尊重。",
    I: "一位极具魅力和感染力的开拓者，成功的关键在于将热情转化为持续的行动力与跟进力。",
    S: "一位温暖可靠的团队支柱，成功的关键在于学会在坚守稳定的同时，勇敢地拥抱变化与主动表达。",
    C: "一位追求卓越的分析专家，成功的关键在于在保持高标准的同时，培养更快的行动力与对「不完美」的包容。"
  },
  en: {
    D: "A bold, action-driven leader whose success hinges on balancing speed with respect for process and people.",
    I: "A charismatic and inspiring trailblazer whose success lies in converting enthusiasm into sustained follow-through.",
    S: "A warm, dependable team anchor whose success comes from embracing change and speaking up while maintaining stability.",
    C: "An excellence-driven analytical expert whose success depends on acting faster and tolerating imperfection alongside high standards."
  },
  ms: {
    D: "Seorang pemimpin berani dan berorientasi tindakan yang kejayaannya bergantung kepada mengimbangi kelajuan dengan menghormati proses dan orang lain.",
    I: "Seorang perintis yang karismatik dan memberi inspirasi yang kejayaannya terletak pada menukar semangat kepada susulan yang berterusan.",
    S: "Sauh pasukan yang hangat dan boleh dipercayai yang kejayaannya datang daripada memeluk perubahan dan bersuara sambil mengekalkan kestabilan.",
    C: "Pakar analitikal yang mementingkan kecemerlangan yang kejayaannya bergantung kepada bertindak lebih pantas dan bertolak ansur dengan ketidaksempurnaan."
  }
};

// ── Career directions by primary DISC ─────────────────────────────────────
const CAREER = {
  "zh-CN": {
    D: {
      ideal: ["销售与业务拓展：大客户经理、业务总监、解决方案销售——利用你的说服力和快速建立关系的能力创造成果。","创业与综合管理：初创公司创始人、项目负责人、区域经理——你的行动力和全局视野让你适合从0到1的开拓。","顾问与战略：管理咨询顾问（战略方向）、专业演讲者、高管教练——你的远见和魄力让你擅长引领方向。"],
      avoid: ["严格遵循流程的岗位：如质量控制、会计、档案管理、合规专员——这些工作对细节和规则的严格要求会让你感到窒息。","需要高度耐心的常规工作：如数据录入、后台支持、重复性操作——单调的节奏会迅速耗尽你的热情和能量。"]
    },
    I: {
      ideal: ["销售与市场：客户经理、品牌大使、社群经理——用你的感染力和人际网络创造商机。","培训与演讲：培训师、主持人、TEDx演讲者、公众人物——你的表达力和感染力在舞台上发光发亮。","创意与公关：广告创意总监、公关经理、内容创作者——你对人性的洞察和创意让作品有温度。"],
      avoid: ["孤立的技术工作：如独立软件开发、数据分析、实验室研究——长期缺乏人际互动会让你情绪耗竭。","严格执行流程的后台岗位：如财务核算、质量检验、行政文书——缺乏社交刺激会让你迅速失去动力。"]
    },
    S: {
      ideal: ["人力资源与团队发展：HR经理、员工关怀专员、培训协调员——你的耐心和同理心是最好的利器。","客户服务与支持：客户成功经理、客服主管——你的可靠性和稳定性让客户感到安心。","医疗、教育与社会服务：护士、教师、社工、心理咨询师——你的关怀和耐心在这些领域创造真正的价值。"],
      avoid: ["高压、快节奏的销售岗位：如短期成交型销售、电话营销——频繁的拒绝和快速的变化会让你持续处于压力之中。","高度政治化或竞争激烈的环境：如投行、高竞争咨询——这类环境的冲突和竞争文化与你的天性相悖。"]
    },
    C: {
      ideal: ["分析与研究：数据分析师、市场研究员、精算师、科学研究员——精准是你的超能力。","财务与法律：财务分析师、审计师、合规专员、律师——对细节和准确性的高要求正是你的优势。","IT与系统：软件工程师、系统架构师、质量保证工程师——你的逻辑性和系统性思维在这里大放异彩。"],
      avoid: ["高度社交化的销售或公关岗位：如大众销售、活动主持——需要频繁即兴发挥和社交表演，与你的天性不符。","频繁变动、缺乏结构的创业初期环境：混乱和不确定性会让你无法发挥应有的水平。"]
    }
  },
  en: {
    D: {
      ideal: ["Sales & business development: Key account manager, sales director, solutions sales — leverage your persuasive power and ability to build relationships quickly.","Entrepreneurship & general management: startup founder, project lead, regional manager — your drive and big-picture thinking suit zero-to-one building.","Consulting & strategy: management consultant, keynote speaker, executive coach — your vision and boldness excel at setting direction."],
      avoid: ["Strictly process-driven roles: quality control, accounting, compliance, archiving — rigid rule-following will feel suffocating.","High-patience routine work: data entry, backend support, repetitive operations — monotony rapidly drains your energy."]
    },
    I: {
      ideal: ["Sales & marketing: account manager, brand ambassador, community manager — turn your infectious personality and network into business results.","Training & speaking: corporate trainer, MC, keynote speaker — your expressiveness and magnetism shine on stage.","Creative & PR: creative director, PR manager, content creator — your people insight gives your work genuine warmth."],
      avoid: ["Isolated technical work: solo software development, data analysis, laboratory research — long-term lack of social interaction will drain you emotionally.","Backend process roles: financial accounting, quality inspection, administrative filing — lack of social stimulus kills your motivation quickly."]
    },
    S: {
      ideal: ["HR & team development: HR manager, employee wellbeing specialist, training coordinator — your patience and empathy are powerful assets.","Customer service & support: customer success manager, service team lead — your reliability and steadiness make clients feel safe.","Healthcare, education & social work: nurse, teacher, social worker, counsellor — your care and patience create real value."],
      avoid: ["High-pressure, fast-paced sales: short-cycle closing, telemarketing — frequent rejection and rapid change keep you in sustained stress.","Highly political or intensely competitive environments: investment banking, cutthroat consulting — conflict and competitive culture conflict with your nature."]
    },
    C: {
      ideal: ["Analytics & research: data analyst, market researcher, actuary, scientist — precision is your superpower.","Finance & legal: financial analyst, auditor, compliance officer, attorney — high requirements for detail and accuracy play to your strengths.","IT & systems: software engineer, systems architect, QA engineer — your logical and systematic thinking flourishes here."],
      avoid: ["Highly social sales or PR roles: mass sales, event hosting — frequent improvisation and social performance conflict with your nature.","Frequently changing, unstructured early-stage startup environments — chaos and uncertainty prevent you from performing at your best."]
    }
  },
  ms: {
    D: {
      ideal: ["Jualan & pembangunan perniagaan: pengurus akaun utama, pengarah jualan — gunakan kuasa persuasi anda.","Keusahawanan & pengurusan am: pengasas syarikat permulaan, ketua projek — dorongan dan pemikiran menyeluruh anda sesuai untuk pembinaan dari sifar.","Perundingan & strategi: perunding pengurusan, penceramah utama, jurulatih eksekutif — wawasan dan keberanian anda cemerlang dalam menetapkan hala tuju."],
      avoid: ["Peranan yang sangat berorientasikan proses: kawalan kualiti, perakaunan, pematuhan — pematuhan peraturan yang tegar akan terasa mencekik.","Kerja rutin yang memerlukan kesabaran tinggi: kemasukan data, sokongan latar belakang — kebiasaan cepat menguras tenaga anda."]
    },
    I: {
      ideal: ["Jualan & pemasaran: pengurus akaun, duta jenama, pengurus komuniti — tukar keperibadian menular dan rangkaian anda kepada hasil perniagaan.","Latihan & berucap: jurulatih korporat, pengacara, penceramah utama — keupayaan ekspresi dan magnet anda bersinar di pentas.","Kreatif & PR: pengarah kreatif, pengurus PR, pencipta kandungan — wawasan anda tentang manusia memberi kehangatan tulen kepada kerja anda."],
      avoid: ["Kerja teknikal yang terpencil: pembangunan perisian solo, analisis data — kekurangan interaksi sosial jangka panjang akan menguras anda secara emosi.","Peranan proses latar belakang: perakaunan kewangan, pemeriksaan kualiti — kekurangan rangsangan sosial membunuh motivasi anda dengan cepat."]
    },
    S: {
      ideal: ["HR & pembangunan pasukan: pengurus HR, pakar kebajikan pekerja, penyelaras latihan — kesabaran dan empati anda adalah aset yang kuat.","Perkhidmatan & sokongan pelanggan: pengurus kejayaan pelanggan, ketua pasukan perkhidmatan — kebolehpercayaan anda menenangkan pelanggan.","Penjagaan kesihatan, pendidikan & kerja sosial: jururawat, guru, pekerja sosial, kaunselor — penjagaan dan kesabaran anda mencipta nilai sebenar."],
      avoid: ["Jualan bertekanan tinggi dan berpace pantas: jualan kitaran pendek, telepemasaran — penolakan yang kerap dan perubahan pantas mengekalkan anda dalam tekanan berterusan.","Persekitaran yang sangat berpolitik atau bersaingan sengit — konflik dan budaya persaingan bercanggah dengan sifat semula jadi anda."]
    },
    C: {
      ideal: ["Analitik & penyelidikan: penganalisis data, penyelidik pasaran, aktuari, saintis — ketepatan adalah kuasa super anda.","Kewangan & undang-undang: penganalisis kewangan, juruaudit, pegawai pematuhan, peguam — keperluan tinggi untuk butiran dan ketepatan memainkan kekuatan anda.","IT & sistem: jurutera perisian, arkitek sistem, jurutera QA — pemikiran logik dan sistematik anda berkembang di sini."],
      avoid: ["Peranan jualan atau PR yang sangat sosial: jualan massa, pengacara acara — improvisasi yang kerap bercanggah dengan sifat anda.","Persekitaran permulaan awal yang berubah-ubah dan tidak berstruktur — huru-hara dan ketidakpastian menghalang anda daripada berprestasi terbaik."]
    }
  }
};

// ── Overall paragraph builder ──────────────────────────────────────────────
const OVERALL = {
  "zh-CN": {
    opening: {
      D: n=>`${n}的核心特质是强势的主导性——果断、直接、以结果为先。`,
      I: n=>`${n}的核心特质是极强的影响力——热情洋溢、感染力强、天生的人际磁场。`,
      S: n=>`${n}的核心特质是深厚的稳定性——耐心、可靠、忠诚，是身边每个人的情感支柱。`,
      C: n=>`${n}的核心特质是高度的严谨性——精准、系统、追求质量，对所有事情都有深刻的分析与把控。`
    },
    topMot: {
      T:    "强烈的求知欲驱使他们不断学习和探索，渴望成为所在领域的真正专家。",
      U:    "强烈的功利动机使他们做任何事都聚焦于投资回报和实际成效，时间对他们而言就是最宝贵的资产。",
      A:    "对美感和和谐有强烈的追求，重视事物的形式与体验，环境和呈现方式对他们来说都非常重要。",
      Soc:  "强烈的社会责任感驱使他们以帮助他人、服务社群为首要使命，从中获得最深的满足与意义。",
      Ind:  "强烈的个人成就驱动使他们渴望获得认可、影响力和领导地位，希望成为舞台的中心人物。",
      Trad: "对既有体系和传统价值的深度信任使他们在清晰的结构和原则框架中发挥最大潜能。"
    },
    secondMot: {
      T:    "同时，旺盛的求知欲让他们不断充实自己，以知识和专业建立竞争优势。",
      U:    "同时，强烈的功利主义使他们在做任何决策时都会衡量效率和实际回报。",
      A:    "同时，对美感和品质的重视使他们在工作的呈现和体验上有更高的要求。",
      Soc:  "同时，他们内心深处有帮助他人的真诚意愿，这为他们的行动增添了人情味。",
      Ind:  "同时，对个人地位和认可的渴望使他们在竞争中保持强劲的动力。",
      Trad: "同时，对规则和原则的尊重使他们在做决策时有清晰的道德框架。"
    },
    lowNote: {
      S: "他们对重复和停滞感到不耐，倾向于快速改变和多元化挑战。",
      C: "他们对繁琐的流程和严格的规则有天然的抗拒，倾向于凭直觉和判断行事。",
      D: "他们倾向于避免冲突和对抗，更擅长在支持与协调的角色中发挥价值。",
      I:  "他们在社交表达上较为内敛，更喜欢通过深度专注和系统化工作来创造价值。"
    }
  },
  en: {
    opening: {
      D: n=>`${n}'s core trait is strong dominance — decisive, direct, and results-first in everything.`,
      I: n=>`${n}'s core trait is exceptional influence — warm, infectious energy and a natural ability to connect with and inspire people.`,
      S: n=>`${n}'s core trait is deep steadiness — patient, reliable, and loyal; the emotional anchor for everyone around them.`,
      C: n=>`${n}'s core trait is high conscientiousness — precise, systematic, and quality-driven, with deep analytical control over everything they do.`
    },
    topMot: {
      T:    "A strong drive for knowledge pushes them to learn and explore constantly, aspiring to become a genuine expert in their field.",
      U:    "A strong utilitarian drive means they focus everything on ROI and practical results — time is their most precious asset.",
      A:    "A strong pursuit of beauty and harmony means they care deeply about form, experience, and the quality of how things look and feel.",
      Soc:  "A deep social drive means helping others and serving the community is their primary mission — it's where they find the deepest fulfilment.",
      Ind:  "A strong individualistic drive pushes them to seek recognition, influence, and leadership — they want to be at the centre of impact.",
      Trad: "Deep trust in established systems and traditional values means they flourish most within clear structures and principled frameworks."
    },
    secondMot: {
      T:    "Alongside this, a strong intellectual curiosity continuously builds their knowledge base and competitive edge.",
      U:    "Alongside this, a strong utilitarian streak means every decision is weighed against efficiency and practical return.",
      A:    "Alongside this, a high regard for aesthetics and quality raises their bar for how work is presented and experienced.",
      Soc:  "Alongside this, a genuine desire to help others adds a human dimension and purpose to their actions.",
      Ind:  "Alongside this, a drive for personal status and recognition keeps their competitive fire burning strongly.",
      Trad: "Alongside this, respect for principles and rules gives them a clear ethical framework when making decisions."
    },
    lowNote: {
      S: "They grow impatient with repetition and stagnation, gravitating toward rapid change and diverse challenges.",
      C: "They naturally resist rigid processes and strict rules, preferring to act on instinct and personal judgment.",
      D: "They tend to avoid confrontation and conflict, thriving more in supportive and coordinative roles.",
      I: "They are more reserved socially, preferring to create value through deep focus and systematic work."
    }
  },
  ms: {
    opening: {
      D: n=>`Ciri teras ${n} ialah dominasi yang kuat — tegas, langsung, dan mengutamakan hasil dalam segala-galanya.`,
      I: n=>`Ciri teras ${n} ialah pengaruh yang luar biasa — tenaga yang hangat dan menular serta keupayaan semula jadi untuk berhubung dan memberi inspirasi kepada orang ramai.`,
      S: n=>`Ciri teras ${n} ialah kestabilan yang mendalam — sabar, boleh dipercayai dan setia; sauh emosi untuk semua orang di sekeliling mereka.`,
      C: n=>`Ciri teras ${n} ialah ketelitian yang tinggi — tepat, sistematik dan didorong kualiti, dengan kawalan analitikal yang mendalam ke atas semua yang mereka lakukan.`
    },
    topMot: {
      T:    "Dorongan yang kuat untuk ilmu mendorong mereka untuk belajar dan meneroka secara berterusan, berhasrat untuk menjadi pakar sebenar dalam bidang mereka.",
      U:    "Dorongan utilitarian yang kuat bermakna mereka memfokuskan segalanya pada ROI dan hasil praktikal — masa adalah aset paling berharga mereka.",
      A:    "Pengejaran keindahan dan keharmonian yang kuat bermakna mereka sangat mengambil berat tentang bentuk, pengalaman dan kualiti cara sesuatu kelihatan dan dirasai.",
      Soc:  "Dorongan sosial yang mendalam bermakna membantu orang lain dan melayan komuniti adalah misi utama mereka — di situlah mereka mendapati kepuasan yang paling mendalam.",
      Ind:  "Dorongan individualistik yang kuat mendorong mereka untuk mencari pengiktirafan, pengaruh dan kepimpinan — mereka ingin berada di pusat impak.",
      Trad: "Kepercayaan yang mendalam terhadap sistem yang ditetapkan dan nilai tradisional bermakna mereka berkembang dalam struktur yang jelas dan kerangka berprinsip."
    },
    secondMot: {
      T:    "Selain itu, rasa ingin tahu intelektual yang kuat terus membina pangkalan pengetahuan dan kelebihan daya saing mereka.",
      U:    "Selain itu, sifat utilitarian yang kuat bermakna setiap keputusan ditimbang terhadap kecekapan dan pulangan praktikal.",
      A:    "Selain itu, penghormatan tinggi terhadap estetika dan kualiti meningkatkan standard mereka tentang cara kerja dibentangkan dan dialami.",
      Soc:  "Selain itu, keinginan tulus untuk membantu orang lain menambah dimensi manusia dan tujuan kepada tindakan mereka.",
      Ind:  "Selain itu, dorongan untuk status peribadi dan pengiktirafan mengekalkan api daya saing mereka dengan kuat.",
      Trad: "Selain itu, rasa hormat terhadap prinsip dan peraturan memberi mereka kerangka etika yang jelas ketika membuat keputusan."
    },
    lowNote: {
      S: "Mereka menjadi tidak sabar dengan pengulangan dan kestagnanan, tertarik kepada perubahan pantas dan cabaran yang pelbagai.",
      C: "Mereka secara semula jadi menentang proses yang tegar dan peraturan yang ketat, lebih suka bertindak berdasarkan naluri dan pertimbangan peribadi.",
      D: "Mereka cenderung mengelak konfrontasi dan konflik, lebih berkembang dalam peranan yang menyokong dan menyelaras.",
      I:  "Mereka lebih pendiam secara sosial, lebih suka mencipta nilai melalui fokus yang mendalam dan kerja yang sistematik."
    }
  }
};

// ── Section title labels ───────────────────────────────────────────────────
const SEC = {
  "zh-CN": { overview:"🎯 性格与动机总览", disc:"📊 DISC 行为偏好分析", mot:"💡 内在驱动力（激励因子）分析", strengths:"💪 核心优势", growth:"📈 成长空间", oneline:"✅ 一句话总结", career:"🎯 最佳职业方向", ideal:"理想职业", avoid:"建议回避", discSummary:"总结", motSummary:"总结" },
  en:      { overview:"🎯 Personality & Motivation Overview", disc:"📊 DISC Behavioral Profile", mot:"💡 Motivators Analysis", strengths:"💪 Core Strengths", growth:"📈 Growth Areas", oneline:"✅ In One Line", career:"🎯 Best Career Directions", ideal:"Ideal Roles", avoid:"Roles to Avoid", discSummary:"Summary", motSummary:"Summary" },
  ms:      { overview:"🎯 Gambaran Keperibadian & Motivasi", disc:"📊 Profil Tingkah Laku DISC", mot:"💡 Analisis Motivator", strengths:"💪 Kekuatan Teras", growth:"📈 Ruang Pertumbuhan", oneline:"✅ Dalam Satu Ayat", career:"🎯 Hala Tuju Kerjaya Terbaik", ideal:"Peranan Ideal", avoid:"Peranan untuk Dielakkan", discSummary:"Rumusan", motSummary:"Rumusan" }
};

// ── DISC summary by primary type ───────────────────────────────────────────
const DISC_SUMMARY = {
  "zh-CN": {
    D: "高度好胜、果断直接的行动派。在动态、自由且充满挑战的环境中能发挥最大的潜能。",
    I: "极具魅力和感染力的社交达人。在充满人际互动和创意空间的环境中如鱼得水。",
    S: "耐心可靠、重情重义的团队支柱。在和谐稳定、被人信赖和需要的环境中绽放光彩。",
    C: "追求精准和卓越的系统型专家。在有清晰标准、足够时间深思熟虑的环境中表现最佳。"
  },
  en: {
    D: "A highly competitive, decisive action-taker. Reaches peak potential in dynamic, autonomous, challenging environments.",
    I: "A charismatic, infectious social influencer. Thrives in environments rich in human interaction and creative space.",
    S: "A patient, loyal, and deeply reliable team anchor. Shines when trusted, needed, and operating in harmonious stability.",
    C: "A precision-driven, excellence-seeking systematic expert. Performs best with clear standards and sufficient time to think deeply."
  },
  ms: {
    D: "Seorang pengambil tindakan yang sangat kompetitif dan tegas. Mencapai potensi puncak dalam persekitaran yang dinamik dan mencabar.",
    I: "Seorang pemengaruh sosial yang karismatik dan menular. Berkembang dalam persekitaran yang kaya dengan interaksi manusia dan ruang kreatif.",
    S: "Sauh pasukan yang sabar, setia dan sangat boleh dipercayai. Bersinar apabila dipercayai dan beroperasi dalam kestabilan yang harmoni.",
    C: "Pakar sistematik yang didorong ketepatan dan kecemerlangan. Berprestasi terbaik dengan standard yang jelas dan masa yang mencukupi."
  }
};

// ── MOT summary ────────────────────────────────────────────────────────────
const MOT_SUMMARY = {
  "zh-CN": (m1,m2,n) => `${n}是一个被「${m1}」与「${m2}」双重引擎驱动的个体。他们努力工作，是为了在这两个核心价值维度上都获得满足与成就。`,
  en:      (m1,m2,n) => `${n} is driven by a dual engine of "${m1}" and "${m2}". Their hard work is powered by the desire to find fulfilment and achievement across both these core value dimensions.`,
  ms:      (m1,m2,n) => `${n} didorong oleh enjin dwi "${m1}" dan "${m2}". Kerja keras mereka didorong oleh keinginan untuk mendapat kepuasan dan pencapaian merentas kedua-dua dimensi nilai teras ini.`
};

// ── Main generator ─────────────────────────────────────────────────────────
function generateDeepSummary(discRaw, motRaw, name, lang) {
  const L    = SEC[lang]    || SEC['en'];
  const DL   = DISC_LEVELS[lang]  || DISC_LEVELS['en'];
  const ML   = MOT_LEVELS[lang]   || MOT_LEVELS['en'];
  const STR  = STRENGTHS[lang]    || STRENGTHS['en'];
  const GRW  = GROWTH[lang]       || GROWTH['en'];
  const OL   = ONE_LINE[lang]     || ONE_LINE['en'];
  const CAR  = CAREER[lang]       || CAREER['en'];
  const OV   = OVERALL[lang]      || OVERALL['en'];
  const DS   = DISC_SUMMARY[lang] || DISC_SUMMARY['en'];
  const MSU  = MOT_SUMMARY[lang]  || MOT_SUMMARY['en'];

  const discSorted = sortedKeys(discRaw);
  const motSorted  = sortedKeys(motRaw);
  const primary    = discSorted[0];
  const secondary  = discSorted[1];
  const lowest     = discSorted[3]; // lowest DISC
  const topMot     = motSorted[0];
  const topMot2    = motSorted[1];

  const pcts = {
    D: normDisc(discRaw.D), I: normDisc(discRaw.I),
    S: normDisc(discRaw.S), C: normDisc(discRaw.C)
  };
  const mpcts = {
    T: normMot(motRaw.T), U: normMot(motRaw.U), A: normMot(motRaw.A),
    Soc: normMot(motRaw.Soc), Ind: normMot(motRaw.Ind), Trad: normMot(motRaw.Trad)
  };

  // Label helpers
  const dlabel = (t) => DL[t].label[dLevel(pcts[t])-1];
  const ddesc  = (t) => DL[t].desc[dLevel(pcts[t])-1];
  const mlabel = (t) => ML[t].labels[mLevel(mpcts[t])-1];
  const mdesc  = (t) => ML[t].descs[mLevel(mpcts[t])-1];

  // ── 1. Overall paragraph ──────────────────────────────────────────────
  const overallPara = [
    OV.opening[primary](name),
    OV.topMot[topMot],
    OV.secondMot[topMot2],
    OV.lowNote[lowest] || ''
  ].filter(Boolean).join(' ');

  // ── 2. DISC rows ──────────────────────────────────────────────────────
  const discKeys   = ['D','I','S','C'];
  const discColors = { D:'disc-D', I:'disc-I', S:'disc-S', C:'disc-C' };
  const discRows   = discKeys.map(t => `
    <div class="deep-disc-row">
      <div class="deep-disc-header">
        <span class="deep-disc-type ${discColors[t]}">${DL[t].label[4].replace('强势','D').replace('外向','I').replace('稳定','S').replace('系统','C').replace('Dominant','D').replace('Outgoing','I').replace('Stable','S').replace('Systematic','C').replace('Dominan','D').replace('Ekstrovert','I').replace('Stabil','S').replace('Sistematik','C')}</span>
        <span class="deep-disc-label">${dlabel(t)}</span>
        <span class="deep-disc-pct">${pcts[t]}%</span>
      </div>
      <div class="deep-bar-track"><div class="deep-bar-fill ${discColors[t]}" style="width:${pcts[t]}%"></div></div>
      <p class="deep-disc-desc">${ddesc(t)}</p>
    </div>`).join('');

  // DISC type letter labels (fixed)
  const discLetters = { D:'D', I:'I', S:'S', C:'C' };

  // ── 3. Motivator rows ─────────────────────────────────────────────────
  const motKeys   = ['T','U','A','Soc','Ind','Trad'];
  const motColors = { T:'mot-T', U:'mot-U', A:'mot-A', Soc:'mot-Soc', Ind:'mot-Ind', Trad:'mot-Trad' };
  const motNames  = {
    "zh-CN": { T:"求知 (Discoverer)", U:"功利 (Utilitarian)", A:"审美 (Aesthetic)", Soc:"贡献 (Social)", Ind:"个人 (Individualistic)", Trad:"传统 (Traditional)" },
    en:       { T:"Theoretical", U:"Utilitarian", A:"Aesthetic", Soc:"Social", Ind:"Individualistic", Trad:"Traditional" },
    ms:       { T:"Teori", U:"Utiliti", A:"Estetik", Soc:"Sosial", Ind:"Individu", Trad:"Tradisi" }
  };
  const mNames = motNames[lang] || motNames['en'];
  const motRows = motKeys.map(t => `
    <div class="deep-mot-row">
      <div class="deep-disc-header">
        <span class="deep-disc-label">${mNames[t]}</span>
        <span class="deep-mot-badge ${motColors[t]}">${mlabel(t)}</span>
        <span class="deep-disc-pct">${mpcts[t].toFixed(1)}%</span>
      </div>
      <div class="deep-bar-track"><div class="deep-bar-fill ${motColors[t]}" style="width:${mpcts[t]}%"></div></div>
      <p class="deep-disc-desc">${mdesc(t)}</p>
    </div>`).join('');

  // ── 4. Strengths ──────────────────────────────────────────────────────
  const strengthItems = STR[primary].map(s => `<li>${s}</li>`).join('');

  // ── 5. Growth ─────────────────────────────────────────────────────────
  const growthItems = GRW[primary].map(([area,txt]) =>
    `<div class="deep-growth-item"><strong>${area}：</strong>${txt}</div>`).join('');

  // ── 6. Career ─────────────────────────────────────────────────────────
  const idealItems = CAR[primary].ideal.map(s => `<li>${s}</li>`).join('');
  const avoidItems = CAR[primary].avoid.map(s => `<li>${s}</li>`).join('');

  // ── MOT summary labels ────────────────────────────────────────────────
  const mot1Label = mNames[topMot];
  const mot2Label = mNames[topMot2];

  return `
<div class="report-section deep-summary">
  <h2>${L.overview}</h2>
  <p class="deep-overview-text">${overallPara}</p>
</div>

<div class="report-section deep-summary">
  <h2>${L.disc}</h2>
  ${discRows}
  <div class="deep-summary-box"><strong>${L.discSummary}：</strong>${DS[primary]}</div>
</div>

<div class="report-section deep-summary">
  <h2>${L.mot}</h2>
  ${motRows}
  <div class="deep-summary-box"><strong>${L.motSummary}：</strong>${MSU(mot1Label, mot2Label, name)}</div>
</div>

<div class="report-section deep-summary">
  <h2>${L.strengths}</h2>
  <ul class="deep-list">${strengthItems}</ul>
</div>

<div class="report-section deep-summary">
  <h2>${L.growth}</h2>
  <div class="deep-growth-list">${growthItems}</div>
</div>

<div class="report-section deep-summary">
  <div class="deep-oneline-box">
    <span class="deep-oneline-label">${L.oneline}</span>
    <p>${OL[primary]}</p>
  </div>
</div>

<div class="report-section deep-summary">
  <h2>${L.career}</h2>
  <div class="deep-career-grid">
    <div class="deep-career-col ideal">
      <h4>✅ ${L.ideal}</h4>
      <ul class="deep-list">${idealItems}</ul>
    </div>
    <div class="deep-career-col avoid">
      <h4>❌ ${L.avoid}</h4>
      <ul class="deep-list">${avoidItems}</ul>
    </div>
  </div>
</div>`;
}

window.generateDeepSummary = generateDeepSummary;

})();
