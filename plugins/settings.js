const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const config = require('../config');

const storeDir = path.join(process.cwd(), 'store');
const settingsFile = path.join(storeDir, 'settings.json');

function saveSettings(obj) {
  try {
    if (!fs.existsSync(storeDir)) fs.mkdirSync(storeDir, { recursive: true });
    fs.writeFileSync(settingsFile, JSON.stringify(obj, null, 2));
  } catch (e) { console.error('Failed to save settings', e) }
}

function loadSettings() {
  try {
    if (!fs.existsSync(settingsFile)) return {};
    return JSON.parse(fs.readFileSync(settingsFile, 'utf8') || '{}');
  } catch (e) { return {} }
}

// allowed boolean settings that can be toggled
const ALLOWED_FLAGS = [
  'AUTO_REACT','AUTO_REPLY','AUTO_STICKER','AUTO_VOICE','AUTO_STATUS_REPLY','AUTO_STATUS_SEEN','AUTO_STATUS_REACT','AUTO_TYPING','READ_MESSAGE','ALWAYS_ONLINE','CUSTOM_REACT','AUTO_FOLLOW_CHANNEL'
];

cmd({
  pattern: 'set',
  alias: ['toggle','setconfig'],
  desc: 'Toggle a bot boolean setting. Usage: .set AUTO_REPLY on',
  category: 'owner',
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, isCreator, reply }) => {
  try {
    if (!isOwner && !isCreator) return reply('❌ Owner only command');
    if (!args || args.length < 2) return reply('Usage: .set <SETTING_NAME> <on|off>\nAllowed: ' + ALLOWED_FLAGS.join(', '));
    const key = args[0].toUpperCase();
    const val = args[1].toLowerCase();
    if (!ALLOWED_FLAGS.includes(key)) return reply('❌ Setting not allowed. Allowed: ' + ALLOWED_FLAGS.join(', '));
    const bool = (val === 'on' || val === 'true' || val === '1') ? 'true' : 'false';
    // update runtime config and persist
    config[key] = bool;
    const s = loadSettings();
    s[key] = bool;
    saveSettings(s);
    reply(`✅ Setting ${key} set to ${bool}`);
  } catch (e) {
    console.error('settings.set error', e);
    reply('❌ Error toggling setting');
  }
});

// change prefix command - allow owner or group admins to change
cmd({
  pattern: 'prefix',
  alias: ['setprefix'],
  desc: 'Change the bot prefix. Usage: .prefix !',
  category: 'owner',
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, isCreator, isAdmins, isGroup, reply }) => {
  try {
    // allow owner OR group admin (if used in group)
    if (!(isOwner || isCreator || (isGroup && isAdmins))) return reply('❌ Only owner or group admin can change prefix');
    if (!args || !args[0]) return reply('Usage: .prefix <single-character-or-string>');
    const newPrefix = args[0].trim();
    config.PREFIX = newPrefix;
    const s = loadSettings();
    s.PREFIX = newPrefix;
    saveSettings(s);
    reply(`✅ Prefix changed to: ${newPrefix}`);
  } catch (e) {
    console.error('prefix change error', e);
    reply('❌ Error changing prefix');
  }
});

// command to view current persisted settings
cmd({
  pattern: 'viewsettings',
  alias: ['settings','viewconfig'],
  desc: 'View current settings',
  category: 'utility',
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const s = loadSettings();
    const lines = [];
    Object.keys(s).forEach(k => lines.push(`${k}: ${s[k]}`));
    if (lines.length === 0) return reply('No custom settings saved.');
    reply('Current saved settings:\n' + lines.join('\n'));
  } catch (e) {
    console.error('viewsettings error', e);
    reply('❌ Error reading settings');
  }
});
