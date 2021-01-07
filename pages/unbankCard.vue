<template>
  <div id="cantainer">
    <PersonalNav />
    <div class="title">
        <p>微信解绑</p>
    </div>
    <div class="content">
        <div class="wrap" v-if="fuserArr.code == 200">
            <span>用户姓名：</span>
            <!-- <input type="text" placeholder="输入已绑定的支付宝账号姓名" v-model="fuName"><br> -->
            <span>{{fuserArr.data.fuName}} </span><br>
            <span>银行卡号：</span>
            <!-- <input type="text" placeholder="请输入已绑定的支付宝账号" v-model="falipay"><br> -->
            <span> {{fuserArr.data.fbankCardNumber}}</span><br>
            <input type="button" value="解除绑定" @click="updateFuserAccount"/>
        </div>
        
    </div>
    <Footer />
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
      fuserArr:[]//收款信息
    };
  },
  computed: {
    ...mapState(['userInfo']),
  },

    mounted(){
    this.getfuser()
  },
  methods:{
    updateFuserAccount(){
      var _this = this
      var db={
             'fuName':this.fuserArr.data.fuName,
             'fuId':this.tool.getCookie('uid'),
              'fbankName':'null'
        }
        console.log(db);
        this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
        this.$axios.post('/api/v1/updateFuserAccount',qs.stringify(db))
        .then(function (response) {
           if (response.data.code == 200) {
            Message({
                        showClose: true,
                        message: '解绑成功'
                    })
                _this.$router.push({
                path: '/personal'
            })
          }
          
        })
        .catch(function (error) {
            console.log(error);
        });
 
      },

      //获取用户收款信息
         getfuser(){
           var _this = this
          var db={
              'fuId': this.tool.getCookie('uid')
          }
          this.$axios.post('/api/v1/findFuserAccountByfuId',  qs.stringify(db))
          .then(function (response) {
              _this.fuserArr = response.data
          })
          .catch(function (error) {
              console.log(error);
          });
         }
      
      },
      

};
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
    width: 180px;
    display:inline-block;
    margin-top: 50px;
    font-size: 20px;
    color:rgba(233,225,225,1);
}
.wrap>input:nth-of-type(1),.wrap>input:nth-of-type(2){
    width: 440px;
  height: 40px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 1px solid rgba(53, 49, 49, 1);
}
.wrap>input:nth-of-type(1){
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