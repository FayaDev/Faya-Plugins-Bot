// Krijg de live prijs van API

const exchangeRateUSD = 1.14

module.exports = {
    name: 'convert',
    execute(client, message, args){
        let result = args * exchangeRateUSD;
        message.channel.send(`${args} Euro is ${result} US Dollar.`)
    }
}
