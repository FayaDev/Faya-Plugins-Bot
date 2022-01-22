const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'solveissue',
    description: 'Solve a reported issue',
    usage: '[message ID]',
    async execute(message, args){
        try{
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");
    
            const messageId = args[0];
            const issueChannel = message.guild.channels.cache.get('934403719892721724');
            const outcomeChannel = message.guild.channels.cache.get('934399552696492052');
            const solvedIssueEmbed = await issueChannel.messages.fetch(messageId);
            const data = solvedIssueEmbed.embeds[0];

            if (!messageId) return message.reply("You need to enter the ID of the suggestion.");
            if (!data) return message.reply("No embed has been found.");
            if (!solvedIssueEmbed) return message.reply("No embed has been found.");

            const solvedEmbed = new MessageEmbed()
                .setAuthor({ name: data.author.name, iconURL: data.author.iconURL})
                .setTitle("Issue")
                .setDescription(data.description)
                .addField("__Status:__", "✅ Solved")
                .setColor("DARK_GREEN")

            message.delete();

            outcomeChannel.send({ embeds: [solvedEmbed] });
        }
        catch (error) {
            console.log(error);
        }
    }
}
