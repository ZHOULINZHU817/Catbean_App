<template>  
    <view class="container">  
		
		<view class="user-section">
			<view class="user-set">
				<view class="user-set-view"></view>
				<view class="user-set-icon"><text class="yticon icon-xiaoxi font-icon" @click="goNews"></text> <text class="yticon icon-shezhi font-icon" @click="goSet"></text></view>
			</view>
			<image class="bg" src="/static/user-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.portrait || '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<view class="username">{{userInfo.nickname || '游客'}}</view>
					<text class="user_id">ID:{{'99878665666'}}</text>
				</view>
			</view>
		</view>
		
		<view 
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<view class="tj-sction">
				<view class="tj-item">
					<text class="num">128.8</text>
					<text>猫豆</text>
				</view>
				<view class="tj-item">
					<text class="num">0</text>
					<text>分润</text>
				</view>
				<view class="tj-item">
					<text class="num">20</text>
					<text>奖励金</text>
				</view>
				<view class="tj-item">
					<text class="num">20</text>
					<text>分享值</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section-content">
				<list-cell iconColor="#5fcda2" title="抢购订单" tips="查看全部" border="1" @eventClick="navTo('/pages/panicBuy/panicBuyOrder?state=0')"></list-cell>
				<view class="order-section">
					<view class="order-item" @click="navTo('/pages/panicBuy/panicBuyOrder?state=0')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order1_1.jpg"></image>
						<text>已预约</text>
					</view>
					<view class="order-item" @click="navTo('/pages/panicBuy/panicBuyOrder?state=1')"  hover-class="common-hover" :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order1_2.jpg"></image>
						<text>抢购中</text>
					</view>
					<view class="order-item" @click="navTo('/pages/panicBuy/panicBuyOrder?state=2')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order1_3.jpg"></image>
						<text>转卖中</text>
					</view>
					<view class="order-item" @click="navTo('/pages/panicBuy/panicBuyOrder?state=3')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order1_4.jpg"></image>
						<text>已违约</text>
					</view>
					<view class="order-item" @click="navTo('/pages/panicBuy/panicBuyOrder?state=4')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order1_5.jpg"></image>
						<text>已完成</text>
					</view>
				</view>
			</view>
		    <!---抢购订单--->
			<view class="order-section-content">
				<list-cell iconColor="#5fcda2" title="猫超订单" tips="查看全部" border="1" @eventClick="navTo('/pages/address/address')"></list-cell>
				<view class="order-section">
					<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order2_1.jpg"></image>
						<text>待支付</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/order?state=1')"  hover-class="common-hover" :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order2_2.jpg"></image>
						<text>待收货</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order2_3.jpg"></image>
						<text>已完成</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/user_order2_4.jpg"></image>
						<text>退款/售后</text>
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
					<view class="order-item" @click="navTo('/pages/user/certification')" hover-class="common-hover"  :hover-stay-time="50">
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
					<view class="order-item" @click="navTo('/pages/user/friend')" hover-class="common-hover"  :hover-stay-time="50">
						<image class="user-icon-pic" src="/static/user/set_6.jpg"></image>
						<text>我的好友</text>
					</view>
				</view>
			</view>
			<!-- <view class="history-section icon">
				<list-cell icon="icon-iconfontweixin" iconColor="#e07472" title="账户设置"  @eventClick="navTo('/pages/payment/set')"></list-cell>
				<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
				<list-cell icon="icon-share" iconColor="#9789f7" title="实名认证"></list-cell>
				<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="支付密码" @eventClick="navTo('/pages/payment/password')"></list-cell>
				<list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="收款账号"></list-cell>
				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
			</view> -->
		</view>
			
		
    </view>  
</template>  
<script>  
	import listCell from '@/components/mix-list-cell';
    import {  
        mapState 
    } from 'vuex';  
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			listCell
		},
		data(){
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
			}
		},
		onLoad(){
		},
		// #ifndef MP
		// onNavigationBarButtonTap(e) {
		// 	const index = e.index;
		// 	if (index === 0) {
		// 		this.navTo('/pages/set/set');
		// 	}else if(index === 1){
		// 		// #ifdef APP-PLUS
		// 		const pages = getCurrentPages();
		// 		const page = pages[pages.length - 1];
		// 		const currentWebview = page.$getAppWebview();
		// 		currentWebview.hideTitleNViewButtonRedDot({
		// 			index
		// 		});
		// 		// #endif
		// 		uni.navigateTo({
		// 			url: '/pages/notice/notice'
		// 		})
		// 	}
		// },
		// #endif
        computed: {
			...mapState(['hasLogin','userInfo'])
		},
        methods: {
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
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url){
				if(!this.hasLogin){
					url = '/pages/public/login';
				}
				uni.navigateTo({  
					url
				})  
			}, 
	
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
		
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			},
			/******新代码********** */
			goCatbean() {
				this.$api.msg('猫豆页面')
			},
			shareProfit(){
				this.$api.msg('分润页面')
			}

        }  
    }  
</script>  
<style lang='scss'>
.container{
	background-color: rgba(246, 246, 246, 1);
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
		height: 740upx;
		padding: 100upx 30upx 0;
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
				width:80upx;
				color:#000000;
			}
			.font-icon{
				font-size:38upx;
				color:#000000;
				padding-right:20upx;
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