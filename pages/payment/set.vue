<template>
  <view class="container">
    <view class="wrapper">
      <view class="input-content">
        <view class="input-item">
          <text class="tit">姓名:</text>
          <input
            :value="form.name"
            placeholder="请输入姓名"
            maxlength="11"
            data-key="name"
            @input="inputChange"
          />
        </view>
        <view class="input-item">
          <text class="tit">身份证号码:</text>
          <input
            :value="form.idNo"
            placeholder="请输入身份证号码"
            data-key="idNo"
            @input="inputChange"
          />
        </view>
        <view class="input-item">
          <text class="tit">收款银行:</text>
          <input
            :value="form.bankName"
            placeholder="请输入收款银行"
            data-key="bankName"
            @input="inputChange"
          />
        </view>
        <view class="input-item">
          <text class="tit">银行卡号:</text>
          <input
            :value="form.bankNo"
            placeholder="请输入银行卡号"
            data-key="bankNo"
            @input="inputChange"
          />
        </view>
         <!-- <view class="input-item">
          <text class="tit">收款支付宝账号:</text>
          <input
            :value="userName"
            placeholder="请输入收款支付宝账号"
            maxlength="11"
            data-key="userName"
            @input="inputChange"
          />
        </view> -->
        <view class="input-item">
          <text class="tit">手机号码:</text>
          <input
            :value="form.phone"
            placeholder="请输入手机号码"
            maxlength="11"
            data-key="phone"
            @input="inputChange"
          />
        </view>
        <view class="pay-pic">
          <view class="pay-pic-item">
            <view>微信收款码</view>
            <uploadFile class="context" v-model="wechatUrlList" mediaType="all"></uploadFile>
          </view>
          <view class="pay-pic-item">
            <view>支付宝收款码</view>
            <uploadFile class="context" v-model="alipayUrlList" mediaType="all"></uploadFile>
          </view>
        </view>
        <view class="input-item phone-code">
          <text class="tit">短信验证码:</text>
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
      </view>
    </view>
    <view class="password-fot">
      <button class="confirm-btn" @click="savePassword" :disabled="logining">确认提交</button>
      <view class="password-fot-tips"><span>*</span>请确认绑定的收款账户信息及正确的真实姓</view>
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
        alipayUrl:"",//收款支付宝码
        bankName:"",//银行名称--必填
        bankNo:"",//银行卡号--必填
        code:"",//验证码--必填
        idNo:"",//身份证号--必填
        name:"",//真实姓名--必填
        wechatUrl:"",//收款微信码
        phone:'',//--必填
      },
      codeTxt: "获取验证码",
      logining: false,
      wechatUrlList:[],
      alipayUrlList: [],
      userInfo: JSON.parse(uni.getStorageSync('userInfo'))
    };
  },
  onLoad() {
    if(Object.keys(this.userInfo).length>0){
      this.form.bankName = this.userInfo.bankName;
      this.form.bankNo = this.userInfo.bankNo;
      this.form.idNo = this.userInfo.idNo;
      this.form.name = this.userInfo.name;
      this.form.phone = this.userInfo.phone;
      this.alipayUrlList = this.userInfo.alipayUrl && `['文件｜${this.userInfo.alipayUrl}']`
      this.wechatUrlList = this.userInfo.wechatUrl && `['文件｜${this.userInfo.wechatUrl}']`
    }
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
      this.form.alipayUrl = this.alipayUrlList[0] && this.alipayUrlList[0].split('|')[1];
      this.form.wechatUrl = this.wechatUrlList[0] && this.wechatUrlList[0].split('|')[1];
      this.logining = true;
      ApiClinet.post(ApiConfig.APP_BASE_API.receiveAccount, this.form).then((res) => {
        if (res.data.code == '200') {
            this.$api.msg('设置成功！')
            this.logining = false;
            // this.navBack();
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
  background: #fff;
}
.wrapper {
  position: relative;
  z-index: 90;
  background: #fff;
  padding-bottom: 220upx;
}

.input-content {
  padding: 0 60upx 60upx 60upx;
}
.input-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
//   padding: 0 30upx;
//   background: $page-color-light;
  height: 146upx;
//   border-radius: 4px;
  border-bottom: 1upx solid #F6F6F6;
//   margin-bottom: 50upx;
  &:last-child {
    margin-bottom: 0;
  }
  .tit {
    height: 50upx;
    line-height: 56upx;
    font-size: 30upx;
    color: #000000;
    font-weight: 400;
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
  bottom: 0upx;
  width:100%;
  text-align: center;
  z-index:100;
  background: #fff;
  .password-fot-tips{
    font-size:24upx;
    color:#999999;
    padding:30upx 0;
    span{
      color:#F71616;
    }
  }
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
    top: 53%;
    color: #000;
    font-size:28upx;
  }
}
.pay-pic{
    display: flex;
    padding: 30upx 0;
    height:300upx;
  .pay-pic-item{
    flex: 1;
    height:200upx;
    .context{
      margin-top:20upx;
    }
  }
}
</style>
