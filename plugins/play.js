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
    newsletterJid: "120363313124070136@newsletter",
    newsletterName: "BELTAH MD UPDATES",
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
  categorie: "Fredi-Download",
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
            body: 'Document version - Powered by T20-starboy'
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
            body: 'Document version - Powered by Fredi AI'
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