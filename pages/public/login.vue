<template>
	<view class="container">
		<!-- <view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view> -->
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<!-- <view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view> -->
			<view class="cat-logo">
				<img class="cat-logo-img" src="@/static/cat.png"/>
			</view>
			<view class="cat-logo">
				<view class="cat-logo-title">欢迎来到布偶猫舍</view>
			</view>
			<view class="input-content">
				<view class="input-item">
					<!-- <text class="tit">手机号码</text> -->
					<input 
						type="number" 
						:value="phone" 
						placeholder="请输入手机号码"
						maxlength="11"
						data-key="phone"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<!-- <text class="tit">密码</text> -->
					<input 
						:value="pwd" 
						placeholder="请输入密码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="pwd"
						@input="inputChange"
					/>
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			<view class="forget-section">
				<!-- <text class="login-btn" @click="toRegist">注册</text> -->
				<text class="login-btn" @click="forgetPassword">忘记密码?</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {  
        mapMutations  
    } from 'vuex';
	
	export default{
		data(){
			return {
				phone: '',
				pwd: '',
				logining: false
			}
		},
		onLoad(){
			
		},
		methods: {
			// ...mapMutations(['login']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();
			},
			toRegist(){
				uni.navigateTo({
					url: `/pages/public/signIn`
				})
			},
			forgetPassword(){
				uni.navigateTo({
					url: `/pages/public/forgetPassword`
				})
			},
			async toLogin(){
				// this.logining = true;
				const {phone, pwd} = this;
				/* 数据验证模块
				if(!this.$api.match({
					mobile,
					password
				})){
					this.logining = false;
					return;
				}
				*/

				const sendData = {
					phone,
					pwd
				};
				// this.login(sendData);
				// const result = await this.$api.json('userInfo');
				// if(result.status === 1){
				// 	this.login(sendData);
                    
				// }else{
				// 	this.$api.msg(result.msg);
				// 	this.logining = false;
				// }

				this.$store.dispatch("auth/login", sendData).then(res => {
					uni.switchTab({
						url: '/pages/index/index'
					})
				})
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 100upx;
		position:relative;
		width: 100vw;
		height: 90vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		// background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		border-bottom: 1px solid #F6F6F6;
		// margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}


	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 80upx;
		background-image: linear-gradient(
			90deg,
			rgba(255, 104, 166, 1) 0,
			rgba(255, 71, 140, 1) 100%
		);
		color: #fff;
		font-size:28upx;
		font-weight: 700;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: 28upx;
		color: #666666;
		text-align: right;
		margin-top: 40upx;
		.login-btn{
			padding:0 80upx;
		}
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
	.cat-logo{
		display: flex;
		justify-content: center;
		.cat-logo-img{
			height: 80upx;
		    width:80upx;
			margin-bottom: 22upx;
		}
		.cat-logo-title{
			font-size:34upx;
			color:#000000;
			font-weight: 700;
			margin-bottom: 60upx;
		}
	}
	/deep/.uni-input-placeholder{
		color: #B8B8B8;
	}
</style>
