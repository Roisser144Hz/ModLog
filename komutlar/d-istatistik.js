const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete(); // Komutu kullanan kişinin mesajını siler

    // Kullanıcının etiketini al
    const user = message.mentions.users.first();
    if (!user) return message.channel.send("Lütfen bir kullanıcı etiketleyin.");

    // Kullanıcının adını ve avatarını al
    const userName = user.username;
    const userAvatar = user.displayAvatarURL();

    // Dosya türlerini tanımla
    const fileTypes = {
        gif: ["gif"],
        photo: ["png", "jpeg", "jpg"],
        video: ["mp4", "mov", "avi"]
    };

    // Kullanıcının gönderdiği dosya sayılarını ve türlerini al
    let fileCounts = {
        gif: 0,
        photo: 0,
        video: 0
    };

    // Mesajdaki eklerin dosya türlerini kontrol et
    message.attachments.forEach(attachment => {
        const fileName = attachment.name.toLowerCase();
        if (fileName.endsWith(".gif")) {
            fileCounts.gif++;
        } else if (fileName.endsWith(".png") || fileName.endsWith(".jpeg") || fileName.endsWith(".jpg")) {
            fileCounts.photo++;
        } else if (fileName.endsWith(".mp4") || fileName.endsWith(".mov") || fileName.endsWith(".avi")) {
            fileCounts.video++;
        }
    });

    // Dosya sayılarını rakamlı olarak ayarla
    const gifCountText = fileCounts.gif === 0 ? "hiç" : fileCounts.gif;
    const photoCountText = fileCounts.photo === 0 ? "hiç" : fileCounts.photo;
    const videoCountText = fileCounts.video === 0 ? "hiç" : fileCounts.video;

    // Mesajı oluştur
    const messageText = `<@${user.id}> Adlı Kullanıcı Toplamda **${gifCountText}** GIF, **${photoCountText}** fotoğraf ve **${videoCountText}** video gönderdi.`;

    // Mesajı gönder
    message.channel.send(messageText);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["di"],
    permLevel: 0
};

exports.help = {
    name: "dosyaistatistik",
    description: "Belirtilen kullanıcının dosya gönderme istatistiğini gösterir.",
    usage: "dosyaistatistik [kullanıcı etiketi]"
};
