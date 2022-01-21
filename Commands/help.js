const { MessageEmbed } = require("discord.js");
const fs = require('fs');

module.exports = {
    name: "help",
    description: "sends a message with all the commands",
    usage: '',
    execute(message){
        try {
            const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
            let commandNumber = 0;

            const helpEmbed = new MessageEmbed()
                .setTitle("Help")
                .setDescription("**A list of all the commands available**")

            for (let file in commandFiles){
                file = commandFiles[commandNumber].replace(".js", "");
                fileData = require(`./${commandFiles[commandNumber]}`);
                helpEmbed.addField(`${commandNumber + 1}) !${file}`, `> !${file} ${fileData.usage}`);
                commandNumber++;
            }

            message.channel.send({ embeds: [helpEmbed] });
        } catch (error) {
            console.log(error);
        }
    }
}