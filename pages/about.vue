<template>
  <div>
    <Header />
    <div class="aboutWrap">
      <section class="mainTop">
        <div class="left">
          <div class="flex abouttop">
              <img style="width:278px;height:119px" src="~assets/image/logo.png" alt="">
            <!-- <img class="logo" src="~assets/image/logo.png" alt />
            <div class="toptit">
                <p>Eleph</p>
                <p>Exchange</p>
            </div> -->
          </div>
          <div class="introduce">
            <h4>新兴交易平台领军者</h4>
            <p>
              DPRO交易平台是资深量化交易团队联合区块链资深从业者通过去中心化自组织形式创立的一个专注于区块链资产交流和交换的平台。
              DPRO将为用户提供更加安全、便捷、智能的区块链资产流通服务，聚合全球优质区块链资产，融合全球最顶尖的安全技术，致力于打造全球顶级的区块链交易平台。
            </p>
            <p>
              现在已经提供币币交易，OTC交易，合约交易，交易挖矿，理财超市等投资理财服务。并且DPRO会将平台手续费收入的60%作为分红分享给DPRO平台币DPRO的持有者，
              40%用于回购DPRO并进行销毁直至DPRO总量只剩下1亿枚。DPRO总发行量10亿，现在已经回购销毁4千万个，目前总流2.7亿个。
            </p>
            <p>
              另外，DPRO同样是DPRO社区的权利证明，
              DPRO持有者拥有社区业务投票、团队选举等资格。DPRO作为一个赋能参与者，是使得生态利益最大化的自治化社区。
            </p>
          </div>
        </div>
        <!-- <div class="right">
                <img src="~assets/image/about1.png" alt="">
        </div>-->
      </section>
      <section class="content">
        <h2 class="title">
          关于DPRO
          <span></span>
        </h2>
        <p class="p_1">
          <img src="~assets/image/about/about_01.png" alt />

          <span>
            <i>安全稳定</i>
            <em>高达140万单/秒的高性能撮合引擎技术</em>
          </span>
        </p>
        <p class="p_1">
          <span>
            <i>高流动性</i>
            <em>丰富的资源和众多的合作伙伴为平台提供流动性</em>
          </span>

          <img src="~assets/image/about/about_02.png" alt />

          <!-- <img src="~assets/image/about1.png" alt=""> -->
        </p>
        <p class="p_1">
          <img src="~assets/image/about/about_03.png" alt />

          <!-- <img src="~assets/image/about1.png" alt=""> -->
          <span>
            <i>多语言支持</i>
            <em>提供世界范围内多种主流语言支持</em>
          </span>
        </p>
        <p class="p_1">
          <span>
            <i>多币种支持</i>
            <em>BTC、ETH等</em>
          </span>

          <img src="~assets/image/about/about_04.png" alt />

          <!-- <img src="~assets/image/about1.png" alt=""> -->
        </p>
        <p class="p_1">
          <img src="~assets/image/about/about_05.png" alt />

          <!-- <img src="~assets/image/about1.png" alt=""> -->

          <span>
            <i>高性能</i>
            <em>多层、多集群系统架构</em>
          </span>
        </p>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/common/header.vue";
import Footer from "~/components/common/footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.aboutWrap {
  width: 1260px;
  margin: 0 auto;
}
/* 头部 */
.aboutWrap .mainTop {
  display: flex;
  justify-content: space-between;
  margin-top: 90px;
}

/* .abouttop{
    align-items: flex-end;

}
.abouttop .toptit p{
    padding-left:10px ;
    color: #fff;
    font-size: 22px;
    line-height: 1;
} */
.aboutWrap .mainTop .left {
  /* width: 730px; */
}
.aboutWrap .mainTop .left > div.logo {
  width: 87px;
  height: 100px;
}
.aboutWrap .mainTop .left .introduce h4 {
  font-size: 26px;
  color: #fff;
  margin: 18px 0 12px 0;
}
.aboutWrap .mainTop .left .introduce p {
  font-size: 16px;
  line-height: 25px;
  margin-bottom: 20px;
  color: #9f9f9f;
}
.aboutWrap .mainTop .right img {
  width: 21.25vw;
  height: 21.25vw;
}

/* 下面关于我们 */
.aboutWrap .content h2.title {
  font-size: 28px;
  color: #dbd3d3;
  text-align: center;
  position: relative;
  width: 160px;
  margin: 50px auto;
}
.aboutWrap .content h2.title span {
  display: block;
  position: absolute;
  left: 70px;
  top: 46px;
  width: 0;
  height: 0;
  border: 10px solid;
  border-color: #ccc3c3 transparent transparent;
}
.aboutWrap .content h2.title:after {
  content: "";
  display: inline-block;
  width: 133px;
  height: 1px;
  background: #403d3d;
  position: absolute;
  left: 210px;
  top: 22px;
}

.aboutWrap .content h2.title:before {
  content: "";
  display: inline-block;
  width: 133px;
  height: 1px;
  background: #403d3d;
  position: absolute;
  right: 210px;
  top: 22px;
}
.aboutWrap .content .p_1 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 115px;
}
.aboutWrap .content .p_1 img {
  width: 20vw;
  height: 20vw;
}
.aboutWrap .content .p_1 span {
  text-align: left;
}
.aboutWrap .content .p_1 span i {
  display: block;
  font-size: 40px;
  color: #dbd3d3;
}
.aboutWrap .content .p_1 span em {
  font-style: normal;
  font-size: 28px;
  color: #7c7878;
  padding-top: 20px;
  display: block;
}
</style>