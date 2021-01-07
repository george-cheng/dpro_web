<template>
  <div id="cantainer">
    <div class="logo">
      <nuxt-link to="/">
        <img src="~assets/image/logo.png" alt="logo" />
      </nuxt-link>
    </div>
    <div class="content">
      <p class="con_top">全球领先的资产交易平台</p>
      <p class="con_center">
        <span>追赶</span>
        <span>超越</span>
        <span>引领</span>
      </p>
      <img src="../static/image/banner2.png" alt width="401px" height="90px" />
      <div class="con_bottom">
        <img class="login_icon" src="~assets/image/login_icon1.png" alt />
        <img class="login_icon" src="~assets/image/login_icon2.png" alt />
        <img class="login_icon" src="~assets/image/login_icon3.png" alt />
      </div>
    </div>
    <div class="loginContent">
      <div>找回登录密码</div>
      <input type="text" placeholder="手机号或邮箱" v-model="name" />
      <br />
      <input type="text" placeholder="验证码" v-model="code" />
      
      <button>
        <span v-show="show" @click="getCode">发送</span>
        <span v-show="!show">{{count}}s</span>
      </button>
      <br />
      <input type="password" placeholder="设置登录密码" v-model="pwd" />
      <br />
      <input type="password" placeholder="重复登录密码" v-model="pwd1" @change="checkpwd" />
      <br />
      <input type="button" value="确认" @click="findPwd"  /><br />
      <span><nuxt-link to="/login" >去登录?</nuxt-link></span>
        <span><nuxt-link to="/" >返回主页</nuxt-link></span>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { Message } from "element-ui";

export default {
  components: {},
  data() {
    return {
      name: "",
      code: "",
      pwd: "",
      pwd1: "",
     
      show: true,

      count: "",

      timer: null
    };
  },
  methods: {
      checkpwd(){
          if(this.pwd!==this.pwd1){
          Message({
              showClose: true,
              message: "请输入相同的密码"
            });
        }

      },

    //发送短信验证码
    getCode() {
      const TIME_COUNT = 60;
      var db = {
        name: this.name
      };
      if(this.name==''){
          Message({
                        showClose: true,
                        message: '请输入账户名'
                    })
        
        return;
      }
      this.$axios.setHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      this.$axios
        .post("/api/v1/sendFindCode", qs.stringify(db))
        .then(function(response) {
          if (response.data.code == 200) {
            Message({
              showClose: true,
              message: "发送成功，请注意查收"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      if (!this.timer) {
        this.count = TIME_COUNT;

        this.show = false;

        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    //找回密码
    findPwd(){
       var db = {
        name: this.name,
        code:this.code,
        pwd:this.pwd
      }; 

      this.$axios.setHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      this.$axios
        .post("/api/v1/findPwd", qs.stringify(db))
        .then(function(response) {
          if (response.data.code == 200) {
            Message({
              showClose: true,
              message: "操作成功"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
input:-webkit-autofill{
  -webkit-box-shadow: 0 0 0px 1000px rgba(41, 32, 32, 1) inset;
  -webkit-text-fill-color: #fff;
}
* {
  margin: 0;
  padding: 0;
}
#cantainer {
  position: relative;
  width: 1920px;
  height: 1016px;
  background: url("~assets/image/index.png");
  background-size: 100% 100%;
}
.logo {
  padding: 44px 0 0 66px;
}
.content {
  width: 520px;
  height: 500px;
  padding: 267px 0 0 184px;
}
.con_top {
  width: 346px;
  height: 40px;
  font-size: 30px;
  font-family: FZLTTHJW--GB1-0, FZLTTHJW--GB1;
  font-weight: normal;
  color: rgba(255, 255, 255, 1);
  line-height: 39px;
}
.con_center {
  height: 29px;
  display: block;
  font-size: 16px;
  margin-top: 25px;
  margin-bottom: 55px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
}
.con_center > span {
  margin-right: 62px;
}
.con_bottom {
  margin-top: 76px;
}
.login_icon {
  margin-right: 23px;
}
.loginContent {
  position: absolute;
  width: 740px;
  height: 556px;
  background: rgba(37, 29, 29, 1);
  border-radius: 5px;
  left: 769px;
  top: 125px;
}
.loginContent > div:nth-of-type(1) {
  margin-top: 56px;
  height: 40px;
  font-size: 24px;
  text-align: center;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(233, 225, 225, 1);
  line-height: 20px;
}
.loginContent > input {
  width: 440px;
  height: 40px;
  margin-left: 150px;
  margin-top: 20px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 0;
  outline: none;
}
.loginContent > input:nth-of-type(2) {
  width: 350px;
}
.loginContent > button {
  width: 80px;
  height: 40px;
  margin-left: 10px;
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  border: 0;
  outline: none;
}

.loginContent > input:last-of-type {
  margin-top: 25px;
  margin-bottom: 35px;
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  border: 0;
  outline: none;
}
.loginContent>span:nth-of-type(1){
    margin-left: 150px;
}
.loginContent>span:nth-of-type(2){
    margin-left: 345px;
}
</style>




