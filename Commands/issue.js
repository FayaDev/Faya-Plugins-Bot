const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'issue',
    description: 'Sends an issue to the issue channel',
    usage: '[message ID]',
    async execute(message, args){
        try{
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");

            const messageId = args[0];
            const issueDumpChannel = message.guild.channels.cache.get('934399462703505458');
            const issueChannel = message.guild.channels.cache.get('934403719892721724');
            const issue = await issueDumpChannel.messages.fetch(messageId);

            if (!messageId) return message.reply("You need to enter the ID of the issue.");
            if (!issue) return message.reply("Enter an issue.");

            const issueEmbed = new MessageEmbed()
                .setAuthor({ name: issue.author.tag, iconURL: issue.author.displayAvatarURL() })
                .setTitle("Issue")
                .setDescription(issue.content)
                .setColor("DARK_RED")

            message.delete();
            
            issueChannel.send({ embeds: [issueEmbed] }); 
        } catch (error) {
            console.log(error);
        }
    }
}