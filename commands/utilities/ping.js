module.exports = {
    desc: "gets the ping of the selfbot",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        message.channel.send(
            quick.embed(
                `Pong!`,
                `Latency is \`${Date.now() - message.createdTimestamp}ms\`.`
            )
        )
    }
}