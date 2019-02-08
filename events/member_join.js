const Discord = require('discord.js');

module.exports = (bot, member) => {
    let CHANNEL = member.guild.channels.find(channel => channel.id == '535699959983505420');
    let ROLE = member.guild.roles.find(role => role.name == 'Members');

    if(!CHANNEL) return;

    let welcome_msg1 = new Discord.RichEmbed()
        .setTitle('YEEEET!')
        .setColor('RANDOM')
        .setDescription(`**${member.user.username}** just joined the Pachimary gang.`)
        .setFooter('God bless him!')
        .setTimestamp()
    CHANNEL.send(welcome_msg1);

    member.addRole(ROLE);

    let welcome_msg2 = new Discord.RichEmbed()
        .setTitle(`Wellcome to the server ${member.user.username}!`)
        .setDescription('This server, the **Pachimary Gang**, is a fun server for peopole who just simply want to play/have fun. Thanks for joining.')
        .addField('Rules:', '**- 1.** Everything has it\'s own place in this server. Please ready the text channel discriptions, and use the channes for what they are specified for. \n**- 2.** Don\' swear a lot. \n**- 3.** The main langiage here is **English**, please use that is possible. \n **- 4.** For 18+ use the big-kids channel.', true)
        .addField('To do:', 'If you want, we recommend that you cange your nickname for this server. \nJust go to any server text channel, and type: \n/nickname <YOUR ACTUAL NAME> <YOUR USERNAME>' + '\n__Example:__ !nick Domi petdomaa100', false)
        .addField('Server Roles:', member.guild.roles.map(roles => roles.name).slice(1).join(', '), true)
        .setThumbnail(member.guild.iconURL)
        .setColor('RANDOM')
        .setTimestamp()
    member.send(welcome_msg2);
}