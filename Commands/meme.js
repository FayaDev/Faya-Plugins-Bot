
const { MessageEmbed } = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports = {
    name: "meme",
    async execute(client, message, args, Discord){
        try {
            let reddit = [
                "meme",
                "dankmemes",
            ]
        
            let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
        
            randomPuppy(subreddit).then(async url => {
                    await message.channel.send({
                        files: [{
                            attachment: url,
                            name: 'meme.png'
                        }]
                    });
            }).catch(err => console.error(err));

        } catch (error) {
            console.log(error);
        }
    }
}