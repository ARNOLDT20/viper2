const { ezra } = require("../fredi/ezra");
const { downloadMediaMessage, downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { exec } = require('child_process');
const { writeFile } = require("fs/promises");
const fs = require('fs-extra');
const moment = require("moment-timezone");

ezra({
  nomCom: 'broadcast',
  aliase: 'spread',
  categorie: "viper-Group",
  reaction: '⚪'
}, async (bot, client, context) => {
  const { arg, repondre, superUser, nomAuteurMessage } = context;

  if (!arg[0]) {
    return repondre("After the command *broadcast*, type your message to be sent to all groups you are in.");
  }

  if (!superUser) {
    return repondre("You are too weak to do that");
  }

  const groups = await client.groupFetchAllParticipating();
  const groupIds = Object.values(groups).map(group => group.id);
  await repondre("*💦 viper md💨 is sending your message to all groups ,,,💦*...");

  const broadcastMessage = `*🌟 viper BROADCAST🌟*\n\n🀄 Message: ${arg.join(" ")}\n\n🗣️ Author: ${nomAuteurMessage}`;
  for (let groupId of groupIds) {
    await client.sendMessage(groupId, {
      image: { url: 'https://files.catbox.moe/o4o7w2.png' },
      caption: broadcastMessage
    });
  }
});

// Disappearing Messages Command (Common for all)
const handleDisapCommand = async (chatId, client, context, duration) => {
  const { repondre, verifGroupe, verifAdmin } = context;

  if (!verifGroupe) {
    return repondre("This command works in groups only");
  }

  if (!verifAdmin) {
    return repondre("You are not an admin here!");
  }

  await client.groupToggleEphemeral(chatId, duration);
  repondre(`Disappearing messages successfully turned on for ${duration / 86400} day(s)!`);
};

// Disappearing Messages Off Command
ezra({
  nomCom: "disap-off",
  categorie: "viper-Group",
  reaction: '💦'
}, async (chatId, client, context) => {
  const { repondre, verifGroupe, verifAdmin } = context;

  if (!verifGroupe) {
    return repondre("This command works in groups only");
  }

  if (!verifAdmin) {
    return repondre("You are not an admin here!");
  }

  await client.groupToggleEphemeral(chatId, 0);
  repondre("Disappearing messages successfully turned off!");
});

// Disappearing Messages Setup Command
ezra({
  nomCom: 'disap',
  categorie: "viper-Group",
  reaction: '💦'
}, async (chatId, client, context) => {
  const { repondre, verifGroupe, verifAdmin } = context;

  if (!verifGroupe) {
    return repondre("This command works in groups only");
  }

  if (!verifAdmin) {
    return repondre("You are not an admin here!");
  }

  repondre("*Do you want to turn on disappearing messages?*\n\nType one of the following:\n*disap1* for 1 day\n*disap7* for 7 days\n*disap90* for 90 days\nOr type *disap-off* to turn it off.");
});

// Disappearing Messages Commands (1, 7, 90 days)
ezra({ nomCom: "disap1", categorie: "viper-Group", reaction: '⚪' }, async (chatId, client, context) => {
  handleDisapCommand(chatId, client, context, 86400); // 1 day
});
ezra({ nomCom: "disap7", categorie: 'viper-Group', reaction: '⚪' }, async (chatId, client, context) => {
  handleDisapCommand(chatId, client, context, 604800); // 7 days
});
ezra({ nomCom: "disap90", categorie: 'viper-Group', reaction: '⚪' }, async (chatId, client, context) => {
  handleDisapCommand(chatId, client, context, 7776000); // 90 days
});

// Requests Command
ezra({
  nomCom: 'req',
  alias: 'requests',
  categorie: "viper-Group",
  reaction: "⚪"
}, async (chatId, client, context) => {
  const { repondre, verifGroupe, verifAdmin } = context;

  if (!verifGroupe) {
    return repondre("This command works in groups only");
  }

  if (!verifAdmin) {
    return repondre("You are not an admin here!");
  }

  const pendingRequests = await client.groupRequestParticipantsList(chatId);
  if (pendingRequests.length === 0) {
    return repondre("There are no pending join requests.");
  }

  let requestList = pendingRequests.map(request => `+${request.jid.split('@')[0]}`).join("\n");
  await client.sendMessage(chatId, {
    text: `Pending Participants:- 🕓\n${requestList}\n\nUse the command approve or reject to approve or reject these join requests.`
  });
  repondre(requestList);
});

// Approve/Reject Requests Command
const handleRequestCommand = async (chatId, client, context, action) => {
  const { repondre, verifGroupe, verifAdmin } = context;

  if (!verifGroupe) {
    return repondre("This command works in groups only");
  }

  if (!verifAdmin) {
    return repondre("You are not an admin here!");
  }

  const pendingRequests = await client.groupRequestParticipantsList(chatId);
  if (pendingRequests.length === 0) {
    return repondre(`There are no pending join requests for this group.`);
  }

  for (const request of pendingRequests) {
    await client.groupRequestParticipantsUpdate(chatId, [request.jid], action);
  }

  repondre(`All pending join requests have been ${action === "approve" ? "approved" : "rejected"}.`);
};

// Approve Requests Command
ezra({
  nomCom: "approve",
  categorie: "viper-Group",
  reaction: "⚪"
}, (chatId, client, context) => handleRequestCommand(chatId, client, context, "approve"));

// Reject Requests Command
ezra({
  nomCom: "reject",
  categorie: "viper-Group",
  reaction: "⚪"
}, (chatId, client, context) => handleRequestCommand(chatId, client, context, "reject"));

// ===============================
// GROUP STATUS COMMAND
// ===============================
ezra({
  nomCom: 'gstatus',
  aliase: ['groupstatus', 'gs'],
  categorie: "viper-Group",
  reaction: '📢'
}, async (chatId, client, context) => {

  const { repondre, superUser, verifGroupe, msgRepondu, arg } = context;

  if (!verifGroupe) {
    return repondre("This command works in groups only");
  }

  if (!superUser) {
    return repondre("You are too weak to use this command");
  }

  const caption = arg.join(" ");

  if (!msgRepondu && !caption) {
    return repondre("Reply to image/video/audio OR type text after command.");
  }

  try {

    const defaultCaption = `📢 Group Status Posted Successfully`;

    // =======================
    // IF REPLYING TO MEDIA
    // =======================
    if (msgRepondu) {

      const mime = msgRepondu.mimetype || msgRepondu.msg?.mimetype || "";

      const buffer = await downloadMediaMessage(
        msgRepondu,
        "buffer",
        {},
        {
          logger: client.logger,
          reuploadRequest: client.updateMediaMessage
        }
      );

      // IMAGE
      if (/image/.test(mime)) {
        await client.sendMessage(chatId, {
          groupStatusMessage: {
            image: buffer,
            caption: caption || defaultCaption
          }
        });
        return repondre("✅ Image group status posted.");
      }

      // VIDEO
      if (/video/.test(mime)) {
        await client.sendMessage(chatId, {
          groupStatusMessage: {
            video: buffer,
            caption: caption || defaultCaption
          }
        });
        return repondre("✅ Video group status posted.");
      }

      // AUDIO
      if (/audio/.test(mime)) {
        await client.sendMessage(chatId, {
          groupStatusMessage: {
            audio: buffer,
            mimetype: "audio/mp4"
          }
        });
        return repondre("✅ Audio group status posted.");
      }

      return repondre("Unsupported media type.");
    }

    // =======================
    // TEXT ONLY
    // =======================
    if (caption) {
      await client.sendMessage(chatId, {
        groupStatusMessage: {
          text: caption
        }
      });
      return repondre("✅ Text group status posted.");
    }

  } catch (error) {
    console.log(error);
    return repondre("Error while posting group status.");
  }

});
