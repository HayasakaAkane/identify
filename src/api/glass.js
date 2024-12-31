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
      msg_id: '1037',
      qry_len: 50,
    },
    headers: {
      sessionid: sessionid,
    },
  })
}
