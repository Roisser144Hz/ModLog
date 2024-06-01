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
const kadinrol = message.guild.roles.cache.find(r => r.id === '1116750036060090368') //kadın rol id
const kadinrol2 = message.guild.roles.cache.find(r => r.id == '1116750036060090368') //kadin rol id 2
const kayıtsız = message.guild.roles.cache.find(r => r.id === '1240083457518997544')//kayıtsız rol id
const genelchat = message.guild.channels.cache.find(c => c.id === '1116750168147116143')//genel chat id
const savelog = message.guild.channels.cache.find(c => c.id === '1121879889214181516')//savelog id

if(!kadinrol) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`1. Kadın rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));


if(!kayıtsız) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Kayıtsız rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} rol vermek için bir kullanıcı belirt.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

let name = args[1]
let age = Number(args[2])

if(!name) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bir isim belirtmelisin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

if(!age) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bir yaş belirtmelisin.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(member.id === message.author.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Kendini kayıt edemezsin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

if(member.id === client.user.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bot kayıt edemezsin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Sunucu sahibini kayıt edemezsin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Belirtilen kullanıcı sizden üst/aynı pozisyonda işleme devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
  
  
datab.add(`yetkili.${message.author.id}.kadin1`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)

member.setNickname(`❀ ${tag} ${name} {${age}}`)
member.roles.add(kadinrol2)
if (member.roles.cache.has(kadinrol2.id)) {
  member.roles.remove(kadinrol2);
}

if (member.roles.cache.has(kadinrol2.id)) {
  member.roles.remove(kadinrol);
}

member.roles.remove(kayıtsız)

message.channel.send(new MessageEmbed()
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .setDescription(`
    
• -------------------------------------------------- •

<:roisser:1212998308914790441>  •【Ｋullanıcı: 】 ${member} ${kadinrol}

<:roisser:1212998308914790441>  • 【Ｋ𝚊𝚗𝚊𝚕: 】 <#1196601005975027934>  【${alldata}】

<:roisser:1212998308914790441>  •【Ｙetkili: 】 ${message.author}

• -------------------------------------------------- •`) 
                     
.setColor('AQUA')
.setThumbnail(member.user.avatarURL({ dynamic: true }))

);
savelog.send(new MessageEmbed()
.setDescription(`• -------------------------------------------------------------- •

<:roisser:1212998308914790441>  •【Ｋullanıcı: 】 ${member} ${kadinrol}

<:roisser:1212998308914790441>  • 【Ｋ𝚊𝚗𝚊𝚕: 】 <#1196601005975027934>  【${alldata}】

<:roisser:1212998308914790441>  •【Ｙetkili: 】 ${message.author}

• -------------------------------------------------------------- •`)
.setColor('AQUA'))

datab.push(`isim.${message.guild.id}`, {userID: member.id, isim: name, role: kadinrol.id})}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kız', 'k', 'female',],
    permLevel: 1
};

exports.help = {
    name: 'Komut : [ĸadın]',
    description: "",
    usage: ',kız @üye [isim] [yaş]'
};