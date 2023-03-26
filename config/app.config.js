export default {
	/**
	 * 接口根地址
	 */

	IMG_URL: "http://localhost:4000/img", //图片资源接口
	//ANDROID_URL: "http://192.168.0.132:8873/supplyx-mes",//开发环境
	FILE_UPLOAD_SAVE:'https://supplyx.goocidata.com/supplyx/fileserver/picsave',
	FILE_UPLOAD: 'https://supplyx.goocidata.com/fileserver/upload/',
	FILE_UPLOAD_ANDWELL:'https://supplyx.goocidata.com/fileserver/upload/',
	//ANDROID_URL: "http://172.21.0.13:8083/supplyx-mes",//内网测试环境
	//ANDROID_URL: "http://172.21.0.13:8085/supplyx-mes",//内网预发版环境
	// ANDROID_URL: "http://172.21.0.13:8083/supplyx-mes",//开发环境
	ANDROID_URL: "http://172.21.0.13:8086/supplyx-mes",//操作日志测试环境
	//ANDROID_URL: "http://81.70.220.41:30888/supplyx-mes",//预发版环境
	FINE_REPORT:'https://mom.goocidata.com',  //帆软地址
	// ANDROID_URL: "http://47.105.122.146:8181/supplyx-mes",//安达维尔开发环境
	// ANDROID_URL: "https://mom.goocidata.com/supplyx-mes",//生产环境
	// ANDROID_URL: "http://192.168.0.130:8873/supplyx-mes",//开发环境
	// ANDROID_URL:"https://tsersmt.goocidata.com/supplyx-mes",//测试环境
	//ANDROID_URL:"http://royzxwc.nat300.top/supplyx-mes",//通道
	//ANDROID_URL: "http://192.168.31.232:8870/supplyx-mes", // 本地测试
	
	
	//内网   地址根据自己网址进行更改
	// FILE_UPLOAD_SAVE_INNER:'http://192.168.170.5:58080/supplyx/fileserver/picsave',//内网测试地址
	// FILE_UPLOAD_INNER:'https://192.168.170.5:58080/fileserver/upload/', //内网测试地址
	// ANDROID_URL_INNER:'http://192.168.170.5:58080/supplyx-mes',//内网测试地址
	// FINE_REPORT_INNER:'http://192.168.170.5:58080',//内网测试地址帆软地址


	// #ifdef MP-WEIXIN
	PROVIDER: "weixin", //平台配置
	BASE_URL: "http://localhost:4000", //API接口
	// #endif

	// #ifdef MP-QQ
	PROVIDER: "qq", //平台配置
	BASE_URL: "http://localhost:4000", //API接口
	// #endif

	// #ifdef MP-TOUTIAO
	PROVIDER: "toutiao", //平台配置
	BASE_URL: "http://localhost:4000", //API接口
	// #endif

	// #ifdef MP-ANDROID
	PROVIDER: "app", //平台配置
	BASE_URL: "https://tsersmt.goocidata.com", //API接口
	// #endif


	APP_VERSION: "2.0.0", //APP版本

	PRIVATE_KEY: "123456789", //加密key

	PROCESS: "dev", //pro                  //版本类型  dev:开发版     pro:提交版
};
