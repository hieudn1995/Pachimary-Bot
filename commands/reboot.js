const Discord = require('discord.js');
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args, prefix) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) {
        let rebootBad1 = new Discord.RichEmbed()
            .setTitle('GAY!')
            .setDescription('YOu don\'t have permission for that!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(rebootBad1);
        return;
    }

    if(args[0]) {
        let rebootBad2 = new Discord.RichEmbed()
            .setTitle('Ouff!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
            .setDescription(`Just simply type **${prefix}reboot**`)
            .setFooter(`Correct command: ${prefix}reboot`)
        message.channel.send(rebootBad2);
        return;
    }

    let CHANNEL = message.guild.channels.find(channel => channel.id == '539363182276247554');

    if(bot.voiceConnection) {
        message.guild.voiceConnection.disconnect();
    }

    message.channel.send('**Rebooting...**').then((msg) => {
        bot.destroy().then(() => bot.login(process.env.TOKEN)).then(() => {
            msg.channel.send('Rebooted.');

            let rebootOutput = new Discord.RichEmbed()
                .setTitle('Pachimary Bot rebooted!')
                .setDescription(`${msg.author.username} rebooted Pachimary Bot.`)
                .setColor('#FF9900')
                .setTimestamp()
            CHANNEL.send(rebootOutput);
        });
    });
}   

module.exports.help = {
    name: 'reboot',
    aliases: ['restart'],
    usage: 'reboot',
    description: 'Reboots Pachimary Bot.',
    accessableby: 'Admins'
}