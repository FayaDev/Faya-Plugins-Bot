const { MessageEmbed } = require('discord.js');

module.exports = async (Discord, client, message, args) => {    
    const suggestionChannel = message.guild.channels.cache.find(sugChannel => sugChannel.name.includes('suggest'));

    if (message.channel.id != suggestionChannel.id || message.author.bot || message.content.startsWith(process.env.PREFIX)) return;

    try {

        const suggestEmbed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTitle(`Suggestion`)
            .setDescription(message.toString())
            .setColor("#337fd5")
            .addField("__Status:__ 📊", "Waiting for community feedback.")
            .setFooter({ text: "Want to suggest something? Simply type it in this channel!" })    

        await suggestionChannel.send({ embeds: [suggestEmbed] }).then(embedMessage => {
            embedMessage.react('⬆️'); 
            embedMessage.react('⬇️'); 
        });

        message.delete();

    } catch (err) {
       console.log(err); 
    }
}