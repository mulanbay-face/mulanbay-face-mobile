## 项目介绍
木兰湾图片分享是基于人脸识别、人脸比对的图片分享系统。用户上传照片系统自动识别出人脸，并通过人脸比对搜索相似人脸的照片。系统还可以通过爬虫模块爬取网络照片，以检索相似人脸照片的网页信息。

该系统是前后端分离的项目，当前项目mulanbay-face-mobile为前端移动版本，需要结合后端项目才能完整访问。

后端项目：
* 服务器端[mulanbay-face-server](https://github.com/mulanbay-face/mulanbay-face-server)

前端项目：

* 后台管理(PC端) [mulanbay-face-admin](https://github.com/mulanbay-face/mulanbay-face-admin)
* 图片分享(移动端) [mulanbay-face-mobile](https://github.com/mulanbay-face/mulanbay-face-mobile)

[木兰湾项目说明](https://gitee.com/mulanbay-face)

## 开发说明

### 所用技术

Vue、Vant、Echarts

### 文档地址

木兰湾文档[https://www.yuque.com/mulanbay/rgvt6k/uy08n4](https://www.yuque.com/mulanbay/rgvt6k/uy08n4)

### 开发环境

```bash
# 克隆项目

# 进入项目目录
cd mulanbay-face-mobile

# 安装依赖
npm install

# 启动服务
npm run serve
```

浏览器访问 http://localhost:9020

### 正式环境

```bash
# 构建生产环境
npm run build
```
## 项目截图
<table>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2021/0501/082328_20c45aa3_352331.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2021/0501/082758_151d4955_352331.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2021/0501/082453_39805147_352331.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2021/0501/082511_dc9201f7_352331.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2021/0501/082540_6d270e84_352331.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2021/0501/082615_b3d0eb0e_352331.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2021/0501/082737_597dc287_352331.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2021/0501/082403_ab5609db_352331.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2021/0501/082825_2a80e578_352331.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2021/0501/082839_8dba7632_352331.png"/></td>
    </tr>
</table>