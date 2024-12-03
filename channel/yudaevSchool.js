require('dotenv').config();

const channelYudaev = {
    url: process.env.URL_YUDAEVSCHOOL,
    channelId: process.env.CHANNEL_ID_YUDAEVSCHOOL,
    startWord: process.env.START_WORD_YUDAEVSCHOOL,
    timeout: 1 * 60 * 1000,
    saveVideo: false,
    selector: ".ShortsLockupViewModelHostEndpoint.reel-item-endpoint"
}


module.exports = channelYudaev;
