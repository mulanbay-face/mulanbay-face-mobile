<template>
  <div class="order">
    <van-cell icon="records" title="我的订单" value="全部订单" is-link :to="{path:'/userOrders',query:{tagActive:0}}"/>
    <van-grid style="height: 60px" column-num="5">
      <van-grid-item text="待支付" :to="{path:'/userOrders',query:{tagActive:1}}">
        <div slot="icon">
            <van-icon name="refund-o" color="#b3ad00" size="25px"/>
        </div>
      </van-grid-item>
      <van-grid-item icon="newspaper-o" text="待发货" :to="{path:'/userOrders',query:{tagActive:2}}">
        <div slot="icon">
            <van-icon name="newspaper-o" color="#b3ad00" size="25px"/>
        </div>
      </van-grid-item>
      <van-grid-item icon="logistics" text="待收货" :to="{path:'/userOrders',query:{tagActive:3}}">
        <div slot="icon">
            <van-icon name="logistics" color="#b3ad00" size="25px"/>
        </div>
      </van-grid-item>
      <van-grid-item icon="certificate" text="已完成" :to="{path:'/userOrders',query:{tagActive:4}}">
        <div slot="icon">
            <van-icon name="certificate" color="#b3ad00" size="25px"/>
        </div>
      </van-grid-item>
      <van-grid-item icon="certificate" text="售后" :to="{path:'/userOrders',query:{tagActive:5}}">
        <div slot="icon">
            <van-icon name="cash-back-record" color="#b3ad00" size="25px"/>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  import {Cell, CellGroup, Grid, GridItem, Icon, Tag} from 'vant';
  import { Col, Row } from 'vant';
  export default {
    name: "ProfileOrder",
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
  .order{
    width: 90%;
    margin-left: 4%;
    height: 120px;
    background: #ffffff;
    border-radius: 8px;
    position: relative;
    top: 60px;
    padding: 10px;
  }

  @media screen and (max-width: 980px) {
      .order{
          margin-left: 4%;
      }
  }

  @media screen and (max-width: 650px) {
      .order{
          margin-left: 2.5%;
      }
  }

</style>
