const twitch = require('./api/twitch');
const bot  = require('./api/telegram');
const connectDatabase = require('./base/mongoConnect')
const userActions = require('./base/useractions')
const fs = require('fs');
const config = require('./assets/config.json')

connectDatabase()

/*(async ()=>{
    console.log(await twitch.check(['s9t8jjsap3sif5aw01uq8t7xfyeokk','s9t8jjsap3sif5aw01uq8t7xfyeokk','abc','s9t8jjsap3sif5aw01uq8t7xfyeoka']))
})();*/

bot.on('message', async (msg) => {
    const id = msg.chat.id;
    const text = msg.text;

    const user = await userActions.get(id, { id: true })

    if(!user) {
        userActions.create(id)
    }

    if(msg?.document) {
        const file = await bot.getFile(msg.document.file_id)
        console.log(`<< | Загружен файл ${file.file_path} | Размер: ${file.file_size} bytes`)
        if(file.file_size > 5242880) {
            bot.sendMessage(id, '❌ | Пожалуйста, загружайте файлы весом не более 5 мегабайт')
            return
        }
        if(!config.allowedMimeTypes.includes(msg.document.mime_type)) {
            bot.sendMessage(id, '❌ | Пожалуйста, загружайте только txt')
            return
        }
        bot.getFileStream(msg.document.file_id).pipe(fs.createWriteStream(`./files/`+file.file_path.split('/')[1]))
    }

    if(['/start', 'начать', 'привет'].includes(text)) {
        bot.sendMessage(id, 'Главное меню')
    }
})