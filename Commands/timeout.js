const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'timeout',
    execute(client, message, args, Discord){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.TIMEOUT_MEMBERS)) return message.reply("You don't have the required permissions to perform this action.");

            const member = message.mentions.members.first();
            const time = args[1];

            if (!member) return message.reply("You must enter a user.");
            if (!time) return message.reply("Enter a time.")

            const actionMessage = new Discord.MessageEmbed()
                .setDescription(`**${message.author} timed out ${member.user.tag}**`)
                .addField("Time:", `${time} minutes`)
                .setColor("RED")
                .setFooter({text: `Target ID: ${member.user.id}`})
                
            message.channel.send({embeds: [actionMessage]});

            member.timeout(time * 60 * 1000);
            
        } catch (error) {
            console.log(error);
        }
    }
}