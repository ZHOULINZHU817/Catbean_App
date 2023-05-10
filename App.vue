<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import {
		mapMutations
	} from 'vuex';

	import ApiClinet from "@/services/api-clinet";
	import ApiConfig from "@/config/api.config";
	export default {
		methods: {

			// 版本更新方法
			wgtUrlupload(){
				let _this = this;
				//系统版本升级判断接口（后台获取服务器）
				// var urlfun = 你自己后台服务器的接口方法  判断是否需要升级
					/** 锁定屏幕方向 */
					plus.screen.lockOrientation('portrait-primary');
					    console.log("onLaunch锁定屏幕方向")
					/** 检测升级 */
					// 取得版本号
					plus.runtime.getProperty(plus.runtime.appid, function(info) {
						// 版本号变量持久化存储
						getApp().globalData.editionnum = info.version; //版本号持久化存储做其它备用
						// console.log("当前应用版本：" + info.version + "---" + plus.runtime.version);
						// console.log("appid：" +plus.runtime.appid);
						// console.log("appid基座版本号：" +plus.runtime.version);
						// uni.request({
						//     url: urlfun, 	//接口地址。url
						// 	method:"POST",		//传输类型
						//     data: {
						// 		"appid": plus.runtime.appid,
						// 		"version": plus.runtime.version,
						// 		"system":uni.getStorageSync('systemname'),
						// 		"editionnum":info.version,
						// 	},		//必要参数
						// 	// header: data.header,	//https 请求头参数
						//     success: (res) => {
						//         console.log("AJAX数据请求接口--返回状态--"+JSON.stringify(res.data));
						// 		var data = res.data;
						// 		var status = data.status;
						// 		// 判断返回结果,调用升级方法
						// 		if(status == 200){
						// 			// 开始调用  data = 服务器返回的数据里面有 新的版本号，下载地址
						// 			_this.checkVersionToLoadUpdate(info.version,data);
						// 		}else{
						// 			uni.showToast({
						// 				title: data.msg, 
						// 				duration: 1500  
						// 			}); 
						// 		}
						//     }
						// });
						const typeFiler = uni.getSystemInfoSync().platform
						let params = {
							type: typeFiler == 'ios'? 'ipa':'apk',
						}
                        let downloadApkUrl = typeFiler == 'ios' ? 'https://www.pgyer.com/IosCatSupermarket' : 'https://www.pgyer.com/CatSupermarket';
						ApiClinet.get(ApiConfig.APP_BASE_API.versionLast, params).then((res) => {
							if (res.data.code == '200') {
								_this.checkVersionToLoadUpdate(info.version,res.data.data, downloadApkUrl);
							}
						})



					})
				
			},

			/**
			 * 进行版本型号的比对 以及下载更新请求
			 * @param {Object} server_version 服务器最新 应用版本号
			 * @param {Object} curr_version 当前应用版本号
			 */
			checkVersionToLoadUpdate:function(server_version,data, url){
				// this.$api.msg(data.number);
				if(server_version !== data.number && data.forced){
					//TODO 此处判断是否为 WIFI连接状态
					// if(plus.networkinfo.getCurrentType()!=3){
					// 	uni.showToast({  
					// 		title: '有新的版本发布，检测到您目前非Wifi连接，为节约您的流量，程序已停止自动更新，将在您连接WIFI之后重新检测更新',  
					// 		mask: true,  
					// 		duration: 5000,
					// 		icon:"none"
					// 	});  
					// 	return;  
					// }else{
						uni.showModal({
							title: "版本更新",
							content: '有新的版本发布，是否立即进行新版本下载？',
							confirmText:'立即更新',
							cancelText:'稍后进行',
							success: function (res) {
								if (res.confirm) {
									uni.showLoading({
										title:"正在更新",
										mask:true
									})
									//设置 最新版本apk的下载链接
									var downloadApkUrl = url;
									var dtask = plus.downloader.createDownload( downloadApkUrl, {method: "GET"}, function ( d, status ) {  
											// 下载完成  
											if ( status == 200 ) {   
												plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename),{force: false },
												function() {
													uni.hideLoading();
													plus.runtime.restart();
												},function(error){
													uni.hideLoading();  
													uni.showToast({
														title:"更新失败，将跳转下载页面",
														icon:"none",
														duration:2000
													})
													setTimeout(function(){
														plus.runtime.openURL(downloadApkUrl);
													},2000)
												})
												
											} else {  
												 uni.showToast({  
													title: '更新失败',
													duration: 1500  
												 });  
											}    
										});  
									dtask.start();
								} else if (res.cancel) {
									console.log('稍后更新');
								}
							}
						});
					// }
				}
			}
		},
		onLaunch: function() {
			this.wgtUrlupload();
		},
		onShow: function() {
			
		},
		onHide: function() {
			// console.log('App Hide')
		},
	}
</script>

<style lang='scss'>
	/*
		全局公共样式和字体图标
	*/
	@font-face {
		font-family: yticon;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
	}

	.yticon {
		font-family: "yticon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-yiguoqi1:before {
		content: "\e700";
	}

	.icon-iconfontshanchu1:before {
		content: "\e619";
	}

	.icon-iconfontweixin:before {
		content: "\e611";
	}

	.icon-alipay:before {
		content: "\e636";
	}

	.icon-shang:before {
		content: "\e624";
	}

	.icon-shouye:before {
		content: "\e626";
	}

	.icon-shanchu4:before {
		content: "\e622";
	}

	.icon-xiaoxi:before {
		content: "\e618";
	}

	.icon-jiantour-copy:before {
		content: "\e600";
	}

	.icon-fenxiang2:before {
		content: "\e61e";
	}

	.icon-pingjia:before {
		content: "\e67b";
	}

	.icon-daifukuan:before {
		content: "\e68f";
	}

	.icon-pinglun-copy:before {
		content: "\e612";
	}

	.icon-dianhua-copy:before {
		content: "\e621";
	}

	.icon-shoucang:before {
		content: "\e645";
	}

	.icon-xuanzhong2:before {
		content: "\e62f";
	}

	.icon-gouwuche_:before {
		content: "\e630";
	}

	.icon-icon-test:before {
		content: "\e60c";
	}

	.icon-icon-test1:before {
		content: "\e632";
	}

	.icon-bianji:before {
		content: "\e646";
	}

	.icon-jiazailoading-A:before {
		content: "\e8fc";
	}

	.icon-zuoshang:before {
		content: "\e613";
	}

	.icon-jia2:before {
		content: "\e60a";
	}

	.icon-huifu:before {
		content: "\e68b";
	}

	.icon-sousuo:before {
		content: "\e7ce";
	}

	.icon-arrow-fine-up:before {
		content: "\e601";
	}

	.icon-hot:before {
		content: "\e60e";
	}

	.icon-lishijilu:before {
		content: "\e6b9";
	}

	.icon-zhengxinchaxun-zhifubaoceping-:before {
		content: "\e616";
	}

	.icon-naozhong:before {
		content: "\e64a";
	}

	.icon-xiatubiao--copy:before {
		content: "\e608";
	}

	.icon-shoucang_xuanzhongzhuangtai:before {
		content: "\e6a9";
	}

	.icon-jia1:before {
		content: "\e61c";
	}

	.icon-bangzhu1:before {
		content: "\e63d";
	}

	.icon-arrow-left-bottom:before {
		content: "\e602";
	}

	.icon-arrow-right-bottom:before {
		content: "\e603";
	}

	.icon-arrow-left-top:before {
		content: "\e604";
	}

	.icon-icon--:before {
		content: "\e744";
	}

	.icon-zuojiantou-up:before {
		content: "\e605";
	}

	.icon-xia:before {
		content: "\e62d";
	}

	.icon--jianhao:before {
		content: "\e60b";
	}

	.icon-weixinzhifu:before {
		content: "\e61a";
	}

	.icon-comment:before {
		content: "\e64f";
	}

	.icon-weixin:before {
		content: "\e61f";
	}

	.icon-fenlei1:before {
		content: "\e620";
	}

	.icon-erjiye-yucunkuan:before {
		content: "\e623";
	}

	.icon-Group-:before {
		content: "\e688";
	}

	.icon-you:before {
		content: "\e606";
	}

	.icon-forward:before {
		content: "\e607";
	}

	.icon-tuijian:before {
		content: "\e610";
	}

	.icon-bangzhu:before {
		content: "\e679";
	}

	.icon-share:before {
		content: "\e656";
	}

	.icon-yiguoqi:before {
		content: "\e997";
	}

	.icon-shezhi1:before {
		content: "\e61d";
	}

	.icon-fork:before {
		content: "\e61b";
	}

	.icon-kafei:before {
		content: "\e66a";
	}

	.icon-iLinkapp-:before {
		content: "\e654";
	}

	.icon-saomiao:before {
		content: "\e60d";
	}

	.icon-shezhi:before {
		content: "\e60f";
	}

	.icon-shouhoutuikuan:before {
		content: "\e631";
	}

	.icon-gouwuche:before {
		content: "\e609";
	}

	.icon-dizhi:before {
		content: "\e614";
	}

	.icon-fenlei:before {
		content: "\e706";
	}

	.icon-xingxing:before {
		content: "\e70b";
	}

	.icon-tuandui:before {
		content: "\e633";
	}

	.icon-zuanshi:before {
		content: "\e615";
	}

	.icon-zuo:before {
		content: "\e63c";
	}

	.icon-shoucang2:before {
		content: "\e62e";
	}

	.icon-shouhuodizhi:before {
		content: "\e712";
	}

	.icon-yishouhuo:before {
		content: "\e71a";
	}

	.icon-dianzan-ash:before {
		content: "\e617";
	}





	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	/* 骨架屏替代方案 */
	.Skeleton {
		background: #f3f3f3;
		padding: 20upx 0;
		border-radius: 8upx;
	}

	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;

		image {
			width: 100%;
			height: 100%;
			transition: .6s;
			opacity: 0;

			&.loaded {
				opacity: 1;
			}
		}
	}

	.clamp {
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2; /* 这里是超出几行省略 */
		overflow: hidden;
	}

	.common-hover {
		background: #f5f5f5;
	}

	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid #F6F6F6;
	}

	.b-b:after {
		bottom: 0;
	}

	.b-t:after {
		top: 0;
	}

	/* button样式改写 */
	uni-button,
	button {
		height: 80upx;
		line-height: 80upx;
		font-size: $font-lg + 2upx;
		font-weight: normal;

		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}

	uni-button[type=default],
	button[type=default] {
		color: $font-color-dark;
	}

	/* input 样式 */
	.input-placeholder {
		color: #B8B8B8;
	}

	.placeholder {
		color: #B8B8B8;
	}
</style>
