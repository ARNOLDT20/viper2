const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const config = require('../config');

cmd({
  on: 'body',
  dontAddCommandList: true,
  filename: __filename
}, async (conn, mek, m, {
  from,
  isGroup,
  sender,
  reply
}) => {
  try {
    if (!config.AUTO_FOLLOW_CHANNEL || config.AUTO_FOLLOW_CHANNEL !== 'true') return;
    if (isGroup) return; // only for private chats

    const userJid = (sender || m?.sender);
    if (!userJid) return;

    const storeDir = path.join(process.cwd(), 'store');
    const storeFile = path.join(storeDir, 'auto_follow.json');

    let list = [];
    if (fs.existsSync(storeFile)) {
      try { list = JSON.parse(fs.readFileSync(storeFile, 'utf8') || '[]'); } catch (e) { list = []; }
    }

    if (list.includes(userJid)) return; // already sent

    const newsletter = config.NEWSLETTER_JID || '120363420222821450@newsletter';
    const channelUrl = `https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d`;
    const img = config.MENU_IMAGE_URL || config.ALIVE_IMG || 'https://files.catbox.moe/nofkxe.png';

    const caption = `Hello 👋\n\nFor updates and announcements, please follow our channel:\n${channelUrl}\n\nTap the follow button to receive updates.`;

    await conn.sendMessage(from, {
      image: { url: img },
      caption,
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: newsletter,
          newsletterName: config.BOT_NAME || 'Viper v2',
        }
      }
    }, { quoted: mek }).catch(() => null);

    // persist that we've prompted this user
    try {
      if (!fs.existsSync(storeDir)) fs.mkdirSync(storeDir, { recursive: true });
      list.push(userJid);
      fs.writeFileSync(storeFile, JSON.stringify(list, null, 2));
    } catch (e) {
      console.error('auto-follow: failed to persist state', e);
    }

  } catch (err) {
    console.error('auto-follow error', err);
  }
});
