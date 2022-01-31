const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'kick',
    execute(client, message, args){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("You don't have the required permissions to perform this action.");
        
            const member = message.mentions.members.first();
            let reason = args.slice(1).join(" ");

            if (!member) return message.reply("You must enter a user.");
            if (!reason) reason = "No reason given.";

            const kickEmbed = new MessageEmbed()
                .setTitle("Member Kicked!")
                .setColor('#B22222')
                .addFields(
                    { name: 'Moderator', value: `${message.author.toString()} (${message.author.id})`},
                    { name: 'Kicked Member', value: `${member.toString()} (${member.id.toString()})` },
                    { name: 'Reason', value: reason },
                )

            member.kick().then((member) => message.channel.send({ embeds: [kickEmbed] }));
        } catch (error) {
            console.log(error);
        }
    }
}