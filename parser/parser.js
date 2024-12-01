require('dotenv').config();
const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');

async function parser(url) {

    const channelName = url.split("/").at(-2);
    const linksDb = path.resolve(__dirname, "..", "db", `${channelName}.json`)
   
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({
        width: 1200,
        height: 800
    });

    if (!fs.existsSync(linksDb)) {
      await page.evaluate(async () => {
        const distance = 80;
        const delay = 400;
        while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
            document.scrollingElement.scrollBy(0, distance);
            await new Promise(resolve => { setTimeout(resolve, delay); });
        }
      });
    }
  

    let arr = await page.evaluate(() => {
        let shorts = document.querySelectorAll(".ShortsLockupViewModelHostEndpoint.reel-item-endpoint");
        let linksAll = [];
        shorts.forEach(e => linksAll.push(e.href));
        return linksAll;
    })

    await browser.close();

    return arr;
};

module.exports = parser;
