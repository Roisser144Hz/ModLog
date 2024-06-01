const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args) => {
    let silinenMesajlarLogKanalı = message.mentions.channels.first()
    if (!silinenMesajlarLogKanalı) return message.channel.send('Silinen mesajların loglanacağı kanalı belirtmelisiniz.');

    // Kanal ID'sini veritabanında sakla
    db.set(`silinenMesajlarKanal_${message.guild.id}`, silinenMesajlarLogKanalı.id);

    return message.channel.send(`Silinen mesajlar log sistemi için kanal başarıyla ayarlandı: <#${silinenMesajlarLogKanalı.id}>`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sml'],
    permLevel: 0
};

exports.help = {
    name: 'Komut : [ѕι̇lι̇nen мeѕajlar ĸυr]',
    description: "",
    usage: ',sml <#kanal>'
};