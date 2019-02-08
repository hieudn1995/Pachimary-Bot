const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot, message) => {
    let {body} = await superagent
        .get('https://random.dog/woof.json');

    if(!body) return message.reply('Sorry, the servers are offline.');

    let pre_message_dog  = await message.channel.send('Searching for a dog...');
    
    let dogOutput = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setImage(body.url)
        .setFooter('Pachimary Bot likes dogs.', bot.user.displayAvatarURL)
    message.channel.send(dogOutput);

    pre_message_dog.delete();
}

module.exports.help = {
    name: 'dog',
    aliases: ['doggo'],
    usage: 'dog',
    description: 'Pachimary Bot sends a random dog.',
    accessableby: 'Everyone'
}