<!-- home -->
<template>
  <div>
    <div class="flex-column-center height100">
      <vueCropper
        ref="cropper"
        :img="userFaceData.originalUrl"
        :outputSize="option.outputSize"
        :outputType="option.outputType"
        :info="option.info"
        :full="option.full"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
        :centerBox="option.centerBox"
        :infoTrue="option.infoTrue"
        :fixedBox="option.fixedBox"
        :high="option.high"
        :mode="option.mode"
      ></vueCropper>
      <div class="test-button">
        <button @click="changeScale(1)" class="btn">+</button>
        <button @click="changeScale(5)" class="btn">++</button>
        <button @click="changeScale(-1)" class="btn">-</button>
        <button @click="changeScale(-5)" class="btn">--</button>
        <button @click="rotateLeft" class="btn">左转</button>
        <button @click="rotateRight" class="btn">右转</button>
      </div>
      <van-divider></van-divider>
      <van-button round block type="info" class="app-color" @click="uploadFace">
          确定
      </van-button>
    </div>
  </div>


</template>

<script>
  import { addFace } from '@/api/picture/userFace.js'
	import { VueCropper }  from 'vue-cropper'
  import { Icon,Divider,Notify } from 'vant';

export default {
  name: "AddUserFace",
  components: {
    VueCropper,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [Notify.Component.name]: Notify.Component
  },
  props: {
    userFaceData: {
      type: Object
    }
  },
  data() {
    return {
      option: {
        img:'',
        outputSize: 1,
        info: false, // 裁剪框的大小信息
        outputType: 'png', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: window.innerWidth - 100 + 'px', // 默认生成截图框宽度
        autoCropHeight: window.innerWidth - 100 + 'px', // 默认生成截图框高度
        high: true, // 是否按照设备的dpr 输出等比例图片
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        mode: '100% auto' // 图片默认渲染方式
      },
      pictureId:undefined
    }
  },
  computed: {
  },
  mounted() {

  },
  methods: {
    /**图片缩放*/
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    /**图片左转*/
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    /**图片右转*/
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    /**上传图片*/
    uploadFace() {
      this.$refs.cropper.getCropBlob(data => {
        let formData = new FormData();
        formData.append("file", data);
        formData.append("title", this.userFaceData.title);
        formData.append("open", this.userFaceData.open);
        formData.append("originalUrl", this.userFaceData.originalUrl);
        addFace(formData).then(response => {
          //把关闭信息传递给父组件
          //this.$emit("closeMe",false);
          Notify({ type: 'success', message: '上传成功' });
          this.$router.push({name:'UserFaces',query: {}})
        });
      });
    }
  }
}
</script>
<style lang="scss">
  .test-button {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin:20px 10px 0px 0px;
    padding: 9px 15px;
    font-size: 16px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all .2s ease;
    text-decoration: none;
    user-select: none;
  }
  .height100 {
    height: 90vh;
  }
  .flex-column-center{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  .vue-cropper {
      background: #000;
      .cropper-view-box {
        outline: 1px solid #fff !important;
        outline-color: #fff !important;
    }
  }
</style>
