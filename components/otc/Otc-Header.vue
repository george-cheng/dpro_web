<template>
    <div class="bgPart mb5">
        <ul class="flex alcenter plr5 ptb10">
            <li>
                <nuxt-link to="/otc" exact>普通交易</nuxt-link>
            </li>
            <li class="ml20">
                <nuxt-link to="/otc/order" exact>OTC订单</nuxt-link>
            </li>
            <li class="ml20" v-if="isSeller == 1">
                <nuxt-link to="/otc/business" exact>发布挂单</nuxt-link>
            </li>
            <li class="ml20" v-if="isSeller == 1">
                <nuxt-link to="/otc/businessOrder" exact>商家订单</nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{

        }
    },
    created(){
        setTimeout(() => {
           if(this.userInfo&&this.userInfo.data){
               this.$store.dispatch('getBalance',{fvId:50,url:'/api/v1/findUsdtBuinessByFuId'});
           }
        }, 1200); 
    },
    computed:{
        ...mapState(['isSeller'])
    }
}
</script>
<style scoped>
   
</style>