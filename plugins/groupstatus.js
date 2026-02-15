const { ezra } = require("../fredi/ezra");
const { downloadMediaMessage } = require("@whiskeysockets/baileys");

// ===============================
// GROUP STATUS COMMAND
// ===============================

ezra({
    nomCom: 'groupstatus',
    aliase: ['gstatus', 'gs'],
    categorie: "viper-Group",
    reaction: '📢'
}, async (chatId, client, context) => {

    const { repondre, superUser, verifGroupe, msgRepondu, arg } = context;

    // Group only
    if (!verifGroupe) {
        return repondre("This command works in groups only.");
    }

    // SuperUser only
    if (!superUser) {
        return repondre("You are too weak to use this command.");
    }

    const caption = arg.join(" ");

    // Must reply to media OR provide text
    if (!msgRepondu && !caption) {
        return repondre("Reply to image/video/audio OR type text after command.");
    }

    try {

        const defaultCaption = "📢 Group Status Posted Successfully";

        // ========================
        // IF REPLYING TO MEDIA
        // ========================
        if (msgRepondu) {

            const mime = msgRepondu.mimetype || msgRepondu.msg?.mimetype || "";

            const buffer = await downloadMediaMessage(
                msgRepondu,
                "buffer",
                {},
                {
                    logger: client.logger,
                    reuploadRequest: client.updateMediaMessage
                }
            );

            // IMAGE
            if (/image/.test(mime)) {
                await client.sendMessage(chatId, {
                    groupStatusMessage: {
                        image: buffer,
                        caption: caption || defaultCaption
                    }
                });
                return repondre("✅ Image group status posted.");
            }

            // VIDEO
            if (/video/.test(mime)) {
                await client.sendMessage(chatId, {
                    groupStatusMessage: {
                        video: buffer,
                        caption: caption || defaultCaption
                    }
                });
                return repondre("✅ Video group status posted.");
            }

            // AUDIO
            if (/audio/.test(mime)) {
                await client.sendMessage(chatId, {
                    groupStatusMessage: {
                        audio: buffer,
                        mimetype: "audio/mp4"
                    }
                });
                return repondre("✅ Audio group status posted.");
            }

            return repondre("Unsupported media type.");
        }

// ========================
// TEXT ONLY
