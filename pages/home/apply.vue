<template>
  <div id="cantainer">
    <PersonalNav />
    <div class="content_top">

     <div class="" style="width: 1242px;margin: auto;background:#282020;">
         <p class="white ft14" style="padding: 10px 30px;">上币申请</p>
      </div>


      <div class="content_top_left bgPart" style="font-size: 14px;padding: 10px 30px;margin-bottom: 30px;">
          <ul>
            <li>
              <div>
                <p class="white ft14 mb10 bold">如果您想在DPRO交易平台上线虚拟资产，请填写以下信息进行表单提交。我们将在3天之内回复您。</p>
                <p class="grayCor">注：如以下内容还没有详细资料或还未搭建好，可暂时填写无填写详细的申请我们将会更快为您的审核</p>
              </div>
            </li>
            <li class="red bold mt10">
              项目基本信息(没有的填无)
            </li>
            <li class="mt5">
              <p class="white">项目发起时间 <span class="red">*</span></p>
              <div class="input mt10"> <el-date-picker
              @change="selectTime"
                     v-model="valuetime"
                     type="date"
                     value-format="yyyy-MM-dd"
                     placeholder="选择日期时间">
                   </el-date-picker>
              </div>
            </li>
            <li class="mt5">
              <p class="white">中文名称 <span class="red">*</span></p>
              <div class="input mt10">
                 <input type="text" v-model="zh_project_name">
              </div>
            </li>
            <li class="mt5">
              <p class="white">英文名称 <span class="red">*</span></p>
              <div class="input mt10">
                 <input type="text" v-model="en_project_name">
              </div>
            </li>
            <li class="mt5">
              <p class="white">英文缩写 <span class="red">*</span></p>
              <div class="input mt10">
                 <input type="text" v-model="en_short_name">
              </div>
            </li>
            <li class="mt5">
              <p class="white">发起总量 <span class="red">*</span></p>
              <div class="input mt10">
                 <input type="text" v-model="launch_total">
              </div>
            </li>
            <li class="mt5">
              <p class="white">类型（公链、代币） <span class="red">*</span></p>
              <div class="input mt10">
                 <input type="text" v-model="coin_type">
              </div>
            </li>
            <li class="mt5">
              <p class="white">	核心算法（代币写主链） <span class="red">*</span></p>
              <div class="input mt10">
                 <input type="text" v-model="algorithm">
              </div>
            </li>
            <!-- 	白皮书链接-->
            <li class="mt5">
              <p class="white">	白皮书链接 <span class="red">*</span></p>
              <div class="input mt10">
                 <input type="text" v-model="white_paper_url">
              </div>
            </li>
            <!-- website_url -->
            <li class="mt5">
              <p class="white">	项目官网链接 <span class="red">*</span></p>
              <div class="input mt10">
                 <input type="text" v-model="website_url">
              </div>
            </li>
            <li class="mt5">
              <p class="white">区块查询链接 <span class="red">*</span></p>
              <div class="input mt10">
                 <input type="text" v-model="query_block_url">
              </div>
            </li>
            <li class="mt5">
              <p class="white">	项目核心价值 <span class="red">*</span></p>
              <div class="input mt10">
                 <textarea v-model="project_worth" name="" id="" cols="30" rows="2"></textarea>
              </div>
            </li>
            <li class="mt5">
              <p class="white">应用规划 <span class="red">*</span></p>
              <div class="input mt10">
                 <textarea v-model="application_plan" name="" id="" cols="30" rows="2"></textarea>
              </div>
            </li>
            <li class="mt5 mb30">
              <p class="white">是否有众筹 <span class="red">*</span></p>
              <div class="mt10">
                <el-radio-group v-model="crowdfund" @change="checkedValue">
                 <el-radio label="1">无众筹计划</el-radio>
                 <el-radio label="2">无众筹计划</el-radio>
                 <el-radio label="3">正在进行</el-radio>
                 <el-radio label="4">已完成众筹</el-radio>
                 </el-radio-group>
                 <!-- <textarea v-model="crowdfund" name="" id="" cols="30" rows="10"></textarea> -->
              </div>
            </li>
            <!-- 概括目前众筹计划（如无众筹计划可跳过） 开始时间，结束时间，众筹价格，众筹参与人数，总融资情况，筹码分配情况等-->
            <li class="mt5">
              <p class="white">概括目前众筹计划（如无众筹计划可跳过） 开始时间，结束时间，众筹价格，众筹参与人数，总融资情况，筹码分配情况等</p>
              <div class="input mt10">
                 <textarea v-model="generalize_crowdfund" name="" id="" cols="30" rows="2"></textarea>
              </div>
            </li>
            <li class="mt5">
              <p class="white">项目团队成员介绍</p>
              <div class="input mt10">
                 <textarea v-model="team_member" name="" id="" cols="30" rows="2"></textarea>
              </div>
            </li>
            <!-- 其他信息或备注（如无可不填）-->
            <li class="mt5">
              <p class="white">其他信息或备注（如无可不填）</p>
              <div class="input mt10">
                 <textarea v-model="other_info" name="" id="" cols="30" rows="2"></textarea>
              </div>
            </li>
            <li class="red bold" style="margin-top: 60px;">
                联系方式
            </li>
            <li class="mt5">
              <p class="white">姓名 <span class="red">*</span></p>
              <div class="input mt10">
                 <input v-model="name" name="" id="" cols="30" rows="10"></input>
              </div>
            </li>
            <li class="mt5">
              <p class="white">手机号码 <span class="red">*</span></p>
              <div class="input mt10">
                 <input v-model="phone"></input>
              </div>
            </li>
            <li class="mt5">
              <p class="white">邮箱 <span class="red">*</span></p>
              <div class="input mt10">
                 <input v-model="email" name="" id="" cols="30" rows="10"></input>
              </div>
            </li>
            <li class="mt20 tc">
              <el-button class="w30 sumbit bgRed white buy" style="border:none;" @click="sumbit()" >提交</el-button>

            </li>
          </ul>
     </div>


    </div>
    <Footer />
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  import PersonalNav from "@/components/common/header.vue";
  import Footer from "@/components/common/footer";
  import {
    Message
  } from "element-ui";
  import qs from "qs";

  export default {
    components: {
      PersonalNav,
      Footer
    },
    data() {
      return {
        valuetime:'',
        zh_project_name:'',
        en_project_name:'',
        en_short_name:'',
        coin_type:'',
        algorithm:'',
        white_paper_url:'',
        website_url:'',
        query_block_url:'',
        project_worth:'',
        launch_total:'',
        application_plan:'',
        crowdfund:'',
        generalize_crowdfund:'',
        team_member:'',
        other_info:'',
        email:'',
        name:'',
        phone:''


      }
    },
    computed: {
      ...mapState(['userInfo','systemNoticeUnReads']),
    },
    async mounted() {
      //this.getsystemNotice();
    },
    watch:{

    },
    methods: {
      checkedValue(){
        console.log(this.crowdfund)
      },
      selectTime(valuetime){
         console.log(valuetime)
      },
      sumbit(){
        var that = this
        if(that.valuetime == ''){
          that.$message({
            message: '请选择项目发起时间 ',
            type: "warning"
          });
          return;
        }
        if(that.zh_project_name == ''){
          that.$message({
            message: '请输入	项目中文名称',
            type: "warning"
          });
          return;
        }
        if(that.en_project_name == ''){
          that.$message({
            message: '请输入	项目英文名称',
            type: "warning"
          });
          return;
        }
        if(that.en_short_name == ''){
          that.$message({
            message: '请输入	项目英文缩写',
            type: "warning"
          });
          return;
        }
        if(that.launch_total == ''){
          that.$message({
            message: '请输入发起总量',
            type: "warning"
          });
          return;
        }
        if(that.coin_type == ''){
          that.$message({
            message: '请输入	类型（公链、代币）',
            type: "warning"
          });
          return;
        }
        if(that.algorithm == ''){
          that.$message({
            message: '请输入	核心算法（代币写主链）',
            type: "warning"
          });
          return;
        }
        if(that.white_paper_url == ''){
          that.$message({
            message: '请输入	白皮书链接',
            type: "warning"
          });
          return;
        }
        if(that.website_url == ''){
          that.$message({
            message: '请输入	项目官网链接',
            type: "warning"
          });
          return;
        }
        if(that.query_block_url == ''){
          that.$message({
            message: '请输入	区块查询链接',
            type: "warning"
          });
          return;
        }
        if(that.project_worth == ''){
          that.$message({
            message: '请输入	项目核心价值',
            type: "warning"
          });
          return;
        }
        if(that.application_plan == ''){
          that.$message({
            message: '请输入	应用规划',
            type: "warning"
          });
          return;
        }
        //crowdfund
        if(that.crowdfund == ''){
          that.$message({
            message: '请选择是否有众筹',
            type: "warning"
          });
          return;
        }
        if(that.name == ''){
          that.$message({
            message: '请输入姓名',
            type: "warning"
          });
          return;
        }
        if(that.phone == ''){
          that.$message({
            message: '请输入手机号码',
            type: "warning"
          });
          return;
        }
        if(that.email == ''){
          that.$message({
            message: '请输入邮箱',
            type: "warning"
          });
          return;
        }
        var data = {
          launch_time: that.valuetime,
          zh_project_name:that.zh_project_name,
          en_project_name:that.en_project_name,
          en_short_name:that.en_short_name,
          launch_total:that.launch_total,
          coin_type:that.coin_type,
          algorithm:that.algorithm,
          white_paper_url:that.white_paper_url,
          website_url:that.website_url,
          query_block_url:that.query_block_url,
          project_worth:that.project_worth,
          application_plan:that.application_plan,
          crowdfund:that.crowdfund,
          generalize_crowdfund:that.generalize_crowdfund,
          team_member:that.team_member,
          other_info:that.other_info,
          name:that.name,
          phone:that.phone,
          email:that.email
        };
        that.$axios.post('/api/v1/submit/coinApplication', qs.stringify(data))
          .then(function(res) {
            if (res.data.code == 200) {
              that.$message({
                message: res.data.msg,
                type: "success"
              });
              that.valuetime = '';
              that.launch_time = '';
              that.zh_project_name = '';
              that.en_project_name = '';
              that.en_short_name = '';
              that.launch_total = '';
              that.coin_type = '';
              that.algorithm = '';
              that.white_paper_url = '';
              that.website_url = '';
              that.query_block_url = '';
              that.project_worth = '';
              that.application_plan = '';
              that.crowdfund = '';
              that.generalize_crowdfund = '';
              that.team_member = '';
              that.other_info = '';
              that.name = '';
              that.phone = '';
              that.email = '';
            } else {
              that.$message.error(res.data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });





      },

      //全部已读
      readAll() {
        var that = this
        that.$axios.post('/api/v1/systemNotice/readAll')
          .then(function(res) {
            if (res.data.code == 200) {

              that.$store.dispatch("setUserSystemNoticeUnReads");

              that.$message({
                message: res.data.msg,
                type: "success"
              });
              for (var i = 0; i < that.List.length; i++) {
                that.List[i].state = 2
              }


            } else {
              that.$message.error(res.data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //详情
      detail(id, index) {
        var that = this
        that.$axios.get('/api/v1/systemNotice/findById?id=' + id)
          .then(function(res) {
            if (res.data.code == 200) {
              that.detailcon = res.data.data;
              that.showBoxDetail = true;

              that.List[index].state = 2


            } else {
              that.$message.error(res.data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });

      },
      close(type) {
        if (type == 1) {
          this.showBox = false
        } else {
          this.showBoxDetail = false
        }

      },
      //del
      del(id, index) {
        this.showBox = true
        this.delid = id;
        this.delindex = index

      },
      suredel() {
        var that = this
        var data = {
          id: that.delid
        };
        that.$axios.post('/api/v1/systemNotice/delById', qs.stringify(data))
          .then(function(res) {
            if (res.data.code == 200) {
              that.$message({
                message: res.data.msg,
                type: "success"
              });
              that.showBox = false
              that.List.splice(that.delindex, 1)


            } else {
              that.$message.error(res.data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });

      },
      //systemNotice/list 获取系统消息
      getsystemNotice() {
        var _this = this

        this.$axios.get('/api/v1/systemNotice/list?page=' + _this.page + '&pageSize=10')
          .then(function(response) {
            if (response.data.code == 200) {
              _this.List = response.data.data.rows;
              _this.total = response.data.data.total
              _this.isShow = false;
            } else {
              _this.isShow = true;
            }

          })
          .catch(function(error) {
            console.log(error);
          });
      },
      next() {
        this.page++;
        this.getsystemNotice();
      },
      prev() {
        this.page--;
        this.getsystemNotice();
      },
      current(e) {
        this.page = e;
        this.getsystemNotice();
      },

    }
  };
</script>
<style scoped="">
  .allread {
    cursor: pointer;
  }

  .w50 {
    width: 50%;
  }

  .w40 {
    width: 50%;
  }

  .w30 {
    width: 30%;
  }

  .w20 {
    width: 20%;
  }

  .w15 {
    width: 15%;
  }

  .w5 {
    width: 5%;
  }

  .w25 {
    width: 25%;
  }

  .border-bottom {
    font-size: 14px;
    border-bottom: 1px #383636 solid;
    height: 48px;
    line-height: 48px;
    color: #f5f5f5;
  }

  .border-bottom:last-child {
    border-bottom: none;
  }

  .v_content_top_right {
    display: flex;
    width: 660px;
  }

  .v_content_top_right>div {
    flex: 1;
  }

  * {
    /* margin: 0;
  padding: 0; */
  }

  #cantainer {
    position: relative;
    width: 1920px;
    /* height: 1558px; */
    background: rgba(27, 21, 21, 1);
  }

  .content_top {
    /* height: 196px; */
    margin-top: 20px;
    /* background: rgba(48, 40, 40, 1); */
    min-height: 68vh;
  }

  .content_top>p:nth-of-type(1) {
    height: 58px;
    line-height: 58px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    padding-left: 338px;
    color: rgba(219, 211, 211, 1);
    border-bottom: 2px solid #453d3d;
  }

  .content_top_left {
    /* width: 300px;
    height: 136px;
    display: flex;
    align-items: center;
    float: left;
    margin-left: 338px; */
    display: flex;
    background: #302727;
    margin: auto;
    padding: 10px 15px;
    width: 1242px;
    justify-content: space-between;
  }

  .tc {
    text-align: center;
  }

  .tl {
    text-align: left;
  }

  .tr {
    text-align: right;
  }

  .content_top_left>div {
    color: #fff;
  }

  .content_top_left>p {
    height: 24px;
    display: inline-block;
    margin-left: 20px;
    vertical-align: middle;
    margin-bottom: 150px;
  }

  .content_top_left>img {
    width: 50px;
    height: 50px;

  }

  .content_top_right {

    width: 800px;
    float: left;
    margin-left: 300px;
    text-align: center;
    margin-top: 35px;
    vertical-align: middle;

  }

  .content_top_right .span1 {
    width: 130px;
    height: 35px;
    display: inline-block;
    border-radius: 16px;
    margin-top: 10px;
    border: 1px solid rgba(189, 58, 59, 1);
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(189, 58, 59, 1);
    line-height: 32px;
  }

  .content_top_right .span2 {
    width: 134px;
    height: 35px;
    margin-top: 10px;
    display: inline-block;
    border-radius: 16px;
    border: 1px solid rgba(189, 58, 59, 1);
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(189, 58, 59, 1);
    line-height: 32px;
  }

  .content_center {
    width: 1920px;
    /* height: 514px; */
    margin-top: 8px;
    background: rgba(48, 40, 40, 1);
  }

  .content_center .wrap {
    width: 1242px;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    margin: 0 auto;
    padding: 26px 0 11px 0;

  }

  .content_center .wrap>div {
    width: 404px;
    height: 144px;
    border-radius: 10px;
    border: 1px solid rgba(79, 71, 71, 1);
    margin-bottom: 15px;
  }

  .content_center .wrap>div {
    display: flex;
    justify-content: baseline;
    align-items: center;
    width: 390px;
    height: 140px;
    margin-bottom: 9px;
    padding: 0px 30px;
    border-radius: 10px;
  }

  .content_center .wrap div span {
    font-size: 18px;
  }

  .content_center .wrap>div>div {
    width: 150px;
    color: rgba(219, 211, 211, 1);
    margin-left: 28px;
  }

  .content_center .wrap div:nth-of-type(2),
  .content_center .wrap div:nth-of-type(5),
  .content_center .wrap div:nth-of-type(8) {
    margin-left: 15px;
    margin-right: 15px;
  }

  .content_center .wrap div button {
    width: 84px;
    height: 32px;
    background: rgba(189, 58, 59, 1);
    border-radius: 16px;
    border: 0;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .content_bottom {
    width: 1920px;
    height: 514px;
    margin-top: 8px;
    margin-bottom: 9px;
    background: rgba(48, 40, 40, 1);
  }

  .content_bottom .wrap {
    width: 1242px;
    height: 514px;
    margin-left: 340px;

  }

  .content_bottom .wrap>div:nth-of-type(1)>p {
    width: 150px;
    height: 85px;
    line-height: 85px;
    font-size: 20px;
    padding-top: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(219, 211, 211, 1);
    line-height: 24px;
  }

  .content_bottom .wrap>div:nth-of-type(2) {
    width: 1242px;
    height: 54px;
    display: flex;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(124, 120, 120, 1);
    justify-content: space-between;
    align-items: center;
    background: rgba(40, 32, 32, 1);
    opacity: 0.39;
  }

  .content_bottom ul li {
    width: 1242px;
    height: 50px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(124, 120, 120, 1);
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #453D3D;
  }

  .content_bottom ul li span:nth-child(2),
  .content_bottom ul li span:nth-child(3) {
    /* flex: 1;
  text-align: center; */
    margin-right: 30px;
  }

  /* 删除弹框提示 */
  .transferBox {
    width: 30vw;
  }

  .scale-enter,
  .scale-leave-to {
    transform: scale(0);
  }

  .scale-enter-active {
    animation: scale 0.2s;
  }

  .scale-leave-active {
    animation: scale 0.2s reverse;
  }

  @keyframes scale {
    0% {
      transform: scaleY(0);
    }

    100% {
      transform: scaleY(1);
    }
  }

  .deltext {
    border-top: 1px solid #383636;
  }

  .deltext span {
    color: rgb(255, 77, 78);
    padding: 10px 0;
    cursor: pointer;
  }

  .deltext span:first-child {
    border-right: 1px solid #383636;
    color: #666;
  }
  .el-input__inner{
    background:#302727!important;
    border: none;
  }
  .input{
    width: 1182px;
    background: #302727;
    border:1px solid #383636;
    border-radius: 6px;
  }
  .input input{
    padding: 5px 10px;
  }
  textarea{
    background: transparent;
    border: none;
    width: 100%;
    outline: none;
    padding: 5px 10px;
  }
  .sumbit:hover{
      background: #bd3a3b;
      opacity: 0.8;
      color:#fff;
  }
</style>
