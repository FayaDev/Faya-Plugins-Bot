const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'fixmembers',
    execute(client, message, args){
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("You don't have the required permissions to perform this action.");
        
            // Get the right server
            const guild = client.guilds.cache.get('844917410904670248');

            // Fetch and get the list named 'members'
            guild.members.fetch().then(members =>
            {

                members.sort((a, b) => b.joinedAt - a.joinedAt);
                // Loop through every members
                members.forEach(member =>
                {
                    console.log(member.user.tag);

                    // Send Welcome Message
                    const welcomeMessage = new MessageEmbed()    
                        .setAuthor({ name: member.user.tag, iconURL: member.displayAvatarURL() })
                        .setDescription(`Welcome ${member}, you brought us to ${members} members. Enjoy your stay!`)
                        .setColor("RANDOM")
                        .setImage("https://cdn.discordapp.com/attachments/949374169299177552/989185078729007184/standard.gif")

                    const channel = member.guild.channels.cache.get(channelConfig.welcomeChannelId);
                    channel.send({ embeds: [welcomeMessage] });
                });

            });
        } catch (error) {
            console.log(error);
        }
    }
}