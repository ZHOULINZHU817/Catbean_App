import CryptoJS from 'crypto-js';
export default (word)=>{
    let encrypted = "";
    const key = CryptoJS.enc.Utf8.parse("1234567887654321");
    const iv = CryptoJS.enc.Utf8.parse("1234567887654321");
    const srcs = CryptoJS.enc.Utf8.parse(word);
    encrypted = CryptoJS.AES.encrypt(srcs, key,{
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encodeURIComponent(encrypted.toString());
}