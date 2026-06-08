const debateDatabase = {
    "social media": {
        for: [
            "Enhances global communication and keeps friends/families connected.",
            "Provides a massive platform for small businesses and independent creators.",
            "Offers instant access to real-time educational content and news."
        ],
        against: [
            "Can negatively affect mental health, increasing anxiety and loneliness.",
            "Accelerates the spread of misinformation and fake news.",
            "Creates addictive screen-time habits and decreases productivity."
        ],
        conclusion: "Social media is an incredibly powerful modern tool. While it democratizes information and connects the globe, users must actively manage its psychological impacts."
    },
    "ai art": {
        for: [
            "Democratizes creativity, letting anyone visually realize their concepts.",
            "Acts as an incredibly fast brainstorming tool for commercial artists.",
            "Drastically reduces time and production costs for independent developers."
        ],
        against: [
            "Often trains models on copyrighted material without artists' explicit consent.",
            "Devalues human craftsmanship and threatens traditional creative careers.",
            "Lacks genuine human emotional depth and intentional expression."
        ],
        conclusion: "AI art marks a massive shift in creative workflows. It serves beautifully as an assistant, but clear ethical boundaries regarding artist compensation remain critical."
    },
    "school uniforms": {
        for: [
            "Reduces peer economic pressure and levels the social playing field.",
            "Fosters a stronger sense of school identity, community, and discipline.",
            "Saves parents money and simplifies morning routines significantly."
        ],
        against: [
            "Restricts students' personal self-expression and individuality.",
            "Can be an uncomfortable or impractical financial burden if quality is poor.",
            "Does not directly improve academic performance or fix deeper social issues."
        ],
        conclusion: "School uniforms offer distinct logistical and social equalizing benefits, though they do push back on personal expression during developmental years."
    }
};

const topicInput = document.getElementById('topic-input');
const generateBtn = document.getElementById('generate-btn');
const errorMessage = document.getElementById('error-message');
const resultsSection = document.getElementById('results-section');
const displayTopic = document.getElementById('display-topic');
const argumentsForList = document.getElementById('arguments-for');
const argumentsAgainstList = document.getElementById('arguments-against');
const neutralConclusionText = document.getElementById('neutral-conclusion');

generateBtn.addEventListener('click', handleDebateGeneration);
topicInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') handleDebateGeneration();
});

function handleDebateGeneration() {
    const rawInput = topicInput.value;
    const cleanInput = rawInput.trim().toLowerCase();

    if (cleanInput === "") {
        showError("Please enter a topic to start the debate!");
        hideResults();
        return;
    }

    clearError();
    let debateData = debateDatabase[cleanInput] || generateGenericDebate(rawInput);
    renderDebateResults(rawInput, debateData);
}

function generateGenericDebate(topic) {
    return {
        for: [
            `Adopting "${topic}" introduces innovation and opens up brand new possibilities.`,
            `It solves efficiency issues and provides convenience for many individuals.`,
            `Supporters argue that "${topic}" is a natural step forward for modern society.`
        ],
        against: [
            `Implementing "${topic}" risks unintended economic or social complications.`,
            `It could lead to a loss of traditional values or raise security/privacy concerns.`,
            `Critics claim that "${topic}" lacks sufficient long-term regulation and oversight.`
        ],
        conclusion: `The debate surrounding "${topic}" highlights a classic tension between progress and caution. Moving forward responsibly requires weighing the immediate innovations against potential setbacks.`
    };
}

function renderDebateResults(topic, data) {
    displayTopic.textContent = `Topic: "${topic}"`;
    argumentsForList.innerHTML = "";
    argumentsAgainstList.innerHTML = "";

    data.for.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        argumentsForList.appendChild(li);
    });

    data.against.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        argumentsAgainstList.appendChild(li);
    });

    neutralConclusionText.textContent = data.conclusion;
    resultsSection.classList.remove('results-hidden');
}

function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.classList.remove('error-hidden');
}
function clearError() {
    errorMessage.textContent = "";
    errorMessage.classList.add('error-hidden');
}
function hideResults() {
    resultsSection.classList.add('results-hidden');
}