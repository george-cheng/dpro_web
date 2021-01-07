<template>
<div>
<Header/>
  <div class="main mt5">
      <Otc-header/>
      <!--头部-->
      <div class="ptb10 plr10 bgPart mb10">
          <p>
              <!-- <img src="" class="ml10"> -->
              <span class="white ft16">CNY 对 USDT</span>
          </p>
          <P class="grayCor mt10">
              <span class="mr10">实时价：￥{{msg.realTimePrice}}</span>
              <span class="mr10">日涨跌：{{msg.riseFall}}</span>
              <span class="mr10">最高价：￥{{msg.maxPrice}}</span>
              <span class="mr10">最低价：￥{{msg.minPrice}}</span>
          </P>
      </div>
      <!--买卖输入框-->
      <div class="bgPart ptb10 plr10 flex">
          <div class="flex1">
              <p class="white ptb15 bdbWhite">买入USDT ( USDT余额：<span class="green">{{fbalance}}</span> )</p>
              <p class="green mt10 mb20">如何买入</p>
              <el-input class="ft12 mb10 grayCor" v-model="buyPrice" placeholder="买入估价CNY"></el-input>
              <el-input class="ft12 mb10 grayCor" v-model="buyNum" placeholder="买入量USDT"></el-input>
              <el-input class="ft12 mb10" disabled v-model="buyMoney" placeholder="金额CNY"></el-input>
              <p class="tc green mt10 mb10">《交易须知》</p>
              <div class="tc ptb10 ft14 bgGreen radius5 white curPer orderBtn" @click="order(2)">立即买入</div>
          </div>
          <!--卖出-->
          <div class="flex1 ml10">
              <p class="white ptb15 bdbWhite">卖出USDT ( USDT余额：<span class="red">{{fbalance}}</span> )</p>
              <p class="red mt10 mb20">如何卖出</p>
              <el-input class="ft12 mb10 grayCor" v-model="sellPrice" placeholder="卖出估价CNY"></el-input>
              <el-input class="ft12 mb10 grayCor" v-model="sellNum" placeholder="卖出量USDT"></el-input>
              <el-input class="ft12 mb10 grayCor" disabled v-model="sellMoney" placeholder="金额CNY"></el-input>
              <p class="tc red mt10 mb10">《交易须知》</p>
              <div class="tc ptb10 ft14 bgRed radius5 white curPer orderBtn" @click="order(1)">立即卖出</div>
          </div>
      </div>
      <!--市场挂单-->
      <div class="ptb20">
          <p class="white bdbWhite ptb15 plr10">市场挂单 (只显示在线商家)</p>
          <p class="flex ptb10 bdbWhite plr10">
              <span class="flex1">类型</span>
              <span class="flex1">价格(cny)</span>
              <span class="flex1">数量(USDT)</span>
              <span class="flex1">商家姓名</span>
              <span class="flex1">状态</span>
              <span class="flex1 ">发布时间</span>
              <span class="flex1 tr">操作</span>
          </p>
          <ul class="ul">
              <li v-for="(item,i) in list" :key="i" class="flex alcenter ptb10 grayCor bdbWhite plr10" style="border-color:#333;">
                <span class="flex1" :class="{'green':item.type == 2,'red':item.type == 1}">{{item.type == 1?'卖出':'买入'}}</span>
                <span class="flex1">{{item.price}}</span>
                <span class="flex1">{{item.amount}}</span>
                <span class="flex1">{{item.buiness_name}}</span>
                <span class="flex1">{{item.status==1?'挂单中':'已撤销'}}</span>
                <span class="flex1">{{item.create_time}}</span>
                <span class="flex1 tr red curPer" @click="cancel(item.trans_id,i)" v-if="item.status==1">下架</span>
                <span class="flex1 tr" v-else>--</span>
              </li>
          </ul>
          <div class="tc ptb20">
              <el-pagination :total="total" page-size="10" background small  layout="total, prev, pager, next" @prev-click="prev" @next-click="next" @current-change="current"></el-pagination>
          </div>
      </div>
  </div>
  <Footer/>
  </div>
</template>

<script>
import qs from 'qs'
import Header from '~/components/common/header.vue'
import Footer from '~/components/common/footer.vue'
import OtcHeader from '~/components/otc/Otc-Header.vue'
import {mapState} from 'vuex'
export default {
    components:{
        Header,
        Footer,
        OtcHeader
    },
    data(){
        return{
            market_id:'',
            buyPayType:[],
            sellPayType:[],
            msg:'',
            min_trans:'',
            max_trans:'',
            list:[],
            page:1,
            total:'',
            showMsg:'',
            isShow:'',
            buyPrice:'',
            buyNum:'',
            sellPrice:'',
            sellNum:'',
        }
    },
    mounted(){
        this.getCoinMsg();
        this.getMarketMsg(1,1);
        this.getMarketList();
        setTimeout(() => {
           if(this.userInfo.data){
               this.$store.dispatch('getBalance',{fvId:50,url:'/api/v1/findUsdtBuinessByFuId'});
           }
        }, 1000);
    },
    computed:{
        ...mapState(['userInfo','fbalance']),
        buyMoney(){
            return this.buyPrice*this.buyNum || "";
        },
        sellMoney(){
            return this.sellPrice*this.sellNum || "";
        }
    },
    watch:{

    },
    methods:{
        getCoinMsg(){
            this.$axios.get('/api/v1/findCyRealTimeInfo?fvId=50').then(res=>{
                if(res.data.code == 200){
                    this.msg = res.data.data;
                }
            })
        },
        getMarketMsg(type, page) {
        this.$axios
            .get("/api/v1/otcMarket/info?fvid=50")
            .then(res => {
            if (res.data.code == 200) {
                var data = res.data.data;
                this.min_trans = data.rows[0].min_trans;
                this.max_trans = data.rows[0].max_trans;
                var fid = data.rows[0].fid;
                this.market_id = fid;
            }else{
            }
            })
            .catch(error => {
            console.log(error);
            });
    },
    getMarketList() {
       this.list = [];
       this.$axios.setHeader("Content-Type","application/x-www-form-urlencoded");
      this.$axios
        .get(
          '/api/v1/otcTrans/transList?page='+this.page+'&pageSize=10'
        )
        .then(res => {
          var data = res.data;
          if(data.code ==200 ){
              this.list = data.data.rows;
              this.total = data.data.total;
              this.isShow = true;
          }else{
              this.isShow = false;
              this.showMsg = data.msg;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    prev(){
        this.page--;
        this.getMarketList();
    },
    next(){
        this.page++;
        this.getMarketList();
    },
    current(e){
        this.page = e;
        this.getMarketList();
    },
    //发布
    order(type){
     if(type == 2){
         if(!this.buyPrice){
          this.$message({
              message:'请输入买入价',
              type:'warning'
          });
          return;
      };
      if(!this.buyNum){
          this.$message({
              message:'请输入买入量',
              type:'warning'
          });
          return;
      };
     }else{
         if(!this.sellPrice){
          this.$message({
              message:'请输入卖出价',
              type:'warning'
          });
          return;
      };
      if(!this.sellNum){
          this.$message({
              message:'请输入卖出量',
              type:'warning'
          });
          return;
      }
     }
      var price,amount;
      price = type == 2?this.buyPrice:this.sellPrice;
      amount = type == 2?this.buyNum:this.sellNum;
      var data = {market_id:this.market_id,price:price,amount:amount,type:type};
      this.$axios.setHeader("Content-Type","application/x-www-form-urlencoded");
      this.$axios.post('/api/v1/otcTrans/publishTrans',qs.stringify(data)).then(res=>{
          if(res.data.code == 200){
              this.$message({
              message:res.data.msg,
              type:'success'
            });
            this.buyPrice = '';
            this.buyNum = '';
            this.buyMoney = '';
            this.sellPrice = '';
            this.sellNum = '';
            this.sellMoney = '';
            setTimeout(()=>{
                this.page = 1;
                this.getMarketList();
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
    },
    //撤销
    cancel(id,i){
      var data = {trans_id:id};
      this.$axios.setHeader("Content-Type","application/x-www-form-urlencoded");
      this.$axios.post('/api/v1/otcTrans/revokeTrans',qs.stringify(data)).then(res=>{
          if(res.data.code == 200){
              this.$message({
              message:res.data.msg,
              type:'success'
              });
              setTimeout(()=>{
                  this.getMarketList();
              },1500)
          }else{
              this.$message({
              message:res.data.msg,
              type:'warning'
            })
          }
      })
    }
  }
}
</script>

<style>
    .main{
        width: 63.54vw;
        margin-left: 18.22vw;
    }
    .el-checkbox__label{
        font-size: 12px!important;
    }
    .el-checkbox{
        margin-right: 5px;
    }
    .el-input__inner{
        background: none!important;
        /*border-color: #555353!important;*/
    }
    .orderBtn:hover{
        opacity: 0.8;
    }
    .el-checkbox__inner{
        border-color: #433e3e;
        background: none;
    }
    .ul{
        min-height: 300px;
    }
</style>
