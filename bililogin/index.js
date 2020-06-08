const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const pixels = require("image-pixels");
const resemble = require("resemblejs");

let page = null;
const bgImg = path.resolve(__dirname, "bg.png");
const fullbgImg = path.resolve(__dirname, "fullbg.png");
const account = `17625465856`;
const password = `123445788`;
async function run() {
    const browser = await puppeteer.launch({
        headless: false,
        // devtools: true,
    });
    page = await browser.newPage();

    // 打开前端网
    await page.goto('https://passport.bilibili.com/login');
    await page.waitFor(1000);
    // 2.输入账号密码
    page.type('#login-username',account)
    await page.waitFor(500);
    page.type('#login-passwd',password)
    await page.waitFor(1000);
    // 3.点击验证
    page.click('.btn-login')
    await page.waitFor(1000);

    // 获取滑动距离
    async function getDistance() {

        // 获取canvas
        let { bg, fullbg } = await page.evaluate(() => {
            const fullbg = document.querySelector(".geetest_canvas_fullbg");
            const bg = document.querySelector(".geetest_canvas_bg");
            return {
                bg: bg.toDataURL(),
                fullbg: fullbg.toDataURL()
            };
        });

        bg = bg.replace(/^data:image\/\w+;base64,/, "");
        fullbg = fullbg.replace(/^data:image\/\w+;base64,/, "");
        var bgDataBuffer = new Buffer(bg, "base64");
        var fullbgDataBuffer = new Buffer(fullbg, "base64");

        fs.writeFileSync(bgImg, bgDataBuffer);
        fs.writeFileSync(fullbgImg, fullbgDataBuffer);

        // 通过resemble比较背景图和缺口图的不同
        resemble(bgImg)
            .compareTo(fullbgImg)
            .ignoreColors()
            .onComplete(async function(data) {
                fs.writeFileSync(path.resolve(__dirname, `diff.png`), data.getBuffer());
            });

        var { data } = await pixels(path.resolve(__dirname, `diff.png`), {
            cache: false
        });

        // 获取缺口距离左边的做小位置，即计为需要滑动的距离
        let arr = [];
        for (let i = 10; i < 150; i++) {
            for (let j = 80; j < 220; j++) {
                var p = 260 * i + j;
                p = p << 2;
                if (data[p] === 255 && data[p + 1] === 0 && data[p + 2] === 255) {
                    arr.push(j);
                    break;
                }
            }
        }
        return Math.min(...arr);
    }

    const distance = await getDistance();

    const button = await page.$(".geetest_slider_button");
    const box = await button.boundingBox();
    const axleX = Math.floor(box.x + box.width / 2);
    const axleY = Math.floor(box.y + box.height / 2);

    await btnSlider(distance);

    // 滑动滑块
    async function btnSlider(distance) {
        await page.mouse.move(axleX, axleY);
        console.log(axleX, axleY);
        console.log('111111111');
        console.log(box.x,distance);
        await page.mouse.down();
        await page.waitFor(200);
        await page.mouse.move(box.x + distance / 4, axleY, { steps: 20 });
        await page.waitFor(200);
        await page.mouse.move(box.x + distance / 3, axleY, { steps: 18 });
        await page.waitFor(350);
        await page.mouse.move(box.x + distance / 2, axleY, { steps: 15 });
        await page.waitFor(400);
        await page.mouse.move(box.x + (distance / 3) * 2, axleY, { steps: 15 });
        await page.waitFor(350);
        await page.mouse.move(box.x + (distance / 4) * 3, axleY, { steps: 10 });
        await page.waitFor(350);
        await page.mouse.move(box.x + distance + 20, axleY, { steps: 10 });
        await page.waitFor(300);
        await page.mouse.up();
        await page.waitFor(1000);

        const text = await page.evaluate(() => {
            return document.querySelector(".geetest_result_box").innerText;
        });
        console.log(text);
        let step = 0;
        if (text) {
            // 如果失败重新获取滑块
            if (
                text.includes("请正确拼合图像")
            ) {
                await page.waitFor(2000);
                await page.click(".geetest_refresh_1");
                await page.waitFor(1000);
                step = await getDistance();
                await btnSlider(step);
            } else if (text.includes("速度超过")) {
                console.log("success");
            } else if(text.includes("怪物吃了拼图")){
                await page.waitFor(2000);
                await page.click(".geetest_panel_error_content");
                await page.waitFor(1000);
                step = await getDistance();
                await btnSlider(step);
            }
        }
    }
}
run();
