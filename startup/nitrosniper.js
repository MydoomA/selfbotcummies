module.exports = {
    run: async function(client, functions) {
        client.on('message', function (message) {
            if(message.content.includes('discord.gift') || message.content.includes('discordapp.com/gifts/')) {
                var Nitro = /(discord\.(gift)|discordapp\.com\/gift)\/.+[a-z]/

                var NitroUrl = Nitro.exec(message.content);
                var NitroCode = NitroUrl[0].split('/')[1];

                console.log(`Nitro \`${NitroCode}\` was found in ${message.channel.id}. Lining up shot.`);

                require('axios')({
                    method: 'POST',
                    url: `https://discord.com/api/v8/entitlements/gift-codes/${NitroCode}`,
                    headers:
                    {
                        'Authorization': 'ODIxMTM4MTUwNjI5OTY1ODI1.YICh2g.LJqFpxET6MHXgB8YzmKr6zhP8WI'
                    }
                }).then(() => {
                    console.log(`Successfully redeemed nitro ${NitroCode} in ${message.guild.name}. Target down.`)
                }).catch(ex => {
                    console.log(`Couldn't claim Nitro. Link is expired, fake or it's already claimed!`)
                });
            }
        });
    }
}




