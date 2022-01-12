module.exports = {
    name: 'ping',
    description: 'checks if the bot is online.',
    execute(message, args){
        message.reply("Pong!");
    }
}