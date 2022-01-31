const { Permissions } = require('discord.js');

module.exports = {
    async execute(client, message, args){
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("You don't have the required permissions to perform this action.");

        let role = message.guild.roles.cache.find(r => r.id === "934131193564262500");

        if (!args.length) return message.reply("Please enter a query.");

        const query = args[0].toLowerCase();

        if(!['true', 'false'].includes(query)) return message.reply("The option is not valid.");

        const perms = role.permissions.toArray();

        if (query == 'false') {
            perms.push('SEND_MESSAGES');
            await role.edit({ permissions: perms });
            message.reply("Server is no longer locked down.");   
        } else if (query == 'true') {
            const newPerms = perms.filter((perm) => perm !== 'SEND_MESSAGES');

            await role.edit({ permissions: newPerms });
            message.reply("Server is locked down.");
        }
    }
}
