const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
    if(queue.length <= 0) {
        let clearQueueBad1 = new Discord.RichEmbed()
            .setTitle('Autista!')
            .setDescription('Nincs is lejátszási lista!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(clearQueueBad1);
        return;
    }
    
    queue.length = 0;

    let clearQueueOutput2 = new Discord.RichEmbed()
        .setTitle('Playlist cleared!')
        .setDescription('Pachimary Bot successfully cleared the playlist.')
        .setFooter(`Playlist length: ${queue.length}`)
        .setColor('#f15a35')
        .setTimestamp()
    message.channel.send(clearQueueOutput2);
}

module.exports.help = {
    name: 'clearqueue',
    aliases: ['clearquue', 'cq', 'clearq', 'cqueue', 'qc'],
    usage: 'clearqueue',
    description: 'Cleares the playlist.',
    accessableby: 'Everyone'
}