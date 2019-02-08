const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const botconfig = require('../botconfig.json');
const TimeFormat = require('hh-mm-ss');

module.exports.run = async (bot, message, args, prefix) => {
    const youtube = new YouTube(process.env.YT_API_KEY);

    if(!args[0]) {
        var playBad1 = new Discord.RichEmbed()
            .setTitle('Fucker!')
            .setDescription('You didn\'t specify a song!')
            .setFooter(`Correct command: ${prefix}search <searching words>`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(playBad1);
        return;
    }

    if(!message.member.voiceChannel) {
        var playBad3 = new Discord.RichEmbed()
            .setTitle('Fucker!')
            .setDescription('Pachimary Bot can\'t do that!')
            .setFooter('You must be in a Voice Channel!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(playBad3);
        return;
    }

    let kereses = args.join(' ');

    results = await youtube.searchVideos(kereses, 10);

    if(results.length <= 0) {
        return message.channel.send(`Oh shit! I coudn\'t find any results for these words: **${kereses}**`);  
    }

    let ytLINK = args.join('+');
    let sorszam = 1;

    let searchOutput = new Discord.RichEmbed()
        .setAuthor('I\'we found this::', 'https://i.imgur.com/tyWsHfs.png', `https://www.youtube.com/results?search_query=${ytLINK}`)
        .setDescription(`${results.map(videok => `**${sorszam++} -** ${videok.title.length > 70 ? videok.title.substring(0, 70) + '...' : videok.title}`).join('\n\n')} \n\n You have 10 seconds, choose obe by sending the number of the dong`)
        .setTimestamp()
        .setColor('#89c0c7')
        .setFooter('Choose one...')
    const searchOutputMSG = await message.channel.send(searchOutput);
    
    try {
        var response = await message.channel.awaitMessages(msg => msg.author.id == message.author.id && msg.content >= 1 && msg.content <= 10, {max: 1, time: 10000, errors: ['time']});
    } catch (error) {
        message.delete();
        searchOutputMSG.delete();
        message.channel.send('GAY, 10 seconds are over, canceling song selection!').then((msg) => msg.delete(5000));
        return;
    }

    if(response) {
        const song = await YTDL.getInfo(results[parseInt(response.first().content) - 1].url);

        const zeneObject = {
            title: song.title,
            url: results[parseInt(response.first().content) - 1].shortURL,
            duration: song.player_response.videoDetails.isLive == true ? '🔴 LIVE' : '[' + TimeFormat.fromS(parseInt(song.length_seconds, 'mm:ss')) + ']',
            lengthInSec: song.length_seconds,
            thumbnail: song.thumbnail_url,
            channel: song.author.name,
        }

        queue.push(zeneObject);
        searchOutputMSG.delete();
    }

    function play(voicechannel) {
        message.guild.dispatcher = voicechannel.playStream(YTDL(queue[0].url, { filter: 'audioonly' }));
        
        nowPlaying = queue[0];
        queue.shift();

        message.guild.dispatcher.on('end', function() {
            if (queue.length >= 1) {
                play(voicechannel)
            } else {
                voicechannel.disconnect();
                nowPlaying = null;
            }
        });
    }

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((voicechannel) => {
        play(voicechannel);
    });

    const song = queue[queue.length - 1];
        
    let searchOutputFinal = new Discord.RichEmbed()
        .setAuthor('Added to queue!', '', song.video_url)
        .setDescription(`__Tittle:__ ${song.title.length > 43 ? song.title.substring(0, 43) + '...' : song.title} **${song.duration}** \n__Channel:__ ${song.channel}`)
        .setFooter('Pachimary Bot is an amazing DJ, but he still needs to learn.', song.thumbnail_url)
        .setColor('#f15a35')
        .setThumbnail('https://i.imgur.com/8LaIJTB.png')
        .setTimestamp()
    message.channel.send(searchOutputFinal);
}

module.exports.help = {
    name: 'search',
    aliases: ['s'],
    usage: 'search <words>',
    description: 'Searches for the words on YouTube, and returns the top 10 results.',
    accessableby: 'Everyone'
}