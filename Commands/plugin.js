const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'plugin',
    description: 'Shows a plugin\'s details',
    usage: '[plugin] [url] [image url] [description]',
    execute(message, args){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");
        
            const member = message.mentions.members.first();
            let plugin = args[0].replaceAll('_', ' ');
            let url = args[1];
            let image = args[2];
            let details = args.slice(3).join(" ");

            if (!plugin) return message.reply("You must enter a plugin name.");
            if (!url) return message.reply("You must enter a URL.");
            if (!image) return message.reply("You must enter an image link.");
            if (!details) return message.reply("You must enter an announcement.");

            const pluginEmbed = new MessageEmbed()
                .setTitle(plugin)
                .setURL(url)
                .setDescription(`**${details}**`)
                .setImage(image)

            message.delete();
            message.channel.send({ embeds: [pluginEmbed] });
        } catch (error) {
            console.log(error);
        }
    }
}