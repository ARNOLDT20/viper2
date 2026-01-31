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
        // Prefer OpenAI Images if API key available
        const OPENAI_KEY = process.env.OPENAI_API_KEY || null;

        if (OPENAI_KEY) {
            try {
                const oa = await axios.post(
                    "https://api.openai.com/v1/images/generations",
                    {
                        model: "dall-e-3",
                        prompt: prompt,
                        size: "1024x1024",
                        quality: "standard",
                        n: 1,
                        response_format: "url"
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${OPENAI_KEY}`,
                            "Content-Type": "application/json"
                        },
                        timeout: 120000
                    }
                );

                const dataItem = oa.data?.data?.[0];
                if (!dataItem) {
                    console.error('Imagine: OpenAI returned no data', oa.data);
                    return repondre('❌ Failed to generate image (no data returned).');
                }

                // Handle URL response (dall-e-3 standard)
                if (dataItem.url) {
                    await zk.sendMessage(dest, {
                        image: { url: dataItem.url },
                        caption:
                            "✅ *VIPER MD CREATED YOUR IMAGE FROM THE PROMPT GIVEN*\n\n" +
                            "🖋️ *Prompt:*\n" +
                            `_${prompt}_\n\n` +
                            "⚡ Powered by *VIPER MD*"
                    });
                    return;
                }

                // Handle base64 response (fallback)
                if (dataItem.b64_json) {
                    const buf = Buffer.from(dataItem.b64_json, 'base64');
                    await zk.sendMessage(dest, {
                        image: buf,
                        caption:
                            "✅ *VIPER MD CREATED YOUR IMAGE FROM THE PROMPT GIVEN*\n\n" +
                            "🖋️ *Prompt:*\n" +
                            `_${prompt}_\n\n` +
                            "⚡ Powered by *VIPER MD*"
                    });
                    return;
                }

                console.error('Imagine: OpenAI data format not recognized', oa.data);
                return repondre('❌ Failed to generate image (unexpected response).');

            } catch (errOpen) {
                console.error('Imagine OpenAI error:', errOpen?.response?.data || errOpen?.message);

                // Better error messages
                if (errOpen?.response?.status === 401) {
                    return repondre('❌ Invalid OPENAI_API_KEY. Check your credentials.');
                }
                if (errOpen?.response?.status === 429) {
                    return repondre('❌ Rate limited. Please wait a moment and try again.');
                }
                if (errOpen?.response?.status === 400) {
                    const errMsg = errOpen?.response?.data?.error?.message || 'Invalid request';
                    return repondre(`❌ ${errMsg}`);
                }

                return repondre('❌ Image generation failed. Check API quota and try again.');
            }
        }

        // Fallback: Free Flux AI APIs
        const FLUX_KEY = process.env.FLUX_API_KEY || "";

        // Try free Flux API (fal.ai - requires API key)
        if (FLUX_KEY) {
            try {
                const response = await axios.post(
                    "https://api.falai.com/v1/generate",
                    {
                        prompt: prompt,
                        model: "fal-ai/flux-pro",
                        width: 1024,
                        height: 1024,
                        num_inference_steps: 30,
                        guidance_scale: 7.5
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${FLUX_KEY}`,
                            "Content-Type": "application/json"
                        },
                        timeout: 120000
                    }
                );

                const imageUrl = response.data?.output?.[0]?.url || response.data?.image || response.data?.output;

                if (imageUrl) {
                    await zk.sendMessage(dest, {
                        image: { url: imageUrl },
                        caption:
                            "✅ *VIPER MD CREATED YOUR IMAGE FROM THE PROMPT GIVEN*\n\n" +
                            "🖋️ *Prompt:*\n" +
                            `_${prompt}_\n\n` +
                            "⚡ Powered by Flux AI"
                    });
                    return;
                }
            } catch (fluxErr) {
                console.error('Flux API error:', fluxErr?.message);
            }
        }

        // Free alternative: Try Hugging Face API (no auth needed for inference)
        try {
            const response = await axios.post(
                "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
                { inputs: prompt },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    timeout: 120000
                }
            );

            if (response.data) {
                const imageUrl = response.data;
                await zk.sendMessage(dest, {
                    image: { url: imageUrl },
                    caption:
                        "✅ *VIPER MD CREATED YOUR IMAGE FROM THE PROMPT GIVEN*\n\n" +
                        "🖋️ *Prompt:*\n" +
                        `_${prompt}_\n\n` +
                        "⚡ Powered by Hugging Face Flux"
                });
                return;
            }
        } catch (hfErr) {
            console.error('Hugging Face API error:', hfErr?.message);
        }

        // Fallback message if all methods fail
        return repondre(
            '❌ Image generation failed.\n\n' +
            '📋 *Setup Options:*\n' +
            '1. Add `OPENAI_API_KEY` for DALL-E\n' +
            '2. Add `FLUX_API_KEY` for Flux AI\n\n' +
            '🔗 Get free API keys:\n' +
            '• OpenAI: platform.openai.com/api-keys\n' +
            '• Flux: fal.ai (free tier available)'
        );

    } catch (err) {
        console.error("IMAGINE ERROR:", err);
        repondre("❌ Image generation failed.\nPlease try again later.");
    }
});
