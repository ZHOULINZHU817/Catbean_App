import Vue from 'vue'
import Vuex from 'vuex'
import {
	UserService
} from "@/services/api.service";
import AuthService from "@/services/auth.service";

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		login(state, user={}) {
			// state.hasLogin = true;
			// state.userInfo = provider;
			// uni.setStorage({//缓存用户登陆状态
			//     key: 'userInfo',  
			//     data: provider  
			// }) 
			// console.log(state.userInfo);

			return new Promise((resolve, reject) => {
				UserService.login(user).then(res => {
					if (res.data.code == "200") {
						
						// commit(TYPES.SET_TOKEN, res.data.data.token);
						let token = res.data.data.token;
						AuthService.setToken(token);
						state.hasLogin = true;
						// uni.setStorageSync('isSuperAdmin', res.data.data.isSuperAdmin);
						resolve(res);
					} else {
						uni.showToast({
							title: '用户名或密码错误',
							duration: 2000,
							icon: 'none'
						});
						// commit(TYPES.SET_ERROR, `${res.data.msg}`);
					}
				})
			});
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		}
	},
	actions: {
	
	}
})

export default store
