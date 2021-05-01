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
      :src="facesUrl"
    />
    <van-cell title="识别结果" icon="star" :value="title" :value-class="textClass"/>
    <van-list
    >
      <van-cell v-for="(item, index) in faces" :key="index" >
        <van-row>
          <van-col span="8">
            <van-image :src="item.url" width="120" height="120"/>
          </van-col>
          <van-col span="16">
            <van-cell title="匹配次数" icon="star-o" :value="item.matchs"/>
            <van-cell title="命中次数" icon="star-o" :value="item.hits"/>
            <van-cell title="是否公开" icon="eye-o" center >
              <template #right-icon>
                <van-switch v-model="item.open" size="24" @change="setOpen(item)"/>
              </template>
            </van-cell>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="6" style="text-align: center;">
            <van-button v-if="item.source=='AUTO'" type="primary" size="small">{{item.sourceName}}</van-button>
            <van-button v-else type="warning" size="small">{{item.sourceName}}</van-button>
          </van-col>
          <van-col span="6" style="text-align: center;">
            <van-button plain class="app-menu-color" size="small" icon="photo-o" :to="{ name:'Pf2pMatch',params: {pictureFaceId:item.id} }" style="width: 100%;">匹配图片</van-button>
          </van-col>
          <van-col span="6" style="text-align: center;">
            <van-button plain class="app-menu-color" size="small" icon="user-o" :to="{ name:'Pf2ufMatch',params: {pictureFaceId:item.id} }" style="width: 100%;">匹配用户</van-button>
          </van-col>
          <van-col span="6" style="text-align: center;">
            <van-button plain class="app-menu-color" size="small" icon="delete-o" @click="handleDetail(item.id)" style="width: 100%;">删除人脸</van-button>
          </van-col>
        </van-row>
      </van-cell>
    </van-list>
    <van-goods-action>
      <van-goods-action-button
        type="primary"
        class="app-color"
        text="手动添加人脸"
        @click="addFace"
      />
      <van-goods-action-button
        type="danger"
        text="继续上传"
        @click="uploadFace"
      />
    </van-goods-action>
  </div>
</template>

<script>
  // 请求接口
  import { getDetail } from '@/api/picture/picture.js'
  import { fetchList as getFaceList,updateOpen } from '@/api/picture/pictureFace.js'

  import { Image as VanImage,Lazyload,Col,Row,Form,Dialog,Notify } from 'vant';
  import { GoodsAction, GoodsActionIcon, GoodsActionButton} from 'vant';
  import TopBar from "components/TopBar";

export default {
  name:'PictureFace',
  components: {
    TopBar,
    [VanImage.name]: VanImage,
    [Dialog.Component.name]: Dialog.Component,
    [Notify.Component.name]: Notify.Component,
    [Lazyload]: Lazyload,
    [Col.name]: Col,
    [Row.name]: Row,
    [Form.name]: Form,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
  },
  data() {
    return {
      textClass:'green-text',
      //大图
      facesUrl:undefined,
      //人脸数据
      faces:[],
      //标题
      title:undefined,
      //图片数据
      pictureData:{},
      pictureId:undefined
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
      getDetail(id).then(response => {
        this.pictureData = response;
        this.getPictureFaces(id);
      }).catch(() => {
      });
    },
    /** 获取照片人脸 */
    getPictureFaces(id){
      // 请求接口数据
      getFaceList( {pictureId:id,page:-1}).then(response => {
        this.faces = response.rows;
        const n = this.faces.length;
        if(n==0){
        	this.title = "未能识别到任何人脸数据!"
        	this.facesUrl = this.pictureData.msUrl;
          this.textClass = "red-text";
        }else{
        	this.title = "一共识别到"+n+"张人脸数据"
        	//this.facesUrl = this.pictureData.facesUrl;
          this.facesUrl = this.pictureData.msUrl;
          this.textClass = "green-text";
        }
      }).catch(() => {
      });
    },
    uploadFace(){
      this.$router.push({name:'PictureUpload',params: {}})
    },
    addFace(){
      this.$router.push({name:'AddPictureFace',params: {pictureId:this.pictureId}})
    },
    /**更新开启状态*/
    setOpen(item) {
      const open = item.open;
      let title=undefined;
      if(open==true){
        title='状态为开启，那么该人脸会被其他用户搜索匹配到';
      }else{
        title='状态为关闭，那么该人脸将不会被其他用户搜索匹配到';
      }
      Dialog.confirm({
        title: '提示',
        message: title,
      }).then(() => {
        //确认
        // 请求接口数据
        const para = {id:item.id,open:item.open};
        updateOpen(para).then(response => {
          Notify({ type: 'success', message: '修改成功' });
        }).catch(() => {
        });
      }).catch(() => {
        //取消（需要还原状态）
        item.open = !open;
      });
    }
  }
}
</script>
<style scoped>
  .green-text{
      color: #099;
  }
  .red-text{
      color: #aa0000;
  }
</style>
