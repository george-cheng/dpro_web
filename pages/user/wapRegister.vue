<template>
	<div id="cantainer" @click="show_country=false;show_area=false">
		<div class="logo">
			<img src="~assets/image/logo.png" alt="logo" />
		</div>
		<div class="registerContent">
			<div class="register_method" style="display: none;">
				
			</div>
			<form @submit="form_submit">
				<div class="country_box">
					<p>国家</p>
					<!-- <input type="email" name="name" v-model="name" @blur="c_email" /> -->
					<div @click.stop="select_country" class="mg-b-10">
						<input type="text" name="country" v-model="country.name_cn" disabled placeholder="请选择您所在的国家"/>
					</div>
					<div class="mg-b-10">* 国家或地区注册后不可更改</div>
					<div class="country_list" v-if="show_country">
						<div>
							<div class="search_box flex-between-center mg-b-10">
								<input type="text" placeholder="搜索国家名称" @click.stop="" @input="search_country"></input>
							</div>
							<div class="aaa_box" style="margin-top:50px" v-if="country_search.length==0">
								<div class="mg-b-10">
									<div class="mg-b-10">常用国家</div>
									<div v-for="(item,index) in country_list.oftenUseList" :key="index">
										<div class="flex-start-center mg-b-10" @click.stop="select_it(item)">
											<div class="little_bg">+{{item.area_code}}</div>
											<div>{{item.name_cn}}</div>
										</div>
									</div>
								</div>
								<div class="mg-b-10">
									<div class="mg-b-10">全部国家</div>
									<div v-for="(item,index) in country_list.allList" :key="index">
										<div class="flex-start-center mg-b-10" @click.stop="select_it(item)">
											<div class="little_bg">+{{item.area_code}}</div>
											<div>{{item.name_cn}}</div>
										</div>
									</div>
								</div>
							</div>
							<div class="aaa_box" style="margin-top:50px" v-else>
								<div class="mg-b-10">
									<div v-for="(item,index) in country_search" :key="index">
										<div class="flex-start-center mg-b-10" @click.stop="select_it(item)">
											<div class="little_bg">+{{item.area_code}}</div>
											<div>{{item.name_cn}}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="relative">
					<p>邮箱/手机号</p>
					<!-- <input type="email" name="name" v-model="name" @blur="c_email" /> -->
					<div class="flex-start-center relative mg-b-20">
						<div class="country_code" @click.stop="select_area">+{{area.area_code}}</div>
						<input type="text" name="name" style="padding-left:15%;" v-model="name"  @blur="c_email"/>
					</div>
					<div class="country_list" v-if="show_area">
						<div>
							<div class="search_box flex-between-center mg-b-10">
								<input type="text" placeholder="搜索国家名称" @click.stop="" @input="search_country"></input>
							</div>
							<div class="aaa_box" style="margin-top:50px" v-if="country_search.length==0">
								<div class="mg-b-10">
									<div class="mg-b-10">常用国家</div>
									<div v-for="(item,index) in country_list.oftenUseList" :key="index">
										<div class="flex-start-center mg-b-10" @click.stop="select_it2(item)">
											<div class="little_bg">+{{item.area_code}}</div>
											<div>{{item.name_cn}}</div>
										</div>
									</div>
								</div>
								<div class="mg-b-10">
									<div class="mg-b-10">全部国家</div>
									<div v-for="(item,index) in country_list.allList" :key="index">
										<div class="flex-start-center mg-b-10" @click.stop="select_it2(item)">
											<div class="little_bg">+{{item.area_code}}</div>
											<div>{{item.name_cn}}</div>
										</div>
									</div>
								</div>
							</div>
							<div class="aaa_box" style="margin-top:50px" v-else>
								<div class="mg-b-10">
									<div v-for="(item,index) in country_search" :key="index">
										<div class="flex-start-center mg-b-10" @click.stop="select_it2(item)">
											<div class="little_bg">+{{item.area_code}}</div>
											<div>{{item.name_cn}}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<p>密码</p>
					<input type="password" name="pwd" v-model="pwd" @blur="c_pwd" />
				</div>
				<div>
					<p>确认密码</p>
					<input type="password" name="userpwd" v-model="pwd1" @blur="checkpwd" />
				</div>
				<!-- <div>
					<p>图形验证码</p>
					<div class="flex1">
						<input type="text" name="cap" v-model="code" />
						<span ref="txyzm">
							<img class="codeImg" :src="codeImg" @click.stop="getcode" alt />
						</span>
					</div>
				</div> -->
				<div>
					<p>验证码</p>
					<div class="flex1">
						<input type="text" name="code" v-model="yzm" />
						<input class="getcode" v-show="show" type="button" value="点击获取" @click.stop="sendRegCode" />
						<span class="regSendCodeTime" v-show="!show">{{count}}s</span>
					</div>
				</div>
				<div>
					<p>邀请码（可选）</p>
					<input type="text" v-model="inviteCode" onkeyup="this.value=this.value.replace(/\D/g,'')" />

				</div>
				<div class="flex2">
					<input type="checkbox" ref="agressments" />
					<span class="ml10">我已阅读并同意</span>
					<span class="agreement">《用户政策及隐私协议》</span>
				</div>

				<input id="reg" type="submit" value="注册" />
				<div class="downloads">
					<p>已有账号 <span @click.stop="download(downloadUrl)">去下载</span></p>
				</div>

			</form>
		</div>
	</div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { Message } from "element-ui";
import { getUrlKey } from "@/static/getUrlKey.js";
export default {
  components: {},

  data() {
    return {
      registerType: "email",
      name: "",
      pwd: "",
      pwd1: "",
      code: "",
      yzm: "",
      cap: "",
      codeImg: "",
      inviteCode: "",
      act: 1,
      show: true,
      showPhone: true,
      count: "",
      timer: null,
      emailorphone: this.$route.params.emailorphone,
      downloadUrl:
        "https://down.dproltd.show/download/dpro/dpro.html",
      country_list: {}, //国家列表
      country: {
        area_code: "86",
        country_id: 37,
        name_cn: "中国",
        name_en: "China",
        often_use: 1,
        often_use_sort: 1,
        state: 1,
      },
      area: {
        area_code: "86",
        country_id: 37,
        name_cn: "中国",
        name_en: "China",
        often_use: 1,
        often_use_sort: 1,
        state: 1,
      },
      country_search: [],
      show_country: false,
      show_area: false,
    };
  },
  mounted() {
    // this.getcode();
    this.inviteCode = getUrlKey("introId");
    this.getCountry();
  },
  created() {},
  methods: {
    search_country(e) {
      this.country_search = [];
      var val = e.data;
      for (const jj of this.country_list.allList) {
        if (jj.name_cn.indexOf(val) > -1) {
          this.country_search.push(jj);
        }
      }
    },
    select_it(e) {
      this.country = e;
      this.show_country = false;
    },
    select_it2(e) {
      this.area = e;
      this.show_area = false;
    },
    select_country() {
      this.country_search = [];
      this.show_country = true;
    },
    select_area() {
      this.country_search = [];
      this.show_area = true;
    },
    download(url) {
      window.location.href = url;
    },
    c_email() {
      /* var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
				if (!re.test(this.name)) {
					Message({
						showClose: true,
						message: "邮箱不正确"
					});
					return;
				} */
      if (this.name == "") {
        Message({
          showClose: true,
          message: "邮箱或者手机号不正确",
        });
      }
    },
    //获取首页注册信息
    getregInfo() {
      var _this = this;
      var info = this.$route.params.emailorphone;
      if (info) {
        if (info.indexOf("@") != -1) {
          this.name = this.$route.params.emailorphone;
        } else {
          this.registerType = "phone";
          this.act = 2;
          this.name = this.$route.params.emailorphone;
        }
      }
    },
    c_pwd() {
      var c_pwd = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/;
      if (!c_pwd.test(this.pwd)) {
        Message({
          showClose: true,
          message: "密码8~20位，且为字母、数字、符号等任意2种以上组合。",
        });
        this.pwd = "";
        return;
      }
    },
    checked_phone(name) {
      if (name.length < 11) {
        Message({
          showClose: true,
          message: "手机格式错误",
        });
      }
    },

    // async getcode() {
    //   const code = await this.$axios.$get("/api/v1/servlet/ImageCode", {
    //     responseType: "arraybuffer",
    //   });
    //   let codeImg =
    //     "data:image/png;base64," +
    //     btoa(
    //       new Uint8Array(code).reduce(
    //         (data, byte) => data + String.fromCharCode(byte),
    //         ""
    //       )
    //     );
    //   this.codeImg = codeImg;
    // },
    getCountry() {
      var that = this;
      this.$axios.setHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      this.$axios
        .get("/api/v1/config/countryCode", {})
        .then(function (response) {
          if (response.data.code == 200) {
            that.country_list = response.data.data;
          } else {
            Message({
              showClose: true,
              message: "获取国家失败",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    checkpwd() {
      if (this.pwd !== this.pwd1) {
        Message({
          showClose: true,
          message: "请输入相同的密码",
        });
      }
    },
    sendRegCode() {
      var _this = this;
      const TIME_COUNT = 60;
      var db = {
        name: this.name,
        code: this.code,
        areaCode: this.area.area_code,
      };
      // if (this.code == "") {
      //   Message({
      //     showClose: true,
      //     message: "请输入验证码",
      //   });
      //   return;
      // }
      this.$axios.setHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      this.$axios
        .post("/api/v1/sendRegCode", qs.stringify(db))
        .then(function (response) {
          if (response.data.code == 200) {
            Message({
              showClose: true,
              message: "发送成功，请注意查收",
            });
            if (!_this.timer) {
              _this.count = TIME_COUNT;

              _this.show = false;

              _this.timer = setInterval(() => {
                if (_this.count > 0 && _this.count <= TIME_COUNT) {
                  _this.count--;
                } else {
                  _this.show = true;
                  clearInterval(_this.timer);
                  _this.timer = null;
                }
              }, 1000);
            }
          } else if (response.data.code == 2) {
            Message({
              showClose: true,
              message: "图形验证码或用户不存在",
            });
          } else if (response.data.code == 3) {
            Message({
              showClose: true,
              message: "图形验证码输入错误",
            });
          } else if (response.data.code == 4) {
            Message({
              showClose: true,
              message: "用户已存在",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    form_submit(e) {
      var _this = this;
      e.preventDefault();
      var db = {};
      if (this.inviteCode == "") {
        if (this.name.indexOf("@") > -1) {
          db = {
            name: this.name,
            pwd: this.pwd,
            code: this.yzm,
            countryId: this.country.country_id,
          };
        } else {
          db = {
            name: this.name,
            pwd: this.pwd,
            code: this.yzm,
            countryId: this.country.country_id,
            areaCode: this.area.area_code,
          };
        }
      } else {
        if (this.name.indexOf("@") > -1) {
          db = {
            name: this.name,
            pwd: this.pwd,
            code: this.yzm,
            inviteCode: this.inviteCode,
            countryId: this.country.country_id,
          };
        } else {
          db = {
            name: this.name,
            pwd: this.pwd,
            code: this.yzm,
            inviteCode: this.inviteCode,
            countryId: this.country.country_id,
            areaCode: this.area.area_code,
          };
        }
      }
      if (this.$refs.agressments.checked !== true) {
        Message({
          showClose: true,
          message: "请勾选协议",
          //duration: 0
        });
      } else if (this.pwd != this.pwd1) {
        Message({
          showClose: true,
          message: "请输入相同的密码",
        });
      } else {
        this.$axios.setHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );

        this.$axios
          .post("/api/v1/register", qs.stringify(db))
          .then(function (response) {
            if (response.data.code == 200) {
              _this.name = "";
              _this.pwd = "";
              _this.pwd1 = "";
              _this.code = "";
              _this.yzm = "";
              _this.inviteCode = "";
              //   setTimeout(function () {
              //     window.location.href =
              //       "https://dpro-main.oss-cn-hongkong.aliyuncs.com/download/dpro/dpro.html";
              //   }, 1500);
              Message({
                showClose: true,
                message: "注册成功",
              });

              /* setTimeout(function() {
									window.open('https://dpro-main.oss-cn-hongkong.aliyuncs.com/download/dpro/dpro.html');
								}, 1000); */
            } else if (response.data.code == 1) {
              Message({
                showClose: true,
                message: "用户名为空",
              });
            } else if (response.data.code == 2) {
              Message({
                showClose: true,
                message: "用户已存在",
              });
              //   setTimeout(function () {
              //     window.location.href =
              //       "https://dpro-main.oss-cn-hongkong.aliyuncs.com/download/dpro/dpro.html";
              //   }, 1500);
            } else if (response.data.code == 3) {
              Message({
                showClose: true,
                message: "密码为空",
              });
            } else if (response.data.code == 100) {
              Message({
                showClose: true,
                message: "验证码为空",
              });
            } else if (response.data.code == 101) {
              Message({
                showClose: true,
                message: "ip被冻结,请2小时后再试",
              });
            } else if (response.data.code == 102) {
              Message({
                showClose: true,
                message: "验证码错误",
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
<!--<style scoped>-->
<style>
.flex-start-center {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: start;
  justify-content: start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.flex-between-center {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.el-message {
  min-width: 260px;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px rgba(41, 32, 32, 1) inset;
  -webkit-text-fill-color: #fff;
}

* {
  margin: 0;
  padding: 0;
}

input {
  border: 0;
  outline: none;
}

#cantainer {
  position: relative;
  width: 100%;
  background: rgba(37, 29, 29, 1);
  min-height: 100vh;
}

.logo {
  padding-top: 12px;
  margin: auto;
}

.logo img {
  margin: auto;
  display: block;
}

.content {
  width: 520px;
  height: 500px;
  padding: 267px 0 0 184px;
}

.con_top {
  width: 346px;
  height: 40px;
  font-size: 30px;
  font-family: FZLTTHJW--GB1-0, FZLTTHJW--GB1;
  font-weight: normal;
  color: rgba(255, 255, 255, 1);
  line-height: 39px;
}

.con_center {
  height: 29px;
  display: block;
  font-size: 16px;
  margin-top: 25px;
  margin-bottom: 55px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
}

.con_center > span {
  margin-right: 62px;
}

.con_bottom {
  margin-top: 76px;
}

.register_icon {
  margin-right: 23px;
}

.registerContent {
  width: 84%;
  background: rgba(37, 29, 29, 1);
  border-radius: 5px;
  margin: auto;
}

.register_method > span:nth-of-type(1) {
  width: 87px;
  height: 21px;
  font-size: 21px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 20px;
}

.register_method {
  /* margin-left: 49px; */
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.login_act {
  color: rgba(189, 58, 59, 1) !important;
}

.register_method > span:focus {
  color: rgba(189, 58, 59, 1);
}

.register_method > span:nth-of-type(2) {
  width: 90px;
  height: 21px;
  margin-left: 42px;
  font-size: 21px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #fff;
  /* color: rgba(233, 225, 225, 1); */
  line-height: 20px;
}

.register_method > span:nth-of-type(3) {
  width: 74px;
  height: 20px;
  margin-left: 352px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(189, 58, 59, 1);
  line-height: 20px;
}

.register_method > span:nth-of-type(3)::after {
  content: "▼";
  color: #bd3a3b;
  font-size: 5px;
  right: 4px;
}

form {
  /* margin-left: 49px; */
  width: 100%;
}

form input {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(233, 225, 225, 1);
  padding: 0 10px;
}

form input:nth-of-type(1),
form input:nth-of-type(7) {
  width: 100%;
  height: 36px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 1px solid rgba(53, 49, 49, 1);
}

form input:nth-of-type(7) {
  margin-bottom: 33px;
}

form input:nth-of-type(2),
form input:nth-of-type(3) {
  width: 100%;
  height: 40px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 1px solid rgba(53, 49, 49, 1);
}

form input:nth-of-type(4) {
  width: 274px;
  height: 40px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 1px solid rgba(53, 49, 49, 1);
}

.codeImg {
  width: 126px;
  height: 36px;
  margin-left: 20px;
}

form input:nth-of-type(5) {
  width: 274px;
  height: 40px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 1px solid rgba(53, 49, 49, 1);
}

.regSendCodeTime {
  width: 126px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  border: 0;
  font-size: 18px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  margin-left: 15px;
}

form input.getcode {
  width: 126px;
  height: 36px;
  /* margin-top: 15px; */
  margin-left: 15px;
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  border: 0;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}

form input:nth-of-type(8) {
  width: 14px;
  height: 14px;
  border-radius: 2px;
  border: 1px solid rgba(151, 151, 151, 1);
  background: rgba(41, 32, 32, 1);
}

.agreement {
  color: #cc2a34;
}

form input:nth-of-type(9) {
  width: 100%;
  height: 40px;
  margin-top: 36px;
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  border: 0;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

form p {
  /* margin-top: 35px; */
  margin-top: 12px;
  margin-bottom: 6px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(233, 225, 225, 1);
  line-height: 20px;
}

form p:nth-of-type(2) > span {
  margin-left: 220px;
}

form p:nth-of-type(6) > span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(189, 58, 59, 1);
}

.flex1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex1 input:first-child {
  width: 50% !important;
}

.flex2 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 0;
}

.flex2 input:first-child {
  width: 16px;
  height: 16px;
}

#reg {
  background: rgba(189, 58, 59, 1);
  /* margin-bottom: 50px; */
  cursor: pointer;
}

.ml10 {
  margin-left: 10px;
}

.right_sidetoolbar {
  display: none;
}

.downloads {
  display: flex;
  justify-content: flex-end;
}

.downloads span {
  color: rgba(189, 58, 59, 1);
  font-weight: bold;
  padding-left: 10px;
}
.country_box {
  position: relative;
}
.country_list {
  position: absolute;
  bottom: 0;
  top: 62px;
  left: 0;
  right: 0;
  /* max-height: 50vh; */
}
.country_list > div {
  background: #000;
  padding: 10px;
  position: relative;
  color: #999;
  z-index: 2;
}
.aaa_box {
  max-height: 50vh;
  overflow: auto;
}
.search_box {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
}
.search_box > input {
  width: 100% !important;
  background: #111 !important;
  border: none !important;
}
.text-c {
  text-align: center;
}
.mg-b-10 {
  margin-bottom: 10px;
}
.little_bg {
  background: rgba(192, 192, 192, 0.2);
  padding: 0 10px;
  margin-right: 10px;
  border-radius: 3px;
}
.relative {
  position: relative;
}
.country_code {
  position: absolute;
  left: 10px;
  width: 15%;
}
</style>
