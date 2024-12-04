require('dotenv').config();
const fs = require('fs');
const path = require("path");
const TGBot = require("node-telegram-bot-api");
const triggerWordStart = require("./triggerWordStart/triggerWordStart");
const channelYudaev = require("./channel/yudaevSchool");
const parsingInterval = require("./parsingInterval/parsingInterval");

const token = process.env.TELEGRAM_TOKEN;

const bot = new TGBot(token, {polling: true});


bot.on("message", async (msg) => {  
    const chatId = msg.chat.id;
    const text = msg.text;  
    if (text === "/start") {
        await bot.sendMessage(chatId, "Hello")
    }

    if (text.includes(channelYudaev.startWord)) {
        triggerWordStart(text, sendToChannel, channelYudaev)
    }
})

parsingInterval(channelYudaev, sendToChannel, offset = 0);

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



