module.exports = {
    desc: "gets boob size of mentioned user",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        const random = Math.floor(Math.random() * Math.floor(6));
        var type = 'tumor'

        if (random < 5) {
            type = 'couple implants';
        }
        if (random < 4) {
            type = 'good looking set of boobs';
        }
        if (random < 2) {
            type = 'couple manboobs';
        }
        
        const boobs = [
            [' '],
            ['oo'],
            ['00'],
            ['OO'],
            ['(.)(.)'],
            [' _  _','/.\\/.\\','\\_/\\_/'],
            [' ___  ___','/ . \\/ . \\','\\___/\\___/']
        ]

        await message.channel.send(
            quick.embed(
                `${message.mentions.users.first().tag}'s Boob Chart`,
                '```\n'+boobs[random].join('\n')+'\n```',
                'You have a '+type+'.'
            )
        )
    }
}