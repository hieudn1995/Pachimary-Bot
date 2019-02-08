const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(queue.length <= 0) {
        let clearQueueBad1 = new Discord.RichEmbed()
            .setTitle('Autistic!')
            .setDescription('The aren\'t any songs in the queue!')
            .setFooter(`You can add one by the ${prefix}play command.`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(clearQueueBad1);
        return;
    }
    
    if(args[0]) {
        if(isNaN(args[0]) || args[0] > queue.length || args[0] < 1) {
            let removeQueuebad2 = new Discord.RichEmbed()
                .setTitle('Mentally ill!')
                .setDescription('Pachimary Bot can\'t do that!')
                .setFooter('You have entered info incorrectly!')
                .setColor('#f15a35')
                .setTimestamp()
            message.channel.send(removeQueuebad2);
        } else {
            queue.splice(args[0]-1, 1)

            let removeQueueOutput1 = new Discord.RichEmbed()
                .setTitle('Song removed!')
                .setDescription(`Patchimary Bot has removed the **${args[0]}**. song from the queue.`)
                .setFooter('Queue\'s length: ' + queue.length)
                .setColor('#f15a35')
                .setTimestamp()
            message.channel.send(removeQueueOutput1);    
            return;
        }
    } else {
        let removeQueuebad2 = new Discord.RichEmbed()
            .setTitle('Mentally ill!')
            .setDescription('Pachimary Bot can\'t do that!')
            .setFooter('Add the number of the song that you want to remove!')
            .setColor('#f15a35')
            .setTimestamp()
        message.channel.send(removeQueuebad2);
    }
}

module.exports.help = {
    name: 'queueremove',
    aliases: ['removequeue', 'qremove', 'queuer', 'qr', 'rq', 'rqueue'],
    usage: 'queueremove <number of the song in the queue>',
    description: 'It removes that song from the queue.',
    accessableby: 'Everyone'
}