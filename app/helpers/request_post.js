const request_http = require('request');

const requestPost = (url, form) =>{
  return new Promise ((resolve, reject)=>{
    request_http.post({ url: url, form: form }, (err, httpResponse, body) => {
        resolve(body)
    })
  })
}

module.exports = exports
exports.requestPost = requestPost;