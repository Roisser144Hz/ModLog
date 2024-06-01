const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");

exports.run =  async (client, message, args) => {
  
if(!['1116750023623987302'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(new MessageEmbed()                           
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('AQUA'))
message.delete().then(x => x.delete({timeout: 9000}));
  
const tag = ''   
const erkekrol = message.guild.roles.cache.find(r => r.id === '1116750036995407922') //erkek rol id
const kayıtsız = message.guild.roles.cache.find(r => r.id === '1240083408605151332')//kayıtsız id
const kadinrol = message.guild.roles.cache.find(r => r.id == '1116750036060090368') //kadın rol id
const kadinrol2 = message.guild.roles.cache.find(r => r.id == '1116750073502630028')//kadın rol2 id
const genelchat = message.guild.channels.cache.find(c => c.id === '1116750168147116143')//genelchat id
const savelog = message.guild.channels.cache.find(c => c.id === '1215009031182094466')//savelog

if(!erkekrol) return message.channel.send(new MessageEmbed()
.setDescription(`1. Erkek rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

if(!kayıtsız) {
    return message.channel.send(new MessageEmbed()
        .setDescription(`Kayıtsız rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
        .setColor('AQUA'))
        .then(x => x.delete({timeout: 5000}));
}

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(new MessageEmbed()
.setDescription(`${message.author} rol vermek için bir kullanıcı belirt.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

let name = args[1]
let age = Number(args[2])

if(!name) return message.channel.send(new MessageEmbed()
.setDescription(`Bir isim belirtmelisin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

if(!age) return message.channel.send(new MessageEmbed()
.setDescription(`Bir yaş belirtmelisin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(member.id === message.author.id) return message.channel.send(new MessageEmbed()
.setDescription(`Kendini kayıt edemezsin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(member.id === client.user.id) return message.channel.send(new MessageEmbed()
.setDescription(`Bot kayıt edemezsin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed()
.setDescription(`Sunucu sahibini kayıt edemezsin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
.setDescription(`Belirtilen kullanıcı sizden üst/aynı pozisyonda işleme devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
  




datab.add(`yetkili.${message.author.id}.erkek1`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)
console.log(`Tag: ${tag}, Name: ${name}, Age: ${age}`);
member.setNickname(`ℭ ${tag} ${name} {${age}}`);


member.roles.add(erkekrol)
if (member.roles.cache.has(kadinrol.id)) {
  member.roles.remove(kadinrol);
}

if (member.roles.cache.has(kadinrol2.id)) {
  member.roles.remove(kadinrol2);
}  
                  
member.roles.remove(kayıtsız)
  
message.channel.send(new MessageEmbed()
.setThumbnail(member.user.avatarURL ({ dynamic: true}))
.setTimestamp()
.setImage('https://cdn.discordapp.com/attachments/1208550491118764083/1212037889886658611/image.png?ex=65f0613f&is=65ddec3f&hm=9e6719b7300f7da0eedac266ca5a656a50970d08ac5b52f7c11dc739b009a54d&')
.setDescription(`

• -------------------------------------------------- •

<:roisser:1212998308914790441>  •【Ｋullanıcı: 】 ${member} ${erkekrol}

<:roisser:1212998308914790441>  • 【Ｋ𝚊𝚗𝚊𝚕: 】 <#1196601005975027934>  【${alldata}】

<:roisser:1212998308914790441>  •【Ｙetkili: 】 ${message.author}

• -------------------------------------------------- •`) 
.setColor('AQUA')
.setTimestamp()
);
savelog.send(new MessageEmbed()
      
.setDescription(`• -------------------------------------------------------------- •

<:roisser:1212998308914790441>  • 【Ｋullanıcı: 】  ${member}   ${erkekrol}

<:roisser:1212998308914790441>  • 【Ｋ𝚊𝚗𝚊𝚕: 】 <#1196601005975027934>   【${alldata}】

<:roisser:1212998308914790441>  • 【Ｙetkili: 】    ${message.author}

• -------------------------------------------------------------- •`)
.setColor('AQUA'))
.setThumbnail(member.user.avatarURL ({ dynamic: true}))

datab.push(`isim.${message.guild.id}`, {userID: member.id, isim: name,  role: erkekrol.id})}
exports.conf = {enabled: true, permLevel: 1}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['erkek', 'e', 'boy', 'man', 'adam'],
    permLevel: 1
};

exports.help = {
    name: 'Komut : [erĸeĸ]',
    description: "",
    usage: ',erkek @üye [isim] [yaş]'
};