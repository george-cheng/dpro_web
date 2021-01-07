<template>
    <!-- 总资产 -->
    <div class="warp">
        <div>
            <p style="display:inline-block">总资产折合</p>
            <img src="~assets/image/show.png"  @click="showtola(0)"  v-if="showat" alt="" style="cursor: pointer;width: 16px;margin-left: 5px;">
            <img src="~assets/image/noshow.png"  @click="showtola(1)"  v-if="!showat" alt="" style="cursor: pointer;width: 16px;margin-left: 5px;">
        </div>
        <p v-if="balances.data && showat">{{formatDecimal(all_totalAssets,4)}} USDT ≈ {{formatDecimal(all_totalAssets*parseFloat(rate.usdt),4)}} CNY</p>
        <p v-if="!balances.data && showat">0 USDT ≈ 0 CNY</p>
        <p v-if="!showat">-- USDT ≈ -- CNY</p>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
            all_totalAssets: 0,
            showat: 1
        }
    },
    computed:{
        ...mapState(['rate','balances']),
    },
    mounted () {
        this.totalAssets()
    },
    methods: {
        /**
         * 显示&&隐藏总金额
         */
        showtola: function (a) {
            this.showat = a
        },
        formatDecimal: function (num, decimal) {
            num = num.toString()
            let index = num.indexOf('.')
            if (index !== -1) {
                num = num.substring(0, decimal + index + 1)
            } else {
                num = num.substring(0)
            }
            return parseFloat(num).toFixed(decimal)
        },
        totalAssets: function () {
            if (this.balances.code != 401) {
            let balanceList = this.balances.data.balanceList
            let s_USDT = this.balances.data.dataMap.USDT
            let s_BTC = this.balances.data.dataMap.BTC
            let s_CNYS = this.balances.data.dataMap.CNYS
            let s_totalAssets = 0
            var _this = this
            for (var b_item in balanceList){
                for (let u_item in s_USDT) {
                    if (balanceList[b_item].name == s_USDT[u_item].fShortName){
                        s_totalAssets = s_totalAssets+balanceList[b_item].total * s_USDT[u_item].lastDealPrize
                    }
                }
                for (let u_item in s_BTC) {
                    if (balanceList[b_item].name == s_BTC[u_item].fShortName){
                        s_totalAssets = s_totalAssets+balanceList[b_item].total * s_BTC[u_item].lastDealPrize
                    }
                }
                for (let u_item in s_CNYS) {
                    if (balanceList[b_item].name == s_CNYS[u_item].fShortName){
                        s_totalAssets = s_totalAssets+balanceList[b_item].total * s_CNYS[u_item].lastDealPrize
                    }
                }
            }
            _this.all_totalAssets = s_totalAssets
            }
        }
    }

}
</script>

<style scoped>
    .warp{
        width: 100%;
        height: 100%;
        background: #302828;
        padding: 6px 0 0 11px;
    }
</style>