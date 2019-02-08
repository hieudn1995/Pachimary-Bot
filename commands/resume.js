const Discord = require('discord.js');

module.exports.run = async (bot, message) => {    
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
        let resumeBad1 = new Discord.RichEmbed()
            .setTitle('Retarded!')
            .setDescription('Pachimary Bot can\'t do that!')
            .setFooter('You need to be in the same Voice Channel with Pachimary Bot!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(resumeBad1);
        return;
    }

    if(message.guild.dispatcher) {
        message.guild.dispatcher.resume();

        nowPlaying.title = nowPlaying.title.substring(0, nowPlaying.title.length - 11);

        let resumeGood = new Discord.RichEmbed()
            .setTitle('Understood!')
            .setDescription('Pachimary Bot resumed the song!')
            .setFooter('Pachimary Bot is a good DJ, but he still needs to learn.')
            .setColor('0x008000')
            .setThumbnail('https://i.imgur.com/DX0uSM6.png')
        message.channel.send(resumeGood);
        return;
    } else {
        let resumeBad2 = new Discord.RichEmbed()
            .setTitle('Fucker!')
            .setDescription('There isn\'t any music playing!')
            .setFooter(`You can put one in by the ${prefix}play command!`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(resumeBad2);
    }
}

module.exports.help = {
  name: 'resume',
  aliases: [],
  noalias: 'No aliases.',
  usage: 'resume',
  description: 'Resumes the paused music.',
  accessableby: 'Everyone'
}