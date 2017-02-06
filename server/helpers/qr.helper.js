/*
 * Author: Magic·Zhang <Magic@foowala.com>
 * Module description: 生成二维码
 */

const request_https = require('request');
const _token = require('./token.helper');
const config = require('../../config/config');

/**
 * [生成永久二维码]
 * @param  {number} objectid [description]
 * @return {string} tikect          [description]
 */
function createQrstr (objectid){
    return new Promise((resolve, reject) => {
        _token.getToken(config.qr.token)
            .then(accesstoken => {
                const token = JSON.parse(accesstoken).data,
                      qrurl = config.qr.qrurl + token,
                      tikecturl = config.qr.ticketurl;
                      
                let tikectJson = {
                    "action_name": "QR_LIMIT_STR_SCENE",
                    "action_info": {
                        "scene": { "scene_str": objectid}
                    }
                }

                const options = {
                    headers: {"Connection": "close"},
                    url: qrurl,
                    method: 'POST',
                    json:true,
                    body: tikectJson
                }

                request_https.post(options, (err, httpResponse, body) => {
                    let tikect = tikecturl + body.ticket;
                    resolve(tikect);
                })
            })
            .catch((err) => {
                console.error(err);
                reject('get tikect fail');
            })
    })
}

/**
 * [生成临时二维码 description]
 * @param  {string} scene_id [description]
 * @return {string} tikect   [description]
 */
function createQRSCENE (scene_id) {
    return new Promise((resolve, reject) => {
        _token.getToken(config.qr.token)
            .then(accesstoken => {
                const token = JSON.parse(accesstoken).data,
                      qrurl = config.qr.qrurl + token,
                      tikecturl = config.qr.ticketurl;
                let tikectJson = {
                    "expire_seconds": 72000,
                    "action_name": "QR_SCENE",
                    "action_info": {
                        "scene": { "scene_id": scene_id}
                    }
                };

                const options = {
                    headers: {"Connection": "close"},
                    url: qrurl,
                    method: 'POST',
                    json:true,
                    body: tikectJson
                }

                request_https.post(options, (err, httpResponse, body) => {
                    let tikect = tikecturl + body.ticket;
                    resolve(tikect);
                })
            })
            .catch((err) => {
                if (err) {
                    console.error(err);
                    reject('get tikect fail');
                }
            })
    })
}


export default {
    createQrstr,
    createQRSCENE
}
