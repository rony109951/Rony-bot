module.exports = {
  name: "فتح_الجروب",
  alias: ["فتح"],
  category: "الادمن",
  description: "فتح الجروب والسماح للجميع بالكتابة",
  async execute(client, message, args) {
    if (!message.isGroup) return message.reply("الأمر ده بيشتغل في الجروبات بس.");
    if (!message.isAdmin) return message.reply("الأمر ده للادمن فقط.");
    await client.groupSettingUpdate(message.chat, "not_announcement");
    message.reply("تم فتح الجروب. الكل يقدر يكتب دلوقتي.");
  }
};