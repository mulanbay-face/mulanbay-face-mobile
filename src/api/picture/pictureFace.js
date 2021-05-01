import request from '@/utils/request'

// 获取用户图片列表
export function fetchList(query) {
  return request({
    url: '/pictureFace/getData',
    method: 'get',
    params: query
  })
}

//增加人脸
export function addFace(data) {
  return request({
    url: '/pictureFace/addFace',
    method: 'post',
    data
  })
}

//更新开启状态
export function updateOpen(data) {
  return request({
    url: '/pictureFace/updateOpen',
    method: 'post',
    data
  })
}

