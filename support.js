const { developerName, developerNumber } = require("../config");

module.exports = {
  name: "الدعم",
  alias: ["support", "دعم", "المطور"],
  description: "يعرض معلومات دعم البوت والمطور",
  category: "عام",
  async execute(client, message) {
    const supportMessage = `
╭───〔 *دعم البوت* 〕───
│
│ *مطور البوت:* ${developerName}
│ *رقم المطور:* wa.me/${developerNumber}
│ *لأي مشاكل أو اقتراحات تواصل معنا.*
│
╰───────────────
    `.trim();

    await message.reply(supportMessage);
  },
};