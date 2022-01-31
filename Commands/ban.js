const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ban',
    execute(client, message, args){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply("You don't have the required permissions to perform this action.");
        
            const member = message.mentions.members.first();
            let reason = args.slice(1).join(" ");

            if (!member) return message.reply("You must enter a user.");
            if (!reason) reason = "No reason given.";

            const banEmbed = new MessageEmbed()
            .setTitle("Member Banned!")
                .setColor('#B22222')
                .addFields(
                    { name: 'Moderator', value: `${message.author.toString()} (${message.author.id})`},
                    { name: 'Banned Member', value: `${member.toString()} (${member.id.toString()})` },
                    { name: 'Reason', value: reason },
                )

            member.ban().then((member) => message.channel.send({ embeds: [banEmbed] }));
        } catch (error) {
            console.log(error);
        }
    }
}