const { MessageEmbed } = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports = {
    name: "meme",
    async execute(client, message, args, Discord){
        try {
            let reddit = ["dankmemes", "memes"]
        
            let subreddit = reddit[Math.floor(Math.random() * reddit.length + 1)];
            const img = await randomPuppy(subreddit);
            
            if (subreddit == "undefined") return;

            const memeEmbed = new MessageEmbed()
                .setTitle(`r/${subreddit}`)
                .setURL(`https://reddit.com/r/${subreddit}`)
                .setColor("RANDOM")
                .setImage(img)


            message.channel.send({ embeds: [memeEmbed] });
            if (memeEmbed.title == null) {
                message.delete();
                message.channel.send({ embeds: [memeEmbed] });
            }

        } catch (error) {
            console.log(error);
        }
    }
}