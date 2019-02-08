const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.delete();

    let CHANNEL = message.guild.channels.find(x => x.id == '535700176451665931');

    if(!message.member.hasPermission('ADMINISTRATOR')) {
        message.reply('You don\'t have permission for that!').then((msg) => {msg.delete(3500)});
        return;
    } else {
        const memberRoles = message.member.roles.map(roles => roles.name).slice(1);
        console.log(memberRoles);

        let bejelentesOutput1 = new Discord.RichEmbed()
            .setTitle('Important Announcement!')
            .setDescription(`**${message.author.username} (${memberRoles[0]})** is announcing, that: \n${args.join(' ')}`)
            .setTimestamp()
            .setColor('RANDOM')
            .setThumbnail()
        CHANNEL.send(bejelentesOutput1);

        let bejelentesOutput2 = new Discord.RichEmbed()
            .setTitle('Done!')
            .setDescription(`The report can be seen in the **${CHANNEL.name}** text channel.`)
            .setTimestamp()
            .setColor('0x008000')
        message.channel.send(bejelentesOutput2);
    }
}

module.exports.help = {
    name: 'announcement',
    aliases: ['announce'],
    usage: 'announce <announcement here>',
    description: 'It gives an announcement through the announcements-🔔 text-channel.',
    accessableby: 'Admins'
}