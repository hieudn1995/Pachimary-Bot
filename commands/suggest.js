const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(args[0]) {
        message.delete();
        message.reply(`the correct command: **${prefix}suggest**.`).then((msg) => msg.delete(4000));
        return;
    }

    let sugOptions = new Discord.RichEmbed()
        .setTitle('Choose!')
        .setDescription('Type in a number from the following list, to specify your suggestion. \n\n**1** - About Pachimary Bot\n **2** - New voice/text channel \n **3** - New game \n**4** - Other')
        .setFooter('You have 10 seconds, otherwise this will expire')
        .setColor('RANDOM')
        .setTimestamp()
    message.channel.send(sugOptions);

    try {
        var opcio1 = await message.channel.awaitMessages(msg => msg.author.id == message.author.id && !isNaN(msg) && msg >= 1 && msg <= 4 , { max: 1, time: 10000, errors: ['time'] });
    } catch (error) {
        message.delete();
        message.reply('no valid entry/the time was expired.').then((msg) => msg.delete(2000));
        return;
    }

    const sugTopic = opcio1.first().content;

    let sugEmbed = new Discord.RichEmbed()
        .setTitle('Suggestion')
        .setDescription('Type in your suggestion. Please be polite, and try to be as specific as possible.')
        .setFooter('You have 5 minutes, otherwise this will expire')
        .setColor('RANDOM')
        .setTimestamp()
    message.channel.send(sugEmbed);

    try {
        var opcio2 = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, { max: 1, time: 300000, errors: ['time'] });
    } catch (error) {
        message.delete();
        message.reply('the time was expired.').then((msg) => msg.delete(2000));
        return;
    }

    const suggestion = opcio2.first().content;

    let CHANNEL = message.guild.channels.find(channel => channel.id == '538696529578426369');
    let TOPICS = ['Nothing', 'Pachimary Bot', 'New voice/text channel', 'New game', 'Other'];

    if(!sugTopic || !suggestion) return;

    let suggestionOutput1 = new Discord.RichEmbed()
        .setTitle('Suggestion!')
        .setDescription(`__Suggester:__ ${message.member} \n__Topic:__ ${TOPICS[sugTopic]}\n\n __Suggestion:__\n ${suggestion}`)
        .setTimestamp()
        .setColor('RANDOM')
    CHANNEL.send(suggestionOutput1);
    
    let suggestionOutput2 = new Discord.RichEmbed()
        .setTitle('Done!')
        .setDescription(`${message.author.username}, you suggestion has successfully been created.`)
        .setFooter('Please be patient, the Admins will eventually get to your suggestion.')
        .setTimestamp()
        .setColor('0x008000')
    message.channel.send(suggestionOutput2);
}

module.exports.help = {
    name: 'suggest',
    aliases: ['prefer'],
    usage: 'suggest',
    description: 'It creates a suggestion that the admins can see.',
    accessableby: 'Everyone'
}