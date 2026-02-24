const { ezra } = require('../fredi/ezra');
const s = require('../set');
const fs = require('fs');
const path = require('path');

ezra(
  {
    nomCom: "setvar",
    categorie: "viper-Heroku",
    reaction: "⚙️",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, superUser, arg } = commandeOptions;

    try {
      console.log('DEBUG - setvar triggered:', { arg, superUser });

      if (!superUser) {
        return repondre(`viper xmd says only owner or viper can use this command 🚫`);
      }

      if (!arg[0] || !arg.join(' ').includes('=')) {
        return repondre(`viper xmd\n\n╭┈┈┈┈┈┈┈┈┈┈┈┈\n│❒ Use this Format it right, like: .setvar OWNER_NUMBER=255627417402\n╰┈┈┈┈┈┈┈┈┈┈┈┈`);
      }

      const text = arg.join(' ').trim();
      const [key, value] = text.split('=').map(str => str.trim());

      if (!key || !value) {
        return repondre(`viper xmd says STOP WASTING MY TIME! Provide a valid KEY=VALUE pair!🙂‍↔️`);
      }

      // If user is trying to set local Heroku credentials, save them to set.env
      if (key === 'HEROKU_API_KEY' || key === 'HEROKU_APP_NAME') {
        try {
          const envPath = path.join(__dirname, '..', 'set.env');
          let content = '';
          if (fs.existsSync(envPath)) content = fs.readFileSync(envPath, 'utf8');
          const re = new RegExp(`^${key}=.*$`, 'm');
          if (re.test(content)) {
            content = content.replace(re, `${key}=${value}`);
          } else {
            if (content && !content.endsWith('\n')) content += '\n';
            content += `${key}=${value}\n`;
          }
          fs.writeFileSync(envPath, content, 'utf8');
          return repondre(`Saved ${key} to local set.env. Restart the bot for changes to apply.`);
        } catch (err) {
          console.error('Error writing set.env:', err);
          return repondre(`Failed to write ${key} to set.env: ${err.message}`);
        }
      }

      // For other vars we need Heroku remote credentials
      if (!s.HEROKU_API_KEY || !s.HEROKU_APP_NAME) {
        return repondre(`Heroku not configured. To use this command remotely, set HEROKU_API_KEY and HEROKU_APP_NAME in your environment or use .setvar HEROKU_API_KEY=... and .setvar HEROKU_APP_NAME=... to save locally.`);
      }

      const Heroku = require("heroku-client");
      const heroku = new Heroku({ token: s.HEROKU_API_KEY });
      const baseURI = `/apps/${s.HEROKU_APP_NAME}`;

      await heroku.patch(`${baseURI}/config-vars`, {
        body: { [key]: value },
      });

      await repondre(`viper xmd\n\n╭┈┈┈┈┈┈┈┈┈┈┈┈\n│❒ BOOM! Heroku var ${key} set to ${value}! bot is rebooting...🛒\n╰┈┈┈┈┈┈┈┈┈┈┈┈`);

    } catch (error) {
      console.error('setvar error:', error);
      await repondre(`viper-XFORCE FAIL! Something broke: ${error.message} 😴 Fix it or suffer!`);
    }
  }
);

ezra(
  {
    nomCom: "allvar",
    categorie: "viper-Heroku",
    reaction: "📋",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, superUser } = commandeOptions;

    try {
      console.log('DEBUG - allvar triggered:', { superUser });

      if (!superUser) {
        return repondre(`viper xmd says only owner or viper can use this command 🚫`);
      }

      if (!s.HEROKU_API_KEY || !s.HEROKU_APP_NAME) {
        return repondre(`viper xmd CONFIG DISASTER! HEROKU_API_KEY or HEROKU_APP_NAME missing in set.js! Sort it out! 🙂‍↕️`);
      }

      const Heroku = require("heroku-client");
      const heroku = new Heroku({ token: s.HEROKU_API_KEY });
      const baseURI = `/apps/${s.HEROKU_APP_NAME}`;

      const vars = await heroku.get(`${baseURI}/config-vars`);
      let str = `viper xmd VARS\n\n╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n`;
      for (const vr in vars) {
        str += `🛒 *${vr}* = ${vars[vr]}\n`;
      }
      str += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈`;

      await repondre(str);

    } catch (error) {
      console.error('allvar error:', error);
      await repondre(`viper xmd\nCRASH AND BURN! Error: ${error.message} 😡 Get it together!`);
    }
  }
);

ezra(
  {
    nomCom: "getvar",
    categorie: "viper-Heroku",
    reaction: "🔍",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, superUser, arg } = commandeOptions;

    try {
      console.log('DEBUG - getvar triggered:', { arg, superUser });

      if (!superUser) {
        return repondre(`viper xmd says only owner or viper can use this command 🚫`);
      }

      if (!arg[0]) {
        return repondre(`viper xmd\n Give me a variable name in CAPS! 😮‍💨`);
      }

      const varName = arg.join(' ').trim().toUpperCase();

      if (!s.HEROKU_API_KEY || !s.HEROKU_APP_NAME) {
        return repondre(`viper xmd\nCONFIG FAILURE! HEROKU_API_KEY or HEROKU_APP_NAME missing in set.js! Fix it! 😵`);
      }

      const Heroku = require("heroku-client");
      const heroku = new Heroku({ token: s.HEROKU_API_KEY });
      const baseURI = `/apps/${s.HEROKU_APP_NAME}`;

      const vars = await heroku.get(`${baseURI}/config-vars`);
      if (vars[varName]) {
        await repondre(`LUCKY-MD-XFORCE\n\n╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n│❒ GOT IT! ${varName} = ${vars[varName]} 🚀\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈`);
      } else {
        await repondre(`NOPE! Variable ${varName} doesn't exist, try again!`);
      }

    } catch (error) {
      console.error('getvar error:', error);
      await repondre(`viper xmd\nTOTAL FAILURE! Error: ${error.message} 😡 Fix this mess!`);
    }
  }
);