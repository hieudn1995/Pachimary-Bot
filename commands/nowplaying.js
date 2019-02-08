const Discord = require('discord.js');

module.exports.run = async (bot, message, prefix) => {
    if(nowPlaying == null) {
        let queueBad1 = new Discord.RichEmbed()
            .setTitle('Fucker!')
            .setDescription('There isn\'t any music playing!')
            .setFooter(`You can add one by the ${prefix}play command.`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(queueBad1);
        return;
    }

    let npOutput = new Discord.RichEmbed()
        .setTitle('Now Playing:')
        .setDescription(`${nowPlaying.title} **${nowPlaying.duration}**`)
        .setColor('RANDOM')
    message.channel.send(npOutput);
}

module.exports.help = {
    name: 'nowplaying',
    aliases: ['np'],
    usage: 'nowplaying',
    description: 'Shows the Now Playing song.',
    accessableby: 'Evreyone'
}