<template>
  <div id="cantainer">
    <PersonalNav />
    <div class="content_top">
      <p>站内消息</p>


      <div class="content_top_left" style="background:#282020;font-size: 14px;">
        <div class="tl w20">
          时间
        </div>
        <div class="tc w30">
          标题
        </div>
        <div class="w20 tc">
          状态
        </div>
        <div class="w20 tr">
          操作
          <span class="ft12 allread" style="margin-left: 10px;color: rgb(164, 213, 255);" @click="readAll">全部已读</span>
        </div>
      </div>

      <div class="">
        <ul style="min-height: 480px;">
          <li v-for="(item,index) in List" :key="index" class="tl w20 border-bottom flex" style="width: 1242px;display: flex;justify-content: space-between;margin: auto;">
            <div class="tl w20">
              {{item.send_time}}
            </div>
            <div class="tc w30 line_1">
              {{item.title}}
            </div>
            <div class="tc w20">
              <span class="allread" style="color: rgb(255, 77, 78);" v-if="item.state == 1">未读</span>
              <span class="allread" v-else style="color: rgb(27, 208, 152);">已读</span>

            </div>
            <div class="w20 tr plr20">
              <span class="allread" style="color: rgb(255, 77, 78);" @click="del(item.id,index)">删除</span>
              <span class="allread" style="color: rgb(27, 208, 152);margin-left: 5px;" @click="detail(item.id,index)">详情</span>
            </div>
          </li>
          <li v-show="isShow" class="ptb30 tc ft16">{{msg}}</li>

        </ul>
        <!-- 分页-->
        <div class="" style="width: 1242px;margin: auto;">
          <div class="tr ptb15" v-if="!isShow">
            <el-pagination background small layout="prev, pager, next" :total="total" :page-size="10" @prev-click="prev"
              @next-click="next" @current-change="current"></el-pagination>
          </div>
        </div>

        <!-- 删除提示 -->
        <div class="w100 h100 fixed flex alcenter jscenter" v-show="showBox" style="top:0;left:0;">
          <div class=" bgMain radius5 white transferBox">
            <div class="plr20 ptb10">
              <p class="tr white ft16">
                <span class="curPer" @click="close(1)">X</span>
              </p>
              <h2 class="white mb10 tc">提示</h2>
              <p class="ft16 tc" style="padding-bottom: 20px;">确定删除么?</p>
            </div>

            <div class="deltext flex">
              <span class="flex1 tc" @click="close(1)">
                取消
              </span>
              <span class="flex1 tc" @click="suredel">
                确定
              </span>
            </div>
          </div>
        </div>
        <!-- 查看详情-->
        <div class="w100 h100 fixed flex alcenter jscenter" v-show="showBoxDetail" style="top:0;left:0;">
          <div class=" bgMain radius5 white transferBox">
            <div class="plr20 ptb10">
              <p class="tr white ft16">
                <span class="curPer" @click="close(2)">X</span>
              </p>
              <h2 class="white mb10 tc">详情</h2>
              <p class="ft16 tc">
                {{detailcon.title}}
              </p>
              <p class="grayCor tr" style="padding-bottom: 20px;"> {{detailcon.send_time}}</p>
              <p style="max-height: 150px;overflow-y: scroll;">
                {{detailcon.content}}
              </p>
            </div>

            <div class="deltext flex">
              <span class="flex1 tc" @click="close(2)">
                已阅读
              </span>
            </div>
          </div>
        </div>
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
        Arr: [],
        userInfoArr: [], //用户安全信息，含谷歌验证的状态
        fuserArr: [], //收款信息
        List: [],
        showBox: false,
        delid: '',
        delindex: '',
        showBoxDetail: false,
        detailcon: '',
        isShow: false,
        page: 1,
        msg: '',
        total: 0,
      }
    },
    computed: {
      ...mapState(['userInfo','systemNoticeUnReads']),
    },
    async mounted() {
      this.getsystemNotice();
    },
    methods: {
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
<style scoped>
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
    background: rgba(48, 40, 40, 1);
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
</style>
