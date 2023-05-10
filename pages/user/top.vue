<template>
  <view class="container">
    <div class="top"></div>
    <div class="top-content">
      <view class="top-title">
        <view class="flex1">排名</view>
        <view style="width:35%;">昵称</view>
        <view style="width:35%;">手机号</view>
        <view class="flex1">抢单数量</view>
      </view>
      <view class="record-list-content" v-if="!!recordList.length">
        <view
          class="record-list-item"
          v-for="(item, index) in recordList"
          :key="index"
        >
          <view class="record-title">
            <view class="record-title1" :class="{'record-one':index == 0 ,'record-two':index == 1, 'record-three':index == 2}">{{index+1}}</view>
          </view>
          <view class="record-name">{{item.nickname || '--'}}</view>
          <view class="record-date">{{item.phone }}</view>
          <view class="record-price">{{item.cnt || 0}}</view>
        </view>
      </view>
      <!--no_data--->
      <view class="no_data_content" v-else>
        <view class="no_data_img"></view>
        <view class="no_data_text">暂无数据</view>
      </view>
      <!-- <view v-if="showTotal" class="showTotal">没有更多数据了~</view> -->
    </div>
  </view>
</template>

<script>
import ApiClinet from "@/services/api-clinet";
import ApiConfig from "@/config/api.config";
import { formatDate } from "@/utils/prototype/date"
export default {
  data() {
    return {
      recordList: [],
    };
  },
  onShow(){
   this.topData();
  },
  methods: {
    formatDate,
    topData(){
      ApiClinet.get(ApiConfig.APP_BASE_API.top).then((res) => {
        if (res.data.code == '200') {
          this.recordList = res.data.data || [];
            // this.recordList = this.recordList.concat(res.data.data.records || []);
            // this.total = Math.ceil(res.data.data.total / this.params.size);
        }
      })
    },
  },
  // onReachBottom() {
  //   if (this.params.page >= this.total) {
  //     this.showTotal=true//已经滑到底的提醒
  //     return false;
  //   }
  //   this.params.page ++;
  //   this.topData()
  // }
};
</script>

<style lang='scss'>
page {
  background-color: #ffffff;
  padding-bottom: 30upx;
}
.container {
  .top{
    height:594upx;
    width:100%;
    background: url(@/static/petcat/top.png) 100% no-repeat;
    background-size:cover;
  }
  .top-content{
    border-top-left-radius: 40upx;
    border-top-right-radius: 40upx;
    margin-top: -50upx;
    background-color: #ffffff;
    min-height: 200upx;
    .record-list-content {
      border-radius: 16upx;
      background: #fff;
      .record-list-item {
        display: flex;
        padding: 24upx;
        align-items: center;
        color: #333333;
        .flex1{
          flex: 1;
        }
        .record-title {
          flex: 1;
          display: flex;
          justify-content: center;
        }
        .record-title1{
          font-size: 26upx;
          width: 36upx;
          height: 36upx;
          border-radius: 36upx;
          line-height: 36upx;
          text-align: center;
        }
        .record-one{
          background-color: #FFD68D;
          color:#ffffff;
        }
        .record-two{
          background-color: #AEAEAE;
          color:#ffffff;
        }
        .record-three{
          background-color: #FFCAB4;
          color:#ffffff;
        }
        .record-name{
          font-size: 26upx;
          color: #333333;
          width: 35%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: center;
        }
        .record-content{
          font-size: 26upx;
          color: #333333;
          flex:1;
          text-align: center;
        }
        .record-date {
          font-size: 26upx;
          color: #333333;
          width: 35%;
          text-align: center;
        }
        .record-price {
          font-size: 26upx;
          color: #333333;
          font-weight: 700;
          flex: 1;
          text-align: center;
        }
      }
    }
    .top-title{
      display: flex;
      align-items: center;
      font-size:26upx;
      color:#333333;
      text-align: center;
      padding: 24upx;
      .flex1{
        flex: 1;
      }
    }
  }
}
.showTotal{
  text-align: center;
  line-height: 60upx;
  font-size:28upx;
  color:#999999;
}
.no_data_content{
  width: 328upx;
  height:auto;
  margin: auto;
  padding-top: 164upx;
  text-align: center;
  .no_data_img{
    width:100%;
    height:228upx;
    margin-bottom: 20upx;
    background: url(@/static/no_data.png) 100% no-repeat;
    background-size: cover;
  }
  .no_data_text{
    font-size: 24upx;
    color:#666666;
  }
}
</style>
