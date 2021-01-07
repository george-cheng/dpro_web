<template>
  <div class="index-QRcode">
    <img src="~assets/image/DownQRCode.png" />
    <p>请扫描官方二维码下载DPRO App</p>
    <div>
      <p>
        <a href="http://dpro-main.oss-cn-hongkong.aliyuncs.com/download/dpro/dpro.apk" disabled>
          <i class="iconfont ios"></i>
          <span>IOS</span>
        </a>
        <a href="http://dpro-main.oss-cn-hongkong.aliyuncs.com/download/dpro/dpro.apk" disabled>
          <i class="iconfont android"></i>
          <span>Android</span>
        </a>
      </p>
      <p>
        <a href disabled>
          <i class="iconfont googleplay"></i>
          <span>Google Play</span>
        </a>
        <a href disabled>
          <i class="iconfont windows"></i>
          <span>Windows</span>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
:root {
  --main-text-1: rgb(243, 243, 243);
}
.index-QRcode {
  background: url("~assets/image/indexQRcode_bg.png");
  padding-top: 5vw;
  padding-bottom: 4vw;
  text-align: center;
  color: white;
}
.index-QRcode img {
  vertical-align: middle;
  border-style: none;
}
.index-QRcode p {
  color: var(--main-text-1);
  font-size: 0.78vw;
  margin-top: 1vw;
  margin-bottom: 1vw;
}
.index-QRcode a {
  display: inline-block;
  font-size: 0.78vw;
  width: 160px;
  height: 50px;
  line-height: 50px;
  color: var(--main-text-1);
  border-radius: 4px;
  border: 1px solid var(--main-text-1);
  margin: 0 10px;
}
</style>