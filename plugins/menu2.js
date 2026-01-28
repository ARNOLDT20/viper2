"use strict";
const { ezra } = require("../fredi/ezra");
const moment = require("moment-timezone");
const os = require("os");
const s = require("../set");

// Fancy fonts
const toFancyUppercaseFont = (text) => {
    const fonts = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
        'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
    };
    return text.split('').map(c => fonts[c] || c).join('');
};

const toFancyLowercaseFont = (text) => {
    const fonts = {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ',
        'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ'
    };
    return text.split('').map(c => fonts[c] || c).join('');
};

ezra({
    nomCom: "menu2",
    categorie: "starboy-Menu",
    reaction: "☢️",
    nomFichier: __filename
}, async (dest, zk, commandeOptions) => {

    const { repondre } = commandeOptions;
    const { cm } = require("../fredi/ezra");

    // Organize commands by category
    let coms = {};
    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    // Greeting
    moment.tz.setDefault("Africa/Dar_Es_Salam");
    const hour = moment().hour();
    let greeting = "🌞 ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ";
    if (hour >= 12 && hour < 18) greeting = "🌤️ ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ";
    else if (hour >= 18 && hour < 22) greeting = "🌆 ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ";
    else greeting = "🌙 ɢᴏᴏᴅ ɴɪɢʜᴛ";

    const date = moment().format("DD/MM/YYYY");
    const temps = moment().format("HH:mm:ss");
    const mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

    const infoMsg = `
✨ VIPER V2 ✨
${greeting}

📌 Prefix     : ${s.PREFIXE}
📌 Mode       : ${mode}
📌 Date       : ${date}
📌 Time       : ${temps}
📌 Platform   : ${os.platform()}
📌 Owner      : T20_STARBOY
📌 Plugins    : ${cm.length}
`;

    // Buttons for categories
    const categories = Object.keys(coms);
    const buttons = categories.map((cat, idx) => ({
        buttonId: `menu_cat_${idx}`,
        buttonText: { displayText: `🌟 ${cat} 🌟` },
        type: 1
    }));

    // Send menu
    try {
        await zk.sendMessage(dest, {
            image: { url: "https://files.catbox.moe/xqhfyv.webp" },
            caption: infoMsg + "\nTap a category below ⬇️",
            buttons: buttons,
            headerType: 4, // image header
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363421014261315@newsletter",
                    newsletterName: "Blaze tech",
                    serverMessageId: -1
                }
            }
        });
    } catch (error) {
        console.error("Menu error:", error);
        repondre("🥵 Menu error: " + error);
    }

    // Listener for button responses
    zk.ev.on("messages.upsert", async ({ messages }) => {
        for (let msg of messages) {
            if (!msg.message) continue;

            const btnResp = msg.message.buttonsResponseMessage;
            if (btnResp) {
                const buttonId = btnResp.selectedButtonId;
                if (buttonId.startsWith("menu_cat_")) {
                    const index = parseInt(buttonId.split("_")[2]);
                    const categoryName = categories[index];

                    const commands = cm
                        .filter(c => c.categorie === categoryName)
                        .map(c => `🔹 ${toFancyLowercaseFont(c.nomCom)}`)
                        .join("\n");

                    await zk.sendMessage(msg.key.remoteJid, {
                        text: `🌟 *${toFancyUppercaseFont(categoryName)}* 🌟\n\n${commands}`
                    });
                }
            }
        }
    });
});
