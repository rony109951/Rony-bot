module.exports = {
  name: "التاريخ",
  alias: ["date"],
  description: "عرض التاريخ والوقت الحالي.",
  category: "معلومات",
  async execute(message, args, client) {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Africa/Cairo',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      };
      const formattedDate = now.toLocaleString('ar-EG', options);

      await message.reply(`التاريخ والوقت الحالي:\n${formattedDate}`);
    } catch (err) {
      console.error("خطأ في أمر التاريخ:", err);
      await message.reply("حدث خطأ أثناء جلب التاريخ.");
    }
  },
};