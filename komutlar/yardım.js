const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;
exports.run = async(client, message, member, args) => {
    let gold = await db.fetch(`gold_${message.member.id}`)
    let user = message.mentions.users.first() || message.author;

    // Gerekli rolün adı veya ID'si
    const requiredRole = "1215412989667057694";

    // Kullanıcının sahip olduğu rolleri al
    const userRoles = message.member.roles.cache.map(role => role.id);

    // Eğer kullanıcı gerekli role sahip değilse, komutu çalıştırmaya devam etme
    if (!userRoles.includes(requiredRole)) {
        return message.reply("Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.");
    }

    const yardimlistesi2 = new Discord.MessageEmbed()
        .setColor('AQUA')
        .setTimestamp()
        .setThumbnail(message.author.avatarURL ({ dynamic: true}))
        .setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
        .setDescription(` > <a:gelistirici:1050119158387458068> [-----------#Prefix-----------]
  > <a:8onking:1215015475814076508> **Merhaba <@${message.author.id}> Prefix: ${prefix}**
  > <a:gelistirici:1050119158387458068> [${prefix}zula @Üye [nick] [yaş]](https://discord.gg/4Ub25kD8fm)  **Zula Kayıt**
  > <a:gelistirici:1050119158387458068> [${prefix}erkek @Üye [isim] [yaş]](https://discord.gg/4Ub25kD8fm) **Erkek Kayıt**
  > <a:gelistirici:1050119158387458068> [${prefix}kız @Üye [isim] [yaş]](https://discord.gg/4Ub25kD8fm)   **Kız Kayıt**
  > <a:gelistirici:1050119158387458068> [${prefix}özelüye @Üye [isim] [yaş]](https://discord.gg/4Ub25kD8fm) **Özel Kayıt**
  > <a:gelistirici:1050119158387458068> [${prefix}kayıtsız @Üye](https://discord.gg/4Ub25kD8fm) **Kullanıcı Kayıtsız Atar**
  > <a:gelistirici:1050119158387458068> [${prefix}stat](https://discord.gg/4Ub25kD8fm) **Kullanıcı'nın Stats'ları**
  > <a:gelistirici:1050119158387458068> [${prefix}topteyit](https://discord.gg/4Ub25kD8fm) **Kullanıcı'nın Top istatistik'leri**
  > <a:gelistirici:1050119158387458068> [${prefix}büyükharf](https://discord.gg/4Ub25kD8fm) **Büyük Harf Ayarlar**
  > <a:gelistirici:1050119158387458068> [${prefix}küfür-sıfırla](https://discord.gg/4Ub25kD8fm) **Küfür Sıfırla**
  > <a:gelistirici:1050119158387458068> [${prefix}ban @Üye [sebeb]](https://discord.gg/4Ub25kD8fm) **Üye'yi Banlar**
  > <a:gelistirici:1050119158387458068> [${prefix}kick @Üye](https://discord.gg/4Ub25kD8fm) **Üye'yi Kick'ler**
  > <a:gelistirici:1050119158387458068> [${prefix}mute @Üye <süre> [sebeb]](https://discord.gg/4Ub25kD8fm) **Üye'yi Mute'ler**
  > <a:gelistirici:1050119158387458068> [${prefix}küfür](https://discord.gg/4Ub25kD8fm) **Küfür Koruma Ayarlar**
  > <a:gelistirici:1050119158387458068> [${prefix}sunucu-istatistik](https://discord.gg/4Ub25kD8fm) **Server İstatistikleri**
  > <a:gelistirici:1050119158387458068> [${prefix}yenile](https://discord.gg/4Ub25kD8fm) **Botu Yeniden Başlatır**
  > <a:gelistirici:1050119158387458068> [${prefix}hile](https://discord.gg/4Ub25kD8fm) **Hile Bildirimi Paylaşır**
  > <a:gelistirici:1050119158387458068> [${prefix}öneri](https://discord.gg/4Ub25kD8fm) **Öneri Paylaşır**
  > <a:gelistirici:1050119158387458068> [${prefix}edit](https://discord.gg/4Ub25kD8fm) **Botun Mesajını Düzenler**`)
  
  .setTimestamp()
  .setImage('https://cdn.discordapp.com/attachments/1208550491118764083/1212037889886658611/image.png?ex=65f0613f&is=65ddec3f&hm=9e6719b7300f7da0eedac266ca5a656a50970d08ac5b52f7c11dc739b009a54d&')
  .setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
    message.channel.send(yardimlistesi2);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yardım","y"],
  permLevel: 0
};

exports.help = {
    name: 'Komut : [𝚢𝚊𝚛𝚍ı𝚖 𝚕𝚒𝚜𝚝𝚎𝚜𝚒]]',
    description: "",
    usage: ',yardım'
};