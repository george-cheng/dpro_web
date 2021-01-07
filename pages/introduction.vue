<template>
    <div>
    <Header/>
    <div class="introWrap">
        <h2 class="title">资产介绍</h2>
        <section class="content">
            <div class="menu">
                <h2 class="title2">数字资产列表</h2>
                <p class="search"> <input type="text" placeholder="搜索币种"> <img src="~assets/image/sousuo.png" alt="" ></p>
                <ul>
                    <li class="active">ADA(Cardano)</li>
                    <li>ADA(Cardano)</li>
                    <li>ADA(Cardano)</li>
                    <li>ADA(Cardano)</li>
                    <li>ADA(Cardano)</li>
                    <li>ADA(Cardano)</li>
                    <li>ADA(Cardano)</li>
                    <li>ADA(Cardano)</li>
                </ul>
            </div>
            <div class="subs">
                <h2 class="title2">ADA(Cardano)</h2>
                <div class="inner">
                    <div class="ImgBox">
                        <img src="~assets/image/about1.png" alt="">
                        <h4>ADA</h4>
                        <span>白皮书</span>
                        <span>官网</span>
                    </div>
                    <ul class="listBox">
                        <li><span>币种英文</span> <span>ADA</span> </li>
                        <li><span>币种中文名</span> <span>艾达币</span> </li>
                        <li><span>发行时间</span> <span>1925-10</span> </li>
                        <li><span>发行价格</span> <span>0.002USDT</span> </li>
                        <li><span>发行总量</span> <span>31212111</span> </li>
                    </ul>
                    <ul class="listBox">
                        <li><span>提现状态</span> <span>可提现</span> </li>
                        <li><span>充值状态</span> <span>可提充值</span> </li>
                        <li><span>交易状态</span> <span>可交易</span> </li>
                    </ul>
                </div>
                <div class="text">
                    卡尔达诺是一个分散且公开的区块链，也是ㄧ个加密货币项目，而且是完全开源的。卡尔达诺正在开发一个智能合约平台，
                    旨在提供比以前开发的任何协议更先进的功能。它是第一个从科学哲学和以研究为首驱使导向，进而演变而来的区块链平台。
                    开发团队由全球专业工程师和研究人员组成。 艾达币（ADA）是整个Cardano生态系统中的核心代币。艾达币持有者对网络协议的未来发展有发言权和投票权，同时可以决定艾达币的资产分配，
                    每次一个新的区块产生时，现ADA持有者可以投票决定其中一部分艾达币的用途，比如雇更多的工程师或者是做更多的市场宣传，甚至还可以投资其他的区块链项目。
                </div>
            </div>
            
        </section>
    </div>
    <Footer/>
    </div>
</template>

<script>
import Header from '~/components/common/header.vue'
import Footer from '~/components/common/footer.vue'

export default {
    components: {
        Header,
        Footer
    },
    data(){
        return{
            
        }
    },
}
</script>

<style scoped>
    .introWrap{
        width: 1302px;
        margin: 0 auto;
        margin-bottom: 71px;
    }
    .introWrap h2.title{
        background: #302828;
        height: 66px;
        line-height: 66px;
        width: 100%;
        color: #DBD3D3 ;
        font-size: 20px;
        margin: 20px 0 ;
        padding-left: 28px;
    }
    .introWrap .content{
        display: flex;
        justify-content: space-between;
    }
    .introWrap .content .menu{
        width: 304px;
        margin-right: 20px;
        background: #302828;
    }
    .introWrap .content .menu h2.title2{
        background: #282020;
        height: 52px;
        line-height: 52px;
        width: 100%;
        color: #DBD3D3 ;
        font-size: 17px;
        text-align: center;
    }
    .introWrap .content .menu ul li{
        height: 34px;
        line-height: 34px;
        color: #DBD3D3;
        padding-left: 22px;
        margin: 15px 0;
        cursor: pointer;
        position: relative;
    }
    .introWrap .content .menu ul li:hover{
        background: #352D2D;
    }
    .introWrap .content .menu ul li:hover:before{
        content: "";
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        height: 34px;
        background: #BD3A3B;
    }
    .introWrap .content .menu ul li.active{
        background: #352D2D;
    }
    .introWrap .content .menu ul li.active:before{
        content: "";
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        height: 34px;
        background: #BD3A3B;
    }
    

    .introWrap .content .menu .search{
        width: 90%;
        margin: 11px auto;
        border: 1px solid #403D3D;
        border-radius: 5px;
        height: 32px;
    }
    .introWrap .content .menu .search input{
        width: 90%;
        padding: 0 10px;
        line-height: 32px;
        background: transparent;
        border: none;
        color: #DBD3D3;
    }

    .introWrap .content .subs{
        background: #302828;
        width: 100%;

    }
    .introWrap .content .subs h2.title2{
        background: #282020;
        height: 52px;
        line-height: 52px;
        width: 100%;
        color: #DBD3D3 ;
        font-size: 17px;
        padding-left: 32px;
    }
    
    .introWrap .content .subs .inner{
        margin:37px 0 60px 0;
    }
    .introWrap .content .subs .inner{
        display: flex;
        justify-content: flex-start;
    }
    .introWrap .content .subs .ImgBox{
        margin:0 50px 0 80px;
        width: 206px;
        text-align: center;
    }
    .introWrap .content .subs .ImgBox img{
        width: 5.1vw;
        height: 4.5vw;
        display: inline-block;
    }
    .introWrap .content .subs .ImgBox h4{
        font-size: 44px;
        color: #DBD3D3;
        margin: 20px auto 30px;
    }
    .introWrap .content .subs .ImgBox span{
        display: inline-block;
        font-size: 14px;
        color: #fff;
        background: #BD3A3B;
        border-radius: 5px;
        width: 79px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        margin: 0 10px;
    }
    .introWrap .content .subs .listBox{
        width: 244px;
        margin-left: 50px;
    }
    .introWrap .content .subs .listBox li{
        width: 100%;
        display: flex;
        justify-content: space-between;
        line-height: 50px;
    }
    .introWrap .content .subs .listBox li span:first-child{
        color: #7C7878;
        font-size: 16px;
        width: 95px;
    }
    .introWrap .content .subs .listBox li span:last-child{
        color: #DBD3D3;
        font-size: 16px;
        width: 129px;
        text-align: right;
    }

    .introWrap .content .subs .text{
        margin: 0 32px;
        color: #DBD3D3;
        font-size: 16px;
        line-height: 33px;
    }
  


    
</style>