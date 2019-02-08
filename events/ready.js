const Discord = require('discord.js');

module.exports = (bot, member) => {
    console.log('Pachimary Bot is ready!');

    let statuszok = [
        'Jeff Kaplan  |  !help',
        'Overwatch news',
        '!help'
    ]
  
    setInterval(function() {
        let status = statuszok[Math.floor(Math.random() * statuszok.length)];
        bot.user.setActivity(status, {type: "LISTENING"});
    }, 5000);

    //bot.user.setAvatar(botconfig.bot_avatar);

    bot.user.setStatus('Online');

}