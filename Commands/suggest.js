const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'suggest',
    async execute(message, args, client){
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || message.author.bot) return message.reply("You don't have the required permissions to perform this action.");

        const messageId = args[0];
        const suggestionDumpChannel = message.guild.channels.cache.get('933123841528586250');
        const suggestionChannel = message.guild.channels.cache.get('932364904193740910');
        const suggestion = await suggestionDumpChannel.messages.fetch(messageId);

        if (!messageId) return message.reply("You need to enter the ID of the suggestion.");

        message.delete();

        const suggestEmbed = new MessageEmbed()
            .setAuthor({ name: suggestion.author.tag, iconURL: suggestion.author.displayAvatarURL() })
            .setTitle("Suggestion")
            .setDescription(suggestion.content)


        suggestionChannel.send({ embeds: [suggestEmbed] }).then(embedMessage => {
            embedMessage.react('👍'); embedMessage.react('👎'); 
        });
    }
}