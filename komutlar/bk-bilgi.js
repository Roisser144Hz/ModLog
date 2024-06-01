const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    // Gerekli izinleri kontrol et
    if (!message.member.hasPermission('BAN_MEMBERS') && !message.member.hasPermission('KICK_MEMBERS') && !message.member.hasPermission('MUTE_MEMBERS')) {
        return message.channel.send("Bu komutu kullanma izniniz yok.");
    }

    // Banlanan üyeler
    const bannedUsers = await message.guild.fetchBans();
    const bannedList = bannedUsers.map(user => `<@${user.user.id}>`).join('\n');

    // Kicklenen üyeler
    const kickAudit = await message.guild.fetchAuditLogs({ type: 'MEMBER_KICK', limit: 100 });
    const kickList = kickAudit.entries.map(entry => `<@${entry.target.id}>`).join('\n');

    // Mute edilen üyeler
    const muteRole = message.guild.roles.cache.find(role => role.name === "〔🔕〕・𝙼𝚞𝚝𝚎");
    const mutedList = message.guild.members.cache.filter(member => member.roles.cache.has(muteRole.id)).map(member => `<@${member.user.id}>`).join('\n');

    // Zaman aşımına uğrayan üyeler
    const inactiveMembers = message.guild.members.cache.filter(member => {
        const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 gün önce
        return member.joinedAt < weekAgo;
    }).map(member => `<@${member.user.id}>`).join('\n');

    // Embed oluşturma
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .addField('<:register:1214918420017971221> #вαηlar', bannedList.split('\n').length || 'Banlanan üye bulunmamakta.')
        .addField('<:register:1214918420017971221> #кι̇cкler', kickList.split('\n').length || 'Kicklenen üye bulunmamakta.')
        .addField('<:register:1214918420017971221> #мυтεler', mutedList.split('\n').length || 'Mutelenen üye bulunmamakta.')
        .addField('<:register:1214918420017971221> #zαмαη aşıмı', inactiveMembers.split('\n').length || 'Zaman aşımı üye bulunmamakta.')
        .setImage('https://cdn.discordapp.com/attachments/1208550491118764083/1212037889886658611/image.png?ex=65f0613f&is=65ddec3f&hm=9e6719b7300f7da0eedac266ca5a656a50970d08ac5b52f7c11dc739b009a54d&')
        .setTimestamp();

    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sunucu-istatistik'],
    permLevel: 1
};

exports.help = {
    name: 'Komut : [ι̇ѕтaтιѕтιĸ]',
    description: '',
    usage: ',sunucu-istatistik'
};
