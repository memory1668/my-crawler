# my-crawler
使用 headless 实现的简单爬虫
## 需求
爬取昵图网关于“猫”的图片（缩略图），保存在本地
## 思路
使用puppeteer模拟浏览器的行为：
* 获得browser对象
* 获得page对象
* 跳转到[昵图网](http://soso.nipic.com)首页
* 模拟在浏览器输入“猫”并点击搜索按钮的行为
* 结果页面加载完成，获取图片的src属性
* 根据src将图片保存在本地
![](https://github.com/memory1668/images/blob/master/1565845351994.jpg?raw=true)
