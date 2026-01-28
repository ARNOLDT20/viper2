"use strict";

const { ezra } = require("../fredi/ezra");

ezra({
    nomCom: "status",
    categorie: "Starboy-Status",
    reaction: "📢",
    nomFichier: __filename
}, async (dest, zk, commandeOptions) => {

    try {
        const { repondre, arg, msg } = commandeOptions;

        if (!arg.length && !msg.imageMessage && !msg.videoMessage) {
            return repondre(
                "📢 *Usage:* \n" +
                "status Hello world!\n" +
                "status <reply to image/video> Caption text"
            );
        }

        // Compose status text
        const statusText = arg.join(" ") || "";

        // IMAGE STATUS
        if (msg.imageMessage) {
            const media = await zk.downloadMediaMessage(msg);
            await zk.sendMessage("status@broadcast", {
                image: media,
                caption: `📢 VIPER MD Status\n\n${statusText}`
            });
            return repondre("✅ Status with image posted!");
        }

        // VIDEO STATUS
        if (msg.videoMessage) {
            const media = await zk.downloadMediaMessage(msg);
            await zk.sendMessage("status@broadcast", {
                video: media,
                caption: `📢 VIPER MD Status\n\n${statusText}`
            });
            return repondre("✅ Status with video posted!");
        }

        // TEXT ONLY STATUS
        await zk.sendMessage("status@broadcast", { text: statusText });
        return repondre("✅ Text status posted!");

    } catch (err) {
        console.error("STATUS ERROR:", err);
        repondre("❌ Failed to post status: " + err.message);
    }
});
