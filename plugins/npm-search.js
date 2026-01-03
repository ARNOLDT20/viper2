const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "npmstalk",
    alias: ["npm", "npmpackage"],
    desc: "Get details of an NPM package",
    category: "tools",
    react: "📦",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide an NPM package name.\nExample: `.npmstalk fs-extra`");

        const apiUrl = `https://api.vreden.my.id/api/npmstalk?query=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.result) {
            await react("❌");
            return reply(`NPM package *${q}* not found.`);
        }

        const result = data.result;
        const repo = result.repository ? result.repository : "Not available";
        const npmUrl = `https://www.npmjs.com/package/${result.name}`;

        const text = `*DARK SHADOW MD NPM SEARCH*\n\n` +
                     `🔰 *NPM PACKAGE:* ${result.name}\n` +
                     `📄 *DESCRIPTION:* ${result.description || "No description available"}\n` +
                     `⏸️ *LAST VERSION:* ${result["dist-tags"]?.latest || "Unknown"}\n` +
                     `🪪 *LICENSE:* ${result.license || "Unknown"}\n` +
                     `🪩 *REPOSITORY:* ${repo}\n` +
                     `🔗 *NPM URL:* ${npmUrl}`;

        await conn.sendMessage(from, { text }, { quoted: mek });
        await react("✅"); // React after successful response
    } catch (e) {
        console.error("Error in npmstalk command:", e);
        await react("❌");
        reply("An error occurred while fetching NPM package details.");
    }
});
