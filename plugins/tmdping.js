"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../fredi/ezra");
const axios = require("axios");
const s = require(__dirname + "/../set");

ezra({ nomCom: "repo", categorie: "Timoth-repo", reaction: "❄" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre } = commandeOptions;
  
  // API URL ya GitHub kwa ajili ya Viper2
  const repoApi = "https://api.github.com/repos/ARNOLDT20/Viper2";
  const img = 'https://files.catbox.moe/zm113g.jpg';

  try {
    const response = await axios.get(repoApi);
    const data = response.data;

    if (data) {
      const stars = data.stargazers_count;
      const forks = data.forks_count;
      const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
      const lastUpdate = new Date(data.updated_at).toLocaleDateString('en-GB');
      const repoUrl = data.html_url;

      const gitdata = `*𝗛𝗶, 𝗜 𝗮𝗺* *𝛻𝛪𝛲𝛯𝑅 𝑇𝛭𝐷.*\n  
╭─────────────━┈⊷•
│🎲│ *𝗣𝗮𝗶𝗿 𝗰𝗼𝗱𝗲:* https://test-pair-uuw6.onrender.com
│🪔│ *𝗥𝗲𝗽𝗼:* ${repoUrl}
│🌟│ *𝗦𝘁𝗮𝗿𝘀:* ${stars}
│🪡│ *𝗙𝗼𝗿𝗸𝘀:* ${forks}
│🎯│ *𝗥𝗲𝗹𝗲𝗮𝘀𝗲 𝗗𝗮𝘁𝗲:* ${releaseDate}
│✅│ *𝗨𝗽𝗱𝗮𝘁𝗲𝗱 𝗼𝗻:* ${lastUpdate}
│💫│ *𝗢𝘄𝗻𝗲𝗿:* ${s.OWNER_NAME || "ARNOLD"}
╰─────────────━┈⊷•⁠⁠⁠⁠
                  
╭─────────────━┈⊷• 
│●│ *ᯤ 𝛻𝛪𝛲𝛯𝑅-𝑇𝛭𝐷: ᴄᴏɴɴᴇᴄᴛᴇᴅ* │¤│ *NAME:* ᴀʀɴᴏʟᴅ.ᴠɪᴘᴇʀ
│○│ *MADE:* ғʀᴏᴍ ᴛᴀɴᴢᴀɴɪᴀ 🇹🇿 
╰─────────────━┈⊷•⁠⁠⁠⁠`;

      await zk.sendMessage(dest, { 
        image: { url: img }, 
        caption: gitdata 
      }, { quoted: ms });
    } else {
      repondre("❌ Imeshindikana kupata data za repository ya 𝛻𝛪𝛲𝛯𝑅 𝑇𝛭𝐷.");
    }
  } catch (error) {
    console.error("Error fetching repository data:", error.message);
    repondre("🥵 Hitilafu imetokea: " + (error.response?.data?.message || error.message));
  }
});
