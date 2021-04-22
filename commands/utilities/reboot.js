module.exports = {
    desc: "reboots the selfbot",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        await message.channel.send(
            quick.embed(
                `Rebooting...`,
                `Rebooting selfbot with code \`0\`.`
            )
        )

        process.exit(0)
    }
}