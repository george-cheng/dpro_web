<template>
  <div class="center">
    <div class="left">
      <div class="top">
        <div style="width:95px;height:24px;">
          <div class="left_icon1" :class="activeIcon==1?'left_icon_border':''">
            <span class="all-icon" @click="showPurchase('all-icon',1)" ref="all-icon"></span>
          </div>
          <div class="left_icon2" :class="activeIcon==2?'left_icon_border':''">
            <span
              class="purchase-icon"
              @click="showPurchase('purchase-icon',2)"
              ref="purchase-icon"
            ></span>
          </div>
          <div class="left_icon3" :class="activeIcon==3?'left_icon_border':''">
            <span class="sellout-icon" @click="showPurchase('sellout-icon',3)" ref="sellout-icon"></span>
          </div>
        </div>
        <div>
          <a-select defaultValue="6" style="width: 100px;font-size:12px;" @change="selectFloat">
            <a-select-option value="9">9位小数</a-select-option>
            <a-select-option value="8">8位小数</a-select-option>
            <a-select-option value="7">7位小数</a-select-option>
            <a-select-option value="6">6位小数</a-select-option>
            <a-select-option value="5">5位小数</a-select-option>
            <a-select-option value="4">4位小数</a-select-option>
            <a-select-option value="3">3位小数</a-select-option>
            <a-select-option value="2">2位小数</a-select-option>
            <a-select-option value="1">1位小数</a-select-option>
          </a-select>
          <img
            src="~assets/image/shezhi.png"
            @click="showModal()"
            alt
            style="cursor: pointer;width:14px;margin-left: 10px;"
          />
        </div>
        <a-modal title="盘口设置" v-model="visible" :footer="null">
          <div>
            <span style="margin-right: 20px;">第三列显示:</span>
            <a-radio-group name="radioGroup" @change="onChangeSan" v-model="sanValue">
              <a-radio style="font-size: 14px;" :value="1">累计数量</a-radio>
              <a-radio style="font-size: 14px;" :value="2">数额</a-radio>
              <a-radio style="font-size: 14px;" :value="3">累计数额</a-radio>
            </a-radio-group>
          </div>
          <div style="margin-top: 16px;">
            <span style="margin-right: 20px;">柱状图模式:</span>
            <a-radio-group name="radioGroup2" @change="onChangeZhu" v-model="zhuValue">
              <a-radio style="font-size: 14px;" :value="1">数量</a-radio>
              <a-radio style="font-size: 14px;" :value="2">累计数量</a-radio>
              <a-radio style="font-size: 14px;" :value="3">数额</a-radio>
              <a-radio style="font-size: 14px;" :value="4">累计数额</a-radio>
            </a-radio-group>
          </div>
        </a-modal>
      </div>
      <div class="bottom">
        <p class="small_title">
          <span>价格({{this.group}})</span>
          <span>数量({{this.currency}})</span>
          <span v-if="showBusinessValue == 2">数额({{this.group}})</span>
          <span v-if="showBusinessValue == 1">累计数量({{this.currency}})</span>
          <span v-if="showBusinessValue == 3">累计数额({{this.group}})</span>
        </p>
        <ul>
          <div class="purchase" ref="purchase" id="sellout">
            <li v-for="(i, index) in sellout " :key="index" @click="Business(i[0],i[1],1)">
              <!-- .toFixed(6) -->
              <span>{{i[0].toFixed(priceDecimals)}}</span>
              <span>{{i[1].toFixed(amountDecimals)}}</span>
              <span v-if="showBusinessValue == 2">{{i[2].toFixed(2)}}</span>
              <span v-if="showBusinessValue == 1">{{i[3].toFixed(5)}}</span>
              <span
                v-if="showBusinessValue == 3"
              >{{(i[0].toFixed(priceDecimals)*i[3].toFixed(5)).toFixed(2)}}</span>
              <div
                v-if="showBusinessBg == 1"
                class="selloutdata_bg"
                :style="'width: '+(i[1]/maxSelloutNum)*100+'%'"
              ></div>
              <div
                v-if="showBusinessBg == 2"
                class="selloutdata_bg"
                :style="'width: '+(i[3]/maxLeJiSelloutNum)*100+'%'"
              ></div>
              <div
                v-if="showBusinessBg == 3"
                class="selloutdata_bg"
                :style="'width: '+(i[2]/maxSelloutAmount)*100+'%'"
              ></div>
              <div
                v-if="showBusinessBg == 4"
                class="selloutdata_bg"
                :style="'width: '+((i[0].toFixed(priceDecimals)*i[3].toFixed(5))/maxLeJiSelloutAmount)*100+'%'"
              ></div>
            </li>
          </div>
          <div class="newbusiness">
            <li v-if="real">
              <span
                :style="'color:'+(real.fupanddown.toFixed(2)>0?'#1BD098':'#FF4D4E')+';'"
              >{{real.last}}</span>
              <span
                :style="'color:'+(real.fupanddown.toFixed(2)>0?'#1BD098':'#FF4D4E')+';'"
              >¥{{tool.accMul(real.last,parseFloat(rate.usdt)).toFixed(2)}}</span>
              <span
                :style="'color:'+(real.fupanddown.toFixed(2)>0?'#1BD098':'#FF4D4E')+';'"
              >{{real.fupanddown.toFixed(2)}}</span>
            </li>
          </div>
          <div class="sellout" ref="sellout">
            <li v-for="(i, index) in purchase " :key="index" @click="Business(i[0],i[1],2)">
              <!-- .toFixed(6) -->
              <span>{{i[0].toFixed(priceDecimals)}}</span>
              <span>{{i[1].toFixed(amountDecimals)}}</span>
              <span v-if="showBusinessValue == 2">{{i[2].toFixed(2)}}</span>
              <span v-if="showBusinessValue == 1">{{i[3].toFixed(5)}}</span>
              <span
                v-if="showBusinessValue == 3"
              >{{(i[0].toFixed(priceDecimals)*i[3].toFixed(5)).toFixed(2)}}</span>
              <div
                v-if="showBusinessBg == 1"
                class="selloutdata_bg"
                :style="'width: '+(i[1]/maxPurchaseNum)*100+'%'"
              ></div>
              <div
                v-if="showBusinessBg == 2"
                class="selloutdata_bg"
                :style="'width: '+(i[3]/maxLeJiPurchaseNum)*100+'%'"
              ></div>
              <div
                v-if="showBusinessBg == 3"
                class="selloutdata_bg"
                :style="'width: '+(i[2]/maxPurchaseAmount)*100+'%'"
              ></div>
              <div
                v-if="showBusinessBg == 4"
                class="selloutdata_bg"
                :style="'width: '+((i[0].toFixed(priceDecimals)*i[3].toFixed(5))/maxLeJiPurchaseAmount)*100+'%'"
              ></div>
            </li>
          </div>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="kline">
        <Kline />
      </div>
      <div class="entrust">
        <div class="entrust_bar">
          <a-radio-group @change="onChangeRadio" v-model="value">
            <a-radio :value="1">限价委托</a-radio>
            <!-- <a-radio :value="2">计划委托</a-radio> -->
          </a-radio-group>
        </div>
        <div class="entrust_content">
          <div class="password_warp" style="display:none;" ref="pt_password" @click="$refs.pt_password.style.display ='none'">
            <p style="font-size: 20px;color: #fff;margin-bottom: 5px;">请输入交易密码</p>
            <p class="num" style="display:flex;width:30%;margin:0 auto;margin-bottom: 5px;">
              <input type="password" v-model="pt_password" style="padding-left: 10px;" @click.stop=""/>
            </p>
            <a-button class @click.stop="buySubmit()" :disabled="isLogin">确定</a-button>
          </div>
          <div class="purchase">
            <p>
              余额：
              <span>{{userbalances}} {{this.group}}</span>
            </p>
            <p class="price">
              <span>价格</span>
              <input type="text" v-model="purchasePrice" />
              <span>{{this.group}}</span>
            </p>
            <p class="num">
              <span>数量</span>
              <input type="text" v-model="purchaseNum" />
              <span>{{this.currency}}</span>
            </p>
            <a-slider
              :marks="marks"
              :step="25"
              id="purchase_slider"
              @change="getPurchaseSliderNum"
              :tipFormatter="sliderformatter"
            />
            <p>
              成交额：
              <span style="color:#CCC3C3;">{{purchaseTotal.toFixed(4)}} {{this.group}}</span>
              <!-- <span style="color:#645C5C">≈ ¥{{purchasePriceCnys.toFixed(4)}}</span> -->
            </p>
            <!-- <button class="purchase_btn" @click="buySubmit()">买入</button> -->
            <a-button class="purchase_btn" @click="buySubmit()" :disabled="isLogin">买入</a-button>
          </div>
          <div class="password_warp" style="display:none;" ref="st_password" @click="$refs.st_password.style.display ='none'">
            <p style="font-size: 20px;color: #fff;margin-bottom: 5px;">请输入交易密码</p>
            <p class="num" style="display:flex;width:30%;margin:0 auto;margin-bottom: 5px;">
              <input type="password" v-model="st_password" style="padding-left: 10px;"  @click.stop=""/>
            </p>
            <a-button class @click="sellSubmit()" :disabled="isLogin">确定</a-button>
          </div>
          <div class="sellout">
            <p>
              余额：
              <span>{{userbalancesCurrency}} {{this.currency}}</span>
            </p>
            <p class="price">
              <span>价格</span>
              <input type="text" v-model="selloutPrice" />
              <span>{{this.group}}</span>
            </p>
            <p class="num">
              <span>数量</span>
              <input type="text" v-model="selloutNum" />
              <span>{{this.currency}}</span>
            </p>
            <a-slider
              :marks="marks"
              :step="25"
              id="sellout_slider"
              @change="getSelloutSliderNum"
              :tipFormatter="sliderformatter"
            />
            <p>
              成交额：
              <span style="color:#CCC3C3;">{{selloutTotal.toFixed(4)}} {{this.group}}</span>
              <!-- <span style="color:#645C5C">≈ ¥{{selloutTotalCnys.toFixed(4)}}</span> -->
            </p>
            <!-- <button class="sellout_btn" @click="sellSubmit()">卖出</button> -->
            <!-- <p class="num" style="display:none;" ref="st_password"><span>交易密码</span><input type="password" v-model="st_password"><span></span></p> -->
            <a-button class="sellout_btn" @click="sellSubmit()" :disabled="isLogin">卖出</a-button>
          </div>
        </div>
      </div>
    </div>
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
                max-height="365"
                :default-sort="{prop: 'date', order: 'descending'}"
              >
                <el-table-column prop="fShortName" label="币种">
                  <template slot-scope="scope" style="display:flxe;">
                    <span
                      class="star"
                      v-if="!isStar(scope.row.fname_sn)"
                      style="margin-right: 5px;font-size: 20px;width:20px;"
                      @click="setStar(priceData.BTC,scope.row.fname_sn)"
                    >
                      <img src="~assets/image/star.png" alt />
                    </span>
                    <span
                      class="unstar"
                      v-if="isStar(scope.row.fname_sn)"
                      style="margin-right: 5px;font-size: 20px;width:20px;"
                      @click="setStar(priceData.BTC,scope.row.fname_sn)"
                    >
                      <img src="~assets/image/onstar.png" alt />
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
                max-height="365"
                :default-sort="{prop: 'date', order: 'descending'}"
              >
                <el-table-column prop="fShortName" label="币种">
                  <template slot-scope="scope" style="display:flxe;">
                    <span
                      class="star"
                      v-if="!isStar(scope.row.fname_sn)"
                      style="margin-right: 5px;font-size: 20px;width:20px;"
                      @click="setStar(priceData.BTC,scope.row.fname_sn)"
                    >
                      <img src="~assets/image/star.png" alt />
                    </span>
                    <span
                      class="unstar"
                      v-if="isStar(scope.row.fname_sn)"
                      style="margin-right: 5px;font-size: 20px;width:20px;"
                      @click="setStar(priceData.BTC,scope.row.fname_sn)"
                    >
                      <img src="~assets/image/onstar.png" alt />
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
            <el-tab-pane label="创新区(限时)" name="first4">
              <el-table
                :data="priceData.news"
                style="width: 100%"
                max-heigth="500"
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
      <div class="bottom">
        <div class="new_title">实时成交</div>
        <div class="new_table">
          <p class="small_title">
            <span>价格</span>
            <span>数量</span>
            <span>时间</span>
          </p>
          <ul>
            <li v-for="(item, index) in newbusiness" :key="index">
              <span>{{item[0]}}</span>
              <span>{{item[1]}}</span>
              <span>{{item[2].trim().split(" ")[1]}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Message } from "element-ui";
import Kline from "./kline";

export default {
  data() {
    return {
      // websock: null,
      activeIcon: 1,
      activeName: "first",
      search: "",
      purchase: "",
      sellout: "",
      newbusiness: "",
      real: "",
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
      // purchasePrice: '',
      // purchaseNum: '',
      // selloutPrice: '',
      // selloutNum: '',
      purchaseSliderNum: 0,
      userTotal: 0.0,
      userTotalCurrency: 0.0,

      maxSelloutNum: 0, //最大数量
      maxLeJiSelloutNum: 0, //最大累计数量
      maxSelloutAmount: 0, //最大数额
      maxSelloutLeJiAmount: 0, //最大累计数额

      maxPurchaseNum: 0, //最大数量
      maxLeJiPurchaseNum: 0, //最大累计数量
      maxPurchaseAmount: 0, //最大数额
      maxLeJiPurchaseAmount: 0, //最大累计数额
      pt_password: "",
      st_password: "",
      needTradePasswd: true,
      entrustListLog: [],
      entrustList: [],
      priceDecimals: 6,
      amountDecimals: 6,
      visible: false,
      visible2: false,
      sanValue: 2,
      zhuValue: 1,
      sanValue2: 1,
      setSanShow: 1,
      showBusinessValue: 2,
      showBusinessBg: 1
    };
  },
  components: {
    Kline
  },
  updated() {
    // 让滚动条定位到底部
    let ele = document.getElementById("sellout");
    ele.scrollTop = ele.scrollHeight;
  },
  created() {
    if (process.browser) {
      this.getlocalstar = JSON.parse(localStorage.getItem("star"));
    }
    if (process.browser) {
      if ("WebSocket" in window) {
        //页面刚进入时开启长连接
        this.initWebSocket();
        window.setInterval(() => {
          setTimeout(this.initWebSocket(), 0);
        }, 144000);
        console.log("支持webSocket");
      } else {
        console.log("不支持webSocket");
      }
    }
  },
  beforeDestroy() {
    // clearInterval(this.timer)
  },
  destroyed: function() {
    this.websocketclose();
  },
  watch: {
    WebSocket_fvId: function() {
      if (this.websocket.readyState === 1) {
        console.log(
          "------关闭websocket连接,重新发送请求------" +
            JSON.stringify(this.websocket)
        );
        this.websocket.close();
        this.initWebSocket();
      } else {
        console.log(
          "------重新初始化发送请求------" + JSON.stringify(this.websocket)
        );
        this.initWebSocket();
      }
    },
    purchasePrice: function() {
      this.getUserTotal();
      if(this.purchasePrice){
        var a=(this.purchasePrice+'').split('.');
        if(a[1]&&a[1].length>this.priceDecimals){
          this.purchasePrice=parseFloat(parseFloat(this.purchasePrice).toFixed(this.priceDecimals))
        }
      }else{
        this.purchasePrice=''
      }
      
    },
    selloutPrice: function() {
      this.getUserTotal();
      if(this.selloutPrice){
        var a=(this.selloutPrice+'').split('.');
        if(a[1]&&a[1].length>this.priceDecimals){
          this.selloutPrice=parseFloat(parseFloat(this.selloutPrice).toFixed(this.priceDecimals))
        }
      }else{
        this.selloutPrice=''
      }
      
    },
    purchaseNum: function() {
      this.getUserTotal();
      if(this.purchaseNum){
        var a=(this.purchaseNum+'').split('.');
        if(a[1]&&a[1].length>this.amountDecimals){
          this.purchaseNum=parseFloat(parseFloat(this.purchaseNum).toFixed(this.amountDecimals))
        }
      }else{
        this.purchaseNum=''
      }
      
    },
    selloutNum: function() {
      this.getUserTotal();
      if(this.selloutNum){
        var a=(this.selloutNum+'').split('.');
        if(a[1]&&a[1].length>this.amountDecimals){
          this.selloutNum=parseFloat(parseFloat(this.selloutNum).toFixed(this.amountDecimals))
        }
      }else{
        this.selloutNum=''
      }
      
    },
  },
  computed: {
    ...mapState([
      "priceDatas",
      "rate",
      "fvId",
      "balances",
      "userbalances",
      "userbalancesCurrency",
      "group",
      "currency",
      "userInfo",
      "p_purchasePrice",
      "p_purchaseNum",
      "s_selloutPrice",
      "s_selloutNum"
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
    selloutPrice: {
      get() {
        return this.s_selloutPrice;
      },
      set(val) {
        this.$store.commit("SET_s_selloutPrice", val);
      }
    },
    selloutNum: {
      get() {
        return this.s_selloutNum;
      },
      set(val) {
        this.$store.commit("SET_s_selloutNum", val);
      }
    },
    purchasePrice: {
      get() {
        return this.p_purchasePrice;
      },
      set(val) {
        this.$store.commit("SET_p_purchasePrice", val);
      }
    },
    purchaseNum: {
      get() {
        return this.p_purchaseNum;
      },
      set(val) {
        this.$store.commit("SET_p_purchaseNum", val);
      }
    },
    WebSocket_fvId: function() {
      return this.fvId;
    },
    //自选区
    star: function() {
      var arrs = [];
      if (this.getlocalstar) {
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
    },
    purchaseTotal: function() {
      return this.purchasePrice * this.purchaseNum;
    },
    purchasePriceCnys: function() {
      return this.purchaseTotal * parseFloat(this.rate.cnys);
    },
    selloutTotal: function() {
      return this.selloutPrice * this.selloutNum;
    },
    selloutTotalCnys: function() {
      return this.selloutTotal * parseFloat(this.rate.cnys);
    }
  },
  mounted() {
    this.$store.dispatch("GET_priceData");
    this.getUserTotal();
    this.updateOrderStatus();
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
     * 盘口设置
     */
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.visible = false;
    },
    onChangeSan(e) {
      this.showBusinessValue = e.target.value;
    },
    onChangeZhu(e) {
      this.showBusinessBg = e.target.value;
    },

    /**
     * 切换小数位
     */
    selectFloat: function(value) {
      this.priceDecimals = value;
    },
    /**
     * 更新订单状态
     */
    updateOrderStatus: function() {
      this.$store.dispatch("GET_historyData");
      this.$store.dispatch("GET_currentData");
      this.$store.dispatch("GET_balances");
    },
    /**
     * 卖出
     * 逻辑待优化
     */
    sellSubmit: function() {
      var _this = this;
      var s_params = new URLSearchParams();
      s_params.append("symbol", this.fvId);
      if (
        this.selloutPrice == "" ||
        this.selloutPrice == null ||
        this.selloutPrice == undefined
      ) {
        Message({
          showClose: true,
          message: "请输入价格"
        });
      } else if (
        this.selloutNum == "" ||
        this.selloutNum == null ||
        this.selloutNum == undefined
      ) {
        Message({
          showClose: true,
          message: "请输入数量"
        });
      } else if (this.needTradePasswd == true) {
        // debugger
        this.$refs.st_password.style.display = "block";
        if (
          this.st_password == "" ||
          this.st_password == null ||
          this.st_password == undefined
        ) {
          Message({
            showClose: true,
            message: "请输入交易密码"
          });
        } else {
          s_params.append("tradePwd", this.st_password);
          s_params.append("tradeAmount", this.selloutNum);
          s_params.append("tradeCnyPrice", this.selloutPrice);
          s_params.append("type", "sell");
          this.$axios
            .post("/api/v2/market/sellBtcSubmit", s_params, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(function(response) {
              if (response.data.isLogin == 0) {
                Message({ showClose: true, message: "未登录" });
              }
              if (response) {
                _this.$refs.st_password.style.display = "none";
                switch (response.data.code) {
                  case 0:
                    _this.selloutNum = "";
                    _this.selloutPrice = "";
                    _this.st_password = "";
                    _this.$refs.st_password.style.display = "none";
                    _this.updateOrderStatus();
                    break;
                  case -100:
                    Message({ showClose: true, message: "交易市场未启用" });
                    break;
                  case -101:
                    Message({ showClose: true, message: "交易市场未开放交易" });
                    break;
                  case -400:
                    Message({
                      showClose: true,
                      message: "交易市场未在开放时间内"
                    });
                    break;
                  case -3:
                    Message({
                      showClose: true,
                      message:
                        "小于最小交易价格，最小交易价格为：" +
                        response.data.data
                    });
                    break;
                  case -1:
                    Message({
                      showClose: true,
                      message:
                        "小于最小交易数量，最小交易数量为：" +
                        response.data.data
                    });
                    break;
                  case -2:
                    Message({ showClose: true, message: "交易密码不对" });
                    break;
                  case -35:
                    Message({
                      showClose: true,
                      message:
                        "大于最大交易价格，最大交易价格为：" +
                        response.data.data
                    });
                    break;
                  case -200:
                    Message({
                      showClose: true,
                      message: "请检查用户交易币种账户"
                    });
                    break;
                  case -4:
                    Message({ showClose: true, message: "可用数量不足" });
                    break;
                  case 200:
                    Message({ showClose: true, message: "挂单成功" });
                    _this.updateOrderStatus();
                    _this.$refs.st_password.style.display = "none";
                    break;
                  default:
                    Message({ showClose: true, message: response.data.msg });
                    break;
                }
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      } else {
        s_params.append("tradeAmount", this.selloutNum);
        s_params.append("tradeCnyPrice", this.selloutPrice);
        s_params.append("type", "sell");
        this.$axios
          .post("/api/v2/market/sellBtcSubmit", s_params, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(function(response) {
            if (response.data.isLogin == 0) {
              Message({ showClose: true, message: "未登录" });
            }
            if (response) {
              switch (response.data.code) {
                case 0:
                  // Message({showClose: true,message: '挂单成功'})
                  _this.selloutNum = "";
                  _this.selloutPrice = "";
                  _this.updateOrderStatus();
                  break;
                case -100:
                  Message({ showClose: true, message: "交易市场未启用" });
                  break;
                case -101:
                  Message({ showClose: true, message: "交易市场未开放交易" });
                  break;
                case -400:
                  Message({
                    showClose: true,
                    message: "交易市场未在开放时间内"
                  });
                  break;
                case -3:
                  Message({
                    showClose: true,
                    message:
                      "小于最小交易价格，最小交易价格为：" + response.data.data
                  });
                  break;
                case -1:
                  Message({
                    showClose: true,
                    message:
                      "小于最小交易数量，最小交易数量为：" + response.data.data
                  });
                  break;
                case -2:
                  Message({ showClose: true, message: "交易密码不对" });
                  break;
                case -35:
                  Message({
                    showClose: true,
                    message:
                      "大于最大交易价格，最大交易价格为：" + response.data.data
                  });
                  break;
                case -200:
                  Message({
                    showClose: true,
                    message: "请检查用户交易币种账户"
                  });
                  break;
                case -4:
                  Message({ showClose: true, message: "可用数量不足" });
                  break;
                case 200:
                  Message({ showClose: true, message: "挂单成功" });
                  _this.updateOrderStatus();
                  break;
                default:
                  Message({ showClose: true, message: response.data.msg });
                  break;
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    /**
     * 买入
     * 逻辑待优化
     */
    buySubmit: function() {
      var _this = this;
      var params = new URLSearchParams();
      params.append("symbol", this.fvId);
      if (
        this.purchasePrice == "" ||
        this.purchasePrice == null ||
        this.purchasePrice == undefined
      ) {
        Message({
          showClose: true,
          message: "请输入价格"
        });
      } else if (
        this.purchaseNum == "" ||
        this.purchaseNum == null ||
        this.purchaseNum == undefined
      ) {
        Message({
          showClose: true,
          message: "请输入数量"
        });
      } else if (this.needTradePasswd == true) {
        this.$refs.pt_password.style.display = "block";
        if (
          this.pt_password == "" ||
          this.pt_password == null ||
          this.pt_password == undefined
        ) {
          Message({
            showClose: true,
            message: "请输入交易密码"
          });
        } else {
          params.append("tradeAmount", this.purchaseNum);
          params.append("tradeCnyPrice", this.purchasePrice);
          params.append("type", "buy");
          params.append("tradePwd", this.pt_password);
          this.$axios
            .post("/api/v2/market/buyBtcSubmit", params, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(function(response) {
              if (response.data.isLogin == 0) {
                Message({ showClose: true, message: "未登录" });
              }
              if (response) {
                
                switch (response.data.code) {
                  case 0:
                    _this.purchaseNum = "";
                    _this.purchasePrice = "";
                    _this.pt_password = "";
                    _this.updateOrderStatus();
                    _this.$refs.pt_password.style.display = "none";
                    break;
                  case -100:
                    Message({ showClose: true, message: "交易市场未启用" });
                    break;
                  case -101:
                    Message({ showClose: true, message: "交易市场未开放交易" });
                    break;
                  case -400:
                    Message({
                      showClose: true,
                      message: "交易市场未在开放时间内"
                    });
                    break;
                  case -3:
                    Message({
                      showClose: true,
                      message:
                        "小于最小交易价格，最小交易价格为：" +
                        response.data.data
                    });
                    break;
                  case -1:
                    Message({
                      showClose: true,
                      message:
                        "小于最小交易数量，最小交易数量为：" +
                        response.data.data
                    });
                    break;
                  case -2:
                    Message({ showClose: true, message: "交易密码不对" });
                    break;
                  case -35:
                    Message({
                      showClose: true,
                      message:
                        "大于最大交易价格，最大交易价格为：" +
                        response.data.data
                    });
                    break;
                  case -200:
                    Message({
                      showClose: true,
                      message: "请检查用户交易币种账户"
                    });
                    break;
                  case -4:
                    Message({ showClose: true, message: "可用数量不足" });
                    break;
                  case 200:
                    Message({ showClose: true, message: "挂单成功" });
                    _this.updateOrderStatus();
                    _this.$refs.pt_password.style.display = "none";
                    break;
                  default:
                     Message({ showClose: true, message: response.data.msg });
                    _this.$refs.pt_password.style.display = "none";
                    break;
                }
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      } else {
        params.append("tradeAmount", this.purchaseNum);
        params.append("tradeCnyPrice", this.purchasePrice);
        params.append("type", "buy");
        // params.append('tradePwd', this.pt_password)
        console.log(params);
        this.$axios
          .post("/api/v2/market/buyBtcSubmit", params, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(function(response) {
            if (response.data.isLogin == 0) {
              Message({ showClose: true, message: "未登录" });
            }
            if (response) {
              switch (response.data.code) {
                case 0:
                  _this.purchaseNum = "";
                  _this.purchasePrice = "";
                  _this.updateOrderStatus();
                  break;
                case -100:
                  Message({ showClose: true, message: "交易市场未启用" });
                  break;
                case -101:
                  Message({ showClose: true, message: "交易市场未开放交易" });
                  break;
                case -400:
                  Message({
                    showClose: true,
                    message: "交易市场未在开放时间内"
                  });
                  break;
                case -3:
                  Message({
                    showClose: true,
                    message:
                      "小于最小交易价格，最小交易价格为：" + response.data.data
                  });
                  break;
                case -1:
                  Message({
                    showClose: true,
                    message:
                      "小于最小交易数量，最小交易数量为：" + response.data.data
                  });
                  break;
                case -2:
                  Message({ showClose: true, message: "交易密码不对" });
                  break;
                case -35:
                  Message({
                    showClose: true,
                    message:
                      "大于最大交易价格，最大交易价格为：" + response.data.data
                  });
                  break;
                case -200:
                  Message({
                    showClose: true,
                    message: "请检查用户交易币种账户"
                  });
                  break;
                case -4:
                  Message({ showClose: true, message: "可用数量不足" });
                  break;
                case 200:
                  Message({ showClose: true, message: "挂单成功" });
                  _this.updateOrderStatus();
                  break;
                default:
                  Message({ showClose: true, message: response.data.msg });
                  break;
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
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
      this.priceDecimals = c.priceDecimals;
      this.amountDecimals = c.amountDecimals;

      this.purchasePrice = null;
      this.purchaseNum = null;
      this.selloutPrice = null;
      this.selloutNum = null;

      localStorage.setItem("fvId", JSON.stringify(c.fid));
      localStorage.setItem("currency", JSON.stringify(c.fShortName));
      localStorage.setItem("group", JSON.stringify(g));

      this.$store.commit("SET_fvId", c.fid);
      this.$store.commit("SET_currency", c.fShortName);
      this.$store.commit("SET_group", g);
      this.getUserTotal();
      this.updateOrderStatus();
    },
    getUserTotal: function() {
      this.$store.dispatch("GET_balances");
    },
    setDatabg: function() {
      if (this.sellout) {
        this.maxSelloutNum = this.getMaxNum(this.sellout, 1);
        this.maxLeJiSelloutNum = this.getMaxNum(this.sellout, 3);
        this.maxSelloutAmount = this.getMaxNum(this.sellout, 2);
        this.maxLeJiSelloutAmount = this.getMaxLejiAmount(this.sellout);
      }
      if (this.purchase) {
        this.maxPurchaseNum = this.getMaxNum(this.purchase, 1);
        this.maxLeJiPurchaseNum = this.getMaxNum(this.purchase, 3);
        this.maxPurchaseAmount = this.getMaxNum(this.purchase, 2);
        this.maxLeJiPurchaseAmount = this.getMaxLejiAmount(this.purchase);
      }
    },
    getMaxLejiAmount: function(a) {
      // (i[0].toFixed(priceDecimals)*i[3].toFixed(5)
      if (a.length > 0) {
        var max = a[0][3] * a[0][0];
        for (var i = 0; i < a.length; i++) {
          if (max < a[i][3] * a[0][0]) {
            max = a[i][3] * a[0][0];
          }
        }
        return max;
      }
    },
    getMaxNum: function(a, n) {
      if (a.length > 0) {
        var max = a[0][n];
        for (var i = 0; i < a.length; i++) {
          if (max < a[i][n]) {
            max = a[i][n];
          }
        }
        return max;
      }
    },
    sliderformatter: function(value) {
      return `${value}%`;
    },
    getPurchaseSliderNum: function(value) {
      if (
        parseFloat(this.purchasePrice) <= 0 ||
        this.purchasePrice == null ||
        this.purchasePrice == ""
      ) {
        Message({
          showClose: true,
          message: "请先输入价格"
        });
      } else {
        var userTotal = parseFloat(this.userbalances);
        var purchasePrice = parseFloat(this.purchasePrice);
        var allnum = 0;
        var isnum = 0;
        this.purchaseSliderNum = value;
        allnum = userTotal / purchasePrice;
        isnum = allnum * (value / 100);
        this.purchaseNum = parseFloat(isnum.toFixed(this.amountDecimals));
      }
    },
    getSelloutSliderNum: function(value) {
      if (
        parseFloat(this.selloutPrice) <= 0 ||
        this.selloutPrice == null ||
        this.selloutPrice == ""
      ) {
        Message({
          showClose: true,
          message: "请先输入价格"
        });
      } else {
        var userbalancesCurrency = parseFloat(this.userbalancesCurrency);
        var selloutPrice = parseFloat(this.selloutPrice);
        var allnum = 0;
        var isnum = 0;
        this.selloutSliderNum = value;
        allnum = userbalancesCurrency / selloutPrice;
        isnum = allnum * (value / 100);
        if(value==100){
          this.selloutNum=this.userbalancesCurrency;
        }else{
          this.selloutNum=parseFloat(this.tool.accMul(this.userbalancesCurrency,value/100).toFixed(this.amountDecimals));
        }
        // this.selloutNum = isnum;
      }
    },
    onChangeRadio(e) {
      console.log("radio checked", e.target.value);
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
      console.log("fetchSomething");
      this.$store.dispatch("GET_priceData");
    },
    initWebSocket() {
      const wsuri =
        `wss://www.dpro.ltd/socket.io/?deep=4&token=dev&symbol=` +
        this.fvId +
        `&EIO=3&transport=websocket`;
      this.websocket = new WebSocket(wsuri);
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onclose = this.websocketclose;
    },
    websocketonopen() {
      this.websocketsend();
    },
    websocketonerror(e) {
      this.initWebSocket(); // 连接失败后尝试重新连接
    },
    websocketonmessage(e) {
      if (e.data.indexOf("42/trade,") == -1) {
      } else {
        let data = JSON.parse(e.data.replace("42/trade,", ""));
        switch (data[0]) {
          case "entrust-buy":
            var _this = this;
            this.purchase = JSON.parse(data[1]);
            var sumN = 0;
            for (let i = 0; i < _this.purchase.length; i++) {
              sumN += _this.purchase[i][1];
              _this.purchase[i].push(sumN);
            }
            break;
          case "entrust-sell":
            var _this = this;
            this.sellout = JSON.parse(data[1]);
            var sumI = 0;
            for (let i = 0; i < _this.sellout.length; i++) {
              sumI += _this.sellout[i][1];
              _this.sellout[i].push(sumI);
            }
            this.sellout = this.sellout.reverse();
            break;
          case "entrust-log":
            this.newbusiness = JSON.parse(data[1]);
            break;
          case "real":
            this.real = JSON.parse(data[1]);
            break;
          case "entrust-update":
            if (
              JSON.parse(data[1]).needTradePasswd == true ||
              JSON.parse(data[1]).needTradePasswd == undefined
            ) {
              this.needTradePasswd = true;
            } else {
              this.needTradePasswd = false;
            }
            this.entrustListLog = JSON.parse(data[1]).entrustListLog;
            this.entrustList = JSON.parse(data[1]).entrustList;

            this.$store.commit("SET_entrustListLog", this.entrustListLog);
            this.$store.commit("SET_entrustList", this.entrustList);
            break;
          default:
            break;
        }
      }
      this.setDatabg();
    },
    websocketsend() {
      //数据发送
      let data = "40/trade";
      console.log("WebSocket数据发送");
      var usercookie = this.tool.getCookie("uid");
      if (this.websocket.readyState === 1) {
        this.websocket.send(data);
      }
    },
    websocketclose(e) {
      // this.initWebSocket()
    },

    // 控制左侧记录显示
    showPurchase: function(e, a) {
      this.activeIcon = a;
      switch (e) {
        case "all-icon":
          // left_icon_border
          this.$refs.purchase.style.display = "block";
          this.$refs.purchase.style.height = "46%";
          this.$refs.sellout.style.display = "block";
          this.$refs.sellout.style.height = "43%";
          break;
        case "purchase-icon":
          this.$refs.purchase.style.display = "block";
          this.$refs.purchase.style.height = "89%";
          this.$refs.sellout.style.display = "none";
          break;
        case "sellout-icon":
          this.$refs.sellout.style.display = "block";
          this.$refs.sellout.style.height = "89%";
          this.$refs.purchase.style.display = "none";
          break;
        default:
          break;
      }
    },
    Business: function(e, n,index) {
      e=e.toFixed(this.priceDecimals);
      n=n.toFixed(this.amountDecimals);
      if(index==1){
        this.purchasePrice = e;
        this.purchaseNum = n;
      }else{
        this.selloutPrice = e;
        this.selloutNum = n;
      }
    }
  }
};
</script>

<style scoped>
.left .top >>> .ant-select-dropdown {
  font-size: 12px;
}
.left .top >>> .ant-select-selection {
  background: #282020;
  color: #fff;
  height: 24px;
  /* border: 1px solid #555555; */
}
.left .top >>> .ant-select-selection__rendered {
  line-height: 22px;
}
.left .top >>> .ant-select-arrow {
  color: #bbbbbb;
}
.password_warp {
  position: absolute;
  height: 100%;
  width: 100% !important;
  background: rgba(27, 21, 21, 0.9);
  z-index: 9;
  text-align: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
}
.center {
  height: 745px;
  display: flex;
}
.center > div {
  display: inline-block;
}
/* .star{
        
    }
    .unstar{
        
    } */
.star > img {
  width: 20px;
}
.unstar > img {
  width: 20px;
}
.password_btn {
  width: 100px !important;
  margin-left: 20px !important;
  margin-top: 0 !important;
  background: #bd3a3b;
  color: #ffffff;
  font-weight: 500;
}
.t_password {
  position: absolute;
  width: 100% !important;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  /* display:flex !important; */
  justify-content: center;
  align-items: center;
  z-index: 9;
  display: none !important;
}
.selloutdata_bg {
  position: absolute;
  right: 0;
  top: 0;
  height: 20px;
  background: rgba(189, 58, 59, 0.1);
  z-index: 0;
}
.purchasedata_bg {
  position: absolute;
  right: 0;
  top: 0;
  height: 20px;
  background: rgba(59, 169, 135, 0.1);
  z-index: 0;
}
.content .entrust_bar {
  height: 40px;
  background: rgba(48, 40, 40, 1);
  border-bottom: 1px solid #1b1515;
}
/* 修改ant design组件的样式 */
.content .entrust_bar >>> .ant-radio-group {
  line-height: 38px;
}
.content .entrust_bar >>> .ant-radio-wrapper {
  color: #ccc3c3;
  margin-left: 16px;
}
.content .entrust_content >>> .ant-slider-dot-active {
  border: #282020;
}
.content .entrust_content >>> .ant-slider-handle {
  background: #282020;
  border: solid 3px #bd3a3b;
}
.content .entrust_content >>> .ant-slider-with-marks {
  margin-bottom: 12px;
}
.content .entrust_content {
  height: 240px;
  background: rgba(40, 32, 32, 1);
  display: flex;
  position: relative;
}
.entrust_content > div {
  display: inline-block;
  width: 50%;
  padding: 16px 16px 0;
}
.entrust_content > div .purchase_btn {
  background: #3ba987;
}
.entrust_content > div .sellout_btn {
  background: #bd3a3b;
}
.entrust_content > div .purchase_btn,
.entrust_content > div .sellout_btn {
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin-top: 7px;
  /* cursor: pointer; */
}
.entrust_content > div p:first-child span {
  float: right;
  color: #ccc3c3;
}
.entrust_content .price {
  margin-top: 7px;
}
.entrust_content .price,
.entrust_content .num {
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid rgba(100, 92, 92, 1);
  margin-bottom: 10px;
  font-size: 14px;
}
.entrust_content .price > *,
.entrust_content .num > * {
  flex: 1;
}
.entrust_content .price span:first-child,
.entrust_content .num span:first-child {
  text-align: center;
}
.entrust_content .price input,
.entrust_content .num input {
  width: 150px;
  height: 33px;
  background: #282020;
  border: none;
  outline: none;
}
.entrust_content .price span:last-child,
.entrust_content .num span:last-child {
  text-align: right;
  padding-right: 5px;
}
.el-dropdown {
  margin-left: auto;
  margin-right: 11px;
  border-radius: 4px;
  height: 22px;
  border: 1px solid rgba(100, 92, 92, 1);
}
.el-dropdown > span {
  padding: 2.5px 15px;
  line-height: 24px;
}
.left_icon1 {
  padding: 3px 4px;
  /* margin-left: 15px; */
  display: inline-block;
  margin-right: 4px;
  border: 1px solid rgba(0, 0, 0, 0);
}
.left_icon2 {
  padding: 3px 4px;
  /* margin-left: 10px; */
  margin-right: 4px;
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0);
}
.left_icon3 {
  padding: 3px 4px;
  /* margin-left: 10px; */
  margin-right: 4px;
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0);
}
.left_icon_border {
  border: 1px solid #bd3a3b;
  border-radius: 10%;
}
.all-icon {
  width: 14px;
  height: 2px;
  border-top: 2px solid #bd3a3b;
  border-bottom: 2px solid #3ba987;
  background-color: #776d6d;
  padding: 5px 0;
  background-clip: content-box;
  /* margin-right: 10px; */
  /* margin-left: 21px; */
  cursor: pointer;
  box-sizing: content-box;
  display: block;
}
.purchase-icon {
  width: 14px;
  height: 2px;
  border-top: 2px solid #bd3a3b;
  border-bottom: 2px solid #776d6d;
  background-color: #bd3a3b;
  padding: 5px 0;
  background-clip: content-box;
  cursor: pointer;
  box-sizing: content-box;
  display: block;
}
.sellout-icon {
  width: 14px;
  height: 2px;
  border-top: 2px solid #776d6d;
  border-bottom: 2px solid #3ba987;
  background-color: #3ba987;
  padding: 5px 0;
  background-clip: content-box;
  cursor: pointer;
  box-sizing: content-box;
  display: block;
}

.left {
  width: 290px;
  height: 100%;
  margin-right: 0.26vw;
}
.left > div {
  background: #282020;
  box-sizing: border-box;
}
.center > .left > .top {
  height: 40px;
  border-bottom: 1px solid #1b1515;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.center > .left > .top > img {
  margin-right: 10px;
}
.left > .bottom {
  height: 705px;
}
.left > .bottom ul {
  height: 100%;
}
.left > .bottom .purchase {
  height: 316px;
  overflow-y: auto;
}
/* 滚动条 */
.left > .bottom .purchase::-webkit-scrollbar {
  width: 5px;
  background: rgba(49, 41, 41, 1);
  border-radius: 3px;
}
.left > .bottom .purchase {
  /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
  -ms-overflow-style: none;
}
.left > .bottom .purchase {
  /*火狐下隐藏滚动条*/
  scrollbar-width: none; /* Firefox */
}

.center >>> .el-table__header-wrapper {
  background: #282020;
}
.center >>> .el-table__body-wrapper {
  background: #282020;
}
.center >>> tbody .el-table .cell {
  padding-right: 0;
  display: flex;
}
.center >>> .el-table__body-wrapper::-webkit-scrollbar {
  width: 5px;
  background: rgba(49, 41, 41, 1);
  border-radius: 3px;
}
.center >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  width: 5px;
  background: rgba(75, 63, 63, 1);
  border-radius: 3px;
}

.left > .bottom .purchase::-webkit-scrollbar-thumb {
  width: 5px;
  background: rgba(75, 63, 63, 1);
  border-radius: 3px;
}

.left > .bottom .purchase li {
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 7px;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  position: relative;
}
.left > .bottom .purchase li span:first-child {
  color: #bd3a3b;
  flex: 1;
}
.left > .bottom .purchase li span:nth-child(2) {
  color: #ccc3c3;
  flex: 1;
  text-align: right;
}
.left > .bottom .purchase li span:nth-child(3) {
  flex: 1;
  text-align: right;
}

.left > .bottom .sellout {
  height: 316px;
  overflow-y: auto;
}
/* 滚动条 */
.left > .bottom .sellout::-webkit-scrollbar {
  width: 5px;
  background: rgba(49, 41, 41, 1);
  border-radius: 3px;
}
.left > .bottom .sellout::-webkit-scrollbar-thumb {
  width: 5px;
  background: rgba(75, 63, 63, 1);
  border-radius: 3px;
}
.left > .bottom .sellout li {
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 7px;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  position: relative;
}
.left > .bottom .sellout li span:first-child {
  color: #3ba987;
  flex: 1;
}
.left > .bottom .sellout li span:nth-child(2) {
  color: #ccc3c3;
  flex: 1;
  text-align: right;
}
.left > .bottom .sellout li span:nth-child(3) {
  flex: 1;
  text-align: right;
}
.left > .bottom .small_title {
  height: 32px;
  font-weight: 300;
  color: rgb(255 255 255);
  line-height: 32px;
  border-bottom: 1px solid #403d3d;
  padding-left: 20px;
  padding-right: 7px;
  display: flex;
  justify-content: space-between;
}
.left > .bottom .small_title > span:first-child {
  flex: 1;
}
.left > .bottom .small_title > span:nth-child(2) {
  flex: 1;
  text-align: right;
}
.left > .bottom .small_title > span:nth-child(3) {
  flex: 1;
  text-align: right;
}

.left > .bottom .newbusiness {
  height: 40px;
  border-top: 1px solid #403d3d;
  border-bottom: 1px solid #403d3d;
}
.left > .bottom .newbusiness li {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 7px;
  height: 100%;
}
.left > .bottom .newbusiness li span:first-child {
  color: #bd3a3b;
  font-size: 16px;
  margin-right: 10px;
}
.left > .bottom .newbusiness li span:last-child {
  color: #bd3a3b;
  margin-left: auto;
}

.content {
  width: 690px;
  height: 100%;
  margin-right: 0.26vw;
}
.content .kline {
  background: #282020;
  /* margin-bottom: 0.5%; */
  height: 460px;
}
.content .entrust {
  /* background: #282020; */
  height: 280px;
  margin-top: 5px;
}

.center > .right {
  width: 290px;
  height: 100%;
}
.center > .right .top {
  background: #282020;
  height: 460px;
  /* margin-bottom: 1.2%; */
}
.center > .right .top .search {
  height: 44px;
  display: flex;
  align-items: center;
}
.center > .right .top .search input {
  width: 235px;
  height: 33px;
  background: rgba(48, 40, 40, 1);
  border-radius: 5px;
  border: 1px solid rgba(64, 61, 61, 1);
  margin: 0 9px;
  padding-left: 14px;
  font-size: 14px;
}
.center > .right .top .search img:nth-child(2) {
  width: 17px;
  height: 17px;
  margin-left: -33px;
}
.center > .right .top .search img:nth-child(3) {
  margin-left: auto;
  margin-right: 20px;
  width: 14px;
}
.top >>> .el-tabs__content {
  height: 366px;
}
.center > .right .top .price_title {
  height: 37px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
}
.center > .right .top .price_title span {
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
.center > .right .top .price_title span:first-child {
  font-size: 18px;
}
.center > .right .top .price_title span:last-child {
  flex: 2;
  margin-right: 0;
}
.center > .right >>> .el-tabs--card > .el-tabs__header .el-tabs__item {
  height: 37px;
}
.center > .right >>> .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: none;
  background: #302828;
  margin-right: 2px;
  padding: 0;
  width: 42.8px;
  text-align: center;
  color: #7c7878;
  font-size: 12px;
}
/* .center>.right >>> .el-table tbody>tr>td:first-child>div::before{
        content: '☆';
        font-size: 0.65vw;
        display: inline-block;
    } */
.center > .right >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background: #3b3636;
}
.center
  > .right
  >>> .el-tabs--card
  > .el-tabs__header
  .el-tabs__item:last-child {
  width: 110px;
  margin-right: 0;
}
.center > .right >>> .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
.center > .right >>> .el-tabs--card > .el-tabs__header {
  border: none;
}
.center > .right >>> .el-table::before {
  background: #282020;
}
.center > .right >>> .el-table td,
.el-table th.is-leaf {
  border: none;
}
.center > .right >>> .el-table th,
.el-table tr {
  background: #282020;
}
.center > .right >>> .el-table .el-table__body-wrapper tr {
  color: #ffffff;
  font-size: 11px;
  cursor: pointer;
  /* display: flex; */
  /* width: 15.41vw; */
  justify-content: space-between;
}
.center > .right >>> .el-table .el-table__body-wrapper tr td .cell {
  display: flex;
  padding: 0;
  align-items: baseline;
}
.center
  > .right
  >>> .el-table
  .el-table__body-wrapper
  tr
  td:nth-child(2)
  .cell {
  text-align: right;
  padding-right: 14px;
}
.center
  > .right
  >>> .el-table
  .el-table__body-wrapper
  tr
  td:nth-child(3)
  .cell {
  text-align: right;
  padding-right: 14px;
}
.center > .right >>> .el-tabs__item.is-active {
  color: #f5ebeb !important;
  background: #bd3a3b !important;
}
.center > .right >>> .el-table__empty-block {
  background: #282020;
}
.center > .right >>> .el-table th,
.center > .right >>> .el-table tr {
  background: #282020;
}
.center > .right >>> .el-table td,
.center > .right >>> .el-table th.is-leaf {
  border: none;
}
.center > .right >>> .el-table td,
.center > .right >>> .el-table th {
  padding: 0;
  flex: 1;
}
.center > .right >>> .el-table td:first-child {
  flex: 1.2;
  text-align: left;
}
.center > .right >>> .el-table th:first-child {
  text-align: center;
  flex: 1.2;
}
.center > .right >>> .el-table th:nth-child(2) {
  text-align: right;
}
.center > .right >>> .el-table th:nth-child(3) {
  text-align: right;
}

.center > .right .bottom {
  height: 280px;
  margin-top: 5px;
}
.center > .right .bottom .new_title {
  height: 40px;
  font-size: 14px;
  font-weight: 300;
  color: #dbd3d3;
  line-height: 39px;
  padding-left: 16px;
  background: #302828;
  border-bottom: 1px solid #1b1515;
}
.center > .right .bottom .small_title {
  height: 33px;
  font-weight: 300;
  line-height: 32px;
  border-bottom: 1px solid #403d3d;
  padding-left: 16px;
  padding-right: 8px;
  display: flex;
  justify-content: space-between;
}
.center > .right .bottom .small_title span {
  flex: 1;
}
.center > .right .bottom .small_title span:nth-child(2) {
  text-align: right;
}
.center > .right .bottom .small_title span:nth-child(3) {
  text-align: right;
}
.center > .right .bottom .new_table {
  background: #282020;
}
.center > .right .bottom .new_table ul {
  height: 207px;
  overflow-y: auto;
}
.center > .right .bottom .new_table ul li {
  display: flex;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 8px;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
}
.center > .right .bottom .new_table ul li span:first-child {
  color: #bd3a3b;
  flex: 1;
}
.center > .right .bottom .new_table ul li span:nth-child(2) {
  color: #ccc3c3;
  flex: 1;
  text-align: right;
}
.center > .right .bottom .new_table ul li span:nth-child(3) {
  flex: 1;
  text-align: right;
}

/* 滚动条 */
.center > .right .bottom .new_table ul::-webkit-scrollbar {
  width: 5px;
  background: rgba(49, 41, 41, 1);
  border-radius: 3px;
}
.center > .right .bottom .new_table ul::-webkit-scrollbar-thumb {
  width: 5px;
  background: rgba(75, 63, 63, 1);
  border-radius: 3px;
}
</style>