module.exports = {
    desc: "gets a user's info",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        const response = await require('axios')({
            method: 'GET',
            url: 'https://discord.com/api/v8/users/'+args[0],
            headers:
            {
                'Authorization': quick.clients[0].token
            }
        })

        const user = response.data

        const embed = new Discord.RichEmbed()
            .setColor(quick.getSetting('Color'))
            .setAuthor(user.username,`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
            .setFooter(`Vapin' Cat Selfbot.`)
            .setTimestamp()
            .addField('Tag',user.username+'#'+user.discriminator, false)
            .addField('User ID',user.id, false)
            .addField('Avatar',`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`, false)
            
        await message.channel.send(embed)
    }
}