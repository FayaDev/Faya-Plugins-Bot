const Discord = require('discord.js');
require('dotenv').config();

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
const channelConfig = require("./config.json");

client.commands = new Discord.Collection();

['command_handler'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, Discord);
})

// Update Members Method
const updateMembers = (guild) => {
    let humans = guild.members.cache.filter(m => !m.user.bot).size.toLocaleString();
    client.user.setActivity(`${humans} members`, { type: 'WATCHING' }) 

    console.log(`[Faya's Plugins]: Detected ${humans} members`);
}

// Update Members
client.on('ready', async message => {
    try {
        updateMembers(client.guilds.cache.get('844917410904670248'));
    } catch (err) {
       console.log(err); 
    }
})

// Welcome Message
client.on('guildMemberAdd', member => {
    try {
        updateMembers(client.guilds.cache.get('844917410904670248'));

        // Give Member Role
        member.roles.add(channelConfig.memberRoleId);
    
        // Send Welcome Message
        const welcomeMessage = new Discord.MessageEmbed()
            .setAuthor({ name: member.user.tag, iconURL: member.displayAvatarURL() })
            .setDescription(`Welcome ${member}, enjoy your stay!`)
            .setThumbnail(member.displayAvatarURL())
            .setColor("RANDOM")
            .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL()})
    
        const channel = member.guild.channels.cache.get(channelConfig.welcomeChannelId);
        channel.send({ embeds: [welcomeMessage] });
    } catch (err) {
        console.log(err); 
     }    
})

client.on('guildMemberRemove', member => {
    try {
        updateMembers(client.guilds.cache.get('844917410904670248'));
    } catch (err) {
       console.log(err); 
    }
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

// Command Check
client.on('messageCreate', async message => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if (command) command.execute(client, message, args, Discord);
})

// Auto Message Deletion
client.on('messageCreate', message => {
    if ((message.channel.id == channelConfig.galleryChannelId || message.channel.id == channelConfig.clipsChannelId) && !message.author.bot && !message.content.startsWith(process.env.PREFIX)) {
        if (message.attachments.size == 0 && !message.content.startsWith("https://")) {
            message.delete();
        }    
    }
})

// Sticky Message
client.on('messageCreate', async message => {

    if (message.author.bot || message.channel.id != '967816554945319022') return;

    const triggers = [ "help", "crash", "bug", "issue", "problem", "freeze" ];

    message.content.toLowerCase();

    if (message.content.includes(triggers[0]) || message.content.includes(triggers[1]) || message.content.includes(triggers[2]) || 
    message.content.includes(triggers[3]) || message.content.includes(triggers[4]) || message.content.includes(triggers[5])) {

        message.channel.send("<#972465245383704626>");
    }
})

client.login(process.env.TOKEN);