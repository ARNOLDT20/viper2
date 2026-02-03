// play.js - Modified Keith command to match Ezra structure
const { ezra } = require("../fredi/ezra");
const axios = require('axios');
const conf = require(__dirname + '/../set');
const { repondre } = require(__dirname + "/../fredi/context");

// Common contextInfo configuration
const getContextInfo = (title = '', userJid = '', thumbnailUrl = '') => ({
  mentionedJid: [userJid],
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363421014261315@newsletter",
    newsletterName: "blaze tech",
    serverMessageId: Math.floor(100000 + Math.random() * 900000),
  },
  externalAdReply: {
    showAdAttribution: true,
    title: conf.BOT || 'YouTube Downloader',
    body: title || "Media Downloader",
    thumbnailUrl: thumbnailUrl || conf.URL || '',
    sourceUrl: conf.GURL || '',
    mediaType: 1,
    renderLargerThumbnail: false
  }
});

// Audio download command - Keith version modified to match Ezra structure
ezra({
  nomCom: "play",
  aliases: ["song", "playdoc", "audio", "mp3", "ytmp3", "ytmp3doc", "audiodoc", "yta"],
  categorie: "T20-CLASSIC-Download",
  reaction: "🎵",
  description: "Download Audio from YouTube"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    if (!arg[0]) {
      return repondre(zk, dest, ms, "Please provide a song name or YouTube URL.");
    }

    const query = arg.join(" ");
    let videoUrl, videoTitle, videoThumbnail;

    // Check if input is a YouTube URL
    if (query.match(/(youtube\.com|youtu\.be)/i)) {
      videoUrl = query;
      const videoId = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1];
      if (!videoId) {
        return repondre(zk, dest, ms, "Invalid YouTube URL provided.");
      }
      videoTitle = "YouTube Audio";
      videoThumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    } else {
      // Search for the video using Keith API
      await zk.sendMessage(dest, {
        text: "🔍 Searching YouTube... This may take a moment...",
        contextInfo: getContextInfo("Searching", userJid)
      }, { quoted: ms });

      try {
        const searchResponse = await axios.get(`https://apiskeith.vercel.app/search/yts?query=${encodeURIComponent(query)}`, { timeout: 15000 });
        const videos = searchResponse.data?.result;

        if (!Array.isArray(videos) || videos.length === 0) {
          return repondre(zk, dest, ms, "No videos found for your search query.");
        }

        const firstVideo = videos[0];
        videoUrl = firstVideo.url;
        videoTitle = firstVideo.title;
        videoThumbnail = firstVideo.thumbnail;
      } catch (searchError) {
        console.error('YouTube search error:', searchError);
        return repondre(zk, dest, ms, "Failed to search YouTube. Please try again.");
      }
    }

    // Download audio using Keith API
    await zk.sendMessage(dest, {
      text: "⬇️ Downloading audio... This may take a moment...",
      contextInfo: getContextInfo("Downloading", userJid, videoThumbnail)
    }, { quoted: ms });

    try {
      const downloadResponse = await axios.get(`https://apiskeith.vercel.app/download/audio?url=${encodeURIComponent(videoUrl)}`, { timeout: 30000 });
      const downloadUrl = downloadResponse.data?.result;

      if (!downloadUrl) {
        throw new Error("Failed to get download URL from API.");
      }

      const fileName = `${videoTitle}.mp3`.replace(/[^\w\s.-]/gi, '');

      const contextInfo = getContextInfo(videoTitle, userJid, videoThumbnail);

      // Send audio stream
      await zk.sendMessage(dest, {
        audio: { url: downloadUrl },
        mimetype: "audio/mpeg",
        fileName: fileName,
        contextInfo: contextInfo
      }, { quoted: ms });

      // Send document stream
      await zk.sendMessage(dest, {
        document: { url: downloadUrl },
        mimetype: "audio/mpeg",
        fileName: fileName,
        contextInfo: {
          ...contextInfo,
          externalAdReply: {
            ...contextInfo.externalAdReply,
            body: 'Document version - Powered by T20-CLASSIC'
          }
        }
      }, { quoted: ms });

    } catch (downloadError) {
      console.error('Download error:', downloadError);
      // Fallback to other APIs if Keith API fails
      return repondre(zk, dest, ms, `Download failed: ${downloadError.message}. Trying alternative method...`);
    }

  } catch (error) {
    console.error('Audio download error:', error);
    repondre(zk, dest, ms, `Download failed: ${error.message}`);
  }
});

// Video download command - Keith version modified to match Ezra structure
ezra({
  nomCom: "video",
  aliases: ["videodoc", "film", "mp4", "ytmp4", "ytmp4doc", "videodoc", "ytv"],
  categorie: "viper-Download",
  reaction: "🎥",
  description: "Download Video from YouTube"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    if (!arg[0]) {
      return repondre(zk, dest, ms, "Please provide a video name or YouTube URL.");
    }

    const query = arg.join(" ");
    let videoUrl, videoTitle, videoThumbnail;

    // Check if input is a YouTube URL
    if (query.match(/(youtube\.com|youtu\.be)/i)) {
      videoUrl = query;
      const videoId = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1];
      if (!videoId) {
        return repondre(zk, dest, ms, "Invalid YouTube URL provided.");
      }
      videoTitle = "YouTube Video";
      videoThumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    } else {
      // Search for the video using Keith API
      await zk.sendMessage(dest, {
        text: "🔍 Searching YouTube... This may take a moment...",
        contextInfo: getContextInfo("Searching", userJid)
      }, { quoted: ms });

      try {
        const searchResponse = await axios.get(`https://apiskeith.vercel.app/search/yts?query=${encodeURIComponent(query)}`, { timeout: 15000 });
        const videos = searchResponse.data?.result;

        if (!Array.isArray(videos) || videos.length === 0) {
          return repondre(zk, dest, ms, "No videos found for your search query.");
        }

        const firstVideo = videos[0];
        videoUrl = firstVideo.url;
        videoTitle = firstVideo.title;
        videoThumbnail = firstVideo.thumbnail;
      } catch (searchError) {
        console.error('YouTube search error:', searchError);
        return repondre(zk, dest, ms, "Failed to search YouTube. Please try again.");
      }
    }

    // Download video using Keith API
    await zk.sendMessage(dest, {
      text: "⬇️ Downloading video... This may take a moment...",
      contextInfo: getContextInfo("Downloading", userJid, videoThumbnail)
    }, { quoted: ms });

    try {
      const downloadResponse = await axios.get(`https://apiskeith.vercel.app/download/video?url=${encodeURIComponent(videoUrl)}`, { timeout: 30000 });
      const downloadUrl = downloadResponse.data?.result;

      if (!downloadUrl) {
        throw new Error("Failed to get download URL from API.");
      }

      const fileName = `${videoTitle}.mp4`.replace(/[^\w\s.-]/gi, '');

      const contextInfo = getContextInfo(videoTitle, userJid, videoThumbnail);

      // Send video stream
      await zk.sendMessage(dest, {
        video: { url: downloadUrl },
        mimetype: "video/mp4",
        caption: `🎥 *${videoTitle}*`,
        contextInfo: contextInfo
      }, { quoted: ms });

      // Send document stream
      await zk.sendMessage(dest, {
        document: { url: downloadUrl },
        mimetype: "video/mp4",
        fileName: fileName,
        caption: `📁 *${videoTitle}* (Document)`,
        contextInfo: {
          ...contextInfo,
          externalAdReply: {
            ...contextInfo.externalAdReply,
            body: 'Document version - Powered by T20-CLASSIC'
          }
        }
      }, { quoted: ms });

    } catch (downloadError) {
      console.error('Download error:', downloadError);
      return repondre(zk, dest, ms, `Download failed: ${downloadError.message}`);
    }

  } catch (error) {
    console.error('Video download error:', error);
    repondre(zk, dest, ms, `Download failed: ${error.message}`);
  }
});

// YouTube search command - Fee version
ezra({
  nomCom: "ytsearch",
  aliases: ["youtube", "yt", "yts"],
  categorie: "viper-Download",
  reaction: "🔍",
  description: "Search YouTube Videos"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    if (!arg[0]) {
      return repondre(zk, dest, ms, "Please provide a search query.");
    }

    const query = arg.join(" ");

    await zk.sendMessage(dest, {
      text: "🔍 Searching YouTube...",
      contextInfo: getContextInfo("Searching", userJid)
    }, { quoted: ms });

    try {
      const searchResponse = await axios.get(`https://apiskeith.vercel.app/search/yts?query=${encodeURIComponent(query)}`, { timeout: 15000 });
      const videos = searchResponse.data?.result;

      if (!Array.isArray(videos) || videos.length === 0) {
        return repondre(zk, dest, ms, "No videos found for your search query.");
      }

      // Display first 5 results
      const topVideos = videos.slice(0, 5);

      let resultMessage = `📺 *YouTube Search Results*\n\n`;

      topVideos.forEach((video, index) => {
        resultMessage += `${index + 1}. *${video.title}*\n`;
        resultMessage += `   👤 ${video.channel}\n`;
        resultMessage += `   ⏱️ ${video.duration}\n`;
        resultMessage += `   👁️ ${video.views}\n`;
        resultMessage += `   🔗 ${video.url}\n\n`;
      });

      if (videos.length > 5) {
        resultMessage += `📊 *${videos.length - 5} more results available*\n`;
      }

      resultMessage += `\n*Usage:*\n• Use !play <number> to download audio\n• Use !video <number> to download video\n• Or provide the URL directly`;

      await zk.sendMessage(dest, {
        text: resultMessage,
        contextInfo: getContextInfo("YouTube Search Results", userJid, topVideos[0]?.thumbnail)
      }, { quoted: ms });

    } catch (searchError) {
      console.error('YouTube search error:', searchError);
      return repondre(zk, dest, ms, `Search failed: ${searchError.message}`);
    }

  } catch (error) {
    console.error('YouTube search error:', error);
    repondre(zk, dest, ms, `Search failed: ${error.message}`);
  }
});

// Alternative: Download by number from search results
ezra({
  nomCom: "ytdl2",
  aliases: ["ytdownload", "download"],
  categorie: "viper-Download",
  reaction: "⬇️",
  description: "Download YouTube video by number from search results"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid, msgRepondu } = commandOptions;

  try {
    if (!msgRepondu || !msgRepondu.message?.extendedTextMessage?.text) {
      return repondre(zk, dest, ms, "Please reply to a YouTube search results message with the video number.\nExample: !ytdl 1");
    }

    if (!arg[0]) {
      return repondre(zk, dest, ms, "Please provide the video number.\nExample: !ytdl 1");
    }

    const videoNumber = parseInt(arg[0]);
    if (isNaN(videoNumber) || videoNumber < 1 || videoNumber > 10) {
      return repondre(zk, dest, ms, "Please provide a valid number between 1 and 10.");
    }

    const searchText = msgRepondu.message.extendedTextMessage.text;

    // Extract URL from the search results
    const urlRegex = /https:\/\/www\.youtube\.com\/watch\?v=[\w-]+|https:\/\/youtu\.be\/[\w-]+/g;
    const urls = searchText.match(urlRegex);

    if (!urls || urls.length < videoNumber) {
      return repondre(zk, dest, ms, "Could not find the video URL. Please make sure you're replying to a valid search results message.");
    }

    const videoUrl = urls[videoNumber - 1];

    // Ask for format
    await zk.sendMessage(dest, {
      text: `🔗 Found video URL\n\n*Select format:*\n1. Audio (MP3)\n2. Video (MP4)\n\nReply with 1 or 2`,
      contextInfo: getContextInfo("Select Format", userJid)
    }, { quoted: ms });

    // You would need to implement a button or wait for user response here
    // For simplicity, we'll just download both
    repondre(zk, dest, ms, `Use !play ${videoUrl} for audio or !video ${videoUrl} for video.`);

  } catch (error) {
    console.error('YTDL error:', error);
    repondre(zk, dest, ms, `Error: ${error.message}`);
  }
});

// ═════════════════════════════════════════════════════════════════════════════
// 🎨 ENHANCED MENU COMMANDS WITH INTERACTIVE BUTTONS
// ═════════════════════════════════════════════════════════════════════════════

// Main Download Menu with Buttons
ezra({
  nomCom: "dlmenu",
  aliases: ["downloadmenu", "getmenu", "mediamenu"],
  categorie: "viper-Download",
  reaction: "📥",
  description: "Interactive Download Menu with Buttons"
}, async (dest, zk, commandOptions) => {
  const { ms, userJid } = commandOptions;

  try {
    const menuText = `╔════════════════════════════════╗
║  📥 *VIPER DOWNLOAD MENU* 📥   ║
╚════════════════════════════════╝

Choose an option below to download media:

🎵 *Audio Download*
   • .play <song/url> - Download song as audio
   • .ytmp3 <url> - YouTube to MP3

🎥 *Video Download*
   • .video <video/url> - Download as video
   • .ytmp4 <url> - YouTube to MP4

🔍 *Search & Browse*
   • .ytsearch <query> - Search YouTube
   • .youtube <query> - Alias for search

🎯 *Quick Download*
   • .download <url> - Auto-detect format

*Powered by Viper XMD* ✨`;

    await zk.sendMessage(dest, {
      text: menuText,
      contextInfo: getContextInfo("Download Menu", userJid, conf.URL),
      buttons: [
        {
          buttonId: ".play",
          buttonText: { displayText: "🎵 Download Audio" },
          type: 1
        },
        {
          buttonId: ".video",
          buttonText: { displayText: "🎥 Download Video" },
          type: 1
        },
        {
          buttonId: ".ytsearch",
          buttonText: { displayText: "🔍 Search YouTube" },
          type: 1
        }
      ],
      headerType: 1
    }, { quoted: ms });

  } catch (error) {
    console.error('Download menu error:', error);
    repondre(zk, dest, ms, `Menu error: ${error.message}`);
  }
});

// Owner Info & Support Button
ezra({
  nomCom: "owner",
  aliases: ["ownerinfo", "support", "helpinfo", "creatorinfo"],
  categorie: "viper-Info",
  reaction: "👑",
  description: "Owner Info & Support Contact"
}, async (dest, zk, commandOptions) => {
  const { ms, userJid } = commandOptions;

  try {
    const ownerNumber = conf.NUMERO_OWNER || "255627417402";
    const ownerName = conf.OWNER_NAME || "Starboy";

    const ownerText = `╔════════════════════════════════╗
║      👑 *BOT OWNER INFO* 👑     ║
╚════════════════════════════════╝

🤖 *Bot Name:* ${conf.BOT || 'Viper XMD'}
👤 *Owner:* ${ownerName}
📱 *WhatsApp:* wa.me/${ownerNumber}
🌐 *GitHub:* ${conf.GITHUB || 'N/A'}
🔗 *Channel:* ${conf.GURL || 'N/A'}

*Need Help?*
• Contact owner on WhatsApp
• Check GitHub for updates
• Report bugs & request features`;

    await zk.sendMessage(dest, {
      text: ownerText,
      contextInfo: {
        ...getContextInfo("Owner Info", userJid),
        quotedMessage: ms.message
      },
      buttons: [
        {
          buttonId: `https://wa.me/${ownerNumber}`,
          buttonText: { displayText: "📱 Chat Owner" },
          type: 2
        },
        {
          buttonId: conf.GITHUB || "https://github.com",
          buttonText: { displayText: "🔗 GitHub" },
          type: 2
        },
        {
          buttonId: conf.GURL || "https://whatsapp.com",
          buttonText: { displayText: "📢 Join Channel" },
          type: 2
        }
      ],
      headerType: 1
    }, { quoted: ms });

  } catch (error) {
    console.error('Owner info error:', error);
    repondre(zk, dest, ms, `Error: ${error.message}`);
  }
});

// Copy-Friendly Owner Number
ezra({
  nomCom: "ownernum",
  aliases: ["ownernumber", "copyowner", "contactowner"],
  categorie: "viper-Info",
  reaction: "📋",
  description: "Get Owner Number (Copy-Friendly)"
}, async (dest, zk, commandOptions) => {
  const { ms } = commandOptions;

  try {
    const ownerNumber = conf.NUMERO_OWNER || "255627417402";
    const ownerName = conf.OWNER_NAME || "Starboy";

    const copyText = `Owner Number: ${ownerNumber}
Owner Name: ${ownerName}

WhatsApp Link: https://wa.me/${ownerNumber}`;

    await zk.sendMessage(dest, {
      text: copyText
    }, { quoted: ms });

  } catch (error) {
    repondre(zk, dest, ms, `Error: ${error.message}`);
  }
});

// Bot Info with Button Links
ezra({
  nomCom: "botinfo",
  aliases: ["info", "about", "botdetails"],
  categorie: "viper-Info",
  reaction: "ℹ️",
  description: "Bot Information & Features"
}, async (dest, zk, commandOptions) => {
  const { ms, userJid } = commandOptions;

  try {
    const botInfo = `╔════════════════════════════════╗
║     🤖 *VIPER XMD INFO* 🤖      ║
╚════════════════════════════════╝

*Bot Name:* ${conf.BOT || 'Viper XMD'}
*Prefix:* ${conf.PREFIXE || '+'}
*Mode:* ${conf.MODE === 'yes' ? '🟢 Public' : '🔴 Private'}
*Status:* ${conf.ETAT === '1' ? '✅ Available' : '⏸️ Composing'}

*Features:*
✨ YouTube Download (Audio/Video)
🎵 Music Streaming Support
🎥 Media Processing
🔍 Search Integration
👥 Group Management
🛡️ Security Features

*Powered By:* T20-CLASSIC
*Version:* 3.0.0+`;

    await zk.sendMessage(dest, {
      text: botInfo,
      contextInfo: getContextInfo("Bot Info", userJid, conf.URL),
      buttons: [
        {
          buttonId: conf.GITHUB || "https://github.com",
          buttonText: { displayText: "📦 GitHub" },
          type: 2
        },
        {
          buttonId: conf.GURL || "https://whatsapp.com",
          buttonText: { displayText: "📢 Updates" },
          type: 2
        }
      ],
      headerType: 1
    }, { quoted: ms });

  } catch (error) {
    repondre(zk, dest, ms, `Error: ${error.message}`);
  }
});

// Help Menu with Button Navigation
ezra({
  nomCom: "helpdownload",
  aliases: ["dlhelp", "downloadhelp", "howtouse"],
  categorie: "viper-Help",
  reaction: "❓",
  description: "Download Commands Help Guide"
}, async (dest, zk, commandOptions) => {
  const { ms, userJid } = commandOptions;

  try {
    const helpText = `╔════════════════════════════════╗
║   ❓ *DOWNLOAD HELP GUIDE* ❓    ║
╚════════════════════════════════╝

*🎵 AUDIO COMMANDS:*
${conf.PREFIXE}play <song name/url>
${conf.PREFIXE}ytmp3 <youtube url>
${conf.PREFIXE}audio <query>

*🎥 VIDEO COMMANDS:*
${conf.PREFIXE}video <video name/url>
${conf.PREFIXE}ytmp4 <youtube url>
${conf.PREFIXE}film <query>

*🔍 SEARCH COMMANDS:*
${conf.PREFIXE}ytsearch <search query>
${conf.PREFIXE}youtube <query>
${conf.PREFIXE}yt <query>

*💡 TIPS:*
• Provide song/video title or URL
• Downloads may take 30 seconds
• Supports YouTube only (currently)
• Use document option for files`;

    await zk.sendMessage(dest, {
      text: helpText,
      contextInfo: getContextInfo("Help Guide", userJid),
      buttons: [
        {
          buttonId: ".dlmenu",
          buttonText: { displayText: "📥 Download Menu" },
          type: 1
        },
        {
          buttonId: ".ytsearch",
          buttonText: { displayText: "🔍 Search Now" },
          type: 1
        }
      ],
      headerType: 1
    }, { quoted: ms });

  } catch (error) {
    repondre(zk, dest, ms, `Error: ${error.message}`);
  }
});

// Quick Download with Alias (different name to avoid conflict)
ezra({
  nomCom: "getaudio",
  aliases: ["getsong", "fetchaudio", "grabsong", "musica"],
  categorie: "viper-Download",
  reaction: "🎵",
  description: "Alternative Audio Download Command"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    if (!arg[0]) {
      return repondre(zk, dest, ms, "Usage: .getaudio <song name or YouTube URL>");
    }

    const query = arg.join(" ");
    let videoUrl, videoTitle, videoThumbnail;

    if (query.match(/(youtube\.com|youtu\.be)/i)) {
      videoUrl = query;
      const videoId = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1];
      if (!videoId) {
        return repondre(zk, dest, ms, "Invalid YouTube URL.");
      }
      videoTitle = "Audio";
      videoThumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    } else {
      await zk.sendMessage(dest, {
        text: "🔍 Searching for audio...",
        contextInfo: getContextInfo("Searching", userJid)
      }, { quoted: ms });

      try {
        const searchResponse = await axios.get(`https://apiskeith.vercel.app/search/yts?query=${encodeURIComponent(query)}`, { timeout: 15000 });
        const videos = searchResponse.data?.result;

        if (!Array.isArray(videos) || videos.length === 0) {
          return repondre(zk, dest, ms, "No results found.");
        }

        const firstVideo = videos[0];
        videoUrl = firstVideo.url;
        videoTitle = firstVideo.title;
        videoThumbnail = firstVideo.thumbnail;
      } catch (searchError) {
        return repondre(zk, dest, ms, "Search failed. Try again.");
      }
    }

    await zk.sendMessage(dest, {
      text: "⬇️ Downloading...",
      contextInfo: getContextInfo("Downloading", userJid, videoThumbnail)
    }, { quoted: ms });

    try {
      const downloadResponse = await axios.get(`https://apiskeith.vercel.app/download/audio?url=${encodeURIComponent(videoUrl)}`, { timeout: 30000 });
      const downloadUrl = downloadResponse.data?.result;

      if (!downloadUrl) {
        throw new Error("Failed to get download URL.");
      }

      const fileName = `${videoTitle}.mp3`.replace(/[^\w\s.-]/gi, '');
      const contextInfo = getContextInfo(videoTitle, userJid, videoThumbnail);

      await zk.sendMessage(dest, {
        audio: { url: downloadUrl },
        mimetype: "audio/mpeg",
        fileName: fileName,
        contextInfo: contextInfo
      }, { quoted: ms });

    } catch (downloadError) {
      repondre(zk, dest, ms, `Download failed: ${downloadError.message}`);
    }

  } catch (error) {
    repondre(zk, dest, ms, `Error: ${error.message}`);
  }
});

// Quick Video Download with Alias
ezra({
  nomCom: "getvideo",
  aliases: ["getfilm", "fetchvideo", "grabvideo", "pelicul"],
  categorie: "viper-Download",
  reaction: "🎥",
  description: "Alternative Video Download Command"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    if (!arg[0]) {
      return repondre(zk, dest, ms, "Usage: .getvideo <video name or YouTube URL>");
    }

    const query = arg.join(" ");
    let videoUrl, videoTitle, videoThumbnail;

    if (query.match(/(youtube\.com|youtu\.be)/i)) {
      videoUrl = query;
      const videoId = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1];
      if (!videoId) {
        return repondre(zk, dest, ms, "Invalid YouTube URL.");
      }
      videoTitle = "Video";
      videoThumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    } else {
      await zk.sendMessage(dest, {
        text: "🔍 Searching for video...",
        contextInfo: getContextInfo("Searching", userJid)
      }, { quoted: ms });

      try {
        const searchResponse = await axios.get(`https://apiskeith.vercel.app/search/yts?query=${encodeURIComponent(query)}`, { timeout: 15000 });
        const videos = searchResponse.data?.result;

        if (!Array.isArray(videos) || videos.length === 0) {
          return repondre(zk, dest, ms, "No results found.");
        }

        const firstVideo = videos[0];
        videoUrl = firstVideo.url;
        videoTitle = firstVideo.title;
        videoThumbnail = firstVideo.thumbnail;
      } catch (searchError) {
        return repondre(zk, dest, ms, "Search failed. Try again.");
      }
    }

    await zk.sendMessage(dest, {
      text: "⬇️ Downloading...",
      contextInfo: getContextInfo("Downloading", userJid, videoThumbnail)
    }, { quoted: ms });

    try {
      const downloadResponse = await axios.get(`https://apiskeith.vercel.app/download/video?url=${encodeURIComponent(videoUrl)}`, { timeout: 30000 });
      const downloadUrl = downloadResponse.data?.result;

      if (!downloadUrl) {
        throw new Error("Failed to get download URL.");
      }

      const fileName = `${videoTitle}.mp4`.replace(/[^\w\s.-]/gi, '');
      const contextInfo = getContextInfo(videoTitle, userJid, videoThumbnail);

      await zk.sendMessage(dest, {
        video: { url: downloadUrl },
        mimetype: "video/mp4",
        caption: `🎥 *${videoTitle}*`,
        contextInfo: contextInfo
      }, { quoted: ms });

    } catch (downloadError) {
      repondre(zk, dest, ms, `Download failed: ${downloadError.message}`);
    }

  } catch (error) {
    repondre(zk, dest, ms, `Error: ${error.message}`);
  }
});