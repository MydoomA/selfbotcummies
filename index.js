const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs')
const colors = require('colors/safe')

const quick = {
    modifySetting: function (setting, value) {
        require('./settings.json')[setting] = value
        return true;
    },
    getSetting: function (setting) {
        if (!require('./settings.json')[setting]) {
            return 'Setting nonexistant.'
        }
        return require('./settings.json')[setting]
    },
    getBool: function (string) {
        const yes = ['on','true','yes','y']
        const no = ['off','false','no','n']

        var value = null;
        yes.forEach(str => {
            if (string === str) {
                value = true
            }
        })
        no.forEach(str => {
            if (string === str) {
                value = false
            }
        })
        return value;
    },
    embed: function (title, desc, footer, avatar) {
        const embed = new Discord.RichEmbed()
            .setColor(quick.getSetting('Color'))
        if (title) {
            embed
                .setAuthor(title)
                .setThumbnail('https://i.ytimg.com/vi/BweV0r7sRGQ/hqdefault.jpg');
            if (avatar) embed.setAuthor(title,avatar)
        }
        if (desc) embed.setDescription(desc)
        if (footer) embed.setFooter(footer)

        return embed;
    },
    guildprotection: true,
    deletedMessages: [],
    status: {
        name: 'with my feelings for you',
        type: 'PLAYING',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    lastMessage: null,
    embedMessages: [],
    clients: []
}

client.on("messageDelete", message => {
    quick.deletedMessages.push({
        channel: message.channel.id, 
        message: message
    })
})

const loadingStatus = []

require('./alts.json').forEach(async function (token) {
    const currentClient = new Discord.Client()

    loadingStatus.push({client: currentClient, loggedIn: false})

    currentClient.on('ready', function () {
        console.log('Logged in with alt `'+currentClient.user.tag+'`.')

        loadingStatus.forEach(async function (item) {
            if (item.client === currentClient) {
                item.loggedIn = true
            }
        })
    })

    currentClient.login(token)

    quick.clients.push(currentClient)
})

function checkIfFinished(){
    var yes = true
    loadingStatus.forEach(async function (item) {
        if (item.loggedIn === false) {
            yes = false
        }
    })
    return yes
}

var timeout = setInterval(function() {
    if(checkIfFinished()) {
        clearInterval(timeout); 
        initialize()
    }
}, 100);

async function initialize() {
    const loadedCommands = {}

    client.on('ready', function () {
        console.log("Selfbot"+"\x1b[32m",'Ready'+"\x1b[0m"+'.')
        require('./online.js').run(client)
        fs.readdir('./startup/', (err, files) => {
            files.forEach(file => {
                require('./startup/'+file).run(client, quick)
                console.log(`Started up \`${file}\`.`)
            });
        });

        const colorOrder = [
            'brightRed',
            'brightYellow',
            'brightGreen',
            'brightBlue',
            'cyan',
            'magenta'
        ]

        var currentIndex = 0

        fs.readdir('./commands', (err, folders) => {
            folders.forEach(folder => {
                loadedCommands[folder] = {}
                fs.readdir('./commands/'+folder, (err, files) => {
                    files.forEach(file => {
                        var message = `Loaded \`${file}\`.`
                        message = colors[colorOrder[currentIndex]](message)
                        loadedCommands[folder][file] = './commands/'+folder+'/'+file
                        console.log(message)
                    });
                    currentIndex++
                    if (currentIndex >= colorOrder.length) {
                        currentIndex = 0
                    }
                });
            })
        });
        client.user.setPresence({
            game: {
                name: 'with my feelings for you',
                type: 'PLAYING',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            }
        });
    });

    client.on('message', function (message) {
        if (message.author.id !== client.user.id) return
        if (quick.guildprotection === true) {
            if (message.guild !== null) return
        }
        if (message.embeds.length > 0) {
            quick.lastMessage = message;
            quick.embedMessages.push(message);
        }

        const args = message.content.substring(quick.getSetting('Prefix').length).split(' ')
        const commandName = args.shift()

        const categoryList = []

        if (message.content.substring(0,quick.getSetting('Prefix').length) === quick.getSetting('Prefix')) {
            for (const [folder, category] of Object.entries(loadedCommands)) {
                categoryList.push(folder)
                const commandList = []
                for (const [file, command] of Object.entries(category)) {
                    var currentCommand = file.split('.')
                    currentCommand.pop()
                    currentCommand = currentCommand.join('.')
                    commandList.push({command: currentCommand, desc: require(command).desc})
                    if (commandName === currentCommand) {
                        require(command).run(Discord, message, client, quick)
                    }
                }
                if (folder === commandName) {
                    message.delete()

                    const embed = new Discord.RichEmbed()
                        .setColor(quick.getSetting('Color'))
                        .setTitle(folder.substring(0,1).toUpperCase()+folder.substring(1))
                        .setThumbnail('https://i.ytimg.com/vi/BweV0r7sRGQ/hqdefault.jpg')
                        .setFooter(`Doom selfbot`)
                        .setTimestamp();

                    const arr = [];

                    commandList.forEach((item) => {
                        arr.push('**'+quick.getSetting('Prefix')+item.command+' ❯** '+item.desc.substring(0,1).toUpperCase()+item.desc.substring(1)+'.')
                    })

                    embed.setDescription(arr.join('\n'))
                    
                    message.channel.send(embed);
                }
            }
            if (commandName === 'help') {
                message.delete()

                const embed = new Discord.RichEmbed()
                    .setColor(quick.getSetting('Color'))
                    .setTitle('Help')
                    .setThumbnail('https://i.ytimg.com/vi/BweV0r7sRGQ/hqdefault.jpg')
                    .setFooter(`Doom selfbot`)
                    .setTimestamp();

                const arr = [];

                categoryList.forEach((item) => {
                    arr.push('**'+item.substring(0,1).toUpperCase()+item.substring(1)+'**')
                })

                embed.setDescription(arr.join('\n'))
                
                message.channel.send(embed);
            }
        }
    });


    client.login(process.env['.env'])

    setInterval(function () {
        try {
            const ms = Date.now() - quick.lastMessage.createdTimestamp;
            const sec = ms/1000

            if (sec > 15) {
                quick.embedMessages.forEach((message, index) => {
                    message.delete();
                    quick.embedMessages.splice(index,1)
                });
            }
        } catch (err) {}
    },100);
}