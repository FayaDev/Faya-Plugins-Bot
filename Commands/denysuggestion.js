const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'denysuggestion',
    async execute(message, args){
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || message.author.bot) return message.channel.send(`${message.member}, you are not allowed to perform this action.`);
    
        const messageId = args[0];
        const suggestionChannel = message.guild.channels.cache.get('930206093676781569');
        const suggestedEmbed = await suggestionChannel.messages.fetch(messageId);
        const data = suggestedEmbed.embeds[0];

        if (!messageId) return message.reply("You need to enter the ID of the suggestion.");
        if (!data) return message.reply("No embed has been found.");

        const acceptEmbed = new MessageEmbed()
            .setAuthor({ name: data.author.name, iconURL: data.author.iconURL})
            .setTitle("Suggestion")
            .setDescription(data.description)
            .addField("__Status:__", "⛔ Denied")
            .setColor("DARK_RED")

            
        message.channel.send({ embeds: [acceptEmbed] });
    }
}
