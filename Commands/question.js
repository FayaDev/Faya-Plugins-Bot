const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'question',
    async execute(client, message, args){
        try {
            const questionChannel = message.guild.channels.cache.find(queChannel => queChannel.name.includes('question'));

            const question = args.slice(0).join(" ");

            const questionEmbed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setTitle("Question")
                .setDescription(question.toString())
                .setColor("#337fd5")

            // if (args[0].startsWith("https://")) {
            //     suggestEmbed.setImage(args[0])
            // }
            
            message.delete();
    
            await questionChannel.send({ embeds: [questionEmbed] }).then(embedMessage => {
                embedMessage.startThread({
                    name: "What do you think?",
                    autoArchiveDuration: 1440,
                })
            });
        } catch (err) {
           console.log(err); 
        }
    }
}
