<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image
							:src="item.src" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="introduce-section">
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{toStringHandle(detailObj.price)}}</text>
				<!-- <text class="m-price">¥488</text> -->
				<!-- <text class="coupon-tip">7折</text> -->
			</view>
			<text class="title">{{detailObj.name}}-{{detailObj.detail}}</text>
			<!-- <view class="bot-row">
				<text>销量: 108</text>
				<text>库存: 4690</text>
				<text>浏览量: 768</text>
			</view> -->
		</view>
		<view class="buy-row">
			<view class="buy-row-title">购买数量</view>
			<uni-number-box 
					class="step"
					:min="1" 
					:max="detailObj.stock"
					:value="detailObj.number>detailObj.stock?detailObj.stock:detailObj.number"
					:isMax="detailObj.number>=detailObj.stock?true:false"
					:isMin="detailObj.number===1"
					@eventChange="numberChange">
					</uni-number-box>
		</view>
		
		<!--  分享 -->
		<!-- <view class="share-section" @click="share">
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				 返
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享
				<text class="yticon icon-you"></text>
			</view>
			
		</view> -->
		
		<!-- <view class="c-list">
			<view class="c-row b-b" @click="toggleSpec">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
						{{sItem.name}}
					</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b">
				<text class="tit">优惠券</text>
				<text class="con t-r red">领取优惠券</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b">
				<text class="tit">促销活动</text>
				<view class="con-list">
					<text>新人首单送20元无门槛代金券</text>
					<text>订单满50减10</text>
					<text>订单满100减30</text>
					<text>单笔购买满两件免邮费</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>7天无理由退换货 ·</text>
					<text>假一赔十 ·</text>
				</view>
			</view>
		</view> -->
		
		<!-- 评价 -->
		<!-- <view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<text class="yticon icon-you"></text>
			</view> 
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view> -->
		
		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<!-- <rich-text :nodes="desc"></rich-text> -->
			<view v-for="(item,index) in imgList" :key="index">
				<image style="width:100%;" :src="item.src" class="loaded" mode="widthFix"></image>
			</view>
		</view>
		
		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<!-- <view @click="goCart" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
			</view> -->
			<!-- <view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view> -->
			
			<view class="action-btn-group">
				<!-- <button type="primary" class=" action-btn no-border add-cart-btn" @click="goCart">加入购物车</button> -->
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即购买</button>
			</view>
		</view>
		
		
		<!-- 规格-模态层弹窗 -->
		<!-- <view 
			class="popup spec" 
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec"
		>
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image src="https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"></image>
					<view class="right">
						<text class="price">¥328.00</text>
						<text class="stock">库存：188件</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.name}}
							</text>
						</view>
					</view>
				</view>
				<view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text>{{item.name}}</text>
					<view class="item-list">
						<text 
							v-for="(childItem, childIndex) in specChildList" 
							v-if="childItem.pid === item.id"
							:key="childIndex" class="tit"
							:class="{selected: childItem.selected}"
							@click="selectSpec(childIndex, childItem.pid)"
						>
							{{childItem.name}}
						</text>
					</view>
				</view>
				<button class="btn" @click="toggleSpec">完成</button>
			</view>
		</view> -->
		<!-- 分享 -->
		<!-- <share 
			ref="share" 
			:contentHeight="580"
			:shareList="shareList"
		></share> -->
	</view>
</template>

<script>
	import share from '@/components/share';
	import uniNumberBox from '@/components/uni-number-box.vue'

	import ApiClinet from "@/services/api-clinet";
	// import ApiConfig from "@/config/api.config";
	import AppConfig from "@/config/app.config";
	import { toStringHandle } from "@/utils/price.js";
	export default{
		components: {
			share,
			uniNumberBox
		},
		data() {
			return {
				specClass: 'none',
				specSelected:[],
				
				favorite: true,
				shareList: [],
				imgList: [
					
				],
				detailObj: {
					number: 1
				},
			};
		},
		async onLoad(options){
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			this.id = options.id;
			this.getGoodDetail(this.id)
		},
		methods:{
			toStringHandle,
			getGoodDetail(id){
				ApiClinet.get(`${AppConfig.ANDROID_URL}/api/app/product/${id}`, {}).then((res) => {
					if (res.data.code == '200') {
					   this.detailObj = res.data.data;
					   this.$set(this.detailObj, 'number', 1)
					   let listImg = this.detailObj.images && this.detailObj.images.split(',');
					   listImg.map(item=>{
						 let obj = {};
						 obj.src = item;
						 this.imgList.push(obj);
					   })
					   console.log('this.imgList', this.detailObj)
					//    item.images = typeof(item.images)=='string'?item.images.split(','):item.images;
					}
				})
			},
			// //规格弹窗开关
			// toggleSpec() {
			// 	if(this.specClass === 'show'){
			// 		this.specClass = 'hide';
			// 		setTimeout(() => {
			// 			this.specClass = 'none';
			// 		}, 250);
			// 	}else if(this.specClass === 'none'){
			// 		this.specClass = 'show';
			// 	}
			// },
			// //选择规格
			// selectSpec(index, pid){
			// 	let list = this.specChildList;
			// 	list.forEach(item=>{
			// 		if(item.pid === pid){
			// 			this.$set(item, 'selected', false);
			// 		}
			// 	})

			// 	this.$set(list[index], 'selected', true);
			// 	//存储已选择
			// 	/**
			// 	 * 修复选择规格存储错误
			// 	 * 将这几行代码替换即可
			// 	 * 选择的规格存放在specSelected中
			// 	 */
			// 	this.specSelected = []; 
			// 	list.forEach(item=>{ 
			// 		if(item.selected === true){ 
			// 			this.specSelected.push(item); 
			// 		} 
			// 	})
				
			// },
			// //分享
			// share(){
			// 	this.$refs.share.toggleMask();	
			// },
			// //收藏
			// toFavorite(){
			// 	this.favorite = !this.favorite;
			// },
			buy(){
				uni.navigateTo({
					url: `/pages/order/createOrder?id=${this.id}&number=${this.detailObj.number}`
				})
			},
			// goCart(){
			// 	uni.navigateTo({
			// 		url: `/pages/cart/cart`
			// 	})
			// },
			stopPrevent(){},
			//数量
			numberChange(data){
				this.detailObj.number = data.number;
			},
		},

	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 722upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		
		.title{
			font-size: 32upx;
			color: #000000;
			height: 50upx;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:#FF478C;
		}
		.price{
			font-size: 32upx;
			font-weight: 700;
		}
		.m-price{
			margin:0 12upx;
			color: #999999;
			font-size:24upx;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
	}
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}
	
	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;
		.e-header{
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.tit{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}
			.tip{
				flex: 1;
				text-align: right;
			}
			.icon-you{
				margin-left: 10upx;
			}
		}
	}
	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			.con{
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
	}
	/**购买数量** */
	.buy-row{
		height:110upx;
		width:100%;
		background-color: #ffffff;
		margin-top: 20upx;
		display: flex;
		align-items: center;
		padding: 0 28upx;
		.buy-row-title{
			flex: 1;
			font-size: 28upx;
			color: #333333;
		}
		/deep/.uni-numbox{
           position: relative;
		   left:0;
		   height:52upx;
		   width:186upx;
		   background: #ffffff;
		   .uni-numbox-minus{
				background: #ffffff;
				line-height:52upx;
				 border: 1upx solid #EBEBEB;
				 .yticon{
					 font-size: 28upx;
				 }
		   }
		   .uni-numbox-value{
				background: #ffffff;
				height:52upx;
				border-top: 1upx solid #EBEBEB;
				border-bottom: 1upx solid #EBEBEB;
		   }
		   .uni-numbox-plus{
				background: #ffffff;
				line-height:52upx;
				border: 1upx solid #EBEBEB;
				.yticon{
					 font-size: 28upx;
				 }
		   }
     	}	
	}
	/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
				
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
	}
	
	
	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .yticon{
				color: $uni-color-primary;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
		.action-btn-group{
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30,#fa436a,#F56C6C);
			margin-left: 380upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
	
	
</style>
