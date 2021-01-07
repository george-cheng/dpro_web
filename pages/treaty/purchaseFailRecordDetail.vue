<template>
  <div id="">
    <Header />

    <div class="backMenu" @click="$router.go(-1)">返回</div>

    <div class="content">
      <span class="content-title">失败收益详情</span>
      <div class="content-title-list">
        <div>
          <span class="listLft">合约名称：</span>
          <span class="listRgt">{{failDetail.treaty_name}}</span>
        </div>
        <div>
          <span class="listLft">抢购标准：</span>
          <span class="listRgt">{{failDetail.ded_amount}}</span>
        </div>
        <div>
          <span class="listLft">纯收益：</span>
          <span class="listRgt">{{failDetail.reward_amount}}</span>
        </div>
        <div>
          <span class="listLft">进入虫洞：</span>
          <span class="listRgt">{{failDetail.destroy_amount}}</span>
        </div>
        <div>
          <span class="listLft">抢购时间：</span>
          <span class="listRgt">{{failDetail.purch_time}}</span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/common/header";
import Footer from "../../components/common/footer.vue";
import {Message} from "element-ui";

export default {
  name: "purchaseFailRecordDetail",
  components: { Header, Footer},
  data(){
    return {
      id: '',
      failDetail: []
    }
  },
  methods: {
    getPurFailDetail(){
      this.$axios.get("/api/v1/purchTreatyFailLog/findById", {params:{ purchId: this.id }})
        .then( (res) => {
          if (res.data.code === 200) {
            this.failDetail = res.data.data
          }else{
            Message({
              message: res.data.msg
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getPurFailDetail()
  }
}
</script>

<style scoped lang="less">

  .content-title{
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 28px;
  }
  .content{
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 20px auto;
    width: 100%;
  }
  .content-title-list{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
.content-title-list>div{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
