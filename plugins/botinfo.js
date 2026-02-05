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
├─ 🔌 Plugins: *${pluginCount}*
├─ ⏱️ Uptime: *${uptimeHours}h ${uptimeMinutes}m*
└─ 📱 Version: *3.0.0+ (Viper XMD)*

*✨ Features:*
📥 Download  🎵 Music  🖼️ Stickers  🔍 Search  👥 Groups  🛡️ Security

*👨‍💻 Developer:*
T20-CLASSIC | ${conf.OWNER_NAME || 'Starboy'} | ${conf.NUMERO_OWNER}

*📚 Commands:*
${prefix}help | ${prefix}menu | ${prefix}owner | ${prefix}pair

*Links:*
🔗 GitHub: ${conf.GITHUB || 'https://github.com/ARNOLDT20'}
📢 Updates: ${conf.GURL || 'https://whatsapp.com'}

═══════════════════════════════════════
💫 Made with ❤️ by T20-CLASSIC
🌟 Stay Connected, Stay Blessed 🌟`;

        // Send ONLY video with botinfo as caption
        await zk.sendMessage(dest, {
            video: { url: 'https://files.catbox.moe/qmh4d8.mp4' },
            caption: botInfoText,
            gifPlayback: false
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
