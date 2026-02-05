const { ezra } = require('../fredi/ezra');
const conf = require(__dirname + "/../set");
const fs = require('fs-extra');
const path = require('path');

ezra({
    nomCom: "botinfo",
    aliases: ["info", "about", "botdetails", "bot"],
    categorie: "General-viper",
    reaction: "🤖",
    description: "Get detailed bot information"
}, async (dest, zk, { ms, repondre, verifGroupe }) => {
    try {
        const botName = conf.BOT || 'Viper XMD';
        const prefix = conf.PREFIXE || '+';
        const mode = conf.MODE === 'yes' ? '🟢 PUBLIC MODE' : '🔴 PRIVATE MODE';
        const uptime = process.uptime();
        const uptimeHours = Math.floor(uptime / 3600);
        const uptimeMinutes = Math.floor((uptime % 3600) / 60);

        // Count plugins
        const pluginDir = path.join(__dirname);
        const pluginFiles = fs.readdirSync(pluginDir).filter(f => f.endsWith('.js'));
        const pluginCount = pluginFiles.length;

        const botInfoText = `╔═══════════════════════════════════════╗
║       🤖 *VIPER XMD BOT INFO* 🤖      ║
╚═══════════════════════════════════════╝

*📛 Bot Details:*
├─ 🎯 Name: *${botName}*
├─ ⚙️ Prefix: *${prefix}*
├─ 📊 Mode: *${mode}*
├─ 🔌 Plugins Loaded: *${pluginCount}*
├─ ⏱️ Uptime: *${uptimeHours}h ${uptimeMinutes}m*
└─ 📱 Version: *3.0.0+ (Viper XMD)*

*✨ Features:*
├─ 📥 Media Download (YT, TikTok, etc)
├─ 🎵 Music & Audio Processing
├─ 🖼️ Image & Sticker Creation
├─ 🔍 Search & Browse
├─ 👥 Group Management Tools
├─ 🛡️ Anti-Spam & Security
├─ 📝 Text Tools & Utilities
├─ 🎮 Fun & Games
├─ 🔗 Link Shortening
└─ 💬 Chat Bot Integration

*👨‍💻 Developer Info:*
├─ Developer: *T20-CLASSIC*
├─ Owner: *${conf.OWNER_NAME || 'Starboy'}*
├─ Phone: *${conf.NUMERO_OWNER || '+255627417402'}*
└─ Engine: *Baileys (WhatsApp Web)*

*📚 Quick Commands:*
├─ ${prefix}help - View all commands
├─ ${prefix}menu - Main menu
├─ ${prefix}owner - Contact owner
└─ ${prefix}pair - Get pairing code

╔═══════════════════════════════════════╗
║  💫 Made with ❤️ by T20-CLASSIC 💫   ║
║     🌟 Stay Connected, Stay Blessed    ║
╚═══════════════════════════════════════╝

*GitHub:* ${conf.GITHUB || 'https://github.com/ARNOLDT20'}
*Updates:* ${conf.GURL || 'https://whatsapp.com/channel'}`;

        // Send video with bot info
        await zk.sendMessage(dest, {
            video: { url: 'https://files.catbox.moe/qmh4d8.mp4' },
            caption: `🤖 *${botName}* - Complete Bot Information\n\n${prefix}botinfo to view details`,
            gifPlayback: false
        }, { quoted: ms });

        // Send detailed info
        await zk.sendMessage(dest, {
            text: botInfoText,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363421014261315@newsletter",
                    newsletterName: "BLAZE TECH Official",
                    serverMessageId: Math.floor(Math.random() * 1000000)
                },
                externalAdReply: {
                    showAdAttribution: true,
                    title: `${botName} - Full Information`,
                    body: '✨ Powered By Viper XMD Engine',
                    thumbnailUrl: conf.URL || 'https://files.catbox.moe/xqhfyv.webp',
                    sourceUrl: conf.GURL || 'https://whatsapp.com',
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: ms });

        // Send owner contact card
        const ownerText = `╔═══════════════════════════════════════╗
║         📞 *OWNER CONTACT* 📞          ║
╚═══════════════════════════════════════╝

*Owner:* ${conf.OWNER_NAME || 'T20-CLASSIC'}
*Phone:* ${conf.NUMERO_OWNER || '+255627417402'}
*Status:* 🟢 Available 24/7

*Connect On:*
📱 WhatsApp: ${conf.NUMERO_OWNER || '+255627417402'}
🔗 GitHub: ${conf.GITHUB || 'https://github.com'}
📢 WhatsApp Channel: ${conf.GURL || 'https://whatsapp.com'}
🌐 Website: ${conf.WEBSITE || 'https://blazetech-site.vercel.app'}

*For Issues & Support:*
💬 Message owner directly
📧 Report bugs on GitHub
🆘 Ask for help in group`;

        await zk.sendMessage(dest, {
            text: ownerText,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363421014261315@newsletter",
                    newsletterName: "BLAZE TECH Official",
                    serverMessageId: Math.floor(Math.random() * 1000000)
                }
            }
        }, { quoted: ms });

    } catch (error) {
        console.error("❌ Botinfo error:", error.message);
        repondre(`❌ Error getting bot info: ${error.message}`);
    }
});

// Stats Command
ezra({
    nomCom: "stats",
    aliases: ["botstats", "status"],
    categorie: "General-viper",
    reaction: "📊",
    description: "Get bot statistics and performance"
}, async (dest, zk, { ms, repondre }) => {
    try {
        const uptime = process.uptime();
        const uptimeHours = Math.floor(uptime / 3600);
        const uptimeMinutes = Math.floor((uptime % 3600) / 60);
        const uptimeSeconds = Math.floor(uptime % 60);

        const memUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const memTotal = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);

        const pluginDir = path.join(__dirname);
        const pluginFiles = fs.readdirSync(pluginDir).filter(f => f.endsWith('.js'));
        const pluginCount = pluginFiles.length;

        const statsText = `╔═════════════════════════════════╗
║    📊 *BOT STATISTICS* 📊         ║
╚═════════════════════════════════╝

*⏱️ Uptime:*
├─ Hours: *${uptimeHours}*
├─ Minutes: *${uptimeMinutes}*
└─ Seconds: *${uptimeSeconds}*

*💾 Memory Usage:*
├─ Used: *${memUsage} MB*
├─ Total: *${memTotal} MB*
└─ Status: ${parseFloat(memUsage) > 500 ? '⚠️ High' : '✅ Normal'}

*📦 Plugins:*
├─ Loaded: *${pluginCount}*
└─ Status: ${pluginCount > 0 ? '✅ All Active' : '❌ Error'}

*🎯 Mode:*
├─ Current: ${conf.MODE === 'yes' ? '🟢 PUBLIC' : '🔴 PRIVATE'}
├─ Prefix: *${conf.PREFIXE || '+'}*
└─ Status: ✅ Online

*🔧 System Info:*
├─ Node.js: *${process.version}*
├─ Platform: *${process.platform}*
└─ PID: *${process.pid}*

╔═════════════════════════════════╗
║   ✅ BOT IS RUNNING PERFECTLY   ║
╚═════════════════════════════════╝`;

        await zk.sendMessage(dest, {
            text: statsText,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363421014261315@newsletter",
                    newsletterName: "BLAZE TECH Official",
                    serverMessageId: Math.floor(Math.random() * 1000000)
                }
            }
        }, { quoted: ms });

    } catch (error) {
        console.error("❌ Stats error:", error.message);
        repondre(`❌ Error getting stats: ${error.message}`);
    }
});
