export function toStringHandle(data = 0){
    let monneyData = Math.round(parseFloat(data)*100)/100;
    let s = monneyData.toString().split(".");
    if(s.length==1){
        monneyData = monneyData.toString()+".00";
    }
    if(s.length>1){
        if(s[1].length<2){
            monneyData = monneyData.toString()+"0";
        }
    }
    return monneyData;
}

export function getPageUrlWithArgs() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const url = currentPage && currentPage.route
    const options = currentPage && currentPage.options
    let urlWithArgs = `/${url}?`
    for (let key in options) {
      const value = options[key]
      urlWithArgs += `${key}=${value}&`
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
    return urlWithArgs
  }
/**金额相乘精度丢失问题*** */
export function accMul(arg1,arg2) 
 { 
 var m=0,s1=arg1.toString(),s2=arg2.toString(); 
 try{m+=s1.split(".")[1].length}catch(e){} 
 try{m+=s2.split(".")[1].length}catch(e){} 
 return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
 }