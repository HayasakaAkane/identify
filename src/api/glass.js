// 眼镜相关请求
import request from '@/utils/request'

// 眼睛告警

export const GetGlassAllarm = data => {
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

export const GetAllAvatar = (sessionid, startNo, qryLen) => {
  return request({
    url: '/api/json',
    method: 'POST',
    data: {
      msg_id: '1036',
      // msg_id: "1040",
      qry_len: 50,
    },
    headers: {
      sessionid: data,
      msg_id: '1037',
      start_no: startNo,
      qry_len: qryLen,
    },
    headers: {
      sessionid: sessionid,
    },
  })
}
