"use strict";

const { ezra } = require("../fredi/ezra");
const axios = require("axios");

ezra({
    nomCom: "imagine",
    categorie: "AI-Image",
    reaction: "🎨",
    nomFichier: __filename
}, async (dest, zk, commandeOptions) => {

    const { repondre, arg } = commandeOptions;

    try {
        if (!arg || arg.length === 0) {
            return repondre(
                "🖌️ *Usage:*\n\n" +
                "`imagine a futuristic city at night, ultra HD`"
            );
        }

        const prompt = arg.join(" ");

        // 🔹 Generating message
        await repondre("⏳ *VIPER MD IS GENERATING YOUR IMAGE...*");

        /*
        ─────────────────────────────
        FLUX / IMAGE API CONFIG
        ─────────────────────────────
        */
        const API_URL = "https://api.your-flux-provider.com/v1/generate";
        const API_KEY = process.env.FLUX_API_KEY || "PUT_YOUR_API_KEY_HERE";

        const response = await axios.post(
            API_URL,
            {
                prompt: prompt,
                width: 1024,
                height: 1024,
                steps: 30,
                guidance_scale: 7,
                sampler: "flux",
                seed: Math.floor(Math.random() * 9999999)
            },
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 60000
            }
        );

        const imageUrl =
            response.data.image ||
            response.data.output ||
            response.data.images?.[0];

        if (!imageUrl) {
            return repondre("❌ Failed to generate image. Try again.");
        }

        // 🖼️ Send final image with prompt
        await zk.sendMessage(dest, {
            image: { url: imageUrl },
            caption:
                "✅ *VIPER MD CREATED YOUR IMAGE FROM THE PROMPT GIVEN*\n\n" +
                "🖋️ *Prompt:*\n" +
                `_${prompt}_\n\n` +
                "⚡ Powered by *VIPER MD*"
        });

    } catch (err) {
        console.error("IMAGINE ERROR:", err);
        repondre("❌ Image generation failed.\nPlease try again later.");
    }
});
