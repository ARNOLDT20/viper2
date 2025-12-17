const { cmd } = require('../command');
const config = require('../config');

function boolText(v) {
  if (typeof v === 'boolean') return v ? 'Enabled' : 'Disabled';
  if (typeof v === 'string') return v.toLowerCase() === 'true' ? 'Enabled' : 'Disabled';
  return String(v);
}

cmd({
  pattern: 'getsettings',
  alias: ['settings','setlist'],
  desc: 'Show current bot settings (enabled/disabled)',
  category: 'owner',
  react: '⚙️',
  filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
  try {
    const lines = [];

    // Core boolean-like settings
    const settingsToShow = [
      'AUTO_STATUS_SEEN','AUTO_STATUS_REPLY','AUTO_BIO','AUTO_STATUS_REACT','AUTO_REACT',
      'CUSTOM_REACT','DELETE_LINKS','ANTI_LINK','ANTI_LINK_KICK','ANTI_BAD',
      'MENTION_REPLY','AUTO_VOICE','AUTO_STICKER','AUTO_RECORDING','AUTO_TYPING',
      'AUTO_REPLY','ALWAYS_ONLINE','PUBLIC_MODE','READ_CMD','ANTI_VV'
    ];

    for (const key of settingsToShow) {
      const val = config[key];
      lines.push(`• ${key}: ${boolText(val)}`);
    }

    // Include a few special values
    lines.push('');
    lines.push(`• PREFIX: ${config.PREFIX}`);
    lines.push(`• BOT_NAME: ${config.BOT_NAME}`);
    lines.push(`• OWNER_NAME: ${config.OWNER_NAME}`);
    lines.push(`• ANTI_DEL_PATH: ${config.ANTI_DEL_PATH || 'log'}`);

    const caption = '*Bot Settings Summary*\n\n' + lines.join('\n');

    await conn.sendMessage(from, {
      image: { url: config.ALIVE_IMG || config.MENU_IMAGE_URL },
      caption,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: config.NEWSLETTER_JID || '120363420222821450@newsletter',
          newsletterName: config.OWNER_NAME || 'Viper v2',
          serverMessageId: 143
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error('getsettings error:', e);
    reply('❌ Failed to fetch settings: ' + e.message);
  }
});
