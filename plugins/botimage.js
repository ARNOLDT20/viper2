"use strict";

const { ezra } = require("../fredi/ezra");
const { Catbox } = require('node-catbox');
const fs = require('fs-extra');
const path = require('path');
const set = require('../set');

ezra({ nomCom: "botimage", categorie: "Main", reaction: "🖼️", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
  try {
    const { msgRepondu, arg, repondre, ms } = commandeOptions;
    const dataPath = path.join(__dirname, '..', 'data', 'menu.json');

    let imageUrl = null;

    // If replied to an image/sticker/video, download and upload it
    if (msgRepondu && (msgRepondu.imageMessage || msgRepondu.videoMessage || msgRepondu.stickerMessage)) {
      try {
        const mediaMsg = msgRepondu.imageMessage || msgRepondu.videoMessage || msgRepondu.stickerMessage;
        const mediaPath = await zk.downloadAndSaveMediaMessage(mediaMsg);

        const catbox = new Catbox();
        const uploaded = await catbox.uploadFile({ path: mediaPath });
        if (fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);

        imageUrl = uploaded;
      } catch (err) {
        console.error('botimage upload error:', err);
        return repondre('❌ Failed to upload the replied media.');
      }

    // Or accept a direct URL argument (optionally a second URL for thumbnail)
    } else if (arg && arg[0] && (arg[0].startsWith('http://') || arg[0].startsWith('https://'))) {
      imageUrl = arg[0];
      // optional thumb provided as second argument
      var thumbUrl = null;
      if (arg[1] && (arg[1].startsWith('http://') || arg[1].startsWith('https://'))) thumbUrl = arg[1];
    } else {
      return repondre(`Please reply to an image (or sticker) or provide an image URL.\nUsage: ${set.PREFIXE}botimage <image_url>`);
    }

    // Save the URL(s) to data/menu.json
    try {
      fs.ensureDirSync(path.dirname(dataPath));
      // load existing to preserve thumb if not provided
      let cur = {};
      try { cur = fs.readJsonSync(dataPath); } catch (e) { cur = {}; }
      const toSave = Object.assign({}, cur, { menuImage: imageUrl });
      if (typeof thumbUrl !== 'undefined' && thumbUrl) toSave.menuThumb = thumbUrl;
      if (!toSave.menuThumb) toSave.menuThumb = toSave.menuImage;
      fs.writeFileSync(dataPath, JSON.stringify(toSave, null, 2));
      await repondre('✅ Menu image updated successfully.');
      // Optionally send a preview
      await zk.sendMessage(dest, { image: { url: imageUrl }, caption: 'Menu image set' }, { quoted: ms });
    } catch (err) {
      console.error('botimage save error:', err);
      return repondre('❌ Failed to save the menu image.');
    }

  } catch (err) {
    console.error('botimage handler error:', err);
  }
});
