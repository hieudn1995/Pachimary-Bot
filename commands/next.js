const Discord = require('discord.js');

module.exports.run = async (bot, message, prefix) => {
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
        let nextBad1 = new Discord.RichEmbed()
            .setTitle('You fucked it up again!')
            .setDescription('Pachimary Bot can\'t do that!')
            .setFooter('You need to be in the same Voice Channel with Pachimary Bot!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(nextBad1);
        return;
    }
    
    if(message.guild.dispatcher) {
        message.guild.dispatcher.end();

        let next_good = new Discord.RichEmbed()
            .setTitle('Understood!')
            .setDescription('Pachimary Bot skipped to the next song!')
            .setFooter('Pachimary Bot is a good DJ, but he still needs to learn.')
            .setColor('0x008000')
            .setThumbnail('https://i.imgur.com/JCBGbiw.png')
        message.channel.send(next_good);
    } else {
        let nextBad2 = new Discord.RichEmbed()
            .setTitle('You fucked it up again!')
            .setDescription('There isn\'t any music playing!')
            .setFooter(`You can start one by the ${prefix}play command.`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(nextBad2);
    }
}
module.exports.help = {
    name: 'next',
    aliases: ['skip'],
    usage: 'next',
    description: 'Skippes to the next song in the playlist.',
    accessableby: 'Everyone'
}