<!-- home -->
<template>
  <div>
    <top-bar>
      <span slot="topText" class="top-text">图片详情</span>
    </top-bar>
    <van-image
      width="100%"
      height="100%"
      fit="scale-down"
      :src="pictureData.url"
    />
    <HanderBar :pictureId="pictureId" @closeMe="handleClose"/>
  </div>
</template>

<script>
  import { info as getInfo } from '@/api/picture/picture.js'
  import { Image as VanImage,Lazyload,Notify,Divider,Col,Row } from 'vant';
  import TopBar from "components/TopBar";
  import HanderBar from "./handleBar";

export default {
  name:'PictureInfo',
  components: {
    TopBar,
    HanderBar,
    [VanImage.name]: VanImage,
    [Lazyload]: Lazyload,
    [Notify.Component.name]: Notify.Component,
    [Divider.name]: Divider,
    [Col.name]: Col,
    [Row.name]: Row
  },
  data() {
    return {
      pictureId:undefined,
      pictureData:{}
    }
  },
  computed: {

  },
  mounted() {
    this.pictureId = this.$route.params.id;
    this.getPicture(this.pictureId);
  },
  methods: {
    /**获取图片详情*/
    getPicture(id) {
      // 请求接口数据
      getInfo(id).then(response => {
        this.pictureData = response;
      }).catch(() => {
      });
    },
    /**评论*/
    handleComment(){

    },
    /**收藏*/
    handleStar(){

    },
    /**举报*/
    handleReport(){

    },
    /**关闭*/
    handleClose(){
      this.$router.back(-1)
    },
    /**下载*/
    handleDownload(){

    }
  }
}
</script>
