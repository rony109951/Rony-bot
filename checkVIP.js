const fs = require("fs");
const path = require("path");

module.exports = {
  name: "هل_انا_vip",
  alias: ["amivip", "vip", "انا_vip", "هل_انا_vايب"],
  description: "يتحقق إذا كنت مستخدم VIP.",
  category: "الـ VIP",

  async execute(message, args, client) {
    const vipPath = path.join(__dirname, "..", "vip.json");

    // تحميل قائمة VIP
    let vipUsers = [];
    if (fs.existsSync(vipPath)) {
      vipUsers = JSON.parse(fs.readFileSync(vipPath));
    }

    const sender = message.sender;

    if (vipUsers.includes(sender)) {
      await client.sendMessage(message.chat, {
        text: `✅ أنت مستخدم VIP في البوت يا نجم.`,
      }, { quoted: message });
    } else {
      await client.sendMessage(message.chat, {
        text: `❌ أنت لست ضمن قائمة VIP حاليًا.`,
      }, { quoted: message });
    }
  }
};