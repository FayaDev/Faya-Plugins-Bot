const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'suggest',
    usage: '[amount]',
    execute(client, message, args){
        try {
            if (!message.author.bot) {
                const suggestionChannel = message.guild.channels.cache.get('932364904193740910');
    
                const suggestion = args.slice(0).join(" ");

                const suggestEmbed = new MessageEmbed()
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                    .setTitle("Suggestion #116")
                    .setDescription(suggestion.toString())
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
