const mongoose = require('mongoose')
const { databaseURL } = require('../assets/config.json')

const connectDatabase = () => (
    mongoose.connect(databaseURL, (err) => {
        if (err) throw (err)
        console.log('>> | Выполнено подключение к базе данных')
    })
)

module.exports = connectDatabase