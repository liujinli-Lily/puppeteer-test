const path = require('path');
// 载入puppeteer
const puppeteer = require('puppeteer');
const MyMethods = require('./utils/file');

// 打开浏览器
(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.cnblogs.com/Wayou/p/using_puppeteer_to_take_screenshot.html');
    await page.setViewport({
        width: 1200,
        height: 800
    });

    await autoScroll(page);

    await MyMethods.mkdirFn(path.dirname(__filename) + '/img','img');

    await page.screenshot({
        path: path.dirname(__filename) + '/img/'+ new Date().getTime() +'.png', //指定文件目录
        type: 'png',
        fullPage: true
    });

    await browser.close();
})();

function autoScroll(page) {
    return page.evaluate(() => {
        return new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        })
    });
}

