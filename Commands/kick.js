const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'kick',
    execute(client, message, args, Discord){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("You don't have the required permissions to perform this action.");

            const member = message.mentions.members.first();
            let reason = args.slice(1).join(" ");

            if (!member) return message.reply("You must enter a user.");
            if (!reason) reason = "an unknown reason";

            const actionMessage = new MessageEmbed()
                .setDescription(`**${message.author} kicked ${member.user.tag}**`)
                .addField("Reason:", reason)
                .setColor("RED")
                .setFooter({text: `Target ID: ${member.user.id}`})
                
            message.channel.send({embeds: [actionMessage]});

            member.kick({ reason: reason });
            
        } catch (error) {
            console.log(error);
        }
    }
}