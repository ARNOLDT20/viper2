'use strict';

const { ezra } = require("../fredi/ezra");
const axios = require('axios');
const moment = require("moment-timezone");
const set = require(__dirname + '/../set');
const os = require('os');
moment.tz.setDefault('' + set.TIMEZONE);

ezra({
    'nomCom': "alive",
    'categorie': "General-viper",
    'reaction': "💚"
}, async (_0x12a838, _0x2d8d4e, _0x1f0ba4) => {
    let { ms: _0x5d2f0c } = _0x1f0ba4;

    try {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const uptimeStr = `${hours}h ${minutes}m ${seconds}s`;

        const botStatus = `
╔════════════════════════════╗
║   🤖 *VIPER XMD ALIVE* 🤖  ║
╚════════════════════════════╝

✅ *Status:* Online & Active
⏱️ *Uptime:* ${uptimeStr}
📅 *Date:* ${moment().format("DD/MM/YYYY")}
🕐 *Time:* ${moment().format("HH:mm:ss")}
🖥️ *Platform:* ${os.platform()}
💾 *Memory:* ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB
📡 *Owner:* ${set.OWNER_NAME || "Viper Dev"}

✨ *Bot is running smoothly!* ✨
    `.trim();

        const audioUrl = "https://files.catbox.moe/lu3f94.mp3";
        let audioAvailable = false;

        try {
            const head = await axios.head(audioUrl, { timeout: 5000 });
            audioAvailable = head && head.status && head.status === 200;
        } catch (err) {
            audioAvailable = false;
        }

        if (audioAvailable) {
            await _0x2d8d4e.sendMessage(
                _0x12a838,
                {
                    audio: { url: audioUrl },
                    mimetype: "audio/mpeg",
                    contextInfo: {
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "120363421014261315@newsletter",
                            newsletterName: "VIPER XMD",
                            serverMessageId: 0x8f
                        },
                        forwardingScore: 0x3e7,
                        externalAdReply: {
                            title: "🟢 Bot Alive",
                            body: "Viper XMD is running",
                            thumbnailUrl: set.URL || "https://files.catbox.moe/xqhfyv.webp",
                            mediaType: 1,
                            renderSmallThumbnail: true
                        }
                    }
                },
                { quoted: _0x5d2f0c, ptt: true }
            );

            await _0x2d8d4e.sendMessage(_0x12a838, {
                text: botStatus,
                contextInfo: {
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363421014261315@newsletter",
                        newsletterName: "VIPER XMD",
                        serverMessageId: 0x8f
                    },
                    forwardingScore: 0x3e7,
                    externalAdReply: {
                        title: "🟢 Bot Alive",
                        body: "Viper XMD Status",
                        thumbnailUrl: set.URL || "https://files.catbox.moe/xqhfyv.webp",
                        mediaType: 1,
                        renderSmallThumbnail: true
                    }
                }
            }, { quoted: _0x5d2f0c });
        } else {
            await _0x2d8d4e.sendMessage(_0x12a838, {
                text: botStatus,
                contextInfo: {
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363421014261315@newsletter",
                        newsletterName: "VIPER XMD",
                        serverMessageId: 0x8f
                    },
                    forwardingScore: 0x3e7,
                    externalAdReply: {
                        title: "🟢 Bot Alive",
                        body: "Viper XMD Status",
                        thumbnailUrl: set.URL || "https://files.catbox.moe/xqhfyv.webp",
                        mediaType: 1,
                        renderSmallThumbnail: true
                    }
                }
            }, { quoted: _0x5d2f0c });
        }
    } catch (error) {
        console.log("❌ Alive Command Error: " + error);
        await _0x2d8d4e.sendMessage(_0x12a838, {
            text: `❌ Error: ${error.message}`
        }, { quoted: _0x5d2f0c });
    }
});
