const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    async execute(client, message, args){
        try {
            if (!message.member.permissions.has('MANAGE_MESSAGES') || message.author.bot) return message.reply("You don't have the required permissions to perform this action.");
            
            const pollChannel = message.guild.channels.cache.find(logChannel => logChannel.name.includes('suggestions'));

            let pollContent = args.slice(0).join(' ');

            const pollEmbed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor("#337fd5")
                .setTitle("Poll")
                .setDescription(pollContent)
                .addField("__Status:__ 📊", "Waiting for community feedback.")

            message.delete();
            pollChannel.send({ embeds: [pollEmbed] }).then(embedMessage => {
                embedMessage.react('1️⃣'); embedMessage.react('2️⃣'); 
            });
        } catch (err) {
           console.log(err); 
        }
    }
}
