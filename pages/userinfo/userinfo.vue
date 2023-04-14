<template>
  <view class="container">
    <view class="wrapper">
      <view class="input-content">
        <view class="pay-pic">
          <view class="pay-pic-item">
            <view>图像:</view>
            <uploadFile class="context" v-model="uploadAttachment" mediaType="all"></uploadFile>
          </view>
        </view>
        <view class="input-item">
          <text class="tit">昵称:</text>
          <input
            :value="form.nickName"
            placeholder="请输入昵称"
            maxlength="11"
            data-key="nickName"
            @input="inputChange"
          />
        </view>
        <view class="input-item">
          <text class="tit">QQ号:</text>
          <input
            :value="form.qq"
            placeholder="请输入QQ号"
            data-key="qq"
            @input="inputChange"
          />
        </view>
        <view class="input-item">
          <text class="tit">微信号:</text>
          <input
            :value="form.wechatNo"
            placeholder="请输入微信号"
            maxlength="11"
            data-key="wechatNo"
            @input="inputChange"
          />
        </view>
        <view class="input-item">
          <text class="tit">手机号:</text>
          <input
            type="number"
            :value="form.phone"
            placeholder="请输入手机号"
            maxlength="11"
            data-key="phone"
            @input="inputChange"
          />
        </view>
      </view>
    </view>
    <view class="password-fot">
      <button class="confirm-btn" @click="savePassword" :disabled="logining">确认提交</button>
    </view>
  </view>
</template>

<script>
import ApiClinet from "@/services/api-clinet";
import ApiConfig from "@/config/api.config";
export default {
  data() {
    return {
      form:{
        avatar:'',
        nickName:'',
        phone:'',
        qq:'',
        wechatNo:''
      },
      logining: false,
      uploadAttachment:[],
    };
  },
  onLoad() {
    /**获取个人信息* */
		this.memberInfo();
  },
  methods: {
    memberInfo() {
				ApiClinet.get(ApiConfig.APP_BASE_API.memberDetail).then((res) => {
					if (res.data.code == '200') {
            const {phone, qq, nickName, avatar, wechatNo} = res.data.data;
            this.form.phone = phone;
            this.form.qq = qq;
            this.form.nickName = nickName;
            this.form.avatar = avatar;
            this.form.wechatNo = wechatNo;
					}
				})
		},
    inputChange(e) {
      const key = e.currentTarget.dataset.key;
      this.form[key] = e.detail.value;
    },
    navBack() {
      uni.navigateBack();
    },
    savePassword() {
      this.form.avatar = this.uploadAttachment[0] && this.uploadAttachment[0].split('|')[1];
      this.logining = true;
      ApiClinet.post(ApiConfig.APP_BASE_API.settingInfo, this.form).then((res) => {
        if (res.data.code == '200') {
            this.$api.msg('设置成功！')
            this.logining = false;
            this.navBack();
        }else{
            this.$api.msg(res.data.msg)
            this.logining = false;
        }
      }).catch(err=>{
        this.logining = false;
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
  bottom: 50upx;
  width:100%;
  text-align: center;
  z-index:100;
  background: #fff;
  
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
