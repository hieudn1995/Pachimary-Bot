const Discord = require('discord.js');
const fs = require('fs');
const prefixJSON = require('./data/prefix.json');

const botconfig = require('./botconfig.json');

const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

require('./util/eventHandler.js') (bot);

function loadCommands() {
    fs.readdir('./commands/', (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0) {
            console.log('Coudn\'t find commands.');
            return;
        }
    
        jsfile.forEach((f, i) => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props);
            props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name, props)
            });
        });

        console.log(`${jsfile.length} commands loaded!`);
    });    
}

loadCommands();

global.nowPlaying = null;
global.queue = [];
global.blacklist = [];
global.shitwords = ['fuck', 'shit', 'fack', 'urmom'];

global.Sleep = function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

global.AmountHandler = function(amount, one, more) {
    amount = parseInt(Math.floor(amount));

    if(amount <= 1) {
        return one;
    } else {
        return more;
    }
}

bot.on("message", async (message) => {
    if(message.channel.type === 'dm') return;
    if(message.author === bot) return;

    let prefix;

    if(!prefixJSON.prefix) {
        prefix = botconfig.prefix;
    } else {
        prefix = prefixJSON.prefix;
    }

    if(!message.content.startsWith(prefix)) return;

    if(blacklist.includes(message.author.id)) {
        message.delete();
        message.reply('GAY! You don\'t have permission to do that!   lol').then((msg) => msg.delete(3000));
        return;
    }
        
    const messageArray = message.content.split(' ');
    const cmd = messageArray[0].toLowerCase();
    const args = messageArray.slice(1);
    const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if(commandfile) commandfile.run(bot, message, args, prefix);
});

bot.login(botconfig.token);
