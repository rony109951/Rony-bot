const roasts = [
  "انت مش كوميدي، انت كوميدية حزينة.",
  "شكلك محتاج ريستارت... لحياتك.",
  "لو الغباء كان له صوت، انت كنت فرقة موسيقية.",
  "ذكائك الصناعي أقل من بطارية ريموت.",
  "لو كنت في مسابقة أغبى شخص، كنت خسرت... لأنك أغبى من أن تفوز.",
  "يا ريتك سايلنت زي تلفونك لما محدش بيكلمك.",
  "أنت زي إشعار بدون فايدة... دايمًا يطلع بدون سبب.",
  "لو في جائزة لأكتر واحد بيحاول وبيفشل... كنت هتخسرها برضو.",
  "انت نسخة تجريبية فاشلة من حد ممكن ينجح.",
  "كلامك زي البنج، بيخليني مش حاسس بأي عقل."
];

module.exports = {
  name: "تحميص",
  alias: ["roast", "حرق", "غلس"],
  description: "يرد بتحميص عشوائي لأي شخص",
  category: "مرح",

  async execute(client, message, args) {
    const taggedUser = message.mentionedJid?.[0];
    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    if (taggedUser) {
      return message.reply(`تحميص لـ @${taggedUser.split("@")[0]}:\n\n${roast}`, {
        mentions: [taggedUser]
      });
    } else {
      return message.reply(`تحميص:\n\n${roast}`);
    }
  },
};