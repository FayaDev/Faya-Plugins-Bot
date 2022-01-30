const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "releasedate",
    description: "Lets users know when a plugin gets updated",
    usage: '{plugin} [version] {date}',
    execute(client, message, args){
        try {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("You don't have the required permissions to perform this action.");

            const releaseChannel = message.guild.channels.cache.get('932542017865678848');
            let plugin = args[0].replaceAll('_', ' ');
            let version = args[1];
            let date = args.slice(2).join(" ");

            if (!plugin) return message.reply("You must enter a plugin name.");
            if (!date) return message.reply("You must enter a date.");

            const releaseEmbed = new MessageEmbed()
                .setAuthor({ name: "📅 Estimated Release Date" })
                .setDescription(`A new release of ${plugin} is expected on ${date}.`)
                //.addField(plugin, `A new release of ${plugin} is expected on ${date}.`)
                .addField("Version", version)

            message.delete();
            releaseChannel.send({ embeds: [releaseEmbed] });

        } catch (error) {
            console.log(error);
        }
    }
}