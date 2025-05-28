const config = require("../config");

module.exports = {
  name: "إعادة_تشغيل",
  alias: ["restart", "اعادة", "ريستارت"],
  description: "إعادة تشغيل البوت (للمطور فقط).",
  category: "المطور",
  async execute(message, args, client) {
    const sender = message.sender.split("@")[0];

    if (sender !== config.ownerNumber) {
      return client.sendMessage(message.chat, {
        text: "❌ هذا الأمر مخصص فقط للمطور."
      }, { quoted: message });
    }

    await client.sendMessage(message.chat, {
      text: "♻️ يتم الآن إعادة تشغيل البوت..."
    }, { quoted: message });

    process.exit(0);
  }
};