const axios = require("axios");

module.exports = {
  name: "انمي",
  alias: ["anime"],
  description: "يرسل صورة انمي عشوائية.",
  category: "ترفيه",
  async execute(message, args, client) {
    try {
      const res = await axios.get("https://api.waifu.pics/sfw/waifu");
      const animeImage = res.data.url;

      await client.sendMessage(message.chat, {
        image: { url: animeImage },
        caption: "صورة انمي عشوائية",
      }, { quoted: message });

    } catch (err) {
      console.error("خطأ في جلب صورة الأنمي:", err);
      message.reply("حصل خطأ، جرب تاني.");
    }
  }
};