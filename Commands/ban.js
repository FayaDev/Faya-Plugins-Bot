const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ban',
    async execute(client, message, args){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply("You don't have the required permissions to perform this action.");
        
            const member = message.mentions.members.first();
            let reason = args.slice(1).join(" ");
            if (!member) return message.reply("You must enter a user.");
            if (!reason) reason = "an unknown reason";

            const banEmbed = new MessageEmbed()
                .setDescription(`**✅ ${member.user.tag} has been banned for __${reason}__ by ${message.author.tag}**`)
                .setColor('DARK_GREEN')

            message.guild.ban(member, { reason: reason }).then((member) => message.channel.send({ embeds: [banEmbed] }));
        } catch (error) {
            console.log(error);
        }
    }
}