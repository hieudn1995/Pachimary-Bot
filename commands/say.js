const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const sayMessage = args.join(' ');

    message.delete().catch();

    message.channel.send(sayMessage);
}

module.exports.help = {
  name: 'say',
  aliases: [],
  noalias: 'No aliases.',
  usage: 'say <words>',
  description: 'Pachimary Bot will whatever you specify.',
  accessableby: 'Everyone'
}