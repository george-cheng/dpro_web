<template>
    <div class="bottom">
        <div class="bar">
            <a-radio-group @change="onChangeRadio" v-model="value">
                <a-radio :value="1">限价委托</a-radio>
                <a-radio :value="2" :disabled="true">计划委托</a-radio>
                <a-radio :value="3">历史委托</a-radio>
            </a-radio-group>
        </div>
        <div class="bottom_tab">
            <template>
            <el-table
                id="history"
                :data="historyData"
                style="width: 100%;display:block;"
                max-height="245"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                prop="time"
                label="委托时间">
                    <template slot-scope="scope">
                        <span>{{time(scope.row.time)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="type"
                label="买/卖">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type==0">买入</span>
                        <span v-if="scope.row.type==1">卖出</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="price"
                label="委托价格"
                sortable>
                    <template slot-scope="scope">
                        <span>{{parseFloat(scope.row.price)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="count"
                sortable
                label="委托数量">
                    <template slot-scope="scope">
                        <span>{{parseFloat(scope.row.count)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="avgPrice"
                sortable
                label="成交额">
                    <template slot-scope="scope">
                        <span>{{parseFloat(scope.row.amount)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1">未成交</span>
                        <span v-if="scope.row.status==2">部分成交</span>
                        <span v-if="scope.row.status==3">完全成交</span>
                        <span v-if="scope.row.status==4">已取消</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-table
                id="current"
                :data="currentData"
                style="width: 100%;display:none;"
                max-height="245"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                prop="time"
                label="委托时间">
                    <template slot-scope="scope">
                        <span>{{time(scope.row.time)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="type"
                label="买/卖">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type==0">买入</span>
                        <span v-if="scope.row.type==1">卖出</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="price"
                label="委托价格"
                sortable>
                    <template slot-scope="scope">
                        <span>{{parseFloat(scope.row.price)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="count"
                sortable
                label="委托数量">
                    <template slot-scope="scope">
                        <span>{{parseFloat(scope.row.count)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="avgPrice"
                sortable
                label="成交额">
                    <template slot-scope="scope">
                        <span>{{parseFloat(scope.row.amount)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1">未成交</span>
                        <span v-if="scope.row.status==2">部分成交</span>
                        <span v-if="scope.row.status==3">完全成交</span>
                        <span v-if="scope.row.status==4">取消</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="id"
                label="操作">
                    <template slot-scope="scope">
                         <span @click="handleCancel(scope.$index, scope.row)" style="cursor:pointer;border:1px solid #666666;padding:0 5px;border-radius:10%;background:#BD3A3B;">取消</span>
                    </template>
                </el-table-column>
            </el-table>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import qs from 'qs'
import { Message } from "element-ui"

export default {
    data () {
        return{
            value: 1,
            // currentData: []
        }
    },
    computed:{
        ...mapState(['historicalOrder','fvId','currency','historyData','currentData','state_entrustListLog','state_entrustList']),
        
    },
    mounted () {
        this.ifValue(this.value)
    },
    methods: {
        handleCancel: function (index,id) {
            this.cancelOrder(id.id)
        },
        cancelOrder: function (OrderId) {
            var _this = this
            var params = new URLSearchParams()
            params.append('id', OrderId)
            this.$axios.post('/api/v2/market/cancelEntrust',params,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function (response) {
                if(response.data.code==200){
                    Message({
                        showClose: true,
                        message: '取消成功'
                    })
                _this.ifValue(_this.value);
                }else{
                    Message({
                        showClose: true,
                        message: response.data.msg
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        },
        getHistoryData : function() {
            this.$store.dispatch('GET_historyData')
        },
        getCurrentData: function () {
            this.$store.dispatch('GET_currentData')
        },
        onChangeRadio(e) {
            this.value=e.target.value;
            this.ifValue(e.target.value)
        },
        ifValue: function (e) {
            let current = document.getElementById('current')
            let history = document.getElementById('history')
            switch (e) {
                case 1:
                    // this.getCurrentData()
                    this.$store.dispatch('GET_currentData')
                    this.$store.dispatch('GET_balances')
                    current.style.display = "block"
                    history.style.display = "none"
                    break;
                case 2:
                    Message({
                        showClose: true,
                        message: '暂无数据'
                    })
                    break;
                case 3:
                    // this.getHistoryData()
                    this.$store.dispatch('GET_historyData')
                    this.$store.dispatch('GET_balances')
                    current.style.display = "none"
                    history.style.display = "block"
                    break;
            
                default:
                    break;
            }
        },
        time: function(time = +new Date()) {
            var date = new Date(time + 8 * 3600 * 1000);
            return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '.');
        }
    }
}
</script>

<style scoped>
    .bottom{
         height: 280px;
         margin-top: 5px;
     }
    .bottom>div{
        background: #282020
    }
    .bottom .bar{
        height: 40px;
        margin-bottom: 0.052vw;
        background:rgba(48,40,40,1);
    }
    .bottom .bottom_tab{
        height: 240px;
    }
    .bottom >>> .ant-radio-group{
        line-height: 38px;
    }
    .bottom >>> .ant-radio-wrapper{
        color: #CCC3C3;
        margin-left: 16px;
    }
    .bottom >>> .ant-slider-dot-active{
        border: #282020;
    }
    .bottom >>> .ant-radio-disabled + span{
        color: #CCC3C3
    }
    .bottom >>> .ant-slider-handle{
        background: #282020;
        border: solid 3px #BD3A3B;
    }
    .bottom >>> .ant-slider-with-marks{
        margin-bottom: 12px;
    }

    .bottom >>> .el-tabs{
        width: 92.86vw;
        margin: 0 auto;
        font-size: 12px;
    }
    .bottom >>> .el-tabs--card>.el-tabs__header .el-tabs__item{
        width:23.17vw;
        height:3.12vw;
        font-size:1.14vw;
        background: #3B3636;
        border-radius:0.26vw;
        border: none;
        margin-right: 0.055vw;
        text-align: center;
        line-height: 3.12vw;
        font-weight:600;
        color:rgba(147,146,146,1);
    }
    .bottom >>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(4){
        margin-right: 0;
    }
    .bottom >>> .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        background:rgba(189,58,59,1);
        color: #ffffff;
        font-size:1.14vw;
        font-weight:600;
        /* line-height:1.56vw; */
    }
    .bottom >>> .el-tabs--card>.el-tabs__header .el-tabs__nav, .bottom >>> .el-tabs--card>.el-tabs__header{
        border: 0;
    }
    .bottom >>> .el-table thead{
        border-radius:0.26vw;
    }
    .bottom >>> .el-table thead tr,.bottom >>> .el-table thead th{
        height:31px;
        background: #282020;
        color: #ffffff;
        font-weight:300;
        color:rgba(204,195,195,1);
        line-height:31px;
        text-align: center;
        padding: 0;
    }
    .bottom >>> .el-table td, .bottom >>> .el-table th.is-leaf{
        border: none;
    }
    /* .bottom >>> .el-table tbody>tr>td:first-child>div::before{
        content: '☆';
        font-size: 1.14vw;
        display: inline-block;
        margin-right: 1.04vw;
    } */
    .bottom >>> .el-table tbody tr,
    .bottom >>> .el-table__empty-block,
    .bottom >>> .el-table__footer-wrapper, 
    .bottom >>> .el-table__header-wrapper,.el-table{
        background: #282020;
    }
    .bottom >>> .el-table tr td{
        text-align: center;
    }
    .bottom >>> .el-table::before{
        height: 0;
    }
    .bottom >>> .el-table td div{
        height:1.14vw;
        font-size: 12px;
        font-weight:500;
        color:rgba(204,195,195,1);
        line-height:1.25vw !important;
    }
    .bottom >>> .el-table tbody td{
        padding: 0.12vw 0
    }
    .bottom >>> .el-table--enable-row-hover .el-table__body tr:hover>td{
        background: #3B3636;
    }
    .bottom >>> .el-table__footer-wrapper, .el-table__header-wrapper{
        border-radius: 0.26vw;
    }
    .bottom >>> .el-tabs__header{
        margin-bottom: 0.41vw;
    }
    .bottom >>> .el-table__body-wrapper::-webkit-scrollbar {
        width:5px;
        background:rgba(49,41,41,1);
        border-radius:3px;
    }
    .bottom >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
         width:5px;
        background:rgba(75,63,63,1);
        border-radius:3px;
    }
</style>