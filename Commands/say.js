const { Permissions } = require("discord.js");

module.exports = {
    name: 'say',
    description: 'use Yubu to say something',
    execute(message, args){
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || message.author.bot) return message.reply("You don't have the required permissions to perform this action.");
        
        let content = args.slice(0).join(" ");
        if (!content) return message.reply("Enter something to say!");

        message.channel.send(content);
    }
}