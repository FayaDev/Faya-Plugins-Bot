module.exports = {
    name: 'test',
    execute(client, message, args, Discord){

    const welcomeMessage = new Discord.MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
        .setDescription(`Welcome ${message.author}, enjoy your stay!`)
        .setThumbnail(message.author.displayAvatarURL())
        .setColor("RANDOM")
        .setFooter({ text: 'Faya\'s Plugins'})

    message.channel.send({ embeds: [welcomeMessage] });
    }
}
