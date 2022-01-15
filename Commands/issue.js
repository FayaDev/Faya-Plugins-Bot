const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'issue',
    execute(message, args){

        let issue = args.slice(0).join(" ");
        if (!issue) return message.reply("Enter an issue!");

        const issueEmbed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor("DARK_RED")
            .setTitle("Issue")
            .setDescription(issue)

        message.delete();

        message.channel.send({ embeds: [issueEmbed] });
        
    }
}