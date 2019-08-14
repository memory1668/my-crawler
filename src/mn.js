const puppeteer = require('puppeteer');
const {mn} = require('./config/default');
const srcToimg = require('./helper/srcToimg');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://soso.nipic.com')//爬取昵图网图片
  console.log('go to http://soso.nipic.com');
  //把浏览器窗口调大，减少懒加载
  await page.setViewport({
    width:1920,
    height:1080
  })
  console.log('reset viewport');

  await page.focus('.soso-search-input');//搜索框获得焦点
  await page.keyboard.sendCharacter('猫');//输入搜索关键字
  await page.click('.soso-search-submit');//点击
  console.log('go to search list');

  //等待页面加载完成
  page.on('load',async()=>{
    console.log('page loading done,start fetch...');

    const srcs = await page.evaluate(()=>{
      const images =document.querySelectorAll('.search-works-thumb img');
      return Array.prototype.map.call(images,img=>img.src);
    })
    console.log(`get ${srcs.length} images,start download`)
    //保存图片
    for(let i =0;i < srcs.length;i++){
      // sleep 稍微低频调用
      await page.waitFor(200);
      await srcToimg(srcs[i],mn)
    }
    await browser.close();
  });
})();
