const axios = require("axios");

module.exports = {
  name: "ميم",
  alias: ["meme"],
  description: "يرسل لك صورة ميم عشوائية مضحكة.",
  category: "ترفيه",
  async execute(message, args, client) {
    try {
      const res = await axios.get("https://meme-api.com/gimme");
      const meme = res.data;

      await client.sendMessage(message.chat, {
        image: { url: meme.url },
        caption: `العنوان: *${meme.title}*\nمن: ${meme.subreddit}`,
      }, { quoted: message });
    } catch (error) {
      console.error("خطأ في جلب الميم:", error);
      message.reply("حصل خطأ أثناء جلب الميم، حاول مرة تانية.");
    }
  }
};