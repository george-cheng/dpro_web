<template>
  <div>
    <Header />
    <div class="main">
      <div class="left">
        <div class="total_assets">
          <TotalAssets />
        </div>
        <div class="quotation">
          <Quotation />
        </div>
      </div>
      <div class="center">
        <div class="overview">
          <Overview />
        </div>
        <div class="kline">
          <Kline/>
        </div>
        <div class="entrust">
          <Entrust />
        </div>
      </div>
      <div class="right">
        <div class="business_list_and_deal">
          <BusinessListAndDeal />
        </div>
        <div class="business">
          <Business />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/common/header.vue";
import TotalAssets from "~/components/exchange/pro/TotalAssets.vue";
import Quotation from "~/components/exchange/pro/Quotation.vue";
import Overview from "~/components/exchange/pro/Overview.vue";
import Kline from "~/components/exchange/kline";
import Entrust from "~/components/exchange/pro/Entrust.vue";
import BusinessListAndDeal from "~/components/exchange/pro/BusinessListAndDeal.vue";
import Business from "~/components/exchange/pro/Business.vue";

export default {
  layout: "pro",
  data() {
    return {
      // websock: null,
      market_id: 0
    };
  },
  components: {
    Header,
    TotalAssets,
    Quotation,
    Overview,
    Kline,
    Entrust,
    BusinessListAndDeal,
    Business
  },
  async fetch({ store, params, $axios }) {
    // 调用vuex里面actions GET_balances去请求数据
    await store.dispatch("GET_balances");
  },
  mounted() {
    let fid = JSON.parse(localStorage.getItem("fvId"));
    let fShortName = JSON.parse(localStorage.getItem("currency"));
    let group = JSON.parse(localStorage.getItem("group"));
    if (fid != null && fid != "" && fid != undefined) {
      this.$store.commit("SET_fvId", fid);
    }
    if (fShortName != null && fShortName != "" && fShortName != undefined) {
      this.$store.commit("SET_currency", fShortName);
    }
    if (group != null && group != "" && group != undefined) {
      this.$store.commit("SET_group", group);
    }
    this.$store.dispatch("GET_currentData");
  }
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  min-width: 1200px;
}
.left,
.center,
.right {
  height: 900px;
  min-height: 600px;
}
.left {
  width: 16.5vw;
  min-width: 180px;
  background: red;
}
.left > .total_assets {
  height: 50px;
}
.left > .quotation {
  height: 850px;
}
.center {
  width: 50vw;
  min-width: 642px;
}
.center > .overview {
  height: 50px;
}
.center > .kline {
  height: 580px;
  margin: 5px 0;
}
.center > .entrust {
  height: 260px;
}
.right {
  width: 32vw;
  min-width: 360px;
}
.right > .business_list_and_deal {
  height: 635px;
  margin-bottom: 5px;
}
.right > .business {
  height: 260px;
}
</style>