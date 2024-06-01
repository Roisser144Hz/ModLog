const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.guild) {
        return message.author.send('Bu komutu sadece sunucularda kullanabilirsiniz.');
    }

    const guild = message.guild;
    const roleCount = guild.roles.cache.size;
    const emojiCount = guild.emojis.cache.size;
    const boostCount = guild.premiumSubscriptionCount;
    const securityRoleCount = guild.roles.cache.filter(role => role.permissions.has('ADMINISTRATOR')).size;
    const staffCount = guild.members.cache.filter(member => member.hasPermission('ADMINISTRATOR')).size;
    const categoryCount = guild.channels.cache.filter(channel => channel.type === 'category').size;
    const textChannelCount = guild.channels.cache.filter(channel => channel.type === 'text').size;
    const voiceChannelCount = guild.channels.cache.filter(channel => channel.type === 'voice').size;
    message.delete().then(x => x.delete({timeout: 9000}));

    // Banlanmış kullanıcıları alma
    const bannedUsers = await guild.fetchBans();
    const bannedUserCount = bannedUsers.size;


    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .addField('<a:8onking:1215015475814076508> [Kullanıcı]', message.author.toString(), true)
        .addField('<a:8onking:1215015475814076508> [Üye´ler]', guild.memberCount, true)
        .addField('<a:8onking:1215015475814076508> [Bot´lar]', guild.members.cache.filter(member => member.user.bot).size, true)
        .addField('<a:8onking:1215015475814076508> [Ban´lar]', bannedUserCount, true)
        .addField('<a:8onking:1215015475814076508> [Rol´ler]', roleCount, true)
        .addField('<a:8onking:1215015475814076508> [Emoji´ler]', emojiCount, true)
        .addField('<a:8onking:1215015475814076508> [Boost´lar]', boostCount, true)
        .addField('<a:8onking:1215015475814076508> [Güvenlik´ler]', securityRoleCount, true)
        .addField('<a:8onking:1215015475814076508> [Yetkili´ler]', staffCount, true)
        .addField('<a:8onking:1215015475814076508> [Kanal´lar]', guild.channels.cache.size, true)
        .addField('<a:8onking:1215015475814076508> [Kategori´ler]', categoryCount, true)
        .addField('<a:8onking:1215015475814076508> [Metin´ler]', textChannelCount, true)
        .addField('<a:8onking:1215015475814076508> [Ses´ler]', voiceChannelCount, true)
        .setTimestamp()
        .setTitle("✘ <:klanlogo:1213835740228620358> [𝚁]ᴏɪssᴇʀʀ ✘ sᴜɴᴜᴄᴜ 𝚜𝚎𝚛𝚟𝚎𝚛 ʟɪsᴛᴇsɪ <:klanlogo:1213835740228620358> ✘")
        .setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
        .setThumbnail(guild.iconURL());

    // Her bir alt alta ekleme
    embed.addField('\u200B', '\u200B'); // Boş bir satır eklemek için

    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sunucu-istatistik', 'server'],
    permLevel: 0
};

exports.help = {
    name: 'Komut : [ѕυnυcυ вιlgι]',
    description: "",
    usage: ',server'
};
