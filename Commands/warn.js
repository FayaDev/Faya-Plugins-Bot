const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'warn',
    execute(client, message, args){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("You don't have the required permissions to perform this action.");
        
            const member = message.mentions.members.first();
            let reason = args.slice(1).join(" ");
            if (!member) return message.reply("You must enter a user.");
            if (!reason) reason = "an unknown reason";

            const warnEmbed = new MessageEmbed()
                .setDescription(`**✅ ${member.user.tag} has been warned for __${reason}__ by ${message.author.tag}**`)
                .setColor('DARK_GREEN')

                message.channel.send({ embeds: [warnEmbed] });
            
        } catch (error) {
            console.log(error);
        }
    }
}