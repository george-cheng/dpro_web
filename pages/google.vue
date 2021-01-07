<template>
  <div id="cantainer">
    <PersonalNav />
    <div class="title">
      <p>谷歌认证</p>
    </div>
    <div class="content">
      <p class="content_title">开启谷歌认证</p>
      <div class="wrap" style="padding-top:50px">
        
        <div class="step_box">
            <div :class="active>=0?'active':''">
              <p class="step">1</p>
              <p class="step_title">下载APP</p>
              <div class="step_line"></div>
            </div>
            <div :class="active>=1?'active':''">
              <p class="step">2</p>
              <p class="step_title">扫码二维码</p>
              <div class="step_line"></div>
            </div>
            <div :class="active>=2?'active':''">
              <p class="step">3</p>
              <p class="step_title">备份密钥</p>
              <div class="step_line"></div>
            </div>
            <div :class="active>=3?'active':''">
              <p class="step">4</p>
              <p class="step_title">开启谷歌认证</p>
            </div>
        </div>


        <div class="steps1" v-if="this.active==0" style="width: 957px;margin: 127px auto 120px auto;">
          <p class="steps1_title">下载并安装认证器</p>
          <div class="steps1_content">
            <div>
            <img src="~assets/image/appStore.png" alt="">
            <div>
              <p>Download it from</p>
              <p>app store</p>
            </div>
            </div>
            <div>
              <img src="~assets/image/googlePlay.png" alt="">
              <div>
                <p>Download it from</p>
                <p>google play</p>
              </div>
            </div>
          </div>
        </div>
        <div class="steps2" v-show="active == 1" style="height:500px">
            <div class="steps2_content">
              <div class="steps2_content_left">
                <!-- <img src="~assets/image/googlePlay.png" alt=""> -->
                <div id="qrcode"></div>
                  <!-- 报错 -->
                <p>使用谷歌验证器app扫 描该二维码</p>
              </div>
              <div>
                <p>{{rd_str}}</p>
                <p>如果您无法扫描二维码，可以将该16位密钥手动 输入到谷歌验证app中</p>
              </div>
              
            </div>
        </div>
        <div class="steps3" v-if="this.active==2" style="height:500px">
          <div class="steps3_content">
              <div style="">
                <img src="~assets/image/note.png" alt="">
                <p>{{rd_str}}</p>
              </div>
              <div>
                <p>请将16位密钥记录在纸上，并保存在安全的地方。如遇手机丢失， 您可通过该密钥恢复您的谷歌认证</p> 
                <p>通过人工客服重置您的谷歌验证需要提交工单，可能需要至少7天时间 来处理。</p>
              </div>
          </div>
          
        </div>
        <div class="steps4" v-if="this.active==3" style="height:500px">
          <span>16位密钥：</span><input type="text" v-model="secret" ><br>
          <span>登录密码：</span><input type="password" v-model="password"><br>
          <span>验证码：</span><input type="text" v-model="emailCode" >
          <input v-if="show" type="button" value="发送验证码" @click="sendCode"/>
          <!-- <input v-show="showEmail" type="button" value="点击获取" @click="sendRegCode" /> -->
          <input class="googleCodeTime" type="button" v-if="!show" :value="count+'s'" /><br>
          <span>谷歌验证码：</span><input class="google_sub" type="text" v-model="code"><br>

        </div>
        
        
      </div>
        <div class="step_btn">
          <span  class="prev" @click="prev" v-if="this.active==1||this.active==2||this.active==3">上一步</span>
          <div>
            <span class="finishInfo" v-if="this.active==0">我已经装好APP了</span>
            <span class="finishInfo" v-if="this.active==1">已经完成二维码扫描</span>
            <span class="finishInfo" v-if="this.active==2">我已经写下了16位密码</span>
            <el-button class="next" style="color:#DBD3D3;" @click="next" v-if="this.active==0||this.active==1||this.active==2">下一步</el-button>
            <el-button class="authGoogle" style="margin-top: 12px" @click="authGoogle" v-if="this.active==3">开启谷歌验证</el-button>
          </div>
        </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import PersonalNav from "../components/common/header.vue";
import Footer from "../components/common/footer";
import qs from "qs";
import { Message } from 'element-ui';
import { mapState } from 'vuex'
export default {
  components: {
    PersonalNav,
    Footer
  },
  data() {
    return {
      active: 0,
      secret:'',
      qrcodeObj: {},
      password:'',
      emailCode:'',
      code:'',
      rd_str: '',
      show:true,
      count: "",
      timer: null
    };
  },
  computed: {
    ...mapState(['userInfo']),
  },
  watch: {
    active: function () {
      if (this.active == 1) {
        document.getElementById("qrcode").innerHTML = "";
        let str = this.randomString(16)
        this.rd_str = str
        this.getQRcode()
      }
    }
  },
  //获取二维码
  mounted(){
  },
  methods: {
    getQRcode(){
      this.qrcodeObj = new QRCode('qrcode', {
            text: `otpauth://totp/DPRO:`+this.userInfo.data.loginName+`?secret=`+this.rd_str,    
            width: 150,
            height: 150,
            colorDark : '#000', // 黑色
            colorLight : '#fff',
            correctLevel : QRCode.CorrectLevel.H
        });
    },
    randomString(len){
      len=len||32;
    　 var $chars='ABCDEFGHJKMNPQRSTWXYZ123456789';
    　 var maxPos=$chars.length;
    　 var checkcode='';
    　 for(let i=0;i<len;i++){
    　   checkcode+=$chars.charAt(Math.floor(Math.random()*maxPos));
    　 }
    　 return checkcode;
    },
    next() {
      if (this.active++ == 3) this.active = 3;
    },
    prev() {
      if (this.active-- <= 0) this.active = 0;
    },
    sendCode(){
      const TIME_COUNT = 60;
      this.$axios.get('/api/v1/account/sendCode',{params:{type:1}})
      .then(function (response) {
            if(response.data.code==200){
             Message({
                        showClose: true,
                        message: '发送成功，注意查收'
                    })
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
            this.show= true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }

    },
    authGoogle(){
        var _this = this
        var db={
            'secret':this.secret,
            'password':this.password,
            'emailCode':this.emailCode,
            'code':this.code

        }
        console.log(db);

         this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
        this.$axios.post('/api/v1/account/authGoogle',qs.stringify(db))
        .then(function (response) {
            if (response.data.code == 200) {
            Message({
                        showClose: true,
                        message: '绑定成功'
                    })
               _this.$router.push({
                path: '/personal'
            })
          }
         
           
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.steps4{
  width: 823px;
  margin: 0 auto;
  padding-top: 60px
}
.steps3_content{
  display: flex;
  width: 800px;
  margin: 90px auto 60px auto;
}
.steps3_content > div:first-child {
  position: relative;
  margin-right: 70px;
}
.steps3_content > div:first-child p {
  width: 150px;
  position: absolute;
  top: 50%;
  margin-top: -10px;
  left: 50%;
  margin-left: -50px;
}
.steps3_content > div:first-child img {
  width: 200px;
}
.steps3_content > div:nth-child(2) p:first-child{
  margin-top: 20px;
  color:rgba(153,149,149,1);
}
.steps3_content > div:nth-child(2) p:nth-child(2){
  color: #BD3A3B;
}
.steps3_content > div:nth-child(2) p {
  height:80px;
  font-size:20px;
  font-weight:400;
}
.steps2_content_left{
  text-align: center;
  background: #2C2525;
  padding: 15px 0;
}
.steps2_content_left img{
  width: 150px;
}
.steps2_content_left p{
  width: 120px;
  margin: 0 auto;
}
.steps2_content{
  width: 900px;
  margin: 0 auto;
  display: flex;
  padding-top: 60px;
  justify-content: space-between;
  align-items: center;
}


.steps2_content>div:nth-of-type(2)>p:nth-of-type(1){
  width:314px;
height:60px;
background:rgba(73,63,63,1);
border-radius:10px;
font-size: 20px;
color: rgba(217,217,217,1);
line-height: 60px;
text-align: center;
}
.steps2_content>div:nth-of-type(2)>p:nth-of-type(2){
  width:628px;
height:81px;
margin-top: 30px;
font-size:20px;
font-family:PingFang SC;
font-weight:400;
color:rgba(153,149,149,1);
line-height:52px;
}
.content_title{
height:66px;
font-size:20px;
font-weight:500;
padding-left:30px; 
color:rgba(219,211,211,1);
line-height:66px;
background:rgba(48, 40, 40, 1);
}
.step_btn{
  border-top: 2px solid #3D3737;
  text-align: center;
  padding-top: 39px;
  position: relative;
}
.steps1_title{
  height:33px;
  font-size:26px;
  font-weight:400;
  color:rgba(219,211,211,1);
  line-height:34px;
  text-align: center;
  margin-bottom: 100px;
}
.steps1_content{
  display: flex;
  justify-content: space-between;
}
.steps1_content > div {
  width:387px;
  height:120px;
  background:rgba(73,63,63,1);
  border-radius:10px;
  display: flex;
  align-items: center;
}
.steps1_content > div >img{
  flex-shrink:0;
  width: 70px;
  height: 70px;
  margin: 0 30px;
}
.steps1_content > div >div > p:first-child{
  height:19px;
  font-size:24px;
  font-weight:400;
  color:rgba(219,211,211,1);
  line-height:25px;
}
.steps1_content > div >div > p:nth-child(2){
  height:19px;
  font-size:24px;
  font-weight:600;
  color:rgba(219,211,211,1);
  line-height:25px;
  margin-top: 20px;
}

* {
  margin: 0;
  padding: 0;
}
input{
  border: 0;
  outline: none;
}
#cantainer {
  position: relative;
  width: 1920px;
  height: 1825px;
  background: rgba(27, 21, 21, 1);
}
.title {
  width: 1302px;
  height: 66px;
  margin-top: 20px;
  margin-left: 309px;
  vertical-align: middle;
  line-height: 66px;
  background: rgba(48, 40, 40, 1);
}
.title p {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(219, 211, 211, 1);
  margin-left: 28px;
}
.content {
  width: 1302px;
  /* height: 800px; */
  margin-top: 20px;
  margin-left: 309px;
  margin-bottom: 300px;
  padding-bottom: 39px;
  vertical-align: middle;
  background: rgba(40, 32, 32, 1);
}
.content .wrap {
  margin-left: 50px;
  
}
.step_box{
  width: 1182px;
  height: 118px;
  display: flex;
  justify-content: space-around;
}
.step_box > div{
  flex:0 0 auto;
  /* width: 116px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.active{
  /* font-size: 50px; */
  color: rgba(189,58,59,1);
}
.step{
  width:50px;
  height:50px;
  font-size:36px;
  border-radius:50%;
  text-align: center;
  background: #493F3F;
  z-index: 1;
}
.step_line{
  width: 207px;
  height: 5px;
  background: #3D3737;
  position: absolute;
  top: 24%;
  left: 100px;
  z-index: 0;
}
.active .step{
  color: #DBD3D3;
  background:rgba(189,58,59,1);

}
.step_title{
  height:29px;
  font-size:20px;
  font-weight:400;
  line-height:34px;
  margin-top: 29px;
}


.steps>p:nth-of-type(1){
margin-top: 80px;
font-size:25px;
font-family:PingFang SC;
font-weight:400;
color:rgba(219,211,211,1);

}
.steps>img{
  margin-top: 108px;
}
.finishInfo{
  width:233px;
height:28px;
/* margin-left: 350px; */
font-size:20px;
/* font-family:PingFang SC; */
font-weight:400;
color:rgba(219,211,211,1);
line-height:34px;
margin-right: 30px;
}
.prev{
font-size:24px;
font-weight:500;
color:rgba(219,211,211,1);
position: absolute;
top: 50%;
/* margin-top: 12px; */
left: 20px;
}
.next,.authGoogle{
  background: rgba(189, 58, 59, 1);
  width:230px;
  height: 66px;
  background:rgba(189,58,59,1);
  border-radius:10px;
  font-size:25px;
  font-family:PingFang SC;
  font-weight:500;
  border: 0;
}
.authGoogle{
  color:rgba(219,211,211,1);
}

.steps4 span{
  width:180px;
height:25px;
font-size:26px;
display: inline-block;
font-family:PingFang SC;
font-weight:400;
color:rgba(198,190,190,1);
line-height:34px;
text-align: right;
}
.steps4>input:nth-of-type(1),.steps4>input:nth-of-type(2),.steps4>input:last-of-type{
  width:500px;
height:50px;
margin-top: 30px;
background:rgba(44,37,37,1);
border:1px solid rgba(64, 56, 56, 1);
border-radius:4px;
}
.steps4>input:nth-of-type(3){
  width:400px;
height:50px;
margin-top: 30px;
background:rgba(44,37,37,1);
border:1px solid rgba(64, 56, 56, 1);
border-radius:4px;
}
.steps4>input:nth-of-type(4){
  width:100px;
  height:50px;
  margin-top: 30px;
  margin-left: 3px;
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  border: 0;
  outline: none;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);

}
.googleCodeTime{
  width: 100px;
  height: 50px;
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
/* .google_sub{
   width:500px;
height:50px;
margin-top: 30px;
background:rgba(44,37,37,1);
border:1px solid rgba(64, 56, 56, 1);
border-radius:4px;
} */


</style>