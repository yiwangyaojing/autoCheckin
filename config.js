//查询今日是否签到成功接口  https://api.juejin.cn/growth_api/v1/get_today_status
let [JUEJIN_COOKIE, PUSH_TOKEN] = process.argv.slice(2)
module.exports = {
  //掘金相关参数
  nuggets: {
    signInUrl: `https://api.juejin.cn/growth_api/v1/check_in`, //签到接口
    freeCheckUrl: `https://api.juejin.cn/growth_api/v1/lottery_config/get`, //免费抽奖次数查询
    drawUrl: `https://api.juejin.cn/growth_api/v1/lottery/draw`, //抽奖接口
    copyHappy: `https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky`,  //沾喜气
    lottery_history_id: `7020267603864059917`,  //被沾喜气的id
    headers: {
      Referer: "https://juejin.cn/",
      "Upgrade-Insecure-Requests": 1,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
      cookie: JUEJIN_COOKIE
    }, //相关请求头
  },
  //消息推送相关参数 关注pushplus微信公众号可以获得一对一推送的调用参数
  pushPlus: {
    url: `http://www.pushplus.plus/send`, //微信推送URL
    token: PUSH_TOKEN, 
  }
}
