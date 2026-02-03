'use strict';

const { ezra } = require("../fredi/ezra");
const conf = require(__dirname + '/../set');

// ═════════════════════════════════════════════════════════════════════════════
// 📥 DOWNLOAD MENU - Simple Text Menu (No Buttons)
// ═════════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "dlmenu",
    aliases: ["downloadmenu", "getmenu", "mediamenu"],
    categorie: "viper-Menu",
    reaction: "📥",
    description: "Download Menu"
}, async (dest, zk, { ms }) => {
    try {
        const txt = `╔════════════════════════════════╗
║  📥 VIPER DOWNLOAD MENU 📥     ║
╚════════════════════════════════╝

🎵 AUDIO DOWNLOAD
   .play <song/url>
   .ytmp3 <youtube url>
   .getaudio <query>

🎥 VIDEO DOWNLOAD  
   .video <video/url>
   .ytmp4 <youtube url>
   .getvideo <query>

🔍 SEARCH & BROWSE
   .ytsearch <search query>
   .youtube <query>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Powered by Viper XMD ✨`;

        await zk.sendMessage(dest, { text: txt }, { quoted: ms });
    } catch (e) {
        console.log("dlmenu error:", e.message);
    }
});

// ═════════════════════════════════════════════════════════════════════════════
// 👑 OWNER INFO
// ═════════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "owner",
    aliases: ["ownerinfo", "support", "creator"],
    categorie: "viper-Info",
    reaction: "👑",
    description: "Owner Info"
}, async (dest, zk, { ms }) => {
    try {
        const ownerNumber = conf.NUMERO_OWNER || "255627417402";
        const ownerName = conf.OWNER_NAME || "Starboy";
        const botName = conf.BOT || 'Viper XMD';

        const txt = `╔════════════════════════════════╗
║      👑 BOT OWNER INFO 👑      ║
╚════════════════════════════════╝

🤖 Bot: ${botName}
👤 Owner: ${ownerName}
📱 WhatsApp: ${ownerNumber}
🌐 GitHub: ${conf.GITHUB || 'N/A'}
📢 Channel: ${conf.GURL || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📲 Contact Support:
• WhatsApp: https://wa.me/${ownerNumber}
• Report bugs & request features
• Follow for updates`;

        await zk.sendMessage(dest, { text: txt }, { quoted: ms });
    } catch (e) {
        console.log("owner error:", e.message);
    }
});

// ═════════════════════════════════════════════════════════════════════════════
// 📋 COPY OWNER NUMBER
// ═════════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "ownernum",
    aliases: ["ownernumber", "copyowner", "contactowner"],
    categorie: "viper-Info",
    reaction: "📋",
    description: "Owner Number"
}, async (dest, zk, { ms }) => {
    try {
        const ownerNumber = conf.NUMERO_OWNER || "255627417402";
        const ownerName = conf.OWNER_NAME || "Starboy";

        const txt = `╔════════════════════════════════╗
║   📋 OWNER CONTACT INFO 📋    ║
╚════════════════════════════════╝

Owner Name: ${ownerName}
Owner Number: ${ownerNumber}

📱 WhatsApp: https://wa.me/${ownerNumber}

👉 Copy number above to contact!`;

        await zk.sendMessage(dest, { text: txt }, { quoted: ms });
    } catch (e) {
        console.log("ownernum error:", e.message);
    }
});

// ═════════════════════════════════════════════════════════════════════════════
// ℹ️ BOT INFO
// ═════════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "botinfo",
    aliases: ["info", "about", "botdetails"],
    categorie: "viper-Info",
    reaction: "ℹ️",
    description: "Bot Info"
}, async (dest, zk, { ms }) => {
    try {
        const botName = conf.BOT || 'Viper XMD';
        const prefix = conf.PREFIXE || '+';
        const mode = conf.MODE === 'yes' ? '🟢 PUBLIC' : '🔴 PRIVATE';

        const txt = `╔════════════════════════════════╗
║     🤖 VIPER XMD INFO 🤖       ║
╚════════════════════════════════╝

📛 Name: ${botName}
⚙️ Prefix: ${prefix}
🎯 Mode: ${mode}
✨ Version: 3.0.0+

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎵 YouTube Audio Download
🎥 YouTube Video Download
🔍 Search Integration
👥 Group Management
🛡️ Security & Anti-spam
⚡ Lightning Fast Response

Developer: T20-CLASSIC
Powered By: Viper MD Engine`;

        await zk.sendMessage(dest, { text: txt }, { quoted: ms });
    } catch (e) {
        console.log("botinfo error:", e.message);
    }
});

// ═════════════════════════════════════════════════════════════════════════════
// ❓ HELP MENU
// ═════════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "helpdownload",
    aliases: ["dlhelp", "downloadhelp", "howtouse"],
    categorie: "viper-Help",
    reaction: "❓",
    description: "Help Guide"
}, async (dest, zk, { ms }) => {
    try {
        const prefix = conf.PREFIXE || '+';

        const txt = `╔════════════════════════════════╗
║   ❓ DOWNLOAD HELP GUIDE ❓     ║
╚════════════════════════════════╝

AUDIO COMMANDS:
${prefix}play <song name/url>
${prefix}ytmp3 <youtube url>
${prefix}audio <query>
${prefix}getaudio <song>

VIDEO COMMANDS:
${prefix}video <video name/url>
${prefix}ytmp4 <youtube url>
${prefix}film <query>
${prefix}getvideo <video>

SEARCH COMMANDS:
${prefix}ytsearch <search>
${prefix}youtube <query>
${prefix}yt <query>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TIPS:
✓ Provide song/video title or URL
✓ Downloads take 30 seconds
✓ Supports YouTube
✓ Use document option for files

${prefix}owner - Contact support`;

        await zk.sendMessage(dest, { text: txt }, { quoted: ms });
    } catch (e) {
        console.log("helpdownload error:", e.message);
    }
});

// ═════════════════════════════════════════════════════════════════════════════
// 🔗 LINKS MENU
// ═════════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "links",
    aliases: ["getlinks", "ourlinks", "socials"],
    categorie: "viper-Links",
    reaction: "🔗",
    description: "Links"
}, async (dest, zk, { ms }) => {
    try {
        const txt = `╔════════════════════════════════╗
║        🔗 OUR LINKS 🔗          ║
╚════════════════════════════════╝

GitHub Repository:
${conf.GITHUB || 'Coming soon...'}

WhatsApp Channel:
${conf.GURL || 'Coming soon...'}

Website:
${conf.WEBSITE || 'Coming soon...'}

Owner Contact:
https://wa.me/${conf.NUMERO_OWNER || '255627417402'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Join our community:
✓ Follow GitHub for updates
✓ Subscribe to channel
✓ Contact support anytime`;

        await zk.sendMessage(dest, { text: txt }, { quoted: ms });
    } catch (e) {
        console.log("links error:", e.message);
    }
});

// ═════════════════════════════════════════════════════════════════════════════
// 🎯 ALL COMMANDS MENU
// ═════════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "allcmds",
    aliases: ["cmdlist", "allcommands", "commands"],
    categorie: "viper-Menu",
    reaction: "🎯",
    description: "All Commands"
}, async (dest, zk, { ms }) => {
    try {
        const prefix = conf.PREFIXE || '+';

        const txt = `╔════════════════════════════════╗
║    🎯 ALL COMMANDS 🎯          ║
╚════════════════════════════════╝

DOWNLOAD:
${prefix}play ${prefix}video ${prefix}ytsearch
${prefix}getaudio ${prefix}getvideo

INFO:
${prefix}owner ${prefix}botinfo ${prefix}ownernum
${prefix}helpdownload ${prefix}links

MENUS:
${prefix}dlmenu ${prefix}allcmds ${prefix}settings

UTILITIES:
${prefix}ping ${prefix}uptime ${prefix}mode
${prefix}help ${prefix}status

ADMIN:
${prefix}ban ${prefix}kick ${prefix}promote
${prefix}demote ${prefix}mute

FUN:
${prefix}joke ${prefix}meme ${prefix}quote

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type ${prefix}help <command> for details`;

        await zk.sendMessage(dest, { text: txt }, { quoted: ms });
    } catch (e) {
        console.log("allcmds error:", e.message);
    }
});

// ═════════════════════════════════════════════════════════════════════════════
// ⚙️ SETTINGS MENU
// ═════════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "settings",
    aliases: ["mysettings", "config"],
    categorie: "viper-Info",
    reaction: "⚙️",
    description: "Settings"
}, async (dest, zk, { ms }) => {
    try {
        const prefix = conf.PREFIXE || '+';
        const mode = conf.MODE === 'yes' ? '🟢 PUBLIC' : '🔴 PRIVATE';
        const autoRead = conf.AUTO_READ_MESSAGES === 'yes' ? '✅' : '❌';
        const autoReact = conf.AUTO_REACT === 'yes' ? '✅' : '❌';

        const txt = `╔════════════════════════════════╗
║    ⚙️ BOT SETTINGS ⚙️           ║
╚════════════════════════════════╝

GENERAL:
🎯 Prefix: ${prefix}
🎭 Mode: ${mode}
📛 Bot Name: ${conf.BOT || 'Viper XMD'}

FEATURES:
👁️ Auto-Read: ${autoRead}
😊 Auto-React: ${autoReact}
⏰ Timezone: ${conf.TIMEZONE || 'Africa/Nairobi'}

OWNER:
👤 Name: ${conf.OWNER_NAME || 'Starboy'}
📱 Number: ${conf.NUMERO_OWNER || '255627417402'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CHANGE SETTINGS:
${prefix}mode public|private
${prefix}prefix <symbol>

Contact owner for more options`;

        await zk.sendMessage(dest, { text: txt }, { quoted: ms });
    } catch (e) {
        console.log("settings error:", e.message);
    }
});

// ═════════════════════════════════════════════════════════════════════════════
// 🎁 FEATURES SHOWCASE
// ═════════════════════════════════════════════════════════════════════════════
ezra({
    nomCom: "features",
    aliases: ["showcase", "abilities", "capabilities"],
    categorie: "viper-Info",
    reaction: "🎁",
    description: "Bot Features"
}, async (dest, zk, { ms }) => {
    try {
        const prefix = conf.PREFIXE || '+';

        const txt = `╔════════════════════════════════╗
║    🎁 BOT FEATURES 🎁          ║
╚════════════════════════════════╝

MEDIA DOWNLOAD:
🎵 YouTube Audio to MP3
🎥 YouTube Video to MP4
📹 High Quality Support
💾 Fast Processing

SEARCH & DISCOVERY:
🔍 YouTube Search
📺 Video Information
⏱️ Duration Display
👁️ View Count

GROUP MANAGEMENT:
👥 Member Management
🛡️ Anti-spam/Anti-link
📢 Auto-announcements
⚡ Instant Moderation

USER EXPERIENCE:
⚡ Lightning Fast Response
🎨 Beautiful Messages
🌍 Multi-language Support

SECURITY:
🔒 User Bans
🚫 Link Detection
⚠️ Content Filtering
🛡️ Spam Protection

COMING SOON:
📥 Instagram Download
🎵 Spotify Integration
🎬 More platforms...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type ${prefix}owner for support!`;

        await zk.sendMessage(dest, { text: txt }, { quoted: ms });
    } catch (e) {
        console.log("features error:", e.message);
    }
});
