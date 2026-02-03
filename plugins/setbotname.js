const { ezra } = require(__dirname + "/../fredi/ezra");
const fs = require('fs');
const path = require('path');
const confPath = path.join(__dirname, '..', 'set.js');
const conf = require(confPath);

ezra({
    nomCom: 'setbot',
    aliases: ['setbotname', 'setbotinfo'],
    categorie: 'viper-Admin',
    reaction: '✏️',
    description: 'Set bot display name and owner number (owner only)'
}, async (dest, zk, commandeOptions) => {
    const { arg, superUser, repondre, ms } = commandeOptions;

    if (!superUser) {
        return repondre('This command is restricted to the bot owner.');
    }

    if (!arg || !arg[0]) {
        return repondre('Usage: setbot <Bot Name>|<ownerNumber>\nExample: setbot MyBot|255123456789');
    }

    const raw = arg.join(' ');
    // Accept name and number separated by pipe `|` or newline
    const parts = raw.split('|').map(p => p.trim());
    const newName = parts[0] || conf.BOT;
    const newNumberRaw = parts[1] ? parts[1].replace(/[^0-9+]/g, '') : conf.NUMERO_OWNER;

    try {
        // Read set.js content and replace BOT and NUMERO_OWNER values
        let content = fs.readFileSync(confPath, 'utf8');

        // Simple replacements: look for BOT: '...' or BOT: "..."
        content = content.replace(/(BOT\s*:\s*)(['"]).*?\2/, `$1'${newName.replace(/'/g, "\\'")}'`);
        content = content.replace(/(NUMERO_OWNER\s*:\s*)(['"]).*?\2/, `$1'${newNumberRaw.replace(/'/g, "\\'")}'`);

        // Backup before writing
        try { fs.copyFileSync(confPath, confPath + '.bak'); } catch (e) { }

        fs.writeFileSync(confPath, content, 'utf8');

        // Hot-reload set.js so running bot picks up changes without restart
        try {
            const resolved = require.resolve(confPath);
            const oldExports = require(resolved);
            // remove from cache and require fresh
            delete require.cache[resolved];
            const fresh = require(resolved);
            // copy fresh properties onto old exports object so existing references update
            Object.keys(fresh).forEach((k) => {
                try { oldExports[k] = fresh[k]; } catch (e) { oldExports[k] = fresh[k]; }
            });
        } catch (reloadErr) {
            console.error('Could not hot-reload set.js:', reloadErr);
        }

        // Confirm to user
        await zk.sendMessage(dest, { text: `✅ Bot name updated to: *${newName}*\n✅ Owner number updated to: *${newNumberRaw}*\n\nChanges applied without restart.` }, { quoted: ms });
    } catch (e) {
        console.error('setbot error', e);
        repondre('Failed to update set.js. Check file permissions.');
    }
});
