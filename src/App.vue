<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>

  import API from './api';
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {Types as T} from './store/index'
  import Coockie from 'js-cookie';
  export default {
    name: 'app',
    created(){
      const userId = Coockie.get('userid');
      debugger
      if(!userId){
          //请求一个接口
        API.fetchUerId().then(()=>{
            //
        }).catch((e)=>{

        })
      }
    },
    mounted(){
      const that = this;
      API.getWXConfig().then(res => {
        //配置对应的微信 jsconfig
        if (res.data && res.data.result) {
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.data.signature,// 必填，签名，见附录1
            jsApiList: ['chooseImage', 'uploadImage', 'downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function () {
            that.checkWX({
              wxReady: true
            })
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          });
        }
      });
    },
    methods: {
      ...mapActions({
        'checkWX': T.SET_WX_READY
      })
    }
  }
</script>

<style lang="scss">
  @import "styles/app_default";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #222;
    background: #000 url(assets/bg.jpg) no-repeat 0 0;
    background-size: 100% 100%;
    height: 100%;
  }

  .title-banner {
    width: 91%;
    margin-top: size2750(220);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

</style>
