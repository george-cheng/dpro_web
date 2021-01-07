<template>
    <!-- 买卖提交 -->
    <div class="business">
        <div class="entrust_bar">
            <a-radio-group @change="onChangeRadio" v-model="value">
                <a-radio :value="1">限价委托</a-radio>
                <a-radio :value="2">计划委托</a-radio>
            </a-radio-group>
        </div>
        <div class="entrust_content" style="position: relative;">
            <div class="password_warp" style="display:none;" ref="pt_password" @click="$refs.pt_password.style.display ='none'">
                <p style="font-size: 20px;color: #fff;margin-bottom: 5px;">请输入交易密码</p>
                <p class="num" style="display:flex;width:30%;margin:0 auto;margin-bottom: 5px;"><input type="password" v-model="pt_password" style="padding-left: 10px;" @click.stop=""></p>
                <a-button class="" @click.stop="buySubmit()" :disabled="isLogin">确定</a-button>
            </div>
            <div class="purchase">
                <p>余额：<span>{{userbalances}} {{this.group}}</span></p>
                <p class="price"><span>价格</span><input type="text" v-model="purchasePrice" oninput="value=value.replace(/[^\d^\.]+/g,'')"><span>{{this.group}}</span></p>
                <p class="num"><span>数量</span><input type="text" v-model="purchaseNum" oninput="value=value.replace(/[^\d^\.]+/g,'')"><span>{{this.currency}}</span></p>
                <a-slider :marks="marks" :step="25" id="purchase_slider" @change="getPurchaseSliderNum" :tipFormatter="sliderformatter" />
                <p>成交额：<span style="color:#CCC3C3;">{{purchaseTotal.toFixed(4)}} {{this.group}}</span>
                <!-- <span style="color:#645C5C">≈ ¥{{purchasePriceCnys.toFixed(4)}}</span> -->
                </p>
                <!-- <button class="purchase_btn" @click="buySubmit()">买入</button> -->
                <a-button class="purchase_btn" @click="buySubmit()" :disabled="isLogin">买入</a-button>
            </div>
            <div class="password_warp" style="display:none;" ref="st_password" @click="$refs.st_password.style.display ='none'">
                <p style="font-size: 20px;color: #fff;margin-bottom: 5px;">请输入交易密码</p>
                <p class="num" style="display:flex;width:30%;margin:0 auto;margin-bottom: 5px;"><input type="password" v-model="st_password" style="padding-left: 10px;" @click.stop=""></p>
                <a-button class="" @click="sellSubmit()" :disabled="isLogin">确定</a-button>
            </div>
            <div class="sellout">
                <p>余额：<span>{{userbalancesCurrency}} {{this.currency}}</span></p>
                <p class="price"><span>价格</span><input type="text" v-model="selloutPrice" oninput="value=value.replace(/[^\d^\.]+/g,'')"><span>{{this.group}}</span></p>
                <p class="num"><span>数量</span><input type="text" v-model="selloutNum" oninput="value=value.replace(/[^\d^\.]+/g,'')"><span>{{this.currency}}</span></p>
                <a-slider :marks="marks" :step="25" id="sellout_slider" @change="getSelloutSliderNum" :tipFormatter="sliderformatter" />
                <p>成交额：<span style="color:#CCC3C3;">{{selloutTotal.toFixed(4)}} {{this.group}}</span>
                <!-- <span style="color:#645C5C">≈ ¥{{selloutTotalCnys.toFixed(4)}}</span> -->
                </p>
                <!-- <button class="sellout_btn" @click="sellSubmit()">卖出</button> -->
                <a-button class="sellout_btn" @click="sellSubmit()" :disabled="isLogin">卖出</a-button>
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
            value: 1,
            marks:{
                0: '',
                25: '',
                50: '',
                75: '',
                100: ''
            },
            // purchasePrice: '',
            // purchaseNum: '',
            // selloutPrice: '',
            // selloutNum: '',
            purchaseSliderNum: 0,
            userTotal: 0.00,
            pt_password: '',
            st_password: ''
        }
    },
    computed: {
        ...mapState(['priceDatas','rate','fvId','userbalances','userbalancesCurrency','group','currency','userInfo','p_purchasePrice','p_purchaseNum','s_selloutPrice','s_selloutNum','v_needTradePasswd']),
        isLogin: function () {
            if(this.userInfo.code == 1){
                return true
            }else{
                return false
            }
            return this.userInfo.code
        },
        selloutPrice: {
            get () {
                return this.s_selloutPrice
            },
            set (val) {
                this.$store.commit('SET_s_selloutPrice', val)
            }
        },
        selloutNum: {
            get () {
                return this.s_selloutNum
            },
            set (val) {
                this.$store.commit('SET_s_selloutNum', val)
            }
        },
        purchasePrice: {
            get () {
                return this.p_purchasePrice
            },
            set (val) {
                this.$store.commit('SET_p_purchasePrice', val)
            }
        },
        purchaseNum: {
            get () {
                return this.p_purchaseNum
            },
            set (val) {
                this.$store.commit('SET_p_purchaseNum', val)
            }
        },

        purchaseTotal: function () {
            return this.purchasePrice * this.purchaseNum
        },
        purchasePriceCnys: function () {
            return this.purchaseTotal * parseFloat(this.rate.cnys)
        },
        selloutTotal: function () {
            return this.selloutPrice * this.selloutNum
        },
        selloutTotalCnys: function () {
            return this.selloutTotal * parseFloat(this.rate.cnys)
        }
    },
    watch: {
        purchasePrice: function () {
            this.getUserTotal()
            if(this.purchasePrice){
                var a=(this.purchasePrice+'').split('.');
                if(a[1]&&a[1].length>2){
                this.purchasePrice=parseFloat(parseFloat(this.purchasePrice).toFixed(2))
                }
            }else{
                this.purchasePrice=''
            }
        },
        selloutPrice: function () {
            this.getUserTotal()
            if(this.selloutPrice){
                var a=(this.selloutPrice+'').split('.');
                if(a[1]&&a[1].length>2){
                this.selloutPrice=parseFloat(parseFloat(this.selloutPrice).toFixed(2))
                }
            }else{
                this.selloutPrice=''
            }
        },
        purchaseNum: function() {
        this.getUserTotal();
        if(this.purchaseNum){
            var a=(this.purchaseNum+'').split('.');
            if(a[1]&&a[1].length>6){
            this.purchaseNum=parseFloat(parseFloat(this.purchaseNum).toFixed(6))
            }
        }else{
            this.purchaseNum=''
        }
        
        },
        selloutNum: function() {
        this.getUserTotal();
        if(this.selloutNum){
            var a=(this.selloutNum+'').split('.');
            if(a[1]&&a[1].length>6){
            this.selloutNum=parseFloat(parseFloat(this.selloutNum).toFixed(6))
            }
        }else{
            this.selloutNum=''
        }
        
        },
    },
    mounted() {
    },
    methods: {
        /**
         * 更新订单状态
         */
        updateOrderStatus: function () {
            this.$store.dispatch('GET_historyData')
            this.$store.dispatch('GET_currentData')
            this.$store.dispatch("GET_balances");
        },
        /**
         * 卖出
         */
        sellSubmit: function () {
            var _this = this
            var s_params = new URLSearchParams()
            s_params.append('symbol', this.fvId)
            if (this.selloutPrice == "" || this.selloutPrice == null || this.selloutPrice == undefined){
                Message({
                    showClose: true,
                    message: '请输入价格'
                })
            }else if (this.selloutNum == "" || this.selloutNum == null || this.selloutNum == undefined) {
                Message({
                    showClose: true,
                    message: '请输入数量'
                })
            }
            else if (this.v_needTradePasswd == true) {
                this.$refs.st_password.style.display="block"
                if (this.st_password == "" || this.st_password == null || this.st_password == undefined){
                        Message({
                        showClose: true,
                        message: '请输入交易密码'
                    })
                }else{
                    s_params.append('tradePwd', this.st_password)
                    s_params.append('tradeAmount', this.selloutNum)
                    s_params.append('tradeCnyPrice', this.selloutPrice)
                    s_params.append('type', 'sell')
                    this.$axios.post('/api/v2/market/sellBtcSubmit',s_params,{
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(function (response) {
                        if (response.data.isLogin == 0) {
                            Message({showClose: true,message: '未登录'})
                        }
                        if (response) {
                            switch (response.data.code) {
                                case 0:
                                    _this.selloutNum = ""
                                    _this.selloutPrice = ""
                                    _this.st_password = ""
                                    _this.$refs.st_password.style.display="none"
                                    _this.updateOrderStatus()
                                    break;
                                case -100:
                                    Message({showClose: true,message: '交易市场未启用'})
                                    break;
                                case -101:
                                    Message({showClose: true,message: '交易市场未开放交易'})
                                    break;
                                case -400:
                                    Message({showClose: true,message: '交易市场未在开放时间内'})
                                    break;
                                case -3:
                                    Message({showClose: true,message: '小于最小交易价格，最小交易价格为：'+response.data.value})
                                    break;
                                case -1:
                                    Message({showClose: true,message: '小于最小交易数量，最小交易数量为：'+response.data.value})
                                    break;
                                case -2:
                                    Message({showClose: true,message: '交易密码不对'})
                                    break;
                                case -35:
                                    Message({showClose: true,message: '大于最大交易价格，最大交易价格为：'+response.data.value})
                                    break;
                                case -200:
                                    Message({showClose: true,message: '请检查用户交易币种账户'})
                                    break;
                                case -4:
                                    Message({showClose: true,message: '可用数量不足'})
                                    break;
                                case 200:
                                    Message({showClose: true,message: '挂单成功'})
                                    _this.updateOrderStatus()
                                    _this.$refs.st_password.style.display="none"
                                    break;
                                default:
                                    Message({showClose: true,message: response.data.msg})
                                    _this.$refs.st_password.style.display="none"
                                    break;
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                }
            }else{
                s_params.append('tradeAmount', this.selloutNum)
                s_params.append('tradeCnyPrice', this.selloutPrice)
                s_params.append('type', 'sell')
                this.$axios.post('/api/v2/market/sellBtcSubmit',s_params,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function (response) {
                    if (response.data.isLogin == 0) {
                        Message({showClose: true,message: '未登录'})
                    }
                    if (response) {
                        switch (response.data.code) {
                            case 0:
                                // Message({showClose: true,message: '挂单成功'})
                                _this.selloutNum = ""
                                _this.selloutPrice = ""
                                _this.updateOrderStatus()
                                break;
                            case -100:
                                Message({showClose: true,message: '交易市场未启用'})
                                break;
                            case -101:
                                Message({showClose: true,message: '交易市场未开放交易'})
                                break;
                            case -400:
                                Message({showClose: true,message: '交易市场未在开放时间内'})
                                break;
                            case -3:
                                Message({showClose: true,message: '小于最小交易价格，最小交易价格为：'+response.data.value})
                                break;
                            case -1:
                                Message({showClose: true,message: '小于最小交易数量，最小交易数量为：'+response.data.value})
                                break;
                            case -2:
                                Message({showClose: true,message: '交易密码不对'})
                                break;
                            case -35:
                                Message({showClose: true,message: '大于最大交易价格，最大交易价格为：'+response.data.value})
                                break;
                            case -200:
                                Message({showClose: true,message: '请检查用户交易币种账户'})
                                break;
                            case -4:
                                Message({showClose: true,message: '可用数量不足'})
                                break;
                            case 200:
                                Message({showClose: true,message: '挂单成功'})
                                    _this.updateOrderStatus()
                                break;
                            default:
                                Message({showClose: true,message: response.data.msg})
                                break;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
            }
            
        },
        /**
         * 买入
         */
        buySubmit: function () {
            var _this = this
            var params = new URLSearchParams()
            params.append('symbol', this.fvId)
            if (this.purchasePrice == "" || this.purchasePrice == null || this.purchasePrice == undefined){
                Message({
                    showClose: true,
                    message: '请输入价格'
                })
            }else if (this.purchaseNum == "" || this.purchaseNum == null || this.purchaseNum == undefined) {
                Message({
                    showClose: true,
                    message: '请输入数量'
                })
            }else if (this.v_needTradePasswd == true) {
                this.$refs.pt_password.style.display="block"
                if (this.pt_password == "" || this.pt_password == null || this.pt_password == undefined) {
                    Message({
                        showClose: true,
                        message: '请输入交易密码'
                    })
                }else{
                    params.append('tradeAmount', this.purchaseNum)
                    params.append('tradeCnyPrice', this.purchasePrice)
                    params.append('type', 'buy')
                    params.append('tradePwd', this.pt_password)
                    this.$axios.post('/api/v2/market/buyBtcSubmit',params,{
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(function (response) {
                        if (response.data.isLogin == 0) {
                            Message({showClose: true,message: '未登录'})
                        }
                        if (response) {
                            switch (response.data.code) {
                                case 0:
                                    _this.purchaseNum = ""
                                    _this.purchasePrice = ""
                                    _this.pt_password = ""
                                    _this.updateOrderStatus()
                                    _this.$refs.pt_password.style.display="none"
                                    break;
                                case -100:
                                    Message({showClose: true,message: '交易市场未启用'})
                                    break;
                                case -101:
                                    Message({showClose: true,message: '交易市场未开放交易'})
                                    break;
                                case -400:
                                    Message({showClose: true,message: '交易市场未在开放时间内'})
                                    break;
                                case -3:
                                    Message({showClose: true,message: '小于最小交易价格，最小交易价格为：'+response.data.value})
                                    _this.$refs.pt_password.style.display="none"
                                    break;
                                case -1:
                                    Message({showClose: true,message: '小于最小交易数量，最小交易数量为：'+response.data.value})
                                    _this.$refs.pt_password.style.display="none"
                                    break;
                                case -2:
                                    Message({showClose: true,message: '交易密码不对'})
                                    break;
                                case -35:
                                    Message({showClose: true,message: '大于最大交易价格，最大交易价格为：'+response.data.value})
                                    _this.$refs.pt_password.style.display="none"
                                    break;
                                case -200:
                                    Message({showClose: true,message: '请检查用户交易币种账户'})
                                    break;
                                case -4:
                                    Message({showClose: true,message: '可用数量不足'})
                                    break;
                                case 200:
                                    Message({showClose: true,message: '挂单成功'})
                                    _this.updateOrderStatus()
                                    _this.$refs.pt_password.style.display="none"
                                    break;
                                default:
                                    Message({showClose: true,message: response.data.msg})
                                    _this.$refs.pt_password.style.display="none"
                                    break;
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                }
            }else{
                params.append('tradeAmount', this.purchaseNum)
                params.append('tradeCnyPrice', this.purchasePrice)
                params.append('type', 'buy')
                this.$axios.post('/api/v2/market/buyBtcSubmit',params,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function (response) {
                    if (response.data.isLogin == 0) {
                        Message({showClose: true,message: '未登录'})
                    }
                    if (response) {
                        switch (response.data.code) {
                            case 0:
                                _this.purchaseNum = ""
                                _this.purchasePrice = ""
                                _this.updateOrderStatus()
                                break;
                            case -100:
                                Message({showClose: true,message: '交易市场未启用'})
                                break;
                            case -101:
                                Message({showClose: true,message: '交易市场未开放交易'})
                                break;
                            case -400:
                                Message({showClose: true,message: '交易市场未在开放时间内'})
                                break;
                            case -3:
                                Message({showClose: true,message: '小于最小交易价格，最小交易价格为：'+response.data.value})
                                break;
                            case -1:
                                Message({showClose: true,message: '小于最小交易数量，最小交易数量为：'+response.data.value})
                                break;
                            case -2:
                                Message({showClose: true,message: '交易密码不对'})
                                break;
                            case -35:
                                Message({showClose: true,message: '大于最大交易价格，最大交易价格为：'+response.data.value})
                                break;
                            case -200:
                                Message({showClose: true,message: '请检查用户交易币种账户'})
                                break;
                            case -4:
                                Message({showClose: true,message: '可用数量不足'})
                                break;
                            case 200:
                                Message({showClose: true,message: '挂单成功'})
                                _this.updateOrderStatus()
                                break;
                            default:
                                Message({showClose: true,message: response.data.msg})
                                break;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })

            }
        },

        getUserTotal: function () {
            this.$store.dispatch('GET_balances')
        },
        
        sliderformatter: function (value) {
            return `${value}%`;
        },
        getPurchaseSliderNum: function (value) {
            if(parseFloat(this.purchasePrice)<=0 ||this.purchasePrice == null || this.purchasePrice == ''){
                Message({
                    showClose: true,
                    message: '请先输入价格'
                })
            }else{
                var userbalances = parseFloat(this.userbalances)
                var purchasePrice = parseFloat(this.purchasePrice)
                var allnum = 0
                var isnum = 0
                this.purchaseSliderNum = value
                allnum = userbalances/purchasePrice
                isnum = allnum * (value/100)
                this.purchaseNum = parseFloat(isnum.toFixed(6))
            }
        },
        getSelloutSliderNum: function (value) {
            if(parseFloat(this.selloutPrice)<=0 ||this.selloutPrice == null || this.selloutPrice == ''){
                Message({
                    showClose: true,
                    message: '请先输入数量'
                })
            }else{
                var userTotal = parseFloat(this.userbalancesCurrency)
                var selloutPrice = parseFloat(this.selloutPrice)
                var allnum = 0
                var isnum = 0
                this.selloutSliderNum = value
                allnum = userTotal/selloutPrice
                isnum = allnum * (value/100)
                // this.selloutNum = isnum
                if(value==100){
                this.selloutNum=this.userbalancesCurrency;
                }else{
                this.selloutNum=parseFloat(this.tool.accMul(this.userbalancesCurrency,value/100).toFixed(6));
                }
            }
        },
        onChangeRadio(e) {
            console.log('radio checked', e.target.value);
        },
      
    }

}
</script>

<style scoped>
.password_warp{
    position: absolute;
    height: 100%;
    width: 100% !important;
    background: rgba(27, 21, 21, 0.9);
    z-index: 9;
    text-align: center;
}
    .business{
        width: 100%;
        height: 100%;
        background: #302828;
    }
    .business .entrust_bar{
        height:38px;
        background:rgba(48,40,40,1);
        margin-bottom: 3px;
    }
    /* 修改ant design组件的样式 */
    .business .entrust_bar >>> .ant-radio-group{
        line-height: 38px;
    }
    .business .entrust_bar >>> .ant-radio-wrapper{
        color: #CCC3C3;
        margin-left: 16px;
    }
    .business .entrust_content >>> .ant-slider-dot-active{
        border: #282020;
    }
    .business .entrust_content >>> .ant-slider-handle{
        background: #282020;
        border: solid 3px #BD3A3B;
    }
    .business .entrust_content >>> .ant-slider-with-marks{
        margin-bottom: 6px;
    }
    .business .entrust_content{
        height: 219px;
        background:rgba(40,32,32,1);
        display: flex;
    }
    .entrust_content>div{
        /* display: inline-block; */
        width: 50%;
        padding: 5px 16px 0;
        float: left;
    }
    .entrust_content>div .purchase_btn{
        background:#3BA987;
    }
    .entrust_content>div .sellout_btn{
        background:#BD3A3B;
    }
    .entrust_content>div .purchase_btn, .entrust_content>div .sellout_btn{
        width:100%;
        height:35px;
        border-radius:5px;
        border: none;
        font-size: 14px;
        font-weight:500;
        color: #FFFFFF;
        margin-top: 7px;
        /* cursor: pointer; */
    }
    .entrust_content>div p:first-child span{
        float: right;
        color: #CCC3C3;
    }
    .entrust_content .price{
        margin-top: 7px;
    }
    .entrust_content .price, .entrust_content .num{
        /* display: flex;
        align-items: center; */
        border-radius:5px;
        border:1px solid rgba(100,92,92,1);
        margin-bottom: 10px;
        font-size: 10px;
    }
    .entrust_content .price>*, .entrust_content .num>*{
        flex: 1;
    }
    .entrust_content .price span:first-child, .entrust_content .num span:first-child{
        display: inline-block;
        width: 16%;
        text-align: center;
    }
    .entrust_content .price input, .entrust_content .num input{
        width:66%;
        height:33px;
        background: #282020;
        border: none;
        outline: none;
    }
    .entrust_content .price span:last-child, .entrust_content .num span:last-child{
        display: inline-block;
        width: 18%;
        text-align: center;
        /* padding-right: 5px;  */
    }
</style>