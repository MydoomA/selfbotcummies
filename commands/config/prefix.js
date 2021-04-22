module.exports = {
    desc: "sets prefix for selfbot",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        quick.modifySetting('Prefix',args[0])

        message.channel.send(
            quick.embed(
                `Set Prefix`,
                `Prefix was set to \`${quick.getSetting('Prefix')}\`.`
            )
        )
    }
}