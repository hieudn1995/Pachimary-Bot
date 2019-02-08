const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    let serverCommandok = [];

    if(message.member.hasPermission('ADMINISTRATOR')) {
        serverCommandok = ['play', 'pause', 'resume', 'queue', 'clearqueue', 'removequeue', 'announce', 'prefix', 'clear', 'nickname', 'suggest', 'userinfo'];
    } else {
        serverCommandok = ['nickname', 'suggest', 'userinfo', 'play', 'pause', 'resume', 'queue', 'clearqueue', 'removequeue'];
    }

    if(args[0] == 'help') return message.channel.send(`Just simply type, **${prefix}help**.`);

    if(args[0]) {
        let command = args[0];

        if(bot.commands.has(command)) {
            command = bot.commands.get(command);

            if(serverCommandok.includes(args[0])) {
                var SHembed = new Discord.RichEmbed()
                    .setColor('#ff9900')
                    .setAuthor('Pachimary Bot Help')
                    .setDescription(`Pachimary Bot's prefix: **${prefix}** \n\n **Command:** ${command.help.name}\n **Description:** ${command.help.description || "No description."}\n **Usage:** ${prefix}${command.help.usage || "Not specified."}\n **Usable by:** ${command.help.accessableby  || "Everyone"}\n **Aliases:** ${command.help.noalias || command.help.aliases}`)
                message.channel.send(SHembed);
                return;
            } else {
                message.delete();
                message.channel.send('Looser! You don\'t have the permission to use that command!').then((msg) => {msg.delete(5000)});
                return;
            }
        } else {
            message.channel.send(`Sorry, I didn\'t find such command: **${args[0]}**`);
        }
    }

    if(!args[0]) {
        let Sembed = new Discord.RichEmbed()
            .setAuthor('Pachimary Bot')
            .setThumbnail(bot.user.displayAvatarURL)
            .setTimestamp()
            .setColor('#ff9900')
            .setDescription(`Pachimary Bot has a lot of commands. \n\n His prefix: **${prefix}**`)
            .addField('Commands:', '`' + serverCommandok.join('` `') + '`')
            .setFooter('Pachimary Bot', bot.user.displayAvatarURL)
         message.channel.send({embed: Sembed});
    }
}

module.exports.help = {
    name: 'help',
    aliases: ['h', 'commands', 'halp'],
    usage: 'help <a command>',
    description: 'Help for using commands.',
    accessableby: 'Everyone'
}