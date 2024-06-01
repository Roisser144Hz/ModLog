const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Bu komutu kullanma izniniz yok.");

    // Komutun kullanımını kontrol edin
    if (args.length !== 1) return message.reply("Doğru kullanım: ,küfür-sıfırla <kanal_id>");

    // Veritabanından küfür log kanalını sil
    await db.delete(`kufur-log.${message.guild.id}`);

    // Başarı mesajı gönderin
    message.channel.send("Küfür log kanalı başarıyla sıfırlandı.");
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`küfür-sıfırla`,`ks`],
    permLevel: 0 // İzin seviyesi gerektirebilir
};

exports.help = {
    name: 'Komut : [ĸüғür-sıfırla]',
    description: "",
    usage: ',küfür-sıfırla'
};
