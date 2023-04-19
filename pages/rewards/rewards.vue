<template>
  <view class="container">
    <view class="reward-bg">
      <view class="reward-bg2">
        <view class="reward-bg-title">当前奖金(元)</view>
        <view class="reward-bg-price">{{assetObj.buyReword || 0}}</view>
         <!-- <input
          class="reward-bg-price"
          :value="assetObj.buyReword || 0"
          placeholder="请输入10的整倍数"
          @input="inputChange"
        /> -->
        <view class="reward-bg-total">总奖励金(元)：{{assetObj.totalBuyReword}}</view>
        <view class="reward-bg-btn" @click="exchange">兑换</view>
      </view>
    </view>
    <view class="record-content">
      <view class="record-text">奖励金明细</view>
      <view class="record-list-content" v-if="!!recordList.length">
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
      <!--no_data--->
      <view class="no_data_content" v-else>
        <view class="no_data_img"></view>
        <view class="no_data_text">暂无数据</view>
      </view>
    </view>
    <view v-if="showTotal" class="showTotal">没有更多数据了~</view>
    <!-----兑换弹窗----->
    <uni-popup :mask-click="false" ref="rankModal" type="center">
		<view class="model-wraper">
            <view class="model-wraper-bg">
                <view class="modal-title">奖励金兑换</view>
                <view class="modal-content">
                    <view class="modal-content-title">您当前共有<text>{{assetObj.buyReword || 0}}</text>奖励金可兑换</view>
                    <view class="modal-content-text">奖励金兑换到余额需扣除5%</view>
                    <view class="modal-content-text">兑换金额10起兑，且为10的整数倍</view>
                    <view class="modal-content-text b-b">一天可以兑换一次，每日0点刷新次数</view>
                    <input
                      class="reward-input"
                      :value="inputVal"
                      placeholder="请输入兑换金额"
                      @input="inputChange"
                    />
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
        type: 'buy'
      },
      assetObj: {},
      msg:"",
      showTotal: false,
      inputVal:""
    };
  },
  onLoad() {
    // uni.setNavigationBarColor({
    //   frontColor: "#000000",
    //   backgroundColor: "#fae2e9",
    // });
    this.getAsset();
    /**分润列表* */
    this.getRewardList();
  },
  methods: {
    inputChange(e){
      this.inputVal = e.detail.value;
    },
     /**获取资产* */
    getAsset() {
      ApiClinet.get(ApiConfig.APP_BASE_API.asset).then((res) => {
        if (res.data.code == '200') {
            this.assetObj = res.data.data;
            this.assetObj.buyReword =  this.assetObj.buyReword || 0;
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
              item.createTime = formatDate(item.createTime);
            })
        }
      })
    },
    exchange(){
        this.inputVal = "";
        this.$refs['rankModal'].open();
    },
    //取消
    cancelRank(){
        this.$refs['rankModal'].close();
    },
    allExchange() {
      if(!this.inputVal || this.inputVal == 0){
        return this.$api.msg('请输入兑换金额')
      }
      if(!this.inputVal || this.inputVal ==0 || this.inputVal > this.assetObj.buyReword){
        return this.$api.msg('兑换金额不足！');
      }
      if((this.inputVal%10) != 0){
        return this.$api.msg('请输入10的整倍数');
      }
      this.msg = "";
      this.getPayExist();
    },
    getPayExist() {
      ApiClinet.get(ApiConfig.APP_BASE_API.payExist).then((res) => {
        if (res.data.code == '200') {
           let payExist = res.data.data;
           if(payExist){
             this.$refs.jpPwd.toOpen();
           }else{
             uni.showModal({
                content: '用户未设置支付密码，前去设置支付密码?',
                success: (e)=>{
                  if(e.confirm){
                    uni.navigateTo({
                      url: "/pages/payment/password",
                    });
                  }
                }
            });
           }
        }else{
          this.$api.msg(res.data.msg)
        }
      })
    },
    saveData(){
      let params = {
        amount: this.inputVal,
        type: 'buy',
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
    height: 530upx;
    background: url(@/static/user/rewards-bg.jpg) 100% no-repeat;
    background-size: 100% 100%;
    margin-top: -140upx;
    padding:24upx;
    .reward-bg2{
        margin-top: 170upx;
        width:100%;
        height:286upx;
        background: url(@/static/user/rewards-bg2.jpg) 100% no-repeat;
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
		z-index: 1000;
		top: 50%;
		left: 50%;
		margin-top: -300rpx;
		margin-left: -300rpx;
	}
    .model-wraper-bg{
        background: url(@/static/user/rewards-bg3.jpg) 100% no-repeat;
        background-size: 100% 100%;
        height:700upx; //70
        width:596upx;
        padding:0 44upx;
        .modal-content{
            width:100%;
            height:388upx;
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
}
.showTotal{
  text-align: center;
  line-height: 60upx;
  font-size:28upx;
  color:#999999;
}
.no_data_content{
  width: 328upx;
  height:auto;
  margin: 160upx auto;
  text-align: center;
  .no_data_img{
    width:100%;
    height:228upx;
    margin-bottom: 20upx;
    background: url(@/static/no_data.png) 100% no-repeat;
    background-size: cover;
  }
  .no_data_text{
    font-size: 24upx;
    color:#666666;
  }
}
.reward-input{
  font-size:30upx;
  margin-top: 20upx;
}
.uni-input-placeholder {
    font-size: 30upx;
    color:#333333;
}
</style>