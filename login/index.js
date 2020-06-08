const puppeteer = require('puppeteer');
const path = require('path');
const MyMethods = require('../utils/file');
const account = `jinliliu`;
const password = `123456789`;
(async () => {
    const browser = await puppeteer.launch({headless: false});//打开有界面的浏览器
    const page = await browser.newPage();//打开一个空白页
    await page.goto('https://tapd.tencent.com/');//打开网站
    await page.setViewport({
        width: 1980,
        height: 1280
    });
    await page.type('#username', account);
    await page.type('#password_input', password);
    await page.click('#login_button');
    // await page.waitForNavigation({
    //     waitUntil: 'load'
    // });//等待页面加载出来，等同于window.onload
    await MyMethods.mkdirFn(path.join(__dirname,'../img/'),'img');
    await page.screenshot({
        path: path.join(__dirname,'../img/') + new Date().getTime() +'.png', //指定文件目录
    });//截个图
    // await page.close();
    // await browser.close();//关掉浏览器

})();
