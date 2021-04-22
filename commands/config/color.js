module.exports = {
    desc: "changes the color of the embeds",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        quick.modifySetting('Color',args[0])

        await message.channel.send(
            quick.embed(
                `Set Color`,
                `Color has been set to \`${quick.getSetting('Color')}\`.`
            )
        )
    }
}