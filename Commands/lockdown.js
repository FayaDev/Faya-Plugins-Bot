const { Permissions } = require('discord.js');

module.exports = {
    name: 'lockdown',
    usage: '',
    execute(client, message){
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("You don't have the required permissions to perform this action.");
        
        
    }
}
