<template>
  <view class="container">
    <view class="profit-bg">
      <view class="profit-bg-text">总分润(元)</view>
      <view class="profit-bg-price">{{assetObj.teamReward || 0}}</view>
      <!-- <input
        class="profit-bg-price"
        :value="assetObj.teamReward || 0"
        placeholder="请输入10的整倍数"
        @input="inputChange"
      /> -->
      <view class="reward-bg-btn" @click="exchange">兑换</view>
    </view>
    <view class="profit-content">
      <view class="profit-middle">
        <view class="profit-middle-left">
          <view class="middle-left-title">今日分润</view>
          <view class="middle-left-price">{{assetObj.todayTeamReward || 0}}</view>
        </view>
        <view class="profit-middle-right">
          <view class="middle-left-title">昨日分润</view>
          <view class="middle-left-price">{{assetObj.yesterdayTeamReward || 0}}</view>
        </view>
      </view>
      <view class="profit-tab">
        <view class="profit-tab-title">
            <view style="width:6upx;height:30upx;background:#FF478C;"></view>
            <view class="profit-tab-text">分润记录列表</view>
        </view>
        <v-table
          :columns="columns"
          :tableData="tableList"
          :isLoading="isLoading"
        ></v-table>
        <view class="profit-tab-tips">注：分润到账时间：T+1，晚上12点之后到帐</view>
      </view>
      <view v-if="showTotal" class="showTotal">没有更多数据了~</view>
    </view>
    <!-----兑换弹窗----->
    <uni-popup :mask-click="false" ref="rankModal" type="center">
      <view class="model-wraper">
              <view class="model-wraper-bg">
                  <view class="modal-title">分润值兑换</view>
                  <view class="modal-content">
                      <view class="modal-content-title">您当前共有<text>{{assetObj.teamReward || 0}}</text>分润值可兑换</view>
                      <view class="modal-content-text">分润值兑换到余额需扣除5%</view>
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
import vTable from "@/components/table/table.vue";
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import ApiClinet from "@/services/api-clinet";
import ApiConfig from "@/config/api.config";
	import { formatDate } from "@/utils/prototype/date";
export default {
  components: {
    vTable,
    uniPopup
  },
  data() {
    return {
        tableList:[],
        columns: [{
                title: "日期",
                key: "createTimes",
                width: '34%',
                listenerClick: true
            },
            {
                title: '行为',
                key: 'tradeAmount1',
                width: '26%',
                listenerClick: true
            },
            {
                title: '来源',
                key: 'childNo',
                width: '20%',
                listenerClick: true
            },
            {
                title: '分润金额',
                key: 'amount',
                width: '20%',
                listenerClick: true
            },
        ],
        isLoading: false,
        form:{
          page: 0,
          size: 50,
          type: 'team'
        },
        assetObj: {},
        msg:"",
        showTotal: false,
        inputVal:""
    };
  },
  onLoad() {
    // uni.setNavigationBarColor({
    //   frontColor: "#ffffff",
    //   backgroundColor: "#ff5a9b",
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
            this.assetObj.teamReward =  this.assetObj.teamReward || 0;
            this.oldAsset = Object.assign({},res.data.data)
        }
      })
    },
    getRewardList(){
      ApiClinet.get(ApiConfig.APP_BASE_API.rewardList, this.form).then((res) => {
        if (res.data.code == '200') {
            res.data.data.records.map(item=>{
              item.createTimes = formatDate(item.createTime);
              item.tradeAmount1 = "好友分润";
            })
            this.tableList = this.tableList.concat(res.data.data.records || []);
            this.total = Math.ceil(res.data.data.total / this.form.size);
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

      // if(!this.assetObj.teamReward){
      //   return this.$api.msg('兑换金额错误')
      // }
    //   this.$refs['rankModal'].close();

      if(!this.inputVal || this.inputVal == 0){
        return this.$api.msg('请输入兑换金额')
      }
      if(!this.inputVal || this.inputVal ==0 || this.inputVal > this.assetObj.teamReward){
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
        type: 'team',
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
  .profit-bg {
    height: 440upx;
    background: url(@/static/user/shareprofit-bg.jpg) 100% no-repeat;
    background-size: 100% 100%;
    margin-top: -100upx;
    // position: relative;
    .profit-bg-text {
      font-size: 28upx;
      color: #ffffff;
      width: 100%;
      text-align: center;
      padding-top: 140upx;
    }
    .profit-bg-price {
      font-size: 60upx;
      color: #ffffff;
      width: 100%;
      text-align: center;
      font-weight: 500;
      padding-top: 20upx;
    }
    .reward-bg-btn{
          background-color: #ffffff;
          border-radius: 30upx;
          padding: 12upx 46upx 12upx 46upx;
          position:absolute;
          top:180upx;
          right:40upx;
          color:#FF6C9D;
          font-size:24upx;
      }
  }
  .profit-content {
    padding: 0 24upx;
    margin-top: -80upx;
    .profit-middle {
      height: 136upx;
      display: flex;
      background-color: #ffffff;
      border-radius: 16upx;
      align-items: center;
      .profit-middle-left {
        height: 100upx;
        flex: 1;
        text-align: center;
        border-right: 1upx solid #f6f6f6;
      }
      .profit-middle-right {
        height: 100upx;
        flex: 1;
        text-align: center;
      }
      .middle-left-title {
        font-size: 24upx;
        color: #333333;
      }
      .middle-left-price {
        font-size: 36upx;
        color: #333333;
        font-weight: 500;
        padding-top: 20upx;
      }
    }
  }
  .profit-tab{
    padding:24upx;
    border-radius: 16upx;
    margin-top:40upx;
    background-color: #ffffff;
    .profit-tab-title{
        padding:0 0 20upx 0;
        display: flex;
        align-items: center;
        .profit-tab-text{
            font-size:32upx;
            color:#333333;
            font-weight: 700;
            margin-left: 16upx;
        }
    }
    .profit-tab-tips{
        font-size:24upx;
        color:#999999;
        margin-top:10upx;
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
        // height:700upx;
        width:596upx;
        padding:0 44upx 40upx 44upx;
        .modal-content{
            width:100%;
            // height:388upx;
            background-color: #ffffff;
            border-radius: 16upx;
            padding: 26upx 30upx;
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
.reward-input{
  font-size:30upx;
  margin-top: 20upx;
}
.uni-input-placeholder {
    font-size: 30upx;
    color:#333333;
}
</style>