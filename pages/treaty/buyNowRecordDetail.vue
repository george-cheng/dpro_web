<template>
  <div id="">
    <Header />

    <div class="backMenu" @click="$router.go(-1)">返回</div>
    <div class="content">
      <span class="content-title">合约返还统计</span>

      <div class="content-title-list">
        <div>
          <span class="listLft">释放数量：</span>
          <span class="listRgt">{{ recordDetail.return_amount }}</span>
        </div>
        <div>
          <span class="listLft">进入虫洞数量：</span>
          <span class="listRgt">{{ recordDetail.destroy_amount }}</span>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "../../components/common/header.vue";
import Footer from "../../components/common/footer.vue";
import { Message } from "element-ui";
export default {
  name: "recomRecord",
  components: { Header, Footer},
  data(){
    return {
      recordDetail: [],
      purchId: ''
    }
  },
  methods: {
    getRecomRecordList(){
      this.$axios.get("/api/v1/treatyReturnLog/count", {params:{page: 1,
          pageSize: 10, purchId: this.purchId},})
        .then( (res) => {
          if (res.data.code === 200) {
            this.recordDetail = res.data.data
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
    this.purchId = this.$route.query.id
    this.getRecomRecordList()
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
