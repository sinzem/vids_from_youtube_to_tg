require('dotenv').config();
const puppeteer = require('puppeteer');

const url = process.env.URL_FROM_YOUTUBE;

async function parser() {

    // const arr = [
    //   "https://www.youtube.com/shorts/z3RlIM2NtJs",
    //   "https://www.youtube.com/shorts/Vkzrh9yWJps",
    //   "https://www.youtube.com/shorts/PK0VTaSQD9k",
    //   "https://www.youtube.com/shorts/3Qhy6ww7waQ",
    //   "https://www.youtube.com/shorts/35XgWx58q8g",
    //   "https://www.youtube.com/shorts/RxunLvcxlow",
    //   "https://www.youtube.com/shorts/kPFxLZ_WyP4",
    //   "https://www.youtube.com/shorts/BXBVx9T2Yao",
    //   "https://www.youtube.com/shorts/xSKMNtuxyrU",
    //   "https://www.youtube.com/shorts/X4uD395OEzw",
    //   "https://www.youtube.com/shorts/6iWqEIE0ISk",
    //   "https://www.youtube.com/shorts/0jNTazwbaFs",
    //   "https://www.youtube.com/shorts/ETnRkd3M4do",
    //   "https://www.youtube.com/shorts/i46sMIvFz3s",
    //   "https://www.youtube.com/shorts/WWJ8WWIZLGs",
    //   "https://www.youtube.com/shorts/r4I5d0lhHqs",
    //   "https://www.youtube.com/shorts/ygaydL4JKJE",
    //   "https://www.youtube.com/shorts/KN-o3YpXMx0",
    //   "https://www.youtube.com/shorts/tb1r56S6fU4",
    //   "https://www.youtube.com/shorts/43-I3yIOj9Y",
    //   "https://www.youtube.com/shorts/TslH90Zk67E",
    //   "https://www.youtube.com/shorts/hP7jVHJ5Y8c",
    //   "https://www.youtube.com/shorts/-rPCxhh0Ot0",
    //   "https://www.youtube.com/shorts/ucinQXBbPRo",
    //   "https://www.youtube.com/shorts/ktuvwWkhw2A",
      // "https://www.youtube.com/shorts/e26-7S5n_xg",
      // "https://www.youtube.com/shorts/JcvcPGyMR2M",
      // "https://www.youtube.com/shorts/7k5IffjrT8c",
      // "https://www.youtube.com/shorts/lq8E5kc5KyY",
      // "https://www.youtube.com/shorts/OmUoTwG4_AA",
      // "https://www.youtube.com/shorts/v-zb3Ox_Np0",
      // "https://www.youtube.com/shorts/1h_aws4tWw4",
      // "https://www.youtube.com/shorts/sQVg6Ex36yU",
      // "https://www.youtube.com/shorts/0RMoxUeyq70",
      // "https://www.youtube.com/shorts/Z9ueElmwwGU",
      // "https://www.youtube.com/shorts/1aOFYrOQ-zM",
      // "https://www.youtube.com/shorts/ggjPFkiUIoY",
      // "https://www.youtube.com/shorts/ckjalwrq9UA",
      // "https://www.youtube.com/shorts/pncT85LFQBI",
      // "https://www.youtube.com/shorts/iatwvmp15Gc",
      // "https://www.youtube.com/shorts/jsc5nE0ALRY",
      // "https://www.youtube.com/shorts/Ggc1sYJtNog",
      // "https://www.youtube.com/shorts/KKmPfCLq7KI",
      // "https://www.youtube.com/shorts/TvBmx79IfwU",
      // "https://www.youtube.com/shorts/12ZoJY0PodI",
      // "https://www.youtube.com/shorts/WPmPgzgNfDU",
      // "https://www.youtube.com/shorts/8c7zaro-qK4",
      // "https://www.youtube.com/shorts/Oa4jhaU3j50",
      // "https://www.youtube.com/shorts/LvkUqwDz0yo",
      // "https://www.youtube.com/shorts/z5qFL_HeVAk"
    // ]

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

module.exports = parser;
