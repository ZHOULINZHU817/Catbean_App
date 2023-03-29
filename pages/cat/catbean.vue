<template>
  <view class="container">
    <view class="cat-bean-top">
      <view class="cat-bean-top-content">
        <view class="cat-bean-top-bg">
          <view class="margin-b-20">猫豆数量</view>
          <view>
            <text class="cat-bean-top-num">899000</text>
            <text @click="navTo('/pages/cat/withdraw')" class="cat-bean-top-btn"
              >提现</text
            >
          </view>
        </view>
        <view class="cat-bean-top-fot">
          <view @click="navTo('/pages/cat/beangiven')" class="cat-bean-w"
            ><img src="@/static/user/zhuanzeng.jpg" />猫豆转赠</view
          >
          <view class="cat-bean-w"
            ><img src="@/static/user/chongzhi.jpg" />购买猫豆</view
          >
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
            <view class="record-title">{{ item.title }}</view>
            <view class="record-date">{{ item.date }}</view>
          </view>
          <view class="record-price">{{ item.price }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      recordList: [
        {
          title: "平台购入",
          date: "2023-03-21 16:35:26",
          price: "+999",
        },
        {
          title: "预约消耗",
          date: "2023-03-21 16:35:26",
          price: "-100",
        },
        {
          title: "转赠给+19909876547",
          date: "2023-03-21 16:35:26",
          price: "-88",
        },
        {
          title: "猫超订单",
          date: "2023-03-21 16:35:26",
          price: "-10",
        },
        {
          title: "提现",
          date: "2023-03-21 16:35:26",
          price: "-99",
        },
      ],
    };
  },
  methods: {
    //
    navTo(url) {
      uni.navigateTo({
        url,
      });
    },
  },
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
        margin-top: 30upx;
        margin-right: 320upx;
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
</style>
