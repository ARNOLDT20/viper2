"use strict";

const { ezra } = require("../fredi/ezra");
const moment = require("moment-timezone");
const os = require("os");
const s = require("../set");

ezra({
    nomCom: "menu",
    categorie: "Main",
    reaction: "📋",
    nomFichier: __filename
}, async (dest, zk, commandeOptions) => {

    try {
        const { cm } = require("../fredi/ezra");

        // SAFE JID (unchanged)
        const jid =
            dest ||
            commandeOptions.dest ||
            commandeOptions.msg?.key?.remoteJid;

        if (!jid) return;

        // MODE
        const mode = (s.MODE || "").toLowerCase() === "yes" ? "PUBLIC" : "PRIVATE";

        // TIME
        moment.tz.setDefault("Africa/Dar_Es_Salam");
        const time = moment().format("HH:mm:ss");
        const date = moment().format("DD/MM/YYYY");

        // GROUP COMMANDS
        let categories = {};
        for (const c of cm) {
            if (!categories[c.categorie]) categories[c.categorie] = [];
            categories[c.categorie].push(c.nomCom);
        }

        // Category emoji mapping
        const categoryEmojis = {
            'Main': '🏠',
            'Download': '📥',
            'Search': '🔍',
            'Fun': '🎮',
            'Game': '🎲',
            'Group': '👥',
            'Owner': '👑',
            'Tools': '🛠️',
            'Image': '🖼️',
            'Audio': '🎵',
            'Video': '🎬',
            'Sticker': '🩷',
            'Utility': '⚙️',
            'Education': '📚',
            'Economy': '💰',
            'Religion': '🛐',
            'Anime': '🎌',
            'Media': '📱',
            'Web': '🌐',
            'AI': '🤖',
            'Plugin': '🧩',
            'Misc': '📦',
            'Admin': '🛡️',
            'Moderation': '🔧'
        };

        // HEADER
        let text = `
╭───────────────────────────────────╮
│        ⚡ *VIPER MD BOT* ⚡        │
╰───────────────────────────────────╯

╭───────── *SYSTEM INFO* ──────────╮
│ 👑 *Owner*   : T20_STARBOY
│ ⚙️  *Mode*    : ${mode}
│ 🕒  *Time*    : ${time}
│ 📅  *Date*    : ${date}
│ 💻  *System*  : ${os.platform()}
│ 🧩  *Plugins* : ${cm.length}
╰───────────────────────────────────╯

╭───────── *COMMANDS LIST* ────────╮`;

        // MENU BODY - Vertical alignment with reduced spacing
        for (const cat in categories) {
            const emoji = categoryEmojis[cat] || '📁';
            text += `\n│\n│ ${emoji} *${cat.toUpperCase()}*\n│\n│`;

            // Create vertical columns for commands (2 or 3 per line)
            const commands = categories[cat];
            for (let i = 0; i < commands.length; i += 3) {
                const lineCommands = commands.slice(i, i + 3);
                let line = "  ";
                lineCommands.forEach((cmd, idx) => {
                    line += `▸ ${s.PREFIXE}${cmd}`.padEnd(18);
                });
                text += `\n│ ${line}`;
            }
        }

        text += `
│\n╰───────────────────────────────────╯

╭───────── *QUICK ACCESS* ─────────╮
│ 🔧 ${s.PREFIXE}help [command]
│ 📊 ${s.PREFIXE}info
│ 🏓 ${s.PREFIXE}ping
│ 📖 ${s.PREFIXE}allmenu
╰───────────────────────────────────╯

╭───────────────────────────────────╮
│ 🚀 *Blaze Tech © 2025*
│ 📍 _Use ${s.PREFIXE}help [command]_ 
╰───────────────────────────────────╯`;

        // SEND (text-only = fastest & safest)
        await zk.sendMessage(jid, {
            text,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "⚡ VIPER MD MENU ⚡",
                    body: "Vertical Command List • Fast • Clean",
                    thumbnailUrl: "https://files.catbox.moe/m6aoje.jpg",
                    sourceUrl: "https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

    } catch (err) {
        console.error("MENU ERROR:", err);
    }
});