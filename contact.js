module.exports = {
  name: "المطور",
  alias: ["contact", "dev", "developer", "رقم_المطور"],
  description: "إرسال معلومات التواصل مع المطور.",
  category: "عام",

  async execute(message, args, client) {
    const developerNumber = "01222843252";
    const developerName = "روني البحيره";

    const contactMessage = `
*معلومات المطور:*
الاسم: ${developerName}
الرقم: wa.me/${developerNumber}

لو محتاج أي مساعدة أو عندك اقتراح، تواصل مع المطور مباشرة.
`;

    await client.sendMessage(message.chat, {
      text: contactMessage
    }, { quoted: message });
  }
};