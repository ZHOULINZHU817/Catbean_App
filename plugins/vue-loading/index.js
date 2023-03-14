let needLoadingRequestCount = 0;
let timer;
let loadState;
import loading from "@/nativeUI/loading.js"
function startLoading(loadingText = "Loading") {
	// #ifdef APP-PLUS
	loadState = loading.show(loadingText)
	// #endif
	// #ifndef APP-PLUS
	loadState = true;
	loading.show(loadingText)
	// #endif
	
}

function endLoading() {
	// #ifdef APP-PLUS
	loadState.close();
	loadState = null;
	// #endif
	// #ifndef APP-PLUS
	loadState = null;
	uni.hideLoading()
	// #endif
}

const tryCloseLoading = () => {
	if (needLoadingRequestCount === 0) {
		endLoading()
	}
}

export function showLoading(loadingText) {
	if (timer) {
		clearTimeout(timer)
		timer = null;
	}
	if (needLoadingRequestCount === 0 && !loadState) {
		startLoading(loadingText);
	}
	needLoadingRequestCount++;
}

export function hideLoading() {
	if (needLoadingRequestCount <= 0) {
		return;
	}
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		timer = setTimeout(() => {
			tryCloseLoading();
		}, 300)
	}
}
