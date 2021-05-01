<template>
  <div class="profile-box">
      <div class="setting-icon">
        <van-icon name="setting-o" color="#fff" size="1rem" @click="handleSetting"/>
      </div>
      <div class="user-image">
        <van-image round width="80px" height="80px" :src="userData.avatar" class="photo">
          <template v-slot:loading>
              <van-loading type="spinner" size="20"/>
          </template>
        </van-image>
        <div class="user-name">
          <span style="font-size: 18px">{{userData.username}}</span>

          <span style="cofont-size: 18px;color: #AA0000;" @click="handleLogout" >退出系统</span>

          <span v-show="userData.level>3" class="is-vip" @click="$router.push('/addVip')">
              <img src="@/assets/image/isVip.png" width="20px" height="20px">&nbsp;&nbsp;到期时间:{{userInfo.vipDate | filterText}}
          </span>

          <span v-show="userData.level<=3" class="is-vip" @click="$router.push('/addVip')">
              <img src="@/assets/image/noVip.png" width="20px" height="20px">&nbsp;&nbsp;到期时间:{{userInfo.vipDate | filterText}}
          </span>
        </div>
      </div>

      <div class="user-content">
        <van-grid :column-num="4" icon-size="20px" style="height: 60px">
          <van-grid-item icon="gold-coin-o" style="height: 60px" to="/userBalance">
            <div class="balance-text" slot="text">
                <div class="balance-name">账号余额</div>
                <div class="balance-value">{{userData.points}}</div>
            </div>
          </van-grid-item>
          <van-grid-item icon="gem-o" style="height: 60px" to="/userIntegral">
            <div class="balance-text" slot="text">
                <div class="balance-name">我的积分</div>
                <div class="balance-value">{{userData.points}}</div>
            </div>
          </van-grid-item>
          <van-grid-item icon="star-o" style="height: 60px" to="/userCollect">
            <div class="balance-text" slot="text">
                <div class="balance-name">收藏商品</div>
                <div class="balance-value">{{userEnshrine | numFilter}}件商品</div>
            </div>
          </van-grid-item>
          <van-grid-item icon="chat-o" style="height: 60px" to="/userEvaluate">
            <div class="balance-text" slot="text">
                <div class="balance-name">我的评论</div>
                <div class="balance-value">{{userEvaluate | numFilter}}条评论</div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
</template>

<script>
  import {Icon, Grid, GridItem, Loading, Toast,Dialog } from 'vant';
  import {Image as VanImage} from 'vant';
  import { logout } from '@/api/auth/login.js'
  import { getProfile } from '@/api/auth/user.js'

  export default {
    name: "ProfileUser",
    components: {
      [Icon.name]: Icon,
      [Dialog.Component.name]: Dialog.Component,
      [Grid.name]: Grid,
      [GridItem.name]: GridItem,
      [VanImage.name]: VanImage,
      [Loading.name]: Loading,
    },
    data(){
      return{
        userData:{},
        userBalance:0,
        userEvaluate:0,
        userIntegral:0,
        userEnshrine:'',
        userInfo:'',
        userName:'请登陆',
        userImage:require('assets/image/user-default.png'),
      }
    },
    methods: {
      /**跳转设置*/
      handleSetting(){
        this.$router.push({name:'UserSetting',params: {}})
      },
      /**获取用户信息*/
      getUserData(){
        getProfile().then(res => {
          this.userData = res;
        });
      },
      /**退出系统*/
      handleLogout(){
        Dialog.confirm({
          title: '提示',
          message: '是否确定要退出系统?',
        }).then(() => {
          //确认
          logout().then(res => {
            this.$router.push({name:'Login',query: {}})
          });
        }).catch(() => {
          //取消
        });
      }
    },
    created() {
      this.getUserData();
    },
    filters:{
      numFilter(val){
          return val==null||val==''?0:val
      },
      filterText(val){
          return val==''||val==null?'(未开通会员)':val
      }
    }
  }
</script>

<style scoped>
    .is-vip{
        font-size: 12px;
        margin-top: 10px;
    }
    .profile-box {
        float: left;
        width: 100%;
        height: 100%;
    }

    .user-image {
        width: 250px;
        height: 80px;
        margin-left: 40px;
        margin-top: 40px;
    }

    .user-image .photo {
        float: left;
        border-radius: 50%;
        width: 80px;
        height: 80px;
    }

    .setting-icon {
        float: right;
        margin-right: 20px;
        margin-top: 20px;
    }

    .user-name span {
        display: block;
        color: #ffffff;
    }

    .user-name {
        margin-left: 20px;
        float: left;
        margin-top: 10px;
    }

    .user-content {
        width: 90%;
        height: 70px;
        background: #ffffff;
        border-radius: 8px;
        margin-left: 4%;
        margin-top: 20px;
        padding: 10px;
    }

    @media screen and (max-width: 980px) {
        .user-content {
            margin-left: 4%;
        }
    }

    @media screen and (max-width: 650px) {
        .user-content {
            margin-left: 2.5%;
        }
    }


    .balance-name {
        font-size: 12px;
    }

    .balance-value {
        font-size: 10px;
        text-align: center;
        font-weight: bold;
        color: brown;
    }
</style>
