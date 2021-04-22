module.exports = {
    desc: "runs a shell command in replit shell",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        const exec = require('child_process').exec

        exec(args.join(' '))

        message.channel.send(
            quick.embed(
                `Ran bash command.`,
                `Ran command in Node.JS shell.`
            )
        )
    }
}