const Discord = require('discord.js');
require('dotenv').config();

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, Discord);
})

const welcomeChannelId = '953772512502747187';

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

client.login(process.env.TOKEN);