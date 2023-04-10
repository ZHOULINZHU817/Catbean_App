import {
	UserService
} from "@/services/api.service";
import AuthService from "@/services/auth.service";
import resolveComponent from "../../config/resolveComponent.js";

// action types
const TYPES = {
	SET_ERROR: "SET_ERROR", // 错误
	SET_AUTH: "SET_AUTH", // 用户认证信息
	CLEAR_AUTH: "CLEAR_AUTH", // 清除认证信息
	SET_TOKEN: "SET_TOKEN", //token
	UPDATE_AUTH: "UPDATE_AUTH", //更新用户信息
	UPDATE_INDEX_MENU: "UPDATE_INDEX_MENU", //更新首页菜单
};

// initial state
const state = {
	isAuthenticated: false, //是否通过登陆认证
	user: {}, //用户信息
	errors: null,
	token: "",
	elements: undefined,
	indexMenus:[],
	userInfo: {}
};

// getters
const getters = {
	currentUser(state) {
		return state.user;
	},
	isAuthenticated(state) {
		return state.isAuthenticated;
	},
	getIndexMenus(state){
		return state.indexMenus;
	},
};

// actions
const actions = {
	// 用户登录
	login({
		commit
	}, user = {}) {
		console.log('user', user)
		return new Promise((resolve, reject) => {
			UserService.login(user).then(res => {
				if (res.data.code == "200") {
					
					commit(TYPES.SET_TOKEN, res.data.data);
					// uni.setStorageSync('hasLogin', true);
					resolve(res);
				} else {
					uni.showToast({
						title: '用户名或密码错误',
						duration: 2000,
						icon: 'none'
					});
					commit(TYPES.SET_ERROR, `${res.data.msg}`);
				}
			})
		});
	},

	// 注销
	logout({
		commit
	}) {
		commit(TYPES.CLEAR_AUTH);
	},
	// 权限菜单
	generateRoutes({commit},menus = []){
		return new Promise((resolve, reject)=>{
			UserService.getRoleMenusTree({type:'app'}).then(res=>{
				if(res.data.code == 0){
					var routers = [];
					if(res.data.data.length>0){
						routers = resolveComponent(res.data.data[0].children,menus);
						var element = []
						if(res.data.data[0].children[0] && res.data.data[0].children[0].children) {
							res.data.data[0].children[0].children.map(z => {
							 z.children.map(x => {
								 x.element = []
								 if(x.elements && x.elements.length != 0) {
									x.elements.map((y) => {
									   if(y.select) {
										   x.element.push(y.code)
									   }
								   })
								   element =  element.concat(x.element)
								 }
							 })
							})
						}
						if(routers.length>0){
							commit(TYPES.UPDATE_INDEX_MENU,routers[0].children);
						}
						commit('SET_ELEMENTS', element)
					}
					resolve(routers);
				}
			})
		})
	},
	// 注册
	async signup({
		commit
	}, user = {}) {
		await UserService.signup(user)
			.then((res) => {
				commit(TYPES.SET_AUTH, res.data);
			})
			.catch((error) => {
				commit(TYPES.SET_ERROR, error.message);
			});
	},
	//更新用户信息
	updata_auth({
		commit
	}, user = {}) {
		commit(TYPES.UPDATE_AUTH, user);
	},
};

// mutations
const mutations = {
	[TYPES.SET_TOKEN](state, token) {
		state.token = token;
		AuthService.setToken(token);
	},
	[TYPES.SET_ERROR](state, error) {
		state.errors = error;
	},
	[TYPES.UPDATE_AUTH](state, user) {
		state.user = user;
		state.errors = {};
		AuthService.set(state.user);
	},
	[TYPES.CLEAR_AUTH](state) {
		state.indexMenus = [];
		state.isAuthenticated = false;
		state.user = {};
		state.errors = {};
		AuthService.logout();
	},
	SET_ELEMENTS: (state, elements) => {
	    state.elements = elements
	},
	[TYPES.UPDATE_INDEX_MENU](state,menus) {
		state.indexMenus = menus;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
