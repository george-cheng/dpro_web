<template>
  <div v-show="isShow" class="fixed alcenter jscenter flex w100 h100" style="top:0;left:0">
    <div class="bdGray confirmBox">
      <p class="ptb10 plr10 bgGray grayCor flex alcenter between">
        <span class="ft16">{{orderType == 1?'转账确认':'确认收款'}}</span>
        <span class="curPer" @click="cancel">X</span>
      </p>
      <div class="ptb20 plr10 grayCor bgMain">
        <p class="mb10">金额</p>
        <p class="ft14 mb10 green">
          <span>{{totalMoney}}</span>
          <span class="ft12">CNY</span>
        </p>
        <p class="tr">
          <span class="grayCor bdGray plr20 ptb5 mr10 radius3 curPer" @click="cancel">取消</span>
          <span
            class="bgGreen white ptb5 plr20 radius3 curPer"
            v-if="fType == 0 && orderType == 1 || fType == 1 && orderType == 2"
            @click="pay"
          >确认</span>
          <span
            class="bgGreen white ptb5 plr20 radius3 curPer"
            v-if="fType == 0 && orderType == 2 || fType == 1 && orderType == 1"
            @click="confirmReceive"
          >确认</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  props: ["showConfirmBox", "orderId", "total", "orderType","fType"],

  data() {
    return {
      isShow: false,
      totalMoney: ""
    };
  },

  watch: {
    showConfirmBox: function(data) {
      this.isShow = data;
    },
    total: function(data) {
      this.totalMoney = data;
    }
  },

  methods: {
    cancel() {
      this.$emit("closeConfirmBox", false);
    },
    //付款
    pay() {
      var url;
      url = this.fType == 1?'/api/v1/otcOrder/buinessEnterPay':'/api/v1/otcOrder/userEnterPay'
      var data = { order_id: this.orderId };
      this.$axios.setHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      this.$axios
        .post(url, qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            setTimeout(() => {
              location.reload();
            }, 1000);
          } else {
            this.$message({
              message: res.data.msg,
              type: "fail"
            });
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //收款
    confirmReceive() {
      var url;
      url = this.fType == 1?'/api/v1/otcOrder/buinessEnterColl':'/api/v1/otcOrder/userEnterColl'
      var data = { order_id: this.orderId };
      this.$axios.setHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      this.$axios
        .post(url, qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.$emit("closeConfirmBox", false);
            setTimeout(() => {
              location.reload();
            }, 1500);
          } else {
            this.$message.error(res.data.msg);
            this.$emit("closeConfirmBox", false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.confirmBox {
  width: 30vw;
}
</style>