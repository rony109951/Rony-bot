const fs = require('fs');
const warningsPath = './warnings.json';

if (!fs.existsSync(warningsPath)) fs.writeFileSync(warningsPath, '{}');
let warnings = JSON.parse(fs.readFileSync(warningsPath));

const badWords = ["كسمك", "يامتناك", "ياعرص", "نيرم", "عيل نيرم", "يبت المتناكه", "زبي في كسمك", "احا", "يلعن كسمك", "يلعن امك"];

module.exports = {
  name: "badwords",
  description: "منع الشتائم وتحذير الأعضاء",
  type: "group",
  async execute(message, client) {
    const { body, sender, isGroup, from, participant } = message;
    const user = isGroup ? participant : sender;

    if (!isGroup) return;

    const msgText = body.toLowerCase();
    if (!badWords.some(word => msgText.includes(word))) return;

    if (!warnings[user]) warnings[user] = 0;
    warnings[user] += 1;

    fs.writeFileSync(warningsPath, JSON.stringify(warnings, null, 2));

    if (warnings[user] === 1) {
      await client.sendMessage(from, { text: `⚠️ تم تحذيرك (${warnings[user]}/4) بسبب استخدام كلمات غير لائقة.` }, { quoted: message });
    } else if (warnings[user] === 2) {
      await client.sendMessage(from, { text: `⛔ تحذير ثاني (${warnings[user]}/4)! احترم الكلام.` }, { quoted: message });
    } else if (warnings[user] === 3) {
      await client.sendMessage(from, { text: `⚠️ هذا آخر تحذير (${warnings[user]}/4)! المرة القادمة سيتم طردك.` }, { quoted: message });
    } else if (warnings[user] >= 4) {
      await client.sendMessage(from, { text: `❌ تم طرد العضو بسبب كثرة الشتائم.` }, { quoted: message });
      try {
        await client.groupParticipantsUpdate(from, [user], "remove");
      } catch (e) {
        await client.sendMessage(from, { text: `❌ فشل في طرد العضو. تأكد أن البوت لديه صلاحيات مشرف.` });
      }
      warnings[user] = 0; // إعادة العد بعد الطرد
      fs.writeFileSync(warningsPath, JSON.stringify(warnings, null, 2));
    }
  }
};