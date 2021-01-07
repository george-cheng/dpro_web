<template>
  <div class="treaty-container">
    <Header />
    <div class="content_main">
      <div class="assets_center">
        <div class="center">
          <span>LOGO</span>
          <span>合约名称</span>
          <span>抢购币种名称</span>
          <span>抢购标准</span>
          <span>总产量</span>
          <span>释放周期</span>
          <span>开放时间</span>
          <span>状态</span>
        </div>
        <ul>
          <li v-for="(item, index) in treatyList" :key="item.id">
            <span
              ><img
                class="treaty-logo"
                :src="
                  `https://dpro-main.oss-cn-hongkong.aliyuncs.com` + item.logo
                "
            /></span>
            <span>{{ item.name }}</span>
            <span>{{ item.coin_name }}</span>
            <span>{{ item.ded_amount }}</span>
            <span>{{ item.ded_amount * item.out_mult }}</span>
            <span>{{ item.return_days }}</span>
            <span>{{ item.open_date }}</span>
            <span :class="item.state === 0 ? 'close' : 'open'">{{
              item.state === 0 ? "关闭" : "开启"
            }}</span>
          </li>
        </ul>
      </div>

      <div class="treatyBtn">
        <input @click="buyNowEvent" type="button" value="抢1单" />
        <input type="button" value="委托抢购" @click="entrustEvent" />
        <nuxt-link to="/treaty/buyNowRecord">合约资产</nuxt-link>
        <nuxt-link to="/treaty/purchaseFailRecord">抢购收益</nuxt-link>
        <nuxt-link to="/treaty/recomRecord">分享收益</nuxt-link>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import qs from "qs";
import { mapState } from "vuex";
import Header from "~/components/common/header.vue";
import Footer from "~/components/common/footer.vue";
import { Message } from "element-ui";
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      treatyList: [],
      flag: true,
    };
  },
  mounted() {},
  computed: {},
  methods: {
    /* 委托抢购 */
    entrustEvent() {
      this.flag = true;
      let count = 0;
      let timer = setInterval(() => {
        count++;
        if (count >= 10) {
          clearInterval(timer);
        }
        if (this.flag) {
          this.buyNowEvent();
        }
      }, 3000);
    },
    /* 立即抢购 */
    buyNowEvent() {
      this.$axios
        .post("/api/v1/treatyType/buy")
        .then((res) => {
          if (res.data.code === 200) {
            Message({
              message: res.data.msg,
            });
            this.flag = true;
          } else {
            if (res.data.code !== 500) {
              this.flag = false;
            }
            Message({
              message: res.data.msg,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取用户信息
    getTreatyList() {
      this.$axios
        .get("/api/v1/treatyType/allList")
        .then((res) => {
          if (res.data.code === 200) {
            this.treatyList = res.data.data.rows;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getTreatyList();
  },
};
</script>
<style scoped lang="less">
.content_main {
  /*width: 1202px;*/
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
        margin: 0 30px;
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
        span {
          margin: 0 30px;
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
.treaty-logo {
  width: 36px;
  height: 36px;
}
.close {
  color: #f00;
}
.open {
  color: #ccc;
}
</style>
