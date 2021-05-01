<!-- home -->
<template>
  <div>
    <top-bar>
      <span slot="topText" class="top-text">图片上传</span>
    </top-bar>
    <van-divider :style="{ color: '#009999', borderColor: '#009999' }">请选择照片</van-divider>
    <van-uploader v-model="fileList" :max-size="20 * 1024 * 1024" multiple :max-count="1" />
    <van-field
      v-model="form.title"
      required
      label="图片标题"
      placeholder="请输入图片标题"
      :rules="[{ required: true, message: '请输入图片标题' }]"
    />
    <van-field
      v-model="form.searchTypeName"
      required
      label="搜索类型"
      placeholder="请选择搜索类型"
      :readonly="true"
      is-link
      @focus="showSearchType=true"
      :rules="[{ required: true, message: '请选择搜索类型' }]"
    />
    <van-field
      v-model="form.downloadTypeName"
      required
      label="下载类型"
      placeholder="请选择下载类型"
      :readonly="true"
      is-link
      @focus="showDownloadType=true"
      :rules="[{ required: true, message: '请选择下载类型' }]"
    />
    <van-divider :style="{ color: '#009999', borderColor: '#009999' }">图片标签</van-divider>
    <div>
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        placeholder="添加标签"
        @tags-changed="newTags => tags = newTags"
      />
    </div>
    <van-action-sheet v-model="showSearchType" :actions="searchTypeOptions" @select="onSelectSearchType" />
    <van-action-sheet v-model="showDownloadType" :actions="downloadTypeOptions" @select="onSelectDownloadType" />
    </br>
    <van-button round block type="info" class="app-color" :loading="loading" loading-text="上传中..." @click="uploadPic" >
        上传
    </van-button>
    <main-tar-bar :pageActive="1"></main-tar-bar>
  </div>
</template>

<script>
  // 请求接口
  import { upload } from '@/api/picture/picture.js'
  import { dataURLtoFile } from '@/utils/index.js'
  import { tagsToKeywords } from '@/utils/index.js'
  import {Form, Field,Notify,Uploader,ActionSheet,Tag,Divider } from 'vant';
  import MainTarBar from "components/MainTarBar";
  import VueTagsInput from '@johmun/vue-tags-input';
  import TopBar from "components/TopBar";

export default {
  name:'PictureUpload',
  components: {
    TopBar,
    MainTarBar,
    VueTagsInput,
    [Uploader.name]: Uploader,
    [Form.name]: Form,
    [Field.name]:Field,
    [ActionSheet.name]:ActionSheet,
    [Divider.name]: Divider,
    [Tag.name]:Tag
  },
  data() {
    return {
      //标签功能
      tags:[],
      tag:undefined,
      loading:false,
      //文件列表
      fileList:[],
      inputTag:undefined,
      //表单数据
      form:{
        searchType:'PUB',
        searchTypeName:'公开',
        downloadType:'REDIRECT',
        downloadTypeName:'直接下载'
      },
      //搜索类型选择器
      showSearchType:false,
      searchTypeOptions:[],
      //下载类型
      showDownloadType:false,
      downloadTypeOptions:[]
    }
  },
  computed: {

  },
  mounted() {
    //搜索类型
    this.getEnumTree('SearchType','FIELD',false).then(response => {
      this.searchTypeOptions = response;
    });
    //下载类型
    this.getEnumTree('DownloadType','FIELD',false).then(response => {
      this.downloadTypeOptions = response;
    });
  },
  methods: {
    /** 选择搜索类型 */
    onSelectSearchType(item){
      this.form.searchTypeName = item.name;
      this.form.searchType = item.id;
      this.showSearchType = false;
    },
    /** 选择下载类型 */
    onSelectDownloadType(item){
      this.form.downloadTypeName = item.name;
      this.form.downloadType = item.id;
      this.showDownloadType = false;
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
      formData.append("searchType",this.form.searchType);
      formData.append("downloadType",this.form.downloadType);
      formData.append("keywords",tagsToKeywords(this.tags));
      // 请求接口数据
      upload(formData).then(response => {
        this.$router.push({name:'PictureFace',params: {id:response}})
      }).catch(() => {
        this.loading=false;
      });
    }
  }
}
</script>
