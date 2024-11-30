require('dotenv').config();
const puppeteer = require('puppeteer');

const url = process.env.URL_FROM_YOUTUBE;

async function parsing() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({
        width: 1200,
        height: 800
    });

    await page.evaluate(async () => {
        const distance = 100;
        const delay = 200;
        while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
            document.scrollingElement.scrollBy(0, distance);
            await new Promise(resolve => { setTimeout(resolve, delay); });
        }
    });

    let arr = await page.evaluate(() => {
        let shorts = document.querySelectorAll(".ShortsLockupViewModelHostEndpoint.reel-item-endpoint");
        let linksAll = [];
        shorts.forEach(e => linksAll.push(e.href));
        return linksAll;
    })

    await browser.close();
    
    return arr;
};

module.exports = parsing;
