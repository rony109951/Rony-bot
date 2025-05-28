const fs = require("fs");
const path = require("path");
const bannedFile = path.join(__dirname, "../blacklist.json");

module.exports = {
  name: "حظر",
  alias: ["ban", "بلوك"],
  description: "حظر شخص من استخدام البوت",
  category: "الادمن",
  async execute(client, message, args) {
    const sender = message.sender.split("@")[0];
    const developerNumber = "01222843252";

    if (sender !== developerNumber && !message.isGroupAdmin) {
      return message.reply("❌ هذا الأمر خاص بالمطور أو المشرفين فقط.");
    }

    if (!message.mentionedJid || message.mentionedJid.length === 0) {
      return message.reply("❌ من فضلك قم بعمل منشن للشخص الذي تريد حظره.");
    }

    const target = message.mentionedJid[0].split("@")[0];

    let blacklist = [];
    if (fs.existsSync(bannedFile)) {
      blacklist = JSON.parse(fs.readFileSync(bannedFile));
    }

    if (blacklist.includes(target)) {
      return message.reply("❌ هذا المستخدم محظور بالفعل.");
    }

    blacklist.push(target);
    fs.writeFileSync(bannedFile, JSON.stringify(blacklist, null, 2));

    message.reply(`✅ تم حظر المستخدم: ${target}`);
  },
};