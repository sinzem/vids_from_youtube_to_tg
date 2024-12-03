const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const youtubedl = require("youtube-dl-exec");

async function downloader(arr, url, channelId, save, sendFunction, offset) {
   
    const channelName = url.split("/").at(-2);
    const dbPath = path.resolve(__dirname, "..", "db", `${channelName}.json`);
    const videosAll = (__dirname, "..", "videos");
    const videosDir = path.resolve(videosAll, channelName);
  
    if(!fs.existsSync(path.resolve(__dirname, "..", "db"))) {
        fs.mkdirSync(path.resolve(__dirname, "..", "db"));
    }
    if(!fs.existsSync(videosAll)) {
        fs.mkdirSync(videosAll);
    }
    if(!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify([]));
    }
    if(!fs.existsSync(videosDir)) {
        fs.mkdirSync(videosDir);
    }
   
    const processedLinks = JSON.parse(fs.readFileSync(dbPath, {encoding: "utf8"}));
    if (offset > 0) {
        processedLinks.splice(0, offset);
    }
    
    let arrWithDeffence = [];

    arr.forEach(i => (!processedLinks.includes(i)) ? arrWithDeffence.push(i) : null);

    while (arrWithDeffence.length) {
        const downloadLink = arrWithDeffence.pop();
        const nameVideo = uuidv4() + ".mp4";
        const videoPath = path.resolve(videosDir, nameVideo);
        try {
            await youtubeDownloader(downloadLink, videosDir, nameVideo);
        } catch (e) {
            console.log({message: `Error while downloading file: ${e}`});
        }
        
        processedLinks.unshift(downloadLink);

        await sendFunction(videoPath, channelId); 
        
        if (fs.existsSync(videoPath) && save === false) {
            try {
                fs.rmSync(videoPath);
            } catch (e) {
                console.log({message: `File deletion error ${e}`});
            }
            
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

module.exports = downloader;