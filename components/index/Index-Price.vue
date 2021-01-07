<template>
  <div class="index-price">
    <h2>行情中心</h2>
    <el-tabs class="s_tabs" v-model="activeName" type="card" @tab-click="handleClick">
    <div class="search">
        <input type="text" placeholder="搜索币种" v-model="search" />
        <img src="~assets/image/sousuo.png" alt />
    </div>
        <el-tab-pane label="USDT" name="first3">
            <el-table
            :data="(priceData['USDT']||[]).filter(data => !search || data.fname_sn.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <el-table-column
            prop="fname_sn"
            label="交易对"
            >
                <template slot-scope="scope">
                    <span class="star" v-if="!isStar(scope.row.fname_sn)" style="margin-right: 5px;font-size: 20px;" @click="setStar(priceData.BTC,scope.row.fname_sn)">
                        <img src="~assets/image/star.png" alt="" style="width: 20px;">
                    </span>
                    <span class="unstar" v-if="isStar(scope.row.fname_sn)" style="margin-right: 5px;font-size: 20px;" @click="setStar(priceData.BTC,scope.row.fname_sn)">
                        <img src="~assets/image/onstar.png" alt="" style="width: 20px;">
                    </span>
                    <span @click="setGroup('USDT',scope.row)" style="flex:1;">{{ scope.row.fname_sn }}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="lastDealPrize"
            label="价格"
            sortable
            >
                <template slot-scope="scope">
                    <span @click="setGroup('USDT',scope.row)" style="flex:1;">{{ scope.row.lastDealPrize }}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="fupanddown"
            sortable
            label="涨跌幅"
            >
                <template slot-scope="scope">
                    <span @click="setGroup('USDT',scope.row)" :style="'color:'+(scope.row.fupanddown>0?'#1BD098':(scope.row.fupanddown==0?'#CCC3C3':'#FF4D4E'))+';'">{{ scope.row.fupanddown }}%</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="highestPrize24"
            label="24H最高价"
            sortable
            >
                <template slot-scope="scope">
                    <span @click="setGroup('USDT',scope.row)" style="flex:1;">{{ scope.row.highestPrize24 }}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="lowestPrize24"
            label="24H最低价"
            sortable
            >
                <template slot-scope="scope">
                    <span @click="setGroup('USDT',scope.row)" style="flex:1;">{{ scope.row.lowestPrize24 }}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="volumn"
            label="24H成交量"
            sortable
            >
                <template slot-scope="scope">
                    <span @click="setGroup('USDT',scope.row)" style="flex:1;">{{ scope.row.volumn }}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="fentrustValue"
            label="成交额"
            sortable
            >
                <template slot-scope="scope">
                    <span @click="setGroup('USDT',scope.row)" style="flex:1;">{{ scope.row.fentrustValue }}</span>
                </template>
            </el-table-column>
        </el-table>
        </el-tab-pane>
        <el-tab-pane label="BTC" name="first">
              <el-table
                :data="priceData.BTC"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                prop="fname_sn"
                label="交易对"
                >
                    <template slot-scope="scope">
                        <span class="star" v-if="!isStar(scope.row.fname_sn)" style="margin-right: 5px;font-size: 20px;" @click="setStar(priceData.BTC,scope.row.fname_sn)">
                            <img src="~assets/image/star.png" alt="" style="width: 20px;">
                        </span>
                        <span class="unstar" v-if="isStar(scope.row.fname_sn)" style="margin-right: 5px;font-size: 20px;" @click="setStar(priceData.BTC,scope.row.fname_sn)">
                            <img src="~assets/image/onstar.png" alt="" style="width: 20px;">
                        </span>
                        <span @click="setGroup('BTC',scope.row)" style="flex:1;">{{ scope.row.fname_sn }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="lastDealPrize"
                label="价格"
                sortable
                >
                    <template slot-scope="scope">
                        <span @click="setGroup('BTC',scope.row)" style="flex:1;">{{ scope.row.lastDealPrize }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="fupanddown"
                sortable
                label="涨跌幅"
                >
                    <template slot-scope="scope">
                        <span @click="setGroup('BTC',scope.row)" :style="'color:'+(scope.row.fupanddown>0?'#1BD098':(scope.row.fupanddown==0?'#CCC3C3':'#FF4D4E'))+';'">{{ scope.row.fupanddown }}%</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="highestPrize24"
                label="24H最高价"
                sortable
                >
                    <template slot-scope="scope">
                        <span @click="setGroup('BTC',scope.row)" style="flex:1;">{{ scope.row.highestPrize24 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="lowestPrize24"
                label="24H最低价"
                sortable
                >
                    <template slot-scope="scope">
                        <span @click="setGroup('BTC',scope.row)" style="flex:1;">{{ scope.row.lowestPrize24 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="volumn"
                label="24H成交量"
                sortable
                >
                    <template slot-scope="scope">
                        <span @click="setGroup('BTC',scope.row)" style="flex:1;">{{ scope.row.volumn }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="fentrustValue"
                label="成交额"
                sortable
                >
                    <template slot-scope="scope">
                        <span @click="setGroup('BTC',scope.row)" style="flex:1;">{{ scope.row.fentrustValue }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="CNYS" name="first2">
              <el-table
                :data="priceData.CNYS"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                prop="fname_sn"
                label="交易对"
                >
                    <template slot-scope="scope">
                        <span class="star" v-if="!isStar(scope.row.fname_sn)" style="margin-right: 5px;font-size: 20px;" @click="setStar(priceData.BTC,scope.row.fname_sn)">
                            <img src="~assets/image/star.png" alt="" style="width: 20px;">
                        </span>
                        <span class="unstar" v-if="isStar(scope.row.fname_sn)" style="margin-right: 5px;font-size: 20px;" @click="setStar(priceData.BTC,scope.row.fname_sn)">
                            <img src="~assets/image/onstar.png" alt="" style="width: 20px;">
                        </span>
                        <span @click="setGroup('CNYS',scope.row)" style="flex:1;">{{ scope.row.fname_sn }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="lastDealPrize"
                label="价格"
                sortable
                >
                    <template slot-scope="scope">
                        <span @click="setGroup('CNYS',scope.row)" style="flex:1;">{{ scope.row.lastDealPrize }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="fupanddown"
                sortable
                label="涨跌幅"
                >
                    <template slot-scope="scope" sortable>
                        <span @click="setGroup('CNYS',scope.row)" :style="'color:'+(scope.row.fupanddown>0?'#1BD098':(scope.row.fupanddown==0?'#CCC3C3':'#FF4D4E'))+';'">{{ scope.row.fupanddown }}%</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="highestPrize24"
                label="24H最高价"
                sortable
                >
                    <template slot-scope="scope">
                        <span @click="setGroup('CNYS',scope.row)" style="flex:1;">{{ scope.row.highestPrize24 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="lowestPrize24"
                label="24H最低价"
                sortable
                >
                    <template slot-scope="scope">
                        <span @click="setGroup('CNYS',scope.row)" style="flex:1;">{{ scope.row.lowestPrize24 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="volumn"
                label="24H成交量"
                sortable
                >
                    <template slot-scope="scope">
                        <span @click="setGroup('CNYS',scope.row)" style="flex:1;">{{ scope.row.volumn }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="fentrustValue"
                label="成交额"
                sortable
                >
                    <template slot-scope="scope">
                        <span @click="setGroup('CNYS',scope.row)" style="flex:1;">{{ scope.row.fentrustValue }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="自选区" name="one">
             <el-table
                :data="star"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                prop="fname_sn"
                label="交易对"
                >
                    <template slot-scope="scope">
                        <span class="star" v-if="!isStar(scope.row.fname_sn)" style="margin-right: 5px;font-size: 20px;" @click="setStar(priceData.BTC,scope.row.fname_sn)">
                            <img src="~assets/image/star.png" alt="" style="width: 20px;">
                        </span>
                        <span class="unstar" v-if="isStar(scope.row.fname_sn)" style="margin-right: 5px;font-size: 20px;" @click="setStar(priceData.BTC,scope.row.fname_sn)">
                            <img src="~assets/image/onstar.png" alt="" style="width: 20px;">
                        </span>
                        <span @click="starSetGroup(scope.row)" style="flex:1;">{{ scope.row.fname_sn }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="lastDealPrize"
                label="价格"
                sortable
                >
                     <template slot-scope="scope">
                            <span @click="starSetGroup(scope.row)" style="flex:1;">{{ scope.row.lastDealPrize }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                sortable
                label="涨跌幅"
                >
                    <template slot-scope="scope">
                        <span @click="starSetGroup(scope.row)" :style="'color:'+(scope.row.fupanddown>0?'#1BD098':(scope.row.fupanddown==0?'#CCC3C3':'#FF4D4E'))+';'">{{ scope.row.fupanddown }}%</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="highestPrize24"
                label="24H最高价"
                sortable
                >
                    <template slot-scope="scope">
                            <span @click="starSetGroup(scope.row)" style="flex:1;">{{ scope.row.highestPrize24 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="lowestPrize24"
                label="24H最低价"
                sortable
                >
                    <template slot-scope="scope">
                            <span @click="starSetGroup(scope.row)" style="flex:1;">{{ scope.row.lowestPrize24 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="volumn"
                label="24H成交量"
                sortable
                >
                    <template slot-scope="scope">
                            <span @click="starSetGroup(scope.row)" style="flex:1;">{{ scope.row.volumn }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="fentrustValue"
                label="成交额"
                sortable
                >
                    <template slot-scope="scope">
                            <span @click="starSetGroup(scope.row)" style="flex:1;">{{ scope.row.fentrustValue }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
      return {
        activeName: 'first3',
        getlocalstar: [],
        search:''

      };
    },
    created (){
        if (process.browser) {
            this.getlocalstar = JSON.parse(localStorage.getItem("star"))
        }
    },
    computed: {
        ...mapState(['priceDatas','rate','fvId','balances','group','currency','userInfo']),
        priceData: function (e) {
            return this.priceDatas
        },
        isLogin: function () {
            if(this.userInfo.code == 1){
                return true
            }else{
                return false
            }
            return this.userInfo.code
        },
        //自选区
        star: function () {
            var arrs = []
            if(this.getlocalstar){
                if(this.priceData.BTC){
                this.priceData.BTC.forEach((item,index)=>{
                    for (let i = 0; i<this.getlocalstar.length; i++){
                        if(item.fname_sn == this.getlocalstar[i]){
                            arrs.push(item)
                        }else{

                        }
                    }
                })
            }
            if(this.priceData.CNYS){
                this.priceData.CNYS.forEach((item,index)=>{
                    for (let i = 0; i<this.getlocalstar.length; i++){
                        if(item.fname_sn == this.getlocalstar[i]){
                            arrs.push(item)
                        }else{

                        }
                    }
                })
            }
            if(this.priceData.USDT){
                this.priceData.USDT.forEach((item,index)=>{
                    for (let i = 0; i<this.getlocalstar.length; i++){
                        if(item.fname_sn == this.getlocalstar[i]){
                            arrs.push(item)
                        }else{

                        }
                    }
                })
            }
            }
            return arrs

        },
    },
    mounted(){
        window.setInterval(() => {
            setTimeout(this.fetchSomething(), 0)
        }, 3600000)
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event)
        },
        fetchSomething(params) {
            this.$store.dispatch('GET_priceData');
        },
        isStar: function (a) {
            var isstar
            for(var i=0;i<this.star.length;i++){
                if(this.star[i].fname_sn == a){
                    isstar = true
                    break
                }else{
                    isstar = false
                }
            }
            return isstar
        },
        setStar: function (n,a) {
            this.getStar(n,a)
        },
        getStar: function (n,a) {
            if(this.getlocalstar){
                if(this.getlocalstar.indexOf(a) > -1){
                    this.getlocalstar.splice(this.contains(this.getlocalstar,a),1)
                    localStorage.setItem("star", JSON.stringify(this.getlocalstar))
                }else{
                    this.getlocalstar.push(a)
                    localStorage.setItem("star", JSON.stringify(this.getlocalstar))
                }
            }else{
                this.getlocalstar = []
                this.getlocalstar.push(a)
                localStorage.setItem("star", JSON.stringify(this.getlocalstar))
            }
        },
        addStar: function (n, a) {

        },
        contains: function (arrays, obj) {
            var i = arrays.length;
            while (i--) {
                if (arrays[i] === obj) {
                    return i;
                }
            }
            return false;
        },
        /**
         * g 交易区
         * c 币种id
         */
        starSetGroup: function (s) {
            let group = s.group
            let fShortName_fid = {
                "fid":s.fid,
                "fShortName":s.fShortName
            }
            this.setGroup(group,fShortName_fid)
        },
        setGroup: function (g,c) {
            this.$store.commit('SET_s_selloutPrice', null)
            this.$store.commit('SET_s_selloutNum', null)
            this.$store.commit('SET_p_purchasePrice', null)
            this.$store.commit('SET_p_purchaseNum', null)

            localStorage.setItem("fvId", JSON.stringify(c.fid))
            localStorage.setItem("currency", JSON.stringify(c.fShortName))
            localStorage.setItem("group", JSON.stringify(g))

            this.$store.commit('SET_fvId', c.fid)
            this.$store.commit('SET_currency', c.fShortName)
            this.$store.commit('SET_group', g)
            this.$router.push({
				path: '/exchange'
			})
        },
        getUserTotal: function () {
            this.$store.dispatch('GET_balances')
        },
    }
}
</script>
<style>
.s_tabs .el-tabs__content{
        overflow: unset !important;
    }
</style>
<style scoped>

    .el-table__row .cell > span {
        display: block;
        cursor: pointer;
    }
    .unstar, .star {
        display: inline !important;
    }

    .index-price{
        /* min-height: 53.43vw; */
        background: #1B1515;
        width: 60%;
        margin: 0 auto;
        color: #CCC3C3;
    }
    .index-price h2{
        text-align: center;
        padding: 4vw 0 4vw 0;
        font-size:1.8vw;
        font-weight:400;
        line-height:3.85vw;
        color: rgba(204,195,195,1);
    }
    .index-price >>> .el-tabs{
        width: 100%;
        margin: 0 auto;
    }
    .index-price >>> .el-table__row td:first-child .cell > span:nth-child(2){
        width: 92px;
        display: inline-block;
    }
    .index-price >>> .el-tabs--card>.el-tabs__header .el-tabs__item{
        width:6vw;
        height:2.2vw;
        background: #3B3636;
        border-radius:0.2vw;
        border: none;
        margin-right: 0.2vw;
        text-align: center;
        line-height: 2.2vw;
        font-weight:600;
        color:rgba(147,146,146,1);
    }
    .index-price >>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(4){
        margin-right: 0;
    }
    .index-price >>> .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        background:rgba(189,58,59,1);
        color: #ffffff;
        font-size:0.8vw;
        font-weight:550;
    }
    .index-price >>> .el-tabs--card>.el-tabs__header .el-tabs__nav, .index-price >>> .el-tabs--card>.el-tabs__header{
        border: 0;
    }
    .index-price >>> .el-table thead{
        border-radius:0.26vw;
    }
    .index-price >>> .el-table thead tr,.index-price >>> .el-table thead th{
        height:2.2vw;
        background: #3B3636;
        color: #ffffff;
        font-size:0.8vw;
        font-weight:500;
        color:rgba(204,195,195,1);
        line-height:1.3vw;
        text-align: center;
        padding: 0;
    }
    .index-price >>> .el-table td, .index-price >>> .el-table th.is-leaf{
        border: none;
    }
    /* .index-price >>> .el-table tbody>tr>td:first-child>div::before{
        content: '☆';
        font-size: 1.14vw;
        display: inline-block;
        margin-right: 1.04vw;
    } */
    .index-price >>> .el-table tbody tr,
    .index-price >>> .el-table__empty-block,
    .index-price >>> .el-table__footer-wrapper,
    .index-price >>> .el-table__header-wrapper,.el-table{
        background: #1B1515;
    }
    .index-price >>> .el-table tr td{
        text-align: center;
    }
    .index-price >>> .el-table::before{
        height: 0;
    }
    .index-price >>> .el-table td div{
        /* height:1.14vw; */
        font-size:0.68vw;
        font-weight:500;
        color:rgb(241 241 241);
        line-height:1.25vw !important;
    }
    .index-price >>> .el-table tbody td{
        padding: 0.7vw 0
    }
    .index-price >>> .el-table--enable-row-hover .el-table__body tr:hover>td{
        background: #3B3636;
    }
    .index-price >>> .el-table__footer-wrapper, .el-table__header-wrapper{
        border-radius: 0.26vw;
    }
    .index-price >>> .el-tabs__header{
        margin-bottom: 0.41vw;
    }
    .search {
    height: 2.1vw;
    display: flex;
    align-items: center;
    position: absolute;
    top: -2.5vw;
    right: 10px;
    }
    .search input {
    width: 235px;
    height: 2.1vw;
    background: rgba(48, 40, 40, 1);
    border-radius: 5px;
    border: 1px solid rgba(64, 61, 61, 1);
    margin: 0 9px;
    padding-left: 14px;
    font-size: 14px;
    }
    .search img:nth-child(2) {
    width: 17px;
    height: 17px;
    margin-left: -33px;
    }
    .search img:nth-child(3) {
    margin-left: auto;
    margin-right: 20px;
    width: 14px;
    }
</style>
