<template>
  <div class="hotspot" v-show="show">
    <p>平台热点</p>
    <div id="loop-show-box">
      <ul id="con1">
        <li class="li-style" v-for="(item, index) in noticeList" v-bind:key="index">
          <nuxt-link
            :to="{ name: 'post-id', params: { id: item.id } }"
            target="_blank"
          >{{item.title}}</nuxt-link>
        </li>
      </ul>
      <ul id="con2"></ul>
    </div>
    <div class="innerWrapper">
      <button @click="hideHotSpot">
        <span>我已知晓</span>
      </button>
      <nuxt-link to="/notice">更多</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  mounted() {
    this.autoPostTitle();
    this.$store.dispatch("GET_noticeListByType", {
      page: 1,
      pageSize: 10,
      type: 1
    });
  },
  computed: {
    noticeList: function() {
      return this.$store.state.noticeListByType.rows;
    }
  },
  methods: {
    autoPostTitle: function() {
      var area = document.getElementById("loop-show-box");
      var con1 = document.getElementById("con1");
      var con2 = document.getElementById("con2");
      var widthpx = ((25 / 1920) * document.body.offsetWidth).toFixed(0);
      var mytimer1 = null;
      var mytimer = null;
      var time = 1000 / 60;
      con2.innerHTML = con1.innerHTML;
      function scrollUp() {
        if (area.scrollTop >= con1.offsetHeight) {
          area.scrollTop = 0;
        } else {
          if (area.scrollTop % widthpx == 0) {
            clearInterval(mytimer);
            clearInterval(mytimer1);
            mytimer1 = setTimeout(function() {
              mytimer = setInterval(scrollUp, time);
            }, 3000);
          }
          area.scrollTop++;
        }
      }
      mytimer = setInterval(scrollUp, time);
    },
    hideHotSpot: function() {
      this.show = !this.show;
    }
  }
};
</script>

<style>
:root {
  --main-color: white;
}
.hotspot {
  /* width:100vw; */
  height: 40px;
  background: rgba(189, 58, 59, 1);
  display: flex;
  align-items: center;
  padding: 0 14%;
}
.hotspot div {
  width: 50%;
  text-align: center;
}
.hotspot p,
.hotspot a {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  /* line-height:54px; */
}
.hotspot p:first-child {
  margin-left: 4.42vw;
  width: 190px;
  height: 30px;
  line-height: 30px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.5);
  text-align: center;
  font-size: 16px;
  color: rgba(189, 58, 59, 1);
  /* margin-top: 0.41vw; */
  transform: skewX(-20deg);
}
.hotspot p:first-child > span {
  display: inline-block;
  line-height: 30px;
  transform: skewX(25deg);
}
.hotspot div:nth-child(2) {
  margin-left: 1.51vw;
}
.hotspot > a:last-child {
  float: right;
  height: 1.56vw;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 1.56vw;
  /* margin-top: 0.625vw; */
  margin-left: auto;
  margin-right: 3.85vw;
}

#loop-show-box ul,
li {
  list-style: none;
  display: block;
  margin: 0;
  padding: 0;
}
#loop-show-box {
  height: 1.3vw;
  line-height: 1.3vw;
  overflow: hidden;
  text-align: left;
}
#loop-show-box .li-style {
  width: 100%;
  height: 1.3vw;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.innerWrapper button {
  margin-right: 20px;
  line-height: 1.5;
  cursor: pointer;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid white;
  background-color: transparent;
}
.innerWrapper button span {
  color: var(--main-color);
  text-align: center;
}
</style>
