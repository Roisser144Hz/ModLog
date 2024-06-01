const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

if(!message.member.roles.cache.some(r => ["905630791118233602", "905630791118233602"].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
    message.delete().then(x => x.delete({timeout: 9000}));
 
 let kullanıcı = message.mentions.users.first()

if(!kullanıcı) {
let zula1 = db.fetch(`yetkili.${message.author.id}.zularol`);
let özel1 = db.fetch(`yetkili.${message.author.id}.özel`);
let erkek1 = db.fetch(`yetkili.${message.author.id}.erkek1`);
let kadin1 = db.fetch(`yetkili.${message.author.id}.kadin1`);
let kayıtlar = db.fetch(`yetkili.${message.author.id}.toplam`);
if(zula1 === null) zula1 = "0"
if(zula1 === undefined) zula1 = "0"
if(özel1 === null) özel1 = "0"
if(özel1 === undefined) özel1 = "0"
if(erkek1 === null) erkek1 = "0"
if(erkek1 === undefined) erkek1 = "0"
if(kadin1 === null) kadin1 = "0"
if(kadin1 === undefined) kadin1 = "0"
if(kayıtlar === null) kayıtlar = "0"
if(kayıtlar === undefined) kayıtlar = "0"
  
const sorgu1 = new MessageEmbed()
.setThumbnail(message.author.avatarURL ({ dynamic: true}))
.setTimestamp()
.setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
.addField(`<:Yetkili:1049777855170621500> Toplam [Kayıt] Kayıtların`, `\`【${kayıtlar}】\``)
.addField(`<:Yetkili:1049777855170621500> Toplam [Kadın] Kayıtların:`, `\`【${kadin1}】\``)
.addField(`<:Yetkili:1049777855170621500> Toplam [Erkek] Kayıtların:`, `\`【${erkek1}】\``)
.addField(`<:Yetkili:1049777855170621500> Toplam [Zula] Kayıtların:`, `\`【${zula1}】\``)
.addField(`<:Yetkili:1049777855170621500> Toplam [Özel] Kayıtların:`, `\`【${özel1}】\``)
.setColor('AQUA')
 return message.channel.send(sorgu1)
};
  
if(kullanıcı) {  
let erkek1 = db.fetch(`yetkili.${kullanıcı.id}.erkek`);
let zula = db.fetch(`yetkili.${message.author.id}.zularol`);
let özel1 = db.fetch(`yetkili.${message.author.id}.özel1`);
let kadin1 = db.fetch(`yetkili.${kullanıcı.id}.kadin1`);
let kayıtlar1 = db.fetch(`yetkili.${kullanıcı.id}.toplam`);
if(zula === null) zula = "0"
if(zula === undefined) zula = "0"
if(özel1 === null) özel1 = "0"
if(özel1 === undefined) özel1 = "0"
if(erkek1 === null) erkek1 = "0"
if(erkek1 === undefined) erkek1 = "0"
if(kadin1 === null) kadin1 = "0"
if(kadin1 === undefined) kadin1 = "0"
if(kayıtlar1 === null) kayıtlar1 = "0"
if(kayıtlar1 === undefined) kayıtlar1 = "0"
  //PROJENİN SAHİBİ GRAVİTY#2566
const sorgu2 = new MessageEmbed()
.setColor('AQUA')
.setThumbnail(kullanıcı.avatarURL ({ dynamic: true}))
.setTimestamp()
.setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
.addField(`<:Yetkili:1049777855170621500> Toplam [Kayıt] Kayıtların`, `\`【${kayıtlar1}】\``)
.addField(`<:Yetkili:1049777855170621500> Toplam [Kadın] Kayıtların:`, `\`【${kadin1}】\``)
.addField(`<:Yetkili:1049777855170621500> Toplam [Erkek] Kayıtların:`, `\`【${erkek1}】\``)
.addField(`<:Yetkili:1049777855170621500> Toplam [Zula] Kayıtların:`, `\`【${zula}】\``)
.addField(`<:Yetkili:1049777855170621500> Toplam [Özel] Kayıtların:`, `\`【${özel1}】\``)
 return message.channel.send(sorgu2)
  
};//PROJENİN SAHİBİ GRAVİTY#2566
  
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["stat", "kayıtlar", "kayıt-kontrol"],
    permLvl: 2,
}
  
exports.help = {
    name: 'Komut : [ĸayıтlar]',
    description: "",
    usage: ',𝚜𝚝𝚊𝚝'
}