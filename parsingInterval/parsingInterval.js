require('dotenv').config();
const parser = require("../parser/parser");
const downloader = require("../downloader/downloader");

const interval = process.env.PARSING_INTERVAL_MINUTES * 60 * 1000 || 86400000;

const parsingInterval = (url, channelId, save, sendFunction, timeout) =>setTimeout(() => {
    setInterval(() => {
        console.log(`${url}: start of processing`);
        parser(url)
            .then(arr => downloader(arr, url, channelId, save, sendFunction))
            .then(() => console.log(`${url}: end of processing`))
            .catch((e) => console.log({message: `${url}: process error - ${e}`}));
    }, interval)
}, timeout);

module.exports = parsingInterval;