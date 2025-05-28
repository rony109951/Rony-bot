const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");

const { state, saveState } = useSingleFileAuthState("./auth_info.json");

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
  });

  if (!sock.authState.creds.registered) {
    const number = "20XXXXXXXXXX"; // ← حُط رقمك هنا (رمز الدولة + الرقم بدون + أو مسافات)
    const code = await sock.requestPairingCode(number);
    console.log("🔑 رمز الاقتران الخاص بك:", code);
  }

  sock.ev.on("connection.update", (update) => {
    const { connection } = update;
    if (connection === "open") {
      console.log("✅ تم الاتصال بنجاح!");
    }
  });

  sock.ev.on("creds.update", saveState);
}

startBot();
