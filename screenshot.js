const path = require('path');
const fs = require('fs');
// 载入puppeteer
const puppeteer = require('puppeteer');
const MyMethods = require('./utils/file');

(async()=>{
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage();
    await page.goto('https://music.163.com/#')

   await MyMethods.mkdirFn(path.dirname(__filename) + '/img');

    // 获取歌曲列表的 iframe
    await page.waitFor(2000);
    //获取页面Dom对象
    let iframe = await page.frames().find(f => f.name() === 'contentFrame');
    const body = await iframe.$('#discover-module');
    //调用页面内Dom对象的 screenshot 方法进行截图
    await body.screenshot({
        path: path.dirname(__filename) + '/img/'+ new Date().getTime() + '.png',
    });

    // 指定大小位置截图
    // await page.screenshot({
    //     path: path.dirname(__filename) + '/img/'+ new Date().getTime() + '.png',
    //     clip: {
    //         x: 0,
    //         y: 0,
    //         width: 400,
    //         height: 400
    //     }
    // })

    await browser.close();
})();
