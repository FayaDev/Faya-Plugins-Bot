const { Message, Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'kick',
    description: 'kicks a member.',
    execute(message, args){
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) || message.author.bot) return message.reply("You don't have the required permissions to perform this action.");
        
        const member = message.mentions.members.first();
        let reason = args.slice(1).join(" ");

        if (!member) return message.reply("You must enter a user!");
        if (!reason) reason = "No reason given";

        const kickEmbed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor('#B22222')
            .addFields(
                { name: 'Action', value: 'Kick', inline: true },
                { name: 'Target', value: member.toString(), inline: true },
                { name: 'Reason', value: reason, inline: true },
            )

            member.kick().then((member) => {
                message.channel.send({ embeds: [kickEmbed] });
            }).catch(() => {
                message.channel.send("Something went wrong.");
            });
        }
}