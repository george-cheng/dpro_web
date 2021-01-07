<template>
    <div>
        <Header/>
        <div class="main mt5">
            <Otc-header/>
            <order-list url="/api/v1/otcOrder/buinessOrderList"></order-list>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Header from '~/components/common/header.vue'
import Footer from '~/components/common/footer.vue'
import OtcHeader from '~/components/otc/Otc-Header.vue'
import orderList from '~/components/otc/order-list.vue'
export default {
    components:{
        Header,
        OtcHeader,
        Footer,
        orderList
    }
}
</script>

<style scoped>
    .main{
       width: 63.54vw;
       margin-left: 18.22vw;
   }
</style>