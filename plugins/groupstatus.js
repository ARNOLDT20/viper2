const { ezra } = require("../fredi/ezra");
const { generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys");
const { downloadMediaMessage } = require("@whiskeysockets/baileys");

ezra({
    nomCom: 'groupstatus',
    aliase: ['gstatus', 'gs'],
    categorie: "viper-Group",
    reaction: '📢'
}, async (chatId, client, context) => {

    const { repondre, superUser, verifGroupe, msgRepondu, arg } = context;

    if (!verifGroupe) return repondre("Group only command.");
    if (!superUser) return repondre("SuperUser only.");

    const caption = arg.join(" ");

    if (!msgRepondu && !caption) {
        return repondre("Reply to media or provide text.");
    }

    try {

        let content = {};

        // ==========================
        // MEDIA GROUP STORY
        // ==========================
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

            if (/image/.test(mime)) {
                content = {
                    groupStatusMessage: {
                        imageMessage: proto.Message.ImageMessage.create({
                            jpegThumbnail: buffer,
                            caption: caption || ""
                        })
                    }
                };
            }

            else if (/video/.test(mime)) {
                content = {
                    groupStatusMessage: {
                        videoMessage: proto.Message.VideoMessage.create({
                            caption: caption || ""
                        })
                    }
                };
            }

            else if (/audio/.test(mime)) {
                content = {
                    groupStatusMessage: {
                        audioMessage: proto.Message.AudioMessage.create({
                            mimetype: "audio/mp4"
                        })
                    }
                };
            }

        } else {
            // TEXT STORY
            content = {
                groupStatusMessage: {
                    conversation: caption
                }
            };
        }

        const message = generateWAMessageFromContent(chatId, content, {});

        await client.relayMessage(chatId, message.message, {
            messageId: message.key.id
        });

        return repondre("✅ Group Story posted successfully.");

    } catch (err) {
        console.log(err);
        return repondre("Failed to post Group Story. Your Baileys may not support it.");
    }

});
