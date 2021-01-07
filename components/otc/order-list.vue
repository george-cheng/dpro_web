<template>
  <div class="orderList">
      <ul class="flex alcenter ptb10 plr10 ft16">
          <li class="red">普通交易</li>
      </ul>
      <div class="bgPart">
          <div class="header ptb15 plr10 flex alcenter between">
              <div>
                  <p class="flex alcenter mb10 grayCor">
                      <span class="inBlock" style="width: 185px;">订单类型</span>
                      <span class="ml20">订单状态</span>
                  </p>
                  <div class="flex alcenter">
                      <el-select size="mini" class="grayCor" v-model="type">
                          <el-option 
                            :label="item.label"
                            :value="item.val"
                            v-for="(item,i) in types"
                            :key="i"
                            >
                          </el-option>
                      </el-select>
                      <el-select size="mini" class="ml20 grayCor" v-model="status">
                          <el-option 
                            :label="item.label"
                            :value="item.val"
                            v-for="(item,i) in statusList"
                            :key="i"
                            >
                          </el-option>
                      </el-select>
                  </div>
              </div>
              <div style="height:55px; align-items:flex-end;" class="flex">
                  <span class="inBlock ptb5 plr10 radius5 bdRed red curPer" @click="reset">重置全部</span>
                  <span class="inBlock ptb5 plr10 radius5 bgRed white ml20 bdRed curPer" @click="search">开始搜索</span>
              </div>
          </div>
          <!--列表-->
          <ul class="white">
              <li class="flex alcenter bgGray ptb10 plr10">
                  <span style="flex:2">订单号</span>
                  <span style="flex:2">时间</span>
                  <span class="flex1">类型</span>
                  <span class="flex1">单价</span>
                  <span class="flex1">总额</span>
                  <span class="flex1">数量</span>
                  <span class="flex1">状态</span>
                  <span class="flex1">操作</span>
              </li>
              <li class="flex alcenter ptb15 plr10 bdbWhite" v-for="(item,index) in list" :key="index">
                  <span style="flex:2">{{item.order_id}}</span>
                  <span style="flex:2">{{item.place_time}}</span>
                  <span class="flex1" :class="{'green':item.order_type == 1,'red':item.order_type == 2}">{{item.order_type == 1?'买入':'卖出'}}</span>
                  <span class="flex1">{{item.price}}</span>
                  <span class="flex1">{{item.total}}</span>
                  <span class="flex1">{{item.amount}}</span>
                  <span class="flex1" v-show="item.order_status ==1">待付款</span>
                  <span class="flex1" v-show="item.order_status ==2">待收款</span>
                  <span class="flex1" v-show="item.order_status ==3">已完成</span>
                  <span class="flex1" v-show="item.order_status ==4">已撤销</span>
                  <span class="flex1" :class="{'green':item.order_type == 1,'red':item.order_type == 2}">
                  <nuxt-link :to="'/otc/orderDetail?id='+item.order_id+'&fType='+fType">查看订单</nuxt-link>
                  </span>
              </li>
              <li v-show="isShow" class="ptb30 tc ft16">{{msg}}</li>
          </ul>
      </div>
      <div class="tr ptb15" v-if="!isShow">
         <el-pagination background small layout="prev, pager, next" :total="total" :page-size="10" @prev-click="prev"  @next-click="next"  @current-change="current"></el-pagination>
      </div>
  </div>
</template>

<script>
export default {
    props:['url'],
    data(){
        return{
            times:'',
            list:[],
            type:'',
            status:'',
            page:1,
            total:0,
            statusList:[
                {
                    label:'全部',
                    val:''
                },
                {
                    label:'待付款',
                    val:1
                },
                {
                    label:'已付款',
                    val:2
                },
                {
                    label:'已完成',
                    val:3
                },
                {
                    label:'已取消',
                    val:4
                }
            ],
            types:[
                {
                    label:'全部',
                    val:''
                },
                {
                    label:'买入',
                    val:1
                },
                {
                    label:'卖出',
                    val:2
                }
            ],
            isShow:false,
            msg:'',
            fType:''
        }
    },
    created(){
        if(this.url == '/api/v1/otcOrder/buinessOrderList'){
            this.fType = 1 //商家
        }else{
            this.fType = 0 //用户
        }
        this.getOrderList();
    },
    methods:{
        getOrderList(){
            this.list = [];
            this.$axios(`${this.url}?type=${this.type}&status=${this.status}&page=${this.page}&pageSize=10`).then(res=>{
                if(res.data.code == 200){
                    this.total = res.data.data.total;
                    this.isShow = false;
                    this.list = res.data.data.rows;
                }else{
                    this.isShow = true;
                    this.msg = res.data.msg;
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        next(){
            this.page++;
            this.getOrderList();
        },
        prev(){
            this.page--;
            this.getOrderList();
        },
        current(e){
            this.page = e;
            this.getOrderList();
        },
        //搜索
        search(){
            this.page = 1;
            this.getOrderList();
        },
        //重置
        reset(){
            this.type = '';
            this.status = '';
            this.page = 1;
            this.getOrderList();
        }
    }
}
</script>

<style scoped>
    .orderList{
        min-height: 500px;
    }
    .orderList>>>.el-input__inner{
        background-color: #302828;
        border: 1px solid #555;
    }
</style>