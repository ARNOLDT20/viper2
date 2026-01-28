const { ezra } = require("../fredi/ezra");
const fs = require('fs');
const path = require('path');

// Configure your image/quote URLs here (one per entry)
const MOTIVATION_URLS = [
    'https://files.catbox.moe/repy1z.jpg',
    'https://files.catbox.moe/wy4fhk.jpg',
    'https://files.catbox.moe/oxdtyh.jpg',
    'https://files.catbox.moe/emx0fn.jpg',
    'https://files.catbox.moe/w8fref.jpg',
    'https://files.catbox.moe/jatws5.jpg',
    'https://files.catbox.moe/pbktux.jpg',
    'https://files.catbox.moe/acz0um.jpg',
    'https://files.catbox.moe/0j1p9k.jpg',
    'https://files.catbox.moe/4cfzs5.jpg',
    'https://files.catbox.moe/q6kng9.jpg',
    'https://files.catbox.moe/ra58d0.jpg',
    'https://files.catbox.moe/0dujn3.jpg',
    'https://files.catbox.moe/pnvc4o.jpg',
    'https://files.catbox.moe/h7wwig.jpg',
    'https://files.catbox.moe/5wjrcc.jpg',
    'https://files.catbox.moe/k71kf6.jpg',
    'https://files.catbox.moe/6oefhz.jpg',
    'https://files.catbox.moe/16946t.jpg',
    'https://files.catbox.moe/446sjd.jpg'
];

const INDEX_FILE = path.join(__dirname, '..', 'data', 'motivation_index.json');

function readIndex() {
    try {
        const raw = fs.readFileSync(INDEX_FILE, 'utf8');
        const j = JSON.parse(raw || '{}');
        return typeof j.i === 'number' ? j.i : 0;
    } catch (e) { return 0; }
}

function writeIndex(i) {
    try {
        const dir = path.dirname(INDEX_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(INDEX_FILE, JSON.stringify({ i: i }), 'utf8');
    } catch (e) { }
}

ezra({ nomCom: 'motivation', aliases: ['motivate', 'inspire', 'quote'], desc: 'Send a motivational image/quote', categorie: 'fun', reaction: '💡' },
    async (dest, zk, opts) => {
        const { repondre } = opts;
        try {
            if (!Array.isArray(MOTIVATION_URLS) || MOTIVATION_URLS.length === 0) {
                return repondre('No motivation URLs configured. Edit plugins/motivation.js to add your URLs.');
            }

            // Round-robin: read saved index, send that item, increment
            let idx = readIndex();
            if (idx >= MOTIVATION_URLS.length) idx = 0;
            const url = MOTIVATION_URLS[idx];

            // send image (if it's not an image URL, it will send as a link fallback)
            try {
                await zk.sendMessage(dest, { image: { url }, caption: '✨ Here is your motivation ✨' });
            } catch (e) {
                // fallback: send text with the url
                await repondre('Could not send image, here is the link: ' + url);
            }

            // advance and persist index
            idx = (idx + 1) % MOTIVATION_URLS.length;
            writeIndex(idx);
        } catch (err) {
            console.error('motivation command error:', err);
            await repondre('❌ Failed to send motivation: ' + (err && err.message ? err.message : String(err)));
        }
    }
);

module.exports = {};
