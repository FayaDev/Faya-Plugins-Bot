const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'removetimeout',
    execute(client, message, args, Discord){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.TIMEOUT_MEMBERS)) return message.reply("You don't have the required permissions to perform this action.");

            const member = message.mentions.members.first();

            if (!member) return message.reply("You must enter a user.");

            const actionMessage = new Discord.MessageEmbed()
                .setDescription(`**${message.author} removed ${member}'s timeout**`)
                .setColor("GREEN")
                .setFooter({text: `Target ID: ${member.user.id}`})
                
            message.channel.send({embeds: [actionMessage]});

            member.timeout(time * 60 * 1000);
            
        } catch (error) {
            console.log(error);
        }
    }
}