<template>
  <view class="container">
    <view class="rule-bg-content">
      <view class="rule-bg">
        <view class="rule-bg-title">
          <view class="rule-bg-title1">
            <view class="rule-bg-title2">抢购规则</view>
          </view>
        </view>
      </view>
      <view class="rule-left-title">抢单利润</view>
      <view class="rule_two">
        <view class="ule_two_title"><text class="ule_two_title1">第1档：</text>抢中88-400，加价20/单增长，利润10/单</view>
        <view class="ule_two_title"><text class="ule_two_title1">第2挡：</text>抢中401-1000，加价5.0%/单增长，利润10-25/单</view>
        <view class="ule_two_title"><text class="ule_two_title1">第3挡：</text>抢中1001-2000，加价5.2%/单增长，利润26-52/单</view>
        <view class="ule_two_title"><text class="ule_two_title1">第4档：</text>抢中2001-3000，加价5.4%/单增长，利润54-81/单</view>
        <view class="ule_two_title"><text class="ule_two_title1">第5挡：</text>抢中3001-4000，加价5.6%/单增长，利润84-112/单</view>
        <view class="ule_two_title"><text class="ule_two_title1">第6档：</text>抢中4001-5000，加价5.8%/单增长，利润116-145/单</view>
        <view class="ule_two_title"><text class="ule_two_title1">第7档：</text>抢中5001-5888，加价6.0%/单增长，利润150-177/单</view>
      </view>
      <view class="rule_fot">
        <view class="rule_fot_title">按第一档计算</view>
        <view class="rule_fot_text">1、每天抢10单</view>
        <view>平均本金245元*10单本金为2450元</view>
        <view>本金2450元+利润100元隔天到账</view>
        <view>30天300单，本金2450元，每月利润3000元</view>
        <view>2、每天抢20单</view>
        <view class="rule_fot_text">按第一档计算</view>
        <view>平均本金245元20单本金为4900元</view>
        <view>本金4900元+利润200元隔天到账</view>
        <view>30天*600单，本金4900元，每月利润6000元</view>
        <view>转卖收益说明：转卖人获得加价的50%</view>
      </view>
    </view>
  </view>
</template>  
<script>
export default {
  components: {},
  data() {
    return {};
  },
  onLoad() {},
  methods: {},
};
</script>  
<style lang='scss'>
page {
  background: url(@/static/petcat/rule_bg.jpg) 100% no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  padding: 60upx 24upx;
}
.container {
  padding-bottom: 30upx;
  .rule-bg-content {
    background-color: #ffffff;
    border-radius: 16upx;
    .rule-bg {
      display: flex;
      justify-content: center;
      .rule-bg-title {
        margin-top: -25upx;
        .rule-bg-title1 {
          height: 50upx;
          width: 248upx;
          background: url(@/static/petcat/rule_t_bg1.jpg) 100% no-repeat;
          background-size: 100% 100%;
          position: relative;
          .rule-bg-title2 {
            width: 206upx;
            height: 62upx;
            background: url(@/static/petcat/rule_t_bg2.jpg) 100% no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 62upx;
            font-size: 32upx;
            color: #bc5100;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
          }
        }
      }
    }
    .rule-left-title {
      background: url(@/static/petcat/rule_t_bg3.jpg) 100% no-repeat;
      background-size: 100% 100%;
      height: 52upx;
      line-height: 52upx;
      width: 160upx;
      color:#ffffff;
      margin:50upx 0 0 0;
    }
    .rule_two{
        font-size:28upx;
        color:#333333;
        line-height: 40upx;
        padding: 24upx;
        text{
            font-weight: 700;
            color:#333333;
        }
    }
    .rule_fot{
        padding:0 24upx 24upx 24upx;
        font-size:28upx;
        color:#333333;
        line-height: 40upx;
        .rule_fot_title{
            color:#FF478C;
            font-size: 32upx;
            font-weight: 700;
            position: relative;
            margin-left: 20upx;
            margin-bottom: 20upx;
            &::before{
                content:"";
                display: block;
                width:6upx;
                height:32upx;
                background-color: #FF478C;
                position: absolute;
                top: 4upx;
                left:-20upx;
            }
        }
        .rule_fot_text{
            font-weight: 700;
            line-height: 60upx;
        }
    }
  }
}
</style>   