"use strict";

const { ezra } = require("../fredi/ezra");
const moment = require("moment-timezone");
const os = require("os");
const s = require("../set");

ezra({
    nomCom: "menu2",
    categorie: "Main",
    reaction: "✨",
    nomFichier: __filename
}, async (dest, zk, commandeOptions) => {

    try {
        const { cm } = require("../fredi/ezra");

        const jid =
            dest ||
            commandeOptions.dest ||
            commandeOptions.msg?.key?.remoteJid;

        if (!jid) return;

        // Time & mode
        moment.tz.setDefault("Africa/Dar_Es_Salam");
        const time = moment().format("HH:mm");
        const date = moment().format("DD MMM YYYY");
        const mode = (s.MODE || "").toLowerCase() === "yes" ? "PUBLIC" : "PRIVATE";

        // Group commands
        let data = {};
        for (const c of cm) {
            if (!data[c.categorie]) data[c.categorie] = [];
            data[c.categorie].push(c.nomCom);
        }

        // Header
        let text =
            `🚀 *VIPER MD — MENU V2*

🧑 Owner : *T20_STARBOY*
🧭 Mode  : *${mode}*
🕒 Time  : *${time}*
📆 Date  : *${date}*

📌 _Simple • Fast • Stable_

────────────────────`;

        // Body
        for (const cat in data) {
            text += `\n\n🔹 *${cat}*\n`;
            text += data[cat]
                .map(cmd => `▪ ${s.PREFIXE}${cmd}`)
                .join("\n");
        }

        text += `
────────────────────
🔥 *VIPER MD by Blaze Tech*`;

        // Send
        await zk.sendMessage(jid, {
            text,
            contextInfo: {
                externalAdReply: {
                    title: "VIPER MD",
                    body: "Menu Style 2",
                    thumbnailUrl: "https://files.catbox.moe/446sjd.jpg",
                    sourceUrl: "https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

    } catch (e) {
        console.error("MENU2 ERROR:", e);
    }
});
