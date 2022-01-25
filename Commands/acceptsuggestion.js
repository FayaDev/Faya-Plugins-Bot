const { Permissions, MessageEmbed, CategoryChannel } = require("discord.js");

module.exports = {
    name: 'acceptsuggestion',
    description: 'Accepts a suggestion',
    usage: '[message ID] (note)',
    async execute(message, args){
        try{
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");
    
            const messageId = args[0];
            const note = args.slice(1).join(" ")

            const suggestionChannel = message.guild.channels.cache.get('930206093676781569');
            const outcomeChannel = message.guild.channels.cache.get('933071258013274132');
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageId);
            const data = suggestedEmbed.embeds[0];

            if (!messageId) return message.reply("You need to enter the ID of the suggestion.");
            if (!data) return message.reply("No embed has been found.");
            if (!suggestedEmbed) return message.reply("No embed has been found.");

            const acceptEmbed = new MessageEmbed()
                .setAuthor({ name: data.author.name, iconURL: data.author.iconURL})
                .setTitle("Suggestion")
                .setDescription(data.description)
                .addField("__Status:__", "✅ Accepted")
                .setColor("DARK_GREEN")

            if (note){
                acceptEmbed.addField("__Note:__", note)
            }

            suggestedEmbed.delete();
            message.delete();

            outcomeChannel.send({ embeds: [acceptEmbed] });
        }
        catch (error) {
            console.log(error);
        }
    }
}
