const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "delay",
    execute(client, message, args){
        try {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("You don't have the required permissions to perform this action.");

            const project = args[0].replaceAll('_', ' ');
            const date = args[1].replaceAll('_', ' ');
            const reason = args.slice(2).join(" ");
            const delayChannel = message.guild.channels.cache.find(delChannel => delChannel.name.includes('delay'));

            if (!project) return message.reply("You need to enter a project.");
            if (!date) return message.reply("You need to enter a delay date.");

            const delayEmbed = new MessageEmbed()
                .setAuthor({ name: "🕓 Delay" })
                .setDescription(`There's a delay for ${project}, the delay is until ${date}.`)

            if (reason) {delayEmbed.addField("Reason:", reason)}

            delayChannel.send({ embeds: [delayEmbed] });
        } catch (error) {
            console.log(error);
        }
    }
}