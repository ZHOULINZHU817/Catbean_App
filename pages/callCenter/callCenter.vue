<template>
	<view class="container">
		<!-- <w-qrcode class="qrcode" ref="qrcode" :options="options"></w-qrcode> -->
    <image class="qrcode" :src="callImg" ></image>
	</view>
</template>

<script>
	import ApiClinet from "@/services/api-clinet";
	import ApiConfig from "@/config/api.config";
	export default {
		data() {
			return {
				callImg:''
			};
		},
		onLoad(){
			/**获取个人信息* */
			this.getAppInfo()
		},
		methods:{
      getAppInfo(){
        ApiClinet.get(ApiConfig.APP_BASE_API.appInfo).then((res) => {
            if (res.data.code == '200') {
              this.callImg = res.data.data.customer_service;
              console.log('+++++',this.callImg )
            }
        })
      }
		}
	}
</script>

<style lang='scss'>
page{
  background: url(@/static/kefu.png) 100% no-repeat;
  background-size: 100% 100%;
}
.container{
  position: relative;
  width: 100vw;
  height: 93vh;
  .qrcode{
    position: absolute;
    right:20%;
    bottom: 20%;
    width:460upx;
    height:460upx;
  }
}

</style>
