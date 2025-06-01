module.exports = {
  pattern: "^.هلو$",
  run: async (sock, msg, text, from) => {
    await sock.sendMessage(from, { text: "هلا والله ✨" }, { quoted: msg });
  },
};