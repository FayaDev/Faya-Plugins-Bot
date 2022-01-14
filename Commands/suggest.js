const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'suggest',
    execute(message, args){

        let suggestion = args.slice(0).join(" ");
        if (!suggestion) return message.reply("Enter a suggestion!");

        const suggestEmbed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTitle("Suggestion")
            .setDescription(suggestion)

        message.delete();

        message.channel.send({ embeds: [suggestEmbed] }).then(embedMessage => {
            embedMessage.react('👍'); embedMessage.react('👎'); 
        });
    }
}