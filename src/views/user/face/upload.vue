<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">人脸上传</span>
    </top-bar>
    <van-divider>请选择照片</van-divider>
    <van-uploader v-model="fileList" :max-size="20 * 1024 * 1024" multiple :max-count="1" />
    <van-form>
      <van-field
        v-model="form.title"
        label="人脸名称"
        placeholder="请输入人脸名称"
        :rules="[{ required: true, message: '请输入人脸名称' }]"
      />
      <van-field name="switch" label="是否公开">
        <template #input>
          <van-switch v-model="form.open" size="20" />
        </template>
      </van-field>
    </van-form>
    <van-button round block type="info" class="app-color" :loading="loading" loading-text="上传中..." @click="uploadPic" >
        上传
    </van-button>
    <van-cell v-if="faceUrl" title="识别结果" icon="star" :value="title"/>
    <van-image
      v-if="faceUrl"
      width="300"
      height="300"
      fit="scale-down"
      :src="faceUrl"
    />
    <van-goods-action v-if="faceUrl!=null">
      <van-goods-action-button
        type="primary"
        class="app-color"
        text="重新上传"
        @click="handleReUpload"
      />
      <van-goods-action-button
        type="primary"
        class="app-color"
        text="手动选择"
        @click="handleAddFace"
      />
      <van-goods-action-button
        type="primary"
        class="app-color"
        text="继续上传"
        @click="handleContinue"
      />
      <van-goods-action-button
        type="primary"
        class="app-color"
        text="返回列表"
        @click="handleToList"
      />
    </van-goods-action>
    <van-popup
      v-model="showPop"
      position="top"
      :closeable="true"
      close-icon="clear"
      :style="{ height: '100%' }" >
      <AddFace :userFaceData="userFaceData" @closeMe="showPop=false"/>
    </van-popup>
  </div>
</template>

<script>
  // 请求接口
  import { upload } from '@/api/picture/userFace.js'
  import { dataURLtoFile } from '@/utils/index.js'
  import {Image as VanImage,Form, Field,Notify,Uploader,Tag,Divider,Popup } from 'vant';
  import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
  import TopBar from "components/TopBar";
  import AddFace from "./addFace";

export default {
  name:'UserFaceUpload',
  components: {
    TopBar,
    AddFace,
    [Popup.name]: Popup,
    [VanImage.name]: VanImage,
    [Uploader.name]: Uploader,
    [Form.name]: Form,
    [Field.name]:Field,
    [Divider.name]: Divider,
    [Tag.name]:Tag,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
  },
  data() {
    return {
      //手动添加人脸
      showPop:false,
      loading:false,
      //文件列表
      fileList:[],
      //表单数据
      form:{
        open:true
      },
      faceUrl:undefined,
      title:undefined,
      userFaceData:{}
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    /** 重新上传图片 */
    handleReUpload(){
      //发送后台删除图片
      this.handleContinue();
    },
    /** 手动选择人脸 */
    handleAddFace(){
      this.showPop = true;
    },
    /** 继续上传人脸 */
    handleContinue(){
      //发送后台删除图片
      this.userFaceData={};
      this.faceUrl = null;
      this.fileList=[];
    },
    /** 返回列表 */
    handleToList(){
      this.$router.push({name:'UserFaces',params: {}})
    },
    /** 上传图片 */
    uploadPic(){
      if(this.fileList.length==0){
        Notify({type: 'warning',message: '请选择图片上传'});
      	return;
      }
      this.loading=true;
      //base64数据
      const fileData = dataURLtoFile(this.fileList[0].content);
      let formData = new FormData();
      formData.append("file",fileData);
      formData.append("title",this.form.title);
      formData.append("open",this.form.open);

      // 请求接口数据
      upload(formData).then(response => {
        this.loading=false;
        this.userFaceData = response;
        if(response.id==null){
          this.faceUrl = response.originalUrl;
          this.title = '未能识别出人脸';
        }else{
          this.faceUrl = response.url;
          this.title = '识别出人脸';
        }
        //this.$router.push({name:'PictureFace',params: {id:response}})
      }).catch(() => {
        this.loading=false;
      });
    }
  }
}
</script>
