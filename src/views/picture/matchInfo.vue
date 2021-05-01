<!-- home -->
<template>
  <div>
    <van-divider :style="{ color: '#009999', borderColor: '#009999' }">原图</van-divider>
    <van-image
      width="100%"
      height="100%"
      fit="scale-down"
      :src="matchData.msUrl"
    />
    <van-divider :style="{ color: '#009999', borderColor: '#009999' }">匹配度:{{(matchData.rate*100).toFixed(0)}}%</van-divider>
    <van-row gutter="10">
      <van-col span="12">
        <van-image :src="matchData.matchFaceUrl" :width="width" :height="width"/>
      </van-col>
      <van-col span="12">
        <van-image :src="matchData.matchedFaceUrl" :width="width" :height="width" />
      </van-col>
    </van-row>
    <HanderBar :pictureId="pictureId" :matchData="matchData" @closeMe="handleClose"/>
  </div>
</template>

<script>
  import { Image as VanImage,Lazyload,Notify,Divider,Col,Row } from 'vant';
  import HanderBar from "./handleBar";

export default {
  name:'PictureMatchInfo',
  components: {
    HanderBar,
    [VanImage.name]: VanImage,
    [Lazyload]: Lazyload,
    [Notify.Component.name]: Notify.Component,
    [Divider.name]: Divider,
    [Col.name]: Col,
    [Row.name]: Row
  },
  props: {
    matchData: {
      type: Object
    }
  },
  data() {
    return {
      pictureId:undefined,
      width:(document.body.clientWidth - 5)/2
    }
  },
  computed: {

  },
  mounted() {
    this.pictureId = this.matchData.id;
    //this.barMatchData = Object.assign({}, this.barMatchData, this.matchData);
  },
  //监听父层带过来的账户信息值
  watch:{
    matchData(newVal,oldVal){
      this.matchData = newVal;
      this.pictureId = this.matchData.id;
    }
  },
  methods: {
    /**关闭*/
    handleClose(){
      //把关闭信息传递给父组件
      this.$emit("closeMe",false);
    }
  }
}
</script>
