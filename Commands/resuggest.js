const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resuggest',
    usage: '[message ID]',
    async execute(client, message, args){
        try {
            if (!message.author.bot) {
                const suggestionChannel = message.guild.channels.cache.get('930206093676781569');
    
                const messageId = args[0];
                const suggestion = await suggestionChannel.messages.fetch(messageId);

                const suggestEmbed = new MessageEmbed()
                    .setAuthor({ name: suggestion.author.tag, iconURL: suggestion.author.displayAvatarURL() })
                    .setTitle("Suggestion")
                    .setDescription(suggestion.content)
                    .setColor("#337fd5")
                    .addField("__Status:__", "📊 Waiting for community feedback.")
    
                message.delete();
    
                suggestionChannel.send({ embeds: [suggestEmbed] }).then(embedMessage => {
                embedMessage.react('👍'); embedMessage.react('👎'); 
                });
            }
        } catch (err) {
           console.log(err); 
        }
    }
}
