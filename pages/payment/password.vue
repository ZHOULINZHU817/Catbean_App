<template>
  <view class="container">
    <view class="wrapper">
      <view class="input-content">
        <view class="input-item pass-position">
          <input
            type="number"
            :value="form.phone"
            placeholder="请输入手机号码"
            maxlength="11"
            data-key="phone"
            disabled
            @input="inputChange"
          />
          <view class="phone-tips">*手机号码不可修改</view>
        </view>
        <view class="input-item phone-code">
          <input
            :value="form.code"
            placeholder="请输入验证码"
            placeholder-class="input-empty"
            maxlength="20"
            data-key="code"
            @input="inputChange"
          />
          <view class="code" v-if="codeTxt == '获取验证码'" @click="getPhoneCode">{{ codeTxt }}</view>
		  <view class="code"
			placeholder-style="-webkit-user-select:auto;font-size: 32rpx;font-weight: 400;color: #B3B5BA;line-height: 44rpx;"
			v-else>{{ codeTxt }}</view>
        </view>
        <view class="input-item pass-position">
          <input
            :value="form.payPwd"
            type="number"
            placeholder="请输入支付密码"
            placeholder-class="input-empty"
            maxlength="6"
            data-key="payPwd"
            @input="inputChange"
          />
        </view>
      </view>
      <view class="password-fot">
        <button class="confirm-btn" @click="savePassword" :disabled="logining">确认</button>
      </view>
    </view>
  </view>
</template>

<script>
import store from '@/store'
import ApiClinet from "@/services/api-clinet";
import ApiConfig from "@/config/api.config";
export default {
  data() {
    return {
      form:{
        payPwd:'',
        code:'',
        phone:''
      },
      codeTxt: "获取验证码",
      logining: false,
      userInfo: JSON.parse(uni.getStorageSync('userInfo'))
    };
  },
  onLoad() {
    this.form.phone = this.userInfo.phone;
  },
  methods: {

    inputChange(e) {
      const key = e.currentTarget.dataset.key;
      this.form[key] = e.detail.value;
    },
    navBack() {
      uni.navigateBack();
    },
    savePassword() {
      this.logining = true;
      ApiClinet.put(ApiConfig.APP_BASE_API.editPwdPay, this.form).then((res) => {
					if (res.data.code == '200') {
					   this.$api.msg('支付密码修改成功！')
             this.logining = false;
					}else{
             this.$api.msg(res.data.msg)
             this.logining = false;
          }
				}).catch(err=>{
          this.logining = false;
        })
    },
    /**
     * 获取手机验证码
     */
    getPhoneCode() {
      var rePhone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!this.form.phone) {
        this.$api.msg("请先输入手机号");
        return;
      }
      if (!rePhone.test(this.form.phone)) {
        this.$api.msg("请输入正确的手机号");
        return;
      }
      this.codeTxt = "验证码发送中...";
       ApiClinet.get(ApiConfig.APP_BASE_API.code, {phone: this.form.phone}, {
					loading: true
				}).then((res) => {
					if (res.data.code == '200') {
					    this.$api.msg("验证码发送成功");
              let time = 60;
              const set = setInterval(() => {
                this.codeTxt = time-- + "s重新获取";
                this.pass = false;
                if (time < 0) {
                  clearInterval(set);
                  this.pass = true;
                  this.codeTxt = "获取验证码";
                }
              }, 1000);
					}else{
              this.$api.msg("验证码发送失败");
              this.codeTxt = "获取验证码";
          }
				}).catch(()=>{
            this.$api.msg("验证码发送失败");
            this.codeTxt = "获取验证码";
        })
    },
  },
};
</script>

<style lang='scss'>
page {
  background: #fff;
}
.container {
//   padding-top: 115px;
  position: relative;
  width: 100vw;
  height: 90vh;
  overflow: hidden;
  background: #fff;
}
.wrapper {
  position: relative;
  z-index: 90;
  background: #fff;
  padding-bottom: 40upx;
}

.input-content {
  padding: 0 60upx;
}
.input-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
//   padding: 0 30upx;
//   background: $page-color-light;
  height: 126upx;
//   border-radius: 4px;
  border-bottom: 1upx solid #F6F6F6;
//   margin-bottom: 50upx;
  &:last-child {
    margin-bottom: 0;
  }
  .tit {
    height: 50upx;
    line-height: 56upx;
    font-size: $font-sm + 2upx;
    color: $font-color-base;
  }
  input {
    height: 60upx;
    font-size: 28upx;
    color: $font-color-dark;
    width: 100%;
  }
}
.password-fot{
  position: fixed;
  bottom: 20upx;
  width:100%;
  text-align: center;
}
.confirm-btn {
  width: 630upx;
  height: 76upx;
  line-height: 76upx;
  border-radius: 50px;
  margin-top: 70upx;
  background: #FF68A6;
  color: #fff;
  font-size: $font-lg;
  &:after {
    border-radius: 100px;
  }
}

/***新加样式** */
.pass-position{
	position: relative;
}
.pass-icon {
  position: absolute;
  right: 30upx;
  top: 50%;
}
.icon {
  width: 32rpx;
  height: 32rpx;
}
.phone-code {
  position: relative;
  .code {
    position: absolute;
    right: 0upx;
    top: 30%;
    color: #000;
    font-size: 28upx;
  }
}
.phone-tips{
    position: absolute;
    right: 0upx;
    top: 30%;
    color: #999999;
    font-size: 28upx;
}
</style>
