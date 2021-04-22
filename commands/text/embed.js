module.exports = {
    desc: "embeds specified text",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        message.channel.send(
            quick.embed(
                null,
                args.join(' ')
            )
        )
    }
}