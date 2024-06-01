const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Bu komutu kullanma izniniz yok.");

    // Komutun kullanımını kontrol edin
    if (args.length !== 1) return message.reply("Doğru kullanım: ,küfür <kanal_id>");

    const channelID = args[0]; // Kanal ID'si

    // Kanalın varlığını kontrol edin
    const channel = message.guild.channels.cache.get(channelID);
    if (!channel) return message.reply("Belirtilen kanal bulunamadı.");

    // Kanalı veritabanına kaydedin
    await db.set(`kufur-log.${message.guild.id}`, channelID);

    // Başarı mesajı gönderin
    message.channel.send(`Küfür log kanalı başarıyla ${channel} olarak ayarlandı.`);
};

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [`küfür`,`küfür-ayarla`],
    permLevel: 0 // İzin seviyesi gerektirebilir
};

exports.help = {
    name: 'Komut : [ĸüғür]',
    description: "",
    usage: ',küfür <kanal_id>'
};
