<template>
  <view class="container">
    <view class="record-content">
      <view class="record-list-content" v-if="!!recordList.length">
        <view
          class="record-list-item"
          v-for="(item, index) in recordList"
          :key="index"
        >
          <view class="flex1">
            <view class="record-title">ID:{{item.id}}</view>
            <view class="record-date">{{ formatDate(item.createTime) }}</view>
          </view>
          <view>
            <view class="record-title" :class="item.state=='reject'?'reject':''">{{catBean[item.state]}}</view>
            <view class="record-price">{{ item.amount }}</view>
            <view class="record-reason">{{ item.reason }}</view>
          </view>
        </view>
      </view>
      <!--no_data--->
      <view class="no_data_content" v-else>
        <view class="no_data_img"></view>
        <view class="no_data_text">暂无数据</view>
      </view>
      <view v-if="showTotal" class="showTotal">没有更多数据了~</view>
    </view>
  </view>
</template>

<script>
import ApiClinet from "@/services/api-clinet";
import ApiConfig from "@/config/api.config";
import { formatDate } from "@/utils/prototype/date"
let catBean = {
  audit:'待审核', 
  finish: '已审核',
  reject: '已拒绝',
}
export default {
  data() {
    return {
      recordList: [],
      params:{
        page: 0,
        size: 10
        },
      showTotal: false,
      catBean: catBean,
    };
  },
  onShow(){
    this.recordList = [];
    this.params.page = 0;
    this.rechargeList();
  },
  methods: {
    formatDate,
    rechargeList(){
      ApiClinet.get(ApiConfig.APP_BASE_API.rechargeList, this.params).then((res) => {
        if (res.data.code == '200') {
            this.recordList = this.recordList.concat(res.data.data.records || []);
            this.total = Math.ceil(res.data.data.total / this.params.size);
        }
      })
    }
  },
  onReachBottom() {
      if (this.params.page >= this.total) {
      this.showTotal=true//已经滑到底的提醒
      return false;
    }
    this.params.page ++;
    this.rechargeList()
  }
};
</script>

<style lang='scss'>
page {
  background-color: #f6f6f6;
  padding-bottom: 30upx;
}
.container {
  .record-content {
    padding: 24upx;
    .record-text {
      font-size: 32upx;
      color: #333333;
      padding: 30upx 0;
      font-weight: 700;
    }
    .record-list-content {
      border-radius: 16upx;
      background: #fff;
      .record-list-item {
        display: flex;
        padding: 24upx;
        align-items: center;
        .flex1{
          flex: 1;
        }
        .record-title {
          font-size: 30upx;
          color: #333333;
          margin-bottom: 20upx;
        }
        .record-date {
          font-size: 24upx;
          color: #999999;
        }
        .record-price {
          font-size: 32upx;
          color: #333333;
          font-weight: 700;
          text-align: right;
        }
        .reject{
            color:#FF478C;
        }
        .record-reason{
          font-size: 24upx;
          color: #999999;
          text-align: right;
        }
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
  margin: 160upx auto;
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
