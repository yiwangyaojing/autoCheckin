### autoCheckin

- [x] 掘金自动签到

- [x] 掘金自动抽奖

- [x] 掘金自动沾喜气

- [x] 定时通知更新cookie

### 使用方法
1. fork或clone本项目
2. settings -> secrets -> 添加这两个secrets [JUEJIN_COOKIE, PUSH_TOKEN]
JUEJIN_COOKIE：掘金的cookie，再开发者选项 network中找
PUSH_TOKEN：微信推送pushplus推送token，关注后拿到token用于推送消息

### 手动验证
项目中添加readme文件 随便写点之后提交
提交更新后actions就会自动触发了，正常的话微信会收到pushplus推送的消息

### 参考
[GitHub - Cron/Cron: Cron API](https://github.com/Cron/Cron) 

[hccluck/public_actions](https://github.com/hccluck/public_actions) 

[签到、抽奖太麻烦？试试node自动化脚本](https://juejin.cn/post/7048958654334107684)
