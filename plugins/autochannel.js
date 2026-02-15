const { ezra } = require("../fredi/ezra");

// 🔁 CHANGE THIS TO YOUR CHANNEL ID
const CHANNEL_ID = "0029Vb6H6jF9hXEzZFlD6F3d@newsletter";

let autoPostInterval = null;

ezra({
    nomCom: "autochannel",
    categorie: "viper-Channel",
    reaction: "📢"
}, async (chatId, client, context) => {

    const { repondre, superUser, arg } = context;

    if (!superUser) return repondre("SuperUser only.");

    const action = arg[0];

    if (!action) {
        return repondre("Use:\n\nautochannel start\nautochannel stop");
    }

    // ==========================
    // START AUTO POSTING
    // ==========================
    if (action === "start") {

        if (autoPostInterval) {
            return repondre("Auto posting already running.");
        }

        repondre("✅ Auto channel posting started.");

        autoPostInterval = setInterval(async () => {
            try {

                const message =
                    `🔥 *VIPER MD AUTO UPDATE* 🔥

🕒 ${new Date().toLocaleString()}

Stay connected for more updates 🚀`;

                await client.sendMessage(CHANNEL_ID, {
                    text: message
                });

                console.log("Channel auto post sent.");

            } catch (err) {
                console.log("Channel auto post error:", err);
            }

        }, 3600000); // 1 hour (change if needed)

    }

    // ==========================
    // STOP AUTO POSTING
    // ==========================
    if (action === "stop") {

        if (!autoPostInterval) {
            return repondre("Auto posting is not running.");
        }

        clearInterval(autoPostInterval);
        autoPostInterval = null;

        return repondre("🛑 Auto channel posting stopped.");
    }

});
