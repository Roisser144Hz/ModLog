  const Discord = require('discord.js');
const data = require('quick.db');


exports.run = async (client, message, args) => {

message.channel.send(new Discord.MessageEmbed()
.setThumbnail('https://cdn.discordapp.com/avatars/686185592899633200/6499d2f1c46b106eed1e25892568aa55.webp?size=512')
.setFooter(`Ping: ${client.ws.ping.toFixed(0)}`, client.user.avatarURL({dynamic: true}))
.setDescription(`${message.author} **Sunucunun** kurulmasını onaylıyor musun? 😇

**Dipnot:** Bazı kanllar silinmemiş gibi görünebilir. Discord dan çıkıp girin düzelir.`)).then(resulter => {
resulter.react('✅').then(() => resulter.react('❌'));

const yesFilter = (reaction, user) => { return reaction.emoji.name === '✅' && user.id === message.guild.owner.user.id; };
const yes = resulter.createReactionCollector(yesFilter, { time: 0 });
const noFilter = (reaction, user) => { return reaction.emoji.name === '❌' && user.id === message.guild.owner.user.id; };
const no = resulter.createReactionCollector(noFilter, { time: 0 });

yes.on('collect', async reaction => {
message.guild.roles.cache.filter(a => !a.managed && a.name !== '@everyone' && a.position < message.guild.members.cache.get(client.user.id).roles.highest.position).forEach(role => role.delete('ok boomer') && console.log(role.name+' silindi sqrt'));
message.guild.channels.cache.forEach(a => a.delete());
});
  
message.guild.roles.create({ data: { name: '〔⼺〕・𝙺𝚕𝚊𝚗 𝙱𝚊𝚜𝚔𝚊𝚗𝚒' }, reason: 'ayn' }).then(role => {
role.setPermissions(['ADMINISTRATOR']);
role.setColor('#070719');

message.guild.roles.create({ data: { name: '〔⼺〕・𝙺𝚕𝚊𝚗 𝚈𝔬̈𝚗𝚎𝚝𝚒𝚌𝚒' }, reason: 'ayn' }).then(role => {
role.setPermissions(['ADMINISTRATOR']);
role.setColor('#070719');
});
  
message.guild.roles.create({ data: { name: '〔👑〕・𝚁𝚎𝚑𝚋𝚎𝚛' }, reason: 'ayn' }).then(role => {
role.setPermissions(['ADMINISTRATOR']);
role.setColor('#070719');
});
  
message.guild.roles.create({ data: { name: '〔👑〕・𝚈𝚊𝚛𝚍ı𝚖𝚌ı' }, reason: 'ayn' }).then(role => {
role.setPermissions(['ADMINISTRATOR']);
role.setColor('#070719');
});
  
message.guild.roles.create({ data: { name: '〔⼺〕・𝙰𝚍𝚖𝚒𝚗' }, reason: 'ayn' }).then(role => {
role.setPermissions(['ADMINISTRATOR']);
role.setColor('#070719');
});
  
message.guild.roles.create({ data: { name: '〔⼺〕・𝙼𝚘𝚍𝚎𝚛𝚊𝚝ö𝚛' }, reason: 'ayn' }).then(role => {
role.setPermissions(['ADMINISTRATOR']);
role.setColor('#070719');
});
  
message.guild.roles.create({ data: { name: '〔🔑〕・𝙺𝚊𝚍𝚛𝚘' }, reason: 'ayn' }).then(role => {
role.setPermissions(['ADMINISTRATOR']);
role.setColor('#070719');
});
  
message.guild.roles.create({ data: { name: '〔⼺〕・Vip' }, reason: 'ayn' }).then(s => s.setColor('#f4fa58'))
message.guild.roles.create({ data: { name: '〔⼺〕・𝚂𝚙𝚎𝚌𝚒𝚊𝚕' }, reason: 'ayn' }).then(s => s.setColor('#391680'))
});  
  
message.guild.channels.create('◥ ▬▬▬▬・ 𝚜𝚎𝚜・ ▬▬▬▬ ◤', {type: 'category'}).then(parent => {
message.guild.channels.create('🎮・Game𝚛~', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(0));
message.guild.channels.create('🔐・Özel ~', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(2));
message.guild.channels.create('🔊・Sesli ~', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(0));
message.guild.channels.create('🎶・Müzik ~', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(0));
});  

message.guild.channels.create('📌◥▬▬▬▬・ᴢᴜʟᴀ・▬▬▬▬◤', {type: 'category'}).then(parent => {
message.guild.channels.create('・🚧 𝚁𝚎𝚔𝚊𝚋𝚎𝚝', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(5));
message.guild.channels.create('・🚧 𝚂𝚊𝚋𝚘𝚝𝚊𝚓', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(8));  
message.guild.channels.create('・🚧 Ö𝚕ü𝚖 𝙼𝚊ç', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(18));
message.guild.channels.create('・🚧 𝙷𝚎𝚛𝚔𝚎𝚜𝚃𝚎𝚔', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(18));
message.guild.channels.create('・🚧 𝚃𝚍𝚖', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(18)); 
});
  
message.guild.channels.create('📌◥▬▬▬▬・ᴢᴜʟᴀ・▬▬▬▬◤', {type: 'category'}).then(parent => {
message.guild.channels.create('・🚧 𝚁𝚎𝚔𝚊𝚋𝚎𝚝', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(5));
message.guild.channels.create('・🚧 𝚂𝚊𝚋𝚘𝚝𝚊𝚓', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(8));  
message.guild.channels.create('・🚧 Ö𝚕ü𝚖 𝙼𝚊ç', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(18));
message.guild.channels.create('・🚧 𝙷𝚎𝚛𝚔𝚎𝚜𝚃𝚎𝚔', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(18));
message.guild.channels.create('・🚧 𝚃𝚍𝚖', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(18)); 
});
  
message.guild.channels.create('◥ ▬▬▬▬▬ ɢᴇɴᴇʟ ▬▬▬▬▬ ◤', {type: 'category'}).then(parent => {
message.guild.channels.create('→・𝚔𝚊𝚝ı𝚕𝚍ı', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('→・𝚢𝚎𝚝𝚔𝚒𝚕𝚒', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('→・𝚔𝚞𝚛𝚊𝚕𝚕𝚊𝚛', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('→・𝚜𝚘𝚑𝚋𝚎𝚝', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('→・ʙᴏᴛ', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('→・𝚐ö𝚛𝚜𝚎𝚕', {type: 'text'}).then(c => c.setParent(parent.id));
});
  
message.guild.channels.create('◥ ▬▬▬▬▬ ɢᴇɴᴇʟ ▬▬▬▬▬ ◤', {type: 'category'}).then(parent => {
message.guild.channels.create('→・𝚜𝚎𝚟𝚒𝚢𝚎', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('→・𝚜ö𝚣', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('→・öneri', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('→・oyun', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('→・ᴏwᴏ', {type: 'text'}).then(c => c.setParent(parent.id)); 
});      
  
message.guild.channels.create('♢▬▬▬「Yönetim」▬▬▬♢', {type: 'category'}).then(parent => {
message.guild.channels.create('📌・yetkili-şikayet', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('〔👑〕・𝙺𝚕𝚊𝚗 𝙱𝚊𝚜𝚔𝚊𝚗𝚒', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(10));
message.guild.channels.create('〔👑〕・𝙺𝚕𝚊𝚗 𝚈𝔬̈𝚗𝚎𝚝𝚒𝚌𝚒', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(10));
message.guild.channels.create('〔👑〕・𝙺𝚕𝚊𝚗 𝚅𝚒𝚙', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(10));
message.guild.channels.create('〔👑〕・𝙺𝚕𝚊𝚗 Çı𝚛𝚊𝚔', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(10));
message.guild.channels.create('〔👑〕・𝚁𝚎𝚑𝚋𝚎𝚛', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(10));
message.guild.channels.create('〔👑〕・𝚈𝚊𝚛𝚍ı𝚖𝚌ı', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(10));
message.guild.channels.create('〔👑〕・𝙰𝚍𝚖𝚒𝚗', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(10));
});
message.guild.channels.create('●▬▬▬▬๑「💎」๑▬▬▬▬●', {type: 'category'}).then(parent => {
message.guild.channels.create('💎 ・ [AFK] Room', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit());  
});

no.on('collect', async reaction => {
resulter.delete();
});

}) 


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kur','skur', 'sunucu-kur'],
  permLevel: 0
};

exports.help = {
  name: 'Komut : [𝚜𝚞𝚗𝚞𝚌𝚞-𝚔𝚞𝚛]',
  description: '',
  usage: ',sunucu-kur'
};