import request from '@/utils/request'

// 获取用户图片列表
export function fetchList(query) {
  return request({
    url: '/picture/getData',
    method: 'get',
    params: query,
    hideloading:true
  })
}

// 用户图片列表
export function discoverList(query) {
  return request({
    url: '/picture/discover',
    method: 'get',
    params: query,
    hideloading:true
  })
}


// 上传
export function upload(data) {
  return request({
    url: '/picture/upload',
    method: 'post',
    data
  })
}

// 获取用户图片详情
export function getDetail(id) {
  return request({
    url: '/picture/detail',
    method: 'get',
    params: {id:id}
  })
}

// 预下载
export function preDownload(id) {
  return request({
    url: '/picture/preDownload',
    method: 'get',
    params: {id:id}
  })
}

// 获取用户图片
export function get(id) {
  return request({
    url: '/picture/get',
    method: 'get',
    params: {id:id}
  })
}

// 获取用户图片
export function info(id) {
  return request({
    url: '/picture/info',
    method: 'get',
    params: {id:id}
  })
}

// 编辑
export function edit(data) {
  return request({
    url: '/picture/edit',
    method: 'post',
    data
  })
}

// 用户图片的人脸与用户图片匹配
export function pf2pMatch(data) {
  return request({
    url: '/picture/pf2pMatch',
    method: 'post',
    data,
    hideloading:true
  })
}

// 用户自己的人脸与用户图片匹配
export function uf2pMatch(data) {
  return request({
    url: '/picture/uf2pMatch',
    method: 'post',
    data,
    hideloading:true
  })
}

// 用户图片的人脸与用户的人脸匹配
export function pf2ufMatch(data) {
  return request({
    url: '/picture/pf2ufMatch',
    method: 'post',
    data,
    hideloading:true
  })
}

// 用户自己的人脸与用户的人脸匹配
export function uf2ufMatch(data) {
  return request({
    url: '/picture/uf2ufMatch',
    method: 'post',
    data,
    hideloading:true
  })
}
