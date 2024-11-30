require('dotenv').config();
const fs = require('fs');
const path = require("path");
const TGBot = require("node-telegram-bot-api");
const parser = require("./parser/parser");
const downloader = require("./downloader/downloader");

parser().then(arr => downloader(arr));
