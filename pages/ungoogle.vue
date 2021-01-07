<template>
  <div id="cantainer">
    <PersonalNav />
    <div class="title">
        <p>解除谷歌验证</p>
    </div>
    <div class="content">
        <div class="wrap">
        <span>登录密码:</span><input type="password" v-model="password"><br>
        <span>谷歌验证码:</span><input type="text" v-model="code" ><br>
        <input type="button" value="解除绑定" @click="unbindGoogle"/>
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
      password:'',
      code:''//谷歌验证码

    };
  },
  methods:{
      unbindGoogle(){
          var _this = this
          var db={
            'password':this.password,
            'code':this.code,
            }

        this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
        this.$axios.post('/api/v1/account/unbindGoogle',qs.stringify(db))
        .then(function (response) {
          console.log(response)
          if(response.data.code==200){
              Message({
                        showClose: true,
                        message: '解绑成功'
                    })
                _this.$router.push({
                path: '/personal'
            })
          }else if(response.data.code==-2){
             Message({
              showClose: true,
              message: "登陆密码不正确"
            });
           }else if(response.data.code==-3){
             Message({
              showClose: true,
              message: "未绑定谷歌验证"
            });
           }else if(response.data.code==-4){
             Message({
              showClose: true,
              message: "谷歌验证码不正确"
            });
           }
        })
        .catch(function (error) {
            console.log(error);
        });
        }
    }
}
</script>
<style scoped>

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
.content .wrap input:nth-of-type(1),.content .wrap input:nth-of-type(2){
    width: 440px;
  height: 40px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 1px solid rgba(53, 49, 49, 1);
}

.content .wrap input:nth-of-type(3){
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
