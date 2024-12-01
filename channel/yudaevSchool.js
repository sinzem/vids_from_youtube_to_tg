require('dotenv').config();

const urlYudaev = process.env.URL_YUDAEVSCHOOL;
const channelYudaev = process.env.CHANNEL_ID_YUDAEVSCHOOL;
const startWordYudaev = process.env.START_WORD_YUDAEVSCHOOL;
const timeoutYudaev = 1 * 60 * 1000;
const saveVideoYudaev = false;


module.exports = {
    urlYudaev,
    channelYudaev,
    startWordYudaev,
    timeoutYudaev,
    saveVideoYudaev
}
