<template>
	<view class="content b-t">
		<view class="list" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="u-box">
					<text class="name">{{item.receiver}}</text>
					<text class="mobile">{{item.phone}}</text>
					<text v-if="item.first" class="tag">默认</text>
				</view>
				<view class="address-box">
					<text class="address">{{item.address}}</text>
				</view>
			</view>
			<text class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
			<text class="yticon icon-iconfontshanchu1" @click.stop="deleteAddress(item)"></text>
			<view></view>
		</view>
		<!-- <text style="display:block;padding: 16upx 30upx 10upx;lihe-height: 1.6;color: #fa436a;font-size: 24upx;">
			重要：添加和修改地址回调仅增加了一条数据做演示，实际开发中将回调改为请求后端接口刷新一下列表即可
		</text> -->
		
		<button class="add-btn" @click="addAddress('add')"><text class="yticon icon-jia1"></text>添加收货地址</button>
	</view>
</template>

<script>
    import ApiClinet from "@/services/api-clinet";
	import ApiConfig from "@/config/api.config";
	export default {
		data() {
			return {
				source: 0,
				addressList: []
			}
		},
		onLoad(option){
			console.log(option.source);
			this.source = option.source;

			this.getAddressList();
		},
		methods: {
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);
				
				console.log(data, type);
			},
			deleteAddress(params){
				ApiClinet.delete(`${ApiConfig.APP_BASE_API.address}?id=${params.id}`).then((res) => {
					if (res.data.code == '200') {
					   this.$api.msg('删除成功！')
					   this.getAddressList();
					}
				})
			},
			getAddressList(){
				ApiClinet.get(ApiConfig.APP_BASE_API.addressList, {}).then((res) => {
					if (res.data.code == '200') {
					   this.addressList = res.data.data || [];
					}
				})
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
		background-color: #F6F6F6;
	}
	.content{
		position: relative;
		padding:24upx 24upx 0 24upx;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
		border-radius: 16upx;
		margin-bottom: 20upx;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		.address{
			font-size: 26upx;
			color:#333333;
		}
	}
	.u-box{
		font-size: 28upx;
		color: #999999;
		margin-bottom: 16upx;
		.name{
			margin-right: 30upx;
			font-size: 30upx;
			color:#000000;
		}
		.tag{
			font-size: 20upx;
			color: #fff;
			margin-left: 10upx;
			background: #FF478C;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
	}
	.icon-bianji, .icon-iconfontshanchu1{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 60upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 632upx;
		height: 92upx;
		font-size: 30upx;
		color: #fff;	
		background-image: linear-gradient(90deg, rgba(255, 104, 166, 1) 0,rgba(255, 71, 140, 1) 100%);
		border-radius: 46upx;	
	}
</style>
