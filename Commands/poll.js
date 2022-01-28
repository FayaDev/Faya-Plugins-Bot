const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    usage: '["option1"] ["option2"]',
    execute(client, message, args){
        try {
            if (!message.author.bot) {
                const pollChannel = message.guild.channels.cache.get('936364904066195546');
    
                let option1 = args.slice(0).join(" ").match(/(?:"[^"]*"|^[^"]*$)/)[0].toString().replaceAll("\"", "");
                let option2 = args.slice(1).join(" ").match(/(?:"[^"]*"|^[^"]*$)/)[0].toString().replaceAll("\"", "");

                const pollEmbed = new MessageEmbed()
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                    .setTitle("Poll")
                    .setColor("#337fd5")
                    .setDescription(
                        `**1)** ${option1}\n**2)** ${option2}`
                    )
                    .addField("__Status:__", "📊 Waiting for community feedback.")
    
                message.delete();

                pollChannel.send({ embeds: [pollEmbed] }).then(embedMessage => {
                embedMessage.react('1️⃣'); embedMessage.react('2️⃣'); 
                });
            }
        } catch (err) {
           console.log(err); 
        }
    }
}
