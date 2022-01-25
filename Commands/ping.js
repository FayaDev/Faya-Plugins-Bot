module.exports = {
    name: 'ping',
    description: 'checks if the bot is online.',
    usage: '',
    execute(client, message){
        console.log("Test");
        message.channel.send("Pinging...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            m.edit(`Pong! \`${ping}ms\``);
        });        
    }
}
