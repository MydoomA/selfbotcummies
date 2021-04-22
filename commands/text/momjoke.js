module.exports = {
    desc: "generates mom jokes",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        var amount = 1

        if (args[0]) {
            amount = parseInt(args[0], 10);
        }
        
        var jokes = []

        for(var i = 1; i <= amount; i++) {
            jokes.push(await require('yourmama').getRandom())
        }

        message.channel.send(jokes.join('\n'))
    }
}