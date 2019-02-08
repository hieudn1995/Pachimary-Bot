const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
    if(!message.member.voiceChannel) {
        let joinBad1 = new Discord.RichEmbed()
            .setTitle('Retarded!')
            .setDescription('Pachimary Bot can\'t do that!')
            .setFooter('You must be in a Voice Channel!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(joinBad1);
        return;
    }

    if(message.guild.voiceConnection) {
        let joinBad2 = new Discord.RichEmbed()
            .setTitle('Autistic!')
            .setDescription('Pachimary Bot is already in a Voice Channel!')
            .setFooter('Only 1 Voice Connection per server!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(joinBad2);
        return;
    }

    message.member.voiceChannel.join().then(connection => {
        let joinOutput = new Discord.RichEmbed()
            .setTitle('I\'m here!')
            .setDescription('Pachimary Bot inda house!')
            .setColor('0x008000')
            .setFooter('Music? Games? Pachimary Bot knows everything!')
            .setThumbnail('https://i.imgur.com/2J9IiuO.png')
        message.channel.send(joinOutput);
    });
}


module.exports.help = {
    name: 'join',
    aliases: ['come'],
    usage: 'join',
    description: 'Pachimary Bot join the Voice Channel that you are in.',
    accessableby: 'Everyone'
}