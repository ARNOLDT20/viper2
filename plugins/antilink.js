const { ezra} = require('../fredi/ezra');
const { verifierEtatJid, modifierEtatJid, recupererActionJid, modifierActionJid } = require("../lib/antilien");

ezra({
    nomCom: "antilink",
    categorie: "Group",
    reaction: "🚫"
}, async (dest, zk, commandeOptions) => {
    const { arg, repondre, verifAdmin, verifGroupe, superUser } = commandeOptions;

    if (!verifGroupe) return repondre("This command can only be used in groups.");
    if (!verifAdmin && !superUser) return repondre("This command is for Admins only.");

    if (!arg[0]) {
        return repondre(`*ANTILINK SETTINGS*\n\nUsage:\n- *.antilink on* (Enable)\n- *.antilink off* (Disable)\n- *.antilink action remove* (Delete & Kick)\n- *.antilink action delete* (Delete only)\n- *.antilink action warn* (Give warning)`);
    }

    const mode = arg[0].toLowerCase();

    if (mode === "on") {
        await modifierEtatJid(dest, "oui");
        repondre("✅ Antilink has been enabled successfully.");
    } else if (mode === "off") {
        await modifierEtatJid(dest, "non");
        repondre("❌ Antilink has been disabled.");
    } else if (mode === "action") {
        const action = arg[1] ? arg[1].toLowerCase() : "";
        if (["remove", "delete", "warn"].includes(action)) {
            await modifierActionJid(dest, action);
            repondre(`✅ Antilink action set to: *${action}*`);
        } else {
            repondre("Invalid action! Choose: remove, delete, or warn.");
        }
    }
});
