module.exports = {
    desc: "creates large text",
    run: async function(Discord, message, client, quick) {
        message.delete()

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const command = args.shift()

        var figlet = require('figlet');
        
        figlet(args.join(' '), function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            
            message.channel.send('```\n'+data+'\n```')
        });
    }
}