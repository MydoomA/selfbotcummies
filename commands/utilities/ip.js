module.exports = {
    desc: "get the info of the ip inputted",
    run: async function(Discord, message, client, quick) {
        await message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

        var xmlHttp1 = new XMLHttpRequest();
        xmlHttp1.open( "GET", `http://v2.api.iphub.info/ip/${args[0]}`, false );
        xmlHttp1.setRequestHeader("X-Key",'MTIyMzc6Z0FtNHlsNjlzV0luQnpFVlN5dzlYbDJyUkN4M1NPSVk=');
        xmlHttp1.send(null);
        const response = await JSON.parse(xmlHttp1.responseText)

        var xmlHttp2 = new XMLHttpRequest();
        xmlHttp2.open( "GET", `https://ipinfo.io/${args[0]}?token=d1309057b7d224`, false );
        xmlHttp2.send(null);
        const response2 = await JSON.parse(xmlHttp2.responseText)

        message.channel.send(
            quick.embed(
                `Info for ${args[0]}`,
                [
                    `**IP:** \`${response.ip}\``,
                    `**Hostname:** \`${response2.hostname}\``,
                    `**Address:** \`${response2.city}, ${response2.region}, ${response2.country}\``,
                    `**Timezone:** \`${response2.timezone}\``,
                    `**VPN / Proxy:** \`${response.block}\``
                ].join('\n')
            )
        )
    }
}