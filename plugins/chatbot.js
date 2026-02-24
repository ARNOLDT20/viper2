const { ezra } = require("../fredi/ezra");
const fs = require("fs");
const path = require("path");
const conf = require(__dirname + '/../set');

const chatbotFile = path.join(__dirname, "../data/chatbot.json");

// Ensure the chatbot data file exists
if (!fs.existsSync(chatbotFile)) {
    fs.writeFileSync(chatbotFile, JSON.stringify({}, null, 2));
}

// Function to get chatbot status for a user
function getChatbotStatus(userJid) {
    try {
        const data = JSON.parse(fs.readFileSync(chatbotFile, "utf8"));
        return data[userJid] || false;
    } catch (error) {
        console.error("Error reading chatbot data:", error);
        return false;
    }
}

// Function to set chatbot status for a user
function setChatbotStatus(userJid, status) {
    try {
        const data = JSON.parse(fs.readFileSync(chatbotFile, "utf8"));
        data[userJid] = status;
        fs.writeFileSync(chatbotFile, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing chatbot data:", error);
        return false;
    }
}

ezra({
    nomCom: "chatbot",
    categorie: "AI",
    reaction: "🤖"
}, async (dest, zk, commandeOptions) => {
    const { ms, arg, auteurMessage, verifGroupe } = commandeOptions;

    // Only allow in private chats
    if (verifGroupe) {
        return zk.sendMessage(dest, { text: "❌ Chatbot commands can only be used in private chats." }, { quoted: ms });
    }

    const action = arg[0]?.toLowerCase();

    if (action === "on") {
        if (setChatbotStatus(auteurMessage, true)) {
            return zk.sendMessage(dest, { text: "✅ Chatbot has been enabled for this chat. I will now respond to your messages automatically!" }, { quoted: ms });
        } else {
            return zk.sendMessage(dest, { text: "❌ Failed to enable chatbot. Please try again." }, { quoted: ms });
        }
    } else if (action === "off") {
        if (setChatbotStatus(auteurMessage, false)) {
            return zk.sendMessage(dest, { text: "✅ Chatbot has been disabled for this chat." }, { quoted: ms });
        } else {
            return zk.sendMessage(dest, { text: "❌ Failed to disable chatbot. Please try again." }, { quoted: ms });
        }
    } else {
        const status = getChatbotStatus(auteurMessage);
        return zk.sendMessage(dest, {
            text: `🤖 *Chatbot Status*\n\nCurrent status: ${status ? "✅ Enabled" : "❌ Disabled"}\n\nUse:\n• \`${commandeOptions.prefixe}chatbot on\` - Enable chatbot\n• \`${commandeOptions.prefixe}chatbot off\` - Disable chatbot`
        }, { quoted: ms });
    }
});