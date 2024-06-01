const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");

exports.run =  async (client, message, args) => {
  
if(!['1116750023623987302'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(new MessageEmbed()                           
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setThumbnail(member.user.avatarURL ({ dynamic: true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
message.delete().then(x => x.delete({timeout: 9000}));
  
const tag = ''   
const zularol = message.guild.roles.cache.find(r => r.id === '1116750039860129794') //zula rol id
const kadin1 = message.guild.roles.cache.find(r => r.id === '1116750036060090368')//Kadin rol id
const kadinrol = message.guild.roles.cache.find(r => r.id == '1116750036060090368') //kadın rol id
const kadinrol2 = message.guild.roles.cache.find(r => r.id == '1116750073502630028')//kadın rol2 id
const kayıtsız = message.guild.roles.cache.find(r => r.id === '1116750038081732710')//kayıtsız id
const genelchat = message.guild.channels.cache.find(c => c.id === '1116750168147116143')//genelchat id
const savelog = message.guild.channels.cache.find(c => c.id === '1215009031182094466')//savelog

if(!zularol) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`<:roisser:1212998308914790441> 1. Zula rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

if(!kadin1) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`<:roisser:1212998308914790441> 2. Erkek rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

if(!kayıtsız) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`<:roisser:1212998308914790441> Kayıtsız rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(new MessageEmbed()
.setDescription(`<:roisser:1212998308914790441> ${message.author} rol vermek için kullanıcı belirtmelisin`)
.setColor('RED')).then(x => x.delete({timeout: 9000}));
  
let name = args[1]; // İkinci ismi buradan alıyoruz
let age = Number(args[2]) // Yaş bilgisini üçüncü indexten alıyoruz

if (!name || !name) return message.channel.send(new MessageEmbed()

.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`<:roisser:1212998308914790441> Bir isim belirtmelisin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(!age) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`<:roisser:1212998308914790441> Bir yaş belirtmelisin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(member.id === message.author.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`<:roisser:1212998308914790441> Kendini kayıt edemezsin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(member.id === client.user.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`<:roisser:1212998308914790441> Bot kayıt edemezsin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`<:roisser:1212998308914790441> Sunucu sahibini kayıt edemezsin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`<:roisser:1212998308914790441> Belirtilen kullanıcı sizden üst/aynı pozisyonda işleme devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

datab.add(`yetkili.${message.author.id}.zularol`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)

member.setNickname(`${name} [${age}]`)
member.roles.add(zularol)
member.roles.add(kadin1)
member.roles.remove(kayıtsız)

savelog.send(new MessageEmbed()
.setTimestamp()

.setThumbnail(member.user.avatarURL ({ dynamic: true})) 
             
.setDescription(`• ---------------------------------------------------------------- •

<a:ok:1213906376875839528>  • 【Ｚᴜʟᴀ 】 ${member} ${zularol} ${kadin1}

<a:ok:1213906376875839528>  • 【Ｙetkili 】 ${message.author}  【${alldata}】

<a:ok:1213906376875839528>  • 【 **${name} [${age}]** 】

• ---------------------------------------------------------------- •`)
             
.setColor('AQUA'))
.setThumbnail(message.author.avatarURL ({ dynamic: true})) 

datab.push(`isim.${message.guild.id}`, {userID: member.id, isim: name,  role: zularol.id})}
exports.conf = {enabled: true, guildOnly: true, aliases: ['zula-k', 'zk'], permLevel: 2}
exports.help = {
    name: 'Komut : [zυla]',
    description: "",
    usage: ',zk @üye [nick] [yaş]'
};
