require('dotenv').config();
const parser = require("../parser/parser");
const downloader = require("../downloader/downloader");

const interval = process.env.PARSING_INTERVAL_MINUTES * 60 * 1000 || 86400000;

const parsingInterval = ({url, channelId, timeout, saveVideo, selector}, sendFunction, offset) => setTimeout(() => {
    setInterval(() => {
        console.log(`${url}: start of processing`);
        parser(url, offset, selector)
            .then(arr => downloader(arr, url, channelId, saveVideo, sendFunction, offset))
            .then(() => console.log(`${url}: end of processing`))
            .catch((e) => console.log({message: `${url}: process error - ${e}`}));
    }, interval)
}, timeout);

module.exports = parsingInterval;