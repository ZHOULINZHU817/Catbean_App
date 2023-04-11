<template>
	<view class="container">
		<!-- <view class="list-title">消息通知</view>
        <view class="list-cell m-t">
			<text class="cell-tit">短信提醒</text>
			<switch checked color="#fa436a" @change="switchChange" />
		</view> -->
		<view class="list-title">个人信息</view>
		<view class="list-cell b-b m-t" @click="navTo('/pages/userinfo/userinfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">图像</text>
			<img :src="userInfo.avatar || '/static/user/friend.jpg'"/>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/userinfo/userinfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">昵称</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/userinfo/userinfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">微信号</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/userinfo/userinfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">QQ号</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/userinfo/userinfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">手机号</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/payment/set')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">收款账号</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/payment/password')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">支付密码</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/public/forgetPassword')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">修改密码</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('实名认证')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">注销账户</text>
			<text class="cell-more yticon icon-you"></text>
		</view>

		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 userInfo: JSON.parse(uni.getStorageSync('userInfo'))
			};
		},
		methods:{
			navTo(url){
				uni.navigateTo({  
					url
				}) 
			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
							
				    		uni.removeStorageSync('userInfo');
							this.$store.dispatch("auth/logout", {}).then(res => {
								uni.reLaunch({
									url: '/pages/public/login'
								});
							})
				    	}
				    }
				});
			},
			//switch
			switchChange(e){
				let statusTip = e.detail.value ? '打开': '关闭';
				this.$api.msg(`${statusTip}消息推送`);
			},

		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.list-title{
		padding: 20upx $page-row-spacing;
		font-size:24upx;
		color:#999999;
	}
	.list-cell{
		display:flex;
		align-items:center;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
			right:30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
