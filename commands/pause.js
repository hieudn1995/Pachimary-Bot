const Discord = require('discord.js');

module.exports.run = async (bot, message, prefix) => {
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
        let pauseBad1 = new Discord.RichEmbed()
            .setTitle('GAY!')
            .setDescription('Pachimary Bot can\'t do that!')
            .setFooter('You need to be in the same Voice Channel with Pachimary Bot!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(pauseBad1);
        return;
    }

    if(message.guild.dispatcher) {
        message.guild.dispatcher.pause();

        nowPlaying.title += ' `[PAUSED]` ';

        let pauseOutput = new Discord.RichEmbed()
            .setTitle('Understood!')
            .setDescription('Pachimary Bot paused the song!')
            .setFooter('Pachimary Bot is a good DJ, but he still needs to learn.')
            .setColor('0x008000')
            .setThumbnail('https://i.imgur.com/5LXiGXC.png')
        message.channel.send(pauseOutput);
        return;
    } else {
        let pauseBad2 = new Discord.RichEmbed()
            .setTitle('Retarded!')
            .setDescription('There isn\'t any music playing!')
            .setFooter(`You can play one by the ${prefix}play command.`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(pauseBad2);
    }
}

module.exports.help = {
  name: 'pause',
  aliases: [],
  noalias: 'No aliases.',
  usage: 'pause',
  description: 'Stoppes the playing music',
  accessableby: 'Everyone'
}