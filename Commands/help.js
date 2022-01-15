const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'sends a message with all the features',
    execute(message, client){
        
        const helpEmbed = new MessageEmbed()
            .setTitle("Help")
            .setDescription("**A list of all the commands available**")   
            .addField("1) !ping", "> !ping")
            .addField("2) !suggest", "> !suggest [suggestion]")
            .addField("3) !kick", "> !kick [member]")
            .addField("4) !ban", "> !ban [member] (reason)")
            .addField("5) !plugin", "> !release [name] [url] [image url] [description]")

        message.channel.send({ embeds: [helpEmbed] });
    }
}
