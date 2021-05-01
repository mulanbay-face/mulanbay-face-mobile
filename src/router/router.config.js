/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: true
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        redirect: '/picture/discover',
        //component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/home/login'),
        meta: { title: '登录', keepAlive: false }
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/home/register'),
        meta: { title: '注册', keepAlive: false }
      },
      {
        path: '/user/setting',
        name: 'UserSetting',
        component: () => import('@/views/user/profile/setting'),
        meta: { title: '用户设置', keepAlive: false }
      },
      {
        path: '/upload',
        name: 'PictureUpload',
        component: () => import('@/views/picture/upload'),
        meta: { title: '文件上传', keepAlive: false }
      },
      {
        path: '/picture/album',
        name: 'PictureAlbum',
        component: () => import('@/views/picture/album'),
        meta: { title: '相册', keepAlive: true }
      },
      {
        path: '/picture/discover',
        name: 'PictureDiscover',
        component: () => import('@/views/picture/discover'),
        meta: { title: '发现', keepAlive: true }
      },
      {
        path: '/picture/:id/faces',
        name: 'PictureFace',
        component: () => import('@/views/picture/faces'),
        meta: { title: '照片人脸信息', keepAlive: false }
      },
      {
        path: '/picture/info/:id',
        name: 'PictureInfo',
        component: () => import('@/views/picture/info'),
        meta: { title: '照片详情', keepAlive: false }
      },
      {
        path: '/picture/edit/:id',
        name: 'PictureEdit',
        component: () => import('@/views/picture/edit'),
        meta: { title: '照片编辑', keepAlive: false }
      },
      {
        path: '/picture/pf2pMatch/:pictureFaceId',
        name: 'Pf2pMatch',
        component: () => import('@/views/picture/pf2pMatch'),
        meta: { title: '人脸匹配', keepAlive: false }
      },
      {
        path: '/picture/uf2pMatch/:userFaceId',
        name: 'Uf2pMatch',
        component: () => import('@/views/picture/uf2pMatch'),
        meta: { title: '图片匹配', keepAlive: false }
      },
      {
        path: '/picture/uf2ufMatch/:userFaceId',
        name: 'Uf2ufMatch',
        component: () => import('@/views/picture/uf2ufMatch'),
        meta: { title: '人脸匹配', keepAlive: false }
      },
      {
        path: '/picture/addFace/:pictureId',
        name: 'AddPictureFace',
        component: () => import('@/views/picture/addFace'),
        meta: { title: '增加人脸', keepAlive: false }
      },
      {
        path: '/picture/pf2ufMatch/:pictureFaceId',
        name: 'Pf2ufMatch',
        component: () => import('@/views/picture/pf2ufMatch'),
        meta: { title: '图片人脸匹配', keepAlive: false }
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/index'),
      },
      {
        path: '/user/face/upload',
        name: 'UserFaceUpload',
        component: () => import('@/views/user/face/upload'),
        meta: { title: '增加人脸', keepAlive: false }
      },
      {
        path: '/user/faces',
        name: 'UserFaces',
        component: () => import('@/views/user/face/faces'),
        meta: { title: '用户人脸', keepAlive: false }
      },
      {
        path: '/user/message',
        name: 'UserMessage',
        component: () => import('@/views/user/message/index'),
        meta: { title: '用户消息', keepAlive: true }
      }
    ]
  }
]
