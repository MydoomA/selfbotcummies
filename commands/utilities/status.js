module.exports = {
    desc: "sets status",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        if (args[0] === 'url') {
            quick.status.url = args[1]
            client.user.setPresence({
                game: {
                    name: quick.status.name,
                    type: quick.status.type,
                    url: quick.status.url
                }
            });
            message.channel.send(
                quick.embed(
                    `Status Url`,
                    `Your status url is now \`${args[1]}\`.`
                )
            )
        }
        if (args[0] === 'type') {
            quick.status.type = args[1]
            client.user.setPresence({
                game: {
                    name: quick.status.name,
                    type: quick.status.type,
                    url: quick.status.url
                }
            });
            message.channel.send(
                quick.embed(
                    `Status Type`,
                    `Your status type is now \`${args[1]}\`.`
                )
            )
        }
        if (args[0] === 'name') {
            quick.status.name = args.splice(0,-2).join(' ')
            client.user.setPresence({
                game: {
                    name: quick.status.name,
                    type: quick.status.type,
                    url: quick.status.url
                }
            });
            message.channel.send(
                quick.embed(
                    `Status Name`,
                    `Your status name is now \`${args[1]}\`.`
                )
            )
        }
    }
}