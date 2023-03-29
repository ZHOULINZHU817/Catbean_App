<template>
	<view class="stroke-cat">
		<view class="stroke-cat-time">
            <view class="cat-time-item">场次：12:00</view>
            <view class="cat-time-item">本场次预计倒计时：<count-down :endTime="endTime" :endText="endText " @changeText="changeText"/></view>
        </view>
        <view class="stroke-fot">
            <view class="stroke-btn" @click="appointment">{{btnText}}</view>
        </view>
        <!---预约弹窗---->
        <uniModal ref="strokeModal" :contentHeight="680">
            <view slot="modalInfo">
                <view class="modalInfo-content">
                    <view class="stroke-m-title">预约</view>
                    <view class="stroke-select">
                    <view class="flex1" :class="active == index?'active':''" @click="selectTime(item, index)" v-for="(item, index) in list" :key="index">{{item}}</view>
                    </view>
                    <view class="description">
                        <view>说明：</view>
                        <view>1.根据⾃⾏选择抢购次数</view>
                        <view>2.点击确认提交预约数量</view>
                    </view>
                    <view class="stroke-m-f">
                        <view class="stroke-m-btn" @click="close">取消</view>
                        <view class="stroke-m-btn" @click="saveAppointment">确认</view>
                    </view>
                </view>
            </view>
        </uniModal>
	</view>
</template>

<script>
    import uniModal from '@/components/uni-modal/uni-modal';
	export default {
        components:{
            uniModal
        },
		data() {
			return {
			   endTime:new Date("2023/04/23 17:57:00").getTime() / 1000 +  ' ',
			    //  console.log(endTime)=>得到毫秒  1658030420 可在方法里面放入后台数据,new Date('放后台数据').getTime() / 1000 +  ' ',但要记得调用方法
			   endText:'活动已结束',
               btnText: "预约",
               list:[1, 5, 10, 20],
               active: null
			}
		},
		onLoad(){
			
		},
		methods: {
			onNavigationBarButtonTap() {
                this.$api.msg('点击')
                uni.navigateTo({
                    url:'/pages/panicBuy/panicBuyOrder?state=0'
                })
            },
            changeText(){
                this.btnText = "立即抢购";
            },
            appointment(){
                console.log('this.btnText', this.btnText)
                switch(this.btnText){
                    case '预约':
                        this.getAppointment();
                        break;
                    case '立即抢购':
                        this.panicBuy();
                        break;
                }
            },
            getAppointment(){
                this.$refs.strokeModal.toggleMask();
            },
            panicBuy() {

            },
            /***选中预约时间* */
            selectTime(val, idx){
                this.active = idx;
            },
            /***关闭弹窗* */
            close(){
                this.$refs.strokeModal.toggleMask();
            },
            /***确认预约* */
            saveAppointment() {
                
            }
		}
	}
</script>

<style lang='scss'>
	.stroke-cat{
        .stroke-cat-time{
            margin:80upx 30upx;
            text-align: center;
            background: #eee;
            .cat-time-item{
                height:120upx;
                line-height: 120upx;
            }
        }
        .stroke-fot{
            .stroke-btn{
                width:220upx;
                height:220upx;
                border-radius: 220upx;
                background: #eee;
                text-align: center;
                line-height: 220upx;
                margin: 300upx auto;
            }
        }
        .stroke-m-title{
            font-size:36upx;
            width:100%;
            text-align: center;
            padding:20upx 0;
        }
        .stroke-select{
            display: flex;
        }
        .flex1{
            flex:1;
            height:80upx;
            background: #eee;
            margin:20upx;
            text-align: center;
            line-height: 80upx;
        }
        .active{
            background: #1811df;
            color:#fff;
        }
        .modalInfo-content{
          padding: 20upx;
        }
        .description{
            padding:20upx;
        }
        .stroke-m-f{
            display: flex;
            justify-content: center;
            padding-top:80upx;
            .stroke-m-btn{
                width:260upx;
                height:80upx;
                line-height: 80upx;
                text-align: center;
                background: #fa436a;
                margin:0 30upx;
                border-radius: 30upx;
                color:#fff;
            }
        }
    }
</style>
