const Discord = require('discord.js');

module.exports = (bot, member) => {
    let CHANNEL = member.guild.channels.find(channel => channel.id == '535699959983505420');

    if(!CHANNEL.name) return;

    let leave_msg = new Discord.RichEmbed()
        .setTitle('JESUS!')
        .setColor('RANDOM')
        .setDescription(`**${member.user.username}** just left the server...`)
        .setFooter('Go burn in hell!')
        .setTimestamp()
    CHANNEL.send({embed: leave_msg});
}