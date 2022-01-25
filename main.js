const Discord = require('discord.js');
require('dotenv').config();

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, Discord);
})

client.login('OTMwMTk3MjM5NDc1ODY3NjQ5.YdyXsA.ncHNL-jNqXKNAyCVSmZr3Notn0s');