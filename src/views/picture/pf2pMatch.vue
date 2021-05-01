<template>
  <div class="container-water-fall">
    <top-bar>
        <span slot="topText" class="top-text">图片匹配结果</span>
    </top-bar>
    <van-pull-refresh v-model="pullLoading" @refresh="resetSearch">
    <van-form>
      <van-field name="slider" label="最低匹配度(%)" label-width="120px"	>
        <template #input>
          <van-slider v-model="minRate" active-color="#ee0a24" :min="0" :max="100" @change="onChangeRate" >
            <template #button>
              <div class="custom-button">{{ minRate }}</div>
            </template>
          </van-slider>
        </template>
        <template #right-icon>
          <van-button plain class="app-menu-color" size="small" icon="more" v-if="cursor>0" @click="getPictureList">更多</van-button>
        </template>
      </van-field>
    </van-form>
    <waterfall :col="col" :data="data" @loadmore="loadmore">
      <template>
        <div class="cell-item" v-for="(item,index) in data" :key="index">
          <img v-if="item.ssUrl" :lazy-src="item.ssUrl" alt="加载错误" @click="viewNormalSzie(item.msUrl)">
          <div class="item-body">
            <div class="item-desc">
            {{item.title}}
            <van-tag v-if="item.matchedFaceId==item.matchFaceId" type="primary">本图</van-tag>
            </div>
            <div class="item-footer">
              <div
                v-if="item.userAvatar"
                class="avatar"
                @click="showMatchInfo(item)"
                :style="{backgroundImage : `url(${item.userAvatar})` }">
              </div>
              <div class="name">
                <van-tag v-if="item.rate>=matchedRate" type="success">匹配</van-tag>
              </div>
              <div class="like">
                <i></i>
                <div class="like-total" @click="showMatchInfo(item)">
                  匹配度:{{(item.rate*100).toFixed(0)}}%
                </div>
                <div
                  v-if="item.matchedFaceUrl"
                  class="avatar"
                  @click="showMatchInfo(item)"
                  :style="{backgroundImage : `url(${item.matchedFaceUrl})` }">
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </waterfall>
    <van-popup
      v-model="showPop"
      position="top"
      :closeable="true"
      close-icon="clear"
      :style="{ height: '100%' }" >
      <MatchInfo :matchData="matchData" @closeMe="showPop=false"/>
    </van-popup>
    <!--上拉刷新状态-->
    <div class="align-center" v-if="pushLoading==true">
      <van-loading type="spinner" color="#009999" size="24px"/>
    </div>
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>
    </van-pull-refresh>
  </div>
</template>

<script>
  import {pf2pMatch} from '@/api/picture/picture.js'
  import {Notify,Tag,ImagePreview,Popup,Slider,Form,Field,Dialog,PullRefresh,Loading } from 'vant';
  import TopBar from "components/TopBar";
  import MatchInfo from "./matchInfo";
  import {defaultRate} from '@/utils/index.js'

  export default {
    name: "Pf2pMatch",
    props: {
      title: String
    },
    components: {
      TopBar,
      MatchInfo,
      [Tag.name]: Tag,
      [Slider.name]: Slider,
      [Form.name]: Form,
      [Field.name]:Field,
      [Dialog.Component.name]: Dialog.Component,
      [Popup.name]: Popup,
      [ImagePreview.Component.name]: ImagePreview.Component,
      [PullRefresh.name]: PullRefresh,
      [Loading.name]: Loading
    },
    data() {
      return {
        //下拉刷新使用
        pullLoading:false,
        //列表上拉的刷新使用
        pushLoading: false,
        //匹配度
        minRate:defaultRate,
        showPop:false,
        matchData:{},
        //游标
        cursor: undefined,
        pictureFaceId:undefined,
        //图片数据
        data: [],
        //列数
        col: 2,
        loading: false
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
      this.pictureFaceId = this.$route.params.pictureFaceId;
      this.getPictureList();
    },
    mounted(){
      //监听浏览器返回事件
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
      }
    },
    destroyed(){
      //取消监听浏览器返回事件
      window.removeEventListener('popstate', this.goBack, false);
    },
    methods: {
      /**浏览器返回事件处理*/
      goBack(){
        if(this.showPop == true){
          //只是关闭弹出层
          this.showPop = false;
          //在IE中必须得有这两行
          window.history.pushState('forward', null, '#');
          window.history.forward(-1);
        }else{
          window.history.back();
        }
      },
      /**重置搜索*/
      resetSearch(){
        this.reset();
        this.getPictureList();
      },
      /**最低匹配度改变*/
      onChangeRate(){
        if(this.minRate<=90){
          this.reset();
          this.getPictureList();
          return;
        }
        Dialog.confirm({
          title: '提示',
          message: '最低匹配度值越大，搜索速度越慢!',
        }).then(() => {
          //确认
          this.reset();
          this.getPictureList();
        }).catch(() => {
          //取消
        });
      },
      /**查看大图*/
      viewNormalSzie(url){
        ImagePreview({
          images: [
            url
          ],
          closeable: true,
        });
      },
      /**查看匹配信息*/
      showMatchInfo(item){
        this.showPop = true;
				//this.matchData = Object.assign({}, this.matchData, item);
        this.matchData = item;
      },
      /**获取图片列表*/
      getPictureList() {
        if(this.pushLoading == true){
          Notify({type: 'warning',message: '正在搜索中，请勿重复操作'});
          return;
        }
        let para = {
          cursor: this.cursor,
          pictureFaceId: this.pictureFaceId,
          pageSize: 10,
          minRate:this.minRate/100
        };
        this.pushLoading = true;
        pf2pMatch(para).then(res => {
          this.pushLoading = false;
          let pics = res.matchList;
          this.cursor = res.nextCursor;
          const n = pics.length;
          if (n == 0) {
            if(this.cursor==0){
              Notify({type: 'warning',message: '没有更多数据'});
              return;
            }else{
              //继续
              this.getPictureList();
            }
          }
          this.data = this.data.concat(pics);
        }).catch(() => {
          this.pushLoading = false;
        });
      },
      /**跳转上传*/
      handleUpload(){
        this.$router.push({name:'PictureUpload',query: {}})
      },
      /**跳转详情*/
      handleDetail(id){
        this.$router.push({name:'PictureFace',query: {id:id}})
      },
      /**清空图片*/
      reset() {
        //重置游标值，从头开始
        this.cursor =undefined;
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
        if(routeName!='Pf2pMatch'){
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
 .custom-button {
    width: 26px;
    color: #fff;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 100px;
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

              .like-total {
                color: #FF4479;
              }
            }

            i {
              width: 28px;
              display: block;
            }

            .like-total {
              margin-left: 10px;
              font-size: 12px;
              color: #999999;
            }
          }
        }
      }
    }
  }
</style>
