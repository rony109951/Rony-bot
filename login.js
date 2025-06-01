const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { state, saveState } = useSingleFileAuthState("./auth_info.json");
const { number } = require("./config");

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
  });

  if (!sock.authState.creds.registered) {
    try {
      const code = await sock.requestPairingCode(number);
      console.log("\n✅ رابط التفعيل الخاص بك:");
      console.log(`👉 افتح واتساب > الأجهزة المرتبطة`);
      console.log(`🔑 الكود: ${code}\n`);
    } catch (err) {
      console.error("❌ فشل في طلب كود التفعيل:", err);
    }
  }

  sock.ev.on("connection.update", (update) => {
    const { connection } = update;
    if (connection === "open") {
      console.log("✅ تم الاتصال بنجاح!");
    } else if (connection === "close") {
      console.log("❌ تم قطع الاتصال. أعد تشغيل البوت.");
    }
  });

  sock.ev.on("creds.update", saveState);
}

startBot();
