const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const { promisify } = require('util');

module.exports = async(src, dir) => {
  //只匹配jpg,png,gif格式的图片
  if (/\.(jpg|png|gif)$/.test(src)) {
    await urlToImg(src, dir);
  }
  else
    return
};

// url => image
const urlToImg = promisify((url, dir, callback) => {
  const mod = /^https:/.test(url) ? https : http;//判断是什么协议
  const ext = path.extname(url);//文件扩展名
  const file = path.join(dir, `${Date.now()}${ext}`);//文件路径（绝对路径）

  mod.get(url, res => {
    res.pipe(fs.createWriteStream(file))//写入图片文件
      .on('finish', () => {
        callback();
        console.log(file);
      })
  });
});
