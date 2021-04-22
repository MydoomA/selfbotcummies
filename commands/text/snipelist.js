module.exports = {
    desc: "gets most recently deleted message",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        var msgs = []

        quick.deletedMessages.forEach(function (item, index) {
            if (item.channel === message.channel.id) {
                msgs.push(item.message);
            }
        });

        const msglist = msgs.slice(Math.max(msgs.length - (parseInt(args[0]) || 5), 0))

        var arr = []

        msglist.forEach(async function (m) {
            arr.push('**'+m.author.tag+'**\n'+m.content)
        })

        if (arr === []) return message.reply('There are no recently deleted messages!');

        const embed = quick.embed(
            `Listing deleted messages.`,
            arr.join('\n\n'),
        );
        
        message.channel.send(embed).catch((err) => {
            message.channel.send('I was unable to fulfill your request.');
        });
    }
}