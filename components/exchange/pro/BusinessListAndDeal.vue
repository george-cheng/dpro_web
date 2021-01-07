<template>
    <!-- 买卖列表和实时列表 -->
    <div class="business_list_and_deal">
        <div class="business_list">
            <div class="left">
            <div class="top">
                <div style="float: left;display: flex;">
                    <div class="left_icon1" :class="activeIcon==1?'left_icon_border':''"><span class="all-icon" @click="showPurchase('all-icon',1)" ref="all-icon"></span></div>
                    <div class="left_icon2" :class="activeIcon==2?'left_icon_border':''"><span class="purchase-icon" @click="showPurchase('purchase-icon',2)" ref="purchase-icon"></span></div>
                    <div class="left_icon3" :class="activeIcon==3?'left_icon_border':''"><span class="sellout-icon" @click="showPurchase('sellout-icon',3)" ref="sellout-icon"></span></div>
                </div>
                <div>
                    <a-select defaultValue="6" style="width: 90px;font-size:12px;" @change="selectFloat">
                        <a-select-option value="9">9位小数</a-select-option>
                        <a-select-option value="8">8位小数</a-select-option>
                        <a-select-option value="7">7位小数</a-select-option>
                        <a-select-option value="6">6位小数</a-select-option>
                        <a-select-option value="5">5位小数</a-select-option>
                        <a-select-option value="4">4位小数</a-select-option>
                        <a-select-option value="3">3位小数</a-select-option>
                        <a-select-option value="2">2位小数</a-select-option>
                        <a-select-option value="1">1位小数</a-select-option>
                    </a-select>
                    <img src="~assets/image/shezhi.png" @click="showModal()" alt="" style="cursor: pointer;width:14px;margin-left: 10px;">
                </div>
                <a-modal title="盘口设置" v-model="visible" :footer="null">
                    <div>
                        <span style="margin-right: 20px;">第三列显示:</span> 
                        <a-radio-group name="radioGroup" @change="onChangeSan" v-model="sanValue">
                            <a-radio style="font-size: 14px;" :value="1">累计数量</a-radio>
                            <a-radio style="font-size: 14px;" :value="2">数额</a-radio>
                            <a-radio style="font-size: 14px;" :value="3">累计数额</a-radio>
                        </a-radio-group>
                    </div>
                    <div style="margin-top: 16px;">
                        <span style="margin-right: 20px;">柱状图模式:</span> 
                        <a-radio-group name="radioGroup2" @change="onChangeZhu" v-model="zhuValue">
                            <a-radio style="font-size: 14px;" :value="1">数量</a-radio>
                            <a-radio style="font-size: 14px;" :value="2">累计数量</a-radio>
                            <a-radio style="font-size: 14px;" :value="3">数额</a-radio>
                            <a-radio style="font-size: 14px;" :value="4">累计数额</a-radio>
                        </a-radio-group>
                    </div>
                </a-modal>
            </div>
            <div class="bottom">
                <p class="small_title">
                    <span>价格({{this.group}})</span>
                    <span>数量({{this.currency}})</span> 
                    <span v-if="showBusinessValue == 2">数额({{this.group}})</span>
                    <span v-if="showBusinessValue == 1">累计数量({{this.currency}})</span>
                    <span v-if="showBusinessValue == 3">累计数额({{this.group}})</span>
                </p>
                <ul>
                    <div class="purchase" ref="purchase" id="sellout">
                        <li v-for="(i, index) in sellout " :key="index" @click="Business(i[0],i[1],1)">
                            <span>{{i[0].toFixed(weishu)}}</span>
                            <span>{{i[1].toFixed(6)}}</span>
                            <span v-if="showBusinessValue == 2">{{i[2].toFixed(2)}}</span>
                            <span v-if="showBusinessValue == 1">{{i[3].toFixed(5)}}</span>
                            <span v-if="showBusinessValue == 3">{{(i[0].toFixed(weishu)*i[3].toFixed(5)).toFixed(2)}}</span>
                            <div v-if="showBusinessBg == 1" class="selloutdata_bg" :style="'width: '+(i[1]/maxSelloutNum)*100+'%'"></div>
                            <div v-if="showBusinessBg == 2" class="selloutdata_bg" :style="'width: '+(i[3]/maxLeJiSelloutNum)*100+'%'"></div>
                            <div v-if="showBusinessBg == 3" class="selloutdata_bg" :style="'width: '+(i[2]/maxSelloutAmount)*100+'%'"></div>
                            <div v-if="showBusinessBg == 4" class="selloutdata_bg" :style="'width: '+((i[0].toFixed(weishu)*i[3].toFixed(5))/maxLeJiSelloutAmount)*100+'%'"></div>
                        </li>
                    </div>
                    <div class="newbusiness">
                        <li v-if="real">
                            <span :style="'color:'+(real.fupanddown.toFixed(2)>0?'#1BD098':'#FF4D4E')+';'">{{real.last}}</span>
                            <span :style="'color:'+(real.fupanddown.toFixed(2)>0?'#1BD098':'#FF4D4E')+';'"> ¥{{tool.accMul(real.last,parseFloat(rate.usdt)).toFixed(2)}}</span>
                            <span :style="'color:'+(real.fupanddown.toFixed(2)>0?'#1BD098':'#FF4D4E')+';'">{{real.fupanddown.toFixed(2)}}</span>
                        </li>
                    </div>
                    <div class="sellout" ref="sellout">
                        <li v-for="(i, index) in purchase " :key="index" @click="Business(i[0],i[1],2)">
                            <span>{{i[0].toFixed(weishu)}}</span>
                            <span>{{i[1].toFixed(6)}}</span>
                            <span v-if="showBusinessValue == 2">{{i[2].toFixed(2)}}</span>
                            <span v-if="showBusinessValue == 1">{{i[3].toFixed(5)}}</span>
                            <span v-if="showBusinessValue == 3">{{(i[0].toFixed(weishu)*i[3].toFixed(5)).toFixed(2)}}</span>
                            <div v-if="showBusinessBg == 1" class="selloutdata_bg" :style="'width: '+(i[1]/maxPurchaseNum)*100+'%'"></div>
                            <div v-if="showBusinessBg == 2" class="selloutdata_bg" :style="'width: '+(i[3]/maxLeJiPurchaseNum)*100+'%'"></div>
                            <div v-if="showBusinessBg == 3" class="selloutdata_bg" :style="'width: '+(i[2]/maxPurchaseAmount)*100+'%'"></div>
                            <div v-if="showBusinessBg == 4" class="selloutdata_bg" :style="'width: '+((i[0].toFixed(weishu)*i[3].toFixed(5))/maxLeJiPurchaseAmount)*100+'%'"></div>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
        </div>
        <div class="deal">
            <div class="bottom">
                <div class="new_title">实时成交</div>
                <div class="new_table">
                    <p class="small_title">
                        <span>价格</span>
                        <span>数量</span> 
                        <span>时间</span>
                    </p>
                    <ul>
                        <li v-for="(item, index) in newbusiness" :key="index">
                            <span>{{item[0]}}</span>
                            <span>{{item[1]}}</span>
                            <span>{{item[2].trim().split(" ")[1]}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from "element-ui"

export default {
    data() {
        return {
            // websock: null,
            activeIcon: 1,
            activeName: 'first',
            search: '',
            purchase: "",
            sellout: "",
            newbusiness: "",
            real: "",
            getlocalstar: [],
            isSetStar: '',
            delItemIndex: '',
            value: 1,
            marks:{
                0: '',
                25: '',
                50: '',
                75: '',
                100: ''
            },
            purchasePrice: '',
            purchaseNum: '',
            selloutPrice: '',
            selloutNum: '',
            purchaseSliderNum: 0,
            userTotal: 0.00,

            maxSelloutNum: 0, //最大数量
            maxLeJiSelloutNum: 0, //最大累计数量
            maxSelloutAmount: 0, //最大数额
            maxSelloutLeJiAmount: 0, //最大累计数额

            maxPurchaseNum: 0, //最大数量
            maxLeJiPurchaseNum: 0, //最大累计数量
            maxPurchaseAmount: 0, //最大数额
            maxLeJiPurchaseAmount: 0, //最大累计数额
            
            weishu: 6,
            visible: false,
            sanValue: 2,
            zhuValue: 1,
            showBusinessValue: 2,
            showBusinessBg: 1,

        }
    },
    updated () {
        // 让滚动条定位到底部
        let ele = document.getElementById('sellout');
        ele.scrollTop = ele.scrollHeight;
    },
    created (){
        if (process.browser) {
        if ('WebSocket' in window) {
            //页面刚进入时开启长连接
            this.initWebSocket()
            window.setInterval(() => {
                setTimeout(this.initWebSocket(), 0)
            }, 144000)
            console.log('Support webSocket')
        }
        else {
          console.log('Not support webSocket')
        }
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
          this.useBy = 'phone'
        } else {
          this.useBy = 'pc'
        }
      }
    },
    beforeDestroy () {
        // clearInterval(this.timer)
    },
    destroyed: function() {
       this.websocketclose()
　　},
    computed: {
        ...mapState(['priceDatas','rate','fvId','balances','group','currency','userInfo']),
        isLogin: function () {
            if(this.userInfo.code == 1){
                return true
            }else{
                return false
            }
            return this.userInfo.code
        },
        WebSocket_fvId: function () {
            return this.fvId
        }
    },
    watch: {
        WebSocket_fvId: function () {
            if(this.websocket.readyState === 1){
                console.log('------关闭websocket连接,重新发送请求------'+JSON.stringify(this.websocket))
                   this.websocket.close()
                   this.initWebSocket()
            }else{
                console.log('------重新初始化发送请求------'+JSON.stringify(this.websocket))
                this.initWebSocket()
            }
        }
    },
    mounted() {
    },
    methods: {
        /**
         * 盘口设置
         */
        showModal() {
            this.visible = true;
        },
        handleOk(e) {
            console.log(e);
            this.visible = false;
        },
        onChangeSan (e) {
            this.showBusinessValue = e.target.value
        },
        onChangeZhu (e) {
            this.showBusinessBg = e.target.value
        },
        /**
         * 切换小数位
         */
        selectFloat: function (value) {
            this.weishu = value
        },
        setDatabg: function () {
            if(this.sellout){
                this.maxSelloutNum = this.getMaxNum(this.sellout,1)
                this.maxLeJiSelloutNum = this.getMaxNum(this.sellout,3)
                this.maxSelloutAmount = this.getMaxNum(this.sellout,2)
                this.maxLeJiSelloutAmount = this.getMaxLejiAmount(this.sellout)
            }
            if(this.purchase){
                this.maxPurchaseNum = this.getMaxNum(this.purchase,1)
                this.maxLeJiPurchaseNum = this.getMaxNum(this.purchase,3)
                this.maxPurchaseAmount = this.getMaxNum(this.purchase,2)
                this.maxLeJiPurchaseAmount = this.getMaxLejiAmount(this.purchase)
            }
        },
        getMaxLejiAmount: function (a) {
            // (i[0].toFixed(weishu)*i[3].toFixed(5)
            if(a.length>0){
                var max=a[0][3]*a[0][0];
                for (var i = 0; i < a.length; i++) {
                    if (max<a[i][3]*a[0][0]) {
                        max=a[i][3]*a[0][0]
                    }  
                }
            return max
            }
        },
        getMaxNum: function (a,n) {
            if(a.length>0){
                var max=a[0][n];
                for (var i = 0; i < a.length; i++) {
                    if (max<a[i][n]) {
                        max=a[i][n]
                    }  
                }
            return max
            }
        },
        initWebSocket(){
            const wsuri = `wss://www.dpro.ltd/socket.io/?deep=4&token=dev&symbol=`+this.fvId+`&EIO=3&transport=websocket`
            this.websocket = new WebSocket(wsuri)
            this.websocket.onopen = this.websocketonopen
            this.websocket.onerror = this.websocketonerror
            this.websocket.onmessage = this.websocketonmessage
            this.websocket.onclose = this.websocketclose
        },
        websocketonopen() {
            console.log("WebSocket连接成功")
            this.websocketsend()
        }, 
        websocketonerror(e) { //错误 
            console.log("WebSocket连接发生错误"+JSON.stringify(e))
            this.initWebSocket() // 连接失败后尝试重新连接
        }, 
        websocketonmessage(e){ //数据接收
            if(e.data.indexOf('42/trade,') == -1){ // 通过前面的字符串‘42/trade,’是否存在 -1表示不存在
            }else{
                let data = JSON.parse(e.data.replace('42/trade,', ''))
                switch (data[0]) {
                    case "entrust-buy":
                        var _this = this
                        this.purchase = JSON.parse(data[1])
                        var sumN = 0
                        for (let i = 0; i<_this.purchase.length; i++) {
                            sumN += _this.purchase[i][1]
                            _this.purchase[i].push(sumN)
                        }
                        break;
                    case "entrust-sell":
                        var _this = this
                        this.sellout = JSON.parse(data[1])
                        var sumI = 0
                        for (let i = 0; i<_this.sellout.length; i++) {
                            sumI += _this.sellout[i][1]
                            _this.sellout[i].push(sumI)
                        }
                        this.sellout = this.sellout.reverse()
                        break;
                    case "entrust-log":
                        this.newbusiness = JSON.parse(data[1]);
                        break;
                    case "real":
                        this.real = JSON.parse(data[1]);
                        break
                    case "entrust-update":
                        if (JSON.parse(data[1]).needTradePasswd == true || JSON.parse(data[1]).needTradePasswd == undefined){
                            this.$store.commit('SET_v_needTradePasswd', true)
                        }else{
                            this.$store.commit('SET_v_needTradePasswd', false)
                        }
                        this.$store.commit('SET_entrustListLog', JSON.parse(data[1]).entrustListLog)
                        this.$store.commit('SET_entrustList', JSON.parse(data[1]).entrustList)
                        break;
                    default:
                        break;
                }
            }
            this.setDatabg()
        }, 
        websocketsend(){//数据发送
            let data = "40/trade"
            if (this.websocket.readyState === 1) {
                this.websocket.send(data)
            }
            
        }, 
        websocketclose(e){ //关闭 
            console.log("connection closed")
            // this.initWebSocket()
        },

        // 控制左侧记录显示
        showPurchase: function (e,a) {
            this.activeIcon = a
            switch (e) {
                case "all-icon":
                    this.$refs.purchase.style.display="block"
                    this.$refs.purchase.style.height="46%"
                    this.$refs.sellout.style.display="block"
                    this.$refs.sellout.style.height="43%"
                    break;
                case "purchase-icon":
                    this.$refs.purchase.style.display="block"
                    this.$refs.purchase.style.height="89%"
                    this.$refs.sellout.style.display="none"
                    break;
                case "sellout-icon":
                    this.$refs.sellout.style.display="block"
                    this.$refs.sellout.style.height="89%"
                    this.$refs.purchase.style.display="none"
                    break;
                default:
                    break;
            }
        },
        Business: function (e,n,index) {
            e=e.toFixed(this.weishu);
            n=n.toFixed(6);
            var BusinessData = {e,n,index}
            this.$store.commit('SET_business', BusinessData)
        }
    }

}
</script>

<style scoped>
    .left .top >>> .ant-select-selection{
        background: #282020;
        color: #fff;
        height: 24px;
    }
    .left .top >>> .ant-select-selection__rendered {
        line-height: 22px;
    }
    .left .top >>> .ant-select-arrow {
        color: #bbbbbb;
    }
    .selloutdata_bg{
        position: absolute;
        right: 0;
        top: 0;
        height: 20px;
        background: rgba(189, 58, 59, 0.1);
        z-index: 0;
    }
    .purchasedata_bg{
        position: absolute;
        right: 0;
        top: 0;
        height: 20px;
        background: rgba(59, 169, 135, 0.1);
        z-index: 0;
    }
    .business_list_and_deal{
        width: 100%;
        height: 100%;
    }
    .business_list_and_deal>div{
        display: flex;
        justify-content: space-between;
    }
        .business_list_and_deal>.business_list{
            width: 50%;
            height: 100%;
            /* display: inline-block; */
            /* margin-right: 5px; */
            background: #302828;
        }
        .left_icon1{
        padding: 5px;
        margin-left: 15px;
        /* margin-right: 5px; */
        }
        .left_icon2{
            padding: 5px;
            margin-left: 5px;
            margin-right: 5px;
        }
        .left_icon3{
            padding: 5px;
            /* margin-left: 10px;
            margin-right: 5px; */
        }
        .left_icon_border{
            border: 1px solid #BD3A3B;
            border-radius: 10%;
        }
        .all-icon{
            width: 14px;
            height: 2px;
            border-top: 2px solid #BD3A3B;
            border-bottom: 2px solid #3BA987;
            background-color: #776D6D;
            padding: 5px 0;
            background-clip:content-box;
            /* margin-right: 10px; */
            /* margin-left: 21px; */
            cursor: pointer;
            box-sizing: content-box;
            display: block;
        }
        .purchase-icon{
            width: 14px;
            height: 2px;
            border-top: 2px solid #BD3A3B;
            border-bottom: 2px solid #776D6D;
            background-color: #BD3A3B;
            padding: 5px 0;
            background-clip:content-box;
            cursor: pointer;
            box-sizing: content-box;
            display: block;
        }
        .sellout-icon{
            width: 14px;
            height: 2px;
            border-top: 2px solid #776D6D;
            border-bottom: 2px solid #3BA987;
            background-color: #3BA987;
            padding: 5px 0;
            background-clip:content-box;
            cursor: pointer;
            box-sizing: content-box;
            display: block;
        }

        .left{
            width: 100%;
            height: 100%;
            /* margin-right: 0.26vw; */
        }
        .left>div{
            /* background: #282020; */
            box-sizing: border-box;
        }
        .business_list>.left>.top{
            height: 6%;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        .business_list>.left>.top>img{
            margin-right: 10px;
            margin-left: 5px;
            width: 14px;
        }
        .left>.bottom{
            background: #282020;
            height: 94%;
        }
        .left>.bottom ul{
            height: 95%;
        }
        .left>.bottom .purchase{
            height: 46.75%;
            overflow-y: auto;
        }
        /* 滚动条 */
        .left>.bottom .purchase::-webkit-scrollbar{
            width:5px;
            background:rgba(49,41,41,1);
            border-radius:3px;
        }
        .business_list >>> .el-table__body-wrapper{
            background: #282020
        }
        .business_list >>> .el-table .cell{
            padding-right: 0;
        }
        .business_list >>> .el-table__body-wrapper::-webkit-scrollbar {
            width:5px;
            background:rgba(49,41,41,1);
            border-radius:3px;
        }
        .business_list >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
            width:5px;
            background:rgba(75,63,63,1);
            border-radius:3px;
        }

        .left>.bottom .purchase::-webkit-scrollbar-thumb{
            width:5px;
            background:rgba(75,63,63,1);
            border-radius:3px;
        }

        .left>.bottom .purchase li{
            display: flex;
            justify-content: space-between;
            padding-left: 5px;
            padding-right: 2px;
            height: 20px;
            line-height: 20px;
            cursor: pointer;
            position: relative;
        }
        .left>.bottom .purchase li span:first-child{
            color: #BD3A3B;
            flex: 1;
        }
        .left>.bottom .purchase li span:nth-child(2){
            color: #CCC3C3;
            flex: 1;
            text-align: right;
        }
        .left>.bottom .purchase li span:nth-child(3){
            flex: 1;
            text-align: right;
        }

        .left>.bottom .sellout{
            height: 46.75%;
            overflow-y: auto;
        }
        /* 滚动条 */
        .left>.bottom .sellout::-webkit-scrollbar{
            width:5px;
            background:rgba(49,41,41,1);
            border-radius:3px;
        }
        .left>.bottom .sellout::-webkit-scrollbar-thumb{
            width:5px;
            background:rgba(75,63,63,1);
            border-radius:3px;
        }
        .left>.bottom .sellout li{
            display: flex;
            justify-content: space-between;
            padding-left: 2px;
            padding-right: 2px;
            height: 20px;
            line-height: 20px;
            cursor: pointer;
            position: relative;
        }
        .left>.bottom .sellout li span:first-child{
            color: #3BA987;
            flex: 1;
        }
        .left>.bottom .sellout li span:nth-child(2){
            color: #CCC3C3;
            flex: 1;
            text-align: right;
        }
        .left>.bottom .sellout li span:nth-child(3){
            flex: 1;
            text-align: right;
        }
        .left>.bottom .small_title{
            height: 5%;
            font-weight:300;
            color:rgba(124,120,120,1);
            border-bottom: 1px solid #403D3D;
            padding-left: 5px;
            padding-right: 2px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .left>.bottom .small_title>span:first-child{
            flex: 1;
        }
        .left>.bottom .small_title>span:nth-child(2){
            flex: 1;
            text-align: right;
        }
        .left>.bottom .small_title>span:nth-child(3){
            flex: 1;
            text-align: right;
        }

        .left>.bottom .newbusiness{
            height: 6.5%;
            border-top: 1px solid #403D3D;
            border-bottom: 1px solid #403D3D
        }
        .left>.bottom .newbusiness li{
            display: flex;
            align-items: center;
            padding-left: 20px;
            padding-right: 7px;
            height: 100%;
        }
        .left>.bottom .newbusiness li span:first-child{
            color: #BD3A3B;
            font-size: 16px;
            margin-right: 10px;
        }
        .left>.bottom .newbusiness li span:last-child{
            color: #BD3A3B;
            margin-left: auto;
        }

        .business_list_and_deal>.deal{
            width: 49%;
            height: 100%;
            display: inline-block;
            background: #302828;
        }
        .deal>.bottom{
         height: 100%;
        }
        .deal>.bottom .new_title{
            height:6%;
            font-size:14px;
            font-weight:300;
            color:#DBD3D3;
            padding-left: 16px;
            background: #302828;
            display: flex;
            align-items: center;
        }
        .deal>.bottom .small_title{
            height: 5%;
            font-weight:300;
            color:rgba(124,120,120,1);
            border-bottom: 1px solid #403D3D;
            padding-left: 5px;
            padding-right: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .deal>.bottom .small_title span{
            flex: 1;
        }
        .deal>.bottom .small_title span:nth-child(2){
            text-align: right;
        }
        .deal>.bottom .small_title span:nth-child(3){
            text-align: right;
        }
        .deal>.bottom .new_table{
            height: 94%;
            background: #282020;
        }
        .deal>.bottom .new_table ul{
            height: 95%;
            overflow-y: auto;
        }
        .deal>.bottom .new_table ul li{
            display: flex;
            justify-content: space-between;
            padding-left: 5px;
            padding-right: 5px;
            height: 20px;
            line-height: 20px;
            cursor: pointer;
        }
        .deal>.bottom .new_table ul li span:first-child{
            color: #BD3A3B;
            flex: 1;
        }
        .deal>.bottom .new_table ul li span:nth-child(2){
            color: #CCC3C3;
            flex: 1;
            text-align: right;
        }
        .deal>.bottom .new_table ul li span:nth-child(3){
            flex: 1;
            text-align: right;
        }

        /* 滚动条 */
        .deal>.bottom .new_table ul::-webkit-scrollbar{
            width:5px;
            background:rgba(49,41,41,1);
            border-radius:3px;
        }
        .deal>.bottom .new_table ul::-webkit-scrollbar-thumb{
            width:5px;
            background:rgba(75,63,63,1);
            border-radius:3px;
        }

</style>