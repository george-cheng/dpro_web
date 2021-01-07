<template>
  <div>
    <IndexHotspot />
    <Header />
    <div class="content_bgcolor">
      <div class="content">
        <ExchangeTop/>
        <ExchangeCenter/>
        <ExchangeBottom/>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import IndexHotspot from "~/components/index/Index-Hotspot.vue";
import Header from "~/components/common/header.vue";
import Footer from "~/components/common/footer.vue";
import ExchangeTop from "~/components/exchange/Exchange-Top.vue";
import ExchangeCenter from "~/components/exchange/Exchange-Center.vue";
import ExchangeBottom from "~/components/exchange/Exchange-Bottom.vue";

export default {
  components: {
    IndexHotspot,
    Header,
    Footer,
    ExchangeTop,
    ExchangeCenter,
    ExchangeBottom
  },
  async fetch({ store, params, $axios }) {
    // 调用vuex里面actions GET_balances去请求数据
    await store.dispatch("GET_balances");
    await store.dispatch("GET_noticeList", {
      page: 1,
      pageSize: 10,
      type: 1
    });
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
.content_bgcolor {
  background: #1b1515;
  padding: 0.36vw 0 0.78vw 0;
}
.content {
  /* width: 67.91vw; */
  width: 1280px;
  /* height: 57.5vw; */
  height: 1085px;
  margin: 0 auto;
  /* padding: 0.36vw 16.045vw 0.78vw 16.045vw; */
}
</style>