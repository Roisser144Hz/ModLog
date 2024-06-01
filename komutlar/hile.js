const Discord = require('discord.js');

exports.run = function(client, message, args) {

    let sikayetkonu = args.slice(0).join(' ');
    if (sikayetkonu.length < 1) return message.channel.send('Kullanım: ,hile <şikayetiniz>').then(msg => msg.delete({timeout: 5000}));

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription('<:Yetkili:1049777855170621500>   \`・  𝚁 𝙾 𝙸 𝚂 𝚂 𝙴 𝚁 𝚁 ~ >  Şikayetiniz İletildi.\`   <:Yetkili:1049777855170621500>');
    message.channel.send(embed).then(msg => msg.delete({timeout: 5000}));

    const embed2 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setImage('https://cdn.discordapp.com/attachments/1208550491118764083/1212037889886658611/image.png?ex=65f0613f&is=65ddec3f&hm=9e6719b7300f7da0eedac266ca5a656a50970d08ac5b52f7c11dc739b009a54d&')
        .setDescription(`
-----------------------------------------------------

<:zula:1215231549642121276>    **𝚉ula 𝙷ile: 𝙰çan 𝙺ullanıcı:**       ${sikayetkonu}

<:Yetkili:1049777855170621500>    **𝙷ileyi: 𝙱ildiren 𝙺ullanıcı**   ${message.author}

-----------------------------------------------------`);

    client.channels.cache.get('1177237705399214141').send(embed2).then(async msj => {
        msj.react('🟢').then(() => msj.react('🔴'));
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hile'],
    permLevel: 0
};

exports.help = {
    name: 'Komut : [𝚑𝚒𝚕𝚎]',
    description: '',
    usage: ',hile <kullanıcı>'
};
