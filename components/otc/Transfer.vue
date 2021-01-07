<template>
  <transition name="scale">
    <div class="w100 h100 fixed flex alcenter jscenter" v-show="showBox" style="top:0;left:0;">
      <div class="ptb10 plr20 bgMain radius5 white transferBox">
        <p class="tr white ft16">
          <span class="curPer" @click="close">X</span>
        </p>
        <h2 class="white mb10 tc">账户间划转</h2>
        <p class="ft12 mb5">通证种类</p>
        <el-select size="mini" v-model="coin" class="mb20 w100 black ft12">
          <el-option label="USDT" value="USDT" selected></el-option>
        </el-select>
        <div class="flex alcenter">
          <span class="plr10 radius3 inBlock flex alcenter bgWhite w40 black">
            <span>
              <span class="ft22 mr5">·</span>
            </span>
            {{type == 1?'币币账户':'法币账户'}}
          </span>
          <span class="inBlock tc w10 ft16">→</span>
          <span class="radius3 plr10 inBlock flex alcenter bgWhite w40 black">
            <span>
              <span class="ft22 mr5">·</span>
            </span>
            {{type == 1?'法币账户':'币币账户'}}
          </span>
          <span class="plr10 bgRed w8 flex alcenter jscenter" style="margin-left:2%;">
            <i @click="shift" class="el-icon-refresh ft20 curPer"></i>
          </span>
        </div>
        <p class="ft12 white mb10">
          <span class="inBlock w40 tr">余额：{{type==1?Cbalance:fbalance}} USDT</span>
          <span class="inBlock w50 tr">余额：{{type == 1?fbalance:Cbalance}} USDT</span>
        </p>
        <div class="ptb8 plr20 radius3 bdRed flex alcenter between w100 mb20">
          <label style="width:80%;">
            <input
              class="white"
              placeholder="数量"
              v-model="allNum"
              style="border:none;background:none;outline:none;"
            />
          </label>
          <span class="ft12 curPer" @click="all(type==1?Cbalance:fbalance)">全部</span>
        </div>
        <div>
          <el-button
            type="danger"
            style="width:100%"
            icon="el-icon-check"
            @click="transfer"
            :disabled="isDisable"
          >划转</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import qs from "qs";
import { mapState } from "vuex";
export default {
  props: ["showTransferBox"],
  data() {
    return {
      isDisable: false,
      showBox: "",
      coin: "USDT",
      type: 1, //币币到法币
      account01: "币币账户",
      account02: "法币账户",
      allNum: ""
    };
  },
  created() {
    setTimeout(() => {
      if (this.userInfo.data) {
        this.$store.dispatch("getChangeBalance", {
          fvId: 50,
          url: "/api/v1/findFwallet"
        });
      }
    }, 1000);
  },
  computed: {
    ...mapState(["fbalance", "Cbalance", "userInfo"])
  },
  watch: {
    showTransferBox: function(val) {
      this.showBox = val;
    }
  },
  methods: {
    close() {
      this.$emit("closeTransferBox", false);
    },
    shift() {
      //切换
      if (this.type == 1) {
        this.type = 2;
      } else {
        this.type = 1;
      }
    },
    all(num) {
      this.allNum = num;
    },
    //划转
    transfer() {
      this.isDisable = true;
      setTimeout(() => {
        this.isDisable = false;
      }, 2000);

      if (!this.allNum) {
        this.$message({
          message: "请输入划转数量",
          type: "warning"
        });
        return;
      }
      var data = {
        fuId: this.userInfo.data.id,
        type: this.type == 1 ? 1 : 2,
        amount: this.allNum,
        fvid: 50
      };
      this.$axios.setHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      this.$axios
        .post("/api/v1/capitalTransfer", qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "划转成功",
              type: "success"
            });
            this.allNum = "";
            this.$store.dispatch("getChangeBalance", {
              fvId: 50,
              url: "/api/v1/findFwallet"
            });
            this.$store.dispatch("getBalance", {
              fvId: 50,
              url: "/api/v1/findUsdtBuinessByFuId"
            });
          } else {
            this.$message.error("划转失败");
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
.transferBox {
  width: 30vw;
}
.scale-enter,
.scale-leave-to {
  transform: scale(0);
}
.scale-enter-active {
  animation: scale 0.2s;
}
.scale-leave-active {
  animation: scale 0.2s reverse;
}
@keyframes scale {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>