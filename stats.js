module.exports = {
  name: "الإحصائيات",
  alias: ["stats", "إحصائيات", "احصائيات", "بوت_احصائيات"],
  description: "يعرض إحصائيات البوت.",
  category: "عام",
  async execute(message, args, client) {
    const chats = await client.groupFetchAllParticipating();
    const groupCount = Object.keys(chats).length;

    let totalParticipants = 0;
    for (let jid in chats) {
      totalParticipants += chats[jid].participants.length;
    }

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const uptimeText = `${hours} ساعة و ${minutes} دقيقة و ${seconds} ثانية`;

    const text = `📊 إحصائيات البوت:
    
- عدد الجروبات: ${groupCount}
- عدد الأعضاء الكلي: ${totalParticipants}
- مدة التشغيل: ${uptimeText}
- مطور البوت: روني البحيره
- رقم المطور: 01222843252
`;

    await client.sendMessage(message.chat, { text }, { quoted: message });
  }
};