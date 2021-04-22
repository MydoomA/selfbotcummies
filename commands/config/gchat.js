module.exports = {
    desc: "disable or enable guild chat protection",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()
        
        if (quick.getBool(args[0]) === null) {
            message.channel.send(
                quick.embed(
                    `Guild Protection`,
                    `Guild chat protection is currently set to \`${quick.guildprotection.toString()}\`.`
                )
            )
        } else {
            quick.guildprotection = quick.getBool(args[0])
            
            message.channel.send(
                quick.embed(
                    `Guild Protection`,
                    `Guild chat protection is now set to \`${quick.guildprotection.toString()}\`.`
                )
            )
        }
    }
}