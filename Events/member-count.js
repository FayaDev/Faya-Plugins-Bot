module.exports = client => {

    const updateMembers = (guild, log) => {
        const channel = guild.channels.cache.get('931958980064997376');
        channel.setName(`Members: ${guild.members.cache.filter(m => !m.user.bot).size.toLocaleString()}`)
        if (log) { console.log(`[Yubu]: Updated member count to ${humans}`); }
        
    }

    client.on('guildMemberAdd', (member) => updateMembers(member.guild, true));
    client.on('guildMemberRemove', (member) => updateMembers(member.guild, true));
    
    updateMembers(client.guilds.cache.get('844917410904670248'), false);
}