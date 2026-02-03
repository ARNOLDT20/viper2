'use strict';

// menus.js - Beautiful Interactive Menu & Info Commands with Buttons
const { ezra } = require("../fredi/ezra");
const conf = require(__dirname + '/../set');

// Common contextInfo configuration
const getContextInfo = (title = '', userJid = '', thumbnailUrl = '') => ({
    mentionedJid: [userJid],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: "120363421014261315@newsletter",
        newsletlerName: "blaze tech",
        serverMessageId: Math.floor(100000 + Math.random() * 900000),
    },
    externalAdReply: {
        showAdAttribution: true,
        title: conf.BOT || 'Viper XMD',
        body: title || "Menu",
        thumbnailUrl: thumbnailUrl || conf.URL || '',
        sourceUrl: conf.GURL || '',
        mediaType: 1,
        renderLargerThumbnail: false
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// 📥 DOWNLOAD MENU - Interactive Button Menu
// ═══════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "dlmenu",
    aliases: ["downloadmenu", "getmenu", "mediamenu", "dmenu"],
    categorie: "viper-Menu",
    reaction: "📥",
    description: "Interactive Download Menu with Buttons"
}, async (dest, zk, commandOptions) => {
    const { ms, userJid } = commandOptions;

    try {
        const menuText = `╔════════════════════════════════╗
║  📥 *VIPER DOWNLOAD MENU* 📥   ║
╚════════════════════════════════╝

🎵 *AUDIO DOWNLOAD*
   .play <song/url> - Download song
   .ytmp3 <url> - YouTube to MP3
   .getaudio <query> - Alternative

🎥 *VIDEO DOWNLOAD*
   .video <video/url> - Download video
   .ytmp4 <url> - YouTube to MP4
   .getvideo <query> - Alternative

🔍 *SEARCH & BROWSE*
   .ytsearch <query> - Search YouTube
   .youtube <query> - Quick search

*Powered by Viper XMD* ✨`;

        await zk.sendMessage(dest, {
            text: menuText,
            contextInfo: getContextInfo("Download Menu", userJid, conf.URL)
        }, { quoted: ms });

    } catch (error) {
        console.error('Download menu error:', error);
        await zk.sendMessage(dest, { text: `Error: ${error.message}` }, { quoted: ms });
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// 👑 OWNER INFO - Contact & Support
// ═══════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "owner",
    aliases: ["ownerinfo", "support", "creator", "creatorinfo"],
    categorie: "viper-Info",
    reaction: "👑",
    description: "Owner Info & Support Contact"
}, async (dest, zk, commandOptions) => {
    const { ms, userJid } = commandOptions;

    try {
        const ownerNumber = conf.NUMERO_OWNER || "255627417402";
        const ownerName = conf.OWNER_NAME || "Starboy";
        const botName = conf.BOT || 'Viper XMD';

        const ownerText = `╔════════════════════════════════╗
║      👑 *BOT OWNER INFO* 👑     ║
╚════════════════════════════════╝

🤖 *Bot:* ${botName}
👤 *Owner:* ${ownerName}
📱 *WhatsApp:* ${ownerNumber}
🌐 *GitHub:* ${conf.GITHUB || 'N/A'}
📢 *Channel:* ${conf.GURL || 'N/A'}

*Support:*
💬 Chat owner on WhatsApp
🔗 Check GitHub for updates
🐛 Report bugs & request features`;

        await zk.sendMessage(dest, {
            text: ownerText,
            contextInfo: getContextInfo("Owner Info", userJid, conf.URL)
        }, { quoted: ms });

    } catch (error) {
        console.error('Owner info error:', error);
        await zk.sendMessage(dest, { text: `Error: ${error.message}` }, { quoted: ms });
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// 📋 COPY OWNER NUMBER - Easy to Copy Format
// ═══════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "ownernum",
    aliases: ["ownernumber", "copyowner", "contactowner", "myowner"],
    categorie: "viper-Info",
    reaction: "📋",
    description: "Get Owner Number (Copy-Friendly)"
}, async (dest, zk, commandOptions) => {
    const { ms } = commandOptions;

    try {
        const ownerNumber = conf.NUMERO_OWNER || "255627417402";
        const ownerName = conf.OWNER_NAME || "Starboy";

        const copyText = `╔════════════════════════════════╗
║    📋 OWNER CONTACT INFO 📋    ║
╚════════════════════════════════╝

Owner Name: ${ownerName}
Owner Number: ${ownerNumber}

📱 WhatsApp: https://wa.me/${ownerNumber}

👉 Copy the number above to contact!`;

        await zk.sendMessage(dest, {
            text: copyText
        }, { quoted: ms });

    } catch (error) {
        await zk.sendMessage(dest, { text: `Error: ${error.message}` }, { quoted: ms });
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// ℹ️ BOT INFO - Features & Details
// ═══════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "botinfo",
    aliases: ["info", "about", "botdetails", "viper"],
    categorie: "viper-Info",
    reaction: "ℹ️",
    description: "Bot Information & Features"
}, async (dest, zk, commandOptions) => {
    const { ms, userJid } = commandOptions;

    try {
        const botName = conf.BOT || 'Viper XMD';
        const prefix = conf.PREFIXE || '+';
        const mode = conf.MODE === 'yes' ? '🟢 PUBLIC' : '🔴 PRIVATE';

        const botInfo = `╔════════════════════════════════╗
║     🤖 *VIPER XMD INFO* 🤖      ║
╚════════════════════════════════╝

*Bot Details:*
📛 Name: ${botName}
⚙️ Prefix: ${prefix}
🎯 Mode: ${mode}
✨ Version: 3.0.0+

*Features:*
🎵 YouTube Audio Download
🎥 YouTube Video Download
🔍 Search Integration
👥 Group Management
🛡️ Security & Anti-spam
⚡ Lightning Fast Response

*Developer:* FrediEzra Tech
*Powered By:* Viper MD Engine`;

        await zk.sendMessage(dest, {
            text: botInfo,
            contextInfo: getContextInfo("Bot Info", userJid, conf.URL)
        }, { quoted: ms });

    } catch (error) {
        await zk.sendMessage(dest, { text: `Error: ${error.message}` }, { quoted: ms });
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// ❓ HELP MENU - Commands Guide
// ═══════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "helpdownload",
    aliases: ["dlhelp", "downloadhelp", "howtouse", "guide"],
    categorie: "viper-Help",
    reaction: "❓",
    description: "Download Commands Help Guide"
}, async (dest, zk, commandOptions) => {
    const { ms, userJid } = commandOptions;
    const prefix = conf.PREFIXE || '+';

    try {
        const helpText = `╔════════════════════════════════╗
║   ❓ *DOWNLOAD HELP GUIDE* ❓    ║
╚════════════════════════════════╝

*🎵 AUDIO COMMANDS:*
${prefix}play <song name/url>
${prefix}ytmp3 <youtube url>
${prefix}audio <query>
${prefix}getaudio <song>

*🎥 VIDEO COMMANDS:*
${prefix}video <video name/url>
${prefix}ytmp4 <youtube url>
${prefix}film <query>
${prefix}getvideo <video>

*🔍 SEARCH COMMANDS:*
${prefix}ytsearch <search>
${prefix}youtube <query>
${prefix}yt <query>

*📌 TIPS:*
✓ Provide song/video title or URL
✓ Downloads may take 30 seconds
✓ Supports YouTube & more coming
✓ Use document option for files

*Need help? Type:*
${prefix}owner - Contact support`;

        await zk.sendMessage(dest, {
            text: helpText,
            contextInfo: getContextInfo("Help Guide", userJid)
        }, { quoted: ms });

    } catch (error) {
        await zk.sendMessage(dest, { text: `Error: ${error.message}` }, { quoted: ms });
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// 🔗 LINKS MENU - GitHub, Channel, Website
// ═══════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "links",
    aliases: ["getlinks", "ourlinks", "socials", "websites"],
    categorie: "viper-Links",
    reaction: "🔗",
    description: "Important Links & Resources"
}, async (dest, zk, commandOptions) => {
    const { ms, userJid } = commandOptions;

    try {
        const linksText = `╔════════════════════════════════╗
║        🔗 *OUR LINKS* 🔗         ║
╚════════════════════════════════╝

*📦 GitHub Repository*
${conf.GITHUB || 'Coming soon...'}

*📢 WhatsApp Channel*
${conf.GURL || 'Coming soon...'}

*🌐 Website*
${conf.WEBSITE || conf.GURL || 'Coming soon...'}

*📱 Owner Contact*
https://wa.me/${conf.NUMERO_OWNER || '255627417402'}

*👥 Join our community:*
✓ Follow GitHub for updates
✓ Subscribe to channel
✓ Contact support anytime`;

        await zk.sendMessage(dest, {
            text: linksText,
            contextInfo: getContextInfo("Links & Resources", userJid, conf.URL)
        }, { quoted: ms });

    } catch (error) {
        await zk.sendMessage(dest, { text: `Error: ${error.message}` }, { quoted: ms });
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 ALL COMMANDS MENU - Complete Command List
// ═══════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "allcmds",
    aliases: ["cmdlist", "allcommands", "commands", "cmds"],
    categorie: "viper-Menu",
    reaction: "🎯",
    description: "All Available Commands"
}, async (dest, zk, commandOptions) => {
    const { ms, userJid } = commandOptions;
    const prefix = conf.PREFIXE || '+';

    try {
        const allCmds = `╔════════════════════════════════╗
║    🎯 *ALL COMMANDS* 🎯         ║
╚════════════════════════════════╝

*📥 DOWNLOAD:*
${prefix}play, ${prefix}video, ${prefix}ytsearch
${prefix}getaudio, ${prefix}getvideo

*ℹ️ INFO:*
${prefix}owner, ${prefix}botinfo, ${prefix}ownernum
${prefix}helpdownload, ${prefix}links

*📋 MENUS:*
${prefix}dlmenu, ${prefix}allcmds

*⚡ UTILITIES:*
${prefix}ping, ${prefix}uptime, ${prefix}mode
${prefix}help, ${prefix}status

*👥 ADMIN:*
${prefix}ban, ${prefix}kick, ${prefix}promote
${prefix}demote, ${prefix}mute, ${prefix}unmute

*🎮 FUN:*
${prefix}joke, ${prefix}meme, ${prefix}quote
${prefix}dice, ${prefix}flip

*Use ${prefix}help <command> for details*`;

        await zk.sendMessage(dest, {
            text: allCmds,
            contextInfo: getContextInfo("All Commands", userJid, conf.URL)
        }, { quoted: ms });

    } catch (error) {
        await zk.sendMessage(dest, { text: `Error: ${error.message}` }, { quoted: ms });
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// ⚙️ SETTINGS MENU - Configuration Info
// ═══════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "settings",
    aliases: ["mysettings", "config", "configuration"],
    categorie: "viper-Info",
    reaction: "⚙️",
    description: "Bot Settings & Configuration"
}, async (dest, zk, commandOptions) => {
    const { ms, userJid } = commandOptions;
    const prefix = conf.PREFIXE || '+';
    const mode = conf.MODE === 'yes' ? '🟢 PUBLIC' : '🔴 PRIVATE';
    const autoRead = conf.AUTO_READ_MESSAGES === 'yes' ? '✅' : '❌';
    const autoReact = conf.AUTO_REACT === 'yes' ? '✅' : '❌';

    try {
        const settingsText = `╔════════════════════════════════╗
║    ⚙️ *BOT SETTINGS* ⚙️         ║
╚════════════════════════════════╝

*General:*
🎯 Prefix: ${prefix}
🎭 Mode: ${mode}
📛 Bot Name: ${conf.BOT || 'Viper XMD'}

*Features:*
👁️ Auto-Read: ${autoRead}
😊 Auto-React: ${autoReact}
⏰ Timezone: ${conf.TIMEZONE || 'Africa/Nairobi'}

*Owner:*
👤 Name: ${conf.OWNER_NAME || 'Starboy'}
📱 Number: ${conf.NUMERO_OWNER || '255627417402'}

*Change Settings:*
${prefix}mode public|private
${prefix}prefix <symbol>
Contact owner for more options`;

        await zk.sendMessage(dest, {
            text: settingsText,
            contextInfo: getContextInfo("Settings", userJid, conf.URL)
        }, { quoted: ms });

    } catch (error) {
        await zk.sendMessage(dest, { text: `Error: ${error.message}` }, { quoted: ms });
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// 🎁 FEATURES SHOWCASE - Bot Capabilities
// ═══════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "features",
    aliases: ["showcase", "abilities", "capabilities", "whatican"],
    categorie: "viper-Info",
    reaction: "🎁",
    description: "Bot Features & Capabilities Showcase"
}, async (dest, zk, commandOptions) => {
    const { ms, userJid } = commandOptions;
    const prefix = conf.PREFIXE || '+';

    try {
        const featuresText = `╔════════════════════════════════╗
║    🎁 *BOT FEATURES* 🎁         ║
╚════════════════════════════════╝

*Media Download:*
🎵 YouTube Audio to MP3
🎥 YouTube Video to MP4
📹 High Quality Support
💾 Fast Processing

*Search & Discovery:*
🔍 YouTube Search
📺 Video Information
⏱️ Duration Display
👁️ View Count

*Group Management:*
👥 Member Management
🛡️ Anti-spam/Anti-link
📢 Auto-announcements
⚡ Instant Moderation

*User Experience:*
⚡ Lightning Fast Response
🎨 Beautiful Formatted Messages
🔘 Interactive Buttons
🌍 Multi-language Support

*Security:*
🔒 User Bans
🚫 Link Detection
⚠️ Content Filtering
🛡️ Spam Protection

*Coming Soon:*
📥 Instagram Download
🎵 Spotify Integration
🎬 More platforms...

Type ${prefix}owner to get support!`;

        await zk.sendMessage(dest, {
            text: featuresText,
            contextInfo: getContextInfo("Features", userJid, conf.URL)
        }, { quoted: ms });

    } catch (error) {
        await zk.sendMessage(dest, { text: `Error: ${error.message}` }, { quoted: ms });
    }
});
