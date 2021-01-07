<template>
  <div id="cantainer">
    <PersonalNav />
    <div class="title">
      <p>提币地址管理</p>
    </div>
    <div class="content">
      <div class="wrap">
        <span>
          <span style="color:#BD3A3B;width:auto;">*</span> 币种:
        </span>
        <span style="margin-left:170px;">
          <span style="color:#BD3A3B;width:auto;">*</span>提币地址:
        </span>
        <span>
          <span style="color:#BD3A3B;width:auto;">*</span>地址标签:
        </span>
        <div>
          <el-select v-model="value" placeholder="请选择" filterable :filter-method="dataFilter">
            <el-option
              v-for="item in balancesArr"
              :key="item.id"
              :label="item.name"
              :value="item.name"
              @click.native="setid(item.id)"
            />
          </el-select>
          <!-- <el-input class="search" placeholder="搜索币种" suffix-icon="el-icon-search" v-model="input1" ></el-input> -->
          <input
            style="padding-left: 14px;"
            type="text"
            class="address"
            v-model="address"
            placeholder="Address"
          />
          <input
            style="padding-left: 14px;"
            type="text"
            class="tag"
            v-model="tag"
            placeholder="地址标签"
          />
          <br />
          <span style="display:inline-block;width:100px;color:rgba(189,58,59,1);" v-show="value==''">请选择币种</span>
          <span
            style="display:inline-block;width:100px;margin-left:95px;color:rgba(189,58,59,1);margin-left:116px;"
           v-show="address==''" :style="{'margin-left':value!=''?'223px':'116px'}">请输入地址</span>
          <span
            style="display:inline-block;width:100px;margin-left:760px;color:rgba(189,58,59,1);" :style="{'margin-left':address!=''&&value==''?'984px':value!=''&&address!=''?'1088px':'760px'}" v-show="tag==''">请输入地址标签</span>
          <br />
          <span class="code">验证码:</span>
          <input class="code1" type="text" v-model="code" />
          <input v-show="show" class="sendcode" type="button" value="发送" @click="sendCode" />
          <span class="logSendCodeTime" v-show="!show">{{count}}s</span>
          <br />
          <button @click="addAddress" class="add">添加</button>
        </div>
      </div>
    </div>
    <div class="content2">
      <div class="wrap2">
        <p>提币地址管理</p>
        <div>
          <el-input
            class="search2"
            placeholder="搜索币种"
            suffix-icon="el-icon-search"
            v-model="input2"
            @input="change($event)"
          ></el-input>
          <span>标签</span>
          <span>提币地址</span>
          <span>操作</span>
        </div>
        <ul>
          <li v-for="(item,index) in addressesList" :key="index">
            <span>{{item.f_name}}</span>
            <span>{{item.flag}}</span>
            <span>{{item.address}}</span>
            <span class="del" @click="delAddresses(item.id)">删除</span>
          </li>
        </ul>
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
    Footer
  },
  data() {
    return {
      input1: "",
      address: "",
      tag: "",
      code: "",
      show: true,
      timer: null,
      count: "",
      balancesArr: "",
      balancesArr2: "",
      value: "",
      input2: "",
      addressesList: []
    };
  },
  mounted() {
    var _this = this;
    _this.balancesArrCope = _this.balancesArr;
    this.$axios.setHeader("Content-Type", "application/x-www-form-urlencoded");
    this.$axios
      .get("/api/v1/account/balances")
      .then(function(response) {
        _this.balancesArr = response.data.data.balanceList;
        _this.balancesArr2 = response.data.data.balanceList;
        _this.getParams();
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    delAddresses(s_id) {
      var _this = this;
      this.$axios
        .post("/api/v1/account/deleteAddress", qs.stringify({ id: s_id }))
        .then(function(response) {
          _this.addressesList = [];
          _this.getParams();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    async getParams() {
      var _this = this;
      for (var item_s in this.balancesArr) {
        await this.$axios
          .get(
            "/api/v1/account/getParamsByCoin?id=" + this.balancesArr[item_s].id
          )
          .then(function(response) {
            if (response.data.data.addresses == "") {
            } else {
              for (let i in response.data.data.addresses) {
                response.data.data.addresses[i].f_name =
                  _this.balancesArr[item_s].name;
                _this.addressesList.push(response.data.data.addresses[i]);
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    change() {
      this.$forceUpdate();
    },
    setid(id) {
      this.input1 = id;
    },
    dataFilter(val) {
      var _this = this;
      this.value = val;
      var balancesArrCope = [];
      if (val) {
        for (let item in this.balancesArr) {
          if (this.balancesArr[item].name.search(val) != -1) {
            balancesArrCope.push(this.balancesArr[item]);
          }
        }
        _this.balancesArr = balancesArrCope;
      } else {
        _this.balancesArr = _this.balancesArr2;
      }
    },
    async sendCode() {
      var TIME_COUNT = 60;
      var url = "/api/v1/account/sendCode?type=1";
      var { data } = await this.$axios.get(url);
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    addAddress() {
      var _this = this;
      var db = {
        address: this.address,
        flag: this.tag,
        id: this.input1,
        code: this.code
      };
      if (this.address == "") {
        Message({
          showClose: true,
          message: "请输提币入地址"
        });
      } else if (this.tag == "") {
        Message({
          showClose: true,
          message: "请输入地址标签"
        });
      } else {
        this.$axios.setHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        this.$axios
          .post("/api/v1/account/addAddress", qs.stringify(db))
          .then(function(response) {
            if (response.data.code == 200) {
              Message({
                showClose: true,
                message: "添加成功"
              });
              _this.addressesList = [];
              _this.getParams();
              _this.address = "";
              _this.tag = "";
              _this.code = "";
            } else if (response.data.code == 101) {
              Message({
                showClose: true,
                message: "ip被冻结，请2小时后再试"
              });
            } else if (response.data.code == 102) {
              Message({
                showClose: true,
                message: "验证码错误"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>
<style scoped>
.wrap2 > ul li span {
  flex: 1;
  text-align: center;
}
.wrap2 > ul li span:first-child {
  flex: 0.5;
}
.wrap2 .del {
  cursor: pointer;
}
.wrap2 span:nth-child(3) {
  flex: 2;
  text-align: left;
}
* {
  margin: 0;
  padding: 0;
}
#cantainer {
  position: relative;
  width: 1920px;
  height: 1025px;
  background: rgba(27, 21, 21, 1);
}
.title {
  width: 1302px;
  height: 66px;
  margin-top: 20px;
  margin-left: 309px;
  vertical-align: middle;
  line-height: 66px;
  background: rgba(40, 32, 32, 1);
}
.title p {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(219, 211, 211, 1);
  margin-left: 28px;
}
.content,
.content2 {
  width: 1302px;
  /* height: 240px; */
  margin-left: 309px;
  margin-bottom: 50px;
  vertical-align: middle;
  background: rgba(48, 40, 40, 1);
  padding-bottom: 20px;
}
.content .wrap {
  padding-top: 20px;
}
.content .wrap,
.wrap2 {
  margin-left: 33px;
}
.wrap input {
  margin-left: 20px;
  color: rgba(255, 255, 255, 1);
}
.wrap span {
  width: auto;
  height: 24px;
  display: inline-block;
  /* margin-top: 25px; */
  margin-bottom: 9px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(214, 206, 206, 1);
  line-height: 24px;
}
.wrap span:nth-of-type(2) {
  margin-left: 140px;
}
.wrap span:nth-of-type(3) {
  margin-left: 800px;
}
.search {
  width: 174px;
  height: 42px;
  border-radius: 5px;
  opacity: 0.44079999999999997;
  border: 1px solid rgba(189, 58, 59, 1);
}
.address {
  width: 842px;
  height: 44px;
  background: rgba(44, 37, 37, 1);
  border-radius: 5px;
  opacity: 0.44079999999999997;
  border: 1px solid rgba(189, 58, 59, 1);
}
.tag,
.code1 {
  width: 174px;
  height: 44px;
  background: rgba(44, 37, 37, 1);
  border-radius: 5px;
  opacity: 0.44079999999999997;
  border: 1px solid rgba(189, 58, 59, 1);
}
.logSendCodeTime {
  width: 131px !important;
  height: 43px !important;
  background: rgba(189, 58, 59, 1);
  text-align: center;
  margin-bottom: 0 !important;
  margin-left: 30px;
  border-radius: 5px;
  line-height: 2.24vw !important;
  font-size: 18px !important;
}
.sendcode {
  width: 131px;
  height: 43px;
  margin-left: 30px;
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  border: 0;
}
.code {
  margin-left: 220px;
}
.add {
  width: 131px;
  height: 43px;
  margin-left: 1090px;
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  border: 0;
}
.content2 .wrap2 p {
  font-size: 20px;
  width: 165px;
  height: 30px;
  padding: 20px 0;
  font-family: PingFangSC-Medium, PingFang SC;
  color: rgba(219, 211, 211, 1);
}
.wrap2 div {
  margin-right: 80px;
  margin-top: 30px;
  background: rgba(40, 32, 32, 1);
  border-radius: 4px;
}
.search2 {
  width: 154px;
  height: 44px;
  margin-bottom: 20px;
  margin-left: 14px;
}
.wrap2 div span:nth-of-type(1) {
  width: 55px;
  height: 24px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(124, 118, 118, 1);
  line-height: 24px;
}
.wrap2 div > span:nth-of-type(2) {
  width: 86px;
  height: 24px;
  margin-left: 111px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(124, 118, 118, 1);
  line-height: 24px;
}
.wrap2 div > span:nth-of-type(3) {
  width: 86px;
  height: 24px;
  margin-left: 578px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(124, 118, 118, 1);
  line-height: 24px;
}
.wrap2 div > span:nth-of-type(4) {
  width: 56px;
  height: 24px;
  margin-left: 40px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(124, 118, 118, 1);
  line-height: 24px;
}
.content > .wrap > div:nth-of-type(1) >>> .el-input__inner {
  background-color: rgba(44, 37, 37, 1);
  border: 0;
}
.content2 > .wrap2 >>> .el-input__inner {
  background-color: rgba(44, 37, 37, 1);
  border: 0;
}
.content2 > .wrap2 > ul > li {
  width: 1189px;
  height: 50px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(124, 120, 120, 1);
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #453d3d;
}
</style>