<template>
  <div class="home">
    <img src="../../assets/title.png" class='title-banner'/>
    <!-- 投票按钮 -->
    <span class="btn upload" alt='签到' @click='openCamer' v-show='wxReady&&!isTakePhoto'></span>
    <div class="info" v-if='isTakePhoto'>
      <div class='info-user_image'>
        <img :src="userPhotoInfo.face_image" alt="用户自拍" >
      </div>

      <div class="info-user_content">
        <p><span class="key">姓名 : </span><span class="value">{{userPhotoInfo.name}}</span></p>
        <p><span class="key">年龄 : </span><span class="value">{{userPhotoInfo.age}}</span></p>
        <p><span class="key">性别 : </span><span class="value">{{userPhotoInfo.gender}}</span></p>
        <p><span class="key">情绪 : </span><span class="value">{{userPhotoInfo.emotion}}</span></p>
        <p><span class="key">人种 : </span><span class="value">{{userPhotoInfo.ethnicity}}</span></p>
        <p><span class="key">微笑程度 : </span><span class="value">{{userPhotoInfo.smile}}</span></p>
      </div>
    </div>
    <div class="loading" v-if='!wxReady || showLoading'>
      <div class="content">
        <div class='loading-img'></div>
      </div>
      <div class="mask"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import API from '../../api';
  import {Types as T} from '@/store/index'

  import Vue from  'vue'

  export default {
    name: 'home',
    data(){
      return {
        localIds: null,
        showLoading: false,
        text: null
      }
    },
    activated(){
      //页面加载 判断是否
    },
    watch: {
      wxReady(){
        this.fetchUser();
      }
    },
    updated (){

    },
    props: {
      name: {
        type: String
      }
    },
    computed: {
      ...mapGetters({
        'wxReady': T.GET_WX_READY,
        'isTakePhoto': T.GET_IS_TAKE_PHOTO,
        'userPhotoInfo': T.GET_USER_PHOTO_INFO,
      })
    },
    methods: {
      openCamer(){
        const that = this;
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            that.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            //查看当前的localids
            console.log('upload serverId', res.localIds, that.localIds);
            //然后上传图片
            that.showLoading = true;
            that.text = '上传中,请勿动手机';
            that.uploadFile();
          },
          error:function () {
            alert('选择图片失败');
          }
        });
      },
      uploadFile(){
        const that = this;
        wx.uploadImage({
          localId: that.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            //然后推送到服务器
            console.log('upload serverId', serverId);
            that.takePhoto(serverId)
          },
          error:function () {
            alert('上传图片失败');
          }
        });
      },
      fetchUser(){
        this.showLoading = true;
        this.text = '正在获取用户信息';
        this.checkIsTakePhoto().then((data) => {
          this.showLoading = false
        }).catch((e) => {
          this.showLoading = false;
          alert(e.data.msg);
        })
      },
      takePhoto(serverId){
        const that = this;
        API.getUserPhoto({media_id: serverId}).then((res) => {
          console.log(res, 'res');
          if (res.data.data.image) {
            that.upload_image = res.data.data.image.original;
            this.time = 12;
            that.uploadFaceImage();
          }
        }).catch(() => {
          this.showLoading = false;
          alert('上传图片失败,请重试');
        })
      },
      uploadFaceImage(){
        console.log('uploadFaceImage');
        const that = this;
        this.postUserPhoto({
          face_image: that.upload_image
        }).then((json) => {
          that.showLoading = false;
        }).catch((e) => {
            if(e.data.errcode === 1001){
              alert(e.data.msg);
              that.showLoading = false;
            }else{
              that.uploadTask();
            }
        })
      },
      uploadTask(){
        const that = this;
        that.time--;
        if (that.time < 0) {
          that.showLoading = false;
          alert('上传图片失败,请重试');
        } else {
          setTimeout(() => {
            that.uploadFaceImage();
          }, 5000)
        }
      },
      ...mapActions({
        'checkIsTakePhoto': T.FETCH_IS_TAKE_PHOTO,
        'postUserPhoto': T.POST_USER_PHOTO,
      })
    }
    //31
  }
</script>

<style lang="scss">
  @import "../../styles/app_default";

  .home {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .loading {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 333;
      color: #fff;
      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: .2;
      }
      .content {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .loading-img {
          background: url("../../assets/loading.gif") no-repeat;
          width: size2750(100);
          height: size2750(100);
          background-size: 100% 100%;
        }
      }
    }
    .upload {
      display: block;
      margin: auto;
      width: size2750(247);
      height: size2750(222);
      background: url("../../assets/button.png") 0 0 no-repeat;
      background-size: 100% 100%;
    }
    .info {
      display: flex;
      margin-top:size2750(-75);
    }
    .info-user_image {
      margin-left:  size2750(20);
      width: size2750(236);
      img{
        width: 100%;
      }
    }
    .info-user_content {
      padding-left: size2750(30);
      text-align: left;
      flex: 1;
      color: #fff;
      p {
        margin: size2750(20);
      }
      .key {
        color: #fbebba;
        margin-right: size2750(10);
        font-size: size2750(30);
      }
      .value {
        color: #ffe55d;
        font-size: size2750(38);
      }
    }
  }
</style>
