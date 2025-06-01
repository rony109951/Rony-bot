const { developer, devNumber } = require("../config");

module.exports = {
  pattern: "^.المطور$",
  run: async (sock, msg, text, from) => {
    await sock.sendMessage(from, { text: `👨‍💻 اسم المطور: ${developer}\n📞 رقم المطور: ${devNumber}` }, { quoted: msg });
  },
};