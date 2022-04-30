module.exports = {
    name: 'ping',
    execute(client, message){
        message.channel.send("Pinging...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            m.edit(`Pong! \`${ping}ms\``);
        });        
    }
}
