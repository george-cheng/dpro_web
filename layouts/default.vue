<template>
  <div class="layout">
    <el-backtop></el-backtop>
    <div class="right_sidetoolbar">
      <div>
        <button @mouseenter="enterwechat()" @mouseleave="leavewechat()">
          <i class="iconfont wechat"></i>
        </button>
        <div class="box-card" v-show="card_wechat">
          <div class="card-title">
            <span>加入官方社群</span>
          </div>
          <div>
            <img src="~assets/image/officialGroup.png" />
          </div>
        </div>
      </div>

      <div>
        <button @mouseenter="enterdown()" @mouseleave="leavedown()">
          <i class="iconfont download"></i>
        </button>
        <div class="box-card" v-show="card_down">
          <div class="card-title">
            <span>DPRO APP</span>
          </div>
          <div>
            <img src="~assets/image/DownQRCode.png" />
          </div>
        </div>
      </div>
<!-- ~assets/font/iconfont/ -->
      <div>
        <button>
          <i class="iconfont kefu1"></i>
        </button>
        <div class="box-card" v-show="card_down">
          <div class="card-title">
            <span>在线客服</span>
          </div>
          <div>
            <img src="~assets/image/DownQRCode.png" />
          </div>
        </div>
      </div>
    </div>

    <nuxt />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      card_wechat: false,
      card_down: false,
    };
  },
  mounted() {
    this.getUserInfo();
    window.setInterval(() => {
      setTimeout(this.getUserInfo(), 0);
    }, 1800000);
  },
  computed: {},
  methods: {
    getUserInfo: function() {
      this.$store.dispatch("GET_userInfo");
    },
    enterwechat:function(){
      this.card_wechat = true;
    },
    leavewechat:function(){
      this.card_wechat = false;
    },
    enterdown:function(){
      this.card_down = true;
    },
    leavedown:function(){
      this.card_down = false;
    }
  }
};
</script>

<style scoped>
.layout {
  background: #211a1a;
}

html {
  font-family: robotoregular, Open Sans, PingFang SC, Hiragino Sans GB, Heiti SC,
    Microsoft YaHei, WenQuanYi Micro Hei, monospace, serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.right_sidetoolbar {
  position: fixed;
  top: 48%;
  right: 20px;
  z-index: 1;
}

.right_sidetoolbar > div {
  margin-top: 20px;
}
.right_sidetoolbar button {
  width: 40px;
  height: 40px;
  padding: 0;
  font-size: 18px;
  border-radius: 50%;
  border: 1px solid rgb(219, 219, 219);
  background-color: transparent;
}
.right_sidetoolbar button i {
  color: rgb(219, 219, 219);
  font-size: 20px;
}
.box-card {
  position: absolute;
  top: -46px;
  right: 56px;
}
.card-title {
  height: 24px;
  font-size: 14px;
  font-weight: 550;
  line-height: 24px;
  text-align: center;
  background-color: white;
  color: black;
}
button{
  cursor: pointer;
}
.kefu{
  color: #fff;
 font-size: 12px!important;
}
</style>
