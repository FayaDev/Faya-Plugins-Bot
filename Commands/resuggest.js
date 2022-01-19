const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'resuggest',
    execute(message, args){
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");
        let suggestion = args.slice(1).join(" ");
        const member = message.mentions.members.first();

        if (!member) return message.reply("Enter a member!");
        if (!suggestion) return message.reply("Enter a suggestion to redo!");

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