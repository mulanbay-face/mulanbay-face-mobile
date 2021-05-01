// axios
import request from '@/utils/request'

// 获取用户详细信息
export function getProfile() {
  return request({
    url: '/user/getProfile',
    method: 'get'
  })
}

export function editProfile(data) {
  return request({
    url: '/user/editProfile',
    method: 'post',
    data: data
  })
}
