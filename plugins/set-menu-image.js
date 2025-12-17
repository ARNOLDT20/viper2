const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const config = require('../config');

cmd({
  pattern: "botimage",
  alias: ["setmenuimage"],
  desc: "Set the bot menu image (reply to an image or provide image URL)",
  category: "owner",
  react: "🖼️",
  filename: __filename
}, async (conn, mek, m, { from, isOwner, quoted, args, reply }) => {
  try {
    if (!isOwner) return reply("❌ Owner only command");

    const storeDir = path.join(process.cwd(), 'store');
    if (!fs.existsSync(storeDir)) fs.mkdirSync(storeDir, { recursive: true });

    // If replied to an image, download and save locally
    if (quoted && quoted.message && quoted.message.imageMessage) {
      try {
        const mediaPath = await conn.downloadMediaMessage(quoted);
        // store as menu_image.jpg
        const dest = path.join(storeDir, 'menu_image.jpg');
        try { fs.copyFileSync(mediaPath, dest); } catch(e) { /* fallback */ }
        // update runtime config and persist
        config.MENU_IMAGE_URL = dest;
        fs.writeFileSync(path.join(storeDir, 'menu_image.json'), JSON.stringify({ url: dest }, null, 2));
        return reply('✅ Bot menu image set from replied photo.');
      } catch (err) {
        console.error('botimage download error', err);
        return reply('❌ Failed to download the image.');
      }
    }

    // If provided a URL as argument, use it
    if (args && args.length) {
      const url = args[0];
      if (!url.startsWith('http')) return reply('❌ Please provide a valid image URL.');
      // persist URL and update runtime config
      config.MENU_IMAGE_URL = url;
      fs.writeFileSync(path.join(storeDir, 'menu_image.json'), JSON.stringify({ url }, null, 2));
      return reply('✅ Bot menu image set to provided URL.');
    }

    return reply('❌ Reply to an image with this command or provide an image URL.');
  } catch (e) {
    console.error('set-menu-image error', e);
    reply('❌ Error setting menu image.');
  }
});
