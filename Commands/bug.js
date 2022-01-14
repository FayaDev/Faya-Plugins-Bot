const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'bug',
    execute(message, args){

        let bug = args.slice(0).join(" ");
        if (!bug) return message.reply("Enter a suggestion!");

        const bugEmbed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor("DARK_RED")
            .setTitle("Bug Report")
            .setDescription(bug)

        message.delete();

        message.channel.send({ embeds: [bugEmbed] });
        
    }
}