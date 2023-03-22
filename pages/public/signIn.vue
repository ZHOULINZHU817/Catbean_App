<template>
  <view class="container">
    <view class="left-bottom-sign"></view>
    <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
    <view class="right-top-sign"></view>
    <!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
    <view class="wrapper">
      <view class="left-top-sign">LOGIN</view>
      <view class="welcome"> 欢迎注册 </view>
      <view class="input-content">
        <view class="input-item">
          <input
            type="number"
            :value="inputUserPhone"
            placeholder="请输入手机号码"
            maxlength="11"
            data-key="inputUserPhone"
            @input="inputChange"
          />
        </view>
        <view class="input-item phone-code">
          <input
            type="mobile"
            value=""
            placeholder="请输入验证码"
            placeholder-class="input-empty"
            maxlength="20"
            @input="inputChange"
            @confirm="toLogin"
          />
          <view class="code" v-if="codeTxt == '获取验证码'" @click="getPhoneCode">{{ codeTxt }}</view>
		  <view class="code"
			placeholder-style="-webkit-user-select:auto;font-size: 32rpx;font-weight: 400;color: #B3B5BA;line-height: 44rpx;"
			v-else>{{ codeTxt }}</view>
        </view>
        <view class="input-item pass-position">
          <input
            type="mobile"
            value=""
            placeholder="数字字⺟组合最少6位数"
            placeholder-class="input-empty"
            maxlength="20"
            :password="isShowPassword"
            data-key="password"
            @input="inputChange"
            @confirm="toLogin"
          />
          <i class="pass-icon" @click="changeIcon">
            <image class="icon" :src="iconSrc" mode=""></image>
          </i>
        </view>
		<view class="input-item">
          <input
            type="number"
            :value="invitationCode"
            placeholder="请输入邀请码（选填）"
            data-key="invitationCode"
            @input="inputChange"
          />
        </view>
      </view>
      <button class="confirm-btn" @click="toLogin" :disabled="logining">
        注册
      </button>
    </view>
  </view>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      inputUserPhone: "",
      password: "",
	  invitationCode: "", //邀请码
      logining: false,
      isShowPassword: true,
      iconSrc: "../../static/tab/close.png", //图标眼睛
      codeTxt: "获取验证码",
    };
  },
  onLoad() {},
  methods: {
    ...mapMutations(["login"]),
    inputChange(e) {
      const key = e.currentTarget.dataset.key;
      this[key] = e.detail.value;
    },
    navBack() {
      uni.navigateBack();
    },
    toRegist() {
      this.$api.msg("去注册");
    },
    async toLogin() {
      this.logining = true;
      const { mobile, password } = this;
      /* 数据验证模块
				if(!this.$api.match({
					mobile,
					password
				})){
					this.logining = false;
					return;
				}
				*/
      const sendData = {
        mobile,
        password,
      };
      const result = await this.$api.json("userInfo");
      if (result.status === 1) {
        this.login(result.data);
        uni.navigateBack();
      } else {
        this.$api.msg(result.msg);
        this.logining = false;
      }
    },
    changeIcon() {
      if (this.password) {
        this.isShowPassword = !this.isShowPassword;
        this.isShowPassword
          ? (this.iconSrc = "../../static/tab/close.png")
          : (this.iconSrc = "../../static/tab/open.png");
      } else {
        return;
      }
    },
    /**
     * 获取手机验证码
     */
    getPhoneCode() {
      var rePhone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!this.inputUserPhone) {
        this.$api.msg("请先输入手机号");
        return;
      }
      if (!rePhone.test(this.inputUserPhone)) {
        this.$api.msg("请输入正确的手机号");
        return;
      }
      this.codeTxt = "验证码发送中...";
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
    //   http
    //     .post(changePhone.sendPhone, {
    //       userPhone: this.userPhone || this.inputUserPhone,
    //       code: this.imgVerCode,
    //     })
    //     .then((res) => {
    //       if (res && res.success) {
    //         this.$api.msg("验证码发送成功");
    //         let time = 60;
    //         const set = setInterval(() => {
    //           this.codeTxt = time-- + "s重新获取";
    //           this.pass = false;
    //           if (time < 0) {
    //             clearInterval(set);
    //             this.pass = true;
    //             this.codeTxt = "获取验证码";
    //           }
    //         }, 1000);
    //       } else {
    //         this.$api.msg("验证码发送失败");
    //         this.codeTxt = "获取验证码";
    //       }
    //     });
    },
  },
};
</script>

<style lang='scss'>
page {
  background: #fff;
}
.container {
  padding-top: 115px;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #fff;
}
.wrapper {
  position: relative;
  z-index: 90;
  background: #fff;
  padding-bottom: 40upx;
}
.back-btn {
  position: absolute;
  left: 40upx;
  z-index: 9999;
  padding-top: var(--status-bar-height);
  top: 40upx;
  font-size: 40upx;
  color: $font-color-dark;
}
.left-top-sign {
  font-size: 120upx;
  color: $page-color-base;
  position: relative;
  left: -16upx;
}
.right-top-sign {
  position: absolute;
  top: 80upx;
  right: -30upx;
  z-index: 95;
  &:before,
  &:after {
    display: block;
    content: "";
    width: 400upx;
    height: 80upx;
    background: #b4f3e2;
  }
  &:before {
    transform: rotate(50deg);
    border-radius: 0 50px 0 0;
  }
  &:after {
    position: absolute;
    right: -198upx;
    top: 0;
    transform: rotate(-50deg);
    border-radius: 50px 0 0 0;
    /* background: pink; */
  }
}
.left-bottom-sign {
  position: absolute;
  left: -270upx;
  bottom: -320upx;
  border: 100upx solid #d0d1fd;
  border-radius: 50%;
  padding: 180upx;
}
.welcome {
  position: relative;
  left: 50upx;
  top: -90upx;
  font-size: 46upx;
  color: #555;
  text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}
.input-content {
  padding: 0 60upx;
}
.input-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 30upx;
//   background: $page-color-light;
  height: 120upx;
//   border-radius: 4px;
  border-bottom: 1upx solid #8b8989;
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
    font-size: $font-base + 2upx;
    color: $font-color-dark;
    width: 100%;
  }
}

.confirm-btn {
  width: 630upx;
  height: 76upx;
  line-height: 76upx;
  border-radius: 50px;
  margin-top: 70upx;
  background: $uni-color-primary;
  color: #fff;
  font-size: $font-lg;
  &:after {
    border-radius: 100px;
  }
}
.forget-section {
  font-size: $font-sm + 2upx;
  color: $font-color-spec;
  text-align: center;
  margin-top: 40upx;
}
.register-section {
  position: absolute;
  left: 0;
  bottom: 50upx;
  width: 100%;
  font-size: $font-sm + 2upx;
  color: $font-color-base;
  text-align: center;
  text {
    color: $font-color-spec;
    margin-left: 10upx;
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
    right: 30upx;
    top: 30%;
    color: #000;
  }
}
</style>
