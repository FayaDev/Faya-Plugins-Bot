module.exports = client => {

    const updateMembers = (guild) => {
        const channel = guild.channels.cache.get('931958980064997376');
        let humans = guild.members.cache.filter(m => !m.user.bot).size.toLocaleString();
        channel.setName(`Members: ${humans}`)
        console.log(`[Yubu]: Detected ${humans} members`);
    }

    client.on('guildMemberAdd', (member) => updateMembers(member.guild));
    client.on('guildMemberRemove', (member) => updateMembers(member.guild));
    
    updateMembers(client.guilds.cache.get('844917410904670248'));
}