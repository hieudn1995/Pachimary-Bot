const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        message.delete();
        message.channel.send('Looser! You don\'t have permission for that!').then((msg) => {msg.delete(4000)});
        return;
    }
    
    if(!args[0] || isNaN(args[0])) {
        message.delete();
        message.reply(`the correct command is: ${prefix}clear <amount of messages want to be deleted>`).then((msg) => {msg.delete(4000)});
        return;
    }

    await message.channel.bulkDelete(parseInt(args[0]) + 1);

    let clearOutput = new Discord.RichEmbed()
        .setTitle('Done!')
        .setColor('#9b9b9b')
        .setThumbnail('https://i.imgur.com/9BJ8AWV.png')
        .setDescription(`I deleted **${args[0]}** ${AmountHandler(args[0], 'message', 'messages')}.`)
        .setFooter('This message will self destruct in 5 seconds.')
    message.channel.send(clearOutput).then((msg) => {
        message.channel.fetchMessages({ limit: 1 }).then(async(messages) => {
            let msg2 = messages.array()[0];

            await Sleep(5000);

            if(msg.id == msg2.id) msg.delete();
        });
    });
}

module.exports.help = {
    name: 'clear',
    aliases: ['delete', 'del', 'trash'],
    usage: 'clear <amount of messages want to be deleted>',
    description: 'Deletes the chosen amount of messages want to be deleted.',
    accessableby: 'Admins'
}