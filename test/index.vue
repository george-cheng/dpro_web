<template>
  <div class="treaty-container">
    <Header />
    <Footer />
  </div>
</template>

<script>
import qs from "qs";
import { mapState } from "vuex";
import Header from "~/components/common/header.vue";
import Footer from "~/components/common/footer.vue";
import md5 from 'md5.js'
import crypto from 'crypto'
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      isShow: false,
      activeIndex: 1,
      showLi: false,
      showLi02: false,
      showTransferBox: false,
      optionalType: "", //自选买卖类型
      showOptionBox: false, //是否显示自选买卖弹框
      orderMsg: "",
      totalCount: "",
      buyMsg: {},
      payType: "全部支付方式",
    };
  },
  mounted() {

    setTimeout(() => {

      if (this.userInfo.data) {
        console.log(this.userInfo);
        // var userkh = this.userInfo.data.loginName;
        var userkh = '18568202562';
        console.log(userkh);
        // var userid = this.userInfo.data.id; //
        var userid = '601868'; //

        console.log(this.getmd5(userid + "," + userkh + ",2020"));

        var openid = this.getmd5(userid +  userkh + "2020"); //这个算法必须只有我们知道。
        let url = "http://otc.dpro.ltd/mywap/login.html?userid=" + userid +"&userkh=" + userkh + "&openid=" + openid;
        console.log(url);
        return
        window.location.href =
          "http://otc.dpro.ltd/mywap/login.html?userid=" +
          userid +
          "&userkh=" +
          userkh +
          "&openid=" +
          openid;
        //
        //    this.$store.dispatch('getBalance',{fvId:50,url:'/api/v1/findUsdtBuinessByFuId'});
      } else {
        this.$router.push({ path: "/login" });
      }
    }, 1000);
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    getmd5(str){
      var a;
      var md5 = crypto.createHash("md5");
      md5.update(str);
      var a = md5.digest('hex');
      return a;
    },
    //获取用户信息
    getUserInfo() {
      var _this = this;
      this.$axios
        .get("/api/v1/session")
        .then(function (response) {
          if (response.data.data != null) {
            console.log(JSON.stringify(_this.response.data.data));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {

  }
};
</script>
