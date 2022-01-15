module.exports = client => {
    const channelId = '931958980064997376'

    const updateMembers = guild => {
        const channel = guild.channels.cache.get(channelId)
        channel.setName(`Members: ${guild.members.cache.filter(m => !m.user.bot).size.toLocaleString()}`)
    }

    client.on('guildMemberAdd', (member) => updateMembers(member.guild))
    client.on('guildMemberRemove', (member) => updateMembers(member.guild))

    updateMembers(client.guilds.cache.get('844917410904670248'))
}