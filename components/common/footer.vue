<template>
  <div class="footer">
    <div class="footer_nav">
      <ul>
        <li>
          <nuxt-link to="/about">关于我们</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/serviceAgreement">服务协议</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/privacy">隐私申明</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/rateExplain">费率说明</nuxt-link>
        </li>
      </ul>
      <div class="hezuo">
        <div>
          <img src="~assets/image/tuite.png" alt="twitter" />
          <img src="~assets/image/tele.png" alt="telegram" />
          <img src="~assets/image/f.png" alt="facebook" />
        </div>
        <p>商务合作(不包含上币业务):dpro168@yeah.net</p>
        <p>客服:dpro888@yeah.net</p>
      </div>
      <div class="dow_app">
        <a href="https://dpro-main.oss-cn-hongkong.aliyuncs.com/download/dpro/dpro.apk" disabled>
          <i class="iconfont ios"></i>
          <span>IOS下载</span>
        </a>
        <a href="https://dpro-main.oss-cn-hongkong.aliyuncs.com/download/dpro/dpro.apk" disabled style="white-space:no-wrap">
          <i class="iconfont android"></i>
          <span>Android下载</span>
        </a>
        <img src="~assets/image/DownQRCode_min.png" />
        <p>© 2020 DPRO PRO FOUNDATION LTD All Rights Reserved</p>
      </div>
    </div>
    <div class="link">
      <ul>
        <li>友情连接:</li>
        <li>
          <a href="http://www.bishijie.com" rel="noopener noreferrer" target="_blank">币世界</a>
        </li>
        <li>
          <a href="https://www.jinse.com" rel="noopener noreferrer" target="_blank">金色财经</a>
        </li>
        <li>
          <a href="https://www.feixiaohao.com" rel="noopener noreferrer" target="_blank">非小号</a>
        </li>
        <li>
          <a href="https://www.mytoken.io" rel="noopener noreferrer" target="_blank">MyToken</a>
        </li>
        <li>
          <a href="http://www.tokenmaster.io" rel="noopener noreferrer" target="_blank">令牌大师</a>
        </li>
        <li>
          <a href="http://www.bishequ.com/" rel="noopener noreferrer" target="_blank">币社区</a>
        </li>
        <li>
          <a href="http://www.dubiwang.com" rel="noopener noreferrer" target="_blank">读币网</a>
        </li>
        <li>
          <a href="http://www.lianchi123.com" rel="noopener noreferrer" target="_blank">Canshreum</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoper>
:root {
  --main-text-1: rgb(243, 243, 243);
}
.footer {
  background: #282020;
  /* position: fixed;
        bottom: 0;
        left: 0;
        width: 100%; */
  /* margin-top: 139px; */
}
.footer .footer_nav {
  display: flex;
  width: 63.54vw;
  margin-left: 18.22vw;
}
.footer .footer_nav ul {
  width: 4vw;
  height: 8vw;
  font-size: 0.72vw;
  font-weight: 400;
  color: rgba(204, 195, 195, 1);
  line-height: 1.66vw;
  display: inline-block;
  flex: 2;
}
.footer div div:nth-child(2) {
  display: inline-block;
  flex: 3;
}
.footer div div:last-child {
  display: inline-block;
}
.footer .hezuo {
  font-size: 0.72vw;
  font-weight: 400;
  color: rgba(204, 195, 195, 1);
}
.footer .hezuo p {
  line-height: 1.56vw;
}
.footer .hezuo > div {
  margin-top: 1.35vw;
  margin-bottom: 0.93vw;
}
.footer .hezuo img:nth-child(2) {
  margin: 0 1.09vw;
}
.footer .dow_app {
  text-align: right;
}
.footer .dow_app img {
  width: 8.33vw;
  height: 2.6vw;
  margin-top: 1.3vw;
  margin-bottom: 0.72vw;
}
.footer .dow_app img:nth-child(2) {
  margin-left: 0.83vw;
  margin-right: 0.83vw;
}
.footer .dow_app img:nth-child(3) {
  width: 3.2vw;
  height: 3.2vw;
}
.footer .dow_app p {
  height: 1.87vw;
  font-size: 0.72vw;
  font-weight: 400;
  color: rgba(204, 195, 195, 1);
  line-height: 1.56vw;
  text-align: right;
}
.dow_app a {
  display: inline-block;
  font-size: 0.78vw;
  /* width: 6.8vw; */
  /* height: 2.2vw; */
  line-height: 2;
  color: var(--main-text-1);
  border-radius: 4px;
  border: 1px solid var(--main-text-1);
  margin: 0 10px;
  text-align: center;
  padding: 0 6px;
}
.footer .link {
  /* height:2.23vw; */
  font-size: 0.72vw;
  font-weight: 400;
  color: rgba(204, 195, 195, 1);
  line-height: 2.6vw;
  border-top: 0.0104vw solid #403d3d;
}
.footer .link ul {
  display: inline-block;
  margin-left: 18.22vw;
}
.footer .link ul li {
  float: left;
  margin-right: 1.56vw;
}
</style>