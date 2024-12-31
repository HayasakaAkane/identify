// 帽子相关请求
import request from '@/utils/request'
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
