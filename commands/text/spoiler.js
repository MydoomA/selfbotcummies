module.exports = {
    desc: "spoilers every character of sentence",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        message.channel.send('||'+Array.from(args.join(' ')).join('||||')+'||')
    }
}