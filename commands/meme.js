const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot, message) => {
    let pre_message_meme  = await message.channel.send('Meme Review 👏 👏');
    
    let {body} = await superagent
        .get('https://api-to.get-a.life/meme');

    if(!{body}) return message.channel.send('The server fucked up...')
    
    let randomMemeEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setImage(body.url)
        .setFooter('meme review 👏 👏', bot.user.displayAvatarURL)
    message.channel.send(randomMemeEmbed);

    pre_message_meme.delete();
}

module.exports.help = {
    name: 'meme',
    aliases: ['randommeme', 'random_meme'],
    usage: 'meme',
    description: 'Sends a random meme.',
    accessableby: 'Everyone'
}