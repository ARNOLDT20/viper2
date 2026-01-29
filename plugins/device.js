const { ezra } = require(__dirname + "/../fredi/ezra");

ezra({
    nomCom: "device",
    aliases: ["deviceinfo", "whichdevice"],
    desc: "Fetch device information of the replied-to sender",
    categorie: "viper-Fun"
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, msgRepondu, auteurMsgRepondu } = commandeOptions;

    try {
        if (!msgRepondu) {
            repondre('Please reply to a user message and type .device');
            return;
        }

        const targetJid = auteurMsgRepondu || msgRepondu?.contextInfo?.participant;
        if (!targetJid) {
            repondre('Could not determine the original sender.');
            return;
        }

        // Try multiple heuristics to determine device info
        let device = null;

        // 1) Check quoted message context for any device-like fields
        try {
            device = msgRepondu?.contextInfo?.device || msgRepondu?.device || null;
        } catch (e) { device = null; }

        // 2) Try fetching business/profile info or status that might include hints
        try {
            if (!device && zk.fetchStatus) {
                const status = await zk.fetchStatus(targetJid).catch(() => null);
                if (status && status.platform) device = status.platform;
            }
        } catch (e) { /* ignore */ }

        try {
            if (!device && zk.getBusinessProfile) {
                const biz = await zk.getBusinessProfile(targetJid).catch(() => null);
                if (biz && biz.platform) device = biz.platform;
            }
        } catch (e) { /* ignore */ }

        // 3) Fallback: try inferring from message id patterns (best-effort)
        try {
            if (!device) {
                const stanzaId = msgRepondu?.contextInfo?.stanzaId || msgRepondu?.stanzaId || '';
                if (stanzaId && stanzaId.startsWith('3')) device = 'Probably Mobile';
                else if (stanzaId && stanzaId.startsWith('BAE')) device = 'Probably Server/Desktop';
            }
        } catch (e) { /* ignore */ }

        if (!device) device = "Unknown (WhatsApp does not expose device reliably)";

        const text = `Device info for @${targetJid.split('@')[0]}: ${device}`;
        await zk.sendMessage(dest, { text, mentions: [targetJid] }, { quoted: ms });

    } catch (err) {
        console.error('device plugin error', err);
        repondre('An error occurred while fetching device info.');
    }
});
