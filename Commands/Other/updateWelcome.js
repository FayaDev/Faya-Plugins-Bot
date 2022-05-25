const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "updatewelcome",
    execute(client, message, args, Discord){
        try {
            // Get the right server
            const guild = client.guilds.cache.get('844917410904670248');
            message.delete();
            // Fetch and get the list named 'members'
            guild.members.fetch().then(members =>
            {
                let count = 0;

                members.sort((a, b) => b.joinedAt - a.joinedAt);
                // Loop through every members
                members.forEach(member =>
                {
                    count++;
                    if (count <= args[0]) {
                        // Send Welcome Message
                        const welcomeMessage = new Discord.MessageEmbed()
                            .setAuthor({ name: member.user.tag, iconURL: member.displayAvatarURL() })
                            .setDescription(`Welcome ${member}, enjoy your stay!`)
                            .setThumbnail(member.displayAvatarURL())
                            .setColor("RANDOM")
                            .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL()})

                    message.channel.send({ embeds: [welcomeMessage] });
                    }
                });

            });
        } catch (error) {
            console.log(error);
        }
    }
}