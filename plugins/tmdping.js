const axios = require('axios');
const { ezra } = require('../fredi/ezra');
const conf = require('../set');

ezra({
    nomCom: "repo",
    categorie: "General",
    reaction: "🐍"
}, async (dest, zk, commandeOptions) => {
    const { repondre, ms, mybotpic } = commandeOptions;

    try {
        const repoPath = "ARNOLDT20/Viper2";
        const response = await axios.get(`https://api.github.com/repos/${repoPath}`);
        const data = response.data;

        if (data) {
            let repoInfo = `
🌟 *VIPER XMD REPOSITORY INFO* 🚀

🐍 *Repository Name:* ${data.name}
👤 *Developer:* ${data.owner.login}
⭐ *Total Stars:* ${data.stargazers_count}
🍴 *Total Forks:* ${data.forks_count}
📅 *Created On:* ${new Date(data.created_at).toLocaleDateString('en-US')}
🔄 *Last Update:* ${new Date(data.updated_at).toLocaleDateString('en-US')}
📂 *Repo Link:* ${data.html_url}

📜 *Description:*
${data.description || "No description provided."}

---
*Powered by BLAZE TECH*`;

            await zk.sendMessage(dest, {
                image: { url: mybotpic() },
                caption: repoInfo,
                contextInfo: {
                    externalAdReply: {
                        title: "VIPER XMD OFFICIAL BOT",
                        body: "Developed by Blaze Tech",
                        sourceUrl: "https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnailUrl: "https://raw.githubusercontent.com/ARNOLDT20/Viper2/main/media/lucky.svg"
                    }
                }
            }, { quoted: ms });
        }
    } catch (error) {
        console.error("Repo Error: " + error);
        repondre("Unable to fetch repository information at the moment. Please try again later.");
    }
});
