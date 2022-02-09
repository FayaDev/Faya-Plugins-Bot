const Discord = require('discord.js');
require('dotenv').config();

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, Discord);
})

client.login('process.env.TOKEN');
