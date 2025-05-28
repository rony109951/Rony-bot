module.exports = {
    name: 'about',
    aliases: ['info', 'bot'],
    description: 'يعرض معلومات عن البوت',
    async execute(sock, msg, args) {
        const aboutText = `
اسم البوت: جمايكا
المطور: روني البحيره
رقم المطور: 01222843252
رقم البوت: 01224155567
النسخة: محسّنة وخالية من الأخطاء
        `;
        await sock.sendMessage(msg.key.remoteJid, { text: aboutText }, { quoted: msg });
    }
};