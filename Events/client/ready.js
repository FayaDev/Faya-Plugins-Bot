module.exports = (Discord, client, message) => {
    console.log("[Yubu]: Is online!");

    const updateMembers = (guild) => {
        const channel = guild.channels.cache.get('931958980064997376');

        let humans = guild.members.cache.filter(m => !m.user.bot).size.toLocaleString();
        channel.setName(`Members: ${humans}`)
        console.log(`[Yubu]: Detected ${humans} members`);
    }

    updateMembers(client.guilds.cache.get('844917410904670248'));
}