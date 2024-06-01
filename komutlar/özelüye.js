const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')//PROJENİN SAHİBİ GRAVİTY#2566
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");

exports.run =  async (client, message, args) => {
  
if(!['1116750023623987302'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('SEND_MESSAGES')) 
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
message.delete()
  
const tag = ''   
const özel1 = message.guild.roles.cache.find(r => r.id === '1116750032104861696') //özel erkek rol id
const erkekrol2 = message.guild.roles.cache.find(r => r.id === '1239990938273583145')//erkek rol 2 id
const kadınrol = message.guild.roles.cache.find(r => r.id == '') 
const kadınrol2 = message.guild.roles.cache.find(r => r.id == '') 
const kayıtsız = message.guild.roles.cache.find(r => r.id === '1116750038081732710')//kayıtsız id
const genelchat = message.guild.channels.cache.find(c => c.id === '1116750168147116143')//genelchat id
const savelog = message.guild.channels.cache.find(c => c.id === '1215009031182094466')//savelog id

if(!özel1) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`1. Erkek rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

if(!erkekrol2) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`2. Erkek rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

if(!kayıtsız) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Kayıtsız rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bir kullanıcı belirt.`)
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
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
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
datab.add(`yetkili.${message.author.id}.özel`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)

member.setNickname(`⼺ ${tag} ${name} [${age}]`)
member.roles.add(özel1)
member.roles.add(erkekrol2)
member.roles.remove(kadınrol)
member.roles.remove(kadınrol2)                    
member.roles.remove(kayıtsız)
savelog.send(new MessageEmbed()
.setDescription(`
• ---------------------------------------------------------------- •

<a:ok:1213906376875839528>  • 【𝙾̈zel 】 ${member}  ${özel1}  ${erkekrol2}

<a:ok:1213906376875839528>  • 【Ｙetkili 】 ${message.author}  【${alldata}】

<a:ok:1213906376875839528>  • 【 **${name} [${age}]** 】

• ---------------------------------------------------------------- •`)
.setColor('AQUA'))
.setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
.setThumbnail(message.author.avatarURL ({ dynamic: true})) 

                                                    //PROJENİN SAHİBİ GRAVİTY#2566                  // yas: age,
datab.push(`isim.${message.guild.id}`, {userID: member.id, isim: name,  role: özel1.id})}
exports.conf = {enabled: true, guildOnly: true, aliases: ['ö', 'özel'], permLevel: 2}
exports.help = {
    name: 'Komut : [özel]',
    description: "",
    usage: ',özel @üye [nick] [yaş]'
};