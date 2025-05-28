const commands = require("./commands/commands");

module.exports = async (sock, m) => {
  const msg = m.messages[0];
  if (!msg.message) return;

  const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
  const sender = msg.key.remoteJid;
  if (!text) return;

  const send = (message) => sock.sendMessage(sender, { text: message });

  const args = text.trim().split(/\s+/);
  const commandName = args[0].toLowerCase();

  if (
    commandName === ".اوامر" ||
    commandName === ".مساعدة" ||
    commandName === ".الاوامر"
  ) {
    return commands.execute(sock, msg, args.slice(1));
  }

  switch (commandName) {
    case ".حول":
      return send("أنا بوت جمايكا 💀\nالمطور: روني البحيره\nرقم المطور: 01222843252");

    case ".الوقت":
      return send(`⏰ الوقت الحالي: ${new Date().toLocaleTimeString()}`);

    case ".التاريخ":
      return send(`📅 التاريخ اليوم: ${new Date().toLocaleDateString()}`);

    case ".اقتباس":
      return send("❝ لا تتوقف عندما تتعب، توقف عندما تنتهي. ❞");

    case ".نكتة":
      return send("😂 واحد دخل جيم طلع عضلة الضحك بس!");

    case ".ميمز":
      return send("🖼 جاري إرسال ميمز ...");

    case ".انمي":
      return send("🎌 انمي قادم ...");

    case ".رومانسي":
      return send("💕 لحظة رومانسية ...");

    case ".حزين":
      return send("😢 حزن ...");

    default:
      if (commandName.startsWith(".تنزيل")) {
        return send("📥 جاري التحميل من الرابط ...");
      }
      break;
  }
};
