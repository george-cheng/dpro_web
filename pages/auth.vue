<template>
  <div id="cantainer">
    <PersonalNav />
    <div class="title">
        <p>初级实名认证</p>
    </div>
    <div class="content">
      <div v-if="userInfoArr.auth" style="    font-size: 20px; text-align: center;padding-top: 60px;">
        您已通过初级实名认证，真实姓名为：{{userInfoArr.name}}，证件号码：{{userInfoArr.no}}，实名认证后不能更改。
        </div>
        <div class="wrap" v-if="!userInfoArr.auth">
            <input type="radio" name="address" checked="checked"/>中国大陆地区 &nbsp; &nbsp; &nbsp; <input type="radio" name="address" />其他国家及地区<br>
            <span>姓名:</span><input type="text" v-model="name"><br>
        <span>证件号码:</span><input type="text" v-model="no" @change="idReg"><br>
        <input type="button" value="提交" @click="auth"/>
        <!-- <div class="msg_box">
          <p class="msg_title">成功提示</p>
          <p class="msg_content">
            是否前往高级实名认证
          </p>
        </div> -->
        </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import PersonalNav from "../components/common/header.vue";
import Footer from "../components/common/footer";
import qs from 'qs';
import { Message } from 'element-ui';
export default {
  components: {
    PersonalNav,
    Footer
  },
  data() {
    return {
      name:'',
      no:'',
      userInfoArr: ''
    };
  },
  mounted () {
    var _this = this
    this.$axios.get('/api/v1/frontSession')
    .then(function (response) {
        if(response.data.code==200){
            _this.userInfoArr = response.data.data;
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  },
  methods:{
    open() {
        this.$confirm('初级实名认证成功，是否前往高级认证', '成功提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$router.push({
						path: 'uploadauth'
					})  
        }).catch(() => {
          this.$router.push({
						path: 'personal'
					})        
        });
      },
    idReg(){
      var reg=/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if(!reg.test(this.no)){
        Message({
                        showClose: true,
                        message: '请输入正确的身份证号'
                    })
        this.no='';
        return;
      }


    },
      auth(){
        var _this = this
        var db={
            'name':this.name,
            'no':this.no,
            'type':0
        }
        
        this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
        this.$axios.post('/api/v1/account/auth',qs.stringify(db))
        .then(function (response) {
            if(response.data.code==200){
                Message({
                        showClose: true,
                        message: '初级实名认证成功'
                    })
                    _this.open()
                    _this.$store.dispatch('GET_userInfo')
            }else if(response.data.code==3){
                Message({
                        showClose: true,
                        message: '不能重复认证哦'
                    })
            }else if(response.data.code==401){
                Message({
                        showClose: true,
                        message: '您还未登录，请先登录'
                    })
            }else if(response.data.code==1){
                Message({
                        showClose: true,
                        message: '姓名不能为空'
                    })
            }else if(response.data.code==2){
                Message({
                        showClose: true,
                        message: '身份证号不能为空'
                    })
            }else if(response.data.code==4){
                Message({
                        showClose: true,
                        message: '身份证已被使用'
                    })
            }
           
        })
        .catch(function (error) {
            console.log(error);
        });
      }
      
      },
      

};
</script>
<style scoped>
.msg_box{
    width: 200px;
    /* margin: 0 auto; */
    height: 100px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -100px;
}
.msg_box .msg_title{
    background: red;
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
   /* margin-left: 300px; */
   margin: 0 auto;
   width: 600px;
   position: relative;
   
}
.content .wrap span{
    width: 150px;
    display:inline-block;
    margin-top: 50px;
    font-size: 20px;
    color:rgba(233,225,225,1);
}
.content .wrap input:nth-of-type(1),.content .wrap input:nth-of-type(1){
    margin-top: 50px;
    margin-left: 50px;
}
.content .wrap input{
font-size:16px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(233,225,225,1);
}
.content .wrap input:nth-of-type(3),.content .wrap input:nth-of-type(4){
    width: 440px;
  height: 40px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 1px solid rgba(53, 49, 49, 1);
}
.content .wrap input:nth-of-type(5){
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