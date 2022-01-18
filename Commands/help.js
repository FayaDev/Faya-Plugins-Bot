const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'sends a message with all the features',
    execute(message, client){
        
        const helpEmbed = new MessageEmbed()
            .setTitle("Help")
            .setDescription("**A list of all the commands available**")   
            .addField("1) !ping", "> !ping")
            .addField("2) !suggest", "> !suggest [message ID]")
            .addField("3) !issue", "> !issue [issue]")
            .addField("4) !kick", "> !kick [member]")
            .addField("5) !ban", "> !ban [member] (reason)")
            .addField("6) !plugin", "> !plugin [name] [url] [image url] [description]")

        message.channel.send({ embeds: [helpEmbed] });
    }
}
