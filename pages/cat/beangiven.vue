<template>
  <view class="container">
    <view class="wrapper">
      <view class="input-content">
        <view class="input-item">
          <text class="tit">转赠给</text>
          <input
            :value="form.phone"
            placeholder="输入手机号"
            data-key="phone"
            @input="inputChange"
          />
          <!-- <view class="searchBtn">查询</view> -->
        </view>
        <view class="input-item">
          <text class="tit">转赠金额</text>
          <input
            :value="form.amount"
            :placeholder="`可转赠金额为${assetObj.catFood}`"
            data-key="amount"
            @input="inputChange"
          />
          <view class="all" @click="allGiven">全部</view>
          <view class="tips">
            <view>1、只允许上下级转赠； </view>
            <view>2、转赠的金额最低为1；</view>
            <view>3、转赠的金额只能是1的整数倍。</view>
          </view>
        </view>
      </view>
    </view>
    <view class="password-fot">
      <button class="confirm-btn" @click="savePassword">确认转赠</button>
    </view>
    <!------密码弹窗------->
    <jp-pwd ref="jpPwd" :contents="''" :msg="msg" @completed="completed" @forget="forget" ></jp-pwd>
  </view>
</template>

<script>
import ApiClinet from "@/services/api-clinet";
import ApiConfig from "@/config/api.config";
export default {
  data() {
    return {
      form: {
        amount:'',
      },
      assetObj: {},
      msg:""
    };
  },
  onLoad() {
    this.getAsset();
  },
  methods: {

    inputChange(e) {
      const key = e.currentTarget.dataset.key;
      this.form[key] = e.detail.value;
    },
    navBack() {
      uni.navigateBack();
    },
    /**获取资产* */
    getAsset() {
      ApiClinet.get(ApiConfig.APP_BASE_API.asset).then((res) => {
        if (res.data.code == '200') {
            this.assetObj = res.data.data;
        }
      })
    },
    allGiven(){
      this.form.amount = this.assetObj.catFood;
    },
    savePassword() {
      if(!this.form.phone){
        return this.$api.msg('请输入手机号')
      }
      if(!this.form.amount){
        return this.$api.msg('请输入提现金额')
      }
      this.msg = "";
      this.$refs.jpPwd.toOpen()
    },
    saveData(){
      ApiClinet.put(ApiConfig.APP_BASE_API.assetTransfer, this.form).then((res) => {
        if (res.data.code == '200') {
            this.$refs.jpPwd.toCancel()
            this.$api.msg('转赠成功！')
            this.navBack()
        }else{
          this.msg = res.data.msg;
          this.$refs.jpPwd.backs()
        }
      })
    },
    /***支付弹窗** */
    completed(e) {
      this.form.payPwd = e;
      this.saveData();
    },
    forget() {
      uni.navigateTo({
        url: "/pages/payment/password",
      });
    }
  },
};
</script>

<style lang='scss'>
page {
  background-color: #f6f6f6;
}
.container {
//   padding-top: 115px;
  position: relative;
  width: 100vw;
  height: 90vh;
}
.wrapper {
  position: relative;
  z-index: 90;
  padding-bottom: 220upx;
}

.input-content {
  padding: 24upx 24upx 24upx 24upx;
}
.input-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #fff;
  border-radius: 16upx;
  padding:24upx;
  position: relative;
  margin-bottom: 20upx;
  .tit {
    font-size: 32upx;
    color: #333333;
    font-weight: 900;
    margin-bottom: 34upx;
  }
  input {
    height: 60upx;
    font-size: 28upx;
    color: $font-color-dark;
    width: 100%;
  }
  .searchBtn{
    position: absolute;
    right:30upx;
    bottom: 30upx;
    background-image: linear-gradient(90deg,rgba(255, 104, 166, 1) 0,rgba(255, 71, 140, 1) 100%);
    border-radius: 14px;
    padding: 8upx 42upx 8upx 42upx;
    color: #fff;
    font-size:24upx;
    font-weight: 700;
  }
  .all{
    position: absolute;
    right:30upx;
    top: 112upx;
    color: #FF478C;
    font-size:28upx;
    font-weight: 700;
  }
  .tips{
    margin-top:20upx;
    border-top:1upx solid #F6F6F6;
    width:100%;
    padding-top:20upx;
    font-size:24upx;
    color:#666666;
  }
}
.password-fot{
  position: fixed;
  bottom: 50upx;
  width:100%;
  text-align: center;
  z-index:100;
}
.confirm-btn {
  width: 630upx;
  height: 92upx;
  line-height: 92upx;
  border-radius: 50px;
  margin-top: 70upx;
  background-image: linear-gradient(90deg,rgba(255, 104, 166, 1) 0,rgba(255, 71, 140, 1) 100%);
  border-radius: 23px;
  color: #fff;
  font-size: $font-lg;
  font-weight: 700;
  &:after {
    border-radius: 100px;
  }
}


</style>
