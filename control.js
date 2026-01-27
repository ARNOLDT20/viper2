// FredieTech tz 🇹🇿 team
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("LUCKY MD XFORCE💨 IS ALIVE 🫧");
  });
// Add port listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc); 
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1.default.child({});
logger.level = 'silent';
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
const axios = require("axios");
let fs = require("fs-extra");
let path = require("path");
const FileType = require('file-type');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
//import chalk from 'chalk'
const { verifierEtatJid , recupererActionJid } = require("./lib/antilien");
const antilinkPath = "./fredie/anti.json";
const warnPath = "./fredie/warns.json";
const { containsBadText } = require("./lib/antibad");
const { containsBug, isAntiBugOn } = require("./lib/antibug");
const { atbverifierEtatJid , atbrecupererActionJid } = require("./lib/antibot");
const { sendMessage, getContextInfo } = require('./fredi/context'); 
const stickerJsonPath = path.join(__dirname, "../fredie/autosticker.json");
const audioJsonPath = path.join(__dirname, "../fredie/autovoice.json");
let evt = require(__dirname + "/fredi/ezra");
const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("./lib/banUser");
const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("./lib/banGroup");
const {isGroupOnlyAdmin,addGroupToOnlyAdminList,removeGroupFromOnlyAdminList} = require("./lib/onlyAdmin");
//const //{loadCmd}=require("/fredi/mesfonctions")
let { reagir } = require(__dirname + "/fredi/app");
var session = conf.session.replace(/LUCKY-XFORCE••<=>/g,"");
const prefixe = conf.PREFIXE;
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const BaseUrl = process.env.GITHUB_GIT;
const Ezraapikey = process.env.BOT_OWNER;

async function authentification() {
    try {
        //console.log("le data "+data)
        if (!fs.existsSync(__dirname + "/scan/creds.json")) {
            console.log("connexion en cour ...");
            await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
            //console.log(session)
        }
        else if (fs.existsSync(__dirname + "/scan/creds.json") && session != "fred") {
            await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
        }
    }
    catch (e) {
        console.log("Session Invalid " + e);
        return;
    }
}
authentification();
const store = (0, baileys_1.makeInMemoryStore)({
    logger: pino().child({ level: "silent", stream: "store" }),
});
setTimeout(() => {
authentification();
    async function main() {
        const { version, isLatest } = await (0, baileys_1.fetchLatestBaileysVersion)();
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(__dirname + "/scan");
        const sockOptions = {
            version,
            logger: pino({ level: "silent" }),
            browser: ['Lucky-Md-Xforce', "safari", "1.0.0"],
            printQRInTerminal: true,
            fireInitQueries: false,
            shouldSyncHistoryMessage: true,
            downloadHistory: true,
            syncFullHistory: true,
            generateHighQualityLinkPreview: true,
            markOnlineOnConnect: false,
            keepAliveIntervalMs: 30_000,
            /* auth: state*/ auth: {
                creds: state.creds,
                /** caching makes the store faster to send/recv messages */
                keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger),
            },
            //////////
            getMessage: async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
                    return msg.message || undefined;
                }
                return {
                    conversation: 'An Error Occurred, Repeat Command!'
                };
            }
                };


   const zk = (0, baileys_1.default)(sockOptions);
   store.bind(zk.ev);


// Function to get the current date and time in Tanzania
function getCurrentDateTime() {
    const now = new Date();
    const options = {
        timeZone: 'Africa/Nairobi',
        weekday: 'long',    // e.g., Monday
        year: 'numeric',
        month: 'long',      // e.g., June
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    return new Intl.DateTimeFormat('en-KE', options).format(now);
}

// 🌟 Dynamic Motivational, Meme & Skill Phrases
const bioLines = [
    "🛠️ Learning never ends — debug life!",
    "🔥 Bot powered by memes & dreams 😎",
    "🎯 Skills don't sleep... neither do bots 🤖",
    "💡 Every day is a code update day!",
    "📅 Stay productive — even in downtime!",
    "😂 If bots had feelings... mine would be busy.",
    "🚀 Running like a boss at 1000 scripts/sec.",
    "🌍 Global bot vibes from TZ 🇹🇿",
    "📚 Guide, Help, Fun, Repeat.",
    "🤹 Life is a mix of memes & miracles.",
    "👀 Watching you like console logs 👨‍💻",
    "📌 Daily desk goals: Build, Break, Fix, Repeat.",
    "🎭 This bot has more personalities than your ex.",
    "👑 Bot: LUCKY-MD-XFORCE | AI: Fredi AI",
    "✨ Today is yours. Make it *legendary*.",
    "📊 Performance: 100% Efficiency (maybe 💀)",
    "⚙️ Built with ❤️ by FredieTech",
    "🎮 Skills unlocked: AI | Code | Meme | Hustle"
];

// 🔁 Rotate bios with different moods every 60s
let bioIndex = 0;

setInterval(async () => {
    if (conf.AUTO_BIO === "yes") {
        const currentDateTime = getCurrentDateTime();

        const dynamicLine = bioLines[bioIndex];
        const bioText = `🤖 Lucky Md Xforce is Active\n📅 ${currentDateTime}\n${dynamicLine}`;

        await zk.updateProfileStatus(bioText); // Update the bio
        console.log(`✅ Updated Bio:\n${bioText}`);

        bioIndex = (bioIndex + 1) % bioLines.length; // Loop through bios
    }
}, 60000); // Update every 60 seconds


// Function to handle deleted messages
// Other functions (auto-react, anti-delete, etc.) as needed
zk.ev.on("call", async (callData) => {
  if (conf.ANTI_CALL === 'yes') {
    const callId = callData[0].id;
    const callerId = callData[0].from;

    await zk.rejectCall(callId, callerId);

    if (!global.callResponses) global.callResponses = {};
    if (!global.callResponses[callerId]) global.callResponses[callerId] = { count: 0 };

    const callerData = global.callResponses[callerId];
    callerData.count++;

    // Define messages per call level
    const callMessages = {
      1: [
        `📞 Hello 👋! I'm ${conf.BOT}. Please avoid calling, my owner ${conf.OWNER_NAME} prefers messages. Thank you!\n\nPowered by ${conf.DEV}`,
        `🚫 Please don't call. ${conf.BOT} is a bot, not a voice assistant.\n\nPowered by ${conf.DEV}`,
        `Hi! 🙏 Kindly don’t call. My creator ${conf.OWNER_NAME} has disabled calling. Just message me.\n\n~ ${conf.BOT}`
      ],
      2: [
        `⚠️ You've called again. Calls are not allowed. Please text.\n\nPowered by ${conf.DEV}`,
        `Reminder: No calls allowed 🚫. Kindly send your message instead.`,
        `You're trying again? 😅 This bot does not accept calls. Just type your message.`
      ],
      3: [
        `📵 Third time calling! Respect the rules and drop a message please.`,
        `Hey friend, this is the 3rd call. Please avoid that 🙏.`,
        `Still calling? 😔 Please understand, texting is preferred.`
      ],
    };

    const level = callerData.count >= 3 ? 3 : callerData.count;
    const messages = callMessages[level];

    // Chagua randomly ujumbe mmojawapo wa kiwango hicho
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    try {
      await zk.sendMessage(callerId, { text: randomMessage });
    } catch (e) {
      console.error("Error sending anti-call message:", e);
    }
  }
});

        // Default auto-reply message
let auto_reply_message = `Hello👋, I'm ${conf.BOT} on board. My owner ${conf.OWNER_NAME} currently unavailable👁️. Please leave a message, and we will get back to you as soon as possible🤝. Thanks To ${conf.DEV}`;

// Track contacts that have already received the auto-reply
let repliedContacts = new Set();

zk.ev.on("messages.upsert", async (m) => {
    const { messages } = m;
    const ms = messages[0];
    if (!ms.message) return;

    const messageText = ms.message.conversation || ms.message.extendedTextMessage?.text;
    const remoteJid = ms.key.remoteJid;

    // Check if the message exists and is a command to set a new auto-reply message with any prefix
    if (messageText && messageText.match(/^[^\w\s]/) && ms.key.fromMe) {
        const prefix = messageText[0]; // Detect the prefix
        const command = messageText.slice(1).split(" ")[0]; // Command after prefix
        const newMessage = messageText.slice(prefix.length + command.length).trim(); // New message content

        // Update the auto-reply message if the command is 'setautoreply'
        if (command === "setautoreply" && newMessage) {
            auto_reply_message = newMessage;
            await zk.sendMessage(remoteJid, {
                text: `Auto-reply message has been updated to:\n"${auto_reply_message}"`,
            });
            return;
        }
    }

    // Check if auto-reply is enabled, contact hasn't received a reply, and it's a private chat
    if (conf.GREET === "yes" && !repliedContacts.has(remoteJid) && !ms.key.fromMe && !remoteJid.includes("@g.us")) {
        await zk.sendMessage(remoteJid, {
            text: auto_reply_message,
        });

        // Add contact to replied set to prevent repeat replies
        repliedContacts.add(remoteJid);
    }
});
      
// Function to handle anti-delete
// ✅ Log active status
if (conf.LUCKY_ADM === "yes") {
  console.log("🛡️ Lucky Md Xforce AntiDelete is ACTIVE!");
}

zk.ev.on("messages.upsert", async (m) => {
  if (conf.LUCKY_ADM !== "yes") return;

  const { messages } = m;
  const ms = messages[0];
  if (!ms.message) return;

  const messageKey = ms.key;
  const remoteJid = messageKey.remoteJid;

  // Ignore status updates
  if (remoteJid === "status@broadcast") return;

  // Initialize chat history
  if (!store.chats[remoteJid]) {
    store.chats[remoteJid] = [];
  }

  // Save message
  store.chats[remoteJid].push(ms);
  if (store.chats[remoteJid].length > 25) store.chats[remoteJid].shift(); // limit memory

  // ✅ Handle deleted message event
  if (ms.message?.protocolMessage?.type === 0) {
    const deletedKey = ms.message.protocolMessage.key;
    const chatMessages = store.chats[remoteJid];
    const deletedMessage = chatMessages.find(msg => msg.key.id === deletedKey.id);

    if (!deletedMessage) return;

    try {
      const deleterJid = ms.key.participant || ms.key.remoteJid;
      const originalSenderJid = deletedMessage.key.participant || deletedMessage.key.remoteJid;
      const isGroup = remoteJid.endsWith('@g.us');

      // 🧾 Group Metadata
      let groupInfo = '';
      if (isGroup) {
        try {
          const groupMetadata = await zk.groupMetadata(remoteJid);
          groupInfo = `\n• Group: ${groupMetadata.subject}`;
        } catch (e) {
          console.error('Error fetching group metadata:', e);
          groupInfo = '\n• Group information unavailable.';
        }
      }

      // 🪧 Notification Text
      const notification = `🫧 *Lucky Md Xforce antiDelete* 🫧\n` +
        `• Deleted by: @${deleterJid.split("@")[0]}\n` +
        `• Original sender: @${originalSenderJid.split("@")[0]}\n` +
        `${groupInfo}\n` +
        `• Chat type: ${isGroup ? 'Group' : 'Private'}`;

      const baseOpts = {
        mentions: [deleterJid, originalSenderJid]
      };

      // ✅ Forward different message types
      if (deletedMessage.message.conversation) {
        await sendMessage(zk, remoteJid, ms, {
          text: `${notification}\n\n📝 *Deleted Text:*\n${deletedMessage.message.conversation}`,
          ...baseOpts
        });
      } else if (deletedMessage.message.extendedTextMessage) {
        await sendMessage(zk, remoteJid, ms, {
          text: `${notification}\n\n📝 *Deleted Text:*\n${deletedMessage.message.extendedTextMessage.text}`,
          ...baseOpts
        });
      } else if (deletedMessage.message.imageMessage) {
        const caption = deletedMessage.message.imageMessage.caption || '';
        const imagePath = await zk.downloadAndSaveMediaMessage(deletedMessage.message.imageMessage);
        await sendMessage(zk, remoteJid, ms, {
          image: { url: imagePath },
          caption: `${notification}\n\n🖼️ *Image Caption:*\n${caption}`,
          ...baseOpts
        });
      } else if (deletedMessage.message.videoMessage) {
        const caption = deletedMessage.message.videoMessage.caption || '';
        const videoPath = await zk.downloadAndSaveMediaMessage(deletedMessage.message.videoMessage);
        await sendMessage(zk, remoteJid, ms, {
          video: { url: videoPath },
          caption: `${notification}\n\n🎥 *Video Caption:*\n${caption}`,
          ...baseOpts
        });
      } else if (deletedMessage.message.audioMessage) {
        const audioPath = await zk.downloadAndSaveMediaMessage(deletedMessage.message.audioMessage);
        await sendMessage(zk, remoteJid, ms, {
          audio: { url: audioPath },
          mimetype: 'audio/ogg',
          ptt: true,
          caption: `${notification}\n\n🎤 *Voice Message Deleted*`,
          ...baseOpts
        });
      } else if (deletedMessage.message.stickerMessage) {
        const stickerPath = await zk.downloadAndSaveMediaMessage(deletedMessage.message.stickerMessage);
        await sendMessage(zk, remoteJid, ms, {
          sticker: { url: stickerPath },
          caption: notification,
          ...baseOpts
        });
      } else {
        await sendMessage(zk, remoteJid, ms, {
          text: `${notification}\n\n⚠️ *An unsupported message type was deleted.*`,
          ...baseOpts
        });
      }

    } catch (err) {
      console.error("🔥 AntiDelete Error:", err);
    }
  }
});


// AUTO_REACT: React to messages with random emoji if enabled.
// Load emojis only once
let emojis = [];

const emojiFilePath = path.resolve(__dirname, 'fredie', 'autolike.json');

try {
  const data = fs.readFileSync(emojiFilePath, 'utf8');
  const parsed = JSON.parse(data);
  if (Array.isArray(parsed)) {
    emojis = parsed;
  } else {
    console.warn("autoreact.json is not a valid array.");
  }
} catch (error) {
  console.error("Failed to load emojis from autoreact.json:", error);
}

if (conf.AUTO_REACT === "yes" && emojis.length > 0) {
  zk.ev.on("messages.upsert", async (m) => {
    const { messages } = m;

    for (const msg of messages) {
      try {
        // Skip if from self or no content
        if (msg.key.fromMe || !msg.message) continue;

        // Select random emoji from the list
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Send reaction
        await zk.sendMessage(msg.key.remoteJid, {
          react: {
            text: randomEmoji,
            key: msg.key,
          },
        });

      } catch (err) {
        console.error("Failed to react to message:", err);
      }
    }
  });
} else if (conf.AUTO_REACT === "yes") {
  console.warn("AUTO_REACT is enabled but no emojis found in autoreact.json.");
}

    

// Track the last reaction time to prevent overflow
const statusReactionTracker = new Map(); // Tracks last reaction time per sender

// Load emoji list from fredie/emojis.json
let loveEmojis = [];
const emojiJsonPath = path.join(__dirname, "../fredie/emojis.json");

try {
  if (fs.existsSync(emojiJsonPath)) {
    const raw = fs.readFileSync(emojiJsonPath, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      loveEmojis = parsed;
      console.log("✅ Emojis loaded from emojis.json:", loveEmojis.length, "emojis");
    } else {
      console.warn("⚠️ emojis.json is not an array. Please format it as an array.");
    }
  } else {
    console.warn("⚠️ emojis.json not found at", emojiJsonPath);
  }
} catch (err) {
  console.error("❌ Failed to load emojis.json:", err.message);
}


// Helper delay function
const delay = (ms) => new Promise(res => setTimeout(res, ms));

let lastReactionTime = 0;
const loveEmojis = ["❤️", "💖", "💘", "💝", "💓", "💌", "💕", "😎", "🔥", "💥", "💯", "✨", "🌟", "🌈", "⚡", "💎", "🌀", "👑", "🎉", "🎊", "🦄", "👽", "🛸",
"🚀", "🦋", "💫", "🍀", "🎶", "🎧", "🎸", "🎤", "🏆", "🏅", "🌍", "🌎", "🌏", "🎮", "🎲", "💪",
"🏋️", "🥇", "👟", "🏃", "🚴", "🚶", "🏄", "⛷️", "🕶️", "🧳", "🍿", "🥂", "🍻", "🍷", "🍸",
"🥃", "🍾", "🎯", "⏳", "🎁", "🎈", "🎨", "🌻", "🌸", "🌺", "🌹", "🌼", "🌞", "🌝", "🌜", "🌙",
"🌚", "🌱", "🍃", "🍂", "🌾", "🐉", "🐍", "🦓", "🦄", "🦋", "🦧", "🦘", "🦨", "🦡", "🐅",
"🐆", "🐓", "🐢", "🐊", "🐠", "🐟", "🐡", "🦑", "🐙", "🦀", "🐬", "🦕", "🦖", "🐾", "🐕",
"🐈", "🐇"];

// Check config before enabling
if (conf.AUTO_REACT_STATUS === "yes") {
    console.log("✅ AUTO_REACT_STATUS enabled, listening for status updates...");

    zk.ev.on("messages.upsert", async ({ messages }) => {
        for (const msg of messages) {
            if (msg.key && msg.key.remoteJid === "status@broadcast") {
                const now = Date.now();
                if (now - lastReactionTime < 5000) {
                    console.log("⏳ Skipping reaction to prevent spam...");
                    continue;
                }

                const emoji = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];

                try {
                    await zk.sendMessage(msg.key.remoteJid, {
                        react: {
                            text: emoji,
                            key: msg.key
                        }
                    });

                    lastReactionTime = Date.now();
                    console.log(`💖 Reacted to status with ${emoji}`);

                    await delay(2000);
                } catch (err) {
                    console.error("❌ Failed to react to status:", err);
                }
            }
        }
    });
}




if (conf.ANTI_BAD === "yes") {
  zk.ev.on("messages.upsert", async (m) => {
    const { messages, type } = m;
    if (type !== "notify") return;

    for (const msg of messages) {
      try {
        // Skip if no message or sent by bot
        if (!msg.message || msg.key.fromMe) continue;

        const jid = msg.key.remoteJid;
        const isGroup = jid.endsWith("@g.us");
        const textMessage =
          msg.message.conversation ||
          msg.message.extendedTextMessage?.text ||
          msg.message.imageMessage?.caption ||
          msg.message.videoMessage?.caption ||
          "";

        if (containsBadText(textMessage)) {
          // Send warning before deletion
          await zk.sendMessage(jid, {
            text: `🚫 *Inappropriate language detected!*\nYour message has been removed.`,
          }, { quoted: msg });

          // Delete the offending message
          await zk.sendMessage(jid, {
            delete: {
              remoteJid: jid,
              fromMe: false,
              id: msg.key.id,
              participant: msg.key.participant || (isGroup ? msg.key.participant : jid),
            },
          });

          console.log(`⚠️ Deleted bad message from ${jid}`);
        }
      } catch (err) {
        console.error("❌ ANTI_BAD Error:", err);
      }
    }
  });
} else {
  console.log("ANTI_BAD is off. Enable it in conf settings to activate.");
}



// ANTI_BUG Feature
if (conf.ANTI_BUG === "yes") {
  zk.ev.on("messages.upsert", async (m) => {
    const { messages, type } = m;
    if (type !== "notify") return;

    for (const msg of messages) {
      try {
        if (!msg.message || msg.key.fromMe) continue;

        const jid = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid;
        const msgContent = JSON.stringify(msg.message);
        const textMsg = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

        if (isAntiBugOn(jid) && containsBug(msgContent)) {
          // Delete message
          await zk.sendMessage(jid, {
            delete: {
              remoteJid: msg.key.remoteJid,
              fromMe: false,
              id: msg.key.id,
              participant: msg.key.participant || msg.key.remoteJid,
            },
          });

          // Tell user why message was deleted
          await zk.sendMessage(jid, {
            text: `🚫 @${sender.split("@")[0]}, your message was deleted because it contained *bug/crash content* that can harm chats.`,
            mentions: [sender]
          });

          // Report to admin/group if configured
          if (conf.ANTI_BUG_REPORT_TO) {
            await zk.sendMessage(conf.ANTI_BUG_REPORT_TO, {
              text: `📢 *Anti-Bug Report*\n\n👤 User: @${sender.split("@")[0]}\n💬 Message: ${textMsg}\n⚡ Action: Deleted due to bug/crash content.`,
              mentions: [sender]
            });
          }

          console.log(`🚫 Deleted buggy message from ${sender} in chat ${jid}`);
        }

      } catch (err) {
        console.error("❌ Failed to process anti-bug message:", err);
      }
    }
  });
} else {
  console.warn("⚠️ ANTI_BUG is disabled in conf settings.");
}




// ANTI MENTION GROUP STATUS
// Mentions store helpers (your module)
let mentionStore = {};
try {
  mentionStore = require("../lib/mention"); // adjust path if needed
} catch (e) {
  console.warn("⚠️ mention helper not found, proceeding without it.");
}
const { addOrUpdateDataInMention, updateStatusForMention } = mentionStore;

// Files
const antiPath = "./fredie/anti.json";
const warnPath = "./fredie/warns.json";

// Ensure files exist
if (!fs.existsSync(antiPath)) fs.writeFileSync(antiPath, JSON.stringify({}, null, 2));
if (!fs.existsSync(warnPath)) fs.writeFileSync(warnPath, JSON.stringify({}, null, 2));

// Helpers
const loadJSON = (p, fb = {}) => {
  try { return JSON.parse(fs.readFileSync(p, "utf8")); }
  catch { fs.writeFileSync(p, JSON.stringify(fb, null, 2)); return fb; }
};
const saveJSON = (p, data) => fs.writeFileSync(p, JSON.stringify(data, null, 2));
const delay = (ms) => new Promise(r => setTimeout(r, ms));

const getText = (m) => (
  m.message?.conversation ||
  m.message?.extendedTextMessage?.text ||
  m.message?.imageMessage?.caption ||
  m.message?.videoMessage?.caption ||
  ""
);

const getMentions = (m) => {
  let result = [];
  if (!m?.message) return result;
  for (const k of Object.keys(m.message)) {
    const c = m.message[k];
    const ids = c?.contextInfo?.mentionedJid;
    if (Array.isArray(ids)) result = result.concat(ids);
    // also scan quoted message mentions
    const q = c?.contextInfo?.quotedMessage;
    if (q && typeof q === "object") {
      for (const qk of Object.keys(q)) {
        const qc = q[qk];
        const qids = qc?.contextInfo?.mentionedJid;
        if (Array.isArray(qids)) result = result.concat(qids);
      }
    }
  }
  return Array.from(new Set(result));
};

const isGroupJid = (jid) => typeof jid === "string" && jid.endsWith("@g.us");

// Try to detect admin quickly (optional)
const isAdminInGroup = async (zk, groupJid, userJid) => {
  try {
    const meta = await zk.groupMetadata(groupJid);
    const p = meta?.participants?.find(p => p.id === userJid);
    return !!(p && (p.admin || p.isAdmin));
  } catch {
    return false;
  }
};

zk.ev.on("messages.upsert", async ({ messages, type }) => {
  if (type && type !== "notify") return; // normalize
  const msg = messages?.[0];
  if (!msg || !msg.message || msg.key.fromMe) return;

  // Reload config + warns each message
  const confAll = loadJSON(antiPath, {});
  const warns = loadJSON(warnPath, {});
  const raw = confAll.ANTI_MENTION_GROUP;

  // Backward compatibility: string "on"/"off"
  const conf = (typeof raw === "string")
    ? { status: raw, action: "delete", threshold: 5, includeStatus: true, blockGroupMentions: true, maxUserMentions: 5, allowAdmins: true, reportTo: confAll.reportTo || "" }
    : (raw || { status: "off" });

  if (conf.status !== "on") return;

  const remote = msg.key.remoteJid;
  const isStatus = remote === "status@broadcast";
  if (isStatus && conf.includeStatus !== true) return;

  const sender = msg.key.participant || msg.key.remoteJid; // author
  const text = getText(msg);
  const mentions = getMentions(msg);
  if (!mentions.length) return;

  const mentionsGroups = mentions.filter(j => isGroupJid(j));
  const mentionsUsers  = mentions.filter(j => !isGroupJid(j));

  // Rule: group mentions blocked? or too many user mentions?
  const groupRule = conf.blockGroupMentions && mentionsGroups.length > 0;
  const userRule  = (conf.maxUserMentions > 0) && (mentionsUsers.length >= conf.maxUserMentions);
  const violated  = groupRule || userRule;

  if (!violated) return;

  // Optional: skip admins in group (for normal chats only)
  if (!isStatus && conf.allowAdmins && isGroupJid(remote)) {
    const admin = await isAdminInGroup(zk, remote, sender);
    if (admin) return; // don't act on admins if allowed
  }

  // Persist to mention.json (using your helper)
  const eventKey = msg.key.id || `${sender}_${Date.now()}`;
  try {
    if (addOrUpdateDataInMention) {
      await addOrUpdateDataInMention(
        eventKey,
        isStatus ? "status" : "chat",
        {
          chat: remote,
          sender,
          text,
          mentions,
          mentionsGroups,
          mentionsUsers,
          rule: { groupRule, userRule },
          actionPlanned: conf.action
        }
      );
    }
  } catch (e) { /* ignore */ }

  // Decide action
  const action = conf.action || "delete";
  const reportTo = conf.reportTo;

  // Helpers to report
  const report = async (note) => {
    if (!reportTo) return;
    try {
      await zk.sendMessage(reportTo, {
        text:
`📢 *Anti-Mention Report*
🗂️ Context: ${isStatus ? "STATUS" : (isGroupJid(remote) ? "GROUP" : "DM")}
👤 User: @${sender.split("@")[0]}
💬 Text: ${text || "(no text)"}
👥 Mentions: ${mentions.length} (${mentionsGroups.length} groups, ${mentionsUsers.length} users)
⚡ Action: ${note}`,
        mentions: [sender]
      });
    } catch (e) {}
  };

  // WARN helper
  const bumpWarn = () => {
    warns[sender] = (warns[sender] || 0) + 1;
    saveJSON(warnPath, warns);
    return warns[sender];
  };

  try {
    if (!isStatus) {
      // ========== Normal chat message ==========
      if (action === "delete") {
        await zk.sendMessage(remote, { delete: msg.key });
        await zk.sendMessage(remote, {
          text: `🚫 @${sender.split("@")[0]}, your message was deleted because ${groupRule ? "*mentioning groups is not allowed*" : `*excessive mentions (${mentionsUsers.length})*`}.`,
          mentions: [sender]
        });
        await report("deleted");
        if (updateStatusForMention) await updateStatusForMention(eventKey, "deleted");
      }

      if (action === "warn") {
        const count = bumpWarn();
        await zk.sendMessage(remote, {
          text: `⚠️ @${sender.split("@")[0]} warned for ${groupRule ? "mentioning a group" : `excessive mentions (${mentionsUsers.length})`}.\nWarns: ${count}/${conf.threshold || 5}`,
          mentions: [sender]
        });
        await report(`warned (${count}/${conf.threshold || 5})`);

        if (count >= (conf.threshold || 5)) {
          if (isGroupJid(remote)) {
            try {
              await zk.groupParticipantsUpdate(remote, [sender], "remove");
              await zk.sendMessage(remote, { text: `⛔ @${sender.split("@")[0]} removed after ${count} warns.`, mentions: [sender] });
              delete warns[sender];
              saveJSON(warnPath, warns);
              await report("removed after warns");
              if (updateStatusForMention) await updateStatusForMention(eventKey, "removed");
            } catch (e) {
              await report("warn threshold reached but remove failed (not admin?)");
              if (updateStatusForMention) await updateStatusForMention(eventKey, "warned-threshold");
            }
          }
        } else {
          if (updateStatusForMention) await updateStatusForMention(eventKey, "warned");
        }
      }

      if (action === "remove") {
        if (isGroupJid(remote)) {
          await zk.groupParticipantsUpdate(remote, [sender], "remove");
          await zk.sendMessage(remote, { text: `⛔ @${sender.split("@")[0]} removed for policy violation (mentions).`, mentions: [sender] });
          await report("removed");
          if (updateStatusForMention) await updateStatusForMention(eventKey, "removed");
        } else {
          // can't remove in DM; fallback to warn
          const count = bumpWarn();
          await zk.sendMessage(remote, {
            text: `⚠️ @${sender.split("@")[0]} warned (cannot remove in DM).\nWarns: ${count}/${conf.threshold || 5}`,
            mentions: [sender]
          });
          await report("warned (DM fallback)");
          if (updateStatusForMention) await updateStatusForMention(eventKey, "warned");
        }
      }
    } else {
      // ========== STATUS (status@broadcast) ==========
      // You cannot delete someone else's status. We do DM + warn + report.
      const count = (action === "warn" || action === "remove") ? bumpWarn() : bumpWarn(); // always warn on status
      try {
        await zk.sendMessage(sender, {
          text: `🚫 Hi @${sender.split("@")[0]}, your *status* mentions violate group policy: ${groupRule ? "mentioning groups is not allowed" : `too many user mentions (${mentionsUsers.length})`}.\nPlease avoid this. Warns: ${count}/${conf.threshold || 5}`
        }, { mentions: [sender] });
      } catch (e) {/* DM might be blocked */}
      await report(`status-violation → warned (${count}/${conf.threshold || 5})`);
      if (updateStatusForMention) await updateStatusForMention(eventKey, "status-warned");

      // Optional: if threshold reached, you could block contact (risky). Commented:
      // if (count >= (conf.threshold || 5)) {
      //   await zk.updateBlockStatus(sender, "block");
      //   await report("blocked after status warns");
      //   delete warns[sender]; saveJSON(warnPath, warns);
      //   if (updateStatusForMention) await updateStatusForMention(eventKey, "blocked");
      // }
    }
  } catch (err) {
    console.error("❌ Anti-Mention error:", err);
  }

  await delay(50);
});




 // anti link all
// Scanner: Anti-Link
// Hakikisha files zipo





// anti tag
const tagPath = "./fredie/anti.json";
let tagConfig = {};

if (fs.existsSync(tagPath)) {
  tagConfig = JSON.parse(fs.readFileSync(tagPath));
}

zk.ev.on("messages.upsert", async ({ messages }) => {
  const msg = messages[0];
  if (!msg || !msg.message || msg.key.fromMe || msg.key.remoteJid === "status@broadcast") return;

  // Check kama antitag iko ON
  if (tagConfig.ANTI_TAG !== "on") return;

  // Detect mentions
  const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
  const hasMention = mentions.length > 0;

  if (hasMention) {
    try {
      // Futa message
      await zk.sendMessage(msg.key.remoteJid, { delete: msg.key });
      console.log("🚫 Deleted message with tag/mention.");

      // Tuma report baada ya kufuta
      await zk.sendMessage(
        msg.key.remoteJid,
        { text: `⚠️ Your message was deleted because tagging/mentioning users is not allowed here.` },
        { quoted: msg }
      );

    } catch (err) {
      console.error("❌ Error deleting tagged message:", err);
    }
  }
});


 

// Function to create and send vCard for a new contact with incremented numbering
async function sendVCard(jid, baseName) {
    try {
        // Extract phone number from JID
        const phoneNumber = jid.split('@')[0];
        
        // Generate unique name with incremented number
        let counter = 1;
        let name = `${baseName} ${counter}`;

        // Check existing contacts to find the next available number
        while (Object.values(store.contacts).some(contact => contact.name === name)) {
            counter++;
            name = `${baseName} ${counter}`;
        }

        // Manually construct vCard content
        const vCardContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;type=CELL;type=VOICE;waid=${phoneNumber}:+${phoneNumber}\nEND:VCARD\n`;
        
        // Define the path and file name for the vCard file
        const vCardPath = `./${name}.vcf`;
        
        // Write the vCard content to a .vcf file
        fs.writeFileSync(vCardPath, vCardContent);

        // Send the vCard to yourself (the bot owner) for easy importing
        await zk.sendMessage(conf.NUMERO_OWNER + "@s.whatsapp.net", {
            document: { url: vCardPath },
            mimetype: 'text/vcard',
            fileName: `${name}.vcf`,
            caption: `Contact saved as ${name}. Please import this vCard to add the number to your contacts.\n\n LUCKY-MD-XFORCE`
        });

        console.log(`vCard created and sent for: ${name} (${jid})`);

        // Delete the vCard file after sending
        fs.unlinkSync(vCardPath);

        return name;  // Return the assigned name to use in the notification
    } catch (error) {
        console.error(`Error creating or sending vCard for ${name}:`, error.message);
    }
}
// New Contact Handler
zk.ev.on("messages.upsert", async (m) => {
    // Check if AUTO_SAVE_CONTACTS is enabled
    if (conf.AUTO_SAVE_CONTACTS !== "yes") return;

    const { messages } = m;
    const ms = messages[0];

    if (!ms.message) return;

    const origineMessage = ms.key.remoteJid;
    const baseName = "LUCKY-MD-XFORCE";

    // Check if the message is from an individual and if contact is not saved
    if (origineMessage.endsWith("@s.whatsapp.net") && (!store.contacts[origineMessage] || !store.contacts[origineMessage].name)) {
        // Generate and save contact with incremented name
        const assignedName = await sendVCard(origineMessage, baseName);

        // Update contact in store to avoid duplicate saving
        store.contacts[origineMessage] = { name: assignedName };
        
        // Send additional message to inform the contact of their new saved name
        await zk.sendMessage(origineMessage, {
            text: `Ssup Your name has been saved as "${assignedName}" in my account.\n\nLUCKY-MD-XFORCE`
        });

        console.log(`Contact ${assignedName} has been saved and notified.`);
    }

    // Further message handling for saved contacts can be added here...
});
        

// Load audio reply settings
let audioMap = {};
const audioJsonPath = path.join(__dirname, "../fredie/autovoice.json");

try {
  if (fs.existsSync(audioJsonPath)) {
    const raw = fs.readFileSync(audioJsonPath, "utf-8");
    audioMap = JSON.parse(raw);
    console.log("✅ Loaded audio reply map:", Object.keys(audioMap).length, "entries");
  } else {
    console.warn("⚠️ autovoice.json not found.");
  }
} catch (err) {
  console.error("❌ Failed to load autovoice.json:", err);
}

if (conf.AUDIO_REPLY === "yes") {
  zk.ev.on("messages.upsert", async (m) => {
    const { messages } = m;
    for (const msg of messages) {
      try {
        if (!msg.message || msg.key.fromMe) continue;

        const messageType = Object.keys(msg.message)[0];
        if (messageType !== "conversation" && messageType !== "extendedTextMessage") continue;

        const text =
          msg.message.conversation ||
          msg.message.extendedTextMessage?.text ||
          "";

        const cleaned = text.trim().toLowerCase();

        if (audioMap[cleaned]) {
          const audioSource = audioMap[cleaned];

          if (audioSource.startsWith("http")) {
            // Load from remote URL
            const response = await axios.get(audioSource, { responseType: "arraybuffer" });

            await zk.sendMessage(msg.key.remoteJid, {
              audio: Buffer.from(response.data),
              mimetype: "audio/mpeg",
              ptt: true
            }, { quoted: msg });

            console.log(`🔊 Sent audio reply for: "${cleaned}" (URL)`);
          } else {
            // Load from local path
            const audioPath = path.join(__dirname, "..", audioSource);

            if (fs.existsSync(audioPath)) {
              await zk.sendMessage(msg.key.remoteJid, {
                audio: fs.readFileSync(audioPath),
                mimetype: "audio/mpeg",
                ptt: true
              }, { quoted: msg });

              console.log(`🔊 Sent audio reply for: "${cleaned}" (LOCAL)`);
            } else {
              console.warn(`⚠️ Audio file not found at path: ${audioPath}`);
            }
          }
        }
      } catch (err) {
        console.error("❌ Error handling AUDIO_REPLY:", err);
      }
    }
  });
}



// Load sticker map
let stickerMap = {};
try {
  if (fs.existsSync(stickerJsonPath)) {
    const raw = fs.readFileSync(stickerJsonPath, "utf-8");
    stickerMap = JSON.parse(raw);
    console.log("✅ AUTO_STICKER map loaded:", Object.keys(stickerMap).length, "entries");
  } else {
    console.warn("⚠️ autosticker.json not found.");
  }
} catch (err) {
  console.error("❌ Failed to load autosticker.json:", err);
}

if (conf.AUTO_STICKER === "yes") {
  zk.ev.on("messages.upsert", async (m) => {
    const { messages } = m;

    for (const msg of messages) {
      try {
        if (!msg.message || msg.key.fromMe) continue;

        const messageType = Object.keys(msg.message)[0];
        if (messageType !== "conversation" && messageType !== "extendedTextMessage") continue;

        const text = (
          msg.message.conversation ||
          msg.message.extendedTextMessage?.text ||
          ""
        ).trim().toLowerCase();

        if (stickerMap[text]) {
          const stickerUrl = stickerMap[text];

          console.log(`⬇️ Downloading sticker for: "${text}"`);
          const response = await axios.get(stickerUrl, { responseType: "arraybuffer" });

          if (response.status === 200) {
            await zk.sendMessage(msg.key.remoteJid, {
              sticker: Buffer.from(response.data)
            }, { quoted: msg });

            console.log(`✅ Sent sticker for "${text}"`);
          } else {
            console.warn(`⚠️ Failed to download sticker from: ${stickerUrl}`);
          }
        }
      } catch (err) {
        console.error("❌ AUTO_STICKER error:", err);
      }
    }
  });
}




// Load auto replies from JSON
let autoReplies = {};
const replyJsonPath = path.join(__dirname, "../fredie/autoreply.json");

try {
  if (fs.existsSync(replyJsonPath)) {
    const raw = fs.readFileSync(replyJsonPath, "utf-8");

    try {
      autoReplies = JSON.parse(raw);
      console.log("✅ AUTO_REPLY map loaded:", Object.keys(autoReplies).length, "entries");
    } catch (parseErr) {
      console.error("❌ JSON parse error in autoreply.json:", parseErr.message);
      console.error("⚠️ Raw content:", raw);
    }

  } else {
    console.warn("⚠️ autoreply.json not found at", replyJsonPath);
  }
} catch (err) {
  console.error("❌ Failed to access autoreply.json:", err.message);
}

if (conf.AUTO_REPLY === "yes") {
  zk.ev.on("messages.upsert", async (m) => {
    const { messages } = m;

    for (const msg of messages) {
      try {
        if (!msg.message || msg.key.fromMe) continue;

        const messageType = Object.keys(msg.message)[0];
        if (!["conversation", "extendedTextMessage"].includes(messageType)) continue;

        const text = (
          msg.message.conversation ||
          msg.message.extendedTextMessage?.text ||
          ""
        ).trim().toLowerCase();

        if (!text) continue;

        if (autoReplies[text]) {
          const reply = autoReplies[text];

          await zk.sendMessage(msg.key.remoteJid, {
            text: reply
          }, { quoted: msg });

          console.log(`💬 AUTO_REPLY sent for "${text}": ${reply}`);
        } else {
          console.log(`🕵️ No AUTO_REPLY match for "${text}"`);
        }

      } catch (err) {
        console.error("❌ AUTO_REPLY error:", err);
      }
    }
  });
}




      
        zk.ev.on("messages.upsert", async (m) => {
            const { messages } = m;
            const ms = messages[0];
            if (!ms.message)
                return;
            const decodeJid = (jid) => {
                if (!jid)
                    return jid;
                if (/:\d+@/gi.test(jid)) {
                    let decode = (0, baileys_1.jidDecode)(jid) || {};
                    return decode.user && decode.server && decode.user + '@' + decode.server || jid;
                }
                else
                    return jid;
            };
            var mtype = (0, baileys_1.getContentType)(ms.message);
            var texte = mtype == "conversation" ? ms.message.conversation : mtype == "imageMessage" ? ms.message.imageMessage?.caption : mtype == "videoMessage" ? ms.message.videoMessage?.caption : mtype == "extendedTextMessage" ? ms.message?.extendedTextMessage?.text : mtype == "buttonsResponseMessage" ?
                ms?.message?.buttonsResponseMessage?.selectedButtonId : mtype == "listResponseMessage" ?
                ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId : mtype == "messageContextInfo" ?
                (ms?.message?.buttonsResponseMessage?.selectedButtonId || ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId || ms.text) : "";
            var origineMessage = ms.key.remoteJid;
            var idBot = decodeJid(zk.user.id);
            var servBot = idBot.split('@')[0];
            /* const fredi='255620814108';
             const ezra='255764182801';
             const fredietech='255752593977'*/
            /*  var superUser=[servBot,fredi,ezra,fredietech].map((s)=>s.replace(/[^0-9]/g)+"@s.whatsapp.net").includes(auteurMessage);
              var dev =[fredi,ezra,fredietech].map((t)=>t.replace(/[^0-9]/g)+"@s.whatsapp.net").includes(auteurMessage);*/
            const verifGroupe = origineMessage?.endsWith("@g.us");
            var infosGroupe = verifGroupe ? await zk.groupMetadata(origineMessage) : "";
            var nomGroupe = verifGroupe ? infosGroupe.subject : "";
            var msgRepondu = ms.message.extendedTextMessage?.contextInfo?.quotedMessage;
            var auteurMsgRepondu = decodeJid(ms.message?.extendedTextMessage?.contextInfo?.participant);
            //ms.message.extendedTextMessage?.contextInfo?.mentionedJid
            // ms.message.extendedTextMessage?.contextInfo?.quotedMessage.
            var mr = ms.Message?.extendedTextMessage?.contextInfo?.mentionedJid;
            var utilisateur = mr ? mr : msgRepondu ? auteurMsgRepondu : "";
            var auteurMessage = verifGroupe ? (ms.key.participant ? ms.key.participant : ms.participant) : origineMessage;
            if (ms.key.fromMe) {
                auteurMessage = idBot;
            }
            
            var membreGroupe = verifGroupe ? ms.key.participant : '';
            const { getAllSudoNumbers } = require("./lib/sudo");
            const nomAuteurMessage = ms.pushName;
            const fredietech = '255752593977';
            const fredi = '255620814108';
            const ezra = "255764182801";
            const sudo = await getAllSudoNumbers();
            const superUserNumbers = [servBot, fredietech, fredi, ezra, conf.NUMERO_OWNER].map((s) => s.replace(/[^0-9]/g) + "@s.whatsapp.net");
            const allAllowedNumbers = superUserNumbers.concat(sudo);
            const superUser = allAllowedNumbers.includes(auteurMessage);
            
            var dev = [fredietech, fredi,ezra].map((t) => t.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(auteurMessage);
            function repondre(mes) { zk.sendMessage(origineMessage, { text: mes }, { quoted: ms }); }
            console.log("\tLUCKY MESSAGES");
            console.log("=========== NEW CONVERSATION ===========");
            if (verifGroupe) {
                console.log("MESSAGE FROM GROUP : " + nomGroupe);
            }
            console.log("MESSAGE SENT BY : " + "[" + nomAuteurMessage + " : " + auteurMessage.split("@s.whatsapp.net")[0] + " ]");
            console.log("MESSAGE TYPE : " + mtype);
            console.log("==================TEXT==================");
            console.log(texte);
            /**  */
            function groupeAdmin(membreGroupe) {
                let admin = [];
                for (m of membreGroupe) {
                    if (m.admin == null)
                        continue;
                    admin.push(m.id);
                }
                // else{admin= false;}
                return admin;
            }



            var etat = conf.ETAT;
// Presence update logic based on etat value
if (etat == 1) {
    await zk.sendPresenceUpdate("available", origineMessage);
} else if (etat == 2) {
    await zk.sendPresenceUpdate("composing", origineMessage);
} else if (etat == 3) {
    await zk.sendPresenceUpdate("recording", origineMessage);
} else {
    await zk.sendPresenceUpdate("unavailable", origineMessage);
}

const mbre = verifGroupe ? await infosGroupe.participants : '';
let admins = verifGroupe ? groupeAdmin(mbre) : '';
const verifAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
var verifEzraAdmin = verifGroupe ? admins.includes(idBot) : false;

const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
const verifCom = texte ? texte.startsWith(prefixe) : false;
const com = verifCom ? texte.slice(1).trim().split(/ +/).shift().toLowerCase() : false;

const lien = conf.URL.split(',');

            
            // Utiliser une boucle for...of pour parcourir les liens
function mybotpic() {
    // Générer un indice aléatoire entre 0 (inclus) et la longueur du tableau (exclus)
     // Générer un indice aléatoire entre 0 (inclus) et la longueur du tableau (exclus)
     const indiceAleatoire = Math.floor(Math.random() * lien.length);
     // Récupérer le lien correspondant à l'indice aléatoire
     const lienAleatoire = lien[indiceAleatoire];
     return lienAleatoire;
  }

// Define command options object for reusability
var commandeOptions = {
    superUser, dev,
    verifGroupe,
    mbre,
    membreGroupe,
    verifAdmin,
    infosGroupe,
    nomGroupe,
    auteurMessage,
    nomAuteurMessage,
    idBot,
    verifEzraAdmin,
    prefixe,
    arg,
    repondre,
    mtype,
    groupeAdmin,
    msgRepondu,
    auteurMsgRepondu,
    ms,
    mybotpic
};
                 
   
// Auto read messages (Existing code, optional)
if (conf.AUTO_READ === 'yes') {
    zk.ev.on('messages.upsert', async (m) => {
        const { messages } = m;
        for (const message of messages) {
            if (!message.key.fromMe) {
                await zk.readMessages([message.key]);
                }
        }
    });
}
            

if (! superUser && origineMessage === auteurMessage && conf.AUTO_BLOCK === 'yes') {
        zk.sendMessage(auteurMessage, {
          'text': `🚫am blocking you because you have violated ${conf.OWNER_NAME} policies🚫!`
        });
        await zk.updateBlockStatus(auteurMessage, 'block');
      }
      

      if (texte && texte.startsWith('<')) {
  if (!superUser) {
    return repondre(`Only for my ${conf.DEV} or ${conf.OWNER_NAME} to use this command 🚫`);
  }
  
  try { 
    let evaled = await eval(texte.slice(1)); 
    if (typeof evaled !== 'string') {
      evaled = require('util').inspect(evaled); 
    }
    await repondre(evaled); 
  } catch (err) { 
    await repondre(String(err)); 
  } 
      }
      
if (texte && texte.startsWith('>')) {
  // If the sender is not the owner
  if (!superUser) {
    const menuText = `This command is only for the owner or FrediEzra to execute 🚫`;

    await zk.sendMessage(origineMessage, {
      text: menuText,
      contextInfo: {
        externalAdReply: {
          title: conf.BOT,
          body: conf.OWNER_NAME,
          sourceUrl: conf.GURL,
          thumbnailUrl: conf.URL,
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: false
        }
      }
    });
    return; 
  }

  try {
    let evaled = await eval(texte.slice(1));

    // If the evaluated result is not a string, convert it to a string
    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

    // Send back the result of the evaluation
    await repondre(evaled);
  } catch (err) {
    // If there's an error, send the error message
    await repondre(String(err));
  }
}

  ///+++++ chatbot handle +++++=//*/
 let lastTextTime = 0;
 const messageDelay = 10000;
      if (!superUser && origineMessage === auteurMessage && conf.CHAT_BOT === 'yes') {
      console.log('🤖 Chatbot is active');
  try {
    const currentTime = Date.now();
    if (currentTime - lastTextTime < messageDelay) return;

    const response = await axios.get('https://apis-keith.vercel.app/ai/gpt', {
      params: { q: texte },
      timeout: 10000
    });

    if (response.data?.status && response.data?.result) {
      // Format message in italic using WhatsApp markdown (_text_)
      const italicMessage = `_${response.data.result}_`;
      await zk.sendMessage(origineMessage, {
        text: italicMessage,
        mentions: [auteurMessage], // Mention the sender
      }, { quoted: ms }); // Reply to the sender's message

      lastTextTime = currentTime;
    }
  } catch (error) {
    console.error('Chatbot error:', error);
    // No error message sent to user
  }
      }
      
      
    // ++++----***voice chat ai- *****++++///



  /************************ anti-delete-message */

            /** ****** gestion auto-status  */
                  if (ms.key && ms.key.remoteJid === 'status@broadcast' && conf.AUTO_STATUS_REPLY === "yes") {
  const user = ms.key.participant;
  const text = `${conf.AUTO_STATUS_TEXT}`;
  
  await zk.sendMessage(user, { 
    text: text,
    react: { text: '🤦', key: ms.key }
  }, { quoted: ms });
                       }
                       
                       
            if (ms.key && ms.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === "yes") {
                await zk.readMessages([ms.key]);
            }
            if (ms.key && ms.key.remoteJid === 'status@broadcast' && conf.AUTO_DOWNLOAD_STATUS === "yes") {
                /* await zk.readMessages([ms.key]);*/
                if (ms.message.extendedTextMessage) {
                    var stTxt = ms.message.extendedTextMessage.text;
                    await zk.sendMessage(idBot, { text: stTxt }, { quoted: ms });
                }
                else if (ms.message.imageMessage) {
                    var stMsg = ms.message.imageMessage.caption;
                    var stImg = await zk.downloadAndSaveMediaMessage(ms.message.imageMessage);
                    await zk.sendMessage(idBot, { image: { url: stImg }, caption: stMsg }, { quoted: ms });
                }
                else if (ms.message.videoMessage) {
                    var stMsg = ms.message.videoMessage.caption;
                    var stVideo = await zk.downloadAndSaveMediaMessage(ms.message.videoMessage);
                    await zk.sendMessage(idBot, {
                        video: { url: stVideo }, caption: stMsg
                    }, { quoted: ms });
                }
                /** *************** */
                // console.log("*nouveau status* ");
            }
            /** ******fin auto-status */
             if (!dev && origineMessage == "120363158701337904@g.us") {
                return;
            }
            
 //---------------------------------------rang-count--------------------------------
             if (texte && auteurMessage.endsWith("s.whatsapp.net")) {
  const { ajouterOuMettreAJourUserData } = require("./lib/level"); 
  try {
    await ajouterOuMettreAJourUserData(auteurMessage);
  } catch (e) {
    console.error(e);
  }
              }
            
                /////////////////////////////   Mentions /////////////////////////////////////////
         
              try {
        
                if (ms.message[mtype].contextInfo.mentionedJid && (ms.message[mtype].contextInfo.mentionedJid.includes(idBot) ||  ms.message[mtype].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + '@s.whatsapp.net'))    /*texte.includes(idBot.split('@')[0]) || texte.includes(conf.NUMERO_OWNER)*/) {
            
                    if (origineMessage == "120363158701337904@g.us") {
                        return;
                    } ;
            
                    if(superUser) {console.log('hummm') ; return ;} 
                    
                    let mbd = require('./lib/mention') ;
            
                    let alldata = await mbd.recupererToutesLesValeurs() ;
            
                        let data = alldata[0] ;
            
                    if ( data.status === 'non') { console.log('mention pas actifs') ; return ;}
            
                    let msg ;
            
                    if (data.type.toLocaleLowerCase() === 'image') {
            
                        msg = {
                                image : { url : data.url},
                                caption : data.message
                        }
                    } else if (data.type.toLocaleLowerCase() === 'video' ) {
            
                            msg = {
                                    video : {   url : data.url},
                                    caption : data.message
                            }
            
                    } else if (data.type.toLocaleLowerCase() === 'sticker') {
            
                        let stickerMess = new Sticker(data.url, {
                            pack: conf.NOM_OWNER,
                            type: StickerTypes.FULL,
                            categories: ["🤩", "🎉"],
                            id: "12345",
                            quality: 70,
                            background: "transparent",
                          });
            
                          const stickerBuffer2 = await stickerMess.toBuffer();
            
                          msg = {
                                sticker : stickerBuffer2 
                          }
            
                    }  else if (data.type.toLocaleLowerCase() === 'audio' ) {
            
                            msg = {
            
                                audio : { url : data.url } ,
                                mimetype:'audio/mp4',
                                 }
                        
                    }
            
                    zk.sendMessage(origineMessage,msg,{quoted : ms})
            
                }
            } catch (error) {
                
            } 



     //anti-lien
     try {
        const yes = await verifierEtatJid(origineMessage)
        if (texte.includes('https://') && verifGroupe &&  yes  ) {

         console.log("lien detecté")
            var verifZokAdmin = verifGroupe ? admins.includes(idBot) : false;
            
             if(superUser || verifAdmin || !verifZokAdmin  ) { console.log('je fais rien'); return};
                        
                                    const key = {
                                        remoteJid: origineMessage,
                                        fromMe: false,
                                        id: ms.key.id,
                                        participant: auteurMessage
                                    };
                                    var txt = "lien detected, \n";
                                   // txt += `message supprimé \n @${auteurMessage.split("@")[0]} rétiré du groupe.`;
                                    const gifLink = "https://raw.githubusercontent.com/mr-X-force/LUCKY-MD-XFORCE/main/media/remover.gif";
                                    var sticker = new Sticker(gifLink, {
                                        pack: 'FrediEzra',
                                        author: conf.OWNER_NAME,
                                        type: StickerTypes.FULL,
                                        categories: ['🤩', '🎉'],
                                        id: '12345',
                                        quality: 50,
                                        background: '#000000'
                                    });
                                    await sticker.toFile("st1.webp");
                                    // var txt = `@${auteurMsgRepondu.split("@")[0]} a été rétiré du groupe..\n`
                                    var action = await recupererActionJid(origineMessage);

                                      if (action === 'remove') {

                                        txt += `message deleted \n @${auteurMessage.split("@")[0]} removed from group.`;

                                    await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") });
                                    (0, baileys_1.delay)(800);
                                    await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                                    try {
                                        await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                                    }
                                    catch (e) {
                                        console.log("antiien ") + e;
                                    }
                                    await zk.sendMessage(origineMessage, { delete: key });
                                    await fs.unlink("st1.webp"); } 
                                        
                                       else if (action === 'delete') {
                                        txt += `message deleted \n @${auteurMessage.split("@")[0]} avoid sending link.`;
                                        // await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") }, { quoted: ms });
                                       await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                                       await zk.sendMessage(origineMessage, { delete: key });
                                       await fs.unlink("st1.webp");

                                    } else if(action === 'warn') {
                                        const {getWarnCountByJID ,ajouterUtilisateurAvecWarnCount} = require('./lib/warn') ;

                            let warn = await getWarnCountByJID(auteurMessage) ; 
                            let warnlimit = conf.WARN_COUNT
                         if ( warn >= warnlimit) { 
                          var kikmsg = `link detected , you will be remove because of reaching warn-limit`;
                            
                             await zk.sendMessage(origineMessage, { text: kikmsg , mentions: [auteurMessage] }, { quoted: ms }) ;


                             await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                             await zk.sendMessage(origineMessage, { delete: key });


                            } else {
                                var rest = warnlimit - warn ;
                              var  msg = `Link detected , your warn_count was upgrade ;\n rest : ${rest} `;

                              await ajouterUtilisateurAvecWarnCount(auteurMessage)

                              await zk.sendMessage(origineMessage, { text: msg , mentions: [auteurMessage] }, { quoted: ms }) ;
                              await zk.sendMessage(origineMessage, { delete: key });

                            }
                                    }
                                }
                                
                            }
                        
                    
                
            
        
    
    catch (e) {
        console.log("lib err " + e);
    }
    


    /** *************************anti-bot******************************************** */
    try {
        const botMsg = ms.key?.id?.startsWith('BAES') && ms.key?.id?.length === 16;
        const baileysMsg = ms.key?.id?.startsWith('BAE5') && ms.key?.id?.length === 16;
        if (botMsg || baileysMsg) {

            if (mtype === 'reactionMessage') { console.log('Je ne reagis pas au reactions') ; return} ;
            const antibotactiver = await atbverifierEtatJid(origineMessage);
            if(!antibotactiver) {return};

            if( verifAdmin || auteurMessage === idBot  ) { console.log('je fais rien'); return};
                        
            const key = {
                remoteJid: origineMessage,
                fromMe: false,
                id: ms.key.id,
                participant: auteurMessage
            };
            var txt = "bot detected, \n";
           // txt += `message supprimé \n @${auteurMessage.split("@")[0]} rétiré du groupe.`;
            const gifLink = "https://raw.githubusercontent.com/mr-X-force/LUCKY-MD-XFORCE/main/media/remover.gif";
            var sticker = new Sticker(gifLink, {
                pack: 'FredieTech',
                author: conf.OWNER_NAME,
                type: StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                id: '12345',
                quality: 50,
                background: '#000000'
            });
            await sticker.toFile("st1.webp");
            // var txt = `@${auteurMsgRepondu.split("@")[0]} a été rétiré du groupe..\n`
            var action = await atbrecupererActionJid(origineMessage);

              if (action === 'remove') {

                txt += `message deleted \n @${auteurMessage.split("@")[0]} removed from group.`;

            await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") });
            (0, baileys_1.delay)(800);
            await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
            try {
                await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
            }
            catch (e) {
                console.log("antibot ") + e;
            }
            await zk.sendMessage(origineMessage, { delete: key });
            await fs.unlink("st1.webp"); } 
                
               else if (action === 'delete') {
                txt += `message delete \n @${auteurMessage.split("@")[0]} Avoid sending link.`;
                //await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") }, { quoted: ms });
               await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
               await zk.sendMessage(origineMessage, { delete: key });
               await fs.unlink("st1.webp");

            } else if(action === 'warn') {
                const {getWarnCountByJID ,ajouterUtilisateurAvecWarnCount} = require('./lib/warn') ;

    let warn = await getWarnCountByJID(auteurMessage) ; 
    let warnlimit = conf.WARN_COUNT
 if ( warn >= warnlimit) { 
  var kikmsg = `bot detected ;you will be remove because of reaching warn-limit`;
    
     await zk.sendMessage(origineMessage, { text: kikmsg , mentions: [auteurMessage] }, { quoted: ms }) ;


     await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
     await zk.sendMessage(origineMessage, { delete: key });


    } else {
        var rest = warnlimit - warn ;
      var  msg = `bot detected , your warn_count was upgrade ;\n rest : ${rest} `;

      await ajouterUtilisateurAvecWarnCount(auteurMessage)

      await zk.sendMessage(origineMessage, { text: msg , mentions: [auteurMessage] }, { quoted: ms }) ;
      await zk.sendMessage(origineMessage, { delete: key });

    }
                }
        }
    }
    catch (er) {
        console.log('.... ' + er);
    }        
             
         
            /////////////////////////
            
            //execution des luckycmd   
            if (verifCom) {
                //await await zk.readMessages(ms.key);
                const cd = evt.cm.find((ezra) => ezra.nomCom === (com));
                if (cd) {
                    try {

            if ((conf.MODE).toLocaleLowerCase() != 'yes' && !superUser) {
                return;
}

                         /******************* PM_PERMT***************/

            if (!superUser && origineMessage === auteurMessage&& conf.PM_PERMIT === "yes" ) {
                repondre("You don't have acces to commands here") ; return }
            ///////////////////////////////

             
            /*****************************banGroup  */
            if (!superUser && verifGroupe) {

                 let req = await isGroupBanned(origineMessage);
                    
                        if (req) { return }
            }

              /***************************  ONLY-ADMIN  */

            if(!verifAdmin && verifGroupe) {
                 let req = await isGroupOnlyAdmin(origineMessage);
                    
                        if (req) {  return }}

              /**********************banuser */
         
            
                if(!superUser) {
                    let req = await isUserBanned(auteurMessage);
                    
                        if (req) {repondre("You are banned from bot commands"); return}
                    

                } 

                        reagir(origineMessage, zk, ms, cd.reaction);
                        cd.fonction(origineMessage, zk, commandeOptions);
                    }
                    catch (e) {
                        console.log("😡😡 " + e);
                        zk.sendMessage(origineMessage, { text: "😡😡 " + e }, { quoted: ms });
                    }
                }
            }
            //fin exécution luckycmd
        });
        //fin événement message

/******** evenement groupe update ****************/
const { recupevents } = require('./lib/welcome'); 

zk.ev.on('group-participants.update', async (group) => {
    console.log(group);

    let ppgroup;
    try {
        ppgroup = await zk.profilePictureUrl(group.id, 'image');
    } catch {
        ppgroup = 'https://files.catbox.moe/3o37c5.jpeg';
    }

    try {
        const metadata = await zk.groupMetadata(group.id);

        if (group.action == 'add' && (await recupevents(group.id, "welcome") == 'on')) {
            let msg = `👋 Hello
`;

            let membres = group.participants;
            for (let membre of membres) {
                msg += ` *@${membre.split("@")[0]}* Welcome to Our Official Group,`;
            }

            msg += `You might want to read the group Description to avoid getting removed...`;

            zk.sendMessage(group.id, { image: { url: ppgroup }, caption: msg, mentions: membres });
        } else if (group.action == 'remove' && (await recupevents(group.id, "goodbye") == 'on')) {
            let msg = `one or somes member(s) left group;\n`;

            let membres = group.participants;
            for (let membre of membres) {
                msg += `@${membre.split("@")[0]}\n`;
            }

            zk.sendMessage(group.id, { text: msg, mentions: membres });

        } else if (group.action == 'promote' && (await recupevents(group.id, "antipromote") == 'on') ) {
            //  console.log(zk.user.id)
          if (group.author == metadata.owner || group.author  == conf.NUMERO_OWNER + '@s.whatsapp.net' || group.author == decodeJid(zk.user.id)  || group.author == group.participants[0]) { console.log('Cas de superUser je fais rien') ;return ;} ;


         await   zk.groupParticipantsUpdate(group.id ,[group.author,group.participants[0]],"demote") ;

         zk.sendMessage(
              group.id,
              {
                text : `@${(group.author).split("@")[0]} has violated the anti-promotion rule, therefore both ${group.author.split("@")[0]} and @${(group.participants[0]).split("@")[0]} have been removed from administrative rights.`,
                mentions : [group.author,group.participants[0]]
              }
         )

        } else if (group.action == 'demote' && (await recupevents(group.id, "antidemote") == 'on') ) {

            if (group.author == metadata.owner || group.author ==  conf.NUMERO_OWNER + '@s.whatsapp.net' || group.author == decodeJid(zk.user.id) || group.author == group.participants[0]) { console.log('Cas de superUser je fais rien') ;return ;} ;


           await  zk.groupParticipantsUpdate(group.id ,[group.author],"demote") ;
           await zk.groupParticipantsUpdate(group.id , [group.participants[0]] , "promote")

           zk.sendMessage(
                group.id,
                {
                  text : `@${(group.author).split("@")[0]} has violated the anti-demotion rule by removing @${(group.participants[0]).split("@")[0]}. Consequently, he has been stripped of administrative rights.` ,
                  mentions : [group.author,group.participants[0]]
                }
           )

     } 

    } catch (e) {
        console.error(e);
    }
});

/******** fin d'evenement groupe update *************************/


    

    /*****************************Cron setup */

        
    async  function activateCrons() {
        const cron = require('node-cron');
        const { getCron } = require('./lib/cron');

          let crons = await getCron();
          console.log(crons);
          if (crons.length > 0) {
        
            for (let i = 0; i < crons.length; i++) {
        
              if (crons[i].mute_at != null) {
                let set = crons[i].mute_at.split(':');

                console.log(`etablissement d'un automute pour ${crons[i].group_id} a ${set[0]} H ${set[1]}`)

                cron.schedule(`${set[1]} ${set[0]} * * *`, async () => {
                  await zk.groupSettingUpdate(crons[i].group_id, 'announcement');
                  zk.sendMessage(crons[i].group_id, { image : { url : './media/chrono.webp'} , caption: "Hello, it's time to close the group; sayonara." });

                }, {
                    timezone: "Africa/Nairobi"
                  });
              }
        
              if (crons[i].unmute_at != null) {
                let set = crons[i].unmute_at.split(':');

                console.log(`etablissement d'un autounmute pour ${set[0]} H ${set[1]} `)
        
                cron.schedule(`${set[1]} ${set[0]} * * *`, async () => {

                  await zk.groupSettingUpdate(crons[i].group_id, 'not_announcement');

                  zk.sendMessage(crons[i].group_id, { image : { url : './media/chrono.webp'} , caption: "Good morning; It's time to open the group." });

                 
                },{
                    timezone: "Africa/Nairobi"
                  });
              }
        
            }
          } else {
            console.log('Les crons n\'ont pas été activés');
          }

          return
        }

        
        //événement contact
          zk.ev.on("contacts.upsert", async (contacts) => {
            const insertContact = (newContact) => {
                for (const contact of newContact) {
                    if (store.contacts[contact.id]) {
                        Object.assign(store.contacts[contact.id], contact);
                    }
                    else {
                        store.contacts[contact.id] = contact;
                    }
                }
                return;
            };
            insertContact(contacts);
        });
        zk.ev.on("connection.update", async (con) => {
            const { lastDisconnect, connection } = con;
            if (connection === "connecting") {
                console.log("ℹ️ Lucky is connecting...");
            }
            else if (connection === 'open') {
               await zk.groupAcceptInvite("GmKhyg4DonRCMvFVkAHPSL");
              await zk.newsletterFollow("120363313124070136@newsletter");
              await zk.newsletterFollow("120363403178674033@newsletter");
               await zk.groupAcceptInvite("E2jarQUgOkf3uPPzsiWdND");
                console.log("🔮 Lucky Xforce Connected to your WhatsApp! 🫧");
                console.log("--");
                await (0, baileys_1.delay)(200);
                console.log("------");
                await (0, baileys_1.delay)(300);
                console.log("------------------/-----");
                console.log("👀 Lucky Xforce is Online 🕸\n\n");
                //chargement des luckycmd 
                console.log("🛒 Loading Lucky Xforce Plugins...\n");
                fs.readdirSync(__dirname + "/plugins").forEach((fichier) => {
                    if (path.extname(fichier).toLowerCase() == (".js")) {
                        try {
                            require(__dirname + "/plugins/" + fichier);
                            console.log(fichier + "🛒🔑 Lucky Xforce plugins Installed Successfully✔️");
                        }
                        catch (e) {
                            console.log(`${fichier} could not be installed due to : ${e}`);
                        } /* require(__dirname + "/command/" + fichier);
                         console.log(fichier + " Installed ✔️")*/
                        (0, baileys_1.delay)(300);
                    }
                });
                (0, baileys_1.delay)(700);
                var md;
                if ((conf.MODE).toLocaleLowerCase() === "yes") {
                    md = "public";
                }
                else if ((conf.MODE).toLocaleLowerCase() === "no") {
                    md = "private";
                }
                else {
                    md = "undefined";
                }
                console.log("🏆🗡️ Lucky Xforce Plugins Installation Completed ✅");

                await activateCrons();
                
                if((conf.DP).toLowerCase() === 'yes') {     

                let cmsg =`HELLO👋, BOT CONNECTED✅😇⁠⁠⁠⁠

╭════⊷
║ *『 ${conf.BOT} IS ONLINE』*
║    Creator: *${conf.OWNER_NAME}*
║    Prefix : [  ${prefixe} ]
║    Mode : ${md} mode
║    Total Commands : ${evt.cm.length}
╰──────────────────⊷

╭═══⊷
┃
┃ *Thank you for choosing*                      
┃  *${conf.BOT}*
> Regards ${conf.OWNER_NAME} 
╰──────────────────⊷ 
Follow Channel To Get Updates 
https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f
`;
                    
                await zk.sendMessage(zk.user.id, { text: cmsg });
                }
            }
            else if (connection == "close") {
                let raisonDeconnexion = new boom_1.Boom(lastDisconnect?.error)?.output.statusCode;
                if (raisonDeconnexion === baileys_1.DisconnectReason.badSession) {
                    console.log('Session id error, rescan again...');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionClosed) {
                    console.log('!!! connection closed, reconnection in progress...');
                    main();
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionLost) {
                    console.log('connection error 😞,,, trying to reconnect... ');
                    main();
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason?.connectionReplaced) {
                    console.log('connection replaced ,,, a session is already open please close it !!!');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.loggedOut) {
                    console.log('you are disconnected,,, please rescan the qr code please');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.restartRequired) {
                    console.log('reboot in progress ▶️');
                    main();
                }   else {

                    console.log('redemarrage sur le coup de l\'erreur  ',raisonDeconnexion) ;         
                    //repondre("* Redémarrage du bot en cour ...*");

                                const {exec}=require("child_process") ;

                                exec("pm2 restart all");            
                }
                // sleep(50000)
                console.log("hum " + connection);
                main(); //console.log(session)
            }
        });
        //fin événement connexion
        //événement authentification 
        zk.ev.on("creds.update", saveCreds);
        //fin événement authentification 
        //
        /** ************* */
        //fonctions utiles
        zk.downloadAndSaveMediaMessage = async (message, filename = '', attachExtension = true) => {
            let quoted = message.msg ? message.msg : message;
            let mime = (message.msg || message).mimetype || '';
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
            const stream = await (0, baileys_1.downloadContentFromMessage)(quoted, messageType);
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            let type = await FileType.fromBuffer(buffer);
            let trueFileName = './' + filename + '.' + type.ext;
            // save to file
            await fs.writeFileSync(trueFileName, buffer);
            return trueFileName;
        };


        zk.awaitForMessage = async (options = {}) =>{
            return new Promise((resolve, reject) => {
                if (typeof options !== 'object') reject(new Error('Options must be an object'));
                if (typeof options.sender !== 'string') reject(new Error('Sender must be a string'));
                if (typeof options.chatJid !== 'string') reject(new Error('ChatJid must be a string'));
                if (options.timeout && typeof options.timeout !== 'number') reject(new Error('Timeout must be a number'));
                if (options.filter && typeof options.filter !== 'function') reject(new Error('Filter must be a function'));
        
                const timeout = options?.timeout || undefined;
                const filter = options?.filter || (() => true);
                let interval = undefined
        
                /**
                 * 
                 * @param {{messages: Baileys.proto.IWebMessageInfo[], type: Baileys.MessageUpsertType}} data 
                 */
                let listener = (data) => {
                    let { type, messages } = data;
                    if (type == "notify") {
                        for (let message of messages) {
                            const fromMe = message.key.fromMe;
                            const chatId = message.key.remoteJid;
                            const isGroup = chatId.endsWith('@g.us');
                            const isStatus = chatId == 'status@broadcast';
        
                            const sender = fromMe ? zk.user.id.replace(/:.*@/g, '@') : (isGroup || isStatus) ? message.key.participant.replace(/:.*@/g, '@') : chatId;
                            if (sender == options.sender && chatId == options.chatJid && filter(message)) {
                                zk.ev.off('messages.upsert', listener);
                                clearTimeout(interval);
                                resolve(message);
                            }
                        }
                    }
                }
                zk.ev.on('messages.upsert', listener);
                if (timeout) {
                    interval = setTimeout(() => {
                        zk.ev.off('messages.upsert', listener);
                        reject(new Error('Timeout'));
                    }, timeout);
                }
            });
        }



        // fin fonctions utiles
        /** ************* */
        return zk;
    }
    let fichier = require.resolve(__filename);
    fs.watchFile(fichier, () => {
        fs.unwatchFile(fichier);
        console.log(`mise à jour ${__filename}`);
        delete require.cache[fichier];
        require(fichier);
    });
    main();
}, 5000);
