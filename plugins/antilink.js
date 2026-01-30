const { zokou } = require('../fredi/ezra'); // Hakikisha path ya ezra ni sahihi
const { verifierEtatJid, modifierEtatJid, recupererActionJid, modifierActionJid } = require("../lib/antilien");

zokou({
    nomCom: "antilink",
    categorie: "Group",
    reaction: "🔗"
}, async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre, verifAdmin, verifGroupe, superUser } = commandeOptions;

    if (!verifGroupe) {
        return repondre("Amri hii ni kwa ajili ya makundi tu.");
    }
    if (!verifAdmin && !superUser) {
        return repondre("Samahani, amri hii ni kwa ajili ya ma-admin pekee.");
    }

    if (!arg[0]) {
        return repondre(`*MATUMIZI YA ANTILINK:*\n\nAndika hivi:\n1. *antilink on* (Kuwasha)\n2. *antilink off* (Kuzima)\n3. *antilink action delete* (Kufuta tu)\n4. *antilink action remove* (Kufuta na kutoa mtu)\n5. *antilink action warn* (Kutoa onyo)`);
    }

    const mode = arg[0].toLowerCase();

    if (mode === "on") {
        await modifierEtatJid(dest, "oui");
        repondre("✅ Antilink imewashwa sasa.");
    } else if (mode === "off") {
        await modifierEtatJid(dest, "non");
        repondre("❌ Antilink imezimwa.");
    } else if (mode === "action") {
        if (!arg[1]) return repondre("Chagua action: delete, remove, au warn.");
        
        const action = arg[1].toLowerCase();
        if (["delete", "remove", "warn"].includes(action)) {
            await modifierActionJid(dest, action);
            repondre(`✅ Action ya antilink imewekwa kuwa: *${action}*`);
        } else {
            repondre("Action batili! Tumia: delete, remove, au warn.");
        }
    } else {
        repondre("Andika 'on' au 'off' au 'action'.");
    }
});
