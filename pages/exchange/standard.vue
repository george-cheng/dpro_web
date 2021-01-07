<template>
    <div>
        <Header/>
        <div class="standard">
            <div class="top">
                <div class="overview">
                    <Overview/>
                </div>
                <div class="total_assets">
                    <TotalAssets/>
                </div>
            </div>
            <div class="center">
                <div class="business_list_and_deal">
                </div>
                <div class="center_center">
                    <div class="kline">
                        <Kline/>
                    </div>
                    <div class="business">
                        <Business/>
                    </div>
                </div>
                <div class="center_right">
                    <div class="quotation">
                        <Quotation/>
                    </div>
                </div>

            </div>
            <div class="bottom">
                <div class="entrust">
                    <Entrust/>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Header from '~/components/common/header.vue'
import Footer from '~/components/common/footer.vue'
import TotalAssets from '~/components/exchange/pro/TotalAssets.vue'
import Quotation from '~/components/exchange/pro/Quotation.vue'
import Overview from '~/components/exchange/pro/Overview.vue'
import Kline from '~/components/exchange/pro/Kline.vue'
import Entrust from '~/components/exchange/pro/Entrust.vue'
import BusinessListAndDeal from '~/components/exchange/pro/BusinessListAndDeal.vue'
import Business from '~/components/exchange/pro/Business.vue'


export default {
    layout: 'pro',
    components: {
        Header,
        Footer,
        TotalAssets,
        Quotation,
        Overview,
        Kline,
        Entrust,
        BusinessListAndDeal,
        Business
    },
    async fetch ({ store, params, $axios }) {
        // 调用vuex里面actions GET_balances去请求数据
        await store.dispatch('GET_balances')
    },
    mounted () {
        let fid = JSON.parse(localStorage.getItem("fvId"))
        let fShortName = JSON.parse(localStorage.getItem("currency"))
        let group = JSON.parse(localStorage.getItem("group"))
        if(fid != null && fid != '' && fid != undefined){
            this.$store.commit('SET_fvId', fid)
        }
        if(fShortName != null && fShortName != '' && fShortName != undefined){
            this.$store.commit('SET_currency', fShortName)
        }
        if(group != null && group != '' && group != undefined){
            this.$store.commit('SET_group', group)
        }
        this.$store.dispatch('GET_currentData')
    }

}
</script>

<style scoped>
    .standard{
        width: 1304px;
        /* height: 1104px; */
        margin: 7px auto 15px auto;
        /* background: red; */
    }
    .top{
        display: flex;
        justify-content: space-between;
    }
    .overview{
        width: 1006px;
        height: 50px;
    }
    .total_assets{
        width: 296px;
        height: 50px;
    }
    .center{
        margin-top: 5px;
        margin-bottom: 5px;
        height: 765px;
        display: flex;
        justify-content: space-between;
    }
    .business_list_and_deal{
        width: 326px;
        height: 100%;
    }
    .center_center{
        width: 672px;
        height: 100%;
    }
        .kline{
            width: 100%;
            height: 465px;
        }
        .business{
            width: 100%;
            height: 295px;
            margin-top: 5px;
        }
    .center_right{
        width: 296px;
        height: 100%;
    }
        .quotation{
            width: 100%;
            height: 465px;
        }
        .quotation >>> .el-table__body-wrapper{
            max-height: 335px !important;
        }
    .bottom{
        width: 100%;
        height: 258px;
    }
        .entrust{
            height: 100%;
        }
</style>