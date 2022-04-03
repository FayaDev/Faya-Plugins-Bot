const { MessageEmbed } = require('discord.js');
const channelConfig = require("../config.json");

module.exports = {
    name: 'resuggest',
    async execute(client, message, args){
        try {
            if (!message.member.permissions.has('MANAGE_MESSAGES') || message.author.bot) return message.reply("You don't have the required permissions to perform this action.");

            const suggestionChannel = message.guild.channels.cache.find(channel => channel.id == configChannel.suggestionChannelId);
    
            const member = message.mentions.members.first();
            let customContent = args.slice(1).join(" ");

            const suggestEmbed = new MessageEmbed()
                .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
                .setTitle("Suggestion")
                .setDescription(customContent)
                .setColor("#337fd5")
                .addField("__Status:__ 📊", "Waiting for community feedback.")
                .setFooter({ text: "Want to suggest something? Simply type it in this channel!" })

            message.delete();

            suggestionChannel.send({ embeds: [suggestEmbed] }).then(embedMessage => {
            embedMessage.react('⬆️'); embedMessage.react('⬇️'); 
            });
        } catch (err) {
           console.log(err); 
        }
    }
}
