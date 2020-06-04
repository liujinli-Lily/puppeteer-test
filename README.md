```$xslt
echo "# puppeteer-test" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/liujinli-Lily/puppeteer-test.git
git push -u origin master
```
…or push an existing repository from the command line
```$xslt
git remote add origin https://github.com/liujinli-Lily/puppeteer-test.git
git push -u origin master
```


淘宝镜像
```$xslt
npm install -g cnpm --registry=https://registry.npm.taobao.org

```
Puppeteer安装时自带一个最新版本的Chromium
```$xslt
npm i puppeteer
```

```$xslt
cnpm run install 
or 
cnpm i 
```

- puppeteer.launch 启动浏览器实例
- browser.newPage() 创建一个新页面
- page.goto 进入指定网页
- page.screenshot 截图

- page.type 获取输入框焦点并输入文字
- page.keyboard.press 模拟键盘按下某个按键，目前mac上组合键无效为已知bug
- page.waitFor 页面等待，可以是时间、某个元素、某个函数
- page.frames() 获取当前页面所有的 iframe，然后根据 iframe 的名字精确获取某个想要的 iframe
- iframe.$('.srchsongst') 获取 iframe 中的某个元素
- iframe.evaluate() 在浏览器中执行函数，相当于在控制台中执行函数，返回一个 Promise
- Array.from 将类数组对象转化为对象
- page.click() 点击一个元素
- iframe.$eval() 相当于在 iframe 中运行 document.queryselector 获取指定元素，并将其作为第一个参数传递
- iframe.$$eval 相当于在 iframe 中运行 document.querySelectorAll 获取指定元素数组，并将其作为第一个参数传递


```$xslt
页面全屏截图
npm run start
// 指定范围或dom截图
npm run start
```

```$xslt
网易云音乐爬取
npm run music
```

```$xslt
生成pdf文件
npm run pdf
```
