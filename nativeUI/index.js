//nativeUI
import Vue from 'vue'
import toast from "./toast.js"
import loading from "./loading.js"
const nativeUI = {
	toast,
	loading,
	install(){
		Vue.prototype.$nativeUI = {
			toast,
			loading
		}
	}
}
export default nativeUI