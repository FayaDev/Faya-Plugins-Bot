const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'denysuggestion',
    description: 'Denies a suggestion',
    usage: '[message ID] (note)',
    async execute(client, message, args, Discord){
        try{
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");
    
            const messageId = args[0];
            const note = args.slice(1).join(" ")

            const suggestionChannel = message.guild.channels.cache.get('932364904193740910');
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageId);
            const data = suggestedEmbed.embeds[0];

            if (!messageId) return message.reply("You need to enter the ID of the suggestion.");
            if (!data) return message.reply("No embed has been found.");
            if (!suggestedEmbed) return message.reply("No embed has been found.");

            const denyEmbed = new MessageEmbed()
                .setAuthor({ name: data.author.name, iconURL: data.author.iconURL})
                .setTitle("Suggestion")
                .setDescription(data.description)
                .addField("__Status:__", "⛔ Denied")
                .setColor("DARK_RED")

            if (note){
                denyEmbed.addField("__Note:__", note)
            }

            message.delete();

            suggestedEmbed.edit({ embeds: [denyEmbed] });
        }
        catch (error) {
            console.log(error);
        }
    }
}
