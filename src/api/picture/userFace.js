import request from '@/utils/request'

// 获取用户人脸列表
export function fetchList(query) {
  return request({
    url: '/userFace/getData',
    method: 'get',
    params: query
  })
}

//上传人脸
export function upload(data) {
  return request({
    url: '/userFace/upload',
    method: 'post',
    data
  })
}

//增加人脸
export function addFace(data) {
  return request({
    url: '/userFace/addFace',
    method: 'post',
    data
  })
}

//更新开启状态
export function updateOpen(data) {
  return request({
    url: '/userFace/updateOpen',
    method: 'post',
    data
  })
}