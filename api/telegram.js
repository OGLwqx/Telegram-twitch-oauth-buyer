const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch')

const { telegramToken } = require('../assets/config.json')

const bot = new TelegramBot(telegramToken, {polling: true});

module.exports = bot