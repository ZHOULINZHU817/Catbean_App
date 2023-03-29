import http from '@/api/http.js';
import { loginApi, memberShipApi, goodsApi, qrCodeApi, centerApi } from "@/api/httpApi.js";
import store from "@/store/index.js";
import {getCaption} from "@/utils/prototype/string.js";
class Auth {
    constructor(){
     
    };
    login() {
        return new Promise(function (resolve, reject) {
            uni.login({
              success: function (res) {
                  if (res.code) {
                  resolve(res);
                  } else {
                  reject(res);
                  }
              },
              fail: function (err) {
                  reject(err);
              }
            });
        });
    };
    getOpenId(){
      let that=this;
      return new Promise(function(resolve, reject){
        that.login().then(res => {
          let jscode = res.code;
          http.post(`${loginApi.miniAppWxLogin}/${jscode}`,{data:{}}).then((res)=>{
            resolve(res)
          })
        })
        .catch(err => {
            reject(err)
        })
      })
    }
    /**
     * 调用微信登录，获取微信code，作为参数，来请求后端登录接口数据（接口返回token和用户的登录信息）
     * 1.返回code=203说明登录失败：用户为空。说明是新用户，此时需要微信授权注册（才能获取用户信息），跳转微信授权注册页面，用户点击确定登录授权完后，再resolve
     * 2.code=200说明微信登录成功，将返回的token和用户信息存储在缓存中，再resolve
     **/
    wxLogin(phoneNumber) {
        let that=this;
        return new Promise(function(resolve, reject){
          const openid = uni.getStorageSync('openid')
          http.post(`${loginApi.miniAppLogin}/${phoneNumber}/${openid}`,{ data: { phoneNumber: phoneNumber, openid: openid } }).then((res)=>{
              let fishToken = res.data && res.data.token;
              let authUid = res.data && res.data.uid;
              let accountProfile = res.data && res.data.accountProfile;
              uni.setStorage({
                  key: 'fishToken',  
                  data: fishToken
              });
              uni.setStorage({
                  key: 'authUid',  
                  data: authUid
              });
              uni.setStorage({
                key: 'accountProfile',  
                data: accountProfile
            });
              that.putCards(res);
              that.getCardNum(); //获取购物车数量
              that.bindingInviter(res);//绑定关系
              setTimeout(()=>{
                resolve(res)
              },1000)
          }).catch(err=>{
            reject(err)
          })
        })
    };
    /**手机号授权** */
    isVerifyPhone(e) {
        const that = this;
        return new Promise((resolve, reject) => {
          if (e.detail.errMsg === 'getPhoneNumber:ok') {
            that.getOpenId().then(result=>{
              /**可以存储openid* */
              let openid;
              if(result.data && result.data.openid){
                openid = result.data.openid;
                uni.setStorageSync('openid', openid)
                const { encryptedData, iv } = e.detail;
                /*******获取手机号****** */
                let obj={ 
                  encryptedData: encryptedData,
                  iv: iv,
                  openid: openid
                }
                http.post(loginApi.miniAppWxPhone,{data: obj}).then((res)=>{
                  if(res.code == 200000){
                      let phoneNumber = res.data && res.data.phoneNumber;
                      uni.setStorageSync('phoneNumber', phoneNumber)
                      that.wxLogin(phoneNumber).then(res1 => {
                        if (!!res1) {
                          resolve(true);
                        }
                      })
                  }else{
                    uni.showToast({title: res.message,icon: 'none'})
                  }
                })
              }else{
                uni.showToast({title: result.message,icon: 'none'})
              }
            })
          } else {
            reject();
          }
        });
      };
      /*****确认授权***** */
      isVerifyAuth(){
        return new Promise((resolve,reject)=>{
          let userInfo = uni.getStorageSync('userInfo');
          if(!userInfo){
            uni.getUserProfile({
              	desc:'登录',
              	success:(e)=>{
                  uni.setStorageSync('userInfo', e.userInfo)
                  let accountProfile = uni.getStorageSync('accountProfile');
                  if(accountProfile.name == "请设置名字"){
                    let params ={
                      name: e.userInfo && e.userInfo.nickName && e.userInfo.nickName.substr(0,5),
                      uid : accountProfile.uid
                    }
                    http.get(`${centerApi.myProfile}/${params.uid}/${params.name}`,{data: params}).then((res)=>{
                      resolve(true)
                    })
                  }else{
                    resolve(true)
                  }
                },
                fail:(err)=>{
                  reject(err)
                }
            })
          }else{
            resolve(true);
          }
        })
      };
      /******升级会员卡***** */
      putCards(res){
        http.post(memberShipApi.putCards,{ data : {} }).then((res)=>{
            
        })
      };
      /*****绑定关系***** */
      bindingInviter(res){
        console.log("测试-绑定信息",getCurrentPages())
        if(res.code == 201000){ //登录不需要绑定关系
          //  uni.showToast({title: '登录成功!', duration: 2000, icon: 'none'});
           return;
        }
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 1]
        const options = currentPage && currentPage.options;
        let str = options.backUrl && decodeURIComponent(options.backUrl);
        let authUid = str ? getCaption(str) : options.recommendUid;
        let uid = uni.getStorageSync('recommendUid') || authUid;
        http.post(memberShipApi.bindingInviter,{data:{inviterAccountProfileUid: uid}}).then((res)=>{
            if(res.code != 200000){
              uni.showToast({title: '绑定失败!', duration: 2000, icon: 'none'});
            }
        })
      };
      /*****查看身份是否是店长***** */
      zoneleaderShop(){
        const phoneNumber = uni.getStorageSync('phoneNumber');
        return new Promise(function(resolve,reject){
          if(phoneNumber){
            http.get(`${memberShipApi.zoneleaderShop}${phoneNumber}`,{data:{phoneNumber: phoneNumber}}).then((res)=>{
              if(res.code == 200000){
                let manager =  res.data && res.data;
                uni.setStorageSync('manager', manager)
                resolve(true);
              }else{
                reject(res.message)
                uni.showToast({title: res.message,icon: 'none'})
              }
            })
          }else{
            resolve(true);
          }
        })
      };
      /******伙伴切换token****** */
      checkToken(type){
        return new Promise(function(resolve,reject){
          const openid = uni.getStorageSync('openid');
          const phoneNumber = uni.getStorageSync('phoneNumber');
          uni.request({
              url: `${loginApi.miniAppLogin}/${phoneNumber}/${openid}`,
              method:'POST',
              header: {
                  'content-type':'application/json',
                  'clientId': 'REDFISH_IOS',
                  'realm': type == 'member'?'CLUB':'FELLOW',//区分红礼鱼会员跟红礼鱼伙伴
                  'clientTime': new Date().getTime(),
                  'Authorization': ''
              },
              data: { data : {phoneNumber: phoneNumber, openid: openid }},
              success: (res) => {
                let data = res.data;
                resolve(data)
              },
              fail: (err) =>{
                reject(err)
                uni.showToast({title: "接口请求失败",icon: 'none'})
              }
          })
        })
      };
      /*****初始化查询购物车数量****** */
      getCardNum(){
        let num=0;
        http.get(goodsApi.addCarts).then((res)=>{
          if(res.code == 200000){
            let cartList = res.data.items || [];
            cartList.forEach(item=>{
              item.commodities.map(itm=>{
                num += itm.quantity;
              })
            })
            store._mutations.cardNumFun[0](num);
          }
        })
      };
      /******扫码获取绑定关系参数接口****** */
      wxQrcode(options){
        return new Promise(function(resolve){
          let scene = options.scene;
          if(scene){
              http.get(`${qrCodeApi.wxQrcode}/${scene}`, {}).then((res)=>{
                resolve(res);
              })
          }else{
            resolve(true);
          }

        })
      };
     
     

}
export default new Auth();