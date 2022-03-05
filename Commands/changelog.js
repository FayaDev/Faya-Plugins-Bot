const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "changelog",
    execute(client, message, args){
        try {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("You don't have the required permissions to perform this action.");
            
            let plugin = args[0].replaceAll('_', ' ');
            let version = args[1];
            let changes = args.slice(2).join(" ");

            if (!plugin) return message.reply("You must enter a plugin name.");
            if (!version) return message.reply("You must enter a version.");
            if (!changes) return message.reply("You must enter the changes.");

            const changelogEmbed = new MessageEmbed()
                .setAuthor({ name: "📰 Changelog" })
                .setDescription(`**${plugin} ${version}**`)
                .addField("_ _", changes)

            message.delete();
            message.channel.send({ embeds: [changelogEmbed] });

        } catch (error) {
            console.log(error);
        }
    }
}