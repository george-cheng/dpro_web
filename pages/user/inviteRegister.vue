<template>
  <div id="cantainer">
    <InviteRegNav />
    <div class="content">
      <span class="content-title">扫码推荐</span>
      <div class="content_top">
        <img class="codeImg" src="/api/v1/findIntroCode" alt />
      </div>
      <div class="content_botton">
        <span class="invite-desc">邀请注册链接(长按复制)</span><br />
        <span class="invite-url" v-if="userInfo.data"
          >http://www.dproltd.show/test.html?introId={{
            userInfo.data.id
          }}</span
        >
      </div>
    </div>
      <Footer />
  </div>
</template>
<script>
import { mapState } from "vuex";
import InviteRegNav from "../../components/common/header.vue";
import Footer from "../../components/common/footer";
import { Message } from "element-ui";
import qs from "qs";

export default {
  components: {
    InviteRegNav,
    Footer,
  },
  data() {
    return {
      userInfoArr: [],
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {},
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#cantainer {
  width: 100%;
  position: relative;
  background: rgba(27, 21, 21, 1);
}
.content {
  text-align: center;
  min-height: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
  background: rgba(48, 40, 40, 1);
}
.content_top {
  margin: 20px 0;
}
.content-title {
  font-size: 18px;
  line-height: 36px;
  color: rgb(214, 214, 214);
}
.invite-desc {
  font-size: 14px;
  line-height: 28px;
  color: rgb(197, 197, 197);
}
.invite-url {
  font-size: 16px;
  line-height: 32px;
  color: rgb(214, 214, 214);
}
.codeImg {
  width: 150px;
  height: 150px;
}
</style>