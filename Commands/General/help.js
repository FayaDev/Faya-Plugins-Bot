const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    execute(client, message, args){
        try {

            const typeHelp = args[0];
            const helpEmbed = new MessageEmbed()
            helpEmbed.setTitle("Help")

            if (typeHelp && typeHelp == "mod") {
                helpEmbed.setDescription("**A list of all the __moderation__ commands.**")
                helpEmbed.addField("!warn [user] (reason)", "> Warns a user.")
                helpEmbed.addField("!kick [user] (reason)", "> Kicks a user.")
                helpEmbed.addField("!ban [user] [duration] (reason)", "> Bans a user.")
                helpEmbed.addField("!clear [number]", "> Clears a set amount of messages.")
                helpEmbed.addField("!lockdown [true/false]", "> Stops users from sending messages in every channel.")
                helpEmbed.addField("!say [text]", "> Says a specified message.")
                helpEmbed.addField("!poll [\"option1\"] [\"option2\"]", "> Sends a poll with 2 options in the poll channel.")
            } else {
                helpEmbed.setDescription("**A list of all the __member__ commands.**")
                helpEmbed.addField("!ping", "> Shows if the bot is online with the latency.")
                helpEmbed.addField("!suggest", "> Creates a suggestion in the suggestion channel.")
            }

            message.delete();
            message.channel.send({ embeds: [helpEmbed] })
        } catch (error) {
            console.log(error);
        }
    }
}