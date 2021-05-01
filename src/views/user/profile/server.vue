<template>
  <div class="server">
    <van-cell icon="records" title="服务中心"   to="/profile"/>
    <van-grid style="height: 60px">
      <van-grid-item text="我的相册" :to="{ name:'PictureAlbum' }">
        <div slot="icon">
          <van-icon name="photo-o" color="rgba(107, 161, 216, 1)" size="25px"/>
        </div>
      </van-grid-item>
      <van-grid-item text="人脸管理" :to="{ name:'UserFaces' }">
          <div slot="icon">
              <van-icon name="manager-o" color="rgba(107, 161, 216, 1)" size="25px"/>
          </div>
      </van-grid-item>
      <van-grid-item  text="我的消息" :to="{ name:'UserMessage' }">
          <div slot="icon">
              <van-icon name="comment-o" color="rgba(107, 161, 216, 1)" size="25px"/>
          </div>
      </van-grid-item>
      <van-grid-item  text="我的积分" to="/userIntegral">
          <div slot="icon">
              <van-icon name="gem-o" color="rgba(107, 161, 216, 1)" size="25px"/>
          </div>
      </van-grid-item>
      <van-grid-item text="账户充值" to="/addBalance">
          <div slot="icon">
              <van-icon name="balance-list-o" color="rgba(107, 161, 216, 1)" size="25px"/>
          </div>
      </van-grid-item>
      <van-grid-item text="领优惠劵" to="/userCoupon">
          <div slot="icon">
              <van-icon name="gift-o" color="rgba(107, 161, 216, 1)" size="25px"/>
          </div>
      </van-grid-item>
      <van-grid-item text="限时秒杀" to="/GoodActivity">
          <div slot="icon">
              <van-icon name="underway-o" color="rgba(107, 161, 216, 1)" size="25px"/>
          </div>
      </van-grid-item>
      <van-grid-item text="加入会员" to="/addVip">
          <div slot="icon">
              <van-icon name="vip-card-o" color="rgba(107, 161, 216, 1)" size="25px"/>
          </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  import {Cell, CellGroup, Grid, GridItem, Icon, Tag} from 'vant';
  import { Col, Row } from 'vant';
  export default {
    name: "profileServer",
    components:{
      [Cell.name]: Cell,
      [Col.name]: Col,
      [Row.name]: Row,
      [Tag.name]: Tag,
      [Icon.name]: Icon,
      [Grid.name]: Grid,
      [GridItem.name]: GridItem
    }
  }
</script>

<style scoped>
  .server{
    width: 90%;
    margin-left: 4%;
    height: 220px;
    background: #ffffff;
    border-radius: 8px;
    position: relative;
    top: 70px;
    padding: 10px;
  }

  @media screen and (max-width: 980px) {
    .server{
        margin-left: 4%;
    }
  }

  @media screen and (max-width: 650px) {
    .server{
        margin-left: 2.5%;
    }
  }
</style>
