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
    const { repondre, prefixe, nomAuteurMessage } = commandeOptions;
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

    let greeting = "ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ";
    if (hour >= 12 && hour < 18) greeting = "ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ";
    else if (hour >= 18 && hour < 22) greeting = "ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ";
    else greeting = "ɢᴏᴏᴅ ɴɪɢʜᴛ";

    const temps = moment().format("HH:mm:ss");
    const date = moment().format("DD/MM/YYYY");

    const infoMsg = `
╭═══════════════⟪ 🤖 VIPER INFO ⟫═══════════════╮
┃ ✦ ʙᴏᴛ ɴᴀᴍᴇ     : *VIPER V2*
┃ ✦ ᴘʀᴇғɪx       : [ ${s.PREFIXE} ]
┃ ✦ ᴍᴏᴅᴇ         : *${mode}*
┃ ✦ ᴅᴀᴛᴇ         : ${date}
┃ ✦ ᴛɪᴍᴇ         : ${temps}
┃ ✦ ᴘʟᴀᴛғᴏʀᴍ     : ${os.platform()}
┃ ✦ ᴏᴡɴᴇʀ        : *T20_STARBOY*
┃ ✦ ᴘʟᴜɢɪɴs      : ${cm.length}
╰═══════════════⟪ ⚡ ⟫═══════════════╯
`;

    let menuMsg = `
✨ *${greeting}* ✨
`;

    for (const cat in coms) {
        menuMsg += `
╭━━━━━━━━━━━━━━━⟪ ${toFancyUppercaseFont(cat)} ⟫━━━━━━━━━━━━━━━╮`;
        for (const cmd of coms[cat]) {
            menuMsg += `
┃ 🔹 ${toFancyLowercaseFont(cmd)}`;
        }
        menuMsg += `
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
`;
    }

    menuMsg += `
╭──────────────────────────────────────────╮
┃ 🌟 ᴍᴀᴅᴇ ʙʏ *BLAZE TECH* © 2025
╰──────────────────────────────────────────╯
`;

    try {
        await zk.sendMessage(dest, {
            image: { url: "https://files.catbox.moe/xqhfyv.webp" },
            caption: infoMsg + menuMsg,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363421014261315@newsletter",
                    newsletterName: "Blaze tech",
                    serverMessageId: -1
                },
                externalAdReply: {
                    title: "☢️ VIPER XMD ☢️",
                    body: "🔑 Command Menu",
                    thumbnailUrl: "https://files.catbox.moe/xqhfyv.webp",
                    sourceUrl: "https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Menu error:", error);
        repondre("🥵 Menu error: " + error);
    }
});
