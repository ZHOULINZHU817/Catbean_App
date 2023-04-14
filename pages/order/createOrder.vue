<template>
	<view>
		<!-- 地址 -->
		<navigator url="/pages/address/address?source=1" class="address-section">
			<view class="order-content">
				<!-- <text class="yticon icon-shouhuodizhi"></text> -->
				<view class="cen">
					<view class="top">
						<text class="name">{{addressData.receiver}}</text>
						<text class="mobile">{{addressData.phone}}</text>
						<text class="tips" v-if="addressData.first">默认</text>
					</view>
					<text class="address">{{addressData.address}}</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>

		</navigator>

		<view class="goods-section">
			<!-- <view class="g-header b-b">
				<image class="logo" src="http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png"></image>
				<text class="name">西城小店铺</text>
			</view> -->
			<!-- 商品列表 -->
			<view class="g-item">
				<image :src="detailObj.images"></image>
				<view class="right">
					<text class="title clamp">{{detailObj.name}}-{{detailObj.detail}}</text>
				</view>
				<view class="price-box">
					<view class="price">￥{{toStringHandle(detailObj.price)}}</view>
					<view class="number">x {{detailObj.number}}</view>
				</view>
			</view>
			<!-- <view class="g-item">
				<image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg"></image>
				<view class="right">
					<text class="title clamp">韩版于是洞洞拖鞋 夏季浴室防滑简约居家【新人专享，限选意见】</text>
					<text class="spec">春装款 L</text>
					<view class="price-box">
						<text class="price">￥17.8</text>
						<text class="number">x 1</text>
					</view>
				</view>
			</view> -->
		</view>

		<!-- 优惠明细 -->
		<!-- <view class="yt-list">
			<view class="yt-list-cell b-b" @click="toggleMask('show')">
				<view class="cell-icon">
					券
				</view>
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip active">
					选择优惠券
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</view>
			<view class="yt-list-cell b-b">
				<view class="cell-icon hb">
					减
				</view>
				<text class="cell-tit clamp">商家促销</text>
				<text class="cell-tip disabled">暂无可用优惠</text>
			</view>
		</view> -->
		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip">￥{{toStringHandle(detailObj.price)}}</text>
			</view>
			<!-- <view class="yt-list-cell b-b">
				<text class="cell-tit clamp">优惠金额</text>
				<text class="cell-tip red">-￥35</text>
			</view> -->
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">配送方式</text>
				<text class="cell-tip">快递送货</text>
			</view>
			<!-- <view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view> -->
		</view>
		
		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>合计：</text>
				<text class="price-tip">￥</text>
				<text class="price">{{toStringHandle(allPrice)}}</text>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>
		
		<!-- 优惠券面板 -->
		<!-- <view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
					<view class="con">
						<view class="left">
							<text class="title">{{item.title}}</text>
							<text class="time">有效期至2019-06-30</text>
						</view>
						<view class="right">
							<text class="price">{{item.price}}</text>
							<text>满30可用</text>
						</view>
						
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<text class="tips">限新用户使用</text>
				</view>
			</view>
		</view> -->

	</view>
</template>

<script>
    import ApiClinet from "@/services/api-clinet";
	import ApiConfig from "@/config/api.config";
	import AppConfig from "@/config/app.config";
	import { toStringHandle } from "@/utils/price.js";
	export default {
		data() {
			return {
				maskState: 0, //优惠券面板显示状态
				desc: '', //备注
				payType: 1, //1微信 2支付宝
				couponList: [
					{
						title: '新用户专享优惠券',
						price: 5,
					},
					{
						title: '庆五一发一波优惠券',
						price: 10,
					},
					{
						title: '优惠券优惠券优惠券优惠券',
						price: 15,
					}
				],
				addressData: {
					name: '许小星',
					mobile: '13853989563',
					addressName: '金九大道',
					address: '山东省济南市历城区',
					area: '149号',
					default: false,
				},
				detailObj: {
					number: 1
				},
				allPrice: 0,
			}
		},
		onLoad(options){
			//商品数据
			//let data = JSON.parse(option.data);
			//console.log(data);
			this.id = options.id;
			if(options.number){
				this.number = options.number*1;
				this.getGoodDetail(this.id);
				/**获取收货地址* */
				this.getAddressList();
			}else{
				this.getOrderDetail(this.id)
			}
		},
		methods: {
			toStringHandle,
			//显示优惠券面板
			toggleMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(()=>{
					this.maskState = state;
				}, timer)
			},
			numberChange(data) {
				this.number = data.number;
			},
			// changePayType(type){
			// 	this.payType = type;
			// },
			submit(){
				let params = {
					productId: this.id,
					productNum: this.detailObj.number,
					receiveAddressId: this.addressData && this.addressData.id,
					payType: 'cat_food'
				}
				ApiClinet.post(ApiConfig.APP_BASE_API.recordGoodBuy, params).then((res) => {
					if (res.data.code == '200') {
						uni.navigateTo({
							url: `/pages/order/order?state=0`
						})
					}else{
						this.$api.msg(res.data.msg)
					}
				})
			},
			stopPrevent(){

			},
			getGoodDetail(id){
				ApiClinet.get(`${AppConfig.ANDROID_URL}/api/app/product/${id}`, {}).then((res) => {
					if (res.data.code == '200') {
					   this.detailObj = res.data.data;
					   this.detailObj.number = this.number;
					   this.detailObj.images = this.detailObj.images && this.detailObj.images.split(',')[0];
					   this.allPrice = (this.detailObj.number*this.detailObj.price).toFixed(2)
					}
				})
			},
			getAddressList(){
				ApiClinet.get(ApiConfig.APP_BASE_API.addressList, {}).then((res) => {
					if (res.data.code == '200') {
					   this.addressList = res.data.data || [];
					   let addressList = this.addressList.filter(item=> item.first);
					   if(addressList.length>0){
						this.addressData  = addressList[0]
					   }else{
						this.addressData = this.addressList[0];
					   }
					   
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F6F6F6;
		padding-bottom: 100upx;
	}

	.address-section {
		padding: 24upx 24upx 0 24upx;
		position: relative;
		.order-content {
			display: flex;
			background: #fff;
			align-items: center;
			padding:24upx;
			border-radius: 16upx;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: #999999;
		}
		.tips{
			background-color: #FF478C;
			font-size:18upx;
			color:#ffffff;
			padding:2upx;
			margin-left:8upx;
			border-radius: 4upx;
		}

		.name {
			font-size: 30upx;
			margin-right: 24upx;
			color:#000000;
			font-weight: 700;
		}
		

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: #333333;
			font-size:26upx;
		}

		.icon-you {
			font-size: 22upx;
			color: #999999;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		padding-bottom: 1px;
        padding:0 24upx;
		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			// margin: 20upx 30upx;
			padding: 24upx;
			background: #fff;
			border-radius: 16upx;
			image {
				flex-shrink: 0;
				display: block;
				width: 180upx;
				height: 180upx;
				border-radius: 16upx;
			}

			.right {
				width:50%;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 28upx;
				color: #000000;
			}

			.price-box {
				font-size: 28upx;
				color: #333333;
				flex:1;
				text-align: right;
				.price {
					margin-bottom: 4upx;
				}
				.number{
					font-size: 24upx;
					color: #999999;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}
	.yt-list {
		margin-top: 16upx;
		margin: 16upx 24upx 0 24upx;
		background: #fff;
		border-radius: 16upx;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 24upx;
		line-height: 60upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 28upx;
			color:#333333;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 28upx;
			color: #000000;
			font-weight: 700;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}
			&.red{
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}
	
	/* 支付列表 */
	.pay-list{
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;
		.pay-item{
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;	
			position: relative;
		}
		.icon-weixinzhifu{
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}
		.icon-alipay{
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}
		.icon-xuanzhong2{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}
		.tit{
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}
	
	.footer{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 104upx;
		justify-content: space-between;
		font-size: 28upx;
		background-color: #fff;
		z-index: 998;
		color: #666666;
		box-shadow: 0 -1px 5px rgba(0,0,0,.1);
		.price-content{
			padding-left: 30upx;
		}
		.price-tip{
			color:#FF478C;
			margin-left: 8upx;
			font-size:26upx;
			font-weight: 700;
		}
		.price{
			font-size: 40upx;
			color: #FF478C;
			font-weight: 700;
		}
		.submit{
			// display:flex;
			// align-items:center;
			// justify-content: center;
			// width: 280upx;
			// height: 100%;
			color: #fff;
			font-size: 28upx;
			// background-color: $base-color;
			background-image: linear-gradient(
				90deg,
				rgba(255, 104, 166, 1) 0,
				rgba(255, 71, 140, 1) 100%
			);
			border-radius: 50upx;
			padding: 18upx 50upx 18upx 50upx;
			margin-right: 20upx;
			font-weight: 700;
		}
	}
	
	/* 优惠券面板 */
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;
		
		.mask-content{
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y:scroll;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.mask-content{
				transform: translateY(0);
			}
		}
	}

</style>
