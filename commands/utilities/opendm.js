module.exports = {
    desc: "opens dm with the specified user id",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift();

        require('axios')({
            method: 'POST',
            url: 'https://discord.com/api/users/@me/channels',
            data: {recipients: [args[0] || null]},
            headers:
            {
                'Authorization': process.env.USER_TOKEN
            }
        }).then(() => {
            message.channel.send(
                quick.embed(
                    `Opened DM.`,
                    `Opened DMs with \`${args[0]}\`.`
                )
            )
        }).catch((err) => {
            message.channel.send(
                quick.embed(
                    `An Error Occured.`,
                    err
                )
            )
        })
    }
}