<template>
	<view class="container">
		<view class="notice-item" v-for="(item, index) in newsList" :key="index">
			<view class="notice-title flex">
				<!-- <img v-if="item.type == '1'" src="https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/c58ce5b782f34b53b0c51ebaeb77a196_mergeImage.png"/>
				<img v-if="item.type == '3'" src="https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/590a2c6aef3040afa32f0f81c570be7d_mergeImage.png"/>
				<img v-if="item.type == '2'" src="https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/a5fe67a4e51a40a98c7c2206443500ca_mergeImage.png"/> -->
				<view>{{item.title}}</view>
				<view class="notice-date flex1">{{formatDate(item.createTime)}}</view>
			</view>
			<view class="notice-content">{{item.content}}</view>
		</view>
		<view v-if="showTotal" class="showTotal">没有更多数据了~</view>
	</view>
</template>

<script>
	import ApiClinet from "@/services/api-clinet";
	import ApiConfig from "@/config/api.config";
	import { formatDate } from "@/utils/prototype/date"
	export default {
		data() {
			return {
				newsList: [],
				params:{
					page: 0,
					size: 10
			    },
				showTotal: false,
			}
			
		},
		onLoad(){
			this.getNewsData();
			this.noticeMsgRead();
		},
		methods: {
			formatDate,
			getNewsData(){
				ApiClinet.get(ApiConfig.APP_BASE_API.noticeList, this.params).then((res) => {
					if (res.data.code == '200') {
					   this.newsList = res.data.data.records || [];
					   this.total = Math.ceil(res.data.total / this.params.size);
					}
				})
			},
			noticeMsgRead(){
				ApiClinet.delete(ApiConfig.APP_BASE_API.noticeMsg).then((res) => {
					if (res.data.code == '200') {
					  
					}
				})
			}
		},
		onReachBottom() {
		    if (this.params.page >= this.total) {
				this.showTotal=true//已经滑到底的提醒
				return false;
			}
			this.params.page ++;
			this.getNewsData()
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #F6F6F6;
		padding-bottom: 30upx;
	}
.container{
	padding: 24upx 24upx 0 24upx;
}
	.notice-item {
		padding:24upx;
		background-color: #fff;
		border-radius: 16upx;
		margin-bottom: 20upx;
		.notice-title{
			align-items: center;
			height:60upx;
			color: rgba(51, 51, 51, 1);
			font-size: 32upx;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			img{
				width:52upx;
				height:52upx;
				margin-right: 20upx;
			}
			.notice-date{
				color: rgba(153, 153, 153, 1);
                font-size: 24upx;
				text-align: right;
			}
		}
		.notice-content{
			color: rgba(102, 102, 102, 1);
			font-size: 28upx;
			font-family: PingFangSC-Regular;
			margin-top:20upx;
		}
	}
	.showTotal{
		text-align: center;
		line-height: 60upx;
		font-size:28upx;
	}
</style>
