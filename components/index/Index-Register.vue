<template>
  <div>
    <div class="index-data">
      <img src="~assets/image/pc.png" alt />
      <div>
        <div>
          <p>{{today_total_entrust_vol}} USDT</p>
          <p>今日全站交易量</p>
        </div>
        <div>
          <p>{{total_circulation_vol}} USDT</p>
          <p>流通总量</p>
        </div>
        <div>
          <p>{{total_entrust_vol}} USDT</p>
          <p>今日交易量</p>
        </div>
        <div>
          <p>{{total_destroyed_vol}} USDT</p>
          <p>已销毁总量</p>
        </div>
      </div>
    </div>
    <div class="index-join">
      <h2>加入DPRO交易平台社区</h2>
      <p>DPRO交易平台用户遍布全球70个国家与地区，无论是在Twitter、WeChat、Weibo、Facebook还是Telegram都有DPRO的用户。与数十万极富经验的用户共同交流数字货币，洞察行业新趋势。</p>
      <a>>>立即加入</a>
    </div>
    <div class="index-register">
      <h2>注册</h2>
      <p>请在以下区域输入您的邮箱/手机号，即可立即注册</p>
      <div class="register">
        <input type="text" value placeholder="邮箱/手机号码" v-model="inemailorphone" />
        <nuxt-link
          :to="{ name: 'register', params: { emailorphone: inemailorphone } }"
          class="register_btn"
        >注册</nuxt-link>
      </div>
    </div>
    <div class="index-footer">
      <div class="share">
        <a :href="twitterURL">
          <span>
            <img src="~assets/image/twitter.png" alt="twitter" />
          </span>
        </a>
        <!-- <span><img src="~assets/image/telegram.png" alt="telegram"></span> -->
        <a :href="linkedinURL">
          <span>
            <img src="~assets/image/linkedin.png" alt="linkedin" />
          </span>
        </a>
        <a :href="facebookURL">
          <span>
            <img src="~assets/image/facebook.png" alt="facebook" />
          </span>
        </a>
        <a :href="googleURL">
          <span>
            <img src="~assets/image/google.png" alt="google" />
          </span>
        </a>
      </div>
      <div>
        商务合作(不包含上币业务)：dpro168@yeah.net
        <br />市场合作：dpro666@yeah.net
        <br />客服邮箱：dpro888@yeah.net
        <br />
      </div>
      <div>
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
      </div>
      <div>@ 2020 DPRO Global Ltd.</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      today_total_entrust_vol: 0.0,
      total_circulation_vol: 0.0,
      total_entrust_vol: 0.0,
      total_destroyed_vol: 0.0,
      inemailorphone: "",
      twitterURL:
        "https://twitter.com/share?lang=zh&amp;text=%E3%80%90%E5%85%AC%E5%91%8A%E3%80%91%E5%85%B3%E4%BA%8E%E5%BC%80%E6%94%BEArcBlock+%28ABT%29%E4%BA%A4%E6%98%93%E7%9A%84%E5%85%AC%E5%91%8A&amp;url=https%3A%2F%2Fbibox.zendesk.com%2Fhc%2Fzh-cn%2Farticles%2F360001280594--%25E5%2585%25AC%25E5%2591%258A-%25E5%2585%25B3%25E4%25BA%258E%25E5%25BC%2580%25E6%2594%25BEArcBlock-ABT-%25E4%25BA%25A4%25E6%2598%2593%25E7%259A%2584%25E5%2585%25AC%25E5%2591%258A",
      linkedinURL:
        "https://www.linkedin.com/shareArticle?mini=true&amp;source=Bibox&amp;title=%E3%80%90%E5%85%AC%E5%91%8A%E3%80%91%E5%85%B3%E4%BA%8E%E5%BC%80%E6%94%BEArcBlock+%28ABT%29%E4%BA%A4%E6%98%93%E7%9A%84%E5%85%AC%E5%91%8A&amp;url=https%3A%2F%2Fbibox.zendesk.com%2Fhc%2Fzh-cn%2Farticles%2F360001280594--%25E5%2585%25AC%25E5%2591%258A-%25E5%2585%25B3%25E4%25BA%258E%25E5%25BC%2580%25E6%2594%25BEArcBlock-ABT-%25E4%25BA%25A4%25E6%2598%2593%25E7%259A%2584%25E5%2585%25AC%25E5%2591%258A",
      facebookURL:
        "https://www.facebook.com/share.php?title=%E3%80%90%E5%85%AC%E5%91%8A%E3%80%91%E5%85%B3%E4%BA%8E%E5%BC%80%E6%94%BEArcBlock+%28ABT%29%E4%BA%A4%E6%98%93%E7%9A%84%E5%85%AC%E5%91%8A&amp;u=https%3A%2F%2Fbibox.zendesk.com%2Fhc%2Fzh-cn%2Farticles%2F360001280594--%25E5%2585%25AC%25E5%2591%258A-%25E5%2585%25B3%25E4%25BA%258E%25E5%25BC%2580%25E6%2594%25BEArcBlock-ABT-%25E4%25BA%25A4%25E6%2598%2593%25E7%259A%2584%25E5%2585%25AC%25E5%2591%258A",
      googleURL:
        "https://plus.google.com/share?hl=zh-cn&amp;url=https%3A%2F%2Fbibox.zendesk.com%2Fhc%2Fzh-cn%2Farticles%2F360001280594--%25E5%2585%25AC%25E5%2591%258A-%25E5%2585%25B3%25E4%25BA%258E%25E5%25BC%2580%25E6%2594%25BEArcBlock-ABT-%25E4%25BA%25A4%25E6%2598%2593%25E7%259A%2584%25E5%2585%25AC%25E5%2591%258A"
    };
  },
  mounted() {
    this.$axios.get("/api/v1/indexEntrustVol").then(res => {
      let bannerDate = [];
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].key.search("today_total_entrust_vol") != -1) {
          this.today_total_entrust_vol = res.data.data[i].value;
        }
        if (res.data.data[i].key.search("total_circulation_vol") != -1) {
          this.total_circulation_vol = res.data.data[i].value;
        }
        if (res.data.data[i].key.search("total_entrust_vol") != -1) {
          this.total_entrust_vol = res.data.data[i].value;
        }
        if (res.data.data[i].key.search("total_destroyed_vol") != -1) {
          this.total_destroyed_vol = res.data.data[i].value;
        }
      }
    });
  },
};
</script>

<style>
.index-footer {
  padding-bottom: 1.6vw;
}
.index-footer .share {
  width: 14vw;
  display: flex;
  padding-top: 3vw;
  justify-content: space-between;
  margin: 0 auto;
}
.index-footer .share span {
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  background: #bd3a3b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.index-footer .share span img {
  width: 1vw;
  height: 1vw;
}
.index-footer > div:nth-child(2) {
  text-align: center;
  height: 8vw;
  font-size: 0.8vw;
  font-weight: 500;
  color: rgba(123, 111, 111, 1);
  line-height: 2vw;
  margin-top: 3vw;
}
.index-footer > div > ul {
  width: 40vw;
  height: 1.6vw;
  font-size: 0.8vw;
  line-height: 1.6vw;
  list-style: none;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  margin-top: 2vw;
}
.index-footer > div > ul > li {
  float: left;
  font-weight: 500;
  color: rgba(123, 111, 111, 1);
}
.index-footer > div:last-child {
  height: 1.2vw;
  font-size: 0.8vw;
  font-weight: 500;
  color: rgb(119, 119, 119);
  line-height: 1.2vw;
  margin-top: 1.2vw;
  text-align: center;
}

.index-register {
  /* height: 60.62vw; */
  padding-top: 7.34vw;
}
.index-register h2 {
  height: 4vw;
  font-size: 2.2vw;
  font-weight: 400;
  color: rgb(200, 200, 200);
  line-height: 4vw;
  text-align: center;
}
.index-register .register {
  border: none;
}
.index-register > p {
  height: 2vw;
  font-size: 0.8vw;
  font-weight: 500;
  color: rgb(200, 200, 200);
  line-height: 2vw;
  text-align: center;
  margin-top: 0.72vw;
}
.index-register .register {
  text-align: center;
  margin: 0 auto;
  margin-top: 2.4vw;
  width: 30vw;
  display: flex;
}
.index-register > div input {
  width: 21vw;
  height: 3.2vw;
  background: rgba(189, 58, 59, 0.1);
  border-radius: 0.26vw;
  border: none;
  margin-right: 0.72vw;
  font-size: 1vw;
  font-weight: 500;
  color: rgba(125, 115, 115, 1);
  line-height: 2vw;
  padding-left: 1.4vw;
}
.index-register > div .register_btn {
  width: 8vw;
  line-height: 3vw;
  background: rgba(189, 58, 59, 1);
  border-radius: 0.26vw;
  border: none;
  font-size: 1.4vw;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.index-join {
  background: url("~assets/image/join_bg.png");
  width: 100%;
  height: 20vw;
  background-size: 100% 100%;
  padding: 0 20%;
  padding-top: 4vw;
}
.index-join h2 {
  height: 3vw;
  font-size: 1.6vw;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 3vw;
}
.index-join p {
  width: 72%;
  height: 6vw;
  font-size: 1vw;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 2vw;
  margin-top: 1vw;
}
.index-join a {
  height: 1.66vw;
  font-size: 1.09vw;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 1.56vw;
  display: block;
  margin-top: 1.56vw;
}

.index-data {
  height: 60vw;
}
.index-data > img {
  display: block;
  margin: 0 auto;
  padding-top: 6.6vw;
  width: 57.08vw;
}
.index-data > div {
  width: 60%;
  margin: 0 auto;
  margin-top: 2vw;
  display: flex;
  flex-wrap: wrap;
  border-top: 0.1vw solid #403d3d;
  border-bottom: 0.1vw solid #403d3d;
}
.index-data > div > div {
  height: 8vw;
  flex-shrink: 0;
  flex: 1 0 49.9%;
}
.index-data > div > div:nth-child(odd) {
  border-right: 0.052vw solid #403d3d;
}
.index-data > div > div > p:first-child {
  height: 2.4vw;
  font-size: 1.6vw;
  font-weight: 500;
  color: rgba(204, 195, 195, 1);
  line-height: 2.4vw;
  text-align: center;
  margin-top: 2vw;
}
.index-data > div > div > p:nth-child(2) {
  height: 1.6vw;
  font-size: 1vw;
  font-weight: 500;
  color: rgba(123, 111, 111, 1);
  line-height: 1.6vw;
  text-align: center;
  margin-top: 1vw;
}
.index-data > div > div:first-child,
.index-data > div > div:nth-child(2) {
  border-bottom: 0.1vw solid #403d3d;
}
</style>
