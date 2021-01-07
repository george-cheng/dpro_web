<template>
  <div>
    <Header />
    <div class="main">
      <div class="title">费率说明</div>
      <div class="content">
        <div class="tab">
          <div @click="handleTab(1)">
            <p>交易费率</p>
            <p>0.2%交易手续费。（扣除收取到的资产）</p>
          </div>
          <div @click="handleTab(2)">
            <p>充值费率</p>
            <p>免费</p>
          </div>
          <div @click="handleTab(3)">
            <p>提现费率</p>
            <p>提现手续费将会根据区块实际情况定期调整</p>
          </div>
        </div>
        <div class="list_box3" v-if="active==3">
          <div class="list_header">
            <span>币种</span>
            <span>币种全称</span>
            <span>最小提币数量</span>
            <span>固定手续费</span>
            <span>提币手续费</span>
          </div>
          <ul
            v-loading="rateData.length>0 ? false : true"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0)"
          >
            <li v-for="(item, index) in rateData" :key="index">
              <span>{{item.name}}</span>
              <span>{{item.allName}}</span>
              <span>{{item.minWithdrawAmount}}</span>
              <span>{{item.withdraw}}</span>
              <span>{{item.withdrawFees}}</span>
            </li>
          </ul>
        </div>
        <div class="list_box2" v-if="active==2">
          <p>免费</p>
        </div>
        <div class="list_box1" v-if="active==1">
          <p>0.2%交易手续费。（扣除收取到的资产）</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import qs from "qs";

import Header from "~/components/common/header.vue";
import Footer from "~/components/common/footer.vue";

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      active: 3,
      fid: [47, 106],
      rateData: []
    };
  },
  mounted() {
    this.getCoinRate();
  },
  methods: {
    handleTab: function(e) {
      this.active = e;
    },
    getCoinRate: function() {
      var _this = this;
      this.$axios
        .post("/api/v1/coinList")
        .then(function(response) {
          _this.rateData = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.main {
  width: 1302px;
  margin: 0 auto;
  color: #dbd3d3;
}
.title {
  height: 66px;
  line-height: 66px;
  margin: 20px auto;
  background: #302828;
  font-size: 20px;
  font-weight: 500;
  padding-left: 28px;
}
.content {
  background: #302828;
  margin-bottom: 60px;
}
.tab {
  display: flex;
  justify-content: space-evenly;
  padding: 23px 0 19px 0;
}
.tab > div {
  height: 110px;
  width: 398px;
  /* background: red; */
  border-radius: 5px;
  border: 2px solid rgba(79, 71, 71, 1);
  padding: 20px 0 0 33px;
  cursor: pointer;
}
.tab > div > p:first-child {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 12px;
  line-height: 24px;
}
.tab > div > p:nth-child(2) {
  font-size: 16px;
}
.list_box3,
.list_box2,
.list_box1 {
  width: 1238px;
  margin: 0 auto;
}
.list_box2 p,
.list_box1 p {
  text-align: center;
  font-size: 24px;
  padding-bottom: 10px;
}
.list_header {
  height: 61px;
  background: rgba(40, 32, 32, 1);
  font-size: 16px;
  font-weight: 400;
  color: rgba(124, 120, 120, 1);
  line-height: 61px;
  display: flex;
}
.list_header > span {
  flex: 1;
  text-align: center;
}
.list_box3 > ul li {
  display: flex;
  font-size: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #453d3d;
}
.list_box3 > ul li:last-child {
  border: none;
}
.list_box3 > ul li span {
  flex: 1;
  text-align: center;
  color: #dbd3d3;
}
</style>