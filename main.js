console.log("[Yubu]: Loading...");

const Discord = require('discord.js');
const fs = require('fs');

require('dotenv').config();
const intents = new Discord.Intents(32767);

const client = new Discord.Client({ intents });
client.on('ready', () => { 
    memberCount(client)

    console.log("[Yubu]: Yubu is online!"); 
})

client.on('guildMemberAdd', guildMember => {
    console.log(`[Yubu]: ${guildMember.user.tag} has joined the server`);
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === "🙍 - Member");

    guildMember.roles.add(welcomeRole);
 });

const memberCount = require('./Events/member-count')
let fileCount = 0;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    fileCount++;

    const command = require(`./Commands/${file}`);
    client.commands.set(command.name, command);
}

console.log(`[Yubu]: Loaded ${fileCount} commands`);

client.on('messageCreate', message => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    for (const file of commandFiles){
        const fileNoExtension = file.slice(0, -3);

        if (command === fileNoExtension){
            client.commands.get(fileNoExtension).execute(message, args);
        }
    }

    console.log(`[Yubu]: ${message.author.tag} used ${message.content}`);

    const logChannel = message.guild.channels.cache.get('933323927613222943');
    //logChannel.send(`${message.author.tag} used ${message.content}`);
})

client.login(process.env.DISCORD_BOT_TOKEN);