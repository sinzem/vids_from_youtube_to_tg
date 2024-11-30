const fs = require('fs');
const path = require('path');
const youtubedl = require('youtube-dl-exec');

async function downloader(arr) {
    const dbPath = path.resolve(__dirname, "videosLinks.json");
    const videosPath = path.resolve(__dirname, "..", "videos");
  
    if(!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify([]));
    }
    if(!fs.existsSync(videosPath)) {
        fs.mkdirSync(videosPath);
    }

    const processedLinks = JSON.parse(fs.readFileSync(dbPath, {encoding: "utf8"}));
    
    if (arr.length > processedLinks.length) {
        await arr.forEach(link => {
            if (!processedLinks.includes(link)) {
                youtubeDownloader(link, videosPath);
                processedLinks.push(link);
            }
        })
        fs.writeFileSync(dbPath, JSON.stringify(processedLinks));
    }

    return arr;
}

module.exports = downloader;

async function youtubeDownloader(address, folder) {
    await youtubedl(address, {
        noWarnings: true,
        preferFreeFormats: true,
        paths: folder
    }).then((output) => console.log(output));
}

