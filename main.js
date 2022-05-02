const Discord = require('discord.js');
require('dotenv').config();

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
const channelConfig = require("./config.json");

client.commands = new Discord.Collection();

['command_handler'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, Discord);
})

// Welcome Message
client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name.includes("welcome"));
    const memberRole = member.guild.roles.cache.find(r => r.name.toLowerCase().includes("member"));
    
    // Give Member Role
    member.roles.add(memberRole);

    // Send Welcome Message
    const welcomeMessage = new Discord.MessageEmbed()
        .setAuthor({ name: member.user.tag, iconURL: member.displayAvatarURL() })
        .setDescription(`Welcome ${member}, enjoy your stay!`)
        .setThumbnail(member.displayAvatarURL())
        .setColor("RANDOM")
        .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL()})

    welcomeChannel.send({ embeds: [welcomeMessage] });
})

// Update Member Count
client.on('ready', c => {

    console.log("[Faya's Plugins]: Is online!");   
     
    const updateMembers = (guild) => {
        let humans = guild.members.cache.filter(m => !m.user.bot).size.toLocaleString();
        c.user.setActivity(`${humans} members`, { type: 'WATCHING' }) 

        console.log(`[Faya's Plugins]: Detected ${humans} members`);
    }

    updateMembers(client.guilds.cache.get(channelConfig.guildId));
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

// Important action logging
client.on('messageDelete', async (message) => {

    if (!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || message.author.bot || message.content.startsWith(process.env.PREFIX)) return;
    const channel = message.guild.channels.cache.get(channelConfig.importantActionsChannelId);

    const entry = await message.guild.fetchAuditLogs({ type: "MESSAGE_DELETE"}).then(audit => audit.entries.first());

    const actionMessage = new Discord.MessageEmbed()
        .setAuthor({ name: `${entry.executor.tag} deleted a message`, iconURL: entry.executor.displayAvatarURL()})
        .addField("Message Content:", message.content)
        .setFooter({text: message.channel.name})
        
    channel.send({embeds: [actionMessage]});
})

client.on('guildBanAdd', async ban => {
    const channel = message.guild.channels.cache.get(channelConfig.importantActionsChannelId);

    const entry = await message.guild.fetchAuditLogs({ type: "GUILD_BAN_ADD"}).then(audit => audit.entries.first());

    const actionMessage = new Discord.MessageEmbed()
        .setAuthor({ name: `${entry.executor.tag} banned ${entry.target.tag}`, iconURL: entry.executor.displayAvatarURL()})
        .addField("Reason:", entry.reason)
        .setFooter({text: message.channel.name})
        
    message.channel.send({embeds: [actionMessage]});
})
client.login(process.env.TOKEN);