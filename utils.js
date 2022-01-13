const axios = require("axios");
const { pushPlus } = require("./config");

const getNowTime = (key) => {
  let nowTime = ``;
  try {
    nowTime = new Date()[key]();
  } catch (e) {
    nowTime = `获取时间函数错误！`;
    console.error(`请传入日期函数 —— ${e}`);
  }
  return nowTime;
};
// 微信推送消息
const pushMsg = async (title, content) => {
  console.log(`\n------${getNowTime(`toLocaleString`)} 开始推送wx消息 ------`);
  //获取配置参数
  const { url, token } = pushPlus;
  const res = await axios({
    url,
    method: `get`,
    params: {
      token,
      template: `json`,
      title,
      content,
    },
  });
  if (res && res.data && res.data.code === 200) {
    console.log(`\n ${JSON.stringify(res.data)} \n\n------ ${getNowTime(`toLocaleTimeString`)} 微信消息推送成功 ------\n`);
  } else {
    console.log(res.data);
    console.log(`\n------ ${getNowTime(`toLocaleTimeString`)} 微信消息推送失败 ------ \n`);
  }
};
module.exports = { getNowTime, pushMsg };
