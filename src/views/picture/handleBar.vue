<!-- home -->
<template>
  <div>
    <van-divider :style="{ color: '#009999', borderColor: '#009999' }">评论</van-divider>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="评论" @click="handleComment" />
      <van-goods-action-icon icon="star-o" text="收藏" @click="handleStar" />
      <van-goods-action-icon icon="service-o" text="举报" @click="handleReport" />
      <van-goods-action-icon icon="share-o" text="分享" @click="showShare=true" />
      <van-goods-action-icon icon="close" text="关闭" @click="handleClose" />
      <van-goods-action-button
        type="primary"
        class="app-color"
        text="下载"
        @click="handleDownload"
      />
    </van-goods-action>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="handleShare"
    />
  </div>
</template>

<script>
  import { preDownload } from '@/api/picture/picture.js'
  import { Notify,Divider,Dialog } from 'vant';
  import { GoodsAction, GoodsActionIcon, GoodsActionButton,ShareSheet} from 'vant';

export default {
  name:'HandlerBar',
  components: {
    [Notify.Component.name]: Notify.Component,
    [Dialog.Component.name]: Dialog.Component,
    [Divider.name]: Divider,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [ShareSheet.name]: ShareSheet

  },
  props: {
    pictureId: undefined,
    //如果是直接搜索进来的，没有该数据
    matchData:undefined
  },
  data() {
    return {
      //分享开启状态
      showShare:false,
      pictureDLInfo:{},
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ]
      ]
    }
  },
  computed: {

  },
  //监听父层带过来的账户信息值
  watch:{
    matchData(newVal,oldVal){
      this.matchData = newVal;
    },
    pictureId(newVal,oldVal){
      this.pictureId = newVal;
    }
  },
  mounted() {

  },
  methods: {
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
      //把关闭信息传递给父组件
      this.$emit("closeMe",false);
    },
    /**分享*/
    handleShare(option,index){
      console.log(option.name);
    },
    /**图片下载审核请求*/
    handleDownloadAudit(){
      Dialog.confirm({
        title: '提示',
        message: '该图片需要作者审核后才能下载，是否向作者发送下载请求？',
      }).then(() => {
        // 请求接口数据
        const para = {id:item.id,open:item.open};
        updateOpen(para).then(response => {
          Notify({ type: 'success', message: '修改成功' });
        }).catch(() => {
        });
      }).catch(() => {

      });
    },
    /**图片下载支付请求*/
    handleDownloadPay(){
      Dialog.confirm({
        title: '提示',
        message: '该图片需要付费下载，是否要下载？',
      }).then(() => {
        // 请求接口数据

      }).catch(() => {

      });
    },
    /**下载*/
    handleDownload(){
      //console.log(JSON.stringify(this.matchData));
      // 请求接口数据
      preDownload(this.pictureId).then(response => {
        this.pictureDLInfo = response;
        if(this.pictureDLInfo.downloadType=='REDIRECT'){
          window.open(this.pictureDLInfo.originalUrl);
        }else if(this.pictureDLInfo.downloadType=='AUDIT'){
          this.handleDownloadAudit();
        }else{
          this.handleDownloadPay();
        }
      }).catch(() => {
      });
    }
  }
}
</script>
