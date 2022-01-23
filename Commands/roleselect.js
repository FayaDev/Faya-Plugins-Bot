const { MessageActionRow, MessageSelectMenu, Permissions } = require('discord.js');

module.exports = {
    name: 'roleselect',
    usage: '',
    async execute(message){
        try{
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");

            const channel = message.guild.channels.cache.get('934895829100167168');

            const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("first_menu")
                .setPlaceholder("Roles")
                .setMinValues(0)
                .setMaxValues(3)
                .addOptions([
                    {
                        label: "📯 - Content Notified",
                        description: "A notification for public releases and important matters.",
                        value: "931912609970655252",
                    },
                    {
                        label: "🔔 - Early Access Notified",
                        description: "A notification for early access releases",
                        value: "934848675878928404",
                    },
                    {
                        label: "🗳️ - Suggestion Notified",
                        description: "A notification for every 5 suggestions.",
                        value: "934848628227444776",
                    },
                ])
            )
            message.delete();
            await message.channel.send({ content: "Select your role:", components: [row] });
    
            const collector = message.channel.createMessageComponentCollector({
                componentType: "SELECT_MENU"
            })
    

            collector.on('collect', async (collected) => {
                const { values } = collected;

                const component = collected.component;

                // Get all options that aren't selected
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value);
                })
                
                // Get selected options
                for (const id of values) {
                    message.member.roles.add(id);
                }

                // Get non-selected options
                for (const id of removed) {
                    message.member.roles.remove(id.value);
                }

                collected.reply({ content: "Updated roles.", ephemeral: true });
            })
        }
        catch (error) {
            console.log(error);
        }
    }
}
