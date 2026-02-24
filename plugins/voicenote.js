const { ezra } = require("../fredi/ezra");
const fs = require("fs");
const path = require("path");
const conf = require(__dirname + '/../set');

const voicenoteFile = path.join(__dirname, "../data/voicenote.json");

// Ensure the voicenote data file exists
if (!fs.existsSync(voicenoteFile)) {
    fs.writeFileSync(voicenoteFile, JSON.stringify({}, null, 2));
}

// Function to get voicenote status for a group
function getVoiceNoteStatus(groupJid) {
    try {
        const data = JSON.parse(fs.readFileSync(voicenoteFile, "utf8"));
        return data[groupJid] || false;
    } catch (error) {
        console.error("Error reading voicenote data:", error);
        return false;
    }
}

// Function to set voicenote status for a group
function setVoiceNoteStatus(groupJid, status) {
    try {
        const data = JSON.parse(fs.readFileSync(voicenoteFile, "utf8"));
        data[groupJid] = status;
        fs.writeFileSync(voicenoteFile, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing voicenote data:", error);
        return false;
    }
}

ezra({
    nomCom: "voicenote",
    categorie: "Group-Moderation",
    reaction: "🎙️"
}, async (dest, zk, commandeOptions) => {
    const { ms, arg, auteurMessage, verifGroupe, verifAdmin, idBot } = commandeOptions;

    // Only allow in groups
    if (!verifGroupe) {
        return zk.sendMessage(dest, { text: "❌ This command only works in groups." }, { quoted: ms });
    }

    // Only allow group admins or bot owner
    const isBotOwner = auteurMessage === conf.NUMERO_OWNER + '@s.whatsapp.net';
    if (!verifAdmin && !isBotOwner) {
        return zk.sendMessage(dest, { text: "❌ Only group admins can use this command." }, { quoted: ms });
    }

    const action = arg[0]?.toLowerCase();

    if (action === "on") {
        if (setVoiceNoteStatus(dest, true)) {
            return zk.sendMessage(dest, { text: "✅ Voice note auto-reply has been **enabled**. The bot will now respond to voice notes with stickers!" }, { quoted: ms });
        } else {
            return zk.sendMessage(dest, { text: "❌ Failed to enable voice note auto-reply. Please try again." }, { quoted: ms });
        }
    } else if (action === "off") {
        if (setVoiceNoteStatus(dest, false)) {
            return zk.sendMessage(dest, { text: "✅ Voice note auto-reply has been **disabled**." }, { quoted: ms });
        } else {
            return zk.sendMessage(dest, { text: "❌ Failed to disable voice note auto-reply. Please try again." }, { quoted: ms });
        }
    } else {
        const status = getVoiceNoteStatus(dest);
        return zk.sendMessage(dest, {
            text: `🎙️ *Voice Note Auto-Reply Status*\n\nCurrent status: ${status ? "✅ Enabled" : "❌ Disabled"}\n\nUse:\n• \`${commandeOptions.prefixe}voicenote on\` - Enable auto-reply\n• \`${commandeOptions.prefixe}voicenote off\` - Disable auto-reply`
        }, { quoted: ms });
    }
});
