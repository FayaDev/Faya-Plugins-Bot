const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'suggest',
    description: 'Sends a to the suggestion channel',
    usage: '[message ID]',
    async execute(message, args){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");

            const messageId = args[0];
            const suggestionDumpChannel = message.guild.channels.cache.get('933084536714174544');
            const suggestionChannel = message.guild.channels.cache.get('930206093676781569');
            const suggestion = await suggestionDumpChannel.messages.fetch(messageId);

            if (!messageId) return message.reply("You need to enter the ID of the suggestion.");
            if (!suggestion) return message.reply("Couldn't find any suggestion")

            message.delete();

            const suggestEmbed = new MessageEmbed()
                .setAuthor({ name: suggestion.author.tag, iconURL: suggestion.author.displayAvatarURL() })
                .setTitle("Suggestion")
                .setDescription(suggestion.content)
                .setColor("BLUE")

            suggestionChannel.send({ embeds: [suggestEmbed] }).then(embedMessage => {
                embedMessage.react('👍'); embedMessage.react('👎'); 
            });
        } catch (error) {
            console.log(error);
        }
    }
}