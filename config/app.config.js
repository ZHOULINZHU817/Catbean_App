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
	//ANDROID_URL: "https://mom.goocidata.com/supplyx-mes",//内网预发版环境
	ANDROID_URL: "https://mc.hongfeigg.com",//开发环境 
	// ANDROID_URL: "http://172.21.0.13:8086/supplyx-mes",//操作日志测试环境
	//ANDROID_URL: "http://81.70.220.41:30888/supplyx-mes",//预发版环境
	FINE_REPORT:'https://mom.goocidata.com',  //帆软地址

	


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
