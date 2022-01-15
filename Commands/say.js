const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'say',
    description: 'use Yubu to say something',
    execute(message, args){
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || message.author.bot) return message.channel.send(`${message.member}, you are not allowed to perform this action.`);
        
        let content = args.slice(0).join(" ");
        if (!content) return message.reply("Enter something to say!");

        const sayEmbed = new MessageEmbed()
        .setDescription(content)

        message.channel.send({ embeds: [sayEmbed] });
    }
}
