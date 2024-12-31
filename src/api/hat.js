// 帽子相关请求
import request from '@/utils/request'

export const GetHatAllarm = data => {
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
