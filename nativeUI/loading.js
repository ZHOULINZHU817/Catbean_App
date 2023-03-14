//nativeUI load
class Loading {
	constructor(){
		this.style = {
			width:"100px",
			height:"100px"
		}
	}
	show(message,customStyle={}){
		// #ifdef APP-PLUS
		return plus.nativeUI.showWaiting(message, {...this.style,...customStyle})
		// #endif
		// #ifndef APP-PLUS
		let param  = {...this.style,...customStyle}
		uni.showLoading({
			title:message,
			mask:true,
			...param
		})
		// #endif
	}
	setOption(option={}){
		this.style = {...this.style,...option}
	}
}
export default new Loading()