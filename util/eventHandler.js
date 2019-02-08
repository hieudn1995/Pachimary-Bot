const reqEvent = (event) => require(`../events/${event}`);

module.exports = (bot, message) => {
    bot.on("ready", () => reqEvent("ready") (bot, message));
    bot.on("guildMemberAdd", (member) => reqEvent("member_join") (bot, member));
    bot.on("guildMemberRemove", (member) => reqEvent("member_leave") (bot, member));
    bot.on("roleCreate", (role) => reqEvent("role_create") (bot, role));
    bot.on("roleDelete", (role) => reqEvent("role_remove") (bot, role));
    bot.on("roleUpdate", (role, newRole, oldRole) => reqEvent("role_update") (bot, role, newRole, oldRole));
    bot.on("reconnecting", () => reqEvent("reconnecting") (bot));
    bot.on("error", reqEvent("error"));
}