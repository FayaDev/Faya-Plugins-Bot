const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'issue',
    description: 'creates an issue embed',
    usage: '[issue]',
    execute(message, args){
        try {
            
            let issue = args.slice(0).join(" ");
            if (!issue) return message.reply("Enter an issue.");

            const issueEmbed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor("DARK_RED")
                .setTitle("Issue")
                .setDescription(issue)

            message.delete();

            message.channel.send({ embeds: [issueEmbed] });
        } catch (error) {
            console.log(error);   
        }
    }
}