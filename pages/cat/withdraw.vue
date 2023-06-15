<template>
  <view class="container">
    <view class="wrapper">
      <view class="input-content">
        <view class="input-item">
          <text class="tit">提现到</text>
          <list-cell
            class="withdraw-cell"
            :title="title"
            border="1"
            @eventClick="selectWithDraw"
          ></list-cell>
        </view>
        <view class="input-item">
          <text class="tit">提现金额</text>
          <input
            :value="form.amount"
            :placeholder="`可提现金额为${assetObj.catFood}`"
            maxlength="11"
            data-key="amount"
            @input="inputChange"
          />
          <view class="all" @click="allWithdraw">全部</view>
          <view class="tips">
            <view>1、每天最多提现1次；</view>
            <view>2、最低提现金额不能少于10；</view>
            <view>3、提现手续费2元1笔+1.5%；</view>
            <view>4、提现24小时内到账，审核时间为9:00～21:00。</view>
          </view>
        </view>
      </view>
    </view>
    <view class="password-fot">
      <button class="confirm-btn" @click="savePassword">
        确认提现
      </button>
    </view>
    <!---提现方式弹窗---->
    <uniModal ref="withdrawModal" :contentHeight="400" class="withdrawModal">
      <view slot="modalInfo">
        <view class="withdraw-content">
          <view class="draw-m-title"
            >选择提现方式<image @click="closeModal" src="@/static/user/close.png"
          ></image></view>
          <view
            class="draw-m-item b-b"
            v-for="(item, index) in withdrawList"
            :key="index"
            @click="withDrawManner(item, index)"
          >
            <image style="width: 30upx;height:30upx;" :src="item.src" ></image>
            <view class="draw-m-item-text flex1">{{ item.name }}</view>
            <image style="width: 30upx;height:30upx;" v-if="activeIndex == index" src="@/static/user/duihao.jpg" ></image>
          </view>
        </view>
      </view>
    </uniModal>
    <!------密码弹窗------->
    <jp-pwd ref="jpPwd" :contents="''" :msg="msg" @completed="completed" @forget="forget" ></jp-pwd>
  </view>
</template>

<script>
import listCell from "@/components/mix-list-cell";
import uniModal from "@/components/uni-modal/uni-modal";
import ApiClinet from "@/services/api-clinet";
import ApiConfig from "@/config/api.config";

export default {
  components: {
    listCell,
    uniModal,
  },
  data() {
    return {
      title: "请选择提现方式",
      withdrawList: [
        { name: "支付宝", value: "ali", src: "../../static/user/zhifubao.jpg" },
        { name: "微信", value: "wx", src: "../../static/user/weixin.jpg" },
        { name: "银行卡", value: "bank", src: "../../static/user/bank.jpg" },
      ],
      activeIndex: null,
      form: {
        amount:'',
      },
      assetObj: {},
      msg:"",
      userInfo: {}
    };
  },
  onLoad() {
    this.getAsset();
     /**获取个人信息* */
		this.memberInfo();
  },
  methods: {
    onNavigationBarButtonTap() {
      uni.navigateTo({
        url: "/pages/cat/withDrawManner?state=0",
      });
    },
    memberInfo() {
				ApiClinet.get(ApiConfig.APP_BASE_API.memberDetail).then((res) => {
					if (res.data.code == '200') {
            this.userInfo = res.data.data;
					}
				})
		},
    /**获取资产* */
    getAsset() {
      ApiClinet.get(ApiConfig.APP_BASE_API.asset).then((res) => {
        if (res.data.code == '200') {
            this.assetObj = res.data.data;
        }
      })
    },
    //全部
    allWithdraw(){
      this.form.amount = this.assetObj.catFood;
    },
    inputChange(e) {
      const key = e.currentTarget.dataset.key;
      this.form[key] = e.detail.value;
    },
    navBack() {
      uni.navigateBack();
    },
    selectWithDraw() {
      this.$refs.withdrawModal.toggleMask();
    },
    closeModal() {
      this.$refs.withdrawModal.toggleMask();
    },
    withDrawManner(row, idx) {
      this.activeIndex = idx;
      this.closeModal();
      this.title = row.name;
      this.form.payType = row.value;
    },
    savePassword() {
      if(!this.form.payType){
        return this.$api.msg('请选择支付方式')
      }
      if(!this.form.amount){
        return this.$api.msg('请输入提现金额')
      }
      if(!this.userInfo.wechatUrl && this.form.payType == 'wx'){
        return this.$api.msg('请设置收款账号微信收款码')
      }
      if(!this.userInfo.alipayUrl && this.form.payType == 'ali'){
        return this.$api.msg('请设置收款账号支付宝收款码')
      }
      if(!(this.userInfo.cardNo && this.userInfo.bank) && this.form.payType == 'bank'){
        return this.$api.msg('请设置收款账号收款银行跟银行卡号')
      }
      this.msg = "";
      this.$refs.jpPwd.toOpen()
    },
    saveData(){
      ApiClinet.post(ApiConfig.APP_BASE_API.withdraw, this.form).then((res) => {
        if (res.data.code == '200') {
            this.$refs.jpPwd.toCancel()
            this.$api.msg('提现成功！')
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
      // if (e == '123456') {
      //   this.$refs.jpPwd.toCancel()
      // } else {
      //   this.pwd.msg = '密码错误'
      //   this.$refs.jpPwd.backs()
      // }
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
  padding: 24upx;
  position: relative;
  margin-bottom: 20upx;
  .tit {
    font-size: 32upx;
    color: #333333;
    font-weight: 900;
    margin-bottom: 34upx;
  }
  .withdraw-cell {
    width: 100%;
  }
  input {
    height: 60upx;
    font-size: 28upx;
    color: $font-color-dark;
    width: 100%;
  }
  .searchBtn {
    position: absolute;
    right: 30upx;
    bottom: 30upx;
    background-image: linear-gradient(
      90deg,
      rgba(255, 104, 166, 1) 0,
      rgba(255, 71, 140, 1) 100%
    );
    border-radius: 14px;
    padding: 8upx 42upx 8upx 42upx;
    color: #fff;
    font-size: 24upx;
    font-weight: 700;
  }
  .all {
    position: absolute;
    right: 30upx;
    top: 112upx;
    color: #ff478c;
    font-size: 28upx;
    font-weight: 700;
  }
  .tips {
    margin-top: 20upx;
    border-top: 1upx solid #f6f6f6;
    width: 100%;
    padding-top: 20upx;
    font-size: 24upx;
    color: #666666;
  }
}
.password-fot {
  position: fixed;
  bottom: 50upx;
  width: 100%;
  text-align: center;
  z-index: 100;
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
/deep/.withdraw-cell .mix-list-cell {
  padding: 20upx 0 !important;
}
/deep/.withdrawModal .mask-content {
  border-top-left-radius: 16upx;
  border-top-right-radius: 16upx;
}
.withdraw-content {
  .draw-m-title {
    height: 100upx;
    text-align: center;
    line-height: 100upx;
    font-size: 32upx;
    color: #000000;
    font-weight: 700;
    border-bottom: 1upx solid #f6f6f6;
    position: relative;
    image {
      width: 24upx;
      height: 24upx;
      position: absolute;
      right: 30upx;
      top: 40upx;
    }
  }
  .draw-m-item {
    display: flex;
    height: 100upx;
    align-items: center;
    padding: 0 24upx;
    border-bottom: 1upx solid #f6f6f6;
    img {
      width: 40upx;
      height: 40upx;
    }
    .draw-m-item-text {
      font-size: 30upx;
      color: #000000;
      margin-left: 20upx;
    }
  }
}

/***新加样式** */
.pass-position {
  position: relative;
}
.pass-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}
.icon {
  width: 32rpx;
  height: 32rpx;
}
.phone-code {
  position: relative;
  .code {
    position: absolute;
    right: 20upx;
    top: 30%;
    color: #666666;
  }
}
/deep/.uni-input-placeholder {
  color: #b8b8b8;
}
.flex1{
  flex: 1
}
</style>
