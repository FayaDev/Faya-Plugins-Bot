const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'release',
    description: 'announce a new release.',
    execute(message, args){
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || message.author.bot) return message.channel.send(`${message.member}, you are not allowed to perform this action.`);
        
        const member = message.mentions.members.first();
        let plugin = args[0];
        let url = args[1];
        let image = args[2];
        let announcement = args.slice(3).join(" ");

        if (!plugin) return message.reply("You must enter a plugin name!");
        if (!url) return message.reply("You must enter a URL!");
        if (!image) return message.reply("You must enter an image link!");
        if (!announcement) return message.reply("You must enter an announcement!");

        const announceEmbed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTitle(plugin.replace('_', ' '))
            .setURL(url)
            .setDescription(announcement)
            .setImage(image)

        message.delete();
        message.channel.send({ embeds: [announceEmbed] });
        }
}