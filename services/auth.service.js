
class AuthService {
  constructor() {
  
  }

	setToken(token) {
		try {
			uni.setStorageSync('token', token);
		} catch (error) {
		  console.log(`setStorageSync调用失败`);
		}
	}
	
	
	getToken(){
		try {
			const token = uni.getStorageSync('token');
			return token || '';
		} catch (error) {
		  console.log(`getStorageSync调用失败`);
		}
	}
	
	
	
  clear() {
		try {
			this.auth = {};
			// uni.removeStorageSync('auth');
			uni.removeStorageSync('token');
		} catch (error) {
		  console.log(`getStorageSync调用失败`);
		}
  }

  index() {
    // 跳转到首页页面
    
  }

  logout() {
    this.clear();
    // 用户注销
     
    // 跳转到登录页面
   
  }
}

export default new AuthService();
