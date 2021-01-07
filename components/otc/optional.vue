<template>
  <div>
    <div class="ptb10 plr5 mt5 bgPart mb5">
      <div class="flex alcenter mb20">
        <span class="ft20 white mr20">自选交易</span>
        <span class="ft12 red">
          <i class="el-icon-success mr5"></i
          >为了降低您的交易风险，认证用户已向平台缴纳保证金请放心交易
        </span>
      </div>
      <p class="flex alcenter ft18 mb20">
        <span
          :class="{ green: type == 1 }"
          class="curPer"
          @click="changeType(1)"
          >购买</span
        >
        <span
          class="ml10 curPer"
          :class="{ red: type == 2 }"
          @click="changeType(2)"
          >出售</span
        >
      </p>
      <ul>
        <li class="flex alcenter ptb10 plr10 white bgGray">
          <span class="flex1" style="flex: 1.4">卖家(成单率/成单)</span>
          <span class="flex1" style="flex: 1.2">单笔限额</span>
          <span class="flex1">剩余数量</span>
          <span class="flex1">单价</span>
          <span class="flex1">支付方式</span>
          <span class="flex1" style="flex: 0.5">交易</span>
        </li>
        <li
          class="flex alcenter ptb10 plr10 white bdbWhite"
          v-for="(item, index) in list"
          :key="index"
        >
          <span class="flex1 flex alcenter" style="flex: 1.4">
            <span
              class="inBlock purple radius50p tc ft14"
              style="width: 30px; height: 30px; line-height: 30px"
              >{{ item.buiness_name.substr(0, 1) }}</span
            >
            <span class="ml5 grayCor">
              <i class="white ft14">{{ item.buiness_name }}</i>
            </span>
          </span>
          <span class="flex1 white" style="flex: 1.2">{{ min_trans }}-{{ max_trans }} USDT</span>
          <span class="flex1 white">{{ item.amount }} USDT</span>
          <span class="flex1" :class="{ green: type == 1, red: type == 2 }"
            >{{ item.price }} CNY</span
          >
          <span class="flex1">微信/支付宝</span>
          <span
            v-if="userInfo.data"
            class="flex1 curPer"
            :class="{ green: type == 1, red: type == 2 }"
            style="flex: 0.5"
            @click="
              order({
                type: type,
                show: true,
                price: item.price,
                trans_id: item.trans_id,
                buiness_name: item.buiness_name,
                amount: item.amount,
                min_trans: min_trans,
                max_trans: max_trans,
              })
            "
            >{{ type == 1 ? "购买" : "出售" }}</span
          ><nuxt-link
            to="/login"
            :class="[{ green: type == 1 }, { red: type == 2 }]"
            class="curPer"
            v-else
            >请先登录</nuxt-link
          >
        </li>
        <li v-if="!isShow" class="tc ptb30 grayCor ft14">{{ msg }}</li>
        <div class="flex jscenter mt10" v-if="isShow">
          <el-pagination
            layout="prev, pager, next"
            background
            :small="true"
            :total="total"
            @prev-click="prev"
            @next-click="next"
            :page-size="pageSize"
            @current-change="current"
          ></el-pagination>
        </div>
      </ul>
    </div>
    <div>
      <p class="plr5 bgGray ft14 ptb10 mb20 white">买卖须知</p>
      <ul class="white ft12 mb20">
        <li class="lh40">
          1、买卖商户均为实地考察认证商户，并提供5000USDT保证金您每次兑换会冻结商户资产不够时，不能接单可放心兑换
        </li>
        <li class="lh40">
          2、在转账过程中切勿备注类似BTC、USDT等一切与虚拟交易相关的敏感信息，以免造成您的汇款被拦截，银行卡被冻结等问题，因此到账延迟商家有权拒接成交
        </li>
        <li class="lh40">
          3、请使用本人实名绑定的支付方式进行汇款否则卖家可拒绝成交并投诉
        </li>
        <li>4、如需申请成为商户请发邮件到xxx.com</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
import { mapState } from "vuex";
export default {
  data() {
    return {
      type: 1,
      min_trans: "", //最小限额
      max_trans: "", //最大限额
      list: [],
      total: 0,
      pageSize: 10,
      page: 1, //当前页码
      isShow: false,
      msg: "",
    };
  },
  created() {
    this.getMarketMsg(1, this.page,this.pageSize);
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    order(obj) {
      //type 1:买 2:卖
      this.$emit("TransferType", obj);
    },
    changeType(e) {
      this.type = e;
      this.getMarketMsg(e, this.page,this.pageSize);
    },
    getMarketMsg(type, page, pageSize) {
      this.$axios
        .get("/api/v1/otcMarket/info?fvid=50")
        .then((res) => {
          if (res.data.code == 200) {
            var data = res.data.data;
            this.min_trans = data.rows[0].min_trans;
            this.max_trans = data.rows[0].max_trans;
            var fid = data.rows[0].fid;
            this.getMarketList(fid, type, page, pageSize);
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMarketList(market_id, type, page, pageSize) {
      this.list = [];
      this.$axios
        .get(
          `/api/v1/otcTrans/transInfo?market_id=${market_id}&type=${type}&page=${page}&pageSize=${pageSize}`
        )
        .then((res) => {
          var data = res.data;
          if (data.code == 200) {
            this.list = data.data.rows;
            this.total = data.data.total;
            this.isShow = true;
          } else {
            this.isShow = false;
            this.msg = data.msg;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    prev() {
      this.page--;
      this.getMarketMsg(1, this.page,this.pageSize);
    },
    next() {
      this.page++;
      this.getMarketMsg(1, this.page,this.pageSize);
    },
    current(e) {
      this.page = e;
      this.getMarketMsg(1, this.page,this.pageSize);
    },
  },
};
</script>
<style scoped>
.purple {
  background: #975c95;
}
</style>
