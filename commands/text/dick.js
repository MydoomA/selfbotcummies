module.exports = {
    desc: "gets dick size of mentioned user",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        const random = Math.floor(Math.random() * Math.floor(10));
        var type = 'big black cock'

        if (random < 5) {
            type = 'small white cock';
        }
        if (random < 2) {
            type = 'clit';
        }

        await message.channel.send(
            quick.embed(
                `${message.mentions.users.first().tag}'s Dick Size`,
                `8`+'='.repeat(random)+`D`,
                'You have a '+type+'.'
            )
        )
    }
}