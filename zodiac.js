module.exports = {
  name: "البرج",
  alias: ["zodiac"],
  description: "يظهر لك برجك بناءً على تاريخ ميلادك (باليوم والشهر).",
  category: "تسلية",
  async execute(message, args, client) {
    if (args.length < 2) {
      return message.reply("من فضلك اكتب يوم وشهر ميلادك.\nمثال: البرج 21 3");
    }

    const day = parseInt(args[0]);
    const month = parseInt(args[1]);

    if (isNaN(day) || isNaN(month) || day < 1 || day > 31 || month < 1 || month > 12) {
      return message.reply("تأكد من كتابة يوم وشهر صحيحين.");
    }

    const zodiacSigns = [
      { sign: "برج الجدي", from: [12, 22], to: [1, 19] },
      { sign: "برج الدلو", from: [1, 20], to: [2, 18] },
      { sign: "برج الحوت", from: [2, 19], to: [3, 20] },
      { sign: "برج الحمل", from: [3, 21], to: [4, 19] },
      { sign: "برج الثور", from: [4, 20], to: [5, 20] },
      { sign: "برج الجوزاء", from: [5, 21], to: [6, 20] },
      { sign: "برج السرطان", from: [6, 21], to: [7, 22] },
      { sign: "برج الأسد", from: [7, 23], to: [8, 22] },
      { sign: "برج العذراء", from: [8, 23], to: [9, 22] },
      { sign: "برج الميزان", from: [9, 23], to: [10, 22] },
      { sign: "برج العقرب", from: [10, 23], to: [11, 21] },
      { sign: "برج القوس", from: [11, 22], to: [12, 21] },
    ];

    let zodiac = "غير معروف";

    for (const z of zodiacSigns) {
      const [fromMonth, fromDay] = z.from;
      const [toMonth, toDay] = z.to;

      if (
        (month === fromMonth && day >= fromDay) ||
        (month === toMonth && day <= toDay)
      ) {
        zodiac = z.sign;
        break;
      }
    }

    return message.reply(`برجك هو: ${zodiac}`);
  },
};