<template>
  <div id="cantainer">
    <PersonalNav />
    <div class="title">
      <p>认证</p>
    </div>

    <div class="content">
      <div class="wrap">
        <div class="synopsis" v-html="synopsis"></div>
        <input type="button" :value="otcType === '0' ? '申请成为商家' : '撤销商家'" @click="addAccount(otcType)"/>
      </div>

    </div>


  </div>
</template>

<script>
import PersonalNav from "../components/common/header.vue";
import Footer from "../components/common/footer";
import qs from 'qs';
import { Message } from 'element-ui';
export default {
  name: "authenOtcBusiness",
  components: {
    PersonalNav,
    Footer
  },
  data(){
    return{
      businessList: [],
      synopsis: '',
      otcType: '',
    }
  },
  methods: {
    addAccount(otcType){
      if(otcType === '0'){
        this.$axios.$post('/api/v1/merchant/applyMerchant')
        .then((res)=>{
          if(res.code == 200){
            Message({
              showClose: true,
              message: '申请成功,请等待审核'
            })
            this.$router.push({path: "/personal"});
          }else{
            Message({
              showClose: true,
              message: res.msg
            })
          }
        })
      }else{
        this.$axios.$post('/api/v1/merchant/revokeMerchant')
          .then((res)=>{
            if(res){
              Message({
                showClose: true,
                message: '申请成功'
              })
              this.$router.push({path: "/personal"});
            }
          })
      }
    },
    getBusiness(){
      this.$axios.get('/api/v1/merchant/certRule')
        .then( (res) => {
          if(res.data.code == 200){
            console.log(res);

            this.businessList = res.data.data;
            this.synopsis = res.data.data.synopsis;
          }
        })
        .catch( (error) => {
          console.log(error);
        });
    }
  },
  created() {
    this.getBusiness()
    this.otcType = this.$route.query.otcType
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
.synopsis{
  padding-top: 20px;
  font-size: 28px;
  color: #fff;
}
.content .wrap span{
  width: 165px;
  display:inline-block;
  margin-top: 50px;
  font-size: 20px;
  color:rgba(233,225,225,1);
}
.wrap>input:nth-of-type(1),.wrap>input:nth-of-type(3),.wrap>input:nth-of-type(4){
  margin-top: 50px;
  width: 440px;
  height: 40px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 1px solid rgba(53, 49, 49, 1);
}

input{
  cursor: pointer;
}


</style>
