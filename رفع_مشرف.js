module.exports = {
  name: "تنزيل_مشرف",
  alias: ["demote", "نزع_ادمن"],
  description: "إزالة الصلاحيات الإدارية من عضو في الجروب",
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
      return message.reply("❌ من فضلك منشن الشخص الذي تريد نزع صلاحياته.");
    }

    const target = message.mentionedJid[0];

    try {
      await client.groupParticipantsUpdate(message.chat, [target], "demote");
      await message.reply(`✅ تم إزالة صلاحيات المشرف من العضو.`);
    } catch (error) {
      console.error(error);
      message.reply("❌ حدث خطأ أثناء إزالة صلاحيات العضو. تأكد أن البوت مشرف في الجروب.");
    }
  },
};