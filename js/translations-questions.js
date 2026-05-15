// Translations for all question options (DISC + Motivator)
// Keys are the original English text (used for scoring); values are display translations.

const QUESTION_TRANSLATIONS = {

    // ── DISC option text ────────────────────────────────────────────────────
    disc: {
        "zh-CN": {
            "Careful, calculating":                      "谨慎、善于计算",
            "Bold, daring":                              "大胆、勇敢",
            "Supportive":                                "支持他人",
            "Charming, delightful":                      "魅力十足、令人愉快",

            "Willing, agreeable":                        "愿意配合、容易相处",
            "Eager, impatient":                          "急切、急躁",
            "Methodical":                                "有条理、按步就班",
            "High-spirited, lively, enthusiastic":       "精力充沛、活泼、热情",

            "Logical":                                   "逻辑思维强",
            "Obedient, will do as told, dutiful":        "服从、尽职尽责",
            "Unconquerable, determined":                 "坚不可摧、坚定",
            "Playful, full of fun":                      "爱玩耍、充满乐趣",

            "Adventurous, willing to take chances":      "冒险精神、勇于尝试",
            "Analytical":                                "善于分析",
            "Cordial, warm, friendly":                   "热诚、温暖、友好",
            "Moderate, avoids extremes":                 "适度、避免极端",

            "Good mixer, likes being with others":       "善于交际、喜欢与人为伴",
            "Structured":                                "有结构性、喜欢规律",
            "Vigorous, energetic":                       "充满活力、精力旺盛",
            "Lenient, tolerant of others' actions":      "宽容、包容他人",

            "Challenger, takes action":                  "挑战者、行动派",
            "Life of the party, outgoing, entertaining": "派对灵魂、开朗风趣",
            "Easy mark, easily taken advantage of":      "容易被利用、过于顺从",
            "Fearful, afraid":                           "谨小慎微、容易担忧",

            "Well-disciplined, self-controlled":         "自律、自我控制",
            "Generous, willing to share":                "慷慨、乐于分享",
            "Animated, uses gestures for expression":    "生动活泼、善用肢体语言",
            "Persistent, unrelenting, refuses to quit":  "坚持不懈、不轻言放弃",

            "Factual":                                   "注重事实",
            "Obliging, helpful":                         "乐于助人、随时服务",
            "Willpower, strong-willed":                  "意志力强",
            "Cheerful, joyful":                          "开朗愉快",

            "Stubborn, unyielding":                      "固执、不轻易妥协",
            "Attractive, charming, attracts others":     "有吸引力、魅力出众",
            "Systematic":                                "有系统性",
            "Pleasing":                                  "讨人喜欢",

            "Restless, unable to rest or relax":         "停不下来、难以放松",
            "Neighbourly, friendly":                     "平易近人、友善",
            "Popular, liked by many or most people":     "受欢迎、广受喜爱",
            "Orderly, neat":                             "整洁有序",

            "Critical thinker":                          "善于批判性思考",
            "Challenging, assertive":                    "敢于挑战、果断",
            "Casual, laid-back":                         "随性、轻松自在",
            "Light-hearted, carefree":                   "无忧无虑、乐观开朗",

            "Brave, unafraid, courageous":               "勇敢无畏",
            "Inspiring, motivating":                     "激励他人",
            "Avoid confrontation":                       "避免冲突",
            "Quiet, composed":                           "沉稳冷静",

            "Cautious, wary, careful":                   "谨慎小心、三思而行",
            "Determined, decided, unwavering, stand firm":"坚定不移、立场坚定",
            "Convincing, assuring":                      "有说服力、令人信服",
            "Good-natured, pleasant":                    "性情温和、令人愉快",

            "Jovial, joking":                            "爱开玩笑、风趣幽默",
            "Organised":                                 "组织能力强",
            "Daring, gutsy, brazen":                     "胆大、勇于冒险",
            "Even-tempered, calm, not easily excited":   "情绪稳定、不易激动"
        },

        ms: {
            "Careful, calculating":                      "Teliti, suka mengira-ngira",
            "Bold, daring":                              "Berani, nekad",
            "Supportive":                                "Menyokong orang lain",
            "Charming, delightful":                      "Menawan, menyenangkan",

            "Willing, agreeable":                        "Sudi, mudah bersetuju",
            "Eager, impatient":                          "Bersemangat, tidak sabar",
            "Methodical":                                "Sistematik, teratur",
            "High-spirited, lively, enthusiastic":       "Bersemangat tinggi, riang, penuh minat",

            "Logical":                                   "Berfikiran logik",
            "Obedient, will do as told, dutiful":        "Patuh, taat, bertanggungjawab",
            "Unconquerable, determined":                 "Tidak mudah kalah, tekad",
            "Playful, full of fun":                      "Suka bermain, penuh keseronokan",

            "Adventurous, willing to take chances":      "Suka berpetualang, berani mengambil risiko",
            "Analytical":                                "Analitikal",
            "Cordial, warm, friendly":                   "Mesra, hangat, ramah",
            "Moderate, avoids extremes":                 "Sederhana, mengelak ekstrem",

            "Good mixer, likes being with others":       "Mudah bergaul, suka bersama orang lain",
            "Structured":                                "Berstruktur, suka sistem",
            "Vigorous, energetic":                       "Bersemangat, bertenaga",
            "Lenient, tolerant of others' actions":      "Bertoleransi, sabar dengan orang lain",

            "Challenger, takes action":                  "Suka mencabar, mengambil tindakan",
            "Life of the party, outgoing, entertaining": "Jiwa parti, suka bergaul, menghiburkan",
            "Easy mark, easily taken advantage of":      "Mudah diperdaya, terlalu menurut",
            "Fearful, afraid":                           "Mudah bimbang, berhati-hati berlebihan",

            "Well-disciplined, self-controlled":         "Berdisiplin tinggi, mengawal diri",
            "Generous, willing to share":                "Pemurah, suka berkongsi",
            "Animated, uses gestures for expression":    "Hidup, menggunakan gerak-geri untuk ekspresi",
            "Persistent, unrelenting, refuses to quit":  "Gigih, tidak mudah menyerah",

            "Factual":                                   "Berpegang kepada fakta",
            "Obliging, helpful":                         "Suka menolong, mudah membantu",
            "Willpower, strong-willed":                  "Berkemauan kuat",
            "Cheerful, joyful":                          "Ceria, gembira",

            "Stubborn, unyielding":                      "Degil, tidak mudah mengalah",
            "Attractive, charming, attracts others":     "Menarik, menawan, memikat orang lain",
            "Systematic":                                "Sistematik",
            "Pleasing":                                  "Menyenangkan hati",

            "Restless, unable to rest or relax":         "Resah, tidak boleh berehat",
            "Neighbourly, friendly":                     "Mesra jiran, mudah didekati",
            "Popular, liked by many or most people":     "Popular, disukai ramai",
            "Orderly, neat":                             "Teratur, kemas",

            "Critical thinker":                          "Pemikir kritis",
            "Challenging, assertive":                    "Suka mencabar, tegas",
            "Casual, laid-back":                         "Santai, tidak terburu-buru",
            "Light-hearted, carefree":                   "Ringan hati, tidak kisah sangat",

            "Brave, unafraid, courageous":               "Berani, tidak gentar",
            "Inspiring, motivating":                     "Memberi inspirasi, memotivasikan",
            "Avoid confrontation":                       "Mengelak konfrontasi",
            "Quiet, composed":                           "Pendiam, tenang",

            "Cautious, wary, careful":                   "Berhati-hati, waspada",
            "Determined, decided, unwavering, stand firm":"Tekad, tidak mudah goyah, teguh pendirian",
            "Convincing, assuring":                      "Meyakinkan, memberi keyakinan",
            "Good-natured, pleasant":                    "Baik hati, menyenangkan",

            "Jovial, joking":                            "Suka bergurau, jenaka",
            "Organised":                                 "Teratur, terancang",
            "Daring, gutsy, brazen":                     "Berani, nekat, tidak gentar",
            "Even-tempered, calm, not easily excited":   "Stabil emosi, tenang, tidak mudah teruja"
        }
    },

    // ── Motivator option text ───────────────────────────────────────────────
    motivator: {
        "zh-CN": {
            // Q1
            "Knowledge and Theory":           "知识与理论",
            "Achieve and Advance":            "成就与进步",
            "Structure and Traditions":       "结构与传统",
            "Harmony and Unity":              "和谐与团结",
            "Financial Return and Rewards":   "财务回报与奖励",
            "Sympathetic and Generous":       "同情心与慷慨",
            // Q2
            "Being a leader":                 "成为领导者",
            "Protecting my beliefs":          "坚守信仰",
            "Appreciating beauty or nature":  "欣赏美丽与自然",
            "Maximising my time":             "充分利用时间",
            "Serving others":                 "服务他人",
            "Expanding my knowledge":         "拓展知识",
            // Q3
            "Volunteer work":                 "志愿者工作",
            "Studying new concepts":          "学习新概念",
            "Coaching and organising others": "辅导与组织他人",
            "Investing / Spending money":     "投资 / 消费",
            "Experiencing a performance":     "欣赏表演",
            "Daily routines":                 "日常规律",
            // Q4
            "Recognition":                    "获得认可",
            "Continuing education":           "持续进修",
            "Traditional values":             "传统价值观",
            "Assisting others":               "协助他人",
            "Increasing my personal assets":  "增加个人资产",
            "Tranquil situations":            "平静的环境",
            // Q5
            "Enjoying the experience":        "享受体验",
            "Researching new ideas":          "研究新想法",
            "Growing a business":             "发展事业",
            "Leading others":                 "领导他人",
            "Applying my principles":         "践行原则",
            "Supporting humanitarian efforts":"支持人道主义事业",
            // Q6
            "Establishing structure/customs": "建立结构与规范",
            "Helping groups in need":         "帮助有需要的群体",
            "Leadership roles":               "担任领导角色",
            "Generating resources for future":"为未来创造资源",
            "Additional education":           "额外教育",
            "Beautify surroundings":          "美化环境",
            // Q7
            "Maximising resources":           "最大化资源使用",
            "Creating harmony/balance":       "创造和谐与平衡",
            "Achieving recognition":          "获得认可与荣誉",
            "Charitable contribution":        "慈善贡献",
            "Gaining knowledge":              "获取知识",
            "Structured framework":           "结构化框架",
            // Q8
            "Help for the homeless":          "帮助无家可归者",
            "Creating a winning strategy":    "制定制胜策略",
            "Lifelong learning":              "终身学习",
            "Harmony in life":                "生活和谐",
            "Improving productivity":         "提高效率与生产力",
            "Living by principles":           "按原则生活",
            // Q9
            "Humanitarian leader":            "人道主义领袖",
            "Distinguished leader":           "杰出领导者",
            "Enterprising leader":            "创业型领袖",
            "Harmonious leader":              "和谐型领袖",
            "Intellectual leader":            "知识型领袖",
            "Principled leader":              "原则性领袖",
            // Q10
            "Helping the sick and disadvantaged": "帮助病患与弱势群体",
            "Building a business":            "建立事业",
            "Building and following traditions":  "建立与遵循传统",
            "Creating an attractive environment": "创造吸引人的环境",
            "Developing educational resources":   "开发教育资源",
            "Building a winning team":        "建立优秀团队",
            // Q11
            "Helping others":                 "帮助他人",
            "Advancing my position in life":  "提升人生地位",
            "Financial flexibility":          "财务灵活性",
            "Expanding my understanding":     "扩展理解与认知",
            "Imaginative expression":         "创意表达",
            "Sharing my beliefs":             "分享信仰",
            // Q12
            "Proving new concepts":           "验证新概念",
            "Experiencing the environment":   "体验周围环境",
            "Giving back to society":         "回馈社会",
            "Return on my investment":        "获得投资回报",
            "Directing a group":              "领导与指导团队",
            "Traditional activities":         "传统活动"
        },

        ms: {
            // Q1
            "Knowledge and Theory":           "Ilmu dan Teori",
            "Achieve and Advance":            "Capai dan Maju",
            "Structure and Traditions":       "Struktur dan Tradisi",
            "Harmony and Unity":              "Harmoni dan Perpaduan",
            "Financial Return and Rewards":   "Pulangan Kewangan dan Ganjaran",
            "Sympathetic and Generous":       "Bersimpati dan Pemurah",
            // Q2
            "Being a leader":                 "Menjadi pemimpin",
            "Protecting my beliefs":          "Melindungi kepercayaan saya",
            "Appreciating beauty or nature":  "Menghargai keindahan atau alam",
            "Maximising my time":             "Memaksimumkan masa saya",
            "Serving others":                 "Berkhidmat kepada orang lain",
            "Expanding my knowledge":         "Meluaskan pengetahuan saya",
            // Q3
            "Volunteer work":                 "Kerja sukarela",
            "Studying new concepts":          "Mempelajari konsep baru",
            "Coaching and organising others": "Melatih dan mengatur orang lain",
            "Investing / Spending money":     "Melabur / Membelanjakan wang",
            "Experiencing a performance":     "Menonton persembahan",
            "Daily routines":                 "Rutin harian",
            // Q4
            "Recognition":                    "Pengiktirafan",
            "Continuing education":           "Pendidikan berterusan",
            "Traditional values":             "Nilai-nilai tradisional",
            "Assisting others":               "Membantu orang lain",
            "Increasing my personal assets":  "Meningkatkan aset peribadi",
            "Tranquil situations":            "Situasi yang tenang",
            // Q5
            "Enjoying the experience":        "Menikmati pengalaman",
            "Researching new ideas":          "Menyelidiki idea baru",
            "Growing a business":             "Mengembangkan perniagaan",
            "Leading others":                 "Memimpin orang lain",
            "Applying my principles":         "Mengamalkan prinsip saya",
            "Supporting humanitarian efforts":"Menyokong usaha kemanusiaan",
            // Q6
            "Establishing structure/customs": "Mewujudkan struktur dan adat",
            "Helping groups in need":         "Membantu kumpulan yang memerlukan",
            "Leadership roles":               "Peranan kepimpinan",
            "Generating resources for future":"Menjana sumber untuk masa depan",
            "Additional education":           "Pendidikan tambahan",
            "Beautify surroundings":          "Memperindah persekitaran",
            // Q7
            "Maximising resources":           "Memaksimumkan sumber",
            "Creating harmony/balance":       "Mewujudkan harmoni dan keseimbangan",
            "Achieving recognition":          "Mencapai pengiktirafan",
            "Charitable contribution":        "Sumbangan amal",
            "Gaining knowledge":              "Menambah pengetahuan",
            "Structured framework":           "Rangka kerja berstruktur",
            // Q8
            "Help for the homeless":          "Membantu gelandangan",
            "Creating a winning strategy":    "Mewujudkan strategi kemenangan",
            "Lifelong learning":              "Pembelajaran sepanjang hayat",
            "Harmony in life":                "Harmoni dalam kehidupan",
            "Improving productivity":         "Meningkatkan produktiviti",
            "Living by principles":           "Hidup berprinsip",
            // Q9
            "Humanitarian leader":            "Pemimpin kemanusiaan",
            "Distinguished leader":           "Pemimpin terkemuka",
            "Enterprising leader":            "Pemimpin yang berani",
            "Harmonious leader":              "Pemimpin yang harmoni",
            "Intellectual leader":            "Pemimpin intelektual",
            "Principled leader":              "Pemimpin berprinsip",
            // Q10
            "Helping the sick and disadvantaged": "Membantu orang sakit dan kurang bernasib baik",
            "Building a business":            "Membina perniagaan",
            "Building and following traditions":  "Membina dan mengikuti tradisi",
            "Creating an attractive environment": "Mewujudkan persekitaran yang menarik",
            "Developing educational resources":   "Membangunkan sumber pendidikan",
            "Building a winning team":        "Membina pasukan yang berjaya",
            // Q11
            "Helping others":                 "Membantu orang lain",
            "Advancing my position in life":  "Memajukan kedudukan dalam kehidupan",
            "Financial flexibility":          "Fleksibiliti kewangan",
            "Expanding my understanding":     "Meluaskan kefahaman saya",
            "Imaginative expression":         "Ekspresi imaginatif",
            "Sharing my beliefs":             "Berkongsi kepercayaan saya",
            // Q12
            "Proving new concepts":           "Membuktikan konsep baru",
            "Experiencing the environment":   "Mengalami persekitaran",
            "Giving back to society":         "Memberi kembali kepada masyarakat",
            "Return on my investment":        "Pulangan pelaburan saya",
            "Directing a group":              "Mengarah kumpulan",
            "Traditional activities":         "Aktiviti tradisional"
        }
    }
};

// ── DISC option descriptions ──────────────────────────────────────────────────
// Keyed by the English option text (same key as disc translations above)
const DESC_TRANSLATIONS = {
    "zh-CN": {
        // Q1
        "Careful, calculating":                      "您在做决定时深思熟虑，考虑所有细节",
        "Bold, daring":                              "您愿意承担风险，勇于直面挑战",
        "Supportive":                                "您积极帮助和鼓励他人",
        "Charming, delightful":                      "您天生能以愉快的个性吸引他人",
        // Q2
        "Willing, agreeable":                        "您善于合作，愿意配合他人的计划",
        "Eager, impatient":                          "您希望快速行动，立即完成任务",
        "Methodical":                                "您采用有系统、按步就班的方式做事",
        "High-spirited, lively, enthusiastic":       "您为每一个场合注入活力和热情",
        // Q3
        "Logical":                                   "您根据事实和理性思考做决定",
        "Obedient, will do as told, dutiful":        "您可靠地履行职责，忠实执行指示",
        "Unconquerable, determined":                 "您面对障碍时坚持不懈，不轻易放弃",
        "Playful, full of fun":                      "您为互动带来欢乐和轻松愉快的氛围",
        // Q4
        "Adventurous, willing to take chances":      "您喜欢探索新体验，勇于面对不确定性",
        "Analytical":                                "您善于将复杂问题分解成可处理的部分",
        "Cordial, warm, friendly":                   "您为他人创造温馨舒适的环境",
        "Moderate, avoids extremes":                 "您偏好平衡、稳妥的处事方式",
        // Q5
        "Good mixer, likes being with others":       "您享受社交场合，喜欢与人建立联系",
        "Structured":                                "您偏好有组织的系统和清晰的框架",
        "Vigorous, energetic":                       "您以高度的能量和热情投入每项工作",
        "Lenient, tolerant of others' actions":      "您给予他人信任，展现耐心与包容",
        // Q6
        "Challenger, takes action":                  "您直接面对问题，勇于主动出击",
        "Life of the party, outgoing, entertaining": "您为团队注入活力，让社交场合更愉快",
        "Easy mark, easily taken advantage of":      "您容易信任他人，有时会过于顺从",
        "Fearful, afraid":                           "您面对新情境时会保持谨慎和小心",
        // Q7
        "Well-disciplined, self-controlled":         "您自律自控，对承诺始终如一",
        "Generous, willing to share":                "您慷慨地给予时间、资源和支持",
        "Animated, uses gestures for expression":    "您善用肢体语言表达情感，表情生动丰富",
        "Persistent, unrelenting, refuses to quit":  "您面对挫折仍坚定地朝目标前进",
        // Q8
        "Factual":                                   "您专注于具体信息和可核实的数据",
        "Obliging, helpful":                         "您乐于协助他人，满足他人的需求",
        "Willpower, strong-willed":                  "您有强大的意志力去实现自己的目标",
        "Cheerful, joyful":                          "您保持积极心态，为他人带来快乐",
        // Q9
        "Stubborn, unyielding":                      "您坚持自己的立场，不轻易改变想法",
        "Attractive, charming, attracts others":     "您有吸引人的个性，自然而然地吸引他人",
        "Systematic":                                "您以有条理、系统化的方式处理任务",
        "Pleasing":                                  "您以让他人感到满意和快乐为目标",
        // Q10
        "Restless, unable to rest or relax":         "您需要保持活跃状态，不断向前推进",
        "Neighbourly, friendly":                     "您平易近人，与周围的人保持良好关系",
        "Popular, liked by many or most people":     "您广受欢迎，被众多人喜爱和欣赏",
        "Orderly, neat":                             "您偏好整洁有序的环境和系统化的方式",
        // Q11
        "Critical thinker":                          "您仔细分析信息，善于质疑假设",
        "Challenging, assertive":                    "您挑战现状，推动更好的解决方案",
        "Casual, laid-back":                         "您以轻松随意的方式应对各种情况",
        "Light-hearted, carefree":                   "您不太担忧，善于在日常生活中发现乐趣",
        // Q12
        "Brave, unafraid, courageous":               "您毫无畏惧地面对困难和挑战",
        "Inspiring, motivating":                     "您鼓励他人发挥最佳潜能，实现目标",
        "Avoid confrontation":                       "您偏好和谐，尽量避免或化解冲突",
        "Quiet, composed":                           "您保持冷静，深思熟虑后才发言行动",
        // Q13
        "Cautious, wary, careful":                   "您在行动前会仔细考虑潜在风险",
        "Determined, decided, unwavering, stand firm":"您坚守决定，不轻易改变方向",
        "Convincing, assuring":                      "您能够说服他人，给予他们信心",
        "Good-natured, pleasant":                    "您天生性情温和，令人愉快相处",
        // Q14
        "Jovial, joking":                            "您用幽默化解紧张气氛，逗人发笑",
        "Organised":                                 "您以系统化的方式组织工作和环境",
        "Daring, gutsy, brazen":                     "您敢于采取大胆行动，即使他人犹豫",
        "Even-tempered, calm, not easily excited":   "无论什么情况，您都能保持情绪稳定"
    },

    ms: {
        // Q1
        "Careful, calculating":                      "Anda berfikir dengan teliti sebelum membuat keputusan dan mempertimbangkan semua butiran",
        "Bold, daring":                              "Anda bersedia mengambil risiko dan menghadapi cabaran secara langsung",
        "Supportive":                                "Anda membantu dan menggalakkan orang lain dalam usaha mereka",
        "Charming, delightful":                      "Anda secara semula jadi menarik orang lain dengan personaliti yang menyenangkan",
        // Q2
        "Willing, agreeable":                        "Anda bekerjasama dan bersedia mengikut pelan orang lain",
        "Eager, impatient":                          "Anda ingin bertindak cepat dan menyelesaikan tugas dengan segera",
        "Methodical":                                "Anda mengikuti pendekatan yang sistematik dan berperingkat",
        "High-spirited, lively, enthusiastic":       "Anda membawa tenaga dan semangat ke setiap situasi",
        // Q3
        "Logical":                                   "Anda membuat keputusan berdasarkan fakta dan pemikiran rasional",
        "Obedient, will do as told, dutiful":        "Anda mengikuti arahan dan memenuhi tanggungjawab dengan boleh dipercayai",
        "Unconquerable, determined":                 "Anda tabah menghadapi halangan dan tidak mudah berputus asa",
        "Playful, full of fun":                      "Anda membawa kegembiraan dan suasana ringan dalam interaksi",
        // Q4
        "Adventurous, willing to take chances":      "Anda mencari pengalaman baru dan menerima ketidakpastian",
        "Analytical":                                "Anda memecahkan masalah kompleks kepada bahagian yang lebih mudah diurus",
        "Cordial, warm, friendly":                   "Anda mewujudkan suasana yang mesra dan selesa untuk orang lain",
        "Moderate, avoids extremes":                 "Anda lebih suka pendekatan yang seimbang dan terukur",
        // Q5
        "Good mixer, likes being with others":       "Anda menikmati situasi sosial dan suka berhubung dengan orang ramai",
        "Structured":                                "Anda lebih suka sistem yang teratur dan rangka kerja yang jelas",
        "Vigorous, energetic":                       "Anda mendekati tugas dengan tenaga dan intensiti yang tinggi",
        "Lenient, tolerant of others' actions":      "Anda memberi kepercayaan kepada orang lain dan menunjukkan kesabaran",
        // Q6
        "Challenger, takes action":                  "Anda menghadapi masalah secara langsung dan mengambil inisiatif",
        "Life of the party, outgoing, entertaining": "Anda memberi tenaga kepada kumpulan dan menjadikan situasi sosial lebih menyeronokkan",
        "Easy mark, easily taken advantage of":      "Anda mudah mempercayai orang lain dan mungkin terlalu menurut",
        "Fearful, afraid":                           "Anda mendekati situasi baru dengan berhati-hati dan perasaan cemas",
        // Q7
        "Well-disciplined, self-controlled":         "Anda mengawal tingkah laku anda dan berpegang pada komitmen",
        "Generous, willing to share":                "Anda dengan murah hati memberi masa, sumber dan sokongan kepada orang lain",
        "Animated, uses gestures for expression":    "Anda berkomunikasi dengan seluruh badan dan menunjukkan emosi secara terbuka",
        "Persistent, unrelenting, refuses to quit":  "Anda terus bekerja ke arah matlamat walaupun menghadapi kemunduran",
        // Q8
        "Factual":                                   "Anda fokus kepada maklumat konkrit dan data yang boleh disahkan",
        "Obliging, helpful":                         "Anda bersedia membantu orang lain dan memenuhi keperluan mereka",
        "Willpower, strong-willed":                  "Anda mempunyai tekad untuk mencapai matlamat anda",
        "Cheerful, joyful":                          "Anda mengekalkan mood yang positif dan membawa kebahagiaan kepada orang lain",
        // Q9
        "Stubborn, unyielding":                      "Anda berpegang pada pendirian anda dan menentang perubahan fikiran",
        "Attractive, charming, attracts others":     "Anda mempunyai personaliti yang menarik dan memikat orang lain",
        "Systematic":                                "Anda menggunakan pendekatan yang teratur dan sistematik dalam tugas",
        "Pleasing":                                  "Anda bertujuan untuk membuat orang lain gembira dan berpuas hati",
        // Q10
        "Restless, unable to rest or relax":         "Anda merasakan keperluan untuk kekal aktif dan terus bergerak maju",
        "Neighbourly, friendly":                     "Anda mudah didekati dan mengekalkan hubungan baik dengan orang sekeliling",
        "Popular, liked by many or most people":     "Anda dihormati dan disukai oleh ramai orang",
        "Orderly, neat":                             "Anda lebih suka persekitaran yang teratur, kemas dan pendekatan sistematik",
        // Q11
        "Critical thinker":                          "Anda menganalisis maklumat dengan teliti dan mempersoalkan andaian",
        "Challenging, assertive":                    "Anda mempersoalkan status quo dan mendorong penyelesaian yang lebih baik",
        "Casual, laid-back":                         "Anda mendekati situasi dengan cara yang santai dan tidak formal",
        "Light-hearted, carefree":                   "Anda tidak terlalu bimbang dan mencari kegembiraan dalam kehidupan seharian",
        // Q12
        "Brave, unafraid, courageous":               "Anda menghadapi situasi yang sukar tanpa rasa takut atau teragak-agak",
        "Inspiring, motivating":                     "Anda menggalakkan orang lain untuk mencapai yang terbaik dan matlamat mereka",
        "Avoid confrontation":                       "Anda lebih suka keharmonian dan cuba mengelak atau melarikan diri dari konflik",
        "Quiet, composed":                           "Anda kekal tenang dan bercakap dengan penuh pertimbangan",
        // Q13
        "Cautious, wary, careful":                   "Anda memikirkan risiko yang berpotensi sebelum mengambil tindakan",
        "Determined, decided, unwavering, stand firm":"Anda komited dengan keputusan anda dan tidak mudah bertukar arah",
        "Convincing, assuring":                      "Anda boleh memujuk orang lain dan memberi mereka keyakinan",
        "Good-natured, pleasant":                    "Anda mempunyai perwatakan yang positif secara semula jadi dan menyenangkan",
        // Q14
        "Jovial, joking":                            "Anda menggunakan humor untuk meringankan situasi dan membuat orang lain ketawa",
        "Organised":                                 "Anda menyusun kerja dan persekitaran anda dengan cara yang sistematik",
        "Daring, gutsy, brazen":                     "Anda mengambil tindakan berani walaupun orang lain mungkin teragak-agak",
        "Even-tempered, calm, not easily excited":   "Anda mengekalkan kestabilan emosi dalam apa jua keadaan"
    }
};

// ── Helpers ───────────────────────────────────────────────────────────────────

// Get translated option text (falls back to English)
function getQTranslation(englishText, section) {
    const lang = getLang();
    if (lang === 'en') return englishText;
    return QUESTION_TRANSLATIONS?.[section]?.[lang]?.[englishText] || englishText;
}

// Get translated DISC option description (falls back to original)
function getDescTranslation(englishOptionText, originalDesc) {
    const lang = getLang();
    if (lang === 'en') return originalDesc;
    return DESC_TRANSLATIONS?.[lang]?.[englishOptionText] || originalDesc;
}

window.QUESTION_TRANSLATIONS = QUESTION_TRANSLATIONS;
window.DESC_TRANSLATIONS      = DESC_TRANSLATIONS;
window.getQTranslation        = getQTranslation;
window.getDescTranslation     = getDescTranslation;
