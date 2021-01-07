<template>
  <div id="cantainer">
    <PersonalNav />
    <div class="title">
      <p>微信绑定</p>
    </div>
    <div class="content">
      <div class="wrap">
        <span>微信账号姓名：</span
        ><input
          type="text"
          placeholder="请绑定本人持有微信账号"
          v-model="fuName"
        /><br />
        <span>上传微信收款码：</span><input type="file" ref="file" /><br />
        <span>微信账号：</span
        ><input
          type="text"
          placeholder="请输入您要绑定的微信账号"
          v-model="fweChat"
        /><br />
        <span>备注信息：</span
        ><input
          type="text"
          placeholder="请输入显示给对方的备注信息"
          v-model="fwxpayRemarks"
        /><br />
        <input type="button" value="确定绑定" @click="addAccount" />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import PersonalNav from "../components/common/header.vue";
import Footer from "../components/common/footer";
import qs from "qs";
import { Message } from "element-ui";
export default {
  components: {
    PersonalNav,
    Footer,
  },
  data() {
    return {
      fuName: "",
      fweChat: "",
      fwxpayRemarks: "",
    };
  },
  methods: {
    addAccount() {
      var _this = this;
      var files = this.$refs.file.files[0];
      var db = {
        fuName: this.fuName,
        fweChat: this.fweChat,
        fwxpayRemarks: this.fwxpayRemarks,
        fuId: this.tool.getCookie("uid"),
        wxpayReCode: this.$refs.file.files[0],
      };

      var formData = new FormData();
      formData.append("fuName", this.fuName);
      formData.append("fweChat", this.fweChat);
      formData.append("fwxpayRemarks", this.fwxpayRemarks);
      formData.append(
        "wxpayReCode",
        this.$refs.file.files[0],
        this.$refs.file.files[0].name
      );
      if (this.fweChat == "") {
        Message({
          showClose: true,
          message: "请输入微信账号",
        });
      } else if (files == null) {
        Message({
          showClose: true,
          message: "请上传收款码",
        });
      } else if (this.fwxpayRemarks == "") {
        Message({
          showClose: true,
          message: "请输入备注信息",
        });
      } else {
        this.$axios.setHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        this.$axios
          .post("/api/v1/updateFuserAccount", formData)
          .then(function (response) {
            if (response.data.code == 200) {
              Message({
                showClose: true,
                message: "绑定成功",
              });
              _this.$router.push({
                path: "/personal",
              });
            } else if (response.data.code == 500) {
              Message({
                showClose: true,
                message: "请绑定您的真实姓名",
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#cantainer {
  position: relative;
  width: 1920px;
  height: 1825px;
  background: rgba(27, 21, 21, 1);
}
.title {
  width: 1302px;
  height: 66px;
  margin-top: 20px;
  margin-left: 309px;
  vertical-align: middle;
  line-height: 66px;
  background: rgba(48, 40, 40, 1);
}
.title p {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(219, 211, 211, 1);
  margin-left: 28px;
}
.content {
  width: 1302px;
  height: 500px;
  margin-top: 20px;
  margin-left: 309px;
  margin-bottom: 50px;
  vertical-align: middle;
  background: rgba(40, 32, 32, 1);
}
.content .wrap {
  margin-left: 300px;
}
.content .wrap span {
  width: 165px;
  display: inline-block;
  margin-top: 50px;
  font-size: 20px;
  color: rgba(233, 225, 225, 1);
}
.wrap > input:nth-of-type(1),
.wrap > input:nth-of-type(3),
.wrap > input:nth-of-type(4) {
  width: 440px;
  height: 40px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 1px solid rgba(53, 49, 49, 1);
}
.wrap > input:nth-of-type(5) {
  width: 240px;
  height: 39px;
  margin-top: 25px;
  margin-bottom: 35px;
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  border: 0;
}
</style>