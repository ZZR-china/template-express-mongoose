/*
 * Author: Magic <magic@foowala.com>
 * Module description: 统一消息发送
 */

// error code 编号机制
// 100001 该用户名已存在

function Message() {
  return {
    success  : (data) => {
      return {
        status: 1,
        errmsg: "操作成功",
        code  : 200,
        count : data ? data.length : 0,
        data  : data
      }
    },
    send: (sign) => {
      return messageModel.getErrMsg(sign)
    }
  }
}

function messageModel() {
    let conf = {
        msg: {
            MSG_SUCCESS: {
                status: 1,
                code: 0,
                errmsg: '操作成功'
            },
            MSG_ERROR: {
                status: 0,
                code: -1,
                errmsg: '操作失败'
            },
            MSG_100001: {
                status: 0,
                code: 100001,
                errmsg: '该用户名已存在'
            },
            MSG_100002: {
                status: 0,
                code: 100002,
                errmsg: '初始密码输入错误'
            },
            MSG_100003: {
                status: 0,
                code: 100003,
                errmsg: '用户名或密码输入错误'
            },
            MSG_100004 : {
              status: 0,
              code: 100004,
              errmsg: '查询时间输入错误'
            }
        }
    }

    return {
        getErrMsg: function(sign) {
            return conf['msg']['MSG_'+sign] ? conf['msg']['MSG_'+sign] : null
        }
    }
}

export default {Message}