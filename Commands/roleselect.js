const { Discord, MessageActionRow, MessageSelectMenu, Message } = require('discord.js');

module.exports = {
    name: 'roleselect',
    usage: '',
    async execute(message){
        try{
            const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("first_menu")
                .setPlaceholder("Roles")
                .addOptions([
                    {
                        label: "📯 - Content Notified",
                        description: "A notification for public releases and important matters.",
                        value: "first",
                    },
                    {
                        label: "🔔 - Early Access Notified",
                        description: "A notification for early access releases",
                        value: "second",
                    },
                    {
                        label: "🗳️ - Suggestion Notified",
                        description: "A notification for every 5 suggestions.",
                        value: "third",
                    },
                ])
            )
            message.delete();
            await message.channel.send({ content: "Select your role:", components: [row] });
    
            const collector = message.channel.createMessageComponentCollector({
                componentType: "SELECT_MENU"
            })
    
            collector.on('collect', async (collected) => {
                const value = collected.values[0];
    
                let roleArray;
    
                let contentNotifiedRole = message.member.guild.roles.cache.find(role => role.id === "931912609970655252");
                let earlyAccessRole = message.member.guild.roles.cache.find(role => role.id === "934848675878928404");
                let suggestionNotifiedRole = message.member.guild.roles.cache.find(role => role.id === "934848628227444776");
    
                if (value === "first"){
                    collected.reply({ content: "You selected Content Notified", ephemeral:true});
    
                    message.member.roles.add(contentNotifiedRole)
                }
                else if (value === "second"){
                    collected.reply({ content: "You selected Early Access", ephemeral:true});
    
                    message.member.roles.add(earlyAccessRole)
                }
                else if (value === "third"){
                    collected.reply({ content: "You selected Suggestion Notified", ephemeral:true});
    
                    message.member.roles.add(suggestionNotifiedRole)
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }
}
