"use strict";
const { ezra } = require("../fredi/ezra");
const moment = require("moment-timezone");
const os = require("os");
const s = require("../set");

const readMore = String.fromCharCode(8206).repeat(4001);

// Fancy uppercase font
const toFancyUppercaseFont = (text) => {
    const fonts = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
        'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
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
    cm.map(async (com) => {
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

    // Build buttons array from categories
    const buttons = Object.keys(coms).map((cat, index) => ({
        buttonId: `menu_cat_${index}`, // Unique ID for each category
        buttonText: { displayText: `🌟 ${cat} 🌟` },
        type: 1
    }));

    try {
        await zk.sendMessage(dest, {
            image: { url: "https://files.catbox.moe/xqhfyv.webp" }, // HD image URL
            caption: infoMsg + "\nTap a category below ⬇️",
            buttons: buttons,
            headerType: 4, // 4 = image header
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
        console.error("Menu button error:", error);
        repondre("🥵 Menu error: " + error);
    }
});
