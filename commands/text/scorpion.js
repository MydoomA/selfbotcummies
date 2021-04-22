module.exports = {
    desc: "no",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        const embed = new Discord.RichEmbed()
            .setTitle("Doom selfbot")
            .setURL("https://satanx.xyz")
            .setAuthor("Mydoom","https://i.ytimg.com/vi/BweV0r7sRGQ/hqdefault.jpg")
            .setColor(quick.color)
            .setDescription("Best Sb.")
            .setFooter("Doom selbot")
            .setThumbnail("https://i.ytimg.com/vi/BweV0r7sRGQ/hqdefault.jpg");

        message.channel.send(embed)
    }
}