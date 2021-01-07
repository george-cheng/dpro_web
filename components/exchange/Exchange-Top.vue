<template>
    <div class="top" v-if="priceData.length>0">
        <div class="left">
            <div class="mars_usdt">
                <p><span>{{this.currency}}</span>/{{this.group}}</p>
                <p><img src="~assets/image/ziliao.png" style="width: 12px;" alt=""> {{this.currency}} 资料</p>
            </div>
            <div class="top_price">
                <p>{{priceData[0].lastDealPrize}}
                    <span :style="'color:'+(priceData[0].fupanddown>0?'#1BD098':(priceData[0].fupanddown==0?'#CCC3C3':'#FF4D4E'))+';'">{{ priceData[0].fupanddown }}%</span>
                    </p>
                <p>￥{{cny_pric.toFixed(4)}}</p>
            </div>
            <div class="right">
                <div>
                    <p>24H最高价</p>
                    <p>{{priceData[0].highestPrize24}} <span>{{priceData[0].fShortName}}</span></p>
                </div>
                <div>
                    <p>24H最低价</p>
                    <p>{{priceData[0].lowestPrize24}} <span>{{priceData[0].fShortName}}</span></p>
                </div>
                <div>
                    <p>24H成交量</p>
                    <p>{{priceData[0].volumn}} <span>{{priceData[0].fShortName}}</span></p>
                </div>
            </div>
        </div>
        <div class="right">
            <div>
                <p style="display:inline-block">总资产折合</p>
                <img src="~assets/image/show.png"  @click="showtola(0)"  v-if="showat" alt="" style="cursor: pointer;width: 16px;margin-left: 5px;">
                <img src="~assets/image/noshow.png"  @click="showtola(1)"  v-if="!showat" alt="" style="cursor: pointer;width: 16px;margin-left: 5px;">
            </div>
            <p v-if="balances.data && showat">{{formatDecimal(all_totalAssets,4)}} USDT ≈ {{formatDecimal(all_totalAssets*parseFloat(rate.usdt),4)}} CNY</p>
            <p v-if="!balances.data && showat">0 USDT ≈ 0 CNY</p>
            <p v-if="!showat">-- USDT ≈ -- CNY</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
      return {
          all_totalAssets: 0,
          showat: 1
      }
    },
    computed:{
        ...mapState(['priceDatas','rate','group','currency','fvId','balances']),
        priceData: function () {
            let arr = []
            for (let i in this.priceDatas){
                if( i == this.group)
                for (let j in this.priceDatas[i]){
                    if(this.priceDatas[i][j].fid == this.fvId){
                        arr.push(this.priceDatas[i][j])
                    }
                }
            }
            return arr
        },
        cny_pric: function(){
            return this.priceData[0].lastDealPrize*parseFloat(this.rate.usdt);
        },
    },
    mounted(){
        this.totalAssets()
        this.$store.dispatch('GET_rate')
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
        handleClick(tab, event) {
            console.log(tab, event)
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
    .top{
        /* width: 67.91vw; */
        width: 100%;
        /* height: 2.6vw; */
        height: 50px;
        margin-bottom: 0.26vw;
        display: flex;
        color: #ffffff;
    }
    .top>div{
        box-sizing: border-box;
        background: #282020;
    }
    .top>.left{
        width: 985px;
        height: 100%;
        margin-right: 0.104vw;
        display: flex;
        align-items: center;
    }
    .top>.left>.mars_usdt{
        margin-left: 1.04vw;
        margin-top: 0.2vw;
        margin-right:  1.77vw;
    }
    .top>.left>.mars_usdt>p{
        line-height: 20px;
        font-size: 12px;
    }
    .top>.left>.mars_usdt>p>span{
        font-size: 22px;
    }
    .top>.left>.mars_usdt>p:last-child{
        color: #BD3A3B;
    }
    .top>.left .top_price{
        font-size: 18px;
    }
    .top>.left .top_price span{
        font-size: 12px;
    }
    .top>.left .top_price>p:nth-child(2){
        font-size: 0.72vw;
    }
    .top>.left>.right{
        font-size:12px;
        display: flex;
        margin-left: auto;
    }
    .top>.left>.right p{
        margin-right: 1.14vw;
        line-height: 1.14vw;
    }
    .top>.left>.top_price{
        width: 150px;
    }
    .top>.left>.zhuyi{
        display: flex;
    }
    .top>.left>.zhuyi span{
        color: #BD3A3B;
        font-size: 0.62vw;
        width: 10.2vw;

    }
    .top>.left>.zhuyi img{
        width: 0.78vw;
        height: 0.78vw;
        margin: 3px 8px 0 0;
    }
    .top>.left>.right>div>p:first-child{
        color: #7C7878;
        height:1.14vw;
        text-align: right;
    }
    .top>.left>.right>div>p:last-child{
        height:0.93vw;
        text-align: right;
    }

    .top>.right{
        padding: 5px 10px;
        font-size: 12px;
        width: 290px;
        height: 100%;
    }
    .top>.right p{
        /* margin-left: 0.62vw; */
    }
    .top>.right p:first-child{
        height: 24px;
        /* font-size: 0.62vw; */
        font-weight:300;
        line-height:24px;
        /* margin-top:  0.31vw; */
    }
    .top>.right p:last-child{
        height:  0.93vw;
        /* font-size:  0.62vw; */
        font-weight:400;
        line-height: 1.04vw;
    }
</style>