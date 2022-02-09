const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'suggest',
    execute(client, message, args){
        try {
            const suggestionChannel = message.guild.channels.cache.find(logChannel => logChannel.name.includes('suggest'));

            const suggestion = args.slice(0).join(" ");

            const suggestEmbed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setTitle("Suggestion")
                .setDescription(suggestion.toString())
                .setColor("#337fd5")
                .addField("__Status:__ 📊", "Waiting for community feedback.")
                .setFooter({ text: "Want to suggest something? use !suggest." })


            if (args[0].startsWith("https://")) {
                suggestEmbed.setImage(args[0])
            }
            
            message.delete();
    
            suggestionChannel.send({ embeds: [suggestEmbed] }).then(embedMessage => {
            embedMessage.react('👍'); embedMessage.react('👎'); 
            });
        } catch (err) {
           console.log(err); 
        }
    }
}
