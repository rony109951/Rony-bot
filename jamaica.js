const {
  default: makeWASocket,
  useSingleFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");

const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require("path");

const { state, saveState } = useSingleFileAuthState("./auth_info.json");

async function startSock() {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`✅ Using WA version v${version.join(".")}, isLatest: ${isLatest}`);

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: state,
  });

  sock.ev.on("creds.update", saveState);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect?.error?.output?.statusCode) !== DisconnectReason.loggedOut;
      console.log("❌ Connection closed due to ", lastDisconnect?.error, ", reconnecting: ", shouldReconnect);
      if (shouldReconnect) {
        startSock();
      }
    } else if (connection === "open") {
      console.log("✅ تم الاتصال بالواتساب!");
    }
  });

  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.remoteJid;
    const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text;

    console.log(`📩 رسالة من ${sender}: ${messageContent}`);

    if (messageContent.startsWith(".بوت")) {
      await sock.sendMessage(sender, { text: "بوت جمايكا شغال ✨" }, { quoted: msg });
    }
  });
}

startSock();
