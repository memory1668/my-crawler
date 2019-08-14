const puppeteer = require('puppeteer');
const {mn} = require('./config/default');
const srcToimg = require('./helper/srcToimg');

(async () => {
  const browser = await puppeteer.launch({
    headless:false
  });
  const page = await browser.newPage();
  await page.goto('http://www.nipic.com/index.html')
  console.log('go to http://www.nipic.com/index.html');

  await page.setViewport({
    width:1920,
    height:1080
  })
  console.log('reset viewport');

  await page.focus('#sosoGuide');
  await page.keyboard.sendCharacter('猫');
  await page.click('.soso-search-submit');
  console.log('go to search list');

  //never emit!!
  page.on('load',async()=>{
    console.log('page loading done,start fetch...');

    const srcs = await page.evaluate(()=>{
      const images =document.querySelectorAll('img.lazy');
      return Array.prototype.map.call(images,img=>img.src);
    })
    console.log(`get ${srcs.length} images,start download`)
    for(let i =0;i < srcs.length;i++){
      await page.waitFor(200);
      await srcToimg(srcs[i],mn)
    }
    await browser.close();
  });
})();
