<template>
  <view class="container">
    <view class="wrapper">
      <view class="input-content">
        <view class="input-item">
          <text class="tit">姓名:</text>
          <input
            :value="form.name"
            placeholder="请输入姓名"
            data-key="name"
            @input="inputChange"
          />
        </view>
        <!-- <view class="input-item">
          <text class="tit">身份证类型:</text>
          <picker @change="bindPickerChange" :range="array">
                <label style="font-size:28upx;color:#999999;"></label>
                <label class="">{{array[index]}}</label>
          </picker>
        </view> -->
        <view class="input-item">
          <text class="tit">身份证号:</text>
          <input
            :value="form.idNo"
            placeholder="请输入身份证号"
            data-key="idNo"
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
      form: {
        idNo:'',
        name:''
      },
      logining: false,
    //   array: ['--请选择--','身份证', '港澳台通行证'],
    //   index: 0
    };
  },
  onLoad() {},
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
      ApiClinet.put(ApiConfig.APP_BASE_API.realAuth, this.form).then((res) => {
					if (res.data.code == '200') {
					   this.$api.msg('认证成功！')
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
    // bindPickerChange(e){
    //     this.index = e.target.value
	//     this.jg=this.array[this.index]	
    // }
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
