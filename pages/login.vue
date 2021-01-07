<template>
  <div id="cantainer">
    <div class="logo">
      <nuxt-link to="/" >
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
      <div>
        欢迎登录
        <span>简体中文</span>
      </div>
      <div class="login_method">
        <span :class="act == 1 ? 'login_act':''" @click="phoneMethod">手机登录</span>
        <span :class="act == 2 ? 'login_act':''" @click="emailMethod">邮箱登录</span>
      </div>

      <form v-if="loginType==='phone'" @submit="form_submit">
        <p>手机号码</p>
        <input class="name" type="text" name="name" v-model="name" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="11" minlength="11" />
        <p>密码</p>
        <input class="pwd" type="password" name="pwd" v-model="pwd" />
        <br />
        <div class="checklogin" v-if="showcode">
          <input type="text" name="code" v-model="yzm" />
          <input v-show="show" type="button" value="点击获取" @click="sendlogCode" />
          <span class="logSendCodeTime" v-show="!show">{{count}}s</span>
          <!-- <input v-show="show" type="button" value="点击获取" @click="sendRegCode" />
          <span class="regSendCodeTime" v-show="!show">{{count}}s</span> -->
        </div>
        <input type="submit" value="登录" />
        <br />
        <span><nuxt-link to="/forgetPwd" >忘记密码</nuxt-link></span>
        <span><nuxt-link to="register" style="margin-left:15px">免费注册</nuxt-link></span>
      </form>

      <form v-else-if="loginType==='email'" @submit="form_submit">
        <p>邮箱地址</p>
        <input type="email" name="name" v-model="name" @blur="c_email" />
        <p>密码</p>
        <input type="password" name="pwd" v-model="pwd" />
        <br />
        <div class="checklogin" v-if="showcode">
          <input type="text" name="code" v-model="yzm" />
          <input v-show="showEmail" type="button" value="点击获取" @click="sendRegCode" />
          <span class="logSendCodeTime" v-show="!showEmail">{{count}}s</span>
        </div>
        <input type="submit" value="登录" />
        <br />
        <span><nuxt-link to="/forgetPwd" >忘记密码</nuxt-link></span>
        <span><nuxt-link to="register" style="margin-left:15px" >免费注册</nuxt-link></span>
      </form>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { Message } from 'element-ui';

export default {
  components: {},
  data() {
    return {
      loginType: "phone",
      name: "",
      pwd: "",
      email: "",
      showcode: false,
      yzm: "",
      act: 1,
      show:true,
      showEmail: true,
      count: "",
      timer: null
    };
  },
  methods: {
    phoneMethod() {
      this.loginType = "phone";
      this.act = 1
      this.name=""
      this.pwd = ""
    },
    emailMethod() {
      this.loginType = "email";
      this.act = 2
      this.name=""
      this.pwd = ""
    },
    c_email(){
      var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (!re.test(this.name)) {
        Message({
                        showClose: true,
                        message: '邮箱格式不正确'
                    })
        return;
      } 

    },
        sendRegCode() {
      const TIME_COUNT = 60;
      this.$axios.setHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      this.$axios
        .post("/api/v1/sendLoginCode")
        .then(function(response) {
        })
        .catch(function(error) {
          console.log(error);
        });
        if (!this.timer) {
        this.count = TIME_COUNT;

        this.showEmail = false;

        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.showEmail = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    sendlogCode() {
      const TIME_COUNT = 60;
      this.$axios.setHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      this.$axios
        .post("/api/v1/sendLoginCode")
        .then(function(response) {
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
    form_submit: function(e) {
      var _this = this;
      e.preventDefault();
      var db = {
        name: this.name,
        pwd: this.pwd
      };
      this.$axios.setHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      this.$axios
        .post("/api/v1/login", qs.stringify(db))
        .then(function(response) {
          if (response.data.code == 7 || response.data.code == 6) {
            _this.showcode = true;
            _this.$axios.setHeader(
              "Content-Type",
              "application/x-www-form-urlencoded"
            );
            _this.$axios
              .post("/api/v1/secLogin", qs.stringify({ code: _this.yzm }))
              .then(function(response) {
                if (response.data.code == 200) {
                  Message({
                        showClose: true,
                        message: '欢迎您'
                    })
                    localStorage.setItem('name',_this.name)
            _this.$router.push({
                path: '/'
            })

                } else if (response.data.code == 102) {
                  Message({
                        showClose: true,
                        message: '验证码错误哦'
                    })
                }else{
                  Message({
                        showClose: true,
                        message: response.data.msg
                    })
                }
              })
              .catch(function(error) {
                console.log(errpr);
              });
          } else if (response.data.code == 200) {
            Message({
                        showClose: true,
                        message: '登录成功'
                    })
            localStorage.setItem('name',_this.name)
            _this.$router.push({
                path: '/'
            })
            
            
          } else if (response.data.code == 4) {
            Message({
                        showClose: true,
                        message: '账户或者密码错误，剩余操作次数为：' + response.data.data
                    })
          }else if(response.data.code==1){
            Message({
                        showClose: true,
                        message: '用户名不能为空'
                    })
          }else if(response.data.code==2){
            Message({
                        showClose: true,
                        message: '密码不能为空'
                    })
          }else if(response.data.code==3){
            Message({
                        showClose: true,
                        message: 'ip被冻结，请两小时后再试'
                    })
          }else if(response.data.code==5){
            Message({
                        showClose: true,
                        message: '账户已被冻结'
                    })
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
  /* height: 556px; */
  background: rgba(37, 29, 29, 1);
  border-radius: 5px;
  left: 769px;
  top: 125px;
  padding-bottom: 30px;
}
.loginContent > div:nth-of-type(1) {
  margin-left: 49px;
  margin-top: 56px;
  height: 40px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(233, 225, 225, 1);
  line-height: 20px;
}
.loginContent > div:nth-of-type(1) > span {
  width: 74px;
  height: 20px;
  margin-left: 467px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(189, 58, 59, 1);
  line-height: 20px;
}
.loginContent > div:nth-of-type(1) > span::after {
  content: "▼";
  color: #bd3a3b;
  font-size: 5px;
  right: 4px;
}
.login_method {
  margin-left: 49px;
  margin-top: 56px;
  height: 21px;
  font-size: 21px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(233, 225, 225, 1);
  line-height: 20px;
}
.login_method > span:nth-of-type(1){
  cursor: pointer;
}
.login_act{
  color:rgba(189,58,59,1);
}
.login_method > span:nth-of-type(2) {
  cursor: pointer;
  width: 90px;
  height: 21px;
  margin-left: 42px;
  font-size: 21px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  /* color: rgba(233, 225, 225, 1); */
  line-height: 20px;
}
.login_method > span:hover{
  color:rgba(189,58,59,1);
}
.login_method > span:active{
  color:rgba(189,58,59,1);
}
form {
  margin-left: 49px;
}
form > p {
  margin-top: 35px;
  margin-bottom: 10px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(233, 225, 225, 1);
  line-height: 20px;
}
form > input:nth-of-type(1),
form > input:nth-of-type(2) {
  width: 440px;
  height: 40px;
  background: rgba(41, 32, 32, 1);
  /* border-radius: 5px; */
  border: 0;
  outline: none;
}
.checklogin > input:nth-of-type(1) {
  width: 274px;
  height: 40px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 0;
  outline: none;
}
.checklogin > input:nth-of-type(2) {
  width: 126px;
  height: 40px;
  margin-top: 15px;
  margin-left: 15px;
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  border: 0;
  outline: none;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.logSendCodeTime{
  width: 126px;
  height: 40px;
  display: inline-block;
  margin-top: 15px;
  margin-left: 15px;
  text-align: center;
  line-height: 40px;
  margin-top: 15px;
  margin-left: 15px;
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  border: 0;
  outline: none;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  border: 0;
  outline: none;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
form > input:nth-of-type(3) {
  width: 240px;
  height: 39px;
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
form > span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(189, 58, 59, 1);
}
</style>




