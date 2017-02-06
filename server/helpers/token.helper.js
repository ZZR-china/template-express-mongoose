/*
 * Author: Magic·Zhang <Magic@foowala.com>
 * Module description: 备注
 */

const request_https = require('request');

const token = {
  getToken:(url)=>{
    return new Promise((resolve, reject)=>{
      request_https(url, (err,httpResponse,body)=>{
        if(body){
          resolve(body)
        }else{
          reject('get token error');
        }
      });
    })
  }
}

export default token;
