const fs = require("fs");
const path = require("path");
const vipFile = path.join(__dirname, "../vip.json");

module.exports = {
  name: "ملصق_vip",
  alias: ["vipsticker", "ستيكر_في_اي_بي"],
  description: "تحويل صورة إلى ملصق (خاص بـ VIP فقط)",
  category: "الـ VIP",
  async execute(client, message, args, { isImage, quoted }) {
    const sender = message.sender.split("@")[0];

    // قراءة ملف VIP
    let vipList = [];
    if (fs.existsSync(vipFile)) {
      vipList = JSON.parse(fs.readFileSync(vipFile));
    }

    // التأكد من أن المرسل عضو VIP
    if (!vipList.includes(sender)) {
      return message.reply("❌ هذا الأمر مخصص فقط لأعضاء VIP.");
    }

    // التأكد من وجود صورة
    if (!isImage && !(quoted && quoted.mtype === "imageMessage")) {
      return message.reply("❌ من فضلك أرسل صورة أو رد على صورة.");
    }

    const media = await message.downloadMedia(quoted || message);

    await client.sendMessage(message.chat, {
      sticker: media,
    }, { quoted: message });
  },
};