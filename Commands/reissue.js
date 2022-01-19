const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'reissue',
    execute(message, args){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");
            let issue = args.slice(1).join(" ");
            const member = message.mentions.members.first();

            if (!member) return message.reply("Enter a member.");
            if (!issue) return message.reply("Enter an issue to redo.");

            const issueEmbed = new MessageEmbed()
                .setAuthor({ name: member.user.tag.toString(), iconURL: member.displayAvatarURL() })
                .setColor("DARK_RED")
                .setTitle("Issue")
                .setDescription(issue)

            message.delete();

            message.channel.send({ embeds: [issueEmbed] });           
        } catch (error) {
            console.log(error);
        }
    }
}