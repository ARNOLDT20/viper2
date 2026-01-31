const { ezra } = require("../fredi/ezra");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../lib/antilien");
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require("../lib/antibot");
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');
const { ajouterUtilisateurAvecWarnCount, getWarnCountByJID, resetWarnCountByJID } = require('../lib/warn');
const s = require("../set");

// --- COMMAND TO WARN USERS ---
ezra({
    nomCom: 'warn',
    categorie: 'viper-Group'
}, async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre, superUser, verifGroupe, verifAdmin, msgRepondu, auteurMsgRepondu } = commandeOptions;
    
    if (!verifGroupe) return repondre('This is a group command');
    if (!(verifAdmin || superUser)) return repondre('You are not an admin');
    if (!msgRepondu) return repondre('Reply to a message to warn the user');

    if (!arg || arg.length === 0) {
        await ajouterUtilisateurAvecWarnCount(auteurMsgRepondu);
        let warn = await getWarnCountByJID(auteurMsgRepondu);
        let warnlimit = s.WARN_COUNT || 3;

        if (warn >= warnlimit) {
            await repondre('User has reached the limit. Kicking...');
            await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove");
        } else {
            repondre(`User warned. Remaining: ${warnlimit - warn}`);
        }
    } else if (arg[0] === 'reset') {
        await resetWarnCountByJID(auteurMsgRepondu);
        repondre("Warn count reset successfully.");
    } else {
        repondre('Use .warn or .warn reset');
    }
});

// --- COMMAND TO GETALLMEMBERS ---
ezra({ nomCom: "getallmembers", categorie: 'viper-Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, verifGroupe, infosGroupe, verifAdmin, superUser } = commandeOptions;

    if (!verifGroupe) return repondre("✋🏿 Groups only!");
    if (!(verifAdmin || superUser)) return repondre("❌ Admin only.");

    let membresGroupe = infosGroupe.participants || [];
    let tag = `*🌟 GROUP MEMBERS JIDS 🌟*\n\n`;
    let mentions = [];

    membresGroupe.forEach((membre, index) => {
        tag += `${index + 1}. ${membre.id}\n`;
        mentions.push(membre.id);
    });

    await zk.sendMessage(dest, { text: tag, mentions }, { quoted: ms });
});

// --- COMMAND TO TAGALL ---
ezra({ nomCom: "tagall", categorie: 'viper-Group', reaction: "📯" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions;

    if (!verifGroupe) return repondre("⚠️ Groups only!");
    if (!(verifAdmin || superUser)) return repondre("❌ Admin only.");

    let mess = (arg && arg.length > 0) ? arg.join(' ') : 'No Message';
    let membresGroupe = infosGroupe.participants || [];
    let tag = `🌟 *VIPER XMD TAGS* 🌟\n\n👥 Group: ${nomGroupe}\n👤 From: ${nomAuteurMessage}\n📜 Msg: ${mess}\n\n`;

    for (const membre of membresGroupe) {
        tag += `🔹 @${membre.id.split("@")[0]}\n`;
    }

    await zk.sendMessage(dest, { text: tag, mentions: membresGroupe.map(m => m.id) }, { quoted: ms });
});

// --- COMMAND TO LINK ---
ezra({ nomCom: "link", categorie: 'viper-Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {
    const { repondre, nomGroupe, verifGroupe, idBot, infosGroupe } = commandeOptions;
    if (!verifGroupe) return repondre("Groups only!");

    // Check if bot is admin
    const admins = infosGroupe.participants.filter(v => v.admin !== null).map(v => v.id);
    if (!admins.includes(idBot)) return repondre("I need to be an admin to get the link.");

    try {
        const code = await zk.groupInviteCode(dest);
        repondre(`https://chat.whatsapp.com/${code}`);
    } catch (e) { repondre("Error: " + e); }
});

// --- COMMAND TO PROMOTE ---
ezra({ nomCom: "promote", categorie: 'viper-Group', reaction: "💐" }, async (dest, zk, commandeOptions) => {
    let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, verifAdmin, superUser, idBot } = commandeOptions;
    
    if (!verifGroupe) return repondre("Groups only!");
    if (!msgRepondu) return repondre("Reply to someone.");
    if (!(verifAdmin || superUser)) return repondre("You are not admin.");

    const admins = infosGroupe.participants.filter(v => v.admin !== null).map(v => v.id);
    if (!admins.includes(idBot)) return repondre("I am not admin.");

    if (admins.includes(auteurMsgRepondu)) return repondre("User is already admin.");

    await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "promote");
    repondre(`@${auteurMsgRepondu.split("@")[0]} promoted!`, { mentions: [auteurMsgRepondu] });
});

// --- COMMAND TO DEMOTE ---
ezra({ nomCom: "demote", categorie: 'viper-Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
    let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, verifAdmin, superUser, idBot } = commandeOptions;

    if (!verifGroupe) return repondre("Groups only!");
    if (!msgRepondu) return repondre("Reply to someone.");
    if (!(verifAdmin || superUser)) return repondre("You are not admin.");

    const admins = infosGroupe.participants.filter(v => v.admin !== null).map(v => v.id);
    if (!admins.includes(idBot)) return repondre("I am not admin.");

    if (!admins.includes(auteurMsgRepondu)) return repondre("User is not an admin.");

    await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "demote");
    repondre(`@${auteurMsgRepondu.split("@")[0]} demoted!`, { mentions: [auteurMsgRepondu] });
});

// --- COMMAND TO DELETE (DEL) ---
ezra({ nomCom: "del", categorie: 'viper-Group', reaction: "🧹" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser } = commandeOptions;
    if (!msgRepondu) return repondre("Reply to a message to delete it.");

    if (verifAdmin || superUser) {
        try {
            const key = {
                remoteJid: dest,
                id: ms.message.extendedTextMessage.contextInfo.stanzaId,
                fromMe: ms.message.extendedTextMessage.contextInfo.participant === zk.user.id,
                participant: ms.message.extendedTextMessage.contextInfo.participant
            };
            await zk.sendMessage(dest, { delete: key });
        } catch (e) { repondre("Admin rights required."); }
    } else {
        repondre("Admin only.");
    }
});

// --- COMMAND TO ANTILINK ---
ezra({ nomCom: "antilink", categorie: 'viper-Group' }, async (dest, zk, commandeOptions) => {
    let { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;
    if (!verifGroupe) return repondre("Groups only.");
    if (!(verifAdmin || superUser)) return repondre("Admin only.");

    const status = await verifierEtatJid(dest);
    if (!arg || arg.length === 0) {
        return repondre(`Status: ${status ? 'ON' : 'OFF'}\nUse: .antilink on/off or .antilink action/remove`);
    }

    if (arg[0] === 'on') {
        await ajouterOuMettreAJourJid(dest, "oui");
        repondre("Antilink ON");
    } else if (arg[0] === 'off') {
        await ajouterOuMettreAJourJid(dest, "non");
        repondre("Antilink OFF");
    } else if (arg[0].startsWith('action/')) {
        let act = arg[0].split('/')[1];
        await mettreAJourAction(dest, act);
        repondre(`Action set to ${act}`);
    }
});

// --- COMMAND TO ANTIBOT ---
ezra({ nomCom: "antibot", categorie: 'viper-Group' }, async (dest, zk, commandeOptions) => {
    let { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;
    if (!verifGroupe) return repondre("Groups only.");
    if (!(verifAdmin || superUser)) return repondre("Admin only.");

    if (arg[0] === 'on') {
        await atbajouterOuMettreAJourJid(dest, "oui");
        repondre("Antibot ON");
    } else if (arg[0] === 'off') {
        await atbajouterOuMettreAJourJid(dest, "non");
        repondre("Antibot OFF");
    } else {
        repondre("Use .antibot on/off");
    }
});
