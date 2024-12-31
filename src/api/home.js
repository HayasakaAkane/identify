import request from '@/utils/request'
export const GetKey = data => {
  return request({
    url: '/api/json',
    method: 'POST',
    data: {
      msg_id: '1286',
    },
  })
}
