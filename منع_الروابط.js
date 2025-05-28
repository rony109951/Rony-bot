const fs = require("fs");
const config = require("../config");

const dataPath = "./antilink.json";

module.exports = {
  name: "منع_الروابط",
  description: "تشغيل أو إيقاف ميزة منع الروابط (للمطور فقط)",
  async execute(client, message, args) {
    const sender = message.sender.split("@")[0];
    const groupId = message.chat;

    // تحقق إذا كان المرسل هو المطور فقط
    if (!config.ownerNumbers.includes(sender)) {
      return message.reply("الأمر ده للمطور فقط!");
    }

    let data = {};
    if (fs.existsSync(dataPath)) {
      data = JSON.parse(fs.readFileSync(dataPath));
    }

    const enabled = data[groupId] || false;
    data[groupId] = !enabled;

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    return message.reply(
      `تم ${!enabled ? "تفعيل" : "إيقاف"} منع الروابط في الجروب.`
    );
  },
};