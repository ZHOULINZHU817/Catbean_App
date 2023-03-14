const mpaasScanModule = uni.requireNativePlugin("Mpaas-Scan-Module");
export function scanCode(param={}) {
    return new Promise((resolve,reject)=>{
		if(mpaasScanModule){
			mpaasScanModule.mpaasScan({
				// 扫码 UI 风格，参数可为 qr、bar，默认为 qr
				'type': param.type || 'qr',
				// 扫码识别类型，参数可多选，qrCode、barCode，不设置，默认识别所有
				'scanType':param.scanType ||  ['qrCode','barCode'],
				// 是否隐藏相册，默认false不隐藏
				'hideAlbum': param.hideAlbum || false
			},(res) => {
				let code = res.resp_result.trim();
				resolve(code);
			});
		}else{
			reject();
		}
	})
}
