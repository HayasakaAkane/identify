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