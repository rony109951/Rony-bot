const romanticPosts = [
  "أحببتك حتى أصبحت دقات قلبي تنطق باسمك.",
  "وجودك في حياتي هو الهدوء وسط كل ضجيج.",
  "كل لحظة معك هي نعمة لا توصف.",
  "أنت النبض اللي ما أقدر أعيش من دونه.",
  "قلبك وطن، وعيونك أمان.",
  "أحبك بعدد النجوم التي تزين سماء الليل.",
  "كل الطرق تؤدي إلى عينيك.",
  "معك، يصبح العالم مكانًا أجمل.",
  "كل مرة أشوفك فيها، أحبك من جديد.",
  "يا أجمل صدفة صارت في حياتي."
];

module.exports = {
  name: "رومانسي",
  alias: ["romanticpost", "حب", "بوست_رومانسي"],
  description: "يرسل بوست حب أو رومانسي عشوائي.",
  category: "رومانسيات",
  async execute(message, args, client) {
    const randomPost = romanticPosts[Math.floor(Math.random() * romanticPosts.length)];

    await client.sendMessage(message.chat, {
      text: `❤️ ${randomPost}`,
    }, { quoted: message });
  }
};