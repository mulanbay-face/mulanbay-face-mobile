<template>
  <div class="bga-back-top">
    <van-pull-refresh v-model="pullLoading" @refresh="resetSearch">
    <van-search
      v-model="name"
      show-action
      @search="handleSearch"
      @clear="resetSearch"
      shape="round"
      background="#fcfdff"
      placeholder="请输入搜索关键词">
      <template #action>
        <slot name="share" >
          <!--
          <img src="@/assets/image/face.png" width="28" height="28" @click="handleFaceMatch" />
          -->
          <van-icon name="smile" size="25px" color="#099" @click="handleFaceMatch" slot="leftIcon"/>
        </slot>
      </template>
    </van-search>
    <div class="container-water-fall">
      <waterfall :col="col" :data="data" @loadmore="loadmore">
        <template>
          <div class="cell-item" v-for="(item,index) in data" :key="index">
            <img :lazy-src="item.ssUrl" alt="加载错误" @click="viewOrigin(item.msUrl)">
            <div class="item-body">
              <div class="item-desc" @click="showDetail(item.id)">
              {{item.title}}
              </div>
              <div class="item-footer">
                <div
                  v-if="item.userAvatar"
                  class="avatar"
                  :style="{backgroundImage : `url(${item.userAvatar})` }">
                </div>
                <div class="name" @click="showDetail(item.id)" >
                  {{item.username}}
                </div>
                <div class="like" :class="item.liked?'active':''">
                  <i></i>
                  <div class="like-icon">
                    <van-icon name="like-o" />
                  </div>
                  <div class="like-total">
                    {{item.likes}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </waterfall>
    </div>
    </van-pull-refresh>
    <!--上拉刷新状态-->
    <div class="align-center" v-if="pushLoading==true">
      <van-loading type="spinner" color="#009999" size="24px"/>
    </div>
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>

    <main-tar-bar :pageActive="0"></main-tar-bar>
  </div>
</template>

<script>
  /*
  注意:
  1.itemWidth需要与gutterWidth一起使用才会生效，否则会进行自适应宽度
  2.使用了waterfall的组件不允许使用scoped,否则样式会有问题
*/
  import {discoverList} from '@/api/picture/picture.js'
  import {Notify,ImagePreview,Dialog,Search,PullRefresh,Icon,Loading } from 'vant';
  import MainTarBar from "components/MainTarBar";

  export default {
    name: "PictureDiscover",
    props: {
      title: String
    },
    components: {
      [ImagePreview.Component.name]: ImagePreview.Component,
      [Dialog.Component.name]: Dialog.Component,
      [Search.name]: Search,
      [PullRefresh.name]: PullRefresh,
      [Icon.name]: Icon,
      [Loading.name]: Loading,
      MainTarBar
    },
    data() {
      return {
        //下拉刷新使用
        pullLoading:false,
        //列表上拉的刷新使用
        pushLoading: false,
        //当前页
        page: 1,
        name:undefined,
        //图片数据
        data: [],
        //列数
        col: 2
      };
    },
    computed: {
      itemWidth() {
        return 133 * 0.5 * (document.documentElement.clientWidth / 375);
      },
      gutterWidth() {
        return 10 * 0.5 * (document.documentElement.clientWidth / 375);
      }
    },
    created() {
      this.getPictureList();
    },
    methods: {
      /**跳转人脸搜索*/
      handleFaceMatch(){
        this.$router.push({name:'UserFaces',params: {}})
      },
      /**搜索*/
      handleSearch(){
        this.reset();
        this.page=1;
        this.getPictureList();
      },
      /**重置搜索*/
      resetSearch(){
        this.reset();
        this.page=1;
        this.getPictureList();
      },
      /**获取图片列表*/
      getPictureList() {
        let para = {
          name:this.name,
          page: this.page,
          pageSize: 10,
          needTotal:false
        };
        this.pushLoading = true;
        discoverList(para).then(res => {
          this.pushLoading = false;
          let pics = res.rows;
          const n = pics.length;
          if (n == 0) {
            Notify({type: 'warning',message: '没有更多数据'});
            return;
          }
          this.data = this.data.concat(pics);
        }).catch(() => {
          this.pushLoading = false;
        });
      },
      /**查看原图*/
      viewOrigin(url){
        ImagePreview({
          images: [
            url
          ],
          closeable: true,
        });
      },
      /**查看信息*/
      showDetail(id){
        this.$router.push({name:'PictureInfo',params: {id:id}})
      },
      /**编辑*/
      handleEdit(id){
        this.$router.push({name:'PictureEdit',params: {id:id}})
      },
      /**删除*/
      handleDelete(id){
        Dialog.confirm({
          title: '提示',
          message: '是否确定要删除该照片?',
        }).then(() => {
          //确认

        }).catch(() => {
          //取消
        });
      },
      /**清空图片*/
      reset() {
        this.pullLoading = false;
        this.data = [];
      },
      /**设置最大列数*/
      switchCol(col) {
        this.col = col;
      },
      /**下拉加载更多*/
      loadmore() {
        let routeName = this.$route.name;
        /**
         * 解决vue-waterfall监听整个windows的scroll问题
         * 如果设置height，会导致页面返回时无法重新定位到原来位置
         * 如果不设置height，waterfall监听整个windows的scroll
         */
        if(routeName!='PictureDiscover'){
          console.log('来自其他页面的scroll刷新监听,router:'+routeName);
          return;
        }
        setTimeout(() => {
          this.page += 1;
          this.getPictureList();
        }, 1000);
      }
    }
  };
</script>
<style lang="less" scoped>
  * {
    margin: 0;
  }
  .container-water-fall {
    // padding: 0 28px;
    width: 100vw;
    box-sizing: border-box;
    h4 {
      padding-top: 56px;
      padding-bottom: 28px;
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #000000;
      letter-spacing: 1px;
      text-align: justify;
    }
    .cell-item {
      width: 100%;
      // margin-bottom: 18px;
      background: #ffffff;
      border: 2px solid #F0F0F0;
      border-radius: 12px 12px 12px 12px;
      overflow: hidden;
      box-sizing: border-box;
      img {
        // border-radius: 12px 12px 0 0;
        width: 100%;
        height: auto;
        display: block;
      }

      .item-body {
        // border: 1px solid #F0F0F0;
        padding: 12px;

        .item-desc {
          font-size: 15px;
          color: #333333;
          line-height: 15px;
          font-weight: bold;
        }

        .item-footer {
          margin-top: 22px;
          position: relative;
          display: flex;
          align-items: right;

          .avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-repeat: no-repeat;
            background-size: contain;
          }

          .name {
            max-width: 150px;
            margin-left: 10px;
            font-size: 14px;
            color: #999999;
          }

          .like {
            position: absolute;
            right: 0;
            display: flex;
            align-items: center;

            &.active {
              i {}
            }

            i {
              width: 28px;
              display: block;
            }

            .like-total {
              margin-left: 3px;
              font-size: 12px;
              color: #999999;
            }
            .like-icon {
              font-size: 18px;
              color: #aa031c;
            }
          }
        }
      }
    }
  }
</style>
