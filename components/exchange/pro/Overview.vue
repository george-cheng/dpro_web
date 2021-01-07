<template>
    <div class="warp" style="height:100%;">
        <div class="left">
            <div class="mars_usdt">
                <p><span>{{this.currency}}</span>/{{this.group}}</p>
                <p><img src="~assets/image/ziliao.png" style="width: 12px;" alt=""> {{this.currency}} 资料</p>
            </div>
            <div class="top_price" v-if="priceData.length>0">
                <p>{{priceData[0].lastDealPrize}}
                    <span :style="'color:'+(priceData[0].fupanddown>0?'#1BD098':(priceData[0].fupanddown>0?'#CCC3C3':'#FF4D4E'))+';'">{{ priceData[0].fupanddown }}%</span>
                    </p>
                <p>{{cny_pric.toFixed(4)}}</p>
            </div>
            <div class="right" v-if="priceData.length>0">
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
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
      return {
      }
    },
    computed:{
        ...mapState(['priceDatas','rate','group','currency','fvId']),
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
        }
    },
    mounted(){
        this.$store.dispatch('GET_rate')
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event)
        },
    }
}
</script>

<style scoped>
    .warp>.left{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        background: #302828;
    }
    .warp>.left>.mars_usdt{
        margin-left: 1.04vw;
        margin-top: 0.2vw;
        margin-right:  1.77vw;
    }
    .warp>.left>.mars_usdt>p{
        font-size: 0.62vw;
    }
    .warp>.left>.mars_usdt>p>span{
        font-size: 1.04vw;
    }
    .warp>.left>.mars_usdt>p:last-child{
        color: #BD3A3B;
    }
    .warp>.left .warp_price{
        font-size: 0.93vw;
    }
    .warp>.left .warp_price span{
        font-size: 0.62vw;
    }
    .warp>.left .warp_price>p:nth-child(2){
        font-size: 0.72vw;
    }
    .warp>.left>.right{
        display: flex;
        margin-left: auto;
    }
    .warp>.left>.right p{
        margin-right: 1.14vw;
        line-height: 1.14vw;
    }
    .warp>.left>.warp_price{
        width: 150px;
    }
    .warp>.left>.zhuyi{
        display: flex;
    }
    .warp>.left>.zhuyi span{
        color: #BD3A3B;
        font-size: 0.62vw;
        width: 10.2vw;

    }
    .warp>.left>.zhuyi img{
        width: 0.78vw;
        height: 0.78vw;
        margin: 3px 8px 0 0;
    }
    .warp>.left>.right>div>p:first-child{
        color: #7C7878;
        height:1.14vw;
    }
    .warp>.left>.right>div>p:last-child{
        height:0.93vw;
    }


</style>