const { ezra } = require("../fredi/ezra");
const fs = require("fs");
const path = require("path");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const conf = require(__dirname + '/../set');

ezra({
    nomCom: "remove",
    aliases: ["remove", "bon", "kick"],
    categorie: "Group-Moderation",
    reaction: "👢"
}, async (dest, zk, commandeOptions) => {
    const { ms, arg, auteurMessage, verifGroupe, verifAdmin, infosGroupe, nomAuteurMessage, idBot } = commandeOptions;

    // Only allow in groups
    if (!verifGroupe) {
        return zk.sendMessage(dest, { text: "❌ This command only works in groups." }, { quoted: ms });
    }

    // Check if bot is admin
    const mbre = infosGroupe.participants;
    const groupeAdmin = [];
    for (let m of mbre) {
        if (m.admin == null) continue;
        groupeAdmin.push(m.id);
    }
    const verifEzraAdmin = groupeAdmin.includes(idBot);

    if (!verifEzraAdmin) {
        return zk.sendMessage(dest, { text: "❌ Bot must be a **group admin** to remove members." }, { quoted: ms });
    }

    // Check if user is admin
    if (!verifAdmin) {
        return zk.sendMessage(dest, { text: "❌ Only **group admins** can use this command." }, { quoted: ms });
    }

    // Get the target user
    let targetJid = null;

    // Check if replying to a message
    if (ms.message?.extendedTextMessage?.contextInfo?.participant) {
        targetJid = ms.message.extendedTextMessage.contextInfo.participant;
    }
    // Check for mentions
    else if (ms.message?.extendedTextMessage?.contextInfo?.mentionedJid && ms.message.extendedTextMessage.contextInfo.mentionedJid.length > 0) {
        targetJid = ms.message.extendedTextMessage.contextInfo.mentionedJid[0];
    }
    // Check if argument is provided (user can provide JID)
    else if (arg[0]) {
        targetJid = arg[0].includes('@') ? arg[0] : arg[0] + "@s.whatsapp.net";
    }

    if (!targetJid) {
        return zk.sendMessage(dest, {
            text: `❌ Please specify who to remove!\n\nUsage:\n• Reply to a message and use the command\n• Mention a user: \`${commandeOptions.prefixe}kick @user\`\n• Provide ID: \`${commandeOptions.prefixe}kick 1234567890@s.whatsapp.net\``
        }, { quoted: ms });
    }

    // Prevent kicking the bot owner or the bot itself
    if (targetJid === idBot || targetJid === conf.NUMERO_OWNER + '@s.whatsapp.net') {
        return zk.sendMessage(dest, { text: "❌ Cannot remove the **bot** or **owner**!" }, { quoted: ms });
    }

    try {
        // Send remover.gif sticker
        try {
            const gifPath = path.join(__dirname, "../media/remover.gif");
            if (fs.existsSync(gifPath)) {
                const sticker = new Sticker(gifPath, {
                    pack: conf.BOT || 'Viper XMD',
                    author: conf.OWNER_NAME || 'Viper',
                    type: StickerTypes.FULL,
                    categories: ['👢', '🚫'],
                    id: '12345',
                    quality: 50,
                    background: '#000000'
                });

                const stickPath = path.join(__dirname, "../st_kick.webp");
                await sticker.toFile(stickPath);
                await zk.sendMessage(dest, { sticker: fs.readFileSync(stickPath) });
                fs.unlink(stickPath, () => { });
            }
        } catch (stickerErr) {
            console.error("Sticker error:", stickerErr.message);
        }

        // Remove the user from group
        await zk.groupParticipantsUpdate(dest, [targetJid], "remove");

        // Send confirmation message
        const targetName = mbre.find(m => m.id === targetJid)?.notify || targetJid.split('@')[0];
        await zk.sendMessage(dest, {
            text: `👢 **@${targetName}** has been **removed** from the group!`,
            mentions: [targetJid]
        }, { quoted: ms });

        console.log(`✅ User ${targetJid} removed from group ${dest} by ${auteurMessage}`);

    } catch (error) {
        console.error("Kick command error:", error);
        return zk.sendMessage(dest, { text: `❌ Error removing user: ${error.message}` }, { quoted: ms });
    }
});
