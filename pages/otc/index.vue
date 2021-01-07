<template>
    <div>
        <div class="bgMain">
            <Header/>
            <div class="main mt5">
                <Otc-header/>
                <div class="">
                    <div class="flex alcenter bd mb5 bgPart between w100">
                        <ul class="flex alcenter grayCor plr5">
                            <li v-for="i in 1" :key="i" class="li mr30 ptb20 curPer" :class="{'active':i == activeIndex}" @click="activeIndex = i">USDT</li>
                        </ul>
                        <div class="flex alcenter plr10">
                            <div class="relative" @mouseover="showLi = true" @mouseout="showLi = false">
                                <div class="flex alcenter plr5 selTop curPer">
                                    <img style="width:16px;height:16px;" src="~/assets/image/RMB.png" alt="">
                                    <span class="moneyType white ml5">人民币(CNY)<i class="el-icon-arrow-down ml5"></i></span>
                                </div>
                                <ul class="absolute coin_ul bgMain w100 ptb5" v-show="showLi">
                                    <li class="flex alcenter plr5 curPer white ptb5 coin_li curPer">
                                        <img style="width:16px;height:16px;" src="~/assets/image/RMB.png">
                                        <span>人民币</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="relative ml20" @mouseover="showLi02 = true" @mouseout="showLi02 = false">
                                <div class="flex alcenter plr5 selTop curPer between" style="width:130px;">
                                    <span class="moneyType white inBlock">{{payType}}</span>
                                    <i class="el-icon-arrow-down ml5 white"></i>
                                </div>
                                <ul class="absolute coin_ul bgMain w100 ptb5" v-show="showLi02">
                                    <li class="flex alcenter plr5 curPer white ptb5 coin_li curPer" @click="changePayType(1)">
                                        <span>全部支付方式</span>
                                    </li>
                                    <li class="flex alcenter plr5 curPer white ptb5 coin_li curPer" @click="changePayType(2)">
                                        <span>微信</span>
                                    </li>
                                    <li class="flex alcenter plr5 curPer white ptb5 coin_li curPer" @click="changePayType(3)">
                                        <span>支付宝</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="flex alcenter ptb30 bgPart grayCor plr5">
                        <span class="mr30">OTC可用余额  <span class="white ft16 ml10">{{fbalance}} USDT</span></span>
                        <span class="red transfer plr10 curPer" @click="transfer">资金划转</span>
                        <span class="mr30">OTC冻结金额  <span class="white ft16 ml10">{{otcWallet.frozen}} USDT</span></span>
                    </div>
                </div>
                <Flash @showBox="showBox"></Flash>
                <Optional @TransferType="TransferType"></Optional>
            </div>
            <Order-box :show="isShow" @update="update" :buyMsg="buyMsg"></Order-box>
            <Optional-box :optionalType="optionalType" :showOptionBox="showOptionBox"  @closeOptional="closeOptional" :orderMsg="orderMsg"></Optional-box>
            <Transfer :showTransferBox="showTransferBox" @closeTransferBox="closeTransferBox"></Transfer>
            <Footer/>
        </div>
    </div>
</template>

<script>
import qs from "qs";
import { mapState } from 'vuex'
import Header from '~/components/common/header.vue'
import Footer from '~/components/common/footer.vue'
import OtcHeader from '~/components/otc/Otc-Header.vue'
import Flash from '~/components/otc/Flash.vue'
import OrderBox from '~/components/otc/Order-Box.vue'
import Transfer from '~/components/otc/Transfer.vue'
import Optional from '~/components/otc/Optional.vue'
import OptionalBox from '~/components/otc/Optional-Box.vue'

export default {
    components:{
        Header,
        Footer,
        OtcHeader,
        Flash,
        OrderBox,
        Transfer,
        Optional,
        OptionalBox
    },
    data(){
        return{
            isShow:false,
            activeIndex:1,
            showLi:false,
            showLi02:false,
            showTransferBox:false,
            optionalType:'', //自选买卖类型
            showOptionBox:false, //是否显示自选买卖弹框
            orderMsg:'',
            totalCount:'',
            buyMsg:{},
            payType:'全部支付方式',
            otcWallet:{
                fbalance:0,
                frozen:0
            }
        }
    },
    created(){
        this.getOtcWallet();
    },
    mounted(){
        setTimeout(() => {
           if(this.userInfo.data){
               this.$store.dispatch('getBalance',{fvId:50,url:'/api/v1/findUsdtBuinessByFuId'});
           }
        }, 3000);
    },
    computed:{
        ...mapState(['userInfo','fbalance'])
    },
    methods:{
        showBox(data){
            this.buyMsg = data;
            this.isShow = data.show;
        },
        update(data){
            this.isShow = data;
        },
        transfer(){
            this.showTransferBox = true
        },
        closeTransferBox(data){
            this.showTransferBox = data
        },
        TransferType(data){
            this.orderMsg = data;
            this.optionalType = data.type;
            this.showOptionBox = data.show;
        },
        closeOptional(){
            this.showOptionBox = false;
        },
        changePayType(e){
            switch(e){
                case 1 : this.payType='全部支付方式';break
                case 2 : this.payType='微信';break
                case 3 : this.payType='支付宝';break
            }
        },
        getOtcWallet(){
            this.$axios("/api/v1/findUsdtBuinessByFuId?fvId=50").then(res=>{
                if(res.data.code == 200 && res.data.data != undefined){
                    this.otcWallet = res.data.data;
                }
            }).catch(error=>{
                console.log(error)
            })
        }
    }
}
</script>
<style scoped>
   .main{
       width: 64%;
       margin:6px auto;
       font-size: 0.8vw;
   }
   .bd{
       border-bottom: 1px solid #544444;
   }
   .transfer{
       margin-right: 40px;
       border: 1px solid rgba(189,58,59,1) !important;
       border-radius: 10px;
   }
   .selTop{
       height: 35px;
       border:1px solid #666;
       border-radius: 4px;
   }
   .coin_ul{
       border-radius: 3px;
   }
   .coin_li:hover{
       background:#333;
       color: #bd3a3b;
   }
   .li{
       border-bottom: 1px solid transparent;
   }
   .active{
       transition: all .3s linear;
       color: #bd3a3b;
       border-bottom: 1px solid #bd3a3b;
   }
</style>