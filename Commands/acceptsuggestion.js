const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'acceptsuggestion',
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
            if (!note) note = "Accepted."

            const acceptEmbed = new MessageEmbed()
                .setAuthor({ name: data.author.name, iconURL: data.author.iconURL})
                .setTitle("Suggestion")
                .setDescription(data.description)
                .addField("__Status:__ ✅", `> ${note}`)
                .setColor("DARK_GREEN")
                .setFooter({ text: "Want to suggest something? use !suggest." })

            message.delete();

            suggestedEmbed.edit({ embeds: [acceptEmbed] });
        }
        catch (error) {
            console.log(error);
        }
    }
}
