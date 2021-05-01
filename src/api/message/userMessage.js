import request from '@/utils/request'

// 获取列表
export function getMyList(query) {
  return request({
    url: '/userMessage/getMyList',
    method: 'get',
    params: query
  })
}
