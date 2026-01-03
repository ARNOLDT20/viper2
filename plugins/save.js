const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "save",
    alias: ["cc", "sv", "cv"],
    desc: "Check uptime and system status",
    category: "main",
    react: "🧚‍♂️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `🔰𝘕𝘈𝘔𝘌- 𝙋𝙖𝙩𝙝𝙪𝙢
🔰𝘍𝘙𝘖𝘔-𝙃𝙖𝙢𝙗𝙖𝙣𝙩𝙝𝙤𝙩𝙖
🔰𝘈𝘎𝘌- *18*

𝗝𝗨𝗦𝗧 𝗡𝗢𝗪 𝗦𝗧𝗔𝗧𝗨𝗦 𝗦𝗘𝗘𝗡🛡️

https://Wa.me//+94773416478?text=Hello_Dark_Shadow😈

*❄️ඔයාව ඔටෝ සේව් වෙනවා මාව සේව් දාගන්න❄️*`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/ylxg7y.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363409414874042@newsletter',
                    newsletterName: 'DARK-SHADOW',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
