const path = require('path');
const fs = require('fs');

module.exports = {
   mkdirFn (path,file) {
        return new Promise((resolve, reject) => {
            //检查某个目录是否存在
            //var stat = fs.statSync(path.join(__dirname,'img'));
            //为true的话那么存在，如果为false不存在
            if(!fs.existsSync(path)){
                fs.mkdir(file,function(error) {
                    if (error) {
                        console.log(error);
                        return false;
                    }
                    console.log('创建目录成功');
                    resolve();
                })
            }
            resolve();
        })
    }
}
