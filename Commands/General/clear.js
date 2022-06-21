const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    async execute(client, message, args, interaction){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");
        
            const logChannel = message.guild.channels.cache.get('987472077760122950');

            const amount = args[0];
            const reason = args.slice(1).join(" ");

            if (!amount) return message.reply("You must enter an amount to clear.");
            if (!reason) return message.reply("You must enter a reason.");
            if (isNaN(amount)) return message.reply("You must enter a number.");

            if (amount > 100) return message.reply("You can't delete more than 100 messages.");
            if (amount < 2) return message.reply("You must delete at least 2 messages.");

            const logEmbed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor("ORANGE")
                .setFooter({ text: `User ID: ${message.author.id}` })

            message.channel.bulkDelete(amount).then(messages => {
                message.channel.send(`Deleted **${messages.size}** messages.`).then(msg => {setTimeout(() => msg.delete(), 3000)});
                message.channel.send(`\n${message.author}, fill out an action report.`).then(msg => {setTimeout(() => msg.delete(), 7000)});

                logEmbed.setDescription(`**Deleted Messages:** ${messages.size}\n**Channel:** ${message.channel}\n**Reason:** ${reason}`)

                logChannel.send({ embeds: [logEmbed] })
            });
        } catch (err) {
           console.log(err); 
        }
    }
}