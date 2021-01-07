<template>
  <div id="cantainer">
    <PersonalNav />


    <div class="nickDialog" v-if="isNickChange">


      <div class="nickIpt">
        <input type="text" v-model="nickIpt" placeholder="请输入昵称">
      </div>

      <div class="nickBtm">
        <div class="nickConfirm" @click="nickConfirmEvent">确定</div>
        <div class="nickCancel" @click="nickCancelEvent">取消</div>
      </div>
    </div>

    <div class="content_top">
      <p>用户中心</p>
      <div class="content_top_left">
        <img src="~assets/image/user1.png" alt="" />
        <!-- {{userInfo}} -->
        <div v-if="userInfo.code == 200">
          <div class="nick">
            <span>昵称：{{userInfo.data.nick}}</span>
            <img src="../assets/image/edit.svg" alt="" @click="nickEvent">
          </div>
          <span style="margin-left: 20px" v-if="userInfo.code == 200">{{userInfo.data.loginName}}</span>
          <span v-if="!userInfo.data.auth" style="color: rgba(189, 58, 59, 1)">未认证</span>
          <span v-if="userInfo.data.auth && !userInfo.data.authDeep"style="color: rgba(189, 58, 59, 1)">已初级实名认证</span>
          <span v-if="userInfo.data.auth && userInfo.data.authDeep" style="color: rgba(189, 58, 59, 1)">已高级实名认证</span>
        </div>
      </div>

      <div class="content_top_right">
        <div class="v_content_top_right">
          <div>
            <img src="~assets/image/v1.png" alt="" /><span
              style="color: rgba(219, 211, 211, 1); margin-left: 13px"
              >24H提现额度：5 BTC</span
            >
          </div>
          <div>
            <img src="~assets/image/v2.png" alt="" /><span
              style="color: rgba(219, 211, 211, 1); margin-left: 13px"
              >24H提现额度：50 BTC</span
            >
          </div>
          <div>
            <img src="~assets/image/v3.png" alt="" /><span style="color: rgba(219, 211, 211, 1); margin-left: 13px">更高提现额度</span>
          </div>
        </div>
        <div style="width: 605px">
          <span class="span2" style="float: right; margin-left: 39px"
            >联系我们提升额度</span
          >
          <span class="span1" style="float: right">进行实名认证</span>
        </div>
      </div>
    </div>
    <div class="content_center">
      <div class="wrap" v-if="userInfo.code == 200 && fuserArr.code == 200">
        <div>
          <img src="~assets/image/personal1.png" alt="" />
          <div>
            <span>登录密码</span>
            <p style="color: rgba(124, 120, 120, 1)">保障账号安全</p>
          </div>
          <nuxt-link to="/changePwd"><button>修改</button></nuxt-link>
        </div>

        <div>
          <img src="~assets/image/personal1.png" alt="" />
          <div>
            <span>交易密码</span>
            <p style="color: rgba(124, 120, 120, 1)">保障交易安全</p>
          </div>
          <nuxt-link to="/changeSafeWord"><button>修改</button></nuxt-link>
        </div>

        <div>
          <img src="~assets/image/personal3.png" alt="" />
          <div>
            <span>初级实名认证</span>
            <p v-if="!userInfo.data.auth" style="color: rgba(189, 58, 59, 1)">
              未认证
            </p>
            <p v-if="userInfo.data.auth" style="color: rgba(189, 58, 59, 1)">
              已认证
            </p>
          </div>
          <nuxt-link to="/auth"
            ><button v-if="!userInfo.data.auth">认证</button></nuxt-link
          >
          <nuxt-link to="/auth1"
            ><button v-if="userInfo.data.auth">查看</button></nuxt-link
          >
        </div>
        <div>
          <img src="~assets/image/personal3.png" alt="" />
          <div>
            <span>高级实名认证</span>
            <p
              v-if="!userInfo.data.authDeep && !userInfo.data.authDeepPost"
              style="color: rgba(189, 58, 59, 1)"
            >
              未认证
            </p>
            <p
              v-if="userInfo.data.authDeep"
              style="color: rgba(189, 58, 59, 1)"
            >
              已认证
            </p>
            <p
              v-if="userInfo.data.authDeepPost"
              style="color: rgba(189, 58, 59, 1)"
            >
              审核中
            </p>
          </div>
          <nuxt-link to="/uploadauth"
            ><button
              v-if="!userInfo.data.authDeep && !userInfo.data.authDeepPost"
            >
              认证
            </button></nuxt-link
          >
          <nuxt-link to="/uploadauth1"
            ><button v-if="userInfo.data.authDeep">查看</button></nuxt-link
          >
          <nuxt-link to="/uploadauth2"
            ><button v-if="userInfo.data.authDeepPost">查看</button></nuxt-link
          >
        </div>
        <div>
          <img src="~assets/image/personal6.png" alt="" />
          <div>
            <span>提币地址管理</span>
            <p style="color: rgba(124, 120, 120, 1)">方便提币</p>
          </div>
          <nuxt-link to="/address"> <button>添加</button></nuxt-link>
        </div>
        <div>
          <img src="~assets/image/personal4.png" alt="" />
          <div>
            <span>支付宝绑定</span>
            <p style="color: rgba(124, 120, 120, 1)">货币交易时使用</p>
          </div>
          <nuxt-link v-if="fuserArr.data == null" :to="'/alipay'">
            <button>添加</button>
          </nuxt-link>
          <nuxt-link
            v-if="fuserArr.data != null"
            :to="fuserArr.data.falipay == null ? '/alipay' : 'unalipay'"
          >
            <button v-if="fuserArr.data.falipay == null">添加</button>
            <button v-if="fuserArr.data.falipay != null">解绑</button>
          </nuxt-link>
        </div>
        <div>
          <img src="~assets/image/personal5.png" alt="" />
          <div>
            <span>微信绑定</span>
            <p style="color: rgba(124, 120, 120, 1)">货币交易时使用</p>
          </div>
          <nuxt-link v-if="fuserArr.data == null" :to="'/weChat'">
            <button>添加</button>
          </nuxt-link>
          <nuxt-link
            v-if="fuserArr.data != null"
            :to="fuserArr.data.fweChat == null ? '/weChat' : 'unweChat'"
          >
            <button v-if="fuserArr.data.fweChat == null">添加</button>
            <button v-if="fuserArr.data.fweChat !== null">解绑</button>
          </nuxt-link>
        </div>
        <div>
          <img src="~assets/image/personal6.png" alt="" />
          <div>
            <span>申请法币商家</span>
            <p style="color: rgba(124, 120, 120, 1)">购买出售USDT</p>
          </div>
          <nuxt-link v-if="userInfoArr.otcType == 0" :to="{path: '/authenOtcBusiness', query: { otcType: userInfoArr.otcType }}">
            <button>认证</button>
          </nuxt-link>
          <nuxt-link v-if="userInfoArr.otcType != 0" :to="{path: '/authenOtcBusiness', query: { otcType: userInfoArr.otcType }}">
            <button>撤销</button>
          </nuxt-link>
        </div>
        <div>
          <img src="~assets/image/personal2.png" alt="" />
          <div>
            <span>谷歌验证</span>
            <p
              v-if="!userInfoArr.googleBind"
              style="color: rgba(189, 58, 59, 1)"
            >
              未开启
            </p>
            <p
              v-if="userInfoArr.googleBind"
              style="color: rgba(189, 58, 59, 1)"
            >
              已开启
            </p>
          </div>
          <!-- <nuxt-link to="/google" ><button> 开启  </button></nuxt-link> -->
          <nuxt-link to="/google"
            ><button v-if="!userInfoArr.googleBind">开启</button></nuxt-link
          >
          <nuxt-link to="/ungoogle"
            ><button v-if="userInfoArr.googleBind">解绑</button></nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="content_bottom">
      <div class="wrap">
        <div>
          <p>最近登录信息</p>
        </div>
        <div>
          <span style="margin-left: 20px">最近登录时间</span>
          <span>登录IP</span>
          <span style="margin-right: 20px">登录所在地</span>
        </div>
        <ul>
          <li v-for="(item, index) in Arr" :key="index">
            <span>{{ timestampToTime(item.fcreateTime) }} </span>

            <span>{{ item.fkey3 }} </span>
            <span>{{ item.fkey4 }} </span>
          </li>
        </ul>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import { mapState } from "vuex";
import PersonalNav from "../components/common/header.vue";
import Footer from "../components/common/footer";
import { Message } from "element-ui";
import qs from "qs";

export default {
  components: {
    PersonalNav,
    Footer,
  },
  data() {
    return {
      Arr: [],
      userInfoArr: [], //用户安全信息，含谷歌验证的状态
      fuserArr: [], //收款信息,
      isNickChange: false,
      nickIpt: ''
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  async mounted() {
    var _this = this;
    await this.$axios
      .get("/api/v1/account/getLoginIp")
      .then(function (response) {
        if (response.data.code == 200) {
          _this.Arr = response.data.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    await this.$axios
      .get("/api/v1/frontSession")
      .then(function (response) {
        if (response.data.code == 200) {
          _this.userInfoArr = response.data.data;
          console.log(_this.userInfoArr);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    this.getfuser();
  },
  methods: {
    nickEvent(){
      this.isNickChange = !this.isNickChange
    },
    nickConfirmEvent(){
      let params = {nickName: this.nickIpt}
      this.$axios.post('/api/v1/account/modNickName',qs.stringify(params)).then((res)=>{
        if(res.data.code === 200){
          Message({
            message: '修改成功'
          })
          this.isNickChange = false
          location.reload()
        }else{
          Message({
            message: res.data.msg
          })
        }
      })
    },
    nickCancelEvent(){
      this.isNickChange = false
    },
    authenOtcBusiness(item) {
      console.log(item);
    },
    //获取用户收款信息
    getfuser() {
      var _this = this;
      var db = {
        fuId: this.userInfo.data.id,
      };
      this.$axios
        .post("/api/v1/findFuserAccountByfuId", qs.stringify(db))
        .then(function (response) {
          _this.fuserArr = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //时间戳转换
    timestampToTime: function (time = +new Date()) {
      var date = new Date(time + 8 * 3600 * 1000);
      return date.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, ".");
    },
  },
  created() {
  }
};
</script>
<style scoped lang="less">

.nickDialog {
  position: fixed;
  border: 1px solid #555555;
  background-color: #1b1515;
  width: 600px;
  height: 200px;
  left: 0;
  top: 0;
  right:0;
  bottom:0;
  margin:auto;
  .nickIpt{
    display: flex;
    justify-content: center;
    margin: 40px auto 0;
    width: 300px;
    height: 30px;
    border: 1px solid #555555;
    input{
      width: 100%;
      text-indent: 0.2em;
    }
  }
  .nickBtm{
    position: absolute;
    bottom: 30px;
    display: flex;
    justify-content: center;
    right: 0;
    left: 0;
    div{
      margin: 0 20px;
      border: 1px solid #555555;
      padding: 5px 20px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}

.nick{
  width: 100px;
  height: 20px;
  margin-left: 20px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  img{
    width: 18px;
    height: 18px;
    font-size: 20px;
    cursor: pointer;
  }
}

.v_content_top_right {
  display: flex;
  width: 660px;
}
.v_content_top_right > div {
  flex: 1;
}
* {
  margin: 0;
  padding: 0;
}
#cantainer {
  position: relative;
  width: 1920px;
  height: 1558px;
  background: rgba(27, 21, 21, 1);
}
.content_top {
  height: 196px;
  margin-top: 20px;
  background: rgba(48, 40, 40, 1);
}
.content_top > p:nth-of-type(1) {
  height: 58px;
  line-height: 58px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  padding-left: 338px;
  color: rgba(219, 211, 211, 1);
  border-bottom: 2px solid #453d3d;
}
.content_top_left {
  width: 300px;
  height: 136px;
  display: flex;
  align-items: center;
  float: left;
  margin-left: 338px;
}
.content_top_left > p {
  height: 24px;
  display: inline-block;
  margin-left: 20px;
  vertical-align: middle;
  margin-bottom: 150px;
}
.content_top_left > img {
  width: 50px;
  height: 50px;
}
.content_top_right {
  width: 800px;
  float: left;
  margin-left: 300px;
  text-align: center;
  margin-top: 35px;
  vertical-align: middle;
}
.content_top_right .span1 {
  width: 130px;
  height: 35px;
  display: inline-block;
  border-radius: 16px;
  margin-top: 10px;
  border: 1px solid rgba(189, 58, 59, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(189, 58, 59, 1);
  line-height: 32px;
}
.content_top_right .span2 {
  width: 134px;
  height: 35px;
  margin-top: 10px;
  display: inline-block;
  border-radius: 16px;
  border: 1px solid rgba(189, 58, 59, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(189, 58, 59, 1);
  line-height: 32px;
}

.content_center {
  width: 1920px;
  /* height: 514px; */
  margin-top: 8px;
  background: rgba(48, 40, 40, 1);
}
.content_center .wrap {
  width: 1242px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  margin: 0 auto;
  padding: 26px 0 11px 0;
}
.content_center .wrap > div {
  width: 404px;
  height: 144px;
  border-radius: 10px;
  border: 1px solid rgba(79, 71, 71, 1);
  margin-bottom: 15px;
}

.content_center .wrap > div {
  display: flex;
  justify-content: baseline;
  align-items: center;
  width: 390px;
  height: 140px;
  margin-bottom: 9px;
  padding: 0px 30px;
  border-radius: 10px;
}
.content_center .wrap div span {
  font-size: 18px;
}
.content_center .wrap > div > div {
  width: 150px;
  color: rgba(219, 211, 211, 1);
  margin-left: 28px;
}

.content_center .wrap div:nth-of-type(2),
.content_center .wrap div:nth-of-type(5),
.content_center .wrap div:nth-of-type(8) {
  margin-left: 15px;
  margin-right: 15px;
}
.content_center .wrap div button {
  width: 84px;
  height: 32px;
  background: rgba(189, 58, 59, 1);
  border-radius: 16px;
  border: 0;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.content_bottom {
  width: 1920px;
  height: 514px;
  margin-top: 8px;
  margin-bottom: 9px;
  background: rgba(48, 40, 40, 1);
}
.content_bottom .wrap {
  width: 1242px;
  height: 514px;
  margin-left: 340px;
}
.content_bottom .wrap > div:nth-of-type(1) > p {
  width: 150px;
  height: 85px;
  line-height: 85px;
  font-size: 20px;
  padding-top: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(219, 211, 211, 1);
  line-height: 24px;
}
.content_bottom .wrap > div:nth-of-type(2) {
  width: 1242px;
  height: 54px;
  display: flex;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(124, 120, 120, 1);
  justify-content: space-between;
  align-items: center;
  background: rgba(40, 32, 32, 1);
  opacity: 0.39;
}

.content_bottom ul li {
  width: 1242px;
  height: 50px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(124, 120, 120, 1);
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #453d3d;
}
.content_bottom ul li span:nth-child(2),
.content_bottom ul li span:nth-child(3) {
  /* flex: 1;
  text-align: center; */
  margin-right: 30px;
}
</style>
