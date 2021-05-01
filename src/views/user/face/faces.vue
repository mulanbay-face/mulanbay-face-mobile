<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">我的人脸</span>
    </top-bar>
    <van-cell title="人脸数据" icon="star" :value="title"/>
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
                <van-switch v-model="item.open" size="24"  @change="setOpen(item)"/>
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
            <van-button plain class="app-menu-color" size="small" icon="photo-o" :to="{ name:'Uf2pMatch',params: {userFaceId:item.id} }" style="width: 100%;">匹配图片</van-button>
          </van-col>
          <van-col span="6" style="text-align: center;">
            <van-button plain class="app-menu-color" size="small" icon="user-o" :to="{ name:'Uf2ufMatch',params: {userFaceId:item.id} }" style="width: 100%;">匹配用户</van-button>
          </van-col>
          <van-col span="6" style="text-align: center;">
            <van-button plain class="app-menu-color" size="small" icon="delete-o" @click="handleDetail(item.id)" style="width: 100%;">删除人脸</van-button>
          </van-col>
        </van-row>
      </van-cell>
    </van-list>
    <van-button round block type="primary" class="btn-block" :to="{ name:'UserFaceUpload' }" >
        添加人脸
    </van-button>
  </div>
</template>

<script>
  import { fetchList as getFaceList,updateOpen } from '@/api/picture/userFace.js'

  import { Image as VanImage,Lazyload,Col,Row,Form,Dialog,Notify } from 'vant';
  import TopBar from "components/TopBar";

export default {
  name:'UserFaces',
  components: {
    TopBar,
    [VanImage.name]: VanImage,
    [Dialog.Component.name]: Dialog.Component,
    [Notify.Component.name]: Notify.Component,
    [Lazyload]: Lazyload,
    [Col.name]: Col,
    [Row.name]: Row,
    [Form.name]: Form
  },
  data() {
    return {
      //标题
      title:undefined,
      //人脸数据
      faces:[]
    }
  },
  computed: {

  },
  mounted() {
    this.getUserFaces();
  },
  methods: {
    /** 获取照片人脸 */
    getUserFaces(){
      // 请求接口数据
      getFaceList( {page:-1}).then(response => {
        this.faces = response.rows;
        const n = this.faces.length;
        if(n==0){
        	this.title = "你还没上传任何人脸数据!"
        }else{
        	this.title = "一共有"+n+"张人脸数据"
        }
      }).catch(() => {
      });
    },
    uploadFace(){
      this.$router.push({name:'Login',query: {}})
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
