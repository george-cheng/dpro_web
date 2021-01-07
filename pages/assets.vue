<template>
  <div id="cantainer">
    <PersonalNav />
    <div class="convertUsdt_box" v-if="showConvert">
      <p class="convertUsdt_box_title">账户间互转</p>
      <div class="convertUsdt_box_content">
        <div class="item1">
          <p>通证种类</p>
          <p>USDT</p>
        </div>
        <div class="item_box">
          <div class="item2" v-if="this.type==0">
            <p>
              <span>从</span>
              <span>余额 {{USDT_total == 0? '0.0000':USDT_total}} USDT</span>
            </p>
            <p>币币账户</p>
          </div>

          <div class="item2" v-if="this.type==1">
            <p>
              <span>从</span>
              <span>余额 {{fbalance == 0?'0.0000':this.formatDecimal(fbalance,4)}} USDT</span>
            </p>
            <p>法币账户</p>
          </div>
          <div class="c_item" @click="transform">
            <img src="~assets/image/zhuanhuan.png" alt />
          </div>
          <div class="item3" v-if="this.type==0">
            <p>
              <span>到</span>
              <span>余额 {{fbalance == 0?'0.0000':this.formatDecimal(fbalance,4)}} USDT</span>
            </p>
            <p>法币账户</p>
          </div>
          <div class="item3" v-if="this.type==1">
            <p>
              <span>到</span>
              <span>余额 {{USDT_total == 0? '0.0000':USDT_total}} USDT</span>
            </p>
            <p>币币账户</p>
          </div>
        </div>
        <div class="item4">
          <p>
            <span style="color:#BD3A3B;">*</span> 数量
          </p>
          <div>
            <input type="text" style="color:#999" v-model="fconvertSum" />
            <span @click="totalCovert" style="color:#BD3A3B;flex:1;font-size:14px;font-weight:500;">全部划转</span>
          </div>
        </div>
        <div class="btn_box">
          <button class="cle" @click="unShowConvert">取消</button>
          <button class="s_btn" @click="convert">立即划转</button>
        </div>
      </div>
    </div>
    <div class="content_top">
      <div class="wrap" style="padding:0 350px">
        <div class="top_l" style="float:left;width:60%;">
          <h1>资产概览</h1>
          <div style="margin:9px 0;">
            <span>总资产折合</span>
            <img src="~assets/image/eye.png" alt style="margin-left:10px;" @click="show_eye=!show_eye" />
          </div>
          <!-- <div>0.00000000 BTC =0.00CNY</div> -->
          <div v-if="balances.data&&show_eye">{{total_money}} USDT ≈ {{numFixed_cny(total_money*parseFloat(rate.usdt))}}
            CNY</div>
          <div v-if="balances.data&&!show_eye">****** ≈ ******</div>
          <div v-if="!balances.data">0 USDT ≈ 0 CNY</div>
        </div>
        <div class="top_r" style="float:left;width:40%;">
          <div>
            <span>USDT可用资产(币币)</span>
            <span style="margin-left:50px">USDT资产(法币)</span>
          </div>
          <div>
            <span style="padding-right:40px">{{USDT_total == 0? '0.0000':USDT_total}} USDT</span>
            <span>{{fbalance == 0?'0.0000':this.formatDecimal(fbalance,4)}} USDT</span>
          </div>
          <div>
            <span @click="handle_convert">资产划转</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content_main">
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="资产" name="first">
            <div class="assets_center">
              <div class="top">
                <div>
                  <span>币币账户</span>
                  <span>合约账户</span>
                  <span>挖矿账户</span>
                </div>
                <div>
                  <div>
                    <span>主币区</span>
                    <span>创新区(限时)</span>
                    <span>下架区</span>
                  </div>
                  <div>
                    <el-switch v-model="value" active-color="#13ce66" inactive-color="#808080"></el-switch>
                  </div>
                  <div class="demo-input-suffix ">
<!--                    <el-input placeholder="" autoComplete="off" type="text" suffix-icon="el-icon-search" id="search_bi" v-model="input1"/>-->
                  </div>
                </div>
              </div>
              <div class="center">
                <span>币种</span>
                <span style="margin-left: 73px;">名称</span>
                <span style="margin-left: 42px;">可用余额</span>
                <span style="margin-left: 69px;">冻结金额</span>
                <span style="margin-left: 90px;width:100px">USDT估值</span>
                <span style="margin-left: 104px;width:98px">操作</span>
              </div>
              <ul>
                <li v-for="item in arr_copy" :key="item.id">
                  <span style="padding-right:36px;">{{item.name}}</span>
                  <span style="margin-left:97px">{{item.allName}}</span>
                  <span style="margin-left:98px">{{item.total}}</span>
                  <span style="margin-left:120px">{{item.frozen}}</span>
                  <span style="margin-left:140px" v-if="item.name=='USDT'">{{Number(item.total)+Number(item.frozen)}}</span>
                  <span style="margin-left:140px" v-else-if="data_box['USDT'][item.name] != undefined">{{tool.accMul((Number(item.total)+Number(item.frozen)),(data_box['USDT'][item.name].lastDealPrize))}}</span>
                  <span style="margin-left:140px" v-else>0</span>
                  <input type="button" value="充值" @click="recharge(item)" style="margin-left: 45px;" />
                  <input type="button" value="提现" @click="withdrawal(item)" />
                  <input type="button" value="去交易" @click="setGroup(item)" />
                  <input type="button" v-if="item.name === 'DPC'" value="去兑换" @click="setTran(item)" />
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="充值" name="second">
            <div class="recharge_left">
              <div class="recharge_left_top">
                <el-dropdown @command="handleCommand" trigger="click" style="width:200px;">
                  <span class="el-dropdown-link" style="cursor: pointer;">
                    <img :src="'https://dpro-main.oss-cn-hongkong.aliyuncs.com'+s_item.url" alt v-if="s_item.url" />
                    {{s_item.name == null ? '请选择充值币种' : s_item.name}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="value.name" v-for="(value,index) in arr" :key="index">{{value.name}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="recharge_left_center">
                <div>
                  <p>可用余额</p>
                  <span>{{s_item.total==null?'0':s_item.total - s_item.frozen}} {{s_item.name}}</span>
                  <!-- {{s_item.name == null ? '请选择充值币种' : s_item.name}}
                  {{s_item.total - s_item.frozen}}-->
                </div>
                <div>
                  <div>
                    <p>总额</p>
                    <span>{{s_item.total==null?'0':s_item.total}} {{s_item.name}}</span>
                  </div>
                  <div>
                    <p>冻结金额</p>
                    <span>{{s_item.frozen==null?'0':s_item.frozen}} {{s_item.name}}</span>
                  </div>
                </div>
                <div>
                  <p>注意：请在确认币种和地址后进行充值，充入其他地址无法找回！</p>
                </div>
                <div>
                  <button @click="address(s_item.id)">获取充币地址</button>
                  <div class="flex_center address-box" style="margin:10px 0">
                    <div id="qrcode"></div>
                    <div style="margin-left:20px;width:100%" v-if="addressData.code == 200 ">
                      <div class="tit">充值地址</div>
                      <div class="dis-flex address">
                        <span style="word-break: break-all;min-width: 7%;text-align: center;">{{addressData.data.address}}</span>
                        <div style="color:rgba(189,58,59,1);cusor:point;" @click.stop="copy()">复制</div>
                      </div>
                    </div>
                  </div>

                </div>
                <div>
                  <p>禁止向地址充值当前币种之外的资产，任何充入当前币种地址的非当前币种资产将不可找回使用地址充值需要12个网络确认才能到账。</p>
                </div>
              </div>
              <div class="recharge_left_bottom">
                <span>
                  <nuxt-link to="/exchange">去交易</nuxt-link>
                </span>
                <span>OTC交易</span>
              </div>
            </div>
            <div class="recharge_right">
              <span>近期充值记录</span>
              <!-- <span>全部记录</span> -->
              <div>
                <span style="margin-left:40px">币种</span>
                <span style="margin-left:-36px">状态</span>
                <span style="margin-left:10px">时间</span>
                <span style="padding-left: 23px;">数量</span>
              </div>
              <ul>
                <li v-for="(item,index) in coinInArr" :key="index">
                  <span>{{item.name}}</span>
                  <span style="margin-left:8px">成功</span>
                  <span>{{timestampToTime(item.time)}}</span>
                  <span style="margin-right:28px">{{item.amount}}</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="提现" name="third">
            <div class="withdrawal_left">
              <div class="withdrawal_left_top">
                <el-dropdown @command="handleCommand" trigger="click" style="width:200px;">
                  <span class="el-dropdown-link" style="cursor: pointer;">
                    <img :src="'https://dpro-main.oss-cn-hongkong.aliyuncs.com'+s_item.url" alt v-if="s_item.url" />
                    {{s_item.name == null ? '请选择充值币种' : s_item.name}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="value.name" v-for="(value,index) in arr" :key="index">{{value.name}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="withdrawal_left_center">
                <div>
                  <div>
                    <p>可用余额</p>
                    <span>{{s_item.total==null?'0':s_item.total}} {{s_item.name}}</span>
                  </div>
                  <div>
                    <p>总额</p>
                    <span>{{s_item.total==null?'0':formatDecimal(parseInt(s_item.total)+parseInt(s_item.frozen),4)}}{{s_item.name}}</span>
                  </div>
                  <div>
                    <p>冻结金额</p>
                    <span>{{s_item.frozen==null?'0':s_item.frozen}} {{s_item.name}}</span>
                  </div>
                </div>
                <!-- <input type="text" placeholder="提现地址" v-for="(key,index) in getAddress" :key="index" :value="key.address"><br> -->
                <div class="dis-flex">
                  <select name id v-model="coinaddress">
                    <option v-for="(key,index) in getAddress" :key="index">{{key.address}}</option>
                  </select>
                  <nuxt-link to="/address"> <button class="add_btn"> 添加 </button></nuxt-link>
                </div>

                <input type="number" placeholder="提现数量" v-model="amount" style="width:336px" />
                <span style="width:120px;margin-left:30px">手续费：{{minWithdrawAmount.withdrawFees}}</span>
                <span style="width:120px">固定费：{{minWithdrawAmount.withdraw}}USDT</span>
                <br />
                <input type="password" placeholder="交易密码" v-model="safeWord" />
                <br />
                <input type="text" placeholder="验证码" v-model="code" />

                <button class="sentcode">
                  <span v-show="show" @click="sendCode">发送</span>
                  <span v-show="!show">{{count}}s</span>
                </button>
                <br />
                <input v-if="userInfoArr.googleBind" type="text" placeholder="谷歌验证码" v-model="googleCode" />
                <br />
                <button @click="withdrawCoin(s_item.id)" class="submit">提交</button>
                <br />
                <div style="margin-top:20px;">
                  <p>最小提现数量为：{{minWithdrawAmount.minWithdrawAmount}} {{minWithdrawAmount.name}}。</p>
                  <p>请勿直接提现至众筹或ICO地址. 我们不会处理未来代币的发放。</p>
                </div>
              </div>
            </div>
            <div class="withdrawal_right">
              <span>近期提现记录</span>
              <!-- <span>全部记录</span> -->
              <div>
                <span style="margin-left:40px">币种</span>
                <span style="margin-left:-36px">状态</span>
                <span style="margin-left:10px">时间</span>
                <span style="padding-left: 23px;">数量</span>
              </div>
              <ul>
                <li v-for="(item,index) in coinOutArr" :key="index">
                  <span>{{item.name}}</span>
                  <span v-if="item.status==1">等待处理</span>
                  <span v-if="item.status==2">正在处理</span>
                  <span v-if="item.status==3">成功</span>
                  <span v-if="item.status==4">已取消</span>
                  <span>{{timestampToTime(item.time)}}</span>
                  <span>{{item.amount}}</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="转换" name="fourth">
            <div class="recharge_left">
              <div class="recharge_left_top">
                <el-dropdown @command="handleCommand" trigger="click" style="width:200px;">
                  <span class="el-dropdown-link" style="cursor: pointer;">
                    <img :src="'https://dpro-main.oss-cn-hongkong.aliyuncs.com'+s_item.url" alt v-if="s_item.url" />
                    {{s_item.name == null ? '请选择充值币种' : s_item.name}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="value.name" v-for="(value,index) in arr" :key="index">{{value.name}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="recharge_left_center" >
                <div>
                  <p>可用余额</p>
                  <span>{{s_item.total==null?'0': s_item.total}} {{s_item.name}}</span>
                </div>
                <div class=" tranIptCon" style="margin-top: 60px">

                  <input type="text" placeholder="转换数量" v-model="tranNum" />

                </div>
                <button @click="tranBtn" class="submit">转换</button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>
</div>

<Footer />
</div>
</template>
<script>
  import PersonalNav from "../components/common/header.vue";
  import Footer from "../components/common/footer";
  import qs from "qs";
  import {
    Message
  } from "element-ui";
  import {
    mapState
  } from "vuex";
  export default {
    components: {
      PersonalNav,
      Footer
    },
    data() {
      return {
        type: 0,
        activeName: "first",
        value: false,
        input1: undefined ,
        arr: [],
        arr_copy: [],
        s_item: "",
        qrcodeObj: {},
        addressData: {},
        amount: "",
        coinaddress: "",
        safeWord: "",
        code: "",
        googleCode: "",
        getAddress: "",
        coinInArr: [],
        coinOutArr: [],
        fbalance: 0,
        all_totalAssets: 0,
        USDT_total: 0,
        fconvertSum: "", //划转数量
        showConvert: false,
        userInfoArr: [], //用户安全信息，含谷歌验证的状态
        show: true,
        count: "",
        timer: null,
        minWithdrawAmount: 0,
        data_obj: {},
        show_eye: true,
        tranNum: '',
        tranId: '',
        total: ''
      };
    },
    computed: {
      ...mapState(["rate", "balances", 'priceDatas']),
      total_money: function() {
        //总资产
        return Number(this.all_totalAssets) + Number(this.fbalance);
      },
      data_box: function() {
        return this.data_obj;
      },


    },
    watch: {
      input1() {
        this.arr_copy = [];
        if (this.input1 != '') {} else {
          // this.arr_copy=JSON.parse(JSON.stringify(this.arr));
        }
        var v = this.input1;
        console.log(v);

        for (const i in this.arr) {
          if (this.arr[i].name.toUpperCase().indexOf(v.toUpperCase()) > -1) {
            if (this.value && this.arr[i].total <= 0) {} else {
              this.arr_copy.push(this.arr[i]);
            }
          }
        }
      },
      value() {
        if (this.value) {
          this.arr_copy = [];
          for (const i in this.arr) {
            if (this.arr[i].total > 0) {
              this.arr_copy.push(this.arr[i]);
            }
          }
        } else {
          this.arr_copy = JSON.parse(JSON.stringify(this.arr));
        }
      }
    },
    async fetch({
      store,
      params,
      $axios
    }) {
      // 调用vuex里面actions GET_balances去请求数据
      await store.dispatch("GET_balances");
      await store.dispatch("GET_rate");
    },
    mounted() {
      this.getfcBanlance();
      this.getfbalance();
      this.totalAssets();
      this.getgoogleInfo();
    },
    methods: {
      accAdd(arg1, arg2) {
        var r1, r2, m;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }

        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }

        m = Math.pow(10, Math.max(r1, r2));
        return (this.accMul(arg1, m) + this.accMul(m, arg2)) / m
      },
      //乘法
      accMul (arg1, arg2) {
        var m = 0, s1 = arg1 + "", s2 = arg2 + "";
        try { m += s1.split(".")[1].length } catch (e) { }
        try { m += s2.split(".")[1].length } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
      },
      copy() {
        let url = this.addressData.data.address;
        let oInput = document.createElement('input');
        oInput.value = url;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象;
        document.execCommand("Copy"); // 执行浏览器复制命令
        Message({
          showClose: true,
          message: "复制成功"
        });
        oInput.remove()
      },
      unShowConvert() {
        this.showConvert = false;
      },
      handle_convert() {
        this.showConvert = true;
      },
      //切换划转方式
      transform() {
        if (this.type == 0) {
          this.type = 1;
        } else {
          this.type = 0;
        }
      },
      // 获取币币余额
      getfcBanlance() {
        var _this = this;
        this.$axios.setHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        this.$axios
          .get("/api/v1/account/balances")
          .then(function(response) {
            _this.arr = response.data.data.balanceList;
            _this.arr_copy = JSON.parse(JSON.stringify(response.data.data.balanceList));
            _this.s_item = _this.arr[0];
            _this.getAddressByCoin(_this.s_item);
            _this.getcoinList(_this.s_item);
            for (let i in _this.arr) {
              if (_this.arr[i].name == "USDT") {
                _this.USDT_total = _this.arr[i].total;
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //获取法币余额
      getfbalance() {
        var _this = this;
        this.$axios
          .get("/api/v1/findUsdtBuinessByFuId?fvId=50")
          .then(function(response) {
            if(response.data.data != null){
              _this.fbalance = response.data.data.fbalance;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //获取谷歌验证信息
      getgoogleInfo() {
        var _this = this;
        this.$axios
          .get("/api/v1/frontSession")
          .then(function(response) {
            if (response.data.code == 200) {
              _this.userInfoArr = response.data.data;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //资产划转
      convert() {
        var _this = this;
        var db = {
          type: Number(this.type) + 1,
          amount: this.fconvertSum,
          fvid: 50
        };
        this.$axios.setHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        this.$axios
          .post("/api/v1/capitalTransfer", qs.stringify(db))
          .then(function(response) {
            if (response.data.code == 200) {
              Message({
                showClose: true,
                message: "划转成功"
              });
              _this.getfbalance();
              _this.getfcBanlance();
              _this.unShowConvert();
            } else if (response.data.code == 1001) {
              Message({
                showClose: true,
                message: "余额不足"
              });
            } else {
              Message({
                showClose: true,
                message: response.data.msg
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //全部划转
      totalCovert() {

        if (this.type == 0) {
          this.fconvertSum = this.USDT_total;
        } else if (this.type == 1) {
          this.fconvertSum = this.fbalance;
        }
      },
      //总资产
      totalAssets: function() {
        if (this.balances.code != 401) {
          let balanceList = this.balances.data.balanceList;
          let s_totalAssets = 0;
          var _this = this;
          var obj = this.balances.data.dataMap;
          var data_obj = {};
          for (const i in obj) {
            data_obj[i] = obj[i];
            for (const j of obj[i]) {
              data_obj[i][j.fShortName] = j;
            }
          } //处理数据
          this.data_obj = data_obj;
          this.$axios
            .get("/api/v2/market/getUsdtPrice", {
              params: {}
            })
            .then((response) => {
              if (response.data.code == 200) {
                var price = response.data.data;
                for (var b_item in balanceList) {
                  if (balanceList[b_item].name == 'USDT') {
                    s_totalAssets +=
                      (Number(balanceList[b_item].total) + Number(balanceList[b_item].frozen));
                  } else {
                    if (data_obj['USDT'][balanceList[b_item].name] != undefined) {
                      s_totalAssets += this.tool.accMul((Number(balanceList[b_item].total) + Number(balanceList[
                        b_item].frozen)), data_obj['USDT'][balanceList[b_item].name].lastDealPrize);
                    }
                  }
                }
                _this.all_totalAssets = s_totalAssets;
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      },
      //获取短信验证码
      sendCode() {
        const TIME_COUNT = 60;
        this.$axios
          .get("/api/v1/account/sendCode", {
            params: {
              type: 1
            }
          })
          .then(function(response) {
            if (response.data.code == 200) {
              Message({
                showClose: true,
                message: "发送成功，注意查收"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
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

      handleClick(tab, event) {
        var _this = this;
        console.log(tab, event);
        _this.coinOut(_this.s_item);
        _this.coinIn(_this.s_item);
      },
      recharge(item) {
        this.s_item = item;
        this.activeName = "second";
        this.coinIn(item);
      },

      //充值历史记录
      coinIn(item) {
        var _this = this;
        this.$axios
          .get("/api/v1/account/coinIn", {
            params: {
              symbol: item.id,
              page: 1,
              pageSize: 8
            }
          })
          .then(function(response) {
            if (response.data.code == 200) {
              _this.coinInArr = response.data.data.rows;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },

      //时间戳转换
      timestampToTime: function(time = +new Date()) {
        var date = new Date(time + 8 * 3600 * 1000);
        return date
          .toJSON()
          .substr(0, 19)
          .replace("T", " ")
          .replace(/-/g, ".");
      },
      //保留四位小数
      formatDecimal: function(num, decimal) {
        num = num.toString();
        let index = num.indexOf(".");
        if (index !== -1) {
          num = num.substring(0, decimal + index + 1);
        } else {
          num = num.substring(0);
        }
        return parseFloat(num).toFixed(decimal);
      },

      //跳转到提现
      withdrawal(item) {
        var _this = this;
        this.s_item = item;
        this.activeName = "third";
        this.getAddressByCoin(item);
        this.coinOut(item);
      },

      getAddressByCoin(item) {
        let _this = this;
        this.$axios
          .get("/api/v1/account/getAddressByCoin", {
            params: {
              id: item.id
            }
          })
          .then(function(response) {
            _this.getAddress = response.data.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //提现历史记录
      coinOut(item) {
        var _this = this;
        this.$axios
          .get("/api/v1/account/coinOut", {
            params: {
              symbol: item.id,
              page: 1,
              pageSize: 8
            }
          })
          .then(function(response) {
            if (response.data.code == 200) {
              _this.coinOutArr = response.data.data.rows;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },

      handleCommand(command) {
        var _this = this;
        for (let i in _this.arr) {
          if (_this.arr[i].name == command) {
            _this.s_item = _this.arr[i];
            _this.getAddressByCoin(_this.s_item);
            _this.coinOut(_this.s_item);
            _this.coinIn(_this.s_item);
            _this.getcoinList(_this.s_item);
          }
        }
      },
      address(id) {
        document.getElementById("qrcode").innerHTML = "";
        let create = true;
        let _this = this;
        this.$axios
          .get("/api/v1/account/getCoinAddress", {
            params: {
              create: "true",
              symbol: id
            }
          })
          .then(function(response) {
            if (response.data.code == 200) {
              _this.addressData = response.data;
              _this.qrcodeObj = new QRCode("qrcode", {
                text: response.data.data.address,
                width: 150,
                height: 150,
                colorDark: "#000", // 颜色
                colorLight: "#fff",
                correctLevel: QRCode.CorrectLevel.H
              });
            } else {
              Message({
                showClose: true,
                message: response.data.msg
              });
            }

          })
          .catch(function(error) {
            console.log(error);
          });
      },

      withdrawCoin(id) {
        var _this = this;
        var db = {
          id: id,
          amount: this.amount,
          address: this.coinaddress,
          safeWord: this.safeWord,
          code: this.code,
          googleCode: this.googleCode
        };
        this.$axios.setHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        this.$axios
          .post("/api/v1/account/withdrawCoin", qs.stringify(db))
          .then(function(response) {
            if (response.data.code == 200) {
              Message({
                showClose: true,
                message: "提现成功"
              });
              _this.getfcBanlance();
              _this.coinOut(_this.s_item);
            } else if (response.data.code == 1) {
              Message({
                showClose: true,
                message: "用户未实名"
              });
            } else if (response.data.code == 2) {
              Message({
                showClose: true,
                message: "小于最小提现数额"
              });
            } else if (response.data.code == 3) {
              Message({
                showClose: true,
                message: "大于最大提现数额"
              });
            } else if (response.data.code == 4) {
              Message({
                showClose: true,
                message: "未开放提现"
              });
            } else if (response.data.code == 5) {
              Message({
                showClose: true,
                message: "资金不足"
              });
            } else if (response.data.code == 6) {
              Message({
                showClose: true,
                message: "手续费不足"
              });
            } else if (response.data.code == 7) {
              Message({
                showClose: true,
                message: "超过提现次数"
              });
            } else if (response.data.code == 8) {
              Message({
                showClose: true,
                message: "未设置交易密码"
              });
            } else if (response.data.code == 9) {
              Message({
                showClose: true,
                message: "交易密码不正确"
              });
            } else if (response.data.code == 10) {
              Message({
                showClose: true,
                message: "谷歌验证码不正确"
              });
            } else if (response.data.code == 100) {
              Message({
                showClose: true,
                message: "验证码不能为空"
              });
            } else if (response.data.code == 101) {
              Message({
                showClose: true,
                message: "IP被冻结，请两小时后再试"
              });
            } else if (response.data.code == 102) {
              Message({
                showClose: true,
                message: "验证码错误"
              });
            } else if (response.data.code == 12) {
              Message({
                showClose: true,
                message: "提现异常，请联系客服"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //获得费率说明
      getcoinList(res) {
        var _this = this;
        this.$axios.setHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        this.$axios
          .get("/api/v1/coinList")
          .then(function(response) {
            for (let item in response.data.data) {
              if (response.data.data[item].id == res.id) {
                _this.minWithdrawAmount = response.data.data[item];
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      setGroup: function(g, c) {
        var p = {};
        for (const i in this.priceDatas) {
          if (c.name == 'USDT') {
            p = this.priceDatas[i][0];
            break;
          } else {
            for (const jj of this.priceDatas[i]) {
              if (jj.fShortName == c.name) {
                p = jj;
                break;
              }
            }

          }
        }

        this.$store.commit('SET_s_selloutPrice', null)
        this.$store.commit('SET_s_selloutNum', null)
        this.$store.commit('SET_p_purchasePrice', null)
        this.$store.commit('SET_p_purchaseNum', null)

        localStorage.setItem("fvId", JSON.stringify(p.fid))
        localStorage.setItem("currency", JSON.stringify(p.fShortName))
        localStorage.setItem("group", JSON.stringify(g))

        this.$store.commit('SET_fvId', p.fid)
        this.$store.commit('SET_currency', p.fShortName)
        this.$store.commit('SET_group', g)
        this.$router.push({
          path: '/exchange'
        })
      },
      setTran(item){
        this.s_item = item;
        this.total = item.total
        this.tranId = item.id
        this.activeName = "fourth";
      },
      tranBtn(){
        let data = {
          fvid: this.tranId,
          amount: this.tranNum
        }

        if(parseFloat(this.total) > this.tranNum && parseFloat(this.tranNum) > 0){
          this.$axios
            .post("/api/v1/convertUsd", qs.stringify(data)).then(function (res){
            if(res.data.code == 200){
              Message({
                showClose: true,
                message: "转换成功"
              });
            }else{
              Message({
                showClose: true,
                message: "转换失败"
              });
            }
          })
        }else {
          Message({
            showClose: true,
            message: "转换数量不能大于可用余额或小于0"
          });
        }


      },
      // 节流
      throttle(fn, interval) {
        var last;
        var timer;
        var interval = interval || 200;
        return function() {
          var th = this;
          var args = arguments;
          var now = +new Date();
          if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function() {
              last = now;
              fn.apply(th, args);
            }, interval);
          } else {
            last = now;
            fn.apply(th, args);
          }
        };
      },
      numFixed_cny(num) { //保留
        num = parseFloat(num);
        if ((num - 0 + '').indexOf('.') == -1) {
          return num - 0
        }
        var r = (num - 0 + '').split('.');
        if (Number(num) > 1) {
          return num.toFixed(2);
        } else {
          if (r[1].length > 3) {
            var all0 = (r[1].split('0')).length - 1;
            var last0 = r[1].lastIndexOf('0');
            if (last0 <= -1) {
              return parseFloat(r[0] + '.' + r[1]).toFixed(2);
            } else {
              if (all0 != last0 + 1) {
                return parseFloat(r[0] + '.' + r[1]).toFixed(2);
              } else {
                return parseFloat(r[0] + '.' + r[1]).toFixed(last0 + 3);
              }

            }

          } else {
            r[1] = r[1];
            return parseFloat(r[0] + '.' + r[1]);
          }
        }

      },
    }
  };
</script>
<style>
.tranIptCon{
  width: 735px;
}
.el-tab-pane{
  display: flex;
  justify-content: center;
}
.tranIptCon input{
  width: 735px;
  height: 35px;
  border: 1px solid #3d3737 !important;
  border-radius: 4px;
  text-indent: 1em;
}
  #search_bi .el-input__inner {
    background-color: #1B1515 !important;
    border-color: #666 !important;
  }
</style>
<style scoped>
  .btn_box {
    margin-top: 35px;
    border-top: 1px solid #3d3737;
    text-align: right;
    padding-top: 30px;
  }

  .btn_box .cle {
    width: 64px;
    height: 34px;
    border-radius: 5px;
    border: 1px solid rgba(233, 225, 225, 1);
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: rgba(0, 0, 0, 0);
  }

  .btn_box .s_btn {
    width: 110px;
    height: 34px;
    background: rgba(189, 58, 59, 1);
    border-radius: 5px;
    border: none;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .item4 {
    margin-top: 28px;
  }

  .item4>p:first-child {
    height: 20px;
    font-size: 12px;
    font-weight: 500;
    color: #7c7676;
    line-height: 20px;
    margin-bottom: 9px;
  }

  .item4>div {
    width: 100%;
    height: 44px;
    background: rgba(41, 32, 32, 1);
    border-radius: 5px;
    opacity: 1;
    border: 1px solid rgba(53, 49, 49, 1);
    display: flex;
    align-items: center;
  }

  .item4>div input {
    height: 100%;
    background: rgba(255, 0, 0, 0);
    text-align: center;
    flex: 6;
  }

  .item2,
  .item3 {
    width: 196px;
  }

  .item2>p span:last-child,
  .item3>p span:last-child {
    float: right;
  }

  .c_item {
    line-height: 75px;
    height: 64px;
  }

  .item_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .item2>p:first-child,
  .item3>p:first-child {
    height: 20px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(124, 118, 118, 1);
    line-height: 20px;
  }

  .item2>p:nth-child(2),
  .item3>p:nth-child(2) {
    height: 44px;
    background: rgba(41, 32, 32, 1);
    border-radius: 5px;
    opacity: 0.4163;
    border: 1px solid rgba(53, 49, 49, 1);
    font-size: 14px;
    font-weight: 500;
    color: rgba(233, 225, 225, 1);
    line-height: 44px;
    padding-left: 14px;
  }

  .convertUsdt_box_content {
    padding-top: 37px;
    padding-left: 24px;
    padding-right: 24px;
  }

  .convertUsdt_box_content .item1 p {
    height: 20px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(124, 118, 118, 1);
    line-height: 20px;
  }

  .convertUsdt_box_content .item1 p:last-child {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: rgba(41, 32, 32, 1);
    border-radius: 5px;
    opacity: 0.4163;
    border: 1px solid rgba(53, 49, 49, 1);
    font-size: 14px;
    font-weight: 500;
    color: #e9e1e1;
    padding-left: 14px;
    margin-top: 9px;
    margin-bottom: 23px;
  }

  .convertUsdt_box_title {
    height: 53px;
    line-height: 53px;
    background: rgba(40, 32, 32, 1);
    border-radius: 5px 5px 0px 0px;
    font-size: 18px;
    font-weight: 500;
    padding-left: 20px;
    color: rgba(239, 238, 238, 1);
  }

  .convertUsdt_box {
    z-index: 9;
    position: absolute;
    background: #302828;
    width: 520px;
    height: 470px;
    top: 30%;
    left: 50%;
    margin-top: -235px;
    margin-left: -260px;
  }

  .recharge_left_top>>>.el-dropdown-menu__item {
    width: 200px;
  }

  .assets_top_bow {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .assets_top_bow>img {
    width: 30px;
    height: 30px;
  }

  .assets_top_bow>div {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
  }

  .assets_top_bow>div span:first-child {
    color: #dbd3d3;
    font-size: 16px;
  }

  .assets_top_bow>div span:last-child {
    color: #bd3a3b;
    font-size: 10px;
  }

  .content_main>>>.el-tabs__content {
    /*width: 1202px;*/
    margin: 0 auto;
  }

  .content_main>>>.el-tabs__nav-scroll {
    width: 1202px;
    margin: 0 auto;
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
    /*width: 1920px;*/
    /* height: 1825px; */
    background: rgba(27, 21, 21, 1);
  }

  .content_top {
    /*width: 1920px;*/
    height: 164px;
    margin: 7px 0;
    background: rgba(40, 32, 32, 1);
  }

  .wrap {
    height: 164px;
    display: flex;
    align-items: center;
    vertical-align: middle;
  }

  .top_l {
    /* margin-left: 350px; */
  }

  h1 {
    font-size: 35px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(219, 211, 211, 1);
  }

  .top_l>div:nth-of-type(1) {
    height: 24px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(124, 118, 118, 1);
    line-height: 24px;
  }

  .top_l>div:nth-of-type(2) {
    width: 100%;
    height: 32px;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(219, 211, 211, 1);
    line-height: 30px;
  }

  .top_r {
    /* margin-left: 500px; */
    text-align: right;
  }

  .top_r>div:nth-of-type(1) {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgb(245 245 245);
  }

  .top_r>div:nth-of-type(2) {
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(219, 211, 211, 1);
  }

  .top_r>div:nth-of-type(3) span {
    display: inline-block;
    width: 144px;
    margin-top: 22px;
    height: 47px;
    text-align: center;
    line-height: 47px;
    border-radius: 24px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(189, 58, 59, 1);
    border: 1px solid rgba(189, 58, 59, 1);
    cursor: pointer;
  }

  /* 资产 */

  .assets_top {
    /* width:1202px; */
    height: 154px;
    background: rgba(40, 32, 32, 1);
    border-radius: 10px;
  }

  .assets_top>span {
    display: block;
    background: #292424;
  }

  .assets_top>div:nth-of-type(1) {
    width: 100%;
    height: 35px;
    line-height: 35px;
  }

  .assets_top>div:nth-of-type(1)>p {
    font-size: 16px;
    font-weight: 600;
    color: rgba(219, 211, 211, 1);
    margin-left: 26px;
    border-bottom: 1px solid #292424;
  }

  .assets_top>div:nth-of-type(2) {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .assets_top>div:nth-of-type(2)>div:nth-of-type(1) {
    width: 218px;
    height: 64px;
    margin-left: 26px;
    background: rgba(48, 40, 40, 1);
    border-radius: 4px;
    opacity: 0.4251;
  }

  .assets_top>div:nth-of-type(2)>div:nth-of-type(4) {
    margin-right: 80px;
  }

  .assets_center {
    width: 1302px;
    margin-top: 20px;
    margin-bottom: 100px;
    background: rgba(40, 32, 32, 1);
    border-radius: 10px;
    color:#fff;
  }

  .assets_center .top {
    height: 141px;
  }

  .assets_center .top>div:nth-of-type(1) span {
    width: 106px;
    height: 24px;
    display: inline-block;
    margin: 20px 20px;
    font-size: 22px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(219, 211, 211, 1);
    line-height: 26px;
    text-align: center;
  }

  .assets_center .top>div:nth-of-type(2)>div:nth-of-type(1) {
    width: 440px;
    height: 44px;
    display: flex;
    float: left;
    align-items: center;
    background: rgba(48, 40, 40, 1);
    border-radius: 22px;
  }

  .assets_center .top>div:nth-of-type(2) div:nth-of-type(1) span {
    width: 106px;
    height: 20px;
    text-align: center;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
    margin: 20px;
  }

  .assets_center .top>div:nth-of-type(2) div:nth-of-type(1) span:nth-of-type(1) {
    height: 44px;
    line-height: 44px;
    background: rgba(189, 58, 59, 1);
    border-radius: 22px;
  }

  .el-switch {
    margin-top: 10px;
    margin-left: 400px;
    float: left;
  }

  .demo-input-suffix {
    width: 218px;
    margin-left: 50px;
    float: left;
  }

  .assets_center .center {
    /*width: 1202px;*/
    height: 50px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    background: rgba(27, 21, 21, 1);
  }

  .assets_center .center span {
    display: inline-block;
    width: 150px;
  }

  .assets_center ul li {
    /*width: 1202px;*/
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #292424;
  }

  .assets_center ul li span {
    display: inline-block;
    width: 100px;
    text-align: center;
  }

  .assets_center ul li input {
    width: 50px;
    background: rgba(40, 32, 32, 1);
  }

  .content_main>>>.el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 0.781vw;
    background-color: rgba(48, 40, 40, 1);
  }

  .content_main>>>.el-tabs__item:hover {
    color: #bd3a3b;
    cursor: pointer;
  }

  .content_main>>>.el-tabs__item.is-active {
    color: #bd3a3b;
  }

  .content_main>>>.el-tabs__active-bar {
    background-color: #bd3a3b;
  }

  .content_main>>>.el-tabs__item {
    height: 70px;
    line-height: 70px;
    font-size: 16px;
    font-weight: 400;
    color: #f0f0f0;
  }

  .content_main>>>.el-tabs__nav-wrap::after {
    background-color: rgba(27, 21, 21, 1);
  }

  .content_main>>>.el-tabs__active-bar {
    margin-bottom: 9px;
  }

  /* 充值 */
  .recharge_left {
    width: 780px;
    height: 566px;
    margin-top: 25px;
    float: left;
    margin-bottom: 175px;
    background: rgba(40, 32, 32, 1);
    border-radius: 5px;
    border: 1px solid rgba(79, 71, 71, 1);
  }

  .recharge_right {
    width: 419px;
    height: 566px;
    margin-top: 25px;
    float: right;
    background: rgba(40, 32, 32, 1);
    border-radius: 5px;
    border: 1px solid rgba(79, 71, 71, 1);
  }

  .recharge_right>span:nth-of-type(1) {
    width: 106px;
    height: 24px;
    margin: 16px 0 14px 21px;
    display: inline-block;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(219, 211, 211, 1);
    line-height: 26px;
  }

  .recharge_right>span:nth-of-type(2) {
    width: 73px;
    height: 21px;
    margin-left: 210px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(189, 58, 59, 1);
    line-height: 20px;
  }

  .recharge_right>div:nth-of-type(1) {
    width: 417px;
    height: 46px;
    display: flex;
    align-items: center;
    background: rgba(48, 40, 40, 1);
  }

  .recharge_right>div:nth-of-type(1)>span {
    display: inline-block;
    width: 100px;
  }

  .recharge_left_top {
    width: 735px;
    height: 76px;
    margin-left: 22px;
    line-height: 76px;
  }

  .recharge_left_center {
    width: 735px;
    height: 400px;
    margin-left: 22px;
    border-top: 1px solid rgba(79, 71, 71, 1);
    border-bottom: 1px solid rgba(79, 71, 71, 1);
  }

  .recharge_left_bottom {
    width: 735px;
    height: 88px;
    margin-left: 22px;
    line-height: 88px;
  }

  .recharge_left_bottom>span:nth-of-type(1) {
    width: 64px;
    height: 21px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(189, 58, 59, 1);
    line-height: 20px;
  }

  .recharge_left_bottom>span:nth-of-type(2) {
    width: 73px;
    height: 21px;
    margin-left: 48px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(189, 58, 59, 1);
    line-height: 20px;
  }

  .recharge_left_top {
    text-align: center;
  }

  .el-dropdown-link>img {
    width: 22px;
    margin-right: 5px;
  }

  .recharge_left_center>div:nth-of-type(1),
  .recharge_left_center>div:nth-of-type(2) {
    height: 60px;
  }

  .recharge_left_center>div:nth-of-type(1) {
    margin-top: 20px;
  }

  .recharge_left_center>div:nth-of-type(1) span {
    width: 86px;
    height: 24px;
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(219, 211, 211, 1);
    line-height: 26px;
  }

  .recharge_left_center>div:nth-of-type(2)>div {
    float: left;
  }

  .recharge_left_center>div:nth-of-type(2)>div>span {
    width: 86px;
    height: 24px;
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(219, 211, 211, 1);
    line-height: 26px;
  }

  .recharge_left_center>div:nth-of-type(2)>div:nth-of-type(2) {
    margin-left: 212px;
  }

  .recharge_left_center>div:nth-of-type(3) {
    height: 50px;
  }

  .recharge_left_center>div:nth-of-type(3)>p {
    width: 583px;
    height: 24px;
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(219, 211, 211, 1);
    line-height: 26px;
  }

  .recharge_left_center>div:nth-of-type(4)>button {
    width: 126px;
    height: 36px;
    margin-top: -6px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: rgba(189, 58, 59, 1);
    border-radius: 5px;
    border: 0;
    cursor: pointer;
  }

  .recharge_left_center>div:nth-of-type(5)>p {
    width: 526px;
    height: 42px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(124, 118, 118, 1);
    line-height: 20px;
  }

  .recharge_right>ul>li {
    height: 20px;
    display: flex;
    justify-content: space-around;
    line-height: 20px;
  }

  .recharge_right>ul>li>span {
    margin-left: 20px;
  }

  .qrcode {
    width: 100px;
    height: 100px;
    float: left;
  }

  /* 提现 */

  .withdrawal_left {
    width: 780px;
    height: 566px;
    margin-top: 25px;
    float: left;
    margin-bottom: 175px;
    background: rgba(40, 32, 32, 1);
    border-radius: 5px;
    border: 1px solid rgba(79, 71, 71, 1);
  }

  .withdrawal_right {
    width: 419px;
    height: 566px;
    margin-top: 25px;
    float: right;
    background: rgba(40, 32, 32, 1);
    border-radius: 5px;
    border: 1px solid rgba(79, 71, 71, 1);
  }

  .withdrawal_right>span:nth-of-type(1) {
    width: 106px;
    height: 24px;
    margin: 16px 0 14px 21px;
    display: inline-block;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(219, 211, 211, 1);
    line-height: 26px;
  }

  .withdrawal_right>span:nth-of-type(2) {
    width: 73px;
    height: 21px;
    margin-left: 210px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(189, 58, 59, 1);
    line-height: 20px;
  }

  .withdrawal_right>div:nth-of-type(1) {
    width: 417px;
    height: 46px;
    display: flex;
    align-items: center;
    background: rgba(48, 40, 40, 1);
  }

  .withdrawal_right>div:nth-of-type(1)>span {
    display: inline-block;
    width: 100px;
  }

  .withdrawal_left_top {
    width: 735px;
    height: 76px;
    margin-left: 22px;
    line-height: 76px;
    text-align: center;
  }

  .withdrawal_left_center {
    width: 735px;
    height: 400px;
    margin-left: 22px;
    border-top: 1px solid rgba(79, 71, 71, 1);
  }

  .withdrawal_left_center>div {
    height: 80px;
  }

  .withdrawal_left_center>div>div {
    width: 120px;
    float: left;
    margin-top: 20px;
  }

  .withdrawal_left_center>div>div:nth-of-type(2),
  .withdrawal_left_center>div>div:nth-of-type(3) {
    margin-left: 155px;
  }

  .withdrawal_left_center select {
    width: 100%;
    height: 35px;
    border-radius: 4px;
    border: 1px solid rgba(61, 55, 55, 1);
    background: rgba(40, 32, 32, 1);
    padding-left: 15px;
  }

  .withdrawal_left_center>input {
    width: 735px;
    height: 35px;
    margin-top: 20px;
    border-radius: 4px;
    border: 1px solid rgba(61, 55, 55, 1);
    background: rgba(40, 32, 32, 1);
    padding-left: 15px;
  }

  .withdrawal_left_center>input:nth-of-type(3) {
    width: 335px;
  }

  .withdrawal_right>ul>li {
    height: 20px;
    display: flex;
    justify-content: left;
    padding-left: 9px;
  }

  .withdrawal_right>ul>li>span {
    margin-left: 30px;
  }

  .sentcode {
    width: 126px;
    height: 35px;
    margin-left: 30px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: rgba(189, 58, 59, 1);
    border-radius: 5px;
    border: 0;
    outline: null;
  }

  .submit {
    width: 309px;
    height: 36px;
    margin-top: 20px;
    margin-left: 200px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: rgba(48, 40, 40, 1);
    border-radius: 5px;
    border: 0;
    outline: null;
  }

  .withdrawal_left_center>span {
    height: 21px;
    font-size: 12px;
    margin-top: 5px;
    display: inline-block;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }

  .dis-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex_center {
    display: flex;
    align-items: center;
  }

  .add_btn {
    width: 84px;
    height: 32px;
    background: rgba(189, 58, 59, 1);
    border-radius: 16px;
    border: 0;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-left: 10px;
  }

  .address-box {}

  .address-box .tit {
    color: #999;
    font-size: 16px;
  }

  .address-box .address {
    color: #ccc;
    font-size: 14px;
    padding: 10px;
    border: 1px solid #666;
    width: 100%;
  }
</style>
