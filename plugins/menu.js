"use strict";

const { ezra } = require("../fredi/ezra");
const moment = require("moment-timezone");
const os = require("os");
const s = require("../set");

ezra({
    nomCom: "menu",
    categorie: "Main",
    reaction: "☢️",
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

        // HEADER (clean, premium look)
        let text =
            `☢️━━━━━━━━━━━━━━━━☢️
        *VIPER MD*
☢️━━━━━━━━━━━━━━━━☢️

👑 *Owner*     : T20_STARBOY
⚙️ *Mode*      : ${mode}
🕒 *Time*      : ${time}
📅 *Date*      : ${date}
💻 *System*    : ${os.platform()}
🧩 *Plugins*   : ${cm.length}

✨━━━━━━━━━━━━━━━━✨`;

        // MENU BODY
        for (const cat in categories) {
            text += `\n\n📂 *${cat.toUpperCase()}*\n`;
            for (const cmd of categories[cat]) {
                text += `   ▸ ${s.PREFIXE}${cmd}\n`;
            }
        }

        text += `
✨━━━━━━━━━━━━━━━━✨
💡 _Use commands with prefix_
🚀 *Blaze Tech © 2025*`;

        // SEND (text-only = fastest & safest)
        await zk.sendMessage(jid, {
            text,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "☢️ VIPER MD ☢️",
                    body: "Fast • Clean • Powerful",
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
