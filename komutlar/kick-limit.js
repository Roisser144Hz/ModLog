const db = require('quick.db');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komudu kullanmak için yeterli yetkiniz yok.');

  const arg = args[0];

  if (!arg) return message.reply('Limit belirlemek için bir sayı girmelisin, ya da özelliği kapatmak için `,kick-limit kapat` yazmalısın.');

  if (arg == 'kapa' || arg == 'kapat') {
    if (!db.has(`kicklimit_${message.guild.id}`)) return message.reply('Bu özellik zaten kapalı.');

    db.delete(`kicklimit_${message.guild.id}`);
    message.reply('Özellik başarıyla kapatıldı.');
  } else {
    if (isNaN(Number(arg))) return message.reply('Limiti belirlemek için bir **sayı** girmelisin.');

    db.set(`kicklimit_${message.guild.id}`, Number(arg));
    message.reply(`Kick limiti başarıyla \`${arg.toString()}\` olarak belirlendi. Artık sunucudaki yetkililer maksimum ${arg} kere kick atabileceklerdir.`);
  }
};

module.exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`at-limit`,`kick-limit`],
    permLevel: 1
};

module.exports.help = {
    name: 'Komut : [ĸι̇cĸ 2]',
    description: "",
    usage: ',kick,limit [<sayı>]'
};