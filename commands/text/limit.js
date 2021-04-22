module.exports = {
    desc: "spams message parts",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        const limit_num = parseInt(args.shift())
        const str_num = args.join(' ')

        function limit (str, limit) {
            var debounce = true
            var count = 0
            var parts = [];
            do {
                count = count + limit
                if (count > str.length) {
                    parts.push(str.substring(count-limit))
                    break;
                } else {
                    parts.push(str.substring(count-limit,count))
                }
            } while (debounce);
            return parts;
        }

        limit(str_num, limit_num).forEach(async function (part) {
            await message.channel.send(part)
        })
    }
}