const path = require('path');
// 载入puppeteer
const puppeteer = require('puppeteer');
const MyMethods = require('./utils/file');

// 打开浏览器
(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.emulateMedia("screen");
    await page.goto("https://help.eolinker.com/#/tutorial/?groupID=c-441&productID=13");

    await autoScroll(page);

    await MyMethods.mkdirFn(path.dirname(__filename) + '/pdf','pdf');
    await page.pdf({
        path: path.dirname(__filename) + '/pdf/'+ new Date().getTime() + '.pdf',
        format: "A4",
        printBackground: true, // 展示背景图片
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
