const Discord = require('discord.js');
const { config } = require('dotenv');
require('dotenv').config();

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
const channelConfig = require("./config.json");

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, Discord);
})

// Welcome Message
client.on('guildMemberAdd', member => {
    const welcomeMessage = new Discord.MessageEmbed()
        .setAuthor({ name: member.user.tag, iconURL: member.displayAvatarURL() })
        .setDescription(`Welcome **${member.user.username}**, enjoy your stay!`)
        .setThumbnail(member.displayAvatarURL())
        .setColor("RANDOM")
        .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL()})

    const channel  = member.guild.channels.cache.get(welcomeChannelId);
    channel.send({ embeds: [welcomeMessage] });
})

// Suggestion
client.on('messageCreate', async message => {
    const suggestionChannel = message.guild.channels.cache.find(channel => channel.id == channelConfig.suggestionChannelId);

    if (message.channel.id != channelConfig.suggestionChannelId || message.author.bot || message.content.startsWith(process.env.PREFIX)) return;

    try {

        const suggestEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTitle(`Suggestion`)
            .setDescription(message.toString())
            .setColor("#337fd5")
            .addField("__Status:__ 📊", "Waiting for community feedback.")
            .setFooter({ text: "Want to suggest something? Simply type it in this channel!" })    

        await suggestionChannel.send({ embeds: [suggestEmbed] }).then(embedMessage => {
            embedMessage.react('⬆️'); 
            embedMessage.react('⬇️'); 
        });

        message.delete();

    } catch (err) {
       console.log(err); 
    }
})

// Auto Message Delete
client.on('messageCreate', message => {
    if ((message.channel.id == channelConfig.galleryChannelId || message.channel.id == channelConfig.clipsChannelId) && !message.author.bot && !message.content.startsWith(process.env.PREFIX)) {
        if (message.attachments.size == 0 && !message.content.startsWith("https://")) {
            message.delete();
        }    
    }
})

client.login(process.env.TOKEN);