const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'resuggest',
    execute(message, args){

        let suggestion = args.slice(1).join(" ");
        const member = message.mentions.members.first();

        if (!suggestion) return message.reply("Enter a suggestion!");
        if (!member) return message.reply("Enter a member!");

        const suggestEmbed = new MessageEmbed()
            .setAuthor({ name: member.user.tag.toString(), iconURL: member.displayAvatarURL() })
            .setTitle("Suggestion")
            .setDescription(suggestion)

        message.delete();

        message.channel.send({ embeds: [suggestEmbed] }).then(embedMessage => {
            embedMessage.react('👍'); embedMessage.react('👎'); 
        });
    }
}