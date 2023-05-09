<template>
  <view class="container">
    <div class="pay-img" @click="previewImage">
      <image v-if="callImg" class="money-code" :src="callImg"></image>
      <image v-else class="money-code" src="@/static/errorImage.jpg"></image>
    </div>
    <div class="pay-item">
      <div class="pay-input">
        <input
          :value="form.amount"
		      type="number"
          placeholder="输入充值金额"
          data-key="amount"
          @input="inputChange"
        />
      </div>
      <div class="pay-tips"><span>*</span>充值金额为1的整数倍</div>
    </div>
    <view class="password-fot">
      <button class="confirm-btn" @click="savePay">提交申请</button>
    </view>
  </view>
</template>

<script>
import ApiClinet from "@/services/api-clinet";
import ApiConfig from "@/config/api.config";

export default {
  data() {
    return {
      form: {
        payType: "wx",
      },
      callImg: "",
    };
  },
  onShow() {
    /**获取个人信息* */
    this.getAppInfo();
  },
  methods: {
    onNavigationBarButtonTap() {
      uni.navigateTo({
        url: "/pages/cat/payRank",
      });
    },
    inputChange(e) {
      const key = e.currentTarget.dataset.key;
      this.form[key] = e.detail.value;
    },
    getAppInfo() {
      ApiClinet.get(ApiConfig.APP_BASE_API.appInfo).then((res) => {
        if (res.data.code == "200") {
          this.callImg = res.data.data.recharge_qr_code;
        }
      });
    },
    navBack() {
      uni.navigateBack();
    },
    previewImage() {
      let urls = [];
      urls.push(this.callImg)
      uni.previewImage({
        current: 0,
        urls: urls,
      });
    },
    savePay() {
      let reg = /^[0-9]*[1-9][0-9]*$/;
      if (!(reg.test(this.form.amount))) {
        this.$api.msg("请输入1的整倍数");
      }
      ApiClinet.post(ApiConfig.APP_BASE_API.recharge, this.form).then((res) => {
        if (res.data.code == "200") {
          this.$api.msg("充值申请成功！");
          this.navBack();
        } else {
          this.msg = res.data.msg;
          this.$api.msg(this.msg);
        }
      });
    },
  },
};
</script>

<style lang='scss'>
page {
  background-color: #ffffff;
  padding-bottom: 30upx;
}
.container {
  .pay-img {
    display: flex;
    height: 500upx;
    justify-content: center;
    align-items: center;
    .money-code {
      width: 344upx;
      height: 344upx;
      border-radius: 8upx;
    }
  }
  .pay-item {
    padding: 0 48upx;
    .pay-input {
      height: 70upx;
      border-bottom: 1upx solid #e9e9e9;
      input {
        font-size: 32upx;
        height: 100%;
      }
    }
    .pay-tips {
      font-size: 24upx;
      color: #333333;
      margin-top: 20upx;
      span {
        color: #f71616;
      }
    }
  }
  .confirm-btn {
    width: 630upx;
    height: 92upx;
    line-height: 92upx;
    border-radius: 50px;
    margin-top: 70upx;
    background-image: linear-gradient(
      90deg,
      rgba(255, 104, 166, 1) 0,
      rgba(255, 71, 140, 1) 100%
    );
    border-radius: 23px;
    color: #fff;
    font-size: $font-lg;
    font-weight: 700;
    &:after {
      border-radius: 100px;
    }
  }
}
</style>
