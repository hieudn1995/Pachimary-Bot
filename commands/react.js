const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return message.channel.send('Shit, you didn\'t specify an emoji!');

    await message.delete();

    message.channel.fetchMessages({ limit: 1 }).then(messages => {
        let emogjMessageArray = args[0].split(':');
        let msg = messages.array()[0];

        let EMOGJ;

        if(!emogjMessageArray[1]) {
            EMOGJ = args[0];
        } else {
            EMOGJ = emogjMessageArray[1];
        }

        let emogj = msg.guild.emojis.find(x => x.name == EMOGJ);

        if(!emogj) {
            return message.channel.send('Oooh shit... There is a problem... Probably you fucked up the emoji\'s name... Again...').then((msg) => msg.delete(3000));
        } 

        msg.react(emogj);
    });
}

module.exports.help = {
    name: 'react',
    noalias: 'No aliases.',
    aliases: [],
    usage: 'react <emoji>',
    description: 'It reacts with the specified emogj.',
    accessableby: 'Everyone'
}