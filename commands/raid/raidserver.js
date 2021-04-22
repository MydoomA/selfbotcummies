module.exports = {
    desc: "raids a server in every channel a specific amount of times with a message of choice",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        const listedChannels = []; 

        message.guild.channels.forEach(channel => { 
            if(channel.permissionsFor(message.author).has('SEND_MESSAGES')) {
                listedChannels.push(channel);
            }
        });

        for (var i = 1; i >= parseInt(args.shift()); i++) {
            listedChannels.forEach(async function(channel) {
                await channel.send(args)
            });
        }
    }
}