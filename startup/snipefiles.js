let request = require(`request`);
let fs = require(`fs`);
let path = require('path');

const folder = 'attachments';

const files = [
    'txt',
    'lua',
    'package'
]

async function makeFile(dir) {
    const filename = dir.replace(/^.*[\\\/]/, '')
    const extension = filename.split('.').pop()
    if (fs.existsSync(dir)) {
        var count = 1;
        var current = null;
        var debounce = true;
        do {
            current = `${path.dirname(dir).split(path.sep).pop()}/${filename} (${count}).${extension}`
            if (fs.existsSync(current)) {
                count++
            } else {
                debounce = false
            }
        } while (debounce);
        await fs.writeFile(current, '', function (err) {});
        return current
    } else {
        await fs.writeFile(dir, '', function (err) {});
        return dir
    }
}

async function download(url,file){
    var name = file
    const fileExtension = file.split('.').pop();

    const dir = await makeFile(folder+'/'+name);

    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(dir));
}

module.exports = {
    run: async function(client, functions) {
        client.on(`message`, async function (msg) {
            if (msg.attachments.first()) {
                const attachment = await msg.attachments.first()
                const fileExtension = attachment.filename.split('.').pop();
                
                files.forEach(async function (cfe) {
                    if (fileExtension === cfe) {
                        await download(attachment.url,attachment.filename);
                        console.log(`Downloaded ${attachment.filename}.`)
                    }
                });
            }
        });
    }
}