const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(!args[0]) {          
        message.channel.send('Calculating...').then((msg) => {
            let pingOutput = new Discord.RichEmbed()
                .setTitle('Done!')
                .setColor('#FF9900')
                .setDescription(`__Ping:__  **${msg.createdTimestamp - message.createdTimestamp}ms** \n__Latency:__ **${Math.round(bot.ping)}ms.**`)
            msg.edit(pingOutput);
    });
    } else {
        message.channel.send(`Just simply write **${prefix}ping**!`).then((msg) => msg.delete(3000));
        return;
    }
}

module.exports.help = {
    name: 'ping',
    noalias: 'No aliases.',
    aliases: [],
    usage: 'ping',
    description: 'Shows the ping of Pachimary Bot.',
    accessableby: 'Everyone'
}