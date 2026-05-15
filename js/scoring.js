// ── Scoring Engine ────────────────────────────────────────────────────────────
// DISC model: "extremes"  → rank 1=+3, 2=+1, 3=−1, 4=−3
// Motivator model: "linear5to0" → rank 1=5, 2=4, 3=3, 4=2, 5=1, 6=0

const DISC_SCORES_MAP    = { 1: 3, 2: 1, 3: -1, 4: -3 };
const MOT_SCORES_MAP     = { 1: 5, 2: 4, 3: 3, 4: 2, 5: 1, 6: 0 };

// Max theoretical scores used for normalisation
const DISC_MAX   = 14 * 3;  // 42
const DISC_MIN   = 14 * -3; // -42
const MOT_MAX    = 12 * 5;  // 60

function calculateDISC(set1) {
    const scores = { D: 0, I: 0, S: 0, C: 0 };
    set1.forEach(response => {
        const question = DISC_QUESTIONS.find(q => q.id === response.id);
        if (!question) return;
        response.order.forEach((optText, idx) => {
            const opt = question.options.find(o => o.text === optText);
            if (!opt) return;
            const rankScore = DISC_SCORES_MAP[idx + 1] || 0;
            scores[opt.type] += rankScore;
        });
    });
    return scores;
}

function calculateMotivators(set2) {
    const scores = { T: 0, U: 0, A: 0, Soc: 0, Ind: 0, Trad: 0 };
    set2.forEach(response => {
        const question = MOTIVATOR_QUESTIONS.find(q => q.id === response.id);
        if (!question) return;
        response.order.forEach((optText, idx) => {
            const opt = question.options.find(o => o.text === optText);
            if (!opt) return;
            const rankScore = MOT_SCORES_MAP[idx + 1] || 0;
            scores[opt.type] += rankScore;
        });
    });
    return scores;
}

// Normalise DISC raw score → 0–100 percentage
function normDisc(rawScore) {
    return Math.round(((rawScore - DISC_MIN) / (DISC_MAX - DISC_MIN)) * 100);
}

// Normalise Motivator raw score → 0–100 percentage
function normMot(rawScore) {
    return Math.round((rawScore / MOT_MAX) * 100);
}

function sortedKeys(obj) {
    return Object.keys(obj).sort((a, b) => obj[b] - obj[a]);
}

// ── DISC Descriptions ─────────────────────────────────────────────────────────
const DISC_INFO = {
    D: {
        label:    "D — Dominance",
        emoji:    "🔴",
        tagline:  "The Driver",
        summary:  "You are results-oriented, decisive, and direct. You thrive on challenges and are motivated by winning. When obstacles appear, you push through — not around. You set the pace and expect others to keep up.",
        strengths:   ["Results-focused", "Decisive", "Confident", "Goal-driven", "Direct communicator"],
        watchouts:   ["Can appear blunt", "Impatient", "May overlook feelings"],
        motivatedBy: "Challenges, authority, autonomy, competition",
        communicationTip: "Be direct and brief. Skip the small talk. Present results and let them decide."
    },
    I: {
        label:    "I — Influence",
        emoji:    "🟡",
        tagline:  "The Inspirer",
        summary:  "You are enthusiastic, optimistic, and people-oriented. You light up a room with your energy and naturally inspire others. You thrive in collaborative, social environments and motivate people through your positive outlook.",
        strengths:   ["Enthusiastic", "Persuasive", "Collaborative", "Optimistic", "Creative communicator"],
        watchouts:   ["Can over-talk", "May avoid details", "Follow-through can be inconsistent"],
        motivatedBy: "Recognition, fun, social approval, relationships",
        communicationTip: "Be warm and engaging. Give them a chance to share ideas. Celebrate wins together."
    },
    S: {
        label:    "S — Steadiness",
        emoji:    "🟢",
        tagline:  "The Supporter",
        summary:  "You are calm, patient, and deeply loyal. You create stability for those around you and are the anchor in every team. You prefer harmony over conflict and consistency over chaos.",
        strengths:   ["Patient", "Loyal", "Supportive", "Reliable", "Great listener"],
        watchouts:   ["Resistant to sudden change", "May over-accommodate", "Avoids conflict"],
        motivatedBy: "Stability, harmony, sincere appreciation, belonging",
        communicationTip: "Create a safe, relaxed environment. Allow time to decide. Show genuine care."
    },
    C: {
        label:    "C — Conscientiousness",
        emoji:    "🔵",
        tagline:  "The Analyst",
        summary:  "You are precise, systematic, and quality-focused. You bring structure and accuracy to everything you do. You think before you act and hold yourself (and others) to high standards.",
        strengths:   ["Accurate", "Systematic", "Quality-focused", "Critical thinker", "Well-prepared"],
        watchouts:   ["May over-analyse", "Hesitant in decisions", "Can be overly critical"],
        motivatedBy: "Accuracy, quality, standards, being right",
        communicationTip: "Provide data, evidence, and details. Allow time to process. Avoid surprises."
    }
};

// ── Motivator Descriptions ────────────────────────────────────────────────────
const MOT_INFO = {
    T: {
        label:   "Theoretical (Learner)",
        emoji:   "🟣",
        summary: "Driven by the pursuit of knowledge and truth. You love to research, investigate, and understand the 'why' behind everything. Continuous learning is your fuel.",
        drives:  ["Research", "Education", "Discovering principles", "Intellectual debate"]
    },
    U: {
        label:   "Utilitarian (Achiever)",
        emoji:   "🟠",
        summary: "Driven by return on investment and practical results. You want what you do to count — financially and strategically. Efficiency, growth, and value creation motivate you deeply.",
        drives:  ["Building wealth", "Maximising ROI", "Productivity", "Growing assets"]
    },
    A: {
        label:   "Aesthetic (Creator)",
        emoji:   "🩵",
        summary: "Driven by beauty, harmony, and meaningful experience. You care about how things look and feel. Balance, form, and creative expression give your work meaning.",
        drives:  ["Beauty", "Harmony", "Creative experience", "Balanced environments"]
    },
    Soc: {
        label:   "Social (Giver)",
        emoji:   "🩷",
        summary: "Driven by making a difference in people's lives. Serving others and contributing to the community gives you a deep sense of purpose and fulfilment.",
        drives:  ["Helping others", "Volunteering", "Humanitarian causes", "Empathy in action"]
    },
    Ind: {
        label:   "Individualistic (Commander)",
        emoji:   "🔴",
        summary: "Driven by recognition, influence, and leadership. You want to make an impact, advance your position, and be the one setting the direction for others.",
        drives:  ["Leadership roles", "Recognition", "Advancing your status", "Influencing outcomes"]
    },
    Trad: {
        label:   "Traditional (Guardian)",
        emoji:   "🟢",
        summary: "Driven by systems, beliefs, and order. You find comfort and purpose in clear structures, guiding principles, and time-tested traditions that create predictability.",
        drives:  ["Structure", "Principles", "Traditions", "Order and consistency"]
    }
};

// ── DNA Combined Summary ──────────────────────────────────────────────────────
function getDNASummary(primaryDisc, topMotivator, name) {
    const discLabel = DISC_INFO[primaryDisc]?.tagline || primaryDisc;
    const motLabel  = MOT_INFO[topMotivator]?.label   || topMotivator;

    const combos = {
        "D-T":    `${name} is a Knowledge-Driven Leader — pushing boundaries with bold thinking and intellectual curiosity.`,
        "D-U":    `${name} is a Results Machine — relentless in the pursuit of goals, growth, and measurable outcomes.`,
        "D-A":    `${name} is a Visionary Challenger — combining bold drive with a passion for creating meaningful, impactful work.`,
        "D-Soc":  `${name} is a Purposeful Warrior — using decisive energy to fight for causes and people that matter.`,
        "D-Ind":  `${name} is a Power Leader — determined to win, lead, and make a lasting mark on the world.`,
        "D-Trad": `${name} is a Principled Driver — assertive and goal-focused, grounded in strong values and standards.`,
        "I-T":    `${name} is an Idea Evangelist — spreading knowledge with infectious enthusiasm and creative communication.`,
        "I-U":    `${name} is a Charismatic Achiever — turning relationships into results and energy into opportunity.`,
        "I-A":    `${name} is a Creative Connector — inspiring others through beauty, expression, and uplifting energy.`,
        "I-Soc":  `${name} is a Heart-Led Motivator — rallying others around shared causes with warmth and passion.`,
        "I-Ind":  `${name} is a Star Performer — driven by recognition and the power of personal influence to move people.`,
        "I-Trad": `${name} is a Community Champion — bridging enthusiasm with structure to build lasting positive cultures.`,
        "S-T":    `${name} is a Thoughtful Contributor — patient, analytical, and always learning to support others better.`,
        "S-U":    `${name} is a Steady Builder — consistently building value for others through reliable, practical action.`,
        "S-A":    `${name} is a Harmonious Nurturer — creating beautiful, balanced environments where people feel at ease.`,
        "S-Soc":  `${name} is a Compassionate Anchor — the person others turn to, always ready to give, support, and uplift.`,
        "S-Ind":  `${name} is a Quiet Influencer — steadily building loyalty and respect on the path to quiet leadership.`,
        "S-Trad": `${name} is a Loyal Guardian — upholding values and traditions while being the dependable heart of every team.`,
        "C-T":    `${name} is a Deep-Thinking Expert — combining systematic thinking with an insatiable desire to know more.`,
        "C-U":    `${name} is a Strategic Optimiser — using precision and data to maximise every outcome and resource.`,
        "C-A":    `${name} is a Perfectionist Creator — applying exacting standards to craft work of exceptional quality.`,
        "C-Soc":  `${name} is an Organised Humanitarian — using structure and planning to make a real difference in others' lives.`,
        "C-Ind":  `${name} is a Calculated Leader — rising through competence, preparation, and unwavering high standards.`,
        "C-Trad": `${name} is a Systems Guardian — the custodian of quality, order, and principled standards in any organisation.`,
    };

    const key = `${primaryDisc}-${topMotivator}`;
    return combos[key] || `${name} is a unique blend of ${discLabel} behavior and ${motLabel} motivation — a powerful combination that drives impactful results.`;
}

window.calculateDISC      = calculateDISC;
window.calculateMotivators = calculateMotivators;
window.normDisc           = normDisc;
window.normMot            = normMot;
window.sortedKeys         = sortedKeys;
window.DISC_INFO          = DISC_INFO;
window.MOT_INFO           = MOT_INFO;
window.getDNASummary      = getDNASummary;
