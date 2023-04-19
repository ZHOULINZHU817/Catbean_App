<template>
	<view class="content">
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
					@scrolltolower="getLoadData"
				>
					<!-- 空白页 -->
					<empty v-if="panicBuyList.length === 0"></empty>
					
					<!-- 订单列表 -->
					<view class="order-content" v-if="form.status">
						<view 
							v-for="(item,index) in panicBuyList" :key="index"
							class="order-item"
						> 
							<view class="order-item-f">
								<view class="order-item-fl"><text>订单编号：</text>{{item.orderNo}}</view>
								<view class="order-item-fr" :style="{color:orderStatusNameExp(item.status).stateTipColor}">{{orderStatusNameExp(item.status).stateTip}}</view>
							</view>
							<!-- <view class="order-item-text"><text>预约时间：</text>{{item.handlerDate}}</view> -->
							<view class="order-item-text"><text>场次：</text>{{typeList[item.saleOrder && item.saleOrder.type]}}</view>
							<view class="order-item-text"><text>价格：</text>{{item.saleOrder && item.saleOrder.price}}</view>
							<view class="order-item-text"><text>流拍次数：</text>{{item.saleOrder && item.saleOrder.missCnt}}</view>
							<view class="order-item-text"><text>违约次数：</text>{{item.saleOrder && item.saleOrder.breachCnt}}</view>
							<view class="order-item-text"><text>抢中时间：</text>{{formatDate(item.actBuyTime)}}</view>
							<view v-if="item.status=='resell'" class="order-item-text"><text>转卖人：</text>{{item.member && item.member.name}}</view>
							<view v-if="item.status=='paid'" class="order-item-text margin-b-20"><text>可转卖时间：{{formatDate(endTimeData(item.saleOrder && item.saleOrder.endBuyTime))}}</text>
							<!-- <count-down
								class="down"
								:endTime="endTimeData(item.saleOrder && item.saleOrder.endBuyTime)"
								:endText="endText"
							/> -->
							</view>
							<view v-if="item.status=='buying'" class="order-item-btn">
								<view class="flex1"></view>
								<view class="order-item-btn1" @click="payOrder(item)">立即支付</view>
							</view>
							<view v-if="item.status=='paid'" class="order-item-btn">
								<view class="flex1"></view>
								<view class="order-item-btn1" @click="pickOrder(item)">提货</view>
								<view :class="resellTime(item)?'order-item-btn1':'order-item-btn2'" @click="resellOrder(item)">立即转卖</view>
							</view>
							<!-- <view v-if="item.status=='resell'" class="order-item-btn">
								<view class="flex1"></view>
								<view class="order-item-btn1" @click="pickOrder(item)">提货</view>
							</view> -->
						</view>
					</view>
					<view class="order-content" v-else>
						<view 
							v-for="(item,index) in panicBuyList" :key="index"
							class="order-item"
						> 
							<view class="order-item-f">
								<view class="order-item-fl"><text>订单编号：</text>{{item.id}}</view>
								<view class="order-item-fr" :style="{color:orderStatus(item.status).stateTipColor}">{{orderStatus(item.status).stateTip}}</view>
							</view>
							<view class="order-item-text"><text>预约时间：</text>{{formatDate(item.reserveDate)}}</view>
							<view class="order-item-text"><text>场次：</text>{{typeList[item.type]}}</view>
							<view class="order-item-text"><text>预约次数：</text>{{item.cnt}}</view>
							<view class="order-item-text"><text>抢中数量：</text>{{item.buyNum|| '--'}}</view>
						</view>
					</view>
					<!-- <uni-load-more :status="tabItem.loadingType"></uni-load-more> -->
					<view v-if="showTotal" class="showTotal">没有更多数据了~</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!------密码弹窗------->
        <jp-pwd ref="jpPwd" :contents="''" :msg="msg" @completed="completed" @forget="forget" ></jp-pwd>
	</view>
</template> 

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	// import Json from '@/Json';
	import { formatDate } from "@/utils/prototype/date";
	let statusList = ["","buying", "paid", "resell", "breach", "finish"];
	import ApiClinet from "@/services/api-clinet";
	import ApiConfig from "@/config/api.config";
	import AppConfig from "@/config/app.config";
	//twelve sixteen twelve
	let typeList = {
		twelve: '12:00场',
		sixteen: '16:00场',
		twenty: '20:00场',
	}
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				panicBuyList: [],
				navList: [
					{
						state: 0,
						text: '已预约',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '已抢中',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '已支付',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '转卖中',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						text: '已违约',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 5,
						text: '已完成',
						loadingType: 'more',
						orderList: []
					}
				],
				form: {
					status: "", //audit, finish, reject
					page: 0,
					size: 10,
				},
				showTotal: false,
				msg:"",
				typeList: typeList,
				endTime: '',
                endText: "0",
			};
		},
		
		onLoad(options){
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = +options.state;
			this.form.status = statusList[options.state];
			if(this.form.status){
				this.loadData();
			}else{
				this.loadAppointmentData();
			}
			
		},
		 
		methods: {
			formatDate,
			endTimeData(data){
             let dateNew = data + 24*60*60*1000;
			 return dateNew;
			//  this.endTime = dateNew / 1000 + " "
			//  console.log('data', this.endTime)
            //  return this.endTime
			},
			//获取订单列表
			loadData(source){
				ApiClinet.get(ApiConfig.APP_BASE_API.recordBuyList, this.form).then((res) => {
					if (res.data.code == '200') {
						this.panicBuyList = this.panicBuyList.concat(res.data.data.records || []);
						this.total = Math.ceil(res.data.data.total / this.form.size);
					}
				})
			}, 
            //获取预约订单
			loadAppointmentData(){
				ApiClinet.get(ApiConfig.APP_BASE_API.reserveList, this.form).then((res) => {
					if (res.data.code == '200') {
						this.panicBuyList = this.panicBuyList.concat(res.data.data.records || []);
						this.total = Math.ceil(res.data.data.total / this.form.size);
					}
				})
			},
			//swiper 切换
			changeTab(e){
				this.tabCurrentIndex = e.target.current;
				this.showTotal = false;
				this.panicBuyList = [];
				this.form.page = 0;
				this.form.status = statusList[this.tabCurrentIndex];
				if(this.form.status){
					this.loadData();
				}else{
					this.loadAppointmentData();
				}
			},
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			//订单状态文字和颜色
			orderStatusNameExp(state){
				//	let statusList = ["buying", "paid", "resell", "breach", "finish"];
				let stateTip = '',
					stateTipColor = '#FF478C';
				switch(state){
					case 'buying':
						stateTip = '已抢中'; 
						break;
					case 'paid':
						stateTip = '已支付'; 
						break;
					case 'resell':
						stateTip = '转卖中'; 
						break;
					case 'breach':
						stateTip = '已违约'; 
						break;	
					case 'finish':
						stateTip = '已完成'; 
						stateTipColor = '#666666';
						break;
				}
				return {stateTip, stateTipColor};
			},
			/**预约字段值修改* */
			orderStatus(state){
				//	let statusList = ["buying", "paid", "resell", "breach", "finish"];
				//未分配 未中奖 已中奖
				let stateTip = '',
					stateTipColor = '#666666';
				switch(state){
					case 'no_begin':
						stateTip = '未分配'; 
						break;
					case 'no_win':
						stateTip = '未中奖'; 
						break;
					case 'winning':
						stateTip = '已中奖'; 
						stateTipColor = '#FF478C';
						break;
				}
				return {stateTip, stateTipColor};
			},
			//支付
			payOrder(item) {
				this.row = item;
				this.type = 'pay';
				this.msg = "";
				this.$refs.jpPwd.toOpen()
			},
			payOrderData(params){
				ApiClinet.post(`${AppConfig.ANDROID_URL}/api/app/order/pay`, params).then((res) => {
					if (res.data.code == '200') {
						this.panicBuyList = [];
						this.form.page = 0;
						this.$refs.jpPwd.toCancel()
						this.loadData();
					}else{
						this.msg = res.data.msg;
						this.$refs.jpPwd.backs()
					}
				})
			},
			//转卖
			resellOrder(item) { 
				if(!this.resellTime(item)){
					return this.$api.msg('未到可转卖时间')
				}
				this.row = item;
				this.type = 'resell';
				this.msg = "";
				this.$refs.jpPwd.toOpen()
			},
			resellOrderData(params){
				ApiClinet.post(`${AppConfig.ANDROID_URL}/api/app/order/sale`, params).then((res) => {
					if (res.data.code == '200') {
						this.panicBuyList = [];
						this.form.page = 0;
						this.$refs.jpPwd.toCancel()
						this.loadData();
					}else{
						this.msg = res.data.msg;
						this.$refs.jpPwd.backs()
					}
				})
			},
			//提货
			pickOrder(item) { 
				this.row = item;
				this.type = 'pick';
				this.msg = "";
				this.$refs.jpPwd.toOpen()
			},
			pickOrderData(params){
				ApiClinet.post(`${AppConfig.ANDROID_URL}/api/app/order/pickUp`, params).then((res) => {
					if (res.data.code == '200') {
						this.panicBuyList = [];
						this.form.page = 0;
						this.$refs.jpPwd.toCancel()
						this.loadData();
					}else{
						this.msg = res.data.msg;
						this.$refs.jpPwd.backs()
					}
				})
			},
			/***支付弹窗** */
			completed(e) {
				this.form.payPwd = e;
				let params = {
					id: this.row.id,
					payPwd: e
				}
				if(this.type == 'pay'){
					this.payOrderData(params);
				}
				if(this.type == 'resell'){
					this.resellOrderData(params);
				}
				if(this.type == 'pick'){
					this.pickOrderData(params);
				}
				// this.saveData();
			},
			forget() {
				uni.navigateTo({
					url: "/pages/payment/password",
				});
			},
			/**转卖按钮时间控制* */
			resellTime(item) {
				let time = new Date().getTime();
				if(time>item.actBuyTime+24*60*60*1000){
					return true;
				}else{
					return false;
				}
			},
			getLoadData(){
				if (this.form.page >= this.total) {
					this.showTotal=true//已经滑到底的提醒
					return false;
				}
				this.form.page ++;
				if(this.form.status){
					this.loadData();
				}else{
					this.loadAppointmentData();
				}
			}
		},
		onReachBottom() {
			
		}
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	.swiper-box{
		height: calc(100% - 40px);
		
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item{
		height: auto;
	}
	.order-content{
		padding: 24upx;
	}
	.order-item{
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 16upx;
		padding: 10upx 24upx;
		margin-bottom: 20upx;
		.order-item-f{
			display: flex;
			margin-bottom: 44upx;
			.order-item-fl{
				flex:1;
				font-size:28upx;
				color:#000000;
				text{
					font-weight: 700;
				}
			}
			.order-item-fr{
				font-size: 28upx;
			}
		}
		.order-item-text{
			font-size: 28upx;
			color:#333333;
			line-height: 60upx;
			text{
				color:#999999;
			}
		}
		.order-item-btn{
			display: flex;
			padding:28upx 0;
			border-top:1upx solid #f6f6f6;
			.order-item-btn1{
				background-image: linear-gradient(90deg,rgba(255, 104, 166, 1) 0,rgba(255, 71, 140, 1) 100%);
				border-radius: 32upx;
				padding: 8upx 30upx 8upx 30upx;
				color:#ffffff;
				font-size:26upx;
				margin-right: 20upx;
			}
			.order-item-btn2{
				border-radius: 32upx;
				padding: 8upx 30upx 8upx 30upx;
				color:#999999;
				font-size:26upx;
				background-color: #EBEBEB;
			}
		}
	}
	
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}

	.showTotal{
		text-align: center;
		line-height: 60upx;
		font-size:28upx;
		color:#999999;
	}
	.flex1{
		flex: 1;
	}
</style>
