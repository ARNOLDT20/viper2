"use strict";
const { ezra } = require("../fredi/ezra");

ezra({
    nomCom: "sticker",
    categorie: "Fun",
    reaction: "🖼️",
    nomFichier: __filename
}, async (dest, zk, { msg, repondre }) => {

    if (!msg.imageMessage) return repondre("🖼️ Reply to an image");

    await zk.sendMessage(dest, {
        sticker: await zk.downloadMediaMessage(msg)
    });
});
