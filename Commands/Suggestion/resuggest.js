const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resuggest',
    async execute(client, message, args){
        try {
            if (!message.member.permissions.has('MANAGE_MESSAGES') || message.author.bot) return message.reply("You don't have the required permissions to perform this action.");

            let suggestionChannel = message.guild.channels.cache.get('930206093676781569')
    
            const member = message.mentions.members.first();
            let customContent = args.slice(1).join(" ");

            const suggestEmbed = new MessageEmbed()
                .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
                .setTitle("Suggestion")
                .setDescription(customContent)
                .setColor("#7289da")
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
