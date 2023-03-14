//nativeUI toast
class Toast {
	constructor(){
		this.style = {
			style:"inline"
		};
	}
	show(message,customStyle={}){
		let style = {...this.style,...customStyle}
		// #ifdef APP-PLUS
		return plus.nativeUI.toast(message,style);
		// #endif
		// #ifndef APP-PLUS
		let param = {duration:1500,icon:"none"};
		for(let x in style){
			if(x == 'duration'){
				if(style[x] == 'long'){
					param.duration = 3500
				}else if(style[x] == 'short'){
					param.duration = 2000
				}
			}else if(x == 'icon' && style[x].indexOf(".") != -1){
				param['image'] = style[x];
			}else{
				param[x] = style[x];
			}
		}
		uni.showToast({
			title:message,
			mask:false,
			...param
		})
		// #endif
	}
	warning(message,customStyle={}){
		let style = {
			type:"richtext",
			verticalAlign:'top',
			background:"rgba(230, 162, 60,1)",
			duration:"long",
			...this.style,
			...customStyle
		}
		// #ifdef APP-PLUS
		return plus.nativeUI.toast(`<div>${message}</div>`,style);
		// #endif
		
		// #ifndef APP-PLUS
		let param = {duration:1500,icon:"none",image:"/static/nativeUI/warning.png"};
		for(let x in style){
			if(x == 'duration'){
				if(style[x] == 'long'){
					param.duration = 3500
				}else if(style[x] == 'short'){
					param.duration = 2000
				}
			}else if(x == 'icon' && style[x].indexOf(".") != -1){
				param['image'] = style[x];
			}else{
				param[x] = style[x];
			}
		}
		uni.showToast({
			title:message,
			mask:false,
			...param
		})
		// #endif
	}
	error(message,customStyle={}){
		let style = {
			type:"richtext",
			verticalAlign:'top',
			background:"rgba(245, 108, 108,1)",
			duration:"long",
			...this.style,
			...customStyle
		}
		// #ifdef APP-PLUS
		return plus.nativeUI.toast(`<div>${message}</div>`,style);
		// #endif
		
		// #ifndef APP-PLUS
		let param = {duration:1500,icon:"error",image:"/static/nativeUI/error.png"};
		for(let x in style){
			if(x == 'duration'){
				if(style[x] == 'long'){
					param.duration = 3500
				}else if(style[x] == 'short'){
					param.duration = 2000
				}
			}else if(x == 'icon' && style[x].indexOf(".") != -1){
				param['image'] = style[x];
			}else{
				param[x] = style[x];
			}
		}
		uni.showToast({
			title:message,
			mask:false,
			...param
		})
		// #endif
	}
	setOption(option={}){
		this.style = {...this.style,...option}
	}
}
export default new Toast()