const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'acceptsuggestion',
    async execute(message, args){
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || message.author.bot) return message.channel.send(`${message.member}, you are not allowed to perform this action.`);
    
        const messageId = args[0];
        const suggestionChannel = message.guild.channels.cache.get('932364904193740910');
        const suggestedEmbed = await suggestionChannel.messages.fetch(messageId);
        const data = suggestedEmbed.embeds[0];

        const acceptEmbed = new MessageEmbed()
            .setAuthor({ name: data.author.name, iconURL: data.author.iconURL})
            .setTitle("Suggestion Accepted")
            .setDescription(data.description)
            .setColor("DARK_GREEN")

        message.channel.send({ embeds: acceptEmbed });
    }
}
