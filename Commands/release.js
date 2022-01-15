const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'release',
    description: 'announce a new release.',
    execute(message, args){
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || message.author.bot) return message.channel.send(`${message.member}, you are not allowed to perform this action.`);
        
        let plugin = args[0].replace('_', ' ');
        let url = args[1];
        let image = args[2];
        let announcement = args.slice(3).join(" ");

        if (!plugin) return message.reply("You must enter a topic!");
        if (!announcement) return message.reply("You must enter an announcement!");

        const announceEmbed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTitle(plugin)
            .setURL(url)
            .setDescription(announcement)
            .setImage(image)

        message.delete();
        message.channel.send({ embeds: [announceEmbed] });

        }
}