const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "projects",
    async execute(client, message, args){
        try {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("You don't have the required permissions to perform this action.");
            
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("🎯 All of my plugins")
                        .setStyle("LINK")
                        .setURL("https://www.lcpdfr.com/profile/430106-faya/content/?type=downloads_file&change_section=1")
                )
                .addComponents(
                    new MessageButton()
                        .setLabel("⚒️ Progress Board")
                        .setStyle("LINK")
                        .setURL("https://trello.com/b/RPSQVgf8/projects")
                )

            message.delete();
            message.channel.send({ components: [row] });

        } catch (error) {
            console.log(error);
        }
    }
}