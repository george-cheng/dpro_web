<template>
  <div class="header">
    <el-menu
      :default-active="activeIndex"
      class="el_nav"
      mode="horizontal"
      background-color="#302828"
      text-color="#ccc3c3"
      active-text-color="#ffffff"
    >
      <el-menu-item index="1">
        <nuxt-link to="/">
          <img
            src="~assets/image/logo_other_page.png"
            alt="logo"
            style="margin-bottom: 10px"
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
            style="font-size: 0.88vw; color: #ccc3c3"
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

      <el-menu-item
        index="9"
        style="float: right; background-color: #302828"
        v-if="isLogin"
      >
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
              <nuxt-link
                to="/user/systemNotice"
                style="
                  position: relative;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
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
        <nuxt-link to="/register" class="register" exact>注册</nuxt-link>
      </el-menu-item>
      <el-menu-item index="11" style="float: right" v-if="!isLogin">
        <nuxt-link to="/login" class="login" exact>登录</nuxt-link>
      </el-menu-item>

      <el-menu-item index="12" style="float: right" v-if="isLogin">
        <nuxt-link to="/assets" exact>资产</nuxt-link>
      </el-menu-item>
      <el-menu-item index="13" style="float: right" v-if="isLogin">
        <nuxt-link to="/orders" exact>订单</nuxt-link>
      </el-menu-item>

      <el-menu-item index="14" style="float: right">
        <nuxt-link to="/notice" exact>公告</nuxt-link>
      </el-menu-item>
      <!-- <el-menu-item index="7" style="float:right;">
                <nuxt-link to="/">工具</nuxt-link>
      </el-menu-item>-->
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
        <nuxt-link to="#" exact>
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
</template>

<script>
import { mapState } from "vuex";
import qs from "qs";
import { Message } from "element-ui";

export default {
  data() {
    return {
      activeIndex: "1",
      isLanguage: true,
    };
  },
  computed: {
    ...mapState(["userInfo", "systemNoticeUnReads"]),
    isLogin: function () {
      if (this.userInfo.code == 200) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.$store.dispatch("setUserSystemNoticeUnReads");
  },
  methods: {
    handleLanguage(command) {
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
            _this.$router.push({
              path: "/",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.header >>> .el-menu.el-menu--horizontal {
  border: none;
  padding-left: 20px;
}
.header .el_nav li,
.header >>> .el-submenu__title {
  font-size: 14px;
}

.header nav {
  height: 3.12vw;
  display: flex;
  align-items: center;
  background: #302828;
}
.header nav ul {
  margin-left: 1.56vw;
  height: 100%;
  display: flex;
  align-items: center;
  width: 60%;
}
.header nav ul img {
  width: 10.2vw;
  height: 2.08vw;
}
.header nav ul li {
  float: left;
  height: 1.04vw;
  font-size: 0.88vw;
  font-weight: 400;
  color: rgba(204, 195, 195, 1);
  line-height: 1.04vw;
  margin: 0 0.83vw;
}
.header nav ul li:first-child {
  margin: 0;
  height: auto;
  margin-right: 1.66vw;
}
.nav_right {
  margin-left: auto;
  margin-right: 2.13vw;
  font-size: 0.83vw;
  font-weight: 400;
  color: rgba(204, 195, 195, 1);
}
.nav_right span {
  margin-right: 1.04vw;
}
.nav_right span:nth-child(3) {
  margin-right: 0.52vw;
}
.nav_right .login {
  background: rgba(189, 58, 59, 1);
  border-radius: 0.26vw;
  padding: 0.31vw 0.83vw;
}
.nav_right .register {
  border-radius: 0.26vw;
  border: 0.052vw solid rgba(204, 195, 195, 1);
  padding: 0.2vw 0.83vw;
}
.nav_right span:last-child {
  margin-right: 0;
  position: relative;
}
.nav_right > span:last-child::after {
  content: "▼";
  color: #ffffff;
  font-size: 0.729vw;
  position: absolute;
  right: -1.04vw;
}
.notice {
  position: absolute;
  right: 10px;
  background: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  right: 23px;
}
</style>
