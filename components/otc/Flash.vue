<template>
    <div class="">
        <transition name="fade">
        <div class="ptb10 plr5 bgPart flash mt5" v-if="isShow">
        <h2 class="mb20 white">闪电交易</h2>
        <div class="flex alcenter between plr5">
            <div class="ft14">
                <p class="mb10">
                    <span class="ft12 grayCor">购买参考价格</span>
                    <span class="ft14 green">1USDT≈￥{{buyPrice}}</span>
                </p>
                <el-input class="w100 mb10 bgPart white" placeholder="购买数量" v-model="buyNum"><template slot="append">USDT</template></el-input>
                <el-input class="w100 mb10 white" placeholder="金额" v-model="buyMoney"><template slot="append">CNY</template></el-input>
                <el-button class="w100 bgGreen white buy" style="border:none" @click="buy(1)" v-if="userInfo.data">购买USDT</el-button>
                <el-button class="w100 bgGreen white buy" style="border:none" @click="login" v-else>请先登录</el-button>
            </div>
            <div class="ml20 ft14">
                <p class="mb10">
                    <span class="ft12 grayCor">出售参考价格</span>
                    <span class="ft14 red">1USDT≈￥{{sellPrice}}</span>
                </p>
                <el-input class="w100 mb10 white" v-model="sellNum" placeholder="出售数量"><template slot="append">USDT</template></el-input>
                <el-input class="w100 mb10 white" v-model="sellMoney" placeholder="金额"><template slot="append">CNY</template></el-input>
                <el-button class="w100 bgRed white sell" @click="sell(2)" style="border:none" v-if="userInfo.data">出售USDT</el-button>
                <el-button class="w100 bgRed white sell" style="border:none" @click="login" v-else>请先登录</el-button>
            </div>
        </div>
        </div>
        </transition>
        <div class="flex alcenter jscenter">
            <span class="ptb5 plr20 white inBlock bgPart ft14 curPer" style="border-bottom-left-radius:3px;border-bottom-right-radius:3px;" @click="hide"><i class=" radius50p bdWhite mr5" :class="{'el-icon-arrow-up':isShow,'el-icon-arrow-down':!isShow}"></i>{{isShow?'收起闪电交易':'展开闪电交易'}}</span>
        </div>
    </div>
</template>

<script>
import qs from "qs";
import {mapState} from 'vuex';
export default {
    data(){
        return{
            isShow:true,
            buyNum:'',
            sellNum:'',
            buyPrice:'',
            sellPrice:'',
            market_id:''
        }
    },
    created(){
        this.getRealPrice();
    },
    computed:{
        ...mapState(['userInfo']),
        buyMoney:{
            get(){
                return this.buyNum*this.buyPrice || '';
            },
            set(val){
                this.buyNum = val/this.buyPrice;
            }
        },
        sellMoney:{
            get(){
                return this.sellNum*this.sellPrice || '';
            },
            set(val){
                this.sellNum = val/this.sellPrice;
            }
        }
    },
    methods:{
        buy(type){
            if(this.buyNum == ''||this.buyMoney==''){
                this.$message({
                    message:'请输入购买数量或金额',
                    type:'warning'
                });
                return;
            };
            var showMsg = {
                show:true,
                buyPrice:this.buyPrice,
                buyNum:this.buyNum,
                buyMoney:this.buyMoney,
                market_id:this.market_id //市场id
            }
            this.$emit('showBox',showMsg)
            this.$store.commit('changeType',type);
        },
        sell(type){
            if(this.sellNum == ''||this.sellMoney==''){

            }
            var showMsg = {
                show:true,
                buyPrice:this.sellPrice,
                buyNum:this.sellNum,
                buyMoney:this.sellMoney,
                market_id:this.market_id //市场id
            }
            this.$emit('showBox',showMsg)
            this.$store.commit('changeType',type);
        },
        login(){
            this.$router.push('/login')
        },
        hide(){
            this.isShow = !this.isShow
        },
        getRealPrice(){
            this.$axios.get('/api/v1/otcMarket/info?fvid=50').then((res)=>{
                if(res.data.code == 200){
                    this.market_id = res.data.data.rows[0].fid;
                    this.buyPrice = res.data.data.rows[0].sell_price;
                    this.sellPrice = res.data.data.rows[0].buy_price;
                }
            }).catch(error=>{
                console.log(error)
            })
        }
    }
}
</script>
<style scoped>
    .flash >>> .el-input__inner{
        background: rgba(0, 0, 0, 0);
        color: #fff;
    }
    .buy:hover{
        background: #3b6d54;
        opacity: 0.8;
        color:#fff;
    }
    .sell:hover{
        background: #bd3a3b;
        opacity: 0.8;
        color:#fff;
    }
    .flash>>>.el-input-group__append{
        background: none!important;
        border-color: #555!important;
    }
    .fade-enter-active{
        transition: all .3s linear;
        height:235px;
        overflow: hidden;
    }
    .fade-leave-active{
        transition: all .3s linear;
        height:235px;
        overflow: hidden;
    }
    .fade-enter,.fade-leave-to{
        height:0px;
    }
</style>
