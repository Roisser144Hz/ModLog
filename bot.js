const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
var prefix = ayarlar.prefix;
const log = message => {
console.log(`${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

//------------------------------ BOT ------------------------------------\\

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//------------------------------ BOT ------------------------------------\\
client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//------------------------------ BOT ------------------------------------\\
client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

//------------------------------ BOT OYNUYOR ------------------------------------\\

client.on("ready", async () => {
    await client.user.setStatus("dnd"); // Botun durumunu çevrim içi ve rahatsız etme modunda ayarlar
    await client.user.setActivity("👑・ (Prefix) ,yardım"); // Botun görünüşünü ayarlar
});

//------------------------------ Boost ------------------------------------\\

client.on('guildMemberBoost', (member) => {
    let kanal = client.channels.cache.get('1213457313927794688');
    if (!kanal) return console.error("Kanal bulunamadı."); // Kanal kontrolü
    kanal.send(`<a:8onking:1215015475814076508> ${member.user} Kullanıcı Sunucumuza Boost Bastı Teşekkür Ederim <:kalp:1125442064163799160>`);
});

//------------------------------ Boost [2] ------------------------------------\\
const { EmbedBuilder } = require('discord.js');

client.on('guildMemberUpdate', (oldMember, newMember) => {
    // Kullanıcının boost sonlandırıp sonlandırmadığını kontrol et
    if (oldMember.premiumSince && !newMember.premiumSince) {
        const embed = new EmbedBuilder()
            .setDescription(`${newMember.user} Kullanıcı Sunucuda [Boost]'u <t:${Math.floor(Date.now() / 1000)}:R> sonlandırdı`)
            .setColor('RED')
            .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        const channel = client.channels.cache.get('1243589673180201041'); // Buraya kanal ID'nizi yazın

        if (channel) {
            channel.send({ content: '', embeds: [embed] }).catch(console.error);
        } else {
            console.error('Kanal bulunamadı.');
        }
    }
});

//-------------------------------------ZULA TEPKİ-------------------------------------------------\\

  client.on("message", async message => {

  if(message.channel.id !== "1198194722632634398") return;
  message.react("959546845472899162")
  message.react("906188696787755038")
  message.react("1213906376875839528")
  message.react("1215015473205223524")
  message.react("1215231549642121276")
  })

//-------------------------------------YETKİLİ TEPKİ-------------------------------------------------\\

  client.on("message", async message => {

  if(message.channel.id !== "1172235039468163152") return;
  message.react("1215015477563097148")
  message.react("1049777855170621500")
  message.react("959929118525374527")
  message.react("1215015475814076508")
  message.react("1013585952620425287")
  message.react("959547111052025906")
  })

//-------------------------------------YOUTUBE TEPKİ-------------------------------------------------\\

  client.on("message", async message => {

  if(message.channel.id !== "1215297760660562011") return;
  message.react("1215015475814076508")
  message.react("906188696787755038")
  message.react("1213835740228620358")
  message.react("1215231549642121276")
  message.react("1049777853371273306")
  message.react("950099506844827689")
  })

//-------------------------------------SES LOGLAR-------------------------------------------------\\

client.on("voiceStateUpdate", async (oldState, newState) => {
    const seslog = client.channels.cache.get("1224284556195135488"); // Kanal ID
    if (oldState.member.user.bot || newState.member.user.bot) return;

    if (!oldState.channel && newState.channel) {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`<a:duyuru2:1050116111712124958> ${newState.member.user} **${newState.channel}** \     🟢 【**giriş yaptı**】`);
        seslog.send(embed);
    }
});


//-------------------------------------SES LOGLAR [2]-------------------------------------------------\\

    client.on("voiceStateUpdate", async (oldState, newState) => {

    const seslog = client.channels.cache.get("1224284556195135488"); // KANAL ID
    if (oldState.member.user.bot || newState.member.user.bot) return;

    if (oldState.channel && !newState.channel) {
        const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`<a:duyuru2:1050116111712124958> ${oldState.member.user} **${oldState.channel}** \      🔴 【**çıkış yaptı**】`);
        seslog.send(embed);
    }
});

//-------------------------------------SES LOGLAR [3]-------------------------------------------------\\

    client.on("voiceStateUpdate", async (oldState, newState) => {
    const seslog = client.channels.cache.get("1224284556195135488"); // KANAL ID
    if (oldState.member.user.bot || newState.member.user.bot) return;

    if (oldState.serverMute === false && newState.serverMute === true) {
        const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`<a:duyuru2:1050116111712124958> ${oldState.member.user} ${newState.channel}  🔈 【**susturuldu**】`);
        seslog.send(embed);
    }
    if (oldState.serverMute === true && newState.serverMute === false) {
        const embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setDescription(`<a:duyuru2:1050116111712124958> ${oldState.member.user} ${newState.channel}  🔊 【**susturlmanız kaldırıldı**】`);
        seslog.send(embed);
    }
    if (oldState.serverDeaf === false && newState.serverDeaf === true) {
        const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`<a:duyuru2:1050116111712124958> ${oldState.member.user} ${newState.channel}  🔇 【**sağırlaş'tırıldınız**】`);
        seslog.send(embed);
    }
    if (oldState.serverDeaf === true && newState.serverDeaf === false) {
        const embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setDescription(`<a:duyuru2:1050116111712124958> ${oldState.member.user} ${newState.channel}  🔉 【**sağırlaş'manız kaldırıldı**】`);
        seslog.send(embed);
    }
});

//-------------------------------------SES LOGLAR [4]-------------------------------------------------\\
    client.on("voiceStateUpdate", async (oldState, newState) => {
    const seslog = client.channels.cache.get("1224284556195135488"); // KANAL ID
    if (oldState.member.user.bot || newState.member.user.bot) return;

    if (oldState.selfVideo === false && newState.selfVideo === true) {
        const embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setDescription(`<a:duyuru2:1050116111712124958> ${oldState.member.user} ${newState.channel}     📷 【**kamera yayını açtı**】`);
        seslog.send(embed);
    }
    if (oldState.selfVideo === true && newState.selfVideo === false) {
        const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`<a:duyuru2:1050116111712124958> ${oldState.member.user} ${newState.channel}   📷 【**kamera yayını kapattı**】`);
        seslog.send(embed);
    }
});

//-------------------------------------SES LOGLAR [5]-------------------------------------------------\\

    client.on("voiceStateUpdate", async (oldState, newState) => {
    const seslog = client.channels.cache.get("1224284556195135488"); // KANAL ID
    if (oldState.member.user.bot || newState.member.user.bot) return;

    if (!oldState.streaming && newState.streaming) {
        const embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setDescription(`<a:duyuru2:1050116111712124958> ${newState.member.user} ${newState.channel}   🎥 【**canlı yayını açtı**】`);
        seslog.send(embed);
    }
    if (oldState.streaming && !newState.streaming) {
        const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`<a:duyuru2:1050116111712124958> ${oldState.member.user} ${oldState.channel}   🎥 【**canlı yayını kapattı**】`);
        seslog.send(embed);
    }
});

//-------------------------------------# • SES LOGLAR [6]-------------------------------------------------\\

    client.on("voiceStateUpdate", async (oldState, newState) => {
    const seslog = client.channels.cache.get("1224284556195135488"); // KANAL ID
    if (oldState.member.user.bot || newState.member.user.bot) return;

    if (oldState.channel && newState.channel && oldState.channel !== newState.channel) {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`<:roisser:1212998308914790441> ${newState.member.user} ${oldState.channel} ⬅️ ➡️ ${newState.channel}`);
        seslog.send(embed);
    }
});


//-------------------------------------# • Yetki [Yetkili]-------------------------------------------------\\

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    let kanalID = "1172235039468163152";
    let rolID = "1173034517414563970";
    if (oldMember.guild.id !== '901554012795568138') return;
    if (oldMember._roles === newMember._roles) return;
    if (oldMember.roles.cache.has(rolID)) return;
    if (!newMember.roles.cache.has(rolID)) return;

    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('<:register:1214918420017971221> Sunucuda Yeni [Yetkili] Üye Eklendi Teşekkürler Dileriz <:kalp:1125442064163799160>')
        .setDescription(`<:mod:1013585952620425287> ${newMember.user} Sunucumuzda <@&${rolID}> Katıldı \n\n<:mod:1013585952620425287> <#1164152717279772682> <#1176705516655890483> <:Duyuru:1049777853371273306>`);

    client.channels.cache.get(kanalID).send(embed);
});

//-------------------------------------# • Yetki [Admin]-------------------------------------------------\\

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    let kanalID = "1172235039468163152";
    let rolID = "1116750004959322174";
    if (oldMember.guild.id !== '901554012795568138') return;
    if (oldMember._roles === newMember._roles) return;
    if (oldMember.roles.cache.has(rolID)) return;
    if (!newMember.roles.cache.has(rolID)) return;

    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('<:register:1214918420017971221> Sunucuda Yeni [Yetkili] Üye Eklendi Teşekkürler Dileriz <:kalp:1125442064163799160>')
        .setDescription(`<:mod:1013585952620425287> ${newMember.user} <@&${rolID}> [**Roller**]\n\n<:mod:1013585952620425287> <#1164152717279772682> <#1176705516655890483> <#1196600460119904346> [**Kanallar**]`);

    client.channels.cache.get(kanalID).send(embed);
});

//-------------------------------------# • Yetki [Loglar]-------------------------------------------------\\

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    let kanalID = "1172235039468163152";
    let rolID = "1215235417872269363";
    if (oldMember.guild.id !== '901554012795568138') return;
    if (oldMember._roles === newMember._roles) return;
    if (oldMember.roles.cache.has(rolID)) return;
    if (!newMember.roles.cache.has(rolID)) return;

    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('<:register:1214918420017971221> Sunucuda Yeni [Log Kanallar] Üye Eklendi Teşekkürler Dileriz <:kalp:1125442064163799160>')
        .setDescription(`<:mod:1013585952620425287> ${newMember.user} <@&${rolID}> [**Roller**]\n\n<:mod:1013585952620425287> <#1164152717279772682> <#1176705516655890483> <#1196600460119904346> [**Kanallar**]`);

    client.channels.cache.get(kanalID).send(embed);
});


//---------------------------------------# • Hoş Geldin Log--------------------------------------\\

client.on('guildMemberAdd', async member => {
    await member.roles.add('1116750038081732710'); // Verilecek rolün ID'si (unregistered)
    let member2 = member.user;
    let zaman = new Date().getTime() - member2.createdAt.getTime();
    let user = member2;
    let takizaman;
    if (zaman < 129600000) {
        takizaman = 'Tehlikeli bilader, a desen seni bıçaklar';
    } else {
        takizaman = 'Güvenli, gizli sırrımızı öğrenebilir';
    }
    require('moment-duration-format');
    let zaman1 = new Date().getTime() - user.createdAt.getTime();
    const gecen = moment.duration(zaman1).format('YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye]');
    let message = member.guild.channels.cache.get('1196601005975027934'); // Kanal ID'si (örn: register-chat)

    // Avatar URL'sini al
    const avatarURL = member.user.displayAvatarURL({ dynamic: true, size: 4096 });

    const taki = new Discord.MessageEmbed()
        .setTitle('<a:ok:1213906376875839528> 𝙷𝚘ş 𝙶𝚎𝚕𝚍𝚒𝚗 𝚂𝚞𝚗𝚞𝚌𝚞𝚖𝚞𝚣𝚊 𝙺𝚊𝚢ı𝚝 𝙾𝚕𝚞𝚗𝚞𝚣')
        .setDescription(`

◥ ▬▬▬▬▬▬▬▬▬ #Üye ▬▬▬▬▬▬▬▬ ◤
    <a:ok:1213906376875839528> • ${member} [**sunucuya katıldı seninle**] **[${message.guild.memberCount}]** kişi
    ◥ ▬▬▬▬▬▬▬▬▬ #Rol ▬▬▬▬▬▬▬ ◤
    <a:ok:1213906376875839528> • <@&1116750023623987302> [**seninle ilgilenecek'tir**]
    ◥ ▬▬▬▬▬▬▬▬▬ #Durum ▬▬▬▬▬▬▬ ◤
    <a:ok:1213906376875839528> • **[Hesap Kuruluş Tarihi]:** [<t:${Math.floor(member.user.createdAt / 1000)}:f>]
    <a:ok:1213906376875839528> • **[Sunucuya Katılma Tarihi]:** [<t:${Math.floor(member.joinedTimestamp / 1000)}:f>]
    <a:ok:1213906376875839528> • **[Güven]:** **[${takizaman}]**
    ◥ ▬▬▬▬▬▬▬▬▬ #Sunucu ▬▬▬▬▬▬▬ ◤
    <a:ok:1213906376875839528> • **[Sunucu Kuruluş Tarihi]:** [<t:${Math.floor(member.guild.createdTimestamp / 1000)}:f>]
    
`)
        .setColor('RED')
        // Gifli ya da gifsiz avatarı ekle
        .setThumbnail(avatarURL)
        // Güvenilirlik durumunu ekle
    message.send(taki);
});
//----------------------------------------# • Hoş Geldin Mesaj----------------------------------------\\

 client.on('guildMemberAdd', member => {
    if (member.bot) return;
    const welcomeChannel = client.channels.cache.get('1196600269677535232');
    
    const welcomeEmbed = new Discord.MessageEmbed()
        .setDescription(`<:register:1214918420017971221> [**𝚈𝚎𝚗𝚒 [Ü𝚢𝚎] 𝙺𝚊𝚝ı𝚕𝚍ı**] **${member}** <a:8onking:1215015475814076508>\n \n<:Duyuru:1049777853371273306> [𝚂𝚞𝚗𝚞𝚌𝚞 𝙺𝚞𝚛𝚊𝚕𝚕𝚊𝚛ı𝚖ı𝚣] <#1164152717279772682> <a:8onking:1215015475814076508>`)
        .setColor('#0099ff')
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
    
    welcomeChannel.send(welcomeEmbed).then(msg => msg.delete({ timeout: 900000 }));
});

//----------------------------------------# • Fake Katıl-------------------------------------------------\   

client.on('message', async message => {
if (message.content === '.fk') {
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});

//----------------------------------------# • İsim Yaş-------------------------------------------------//

client.on("guildMemberAdd", member => {
  member.setNickname('・#𝙽𝚒𝚌𝚔 𝚟𝚎 #𝚈𝚊ş').catch(console.error);
});

//----------------------------------------# • Link-------------------------------------------------//

client.on("message", async msg => {
    var reklamDurumu = await db.fetch(`reklam_${msg.guild.id}`);

    if (reklamDurumu == 'acik') {
        const reklamListesi = [".com", ".net", ".hub", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg"];

        if (reklamListesi.some(word => msg.content.includes(word))) {
            try {
                if (!msg.member.hasPermission("BAN_MEMBERS")) {
                    // Reklam içeren mesajı sil
                    msg.delete();

                    // Log kanalını bul
                    const logKanal = msg.guild.channels.cache.find(channel => channel.name === '→・link');

                    // Eğer log kanalı varsa bilgi gönder
                    if (logKanal) {
                        // Kullanıcının avatarını al
                        const avatarURL = msg.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 });

                        const reklamYapildiEmbed = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setDescription(`
          <a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>**[Link Atan Kişi]:** ${msg.author} 
          
          <a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>**[Link İçeriği]:** ${msg.content}
          
          <a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>**[Link Attığı Kanal]: **${msg.channel.name}`)
                            .setThumbnail(avatarURL) // Kullanıcının avatarını ekler
                            .setTimestamp();
                        
                        logKanal.send(reklamYapildiEmbed);
                    } else {
                        console.log('Log kanalı bulunamadı!');
                    }

                    // Kullanıcıya uyarı mesajı gönder
                    msg.reply('Bu Sunucuda Reklam Engelleme Filtresi Aktiftir. Reklam Yapmana İzin Veremem !').then(msg => msg.delete({ timeout: 110000 }));
                }
            } catch(err) {
                console.log(err);
            }
        }
    } else if (reklamDurumu == 'kapali') {
        // Reklam engelleme kapalıysa herhangi bir işlem yapma
    }
});



//----------------------------------------# • Link-------------------------------------------------//

//-------------------------------------------------# • Capslock-------------------------------------------------//

client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`<:Yetkili:1049777855170621500> ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte <:Duyuru:1049777853371273306>`).then(m => m.delete(3000))
     }
       }
     }
   }
  }
});



//-------------------------------------------------# • Küfür------------------------------------------------\\  
client.on('message', async message => {
    if (message.author.bot || message.channel.type === 'dm') return;

    // Küfür log kanalını kontrol edin
    const kufurLogChannelID = await db.get(`kufur-log.${message.guild.id}`);
    if (!kufurLogChannelID) return; // Küfür log kanalı ayarlanmamışsa işlem yapmayın

    const kufur = [
        "oç",
        "göt",
        "aq",
        "amk",
        "sik",
        "orospu oğlu",
        "oğlu",
        "çocuk",
        "anan",
        "orospuçocuğu",
        "orospu çocuğu",
        "orospu",
        "ananı sikerim",
        "ananı siktim",
        "ananısikerim",
        "döl",
        "mk",
        "urusbu",
        "amcuk",
        "amcık",
        "vajina",
        "am",
        "amını yalarım",
        "amını sikerim",
        "allah",
        "siktir",
        "sikim",
        "yarrak",
        "kahpe",
        "kahbe",
        "piç kurusu",
        "sikiyim",
        "amks",
        "mq",
        "ak",
        "boşal",
        "boşaldım",
        "anana boşaldım",
        "amına boşal",
        "amına boşaldım",
        "amını yedim",
        "annene boşaldım",
        "sikimi ye",
        "skm seni",
        "sikim seni",
        "sg",
        "sq",
        "mk",
        "göt",
        "amk",
        "amq",
        "aq",
        "orospu",
        "oruspu",
        "oç",
        "sikerim",
        "yarrak",
        "piç",
        "amq",
        "sik",
        "amcık",
        "çocu",
        "sex",
        "seks",
        "amına",
        "orospu çocuğu",
        "sg",
        "siktir git"
    ];

    // Mesaj içeriğinde küfür var mı kontrol edin
    if (kufur.some(k => message.content.toLowerCase().includes(k))) {
        // Küfür log kanalını alın
        const kufurLogChannel = message.guild.channels.cache.get(kufurLogChannelID);
        if (!kufurLogChannel) return console.error("Küfür log kanalı bulunamadı.");

        // Küfürü loglayın
        const kufurLogEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .addField('<a:ok:1213906376875839528> [Küfür Etti]', `${message.author}`)
            .addField('<a:ok:1213906376875839528> [Küfür Kanal]', message.channel.name)
            .addField('<a:ok:1213906376875839528> [Küfür Mesajı]', message.content)
            .setTimestamp();

        kufurLogChannel.send(kufurLogEmbed);
        
        // Küfürlü mesajı sil
        message.delete().catch(console.error);
      
      // Küfür etmeyin uyarısı ekle
        message.channel.send(`⛔ **${message.author}** sunucuda (**küfür**) etmeyiniz yoksa [**mute**] ' yersiniz <:Duyuru:1049777853371273306>`);
    }
});

//-------------------------------------------------# • Pp Log------------------------------------------------\\

client.on('userUpdate', (oldUser, newUser) => {
  let kişi = client.users.cache.get(newUser.id);
  let avatar = kişi.avatarURL({ format: 'png', dynamic: true });
  let avatarr = kişi.avatarURL({ format: 'gif', dynamic: true });
  let banner = newUser.bannerURL({ format: 'png', dynamic: true });
  let bannerGif = newUser.bannerURL({ format: 'gif', dynamic: true });
  let kanal = client.channels.cache.find(ch => ch.id === '1239950115293102182'); // Gifsiz Avatar Kanal İd
  let kanal1 = client.channels.cache.find(ch => ch.id === '1239950131630047336'); // Gifli Avatar Kanal İd
  let bannerKanal = client.channels.cache.find(ch => ch.id === '1243577008747843695'); // Gifsiz Banner Kanal İd
  let gifliBannerKanal = client.channels.cache.find(ch => ch.id === '1243577119020159026'); // Gifli Banner Kanal İd

  if (avatar.endsWith('.png')) {
    const emb = new Discord.MessageEmbed()
      .setImage(avatar)
      .setTimestamp()
      .setDescription(`${kişi} adlı kullanıcının avatarı değişti!`);
    kanal.send(emb);
  }
  
  if (avatar.endsWith('.gif')) {
    const emb = new Discord.MessageEmbed()
      .setImage(avatar)
      .setTimestamp()
      .setDescription(`${kişi} adlı kullanıcının avatarı değişti!`);
    kanal1.send(emb);
  }

  if (banner) {
    const emb = new Discord.MessageEmbed()
      .setImage(banner)
      .setTimestamp()
      .setDescription(`${kişi} adlı kullanıcının bannerı değişti!`);
    
    if (banner.endsWith('.gif')) {
      gifliBannerKanal.send(emb);
    } else {
      bannerKanal.send(emb);
    }
  }
});

//-------------------------------------------------# • Oto Silici ------------------------------------------------\\ 

client.on("ready", () => {
  // Bir günü temsil eden milisaniye sayısı (24 saat * 60 dakika * 60 saniye * 1000 milisaniye)
  const birGun = 24 * 60 * 60 * 1000;
  
  setInterval(() => {
    let kanal = client.channels.cache.get("1215009031182094466"); // kanal ID'si
    if (!kanal) return console.error("Kanal bulunamadı.");
    kanal.bulkDelete(200) // silinecek mesaj sayısı
      .then(messages => {
        console.log(`Kanal'da bulunan tüm mesajlar silindi. ${messages.size}`);
        kanal.send(`Kanal'da bulunan tüm mesajlar silindi. ${messages.size} `);
      })
      .catch(console.error);
  }, birGun); // 1 gün sonra
});


//-------------------------------------------------# • Kullanıcı Adı Değiştirici Logu ------------------------------------------------\\ 

client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (oldMember.displayName !== newMember.displayName) {
    let logKanal = client.channels.cache.get("1239910228770816122"); // Log kanalının ID'si
    if (!logKanal) return console.error("Log kanalı bulunamadı.");

    const messageContent = `<a:discords:959929118525374527>  ${newMember.user}  adlı [kullanıcı] adını değiştirdi  <a:parantez:1097791172174426182>  ${oldMember.displayName} ←→ ${newMember.displayName}  <a:parantezz:1097791233331576912>   <:Duyuru:1049777853371273306>`;
    const emojiID = "1215015477563097148"; // Eklemek istediğiniz emoji ID'si
    const emojiiID = "959929118525374527"; // Eklemek istediğiniz emoji ID'si

    logKanal.send(messageContent).then(sentMessage => {
        sentMessage.react(emojiID)
        sentMessage.react(emojiiID)
          .catch(console.error);
    });
  }
});

//-------------------------------------------------# • Ses Oluştur------------------------------------------------\\ 

client.on('channelCreate', async channel => {
  if (channel.type !== 'voice') return; // Sadece ses kanallarını kontrol et
  if (!channel.guild) return; // Kanal bir sunucuda olmalı

  let modlogs = db.get(`modlogkanaly_${channel.guild.id}`);
  
  // Kanalı oluşturan kullanıcıyı bulma
  let auditLogs = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' });
  let entry = auditLogs.entries.first();
  let user;
  if (entry) {
    user = entry.executor;
  }
  
  // Mesajı göndereceğiniz belirli kanalı bulma
  const belirliKanalID = '1246404795628257290'; // Mod-log kanalının ID'si
  const belirliKanal = channel.guild.channels.cache.get(belirliKanalID);
  if (!belirliKanal) return console.error("Mod-log kanalı bulunamadı.");

  // Kanal oluşturulduğunda log mesajı oluşturma
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Kullanıcı [Ses] Kanalı Oluşturdu : `, user ? `<@${user.id}>` : 'Bilinmeyen Kullanıcı')
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Oluşturulan [Ses] Kanalı: `, `${channel}`)
    .setThumbnail(user ? user.displayAvatarURL({ dynamic: true }) : '')
    .setFooter(`${client.user.username} | Mod-Log Sistemi`)
    .setTimestamp();

  belirliKanal.send(embed);
});

//-------------------------------------------------# • Ses Sil------------------------------------------------\\ 

client.on('channelDelete', async channel => {
  if (channel.type !== 'voice') return; // Sadece ses kanallarını kontrol et
  if (!channel.guild) return; // Kanal bir sunucuda olmalı

  let modlogs = db.get(`modlogkanaly_${channel.guild.id}`);
  
  // Kanalı silen kullanıcıyı bulma
  let auditLogs = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' });
  let entry = auditLogs.entries.first();
  let user;
  if (entry) {
    user = entry.executor;
  }
  
  // Mesajı göndereceğiniz belirli kanalı bulma
  const belirliKanalID = '1246404795628257290'; // Mod-log kanalının ID'si
  const belirliKanal = channel.guild.channels.cache.get(belirliKanalID);
  if (!belirliKanal) return console.error("Mod-log kanalı bulunamadı.");

  // Kanal silindiğinde log mesajı oluşturma
  let embed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Ses Kanalını Silen : `, user ? `<@${user.id}>` : 'Bilinmeyen Kullanıcı')
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Silinen Ses Kanalı: `, `${channel.name}`)
    .setThumbnail(user ? user.displayAvatarURL({ dynamic: true }) : '')
    .setFooter(`${client.user.username} | Mod-Log Sistemi`)
    .setTimestamp();

  belirliKanal.send(embed);
});

//-------------------------------------------------# • Kanal Oluştur------------------------------------------------\\ 

client.on('channelCreate', async channel => {
  let modlogs = db.get(`modlogkanaly_${channel.guild.id}`);
  
  // Kanalın oluşturulmasını gerçekleştiren kullanıcıyı bulma
  let auditLogs = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' });
  let entry = auditLogs.entries.first();
  let user;
  if (entry) {
    let executor = entry.executor;
    user = await channel.guild.members.resolve(executor.id);
  }
  
  // Mesajı göndereceğiniz belirli kanalı bulma
  const belirliKanalID = '1239968966257016852'; // Mod-log kanalının ID'si
  const belirliKanal = channel.guild.channels.cache.get(belirliKanalID);
  if (!belirliKanal) return console.error("Mod-log kanalı bulunamadı.");

  // Kanal oluşturulduğunda log mesajı oluşturma
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Kullanıcı Bir [Mesaj] Kanalı Oluşturdu: `, `${channel}`)
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Kanalın Türü : `, channel.type === 'text' ? 'Yazı' : 'Ses')
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Kanalı Oluşturan: `, user ? `<@${user.id}>` : 'Bilinmeyen Kullanıcı')
    .setThumbnail(user ? user.user.displayAvatarURL({ dynamic: true }) : '')
    .setFooter(`${client.user.username} | Mod-Log Sistemi`)
    .setTimestamp();

  belirliKanal.send(embed);
});


//-------------------------------------------------# • Kanal Sil------------------------------------------------\\ 

client.on('channelDelete', async channel => {
  let modlogs = db.get(`modlogkanaly_${channel.guild.id}`);
  
  // Kanalın silinmesini gerçekleştiren kullanıcıyı bulma
  let auditLogs = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' });
  let entry = auditLogs.entries.first();
  let user;
  if (entry) {
    let executor = entry.executor;
    user = await channel.guild.members.resolve(executor.id);
  }
  
  // Mesajı göndereceğiniz belirli kanalı bulma
  const belirliKanalID = '1239968966257016852'; // Mod-log kanalının ID'si
  const belirliKanal = channel.guild.channels.cache.get(belirliKanalID);
  if (!belirliKanal) return console.error("Mod-log kanalı bulunamadı.");

  // Kanal silindiğinde log mesajı oluşturma
  let embed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Kullanıcı [Mesaj] Kanalını Sildi : `, user ? `<@${user.id}>` : 'Bilinmeyen Kullanıcı')
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Silinen Kanalın İsmi : `, `${channel.name}`)
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Silinen Kanalın Türü : `, channel.type === 'text' ? 'Yazı' : 'Ses')
    .setThumbnail(user ? user.user.displayAvatarURL({ dynamic: true }) : '')
    .setFooter(`${client.user.username} | Mod-Log Sistemi`)
    .setTimestamp();

  belirliKanal.send(embed);
});


//-------------------------------------------------# • Rol Ekle------------------------------------------------\\ 
client.on('roleCreate', async role => {
  let modlogs = db.get(`modlogkanaly_${role.guild.id}`);

  // Rolün oluşturulmasını gerçekleştiren kullanıcıyı bulma
  let auditLogs = await role.guild.fetchAuditLogs({ type: 'ROLE_CREATE' });
  let entry = auditLogs.entries.first();
  let user;
  if (entry) {
    let executor = entry.executor;
    user = await role.guild.members.resolve(executor.id);
  }

  // Mesajı göndereceğiniz belirli kanalı bulma
  const belirliKanal = role.guild.channels.cache.find(kanal => kanal.id === '1239969942653243503');
  if (!belirliKanal) return;

  // Rol oluşturulduğunda log mesajı oluşturma
  let embed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Kullanıcı [Rol] Oluşturdu : `, `${role}`)
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Oluşturan Kullanıcı : `, user ? `<@${user.id}>` : 'Bilinmeyen Kullanıcı')
    .setThumbnail(user ? user.user.displayAvatarURL({ dynamic: true }) : '')
    .setFooter(`${client.user.username} | Mod-Log Sistemi`)
    .setTimestamp();

  belirliKanal.send(embed);
});
//-------------------------------------------------# • Rol Sil------------------------------------------------\\

client.on('roleDelete', async role => {
  let modlogs = db.get(`modlogkanaly_${role.guild.id}`);
  
  // Rolün silinmesini gerçekleştiren kullanıcıyı bulma
  let auditLogs = await role.guild.fetchAuditLogs({ type: 'ROLE_DELETE' });
  let entry = auditLogs.entries.first();
  let user;
  if (entry) {
    let executor = entry.executor;
    user = await role.guild.members.resolve(executor.id);
  }
  
  // Mesajı göndereceğiniz belirli kanalı bulma
  const belirliKanalID = '1239969942653243503'; // Mod-log kanalının ID'si
  const belirliKanal = role.guild.channels.cache.get(belirliKanalID);
  if (!belirliKanal) return console.error("Mod-log kanalı bulunamadı.");

  // Rol silindiğinde log mesajı oluşturma
  let embed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Kullanıcı [Rol'ü] Sildi : `, `${role.name}`)
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Silen Kullanıcı : `, user ? `<@${user.id}>` : 'Bilinmeyen Kullanıcı')
    .setThumbnail(user ? user.user.displayAvatarURL({ dynamic: true }) : '')
    .setFooter(`${client.user.username} | Mod-Log Sistemi`)
    .setTimestamp();

  belirliKanal.send(embed);
});


//-------------------------------------------------# • Emoji Ekle------------------------------------------------\\

client.on('emojiCreate', async emoji => {
  let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`);
  
  // Emoji'nin oluşturulmasını gerçekleştiren kullanıcıyı bulma
  let auditLogs = await emoji.guild.fetchAuditLogs({ type: 'EMOJI_CREATE' });
  let entry = auditLogs.entries.first();
  let user;
  if (entry) {
    let executor = entry.executor;
    user = await emoji.guild.members.resolve(executor.id);
  }
  
  // Mesajı göndereceğiniz belirli kanalı bulma
  const belirliKanalID = '1239969985875677235'; // Mod-log kanalının ID'si
  const belirliKanal = emoji.guild.channels.cache.get(belirliKanalID);
  if (!belirliKanal) return console.error("Mod-log kanalı bulunamadı.");

  // Emoji oluşturulduğunda log mesajı oluşturma
  let embed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Kullanıcı [Emoji] Oluşturdu : `, `${emoji}`)
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Oluşturan Kullanıcı`, user ? `<@${user.id}>` : 'Bilinmeyen Kullanıcı')
    .setThumbnail(emoji.url)
    .setFooter(`${client.user.username} | Mod-Log Sistemi`)
    .setTimestamp();

  belirliKanal.send(embed);
});


//-------------------------------------------------# • Emoji Sil------------------------------------------------\\

client.on('emojiDelete', async emoji => {
  let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`);
  
  // Emoji'nin silinmesini gerçekleştiren kullanıcıyı bulma
  let auditLogs = await emoji.guild.fetchAuditLogs({ type: 'EMOJI_DELETE' });
  let entry = auditLogs.entries.first();
  let user;
  if (entry) {
    let executor = entry.executor;
    user = await emoji.guild.members.resolve(executor.id);
  }
  
  // Mesajı göndereceğiniz belirli kanalı bulma
  const belirliKanalID = '1239969985875677235'; // Mod-log kanalının ID'si
  const belirliKanal = emoji.guild.channels.cache.get(belirliKanalID);
  if (!belirliKanal) return console.error("Mod-log kanalı bulunamadı.");

  // Emoji silindiğinde log mesajı oluşturma
  let embed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setAuthor("Bir Emoji Silindi")
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Kullanıcı [Emoji] Sildi : `, `${emoji}`)
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Silen Kullanıcı`, user ? `<@${user.id}>` : 'Bilinmeyen Kullanıcı')
    .setThumbnail(emoji.url)
    .setFooter(`${client.user.username} | Mod-Log Sistemi`)
    .setTimestamp();

  belirliKanal.send(embed);
});


//-------------------------------------------------# • Yasak Kaldır------------------------------------------------\\

client.on('guildBanRemove', async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`);
  
  // Yasağın kaldırılmasını gerçekleştiren kullanıcıyı bulma
  let auditLogs = await guild.fetchAuditLogs({ type: 'MEMBER_BAN_REMOVE' });
  let entry = auditLogs.entries.first();
  let executor;
  if (entry) {
    executor = entry.executor;
  }
  
  // Mesajı göndereceğiniz belirli kanalı bulma
  const belirliKanalID = '1239971825061199914'; // Mod-log kanalının ID'si
  const belirliKanal = guild.channels.cache.get(belirliKanalID);
  if (!belirliKanal) return console.error("Mod-log kanalı bulunamadı.");

  // Yasağın kaldırılması log mesajı oluşturma
  let embed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setAuthor("Bir Kullanıcının Yasaklaması Kaldırıldı")
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Yasağı Kaldırılan: `, `${user.tag}`)
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Yasağı Kaldıran : `, executor ? `<@${executor.id}>` : 'Bilinmeyen Kullanıcı')
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setFooter(`${client.user.username} | Mod-Log Sistemi`)
    .setTimestamp();

  belirliKanal.send(embed);
});


//-------------------------------------------------# • Mesaj Edit------------------------------------------------\\

client.on('messageUpdate', async (oldMessage, newMessage) => {
  // Sadece sunucu mesajlarını kontrol etmek istiyorsak:
  if (!oldMessage.guild) return;

  let modlogs = db.get(`modlogkanaly_${oldMessage.guild.id}`);
  
  // Mesajı düzenleyen kullanıcıyı bulma
  let auditLogs = await oldMessage.guild.fetchAuditLogs({ type: 'MESSAGE_UPDATE' });
  let entry = auditLogs.entries.first();
  let user;
  if (entry) {
    user = entry.executor;
  }
  
  // Mesajı göndereceğiniz belirli kanalı bulma
  const belirliKanalID = '1239973299061129377'; // Mod-log kanalının ID'si
  const belirliKanal = oldMessage.guild.channels.cache.get(belirliKanalID);
  if (!belirliKanal) return console.error("Mod-log kanalı bulunamadı.");

  // Mesaj düzenlendiğinde log mesajı oluşturma
  let embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setAuthor("Bir Mesaj Düzenlendi")
    .setDescription(`Mesaj [buraya tıkla](${oldMessage.url})`)
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Eski Mesaj : `, `${oldMessage.content}`)
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Yeni Mesaj : `, `${newMessage.content}`)
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Mesajı Düzenleyen : `, user ? `<@${user.id}>` : 'Bilinmeyen Kullanıcı')
    .setThumbnail(user ? user.displayAvatarURL({ dynamic: true }) : '')
    .setFooter(`${client.user.username} | Mod-Log Sistemi`)
    .setTimestamp();

  belirliKanal.send(embed);
});


//-------------------------------------------------# • Mesaj Edit------------------------------------------------\\

//-------------------------------------------------# • Mesaj Sil------------------------------------------------\\

// Bir mesaj silindiğinde
client.on('messageDelete', async deletedMessage => {
  // Sadece sunucu mesajlarını kontrol etmek istiyorsak:
  if (!deletedMessage.guild) return;

  let modlogs = db.get(`modlogkanaly_${deletedMessage.guild.id}`);
  
  // Mesajı silen kullanıcıyı bulma
  let auditLogs = await deletedMessage.guild.fetchAuditLogs({ type: 'MESSAGE_DELETE' });
  let entry = auditLogs.entries.first();
  let user;
  if (entry) {
    user = entry.executor;
  }
  
  // Mesajı göndereceğiniz belirli kanalı bulma
  const belirliKanalID = '1239975302298468554'; // Mod-log kanalının ID'si
  const belirliKanal = deletedMessage.guild.channels.cache.get(belirliKanalID);
  if (!belirliKanal) return console.error("Mod-log kanalı bulunamadı.");

  // Silinen mesajın içeriğini gösterme, çünkü mesaj silindiğinde içeriği artık erişilemez
  let deletedMessageContent = deletedMessage.content || 'Mesaj içeriği erişilemez';
  
  // Mesaj silindiğinde log mesajı oluşturma
  let embed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setDescription(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Silinen Mesaj \n\n<:rehber:1243574745811779614> <a:hastagh:1097791206961983538> ${deletedMessageContent}`)
    .addField(`<:rehber:1243574745811779614> <a:hastagh:1097791206961983538>Mesajı Silen : `, user ? `<@${user.id}>` : 'Bilinmeyen Kullanıcı')
    .setThumbnail(user ? user.displayAvatarURL({ dynamic: true }) : '')
    .setFooter(`${client.user.username} | Mod-Log Sistemi`)
    .setTimestamp();

  belirliKanal.send(embed);
});

//-----------------------ENV----------------------\\  
 client.login(process.env.token)