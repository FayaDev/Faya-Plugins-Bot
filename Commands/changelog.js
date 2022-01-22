const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "changelog",
    description: "Shows a changelog of an update",
    usage: '{plugin} [version] [changes]',
    execute(message, args){
        try {
            const changelogChannel = message.guild.channels.cache.find(logChannel => logChannel.name.includes('changelog'));
            
            let plugin = args[0].replaceAll('_', ' ');
            let version = args[1];
            let changes = args.slice(2).join(" ");

            if (!plugin) return message.reply("You must enter a plugin name.");
            if (!version) return message.reply("You must enter a version.");
            if (!changes) return message.reply("You must enter the changes.");

            const changelogEmbed = new MessageEmbed()
                .setAuthor({ name: "📜 Changelog" })
                .setDescription(`**${plugin} ${version}**`)
                .addField("_ _", changes)

            if (changelogChannel){
                changelogChannel.send({ embeds: [changelogEmbed] });
            }
        } catch (error) {
            console.log(error);
        }
    }
}