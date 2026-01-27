const { ezra } = require("../fredi/ezra");
const axios = require("axios");

// Configuration object (assumed to be globally available or required if not)
const conf = global.conf || {};

// Helper function to generate context info for forwarded messages
function getContextInfo({
  title = "",
  userJid = "",
  thumbnailUrl = "",
} = {}) {
  try {
    return {
      mentionedJid: userJid ? [userJid] : [],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363313124070136@newsletter",
        newsletterName: "@FrediEzra",
        serverMessageId: Math.floor(100000 + Math.random() * 900000),
      },
      externalAdReply: {
        showAdAttribution: true,
        title: conf?.BOT || "💦LUCKY XFORCE💨 GPT",
        body: "🔵 Powering Smart Automation 🔵",
        thumbnailUrl: thumbnailUrl || conf?.URL || "",
        sourceUrl: conf?.GURL || "https://wa.me/255752593977",
      },
    };
  } catch (error) {
    console.error(`Error in getContextInfo: ${error.message}`);
    return {};
  }
}

// Helper function for replying with context info
function repondre(zk, dest, ms, message, contextInfo = {}) {
  return zk.sendMessage(dest, { text: message, contextInfo }, { quoted: ms });
}

// Delay and last text timestamp for rate-limiting
const messageDelay = 8000; // 8 seconds
let lastTextTime = 0;

ezra(
  {
    nomCom: "gpt",
    aliases: ["gpt4", "ai"],
    reaction: "🫰",
    categorie: "Fredi-Ai",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, auteurMessage } = commandeOptions;
    const query = arg.join(" ").trim();

    if (!query) {
      return repondre(
        zk,
        dest,
        ms,
        "Please provide a message.",
        getContextInfo({
          title: "💦LUCKY XFORCE💨 GPT",
          userJid: auteurMessage,
          thumbnailUrl: "https://files.catbox.moe/o4o7w2.png",
        })
      );
    }

    // Uncomment below to restrict chatbot usage via config
    // if (conf?.CHATBOT !== 'yes') {
    //   return repondre(
    //     zk, dest, ms,
    //     "Chatbot is disabled.",
    //     getContextInfo({
    //       title: "BELTAH-MD GPT4",
    //       userJid: auteurMessage,
    //       thumbnailUrl: "https://files.catbox.moe/o4o7w2.png",
    //     })
    //   );
    // }

    const currentTime = Date.now();
    if (currentTime - lastTextTime < messageDelay) {
      return repondre(
        zk,
        dest,
        ms,
        "Please wait a moment before sending another GPT request.",
        getContextInfo({
          title: "💦LUCKY XFORCE💨 GPT",
          userJid: auteurMessage,
          thumbnailUrl: "https://files.catbox.moe/o4o7w2.png",
        })
      );
    }

    try {
      const response = await axios.get(
        "https://apis-keith.vercel.app/ai/gpt",
        {
          params: { q: query },
          timeout: 10000,
        }
      );

      if (response.data?.status && response.data?.result) {
        const italicMessage = `_${response.data.result}_`;
        await zk.sendMessage(
          dest,
          {
            text: italicMessage,
            contextInfo: getContextInfo({
              title: "💦LUCKY XFORCE💨 GPT",
              userJid: auteurMessage,
              thumbnailUrl:
                "https://files.catbox.moe/o4o7w2.png",
            }),
          },
          { quoted: ms }
        );
        lastTextTime = currentTime;
      } else {
        repondre(
          zk,
          dest,
          ms,
          "Failed to get a valid response from the AI.",
          getContextInfo({
            title: "💦LUCKY XFORCE💨 GPT",
            userJid: auteurMessage,
            thumbnailUrl:
              "https://files.catbox.moe/o4o7w2.png",
          })
        );
      }
    } catch (error) {
      console.error("Error fetching GPT response:", error.message || error);
      repondre(
        zk,
        dest,
        ms,
        "Sorry, an error occurred while processing your request. Please try again later.",
        getContextInfo({
          title: "💦LUCKY XFORCE💨 GPT",
          userJid: auteurMessage,
          thumbnailUrl:
            "https://files.catbox.moe/o4o7w2.png",
        })
      );
    }
  }
);