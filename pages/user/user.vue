<template>  
    <view class="container">  
		
		<view class="user-section">
			<view class="user-set">
				<view class="user-set-view"></view>
				<view class="user-set-icon"><view class="yticon icon-xiaoxi font-icon" @click="goNews"><text v-if="isDot" class="xiaoxi-dian"></text></view> <view class="yticon icon-shezhi font-icon" @click="goSet"></view></view>
			</view>
			<image class="bg" src="/static/user-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.avatar || '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<view class="username">{{userInfo.nickName || '游客'}}</view>
					<text class="user_id">ID:{{userInfo.no}}</text>
				</view>
			</view>
		</view>
		
		<view 
			class="cover-container"
		>
			<view class="tj-sction">
				<view class="tj-item"  @click="navTo('/pages/cat/catbean')">
					<text class="num">{{userInfo.catFood || 0}}</text>
					<text>猫豆</text> 
				</view>
				<view class="tj-item"  @click="navTo('/pages/shareProfit/shareProfit')">
					<text class="num">{{userInfo.teamReward || 0}}</text>
					<text>分润</text>
				</view>
				<view class="tj-item" @click="navTo('/pages/rewards/rewards')">
					<text class="num">{{userInfo.buyReward || 0}}</text>
					<text>奖励金</text>
				</view>
				<view class="tj-item" @click="navTo('/pages/shareValue/shareValue')">
					<text class="num">{{userInfo.childReward || 0}}</text>
					<text>分享值</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section-content">
				<list-cell iconColor="#5fcda2" title="抢购订单" tips="查看全部" border="1" @eventClick="navTo('/pages/panicBuy/panicBuyOrder?state=0')"></list-cell>
				<view class="order-section">
					<view class="order-item" @click="navTo('/pages/panicBuy/panicBuyOrder?state=1')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order1_1.jpg"></image>
						<text>已抢中</text>
					</view>
					<view class="order-item" @click="navTo('/pages/panicBuy/panicBuyOrder?state=2')"  hover-class="common-hover" :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order1_2.jpg"></image>
						<text>已支付</text>
					</view>
					<view class="order-item" @click="navTo('/pages/panicBuy/panicBuyOrder?state=3')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order1_3.jpg"></image>
						<text>转卖中</text>
					</view>
					<view class="order-item" @click="navTo('/pages/panicBuy/panicBuyOrder?state=4')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order1_4.jpg"></image>
						<text>已违约</text>
					</view>
					<view class="order-item" @click="navTo('/pages/panicBuy/panicBuyOrder?state=5')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order1_5.jpg"></image>
						<text>已完成</text>
					</view>
				</view>
			</view>
		    <!---猫超订单--->
			<view class="order-section-content">
				<list-cell iconColor="#5fcda2" title="猫超订单" tips="查看全部" border="1" @eventClick="navTo('/pages/order/order?state=4')"></list-cell>
				<view class="order-section">
					<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order2_1.jpg"></image>
						<text>待支付</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/order?state=1')"  hover-class="common-hover" :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order2_2.jpg"></image>
						<text>已支付</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order2_3.jpg"></image>
						<text>已发货</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order2_4.jpg"></image>
						<text>已完成</text>
					</view>
				</view>
			</view>
			<!-- 常用功能-->
			<view class="history-section">
				<list-cell iconColor="#5fcda2" title="常用功能" navigateType="null" border="1"></list-cell>
				<view class="order-section">
					<view class="order-item"  @click="navTo('/pages/set/set')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/set_1.jpg"></image>
						<text>账户设置</text>
					</view>
					<view class="order-item" @click="navTo('/pages/address/address')"  hover-class="common-hover" :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/set_2.jpg"></image>
						<text>地址管理</text>
					</view>
					<view class="order-item" @click="goCertification" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/set_3.jpg"></image>
						<text>实名认证</text>
					</view>
					<view class="order-item" @click="navTo('/pages/payment/password')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/set_4.jpg"></image>
						<text>支付密码</text>
					</view>
					<view class="order-item" @click="navTo('/pages/payment/set')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/set_5.jpg"></image>
						<text>收款账号</text>
					</view>
					<view class="order-item" v-if="isExist" @click="navTo('/pages/user/friend')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/set_6.jpg"></image>
						<text>我的好友</text>
					</view>
					<view class="order-item" v-if="isExist" @click="navTo('/pages/share/share')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/share_friend.png"></image>
						<text>分享好友</text>
					</view>
					<view class="order-item" v-if="isExist" @click="navTo('/pages/user/top')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/top.png"></image>
						<text>排行榜</text>
					</view>
				</view>
			</view>
		</view>
			
		
    </view>  
</template>  
<script>  
	import listCell from '@/components/mix-list-cell';
    // import {  
    //     mapState 
    // } from 'vuex';  
	// let startY = 0, moveY = 0, pageAtTop = true;
	import store from '@/store'
	import ApiClinet from "@/services/api-clinet";
	import ApiConfig from "@/config/api.config";

    export default {
		components: {
			listCell
		},
		data(){
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				isDot: false,
				isExist: false,
				userInfo: JSON.parse(uni.getStorageSync('userInfo')),
				assetObj: {},
			}
		},
		onShow(){
			/**获取消息红点* */
			this.getNoticeMsg()
			/**是否消息认证* */
			this.getCardExist();
			/**资产** */
			// this.getAsset();
			/**获取个人信息* */
			this.memberInfo();
		},
        // computed: {
		// 	// ...mapState(['hasLogin','userInfo'])
		// },
        methods: {
			memberInfo() {
				ApiClinet.get(ApiConfig.APP_BASE_API.memberDetail).then((res) => {
					if (res.data.code == '200') {
					   this.userInfo = res.data.data;
					}
				})
			},
			/**获取消息红点* */
			getNoticeMsg() {
				ApiClinet.get(ApiConfig.APP_BASE_API.noticeMsg, {}).then((res) => {
					if (res.data.code == '200') {
					   this.isDot = res.data.data;
					}
				})
			},
			getCardExist() {
				ApiClinet.get(ApiConfig.APP_BASE_API.userExist).then((res) => {
					if (res.data.code == '200') {
					   this.isExist = res.data.data;
					}
				})
			},
			// getAsset() {
			// 	ApiClinet.get(ApiConfig.APP_BASE_API.asset).then((res) => {
			// 		if (res.data.code == '200') {
			// 		   this.assetObj = res.data.data;
			// 		}
			// 	})
			// },
            goNews(){
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			},
			goSet(){
				uni.navigateTo({
					url: '/pages/set/set'
				})
			},
			goCertification() {
				if(this.isExist){
					return this.$api.msg('用户已实名认证！')
				}
				uni.navigateTo({
					url: '/pages/user/certification'
				})
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url){
				// if(!this.hasLogin){
				// 	url = '/pages/public/login';
				// }
				uni.navigateTo({  
					url
				})  
			}, 
	
			// /**
			//  *  会员卡下拉和回弹
			//  *  1.关闭bounce避免ios端下拉冲突
			//  *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			//  *    transition设置0.1秒延迟，让css来过渡这段空窗期
			//  *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			//  */
			// coverTouchstart(e){
			// 	if(pageAtTop === false){
			// 		return;
			// 	}
			// 	this.coverTransition = 'transform .1s linear';
			// 	startY = e.touches[0].clientY;
			// },
			// coverTouchmove(e){
			// 	moveY = e.touches[0].clientY;
			// 	let moveDistance = moveY - startY;
			// 	if(moveDistance < 0){
			// 		this.moving = false;
			// 		return;
			// 	}
			// 	this.moving = true;
			// 	if(moveDistance >= 80 && moveDistance < 100){
			// 		moveDistance = 80;
			// 	}
		
			// 	if(moveDistance > 0 && moveDistance <= 80){
			// 		this.coverTransform = `translateY(${moveDistance}px)`;
			// 	}
			// },

        }  
    }  
</script>  
<style lang='scss'>
page{
	background-color: rgba(246, 246, 246, 1);
}
.container{
	// background-color: rgba(246, 246, 246, 1);
}
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 24upx;
	}

	.user-section{
		height: 640upx;
		padding: 0upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			// filter: blur(1px);
			// opacity: .9;
		}
		.user-set{
			height: 80upx;
			display: flex;
			position: relative;
			z-index: 1;
			.user-set-view{
				flex: 1;
			}
			.user-set-icon{
				display: flex;
				// width:80upx;
				color:#000000;
			}
			.font-icon{
				font-size:38upx;
				color:#000000;
				padding:20upx;
			}
			.icon-xiaoxi{
				position: relative;
				.xiaoxi-dian{
					position: absolute;
					width:10upx;
					height:10upx;
					border-radius: 10upx;
					background-color: #ff478c;
					top:18upx;
					right: 18upx;
				}
			}
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: 36upx;
			color: #000000;
			margin-left: 30upx;
			margin-bottom: 20upx;;
		}
		.user_id{
			font-size:28upx;
			color:#666666;
			margin-left: 30upx;
		}
	}

	.cover-container{
		// background: $page-color-base;
		margin-top: -380upx;
		padding: 0 30upx;
		position:relative;
		// background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		display:flex;
		// justify-content: space-around;
		flex-flow: row;
		align-content: center;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: 24upx;
			color: #999999;
			width:25%;
		}
		.num{
			font-size: 44upx;
			color: #000000;
			margin-bottom: 8upx;
		}
	}
	.order-section-content{
		background: #fff;
		border-radius: 10upx;
		padding:0 0 28upx 0;
		margin-top: 20upx;
		.order-section{
			display:flex;
			justify-content: space-around;
			align-content: center;
			.order-item{
				@extend %flex-center;
				width: 120upx;
				height: 120upx;
				border-radius: 10upx;
				font-size: $font-sm;
				color: #333333;
			}
			.yticon{
				font-size: 48upx;
				margin-bottom: 18upx;
				color: #fa436a;
			}
			.icon-shouhoutuikuan{
				font-size:44upx;
			}
		}
	}
	.history-section{
		background: #fff;
		border-radius: 10upx;
		padding:0 0 28upx 0;
		margin-top: 20upx;
		.order-section{
			display:flex;
			flex-flow:row wrap;
			align-content: center;
			.order-item{
				@extend %flex-center;
				width: 25%;
				height: 120upx;
				border-radius: 10upx;
				font-size: $font-sm;
				color: #333333;
			}
			.yticon{
				font-size: 48upx;
				margin-bottom: 18upx;
				color: #fa436a;
			}
			.icon-shouhoutuikuan{
				font-size:44upx;
			}
		}
	}
	.user-icon-pic{
		width: 48upx;
		height:48upx;
		margin-bottom: 10upx;
	}
	
</style>