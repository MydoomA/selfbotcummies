module.exports = {
    desc: "runs a snippet of javascript formatted code",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        var code = args.join(' ').split('```js').pop().split('```').shift()

        try {
            await message.channel.send(
                quick.embed(
                    null,
                    `Running JavaScript..`
                )
            )
            eval(code)
        } catch (err) {
            message.channel.send(
                quick.embed(
                    null,
                    `**Error:**\n${err}`
                )
            )
        } 
    }
}