const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "delay",
    description: "informs the users of a delay",
    usage: '{project} {date} (reason)',
    execute(message, args){
        try {

            const project = args[0].replaceAll('_', ' ');
            const date = args[1].replaceAll('_', ' ');
            const reason = args.slice(2).join(" ");

            if (!project) return message.reply("You need to enter a project.");
            if (!date) return message.reply("You need to enter a delay date.");

            const delayEmbed = new MessageEmbed()
                .setAuthor({ name: "🕓 Delay" })
                .setDescription(`There's a delay for ${project}, the delay is until ${date}.`)

            if (reason) {delayEmbed.addField("Reason:", reason)}

            const delayChannel = message.guild.channels.cache.get('934211572375625729');
            delayChannel.send({ embeds: [delayEmbed] });
        } catch (error) {
            console.log(error);
        }
    }
}