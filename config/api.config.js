import AppConfig from "./app.config";

const {BASE_URL, ANDROID_URL} = AppConfig;

export default {
    BASE_URL,
    ANDROID_URL,
    // WebSocket
    WEB_SOCKET_URL: "ws://localhost:4000",

    // 第三方接口
    OPEN_API: {},

    //基础API
    APP_BASE_API: {

       /**猫超API --注册首页*** */
       register:`${ANDROID_URL}/api/app/member/register`, //注册
       code:`${ANDROID_URL}/api/common/code`, //获取验证码
       login:`${ANDROID_URL}/api/app/member/login`, //登陆
       logout:`${ANDROID_URL}/api/app/member/logout`, //登出
       resetPwd:`${ANDROID_URL}/api/app/member/pwd`, //重置密码
       editPwdPay:`${ANDROID_URL}/api/app/member/pwd/pay`, //重置支付密码
       //首页商品
       productList:`${ANDROID_URL}/api/app/product/list`, //商城->商品列表
       bannerList:`${ANDROID_URL}/api/app/banner/list`, //banner列表
       //    bannerList:`/api/common/code`, // H5跨域问题解决
       //会员---个人中心
       member:`${ANDROID_URL}/api/app/member`, //获取当前用户
       memberChildList:`${ANDROID_URL}/api/app/member/child/list`, //获取当前用户团队
       memberDetail:`${ANDROID_URL}/api/app/member/detail`, //获取当前用户详情
       userExist:`${ANDROID_URL}/api/app/member/id/card/exist`, //检查当前用户是否认证
       payExist:`${ANDROID_URL}/api/app/member/pwd/pay/exist`, //是否设置支付密码
       realAuth:`${ANDROID_URL}/api/app/member/real/auth`, //实名认证
       receiveAccount:`${ANDROID_URL}/api/app/member/receive/account`, //设置收款账号 
       settingInfo:`${ANDROID_URL}/api/app/member/setting/info`, //设置用户信息
       logoff: `${ANDROID_URL}/api/app/member/logoff`, //注销账号
       top: `${ANDROID_URL}/api/app/count/top10`, //排行榜

       /**消息中心--公告* */
       noticeDetail:`${ANDROID_URL}/api/app/notice/detail`, //获取公告详情
       noticeList:`${ANDROID_URL}/api/app/notice/list`, //公告列表
       noticeMsg:`${ANDROID_URL}/api/app/notice/msg`, //消息红点 && 消息读取
       
       /***商品订单页面** */
       recordGoodList:`${ANDROID_URL}/api/app/record/product/list`, //商品订单列表
       recordGoodBuy:`${ANDROID_URL}/api/app/record/product`, //商品购买
       recordGoodCancel:`${ANDROID_URL}/api/app/record/product/cancel`, //取消订单
       recordGoodPay:`${ANDROID_URL}/api/app/record/product/pay`, //商品支付
       recordGoodRefund:`${ANDROID_URL}/api/app/record/product/refund`, //商品订单列表
       
       /**收货** */
       address:`${ANDROID_URL}/api/app/receive/address`, //默认收货地址 && 添加 && 编辑 && 删除
       addressList:`${ANDROID_URL}/api/app/receive/address/list`, //收货地址列表

       /**版本管理* */
       versionLast:`${ANDROID_URL}/api/app/version/last`, //获取版本

       /**抢购订单** */
       recordBuyList:`${ANDROID_URL}/api/app/record/buy/list`, //获取 抢购 记录列表
       catFoodList:`${ANDROID_URL}/api/app/record/cat/food/list`, //获取 猫粮 记录列表
       exchangeList:`${ANDROID_URL}/api/app/record/exchange/list`, //获取 兑换 记录列表
       rechargeList:`${ANDROID_URL}/api/app/record/recharge/list`, //获取 充值 记录列表
       reserveList:`${ANDROID_URL}/api/app/record/reserve/list`, //获取 预约 记录列表
       rewardList:`${ANDROID_URL}/api/app/record/reward/list`, //获取 收益 记录列表
       transferList:`${ANDROID_URL}/api/app/record/transfer/list`, //获取 转账 记录列表
       winList:`${ANDROID_URL}/api/app/record/win/list`, //获取 中奖 记录列表
       withdrawList:`${ANDROID_URL}/api/app/record/withdraw/list`, //获 提现 记录列表
       
       /***资产** */
       asset:`${ANDROID_URL}/api/app/asset`, //获取当前用户资产 && 提现用户资产
       assetExchange:`${ANDROID_URL}/api/app/asset/exchange`, //兑换
       assetReserve:`${ANDROID_URL}/api/app/asset/reserve`, //预约
       assetTransfer:`${ANDROID_URL}/api/app/asset/transfer`, //转赠
       withdraw:`${ANDROID_URL}/api/app/asset/withdraw`, //提现
       recharge: `${ANDROID_URL}/api/app/asset/recharge`,  //充值

       /**系统信息* */
       appInfo:`${ANDROID_URL}/api/app/info`, //转赠

       registerH5:`/api/app/member/register`, //注册
       codeH5:`/api/common/code`, //获取验证码








    },
    //首页模块
    APP_HOME_API: {
        INDEX: `${BASE_URL}/index`, //获取首页数据
    },
};
