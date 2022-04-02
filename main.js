const Discord = require('discord.js');
require('dotenv').config();

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, Discord);
})

const welcomeChannelId = '847583897683623997';

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

client.on('messageCreate', message => {
    if ((message.channel.id == '952263131810398298' || message.channel.id == '937852019203514397') && !message.author.bot && !message.content.startsWith(process.env.PREFIX)) {
        if (message.attachments.size == 0 && !message.content.startsWith("https://")) {
            message.delete();
        }    
    }
})

client.login(process.env.TOKEN);