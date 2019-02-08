const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(!args[0] || !args[1]) {
        message.delete();
        message.reply(`the correct command: **${prefix}nickname <your actual name> <your username>**.`).then((msg) => msg.delete(4000));
        return;
    }

    let bad1 = args[0].toLowerCase();
    let bad2 = args[1].toLowerCase();

    if(shitwords.includes(bad1) || shitwords.includes(bad2)) {
        message.delete();
        message.reply('C\'mon dude, there are some under aged kids in this server! Watch your language xD').then((msg) => msg.delete(4000));
        return;
    }

    const nickname = `${args[0]} || ${args[1]}`;

    await message.member.setNickname(nickname);
    
    let nicknameOutput = new Discord.RichEmbed()
        .setTitle('Done!')
        .setDescription(`${message.author.username}, you nickname has successfully been set to: **${nickname}**`)
        .setTimestamp()
        .setColor('0x008000')
    message.channel.send(nicknameOutput);
}

module.exports.help = {
    name: 'nickname',
    aliases: ['nick'],
    usage: 'nickname <your actual name> <your username>.',
    description: 'It creates your nickname for you.',
    accessableby: 'Everyone'
}