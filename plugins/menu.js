"use strict";
const { ezra } = require("../fredi/ezra");
const moment = require("moment-timezone");
const os = require("os");
const s = require("../set");
const { getBuffer } = require("../lib/functions"); // HD buffer helper

const readMore = String.fromCharCode(8206).repeat(4001);

// Fancy uppercase font
const toFancyUppercaseFont = (text) => {
    const fonts = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
        'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
    };
    return text.split('').map(c => fonts[c] || c).join('');
};

// Fancy lowercase font
const toFancyLowercaseFont = (text) => {
    const fonts = {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ',
        'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ'
    };
    return text.split('').map(c => fonts[c] || c).join('');
};

ezra({
    nomCom: "menu",
    categorie: "starboy-Menu",
    reaction: "☢️",
    nomFichier: __filename
}, async (dest, zk, commandeOptions) => {

    const { repondre } = commandeOptions;
    const { cm } = require("../fredi/ezra");

    let coms = {};
    let mode = "public";

    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Dar_Es_Salam");
    const hour = moment().hour();

    let greeting = "🌞 ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ";
    if (hour >= 12 && hour < 18) greeting = "🌤️ ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ";
    else if (hour >= 18 && hour < 22) greeting = "🌆 ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ";
    else greeting = "🌙 ɢᴏᴏᴅ ɴɪɢʜᴛ";

    const temps = moment().format("HH:mm:ss");
    const date = moment().format("DD/MM/YYYY");

    // Fetch HD image buffer
    let imageBuffer;
    try {
        imageBuffer = await getBuffer("https://files.catbox.moe/xqhfyv.webp");
    } catch (err) {
        console.error("Failed to fetch menu image buffer:", err);
    }

    const infoMsg = `
✨━━━━━━━━━━━━━━━✨
🤖 *VIPER V2 INFO* 🤖
✨━━━━━━━━━━━━━━━✨
📌 Prefix     : ${s.PREFIXE}
📌 Mode       : ${mode}
📌 Date       : ${date}
📌 Time       : ${temps}
📌 Platform   : ${os.platform()}
📌 Owner      : T20_STARBOY
📌 Plugins    : ${cm.length}
✨━━━━━━━━━━━━━━━━━━━━━━━━✨
`;

    let menuMsg = `
${greeting}
`;

    for (const cat in coms) {
        menuMsg += `
🌟────────── 🌈 ${toFancyUppercaseFont(cat)} 🌈 ─────────🌟
`;
        for (const cmd of coms[cat]) {
            menuMsg += `🔹 ${toFancyLowercaseFont(cmd)}\n`;
        }
    }

    menuMsg += `
✨━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✨
💎 Made with ❤️ by *BLAZE TECH* © 2025
✨━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✨
`;

    try {
        await zk.sendMessage(dest, {
            image: imageBuffer || { url: "https://files.catbox.moe/xqhfyv.webp" }, // HD buffer fallback to URL
            caption: infoMsg + menuMsg,
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
});
