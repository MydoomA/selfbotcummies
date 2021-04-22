module.exports = {
    desc: "earrapes voice channel",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        const voice = message.member.voiceChannel

        const fs = require('fs');
        const ytdl = require('ytdl-core');

        voice.join().then((connection) => {
            connection.play(ytdl(args[1]))
        })

        await message.channel.send(
            quick.embed(
                `Earrape Voice.`,
                `Earraping channel \`${args[0]}\`.`
            )
        )
    }
}