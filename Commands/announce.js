const { Permissions, MessageEmbed, LimitedCollection } = require("discord.js");

module.exports = {
    name: 'announce',
    execute(client, message, args){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");

            const msg = args.slice(0).join(" ");
            const title = msg.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
            let announcement = msg.replace(title, "").replace(/"/g, "");
            
            let imgURL = announcement.split(" ").splice(-1)[0];;
            let pageURL = announcement.split(" ").splice(-2)[0];;
            
            announcement = announcement.replace(imgURL, "")
            announcement = announcement.replace(pageURL, "")

            const announceEmbed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setTitle(title)
                .setDescription(announcement)
                .setImage(imgURL)
                .setURL(pageURL)

            message.delete();
            message.channel.send({ embeds: [announceEmbed] });

        } catch (error) {
            console.log(error);
        }
    }
}