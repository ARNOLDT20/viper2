"use strict";

const { ezra } = require("../fredi/ezra");
const moment = require("moment-timezone");
const os = require("os");
const fs = require('fs');
const path = require('path');
const s = require("../set");

ezra({
    nomCom: "menu",
    categorie: "Main",
    reaction: "📋",
    nomFichier: __filename
}, async (dest, zk, commandeOptions) => {

    try {
        const { cm } = require("../fredi/ezra");

        // SAFE JID
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

        // CATEGORY EMOJIS
        const categoryEmojis = {
            Main: "🏠", Download: "📥", Search: "🔍", Fun: "🎮",
            Game: "🎲", Group: "👥", Owner: "👑", Tools: "🛠️",
            Image: "🖼️", Audio: "🎵", Video: "🎬", Sticker: "🩷",
            Utility: "⚙️", Education: "📚", Economy: "💰",
            Religion: "🛐", Anime: "🎌", Media: "📱",
            Web: "🌐", AI: "🤖", Plugin: "🧩",
            Misc: "📦", Admin: "🛡️", Moderation: "🔧"
        };

        // HEADER
        let text = `
╭══════════════════════════════╮
║    ⚡ *VIPER MD BOT* ⚡      ║
╰══════════════════════════════╯

╭─── 🔧 *SYSTEM INFORMATION* 🔧 ───╮
│ 👑 Owner   : T20_STARBOY
│ ⚙️ Mode    : ${mode}
│ 🕒 Time    : ${time}
│ 📅 Date    : ${date}
│ 💻 System  : ${os.platform()}
│ 🧩 Plugins : ${cm.length}
╰────────────────────────────────╯

╭─── 📜 *COMMAND MENU* 📜 ───╮`;

        // MENU BODY
        for (const cat in categories) {
            const emoji = categoryEmojis[cat] || "📁";
            text += `\n│\n│ ${emoji} *${cat.toUpperCase()}*`;

            const commands = categories[cat];
            for (let i = 0; i < commands.length; i += 3) {
                const row = commands
                    .slice(i, i + 3)
                    .map(cmd => `▸ ${s.PREFIXE}${cmd}`.padEnd(18))
                    .join("");
                text += `\n│   ${row}`;
            }
        }

        text += `
│
╰────────────────────────────────╯

╭─── 🚀 *QUICK ACCESS* 🚀 ───╮
│ 🔧 ${s.PREFIXE}help [command]
│ 📊 ${s.PREFIXE}info
│ 🏓 ${s.PREFIXE}ping
│ 📖 ${s.PREFIXE}allmenu
╰────────────────────────────╯

╭══════════════════════════════╮
║ 🚀 *Blaze Tech © 2025*
║ 📍 Use: ${s.PREFIXE}help [command]
╰══════════════════════════════╯`;

        // SEND
        // read saved menu image (if any) and support separate thumbnail
        const menuDataPath = path.join(__dirname, '..', 'data', 'menu.json');
        let menuImage = s.URL || "https://files.catbox.moe/m6aoje.jpg";
        let thumbnailUrl = menuImage;
        try {
            if (fs.existsSync(menuDataPath)) {
                const raw = fs.readFileSync(menuDataPath, 'utf8');
                const obj = JSON.parse(raw || '{}');
                if (obj.menuImage) menuImage = obj.menuImage;
                if (obj.menuThumb) thumbnailUrl = obj.menuThumb;
            }
        } catch (e) {
            console.error('Error reading menu image file:', e);
        }

        // send as an image message (shows both image and link preview thumbnail)
        await zk.sendMessage(jid, {
            image: { url: menuImage },
            caption: text,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "⚡ VIPER MD MENU ⚡",
                    body: "Clean • Fast • Professional",
                    thumbnailUrl: thumbnailUrl,
                    sourceUrl: menuImage || "https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

    } catch (err) {
        console.error("MENU ERROR:", err);
    }
});
