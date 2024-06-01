const Discord = require('discord.js');
const ms = require('ms'); // Süre hesaplama için ms modülünü ekleyin

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) // MANAGE_ROLES yetkisine sahip olmayanlara izin verme
        return message.reply("Bu komutu kullanma izniniz yok.");

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]); // Mute atılacak üye
    if (!member)
        return message.reply("Mutelenmesi gereken bir üye belirtmelisiniz.");

    if (member.hasPermission("MANAGE_MESSAGES")) // Yetkili veya botlara mute atılmasını engelle
        return message.reply("<a:ok:1213906376875839528> Bu üye'ye mute'atamazsın");

    let time = args[1]; // Mute süresi
    if (!time)
        return message.reply("Mute süresini belirtmelisiniz.");

    let reason = args.slice(2).join(' '); // Mute sebebi
    if (!reason)
        return message.reply("Mute sebebini belirtmelisiniz.");

    let muteRole = message.guild.roles.cache.find(role => role.name === "〔🔕〕・𝙼𝚞𝚝𝚎"); // Mute rolünü alın
    if (!muteRole) {
        return message.reply("Muted rolü bulunamadı. Lütfen bir Muted rolü oluşturun veya Muted rolünün adını değiştirin.");
    }

    // Mute rolünü verin ve süreyi ayarlayın
    await member.roles.add(muteRole);
    message.reply(`${member.user} başarıyla ${time} süreyle mutelendi.`);
  
    // Süre sonunda otomatik olarak mute'i kaldırma
    setTimeout(async () => {
        await member.roles.remove(muteRole);
        message.channel.send(`${member.user} süresi dolan mute'ini kaldırıldı.`);
    }, ms(time));

    // Log kanalına kayıt
    const logChannelID = "1214991734077923440"; // Log kanalının ID'si
    const logChannel = message.guild.channels.cache.get(logChannelID);
      message.delete().then(x => x.delete({timeout: 9000}));
    if (logChannel) {
        const muteEmbed = new Discord.MessageEmbed()
            .setThumbnail(member.user.avatarURL ({ dynamic: true})) 
            .setColor("#ff0000")
            .addField("<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[Kullanıcı]", `${member.user}`)
            .addField("<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[Yetkili]", `${message.author}`)
            .addField("<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[Süre]", time)
            .addField("<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[Sebep]", reason)
            .setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
            .setTimestamp();
        logChannel.send(muteEmbed);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['mute'],
    permLevel: 1 // Komutu kullanabilmek için gereken yetki seviyesi
};

exports.help = {
    name: 'Komut : [мυтe]',
    description: "",
    usage: ',mute @üye [<süre>] [sebeb]'
};
