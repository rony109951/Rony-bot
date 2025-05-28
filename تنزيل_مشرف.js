module.exports = {
  name: "رفع_مشرف",
  alias: ["promote", "ادمن"],
  description: "ترقية عضو إلى مشرف في الجروب",
  category: "الادمن",

  async execute(client, message, args, m) {
    const sender = message.sender.split("@")[0];
    const developerNumber = "01222843252";

    if (!message.isGroup) {
      return message.reply("❌ هذا الأمر يعمل فقط داخل الجروبات.");
    }

    if (sender !== developerNumber && !message.isGroupAdmin) {
      return message.reply("❌ هذا الأمر مخصص للمطور أو مشرفي الجروب فقط.");
    }

    if (!message.mentionedJid || message.mentionedJid.length === 0) {
      return message.reply("❌ من فضلك منشن الشخص الذي تريد ترقيته.");
    }

    const target = message.mentionedJid[0];

    try {
      await client.groupParticipantsUpdate(message.chat, [target], "promote");
      await message.reply(`✅ تم ترقية العضو إلى مشرف.`);
    } catch (error) {
      console.error(error);
      message.reply("❌ حدث خطأ أثناء ترقية العضو. تأكد أن البوت مشرف في الجروب.");
    }
  },
};