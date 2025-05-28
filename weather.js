const axios = require("axios");

module.exports = {
  name: "الطقس",
  alias: ["weather"],
  description: "عرض حالة الطقس لمنطقة معينة.",
  category: "معلومات",
  async execute(message, args, client) {
    try {
      if (!args[0]) {
        return message.reply("من فضلك اكتب اسم المدينة بعد الأمر.\nمثال: الطقس القاهرة");
      }

      const city = args.join(" ");
      const apiKey = "YOUR_API_KEY"; // ضع مفتاح API الخاص بك هنا
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=ar&appid=${apiKey}`;

      const res = await axios.get(url);
      const data = res.data;

      const weather = data.weather[0].description;
      const temp = data.main.temp;
      const feelsLike = data.main.feels_like;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      const response = `الطقس في ${data.name}:\n\n` +
        `- الحالة: ${weather}\n` +
        `- درجة الحرارة: ${temp}°C\n` +
        `- محسوسة كـ: ${feelsLike}°C\n` +
        `- الرطوبة: ${humidity}%\n` +
        `- سرعة الرياح: ${windSpeed} م/ث`;

      await message.reply(response);
    } catch (err) {
      console.error("خطأ في أمر الطقس:", err);
      await message.reply("تعذر جلب حالة الطقس. تأكد من كتابة اسم المدينة بشكل صحيح.");
    }
  },
};