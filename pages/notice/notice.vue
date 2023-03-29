<template>
	<view class="container">
		<view class="notice-item" v-for="(item, index) in newsList" :key="index">
			<view class="notice-title flex">
				<img v-if="item.type == '1'" src="https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/c58ce5b782f34b53b0c51ebaeb77a196_mergeImage.png"/>
				<img v-if="item.type == '3'" src="https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/590a2c6aef3040afa32f0f81c570be7d_mergeImage.png"/>
				<img v-if="item.type == '2'" src="https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/a5fe67a4e51a40a98c7c2206443500ca_mergeImage.png"/>
				<view>{{item.title}}</view>
				<view class="notice-date flex1">{{item.date}}</view>
			</view>
			<view class="notice-content">{{item.content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsList: [
					{
						title:"公告消息",
						type: "1",
						content:'公告消息公告消息公告消息公告消息公告消息',
						date:'2023-03-02'
					},
					{
						title:"提现消息",
						type: "2",
						content:'您的提现申请已通过！',
						date:'2023-03-02'
					},
					{
						title:"预约成功通知",
						type: "3",
						content:'您预约的12:00场次已通过！',
						date:'2023-03-02'
					},
					{
						title:"公告消息",
						type: "1",
						content:'公告消息公告消息公告消公告消息公告消息公告消息公告消息公告消息公告消息公告消息公告消息公告消息公告消息公告消息公告消息公告消息公告消息公告消息息公告消息公告消息',
						date:'2023-03-02'
					}
				]
			}
		},
		methods: {

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
</style>
