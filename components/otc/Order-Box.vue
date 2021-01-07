<template>
<transition name="scale">
  <div v-show="showBox" class="w100 h100 fixed flex alcenter jscenter" style="top:0">
    <div class="boxContent bdGray radius3 hidden fixed">
      <div class="top bgPart flex alcenter between ptb10 plr20 grayCor ft14 w100">
        <span>{{orderType ==1?'购买':'出售'}}USDT</span>
        <span class="curPer" @click="close">X</span>
      </div>
      <div class="ptb30 plr20 bgMain grayCor">
        <p class="mb10">参考单价：{{buyMsg.buyPrice}} CNY/USDT</p>
        <p class="white mb5">付款方式</p>
        <div class="flex alcenter mb20 w100 white">
          <div class="flex1 ptb8 bdRed tc radius3 curPer" :class="{'bdGreen':orderType == 1,'bdRed':orderType == 2}">微信 / 支付宝 </div>
        </div>
        <p class="flex alcenter between mb30">
          <span class="white">成交单价：</span>
          <span class="" :class="{'green':orderType == 1,'red':orderType == 2}">{{buyMsg.buyPrice}} CNY/USDT</span>
        </p>
        <p class="flex alcenter between mb30">
          <span class="white">成交数量：</span>
          <span class="grayCor">{{buyMsg.buyNum}} USDT</span>
        </p>
        <p class="flex alcenter between mb30">
          <span class="white">实付金额：</span>
          <span class="grayCor">{{buyMsg.buyMoney}} CNY</span>
        </p>
        <div class="ptb8 tc white radius3 curPer order" @click="order" :class="{'bgGreen':orderType == 1,'bgRed':orderType == 2}">{{orderType ==1?'购买':'出售'}}USDT</div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import qs from "qs";
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    show: Boolean,
    buyMsg:Object
  },

  data() {
    return {
      showBox: ""
    };
  },

  computed: {
    ...mapState(["orderType"])
  },

  watch: {
    show: function(val) {
      console.log(val);
      this.showBox = val;
    }
  },

  methods: {
    close() {
      this.$emit("update", false);
    },
    //下单
    order(){
      var data = {market_id:this.buyMsg.market_id,price:this.buyMsg.buyPrice,amount:this.buyMsg.buyNum,type:this.orderType};
      this.$axios.setHeader("Content-Type","application/x-www-form-urlencoded");
      this.$axios.post('/api/v1/otcOrder/enterOrder',qs.stringify(data)).then(res=>{
          if(res.data.code == 200){
              this.$message({
              message:res.data.msg,
              type:'success'
            });
            setTimeout(()=>{
              this.$router.push('/otc/orderDetail?id='+res.data.data.fotcOrder.order_id+'&fType=0')
            },1500)
          }else{
            this.$message({
              message:res.data.msg,
              type:'warning'
            })
          }
      }).catch(error=>{
          console.log(error)
      })
    }
  }
};
</script>
<style scoped>
.boxContent {
  width: 30vw;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
}
.order:hover {
  opacity: 0.8;
}
.scale-enter,.scale-leave-to{
    transform: scale(0)
}
.scale-enter-active{
    animation: scale .2s;
}
.scale-leave-active{
    animation: scale .2s reverse;
}
@keyframes scale {
    0%{
        transform: scaleY(0)
    }
    100%{ 
        transform: scaleY(1)
    }
}
</style>