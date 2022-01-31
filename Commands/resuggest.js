const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resuggest',
    async execute(client, message, args){
        try {
            if (!message.member.permissions.has('MANAGE_MESSAGES') || message.author.bot) return message.reply("You don't have the required permissions to perform this action.");

            const suggestionChannel = message.guild.channels.cache.get('930206093676781569');
    
                const messageId = args[0];
                const suggestion = await suggestionChannel.messages.fetch(messageId);

                const suggestEmbed = new MessageEmbed()
                    .setAuthor({ name: suggestion.author.tag, iconURL: suggestion.author.displayAvatarURL() })
                    .setTitle("Suggestion")
                    .setDescription(suggestion.content)
                    .setColor("#337fd5")
                    .addField("__Status:__", "📊 Waiting for community feedback.")
                    .setFooter({ text: "Want to suggest something? use !suggest." })

                message.delete();
    
                suggestionChannel.send({ embeds: [suggestEmbed] }).then(embedMessage => {
                embedMessage.react('👍'); embedMessage.react('👎'); 
                });
        } catch (err) {
           console.log(err); 
        }
    }
}
