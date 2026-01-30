const { fredi } = require('../fredi/ezra');
const { verifierEtatJid, modifierEtatJid, recupererActionJid, modifierActionJid } = require("../lib/antilien");

/**
 * VIPER XMD - STANDALONE ANTILINK SYSTEM
 * Logic hii inajitegemea bila kuhitaji kodi ya ziada kwenye index.js
 */

ezra({
    nomCom: "antilink2",
    categorie: "Group",
    reaction: "🚫"
}, async (dest, zk, commandeOptions) => {
    const { arg, repondre, verifAdmin, verifGroupe, superUser, ms, texte, auteurMessage, verifEzraAdmin } = commandeOptions;

    // 1. MFUMO WA MIPANGILIO (COMMANDS)
    if (arg && arg.length > 0) {
        if (!verifGroupe) return repondre("This command is only for groups.");
        if (!verifAdmin && !superUser) return repondre("Admin privileges required.");

        const mode = arg[0].toLowerCase();

        if (mode === "on") {
            await modifierEtatJid(dest, "oui");
            return repondre("✅ VIPER-XMD Antilink is now ENABLED.");
        } else if (mode === "off") {
            await modifierEtatJid(dest, "non");
            return repondre("❌ VIPER-XMD Antilink is now DISABLED.");
        } else if (mode === "action") {
            const action = arg[1] ? arg[1].toLowerCase() : "";
            if (["remove", "delete", "warn"].includes(action)) {
                await modifierActionJid(dest, action);
                return repondre(`✅ Action updated to: *${action}*`);
            }
            return repondre("Usage: .antilink action delete/remove/warn");
        }
    }

    // 2. MFUMO WA KUGUNDUA LINK (BACKGROUND PROTECTION)
    // Hii sehemu inafanya kazi kila ujumbe unapoandikwa
    try {
        const isAntilinkOn = await verifierEtatJid(dest);
        
        if (verifGroupe && isAntilinkOn && texte) {
            // RegEx ya kasi kukamata link aina zote
            const linkPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
            
            if (linkPattern.test(texte)) {
                // Kama ni Admin au Owner, bot isifanye kitu
                if (superUser || verifAdmin) return;

                // Kama bot si admin, haiwezi kufuta
                if (!verifEzraAdmin) return;

                // HATUA YA KWANZA: Futa link haraka (Maximum Speed)
                await zk.sendMessage(dest, { 
                    delete: { 
                        remoteJid: dest, 
                        fromMe: false, 
                        id: ms.key.id, 
                        participant: auteurMessage 
                    } 
                });

                const action = await recupererActionJid(dest);

                if (action === 'remove') {
                    await zk.groupParticipantsUpdate(dest, [auteurMessage], "remove");
                    await zk.sendMessage(dest, { 
                        text: `*『 VIPER-XMD ANTILINK 』*\n\nLink detected! @${auteurMessage.split("@")[0]} has been kicked.`, 
                        mentions: [auteurMessage] 
                    });
                } else if (action === 'warn') {
                    const { getWarnCountByJID, ajouterUtilisateurAvecWarnCount } = require('./lib/warn');
                    await ajouterUtilisateurAvecWarnCount(auteurMessage);
                    let warn = await getWarnCountByJID(auteurMessage);
                    repondre(`@${auteurMessage.split("@")[0]} warning issued! Link is not allowed.`);
                } else {
                    // Default action: Delete only
                    await zk.sendMessage(dest, { 
                        text: `*『 VIPER-XMD ANTILINK 』*\n\nNo links allowed! @${auteurMessage.split("@")[0]} message deleted.`, 
                        mentions: [auteurMessage] 
                    });
                }
            }
        }
    } catch (e) {
        console.log("Antilink Standalone Error: " + e);
    }
});
