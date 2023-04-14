<template>
  <view class="container">
    <view class="cat-bean-top">
      <view class="cat-bean-top-content">
        <view class="cat-bean-top-bg">
          <view class="margin-b-20">猫豆数量</view>
          <view>
            <text class="cat-bean-top-num">{{assetObj.catFood || 0}}</text>
            <text @click="navTo('/pages/cat/withdraw')" class="cat-bean-top-btn"
              >提现</text
            >
          </view>
        </view>
        <view class="cat-bean-top-fot">
          <view class="frozen">冻结猫豆:{{assetObj.frozenCatFood}}</view>
          <view @click="navTo('/pages/cat/beangiven')" class="cat-bean-w"
            ><img src="@/static/user/zhuanzeng.jpg" />猫豆转赠</view
          >
          <!-- <view class="cat-bean-w"
            ><img src="@/static/user/chongzhi.jpg" />购买猫豆</view> -->
        </view>
      </view>
    </view>
    <view class="record-content">
      <view class="record-text">猫豆记录</view>
      <view class="record-list-content">
        <view
          class="record-list-item"
          v-for="(item, index) in recordList"
          :key="index"
        >
          <view class="flex1">
            <view class="record-title">{{ catBean[item.type] }}</view>
            <view class="record-date">{{ formatDate(item.createTime*1) }}</view>
          </view>
          <view class="record-price">{{item.type == 'into'?'+':'-'}}{{ item.amount }}</view>
        </view>
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
  out:'转出',
  recharge: '充值',
  exchange: '兑换',
  breach: '违约',
  order: '猫超订单',
  into: '转入',
  reserve: "预约",
  withdraw: "提现"
}
export default {
  data() {
    return {
      recordList: [],
      assetObj: {},
      params:{
        page: 0,
        size: 10
        },
      showTotal: false,
      catBean: catBean,
    };
  },
  onShow(){
    this.catFoodList();
    this.getAsset();
  },
  methods: {
    formatDate,
    /**获取资产* */
    getAsset() {
      ApiClinet.get(ApiConfig.APP_BASE_API.asset).then((res) => {
        if (res.data.code == '200') {
            this.assetObj = res.data.data;
        }
      })
    },
    catFoodList(){
      ApiClinet.get(ApiConfig.APP_BASE_API.catFoodList, this.params).then((res) => {
        if (res.data.code == '200') {
            this.recordList = this.recordList.concat(res.data.data.records || []);
            this.total = Math.ceil(res.data.total / this.params.size);
        }
      })
    },
    navTo(url) {
      uni.navigateTo({
        url,
      });
    },
  },
  onReachBottom() {
      if (this.params.page >= this.total) {
      this.showTotal=true//已经滑到底的提醒
      return false;
    }
    this.params.page ++;
    this.catFoodList()
  }
};
</script>

<style lang='scss'>
page {
  background-color: #f6f6f6;
  padding-bottom: 30upx;
}
.container {
  .cat-bean-top {
    height: 340upx;
    background-color: #ffe7f4;
    padding: 24upx 24upx 20upx 24upx;
    .cat-bean-top-bg {
      background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/29928e00bf954e16aa8b73226070848f_mergeImage.png);
      background-size: 100% 100%;
      border-radius: 12px;
      height: 228upx;
      padding: 50upx 40upx;
      color: #fff;
      font-size: 28upx;
      .cat-bean-top-num {
        font-size: 60upx;
        // margin-top: 30upx;
        width: 500upx;
        display: inline-block;
        // margin-right: 320upx;
      }
      .cat-bean-top-btn {
        padding: 10upx 20upx;
        background: #fff;
        color: #fe578b;
        border-radius: 26upx;
      }
    }
    .cat-bean-top-fot {
      display: flex;
      height: 90upx;
      align-items: center;
      .frozen{
        color: #333333;
        font-size: 28upx;
        margin-left:40upx;
        width: 400upx;
      }
      .cat-bean-w {
        width: 50%;
        text-align: center;
        color: rgba(255, 71, 140, 1);
        img {
          margin-right: 10upx;
        }
      }
    }
    .cat-bean-top-content {
      background-color: #fff;
      // border-top-left-radius: 26upx;
      border-radius: 26upx;
    }
  }
  .record-content {
    padding: 0 24upx;
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
</style>
