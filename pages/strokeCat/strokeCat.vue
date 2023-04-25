<template>
  <view class="stroke-cat">
    <view class="stroke-cat-time">
      <view class="cat-time-item1">
        <view class="cat-time-item1-title">撸猫场次</view>
        <view class="cat-time-item1-type">{{stadiumText}}</view>
      </view>
      <view class="cat-time-item"
        >本场次预计倒计时：<count-down
          class="down"
          :endTime="endTime"
          :endText="endText"
          @changeText="changeText"
      /></view>
    </view>
    <view class="stroke-fot">
      <!-- <view class="stroke-btn" @click="appointment">{{ btnText }}</view> -->
      <view class="stroke_order" @click="goOrder"></view>
      <view class="stroke_1" @click="appointment"></view>
      <view class="stroke_rule" @click="goRule"></view>
    </view>
    <!-----预约弹窗----->
    <uni-popup :mask-click="false" ref="rankModal" type="center">
      <view class="model-wraper">
        <view class="model-wraper-bg">
          <view class="modal-title">预约</view>
          <view class="modal-content">
            <view class="stroke-select">
                <view class="stroke-select-item" :class="active == index?'active':''" @click="selectTime(item, index)" v-for="(item, index) in list" :key="index">{{item}}</view>
            </view>
            <view class="modal-content-text1">说明：</view>
            <view class="modal-content-text"
              >1.根据⾃⾏选择抢购次数</view
            >
            <view class="modal-content-text"
              >2.点击确认提交预约数量</view
            >
          </view>
          <view class="confirm-btn-content">
            <view class="confirm-btn1" @click="cancelRank">取消</view>
            <view class="confirm-btn" @click="saveAppointment">确定</view>
          </view>
        </view>
        <view class="rank-btn" @click="cancelRank">
          <view class="close"></view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import ApiClinet from "@/services/api-clinet";
import ApiConfig from "@/config/api.config";
import AppConfig from "@/config/app.config";
import { formatDate } from "@/utils/prototype/date"
export default {
  components: {
    uniPopup,
  },
  data() {
    return {
      endTime: '',
      //  console.log(endTime)=>得到毫秒  1658030420 可在方法里面放入后台数据,new Date('放后台数据').getTime() / 1000 +  ' ',但要记得调用方法
      endText: "活动已结束",
      btnText: "预约",
      list: [1, 3, 5, 8, 10, 12, 20, 30, 50, 100],
      active: null,
      timeDate:'',
      stadiumText:'12:00场',
      form: {
        type:"",
        cnt:"",
      },
      isExist: false
    };
  },
  onShow() {
    this.dateHandle();
    /**是否消息认证* */
		this.getCardExist();
  },
  methods: {
    onNavigationBarButtonTap() {
      this.$api.msg("点击");
      uni.navigateTo({
        url: "/pages/panicBuy/panicBuyOrder?state=0",
      });
    },
    goOrder(){
      uni.navigateTo({
        url: "/pages/panicBuy/panicBuyOrder?state=0",
      });
    },
    getCardExist() {
				ApiClinet.get(ApiConfig.APP_BASE_API.userExist).then((res) => {
					if (res.data.code == '200') {
					   this.isExist = res.data.data;
					}
				})
		},
    changeText() {
      // this.btnText = "立即抢购";
    },
    appointment() {
      if(!this.isExist){
        uni.showModal({
            content: '用户未进行实名认证，前去认证?',
            success: (e)=>{
              if(e.confirm){
                uni.navigateTo({
                  url: "/pages/user/certification",
                });
              }
            }
        });
        return;
      }
      this.$refs.rankModal.open();
    },
    panicBuy() {},
    /***选中预约时间* */
    selectTime(val, idx) {
      this.active = idx;
      this.form.cnt = val;
    },
    /***关闭弹窗* */
    cancelRank() {
      this.$refs.rankModal.close();
    },
    /***确认预约* */
    saveAppointment() {
      if(!this.form.cnt){
        return this.$api.msg('请选择预约次数')
      }
      ApiClinet.post(`${AppConfig.ANDROID_URL}/api/app/order/reserve`, this.form).then((res) => {
        if (res.data.code == '200') {
            this.cancelRank();
            uni.navigateTo({
              url: "/pages/panicBuy/panicBuyOrder?state=0",
            });
        }else{
           this.$api.msg(res.data.msg)
        }
      })
    },
    goRule(){
      uni.navigateTo({
          url: "/pages/strokeCat/rule",
      });
    },
    getDate(count){
      var date = new Date();
      date.setDate(date.getDate()+count);//获取AddDayCount天后的日期
      var y = date.getFullYear();
      var m = date.getMonth()+1;//获取当前月份的日期
      var d = date.getDate();
      return y + '-' + this.add0(m) + '-' + this.add0(d)
    },
    add0(m) {
      return m < 10 ? '0' + m : m
    },
    dateHandle(){
      let time = new Date().getTime();
      let time1 = new Date(`${this.getDate(0)} 12:00:00`).getTime();
      let time2 = new Date(`${this.getDate(0)} 16:00:00`).getTime();
      let time3 = new Date(`${this.getDate(0)} 20:00:00`).getTime();
      let time4 = new Date(`${this.getDate(1)} 12:00:00`).getTime();
      
      if(time <=time1){
        this.timeDate = time1;
        this.stadiumText = '12:00场'
        this.form.type = 'twelve';
        //new Date("2023/04/23 17:57:00").getTime() / 1000 + " "
        this.endTime = this.timeDate / 1000 + " "
        return;
      }
      if(time1<time && time <= time2){
        this.timeDate = time2;
        this.stadiumText = '16:00场'
        this.form.type = 'sixteen';
        this.endTime = this.timeDate / 1000 + " "
        return;
      }
      if(time2 < time && time<= time3){
        this.timeDate = time3;
        this.stadiumText = '20:00场'
        this.form.type = 'twenty';
        this.endTime = this.timeDate / 1000 + " "
        return;
      }
      if(time3 < time && time<= time4){
        this.timeDate = time4;
        this.stadiumText = '12:00场'
        this.form.type = 'twelve';
        this.endTime = this.timeDate / 1000 + " "
      }
    }
  },
};
</script>

<style lang='scss'>
page{
  background: url(@/static/cat_bg.png) 100% no-repeat;
  background-size: cover;
}
.stroke-cat {
  // height: 85.9vh;
  width: 100vw;
  .stroke-cat-time {
    // margin: 80upx 30upx;
    text-align: center;
    // background: #eee;
    .cat-time-item1{
      height: 154upx;
      width:344upx;
      background: url(@/static/petcat/session.png) 100% no-repeat;
      background-size: cover;
      margin: 0 auto;
      text-align: center;
      .cat-time-item1-title{
        color:#E87700;
        font-size: 26upx;
        padding-top: 40upx;
      }
      .cat-time-item1-type{
        color:#E87700;
        font-size: 46upx;
      }
    }
    .cat-time-item {
      height: 120upx;
      line-height: 120upx;
    }
  }
  .stroke-fot {
    position: absolute;
    bottom: 150upx;
    left:0;
    display: flex;
    height:130upx;
    .stroke_1{
      width: 326upx;
      height:130upx;
      background: url(@/static/petcat/appointment.png) 100% no-repeat;
      background-size: cover;
       margin-right: 48upx;
    }
    .stroke_order{
      height:130upx;
      width:122upx;
      background: url(@/static/petcat/petcat_order.png) 100% no-repeat;
      background-size: cover;
      margin: 0 48upx;
    }
    .stroke_rule{
      height:130upx;
      width:122upx;
      background: url(@/static/petcat/petcat_rule.png) 100% no-repeat;
      background-size: cover;
    }
    .stroke-btn {
      width: 220upx;
      height: 220upx;
      border-radius: 220upx;
      background: #eee;
      text-align: center;
      line-height: 220upx;
      margin: 300upx auto;
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
    margin-top: -360rpx;
    margin-left: -300rpx;
  }
  .model-wraper-bg {
    background: url(@/static/petcat/petcat_modal.jpg) 100% no-repeat;
    background-size: 100% 100%;
    height: 646upx;
    width: 596upx;
    padding: 32upx 44upx 0 44upx;
    .modal-content {
      width: 100%;
      height: 318upx;
      background-color: #ffffff;
      border-radius: 16upx;
      padding: 24upx 5upx;
      margin-top:20upx;
      .stroke-select{
        display: flex;
        flex-flow:row wrap;
        padding-left: 30upx;
        .stroke-select-item{
            width: 15%;
            height:60upx;
            line-height: 60upx;
            border:1upx solid #CFCFCF;
            border-radius: 10upx;
            text-align: center;
            margin:10upx;
            font-size:28upx;
        }
         .active {
            background: #FFF1F6;
            border:1upx solid #FF478C;
            color:#FF478C;
        }
      }
      .modal-content-text1{
        font-size: 24upx;
        color: #fe5f90;
        line-height: 40upx;
        padding-left: 30upx;
      }
      .modal-content-text {
        font-size: 24upx;
        color: #333333;
        line-height: 40upx;
        position: relative;
        padding-left: 48upx;
        &::before {
          content: "";
          display: block;
          width: 10upx;
          height: 10upx;
          background: #fe5f90;
          border-radius: 50%;
          position: absolute;
          top: 16upx;
          left: 30upx;
        }
      }
    }
    .confirm-btn-content {
      display: flex;
      justify-content: center;
      padding-top: 60upx;
      .confirm-btn1{
        width: 236upx;
        border: 1upx solid #FF478C;
        border-radius: 44upx;
        height:88upx;
        line-height: 88upx;
        margin-right:20upx;
        text-align: center;
        color:#FF478C;
      }
      .confirm-btn {
        background-image: linear-gradient(
          90deg,
          rgba(255, 104, 166, 1) 0,
          rgba(255, 71, 140, 1) 100%
        );
        border-radius: 44upx;
        height:88upx;
        line-height: 88upx;
        width: 236upx;
        text-align: center;
        color: #ffffff;
        font-weight: 700;
      }
    }
  }

  .modal-title {
    width: 230upx;
    height:78upx;
    text-align: center;
    font-size: 38upx;
    color: #ffffff;
    font-weight: 700;
    line-height: 78upx;
    background: url(@/static/petcat/petcat_modal_t.jpg) 100% no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
  }

  .rank-btn {
    padding-top: 80upx;
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
.down{
  background-color: #FFFFFF;
  padding:2upx 6upx;
  color:#F25774;
  font-size: 30upx;
}
</style>
