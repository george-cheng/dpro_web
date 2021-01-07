<template>
  <div id="cantainer">
    <PersonalNav />
    <div class="title">
        <p>银行卡绑定</p>
    </div>
    <div class="content">
        <div class="wrap">
            <span>姓名</span><input type="text" placeholder="请绑定本人持有银行卡" v-model="fuName" ><br>
            <span>开户银行：</span>
              <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select><br>
  <span>开户支行：</span><input type="text" placeholder="填写所在支行、市分行、分行营业部" v-model="fbankBranck"><br>
            <span>银行卡号</span><input type="text" placeholder="请输入银行卡号" v-model="fbankCardNumber"><br>
            <input type="button" value="确定绑定" @click="addAccount"/>
        </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import PersonalNav from "../components/common/header.vue";
import Footer from "../components/common/footer";
import qs from 'qs';
import { Message } from 'element-ui';
export default {
  components: {
    PersonalNav,
    Footer
  },
  data() {
    return {
       fuName:'',
       fbankBranck:'',
       fbankCardNumber:'',
       options: [{
          value: '选项1',
          label: '中国银行'
        }, {
          value: '选项2',
          label: '工商银行'
        }, {
          value: '选项3',
          label: '建设银行'
        }, {
          value: '选项4',
          label: '农业银行'
        },{
          value: '选项5',
          label: '光大银行'
        },  {
          value: '选项6',
          label: '招商银行'
        }, {
          value: '选项7',
          label: '民生银行'
        }, {
          value: '选项8',
          label: '上海浦东发展银行'
        }, {
          value: '选项9',
          label: '广东发展银行'
        }, {
          value: '选项10',
          label: '深圳发展银行'
        }, {
          value: '选项11',
          label: '华夏银行'
        }, {
          value: '选项12',
          label: '中信银行'
        }, {
          value: '选项13',
          label: '恒丰银行'
        }, {
          value: '选项14',
          label: '浙商银行'
        }, {
          value: '选项15',
          label: '兴业银行'
        }, {
          value: '选项16',
          label: '中国邮政'
        }, {
          value: '选项17',
          label: '农业银行'
        }],
        value: '选项1'

    };
  },
  methods:{
      addAccount(){
        var _this = this
          var db={
             'fuName':this.fuName,
             'fbankBranck':this.fbankBranck,
             'fbankCardNumber':this.fbankCardNumber,
             'fbankName':this.options[0].label,
            //  'fuId':cookie.get('uid')
              'fuId': this.tool.getCookie('uid')

        }
        if(this.fbankBranck==''){
          Message({
                         showClose: true,
                         message: '请填写开户支行'
                     })
        }else if(this.fbankCardNumber==''){
          Message({
                         showClose: true,
                         message: '请输入银行卡号'
                     })
        }else{
          this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
        this.$axios.post('/api/v1/updateFuserAccount',qs.stringify(db))
        .then(function (response) {
            if(response.data.code==200){
              Message({
                        showClose: true,
                        message: '绑定成功'
                    })
                _this.$router.push({
                path: '/personal'
            })
            }else if(response.data.code==500){
               Message({
                        showClose: true,
                        message: '请绑定您的真实姓名'
                    })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
      }
      
      },
        }
        
      

};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#cantainer {
  position: relative;
  width: 1920px;
  height: 1825px;
  background: rgba(27, 21, 21, 1);
}
.title{
    width:1302px;
height:66px;
margin-top: 20px;
margin-left: 309px;
vertical-align: middle;
line-height: 66px;
background:rgba(48,40,40,1);
}
.title p{
    
font-size: 20px;
font-family:PingFangSC-Medium,PingFang SC;
font-weight:500;
color:rgba(219,211,211,1);
margin-left: 28px;

}
.content{
width:1302px;
height:500px;
margin-top: 20px;
margin-left: 309px;
margin-bottom: 50px;
vertical-align: middle;
background:rgba(40,32,32,1);
}
.content .wrap{
   margin-left: 300px;
   
}
.content .wrap span{
    width: 150px;
    display:inline-block;
    margin-top: 50px;
    font-size: 20px;
    color:rgba(233,225,225,1);
}
.wrap>input:nth-of-type(1),.wrap>input:nth-of-type(2),.wrap>input:nth-of-type(3){
    width: 440px;
  height: 40px;
  background: rgba(41, 32, 32, 1);
  border-radius: 5px;
  border: 1px solid rgba(53, 49, 49, 1);
}
.wrap>input:nth-of-type(4){
  width: 240px;
  height: 39px;
  margin-top: 25px;
  margin-bottom: 35px;
  background: rgba(189, 58, 59, 1);
  border-radius: 5px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  border: 0;
}


</style>