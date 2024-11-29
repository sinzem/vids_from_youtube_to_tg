const puppeteer = require('puppeteer');
const http = require('http');

async function parsing() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/@ai-iiru/shorts');
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
    // console.log(arr);
    // console.log(arr.length);
    
    let vidsLinks = [];

    for (let i = 0; i < arr.length; i++) {
        await page.goto(arr[i]);
        const vidsLink = await page.$eval(".video-stream.html5-main-video", e => e.src);
        vidsLinks.push(vidsLink);
    }
    
    console.log(vidsLinks);
    console.log(vidsLinks.length);

    await browser.close();
};

parsing();





