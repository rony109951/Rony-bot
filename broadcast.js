const config = require("../config");

module.exports = {
  name: "اذاعة",
  alias: ["broadcast", "bc", "ارسال_جماعي"],
  description: "إرسال رسالة جماعية لكل الجروبات أو الخاص.",
  category: "المطور",
  async execute(message, args, client) {
    const sender = message.sender.split("@")[0];

    if (sender !== config.ownerNumber) {
      return client.sendMessage(message.chat, {
        text: "❌ هذا الأمر خاص بالمطور فقط."
      }, { quoted: message });
    }

    if (!args || args.length === 0) {
      return client.sendMessage(message.chat, {
        text: "❗ يرجى كتابة الرسالة التي تريد إرسالها.\nمثال: اذاعة مرحباً بالجميع!"
      }, { quoted: message });
    }

    const broadcastText = args.join(" ");
    const chats = await client.chats.all();

    for (let chat of chats) {
      if (chat.id.endsWith("@g.us") || chat.id.endsWith("@s.whatsapp.net")) {
        await client.sendMessage(chat.id, { text: `📢 *إذاعة من المطور:*\n\n${broadcastText}` });
        await new Promise(res => setTimeout(res, 150)); // تهدئة بسيطة لتجنب الحظر
      }
    }

    await client.sendMessage(message.chat, {
      text: "✅ تم إرسال الإذاعة بنجاح."
    }, { quoted: message });
  }
};