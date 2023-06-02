<template>
	<view class="container">
		<w-qrcode class="qrcode" ref="qrcode" :options="options" @generate="hello"></w-qrcode>
    <!-- <img :src="codeSaveImg"/> -->
    <view class="share_bg2">
      <view class="code-img" :style="{backgroundImage:`url(${codeSaveImg})`}"></view>
    </view>
     <view class="share_btn" @click="capture()"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: {
            code:'', //生成二维码的链接
            size:'240',
            padding: 20, 
            img: {// 二维码log配置 非必传
                src: '../../static/cat.png', // 图片地址
                size: 40,// 图片大小
                degree: 15,// 圆角大小 如果type为round生效
                type: 'round',//图片展示类型 默认none 可选值  round圆角  circle圆 如果为round 可以传入degree设置圆角大小 默认 5
                color: '#ffffff', //图片周围的白色边框
                width: 8 //图片周围白色边框的宽度 默认5
            },
        },
        userInfo: JSON.parse(uni.getStorageSync('userInfo')),
        codeSaveImg: ""
			};
		},
		onLoad(){
			/**获取个人信息* */
			this.options.code = `https://mc.hongfeigg.com/h5/#/pages/public/signin?code=${this.userInfo.inviteCode}`
		},
		methods:{
      hello(res) {
        console.log(res)
        this.codeSaveImg = res.img.tempFilePath;
      },
			capture() {
				this.$nextTick(function() {
					var pages = getCurrentPages(); //获取当前页面信息
					console.log(pages);
					var page = pages[pages.length - 1];
					var bitmap = null;
					var currentWebview = page.$getAppWebview();
					bitmap = new plus.nativeObj.Bitmap('amway_img');
					let t = this
					currentWebview.draw(bitmap, function() {
						let rand = Math.floor(Math.random() * 10000)
						let saveUrl = '_doc/' + rand + 'a.jpg'
						bitmap.save(saveUrl, {}, function(i) {
							uni.showModal({
								title: "是否保存图片到手机?",
								success: (confirm) => {
									if (confirm.confirm) {
										uni.saveImageToPhotosAlbum({
											filePath: i.target,
											success: function() {
												bitmap
													.clear(); //销毁Bitmap图片
												uni.showToast({
													title: '保存图片成功',
													mask: false,
													duration: 1500
												});
											}
										});
									} else {
										bitmap.clear(); //销毁Bitmap图片
									}
								}
							})



						}, function(e) {
							t.showToast("保存图片失败")

						});
					}, function(e) {
						t.showToast("截屏绘制图片失败")
					});
				})
			},

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
  .qrcode{
    position: absolute;
    right:108%;
    bottom: 15%;
  }
  .share_bg2{
    height:288upx;
    width: 680upx;
    position: absolute;
    background: url(@/static/share_bg2.png) 100% no-repeat;
    background-size: 100% 100%;
    bottom: 200upx;
    left: 50%;
    transform: translateX(-50%);
    .code-img{
      width:220upx;
      height:220upx;
      background-size: 100% 100%;
      margin-left: 430upx;
      margin-top: 30upx;
    }
  }
  .share_btn{
    width: 390upx;
    height:102upx;
    background: url(@/static/share_btn.png) 100% no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 50upx;
    left: 50%;
    transform: translateX(-50%);
  }
  
}

</style>
