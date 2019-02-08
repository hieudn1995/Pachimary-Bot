const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const TimeFormat = require('hh-mm-ss');

module.exports.run = async (bot, message, prefix) => {
    if(nowPlaying == null) {
        let queueBad1 = new Discord.RichEmbed()
            .setTitle('Autistic!')
            .setDescription('There isn\'t any music playing!')
            .setFooter(`You can add one by the ${prefix}play command.`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(queueBad1);
        return;
    }

    var idotartam = 0;

    let lista = [];

    for (let i = 0; i < queue.length; i++) {
        const song = queue[i];
        const sorszam = i + 1;

        if(!isNaN(song.lengthInSec)) idotartam += parseInt(song.lengthInSec);

        lista.push(`\xa0\xa0 **${sorszam}) - ** ${song.title.length > 40 ? song.title.substring(0, 40) + '...' : song.title} **${song.duration}**`)
    }


    let queueOutput = new Discord.RichEmbed()
        .setTitle(queue.length >= 1 ? 'Songs:' : 'Now Playing:')
        .setDescription(queue.length >= 1 ? `There ${AmountHandler(lista.length, 'is', 'are')} **${lista.length}** ${AmountHandler(lista.length, 'song', 'songs')} in the queue. \n\n__Now Playing:__ \n\n ${nowPlaying.title} **${nowPlaying.duration}** \n\n__Queue:__ \n\n${lista.join('\n\n')}` : `${nowPlaying.title} **${nowPlaying.duration}**`)
        .setFooter(queue.length >= 1 ? 'Pachimary Bot is a good DJ, but he still has more to learn.' : '')
        .setColor('#f15a35')
        .setThumbnail('https://i.imgur.com/8LaIJTB.png')
        .setTimestamp()
    message.channel.send(queueOutput);
}

module.exports.help = {
    name: 'queue',
    aliases: ['q'],
    usage: 'queue',
    description: 'Shows the current queue.',
    accessableby: 'Everyone'
}