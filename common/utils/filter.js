const filters = {
	// 过滤掉小数点后末尾的0
	"filter_cutZero":function(str){
		if(str){
			if(isNaN(str)){
				const regexp=/(?:\.0*|(\.\d+?)0+)$/;
				return (str+'').replace(regexp,'$1');
			}else{
				return Number(str);
			}
		}else{
			return str;
		}
	},
	// 时间格式过滤器
	"filter_dateFormat":function(date,formats){
		var date = new Date(date+'');
		var format = formats.toLocaleLowerCase();
		var DATE = [];
		var TIME = [];
		var formarJSON = {
            yyyy: format.indexOf('y'),
            mm: format.indexOf('m'),
            dd: format.indexOf('d'),
            hh: format.indexOf('h'),
            ii: format.indexOf('i'),
            ss: format.indexOf('s')
        }
		function dateForTen(n) {
			if (n < 10) {
				return "0" + n
			} else {
				return n.toString()
			}
		}
		for(var x in formarJSON){
			if(formarJSON[x] != -1){
				switch(x){
					case 'yyyy':
						DATE.push(date.getFullYear());
					break;
					case 'mm':
						DATE.push(dateForTen(date.getMonth()+1));
					break;
					case 'dd':
						DATE.push(dateForTen(date.getDate()));
					break;
					case 'hh':
						TIME.push(dateForTen(date.getHours()));
					break;
					case 'ii':
						TIME.push(dateForTen(date.getMinutes()));
					break;
					case 'ss':
						TIME.push(dateForTen(date.getSeconds()));
					break;
				}
			}
		}
		return DATE.join("-") + (TIME.length>0 && DATE.length>0?" ":"") + (TIME.length > 0 ?TIME.join(":") : "");
	}
}

export default filters