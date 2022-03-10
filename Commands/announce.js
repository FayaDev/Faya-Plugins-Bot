const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'announce',
    execute(client, message, args){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");

            const msg = args.slice(0).join(" ");
            const title = msg.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "")
            const announcement = msg.replace(title, "").replace(/"/g, "")
            let regex = /http[%\?#\[\]@!\$&'\(\)\*\+,;=:~_\.-:\/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]*/;

            const announceEmbed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setTitle(title)
                .setDescription(announcement)

            // args.forEach(element => {
            //     if (element.startsWith("https://")) {
            //         announceEmbed.setURL(element)
            //         announceEmbed.setDescription(announcement.replace(regex, ""))                    

            //     }

            //     if (element.startsWith("https://i")) {
            //         announceEmbed.setImage(element);
            //         announceEmbed.setDescription(announcement.replace(regex, ""))                    
            //     } 
            // });

            message.delete();

            message.channel.send({ embeds: [announceEmbed] });

        } catch (error) {
            console.log(error);
        }
    }
}