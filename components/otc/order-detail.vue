<template>
  <div>
    <div class="bgPart">
      <p class="ptb10 plr20 ft12 white flex alcenter mb10" :class="{'bgGreen':orderMsg.order_type == 1,'bgRed':orderMsg.order_type == 2}">
        <i class="el-icon-info ft18 mr10"></i>
        下午17：00后单笔转账金额不得超过5万元。否则，如延误、银行卡被冻结等后果由买方自行负担
      </p>
      <p class="flex alcenter between plr10 ptb10 bdbWhite">
        <span class="" :class="{'green':orderMsg.order_type == 1,'red':orderMsg.order_type == 2}">{{(fType == 0 && orderMsg.order_type == 1  || (fType == 1 && orderMsg.order_type == 2))?'购买':'出售'}}USDT</span>
        <span class="grayCor">订单编号：{{orderMsg.order_id}}</span>
      </p>
      <div class="flex alcenter between ptb20 plr10 bdbWhite">
        <div class="flex column">
          <span class="ft12 mb5 grayCor">总价</span>
          <span class="ft14" :class="{'green':orderMsg.order_type == 1,'red':orderMsg.order_type == 2}">
            {{orderMsg.total}}
            <i class="ft12">CNY</i>
          </span>
        </div>
        <div class="flex column">
          <span class="ft12 mb5 grayCor">数量</span>
          <span class="ft12 white">
             {{orderMsg.amount}}
            <i class="ft12">USDT</i>
          </span>
        </div>
        <div class="flex column">
          <span class="ft12 mb5 grayCor">单价</span>
          <span class="ft12 white">
             {{orderMsg.price}}
            <i class="ft12">CNY</i>
          </span>
        </div>
      </div>
    </div>

    <!--订单待付款-->
    <div class  v-if="orderMsg.order_status == 1">
      <div class="bgPart ptb20 plr10">
        <p class="ft14 grayCor mb20" v-if="fbuinessAccount">卖家收款方式 (姓名：{{fbuinessAccount.fuName}})</p>
        <p class="mb20" v-if="fbuinessAccount">
          <span class="inBlock ptb5 plr10 bdGray flex alcenter">
            <i class="el-icon-info ft18 green mr10"></i>
            <span v-if="orderMsg.order_type ==2">买家向你以下支付方式进行转账，请注意查收</span>
            <span v-if="orderMsg.order_type ==1">请务必使用本人的支付方式向一下帐号自行转账</span>
          </span>
        </p>
        <!-- <div class="flex alcenter mb20 between white" v-if="fbuinessAccount">
          <span class="ptb5 plr20 bdGray">银行卡</span>
          <span>{{fbuinessAccount.fbankName || '无'}}</span>
          <span>{{fbuinessAccount.fbankCardNumber}}</span>
          <span>{{fbuinessAccount.fuName}}</span>
        </div> -->
        <div class="flex alcenter mb20 between white" v-if="fbuinessAccount">
          <span class="ptb5 plr20 bdGray">微信</span>
          <span>{{fbuinessAccount.fuName}}</span>
          <span>{{fbuinessAccount.fwxpayRemarks}}</span>
          <span>{{fbuinessAccount.fweChat || '无'}}</span>
          <span>
            <img style="width:80px;height:80px;" class="curPer" @click="showCode(fbuinessAccount.fwxpayReCode)" :src="api+fbuinessAccount.fwxpayReCode">
          </span>
        </div>
        <div class="flex alcenter mb20 between white" v-if="fbuinessAccount">
          <span class="ptb5 plr20 bdGray">支付宝</span>
          <span>{{fbuinessAccount.fuName}}</span>
          <span>{{fbuinessAccount.falipayRemarks}}</span>
          <span>{{fbuinessAccount.falipay || '无'}}</span>
          <span>
            <img style="width:80px;height:80px;" class="curPer" v-if="fbuinessAccount.falipayReCode" @click="showCode(fbuinessAccount.falipayReCode)" :src="api+fbuinessAccount.falipayReCode">
          </span>
        </div>
      </div>
      <div class="ptb20 plr10">
        <p class="ptb20">
          <span class="white ft16" v-if="orderMsg.order_type == 2">等待买家付款</span>
          <span class="white ft16" v-if="orderMsg.order_type == 1&&orderMsg.order_status == 1">待转账，请向对方转账</span>
          <span class="ft16 ml20 white">
            <span class=" inBlock plr5"  :class="{'bgGreen':orderMsg.order_type == 1,'bgRed':orderMsg.order_type == 2}">{{min}}</span>
            <i>:</i>
            <span class=" inBlock plr5"  :class="{'bgGreen':orderMsg.order_type == 1,'bgRed':orderMsg.order_type == 2}">{{sec}}</span>
          </span>
        </p>
        <div class="flex alcenter between">
          <div>
            <span class="ft14 green" :class="{'green':orderMsg.order_type == 1,'red':orderMsg.order_type == 2}">
              {{orderMsg.total}}
              <i class="ft12">CNY</i>
            </span>
          </div>
          <div>
          <span class="green curPer" v-if="(fType == 0 &&orderMsg.order_type ==1) || (fType == 1 && orderMsg.order_type == 2)" @click="payConfirm(orderMsg.order_id,orderMsg.total,orderMsg.order_type)">我已完成付款</span>
          <span class="green curPer ml20" v-if="(fType == 0 &&orderMsg.order_type ==1) || (fType == 1 && orderMsg.order_type == 2)" @click="cancel02(orderMsg.order_id,orderMsg.order_type)">取消订单</span>
          </div>
        </div>
      </div>
    </div>
    <!--已付款-->
    <div class  v-if="orderMsg.order_status == 2">
      <div class="bgPart ptb20 plr10">
        <p class="ft14 grayCor mb20" v-if="fbuinessAccount">卖家收款方式 (姓名：{{fbuinessAccount.fuName}})</p>
        <p class="mb20">
          <span class="inBlock ptb5 plr10 bdGray flex alcenter" v-if="(fType == 0 && orderMsg.order_type ==2) || (fType == 1 && orderMsg.order_type ==1)">
            <i class="el-icon-info ft18 mr10"  :class="{'green':orderMsg.order_type == 1,'red':orderMsg.order_type == 2}"></i>
            <span class="grayCor" v-if="(fType == 0 && orderMsg.order_type ==2) || (fType == 1 && orderMsg.order_type ==1)">买家已向你转账，请注意查收</span>
          </span>
        </p>
        <!-- <div class="flex alcenter mb20 between white" v-if="fbuinessAccount">
          <span class="ptb5 plr20 bdGray">银行卡</span>
          <span>{{fbuinessAccount.fbankName || '无'}}</span>
          <span>{{fbuinessAccount.fbankCardNumber}}</span>
          <span>{{fbuinessAccount.fuName}}</span>
        </div> -->
        <div class="flex alcenter mb20 between white" v-if="fbuinessAccount">
          <span class="ptb5 plr20 bdGray">微信</span>
          <span>{{fbuinessAccount.fuName}}</span>
          <span>{{fbuinessAccount.fwxpayRemarks}}</span>
          <span>{{fbuinessAccount.fweChat || '无'}}</span>
          <span>
            <img style="width:80px;height:80px;" v-if="fbuinessAccount.fwxpayReCode" class="curPer" @click="showCode(fbuinessAccount.fwxpayReCode)" :src="api+fbuinessAccount.fwxpayReCode">
          </span>
        </div>
        <div class="flex alcenter mb20 between white" v-if="fbuinessAccount">
          <span class="ptb5 plr20 bdGray">支付宝</span>
          <span>{{fbuinessAccount.fuName}}</span>
          <span>{{fbuinessAccount.falipayRemarks}}</span>
          <span>{{fbuinessAccount.falipay || '无'}}</span>
          <span>
            <img style="width:80px;height:80px;" v-if="fbuinessAccount.falipayReCode" class="curPer" @click="showCode(fbuinessAccount.falipayReCode)" :src="api+fbuinessAccount.falipayReCode">
          </span>
        </div>
      </div>
      <div class="ptb20 plr10">
        <p class="ptb20">
          <span class="white ft16" v-if="(fType == 1 &&orderMsg.order_type == 1) ||(fType == 0 &&orderMsg.order_type == 2)">买家已付款，请确认收款</span>
          <span class="white ft16" v-if="(fType == 0 &&orderMsg.order_type == 1) || (fType == 1 &&orderMsg.order_type == 2)">已付款，等待商家放币</span>
        </p>
        <div class="flex alcenter between">
          <div>
            <span class="ft14" :class="{'green':orderMsg.order_type == 1,'red':orderMsg.order_type == 2}">
              {{orderMsg.total}}
              <i class="ft12">CNY</i>
            </span>
          </div>
          <div>
          <span class=" curPer" :class="{'green':orderMsg.order_type == 1,'red':orderMsg.order_type == 2}" v-if="(fType == 0 && orderMsg.order_type == 2) || (fType == 1 && orderMsg.order_type == 1)" @click="payConfirm(orderMsg.order_id,orderMsg.total,orderMsg.order_type)">确认收款</span>
          </div>
        </div>
      </div>
    </div>
    <!--订单已取消-->
    <div class="ft16 grayCor bgPart ptb30 tc" v-if="orderMsg.order_status == 4">
      订单已取消，不可查看支付方式
    </div>
    <!--订单已成功-->
    <div class="ft16 grayCor bgPart ptb30 tc" v-if="orderMsg.order_status == 3">
      <i class="el-icon-success green ft18 mr10"></i>订单交易成功
    </div>
    <p class="tc mt20" v-if="orderMsg.order_type == 1&&orderMsg.order_status == 1">请在有效时间内向商家转账，否则订单将会取消</p>
    <div v-if="showError" class="tc ptb30 ft16 grayCor">{{errorMsg}}</div>
    <!--注意事项-->
    <ul class="mt20 mb20">
      <li class="lh20">1、如何查看数字资产</li>
      <li class="lh20">OTC交易结束后，您可以在OTC资产中查看您的数字货币，您也可以点击转出，将数字货币转到币币交易市场，然后进行币币交易。</li>
      <li class="lh20">怎样查找历史订单？</li>
      <li class="lh20">订单会记录在OTC交易-OTC订单中</li>
    </ul>
    <cancel-box :showCancelBox = 'showCancelBox' @closeCancelBox = 'closeCancelBox' :orderId="orderId" :type="type"></cancel-box>
    <pay-confirm :fType="fType" :showConfirmBox = "showConfirmBox" @closeConfirmBox = 'closeConfirmBox' :orderId="orderId" :total="total" :orderType="orderType"></pay-confirm>
    <div class="shadow flex" v-if="isShow" @click="isShow = false">
      <img :src="codeImg" class="h80">
    </div>
  </div>
</template>

<script>
import cancelBox from './cancel-box.vue'
import payConfirm from './pay-confirm.vue'
export default {

    components:{
        cancelBox,
        payConfirm
    },

    data(){
        return{
            type:'', //1：买 2：卖
            status:0,  
            orderMsg:'',
            fbuinessAccount:'',
            showCancelBox:false, //是否显示取消订单弹框
            showConfirmBox:false,  //是否显示确认付款弹框
            orderId:'',
            min:'',
            sec:'',
            total:'',
            orderType:'',
            showTime:true,
            fType:'',
            showError:false,
            api:'https://dpro-main.oss-cn-hongkong.aliyuncs.com/',
            codeImg:'',
            isShow:false
        }
    },
    created(){
      this.fType = this.$route.query.fType;
      this.getOrderDetail(this.$route.query.id);
    },
    methods:{
        showCode(e){
          this.isShow = true;
          this.codeImg = this.api+e;
        },
        cancel02(id,type){
            this.orderId = id;
            this.type = type;
            this.showCancelBox = true
        },
        closeCancelBox(data){
            this.showCancelBox = data;
        },
        payConfirm(id,total,orderType){
            this.showConfirmBox = true;
            this.orderId = id;
            this.total = total;
            this.orderType = orderType;
        },
        closeConfirmBox(data){
            this.showConfirmBox = data;
        },
        getOrderDetail(id){
          var url;
          if(this.fType == 1){
            url = '/api/v1/otcOrder/buinessFindByOrderId'
          }else{
            url = '/api/v1/otcOrder/findByOrderId'
          }
          this.$axios(url+'?order_id='+id).then(res=>{
                if(res.data.code == 200){
                    this.orderMsg = res.data.data.fotcOrder;
                    this.fbuinessAccount =  res.data.data.fbuinessAccount;
                    this.goTime(res.data.data.fotcOrder.place_time);
                }else{
                    this.showError = true;
                    this.errorMsg = res.data.msg;
                    this.$message({
                      message:res.data.msg,
                      type:'warning'
                    })
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        //倒数计时
        goTime(orderTime){
         var timer = setInterval(() => {
            var prevTime = new Date(orderTime).getTime()+30*60*1000;
            var nowTime = new Date().getTime();
            var times = prevTime - nowTime;
            var m = Math.floor(times/1000/60);
            var s = Math.floor(times/1000-60*m);
            this.min = Math.floor(times/1000/60) < 10?'0'+Math.floor(times/1000/60):Math.floor(times/1000/60);
            this.sec = Math.floor(times/1000-60*m)<10?'0'+Math.floor(times/1000-60*m):Math.floor(times/1000-60*m);
            if(times<=1000){
              clearInterval(timer);
              this.showTime = false;
              // location.reload();
            }
          }, 1000);
          
        }
    }
};

</script>

<style scoped>
  .shadow{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
  }
  .shadow img{
    height: 80%;
  }
</style>