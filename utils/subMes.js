import http from '@/api/http.js';
import { subscribeApi } from '@/api/httpApi.js';
class subMes{
    constructor(){
     
    };
    subMerPost(tmid,obj){
        const that = this;
        let params={
            templateId: tmid,
            data: obj,
            openid:  uni.getStorageSync('openid') || ''
        }
        return new Promise(function(resolve, reject){
            http.post(subscribeApi.sendMsg, {data: params}).then((res)=>{
                resolve(res)
            })
            .catch(e=>{
                reject();
            })
        })
    }
}
export default new subMes();