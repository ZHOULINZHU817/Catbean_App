<template>
	<view class="container">
		<!-- <view class="list-title">消息通知</view>
        <view class="list-cell m-t">
			<text class="cell-tit">短信提醒</text>
			<switch checked color="#fa436a" @change="switchChange" />
		</view> -->
		<view class="list-title">个人信息</view>
		<view class="list-cell b-b m-t" @click="navTo('/pages/userinfo/userinfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">头像</text>
			<!-- <img  :src="userInfo.avatar || '/static/user/friend.jpg'"/> -->
			<image class="user-icon-pic" :src="userInfo.avatar || '/static/user/friend.jpg'"></image>
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
		<view class="list-cell b-b" @click="navTo('/pages/public/forgetPassword?edit=true')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">修改密码</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!-- <view class="list-cell b-b" @click="navTo('/pages/share/share')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">分享好友</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		<view class="list-cell b-b" @click="navTo('/pages/callCenter/callCenter')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">联系客服</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="goLogoff" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">注销账号</text>
			<text class="cell-more yticon icon-you"></text>
		</view>

		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>

<script>
	import ApiClinet from "@/services/api-clinet";
	import ApiConfig from "@/config/api.config";
	export default {
		data() {
			return {
				 userInfo: {}, 
			};
		},
		onShow(){
			/**获取个人信息* */
			this.memberInfo();
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
			memberInfo() {
				ApiClinet.get(ApiConfig.APP_BASE_API.memberDetail).then((res) => {
					if (res.data.code == '200') {
					   this.userInfo = res.data.data;
					}
				})
			},
			goLogoff(){
				uni.showModal({
				    content: '确定注销账户吗？',
				    success: (e)=>{
				    	if(e.confirm){
							this.goLogoffData();
				    	}
				    }
				});
			},
			goLogoffData() {
				ApiClinet.post(ApiConfig.APP_BASE_API.logoff).then((res) => {
					if (res.data.code == '200') {
					    uni.removeStorageSync('userInfo');
						this.$store.dispatch("auth/logout", {}).then(res => {
							uni.reLaunch({
								url: '/pages/public/login'
							});
						})
					}else{
						this.$api.msg(res.data.msg)
					}
				})
			}

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
		.user-icon-pic {
			width: 80upx;
			height:80upx;
			border-radius: 80upx;
		}
	}
</style>
