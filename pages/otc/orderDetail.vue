<template>
    <div class="bd">
        <Header/>
        <div class="main mt5">
            <Otc-header/>
            <order-detail/>
        </div>
        <Footer/>
    </div>
</template>
<script>
import Header from '~/components/common/header.vue'
import Footer from '~/components/common/footer.vue'
import OtcHeader from '~/components/otc/Otc-Header.vue'
import orderDetail from '~/components/otc/order-detail.vue'
export default {
    data(){
        return{

        }
    },
    components:{
        Header,
        Footer,
        OtcHeader,
        orderDetail
    },
}
</script>
<style scoped>
    .bd{
        background: #1b1515;
    }
    .main{
       width: 63.54vw;
       margin-left: 18.22vw;
       min-height: 650px;
   }
</style>