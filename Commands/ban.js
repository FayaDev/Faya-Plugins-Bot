const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ban',
    description: 'bans a member.',
    usage: '[user] (reason)',
    execute(client, message, args){
        try{
            if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply("You don't have the required permissions to perform this action.");
        
            const member = message.mentions.members.user.id;
            let reason = args.slice(1).join(" ");

            if (!member) return message.reply("You must enter a user.");
            if (!reason) reason = "No reason given.";

            const banEmbed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('#B22222')
                .addFields(
                    { name: 'Action', value: 'Ban', inline: true },
                    { name: 'Target', value: member, inline: true },
                    { name: 'Reason', value: reason, inline: true },
                )	        

            member.ban().then((member) => message.channel.send({ embeds: [banEmbed] }));
        }
        catch (error) {
            console.log(error);
        }
    }
}