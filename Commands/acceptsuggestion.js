const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'acceptsuggestion',
    description: 'Accepts a suggestion',
    usage: '[message ID] (note)',
    async execute(client, message, args, Discord){
        try{
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");
    
            const messageId = args[0];
            let note = args.slice(1).join(" ")

            const suggestionChannel = message.guild.channels.cache.get('930206093676781569');
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageId);
            const data = suggestedEmbed.embeds[0];

            if (!messageId) return message.reply("You need to enter the ID of the suggestion.");
            if (!data) return message.reply("No embed has been found.");
            if (!suggestedEmbed) return message.reply("No embed has been found.");
            if (!note) note = "No reason given."

            const acceptEmbed = new MessageEmbed()
                .setAuthor({ name: data.author.name, iconURL: data.author.iconURL})
                .setTitle("Suggestion")
                .setDescription(data.description)
                .addField("__Status:__", `✅ ${note}`)
                .setColor("DARK_GREEN")

<<<<<<< HEAD
            message.author.send({ embeds: [acceptEmbed] })
=======
            if (note){
                acceptEmbed.addField("__Note:__", note)
            }

>>>>>>> 97131f11166209390d58d3cbcdf331f42316c760
            message.delete();

            suggestedEmbed.edit({ embeds: [acceptEmbed] });
        }
        catch (error) {
            console.log(error);
        }
    }
}
