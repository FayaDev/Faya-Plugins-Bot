const { Permissions, MessageEmbed } = require("discord.js");
const poll = require("./poll");

module.exports = {
    name: 'closepoll',
    usage: '[message ID] (note)',
    async execute(client, message, args, Discord){
        try{
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have the required permissions to perform this action.");
    
            const messageId = args[0];
            const note = args.slice(1).join(" ")

            const pollChannel = message.guild.channels.cache.get('936364904066195546');
            const pollEmbed = await suggChanel.messages.fetch(messageId);
            const data = pollEmbed.embeds[0];

            if (!messageId) return message.reply("You need to enter the ID of the poll.");
            if (!data) return message.reply("No embed has been found.");
            if (!pollEmbed) return message.reply("No embed has been found.");

            const option1Reactions = pollEmbed.reactions.cache.get('1️⃣').count;
            const option2Reactions = pollEmbed.reactions.cache.get('2️⃣').count;

            let result = "-";
            let winningOptionVotes = "-";

            if (option1Reactions > option2Reactions) {
                result = '1';
                winningOptionVotes = option1Reactions;
            }
            else if (option1Reactions < option2Reactions) {
                result = '2';
                winningOptionVotes = option2Reactions;
            }
            else {
                return message.channel.send("There was a tie, wait it out.");
            }

            const acceptEmbed = new MessageEmbed()
                .setAuthor({ name: data.author.name, iconURL: data.author.iconURL})
                .setTitle("Poll")
                .setDescription(data.description)
                .addField("__Status:__", `✅ Option **${result}** has won with **${winningOptionVotes}** votes!`)
                .setColor("DARK_GREEN")

            if (note){
                acceptEmbed.addField("__Note:__", note)
            }

            message.delete();
            pollEmbed.edit({ embeds: [acceptEmbed] });
        }
        catch (error) {
            console.log(error);
        }
    }
}
