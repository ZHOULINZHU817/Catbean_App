<template>
  <view class="container">
    <!-- <view class="left-bottom-sign"></view>
    <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
    <view class="right-top-sign"></view> -->
    <!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
    <view class="wrapper">
      <!-- <view class="left-top-sign">LOGIN</view>
      <view class="welcome"> 欢迎注册 </view> -->
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
            :value="password"
            placeholder="请输入密码（至少6位数的数字和字母）"
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
		<view class="input-item pass-position">
          <input
            :value="passwordNew"
            placeholder="请确认密码（至少6位数的数字和字母）"
            placeholder-class="input-empty"
            maxlength="20"
            :password="isShowPasswordNew"
            data-key="passwordNew"
            @input="inputChange"
            @confirm="toLogin"
          />
          <i class="pass-icon" @click="changeIconNew">
            <image class="icon" :src="iconSrcNew" mode=""></image>
          </i>
        </view>
      </view>
      <button class="confirm-btn" @click="toLogin" :disabled="logining">
        确认
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
      passwordNew: "",
	    invitationCode: "", //邀请码
      logining: false,
      isShowPassword: true,
      isShowPasswordNew: true,
      iconSrc: "../../static/tab/close.png", //图标眼睛
      codeTxt: "获取验证码",
      iconSrcNew: "../../static/tab/close.png", //图标眼睛
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
    changeIconNew() {
        if (this.passwordNew) {
        this.isShowPasswordNew = !this.isShowPasswordNew;
        this.isShowPasswordNew
          ? (this.iconSrcNew = "../../static/tab/close.png")
          : (this.iconSrcNew = "../../static/tab/open.png");
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
  padding-top: 100upx;
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
  // padding: 0 30upx;
//   background: $page-color-light;
  height: 120upx;
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
  margin-top: 80upx;
  background-image: linear-gradient(
    90deg,
    rgba(255, 104, 166, 1) 0,
    rgba(255, 71, 140, 1) 100%
  );
  color: #fff;
  font-size:28upx;
  font-weight: 700;
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
  right: 0;
  top: 50%;
  transform: translate(0,-50%);
}
.icon {
  width: 32rpx;
  height: 32rpx;
}
.phone-code {
  position: relative;
  .code {
    position: absolute;
    right: 0;
    top: 30%;
    color: #666666;
  }
}
/deep/.uni-input-placeholder{
  color: #B8B8B8;
}
</style>
