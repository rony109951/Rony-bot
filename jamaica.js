const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require("path");
const P = require("pino");
const { exec } = require("child_process");
const { name, developer, devNumber } = require("./config");

const { state, saveState } = useSingleFileAuthState("./auth_info.json");

async function startJamaica() {
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({
    version,
    logger: P({ level: "silent" }),
    auth: state,
    printQRInTerminal: false,
  });

  sock.ev.on("creds.update", saveState);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.loggedOut) {
        console.log("📴 تم تسجيل الخروج من واتساب");
        process.exit();
      } else {
        startJamaica(); // إعادة الاتصال تلقائيًا
      }
    } else if (connection === "open") {
      console.log("✅ البوت شغال الآن باسم: " + name);
    }
  });

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";

    // أوامر بسيطة
    if (text === ".بوت") {
      await sock.sendMessage(from, { text: `البوت شغال يا معلم 😎\nالمطور: ${developer}` }, { quoted: msg });
    }

    if (text.toLowerCase() === "جمايكا") {
      const sender = msg.key.participant || msg.key.remoteJid;
      const response = sender.includes(devNumber)
        ? "قلب جمايكا🥹🌏"
        : "بس ياض";
      await sock.sendMessage(from, { text: response }, { quoted: msg });
    }

    // تنفيذ الأوامر من مجلد commands
    const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      if (command.pattern && new RegExp(command.pattern).test(text)) {
        try {
          await command.run(sock, msg, text, from);
        } catch (e) {
          console.log("❌ خطأ في تنفيذ الأمر:", file, e);
        }
      }
    }
  });
}

startJamaica();
