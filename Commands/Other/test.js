const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "test",
    execute(client, message, args, Discord){
        try {
            // Get the right server
            const guild = client.guilds.cache.get('844917410904670248');

            // Fetch and get the list named 'members'
            guild.members.fetch().then(members =>
            {
                
                members.sort((a, b) => a.joinedAt - b.joinedAt);
                // Loop through every members
                members.forEach(member =>
                {
                    console.log(member.user.tag);

                    // Send Welcome Message
                    const welcomeMessage = new Discord.MessageEmbed()
                        .setAuthor({ name: member.user.tag, iconURL: member.displayAvatarURL() })
                        .setDescription(`Welcome ${member}, enjoy your stay!`)
                        .setThumbnail(member.displayAvatarURL())
                        .setColor("RANDOM")
                        .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL()})

                    message.channel.send({ embeds: [welcomeMessage] });
                });

            });
        } catch (error) {
            console.log(error);
        }
    }
}