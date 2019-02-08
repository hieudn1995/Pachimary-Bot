const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const botconfig = require('../botconfig.json');
const TimeFormat = require('hh-mm-ss');

module.exports.run = async (bot, message, args, prefix) => {
    const youtube = new YouTube(process.env.YT_API_KEY);

    if(!args[0]) {
        var playBad1 = new Discord.RichEmbed()
            .setTitle('Uoff!')
            .setDescription('You didn\'t specify a song!')
            .setFooter(`Correct command: ${prefix}play <link/searching words>`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(playBad1);
        return;
    }

    if(!message.member.voiceChannel) {
        var playBad3 = new Discord.RichEmbed()
            .setTitle('Retarded!')
            .setDescription('Pachimary Bot can\'t do that!')
            .setFooter('You must be in a Voice Channel!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(playBad3);
        return;
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

    if(args[0].startsWith('https://www.youtube.com/playlist?list=')) {

        const playlist = await youtube.getPlaylist(args[0]);

        const playlistVideos = await playlist.getVideos();

        for (let i = 0; i < playlistVideos.length; i++) {
            const video = playlistVideos[i];
            const valid = YTDL.validateURL(video.url);

            if (valid == true) {
                const song = await YTDL.getInfo(video.url);

                const zeneObject = {
                    title: song.title,
                    url: video.shortURL,
                    duration: song.player_response.videoDetails.isLive == true ? '🔴 LIVE' : '[' + TimeFormat.fromS(parseInt(song.length_seconds, 'mm:ss')) + ']',
                    lengthInSec: song.length_seconds,
                    thumbnail: song.thumbnail_url,
                    channel: song.author.name,
                }
            
                queue.push(zeneObject);
            }
        }

        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((voicechannel) => {
            play(voicechannel);
        });

        let playlistOutput = new Discord.RichEmbed()
            .setAuthor('Playlist added to teh queue!', '', args[0])
            .setDescription(`__Playlist Name:__ ${playlist.title.length > 43 ? playlist.title.substring(0, 43) + '...' : playlist.title} \n__Number of songs:__ **${playlistVideos.length}**`)
            .setFooter('I am an amazing DJ.')
            .setColor('#f15a35')
            .setThumbnail('https://i.imgur.com/8LaIJTB.png')
            .setTimestamp()
        message.channel.send(playlistOutput);
        return;
    }

    if(args[0].startsWith('https://www.youtube.com/')) {
        const valid = await YTDL.validateURL(args[0]);

        if (valid == true) {
            const song = await YTDL.getInfo(args[0]);

            const zeneObject = {
                title: song.title,
                url: `https://youtu.be/${song.video_id}`,
                duration: song.player_response.videoDetails.isLive == true ? '🔴 LIVE' : '[' + TimeFormat.fromS(parseInt(song.length_seconds, 'mm:ss')) + ']',
                lengthInSec: song.length_seconds,
                thumbnail: song.thumbnail_url,
                channel: song.author.name,
            }
    
            queue.push(zeneObject);
        } else {
            return message.channel.send(`Oh shit! I coudn\'t find any results for this link: **${args[0]}**`);
        }
    }

    else {
        const video = await youtube.searchVideos(args.join(' '), 1);
            
        if(video.length <= 0) {
            return message.channel.send(`Oh shit! I coudn\'t find any results for these words: **${kereses}**`);
        } else {
            const song = await YTDL.getInfo(video[0].url);

            const zeneObject = {
                title: song.title,
                url: video[0].shortURL,
                duration: song.player_response.videoDetails.isLive == true ? '🔴 LIVE' : '[' + TimeFormat.fromS(parseInt(song.length_seconds, 'mm:ss')) + ']',
                lengthInSec: song.length_seconds,
                thumbnail: song.thumbnail_url,
                channel: song.author.name,
            }
    
            queue.push(zeneObject);
        }
    }

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((voicechannel) => {
        play(voicechannel);
    });
    
    const song = queue[queue.length - 1];
        
    let playOutput = new Discord.RichEmbed()
        .setAuthor('Added to queue!', '', song.video_url)
        .setDescription(`__Tittle:__ ${song.title.length > 43 ? song.title.substring(0, 43) + '...' : song.title} **${song.duration}** \n__Channel:__ ${song.channel}`)
        .setFooter('Pachimary Bot is an amazing DJ, but he still needs to learn.', song.thumbnail_url)
        .setColor('#f15a35')
        .setThumbnail('https://i.imgur.com/8LaIJTB.png')
        .setTimestamp()
    message.channel.send(playOutput);
}

module.exports.help = {
    name: 'play',
    aliases: ['p'],
    usage: 'play <yt_link/words>',
    description: 'Plays the specified song into the Voice Channel that you are in. (only 1 connection/server).',
    accessableby: 'Everyone'
}