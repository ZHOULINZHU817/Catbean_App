<template>
  <view class="container">
    <view class="profit-bg">
      <view class="profit-bg-text">总分润(元)</view>
      <view class="profit-bg-price">9878.00</view>
    </view>
    <view class="profit-content">
      <view class="profit-middle">
        <view class="profit-middle-left">
          <view class="middle-left-title">今日分润</view>
          <view class="middle-left-price">999.00</view>
        </view>
        <view class="profit-middle-right">
          <view class="middle-left-title">昨日分润</view>
          <view class="middle-left-price">888.00</view>
        </view>
      </view>
      <view class="profit-tab">
        <view class="profit-tab-title">
            <view style="width:6upx;height:30upx;background:#FF478C;"></view>
            <view class="profit-tab-text">分润记录列表</view>
        </view>
        <v-table
          :columns="columns"
          :tableData="tableList"
          :isLoading="isLoading"
          @onClick="goEarningsList"
        ></v-table>
        <view class="profit-tab-tips">注：分润到账时间：T+1，晚上12点之后到帐</view>
      </view>
    </view>
  </view>
</template>  
<script>
import vTable from "@/components/table/table.vue";
export default {
  components: {
    vTable,
  },
  data() {
    return {
        tableList:[
            {
                date:'2023-02-08 20:33',
                tradeAmount1:'好友分润',
                estimatedIncomes:"44867654",
                platformReward:"0.76"
            },
            {
                date:'2023-02-08 20:33',
                tradeAmount1:'好友分润',
                estimatedIncomes:"44867654",
                platformReward:"0.76"
            },
            {
                date:'2023-02-08 20:33',
                tradeAmount1:'好友分润',
                estimatedIncomes:"44867654",
                platformReward:"0.76"
            }
        ],
        columns: [{
                title: "日期",
                key: "date",
                width: '30%',
                listenerClick: true
            },
            {
                title: '行为',
                key: 'tradeAmount1',
                width: '30%',
                listenerClick: true
            },
            {
                title: '来源',
                key: 'estimatedIncomes',
                width: '20%',
                listenerClick: true
            },
            {
                title: '分润金额',
                key: 'platformReward',
                width: '20%',
                listenerClick: true
            },
        ],
        isLoading: false
    };
  },
  onLoad() {
    uni.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#ff5b9c",
    });
  },
  methods: {},
};
</script>  
<style lang='scss'>
page {
  background-color: #f6f6f6;
}
.container {
  .profit-bg {
    height: 440upx;
    background: url(@/static/user/shareprofit-bg.jpg) 100% no-repeat;
    background-size: 100% 100%;
    margin-top: -100upx;
    .profit-bg-text {
      font-size: 28upx;
      color: #ffffff;
      width: 100%;
      text-align: center;
      padding-top: 140upx;
    }
    .profit-bg-price {
      font-size: 60upx;
      color: #ffffff;
      width: 100%;
      text-align: center;
      font-weight: 500;
      padding-top: 20upx;
    }
  }
  .profit-content {
    padding: 0 24upx;
    margin-top: -80upx;
    .profit-middle {
      height: 136upx;
      display: flex;
      background-color: #ffffff;
      border-radius: 16upx;
      align-items: center;
      .profit-middle-left {
        height: 100upx;
        flex: 1;
        text-align: center;
        border-right: 1upx solid #f6f6f6;
      }
      .profit-middle-right {
        height: 100upx;
        flex: 1;
        text-align: center;
      }
      .middle-left-title {
        font-size: 24upx;
        color: #333333;
      }
      .middle-left-price {
        font-size: 36upx;
        color: #333333;
        font-weight: 500;
        padding-top: 20upx;
      }
    }
  }
  .profit-tab{
    padding:24upx;
    border-radius: 16upx;
    margin-top:40upx;
    background-color: #ffffff;
    .profit-tab-title{
        padding:0 0 20upx 0;
        display: flex;
        align-items: center;
        .profit-tab-text{
            font-size:32upx;
            color:#333333;
            font-weight: 700;
            margin-left: 16upx;
        }
    }
    .profit-tab-tips{
        font-size:24upx;
        color:#999999;
        margin-top:10upx;
    }
  }
}
</style>