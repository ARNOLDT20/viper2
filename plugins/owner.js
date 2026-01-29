const { ezra } = require(__dirname + "/../fredi/ezra");
const fs = require('fs');
const path = require('path');
const conf = require(__dirname + "/../set");

ezra({
    nomCom: "owner",
    aliases: ["ownerinfo", "contactowner", "ownercontact", ".owner", "..owner"],
    desc: "Show bot owner information and contact",
    categorie: "viper-Info"
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;

    try {
        const ownerNumberRaw = (conf.NUMERO_OWNER || '').toString().replace(/[^0-9]/g, '');
        const ownerJid = ownerNumberRaw ? `${ownerNumberRaw}@s.whatsapp.net` : '';
        const ownerName = conf.OWNER_NAME || 'Owner';

        // Prepare text
        const lines = [];
        lines.push(`👤 Owner: ${ownerName}`);
        if (ownerNumberRaw) lines.push(`📞 Number: +${ownerNumberRaw}`);
        if (ownerNumberRaw) lines.push(`🔗 WhatsApp: https://wa.me/${ownerNumberRaw}`);
        if (conf.GURL) lines.push(`🌐 Website: ${conf.GURL}`);
        lines.push('');
        lines.push('Use the contact below to save/import owner number.');

        // Send info text with mention if possible
        const mentions = ownerJid ? [ownerJid] : [];
        await zk.sendMessage(dest, { text: lines.join('\n'), mentions }, { quoted: ms });

        // Create a temporary vCard and send it so users can import contact
        if (ownerNumberRaw) {
            const vCardContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${ownerName}\nTEL;type=CELL;type=VOICE;waid=${ownerNumberRaw}:+${ownerNumberRaw}\nEND:VCARD\n`;
            const fileName = `owner_${ownerNumberRaw}.vcf`;
            const filePath = path.join(process.cwd(), fileName);
            try {
                fs.writeFileSync(filePath, vCardContent, 'utf8');
                await zk.sendMessage(dest, {
                    document: { url: filePath },
                    mimetype: 'text/vcard',
                    fileName: `${ownerName}.vcf`,
                    caption: `Contact: ${ownerName}`
                }, { quoted: ms });
            } catch (e) {
                console.error('Failed to create/send vCard:', e);
            } finally {
                // cleanup
                try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch (e) { }
            }
        }

    } catch (err) {
        console.error('owner plugin error', err);
        repondre('Could not fetch owner information.');
    }
});
