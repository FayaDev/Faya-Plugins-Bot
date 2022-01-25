const { MessageEmbed } = require("discord.js");

module.exports = (Discord, client, message) => {
    try {
        if (!message.channel.id == '930206093676781569' || message.author.bot || message.content.startsWith(process.env.PREFIX)) return;

        const suggestionChannel = message.guild.channels.cache.get('930206093676781569');

        const suggestEmbed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTitle("Suggestion")
            .setDescription(message.content)
            .setColor("#337fd5")
            .addField("__Status:__", "📊 Waiting for community feedback.")

            message.delete();

            suggestionChannel.send({ embeds: [suggestEmbed] }).then(embedMessage => {
            embedMessage.react('👍'); embedMessage.react('👎'); 
        });
    } catch (error) {
        console.log(error);
    }
}