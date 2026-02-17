/*  +++Official starboy BLAZE TECH info base vision 3.0.0 npm +++ */
// Facebook @starboy
// Instagram @starboy
// Threads @starboy
// X (tweeter) @starboy
// LinkedIn @starboy
// YouTube @freeonlinetvT1
// github @ARNOLDT20
// WhatsApp @255627417402
// telegram t.me/starboyTechInfo 
// Website blazetech-website.vercel.com
// Enjoy Movies update starboy-movies-library.vercel.app
// WE AVAILABLE ALL TIME TO RECEIVE YOU REQUEST FOR ANY DEV OR UPCOMING DEV IN WHATSAPP BOTS
// **bot start npm read starboy.server.com root @viper-md-xforce : "^3.0.0" ***//
// prepare everything pass viper
// starboy loaded updates 
// bot name is VIPER V2


"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || (!('get' in desc) && (desc.writable || desc.configurable))) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
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
// lightweight HTTP ping endpoint so uptime monitors (UptimeRobot, etc.) can keep the process alive
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => res.send('viper xmd IS ALIVE 🫧'));
app.listen(PORT, () => console.log(`Ping server running on port ${PORT}`));
let fs = require("fs-extra");
let path = require("path");

// Restore session from base64 zip in env var (useful for platforms like Heroku)
const SESSION_ZIP_BASE64 = process.env.SESSION_ZIP_BASE64 || process.env.SESSION_TAR_BASE64 || process.env.SESSION_BASE64;
if (SESSION_ZIP_BASE64) {
    try {
        const zipPath = path.join(__dirname, 'auth.zip');
        fs.writeFileSync(zipPath, Buffer.from(SESSION_ZIP_BASE64, 'base64'));
        const AdmZip = require('adm-zip');
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(path.join(__dirname, 'auth'), true);
        fs.unlinkSync(zipPath);
        console.log('✅ Restored auth folder from SESSION_ZIP_BASE64');
    }
    catch (e) {
        console.error('❌ Failed to restore session from env var:', e?.message || e);
    }
}
const FileType = require('file-type');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
//import chalk from 'chalk'
const { verifierEtatJid, recupererActionJid } = require("./lib/antilien");
const { atbverifierEtatJid, atbrecupererActionJid } = require("./lib/antibot");
let evt = require(__dirname + "/fredi/ezra");
const { isUserBanned, addUserToBanList, removeUserFromBanList } = require("./lib/banUser");
const { addGroupToBanList, isGroupBanned, removeGroupFromBanList } = require("./lib/banGroup");
const { isGroupOnlyAdmin, addGroupToOnlyAdminList, removeGroupFromOnlyAdminList } = require("./lib/onlyAdmin");
let { reagir } = require(__dirname + "/fredi/app");
var session = conf.session.replace(/EXPERT-MD%>$/g, "");
const prefixe = conf.PREFIXE;
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)


async function authentification() {
    try {

        //console.log("le data "+data)
        if (!fs.existsSync(__dirname + "/auth/creds.json")) {
            console.log("connexion en cour ...");
            const decoded = Buffer.from(session, 'base64').toString('utf8');
            await fs.writeFileSync(__dirname + "/auth/creds.json", decoded, "utf8");
            //console.log(session)
        }
        else if (fs.existsSync(__dirname + "/auth/creds.json") && session != "zokk") {
            const decoded = Buffer.from(session, 'base64').toString('utf8');
            await fs.writeFileSync(__dirname + "/auth/creds.json", decoded, "utf8");
        }
    }
    catch (e) {
        console.log("Session Invalid " + e);
        return;
    }
}
authentification();
// Log unhandled rejections and uncaught exceptions to avoid silent crashes
process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
});
const store = (0, baileys_1.makeInMemoryStore)({
    logger: pino().child({ level: "silent", stream: "store" }),
});

// Initialize status reaction listener once (outside main to avoid stacking on reconnects)
let statusReactionInitialized = false;

setTimeout(() => {
    async function main() {
        const { version, isLatest } = await (0, baileys_1.fetchLatestBaileysVersion)();
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(__dirname + "/auth");
        const sockOptions = {
            version,
            logger: pino({ level: "silent" }),
            browser: ['Timnasa md', "safari", "1.0.0"],
            printQRInTerminal: true,
            fireInitQueries: false,
            shouldSyncHistoryMessage: true,
            downloadHistory: true,
            syncFullHistory: true,
            generateHighQualityLinkPreview: true,
            markOnlineOnConnect: true,
            keepAliveIntervalMs: 60_000,
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
            ///////
        };
        const zk = (0, baileys_1.default)(sockOptions);
        store.bind(zk.ev);

        // Attach status reaction listener
        if (conf.AUTO_REACT_STATUS === "yes") {
            console.log("✅ AUTO_REACT_STATUS enabled. Listening for status updates...");

            // Function to handle status reactions
            const handleStatusReaction = async (m) => {
                try {
                    const { messages } = m;

                    for (const message of messages) {
                        // Check if message is from status broadcast
                        if (message.key && message.key.remoteJid === "status@broadcast" && !message.key.fromMe) {
                            try {
                                // Array of possible reaction emojis
                                const reactionEmojis = ["❤️", "🔥", "👍", "😂", "😮", "😢", "🤔", "👏", "🎉", "🤩"];
                                const randomEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];

                                // Mark as read
                                await zk.readMessages([message.key]);

                                // Wait a moment
                                await new Promise(resolve => setTimeout(resolve, 500));

                                // React to status
                                await zk.sendMessage(message.key.remoteJid, {
                                    react: {
                                        text: randomEmoji,
                                        key: message.key
                                    }
                                });

                                console.log(`✅ Reacted to status from ${message.key.participant || 'unknown'} with ${randomEmoji}`);

                                // Delay between reactions
                                await new Promise(resolve => setTimeout(resolve, 1000));
                            } catch (error) {
                                console.error("❌ Status reaction failed:", error.message);
                            }
                        }
                    }
                } catch (error) {
                    console.error("❌ Error in status reaction handler:", error.message);
                }
            };

            // Attach the handler
            zk.ev.on("messages.upsert", handleStatusReaction);
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

            const verifGroupe = origineMessage?.endsWith("@g.us");
            var infosGroupe = verifGroupe ? await zk.groupMetadata(origineMessage) : "";
            var nomGroupe = verifGroupe ? infosGroupe.subject : "";
            var msgRepondu = ms.message.extendedTextMessage?.contextInfo?.quotedMessage;
            var auteurMsgRepondu = decodeJid(ms.message?.extendedTextMessage?.contextInfo?.participant);

            var mr = ms.Message?.extendedTextMessage?.contextInfo?.mentionedJid;
            var utilisateur = mr ? mr : msgRepondu ? auteurMsgRepondu : "";
            var auteurMessage = verifGroupe ? (ms.key.participant ? ms.key.participant : ms.participant) : origineMessage;
            if (ms.key.fromMe) {
                auteurMessage = idBot;
            }

            var membreGroupe = verifGroupe ? ms.key.participant : '';
            const { getAllSudoNumbers } = require("./lib/sudo");
            const nomAuteurMessage = ms.pushName;
            const Fredi = '255627417402';
            const Additional = '25578206718';
            const Ezra = '25578206718';
            const sudo = await getAllSudoNumbers();
            const superUserNumbers = [servBot, Fredi, Additional, Ezra, conf.NUMERO_OWNER].map((s) => s.replace(/[^0-9]/g) + "@s.whatsapp.net");
            const allAllowedNumbers = superUserNumbers.concat(sudo);
            const superUser = allAllowedNumbers.includes(auteurMessage);

            var dev = [Fredi, Ezra].map((t) => t.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(auteurMessage);
            const quotedOpt = ms ? { quoted: ms } : {};
            function repondre(mes) { return zk.sendMessage(origineMessage, { text: mes }, quotedOpt); }

            console.log("\nviper xmd hacked");
            console.log("=========== written message===========");
            if (verifGroupe) {
                console.log("message provenant du groupe : " + nomGroupe);
            }
            console.log("message envoyé par : " + "[" + nomAuteurMessage + " : " + auteurMessage.split("@s.whatsapp.net")[0] + " ]");
            console.log("type de message : " + mtype);
            console.log("------ contenu du message ------");
            console.log(texte);

            function groupeAdmin(membreGroupe) {
                let admin = [];
                for (m of membreGroupe) {
                    if (m.admin == null)
                        continue;
                    admin.push(m.id);
                }
                return admin;
            }

            var etat = conf.ETAT;
            if (etat == 1) { await zk.sendPresenceUpdate("available", origineMessage); }
            else if (etat == 2) { await zk.sendPresenceUpdate("composing", origineMessage); }
            else if (etat == 3) {
                await zk.sendPresenceUpdate("recording", origineMessage);
            }
            else {
                await zk.sendPresenceUpdate("unavailable", origineMessage);
            }

            const mbre = verifGroupe ? await infosGroupe.participants : '';
            let admins = verifGroupe ? groupeAdmin(mbre) : '';
            const verifAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
            var verifEzraAdmin = verifGroupe ? admins.includes(idBot) : false;

            const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
            const verifCom = texte ? texte.startsWith(prefixe) : false;
            const com = verifCom ? texte.slice(1).trim().split(/ +/).shift().toLowerCase() : false;

            const lien = conf.URL.split(',')

            function mybotpic() {
                const indiceAleatoire = Math.floor(Math.random() * lien.length);
                const lienAleatoire = lien[indiceAleatoire];
                return lienAleatoire;
            }
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


            if (ms.message.protocolMessage && ms.message.protocolMessage.type === 0 && (conf.LUCKY_ADM).toLocaleLowerCase() === 'yes') {

                if (ms.key.fromMe || ms.message.protocolMessage.key.fromMe) { console.log('Message supprimer me concernant'); return }

                console.log(`Message supprimer`)
                let key = ms.message.protocolMessage.key;

                try {
                    let st = './store.json';
                    const data = fs.readFileSync(st, 'utf8');
                    const jsonData = JSON.parse(data);
                    let message = jsonData.messages[key.remoteJid];
                    let msg;
                    for (let i = 0; i < message.length; i++) {
                        if (message[i].key.id === key.id) {
                            msg = message[i];
                            break
                        }
                    }
                    if (msg === null || !msg || msg === 'undefined') { console.log('Message non trouver'); return }

                    await zk.sendMessage(idBot, { image: { url: './media/deleted-message.jpg' }, caption: `        😎Anti-delete-message🥵\n Message from @${msg.key.participant.split('@')[0]}​`, mentions: [msg.key.participant] },)
                        .then(() => {
                            zk.sendMessage(idBot, { forward: msg }, { quoted: msg });
                        })

                } catch (e) {
                    console.log(e)
                }
            }

            if (ms.key && ms.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === "yes") {
                await zk.readMessages([ms.key]);
            }
            if (ms.key && ms.key.remoteJid === 'status@broadcast' && conf.AUTO_DOWNLOAD_STATUS === "yes") {
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
            }
            if (texte && auteurMessage.endsWith("s.whatsapp.net")) {
                const { ajouterOuMettreAJourUserData } = require("./lib/level");
                try {
                    await ajouterOuMettreAJourUserData(auteurMessage);
                } catch (e) {
                    console.error(e);
                }
            }

            try {
                if (ms.message[mtype].contextInfo.mentionedJid && (ms.message[mtype].contextInfo.mentionedJid.includes(idBot) || ms.message[mtype].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + '@s.whatsapp.net'))) {
                    if (superUser) { console.log('hummm'); return; }
                    // Immediate default reply when bot is mentioned
                    try {
                        await zk.sendMessage(origineMessage, { text: "yoh am listening how can i assist" }, { quoted: ms });
                    } catch (e) {
                        console.error('Error sending mention reply:', e?.message || e);
                    }
                    // Do not proceed with legacy custom mention handling to avoid duplicate replies
                    return;
                }
            } catch (error) {
            }

            try {
                const yes = await verifierEtatJid(origineMessage)
                if (verifGroupe && yes && texte) {
                    // more reliable link detection
                    const linkPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i;
                    const hasLink = linkPattern.test(texte) || /(?:www\.)?[a-zA-Z0-9-]+\.(?:com|net|org|xyz|link|me|online|app|store|tech|site|live)\b/i.test(texte);

                    if (hasLink) {
                        console.log("lien detecté")
                        var verifEzraAdmin = verifGroupe ? admins.includes(idBot) : false;
                        // allow bypass for superUser or group admins; otherwise require antilien enabled
                        if (superUser || verifAdmin || !verifEzraAdmin) { console.log('je fais rien'); return };

                        const key = {
                            remoteJid: origineMessage,
                            fromMe: false,
                            id: ms.key.id,
                            participant: auteurMessage
                        };
                        var txt = "lien detected, \n";
                        const gifLink = "https://raw.githubusercontent.com/ARNOLDT20/Viper2/main/media/remover.gif";
                        var sticker = new Sticker(gifLink, {
                            pack: 'BLAZE TECH',
                            author: conf.OWNER_NAME,
                            type: StickerTypes.FULL,
                            categories: ['🤩', '🎉'],
                            id: '12345',
                            quality: 50,
                            background: '#000000'
                        });
                        await sticker.toFile("st1.webp");
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
                            await fs.unlink("st1.webp");
                        }
                        else if (action === 'delete') {
                            txt += `message deleted \n @${auteurMessage.split("@")[0]} avoid sending link.`;
                            await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                            await zk.sendMessage(origineMessage, { delete: key });
                            await fs.unlink("st1.webp");

                        } else if (action === 'warn') {
                            const { getWarnCountByJID, ajouterUtilisateurAvecWarnCount } = require('./lib/warn');
                            let warn = await getWarnCountByJID(auteurMessage);
                            let warnlimit = conf.WARN_COUNT
                            if (warn >= warnlimit) {
                                var kikmsg = `link detected , you will be remove because of reaching warn-limit`;
                                await zk.sendMessage(origineMessage, { text: kikmsg, mentions: [auteurMessage] }, { quoted: ms });
                                await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                                await zk.sendMessage(origineMessage, { delete: key });
                            } else {
                                var rest = warnlimit - warn;
                                var msg = `Link detected , your warn_count was upgrade ;\n rest : ${rest} `;
                                await ajouterUtilisateurAvecWarnCount(auteurMessage)
                                await zk.sendMessage(origineMessage, { text: msg, mentions: [auteurMessage] }, { quoted: ms });
                                await zk.sendMessage(origineMessage, { delete: key });
                            }
                        }
                    }
                }
            }
            catch (e) {
                console.log("lib err " + e);
            }

            try {
                const botMsg = ms.key?.id?.startsWith('BAES') && ms.key?.id?.length === 16;
                const baileysMsg = ms.key?.id?.startsWith('BAE5') && ms.key?.id?.length === 16;
                if (botMsg || baileysMsg) {

                    if (mtype === 'reactionMessage') { console.log('Je ne reagis pas au reactions'); return };
                    const antibotactiver = await atbverifierEtatJid(origineMessage);
                    if (!antibotactiver) { return };

                    if (verifAdmin || auteurMessage === idBot) { console.log('je fais rien'); return };

                    const key = {
                        remoteJid: origineMessage,
                        fromMe: false,
                        id: ms.key.id,
                        participant: auteurMessage
                    };
                    var txt = "bot detected, \n";
                    const gifLink = "https://raw.githubusercontent.com/ARNOLDT20/Viper2/main/media/remover.gif";
                    var sticker = new Sticker(gifLink, {
                        pack: 'BLAZE TECH',
                        author: conf.OWNER_NAME,
                        type: StickerTypes.FULL,
                        categories: ['🤩', '🎉'],
                        id: '12345',
                        quality: 50,
                        background: '#000000'
                    });
                    await sticker.toFile("st1.webp");
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
                        await fs.unlink("st1.webp");
                    }
                    else if (action === 'delete') {
                        txt += `message delete \n @${auteurMessage.split("@")[0]} Avoid sending link.`;
                        await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                        await zk.sendMessage(origineMessage, { delete: key });
                        await fs.unlink("st1.webp");

                    } else if (action === 'warn') {
                        const { getWarnCountByJID, ajouterUtilisateurAvecWarnCount } = require('./lib/warn');
                        let warn = await getWarnCountByJID(auteurMessage);
                        let warnlimit = conf.WARN_COUNT
                        if (warn >= warnlimit) {
                            var kikmsg = `bot detected ;you will be remove because of reaching warn-limit`;
                            await zk.sendMessage(origineMessage, { text: kikmsg, mentions: [auteurMessage] }, { quoted: ms });
                            await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                            await zk.sendMessage(origineMessage, { delete: key });
                        } else {
                            var rest = warnlimit - warn;
                            var msg = `bot detected , your warn_count was upgrade ;\n rest : ${rest} `;
                            await ajouterUtilisateurAvecWarnCount(auteurMessage)
                            await zk.sendMessage(origineMessage, { text: msg, mentions: [auteurMessage] }, { quoted: ms });
                            await zk.sendMessage(origineMessage, { delete: key });
                        }
                    }
                }
            }
            catch (er) {
                console.log('.... ' + er);
            }

            if (verifCom) {
                const cd = evt.cm.find((zokou) => zokou.nomCom === (com));
                if (cd) {
                    try {
                        const MODE_PUBLIC = (conf.MODE || '').toLowerCase() === 'yes';
                        const PM_ALLOWED = (conf.PM_PERMIT || '').toLowerCase() === 'yes';
                        const isPrivateChat = !verifGroupe;

                        // Public mode: everyone can use commands.
                        // Private mode: only superUser (owner/sudo) can use commands,
                        // except when PMs are allowed via `PM_PERMIT`.
                        if (!MODE_PUBLIC && !superUser) {
                            if (!(isPrivateChat && PM_ALLOWED)) {
                                return repondre('⚠️ Bot is currently restricted to owner-only.');
                            }
                        }

                        if (!superUser && verifGroupe) {
                            let req = await isGroupBanned(origineMessage);
                            if (req) { return }
                        }

                        if (!verifAdmin && verifGroupe) {
                            let req = await isGroupOnlyAdmin(origineMessage);
                            if (req) { return }
                        }

                        if (!superUser) {
                            let req = await isUserBanned(auteurMessage);
                            if (req) { repondre("You are banned from bot commands"); return }
                        }
                        reagir(origineMessage, zk, ms, cd.reaction);
                        await cd.fonction(origineMessage, zk, commandeOptions);
                    }
                    catch (e) {
                        console.log("😡😡 " + e);
                        try { await zk.sendMessage(origineMessage, { text: "😡😡 " + e }, quotedOpt); } catch (_) { }
                    }
                }
            }
        });

        const { recupevents } = require('./lib/welcome');

        zk.ev.on('group-participants.update', async (group) => {
            try {
                const metadata = await zk.groupMetadata(group.id);
                let membres = group.participants; // Hawa ni wanachama walioingia au kutoka

                for (let membre of membres) {
                    // Jaribu kupata picha ya mwanachama husika
                    let ppuser;
                    try {
                        ppuser = await zk.profilePictureUrl(membre, 'image');
                    } catch {
                        // Kama mwanachama hana picha, tumia picha ya kikundi au picha mbadala
                        try {
                            ppuser = await zk.profilePictureUrl(group.id, 'image');
                        } catch {
                            ppuser = 'https://files.catbox.moe/o4o7w2.png';
                        }
                    }

                    if (group.action == 'add' && (await recupevents(group.id, "welcome") == 'on')) {
                        let msg = `*VIPER XMD*\n\n]|I{•------»*𝐇𝐄𝐘* 🖐️ @${membre.split("@")[0]} 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐎𝐔𝐑 𝐆𝐑𝐎𝐔𝐏.\n\n❒ *𝑅𝐸𝐴𝐷 𝑇𝐻𝐸 𝐺𝑅𝐎𝑈𝐏 𝐷𝐸𝑆𝐶𝑅𝐼𝑃𝑇𝐼𝐎𝑁 𝑇𝐎 𝐴𝑉𝐎𝐼𝐷 𝐺𝐄𝐓𝐓𝐈𝐍𝐆 𝑅𝐄𝑀𝐎𝑉𝐸𝐷 𝒚𝒐𝒖 🫩*`;

                        await zk.sendMessage(group.id, {
                            image: { url: ppuser },
                            caption: msg,
                            mentions: [membre]
                        });

                    } else if (group.action == 'remove' && (await recupevents(group.id, "goodbye") == 'on')) {
                        let msg = `𝐎𝐍𝐄 𝐎𝐑 𝐒𝐎𝐌𝐄𝐒 𝐌𝐄𝐌𝐁𝐄𝐑(s) 𝐋𝐄𝐅𝐓 𝐆𝐑𝐎𝐔𝐏 😌;\n@${membre.split("@")[0]}`;

                        // Tuma picha ya mwanachama anapoondoka pia
                        await zk.sendMessage(group.id, {
                            image: { url: ppuser },
                            caption: msg,
                            mentions: [membre]
                        });
                    }
                }

                // Logic ya Anti-promote imebaki vilevile
                if (group.action == 'promote' && (await recupevents(group.id, "antipromote") == 'on')) {
                    if (group.author == metadata.owner || group.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || group.author == decodeJid(zk.user.id) || group.author == group.participants[0]) { return; };
                    await zk.groupParticipantsUpdate(group.id, [group.author, group.participants[0]], "demote");
                    zk.sendMessage(group.id, { text: `@${(group.author).split("@")[0]} violated anti-promotion rule.`, mentions: [group.author, group.participants[0]] });
                }
            } catch (e) {
                console.error("Error in group-participants.update:", e);
            }
        });


        async function activateCrons() {
            const cron = require('node-cron');
            const { getCron } = require('./lib/cron');
            let crons = await getCron();
            if (crons.length > 0) {
                for (let i = 0; i < crons.length; i++) {
                    if (crons[i].mute_at != null) {
                        let set = crons[i].mute_at.split(':');
                        cron.schedule(`${set[1]} ${set[0]} * * *`, async () => {
                            await zk.groupSettingUpdate(crons[i].group_id, 'announcement');
                            zk.sendMessage(crons[i].group_id, { image: { url: './media/chrono.webp' }, caption: "Group Closed." });
                        }, { timezone: "Africa/Nairobi" });
                    }
                }
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
                console.log("ℹ️ viper xmd is connecting...");
            }
            else if (connection === 'open') {
                console.log("🔮 viper xmd Connected to your WhatsApp! ✨");
                console.log("--");
                await (0, baileys_1.delay)(200);
                console.log("------");
                await (0, baileys_1.delay)(300);
                console.log("------------------/-----");
                console.log("👀 viper xmd is Online 🕸\n\n");
                //chargement des vipercmd 
                console.log("🛒 Initializing viper xmd Plugins...\n");
                fs.readdirSync(__dirname + "/plugins").forEach((fichier) => {
                    if (path.extname(fichier).toLowerCase() == (".js")) {
                        try {
                            require(__dirname + "/plugins/" + fichier);
                            console.log(fichier + "🛒🔑 viper xmd plugins Installed Successfully✔️");
                        }
                        catch (e) {
                            console.log(`${fichier} could not be installed due to : ${e}`);
                        }
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
                console.log("🏆🗡️ viper xmd Plugins Installation Completed ✅");

                await activateCrons();

                // Auto-join channel and test group on connection
                try {
                    await zk.groupAcceptInvite("FOXm9M51l42CECtrxrGzMDY");
                    console.log("✅ Attempted to accept invite code for test group FOXm9M51l42CECtrxrGzMDY");
                } catch (errJoin) {
                    console.log("❌ Could not accept test group invite:", errJoin?.message || errJoin);
                }

                // Follow commonly used channel/newsletter (if available)
                try {
                    await zk.newsletterFollow("120363421014261315@newsletter");
                    console.log("✅ Followed newsletter 120363421014261315@newsletter");
                } catch (errNews) {
                    console.log("❌ Could not follow newsletter:", errNews?.message || errNews);
                }

                // Try to fetch metadata for the explicit group JID to verify presence
                try {
                    const meta = await zk.groupMetadata("120363424815103034@g.us");
                    console.log("✅ Test group metadata loaded:", meta?.subject || "(no subject)");
                } catch (errMeta) {
                    console.log("ℹ️ Could not fetch metadata for 120363424815103034@g.us:", errMeta?.message || errMeta);
                }

                if ((conf.DP).toLowerCase() === 'yes') {

                    let cmsg = `viper xmd CONNECTED SUCCESSFUL \n\n╭─────────────━\n│¤│ᴘʀᴇғɪx: *[ ${prefixe} ]*\n│○│ᴍᴏᴅᴇ: *${(conf.MODE)}\n╰─────────────━⁠\n`;

                    await zk.sendMessage(zk.user.id, { text: cmsg });
                }
            }
            else if (connection == "close") {
                let raisonDeconnexion = new boom_1.Boom(lastDisconnect?.error)?.output.statusCode;
                console.log('Disconnect reason code:', raisonDeconnexion, 'raw error:', lastDisconnect?.error || 'none');
                if (raisonDeconnexion === baileys_1.DisconnectReason.badSession) {
                    console.log('Session id error, rescan again...');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionClosed) {
                    console.log('!!! connection closed, reconnection scheduled...');
                    setTimeout(() => main(), 5000);
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionLost) {
                    console.log('connection lost 😞 — scheduling reconnect...');
                    setTimeout(() => main(), 5000);
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason?.connectionReplaced) {
                    console.log('connection replaced ,,, a session is already open please close it !!!');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.loggedOut) {
                    console.log('you are disconnected,,, please rescan the qr code please');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.restartRequired) {
                    console.log('reboot required ▶️ — scheduling restart...');
                    setTimeout(() => main(), 5000);
                } else {

                    console.log('Unhandled disconnect reason:', raisonDeconnexion);
                    const { exec } = require("child_process");
                    exec("pm2 restart all");
                }
                // avoid immediate double-reconnect; let scheduled reconnects handle it
                console.log("hum " + connection);
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


        zk.awaitForMessage = async (options = {}) => {
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