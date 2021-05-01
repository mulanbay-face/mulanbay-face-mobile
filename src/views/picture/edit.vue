<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">图片编辑</span>
    </top-bar>
    <van-image
      width="100%"
      height="100%"
      fit="scale-down"
      :src="form.url"
    />
    <van-form>
      <van-field
        v-model="form.title"
        label="图片标题"
        placeholder="请输入图片标题"
        :rules="[{ required: true, message: '请输入图片标题' }]"
      />
      <van-field
        v-model="form.searchTypeName"
        label="搜索类型"
        placeholder="请选择搜索类型"
        :readonly="true"
        is-link
        @focus="showSearchType=true"
        :rules="[{ required: true, message: '请选择搜索类型' }]"
      />
      <van-field
        v-model="form.downloadTypeName"
        label="下载类型"
        placeholder="请选择下载类型"
        :readonly="true"
        is-link
        @focus="showDownloadType=true"
        :rules="[{ required: true, message: '请选择下载类型' }]"
      />
    </van-form>
    <van-divider>图片标签</van-divider>
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
    <van-button round block type="info" class="app-color" @click="savePicture" >
        保存
    </van-button>
  </div>
</template>

<script>
  // 请求接口
  import { get as getPicture,edit as editPicture } from '@/api/picture/picture.js'
  import { keywordsToTags,tagsToKeywords } from '@/utils/index.js'
  import { Image as VanImage,Lazyload,Form,Field,ActionSheet,Notify,Divider } from 'vant';
  import TopBar from "components/TopBar";
  import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name:'PictureEdit',
  components: {
    TopBar,
    VueTagsInput,
    [VanImage.name]: VanImage,
    [Lazyload]: Lazyload,
    [ActionSheet.name]:ActionSheet,
    [Form.name]: Form,
    [Field.name]:Field,
    [Notify.Component.name]: Notify.Component,
    [Divider.name]: Divider
  },
  data() {
    return {
      //标签功能
      tags:[],
      tag:undefined,
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
    this.form.id = this.$route.params.id;
    this.getPictureInfo(this.form.id);
  },
  methods: {
    /**获取图片详情*/
    getPictureInfo(id) {
      // 请求接口数据
      getPicture(id).then(response => {
        this.form = response;
        this.tags = keywordsToTags(this.form.keywords);
      }).catch(() => {
      });
    },
    /**保存图片*/
    savePicture(){
      this.form.keywords = tagsToKeywords(this.tags);
      // 请求接口数据
      editPicture(this.form).then(response => {
        Notify({ type: 'success', message: '修改成功' });
        this.$router.back(-1);
      }).catch(() => {
      });
    },
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
