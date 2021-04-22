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

        const msg = msgs[msgs.length - 1]

        if (!msg) return message.reply('There are no recently deleted messages!');

        const embed = quick.embed(
            `Message by ${msg.author.tag}`,
            msg.content,
            null,
            msg.author.avatarURL
        );
        
        message.channel.send(embed).catch((err) => {
            message.channel.send('I was unable to fulfill your request.');
        });