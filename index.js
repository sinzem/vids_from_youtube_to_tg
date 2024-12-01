require('dotenv').config();
const fs = require('fs');
const path = require("path");
const TGBot = require("node-telegram-bot-api");
const downloader = require("./downloader/downloader");
const parser = require("./parser/parser");
const parsingInterval = require("./parsingInterval/parsingInterval");
const {urlYudaev, channelYudaev, startWordYudaev, timeoutYudaev, saveVideoYudaev} = require("./channel/yudaevSchool");

const token = process.env.TELEGRAM_TOKEN;

const bot = new TGBot(token, {polling: true});


bot.on("message", async (msg) => {  
    const chatId = msg.chat.id;
    const text = msg.text;  
    if (text === "/start") {
        await bot.sendMessage(chatId, "Hello")
    }
    if (text === `${startWordYudaev}`) {
        console.log(`${urlYudaev}: start of processing`);
        parser(urlYudaev)
            .then(arr => downloader(arr, urlYudaev, channelYudaev, saveVideoYudaev, sendToChannel))
            .then(() => console.log(`${urlYudaev}: end of processing`))
            .catch((e) => console.log({message: `${urlYudaev}: process error - ${e}`}));
    }
})


parsingInterval(urlYudaev, channelYudaev, saveVideoYudaev, sendToChannel, timeoutYudaev);


async function sendToChannel(videoPath, channelId) {
    if (fs.existsSync(videoPath)) {
        try {
            const stream = fs.createReadStream(videoPath);
            await bot.sendVideo(channelId, stream, {}, {contentType: "application/octet-stream"});
        } catch (e) {
            console.log({message: `Error sending file: ${e}`});
        }
    }
}

