const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    // Ban komutunun kullanılabilmesi için "BAN_MEMBERS" iznine sahip olunmalıdır
    if (!message.member.hasPermission('BAN_MEMBERS')) {
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

    // Ban işlemine neden olarak kullanıcıdan alınan argümanları birleştirme
    const reason = args.slice(1).join(' ') || 'Belirtilmedi';

    try {
        // Kullanıcıyı sunucudan yasaklama işlemi
        await member.ban({ reason: reason });

        // Ban işlemini loglama
        const banLogEmbed = new Discord.MessageEmbed()
            .setThumbnail(member.user.avatarURL ({ dynamic: true})) 
            .setColor('#ff0000')
            .addField('<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[𝚂𝚞𝚗𝚞𝚌𝚞𝚍𝚊𝚗 𝚈𝚊𝚜𝚊𝚔𝚕𝚊𝚗𝚍ı]', `${member.user}`,)
            .addField('<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[𝚂𝚎𝚋𝚎𝚋]', reason)
            .addField('<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[𝚈𝚎𝚝𝚔𝚒𝚕𝚒]', message.author)
            .setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
            .setTimestamp();

        const logChannel = message.guild.channels.cache.find(channel => channel.name === '→・ban'); // Log kanalını belirleme
        if (logChannel) {
            logChannel.send(banLogEmbed);
        }
    } catch (err) {
        console.error('Kullanıcı yasaklanırken bir hata oluştu:', err);
        message.reply('Kullanıcı yasaklanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
};

module.exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`ban`],
    permLevel: 1
};

module.exports.help = {
    name: 'Komut : ,ban @üye',
    description: "",
    usage: '[вα̨n]'
};
