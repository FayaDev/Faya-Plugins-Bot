const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resuggest',
    async execute(client, message, args){
        try {
            if (!message.member.permissions.has('MANAGE_MESSAGES') || message.author.bot) return message.reply("You don't have the required permissions to perform this action.");

            const suggestionChannel = message.guild.channels.cache.find(logChannel => logChannel.name.includes('suggestions'));
    
                const messageId = args[0];
                const suggestion = await suggestionChannel.messages.fetch(messageId);
                const member = message.mentions.members.first();
                let customContent = args.slice(2).join(" ");

                const suggestEmbed = new MessageEmbed()
                    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
                    .setTitle("Suggestion")
                    .setDescription(customContent)
                    .setImage("https://cdn.discordapp.com/attachments/930206093676781569/937799993690054726/Screenshot_2022-01-31_210153.png")
                    .setColor("#337fd5")
                    .addField("__Status:__ 📊", "Waiting for community feedback.")
                    .setFooter({ text: "Want to suggest something? use !suggest." })

                message.delete();
                //suggestion.edit({ embeds: [suggestEmbed] });

                suggestionChannel.send({ embeds: [suggestEmbed] }).then(embedMessage => {
                embedMessage.react('👍'); embedMessage.react('👎'); 
                });
        } catch (err) {
           console.log(err); 
        }
    }
}
