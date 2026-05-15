// ── DISC Questions (14 questions × 4 options) ──────────────────────────────
// Each option carries a `type` property: D / I / S / C
const DISC_QUESTIONS = [
    {
        id: 1,
        options: [
            { text: "Careful, calculating",       description: "You think through decisions thoroughly and consider all details",             type: "C" },
            { text: "Bold, daring",               description: "You're willing to take risks and face challenges head-on",                    type: "D" },
            { text: "Supportive",                 description: "You help and encourage others in their endeavors",                            type: "S" },
            { text: "Charming, delightful",       description: "You naturally attract others with your pleasant personality",                 type: "I" }
        ]
    },
    {
        id: 2,
        options: [
            { text: "Willing, agreeable",                    description: "You're cooperative and ready to go along with others' plans",       type: "S" },
            { text: "Eager, impatient",                      description: "You want to move quickly and get things done now",                  type: "D" },
            { text: "Methodical",                            description: "You follow systematic, step-by-step approaches",                    type: "C" },
            { text: "High-spirited, lively, enthusiastic",   description: "You bring energy and excitement to every situation",               type: "I" }
        ]
    },
    {
        id: 3,
        options: [
            { text: "Logical",                           description: "You make decisions based on facts and rational thinking",              type: "C" },
            { text: "Obedient, will do as told, dutiful", description: "You follow instructions and fulfill your responsibilities reliably", type: "S" },
            { text: "Unconquerable, determined",          description: "You persist through obstacles and don't give up easily",              type: "D" },
            { text: "Playful, full of fun",               description: "You bring joy and lightheartedness to interactions",                  type: "I" }
        ]
    },
    {
        id: 4,
        options: [
            { text: "Adventurous, willing to take chances", description: "You seek new experiences and embrace uncertainty",                 type: "D" },
            { text: "Analytical",                           description: "You break down complex problems into manageable parts",              type: "C" },
            { text: "Cordial, warm, friendly",              description: "You create welcoming, comfortable atmospheres for others",          type: "I" },
            { text: "Moderate, avoids extremes",            description: "You prefer balanced, measured approaches to situations",            type: "S" }
        ]
    },
    {
        id: 5,
        options: [
            { text: "Good mixer, likes being with others",    description: "You enjoy social situations and connecting with people",         type: "I" },
            { text: "Structured",                             description: "You prefer organized systems and clear frameworks",               type: "C" },
            { text: "Vigorous, energetic",                    description: "You approach tasks with high energy and intensity",               type: "D" },
            { text: "Lenient, tolerant of others' actions",   description: "You give others the benefit of the doubt and show patience",    type: "S" }
        ]
    },
    {
        id: 6,
        options: [
            { text: "Challenger, takes action",              description: "You confront problems directly and take initiative",              type: "D" },
            { text: "Life of the party, outgoing, entertaining", description: "You energize groups and make social situations enjoyable",   type: "I" },
            { text: "Easy mark, easily taken advantage of",  description: "You trust others readily and may be too accommodating",         type: "S" },
            { text: "Fearful, afraid",                       description: "You approach new situations with caution and anxiety",           type: "C" }
        ]
    },
    {
        id: 7,
        options: [
            { text: "Well-disciplined, self-controlled",    description: "You regulate your behavior and stick to your commitments",       type: "C" },
            { text: "Generous, willing to share",           description: "You freely give your time, resources, and support to others",    type: "S" },
            { text: "Animated, uses gestures for expression", description: "You communicate with your whole body and show emotion openly", type: "I" },
            { text: "Persistent, unrelenting, refuses to quit", description: "You continue working toward goals despite setbacks",        type: "D" }
        ]
    },
    {
        id: 8,
        options: [
            { text: "Factual",           description: "You focus on concrete information and verifiable data",         type: "C" },
            { text: "Obliging, helpful", description: "You're willing to assist others and meet their needs",          type: "S" },
            { text: "Willpower, strong-willed", description: "You have the determination to achieve your goals",       type: "D" },
            { text: "Cheerful, joyful",  description: "You maintain a positive mood and bring happiness to others",   type: "I" }
        ]
    },
    {
        id: 9,
        options: [
            { text: "Stubborn, unyielding",            description: "You stick to your position and resist changing your mind",           type: "D" },
            { text: "Attractive, charming, attracts others", description: "You have an appealing personality that draws people in",       type: "I" },
            { text: "Systematic",                      description: "You use organized, methodical approaches to tasks",                  type: "C" },
            { text: "Pleasing",                        description: "You aim to make others happy and satisfied",                         type: "S" }
        ]
    },
    {
        id: 10,
        options: [
            { text: "Restless, unable to rest or relax",   description: "You feel the need to stay active and keep moving forward",     type: "D" },
            { text: "Neighbourly, friendly",               description: "You're approachable and maintain good relationships",           type: "S" },
            { text: "Popular, liked by many or most people", description: "You're well-regarded and enjoyed by a wide range of people", type: "I" },
            { text: "Orderly, neat",                       description: "You prefer organized, tidy environments and systematic approaches", type: "C" }
        ]
    },
    {
        id: 11,
        options: [
            { text: "Critical thinker",        description: "You analyze information carefully and question assumptions",        type: "C" },
            { text: "Challenging, assertive",  description: "You question the status quo and push for better solutions",         type: "D" },
            { text: "Casual, laid-back",       description: "You approach situations in a relaxed, informal manner",             type: "S" },
            { text: "Light-hearted, carefree", description: "You don't worry much and find joy in everyday moments",             type: "I" }
        ]
    },
    {
        id: 12,
        options: [
            { text: "Brave, unafraid, courageous", description: "You face difficult situations without fear or hesitation",          type: "D" },
            { text: "Inspiring, motivating",       description: "You encourage others to achieve their best and reach their goals", type: "I" },
            { text: "Avoid confrontation",         description: "You prefer harmony and try to prevent or escape conflicts",         type: "S" },
            { text: "Quiet, composed",             description: "You remain calm and speak thoughtfully rather than impulsively",   type: "C" }
        ]
    },
    {
        id: 13,
        options: [
            { text: "Cautious, wary, careful",                    description: "You think through potential risks before taking action",              type: "C" },
            { text: "Determined, decided, unwavering, stand firm", description: "You commit to your decisions and don't easily change course",        type: "D" },
            { text: "Convincing, assuring",                        description: "You can persuade others and give them confidence in your ideas",     type: "I" },
            { text: "Good-natured, pleasant",                      description: "You have a naturally positive disposition and are enjoyable to be around", type: "S" }
        ]
    },
    {
        id: 14,
        options: [
            { text: "Jovial, joking",                      description: "You use humor to lighten situations and make others laugh",            type: "I" },
            { text: "Organised",                           description: "You structure your work and environment in systematic ways",             type: "C" },
            { text: "Daring, gutsy, brazen",               description: "You take bold action even when others might hesitate",                  type: "D" },
            { text: "Even-tempered, calm, not easily excited", description: "You maintain emotional stability regardless of circumstances",      type: "S" }
        ]
    }
];

// ── Motivator Questions (12 questions × 6 options) ─────────────────────────
// Types: T=Theoretical, U=Utilitarian, A=Aesthetic, Soc=Social, Ind=Individualistic, Trad=Traditional
const MOTIVATOR_QUESTIONS = [
    {
        id: 1,
        options: [
            { text: "Knowledge and Theory",       type: "T"    },
            { text: "Achieve and Advance",         type: "Ind"  },
            { text: "Structure and Traditions",    type: "Trad" },
            { text: "Harmony and Unity",           type: "A"    },
            { text: "Financial Return and Rewards",type: "U"    },
            { text: "Sympathetic and Generous",    type: "Soc"  }
        ]
    },
    {
        id: 2,
        options: [
            { text: "Being a leader",              type: "Ind"  },
            { text: "Protecting my beliefs",       type: "Trad" },
            { text: "Appreciating beauty or nature", type: "A"  },
            { text: "Maximising my time",          type: "U"    },
            { text: "Serving others",              type: "Soc"  },
            { text: "Expanding my knowledge",      type: "T"    }
        ]
    },
    {
        id: 3,
        options: [
            { text: "Volunteer work",              type: "Soc"  },
            { text: "Studying new concepts",       type: "T"    },
            { text: "Coaching and organising others", type: "Ind"},
            { text: "Investing / Spending money",  type: "U"    },
            { text: "Experiencing a performance",  type: "A"    },
            { text: "Daily routines",              type: "Trad" }
        ]
    },
    {
        id: 4,
        options: [
            { text: "Recognition",                 type: "Ind"  },
            { text: "Continuing education",        type: "T"    },
            { text: "Traditional values",          type: "Trad" },
            { text: "Assisting others",            type: "Soc"  },
            { text: "Increasing my personal assets", type: "U"  },
            { text: "Tranquil situations",         type: "A"    }
        ]
    },
    {
        id: 5,
        options: [
            { text: "Enjoying the experience",     type: "A"    },
            { text: "Researching new ideas",       type: "T"    },
            { text: "Growing a business",          type: "U"    },
            { text: "Leading others",              type: "Ind"  },
            { text: "Applying my principles",      type: "Trad" },
            { text: "Supporting humanitarian efforts", type: "Soc"}
        ]
    },
    {
        id: 6,
        options: [
            { text: "Establishing structure/customs", type: "Trad"},
            { text: "Helping groups in need",      type: "Soc"  },
            { text: "Leadership roles",            type: "Ind"  },
            { text: "Generating resources for future", type: "U"},
            { text: "Additional education",        type: "T"    },
            { text: "Beautify surroundings",       type: "A"    }
        ]
    },
    {
        id: 7,
        options: [
            { text: "Maximising resources",        type: "U"    },
            { text: "Creating harmony/balance",    type: "A"    },
            { text: "Achieving recognition",       type: "Ind"  },
            { text: "Charitable contribution",     type: "Soc"  },
            { text: "Gaining knowledge",           type: "T"    },
            { text: "Structured framework",        type: "Trad" }
        ]
    },
    {
        id: 8,
        options: [
            { text: "Help for the homeless",       type: "Soc"  },
            { text: "Creating a winning strategy", type: "Ind"  },
            { text: "Lifelong learning",           type: "T"    },
            { text: "Harmony in life",             type: "A"    },
            { text: "Improving productivity",      type: "U"    },
            { text: "Living by principles",        type: "Trad" }
        ]
    },
    {
        id: 9,
        options: [
            { text: "Humanitarian leader",         type: "Soc"  },
            { text: "Distinguished leader",        type: "Ind"  },
            { text: "Enterprising leader",         type: "U"    },
            { text: "Harmonious leader",           type: "A"    },
            { text: "Intellectual leader",         type: "T"    },
            { text: "Principled leader",           type: "Trad" }
        ]
    },
    {
        id: 10,
        options: [
            { text: "Helping the sick and disadvantaged", type: "Soc"},
            { text: "Building a business",         type: "U"    },
            { text: "Building and following traditions", type: "Trad"},
            { text: "Creating an attractive environment", type: "A"},
            { text: "Developing educational resources", type: "T"},
            { text: "Building a winning team",     type: "Ind"  }
        ]
    },
    {
        id: 11,
        options: [
            { text: "Helping others",              type: "Soc"  },
            { text: "Advancing my position in life", type: "Ind"},
            { text: "Financial flexibility",       type: "U"    },
            { text: "Expanding my understanding",  type: "T"    },
            { text: "Imaginative expression",      type: "A"    },
            { text: "Sharing my beliefs",          type: "Trad" }
        ]
    },
    {
        id: 12,
        options: [
            { text: "Proving new concepts",        type: "T"    },
            { text: "Experiencing the environment", type: "A"   },
            { text: "Giving back to society",      type: "Soc"  },
            { text: "Return on my investment",     type: "U"    },
            { text: "Directing a group",           type: "Ind"  },
            { text: "Traditional activities",      type: "Trad" }
        ]
    }
];

window.DISC_QUESTIONS = DISC_QUESTIONS;
window.MOTIVATOR_QUESTIONS = MOTIVATOR_QUESTIONS;
