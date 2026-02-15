const CHANNEL_ID = "0029Vb6H6jF9hXEzZFlD6F3d@newsletter";

let autoQuestionInterval = null;

// 🔥 List of engaging questions
const questions = [
    "🤔 If you had 1 million dollars today, what would you invest in?",
    "🔥 Android or iPhone — which one wins and why?",
    "💰 What is one online skill everyone should learn in 2026?",
    "📱 What app do you use the most every day?",
    "🚀 If you could start a tech business today, what would it be?",
    "🧠 What is the smartest decision you've ever made?",
    "🎯 What is your biggest goal this year?",
    "💻 Which programming language should beginners learn first?",
    "🌍 If you could move to any country, where would you go?",
    "📈 What’s better: Saving money or investing it?"
];

// This function will be called from your main bot file
function startAutoQuestions(client) {

    if (autoQuestionInterval) return;

    console.log("✅ Auto Channel Questions Started (Every 5 Minutes)");

    autoQuestionInterval = setInterval(async () => {
        try {

            const randomQuestion =
                questions[Math.floor(Math.random() * questions.length)];

            const message =
                `🔥 *CHANNEL ENGAGEMENT QUESTION* 🔥

${randomQuestion}

👇 Drop your answer below!

🕒 ${new Date().toLocaleTimeString()}`;

            await client.sendMessage(CHANNEL_ID, {
                text: message
            });

            console.log("Question posted to channel.");

        } catch (err) {
            console.log("Channel question error:", err);
        }

    }, 300000); // 5 minutes
}

module.exports = { startAutoQuestions };
