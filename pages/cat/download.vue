<template>
	<view class="container">
    <view class="content">
      <view class="cont-code">
         <view class="cont-code-flex">
          <view class="code-flex">
            <w-qrcode class="qrcode" ref="qrcode" :options="options"></w-qrcode>
          </view>
          <view class="code-text">Android</view>
         </view>
         <view class="cont-code-flex">
          <view class="code-flex">
            <w-qrcode class="qrcodeIos" ref="qrcodeIos" :options="iosOptions"></w-qrcode>
          </view>
          <view class="code-text">IOS</view>
         </view>
      </view>
      <view class="code-tips">使用手机浏览器扫码下载</view>
    </view>
		
	</view>
</template>

<script>
	import ApiClinet from "@/services/api-clinet";
	import ApiConfig from "@/config/api.config";
	export default {
		data() {
			return {
				options: {
            code:'',
            size:'200',
            img: {// 二维码log配置 非必传
                src: '../../static/cat.png', // 图片地址
                size: 40,// 图片大小
                degree: 15,// 圆角大小 如果type为round生效
                type: 'round',//图片展示类型 默认none 可选值  round圆角  circle圆 如果为round 可以传入degree设置圆角大小 默认 5
                color: '#ffffff', //图片周围的白色边框
                width: 8 //图片周围白色边框的宽度 默认5
            },
          },
          iosOptions: {
            code:'00008877',
              size:'200',
              img: {// 二维码log配置 非必传
                  src: '../../static/cat.png', // 图片地址
                  size: 40,// 图片大小
                  degree: 15,// 圆角大小 如果type为round生效
                  type: 'round',//图片展示类型 默认none 可选值  round圆角  circle圆 如果为round 可以传入degree设置圆角大小 默认 5
                  color: '#ffffff', //图片周围的白色边框
                  width: 8 //图片周围白色边框的宽度 默认5
              },
          }
			};
		},
		onLoad(){
            document.querySelector('.uni-page-head-hd').style.display = 'none'
			/**获取个人信息* */
			this.getVersionLast();
		},
		methods:{
			getVersionLast(){
                let params = {
                    type: 'apk',
                }
                ApiClinet.get(ApiConfig.APP_BASE_API.versionLast, params).then((res) => {
                    if (res.data.code == '200') {
                        let url = res.data.data.url;
                       this.$set(this.options, 'code', url)
                    }
                })
            }
		}
	}
</script>

<style lang='scss'>
page{
    // background: $page-color-base;
  background: url(@/static/share_bg1.png) 100% no-repeat;
  background-size: 100% 100%;
}
.container{
  position: relative;
  width: 100vw;
  height: 93vh;
  .content{
    padding-top: 20upx;
    width: 680upx;
    height: auto;
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff4e8;
    border-radius: 16upx;
    .cont-code{
      width: 100%;
      display: flex;
      .cont-code-flex{
        flex:1;
        margin: 20upx;
        background-color: #fff4e8;
        text-align: center;
        .code-flex{
          display: flex;
          justify-content: center;
        }
        .code-text{
          font-size: 28upx;
          color:#666666;
          padding: 10upx 0;
        }
      }
    }
    .code-tips{
      padding:0 40upx 40upx 70upx;
      font-size: 28upx;
      color:#666666;
    }
  }
}

</style>
