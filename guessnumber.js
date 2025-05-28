const games = {};

module.exports = {
  name: "تخمين",
  alias: ["guess", "guessnumber", "تخمين_رقم"],
  description: "لعبة تخمين رقم من 1 إلى 10",
  category: "العاب",

  async execute(client, message, args) {
    const chatId = message.chat;

    if (!games[chatId]) {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      games[chatId] = { number: randomNumber, attempts: 3 };

      return message.reply("🎲 لقد اخترت رقمًا من 1 إلى 10. حاول تخمينه! لديك 3 محاولات. أرسل رقمك الآن.");
    }

    const game = games[chatId];

    if (args.length === 0) {
      return message.reply("❗ من فضلك أرسل رقمًا لتخمينه.");
    }

    const guess = parseInt(args[0]);
    if (isNaN(guess) || guess < 1 || guess > 10) {
      return message.reply("❗ أرسل رقمًا صحيحًا من 1 إلى 10.");
    }

    game.attempts--;

    if (guess === game.number) {
      delete games[chatId];
      return message.reply("✅ تهانينا! لقد خمّنت الرقم بشكل صحيح!");
    } else if (game.attempts > 0) {
      return message.reply(`❌ خطأ. تبقى لك ${game.attempts} محاولة.`);
    } else {
      const correct = game.number;
      delete games[chatId];
      return message.reply(`❌ انتهت محاولاتك! الرقم الصحيح كان ${correct}.`);
    }
  },
};