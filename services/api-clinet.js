import HttpClient from "../common/http-client";
import AuthService from "./auth.service";
import {
	Base
} from "../common/utils/base.js";
import Md5 from "../common/utils/md5.js";
import AppConfig from "../config/app.config.js";
import ApiConfig from "../config/api.config.js";
import store from "../store/index.js";
import {showLoading,hideLoading} from "@/plugins/vue-loading/index.js";
class ApiClient {
	/**
	 * Create a new instance of ApiClient.
	 */
	constructor() {
		this.http = new HttpClient();
		this.http.interceptors.request.push((options) => {
			let nextOptions = options;
			// 开启内外网之后需要对url进行切割重组 mom这边根据'supplyx-mes'进行切割
			// let host = uni.getStorageSync('androidUrl')==1? AppConfig.ANDROID_URL:AppConfig.ANDROID_URL_INNER;
			// nextOptions.url = host.split('supplyx-mes')[0]+ 'supplyx-mes'+ nextOptions.url.split('supplyx-mes')[1]
			console.log('拦截HTTP请求处理结果222: ', nextOptions);

			// if (AuthService.auth) {
			//   nextOptions.header.Authorization = `Bearer ${AuthService.auth}`;
			// }

			// nextOptions.header['X-USER-APP-VERSION'] = `${AuthService.auth.version}`;
			return {
				options: nextOptions,
			};
		});
		this.http.interceptors.response.push((response) => {
			response
				.then((res) => {
					if (res.statusCode == 200) {
						if (res.data.code == "401" || res.data.code == '40103') {
							// uni.showToast({
							// 	mask:true,
							// 	title: "请重新登录",
							// 	duration: 2000,
							// 	icon: "none",
							// });

							uni.redirectTo({
								url: '../public/login'
							})
							// uni.redirectTo({
							// 	url: '../../public/login'
							// })

						}
						if (res.data.code == "1") {
							let msg = res.data.msg ? res.data.msg : "请求异常，请重试"
							uni.showToast({
								title: msg,
								mask:true,
								duration: res.requestOptions.url.match("/app/woReport/report")?3000:1500,
								icon: "none",
							})
						}
						return res;
					}
				})
				.catch((error) => {
					let err = error;
					if (err) {
						switch (err.statusCode) {
							case 400:
								err.message = "请求错误(400)";
								break;
							case 401:
								// 401: 未登录
								// 未登录则跳转登录页面，并携带当前页面的路径
								// 在登录成功后返回当前页面，这一步需要在登录页操作。
								// eslint-disable-next-line no-undef
								// uni.navigateTo({
								//   url: 'login'
								// });
                                uni.removeStorageSync('userInfo');
								err.message = "未授权，请重新登录(401)";
								store.dispatch("auth/logout");
								store
									.dispatch("auth/login")
									.then((res) => {
										uni.showToast({
											mask:true,
											title: "请重新操作",
											duration: 2000,
											icon: "none",
										});
									})
									.catch((err) => {
										uni.showToast({
											mask:true,
											title: "账户状态异常",
											duration: 2000,
											icon: "none",
										});
										console.log(err);
									});
								break;
							case 403:
								// 403 Token过期
								// 登录过期对用户进行提示
								// 清除本地token和清空vuex中token对象
								// 跳转登录页面
								// AuthService.logout();
								err.message = "拒绝访问(403)";
								store.dispatch("auth/logout");
								store
									.dispatch("auth/login")
									.then((res) => {
										uni.showToast({
											mask:true,
											title: "请重新操作",
											duration: 2000,
											icon: "none",
										});
									})
									.catch((err) => {
										uni.showToast({
											mask:true,
											title: "账户状态异常",
											duration: 2000,
											icon: "none",
										});
										console.log(err);
									});
								break;
							case 404:
								err.message = "请求错误(404)";
								break;
							case 500:
								err.message = "服务器错误(500)";
								break;
							case 501:
								err.message = "服务器未实现服务(501)";
								break;
							case 502:
								err.message = "网络错误(502)";
								break;
							case 503:
								err.message = "服务不可用(503)";
								break;
							case 504:
								err.message = "网络超时(504)";
								break;
							case 505:
								err.message = "HTTP版本不受支持(505)";
								break;
							default:
								err.message = `连接到服务器失败`;
						}
					} else {
						err.message = "连接到服务器失败";
					}
					if (err.statusCode != 401 || err.statusCode != 403) {
						uni.showToast({
							title: err.message,
							mask:true,
							duration: 1500,
							icon: "none",
						});
					}
					return err;
				});
			return response;
		});
	}

	request(options) {
		//let nonce = new Base().tools.GenNonDuplicateID(4);
		//let timestamp = Date.parse(new Date()) / 1000; // 取时间戳
		//let privateKey = AppConfig.PRIVATE_KEY;
		const header = {
			// timestamp: timestamp,
			"Content-Type": "application/json",
			"token": AuthService.getToken() ? AuthService.getToken() : "",
			// sign: new Base().tools.CreateSign(
			//   options.data,
			//   nonce,
			//   timestamp,
			//   privateKey
			// ),
			// nonce: nonce,
			...options.header
		};
		options.header = header;
		return this.http.sendRequest(options);
	}

	/**
	 * get方法，对应get请求
	 * @param {String} url [请求的url地址]
	 * @param {Object} data [请求时携带的参数] 对于 GET 方法，会将数据自动转换为 query strin
	 */
	get(url, data, options) {
		if (!options) {
			options = {};
		}
		options.url = url;
		options.data = data;
		options.method = "GET";
		return this.request(options);
	}

	/**
	 * post方法，对应post请求
	 * @param {String} url [请求的url地址]
	 * @param {Object} data [请求时携带的参数]
	 */
	post(url, data, options, header={}) {
		if (!options) {
			options = {};
		}
		options.url = url;
		options.data = data;
		options.method = "POST";
		options.header = header;
		return this.request(options);
	}
	// 节流请求，请求在完结之前禁止进行下一次请求
	tpost(url,data,options={}, header={}){
		if(this.http.throttle[url]){
			console.log("频繁操作")
			return new Promise((resolve,reject)=>{
				reject({
					'errType':"throttle",
					'errMsg':"频繁操作"
				});
			})
		}else{
			this.http.throttle[url] = true;
			options.url = url;
			options.data = data;
			options.method = "POST";
			options.loading = true;
			options.header = header;
			return this.request(options);
		}
	}
	/**
	 * put方法，对应put请求
	 * @param {String} url [请求的url地址]
	 * @param {Object} data [请求时携带的参数]
	 */
	put(url, data, options) {
		if (!options) {
			options = {};
		}
		options.url = url;
		options.data = data;
		options.method = "PUT";
		return this.request(options);
	}
	/**
	 * delete方法，对应delete请求
	 * @param {String} url [请求的url地址]
	 * @param {Object} data [请求时携带的参数]
	 */
	delete(url, data, options) {
		if (!options) {
			options = {};
		}
		options.url = url;
		options.data = data;
		options.method = "DELETE";
		return this.request(options);
	}
	/**
	 * uploadFile方法，对应uploadFile请求
	 * @param {String} url [请求的url地址]
	 * @param {String} fileType [上传文件类型 ，image/video/audio]
	 * @param {String} name [上传文件名称]
	 * @param {String} tempFilePaths [上传文件临时地址]
	 * @param {Object} formData [附带参数]
	 */
	uploadFile(url, fileType, name, tempFilePaths, formData) {
		const access_key = AppConfig.ACCESS_KEY; // 服务端生成的 access_key
		const secret_key = AppConfig.SECRET_KEY; // 服务端生成的 secret_key
		let timestamp = Date.parse(new Date()) / 1000; // 取时间戳
		let echostr = new Base().tools.getRandStr(32); // 随机字符串自行生成
		const header = {
			"api-signature": Md5.md5(secret_key + echostr + timestamp),
			"api-echostr": echostr,
			"api-timestamp": timestamp,
			"api-access-key": access_key,
			Accept: "application/vnd.lumen." + AppConfig.VERSION + "+json",
			"Content-Type": "application/json",
			token: AuthService.getToken() ? AuthService.getToken() : "",
		};
		let response = new Promise((resolve, reject) => {
			uni.uploadFile({
				url: url,
				header: header,
				filePath: tempFilePaths,
				fileType: fileType,
				name: name,
				formData: formData,
				success: (uploadFileRes) => {
					resolve(uploadFileRes);
				},
				fail: (res) => {
					reject(res);
				},
			});
		});
		return response;
	}
	/**
	 * upyunUploadFile方法，对应upyunUploadFile请求[又拍云]
	 * @param {Number} service [业务类型]
	 * @param {String} fileType [上传文件类型 ，png,jpeg,jpg]
	 * @param {String} tempFilePaths [上传文件临时地址]
	 */
	upyunUploadFile(service, tempFilePath) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: ApiConfig.APP_BASE_API.IMG_UPLOAD,
				data: {
					service: service, //业务范围 2抽奖封面 3抽奖详细内容 4奖品封面 5快捷扫码二维码 6发起人信息二维码 7抽奖晒单图片 8抽奖评论图片 9小程序码 10举报抽奖截图
					extend: tempFilePath.slice(tempFilePath.lastIndexOf(".") + 1), //extend图片后缀 仅限png,jpeg,jpg
				},
				method: "POST",
				header: {
					token: AuthService.getToken() ? AuthService.getToken() : "",
				},
				success: (res) => {
					if (res.data.errorCode == 0) {
						let data = res.data.data;
						uni.uploadFile({
							url: AppConfig.UPYUN_URL + data.bucket,
							filePath: tempFilePath,
							name: "file",
							formData: {
								"Content-Type": "",
								Filename: data.filename,
								policy: data.policy,
								signature: data.signature,
							},
							success: (uploadFileRes) => {
								let res = JSON.parse(uploadFileRes.data);
								res["imgurl"] = data.url;
								resolve(res);
							},
							fail: (res) => {
								reject(res);
							},
						});
					} else {
						uni.showToast({
							mask:true,
							title: "上传失败",
							icon: "none",
						});
					}
				},
			});
		});
	}
	/**
	 * 上传多张图片
	 * @param {Object} tempFilePaths [params.imgList为调用相册返回的临时文件列表]
	 * @return {*}
	 */
	upyunUploadImgs(service, tempFilePaths) {
		return new Promise((resolve, reject) => {
			if ({}.toString.call(tempFilePaths) != "[object Array]") {
				throw new TypeError(`上传图片参数 tempFilePaths 类型错误!`);
			}
			//路径数组为空时  不上传
			if (tempFilePaths.length == 0) {
				resolve([]);
				return;
			}
			uni.showLoading({
				title: "上传图片中...",
				mask: true,
			});
			uni.request({
				url: ApiConfig.APP_BASE_API.IMG_UPLOAD,
				data: {
					service: service, //业务范围 2抽奖封面 3抽奖详细内容 4奖品封面 5快捷扫码二维码 6发起人信息二维码 7抽奖晒单图片 8抽奖评论图片 9小程序码 10举报抽奖截图 12主页相关图片
					extend: "jpg", //extend图片后缀 仅限png,jpeg,jpg
				},
				method: "POST",
				header: {
					token: AuthService.getToken() ? AuthService.getToken() : "",
				},
				success: (res) => {
					if (res.data.errorCode != 0) {
						uni.showToast({
							mask:true,
							title: "上传失败",
							icon: "none",
						});
						uni.hideLoading();
						reject("error");
						return false;
					}
					let data = res.data.data;
					let uploads = [];
					let progress = 0;
					tempFilePaths.forEach((item, i) => {
						if (item.includes("http://tmp") || item.includes("wxfile")) {
							//过滤网络图片
							uploads[i] = new Promise((resolve) => {
								uni.uploadFile({
									url: AppConfig.UPYUN_URL + data.bucket,
									filePath: item,
									name: "file",
									formData: {
										"Content-Type": "",
										Filename: data.filename,
										policy: data.policy,
										signature: data.signature,
									},
									success: (uploadFileRes) => {
										progress++;
										let res = JSON.parse(uploadFileRes.data);
										res["imgurl"] = data.url;
										uni.showLoading({
											title: progress + "/" + tempFilePaths.length,
											mask: true,
										});
										resolve(res);
									},
									fail: (res) => {
										reject("err");
									},
								});
							});
						} else {
							uploads[i] = Promise.resolve(item);
						}
					});
					Promise.all(uploads)
						.then((res) => {
							//图片上传完成
							resolve(res);
							uni.hideLoading();
						})
						.catch((err) => {
							reject(err);
							uni.hideLoading();
							uni.showToast({
								mask:true,
								title: "上传失败请重试",
								icon: "none",
							});
						});
				},
				fail: (err) => {},
			});
		});
	}
	
	
	list(params = {},obj,list) {
		let page = 1;
		let length = params.data?params.data.length?params.data.length:20:20;
		let defaultParam = {
			loading: true,
			data: {}
		};
		let param = {...defaultParam,...params};
		try {
			if (param.url == null) {
				throw 'url接口参数不能为null'
			}
		} catch (err) {
			console.error('错误信息：' + err);
		}
		return (options) => {
			let opts = {
				loading: param.loading
			}
			if (options) {
				opts = {
					loading: param.loading,
					...options
				};
				if (options.data) {
					param.data = {
						...param.data,
						...options.data
					};
					if (options.data.page) {
						if (options.data.page != -1) {
							page = options.data.page;
						} else {
							page != 1 ? page-- : page;
						}
					}
					if(options.data.length){
						length = options.data.length;
					}
				}
			}
			param.data.page = page;
			param.data.length = length;
			if (param.data.page == 1 && opts.loading) {
				//showLoading();
				param.loading = true;
			}else{
				param.loading = false;
			}
			for(let x in param.data){
				if(param.data[x] == undefined){
					delete param.data[x]
				}
			}
			return new Promise((resolve,reject)=>{
				this.request({
					url:param.url,
					data:param.data,
					header:param.header,
					method:"POST",
					loading:param.loading
				}).then((response) => {
					//hideLoading();
					let that = obj;
					page = param.data.page; //避免同时并行请求，而产生的分页问题
					if(response.data.code === '0'){
						
						var arr = [];
						if(list){
							let fields = list.split(".");
							if(fields.length>1){
								let result = that[fields[0]];
								for(let i = 1;i<fields.length;i++){
									result = result[fields[i]];
									if(!result){
										return "";
									}
								}
								arr = result;
							}else{
								arr = that[list];
							}
						}else{
							arr = that.datalist || [];
						}
						//var arr = list ? that[list] : (that.datalist || []);
						if(param.data.page == 1) {
							arr = [];
						}
						if(!response.data.data) { //若没有返回data置一个空值避免报错
							response.data.data = []
						}
						if (response.data.data.length) {
							page++;
						}
						if(param.format){
							param.format(response.data.data);
						}
						var array = arr.concat(response.data.data);
						
						//list ? that[list] = array : that.datalist = array;
						if(list){
							let fields = list.split(".");
							if(fields.length>1){
								let result = that[fields[0]];
								for(let i = 1;i<fields.length;i++){
									if(i < fields.length-1){
										result = result[fields[i]];
									}else{
										result[fields[i]] = array;
									}
								}
							}else{
								that[list] = array;
							}
						}else{
							that.datalist = array;
						}
						
						that.$forceUpdate();
					}
					resolve(response.data.data);
				}).catch((error)=>{
					//hideLoading();
				})
			})
		}
	}

	
	fileUpLoad(params) {
		return new Promise((resolve,reject)=>{
			// 开启内外网
			// let urlUpload = uni.getStorageSync('androidUrl')==1? AppConfig.FILE_UPLOAD:AppConfig.FILE_UPLOAD_INNER;
			const _this = this;
			var param = params || {};
			var filePath = '';
			var upload = function(option) {
				var uploadTask = uni.uploadFile({
					// 开启内外网
					// url:urlUpload,
					url:AppConfig.FILE_UPLOAD,
					name: 'file',
					filePath: option.path,
					header:{
						"token": AuthService.getToken() ? AuthService.getToken() : "",
					},
					formData:{
                       type:'banner'
					},
					success: function(response) {
						uni.hideLoading();
						if (response.statusCode == 200) {
							// var options = {};
							var res = JSON.parse(response.data);
							resolve({path:res.data[0]})
							// if(res.body){
							// 	options.data = res.body;
							// }else{
							// 	options.data = res;
							// }
							// 开启内外网后需要对url进行处理
							// let uploadHost = uni.getStorageSync('androidUrl')==1? AppConfig.FILE_UPLOAD_SAVE:AppConfig.FILE_UPLOAD_SAVE_INNER;
							// options.url = uploadHost +'?url='+options.data.path+'&filename='+options.data.filename;
							// options.url = AppConfig.FILE_UPLOAD_SAVE+'?url='+options.data.path+'&filename='+options.data.filename;
							// options.method = "POST";
							// _this.request(options).then((res)=>{
							// 	if(res.data.code === '0'){
							// 		resolve({
							// 			path:res.data.data,
							// 			filename:options.data.filename
							// 		})
							// 	}else{
							// 		reject();
							// 	}
							// })
						}else {
							uni.showToast({
								mask:true,
								title: '上传失败，请重试',
								icon:"none"
							});
						}
					},
					fail: function (response) {
						uni.hideLoading();
						if (param && param.fail) {
							param.fail(response);
						}
						uni.showToast({
							mask:true,
							title: '上传失败，请重试',
							icon:"none"
						});
					}
				})
				uploadTask.onProgressUpdate(function(response) {
					if (param && param.progress) {
						param.progress(response.progress);
					}
				})
			}
			switch (param.type) {
				case 'image':
					uni.chooseImage({
						count: 1,
						sizeType: ['compressed'],
						sourceType: ['album', 'camera'],
						success: function(res) {
							filePath = res.tempFilePaths[0];
							if (param.loading) {
								uni.showLoading({
									title: '上传中',
								})
							}
							if (res.tempFiles[0].size > param.size * 1024 * 1024) {
								plus.zip.compressImage(
									{
										src: res.tempFilePaths[0],
										dst: '_doc/a.jpg',
										quality: 70, //压缩比例
										overwrite: true,
										width: '1080px' //图片宽度
									},
									function(e) {
										//执行上传
										filePath = e.target;
										upload({
											path: filePath
										})
									},
									function(error) {
										console.log('Compress error!');
									}
								);
							}else{
								upload({
									path: filePath
								})
							}
						},
						fail: function(res) {
							if (param.fail) {
								param.fail();
							}
						}
					})
					break;
				case 'video':
					uni.chooseVideo({
						sourceType: ['album', 'camera'],
						success: function(res) {
							if (res.size > param.size * 1024 * 1024) {
								uni.showToast({
									mask:true,
									title: '文件过大！最大' + param.size + 'M',
									icon: "none"
								})
								return false
							}
							if (param.loading) {
								uni.showLoading({
									title: '上传中',
								})
							}
							filePath = res.tempFilePath;
							upload({
								path: filePath
							})
						},
						fail: function(res) {
							if (param.fail) {
								param.fail();
							}
						}
					})
					break;
				default:
					
					break;
			}
		})
	}
}
const getApiClient = () => {
	return new ApiClient();
};

export {
	getApiClient
};
export default new ApiClient();
