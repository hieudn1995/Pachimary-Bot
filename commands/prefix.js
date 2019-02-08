const Discord = require('discord.js');
const fs = require('fs');
const prefixJSON = require('../data/prefix.json');

module.exports.run = async (bot, message, args, prefix) => {
    if(!prefixJSON) {
        let prefixBad1 = new Discord.RichEmbed()
            .setTitle('Oh shit!')
            .setDescription('There is a big problem!')
            .setFooter('Please message @petdomaa100!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(prefixBad1);
        return;
    }

    if(!message.member.hasPermission('ADMINISTRATOR')) {
        let prefixBad1 = new Discord.RichEmbed()
            .setTitle('GAY')
            .setDescription('You don\'t have permission for that!')
            .setFooter('Looser!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(prefixBad1);
        return;
    }

    if(!args[0]) {
        let prefixBad2 = new Discord.RichEmbed()
            .setTitle('Oh shit!')
            .setDescription('You did\'t specify the new prefix!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
            .setFooter(`Correct command: ${prefix}prefix <new prefix>`)
        message.channel.send(prefixBad2);
        return;
    }

    let options = {
        "prefix": args[0]
    }
    
    await fs.writeFile('../code/data/prefix.json', JSON.stringify(options, null, 4), (err) => {
        if(err) throw err;

        let prefixOutput = new Discord.RichEmbed()
            .setTitle('Prefix changed!')
            .setColor('#FF9900')
            .setDescription(`New prefix: **${args[0]}**`)
        message.channel.send(prefixOutput);
    });

}

module.exports.help = {
    name: 'prefix',
    noalias: 'No aliases.',
    aliases: [],
    usage: 'prefix <new prefix>',
    description: 'It changes the bot\'s prefix.',
    accessableby: 'Admins'
}