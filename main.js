console.log("[Yubu]: Loading...");

const Discord = require('discord.js');
const fs = require('fs');

require('dotenv').config();
const intents = new Discord.Intents(32767);

const client = new Discord.Client({ intents} );
client.on('ready', () => { console.log("[Yubu]: Yubu is online!"); })

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./Commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('messageCreate', message => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if (command == 'kick'){
        client.commands.get('kick').execute(message, args);
    } else if (command == 'ban'){
        client.commands.get('ban').execute(message, args);
    }else if (command == 'suggest'){
        client.commands.get('suggest').execute(message, args);
    }else if (command == 'redosuggest'){
        client.commands.get('redosuggest').execute(message, args);
    }else if (command == 'release'){
        client.commands.get('release').execute(message, args);
    }else if (command == 'issue'){
        client.commands.get('issue').execute(message, args);
    }else if (command == 'redoissue'){
        client.commands.get('redoissue').execute(message, args);
    }else if (command == 'say'){
        client.commands.get('say').execute(message, args);
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);