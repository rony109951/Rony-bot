const fs = require("fs");
const path = require("path");
const vipFile = path.join(__dirname, "../vip.json");

module.exports = {
  name: "مساعدة_vip",
  alias: ["viphelp", "مساعدة_في_اي_بي"],
  description: "يعرض أوامر VIP الخاصة",
  category: "الـ VIP",
  async execute(client, message) {
    const sender = message.sender.split("@")[0];
    
    // تحميل قائمة VIP
    let vipList = [];
    if (fs.existsSync(vipFile)) {
      vipList = JSON.parse(fs.readFileSync(vipFile));
    }

    // التأكد إذا المستخدم VIP
    if (!vipList.includes(sender)) {
      return message.reply("❌ هذا الأمر مخصص فقط لأعضاء VIP.");
    }

    // رسالة الأوامر الخاصة بـ VIP
    const helpMessage = `
*📛 أوامر الـ VIP:*
1. .زواج – اطلب الزواج من شخص
2. .طلاق – تطلق من شخص
3. .منشن – منشن الجميع
4. .احذف_في_اي_بي – حذف عضو من VIP (خاص بالمطور)
5. .اضف_في_اي_بي – إضافة عضو إلى VIP (خاص بالمطور)
6. .مساعدة_vip – عرض هذه القائمة

*ملاحظة:* هذه الأوامر متاحة فقط للمستخدمين المضافين في قائمة VIP.
    `.trim();

    return message.reply(helpMessage);
  },
};