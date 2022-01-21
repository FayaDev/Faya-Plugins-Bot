const { MessageEmbed } = require("discord.js");
const fs = require('fs');

module.exports = {
    name: "help",
    description: "sends a message with all the commands",
    execute(message){
        try {
            const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
            const helpEmbed = new MessageEmbed()
                .setTitle("Help")
                .setDescription("**A list of all the commands available**")

            let commandNumber = 0;
            for (const file in commandFiles){
                const fileFriendlyName = commandFiles[commandNumber].replace(".js", "");
                helpEmbed.addField(`${commandNumber + 1}) !${fileFriendlyName}`, file.description);
                commandNumber++;
            }

            message.channel.send({ embeds: [helpEmbed] });
        } catch (error) {
            console.log(error);
        }
    }
}