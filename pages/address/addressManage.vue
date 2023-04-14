<template>
	<view class="content">
		<view class="padding-lr-30 bg-white">
            <view class="row b-b">
				<text class="tit">收货人</text>
				<input class="input" type="text" v-model="addressData.receiver" placeholder="收货人姓名" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">手机号码</text>
				<input class="input" type="number" v-model="addressData.phone" placeholder="收货人手机号码" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">所在地区</text>
				<view class="input" :class="addressData.addressName?'':'light-color'">
					<wangdingPickerAddress @change="addressChange">{{addressData.addressName || '请选择所在地区'}}</wangdingPickerAddress>
				</view>
			</view>
			<view class="row"> 
				<text class="tit">详细地址</text>
				<input class="input" type="text" v-model="addressData.address" placeholder="详细地址" placeholder-class="placeholder" />
			</view>
		</view>
		
		
		<view class="default-row padding-lr-30">
			<view class="flex row-center">
               <view class="tit flex1">设为默认</view>
			   <switch :checked="addressData.first" color="#FF478C" @change="switchChange" />
			</view>
			<view class="remind">提醒：每次下单会默认推荐使用该地址</view>
		</view>
		<button class="add-btn" @click="confirm">保存</button>
	</view>
</template>

<script>
	import wangdingPickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue';
	import ApiClinet from "@/services/api-clinet";
	import ApiConfig from "@/config/api.config";
	export default {
		components:{
            wangdingPickerAddress
        },
		data() {
			return {
				addressData: {
					addressName: null
				}
			}
		},
		onLoad(option){
			let title = '新建收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址';
				this.addressData = JSON.parse(option.data);
				this.addressData.addressName = `${this.addressData.province}${this.addressData.city}${this.addressData.area}`;
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				this.addressData.first = e.detail.value;
			},
			
			//地图选择地址
			addressChange(data) {
				console.log('data', data)
                let name = data.data.join('');
				this.addressData.province = data.data[0]
				this.addressData.city = data.data[1]
				this.addressData.area = data.data[2]
				this.$set(this.addressData, 'addressName', name);
				this.$set(this.addressData, 'address', null);
            },
			
			//提交
			confirm(){
				let data = this.addressData;
				if(!data.receiver){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phone)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(!data.addressName && this.manageType != 'edit'){
					this.$api.msg('请选择所在位置');
					return;
				}
				if(this.addressData.addressName){
					this.addressData.address = this.addressData.address? `${this.addressData.addressName}${this.addressData.address}`: this.addressData.addressName;
				}
				delete this.addressData.addressName;
				if(this.manageType == 'edit'){
                    ApiClinet.put(ApiConfig.APP_BASE_API.address, this.addressData).then((res) => {
						if (res.data.code == '200') {
						 this.$api.msg('地址修改成功')
						 uni.navigateTo({
							url: `/pages/address/address`
						 })
						}else{
							this.$api.msg(res.data.msg)
						}
					})
				}else{
                    ApiClinet.post(ApiConfig.APP_BASE_API.address, this.addressData).then((res) => {
						if (res.data.code == '200') {
						 this.$api.msg('地址添加成功')
						 uni.navigateTo({
							url: `/pages/address/address`
						 })
						}else{
							this.$api.msg(res.data.msg)
						}
					})
				}
				
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		height: 100upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 160upx;
			font-size: 28upx;
			color: #000000;
		}
		.input{
			flex: 1;
			font-size: 28upx;
			color: #999999;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
		.light-color{
			color: $font-color-light;
		}
	}
	.row-center{
	   align-items: center;
	   .tit{
			flex-shrink: 0;
			font-size: 26upx;
			color: $font-color-dark;
		}
	}
	.default-row{
		position: relative;
		background: #fff;
		margin-top: 16upx;
		.tit{
			flex: 1;
			font-size: 28upx;
			color: #000000;
		}
		switch{
			transform: translateX(16upx) scale(.7);
		}
		.remind{
			font-size:20upx;
			color:rgb(184, 180, 180);
			height:45upx;
			border-bottom: 1upx solid #E4E7ED;
		}
		.address-outside{
		   padding-top:30upx;
		   font-size:24upx;
		   color:$font-color-dark;
		   padding-bottom: 200upx;
		}
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
	.flex1{
		flex: 1;
	}
</style>
