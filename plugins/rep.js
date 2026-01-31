'use strict';

const { ezra } = require("../fredi/ezra");
const axios = require('axios');
const moment = require("moment-timezone");
const set = require(__dirname + '/../set');
moment.tz.setDefault('' + set.TIMEZONE);

ezra({
  'nomCom': "ping",
  'categorie': "General-viper"
}, async (_0x12a838, _0x2d8d4e, _0x1f0ba4) => {
  let {
    ms: _0x5d2f0c
  } = _0x1f0ba4;
  const {
    time: _0xb5466b,
    date: _0x4c687e
  } = {
    'time': moment().format("HH:mm:ss"),
    'date': moment().format("DD/MM/YYYY")
  };
  const _0x4950ba = Math.floor(Math.random() * 0x64) + 0x1;
  try {
    const audioUrl = "https://files.catbox.moe/lu3f94.mp3";
    let audioAvailable = false;
    try {
      const head = await axios.head(audioUrl, { timeout: 5000 });
      audioAvailable = head && head.status && head.status === 200;
    } catch (err) {
      audioAvailable = false;
    }

    if (audioAvailable) {
      await _0x2d8d4e.sendMessage(
        _0x12a838,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363421014261315@newsletter",
              newsletterName: "BLAZE TECH",
              serverMessageId: 0x8f
            },
            forwardingScore: 0x3e7,
            externalAdReply: {
              title: "viper xmd",
              body: `⚫ Pong: ${_0x4950ba}ms\n📅 Date: ${_0x4c687e}\n⏰ Time: ${_0xb5466b}`,
              thumbnailUrl: set.URL || "https://files.catbox.moe/xqhfyv.webp",
              mediaType: 1,
              renderSmallThumbnail: true
            }
          }
        },
        { quoted: _0x5d2f0c, ptt: true }
      );
    } else {
      await _0x2d8d4e.sendMessage(_0x12a838, {
        text: `⚫ Pong: ${_0x4950ba}ms\n📅 Date: ${_0x4c687e}\n⏰ Time: ${_0xb5466b}\n\n⚠️ Audio not available.`,
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363421014261315@newsletter",
            newsletterName: "BLAZE TECH",
            serverMessageId: 0x8f
          },
          forwardingScore: 0x3e7,
          externalAdReply: {
            title: "viper xmd",
            body: `Ping result`,
            thumbnailUrl: set.URL || "https://files.catbox.moe/xqhfyv.webp",
            mediaType: 1,
            renderSmallThumbnail: true
          }
        }
      }, { quoted: _0x5d2f0c });
    }
  } catch (_0x1149fe) {
    console.log("❌ Ping Command Error: " + _0x1149fe);
    if (typeof repondre === 'function') repondre("❌ Error: " + _0x1149fe);
  }
});

/*
ezra({
  nomCom: "repo",
  categorie: "General-viper",
  reaction: "🫧",
  nomFichier: __filename
}, async (dest, zk, commandeOptions) => {
  const { pushname, repondre } = commandeOptions;
  const githubRepo = 'https://api.github.com/repos/mr-X-force/LUCKY-MD-XFORCE';

  try {
    const response = await axios.get(githubRepo);
    const data = response.data;

    const created = moment(data.created_at).format("DD/MM/YYYY");
    const updated = moment(data.updated_at).format("DD/MM/YYYY");

    const gitdata = `> *ɴᴀᴍᴇ:*    ${conf.BOT}\n\n> *sᴛᴀʀs:*  ${data.stargazers_count}\n\n> *ғᴏʀᴋs:*  ${data.forks_count}\n\n> *ᴡᴀᴛᴄʜᴇʀs:*  ${data.watchers}\n\n> *ᴜᴘᴅᴀᴛᴇᴅ:*  ${updated}\n\n> *Repo:* ${data.html_url}\n\n_Powered by FrediEzra Tech Info_`;

    await zk.sendMessage(dest, {
      image: { url: 'https://files.catbox.moe/o4o7w2.png' },
      caption: gitdata,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363421014261315@newsletter',
          newsletterName: "BLAZE TECH",
          serverMessageId: -1
        },
        forwardingScore: 999,
        externalAdReply: {
          title: "VIPER MD",
          body: "🫧 repo link request 🫧",
          thumbnailUrl: "https://files.catbox.moe/o4o7w2.png",
          mediaType: 1,
          sourceUrl: data.html_url || "https://github.com/ARNOLDT20/Viper2",
        }
      }
    });

    await zk.sendMessage(dest, {
      audio: { url: "https://files.catbox.moe/lu3f94.mp3" },
      mimetype: "audio/mp4",
      ptt: true,
      caption: "*🫧 viper xmd repo song 🫧",
      contextInfo: {
        isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterJid: "120363421014261315@newsletter",
          newsletterName: "BLAZE TECH",
          serverMessageId: -1
        }
      }
    });

  } catch (e) {
    console.error("Error fetching data:", e);
    await repondre("❌ Error fetching repository data. Please try again later.");
  }
});
*/




