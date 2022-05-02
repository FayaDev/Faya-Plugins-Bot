const Discord = require('discord.js');
require('dotenv').config();

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
const channelConfig = require("./config.json");

client.commands = new Discord.Collection();

['command_handler'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, Discord);
})

// Important action logging
client.on('messageDelete', async (message) => {

    if (!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || message.author.bot || message.content.startsWith(process.env.PREFIX)) return;
    const channel = message.guild.channels.cache.get(channelConfig.importantActionsChannelId);

    const entry = await message.guild.fetchAuditLogs({ type: "MESSAGE_DELETE"}).then(audit => audit.entries.first());

    const actionMessage = new Discord.MessageEmbed()
        .setDescription(`**${entry.executor} deleted a message from ${message.author}**`)
        .addField("Message Content:", message.content)
        .setFooter({text: `${message.channel.name}`})
        
    channel.send({embeds: [actionMessage]});
})

client.on('guildBanAdd', async ban => {

    const actionsChannel = ban.guild.channels.cache.find(channel => channel.name.includes("important-actions"));
    const entry = await ban.guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());

    const actionMessage = new Discord.MessageEmbed()
        .setDescription(`**${entry.target} banned ${ban.user.tag}**`)
        .addField("Reason:", entry.reason)
        .setColor("RED")
        .setFooter({text: `Target ID: ${entry.target.user.id}`})

    actionsChannel.send({ embeds: [actionMessage] });
})

client.on('channelDelete', async channel => {

    const actionsChannel = channel.guild.channels.cache.find(channel => channel.name.includes("important-actions"));
    const entry = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE"}).then(audit => audit.entries.first());

    const actionMessage = new Discord.MessageEmbed()
        .setDescription(`**${entry.executor} deleted #${channel.name}**`)
        .setColor("GREEN")
    
    actionsChannel.send({ embeds: [actionMessage] });
})

// Update Member Count
client.on('ready', c => {

    console.log("[Yubu]: Is online!");   
     
    const updateMembers = (guild) => {
        const memberCountChannel = guild.channels.cache.find(channel => channel.name.toLowerCase().includes("member"));

        let humans = guild.members.cache.filter(m => !m.user.bot).size.toLocaleString();
        memberCountChannel.setName(`Members: ${humans}`)
        console.log(`[Yubu]: Detected ${humans} members`);
    }

    updateMembers(client.guilds.cache.get(channelConfig.guildId));
})

// Welcome Message
client.on('guildMemberAdd', member => {

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

// Auto Message Delete
client.on('messageCreate', message => {
    if ((message.channel.id == channelConfig.galleryChannelId || message.channel.id == channelConfig.clipsChannelId) && !message.author.bot && !message.content.startsWith(process.env.PREFIX)) {
        if (message.attachments.size == 0 && !message.content.startsWith("https://")) {
            message.delete();
        }    
    }
})

client.login(process.env.TOKEN);