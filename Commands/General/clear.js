const { Permissions } = require('discord.js');

module.exports = {
    name: 'clear',
    async execute(client, message, args){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");
        
            let amount = args[0];

            if (!amount) return message.reply("You must enter an amount to clear.");
            if (isNaN(amount)) return message.reply("You must enter a number.");

            if (amount > 100) return message.reply("You can't delete more than 100 messages.");
            if (amount < 1) return message.reply("You must delete at least 1 message.");

            message.channel.bulkDelete(amount).then(messages => {
                message.channel.send(`Deleted **${messages.size}** messages.`);
            });
        } catch (err) {
           console.log(err); 
        }
    }
}