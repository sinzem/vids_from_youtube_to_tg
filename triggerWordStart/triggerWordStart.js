const fs = require("fs");
const path = require("path");
const downloader = require("../downloader/downloader");
const parser = require("../parser/parser");

async function triggerWordStart(message, sendFunction, {url, channelId, startWord, timeout, saveVideo, selector}) {
    let offset = 0;
    if (message.split(" ")[0] !== startWord) {
        return;
    }

    let num = Number(message.split(" ")[1]);
    if (Number.isInteger(num) && num > 0) {
        offset = num;
    }
    if (num < 0) {
        return;
    }

    console.log(`${url}: start of processing`);
    await parser(url, offset, selector)
        .then(arr => downloader(arr, url, channelId, saveVideo, sendFunction, offset))
        .then(() => console.log(`${url}: end of processing`))
        .catch((e) => console.log({message: `${url}: process error - ${e}`}));
}

module.exports = triggerWordStart;

