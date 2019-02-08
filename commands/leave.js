const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(message.guild.voiceConnection) {
        message.guild.voiceConnection.disconnect();

        var leaveGood = new Discord.RichEmbed()
            .setTitle('I left.')
            .setDescription('Pachimary Bot went home.')
            .setColor('0x008000')
            .setFooter('He is probably swimming.')
            .setThumbnail('https://i.imgur.com/GYLlQqW.png')
        message.channel.send(leaveGood);
    } else {
        var leaveBad = new Discord.RichEmbed()
            .setTitle('Looser!')
            .setDescription('Pachimary Bot isn\'t in any Voice Channel!')
            .setFooter('Pachimary Bot needs to be in a Voice Channel before you send him off!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(leaveBad);
    }
}

module.exports.help = {
    name: 'leave',
    aliases: ['disconnect', 'stop'],
    usage: 'leave',
    description: 'Leaves the Voice Channel that he is in.',
    accessableby: 'Everyone'
}