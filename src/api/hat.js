// 帽子相关请求
import request from '@/utils/request'

export const GetHatAllarm = data => {
    return request({
        url: '/api/json',
        method: 'POST',
        data: {
            msg_id: '1036',
            qry_len: 50,
            // msg_id: "1040",
        },
        headers: {
            sessionid: data,
        },
    })
}

export const GetSnapPictures = data => {
    return request({
        url: '/api/json',
        method: 'POST',
        data: {
            msg_id: '1036',
            qry_len: 50,
            lib_name: '飞翔的',
        },
    })
  }
//导出帽子数据
export const GetAllAvatar = (sessionid, startNo, qryLen) => {
  return request({
    url: '/api/json',
    method: 'POST',
    data: {
      msg_id: '1037',
      start_no: startNo,
      qry_len: qryLen,
    },
    headers: {
      sessionid: sessionid,
    },
  })
}
