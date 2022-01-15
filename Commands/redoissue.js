const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'redoissue',
    execute(message, args){
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || message.author.bot) return message.channel.send(`${message.member}, you are not allowed to perform this action.`);
        let issue = args.slice(1).join(" ");
        const member = message.mentions.members.first();

        if (!member) return message.reply("Enter a member!");
        if (!issue) return message.reply("Enter an issue to redo!");

        const issueEmbed = new MessageEmbed()
            .setAuthor({ name: member.user.tag.toString(), iconURL: member.displayAvatarURL() })
            .setColor("DARK_RED")
            .setTitle("Issue")
            .setDescription(issue)

        message.delete();

        message.channel.send({ embeds: [issueEmbed] });
        }
    }