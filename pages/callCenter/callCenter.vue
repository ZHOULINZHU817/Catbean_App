<template>
	<view class="container">
		<w-qrcode class="qrcode" ref="qrcode" :options="options"></w-qrcode>
	</view>
</template>

<script>
	import ApiClinet from "@/services/api-clinet";
	import ApiConfig from "@/config/api.config";
	export default {
		data() {
			return {
				options: {
                    code:'22',
                    size:'460',
                    img: {// 二维码log配置 非必传
                        src: '../../static/cat.png', // 图片地址
                        size: 100,// 图片大小
                        degree: 15,// 圆角大小 如果type为round生效
                        type: 'round',//图片展示类型 默认none 可选值  round圆角  circle圆 如果为round 可以传入degree设置圆角大小 默认 5
                        color: '#ffffff', //图片周围的白色边框
                        width: 8 //图片周围白色边框的宽度 默认5
                    },
                }
			};
		},
		onLoad(){
			/**获取个人信息* */
			
		},
		methods:{
			

		}
	}
</script>

<style lang='scss'>
page{
    background: $page-color-base;
}
.container{
  position: relative;
  width: 100vw;
  height: 93vh;
  background: url(@/static/kefu.png) 100% no-repeat;
  background-size: 100% 100%;
  .qrcode{
    position: absolute;
    right:20%;
    bottom: 20%;;
  }
}

</style>
