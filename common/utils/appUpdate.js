import store from "@/store";
import AppConfig from "@/config/app.config";
import ApiClinet from "@/services/api-clinet";
const { ANDROID_URL,ANDROID_URL_INNER } = AppConfig;
export default (showToast = false)=>{
	let host = uni.getStorageSync('androidUrl')==1? ANDROID_URL:ANDROID_URL_INNER;
	// let wgturl=uni.getStorageSync('androidUrl')==1? 'http://81.70.220.41:30017/app/GOOCI-MES.apk':'http://192.168.170.5:10001/download/CH_SupplyX.apk';
	// let pkgurl=uni.getStorageSync('androidUrl')==1? 'http://81.70.220.41:30017/app/GOOCI-MES.apk':'http://192.168.170.5:10001/download/CH_SupplyX.apk';
	let wgturl = uni.getStorageSync('androidUrl')==1? host.split('supplyx')[0]+'data/mesapp/liangang.wgt':host.split('supplyx')[0]+'data/mesapp/nliangang.wgt';
	let pkgurl = uni.getStorageSync('androidUrl')==1? host.split('supplyx')[0]+'data/mesapp/liangang.apk':host.split('supplyx')[0]+'data/mesapp/nliangang.apk';
	//#ifdef APP-PLUS
	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
		try {
			uni.setStorageSync('version', widgetInfo.version);
			store.dispatch('app/setVersion', widgetInfo.version);
		} catch (e) {
			// error
		}

		uni.request({
			url: `${host}/tsAppUpdate/versionUpdate`,
			data: {
				versionNum: widgetInfo.version,
				name: widgetInfo.name,
				appid: '__UNI__D497F06',
				appType: '0'
			},
			method: 'POST',
			success:(result)=>{
				var data = result.data.data;
				if(data && data.status=='1'){
					//status=1表示需要更新
					var g_wakelock = null;
					// uni.showToast({
					// 	title: '更新完成'+data.updateType +'——'+data+'——'+wgturl+'——'+pkgurl,
					// 	mask: true,
					// 	icon: "none"
					// });
					if(data.updateType == '1' && data.wgturl){
						store.dispatch('app/setNeedUpdate', wgturl);
						store.dispatch('app/setUpdateing', true);
						//开启后台运行
						var main = plus.android.runtimeMainActivity();
						var Context = plus.android.importClass("android.content.Context");
						var PowerManager = plus.android.importClass("android.os.PowerManager");
						var pm = main.getSystemService(Context.POWER_SERVICE);
						g_wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "ANY_NAME");
						g_wakelock.acquire();
						uni.downloadFile({
							url: wgturl,
							success: (downloadResult) => {
								if (downloadResult.statusCode === 200) {
									plus.runtime.install(downloadResult.tempFilePath, {
										force: false
									}, function() {
										uni.showToast({
											title: '更新完成',
											mask: true,
											icon: "none"
										});
										//关闭后台运行
										if(g_wakelock != null && g_wakelock.isHeld()) {
											g_wakelock.release();
											g_wakelock = null;
										}
										uni.hideToast()
										plus.runtime.restart();
									}, function(e) {
										// store.dispatch('app/setUpdateState', false);
										//关闭后台运行
										if(g_wakelock != null && g_wakelock.isHeld()) {
											g_wakelock.release();
											g_wakelock = null;
										}
										uni.showToast({
											title: '更新失败',
											mask: false,
											duration: 1500,
											icon: "none",
										});
									});
								}
							},
							complete(){
								store.dispatch('app/setUpdateing', false);
							}
						});
					}else if (data.updateType == '2' && data.pkgurl) {
						store.dispatch('app/setNeedUpdate',pkgurl);
						uni.showModal({
							title: "更新",
							content: "发现新版本，是否更新",
							showCancel: true,
							complete(res) {
								if (res.confirm) {
									//开启后台运行
									var main = plus.android.runtimeMainActivity();
									var Context = plus.android.importClass("android.content.Context");
									var PowerManager = plus.android.importClass("android.os.PowerManager");
									var pm = main.getSystemService(Context.POWER_SERVICE);
									g_wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "ANY_NAME");
									g_wakelock.acquire();
									var dtask = plus.downloader.createDownload(
										pkgurl, {},
										(d, status) => {
											store.dispatch('app/setUpdateing', false);
											uni.showToast({
												title: '下载完成',
												mask: false,
												duration: 1000
											});
											// 下载完成
											if (status == 200) {
												plus.runtime.install(plus.io
														.convertLocalFileSystemURL(
															d.filename), {}, e =>
														e,
													function(error) {
														uni.showToast({
															title: '安装失败',
															mask: false,
															duration: 1500
														});
													})
											} else {
												uni.showToast({
													title: '更新失败',
													mask: false,
													duration: 1500
												});
											}
											//关闭后台运行
											if(g_wakelock != null && g_wakelock.isHeld()) {
												g_wakelock.release();
												g_wakelock = null;
											}
										});
									try {
										dtask.start(); // 开启下载的任务
										var prg = 0;
										store.dispatch('app/setUpdateState', true);
										store.dispatch('app/setUpdateing', true);
										dtask.addEventListener('statechanged', (task,
																				status) => {
											// 给下载任务设置一个监听 并根据状态  做操作
											switch (task.state) {
												case 1:
													break;
												case 2:
													break;
												case 3:
													prg = parseInt((parseFloat(
															task
																.downloadedSize
														) /
														parseFloat(task
															.totalSize)
													) * 100);
													store.dispatch(
														'app/setUpdateProgress',
														prg)
													break;
												case 4:
													store.dispatch(
														'app/setUpdateState',
														false);
													break;
											}
										});
									} catch (err) {
										store.dispatch('app/setUpdateState', false);
										store.dispatch('app/setUpdateing', false);
										uni.showToast({
											title: '更新失败',
											mask: false,
											duration: 1500
										});
									}
								}
							}
						})
					}

				}else{
					store.dispatch('app/setNeedUpdate', "");
					if(showToast){
						uni.showToast({
							icon:"none",
							title:data.memo
						})
					}
				}
			}
		})

	});
	// #endif
}
