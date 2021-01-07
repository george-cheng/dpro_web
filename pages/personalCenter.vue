<template>
  <div id="">
   <Header />
    <div class="content">
      <span class="content-title">个人信息</span>
      <div class="content-title-list">
        <div>
          <span class="listLft">登录名：</span>
          <span class="listRgt">{{userInfo.loginName}}</span>
        </div>
        <div>
         <span class="listLft">等级：</span>
         <span class="listRgt" v-if="userInfo.grade === 0">普通用户</span>
         <span class="listRgt" v-if="userInfo.grade === 1">VIP</span>
         <span class="listRgt" v-if="userInfo.grade !== 0 && userInfo.grade !== 1">V{{ parseInt( userInfo.grade ) -1 }}</span>
       </div>
       <div>
         <span class="listLft">直推人数：</span>
         <span class="listRgt">{{userInfo.introCount}}</span>
       </div>
       <div>
         <span class="listLft">团队人数：</span>
         <span class="listRgt">{{userInfo.introTeamTotal}}</span>
       </div>
      </div>
    </div>
    <!-- <div class="content_main">
      <span class="content-main-title">VIP规则</span>
      <div class="assets_center">
        <div class="center">
          <span>ID</span>
          <span>名称</span>
          <span>直推人数</span>
          <span>团队人数</span>
          <span>收益比例</span>
          <span>阶梯奖励比例</span>
        </div>
        <ul>
          <li v-for="(item, index) in vipRuleList" :key="item.id">
            <span>{{item.id}}</span>
            <span>{{item.name}}</span>
            <span>{{item.invite_numbers}}</span>
            <span>{{item.team_numbers}}</span>
            <span>{{item.income_ratio}}</span>
            <span>{{item.ladder_ratio}}</span>
          </li>
        </ul>
      </div>
    </div> -->


    <div class="content_main">
      <span class="content-main-title">会员邀请记录</span>
      <div class="assets_center">
        <div class="center">
          <span>用户ID</span>
          <span>用户登陆名</span>
          <span>注册日期</span>
          <span>是否实名认证</span>
        </div>
        <ul>
          <li v-for="(item, index) in introList" :key="item.fid">
            <span>{{item.fid}}</span>
            <span>{{item.floginName}}</span>
            <span>{{item.fregisterTime}}</span>
            <span>{{item.fIdentityStatus === 2 ? '已实名' : '未实名'}}</span>
          </li>
        </ul>
      </div>
    </div>
    <Footer />
  </div>

</template>

<script>
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import { Message } from "element-ui";
import qs from "qs";
import {mapState} from "vuex";
export default {
  components: { Header, Footer },
  data(){
    return {
      personList: [],
      vipRuleList: [],
      userInfo: [],
      introList: [],
    }
  },
  methods: {
    getSession(){
      this.$axios
        .get("/api/v1/session")
        .then( (res) => {
          if (res.data.code === 200) {
            this.userInfo = res.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // getVipRule(){
    //   this.$axios
    //     .get("/api/v1/config/vipRule")
    //     .then( (res) => {
    //       if (res.data.code === 200) {
    //         this.vipRuleList = res.data.data.rows;
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    getIntroList(){
      this.$axios
        .get("/api/v1/introList")
        .then( (res) => {
          if (res.data.code === 200) {
            this.introList = res.data.data.rows;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  computed: {
  },
  created() {
    this.getSession()
    // this.getVipRule()
    this.getIntroList()
  }
}
</script>

<style scoped lang="less">
#cantainer {
  width: 100%;
  position: relative;
  background: rgba(27, 21, 21, 1);
}

.assets_center {
  margin-bottom: 40px;
  background: rgba(40, 32, 32, 1);
  border-radius: 10px;
  color:#fff;
  .center{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1b1515;
    span{
      margin: 0 30px;
      display: inline-block;
      width: 100px;
      text-align: center;
    }
  }
  ul{
    display: flex;
    justify-content: center;
    flex-direction: column;
    li{
      display: flex;
      justify-content: center;
      height: 42px;
      line-height: 42px;
      span{
        margin: 0 30px;
        display: inline-block;
        width: 100px;
        text-align: center;
      }
    }
  }
}

.content{
  .content-title{
    display: flex;
    justify-content: center;
  }
  .content-title-list{
    margin-top: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;

  }
  .content-title-list>div{
    display: flex;
    justify-content: center;
    width: 300px;
    margin: 0 auto;
    .listLft{
      width: 70px;
      text-align: right;
    }
    .listRgt{
      width: 50px;
    }
  }

}

.content-main-title{
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 28px;
}

</style>
