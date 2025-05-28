const fs = require("fs");
const path = require("path");
const vipFile = path.join(__dirname, "../vip.json");

module.exports = {
  name: "اضافة_في_اي_بي",
  alias: ["addvip", "اضف_في_اي_بي"],
  description: "يضيف عضو لقائمة VIP (خاص بالمطور فقط)",
  category: "الـ VIP",
  async execute(client, message, args) {
    const sender = message.sender.split("@")[0];
    const ownerNumbers = require("../config").ownerNumbers;

    if (!ownerNumbers.includes(sender)) {
      return message.reply("❌ هذا الأمر خاص بالمطور فقط.");
    }

    let target;
    if (message.mentionedJid && message.mentionedJid.length > 0) {
      target = message.mentionedJid[0].split("@")[0];
    } else if (args[0]) {
      target = args[0].replace(/[^0-9]/g, "");
    } else {
      return message.reply("يرجى تحديد الرقم أو عمل منشن للمستخدم.");
    }

    let vipList = [];
    if (fs.existsSync(vipFile)) {
      vipList = JSON.parse(fs.readFileSync(vipFile));
    }

    if (vipList.includes(target)) {
      return message.reply("هذا المستخدم موجود بالفعل في قائمة VIP.");
    }

    vipList.push(target);
    fs.writeFileSync(vipFile, JSON.stringify(vipList, null, 2));

    return message.reply(`✅ تم إضافة ${target} إلى قائمة VIP.`);
  },
};