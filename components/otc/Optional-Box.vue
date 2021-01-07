<template>
<div>
<transition name="scale">
    <div class="flex alcenter jscenter w100 h100 fixed" v-show="showBox" style="top:0;left:0;">
        <div class="bdGray boxContent">
            <div class="title ptb10 plr10 bgPart flex alcenter between">
                <span class="white">
                    <i class="purple radius50p inBlock tc ft14" style="width:40px;line-height:40px;">{{orderMsg.buiness_name && orderMsg.buiness_name.substr(0,1)}}</i>
                    <span>{{orderMsg.buiness_name}}<i class="" :class="{'green':optionalType == 1,'red':optionalType == 2}"></i></span>
                </span>
                <span class="ft14 grayCor curPer" @click="close">X</span>
            </div>
            <div class="bgMain">
                <div class="ptb20 plr10 bdbWhite flex alcenter between">
                    <div class="flex column">
                        <span class="grayCor mb10">单价</span>
                        <span class=" ft14" :class="{'green':optionalType == 1,'red':optionalType == 2}">{{orderMsg.price}}CNY</span>
                    </div>
                    <div class="flex column">
                        <span class="grayCor mb10">支付方式</span>
                        <span class=" ft14">微信/支付宝</span>
                    </div>
                    <div class="flex alcenter ptb5 plr5 radius3"  :class="{'bdGreen':optionalType == 1,'bdRed':optionalType == 2}">
                        <input class="white" :placeholder="`请输入${optionalType == 1?'购买':'出售'}数量`" type="number" @blur="checkAmount" v-model="amount" />
                        <span class="white">USDT</span>
                    </div>
                </div>
                <div class="ptb20 plr10 flex alcenter between">
                    <div class="flex column">
                        <span class="grayCor mb10">剩余可交易数量</span>
                        <span class=" ft14 white">{{orderMsg.amount}} USDT</span>
                    </div>
                    <div class="flex column">
                        <span class="grayCor mb10">限额</span>
                        <span class="white ft14">{{orderMsg.min_trans}}-{{orderMsg.max_trans}} USDT</span>
                    </div>
                    <div class="flex alcenter ptb5 plr5 end">
                        <span class="ptb5 plr20 radius5 curPer" :class="[{'red':optionalType == 2},{'bdRed':optionalType == 2},{'green':optionalType == 1},{'bdGreen':optionalType == 1}]" @click="close">取消</span>
                        <span class="ptb5 plr20 radius5 white ml10 curPer" @click="order" :class="[{'bgRed':optionalType == 2},{'bdRed':optionalType == 2},{'bgGreen':optionalType == 1},{'bdGreen':optionalType == 1}]">下单</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </transition>
    </div>
</template>
<script>

import qs from "qs";
export default {
    props:['optionalType','showOptionBox','orderMsg'],
    data(){
        return{
            showBox:'',
            amount:''
        }
    },
    watch:{
        showOptionBox:function(val){
            this.showBox = val;
        }
    },
    methods:{
        close(){
            this.$emit('closeOptional',false)
        },
        checkAmount(){
            
        },
        //下单
        order(){
            if(!this.amount){
                this.$message({
                    message: `请输入${this.optionalType==1?'购买':'出售'}数量`,
                    type: 'warning'
                });
                return;
            };
            if(this.amount<this.orderMsg.min_trans){
                this.$message({
                    message:`数量不能小于${this.orderMsg.min_trans}`,
                    type:'warning'
                });
                return;
            };
            if(this.amount>this.orderMsg.max_trans){
                this.$message({
                    message:`数量不能大于${this.orderMsg.max_trans}`,
                    type:'warning'
                });
                return;
            }
            var data = {trans_id:this.orderMsg.trans_id,price:this.orderMsg.price,amount:this.amount};
            this.$axios.setHeader("Content-Type","application/x-www-form-urlencoded");
            this.$axios.post('/api/v1/otcOrder/enterOrderByTrans',qs.stringify(data)).then(res=>{
                this.$message({
                    message:res.data.msg,
                    type:'success'
                });
                setTimeout(()=>{
                    this.$router.push('/otc/orderDetail?id='+res.data.data.fotcOrder.order_id)
                })
            }).catch(error=>{
                console.log(error)
            })
        }
    }
}
</script>
<style scoped>
    .boxContent{
        width: 58vw;
    }
     .purple{
        background: #975c95;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>