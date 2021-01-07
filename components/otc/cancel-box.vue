<template>
    <div v-show="isShow" class="flex alcenter jscenter fixed w100 h100" style="top:0;left:0;">
        <div class="bdGray w50">
            <p class="flex alcenter between ptb10 plr20 grayCor bgGray">
                <span class="ft16">取消订单</span>
                <span class="curPer" @click="cancel">X</span>
            </p>
            <div class="ptb30 plr20 bgMain">
                <div v-if="type == 1">
                    <p class="green ft16 mb10">取消订单后不会退款，如您已付款，请勿取消订单</p>
                    <p class="ft12 white mb20">取消规则：买方当日累计3笔取消，将会限制当天的买入功能</p>
                </div>
                <p class="tr">
                    <span class="bdGray grayCor radius3 ptb5 plr20 curPer" @click="cancel">取消</span>
                    <span class="bgGreen radius3 ptb5 plr20 white ml20 curPer" @click="confirm">确认</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    props:['showCancelBox','orderId','type'],
    data(){
        return{
            isShow:''
        }
    },

    watch:{
        showCancelBox:function(data){
            this.isShow = data;
        }
    },

    methods:{

        cancel(){
            this.$emit('closeCancelBox',false)
        },

        confirm(){
            var data = {order_id:this.orderId};
            this.$axios.setHeader("Content-Type","application/x-www-form-urlencoded");
            this.$axios.post('/api/v1/otcOrder/revokeOrder',qs.stringify(data)).then(res=>{
               if(res.data.code == 200){
                   this.$message({
                       message:res.data.msg,
                       type:'success'
                   });
                   setTimeout(() => {
                       location.reload();
                   }, 1000);
               }else{
                   this.$message.error(res.data.msg)
               }
               
            }).catch(error=>{
                console.log(error)
            })
            this.$emit('closeCancelBox',false)
        }
    }
}
</script>
<style scoped>

</style>