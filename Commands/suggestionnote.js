const { Permissions, MessageEmbed } = require("discord.js");
const channelConfig = require("../config.json");

module.exports = {
    name: 'suggestionnote',
    async execute(client, message, args, Discord){
        try{
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");
    
            const messageId = args[0];
            let note = args.slice(1).join(" ")

            const suggestionChannel = message.guild.channels.cache.find(channel => channel.id == channelConfig.suggestionChannelId);
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageId);
            const data = suggestedEmbed.embeds[0];

            if (!messageId) return message.reply("You need to enter the ID of the suggestion.");
            if (!data) return message.reply("No embed has been found.");
            if (!suggestedEmbed) return message.reply("No embed has been found.");
            if (!note) return message.reply("You need to enter a note.");

            const suggestEmbed = new MessageEmbed()
                .setAuthor({ name: data.author.name, iconURL: data.author.iconURL})
                .setTitle("Suggestion")
                .setDescription(data.description)
                .addField("__Status:__ 📊", "Waiting for community feedback.")
                .addField(`__Note from ${message.author.username}:__`, `> ${note}`)
                .setColor("#337fd5")
                .setFooter({ text: "Want to suggest something? Simply type it in this channel!" })

            message.delete();

            suggestedEmbed.edit({ embeds: [suggestEmbed] });
        }
        catch (error) {
            console.log(error);
        }
    }
}
