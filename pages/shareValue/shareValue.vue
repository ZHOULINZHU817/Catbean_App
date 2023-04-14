<template>
  <view class="container">
    <view class="reward-bg">
      <view class="reward-bg2">
        <view class="reward-bg-title">分享值金额</view>
        <!-- <view class="reward-bg-price">{{assetObj.childReward || 0}}</view> -->
         <input
          class="reward-bg-price"
          :value="assetObj.childReward || 0"
          placeholder="请输入10的整倍数"
          @input="inputChange"
        />
        <view class="reward-bg-btn" @click="exchange">兑换</view>
      </view>
    </view>
    <view class="record-content">
      <view class="record-text">分享值明细</view>
      <view class="record-list-content">
        <view
          class="record-list-item"
          v-for="(item, index) in recordList"
          :key="index"
        >
          <view class="flex1">
            <view class="record-title">ID：{{ item.id }}</view>
            <view class="record-date">{{ item.createTime }}</view>
          </view>
          <view class="record-price">+{{ item.amount }}</view>
        </view>
      </view>
    </view>
    <view v-if="showTotal" class="showTotal">没有更多数据了~</view>
    <!-----兑换弹窗----->
    <uni-popup :mask-click="false" ref="rankModal" type="center">
		<view class="model-wraper">
            <view class="model-wraper-bg">
                <view class="modal-title">分享值兑换</view>
                <view class="modal-content">
                    <view class="modal-content-title">您当前共有<text>{{assetObj.childReward || 0}}</text>分享值可兑换</view>
                    <view class="modal-content-text">分享值兑换到余额需扣除5%</view>
                    <view class="modal-content-text">兑换金额10起兑，且为10的整数倍</view>
                    <view class="modal-content-text">一天可以兑换一次，每日0点刷新次数</view>
                </view>
                <view class="confirm-btn-content">
                    <view class="confirm-btn" @click="allExchange">全部兑换</view>
                </view>
            </view>
		    <view class="rank-btn" @click="cancelRank">
                <view class="close"></view>
            </view>
		</view>
	</uni-popup>
  <!------密码弹窗------->
  <jp-pwd ref="jpPwd" :contents="''" :msg="msg" @completed="completed" @forget="forget" ></jp-pwd>
  </view>
</template>  
<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import ApiClinet from "@/services/api-clinet";
import ApiConfig from "@/config/api.config";
import { formatDate } from "@/utils/prototype/date";
export default {
  components: {
    uniPopup
  },
  data() {
    return {
        recordList: [],
      form:{
        page: 0,
        size: 10,
        type: 'child'
      },
      assetObj: {},
      msg:"",
      showTotal: false,
    };
  },
  onLoad() {
    uni.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#ff6fa5",
    });
    this.getAsset();
    /**分润列表* */
    this.getRewardList();
  },
  methods: {
    inputChange(e){
      this.$set(this.assetObj, 'childReward', e.detail.value)
    },
     /**获取资产* */
    getAsset() {
      ApiClinet.get(ApiConfig.APP_BASE_API.asset).then((res) => {
        if (res.data.code == '200') {
            this.assetObj = res.data.data;
            this.oldAsset = Object.assign({},res.data.data)
        }
      })
    },
    getRewardList(){
      ApiClinet.get(ApiConfig.APP_BASE_API.rewardList, this.form).then((res) => {
        if (res.data.code == '200') {
            this.recordList = this.recordList.concat(res.data.data.records || []);
            this.total = Math.ceil(res.data.data.total / this.form.size);
            this.recordList.map(item=>{
              item.createTime = formatDate(item.createTime*1);
            })
        }
      })
    },
    exchange(){
        if(!this.assetObj.childReward || (this.oldAsset.childReward < this.assetObj.childReward)){
          return this.$api.msg('兑换金额不足！');
        }
        if((this.assetObj.childReward%10) != 0){
          return this.$api.msg('请输入10的整倍数');
        }
        this.$refs['rankModal'].open();
    },
    //取消
    cancelRank(){
        this.$refs['rankModal'].close();
    },
    allExchange() {
       if(!this.assetObj.childReward){
        return this.$api.msg('兑换金额错误')
      }
      this.msg = "";
      this.$refs.jpPwd.toOpen();
    },
    saveData(){
      let params = {
        amount: this.assetObj.childReward,
        type: 'child',
        payPwd: this.payPwd
      }
      ApiClinet.put(ApiConfig.APP_BASE_API.assetExchange, params).then((res) => {
        if (res.data.code == '200') {
            this.$refs.jpPwd.toCancel()
            this.cancelRank();
            this.$api.msg('兑换成功！')
            this.getAsset()
        }else{
          this.msg = res.data.msg;
          this.$refs.jpPwd.backs()
        }
      })
    },
    /***支付弹窗** */
    completed(e) {
      this.payPwd = e;
      this.saveData();
    },
    forget() {
      uni.navigateTo({
        url: "/pages/payment/password",
      });
    }
  },
  onReachBottom() {
      if (this.form.page >= this.total) {
      this.showTotal=true//已经滑到底的提醒
      return false;
    }
    this.form.page ++;
    this.getRewardList()
  }
};
</script>  
<style lang='scss'>
page {
  background-color: #f6f6f6;
}
.container {
    padding-bottom:30upx;
  .reward-bg {
    height: 372upx;
    background: url(@/static/user/shareValue-bg.jpg) 100% no-repeat;
    background-size: 100% 100%;
    margin-top: -140upx;
    padding:24upx;
    .reward-bg2{
        margin-top: 150upx;
        width:100%;
        height:228upx;
        background: url(@/static/user/shareValue-bg1.jpg) 100% no-repeat;
        background-size: 100% 100%;
        position: relative;
        padding:50upx 40upx;
        .reward-bg-title{
            color:#666666;
            font-size:28upx;
            margin-bottom: 20upx;
        }
        .reward-bg-price{
            color:#000000;
            font-size:60upx;
            margin-bottom: 40upx;
            font-weight: 700;
        }
        .reward-bg-total{
            color:#333333;
            font-size:28upx;
        }
        .reward-bg-btn{
            background-image: linear-gradient(90deg,rgba(255, 104, 166, 1) 0,rgba(255, 71, 140, 1) 100%);
            border-radius: 30upx;
            padding: 12upx 46upx 12upx 46upx;
            position:absolute;
            top:120upx;
            right:40upx;
            color:#ffffff;
            font-size:24upx;
        }
    }
  }
  .record-content {
    padding: 0 24upx;
    margin-top:60upx;
    .record-text {
      font-size: 32upx;
      color: #333333;
      padding: 0 0 30upx 0;
      font-weight: 700;
    }
    .record-list-content {
      border-radius: 16upx;
      background: #fff;
      .record-list-item {
        display: flex;
        padding: 24upx;
        align-items: center;
        .flex1{
          flex: 1;
        }
        .record-title {
          font-size: 30upx;
          color: #333333;
          margin-bottom: 20upx;
        }
        .record-date {
          font-size: 24upx;
          color: #999999;
        }
        .record-price {
          font-size: 32upx;
          color: #333333;
          font-weight: 700;
        }
      }
    }
  }

  /****弹窗样式***** */
  .model-wraper {
		width: 600rpx;
		// background-color: #fff;
		position: absolute;
		z-index: 998;
		top: 50%;
		left: 50%;
		margin-top: -300rpx;
		margin-left: -300rpx;
	}
    .model-wraper-bg{
        background: url(@/static/user/rewards-bg3.jpg) 100% no-repeat;
        background-size: 100% 100%;
        height:630upx;
        width:596upx;
        padding:0 44upx;
        .modal-content{
            width:100%;
            height:318upx;
            background-color: #ffffff;
            border-radius: 16upx;
            padding: 54upx 30upx;
            .modal-content-title{
                font-size:32upx;
                color:#333333;
                font-weight: 700;
                margin-bottom: 24upx;
                text{
                    color:#FF68A6;
                }
            }
            .modal-content-text{
                font-size:24upx;
                color:#333333;
                line-height: 60upx;
                position: relative;
                padding-left:18upx;
                &::before{
                    content:'';
                    display: block;
                    width:10upx;
                    height:10upx;
                    background:#FE5F90;
                    border-radius: 50%;
                    position: absolute;
                    top:24upx;
                    left:0;
                }
            }
            
        }
        .confirm-btn-content{
            display: flex;
            justify-content: center;
            padding-top: 60upx;
            .confirm-btn{
                background-image: linear-gradient(90deg,rgba(255, 104, 166, 1) 0,rgba(255, 71, 140, 1) 100%);
                border-radius: 30upx;
                padding: 12upx 0;
                width: 400upx;
                text-align: center;
                color:#ffffff;
                font-weight: 700;
            }
        }
    }

	.modal-title {
		width: 100%;
		text-align: center;
		font-size: 38upx;
		color: #333333;
        font-weight: 700;
        padding: 46upx 0 34upx 0;
	}

	.rank-btn{
        padding-top:80upx;
        display: flex;
        justify-content: center;
        .close{
          width: 56upx;
          height: 56upx;
          background: url(@/static/user/close-bg.jpg) 100% no-repeat;
          background-size: 100% 100%;
        }
  }
  .uni-input-input, .uni-input-placeholder {
      font-size: 32upx;
      color:#333333;
  }
}
.showTotal{
  text-align: center;
  line-height: 60upx;
  font-size:28upx;
  color:#999999;
}
</style>