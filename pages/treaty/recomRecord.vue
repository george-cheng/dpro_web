<template>
  <div id="">
    <Header />


    <div class="backMenu" @click="$router.go(-1)">返回</div>


    <div class="content_main">
      <div class="assets_center">
        <div class="center">
          <span>下级用户账户</span>
          <span>抢购次数</span>
          <span>释放收益</span>
          <span>抢购收益</span>
          <span>时间</span>
        </div>
        <ul>
          <li v-for="(item, index) in recordList" :key="item.id">
            <span>{{ item.loginName }}</span>
            <span>{{ item.purchTimes }}</span>
            <span>{{ item.releaseProfit }}</span>
            <span>{{item.purchProfit}}</span>
            <span>{{localTime}}</span>
          </li>
        </ul>
        <pagination :pageTotal="pageTotal" @initData="initPageData"></pagination>
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
  components: { Header, Footer },
  data() {
    return {
      recordList: [],
      localTime: '',
      pageTotal: 0,
      page: 0,
      pageSize: 0,
    };
  },
  methods: {
    getLocalTmie(){
      let now = new Date();
      let year = now.getFullYear();
      let month = (now.getMonth() + 1).toString().padStart(2 ,0);
      let date = now.getDate().toString().padStart(2 ,0);
      this.localTime = year + '-' + month + '-' + date
    },
    initPageData(page, pageSize){
      this.page = page
      this.pageSize = pageSize
      this.$axios
        .get("/api/v1/suborTreatyProfit",{params:{page: this.page,
            pageSize: this.pageSize},})
        .then((res) => {
          if (res.data.code === 200) {
            this.pageTotal = res.data.data.total
            this.recordList = res.data.data.rows;
          } else {
            Message({
              message: res.data.msg,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getLocalTmie()
  },
};
</script>

<style scoped lang="less">

.content_main {
  margin: 0 auto;
  .center {
    margin: 0 auto;
  }
  .assets_center {
    margin-top: 20px;

    margin-bottom: 40px;
    background: rgba(40, 32, 32, 1);
    border-radius: 10px;
    color: #fff;
    .center {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #1b1515;
      span {
        margin: 0 20px;
        display: inline-block;
        width: 100px;
        text-align: center;
      }
    }
    ul {
      display: flex;
      justify-content: center;
      flex-direction: column;
      li {
        display: flex;
        justify-content: center;
        height: 42px;
        line-height: 42px;
        cursor: pointer;
        span {
          margin: 0 20px;
          display: inline-block;
          width: 100px;
          text-align: center;
        }
      }
    }
  }
}
.treatyBtn {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  input,
  a,
  .nuxt-link-exact-active,
  .active-link {
    font-size: 20px;
    padding: 5px 50px;
    margin: 0 40px;
    border-radius: 5px;
    background-color: #302828;
    cursor: pointer;
  }
  a {
    color: #fff !important;
  }
}
.close {
  color: #f00;
}
.open {
  color: #ccc;
}
</style>
