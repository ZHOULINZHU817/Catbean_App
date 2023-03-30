<template>
  <view class="stroke-cat">
    <view class="stroke-cat-time">
      <view class="cat-time-item">场次：12:00</view>
      <view class="cat-time-item"
        >本场次预计倒计时：<count-down
          :endTime="endTime"
          :endText="endText"
          @changeText="changeText"
      /></view>
    </view>
    <view class="stroke-fot">
      <view class="stroke-btn" @click="appointment">{{ btnText }}</view>
    </view>
    <!-----预约弹窗----->
    <uni-popup :mask-click="false" ref="rankModal" type="center">
      <view class="model-wraper">
        <view class="model-wraper-bg">
          <view class="modal-title">预约</view>
          <view class="modal-content">
            <view class="stroke-select">
                <view class="stroke-select-item" :class="active == index?'active':''" @click="selectTime(item, index)" v-for="(item, index) in list" :key="index">{{item}}</view>
            </view>
            <view class="modal-content-text1">说明：</view>
            <view class="modal-content-text"
              >1.根据⾃⾏选择抢购次数</view
            >
            <view class="modal-content-text"
              >2.点击确认提交预约数量</view
            >
          </view>
          <view class="confirm-btn-content">
            <view class="confirm-btn1" @click="cancelRank">取消</view>
            <view class="confirm-btn" @click="saveAppointment">确定</view>
          </view>
        </view>
        <view class="rank-btn" @click="cancelRank">
          <img src="@/static/user/close-bg.jpg" />
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
export default {
  components: {
    uniPopup,
  },
  data() {
    return {
      endTime: new Date("2023/04/23 17:57:00").getTime() / 1000 + " ",
      //  console.log(endTime)=>得到毫秒  1658030420 可在方法里面放入后台数据,new Date('放后台数据').getTime() / 1000 +  ' ',但要记得调用方法
      endText: "活动已结束",
      btnText: "预约",
      list: [1, 5, 10, 20, 30, 50, 100],
      active: null,
    };
  },
  onLoad() {},
  methods: {
    onNavigationBarButtonTap() {
      this.$api.msg("点击");
      uni.navigateTo({
        url: "/pages/panicBuy/panicBuyOrder?state=0",
      });
    },
    changeText() {
      this.btnText = "立即抢购";
    },
    appointment() {
      console.log("this.btnText", this.btnText);
      switch (this.btnText) {
        case "预约":
          this.getAppointment();
          break;
        case "立即抢购":
          this.panicBuy();
          break;
      }
    },
    getAppointment() {
      this.$refs.rankModal.open();
    },
    panicBuy() {},
    /***选中预约时间* */
    selectTime(val, idx) {
      this.active = idx;
    },
    /***关闭弹窗* */
    cancelRank() {
      this.$refs.rankModal.close();
    },
    /***确认预约* */
    saveAppointment() {
        uni.navigateTo({
            url: "/pages/strokeCat/rule",
        });
    },
  },
};
</script>

<style lang='scss'>
.stroke-cat {
  .stroke-cat-time {
    margin: 80upx 30upx;
    text-align: center;
    background: #eee;
    .cat-time-item {
      height: 120upx;
      line-height: 120upx;
    }
  }
  .stroke-fot {
    .stroke-btn {
      width: 220upx;
      height: 220upx;
      border-radius: 220upx;
      background: #eee;
      text-align: center;
      line-height: 220upx;
      margin: 300upx auto;
    }
  }
  /****弹窗样式***** */
  .model-wraper {
    width: 600rpx;
    // background-color: #fff;
    position: absolute;
    z-index: 1000;
    top: 50%;
    left: 50%;
    margin-top: -360rpx;
    margin-left: -300rpx;
  }
  .model-wraper-bg {
    background: url(@/static/petcat/petcat_modal.jpg) 100% no-repeat;
    background-size: 100% 100%;
    height: 646upx;
    width: 596upx;
    padding: 32upx 44upx 0 44upx;
    .modal-content {
      width: 100%;
      height: 318upx;
      background-color: #ffffff;
      border-radius: 16upx;
      padding: 24upx 30upx;
      margin-top:20upx;
      .stroke-select{
        display: flex;
        flex-flow:row wrap;
        .stroke-select-item{
            width: 20%;
            height:60upx;
            line-height: 60upx;
            border:1upx solid #CFCFCF;
            border-radius: 10upx;
            text-align: center;
            margin:10upx;
        }
         .active {
            background: #FFF1F6;
            border:1upx solid #FF478C;
            color:#FF478C;
        }
      }
      .modal-content-text1{
        font-size: 24upx;
        color: #fe5f90;
        line-height: 40upx;
      }
      .modal-content-text {
        font-size: 24upx;
        color: #333333;
        line-height: 40upx;
        position: relative;
        padding-left: 18upx;
        &::before {
          content: "";
          display: block;
          width: 10upx;
          height: 10upx;
          background: #fe5f90;
          border-radius: 50%;
          position: absolute;
          top: 16upx;
          left: 0;
        }
      }
    }
    .confirm-btn-content {
      display: flex;
      justify-content: center;
      padding-top: 60upx;
      .confirm-btn1{
        width: 236upx;
        border: 1upx solid #FF478C;
        border-radius: 44upx;
        height:88upx;
        line-height: 88upx;
        margin-right:20upx;
        text-align: center;
        color:#FF478C;
      }
      .confirm-btn {
        background-image: linear-gradient(
          90deg,
          rgba(255, 104, 166, 1) 0,
          rgba(255, 71, 140, 1) 100%
        );
        border-radius: 44upx;
        height:88upx;
        line-height: 88upx;
        width: 236upx;
        text-align: center;
        color: #ffffff;
        font-weight: 700;
      }
    }
  }

  .modal-title {
    width: 230upx;
    height:78upx;
    text-align: center;
    font-size: 38upx;
    color: #ffffff;
    font-weight: 700;
    line-height: 78upx;
    background: url(@/static/petcat/petcat_modal_t.jpg) 100% no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
  }

  .rank-btn {
    padding-top: 80upx;
    display: flex;
    justify-content: center;
    img {
      width: 56upx;
      height: 56upx;
    }
  }
}
</style>
