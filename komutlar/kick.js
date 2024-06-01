const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    // Kick komutunun kullanılabilmesi için "KICK_MEMBERS" iznine sahip olunmalıdır
    if (!message.member.hasPermission('KICK_MEMBERS')) {
        return message.reply('Bu komutu kullanma izniniz yok.');
    }

    // Komutun doğru kullanımını kontrol etme
    if (args.length === 0) {
        return message.reply('Lütfen bir kullanıcı etiketleyin.');
    }

    const member = message.mentions.members.first();
    if (!member) {
        return message.reply('Belirtilen kullanıcı bulunamadı.');
    }

    // Kick işlemine neden olarak kullanıcıdan alınan argümanları birleştirme
    const reason = args.slice(1).join(' ') || 'Belirtilmedi';

    try {
        // Kullanıcıyı sunucudan atma işlemi
        await member.kick(reason);

        // Kick işlemini loglama
        const kickLogEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setThumbnail(member.user.avatarURL ({ dynamic: true})) 
            .addField('<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[𝚂𝚞𝚗𝚞𝚌𝚞𝚍𝚊𝚗 𝙰𝚝ı𝚕𝚍ı]', `${member.user}`,)
            .addField('<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[𝚂𝚎𝚋𝚎𝚋]', reason)
            .addField('<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[𝚈𝚎𝚝𝚔𝚒𝚕𝚒]', message.author)
            .setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
            .setTimestamp();

        const logChannel = message.guild.channels.cache.find(channel => channel.name === '→・kick'); // Log kanalını belirleme
        if (logChannel) {
            logChannel.send(kickLogEmbed);
        }
      
    } catch (err) {
        console.error('Kullanıcı yasaklanırken bir hata oluştu:', err);
        message.reply('Kullanıcı yasaklanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
};

module.exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`at`,`kick`],
    permLevel: 1
};

module.exports.help = {
    name: 'Komut : [ĸι̇cĸ]',
    description: "",
    usage: ',kick @üye'
};
