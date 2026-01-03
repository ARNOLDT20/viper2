const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "kick",
    react: "🥏",
    alias: ["k", "remove"],
    desc: "To Remove a participant from Group",
    category: "group",
    use: '.kick',
    filename: __filename
},
async(conn, mek, m, { from, quoted, isGroup, senderNumber, botNumber, groupAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");

        // Ensure only group admins can use this command
        if (!groupAdmins.includes(senderNumber + "@s.whatsapp.net")) {
            return reply("❌ Only group admins can use this command.");
        }

        if (!isBotAdmins) return reply("❌ I need to be an admin to kick members.");

        // Fetch mentioned user or replied user
        let users = quoted ? quoted.sender : (m.mentionedJid ? m.mentionedJid[0] : false);
        if (!users) return reply("❌ *Couldn't find any user in context*");

        // Prevent kicking bot itself
        if (users === botNumber) return reply("❌ I can't kick myself!");

        // Extract bot owner's number
        const botOwner = conn.user.id.split(":")[0];

        // Prevent kicking the owner
        if (users === botOwner + "@s.whatsapp.net") return reply("❌ You cannot kick the bot owner!");

        // Kick the user
        await conn.groupParticipantsUpdate(from, [users], "remove");
        await conn.sendMessage(from, { text: "*Successfully removed* ✔️" }, { quoted: mek });

    } catch (e) {
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        console.log(e);
        reply(`❌ *Error Occurred !!*\n\n${e}`);
    }
});
