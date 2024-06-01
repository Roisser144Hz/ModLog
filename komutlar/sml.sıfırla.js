const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async(client, message, args) => {
    message.delete({timeout: 3000});
  
  // Gerekli rolün adı veya ID'si
    const requiredRole = "1215412989667057694";

    // Kullanıcının sahip olduğu rolleri al
    const userRoles = message.member.roles.cache.map(role => role.id);

    // Eğer kullanıcı gerekli role sahip değilse, komutu çalıştırmaya devam etme
    if (!userRoles.includes(requiredRole)) {
        return message.reply("Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.");
    }

    // Veritabanından silinen mesajlar log kanalının ID'sini sıfırla
    db.delete(`silinenmesajlarveri_${message.guild.id}`);
    
    // Kullanıcıya bilgi mesajını gönder ve 10 saniye sonra sil
    return message.channel.send(`\`Silinen mesajlar log sistemi için kanal başarılı bir şekilde sıfırlandı.\``).then(msg => msg.delete({timeout: 10000}));
};

exports.conf = {
    enabled: true, 
    guildOnly: true,
    aliases: ['sml-sıfırla'],
    permLevel: 1
};

exports.help = {
    name: 'Komut : [ѕι̇lι̇nen мeѕajlar ѕıғırla]',
    description: "",
    usage: ',sml sıfırla <#kanal>'
};