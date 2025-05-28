module.exports = {
  name: "كتم",
  alias: ["mute"],
  description: "كتم عضو في الجروب",
  category: "الادمن",

  async execute(client, message, args, m) {
    const sender = message.sender.split("@")[0];
    const developerNumber = "01222843252";

    if (!message.isGroup) {
      return message.reply("❌ هذا الأمر يعمل داخل الجروبات فقط.");
    }

    if (sender !== developerNumber && !message.isGroupAdmin) {
      return message.reply("❌ هذا الأمر خاص بالمطور أو مشرفي الجروب.");
    }

    if (!message.mentionedJid || message.mentionedJid.length === 0) {
      return message.reply("❌ من فضلك قم بمنشن العضو الذي تريد كتمه.");
    }

    const target = message.mentionedJid[0];

    try {
      await client.groupParticipantsUpdate(message.chat, [target], "demote");
      await client.sendMessage(message.chat, { text: "✅ تم كتم العضو بنجاح." });
    } catch (err) {
      console.error(err);
      message.reply("❌ فشل في تنفيذ الأمر، تأكد أن البوت مشرف.");
    }
  },
};