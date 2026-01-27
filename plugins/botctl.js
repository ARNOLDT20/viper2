"use strict";
const { ezra } = require("../fredi/ezra");
const os = require("os");
const fs = require("fs");
const path = require("path");
const set = require(__dirname + "/../set");

// In-memory map of autotyping intervals: { jid: intervalId }
const autoTypingTimers = {};

function formatDuration(seconds) {
  const d = Math.floor(seconds / 86400);
  seconds %= 86400;
  const h = Math.floor(seconds / 3600);
  seconds %= 3600;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

ezra({ nomCom: "uptime", categorie: "viper-Admin", reaction: "⏱" }, async (dest, zk, opts) => {
  const { repondre } = opts;
  try {
    const procUptime = process.uptime();
    const sysUptime = os.uptime();
    const mem = process.memoryUsage();
    const load = os.loadavg();

    const msg = `*Bot Uptime*\n• Process: ${formatDuration(procUptime)}\n• System: ${formatDuration(sysUptime)}\n\n*Memory*\n• RSS: ${Math.round(mem.rss / 1024 / 1024)} MB\n• HeapUsed: ${Math.round(mem.heapUsed / 1024 / 1024)} MB\n\n*Load Avg*\n• ${load.map(l => l.toFixed(2)).join(' | ')}`;

    await repondre(msg);
  } catch (e) {
    console.error("uptime error:", e);
    await repondre("❌ Failed to get uptime: " + e.message);
  }
});

ezra({ nomCom: "mode", categorie: "viper-Admin", reaction: "🔁" }, async (dest, zk, opts) => {
  const { repondre, arg } = opts;
  const wanted = Array.isArray(arg) && arg[0] ? String(arg[0]).toLowerCase() : null;
  if (!wanted || !["public", "private", "yes", "no", "toggle"].includes(wanted)) {
    return repondre("Usage: .mode public|private  or .mode toggle");
  }
  try {
    if (wanted === "toggle") {
      set.MODE = (String(set.MODE).toLowerCase() === "yes" || String(set.MODE).toLowerCase() === "public") ? "no" : "yes";
      await repondre(`Mode toggled to: ${set.MODE}`);
      return;
    }
    // Accept 'public'/'private' or yes/no
    if (wanted === "public" || wanted === "yes") set.MODE = "yes"; else set.MODE = "no";
    await repondre(`Mode set to: ${set.MODE}`);
    // Note: change is in-memory. Restart required to persist env config.
  } catch (e) {
    console.error("mode error:", e);
    await repondre("❌ Failed to change mode: " + e.message);
  }
});

ezra({ nomCom: "autotyping", categorie: "viper-Admin", reaction: "⌨️" }, async (dest, zk, opts) => {
  const { repondre, arg } = opts;
  const action = Array.isArray(arg) && arg[0] ? String(arg[0]).toLowerCase() : null;
  const target = Array.isArray(arg) && arg[1] ? String(arg[1]) : dest;

  if (!action || !["on", "off", "status"].includes(action)) {
    return repondre("Usage: .autotyping on <jid>|off <jid>|status\nWhen enabled the bot will periodically send 'composing' presence to the target JID.");
  }

  try {
    if (action === "status") {
      const active = Object.keys(autoTypingTimers);
      if (active.length === 0) return repondre("No active autotyping targets.");
      return repondre("Active autotyping targets:\n" + active.join('\n'));
    }

    const jid = target.includes("@") ? target : `${target}@s.whatsapp.net`;

    if (action === "on") {
      if (autoTypingTimers[jid]) return repondre(`Autotyping already active for ${jid}`);
      // send presence every 12 seconds
      const iv = setInterval(() => {
        try {
          if (zk && typeof zk.sendPresenceUpdate === 'function') {
            zk.sendPresenceUpdate('composing', jid).catch(() => { });
          }
        } catch (e) { }
      }, 12000);
      autoTypingTimers[jid] = iv;
      return repondre(`Autotyping enabled for ${jid} (in-memory only)`);
    }

    if (action === "off") {
      if (!autoTypingTimers[jid]) return repondre(`No autotyping active for ${jid}`);
      clearInterval(autoTypingTimers[jid]);
      delete autoTypingTimers[jid];
      return repondre(`Autotyping disabled for ${jid}`);
    }

  } catch (e) {
    console.error("autotyping error:", e);
    await repondre("❌ autotyping error: " + e.message);
  }
});

module.exports = { autoTypingTimers };
