const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'announce',
    execute(client, message, args){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.reply("You don't have the required permissions to perform this action.");

            const role = args[0];
            const announcement = args.slice(1).join(" ");

            const announceEmbed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setDescription(announcement)

            message.delete();
            message.channel.send({ content: role, embeds: [announceEmbed] });
        } catch (error) {
            console.log(error);
        }
    }
}
