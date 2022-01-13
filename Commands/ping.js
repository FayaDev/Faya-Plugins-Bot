module.exports = {
    name: 'ping',
    description: 'checks if the bot is online.',
    execute(message, client){
        message.channel.send("Pinging...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            //var botPing = Math.round(client.pi);

            m.edit(`Pong! \`${ping}ms\``);
        });        
    }
}
