<template>
  <div class="index-top">
    <div style="padding-top: 40px" class="menu">
      <el-menu
        :default-active="activeIndex"
        class="el_nav"
        mode="horizontal"
        background-color="rgba(0, 0, 0, 0)"
        text-color="#fff"
        active-text-color="#fff"
      >
        <el-menu-item index="1">
          <nuxt-link to="/">
            <img
              style="margin-bottom: 20px"
              src="~assets/image/logo_other_page.png"
              alt="logo"
            />
          </nuxt-link>
        </el-menu-item>
        <el-submenu index="2" style="margin-top: 1px">
          <template slot="title">币币交易</template>
          <el-menu-item index="2-1">
            <nuxt-link to="/exchange">标准版</nuxt-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <nuxt-link to="/exchange/pro">专业版</nuxt-link>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="3">
          <nuxt-link to="/otc">OTC交易</nuxt-link>
        </el-menu-item>
        <el-menu-item index="4" @click="notYetOpen">杠杆交易</el-menu-item>
        <el-menu-item index="5">
          <nuxt-link to="/treaty">合约交易</nuxt-link>
        </el-menu-item>
        <el-menu-item index="6" @click="notYetOpen">合约兑换区</el-menu-item>
        <el-menu-item index="7">
          <nuxt-link to="/home/apply">上币申请</nuxt-link>
        </el-menu-item>

        <el-menu-item index="8" style="float: right">
          <el-dropdown @command="handleLanguage">
            <span
              class="el-dropdown-link"
              style="font-size: 14px; color: #ffffff"
            >
              简体中文
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="cn" :disabled="isLanguage"
                >简体中文</el-dropdown-item
              >
              <el-dropdown-item command="en">英文</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>

        <el-menu-item index="9" style="float: right" v-if="isLogin">
          <el-dropdown>
            <span
              class="el-dropdown-link"
              style="font-size: 0.88vw; color: #ccc3c3"
            >
              <img
                src="~assets/image/user.png"
                alt="个人中心"
                style="vertical-align: sub"
              />
            </span>
            <el-dropdown-menu slot="dropdown" style="text-align: center">
              <el-dropdown-item>ID:{{ userInfo.data.id }}</el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="/user/inviteRegister">邀请注册</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="/personalCenter">个人中心</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="/personal">安全中心</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="#">提交工单</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="#">当前委托</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="#">历史委托</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="/user/systemNotice">
                  <el-badge :value="systemNoticeUnReads" :max="99" class="item">
                    站内消息
                  </el-badge>
                </nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="logout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>

        <el-menu-item index="10" style="float: right" v-if="!isLogin">
          <nuxt-link to="/register" class="register">注册</nuxt-link>
        </el-menu-item>
        <el-menu-item index="11" style="float: right" v-if="!isLogin">
          <nuxt-link to="/login" class="login">登录</nuxt-link>
        </el-menu-item>

        <el-menu-item index="12" style="float: right" v-if="isLogin">
          <nuxt-link to="/assets">资产</nuxt-link>
        </el-menu-item>
        <el-menu-item index="13" style="float: right" v-if="isLogin">
          <nuxt-link to="/orders">订单</nuxt-link>
        </el-menu-item>

        <el-menu-item index="14" style="float: right">
          <nuxt-link to="/notice">公告</nuxt-link>
        </el-menu-item>
        <el-submenu index="15" style="float: right; margin-top: 1px">
          <template slot="title">工具</template>
          <el-menu-item index="15-1">
            <nuxt-link to="/help">帮助中心</nuxt-link>
          </el-menu-item>
          <el-menu-item index="15-2">
            <nuxt-link to="#">API文档</nuxt-link>
          </el-menu-item>
          <el-menu-item index="15-3">
            <nuxt-link to="#">数字资产介绍</nuxt-link>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="16" style="float: right">
          <nuxt-link to="#">
            <img
              src="~assets/image/vd.png"
              alt
              style="width: 20px; margin-bottom: 2px"
            />
            新手教程
          </nuxt-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content-box">
      <img src="~assets/image/logo.png" alt="上下版本logo" />
      <p>DPRO数字资产服务平台</p>
      <p>全球领先的数字资产服务平台</p>
    </div>
    <div class="banner">
      <div v-swiper:options="swiperOption" v-if="banners.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="banner in banners"
            v-bind:key="banner.key"
          >
            <a target="_blank" :href="banner.url">
              <img :src="banner.value" />
            </a>
          </div>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
    <div class="bottom-box">
      <div class="main_currency_market">
        <div v-if="priceData">
          <div class="market_info">
            <div class="market_price">
              <p>{{ priceData.USDT[0].fname_sn }}</p>
              <p>{{ priceData.USDT[0].lastDealPrize }}</p>
            </div>
            <div class="market_updown">
              <p
                v-if="priceData"
                :style="
                  'color:' +
                  (priceData.USDT[0].fupanddown > 0
                    ? '#1BD098'
                    : priceData.USDT[0].fupanddown == 0
                    ? '#FF4142'
                    : '#FF4D4E') +
                  ''
                "
              >
                {{
                  priceData.USDT[0].fupanddown > 0
                    ? "+" + priceData.USDT[0].fupanddown
                    : priceData.USDT[0].fupanddown
                }}%
              </p>
            </div>
          </div>
          <div class="market_echarts">
            <p id="myChart"></p>
          </div>
        </div>
        <div v-if="priceData">
          <div class="market_info">
            <div class="market_price">
              <p>{{ priceData.USDT[1].fname_sn }}</p>
              <p>{{ priceData.USDT[1].lastDealPrize }}</p>
            </div>
            <div class="market_updown">
              <p
                v-if="priceData"
                :style="
                  'color:' +
                  (priceData.USDT[1].fupanddown > 0
                    ? '#1BD098'
                    : priceData.USDT[1].fupanddown == 0
                    ? '#FF4142'
                    : '#FF4D4E') +
                  ''
                "
              >
                {{
                  priceData.USDT[1].fupanddown > 0
                    ? "+" + priceData.USDT[1].fupanddown
                    : priceData.USDT[1].fupanddown
                }}%
              </p>
            </div>
          </div>
          <div class="market_echarts">
            <p id="myChart2"></p>
          </div>
        </div>
        <div v-if="priceData">
          <div class="market_info">
            <div class="market_price">
              <p>{{ priceData.USDT[2].fname_sn }}</p>
              <p>{{ priceData.USDT[2].lastDealPrize }}</p>
            </div>
            <div class="market_updown">
              <p
                v-if="priceData"
                :style="
                  'color:' +
                  (priceData.USDT[2].fupanddown > 0
                    ? '#1BD098'
                    : priceData.USDT[2].fupanddown == 0
                    ? '#FF4142'
                    : '#FF4D4E') +
                  ''
                "
              >
                {{
                  priceData.USDT[2].fupanddown > 0
                    ? "+" + priceData.USDT[2].fupanddown
                    : priceData.USDT[2].fupanddown
                }}%
              </p>
            </div>
          </div>
          <div class="market_echarts">
            <p id="myChart3"></p>
          </div>
        </div>
        <div v-if="priceData">
          <div class="market_info">
            <div class="market_price">
              <p>{{ priceData.USDT[3].fname_sn }}</p>
              <p>{{ priceData.USDT[3].lastDealPrize }}</p>
            </div>
            <div class="market_updown">
              <p
                v-if="priceData"
                :style="
                  'color:' +
                  (priceData.USDT[3].fupanddown > 0
                    ? '#1BD098'
                    : priceData.USDT[3].fupanddown == 0
                    ? '#FF4142'
                    : '#FF4D4E') +
                  ''
                "
              >
                {{
                  priceData.USDT[3].fupanddown > 0
                    ? "+" + priceData.USDT[3].fupanddown
                    : priceData.USDT[3].fupanddown
                }}%
              </p>
            </div>
          </div>
          <div class="market_echarts">
            <p id="myChart4"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import qs from "qs";
import { Message } from "element-ui";
export default {
  data() {
    return {
      activeIndex: "0",
      isLanguage: true,
      banners: [],
      swiperOption: {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        autoplay: true,
        autoplay: {
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "custom",
          // autoplayDisableOnInteraction : false,
          renderCustom: function (swiper, current, total) {
            var paginationHtml = " ";
            for (var i = 0; i < total; i++) {
              // 判断是不是激活焦点，是的话添加active类，不是就只添加基本样式类
              if (i === current - 1) {
                paginationHtml +=
                  '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
              } else {
                paginationHtml +=
                  '<span class="swiper-pagination-customs"></span>';
              }
            }
            return paginationHtml;
          },
        },
        on: {
          slideChange() {},
          tap() {},
        },
      },
      timer: "", //定时器函数
    };
  },
  mounted() {
    this.$store.dispatch("GET_userInfo");
    var data = { via: "web" };

    this.$axios.get("/api/v1/config/banner", qs.stringify(data)).then((res) => {
      let bannerDate = [];
      for (let i = 0; i < res.data.data.length; i++) {
        // if (res.data.data[i].key.search("web") != -1) {
        if (res.data.code == 200) {
          res.data.data[i].value =
            `https://dpro-main.oss-cn-hongkong.aliyuncs.com` +
            res.data.data[i].image_url;
          bannerDate.push(res.data.data[i]);
        }
      }
      this.banners = bannerDate;
    });
    this.initAllEcharts();
    this.timer = window.setInterval(() => {
      setTimeout(this.initAllEcharts(), 0);
    }, 30000);
  },
  computed: {
    ...mapState(["userInfo", "priceDatas", "systemNoticeUnReads"]),
    isLogin: function () {
      if (this.userInfo.code == 200) {
        return true;
      } else {
        return false;
      }
    },
    priceData: function (e) {
      return this.priceDatas;
    },
  },
  methods: {
    /**
     * 折线图
     */
    initAllEcharts: function () {
      let _t = this;
      setTimeout(function () {
        _t.EchartsInit(1, "myChart");
        _t.EchartsInit(2, "myChart2");
        _t.EchartsInit(3, "myChart3");
        _t.EchartsInit(4, "myChart4");
      }, 200);
    },
    EchartsInit(fId, domId) {
      var btcUsdtK = [];
      const url = `/api/v2/market/period`;
      this.$axios
        .get(url, {
          params: {
            symbol: fId,
            step: 60,
          },
        })
        .then((res) => {
          if (res.status + "" == "200") {
            const dataArr = res.data;
            let klineArr = [[], []];
            for (let arr of dataArr) {
              klineArr[0].push(arr.slice(3, 7));
              klineArr[1].push(arr[7]);
            }
            btcUsdtK = klineArr[1];
          }
          // 找到容器
          let myChart2 = this.$echarts.init(document.getElementById(domId));
          // 开始渲染
          myChart2.setOption({
            xAxis: {
              type: "category",
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              show: false,
            },
            yAxis: {
              type: "value",
              boundaryGap: [0, "100%"],
              show: false,
            },
            series: [
              {
                data: btcUsdtK,
                type: "line",
                showSymbol: false,
                hoverAnimation: false,
                color: ["#ffffff"],
              },
            ],
          });
        });
    },
    handleLanguage: function (command) {
      this.$message("click on item " + command);
    },
    notYetOpen() {
      Message({
        message: "等待开放",
      });
    },
    //退出登录
    logout() {
      var _this = this;
      this.$axios.setHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      this.$axios
        .post("/api/v1/logout")
        .then(function (response) {
          if (response.data.code == 200) {
            _this.$store.dispatch("GET_userInfo");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style>
.el_nav li,
.el-submenu__title {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff !important;
}

.el-menu-item,
.el-submenu__title {
  padding: 0 10px;
}
.el-menu--popup {
  min-width: 76px;
}
.el-menu--popup-bottom-start .el-menu-item > a {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
  display: none;
}
.el-menu-item [class^="el-icon-"] {
  font-size: 14px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border: none;
  color: #bd3a3b !important;
}
.el-menu--horizontal > .el-menu-item {
  border: none;
}
.el-submenu__title:hover {
  color: #bd3a3b !important;
  background-color: rgba(220, 38, 38, 0) !important;
}
.el-menu-item:hover {
  color: #bd3a3b !important;
  background-color: rgba(220, 38, 38, 0) !important;
}
.el-menu.el-menu--horizontal {
  border: none;
  padding-left: 20px;
}

.login {
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  padding: 10px 16px;
}
.login:hover {
  color: #fff !important;
}
.register {
  border-radius: 5px;
  padding: 9px 15px;
  border: 1px solid rgba(255, 255, 255, 1);
}
.index-top {
  position: relative;
}
.bottom-box {
  width: 100%;
  margin-top: 72px;
}
.main_currency_market {
  display: flex;
  width: 60%;
  margin: 10px auto;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}
.main_currency_market > div {
  width: 25%;
  padding: 0.4vw;
}
.main_currency_market > div > div {
  display: flex;
  width: 100%;
}
.market_info {
  font-size: 0.84vw;
  line-height: 1.6vw;
  padding: 0.2vw 0.6vw;
  color: rgba(255, 255, 255, 1);
}
.market_info > div {
  width: 48%;
}
.market_updown > p {
  text-align: right;
}
.market_echarts > p {
  width: 200px;
  height: 80px;
}
.market_price p {
  width: 100%;
}

.content-box {
  text-align: center;
  margin-top: 60px;
}
.content-box > img {
  width: 88px;
}
.content-box > p:nth-child(2) {
  font-size: 1.28vw;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  /* line-height:5.2vw; */
  letter-spacing: 0.1vw;
  margin-top: 25px;
}
.content-box > p:nth-child(3) {
  font-size: 2.4vw;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  /* line-height:2.08vw; */
  letter-spacing: 0.1vw;
  margin-top: 20px;
  /* margin-bottom: 4.1vw; */
}

.banner {
  position: relative;
  margin-top: 30px;
}
.swiper-container {
  width: 60%;
}

.swiper-pagination {
  width: 100%;
  margin-top: 2.03vw;
}
/*包裹自定义分页器的div的位置等CSS样式*/
/* .swiper-pagination-custom {
  bottom: -2.44vw
} */
/*自定义分页器的样式，这个你自己想要什么样子自己写*/
.swiper-pagination-customs {
  width: 0.31vw;
  height: 0.31vw;
  background: rgba(255, 255, 255, 1);
  opacity: 0.4959;
  display: inline-block;
  border-radius: 50%;
  margin: 0 0.26vw;
  outline: 0;
}
/*自定义分页器激活时的样式表现*/
.swiper-pagination-customs-active {
  opacity: 1;
  width: 1.14vw;
  height: 0.31vw;
  background: rgba(255, 255, 255, 1);
  border-radius: 2.44vw;
}
.swiper-pagination-custom {
  bottom: -2.03vw;
}

.swiper-slide {
  /* width: 29.68vw !important;
  height: 14.79vw; */
  /* width: 380px !important; */
  height: 190px;
  /* margin-right: 20px !important; */
}
.swiper-slide img {
  width: 100%;
  height: 100%;
  border-radius: 0.5vw;
}

.index-top {
  background: url("~assets/image/index.png");
  background-size: 100% 100%;
  height: 920px;
}
.index-top nav {
  padding-top: 3.8vw;
  margin-left: 4.37vw;
}
.index-top nav ul {
  width: 46.04vw;
  height: 2.81vw;
  padding: 0;
  display: inline-block;
}
.index-top nav li {
  float: left;
  height: 2.81vw;
  line-height: 3.59vw;
  list-style: none;
  padding: 0 0.6vw;
  font-size: 1.25vw;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.index-top nav li img {
  height: 100%;
}
/* .index-top .nav_right{
  width: 31.09vw;
  display: inline-block;
  float: right;
  height: 2.81vw;
  line-height: 3.59vw;
  font-size:1.25vw;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
} */
.index-top .nav_right span {
  margin: 0 0.72vw;
}
.index-top .nav_right > span:first-child,
.index-top .nav_right > span:last-child {
  position: relative;
}
.index-top .nav_right > span:first-child::before {
  content: "";
  background: url("~assets/image/shouji.png") no-repeat;
  background-size: 100% 100%;
  width: 0.93vw;
  height: 1.45vw;
  position: absolute;
  top: 0.1vw;
  left: -1.04vw;
  display: inline-block;
}
.index-top .nav_right > span:last-child::after {
  content: "▼";
  color: #ffffff;
  font-size: 0.729vw;
  position: absolute;
  right: -1.04vw;
}
</style>
