//需要使用的包文件
const axios = require("axios");
//相关参数保存在文件内
const { nuggets } = require("./config");
const { getNowTime, pushMsg } = require("./utils");

/**
 * 掘金自动签到 请求方法
 */
const hacpaiSignRequest = async () => {
  console.log(`\n\n------${getNowTime(`toLocaleDateString`)} - 开始签到------\n`);
  const { headers, signInUrl } = nuggets; //签到相关参数
  const res = await axios({
    url: signInUrl,
    method: `post`,
    headers,
  });
  if (res && res.data && res.data.err_no !== 403) {
    console.log(`\n ${JSON.stringify(res.data)} \n \n ------ ${getNowTime(`toLocaleTimeString`)} 签到成功 ------\n`);
    //签到成功后推送消息
    if (res.data.err_no == 0) {
      console.log(`获得: ${res.data.data.incr_point}矿石, 总计: ${res.data.data.sum_point}矿石`);
    } else {
      console.log(`掘金签到结果`, res.data);
    }
    //签到成功后，30s内查询免费抽奖次数
    setTimeout(() => {
      freeCheck();
    }, Math.random() * 30 * 1000);
  } else {
    console.log(res.data);
    console.log(`\n ------ ${getNowTime(`toLocaleTimeString`)} 签到失败 ------ \n`);
    pushMsg(`掘金签到结果`, { 签到失败: res.data }); //签到失败后推送消息
  }
};

/**
 * 查询还有几次免费抽奖的机会
 */
const freeCheck = async () => {
  console.log(`\n------${getNowTime(`toLocaleString`)} 开始查询抽奖次数 ------`);
  const { headers, freeCheckUrl } = nuggets; //查询免费次数相关参数
  const res = await axios({
    url: freeCheckUrl,
    method: `get`,
    headers,
  });
  if (res && res.data) {
    console.log(`\n ------ 获得免费抽奖次数：${res.data.data.free_count || 0} ------\n`);
    if (res.data.data.free_count > 0) {
      //如果有免费抽奖次数直接开始抽奖
      luckDraw();
    }
  } else {
    console.log(res.data);
    console.log(`\n ------ ${getNowTime(`toLocaleTimeString`)} 查询抽奖次数失败 ------ \n`);
  }
};

/**
 * 掘金抽奖函数方法
 */
const luckDraw = async () => {
  console.log(`\n------${getNowTime(`toLocaleString`)} 开始抽奖 ------`);
  const { headers, drawUrl } = nuggets; //抽奖相关参数
  const res = await axios({
    url: drawUrl,
    method: `post`,
    headers,
  });
  if (res && res.data) {
    let giftName = res.data.data.lottery_name;
    if (giftName.includes("矿石" || "Bug")) {
      giftName = "stone";
      console.log(`\n ------ ${getNowTime(`toLocaleTimeString`)}  抽奖成功，获得：${res.data.data.lottery_name} ------\n`);
    } else {
      // 非矿石或bug奖励 推送微信中奖消息
      pushMsg(`掘金抽奖结果`, { 抽奖结果: res.data.data.lottery_name });
    }
  } else {
    console.log(res.data);
    console.log(`\n ------ ${getNowTime(`toLocaleTimeString`)} 抽奖失败 ------ \n`);
    pushMsg(`掘金抽奖失败`, { 抽奖失败: res.data });
  }
};

/**
 * 掘金沾喜气函数方法
 */
const copyHappyFun = async () => {
  console.log(`\n------${getNowTime(`toLocaleString`)} 开始沾喜气 ------`);
  const { headers, copyHappy, lottery_history_id } = nuggets; //抽奖相关参数
  const res = await axios({
    url: copyHappy,
    method: `post`,
    headers,
    params: { lottery_history_id },
  });
  if (res && res.data && res.data.err_no !== 403) {
    if (res.data.data.has_dip) {
      console.log(`\n ------ ${getNowTime(`toLocaleTimeString`)}  今天你已经沾过喜气，明天再来吧！ ------\n`);
    } else {
      console.log(`\n ------ ${getNowTime(`toLocaleTimeString`)}  沾喜气成功 ------\n`);
      console.log(`沾得幸运值: ${res.data.data.dip_value}, 总幸运值: ${res.data.data.total_value}`);
    }
  } else {
    console.log(res.data);
    console.log(`\n ------ ${getNowTime(`toLocaleTimeString`)} 沾喜气失败 ------ \n`);
    pushMsg(`掘金沾喜气失败`, { 沾喜气失败: res.data });
  }
};

const signTask = () => {
  setTimeout(() => {
    hacpaiSignRequest(); //签到函数
    setTimeout(() => {
      copyHappyFun(); //沾喜气函数
    }, Math.random() * 10 * 1000);
  }, Math.random() * 10 * 1000);
};

//开始执行任务
console.log(`开始执行任务-${getNowTime("toLocaleString")}`);
signTask();
