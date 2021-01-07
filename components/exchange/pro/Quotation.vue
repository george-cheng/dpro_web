<template>
  <!-- 行情 -->
  <div class="warp">
    <div class="right">
      <div class="top">
        <div class="search">
          <input type="text" placeholder="搜索币种" v-model="search" />
          <img src="~assets/image/sousuo.png" alt />
          <img src="~assets/image/shezhi.png" alt @click="showModal2()" style="cursor: pointer;" />
        </div>
        <a-modal title="市场列表设置" v-model="visible2" :footer="null">
          <div>
            <span style="margin-right: 20px;">第三列显示:</span>
            <a-radio-group name="radioGroup3" @change="onChangeSan2" v-model="sanValue2">
              <a-radio style="font-size: 14px;" :value="1">涨跌幅</a-radio>
              <a-radio style="font-size: 14px;" :value="2">成交量</a-radio>
              <a-radio style="font-size: 14px;" :value="3">成交额</a-radio>
            </a-radio-group>
          </div>
        </a-modal>
        <div v-if="priceData">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane name="star">
              <span slot="label">
                <img src="~assets/image/onstar.png" alt style="width:20px;margin-top:-5px;" />
              </span>
              <!-- {{star}} -->
              <!-- :data="star" -->
              <el-table
                :data="star"
                style="width: 100%"
                max-height="750px"
                :default-sort="{prop: 'date', order: 'descending'}"
              >
                <el-table-column prop="fShortName" label="币种">
                  <template slot-scope="scope">
                    <span
                      class="star"
                      v-if="!isStar(scope.row.fname_sn)"
                      style="margin-right: 5px;font-size: 20px;"
                      @click="setStar(priceData.BTC,scope.row.fname_sn)"
                    >
                      <img src="~assets/image/star.png" alt style="width: 20px;" />
                    </span>
                    <span
                      class="unstar"
                      v-if="isStar(scope.row.fname_sn)"
                      style="margin-right: 5px;font-size: 20px;"
                      @click="setStar(priceData.BTC,scope.row.fname_sn)"
                    >
                      <img src="~assets/image/onstar.png" alt style="width: 20px;" />
                    </span>
                    <span @click="starSetGroup(scope.row)" style="flex:1;">{{ scope.row.fname_sn }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="lastDealPrize" label="价格" sortable>
                  <template slot-scope="scope">
                    <span
                      @click="starSetGroup(scope.row)"
                      style="flex:1;"
                    >{{ scope.row.lastDealPrize }}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="setSanShow == 1" sortable label="涨跌幅">
                  <template slot-scope="scope">
                    <span
                      @click="starSetGroup(scope.row)"
                      :style="'color:'+(scope.row.fupanddown>0?'#1BD098':(scope.row.fupanddown==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.fupanddown }}%</span>
                  </template>
                </el-table-column>

                <el-table-column v-if="setSanShow == 2" prop="volumn" sortable label="成交量">
                  <template slot-scope="scope">
                    <span
                      @click="starSetGroup(scope.row)"
                      :style="'color:'+(scope.row.volumn>0?'#1BD098':(scope.row.volumn==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.volumn }}</span>
                  </template>
                </el-table-column>

                <el-table-column v-if="setSanShow == 3" prop="fentrustValue" sortable label="成交额">
                  <template slot-scope="scope">
                    <span
                      @click="starSetGroup(scope.row)"
                      :style="'color:'+(scope.row.fentrustValue>0?'#1BD098':(scope.row.fentrustValue==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.fentrustValue }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="USDT" name="first">
              <el-table
                :data="priceData.USDT.filter(data => !search || data.fname_sn.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                max-height="750px"
                :default-sort="{prop: 'date', order: 'descending'}"
              >
                <el-table-column prop="fShortName" label="币种">
                  <template slot-scope="scope">
                    <span
                      class="star"
                      v-if="!isStar(scope.row.fname_sn)"
                      style="margin-right: 5px;font-size: 20px;"
                      @click="setStar(priceData.BTC,scope.row.fname_sn)"
                    >
                      <img src="~assets/image/star.png" alt style="width: 20px;" />
                    </span>
                    <span
                      class="unstar"
                      v-if="isStar(scope.row.fname_sn)"
                      style="margin-right: 5px;font-size: 20px;"
                      @click="setStar(priceData.BTC,scope.row.fname_sn)"
                    >
                      <img src="~assets/image/onstar.png" alt style="width: 20px;" />
                    </span>
                    <span
                      @click="setGroup('USDT',scope.row)"
                      style="flex:1;"
                    >{{ scope.row.fShortName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="lastDealPrize" label="价格" sortable>
                  <template slot-scope="scope">
                    <span
                      @click="setGroup('USDT',scope.row)"
                      style="flex:1;"
                    >{{ scope.row.lastDealPrize }}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="setSanShow == 1" prop="fupanddown" sortable label="涨跌幅">
                  <template slot-scope="scope">
                    <span
                      @click="setGroup('USDT',scope.row)"
                      :style="'color:'+(scope.row.fupanddown>0?'#1BD098':(scope.row.fupanddown==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.fupanddown }}%</span>
                  </template>
                </el-table-column>

                <el-table-column v-if="setSanShow == 2" prop="volumn" sortable label="成交量">
                  <template slot-scope="scope">
                    <span
                      @click="setGroup('USDT',scope.row)"
                      :style="'color:'+(scope.row.volumn>0?'#1BD098':(scope.row.volumn==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.volumn }}</span>
                  </template>
                </el-table-column>

                <el-table-column v-if="setSanShow == 3" prop="fentrustValue" sortable label="成交额">
                  <template slot-scope="scope">
                    <span
                      @click="setGroup('USDT',scope.row)"
                      :style="'color:'+(scope.row.fentrustValue>0?'#1BD098':(scope.row.fentrustValue==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.fentrustValue }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane v-if="priceData.CNYS" label="CNYS" name="first2">
              <el-table
                :data="priceData.CNYS.filter(data => !search || data.fname_sn.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                max-height="750px"
                :default-sort="{prop: 'date', order: 'descending'}"
              >
                <el-table-column label="币种">
                  <template slot-scope="scope">
                    <span
                      class="star"
                      v-if="!isStar(scope.row.fname_sn)"
                      style="margin-right: 5px;font-size: 20px;"
                      @click="setStar(priceData.BTC,scope.row.fname_sn)"
                    >
                      <img src="~assets/image/star.png" alt style="width: 20px;" />
                    </span>
                    <span
                      class="unstar"
                      v-if="isStar(scope.row.fname_sn)"
                      style="margin-right: 5px;font-size: 20px;"
                      @click="setStar(priceData.BTC,scope.row.fname_sn)"
                    >
                      <img src="~assets/image/onstar.png" alt style="width: 20px;" />
                    </span>
                    <span
                      @click="setGroup('CNYS',scope.row)"
                      style="flex:1;"
                    >{{ scope.row.fShortName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="lastDealPrize" label="价格" sortable>
                  <template slot-scope="scope">
                    <span
                      @click="setGroup('CNYS',scope.row)"
                      style="flex:1;"
                    >{{ scope.row.lastDealPrize }}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="setSanShow == 1" prop="fupanddown" sortable label="涨跌幅">
                  <template slot-scope="scope" sortable>
                    <span
                      @click="setGroup('CNYS',scope.row)"
                      :style="'color:'+(scope.row.fupanddown>0?'#1BD098':(scope.row.fupanddown==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.fupanddown }}%</span>
                  </template>
                </el-table-column>

                <el-table-column v-if="setSanShow == 2" prop="volumn" sortable label="成交量">
                  <template slot-scope="scope">
                    <span
                      @click="setGroup('CNYS',scope.row)"
                      :style="'color:'+(scope.row.volumn>0?'#1BD098':(scope.row.volumn==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.volumn }}</span>
                  </template>
                </el-table-column>

                <el-table-column v-if="setSanShow == 3" prop="fentrustValue" sortable label="成交额">
                  <template slot-scope="scope">
                    <span
                      @click="setGroup('CNYS',scope.row)"
                      :style="'color:'+(scope.row.fentrustValue>0?'#1BD098':(scope.row.fentrustValue==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.fentrustValue }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane v-if="priceData.BTC" label="BTC" name="first3">
              <!-- :data="priceData.BTC" -->
              <el-table
                :data="priceData.BTC.filter(data => !search || data.fname_sn.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                max-height="750px"
                :default-sort="{prop: 'date', order: 'descending'}"
              >
                <!-- <el-table-column
                                label=""
                                width="20px"
                                >
                                    <template slot-scope="scope">
                                        <span class="star" v-if="!isStar(scope.row.fname_sn)" style="margin-right: 5px;font-size: 20px;" @click="setStar(priceData.BTC,scope.row.fname_sn)">☆</span>
                                        <span class="unstar" v-if="isStar(scope.row.fname_sn)" style="margin-right: 5px;font-size: 20px;" @click="setStar(priceData.BTC,scope.row.fname_sn)">★</span>
                                    </template>
                </el-table-column>-->
                <el-table-column label="币种">
                  <template slot-scope="scope">
                    <span
                      class="star"
                      v-if="!isStar(scope.row.fname_sn)"
                      style="margin-right: 5px;font-size: 20px;"
                      @click="setStar(priceData.BTC,scope.row.fname_sn)"
                    >
                      <img src="~assets/image/star.png" alt style="width: 20px;" />
                    </span>
                    <span
                      class="unstar"
                      v-if="isStar(scope.row.fname_sn)"
                      style="margin-right: 5px;font-size: 20px;"
                      @click="setStar(priceData.BTC,scope.row.fname_sn)"
                    >
                      <img src="~assets/image/onstar.png" alt style="width: 20px;" />
                    </span>
                    <span
                      @click="setGroup('BTC',scope.row)"
                      style="flex:1;"
                    >{{ scope.row.fShortName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="lastDealPrize" label="价格" sortable>
                  <template slot-scope="scope">
                    <span
                      @click="setGroup('BTC',scope.row)"
                      style="flex:1;"
                    >{{ scope.row.lastDealPrize }}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="setSanShow == 1" prop="fupanddown" sortable label="涨跌幅">
                  <template slot-scope="scope">
                    <span
                      @click="setGroup('BTC',scope.row)"
                      :style="'color:'+(scope.row.fupanddown>0?'#1BD098':(scope.row.fupanddown==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.fupanddown }}%</span>
                  </template>
                </el-table-column>

                <el-table-column v-if="setSanShow == 2" prop="volumn" sortable label="成交量">
                  <template slot-scope="scope">
                    <span
                      @click="setGroup('BTC',scope.row)"
                      :style="'color:'+(scope.row.volumn>0?'#1BD098':(scope.row.volumn==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.volumn }}</span>
                  </template>
                </el-table-column>

                <el-table-column v-if="setSanShow == 3" prop="fentrustValue" sortable label="成交额">
                  <template slot-scope="scope">
                    <span
                      @click="setGroup('BTC',scope.row)"
                      :style="'color:'+(scope.row.fentrustValue>0?'#1BD098':(scope.row.fentrustValue==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.fentrustValue }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="创新区(限时)" name="first4">
              <el-table
                :data="priceData.news"
                style="width: 100%"
                max-heigth="750px"
                :default-sort="{prop: 'date', order: 'descending'}"
              >
                <el-table-column prop="fShortName" label="币种"></el-table-column>
                <el-table-column prop="lastDealPrize" label="价格" sortable></el-table-column>
                <el-table-column v-if="setSanShow == 1" prop="fupanddown" sortable label="涨跌幅">
                  <template slot-scope="scope">
                    <span
                      :style="'color:'+(scope.row.fupanddown>0?'#1BD098':(scope.row.fupanddown==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.fupanddown }}%</span>
                  </template>
                </el-table-column>

                <el-table-column v-if="setSanShow == 2" prop="volumn" sortable label="成交量">
                  <template slot-scope="scope">
                    <span
                      @click="setGroup('USDT',scope.row)"
                      :style="'color:'+(scope.row.volumn>0?'#1BD098':(scope.row.volumn==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.volumn }}</span>
                  </template>
                </el-table-column>

                <el-table-column v-if="setSanShow == 3" prop="fentrustValue" sortable label="成交额">
                  <template slot-scope="scope">
                    <span
                      @click="setGroup('USDT',scope.row)"
                      :style="'color:'+(scope.row.fentrustValue>0?'#1BD098':(scope.row.fentrustValue==0?'#CCC3C3':'#FF4D4E'))+';flex:1;'"
                    >{{ scope.row.fentrustValue }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Message } from "element-ui";

export default {
  data() {
    return {
      market_id: 0,
      // websock: null,
      activeIcon: 1,
      activeName: "first",
      search: "",
      purchase: "",
      sellout: "",
      newbusiness: "",
      getlocalstar: [],
      isSetStar: "",
      delItemIndex: "",
      value: 1,
      marks: {
        0: "",
        25: "",
        50: "",
        75: "",
        100: ""
      },
      purchasePrice: "",
      purchaseNum: "",
      selloutPrice: "",
      selloutNum: "",
      purchaseSliderNum: 0,
      userTotal: 0.0,
      maxSelloutNum: 0,
      maxPurchaseNum: 0,
      visible: false,
      visible2: false,
      setSanShow: 1,
      sanValue2: 1
    };
  },
  computed: {
    ...mapState([
      "priceDatas",
      "rate",
      "fvId",
      "balances",
      "group",
      "currency",
      "userInfo"
    ]),
    priceData: function(e) {
      return this.priceDatas;
    },
    isLogin: function() {
      if (this.userInfo.code == 1) {
        return true;
      } else {
        return false;
      }
      return this.userInfo.code;
    },
    //自选区
    star: function() {
      var arrs = [];
      if (this.getlocalstar) {
        if (this.priceData.BTC) {
          this.priceData.BTC.forEach((item, index) => {
            for (let i = 0; i < this.getlocalstar.length; i++) {
              if (item.fname_sn == this.getlocalstar[i]) {
                arrs.push(item);
              } else {
              }
            }
          });
        }
        if (this.priceData.CNYS) {
          this.priceData.CNYS.forEach((item, index) => {
            for (let i = 0; i < this.getlocalstar.length; i++) {
              if (item.fname_sn == this.getlocalstar[i]) {
                arrs.push(item);
              } else {
              }
            }
          });
        }
        if (this.priceData.USDT) {
          this.priceData.USDT.forEach((item, index) => {
            for (let i = 0; i < this.getlocalstar.length; i++) {
              if (item.fname_sn == this.getlocalstar[i]) {
                arrs.push(item);
              } else {
              }
            }
          });
        }
      }
      return arrs;
    }
  },
  created() {
    if (process.browser) {
      this.getlocalstar = JSON.parse(localStorage.getItem("star"));
    }
  },
  mounted() {
    this.$store.dispatch("GET_priceData");
    window.setInterval(() => {
      setTimeout(this.fetchSomething(), 0);
    }, 3600000);
    this.getUserTotal();
  },
  methods: {
    /**
     * 市场列表设置
     */
    showModal2() {
      this.visible2 = true;
    },
    onChangeSan2(e) {
      this.setSanShow = e.target.value;
    },
    /**
     * 更新订单状态
     */
    updateOrderStatus: function() {
      this.$store.dispatch("GET_historyData");
      this.$store.dispatch("GET_currentData");
    },

    /**
     * g 交易区
     * c 币种id
     */
    starSetGroup: function(s) {
      let group = s.group;
      let fShortName_fid = {
        fid: s.fid,
        fShortName: s.fShortName
      };
      this.setGroup(group, fShortName_fid);
    },
    setGroup: function(g, c) {
      this.$store.commit("SET_s_selloutPrice", null);
      this.$store.commit("SET_s_selloutNum", null);
      this.$store.commit("SET_p_purchasePrice", null);
      this.$store.commit("SET_p_purchaseNum", null);

      localStorage.setItem("fvId", JSON.stringify(c.fid));
      localStorage.setItem("currency", JSON.stringify(c.fShortName));
      localStorage.setItem("group", JSON.stringify(g));

      this.market_id = c.fid;

      this.$store.commit("SET_fvId", c.fid);
      this.$store.commit("SET_currency", c.fShortName);
      this.$store.commit("SET_group", g);
      this.getUserTotal();
      this.updateOrderStatus();
    },
    getUserTotal: function() {
      this.$store.dispatch("GET_balances");
    },
    isStar: function(a) {
      var isstar;
      for (var i = 0; i < this.star.length; i++) {
        if (this.star[i].fname_sn == a) {
          isstar = true;
          break;
        } else {
          isstar = false;
        }
      }
      return isstar;
    },
    setStar: function(n, a) {
      this.getStar(n, a);
    },
    getStar: function(n, a) {
      if (this.getlocalstar) {
        if (this.getlocalstar.indexOf(a) > -1) {
          this.getlocalstar.splice(this.contains(this.getlocalstar, a), 1);
          localStorage.setItem("star", JSON.stringify(this.getlocalstar));
        } else {
          this.getlocalstar.push(a);
          localStorage.setItem("star", JSON.stringify(this.getlocalstar));
        }
      } else {
        this.getlocalstar = [];
        this.getlocalstar.push(a);
        localStorage.setItem("star", JSON.stringify(this.getlocalstar));
      }
    },
    addStar: function(n, a) {},
    contains: function(arrays, obj) {
      var i = arrays.length;
      while (i--) {
        if (arrays[i] === obj) {
          return i;
        }
      }
      return false;
    },
    fetchSomething(params) {
      this.$store.dispatch("GET_priceData");
    }
  }
};
</script>

<style scoped>
.warp {
  width: 100%;
  height: 100%;
  background: #282020;
}
.warp > .right {
  height: 100%;
}
.warp > .right .top {
  background: #282020;
  height: 62.8%;
  margin-bottom: 1.2%;
}
.warp > .right .top .search {
  height: 43px;
  display: flex;
  align-items: center;
}
.warp > .right .top .search input {
  width: 200px;
  height: 33px;
  background: rgba(48, 40, 40, 1);
  border-radius: 5px;
  border: 1px solid rgba(64, 61, 61, 1);
  margin: 0 9px;
  padding-left: 14px;
}
.warp > .right .top .search img:nth-child(2) {
  width: 17px;
  height: 17px;
  margin-left: -33px;
}
.warp > .right .top .search img:nth-child(3) {
  margin-left: auto;
  margin-right: 20px;
  width: 14px;
}
.warp > .right .top .price_title {
  height: 37px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
}
.warp > .right .top .price_title span {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  line-height: 100%;
  justify-content: center;
  margin-right: 2px;
  background: #302828;
  cursor: pointer;
}
.warp > .right .top .price_title span:first-child {
  font-size: 18px;
}
.warp > .right .top .price_title span:last-child {
  flex: 2;
  margin-right: 0;
}
/* .warp>.right >>> .el-table--scrollable-x .el-table__body-wrapper{
        overflow-x: hidden
    } */
.warp > .right >>> .el-tabs--card > .el-tabs__header .el-tabs__item {
  height: 37px;
}
.warp > .right >>> .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: none;
  background: #302828;
  margin-right: 2px;
  padding: 0;
  /* width: 41px; */
  text-align: center;
  color: #7c7878;
  flex: 1;
}
/* .warp>.right >>> .el-table tbody>tr>td:first-child>div::before{
        content: '☆';
        font-size: 0.65vw;
        display: inline-block;
    } */
.warp > .right >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background: #3b3636;
}
.warp > .right >>> .el-tabs--card > .el-tabs__header .el-tabs__item:last-child {
  /* width: 75px; */
  margin-right: 0;
  flex: 2;
}
.warp > .right >>> .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
  display: flex;
  width: 100%;
}
.warp > .right >>> .el-tabs--card > .el-tabs__header {
  border: none;
}
.warp > .right >>> .el-table::before {
  background: #282020;
}
.warp > .right >>> .el-table td,
.el-table th.is-leaf {
  border: none;
}
.warp > .right >>> .el-table th,
.el-table tr {
  background: #282020;
}
.warp > .right >>> .el-table .el-table__body-wrapper tr {
  color: #ccc3c3;
  font-size: 11px;
  cursor: pointer;
  /* display: flex; */
  /* width: 15.41vw; */
  justify-content: space-between;
}
.warp > .right >>> .el-table .el-table__body-wrapper tr td .cell {
  display: flex;
  padding: 0;
  align-items: baseline;
}
.warp > .right >>> .el-table .el-table__body-wrapper tr td:nth-child(2) .cell {
  text-align: right;
  padding-right: 14px;
}
.warp > .right >>> .el-table .el-table__body-wrapper tr td:nth-child(3) .cell {
  text-align: right;
  padding-right: 14px;
}
.warp > .right >>> .el-tabs__item.is-active {
  color: #f5ebeb !important;
  background: #bd3a3b !important;
}
.warp > .right >>> .el-table__empty-block {
  background: #282020;
}
.warp > .right >>> .el-table th,
.warp > .right >>> .el-table tr {
  background: #282020;
}
.warp > .right >>> .el-table td,
.warp > .right >>> .el-table th.is-leaf {
  border: none;
}
.warp > .right >>> .el-table td,
.warp > .right >>> .el-table th {
  padding: 0;
  flex: 1;
}
.warp > .right >>> .el-table td:first-child {
  flex: 1.2;
  text-align: left;
}
.warp > .right >>> .el-table th:first-child {
  text-align: center;
  flex: 1.2;
}
.warp > .right >>> .el-table th:nth-child(2) {
  text-align: right;
}
.warp > .right >>> .el-table th:nth-child(3) {
  text-align: right;
}
.warp > .right >>> .el-table--fit {
  background: #282020;
}

/* 滚动条 */
.warp > .right >>> .el-table__body-wrapper::-webkit-scrollbar {
  width: 5px;
  background: rgba(49, 41, 41, 1);
  border-radius: 3px;
}
.warp > .right >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  width: 5px;
  background: rgba(75, 63, 63, 1);
  border-radius: 3px;
}
</style>