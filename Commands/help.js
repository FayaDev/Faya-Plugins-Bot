const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'sends a message with all the features',
    execute(message){
        
        const helpEmbed = new MessageEmbed()
            .setTitle("Help")
            .setDescription("**A list of all the commands available**")   
            .addField("1) !ping", "> !ping")
            .addField("2) !clear", "> !clear [number]")
            .addField("3) !suggest", "> !suggest [message ID]")
            .addField("4) !issue", "> !issue [issue]")
            .addField("5) !kick", "> !kick [member]")
            .addField("6) !ban", "> !ban [member] (reason)")
            .addField("7) !plugin", "> !plugin [name] [url] [image url] [description]")

        message.channel.send({ embeds: [helpEmbed] });
    }
}
