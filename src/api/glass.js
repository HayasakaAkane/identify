// 眼镜相关请求
import request from '@/utils/request'

// 眼睛告警
export const GetAllAvatar = data => {
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
    },
  })
}
