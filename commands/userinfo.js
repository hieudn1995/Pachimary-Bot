const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message) => {
    let user;

    if(message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }

    const member = message.guild.member(user);

    const memberRoles = member.roles.map(roles => roles.name).slice(1);

    let info = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(user.avatarURL)
        .setTitle(`**${user.bot == true ? `${user.username}-bot info**` : `${user.username} info**`}`)
        .addField('Nickname:', `${member.nickname !== null ? `${member.nickname}` : 'No nickname'}`, true)
        .addField('Discord Tag:', user.tag, true)
        .addField('Status:', user.presence.status, true)
        .addField('Verified:', user.verified == true ? 'Yes' : 'No', true)
        .addField('Playing:', user.presence.game !== null ? user.presence.game : 'Nothing.' , true)
        .addField('User created:', moment.utc(member.createdAt).locale('en').format('YYYY MMMM DD'), true)
        .addField('User joined:', moment.utc(member.joinedAt).locale('en').format('YYYY MMMM DD'), true)
        .addField(memberRoles.length > 1 ? 'User\'s roles:' : 'User\'s role:', memberRoles.join(', ') || 'He is so gay, he doesn\'t have any.')
    message.channel.send(info);
}

module.exports.help = {
    name:'userinfo',
    aliases: ['ui'],
    usage: 'userinfo <@user>',
    description: 'Basic info about the specified user.',
    accessableby: 'Everyone'
}