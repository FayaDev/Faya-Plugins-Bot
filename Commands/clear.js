const { Permissions, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'clear',
    description: 'deletes the entered amount of messages',
    async execute(message, args){
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");
        
        if (!args[0]) return message.reply("You must enter an amount to clear!");
        if (isNaN(args[0])) return message.reply("You must enter a number!");

        if (args[0] > 100) return message.reply("You can't delete more than 100 messages!");
        if (args[0] < 1) return message.reply("You must delete atleast 1 message!");

        message.channel.bulkDelete(args[0]).then(messages => {
            message.channel.send(`Deleted ${messages.size} messages.`);
        }).catch(e => console.log(e));
    }
}
