require('dotenv').config();
const fs = require('fs');
const path = require("path");
const TGBot = require("node-telegram-bot-api");
const youtubedl = require('youtube-dl-exec');
const { v4: uuidv4 } = require('uuid');
const parser = require("./parser/parser");
const { setTimeout } = require('timers/promises');

const token = process.env.TELEGRAM_TOKEN;
const channelId = process.env.CHANNEL_ID;
// const interval = process.env.PARSE_INTERVAL_HOUR * 60 * 60 * 1000 ;

const bot = new TGBot(token, {polling: true});

// setInterval(() => {
//     parser().then(arr => downloader(arr));
// }, interval)

bot.on("message", async (msg) => { 
    // const chatId = msg.chat.id;  
    const text = msg.text;  
    if (text === '/start') {
        parser().then(arr => downloader(arr));
    }
})

async function downloader(arr) {
   
    const dbPath = path.resolve(__dirname, "videosLinks.json");
    const videosPath = path.resolve(__dirname, "videos");
  
    if(!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify([]));
    }
    if(!fs.existsSync(videosPath)) {
        fs.mkdirSync(videosPath);
    }

    const processedLinks = JSON.parse(fs.readFileSync(dbPath, {encoding: "utf8"}));
    
    if (arr.length > processedLinks.length) {
        let arrWithDeffence = [];
        arr.forEach(i => (!processedLinks.includes(i)) ? arrWithDeffence.push(i) : null);
        while (arrWithDeffence.length) {
            const downloadLink = arrWithDeffence.pop();
            const nameVideo = uuidv4() + ".mp4";
            await youtubeDownloader(downloadLink, videosPath, nameVideo);
            await bot.sendVideo(channelId, path.resolve(videosPath, nameVideo));
            processedLinks.push(downloadLink);
            fs.rmSync(path.resolve(videosPath, nameVideo));
        }
    }

    fs.writeFileSync(dbPath, JSON.stringify(processedLinks));

    return true;
}

async function youtubeDownloader(address, folder, name) {
    await youtubedl(address, {
        noWarnings: true,
        preferFreeFormats: true,
        o: name,
        paths: folder
    }).then((output) => console.log(output));
}
