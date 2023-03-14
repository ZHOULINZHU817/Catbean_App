import appUpdate from "@/common/utils/appUpdate.js"
import store from "@/store";
function jump(param){
	if(!store.getters['updateing']){
		appUpdate();
	}
	return true;
}
// 路由跳转监听，登录校验
uni.addInterceptor('navigateTo', {
	invoke(param){
		return jump(param);
	}
})
uni.addInterceptor('switchTab', {
	invoke(param){
		return jump(param);
	}
})
uni.addInterceptor('redirectTo', {
	invoke(param){
		return jump(param);
	}
})
uni.addInterceptor('reLaunch', {
	invoke(param){
		return jump(param);
	}
})