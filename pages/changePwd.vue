<template>
  <div id="cantainer">
    <PersonalNav />
    <div class="title">
        <p>修改登录密码</p>
    </div>
    <div class="content">
        <div class="wrap">
        <span>旧密码:</span><input type="password" v-model="oldpwd"><br>
        <span>新密码:</span><input type="password" v-model="pwd" @blur="c_pwd"><br>
        <span>确认新密码:</span><input type="password" v-model="pwd1" @change="checkpwd"><br>
        <span>验证码:</span><input type="text" v-model="code">
        <input v-show="show" type="button" value="发送" @click="sendFindCode"/>
        <span class="regSendCodeTime" v-show="!show">{{count}}s</span><br>
        <input type="button" value="修改密码" @click="changepwd"/>
        </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import PersonalNav from "../components/common/header.vue";
import Footer from "../components/common/footer";
import qs from 'qs';
import {Message} from 'element-ui';
export default {
  components: {
    PersonalNav,
    Footer
  },
  data() {
    return {
      oldpwd: "",
      pwd: "",
      pwd1: "",
      code: "",
      show: true,
      count: "",
      timer: null

    };
  },
  methods:{
     checkpwd(){
          if(this.pwd!==this.pwd1){
          Message({
              showClose: true,
              message: "请输入相同的密码"
            });
            this.pwd1='';
        }

      },
      c_pwd(){
      var c_pwd =  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/
      if (!c_pwd.test(this.pwd)) {
        Message({
                        showClose: true,
                        message: '密码8~20位，且为字母、数字、符号等任意2种以上组合。'
                    })
        this.pwd='';
        return;
      } 
    },
      sendFindCode(){
        const TIME_COUNT = 60;
          var db={
            'name':localStorage.getItem('name'),
        }
        
        this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
        this.$axios.post('/api/v1/sendFindCode',qs.stringify(db))
        .then(function (response) {
            if(response.data.code==200){
             Message({
              showClose: true,
              message: "发送成功"
            });
           }
           
        })
        .catch(function (error) {
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
      changepwd(){
        var _this = this
          var db={
            'oldPwd':this.oldpwd,
            'pwd':this.pwd,
            'type':2,
            'code':this.code
        }
        if(this.pwd != this.pwd1){
           Message({
              showClose: true,
              message: "请输入相同的密码"
            });
        
        }else if(this.oldpwd == ''){
           Message({
              showClose: true,
              message: "旧密码不能为空"
            });
        }else{
          this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
        this.$axios.post('/api/v1/account/modPassWord',qs.stringify(db))
        .then(function (response) {
           if(response.data.code==200){
             Message({
              showClose: true,
              message: "修改成功"
            })
            _this.$router.push({
                path: '/personal'
            })
           } else if(response.data.code==104){
             Message({
              showClose: true,
              message: "不能与旧密码相同"
            });
           }else if(response.data.code==105){
            Message({
              showClose: true,
              message: "不能与交易密码相同哦"
            });
           }else if(response.data.code==100){
            Message({
              showClose: true,
              message: "验证码不能为空哦"
            });
           }else if(response.data.code==102){
             Message({
              showClose: true,
              message: "验证码错误"
            });
           }else if(response.data.code==101){
             Message({
              showClose: true,
              message: "ip被冻结，请2小时之后再试"
            });
           }
        })
        .catch(function (error) {
            console.log(error);
        });
        }
      }
  }

};
</script>
<style scoped>
.regSendCodeTime{
    width: 126px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    background: rgba(189, 58, 59, 1);
    border-radius: 5px;
    border: 0;
    font-size: 18px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  margin-left: 15px;

}
* {
  margin: 0;
  padding: 0;
}
#cantainer {
  position: relative;
  width: 1920px;
  height: 1825px;
  background: rgba(27, 21, 21, 1);
}
.title{
    width:1302px;
height:66px;
margin-top: 20px;
margin-left: 309px;
vertical-align: middle;
line-height: 66px;
background:rgba(48,40,40,1);
}
.title p{
    
font-size: 20px;
font-family:PingFangSC-Medium,PingFang SC;
font-weight:500;
color:rgba(219,211,211,1);
margin-left: 28px;

}
.content{
width:1302px;
height:500px;
margin-top: 20px;
margin-left: 309px;
margin-bottom: 50px;
vertical-align: middle;
background:rgba(40,32,32,1);
}
.content .wrap{
   margin-left: 300px;
   
}
.content .wrap span{
    width: 150px;
    display:inline-block;
    margin-top: 50px;
    font-size: 20px;
    color:rgba(233,225,225,1);
}
.content .wrap input{
font-size:16px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(233,225,225,1);
}
.content .wrap input:nth-of-type(1),.content .wrap input:nth-of-type(2),.content .wrap input:nth-of-type(3){
    width: 440px;
  height: 40px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 1px solid rgba(53, 49, 49, 1);
}
.content .wrap input:nth-of-type(4){
     width: 274px;
  height: 40px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 1px solid rgba(53, 49, 49, 1);
}
.content .wrap input:nth-of-type(5){
  width: 126px;
  height: 40px;
  margin-top: 15px;
  margin-left: 15px;
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  border: 0;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.content .wrap input:nth-of-type(6){
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
}


</style>
