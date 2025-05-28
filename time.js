module.exports = {
  name: "الوقت",
  alias: ["time"],
  description: "عرض الوقت الحالي.",
  category: "معلومات",
  async execute(message, args, client) {
    try {
      const now = new Date();
      const options = {
        timeZone:  Africa/Cairo ,
        hour:  numeric ,
        minute:  numeric ,
        second:  numeric ,
        hour12: true,
      };
      const currentTime = now.toLocaleTimeString( ar-EG , options);

      await message.reply(`الوقت الحالي: ${currentTime}`);
    } catch (err) {
      console.error("خطأ في أمر الوقت:", err);
      await message.reply("حدث خطأ أثناء جلب الوقت.");
    }
  },
};