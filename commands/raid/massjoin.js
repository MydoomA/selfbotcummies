module.exports = {
    desc: "joins a server with all your alts",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ');
        const command = args.shift();

        const axios = require('axios');

        const invite = args[0];
        const invite_code = invite.split('/').pop();

        var complete_array = [];

        quick.clients.forEach(async function (cc) {
            try {
                await axios({
                    url: 'https://discord.com/api/v8/invites/'+invite_code,
                    method: 'POST',
                    headers: {
                        'Authorization': cc.token
                    }
                })
                complete_array.push(`**${cc.user.tag}** joined.`)
            } catch (err) {
                complete_array.push(`**${cc.user.tag}** failed.`)
            }
        });

        message.channel.send(
            quick.embed(
                'Massjoin Server.',
                complete_array.join('\n')
            )
        );
    }
}